
import { useCallback } from 'react';
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
      <div className="container mx-auto max-w-6xl" ref={revealRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image — reveals first */}
          <div className="md:order-2">
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-lg"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1.4s ease-out, transform 1.4s ease-out',
              }}
            >
              <img
                ref={imgRef}
                src={aboutImg}
                alt="Magdalena Szczepanska, garden designer di Forme Verdi"
                className="shadow-xl w-full will-change-transform scale-110"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-garden-accent rounded-full hidden md:block"></div>
            </div>
          </div>

          {/* Text — enters from below with delay */}
          <div
            className="md:order-1"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'opacity 1.4s ease-out 0.3s, transform 1.4s ease-out 0.3s',
            }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-3 text-garden-dark-green leading-tight">Sono <span className="text-garden-accent">Magdalena Szczepanska</span>.</h2>
            <p className="text-lg md:text-xl font-medium text-foreground/80 mb-6">
              Forme Verdi è il mio progetto di garden design.
            </p>

            <div className="space-y-4 text-foreground text-lg md:text-xl leading-relaxed">
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

        {/* Blocco semantico SEO */}
        <div
          className="mt-20 max-w-5xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1.4s ease-out 0.6s, transform 1.4s ease-out 0.6s',
          }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-garden-dark-green leading-snug tracking-wide font-mono">
            Sono una garden designer con base in Veneto e mi occupo di progettazione di giardini per abitazioni private.
            Lavoro principalmente tra Verona, Vicenza e Padova, sviluppando progetti su misura, con attenzione al clima locale, alla scelta botanica e alla durata nel tempo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
