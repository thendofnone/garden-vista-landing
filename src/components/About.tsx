
import React from 'react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-garden-cream">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
                alt="Garden Designer Portrait" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-garden-accent rounded-full hidden md:block"></div>
            </div>
          </div>
          
          <div className="md:order-1">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-garden-dark-green">About <span className="text-garden-accent">Green Essence</span></h2>
            
            <div className="space-y-4 text-foreground">
              <p className="text-lg">
                I'm Sofia Greenfield, founder of Green Essence, with over 15 years of transforming ordinary spaces into extraordinary gardens.
              </p>
              
              <p>
                My philosophy is simple: gardens should be extensions of your home and personality, 
                creating harmonious spaces that connect you with nature while reflecting your unique style.
              </p>
              
              <p>
                Drawing inspiration from both classical and contemporary design principles, 
                I work closely with clients to understand their vision, considering the site's natural attributes, 
                architectural context, and sustainability needs.
              </p>
              
              <p>
                Whether you're dreaming of a peaceful sanctuary, a vibrant entertainment space, or a productive 
                kitchen garden, I bring creativity, technical expertise and a deep love for plants to every project.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
              <div>
                <p className="text-3xl font-serif text-garden-dark-green">200+</p>
                <p className="text-sm text-garden-light-green uppercase tracking-wider">Projects Completed</p>
              </div>
              
              <div>
                <p className="text-3xl font-serif text-garden-dark-green">15+</p>
                <p className="text-sm text-garden-light-green uppercase tracking-wider">Years Experience</p>
              </div>
              
              <div>
                <p className="text-3xl font-serif text-garden-dark-green">26</p>
                <p className="text-sm text-garden-light-green uppercase tracking-wider">Design Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
