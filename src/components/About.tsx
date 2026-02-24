
import React, { useCallback } from 'react';
import { useParallax, useScrollReveal } from '@/hooks/use-parallax';
import aboutImg from '@/assets/about-formeverdi.jpeg';

const About = () => {
  const { containerRef, setTargetRef } = useParallax(0.3);
  const { ref: revealRef, isVisible } = useScrollReveal();

  const imgRef = useCallback((el: HTMLImageElement | null) => {
    setTargetRef(el);
  }, [setTargetRef]);

  return (
    <section id="about" className="section-padding bg-garden-cream overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div ref={revealRef} className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <div className="relative overflow-hidden rounded-lg" ref={containerRef}>
                <img 
                  ref={imgRef}
                  src={aboutImg} 
                  alt="Garden Designer Portrait" 
                  className="shadow-xl w-full will-change-transform scale-110"
                />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-garden-accent rounded-full hidden md:block"></div>
              </div>
            </div>
            
            <div className="md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-garden-dark-green">Sono <span className="text-garden-accent">Magdalena Szczepanska</span></h2>
              
              <div className="space-y-4 text-foreground">
                <p className="text-lg font-medium">
                  Forme Verdi è il mio progetto di garden design.
                </p>
                <p>
                  Nasce dalla mia formazione nella progettazione territoriale e da una sensibilità verso il paesaggio coltivata fin dall'infanzia, tra giardini, stagioni e osservazione della natura.
                </p>
                <p>
                  Per me il giardino non è solo uno spazio esterno, ma un equilibrio vivo tra luogo, architettura e piante. Ogni progetto parte dall'ascolto attento del contesto e si sviluppa attraverso uno studio botanico accurato, con particolare attenzione al clima e alla sostenibilità.
                </p>
                <p>
                  Unisco rigore tecnico e visione artistica: strumenti professionali, modellazione 3D e rappresentazione ad acquerello dialogano per dare forma a spazi verdi concreti e armoniosi.
                </p>
                <p>
                  Progetto giardini destinati a durare nel tempo, che richiedano una manutenzione consapevole e restituiscano benessere a chi li vive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
