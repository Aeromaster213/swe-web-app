import torch, whisper
import pathlib

if __name__="__main__":
    DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    model = whisper.load_model("medium", download_root="/persistent").to(DEVICE)
    rlst = whisper.translate(model, "samples/gb0.ogg")
    print(rlst["text"])
