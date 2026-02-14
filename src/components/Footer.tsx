
import React from 'react';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-garden-dark-green text-white py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Paesaggista.art</h3>
            <p className="text-white/80 mb-6 max-w-xs">
              Creating harmonious outdoor spaces that inspire, rejuvenate, and connect people with nature.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-garden-accent transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:hello@greenessence.com" 
                className="text-white/80 hover:text-garden-accent transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:+15551234567" 
                className="text-white/80 hover:text-garden-accent transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <a href="#about" className="text-white/80 hover:text-garden-accent transition-colors">About</a>
              <a href="#projects" className="text-white/80 hover:text-garden-accent transition-colors">Projects</a>
              <a href="#instagram" className="text-white/80 hover:text-garden-accent transition-colors">Gallery</a>
              <a href="#contact" className="text-white/80 hover:text-garden-accent transition-colors">Contact</a>
            </nav>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="text-garden-accent mr-3 mt-1" size={18} />
                <a href="mailto:hello@greenessence.com" className="text-white/80 hover:text-white transition-colors">hello@greenessence.com</a>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-garden-accent mr-3 mt-1" size={18} />
                <a href="tel:+15551234567" className="text-white/80 hover:text-white transition-colors">(555) 123-4567</a>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-garden-accent mr-3 mt-1" size={18} />
                <address className="not-italic text-white/80">
                  123 Garden Way<br />
                  Greenville, CA 90210
                </address>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-white/60 text-sm text-center">
          <p>&copy; {currentYear} Paesaggista.art. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
