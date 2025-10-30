import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Bot, Sparkles, Briefcase, Rocket, BrainCircuit, Store, CalendarCheck, ChefHat, MessageSquareHeart, Contact as ContactIcon } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Background from './components/Background';
import Languages from './components/Languages';

import Chatbot from './components/Chatbot';

import { CVData, Experience, Project } from '../types';
import ExperienceComponent from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';

import Contact from './components/Contact';
import Certifications from './components/certifications';


// --- DATA ---
const cvData: CVData = {
  name: 'Amira Gharbi',
  headline: "Artificial Intelligence & Software Development",
  summary: `Computer engineering student specialized in artificial intelligence and software development. With experience in team leadership, I combine technical expertise, strong organization, and a collaborative mindset to build technology that addresses real-world problems while valuing responsibility, teamwork, and continuous improvement. Skilled in UI/UX design, I create intuitive, user-centered interfaces that deliver smooth and engaging digital experiences.`,
  education: [
  { school: "ESPRIT – École Supérieure Privée d'Ingénierie et de Technologies, Tunisie", program: "Engineering Cycle in Computer Engineering — 3rd year (ongoing)", period: "2023 – Present" },
  { school: "ESPRIT – École Supérieure Privée d'Ingénierie et de Technologies, Tunisie", program: "Integrated Preparatory Cycle", period: "2022 – 2023" }
  ],
  skills: {
  languages: ["Java","C","C++","C#","Python","PHP","JavaScript","TypeScript","HTML","CSS","XML","Kotlin","Swift","Dart"],
    Frameworks: ["Flutter","React","Next.js","Node.js","Android","iOS","Symfony","Spring Boot"],
    Ai: ["Machine Learning","Deep Learning","LLMs"],
    Tools: ["Docker","XAMPP","Git","GitHub","GitLab CI/CD","Postman","Swagger","Firebase","Jira"],
    Db: ["SQL","Oracle","MongoDB","Azure Data Studio"],
    Design: ["Figma","Adobe Photoshop","Canva"]
  },
  experience: [
    {
      year: 2025,
      title: "Mobile Developer Intern (Engineering Internship)",
      company: "ITSpark, Alexandria, Egypt",
      period: "July – October 2025 (ongoing)",
      details: [
        "Development of eMart, an AI-powered mobile application that automatically generates personalized e-commerce stores.",
        "Contributed to EgyCoPt, a Christian event booking app in Egypt.",
        "Participated in maintenance, team coordination, and client meetings.",
        "Designed mobile applications and Figma prototypes (3yezDortoc)."
      ]
    },
    {
      year: 2024,
      title: "Frontend Developer Intern",
      company: "ExypnoTech (ACTIA Group incubation), Ariana, Tunisia",
      period: "July – August 2024",
      details: [
        "Frontend development of a mobile application for managing fishermen’s activities.",
        "Improved UI/UX and performance.",
        "Collaborated with the team and participated in client meetings."
      ]
    },
    {
      year: 2023,
      title: "AI Developer Intern",
      company: "PROXYM-IT, Sousse, Tunisia",
      period: "July – August 2023",
      details: [
        "Development of an intelligent chatbot integrated into a banking application.",
        "Designed and tested conversational features."
      ]
    }
  ],
  projects: [
  { year: 2025, name: 'eMart', desc: "AI-Powered Store Generator — mobile app that generates online stores.", tech: ["Flutter","Node.js","TypeScript","Azure DB","Firebase"] },
  { year: 2025, name: 'EgyCoPt', desc: "Event booking app for Christian events in Egypt.", tech: ["Flutter","Firebase","Azure DB","Figma"] },
  { year: 2025, name: 'AlzMind', desc: "Intelligent mobile companion for supporting Alzheimer’s patients.", tech: ["Flutter","TypeScript","MongoDB","Firebase"] },
  { year: 2024, name: 'Cosmia', desc: "Dating app based on astrology.", tech: ["Flutter","iOS","Android","MongoDB","Firebase"] },
  { year: 2024, name: 'ChoubikLoubik', desc: "Intelligent restaurant reservation platform (ESPRIT project — Top 2).", tech: ["Symfony","Unity","Firebase"] },
    { year: 2023, name: 'Banking Chatbot', desc: "Chatbot bancaire intelligent pour mobile.", tech: ["React","Firebase"] }
  ],
  certifications: [
    "Certified Hashgraph Developer",
    "AIESEC Leadership Development Certified",
    "Generative AI with Diffusion Models — NVIDIA",
    "Deep Learning — GoMyCode (In Progress)",
    "Deep Learning — NVIDIA (In Progress)"
  ],
  languages: { en: 'Fluent', ar: 'Native', fr: 'Fluent' },
  contact: { email: 'amira.gharbi@esprit.tn', linkedin: 'https://linkedin.com/in/amira-gharbi/', github: 'https://github.com/amiragharb' }
};

// --- TRANSLATION HELPERS ---
const englishTranslations = {
    headline: " AI Enthusiast | Mobile Developer | Full-Stack Engineer ",
    summary: "Computer Engineering student crafting intelligent, user-centric applications by merging advanced AI with intuitive mobile and web development."
};

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('home');
    const sectionRefs = {
        home: useRef<HTMLElement>(null),
        experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    certifications: useRef<HTMLElement>(null),
    languages: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    return (
        <div className="bg-background text-foreground transition-colors duration-300 relative z-0">
            <Background />
            <div className="relative z-10">
                <Header activeSection={activeSection} />
                <main className="container mx-auto px-4 md:px-8">
          <Hero 
            ref={sectionRefs.home}
            name={cvData.name}
            headline={englishTranslations.headline}
            summary={englishTranslations.summary}
            contactEmail={cvData.contact.email}
          />
                    <ExperienceComponent ref={sectionRefs.experience} experiences={cvData.experience as Experience[]} />
                    <Projects ref={sectionRefs.projects} projects={cvData.projects as Project[]} />
                    <Skills ref={sectionRefs.skills} skills={cvData.skills} />
                    <Certifications ref={sectionRefs.certifications} certifications={cvData.certifications} />
                    <Languages ref={sectionRefs.languages} languages={cvData.languages} />
                    <Contact ref={sectionRefs.contact} contact={cvData.contact} />
                </main>
            </div>
            <Chatbot cvData={cvData} />
        </div>
    );
};

export default App;
