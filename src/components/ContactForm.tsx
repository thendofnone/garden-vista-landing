
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
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
        alert(data.message || 'Failed to send message. Please try again.');
      }
    } catch {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl" ref={revealRef}>
        <div className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-garden-dark-green">Parliamo del tuo <span className="text-garden-accent">giardino</span></h2>
          <p className="text-lg max-w-3xl mx-auto text-foreground/80">
            Ready to transform your outdoor space? Contact us to discuss your vision and schedule a consultation
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="bg-garden-light-green/20 border border-garden-light-green text-garden-dark-green rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you shortly.</p>
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
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Name *</label>
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
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone</label>
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
                    <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-1">Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-garden-stone rounded-md focus:outline-none focus:ring-2 focus:ring-garden-light-green"
                    >
                      <option value="">Select...</option>
                      <option value="residential">Residential Garden</option>
                      <option value="commercial">Commercial Landscape</option>
                      <option value="consultation">Design Consultation</option>
                      <option value="maintenance">Garden Maintenance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message *</label>
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
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="bg-garden-cream rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-garden-dark-green">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="text-garden-accent mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-garden-dark-green">Email</h4>
                  <a href="mailto:hello@greenessence.com" className="text-foreground/80 hover:text-garden-dark-green transition-colors">hello@greenessence.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-garden-accent mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-garden-dark-green">Phone</h4>
                  <a href="tel:+15551234567" className="text-foreground/80 hover:text-garden-dark-green transition-colors">(555) 123-4567</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-garden-accent mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-garden-dark-green">Address</h4>
                  <address className="not-italic text-foreground/80">
                    123 Garden Way<br />
                    Greenville, CA 90210
                  </address>
                </div>
              </div>
              
              <div className="pt-4 border-t border-garden-stone">
                <h4 className="font-medium text-garden-dark-green mb-2">Office Hours</h4>
                <p className="text-sm text-foreground/80">Monday - Friday: 9am - 5pm</p>
                <p className="text-sm text-foreground/80">Saturday: By appointment</p>
                <p className="text-sm text-foreground/80">Sunday: Closed</p>
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
