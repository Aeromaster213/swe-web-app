# swe-web-app: Tower of Babble

Repository containing our web-application for SWE project (as a part of the coursework of IIT Tirupati), adhering to United Nations Sustainablility Goals

The idea of the project is given in the `Team6 ProjectConcept.docx`. 

## Importance of the project:
Allowing corporations to host our web-applications in their servers, we provide a free, easy and privacy-secure solution for translating and transcribing their data.

## Uniqueness
No other solution exist outside of research domians, and that too do not provide a simplistic way to translate and transcribe text/audio for users

**Long story short: We are building a website that can transcribe and translate input audio/video files to text/srt files using AI based models of Whisper.cpp**

## Contributions
Arup Biswas         : Documentation and Tech Research (Existing solutions and usable tech) <br>
Arvind Srinivasan   : Dockerfile, Model deployment <br>
Dhriti Chintakunta  : User Interface development <br>
Keshav Kumar Manjhi : MongoDB setup, ExpressJS setup <br>
Abhinav Gupta       : User Interface Design, Express JS setup 

## To Run the website ->

###Compiling docker to create the image

```bash
cd src/
sudo docker build -t <tag>:<branch> .
```

Run the following commands in order
```bash
sudo docker-compose up #if using CUDA GPU accelerated inference
sudo docker run -t <tag>:<branch> # if using CPU
npm i
npm start
```
