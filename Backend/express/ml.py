import torch, whisper
import pathlib
from os import path
from torch import hub
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
hub.set_dir("/persistent/")

def translation(inp):

    # Load a transformer trained on WMT'16 En-De
    # Note: WMT'19 models use fastBPE instead of subword_nmt, see instructions below
    #torch.hub.download_url_to_file('https://github.com/pytorch/fairseq/zipball/main', '/persistent/fairseq')
    en2de = torch.hub.load('pytorch/fairseq', 'transformer.wmt16.en-de',
                        tokenizer='moses', bpe='subword_nmt')
    en2de.eval()  # disable dropout

    # The underlying model is available under the *models* attribute
    #assert isinstance(en2de.models[0], fairseq.models.transformer.TransformerModel)

    # Move model to GPU for faster translation
    if DEVICE == "cuda":
        en2de.cuda()
    return en2de.translate(inp)

def format_srt(transcript):
    srt_output = ""
    for i, segment in enumerate(transcript['segments']):
        start = segment['start']
        end = segment['end']
        text = segment['text']

        # Convert times to SRT format (hours:minutes:seconds,milliseconds)
        start_srt = f"{int(start // 3600):02d}:{int(start % 3600 // 60):02d}:{int(start % 60):02d},{int(start % 1 * 1000):03d}"
        end_srt = f"{int(end // 3600):02d}:{int(end % 3600 // 60):02d}:{int(end % 60):02d},{int(end % 1 * 1000):03d}"

        # Append formatted segment to SRT output
        srt_output += f"{i+1}\\n{start_srt} --> {end_srt}\\n{text}\\n\\n"

    return srt_output

def remote(file, language):
    model = whisper.load_model("small", download_root="/persistent").to(DEVICE)
    rslt=whisper.transcribe(model, file)
    print("{\"txt\": \""+translation(rslt["text"]), end="\", ")
    print("\"srt\": \""+format_srt(rslt), end="\"}")

if __name__=="__main__":
    print("Model test loaded!")
    model = whisper.load_model("medium", download_root="/persistent").to(DEVICE)
    for f in pathlib.Path("samples/").iterdir():
        print(str(f))
        print(transcribe_srt(model, f))
