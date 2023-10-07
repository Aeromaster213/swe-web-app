import React, { useEffect, useState } from "react";
import './about.css';

export default function About() {
    const [circles, setCircles] = useState([]);
    const [lines, setLines] = useState([]);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const genCircles = () => {
        const newCircles = [];
        for (let i = 0; i < 10; i++) {
            const circle = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
            }
            newCircles.push(circle);
        }

        setCircles(newCircles);
    }

    const handleMouseMove = (e) => {
        console.log("Handle mouse move");
        setMouse({
            x: e.clientX,
            y: e.clientY,
        });

        const updateCirclesLines = circles.map((circle) => {
            const distance = Math.sqrt(Math.pow(circle.x - e.clientX, 2) + Math.pow(circle.y - e.clientY));
            if (distance < 30) {
                const newLine = {
                    x1: circle.x,
                    x2: e.clientX,
                    y1: circle.y,
                    y2: e.clientY
                }
                const newLines = [...lines, newLine];
                setLines(newLines.filter((line) => line !== null));
                const angle = Math.atan2(circle.y - e.clientY, circle.x - e.clientX);
                const newX = Math.cos(angle) * distance + e.clientX;
                const newY = Math.sin(angle) * distance + e.clientY;
                return { x: newX, y: newY };
            }
            return circle;
        });

        setCircles(updateCirclesLines)
    }

    useEffect(() => {
        genCircles();
    }, []);

    return (
        <div className="about" onMouseMove={handleMouseMove}>
            {lines.map((line, index) => (
                <svg key={index} className="line">
                    <line
                        x1={line.x1}
                        x2={line.x2}
                        y1={line.y1}
                        y2={line.y2}

                        stroke="#ffffff"
                    />
                </svg>
            ))}

            {circles.map((circle, index) => (
                <div
                    key={index}
                    className="circle"
                    style={{ top: circle.y, left: circle.x }}
                >
                </div>
            ))}
        </div>
    );
}