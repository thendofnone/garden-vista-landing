

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WaveDivider from '@/components/WaveDivider';
import Method from '@/components/Method';
import Projects from '@/components/Projects';
import InstagramFeed from '@/components/InstagramFeed';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import FontSwitcher from '@/components/FontSwitcher';

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
      <WaveDivider fromColor="#F8F5F0" toColor="#ffffff" />
      <InstagramFeed />
      <WaveDivider fromColor="#ffffff" toColor="#F8F5F0" />
      <ContactForm />
      <Footer />
      <FontSwitcher />
    </div>
  );
};

export default Index;
