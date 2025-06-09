import { useState } from 'react';
import './CircularLogo.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscribeStatus('error');
      return;
    }
    
    // Simulate API call for newsletter subscription
    setSubscribeStatus('loading');
    
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubscribeStatus(null);
      }, 5000);
    }, 1500);
  };
  
  return (
    <footer className="bg-pink-600/90 backdrop-blur-sm text-pink-50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/images/minibiscos-logo-circular.png" 
                alt="MiniBiscos Logo" 
                className="circular-logo" 
              />
              <h3 className="text-xl font-bold text-white">MiniBiscos</h3>
            </div>
            <p className="mb-4 text-pink-100">
              Artisanal cookies made with love and the finest ingredients, maintaining tradition and quality in every batch.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/minibiscos/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-200 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.05 21.75H5.95c-2.07 0-3.75-1.68-3.75-3.75V5.98c0-2.07 1.68-3.75 3.75-3.75h12.1c2.07 0 3.75 1.68 3.75 3.75v12.02c0 2.07-1.68 3.75-3.75 3.75ZM5.95 4.23c-.97 0-1.75.78-1.75 1.75v12.02c0 .97.78 1.75 1.75 1.75h12.1c.97 0 1.75-.78 1.75-1.75V5.98c0-.97-.78-1.75-1.75-1.75H5.95Z"/>
                  <path d="M12 16.75c-2.62 0-4.75-2.13-4.75-4.75S9.38 7.25 12 7.25s4.75 2.13 4.75 4.75-2.13 4.75-4.75 4.75Zm0-7.5c-1.52 0-2.75 1.23-2.75 2.75s1.23 2.75 2.75 2.75 2.75-1.23 2.75-2.75-1.23-2.75-2.75-2.75ZM16.5 8c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576002282971" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-200 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"/>
                </svg>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-200 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3Z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-pink-100 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#products" className="text-pink-100 hover:text-white transition-colors">Our Products</a>
              </li>
              <li>
                <a href="#about" className="text-pink-100 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#instagram" className="text-pink-100 hover:text-white transition-colors">Instagram</a>
              </li>
              <li>
                <a href="#contact" className="text-pink-100 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-pink-200 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-pink-100">Sacramento, CA</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-200 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-pink-100">(916) 619-5759</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-200 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-pink-100">minibiscos@gmail.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
            <p className="text-pink-100 mb-4">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex flex-col space-y-2">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-4 py-2 rounded-lg bg-pink-700 border border-pink-500 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-white text-pink-600 font-medium rounded-lg hover:bg-pink-100 transition-colors disabled:opacity-50"
                  disabled={subscribeStatus === 'loading'}
                >
                  {subscribeStatus === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : "Subscribe"}
                </button>
                
                {subscribeStatus === 'success' && (
                  <p className="text-green-300 text-sm mt-1">
                    Subscription successful!
                  </p>
                )}
                
                {subscribeStatus === 'error' && (
                  <p className="text-red-300 text-sm mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-pink-500 text-center">
          <p className="text-white">
            &copy; {new Date().getFullYear()} MiniBiscos - All rights reserved
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-sm text-pink-200">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;