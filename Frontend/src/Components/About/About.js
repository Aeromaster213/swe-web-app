import React, { useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
import './about.css';

export default function About() {
    const aboutRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const c1 = document.getElementById('c1');
            let refPoint = aboutRef.current;
            if (refPoint) {
                let scrollVal = window.scrollY - refPoint.getBoundingClientRect().top;
                // c1.style.left = scrollVal * 2.5 + 'px';
                // c1.style.marginTop = scrollVal / 3 + 'px';
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

    // let index = 0, interval = 1000;

    // const rand = (min, max) =>
    //     Math.floor(Math.random() * (max - min + 1)) + min;

    // const animate = (star) => {
    //     star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    //     star.style.setProperty("--star-top", `${rand(-40, 80)}%`);
    //     console.log(star);
    //     star.style.animation = "none";
    //     void star.offsetHeight;
    //     star.style.animation = "";
    // }

    // useEffect(() => {
    //     for (const star of document.getElementsByClassName("magic-star")) {
    //         setTimeout(() => {
    //             animate(star);
    //             setInterval(() => animate(star), 1000);
    //         }, index++ * (interval / 3));
    //     }
    // })

    return (
        <div ref={aboutRef} id="about" className="about">
            <div className="about-text">
                <p>We use <span className="magic">
                    {/* <span className="magic-star"><FontAwesomeIcon icon={faStar} /></span>
                    <span className="magic-star"><FontAwesomeIcon icon={faStar} /></span>
                    <span className="magic-star"><FontAwesomeIcon icon={faStar} /></span> */}
                    <span className="magic-text">AI-Powered </span> </span> Tools</p>
                <p>to convert media files </p>
                <p>into text</p>
            </div>
            {Array.from({length:9}).slice(1).map((num, index)=>{
                return <div className="circle" key={index+1} id={`c${index+1}`}>{index+1}</div>
            })}
        </div >
    );
}


