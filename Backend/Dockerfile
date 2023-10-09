FROM python:3.9
RUN python3 -m venv /pycache
RUN . /pycache/bin/activate
RUN --mount=type=cache,target=/pycache pip3 install openai-whisper
RUN apt update && apt install -y ffmpeg nodejs npm git bash

COPY express/ /code

WORKDIR /code
#as it stands, the model is inference-only
#CMD python ml.py
RUN npm i
EXPOSE 3000
EXPOSE 5000
CMD node server.js
