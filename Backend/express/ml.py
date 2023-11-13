import torch, whisper
import pathlib
from os import path
from torch import hub
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
hub.set_dir("/persistent/")

models = {"de": 'transformer.wmt16.en-de', "fr": 'transformer.wmt14.en-fr'}
preloaded_models = {lang: torch.hub.load('pytorch/fairseq', models[lang], tokenizer='moses', bpe='subword_nmt', max_source_positions=16384, max_target_position=16384) for lang in models}

def translation(inp, lang):
    if lang=="en": #We're doing En->X translations
        return inp
    translate_model = preloaded_models[lang]
    translate_model.eval()  # disable dropout
    if DEVICE == "cuda":
        translate_model.cuda()
    out=translate_model.translate(inp)
    return out

def remote_translate(inp, lang):
    inp = open(inp).read()
    if lang!="nl":
        inp = translation(inp, lang)
    print("{\"txt\": \""+inp, end="\", ")
    print("\"srt\": \" No SRT for text", end="\"}")

def format_srt(transcript, lang):
    srt_output = ""
    for i, segment in enumerate(transcript['segments']):
        start = segment['start']
        end = segment['end']
        text = segment['text']
        if lang!="nl":
            text=translation(text, lang)

        # Convert times to SRT format (hours:minutes:seconds,milliseconds)
        start_srt = f"{int(start // 3600):02d}:{int(start % 3600 // 60):02d}:{int(start % 60):02d},{int(start % 1 * 1000):03d}"
        end_srt = f"{int(end // 3600):02d}:{int(end % 3600 // 60):02d}:{int(end % 60):02d},{int(end % 1 * 1000):03d}"

        # Append formatted segment to SRT output
        srt_output += f"{i+1}\\n{start_srt} --> {end_srt}\\n{text}\\n\\n"

    return srt_output

def remote(file, language):
    transcribe_model = whisper.load_model("small", download_root="/persistent").to(DEVICE)
    if language=="nl":
        rslt=whisper.transcribe(transcribe_model, file)
        print("{\"txt\": \""+rslt["text"], end="\", ")
        print("\"srt\": \""+format_srt(rslt, "nl"), end="\"}")
    else:
        rslt = transcribe_model.transcribe(file, task="translate")
        txt = rslt["text"]
        print("{\"txt\": \""+translation(txt, language), end="\", ")
        print("\"srt\": \""+format_srt(rslt, language), end="\"}")

if __name__=="__main__":
    print("Model test loaded!")
    transcribe_model = whisper.load_model("small", download_root="/persistent").to(DEVICE)
    for f in pathlib.Path("samples/").iterdir():
        print(str(f))
        print(transcribe_srt(model, f))
