import React from 'react';
import { Rocket } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
    projects: Project[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="aurora-card rounded-lg p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 group">
         {project.icon && <project.icon className="w-8 h-8 text-primary mb-4" />}
        <h3 className="text-xl font-bold mb-2 text-card-foreground">{project.name}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
                <span key={t} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">{t}</span>
            ))}
        </div>
    </div>
);

const Projects = React.forwardRef<HTMLElement, ProjectsProps>(({ projects }, ref) => {
    return (
        <section ref={ref} id="projects" className="py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative text-primary">
                Academic & Professional Projects
                 <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                     <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                         <ProjectCard project={project} />
                     </div>
                ))}
            </div>
        </section>
    );
});

export default Projects;
