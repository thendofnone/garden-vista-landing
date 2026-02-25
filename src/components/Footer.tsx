
import React from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-garden-dark-green text-white py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Forme Verdi</h3>
            <p className="text-white/80 mb-6 max-w-xs">
              Ogni giardino nasce dall'equilibrio tra spazio, natura e clima. Disegno ambienti verdi vivibili e destinati a durare.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/formeverdi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-garden-accent transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:magdalena@formeverdi.it" 
                className="text-white/80 hover:text-garden-accent transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:+393398046472" 
                className="text-white/80 hover:text-garden-accent transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <a href="#about" className="text-white/80 hover:text-garden-accent transition-colors">Magdalena</a>
              <a href="#metodo" className="text-white/80 hover:text-garden-accent transition-colors">Metodo</a>
              <a href="#projects" className="text-white/80 hover:text-garden-accent transition-colors">Progetti</a>
              <a href="#instagram" className="text-white/80 hover:text-garden-accent transition-colors">Instagram</a>
              <a href="#contact" className="text-white/80 hover:text-garden-accent transition-colors">Contatti</a>
            </nav>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Contatti</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-garden-accent mr-3" size={18} />
                <a href="mailto:magdalena@formeverdi.it" className="text-white/80 hover:text-white transition-colors">magdalena@formeverdi.it</a>
              </div>
              
              <div className="flex items-center">
                <Phone className="text-garden-accent mr-3" size={18} />
                <a href="tel:+393398046472" className="text-white/80 hover:text-white transition-colors">+39 339 804 6472</a>
              </div>

              <div className="flex items-center">
                <span className="text-garden-accent mr-3 text-sm font-medium w-[18px] text-center">P.</span>
                <span className="text-white/80">IVA 123456789121</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-white/60 text-sm text-center">
          <p>&copy; {currentYear} Forme Verdi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
