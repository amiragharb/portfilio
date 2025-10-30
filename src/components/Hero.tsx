import React from 'react';
const avatarImg = new URL('../assets/480039120_1330450714648861_5267311186417174711_n.jpg', import.meta.url).href;

interface HeroProps {
    name: string;
    headline: string;
    summary: string;
    contactEmail?: string;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(({ name, headline, summary, contactEmail }, ref) => {
    return (
        <section ref={ref} id="home" className="min-h-screen flex flex-col justify-center items-center text-center py-20 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                 <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] max-w-4xl max-h-4xl -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center animate-fade-in">
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 flex items-center justify-center animate-float">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-glow" />
                    <div className="absolute inset-4 bg-background rounded-full" />
                    <img
                        src={avatarImg}
                        alt={name}
                        className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover relative z-10 shadow-2xl"
                    />
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
                    {name}
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-primary mb-6">
                    {headline}
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground mb-10">
                    {summary}
                </p>
             <a
                href={contactEmail ? `mailto:${contactEmail}?subject=${encodeURIComponent("Let's Collaborate")}` : '#contact'}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
             >
                 Let's Collaborate
             </a>
            </div>
        </section>
    );
});

export default Hero;