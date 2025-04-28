
import React from 'react';
import { Instagram } from 'lucide-react';

// Simulating Instagram posts since we're not using real API integration
const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    likes: 142,
    comments: 23
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    likes: 89,
    comments: 12
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    likes: 234,
    comments: 45
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    likes: 176,
    comments: 31
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    likes: 98,
    comments: 15
  },
  {
    id: 6,
    image: "/placeholder.svg",
    likes: 120,
    comments: 18
  }
];

const InstagramFeed = () => {
  return (
    <section id="instagram" className="section-padding bg-garden-cream">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-2 text-garden-dark-green">Follow Our <span className="text-garden-accent">Journey</span></h2>
          <p className="text-lg mb-4">Discover more inspiration on our Instagram</p>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-garden-dark-green hover:text-garden-light-green transition-colors duration-200"
          >
            <Instagram size={20} className="mr-2" />
            <span className="font-medium">@greenessence</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instagramPosts.map((post) => (
            <InstagramPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

const InstagramPost = ({ post }: { post: any }) => {
  return (
    <a 
      href="https://instagram.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="relative block overflow-hidden img-hover-zoom rounded-lg"
    >
      <img 
        src={post.image} 
        alt="Instagram post" 
        className="w-full aspect-square object-cover" 
      />
      <div className="absolute inset-0 bg-garden-dark-green/0 hover:bg-garden-dark-green/30 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
        <div className="text-white flex items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
            </svg>
            {post.likes}
          </span>
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20"></path>
            </svg>
            {post.comments}
          </span>
        </div>
      </div>
    </a>
  );
};

export default InstagramFeed;
