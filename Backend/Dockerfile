FROM python:3.9
ENV PIP_HOME=/pycache
RUN apt update
RUN --mount=type=cache,target=/pycache pip3 install openai-whisper
RUN apt-get install -y ffmpeg nodejs npm git bash
RUN --mount=type=cache,target=/pycache pip3 install Cython 
RUN --mount=type=cache,target=/pycache pip3 install fastBPE sacremoses subword_nmt fairseq scikit-learn tensorboardX

COPY express/ /code

WORKDIR /code
#as it stands, the model is inference-only
#CMD python ml.py
RUN npm i
EXPOSE 5001
EXPOSE 5000
CMD node server.js
