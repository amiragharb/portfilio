import React from 'react';

const Hero: React.FC = () => (
  <section id="top" className="hero-section">
    <div className="hero-copy">
      <p className="eyebrow"><span className="status-dot" /> AI systems <span className="eyebrow-divider">×</span> mobile engineering <span className="eyebrow-divider">/</span> Marburg, Germany</p>
      <h1>Junior in<br /><span>Computer</span><span>Science.</span></h1>
      <p className="hero-description">
        I’m Amira, a junior computer science student. After completing my engineering studies in Tunisia, I moved to Germany to study at Philipps University of Marburg. I build AI and LLM-powered applications for mobile and web.
      </p>
      <div className="hero-actions">
        <a className="button-primary" href="#projects">Explore my work <span aria-hidden="true">↗</span></a>
        <a className="button-text" href="#about">A little about me <span aria-hidden="true">↓</span></a>
      </div>
      <div className="hero-facts">
        <div><strong>AI / ML</strong><span>intelligent systems</span></div>
        <div><strong>DE</strong><span>building in Germany</span></div>
      </div>
    </div>

    <div className="hero-art" aria-label="Abstract illustration of connected ideas">
      <div className="art-grid" />
      <div className="art-topline"><span><i /> SYSTEM LIVE</span><span>NEURAL MAP / 001</span></div>
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="art-sun" aria-label="Rotating Earth representing Amira's work across countries">
        <img className="earth-globe" src="/images/earth-globe.svg" alt="" />
        <small>CORE / 01</small>
      </div>
      <div className="art-label label-ai"><span className="label-icon">✳</span><span><b>INTELLIGENCE, APPLIED</b><small>LLMs · VOICE · BANKING</small></span></div>
      <div className="art-label label-mobile"><span className="label-icon">▯</span><span><b>BUILT FOR PEOPLE</b><small>iOS · FLUTTER · WEB</small></span></div>
      <div className="art-caption"><span>SYSTEM MAP / AMIRA.G</span><span>STATUS <i>ONLINE</i></span></div>
      <span className="art-spark spark-one">✳</span>
      <span className="art-spark spark-two">✳</span>
    </div>
  </section>
);

export default Hero;
