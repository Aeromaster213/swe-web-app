import torch, whisper
import pathlib
from os import path
from torch import hub
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
hub.set_dir("/persistent/")
models = {"de": 'transformer.wmt16.en-de', "fr": 'transformer.wmt14.en-fr'}

def translation(inp, lang):
    if lang=="en": #We're doing En->X translations
        return inp
    en2de = torch.hub.load('pytorch/fairseq', models[lang], tokenizer='moses', bpe='subword_nmt', max_source_positions=8192, max_target_position=8192)
    en2de.eval()  # disable dropout
    if DEVICE == "cuda":
        en2de.cuda()
    return en2de.translate(inp)

def format_srt(transcript, lang):
    srt_output = ""
    for i, segment in enumerate(transcript['segments']):
        start = segment['start']
        end = segment['end']
        text = segment['text']
        if lang!="en" and lang!="nl":
            text=translation(text, lang)

        # Convert times to SRT format (hours:minutes:seconds,milliseconds)
        start_srt = f"{int(start // 3600):02d}:{int(start % 3600 // 60):02d}:{int(start % 60):02d},{int(start % 1 * 1000):03d}"
        end_srt = f"{int(end // 3600):02d}:{int(end % 3600 // 60):02d}:{int(end % 60):02d},{int(end % 1 * 1000):03d}"

        # Append formatted segment to SRT output
        srt_output += f"{i+1}\\n{start_srt} --> {end_srt}\\n{text}\\n\\n"

    return srt_output

def remote(file, language):
    model = whisper.load_model("small", download_root="/persistent").to(DEVICE)
    if language=="nl":
        rslt=whisper.transcribe(model, file)
        print("{\"txt\": \""+rslt["text"], end="\", ")
        print("\"srt\": \""+format_srt(rslt, "nl"), end="\"}")
    else:
        rslt = model.transcribe(file)
        print("{\"txt\": \""+translation(rslt["text"], language), end="\", ")
        print("\"srt\": \""+format_srt(rslt, language), end="\"}")

if __name__=="__main__":
    print("Model test loaded!")
    model = whisper.load_model("small", download_root="/persistent").to(DEVICE)
    for f in pathlib.Path("samples/").iterdir():
        print(str(f))
        print(transcribe_srt(model, f))
