
import React, { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Ascolto e analisi',
    description:
      'Studio il luogo, il clima, il suolo e la relazione con l\'architettura. Comprendere lo spazio è il primo passo per costruire un giardino coerente.',
  },
  {
    number: '02',
    title: 'Progettazione',
    description:
      'Definisco il concept, le scelte botaniche e l\'organizzazione degli spazi attraverso strumenti professionali. Seleziono specie adatte al contesto, privilegiando stabilità, biodiversità e manutenzione consapevole.',
  },
  {
    number: '03',
    title: 'Realizzazione e durata',
    description:
      'Il progetto viene tradotto in indicazioni precise per la messa a dimora e la gestione futura, per garantire qualità, equilibrio e continuità nel tempo.',
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
      className="section-padding bg-garden-cream"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div
          className="mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-garden-dark-green mb-4 leading-tight">
            Metodo
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-xl">
            Ogni progetto segue un processo chiaro e strutturato.
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
                transition: `opacity 0.8s ease-out ${0.2 + i * 0.15}s, transform 0.8s ease-out ${0.2 + i * 0.15}s`,
              }}
            >
              <span className="block text-5xl md:text-6xl font-light text-garden-light-green mb-4 font-mono">
                {step.number}
              </span>
              <h3 className="text-xl md:text-2xl font-medium text-garden-dark-green mb-3">
                {step.title}
              </h3>
              <p className="text-base md:text-lg text-secondary leading-relaxed">
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
