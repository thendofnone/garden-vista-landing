
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import BotanicalDivider from '@/components/BotanicalDivider';
import Method from '@/components/Method';
import Projects from '@/components/Projects';
import InstagramFeed from '@/components/InstagramFeed';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <BotanicalDivider className="bg-gradient-to-b from-garden-cream to-white" />
      <Method />
      <BotanicalDivider className="bg-gradient-to-b from-white to-garden-cream" />
      <Projects />
      <BotanicalDivider className="bg-gradient-to-b from-garden-cream to-white" />
      <InstagramFeed />
      <BotanicalDivider className="bg-gradient-to-b from-white to-garden-cream" />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
