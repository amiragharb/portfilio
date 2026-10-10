import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Technologies from './components/Technologies';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import AnimatedBackground from './components/AnimatedBackground';

const App: React.FC = () => {
  return (
    <div className="portfolio-shell">
      <AnimatedBackground />

      <Header />
      <main className="portfolio-main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Technologies />
        <Contact />
      </main>
      <footer className="portfolio-footer">
        <p>Designed & built by Amira Gharbi <span>© {new Date().getFullYear()}</span></p>
      </footer>
      <Chatbot />
    </div>
  );
};

export default App;
