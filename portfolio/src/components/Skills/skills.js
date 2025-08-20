import React from 'react';
import './skills.css';
import UIDesign from '../../assets/ui-design.png';
import WebDesign from '../../assets/website-design.png';
import AppDesign from '../../assets/app-design.png';

const Skills = () => {
    return (
        <section id='skills'>
            <span className="skillTitle">What I do</span>
            <span className="skillDesc">I create visually appealing and user-centric designs that bring clarity and creativity together. I develop smooth, responsive web experiences that feel intuitive and engaging across all devices. With a curiosity for innovation, I also explore AI to craft smarter, more interactive digital solutions.</span>
            <div className="skillBars">
                <div className="skillBar">
                    <img src={UIDesign} alt="UIDesign" className="skillBarImg" />
                    <div className="skillBarText">
                        <h2>UI/UX Design</h2>
                        <p>I design clean, intuitive user interfaces with a focus on user experience and visual harmony.</p>
                    </div>
                </div>
                <div className="skillBar">
                    <img src={WebDesign} alt="WebDesign" className="skillBarImg" />
                    <div className="skillBarText">
                        <h2>Website Development</h2>
                        <p>I build responsive and interactive websites using HTML, CSS, and JavaScript, along with MERN stack technologies.</p>
                    </div>
                </div>
                <div className="skillBar">
                    <img src={AppDesign} alt="AppDesign" className="skillBarImg" />
                    <div className="skillBarText">
                        <h2>AI Enthusiast</h2>
                        <p>I explore AI-driven ideas and love blending smart tech into creative front-end solutions.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;