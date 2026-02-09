
import React, { useEffect, useRef } from 'react';
import { Instagram } from 'lucide-react';

const InstagramFeed = () => {
  // Reference for the container where we'll place our embedded posts
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This function will load Instagram's embed script
    const loadInstagramEmbed = () => {
      // Check if script already exists
      if (document.getElementById('instagram-embed-script')) return;
      
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      
      // Once the script loads, call the processEmbeds function
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      
      document.body.appendChild(script);
    };
    
    // Load Instagram embed script
    loadInstagramEmbed();
    
    // Clean up function to remove the script when component unmounts
    return () => {
      const script = document.getElementById('instagram-embed-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="instagram" className="section-padding bg-garden-cream">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-2 text-garden-dark-green">Follow Our <span className="text-garden-accent">Journey</span></h2>
          <p className="text-lg mb-4">Discover more inspiration on our Instagram</p>
          <a 
            href="https://instagram.com/paesaggista.art" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-garden-dark-green hover:text-garden-light-green transition-colors duration-200"
          >
            <Instagram size={20} className="mr-2" />
            <span className="font-medium">@paesaggista.art</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={containerRef}>
          {/* Instagram Post Embeds */}
          <div className="instagram-embed overflow-hidden rounded-lg shadow-md">
            <blockquote 
              className="instagram-media" 
              data-instgrm-permalink="https://www.instagram.com/p/CpnRZyhgwx2/"
              data-instgrm-version="14"
              style={{ 
                background: '#FFF', 
                border: '0', 
                borderRadius: '3px', 
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px', 
                maxWidth: '540px', 
                minWidth: '326px', 
                padding: '0', 
                width: '99.375%' 
              }}
            >
              <div style={{ padding: '16px' }}>
                <a 
                  href="https://www.instagram.com/p/CpnRZyhgwx2/" 
                  style={{ 
                    background: '#FFFFFF', 
                    lineHeight: '0', 
                    padding: '0 0', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    width: '100%' 
                  }} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
              </div>
            </blockquote>
          </div>
          
          <div className="instagram-embed overflow-hidden rounded-lg shadow-md">
            <blockquote 
              className="instagram-media" 
              data-instgrm-permalink="https://www.instagram.com/p/CtRBgy9N_JF/"
              data-instgrm-version="14"
              style={{ 
                background: '#FFF', 
                border: '0', 
                borderRadius: '3px', 
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px', 
                maxWidth: '540px', 
                minWidth: '326px', 
                padding: '0', 
                width: '99.375%' 
              }}
            >
              <div style={{ padding: '16px' }}>
                <a 
                  href="https://www.instagram.com/p/CtRBgy9N_JF/" 
                  style={{ 
                    background: '#FFFFFF', 
                    lineHeight: '0', 
                    padding: '0 0', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    width: '100%' 
                  }} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
              </div>
            </blockquote>
          </div>
          
          {/* You can add more Instagram embeds here */}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="https://www.instagram.com/paesaggista.art/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-garden-dark-green text-white rounded-lg hover:bg-garden-light-green transition-colors duration-300"
          >
            View More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

// Add Instagram embed interface for TypeScript
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default InstagramFeed;
