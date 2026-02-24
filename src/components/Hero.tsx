
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import heroImg1 from '@/assets/formeverdi-01.png';
import heroImg2 from '@/assets/formeverdi-02.png';
import heroImg3 from '@/assets/formeverdi-03.png';

const heroImages = [heroImg1, heroImg2, heroImg3];


const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Image Carousel Background with parallax */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((src, index) =>
        <img
          key={src}
          src={src}
          alt={`Garden design ${index + 1}`}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
          style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.1)` }} />

        )}
        <div className="absolute inset-0 bg-black/40" />
        {/* Vignette overlay */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)' }} />
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) =>
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-all duration-300",
            index === currentIndex ? "bg-white w-8" : "bg-white/50"
          )}
          aria-label={`Go to slide ${index + 1}`} />

        )}
      </div>

      {/* Content with inverse parallax */}
      {/* Content */}
      <div
        className="relative z-10 h-full px-6 md:px-12 lg:px-20 flex flex-col items-start justify-end pb-28 md:pb-32 lg:pb-36"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}>

        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-4 md:mb-6 hero-text-rise drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] font-medium font-sans leading-[1.1]">
          Forme Verdi
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl text-garden-accent mb-6 md:mb-8 hero-text-rise drop-shadow-[0_2px_12px_rgba(229,184,110,0.4)] font-medium" style={{ animationDelay: "0.2s" }}>
          Progetto l'equilibrio tra spazio e natura
        </p>
        <p className="text-lg md:text-xl text-white/85 max-w-xl mb-10 md:mb-12 hero-text-rise drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" style={{ animationDelay: "0.4s" }}>
          Ogni giardino nasce dall'equilibrio tra spazio, natura e clima. Disegno ambienti verdi vivibili e destinati a durare.
        </p>
        <a
          href="#contact"
          className="bg-garden-dark-green text-white px-8 py-4 rounded-md hover:bg-garden-light-green transition-colors duration-300 font-medium tracking-wide hero-text-rise drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
          style={{ animationDelay: "0.6s" }}>
          Contattami per una consulenza
        </a>
      </div>

      {/* VIDEO HERO — commented out for future use
        <div className="absolute inset-0 w-full h-full">
         <video
           ref={videoRef}
           autoPlay
           muted
           loop
           className="object-cover w-full h-full"
           playsInline
           style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.1)` }}
         >
           <source src="/garden-design.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-black/40" />
        </div>
        */}
    </section>);

};

export default Hero;