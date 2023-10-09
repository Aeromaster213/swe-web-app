import torch, whisper
import pathlib

def transcribe_srt(model, file):
    rslt = whisper.transcribe(model, str(f))
    return rslt["text"]

if __name__=="__main__":
    print("Model test loaded!")
    DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    model = whisper.load_model("medium", download_root="/persistent").to(DEVICE)
    for f in pathlib.Path("samples/").iterdir():
        print(str(f))
        print(transcribe_srt(model, f))
