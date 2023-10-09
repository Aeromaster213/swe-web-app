import torch, whisper
import pathlib
from os import path

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


def transcribe_srt(model, file):
    rslt = whisper.transcribe(model, "filecache/"+file)
    return rslt["text"]

def remote(file):
    model = whisper.load_model("medium", download_root="/persistent").to(DEVICE)
    print(whisper.transcribe(model, file)["text"])

if __name__=="__main__":
    print("Model test loaded!")
    model = whisper.load_model("medium", download_root="/persistent").to(DEVICE)
    for f in pathlib.Path("samples/").iterdir():
        print(str(f))
        print(transcribe_srt(model, f))
