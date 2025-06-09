import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import DynamicInstagramFeed from './components/DynamicInstagramFeed';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products', 'about', 'instagram', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        
        // If section is in view
        if (sectionTop < window.innerHeight / 2 && sectionBottom > window.innerHeight / 3) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Header activeSection={activeSection} />
      </div>
      
      <main className="flex-grow">
        <section id="home">
          <Hero />
        </section>
        
        <section id="products" className="py-20">
          <div className="bg-white/85 backdrop-blur-sm py-8">
            <Products />
          </div>
        </section>
        
        <section id="about" className="py-20">
          <div className="bg-pink-100/90 backdrop-blur-sm py-8">
            <About />
          </div>
        </section>
        
        <section id="instagram">
          <div className="bg-white/85 backdrop-blur-sm py-8">
            <DynamicInstagramFeed />
          </div>
        </section>
        
        <section id="contact" className="py-20">
          <div className="bg-white/85 backdrop-blur-sm py-8">
            <Contact />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;