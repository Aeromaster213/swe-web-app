FROM python:3.9
RUN python -m venv /pyenv
RUN ["bash", "-e", "source", "/pyenv/bin/activate"]
RUN pip install openai-whisper
RUN apt update && apt install -y ffmpeg npm git

COPY express/ /

#as it stands, the model is inference-only
CMD python ml.py
