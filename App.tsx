import React, { useState } from 'react';
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
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return window.localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
      'content',
      nextTheme === 'light' ? '#f7f5f8' : '#09070d',
    );
    try {
      window.localStorage.setItem('portfolio-theme', nextTheme);
    } catch {
      // The selected theme still applies for this visit when storage is unavailable.
    }
  };

  return (
    <div className="portfolio-shell" data-theme={theme}>
      <AnimatedBackground />

      <Header theme={theme} onToggleTheme={toggleTheme} />
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
