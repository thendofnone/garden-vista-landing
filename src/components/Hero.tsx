
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background with parallax */}
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
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content with inverse parallax */}
      <div 
        className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
          Paesaggista.art <br className="hidden md:block" />
          <span className="text-garden-accent">Watercolor Meets Design</span>
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

      {/* Video controls */}
      <button 
        onClick={togglePlayPause}
        className="absolute bottom-8 right-8 z-20 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </section>
  );
};

export default Hero;
