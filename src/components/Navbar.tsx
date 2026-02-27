import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-garden-cream/95 backdrop-blur-sm shadow-sm translate-y-0"
          : "bg-transparent -translate-y-full"
      )}
    >
      <div className="px-6 md:px-12 lg:px-20">
        <div className="flex justify-between items-center h-20">
          <a href="#" className="flex items-center">
            <img src={logo} alt="Forme Verdi" style={{ height: '76px', width: 'auto' }} />
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#about">Magdalena</NavLink>
            <NavLink href="#metodo">Metodo</NavLink>
            <NavLink href="#projects">Progetti</NavLink>
            <NavLink href="#instagram">Instagram</NavLink>
            <NavLink href="#contact">Contatti</NavLink>
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
          <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>Magdalena</MobileNavLink>
          <MobileNavLink href="#metodo" onClick={() => setIsOpen(false)}>Metodo</MobileNavLink>
          <MobileNavLink href="#projects" onClick={() => setIsOpen(false)}>Progetti</MobileNavLink>
          <MobileNavLink href="#instagram" onClick={() => setIsOpen(false)}>Instagram</MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>Contatti</MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

// NavLink and MobileNavLink components
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="relative text-lg font-medium text-garden-dark-green hover:text-garden-light-green transition-colors duration-200 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-garden-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
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
      className="text-2xl font-medium text-garden-dark-green hover:text-garden-light-green transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default Navbar;
