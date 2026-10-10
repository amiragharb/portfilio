
export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export interface Project {
  year: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  description: string[];
}