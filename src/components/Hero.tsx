
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
      <div
        className="relative z-10 h-full text-center px-4 flex-col flex items-start justify-end py-[100px]"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}>

        <h1 className="text-4xl lg:text-7xl text-white mb-6 hero-text-rise drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] font-medium font-sans text-justify md:text-6xl">
          Forme Verdi <br className="hidden md:block" />
          <span className="text-garden-accent drop-shadow-[0_2px_12px_rgba(229,184,110,0.4)]">Progetto l'equilibrio tra spazio e natura</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 hero-text-rise drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] text-left" style={{ animationDelay: "0.3s" }}>
          Giardini vivibili, sostenibili e pensati per il clima contemporaneo
        </p>
        <a
          href="#contact"
          className="bg-garden-dark-green text-white px-8 py-4 rounded-md hover:bg-garden-light-green transition-colors duration-300 font-medium tracking-wide hero-text-rise drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)] text-center"
          style={{ animationDelay: "0.6s" }}>

          Book a Consultation
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