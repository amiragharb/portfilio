import React from 'react';
import SectionWrapper from './SectionWrapper';

const About: React.FC = () => {
  return (
    <SectionWrapper id="about" title="About Me">
      <div className="about-layout">
        <div className="about-journey" aria-label="My path from Tunisia to Germany">
          <div className="about-journey-top"><span><i /> FIELD NOTE / 01</span><span>TN → DE</span></div>
          <div className="about-map">
            <div className="about-map-land about-map-land-one" />
            <div className="about-map-land about-map-land-two" />
            <svg className="about-route-path" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
              <path className="about-route-line" d="M72 231 C115 204 115 126 174 137 C228 148 230 80 302 67" />
              <circle className="about-route-traveler" r="5"><animateMotion dur="5s" repeatCount="indefinite" path="M72 231 C115 204 115 126 174 137 C228 148 230 80 302 67" /></circle>
            </svg>
            <div className="about-place about-place-tunisia"><span>TN</span><div><b>TUNISIA</b><small>Engineering foundation</small></div></div>
            <div className="about-place about-place-germany"><span>DE</span><div><b>MARBURG</b><small>Computer science</small></div></div>
            <span className="about-map-label about-map-label-a">MEDITERRANEAN SEA</span>
            <span className="about-map-label about-map-label-b">A NEW CHAPTER</span>
          </div>
          <div className="about-journey-bottom"><span>PHILIPPS-UNIVERSITÄT</span><span>51.00° N · 8.76° E</span></div>
        </div>
        <div className="about-story">
          <div className="about-story-label"><span>01</span><span>THE STORY SO FAR</span><i /></div>
          <p className="about-lead">From Tunisia to Germany, I’m growing at the intersection of <em>computer science, mobile engineering, and AI.</em></p>
          <div className="about-copy">
            <p>After completing my engineering studies in Tunisia, I moved to Germany to continue studying computer science at Philipps University of Marburg. I build iOS and Flutter applications and explore practical ways to bring AI into mobile products.</p>
          </div>
          <div className="about-focus"><span>FOCUS AREAS</span><b>iOS</b><b>FLUTTER</b><b>AI / LLM</b></div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
