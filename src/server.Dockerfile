FROM alpine:latest
RUN git clone https://github.com/ggerganov/whisper.cpp.git
RUN apk add --update npm
RUN apk add --no-cache git cmake blas make
RUN cd whisper.cpp; cmake .
RUN bash ./models/download-ggml-model.sh large

COPY express/* /
EXPOSE 3000
CMD node index.js
