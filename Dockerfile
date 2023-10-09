FROM python:3.9
RUN python3 -m venv /pycache
RUN . /pycache/bin/activate
RUN pip3 install openai-whisper
RUN apt update && apt install -y ffmpeg npm git bash

COPY express/ /

#as it stands, the model is inference-only
CMD python ml.py
