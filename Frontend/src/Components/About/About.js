import React, { useEffect, useRef } from "react";
import './about.css';

export default function About() {
    const aboutRef = useRef(null);
    
    useEffect(() => {
        const handleScroll = () => {
            const c1 = document.getElementById('c1');
            let refPoint = aboutRef.current;
            if (refPoint) {
                let scrollVal = window.scrollY - refPoint.getBoundingClientRect().top;
                c1.style.left = scrollVal * 2.5 + 'px';
                c1.style.marginTop = scrollVal / 3 + 'px';
                console.log("Moving!");
            }
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', handleScroll);
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
                <p>We use <span className="magic">AI-Powered</span> Tools</p>
                <p>to convert media files </p>
                <p>into text</p>
            </div>

            <div className="circle" id="c1"></div>
            <div className="circle" id="c2"></div>
            <div className="circle" id="c3"></div>
            <div className="circle" id="c4"></div>
            <div className="circle" id="c5"></div>
            <div className="circle" id="c6"></div>
            <div className="circle" id="c7"></div>
            <div className="circle" id="c8"></div>
        </div>
    );}    


