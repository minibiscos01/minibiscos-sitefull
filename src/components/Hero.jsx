import { useState, useEffect } from 'react';
import './CircularLogo.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Artisanal Shortbread Cookies",
      subtitle: "Handcrafted with love and premium ingredients",
      image: "/assets/images/hero-cookie-1.jpg",
      description: "Experience the unmistakable flavor of our homemade shortbread cookies"
    },
    {
      title: "Premium Quality",
      subtitle: "Small-batch production for a unique taste",
      image: "/assets/images/hero-cookie-2.jpg",
      description: "Each cookie is carefully prepared with traditional recipes from Sacramento"
    },
    {
      title: "Variety of Flavors",
      subtitle: "For all tastes and moments",
      image: "/assets/images/hero-cookie-3.jpg",
      description: "Discover our wide selection of exclusive shortbread flavors"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-amber-900
              ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-800/50 z-10"></div>
            
            {/* Background Image (placeholder for now) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: 'url("/assets/images/cookie-placeholder.jpg")', 
                backgroundSize: 'cover',
                opacity: 0.7
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="flex justify-center mb-6">
              <img 
                src="/assets/images/minibiscos-logo-circular.png" 
                alt="MiniBiscos Logo" 
                className="w-24 h-24 rounded-full border-4 border-amber-400 shadow-lg" 
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-500 transform translate-y-0">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 transition-all duration-500 delay-100">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-lg mb-8 transition-all duration-500 delay-200">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 transition-all duration-500 delay-300">
              <a 
                href="#products" 
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-amber-900 font-semibold rounded-full transition-all shadow-lg"
              >
                View Products
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 border-2 border-white hover:bg-white hover:text-amber-900 text-white font-semibold rounded-full transition-all shadow-lg"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-amber-500 w-10' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;