import React from 'react';
import { Sparkles } from 'lucide-react';
import { Skills as SkillsType } from '../../types';

interface SkillsProps {
    skills: SkillsType;
}

const Skills = React.forwardRef<HTMLElement, SkillsProps>(({ skills }, ref) => {
    return (
        <section ref={ref} id="skills" className="py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative text-primary">
                Skills
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, items], index) => (
                    <div key={category} className="animate-slide-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                        <div className="aurora-card rounded-lg p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 group">
                            <h3 className="text-xl font-bold mb-2 text-card-foreground">{category}</h3>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {(items as string[]).map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default Skills;
