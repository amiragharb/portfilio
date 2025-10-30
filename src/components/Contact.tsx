import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { Contact as ContactType } from '../../types';

interface ContactProps {
    contact: ContactType;
}

const Contact = React.forwardRef<HTMLElement, ContactProps>(({ contact }, ref) => {
    return (
        <footer ref={ref} id="contact" className="py-24 text-center border-t border-border/10 mt-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Let's Connect</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Open to collaboration and exciting opportunities in AI and Mobile Development.
            </p>
            <div className="flex justify-center items-center gap-6 mb-12">
                <a href={`mailto:${contact.email}`} aria-label="Email" className="p-4 bg-secondary/50 rounded-full hover:bg-primary/20 text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-110">
                    <Mail className="w-6 h-6" />
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-4 bg-secondary/50 rounded-full hover:bg-primary/20 text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-110">
                    <Linkedin className="w-6 h-6" />
                </a>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-4 bg-secondary/50 rounded-full hover:bg-primary/20 text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-110">
                    <Github className="w-6 h-6" />
                </a>
            </div>
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Amira Gharbi. Designed & Built with AI.
            </p>
        </footer>
    );
});

export default Contact;
