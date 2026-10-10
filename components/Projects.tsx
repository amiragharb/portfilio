import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import SectionWrapper from './SectionWrapper';
import type { Project } from '../types';

const projectsData: Project[] = [
  {
    year: '2026',
    title: 'MyBiat Retail - AI-Powered Banking',
    description: 'At VALUE, contributed to iOS development and AI feature integration for the MyBiat Retail banking app on Backbase. Worked on conversational banking, voice interactions, and AI-assisted KYC, alongside completing 20 Backbase Launchpad modules in Journeys, UI development, and business logic.',
    technologies: ['iOS', 'Backbase', 'AI Chatbot', 'Voice Banking', 'AI KYC', 'Journeys'],
  },
  {
    year: '2025',
    title: 'eMart - Multi-Store E-commerce App',
    description: 'Built a modular Flutter platform that lets businesses create and manage multiple online stores from one codebase. Designed the UI/UX in Figma and integrated TypeScript APIs and data services.',
    technologies: ['Flutter', 'Dart', 'TypeScript APIs', 'Azure', 'Firebase', 'Figma'],
  },
  {
    year: '2025',
    title: '"EGYCOPT" - Event Booking Mobile App',
    description: 'Modernized a Flutter app for discovering Christian events and booking appointments in Egypt, improving its interface and core booking flows.',
    technologies: ['Flutter (MVVM)', 'Firebase', 'Azure DB', 'Figma'],
  },
  {
    year: '2025',
    title: '"AlzMind" - Mobile AI Companion for Alzheimer\'s Care',
    description: 'Developed an AI-powered mobile application designed to assist Alzheimer\'s patients through memory aids, cognitive training, and health tracking. Integrated an AI API and a 3D avatar for real-time interaction and intelligent symptom detection. Implemented voice assistance, GPS tracking for patient safety, and real-time communication features between caregivers and doctors.',
    technologies: ['Flutter', 'TypeScript', 'MongoDB', 'Firebase', 'Figma', 'AI API'],
  },
  {
    year: '2024',
    title: '"Cosmia" - Astrology-Based Dating App',
    description: 'Developed a mobile app that connects users based on astrological compatibility. Integrated AI features, secure authentication (PIN & facial recognition), and a scalable backend for real-time data.',
    technologies: ['Flutter', 'iOS', 'Android', 'MongoDB', 'Firebase', 'AI API', 'Typescript'],
  },
  {
    year: '2024',
    title: '"CHOUBIKLOUBIK" - Intelligent Restaurant Reservation',
    description: 'Developed an AI-powered platform that allows users to order meals and book restaurant tables through natural voice conversations. Integrated a smart chatbot for real-time interaction and personalized recommendations. Designed and deployed a VR training module for an immersive experience.',
    technologies: ['Symfony', 'XAMPP', 'AI API', 'Firebase', 'Unity (VR)', 'Figma'],
  },
  {
    year: '2023',
    title: '"Banking Chatbot" - AI Mobile Application',
    description: 'Developed a mobile banking chatbot using conversational AI to enable secure transactions and real-time customer support.',
    technologies: ['React', 'Firebase', 'AI API'],
  },
];

const projectEmblems = ['✳', 'e', 'EG', '✦', '♡', 'VR', 'AI'];

const ProjectCard: React.FC<{ project: Project; onSelect: () => void; index: number }> = ({ project, onSelect, index }) => {
    return (
        <button
            type="button"
            className="project-card"
            data-mark={`0${index + 1}`}
            onClick={onSelect}
            aria-haspopup="dialog"
            data-interactive
        >
            <span className="project-art" aria-hidden="true">
                <span className="project-art-orbit project-art-orbit-one" />
                <span className="project-art-orbit project-art-orbit-two" />
                <span className="project-art-core">{projectEmblems[index]}</span>
                <span className="project-art-satellite" />
            </span>
            <div className="project-card-content">
                <p className="project-year">{project.year}<span aria-hidden="true"> ↗</span></p>
                <h3>{project.title.replaceAll('"', '')}</h3>
                <p className="project-description">
                    {project.description}
                </p>
                <div className="project-techs">
                    {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech}>{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span>+{project.technologies.length - 3} more</span>
                    )}
                </div>
            </div>
        </button>
    );
};

const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
    if (!project) return null;

    const sparkTrails = [
        ['-320px', '-190px'], ['-210px', '-310px'], ['-60px', '-350px'], ['130px', '-300px'],
        ['310px', '-205px'], ['360px', '-35px'], ['300px', '160px'], ['180px', '280px'],
        ['-10px', '340px'], ['-190px', '270px'], ['-330px', '130px'], ['-370px', '-30px'],
    ];

    return createPortal(
        <div
            className="project-modal-backdrop"
            onClick={onClose}
        >
            <div className="project-magic-sparks" aria-hidden="true">
                {sparkTrails.map(([x, y], index) => (
                    <span key={index} style={{ '--spark-x': x, '--spark-y': y, '--spark-delay': `${index * 24}ms` } as React.CSSProperties} />
                ))}
            </div>
            <div
                className="project-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="project-modal-close"
                    aria-label="Close project details"
                    data-interactive
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <p className="project-year">{project.year}</p>
                <h2 id="project-modal-title">{project.title.replaceAll('"', '')}</h2>
                <p className="project-modal-description">{project.description}</p>
                <div>
                    <h4>Technologies used</h4>
                    <div className="project-tags">
                        {project.technologies.map(tech => (
                             <span key={tech}>{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};

const Projects: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <SectionWrapper id="projects" title="Projects">
            <div className="project-grid">
                {projectsData.map((proj, index) => (
                    <ProjectCard key={proj.title} project={proj} index={index} onSelect={() => setSelectedProject(proj)} />
                ))}
            </div>
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </SectionWrapper>
    );
};

export default Projects;
