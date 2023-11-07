FROM python:3.9
RUN python3 -m venv /pycache
RUN . /pycache/bin/activate
RUN apt update
RUN --mount=type=cache,target=/pycache pip3 install openai-whisper
RUN apt-get install -y ffmpeg
RUN apt-get install -y nodejs
RUN apt-get install -y npm 
RUN apt-get install -y git
RUN apt-get install -y bash

COPY express/ /code

WORKDIR /code
#as it stands, the model is inference-only
#CMD python ml.py
RUN npm i
EXPOSE 5001
EXPOSE 5000
CMD node server.js
