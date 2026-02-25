
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WaveDivider from '@/components/WaveDivider';
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
      <WaveDivider fromColor="#F8F5F0" toColor="#ffffff" />
      <Method />
      <WaveDivider fromColor="#ffffff" toColor="#F8F5F0" />
      <Projects />
      <InstagramFeed />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
