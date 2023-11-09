import torch, whisper
import pathlib
from os import path

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

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
    print("{\"txt\": \""+rslt["text"], end="\", ")
    print("\"srt\": \""+format_srt(rslt), end="\"}")

if __name__=="__main__":
    print("Model test loaded!")
    model = whisper.load_model("medium", download_root="/persistent").to(DEVICE)
    for f in pathlib.Path("samples/").iterdir():
        print(str(f))
        print(transcribe_srt(model, f))

def translation(in):
    # List available models
    torch.hub.list('pytorch/fairseq')  # [..., 'transformer.wmt16.en-de', ... ]

    # Load a transformer trained on WMT'16 En-De
    # Note: WMT'19 models use fastBPE instead of subword_nmt, see instructions below
    en2de = torch.hub.load('pytorch/fairseq', 'transformer.wmt16.en-de',
                        tokenizer='moses', bpe='subword_nmt')
    en2de.eval()  # disable dropout

    # The underlying model is available under the *models* attribute
    #assert isinstance(en2de.models[0], fairseq.models.transformer.TransformerModel)

    # Move model to GPU for faster translation
    if(DEVICE == "cuda")
        en2de.cuda()
    # Translate a sentence
    #en2de.translate('Hello world!')
    # 'Hallo Welt!'

    # Batched translation
    #en2de.translate(['Hello world!', 'The cat sat on the mat.'])
    # ['Hallo Welt!', 'Die Katze saß auf der Matte.']
