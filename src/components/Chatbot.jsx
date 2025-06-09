import { useState, useEffect, useRef } from 'react';
import { getChatbotResponse } from '../utils/chatbotResponses';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: 'Hello! Welcome to MiniBiscos 🍪 How can I sweeten your day today?', 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate bot typing delay
    setTimeout(async () => {
      try {
        const response = await getChatbotResponse(inputMessage);
        
        const botMessage = {
          id: messages.length + 2,
          text: response,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      } catch (error) {
        console.error('Error getting chatbot response:', error);
        
        const errorMessage = {
          id: messages.length + 2,
          text: 'Sorry, I\'m having difficulties responding right now. Could you please try again?',
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }
    }, 1000);
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Chat Header */}
      <div className="bg-amber-600 text-white p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
            <span className="text-amber-600 text-xl font-bold">MB</span>
          </div>
          <div>
            <h3 className="font-bold">MiniBiscos Customer Service</h3>
            <p className="text-xs text-amber-100">Online now</p>
          </div>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-grow p-4 overflow-y-auto bg-amber-50">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-4 max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
          >
            <div className={`p-3 rounded-lg ${
              message.sender === 'user' 
              ? 'bg-amber-600 text-white rounded-tr-none' 
              : 'bg-white text-amber-900 rounded-tl-none shadow'
            }`}>
              {message.text}
            </div>
            <div className={`text-xs mt-1 text-gray-500 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-4 max-w-[80%] mr-auto">
            <div className="p-3 bg-white text-amber-900 rounded-lg rounded-tl-none shadow">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t">
        <div className="flex">
          <input 
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border border-amber-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
            disabled={isTyping}
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded-r-lg disabled:bg-amber-400"
            disabled={!inputMessage.trim() || isTyping}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;