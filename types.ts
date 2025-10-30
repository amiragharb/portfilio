export interface Contact {
  email: string;
  linkedin: string;
  github: string;
}

export interface Experience {
  year: number;
  title: string;
  company: string;
  period: string;
  details: string[];
}

export interface Education {
  school: string;
  program: string;
  period: string;
}

export interface Project {
  name: string;
  desc: string;
  tech: string[];
  year?: number;
  // React types are not imported here to keep this file lightweight in the project setup
  // Use `any` for icon components to avoid requiring React types in this module
  icon?: any;
}

export interface Skills {
  [key: string]: string[];
}

export interface CVData {
  name: string;
  headline: string;
  summary: string;
  contact: Contact;
  education?: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  certifications?: string[];
  languages?: { [key: string]: string };
}

export interface Message {
  text: string;
  sender: 'user' | 'ai';
}
