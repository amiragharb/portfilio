import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  meta?: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children, meta }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [magicKey, setMagicKey] = useState(0);

  useEffect(() => {
    let timeoutId: number | undefined;
    const handleMagicReveal = (event: Event) => {
      const { id: targetId } = (event as CustomEvent<{ id: string }>).detail;
      if (targetId !== id) return;
      window.clearTimeout(timeoutId);
      setMagicKey((key) => key + 1);
      timeoutId = window.setTimeout(() => setMagicKey(0), 1500);
    };

    window.addEventListener('portfolio:magic-reveal', handleMagicReveal);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('portfolio:magic-reveal', handleMagicReveal);
    };
  }, [id]);

  return (
    <section
      id={id}
      ref={ref}
      className={`portfolio-section ${isVisible ? 'is-visible' : ''} ${magicKey ? 'is-magic-revealing' : ''}`}
    >
      {magicKey > 0 && (
        <div className="section-magic" key={magicKey} aria-hidden="true">
          {[
            ['12%', '28%', '38px', '-46px'], ['24%', '72%', '-35px', '-35px'],
            ['39%', '18%', '20px', '-54px'], ['53%', '83%', '43px', '-26px'],
            ['68%', '31%', '-42px', '-44px'], ['81%', '68%', '34px', '-52px'],
            ['91%', '42%', '-26px', '36px'], ['31%', '48%', '-49px', '16px'],
          ].map(([left, top, dx, dy], index) => (
            <i
              className="reveal-spark"
              key={`${magicKey}-${index}`}
              style={{ '--spark-left': left, '--spark-top': top, '--spark-dx': dx, '--spark-dy': dy, '--spark-delay': `${index * 45}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      )}
      <div className={`section-heading ${meta ? 'section-heading-with-meta' : ''}`}>
        <div className="section-heading-main">
          <p className="section-kicker">A closer look <span>— {id}</span></p>
          <h2>{title}</h2>
        </div>
        {meta && <div className="section-heading-meta">{meta}</div>}
      </div>
      {children}
    </section>
  );
};

export default SectionWrapper;
