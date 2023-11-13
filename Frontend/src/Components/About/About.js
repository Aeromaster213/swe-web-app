import React, { useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
// import {useUploadContext} from "../../Context/UploadContext";
import './about.css';

export default function About() {
    const aboutRef = useRef(null);

    const circlePosFinal = [
        { top: '30', left: '5' },
        { top: '5', left: '60' },
        { top: '20', left: '90' },
        { top: '80', left: '30' },
        { top: '70', left: '70' },
        { top: '65', left: '95' },
        { top: '10', left: '30' },
        { top: '60', left: '20' }
    ];

    const circlePosInit = [
        { top: '40', left: '30' },
        { top: '30', left: '40' },
        { top: '10', left: '70' },
        { top: '70', left: '60' },
        { top: '90', left: '50' },
        { top: '55', left: '75' },
        { top: '20', left: '5' },
        { top: '60', left: '20' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            let refPoint = aboutRef.current;
            if (refPoint) {
                let scrollVal = window.scrollY;
                let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
                let scrollValPer = scrollVal / documentHeight;

                scrollValPer = Math.min(scrollValPer, 1);
                scrollValPer = Math.max(scrollValPer, 0);
                console.log(scrollValPer);

                circlePosFinal.forEach((pos, index) => {
                    const initPos = circlePosInit[index];
                    let circle = document.getElementById(`c${index + 1}`);
                    circle.style.top = `${Number(initPos.top) - Number(initPos.top) * (scrollValPer) + Number(pos.top) - Number(pos.top) * (1-scrollValPer)}%`;
                    circle.style.left = `${Number(initPos.left) - Number(initPos.left) * (scrollValPer) + Number(pos.left) - Number(pos.left) * (1-scrollValPer)}%`;
                })

                console.log("Moving!");
            }
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', handleScroll);
                } else {
                    window.removeEventListener('scroll', handleScroll);
                }
            });
        });

        const refPoint = aboutRef.current;
        if (refPoint) {
            observer.observe(refPoint);
        }

        return () => {
            if (refPoint) {
                observer.unobserve(refPoint);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={aboutRef} id="about" className="about">
            <div className="about-text">
                <p>We use <span className="magic">
                    <span className="magic-text">AI-Powered </span> </span> Tools</p>
                <p>to convert media files </p>
                <p>into text</p>
            </div>
            {Array.from({ length: 9 }).slice(1).map((num, index) => {
                return <div className="circle" key={index + 1} id={`c${index + 1}`}></div>
            })}
        </div >
    );
}


