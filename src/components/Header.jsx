import { useState, useEffect } from 'react';
import './CircularLogo.css';

const Header = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Products', href: '#products', id: 'products' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Instagram', href: '#instagram', id: 'instagram' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-minibiscos-brown/95 text-minibiscos-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home" className="flex items-center gap-2">
            {/* Logo */}
            <div className="logo-container">
              <img 
                src="/assets/images/minibiscos-logo-circular.png" 
                alt="MiniBiscos Logo" 
                className="circular-logo" 
              />
              <div className="text-3xl font-bold font-amsterdam">
                <span className="text-minibiscos-pink">mini</span>
                <span className={isScrolled ? "text-minibiscos-white" : "text-minibiscos-brown"}>biscos</span>
              </div>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.href} 
                  className={`font-medium text-lg font-amsterdam transition hover:text-minibiscos-pink ${
                    activeSection === link.id ? 'text-minibiscos-pink' : ''
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-minibiscos-brown focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-minibiscos-white shadow-lg">
          <ul className="py-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.href} 
                  className={`block py-2 px-4 text-lg font-amsterdam ${
                    activeSection === link.id ? 'bg-minibiscos-pink/20 text-minibiscos-brown' : 'text-minibiscos-brown'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;