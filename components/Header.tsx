import React, { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#technologies', label: 'Technologies' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationTarget = useRef('');
  const navigationTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      setIsScrolled(window.scrollY > 10);
      if (navigationTarget.current) {
        setActiveSection(navigationTarget.current);
        return;
      }
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atPageEnd) {
        setActiveSection('contact');
        return;
      }

      const activeLine = Math.min(window.innerHeight * 0.4, 240);
      const current = sections.filter((section) => section.getBoundingClientRect().top <= activeLine).at(-1);
      setActiveSection(current?.id ?? '');
    };

    const finishNavigation = () => {
      if (!navigationTarget.current) return;
      const target = navigationTarget.current;
      navigationTarget.current = '';
      window.clearTimeout(navigationTimer.current);
      setActiveSection(target);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    window.addEventListener('scrollend', finishNavigation);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      window.removeEventListener('scrollend', finishNavigation);
      window.clearTimeout(navigationTimer.current);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = document.querySelector<HTMLElement>(href);
    if (!section) return;
    setIsMenuOpen(false);
    navigationTarget.current = section.id;
    window.clearTimeout(navigationTimer.current);
    setActiveSection(section.id);

    if (section.classList.contains('portfolio-section')) {
      window.dispatchEvent(new CustomEvent('portfolio:magic-reveal', { detail: { id: section.id } }));
    }

    const link = e.currentTarget;
    link.classList.remove('is-clicking');
    window.requestAnimationFrame(() => link.classList.add('is-clicking'));
    window.setTimeout(() => link.classList.remove('is-clicking'), 850);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navigationTimer.current = window.setTimeout(() => {
      navigationTarget.current = '';
      setActiveSection(section.id);
    }, 1600);
  };

  return (
    <header className={`portfolio-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <nav className="portfolio-nav">
        <a href="#top" className="portfolio-brand" aria-label="Amira Gharbi, home">
          <span className="brand-mark">AG</span>
          <span>Amira Gharbi</span>
        </a>
        <button
          className="nav-menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="portfolio-section-links"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span>{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
          <span aria-hidden="true">{isMenuOpen ? '×' : '☰'}</span>
        </button>
        <ul id="portfolio-section-links" className={`portfolio-nav-links ${isMenuOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`portfolio-nav-link ${
                  `#${activeSection}` === link.href
                    ? 'is-active'
                    : ''
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a className={`nav-contact ${activeSection === 'contact' ? 'is-active' : ''}`} href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>CONTACT ME</a>
      </nav>
    </header>
  );
};

export default Header;
