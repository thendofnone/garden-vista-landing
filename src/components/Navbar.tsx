
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-garden-cream/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="text-garden-dark-green text-2xl font-sans font-semibold">
            <a href="#" className="flex items-center">
              <span className="tracking-wide">Forme Verdi</span>
            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#instagram">Gallery</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-garden-dark-green focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-garden-cream/95 backdrop-blur-md z-40 pt-20",
          isOpen ? "flex flex-col" : "hidden"
        )}
      >
        <div className="flex flex-col items-center space-y-8 p-8">
          <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
          <MobileNavLink href="#projects" onClick={() => setIsOpen(false)}>Projects</MobileNavLink>
          <MobileNavLink href="#instagram" onClick={() => setIsOpen(false)}>Gallery</MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="relative font-medium text-garden-dark-green hover:text-garden-light-green transition-colors duration-200 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-garden-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ 
  href, 
  onClick,
  children 
}: { 
  href: string; 
  onClick: () => void;
  children: React.ReactNode 
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-xl font-medium text-garden-dark-green hover:text-garden-light-green transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default Navbar;
