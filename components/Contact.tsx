import React from 'react';
import SectionWrapper from './SectionWrapper';

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22"/></svg>
);
const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const ContactLink: React.FC<{href: string; icon: React.ReactNode; text: string;}> = ({ href, icon, text }) => (
     <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="contact-link">
          {icon}
          {text}
     </a>
);

const Contact: React.FC = () => {
  return (
    <SectionWrapper id="contact" title="Get In Touch">
      <div className="contact-layout">
        <div className="contact-copy">
          <div className="contact-status"><i /> OPEN TO GOOD IDEAS <span>·</span> MARBURG, DE</div>
          <p className="contact-intro">
            Have a thoughtful project, an interesting challenge, or just want to talk about technology? Send a signal. I’d love to hear what you’re imagining.
          </p>
          <div className="contact-links">
            <ContactLink href="mailto:amira.gharbi@esprit.tn" icon={<MailIcon />} text="Email me" />
            <ContactLink href="https://www.linkedin.com/in/amira-gharbi/" icon={<LinkedinIcon />} text="LinkedIn" />
            <ContactLink href="https://github.com/amiragharb" icon={<GithubIcon />} text="GitHub" />
            <ContactLink href="tel:+21699841671" icon={<PhoneIcon />} text="Call me" />
          </div>
        </div>
        <div className="contact-visual" aria-hidden="true">
          <span className="contact-orbit contact-orbit-one" />
          <span className="contact-orbit contact-orbit-two" />
          <span className="contact-orbit contact-orbit-three" />
          <div className="contact-core"><span>✳</span><b>LET’S<br />CONNECT</b></div>
          <div className="contact-coordinate">SIGNAL / AMIRA.G <i>●</i></div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
