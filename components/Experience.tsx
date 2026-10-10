import React from 'react';
import SectionWrapper from './SectionWrapper';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import type { ExperienceItem } from '../types';

const experienceData: ExperienceItem[] = [
  {
    date: 'Jan - Jul 2026',
    title: 'Mobile iOS Developer Intern',
    company: 'VALUE, Tunis, Tunisia',
    description: [
      'Enhanced the MyBiat Retail mobile banking application as an iOS developer on the Backbase platform.',
      'Completed 20 Backbase Launchpad modules covering Journeys, UI development, and business logic.',
      'Contributed to AI banking features including conversational, voice, and KYC experiences.',
    ],
  },
  {
    date: 'Jul 2025 - Jul 2026',
    title: 'Flutter Developer Intern',
    company: 'ITSPARK, Alexandria, Egypt',
    description: [
      'Built eMart, a modular multi-store e-commerce app with Flutter and TypeScript APIs.',
      'Modernized EgyCoPt, a mobile app for discovering Christian events and booking appointments.',
      'Designed product flows and interfaces in Figma and worked with Azure data tools.',
    ],
  },
  {
    date: 'Jun - Aug 2024',
    title: 'Mobile Developer Intern',
    company: 'ExypnoTech, Tunisia',
    description: [
      'Designed and built a Flutter app to help fishermen manage fish crates and operations.',
      'Created the app UI/UX in Figma and connected it to an Express.js and MongoDB backend.',
    ],
  },
  {
    date: 'Jul - Aug 2023',
    title: 'AI Developer Intern',
    company: 'PROXYM, Tunisia',
    description: [
      'Developed a React banking chatbot using AI APIs, NLP, and Firebase.',
      'Worked on conversational flows for banking questions and user support.',
    ],
  },
];

const ExperienceCard: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });

    return (
        <article
            ref={ref}
            className={`experience-item ${isVisible ? 'is-visible' : ''}`}
        >
            <div className="experience-card">
              <div className="experience-meta"><span className="experience-date">{item.date}</span><span className="experience-company">{item.company}</span><span className="experience-index">0{index + 1}</span></div>
              <h3>{item.title}</h3>
              <ul>{item.description.map((desc, i) => <li key={i}>{desc}</li>)}</ul>
            </div>
        </article>
    );
};


const Experience: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper id="experience" title="Experience">
      <div ref={ref} className={`experience-list ${isVisible ? 'is-visible' : ''}`}>
        {experienceData.map((item, index) => (
          <ExperienceCard key={index} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
