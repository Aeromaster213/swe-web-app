# swe-web-app: Tower of Babble

Repository containing our web-application for SWE project (as a part of the coursework of IIT Tirupati), adhering to United Nations Sustainablility Goals

The idea of the project is given in the `Team6 ProjectConcept.docx`. 

## Importance of the project:
Allowing corporations to host our web-applications in their servers, we provide a free, easy and privacy-secure solution for translating and transcribing their data.

## Uniqueness
No other solution exist outside of research domians, and that too do not provide a simplistic way to translate and transcribe text/audio for users

**Long story short: We are building a website that can transcribe and translate input audio/video files to text/srt files using AI based models of Whisper.cpp amd Fairseq**

## Contributions
Arup Biswas         : Documentation and Tech Research (Existing solutions and usable tech) <br>
Arvind Srinivasan   : Docker, Model deployment in Python, ExpressJS bridge <br>
Dhriti Chintakunta  : User Interface development <br>
Keshav Kumar Manjhi : MongoDB setup, ExpressJS setup, Middleware integration <br>
Abhinav Gupta       : User Interface Design, Express JS setup 

## Doc links
Project Concept : [link](https://docs.google.com/document/d/1HpocQnrGQJywSnZ3fIJ-sw-yIiCgGKAyLZrm4KkIKmw/edit?usp=drivesdk)
<br>
Requirements         : [link](https://docs.google.com/document/d/1YWgGKmDxeYOwvWN6YkJi8t6OKxZow1b4/edit?usp=drivesdk&ouid=114268721722635085808&rtpof=true&sd=true)
<br>
Use Cases            : [link](https://docs.google.com/document/d/1GQMLbYJCmfG9JFh7Cgzp61rlSL2CsMRq4fEupq4DMKk/edit?usp=drivesdk)
<br>
Weekly Status Report : [link](https://docs.google.com/document/d/1jDemDmnepd8-6kNmyRCfemr_Mmsws3XKXDsyNfvufzM/edit?usp=drivesdk)
<br>
Design               : [link](https://docs.google.com/document/d/181ZK64r7MhxgnhrBuxd3HlSPzm74X-0rUi2LtAZmsc4/edit?usp=drivesdk)
## To run the website

### Compiling docker to create the image

Install nvidia-container-runtime or its equivalent for your distribution to use CUDA acceleration

```bash
set DOCKER_BUILDKIT=1
sudo docker build -t transcribe_server:latest Backend/
```

Run the following commands in order
```bash
cd Backend
sudo docker-compose up # if using CUDA GPU accelerated inference -- recommended for performance
sudo docker-compose -f compose-cpu.yml up # if using CPU
```
(in new tab)
```bash
cd Frontend
npm i 
npm start
```
Link to the repo: https://github.com/Aeromaster213/swe-web-app
