
import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-parallax';

const ContactForm = () => {
  const { ref: revealRef, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    projectType: '',
    website: '' // honeypot field — bots fill this, humans don't see it
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // TODO: Update this URL to your PHP server endpoint
  const PHP_ENDPOINT = 'https://your-server.com/send-mail.php';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch(PHP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '', projectType: '', website: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert(data.message || 'Invio non riuscito. Riprova.');
      }
    } catch {
      alert('Errore di rete. Controlla la connessione e riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-garden-cream overflow-hidden">
      <div className="container mx-auto max-w-6xl" ref={revealRef}>
        <div className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-garden-dark-green">Parliamo del tuo <span className="text-garden-accent">giardino</span></h2>
          <p className="text-lg max-w-3xl mx-auto text-foreground/80">
            Ogni progetto inizia da una conversazione.<br />Raccontami il tuo spazio e le tue esigenze.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="bg-garden-light-green/20 border border-garden-light-green text-garden-dark-green rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Grazie!</h3>
                <p>Il tuo messaggio è stato inviato. Ti risponderò al più presto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field — hidden from humans, traps bots */}
                <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Nome *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-garden-stone'} rounded-md focus:outline-none focus:ring-2 focus:ring-garden-light-green`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-garden-stone'} rounded-md focus:outline-none focus:ring-2 focus:ring-garden-light-green`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Telefono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-garden-stone rounded-md focus:outline-none focus:ring-2 focus:ring-garden-light-green"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-1">Tipo di progetto</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-garden-stone rounded-md focus:outline-none focus:ring-2 focus:ring-garden-light-green"
                    >
                      <option value="">Seleziona...</option>
                      <option value="residential">Giardino residenziale</option>
                      <option value="commercial">Paesaggio commerciale</option>
                      <option value="consultation">Consulenza progettuale</option>
                      <option value="maintenance">Manutenzione giardino</option>
                      <option value="other">Altro</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Messaggio *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-garden-stone'} rounded-md focus:outline-none focus:ring-2 focus:ring-garden-light-green`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-garden-dark-green text-white px-8 py-3 rounded-md hover:bg-garden-light-green transition-colors duration-300 font-medium disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Invio...' : 'Raccontami il tuo spazio'}
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="bg-garden-cream rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-garden-dark-green">Contatti</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="text-garden-accent mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-garden-dark-green">Email</h4>
                  <a href="mailto:magdalena@formeverdi.it" className="text-foreground/80 hover:text-garden-dark-green transition-colors">magdalena@formeverdi.it</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-garden-accent mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-garden-dark-green">Telefono</h4>
                  <a href="tel:+393398046472" className="text-foreground/80 hover:text-garden-dark-green transition-colors">+39 339 804 6472</a>
                </div>
              </div>

              <div className="pt-4 border-t border-garden-stone/30">
                <p className="text-sm text-foreground/60">P.IVA 123456789121</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
