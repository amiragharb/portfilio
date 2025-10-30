import React, { useState, useEffect } from 'react';
import { Sun, Moon, BrainCircuit } from 'lucide-react';

interface HeaderProps {
    activeSection: string;
}

const navItems = [
    { id: 'home', title: 'Home' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'skills', title: 'Skills' },
    { id: 'certifications', title: 'Certifications' },
    { id: 'languages', title: 'Languages' },
    { id: 'contact', title: 'Contact' },
];

const ThemeToggle: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        if (!isDark) {
            document.documentElement.classList.add('dark');
        }
        setIsDarkMode(true);
    }, []);
    
    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
        >
            {isDarkMode ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-accent" />}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'py-3 bg-background/60 backdrop-blur-lg border-b border-border/20' : 'py-5'}`}>
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <a href="#home" className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <BrainCircuit className="w-6 h-6 text-primary"/>
                    Amira Gharbi
                </a>
                <nav className="hidden md:flex items-center gap-1 bg-secondary/30 border border-border/20 p-1 rounded-full">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`relative px-4 py-1.5 text-sm font-medium transition-colors ${activeSection === item.id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {activeSection === item.id && (
                                <span className="absolute inset-0 bg-primary rounded-full -z-10" />
                            )}
                            {item.title}
                        </a>
                    ))}
                </nav>
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
