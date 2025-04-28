
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const IMAGES = [
  "/placeholder.svg",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-1000 bg-cover bg-center",
              idx === currentSlide ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in">
          Transform Your Space <br className="hidden md:block" />
          <span className="text-garden-accent">into a Living Paradise</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 animate-fade-in" style={{animationDelay: "0.2s"}}>
          Professional garden design that creates harmony between nature and architecture
        </p>
        <a 
          href="#contact" 
          className="bg-garden-dark-green text-white px-8 py-4 rounded-md hover:bg-garden-light-green transition-colors duration-300 font-medium tracking-wide animate-fade-in"
          style={{animationDelay: "0.4s"}}
        >
          Book a Consultation
        </a>
      </div>

      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrentSlide(idx);
              setTimeout(() => setIsTransitioning(false), 500);
            }}
            className={cn(
              "w-3 h-3 mx-1 rounded-full transition-all",
              idx === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
