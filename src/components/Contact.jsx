import { useState, useRef, useEffect } from 'react';
import Chatbot from './Chatbot';
import './CircularLogo.css';

const Contact = () => {
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const chatRef = useRef(null);
  
  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target) && 
          !event.target.closest('.chat-toggle-button')) {
        setShowChat(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <img 
            src="/assets/images/minibiscos-logo-circular.png" 
            alt="MiniBiscos Logo" 
            className="w-16 h-16 rounded-full border-2 border-amber-400 shadow-lg" 
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Contact Us</h2>
        <p className="text-lg text-amber-800 max-w-2xl mx-auto">
          We're available to answer your questions and receive your feedback
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Contact Information */}
        <div className="lg:w-1/3 bg-amber-100 rounded-xl p-8 shadow-lg">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-amber-900 mb-4">Contact Information</h3>
            <p className="text-amber-700 mb-6">
              Reach out to us through any of the channels below or fill out the contact form.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-amber-200 p-3 rounded-full mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-amber-900">Phone</h4>
                <p className="text-amber-700">(916) 619-5759</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-200 p-3 rounded-full mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-amber-900">Email</h4>
                <p className="text-amber-700">minibiscos@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-500 p-3 rounded-full mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-amber-900">WhatsApp</h4>
                <a href="https://wa.me/19166195759" className="text-amber-700 hover:text-green-600 transition-colors">
                  (916) 619-5759 - Click to chat
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-200 p-3 rounded-full mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-amber-900">Address</h4>
                <p className="text-amber-700">Sacramento, CA</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-200 p-3 rounded-full mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-amber-900">Business Hours</h4>
                <p className="text-amber-700">Monday - Friday: 8am - 6pm<br />Saturday: 8am - 2pm</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="font-medium text-amber-900 mb-3">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/minibiscos/" target="_blank" rel="noopener noreferrer" className="bg-amber-200 hover:bg-amber-300 p-2 rounded-full transition-colors" title="Psalm 34:8 - Taste and see that the LORD is good">
                <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.05 21.75H5.95c-2.07 0-3.75-1.68-3.75-3.75V5.98c0-2.07 1.68-3.75 3.75-3.75h12.1c2.07 0 3.75 1.68 3.75 3.75v12.02c0 2.07-1.68 3.75-3.75 3.75ZM5.95 4.23c-.97 0-1.75.78-1.75 1.75v12.02c0 .97.78 1.75 1.75 1.75h12.1c.97 0 1.75-.78 1.75-1.75V5.98c0-.97-.78-1.75-1.75-1.75H5.95Z"/>
                  <path d="M12 16.75c-2.62 0-4.75-2.13-4.75-4.75S9.38 7.25 12 7.25s4.75 2.13 4.75 4.75-2.13 4.75-4.75 4.75Zm0-7.5c-1.52 0-2.75 1.23-2.75 2.75s1.23 2.75 2.75 2.75 2.75-1.23 2.75-2.75-1.23-2.75-2.75-2.75ZM16.5 8c-.56 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576002282971" target="_blank" rel="noopener noreferrer" className="bg-amber-200 hover:bg-amber-300 p-2 rounded-full transition-colors" title="Matthew 4:4 - Man shall not live on bread alone">
                <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"/>
                </svg>
              </a>
              <a href="#" className="bg-amber-200 hover:bg-amber-300 p-2 rounded-full transition-colors" title="John 6:35 - I am the bread of life">
                <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      
        {/* Contact Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-amber-800 font-medium mb-2">Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.name ? 'border-red-300 focus:ring-red-300' : 'border-amber-200 focus:ring-amber-300'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-amber-800 font-medium mb-2">Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.email ? 'border-red-300 focus:ring-red-300' : 'border-amber-200 focus:ring-amber-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="subject" className="block text-amber-800 font-medium mb-2">Subject</label>
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.subject ? 'border-red-300 focus:ring-red-300' : 'border-amber-200 focus:ring-amber-300'
                  }`}
                  placeholder="How can we help you?"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-amber-800 font-medium mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none transition-colors ${
                    errors.message ? 'border-red-300 focus:ring-red-300' : 'border-amber-200 focus:ring-amber-300'
                  }`}
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                type="submit"
                className="bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50 relative overflow-hidden"
                disabled={isSubmitting}
                title="Philippians 4:6 - Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </span>
                <span className="absolute top-0 left-0 w-full h-full opacity-10" 
                      style={{background: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)"}}>                  
                </span>
              </button>
              
              {submitSuccess && (
                <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg">
                  Your message has been sent successfully! We will contact you soon.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button 
          className="chat-toggle-button bg-amber-600 hover:bg-amber-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
          onClick={() => setShowChat(!showChat)}
          aria-label="Chat with us"
          title="Proverbs 16:24 - Gracious words are like a honeycomb, sweetness to the soul and health to the body"
        >
          {showChat ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
        
        {showChat && (
          <div 
            ref={chatRef}
            className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            <Chatbot />
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;