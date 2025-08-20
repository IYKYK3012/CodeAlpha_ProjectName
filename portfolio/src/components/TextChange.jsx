import React, { useState, useEffect } from "react";

const TextChange = () => {
    const texts = ["Graphic Designer", "Frontend Developer", "AI Enthusiast"];
    const [currentText, setCurrentText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [isForward, setIsForward] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const fullText = texts[index];

            // Update the current displayed text
            setCurrentText(fullText.substring(0, charIndex));

            // Update character index
            if (isForward) {
                setCharIndex(prev => prev + 1);
                if (charIndex > fullText.length + 10) {
                    setIsForward(false);
                }
            } else {
                setCharIndex(prev => prev - 1);
                if (charIndex < 0) {
                    setIsForward(true);
                    setIndex(prev => (prev + 1) % texts.length); // Go to next text in loop
                }
            }
        }, 40); // You can slow down or speed up the typing here

        return () => clearInterval(intervalId);
    }, [charIndex, isForward, index, texts]);

    return (
        <div className="transition ease duration-300">
            {currentText}
        </div>
    );
};

export default TextChange;
