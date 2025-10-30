import React from 'react';

interface CertificationsProps {
	certifications?: string[];
	languages?: { [key: string]: string } | undefined;
}

const Certifications = React.forwardRef<HTMLElement, CertificationsProps>(({ certifications = [], languages = {} }, ref) => {
	return (
		<>
			{/* Certifications section */}
			<section id="certifications" ref={ref} className="py-24">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative text-white">
					Certifications
					<span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
				</h2>
				<div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
					{certifications.length === 0 ? (
						<div className="animate-slide-in-up">
							<div className="aurora-card rounded-lg p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 group">
								<p className="text-muted-foreground">No certifications listed.</p>
							</div>
						</div>
					) : (
						certifications.map((c, i) => (
							<div key={c} className="animate-slide-in-up" style={{ animationDelay: `${i * 80}ms` }}>
								<div className="aurora-card rounded-lg p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 group">
									<h3 className="text-lg font-bold mb-2 text-card-foreground">{c}</h3>
								</div>
							</div>
						))
					)}
				</div>
			</section>

			{/* Languages section */}
			<section id="languages" className="py-24">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative text-white">
					Languages
					<span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{Object.entries(languages).length === 0 ? (
						<div className="animate-slide-in-up">
							<div className="aurora-card rounded-lg p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 group">
								<p className="text-muted-foreground">No languages listed.</p>
							</div>
						</div>
					) : (
						Object.entries(languages).map(([lang, prof], i) => (
							<div key={lang} className="animate-slide-in-up" style={{ animationDelay: `${i * 80}ms` }}>
								<div className="aurora-card rounded-lg p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 group">
									<h3 className="text-xl font-bold mb-2 text-card-foreground">{lang}</h3>
									<p className="text-muted-foreground">{prof}</p>
								</div>
							</div>
						))
					)}
				</div>
			</section>
		</>
	);
});

export default Certifications;
