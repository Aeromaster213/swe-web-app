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

        let refPoint = aboutRef.current;
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
        <div ref={aboutRef} className="about">
            <div className="about-text">
                <p>We use <span className="magic">AI-Powered</span> Tools</p>
                <p>to convert media files </p>
                <p>into text</p>
            </div>

            <div className="circle" id="c1"></div>
        </div>
    );}    


