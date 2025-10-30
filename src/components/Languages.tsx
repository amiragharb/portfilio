import React from 'react';

interface LanguagesProps {
    languages?: { [key: string]: string } | null;
}

const Languages = React.forwardRef<HTMLElement, LanguagesProps>(({ languages = {} }, ref) => {
    return (
        <section ref={ref} id="languages" className="py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative text-primary">
                Languages
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="animate-slide-in-up">
                    <div className="aurora-card rounded-lg p-6 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                        <h3 className="text-xl font-bold mb-4 text-card-foreground">Languages</h3>
                        <div className="flex flex-wrap gap-3">
                            {Object.entries(languages || {}).length === 0 ? (
                                <span className="text-muted-foreground">No languages specified.</span>
                            ) : (
                                Object.entries(languages).map(([lang, level]) => (
                                    <div key={lang} className="px-3 py-2 bg-secondary text-secondary-foreground rounded-md text-sm">
                                        <strong className="mr-2">{lang.toUpperCase()}</strong>
                                        <span className="text-muted-foreground">{level}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Languages;
