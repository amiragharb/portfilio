import React from 'react';
import SectionWrapper from './SectionWrapper';

const technologyGroups = [
  { title: 'Mobile', mark: '01', symbol: '◫', technologies: [['SW', 'Swift'], ['FL', 'Flutter'], ['DA', 'Dart'], ['RN', 'React Native']] },
  { title: 'Languages', mark: '02', symbol: '</>', technologies: [['PY', 'Python'], ['TS', 'TypeScript'], ['JS', 'JavaScript'], ['JV', 'Java'], ['C++', 'C++']] },
  { title: 'Backend & Frameworks', mark: '03', symbol: '{ }', technologies: [['N', 'Node.js'], ['EX', 'Express'], ['NX', 'Next.js'], ['AN', 'Angular'], ['SP', 'Spring'], ['SF', 'Symfony']] },
  { title: 'Databases & Cloud', mark: '04', symbol: '◉', technologies: [['MO', 'MongoDB'], ['MY', 'MySQL'], ['FB', 'Firebase'], ['AZ', 'Azure']] },
  { title: 'Tools', mark: '05', symbol: '✣', technologies: [['DO', 'Docker'], ['GL', 'GitLab'], ['FG', 'Figma'], ['PO', 'Postman'], ['UN', 'Unity']] },
];

const Technologies: React.FC = () => {
  const technologyCount = technologyGroups.reduce((total, group) => total + group.technologies.length, 0);

  return (
    <SectionWrapper
      id="technologies"
      title="Technologies"
      meta={<span className="tech-toolkit-count">{technologyCount} technologies <i>·</i> {technologyGroups.length} fields</span>}
    >
      <div className="tech-constellation" aria-label="Five connected technology fields">
        <svg className="tech-constellation-path" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
          <path className="tech-path-base" d="M 70 62 C 170 62, 170 31, 280 31 S 390 89, 500 62 S 610 31, 720 31 S 830 62, 930 62" />
          <path className="tech-path-pulse" d="M 70 62 C 170 62, 170 31, 280 31 S 390 89, 500 62 S 610 31, 720 31 S 830 62, 930 62" />
        </svg>
        <div className="tech-constellation-node"><span>{technologyGroups[0].symbol}</span><b>Mobile</b></div>
        <div className="tech-constellation-node"><span>{technologyGroups[1].symbol}</span><b>Languages</b></div>
        <div className="tech-constellation-node"><span>{technologyGroups[2].symbol}</span><b>Frameworks</b></div>
        <div className="tech-constellation-node"><span>{technologyGroups[3].symbol}</span><b>Cloud & data</b></div>
        <div className="tech-constellation-node"><span>{technologyGroups[4].symbol}</span><b>Tools</b></div>
      </div>
      <div className="tech-toolkit-grid">
        {technologyGroups.map(group => (
          <article className="tech-group" key={group.title}>
            <div className="tech-group-heading">
              <span className="tech-group-symbol" aria-hidden="true">{group.symbol}</span>
              <h4>{group.title}</h4>
              <span className="tech-group-mark">/{group.mark}</span>
            </div>
            <div className="tech-group-items">
              {group.technologies.map(([mark, technology], index) => (
                <span className="tech-item" key={technology}>
                  <span className="tech-item-mark" aria-hidden="true" style={{ '--item-index': index } as React.CSSProperties}>{mark}</span>
                  {technology}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Technologies;
