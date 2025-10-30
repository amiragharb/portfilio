import React from 'react';
import { Briefcase } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceProps {
    experiences: Experience[];
}

const ExperienceItem: React.FC<{ item: Experience; index: number }> = ({ item, index }) => {
    const isLeft = index % 2 === 0;
    return (
        <div className="relative">
            <div className="hidden md:block absolute w-0.5 h-full bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 top-0 left-1/2 -translate-x-1/2"></div>
            <div className={`mb-8 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12"></div>
                <div className="z-10 flex items-center bg-primary text-primary-foreground w-8 h-8 rounded-full shadow-lg shadow-primary/30 justify-center animate-pulse">
                    <Briefcase className="w-4 h-4" />
                </div>
                <div className="w-full md:w-5/12">
                    <div className="animate-slide-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                        <div className="p-6 aurora-card rounded-lg shadow-lg h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 group">
                            <p className="text-sm text-muted-foreground mb-1">{item.period}</p>
                            <h3 className="text-lg font-bold text-card-foreground">{item.title}</h3>
                            <p className="text-md font-medium text-primary mb-3">{item.company}</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {item.details.map((detail, i) => <li key={i}>{detail}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ExperienceComponent = React.forwardRef<HTMLElement, ExperienceProps>(({ experiences }, ref) => {
    return (
        <section ref={ref} id="experience" className="py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative text-primary">
                Professional Experience
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
            </h2>
            <div className="relative">
                <div className="absolute w-0.5 h-full bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 top-0 left-1/2 -translate-x-1/2 hidden md:block"></div>
                {experiences.map((item, index) => (
                    <ExperienceItem key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
});

export default ExperienceComponent;
