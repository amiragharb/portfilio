import type { Message } from '../types';

type KnowledgeRule = {
  terms: string[];
  response: string;
};

const rules: KnowledgeRule[] = [
  {
    terms: ['mybiat', 'biat', 'value', 'backbase', 'voice banking', 'kyc'],
    response: "At **VALUE** (January–July 2026), Amira contributed to iOS development for **MyBiat Retail** on the Backbase platform. She worked on conversational banking, voice interactions, and AI-assisted KYC, and completed 20 Backbase Launchpad modules covering Journeys, UI development, and business logic.",
  },
  {
    terms: ['emart', 'e-mart', 'e-commerce', 'ecommerce', 'multi-store'],
    response: "**eMart** is a modular, multi-store e-commerce app Amira built with Flutter. It lets businesses manage multiple online stores from one codebase and uses TypeScript APIs and Azure data tools.",
  },
  {
    terms: ['egyco', 'egypt', 'event booking', 'event app'],
    response: "**EGYCOPT** is a Flutter app for discovering Christian events and booking appointments in Egypt. Amira modernized its interface and core booking flows.",
  },
  {
    terms: ['alz', 'alzheimer', 'memory companion'],
    response: "**AlzMind** is an AI-powered mobile companion concept for Alzheimer’s care. Its features include memory aids, cognitive training, health tracking, voice assistance, GPS safety support, and communication between caregivers and doctors.",
  },
  {
    terms: ['cosmia', 'astrology', 'dating app'],
    response: "**Cosmia** is an astrology-based dating app Amira developed with Flutter. It includes AI features and secure authentication, with MongoDB and Firebase in its technology stack.",
  },
  {
    terms: ['choubik', 'restaurant', 'reservation', 'vr'],
    response: "**CHOUBIKLOUBIK** is an intelligent restaurant reservation project with voice-based ordering, table booking, and a chatbot for recommendations. It also included a VR training module built with Unity.",
  },
  {
    terms: ['banking chatbot', 'chatbot project', 'bank chatbot'],
    response: "Amira’s **Banking Chatbot** project used React, Firebase, and AI APIs to provide conversational banking support and help with secure transactions.",
  },
  {
    terms: ['project', 'projects', 'portfolio work', 'app', 'apps', 'application', 'applications', 'what has she built', 'what did she build'],
    response: "Amira’s featured projects include **MyBiat Retail** (AI-enabled banking), **eMart** (multi-store e-commerce), **EGYCOPT** (event booking), **AlzMind** (AI support for Alzheimer’s care), **Cosmia** (astrology-based dating), **CHOUBIKLOUBIK** (voice-led restaurant reservations), and a **Banking Chatbot**.",
  },
  {
    terms: ['experience', 'experiences', 'internship', 'intern', 'work history', 'career', 'itspark', 'exypnotech', 'proxym'],
    response: "Amira’s experience includes an iOS developer internship at **VALUE** working on MyBiat Retail and AI banking features; a Flutter developer internship at **ITSPARK** on eMart and EGYCOPT; a mobile developer internship at **ExypnoTech** building a fish-crate management app; and an AI developer internship at **PROXYM** developing a banking chatbot.",
  },
  {
    terms: ['technology', 'technologies', 'tech stack', 'tools', 'programming language', 'framework', 'skill', 'skills', 'ai', 'llm', 'machine learning', 'ios', 'flutter', 'swift', 'web'],
    response: "Amira’s toolkit includes **Swift, Flutter, Dart, React Native, React, Python, TypeScript, JavaScript, Java, and C++**; backend frameworks such as **Node.js, Express, Next.js, Angular, Spring, and Symfony**; **MongoDB, MySQL, Firebase, and Azure**; plus **Docker, GitLab, Figma, Postman, and Unity**. She also works with AI, machine learning, and LLM-powered applications.",
  },
  {
    terms: ['study', 'studies', 'education', 'university', 'marburg', 'degree', 'tunisia', 'germany'],
    response: "Amira completed her engineering studies in Tunisia and moved to Germany to continue studying computer science at **Philipps University of Marburg**. She is originally from Tunisia and is now based in Marburg.",
  },
  {
    terms: ['contact', 'email', 'linkedin', 'github', 'reach', 'phone'],
    response: "You can contact Amira at **amira.gharbi@esprit.tn**, connect on [LinkedIn](https://www.linkedin.com/in/amira-gharbi/), or see her code on [GitHub](https://github.com/amiragharb). The contact section also has direct links.",
  },
  {
    terms: ['about', 'who is amira', 'who amira', 'background', 'tell me about'],
    response: "Amira Gharbi is a mobile developer and computer science student at Philipps University of Marburg. After completing her engineering studies in Tunisia, she moved to Germany. She builds iOS, Flutter, web, and AI/LLM-powered applications.",
  },
];

const normalize = (text: string) => text
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9+#.\s-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const matchesTerm = (query: string, term: string) => {
  const normalizedTerm = normalize(term);
  if (normalizedTerm.includes(' ')) return query.includes(normalizedTerm);
  return query.split(' ').some((word) => word === normalizedTerm);
};

const findPreviousTopic = (history: Message[]) => {
  const lastQuestion = [...history].reverse().find((message) => message.sender === 'user')?.text ?? '';
  return lastQuestion ? normalize(lastQuestion) : '';
};

export const getChatbotResponse = async (history: Message[], newUserMessage: string): Promise<string> => {
  const query = normalize(newUserMessage);
  const followUp = /^(tell me more|more|details|what else|can you explain|go on|and then)\b/.test(query);
  const searchText = followUp ? `${query} ${findPreviousTopic(history)}` : query;

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(query)) {
    return "Hi! I’m Luna, Amira’s portfolio assistant. Ask me about her projects, experience, studies, or technologies.";
  }
  if (/\b(thanks|thank you|thx)\b/.test(query)) {
    return "You’re welcome! If you’d like to know more about Amira’s work, just ask.";
  }
  if (/\b(help|what can you do|what can i ask)\b/.test(query)) {
    return 'I can answer questions about Amira’s **projects, work experience, education, technologies, and contact links**.';
  }

  const match = rules.find(({ terms }) => terms.some((term) => matchesTerm(searchText, term)));
  return match?.response ?? "I can answer questions using the information in Amira’s portfolio. Try asking about her projects, VALUE internship, studies in Marburg, technologies, or contact details.";
};
