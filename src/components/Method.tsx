
import React, { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Ascolto',
    description:
      'Osservo luce, proporzioni e relazioni con l\'architettura.\nOgni spazio ha un\'identità da riconoscere prima di intervenire.',
  },
  {
    number: '02',
    title: 'Progetto',
    description:
      'Definisco struttura e scelte botaniche in relazione al clima e all\'uso dello spazio.\nOgni elemento è pensato per stabilità e continuità nel tempo.',
  },
  {
    number: '03',
    title: 'Evoluzione',
    description:
      'Il giardino cresce e cambia.\nProgetto perché possa maturare in modo naturale e mantenere equilibrio nel tempo.',
  },
];

const Method = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="metodo"
      className="section-padding bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div
          className="mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1.4s ease-out, transform 1.4s ease-out',
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-garden-dark-green mb-4 leading-tight">
            Il mio <span className="text-garden-accent">metodo</span>
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-xl">
            Il mio metodo nasce dall'ascolto del luogo e dal rispetto del suo carattere.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `opacity 1.4s ease-out ${0.2 + i * 0.2}s, transform 1.4s ease-out ${0.2 + i * 0.2}s`,
              }}
            >
              <span className="block text-5xl md:text-6xl font-light text-garden-light-green mb-4 font-mono">
                {step.number}
              </span>
              <h3 className="text-xl md:text-2xl font-medium text-garden-dark-green mb-3">
                {step.title}
              </h3>
              <p className="text-base md:text-lg text-secondary leading-relaxed whitespace-pre-line">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;
