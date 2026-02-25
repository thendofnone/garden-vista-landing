
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useParallax, useScrollReveal } from '@/hooks/use-parallax';

const projects = [
  {
    id: 1,
    title: "Urban Oasis Retreat",
    category: "Urban Gardens",
    description: "A tranquil sanctuary designed for a busy city professional, featuring vertical gardens and a meditation pond.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
  },
  {
    id: 2,
    title: "Coastal Mediterranean Garden",
    category: "Residential",
    description: "A drought-resistant landscape with vibrant colors and textures inspired by Mediterranean coast.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Contemporary Courtyard",
    category: "Commercial",
    description: "A minimalist design for a corporate headquarters that balances form and function.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
  },
  {
    id: 4,
    title: "Cottage Garden Revival",
    category: "Residential",
    description: "A romantic, flower-filled garden that embraces the wild beauty of traditional English cottages.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
  }
];

const Projects = () => {
  const { ref: revealRef, isVisible } = useScrollReveal();

  return (
    <section id="projects" className="section-padding bg-garden-cream">
      <div className="container mx-auto max-w-6xl">
        <div ref={revealRef} className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-garden-dark-green">I miei <span className="text-garden-accent">progetti</span></h2>
            <p className="text-lg max-w-3xl mx-auto text-foreground/80">
              Explore a selection of our transformative garden designs, each tailored to our clients' unique visions and spaces
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="inline-block border-2 border-garden-dark-green text-garden-dark-green px-8 py-3 rounded-md hover:bg-garden-dark-green hover:text-white transition-colors duration-300 font-medium"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { containerRef, setTargetRef } = useParallax(0.2);
  const { ref: revealRef, isVisible } = useScrollReveal();

  const imgRef = useCallback((el: HTMLImageElement | null) => {
    setTargetRef(el);
  }, [setTargetRef]);
  
  return (
    <div ref={revealRef} className={`scroll-reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
      <div 
        className="rounded-lg overflow-hidden shadow-lg relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={containerRef}
      >
        <img 
          ref={imgRef}
          src={project.image} 
          alt={project.title}
          className="w-full h-80 object-cover will-change-transform scale-110" 
        />
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300",
          isHovered ? "h-full flex flex-col justify-end" : "h-1/2"
        )}>
          <span className="text-garden-accent text-sm uppercase tracking-wider">{project.category}</span>
          <h3 className="text-xl font-bold text-white mt-2">{project.title}</h3>
          <p className={cn(
            "text-white/80 mt-2 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
          )}>
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
