import React, { useState, useEffect } from 'react';
import instagramService from '../services/instagramService';
import { MEDIA_TYPES, isConfigured } from '../config/instagram';

const DynamicInstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Style for Instagram post cards
  const cardStyle = {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    transition: 'transform 0.3s ease',
  };
  
  useEffect(() => {
    const loadInstagramFeed = async () => {
      try {
        setLoading(true);
        
        let postsData;
        let reelsData;
        
        if (isConfigured()) {
          // If configured properly, fetch from Instagram API
          postsData = await instagramService.getLatestPosts(2);
          reelsData = await instagramService.getLatestReels(1);
        } else {
          // Otherwise use mock data for development
          console.warn('Using mock Instagram data. Set up your Instagram API credentials in config/instagram.js');
          const mockData = instagramService.getMockMedia();
          postsData = mockData.media.filter(item => item.mediaType === MEDIA_TYPES.IMAGE).slice(0, 2);
          reelsData = mockData.media.filter(item => item.mediaType === MEDIA_TYPES.VIDEO).slice(0, 1);
        }
        
        setPosts(postsData);
        setReels(reelsData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load Instagram feed:', err);
        setError('Failed to load Instagram content. Please try again later.');
        setLoading(false);
      }
    };
    
    loadInstagramFeed();
  }, []);
  
  // Format the timestamp to a readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Truncate captions that are too long
  const truncateCaption = (caption, maxLength = 100) => {
    if (!caption || caption.length <= maxLength) return caption;
    return `${caption.substring(0, maxLength)}...`;
  };
  
  // Open Instagram post in new tab
  const openInstagramPost = (permalink) => {
    window.open(permalink, '_blank', 'noopener,noreferrer');
  };
  
  // Render content based on media type
  const renderMediaContent = (item) => {
    switch (item.mediaType) {
      case MEDIA_TYPES.VIDEO:
        return (
          <div className="relative pb-[100%] bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={item.thumbnailUrl} 
                alt={truncateCaption(item.caption, 20)} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-70 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      
      case MEDIA_TYPES.CAROUSEL_ALBUM:
        return (
          <div className="relative pb-[100%] bg-gray-100">
            <img 
              src={item.mediaUrl} 
              alt={truncateCaption(item.caption, 20)} 
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
          </div>
        );
      
      default: // IMAGE
        return (
          <div className="relative pb-[100%] bg-gray-100">
            <img 
              src={item.mediaUrl} 
              alt={truncateCaption(item.caption, 20)} 
              className="absolute w-full h-full object-cover"
            />
          </div>
        );
    }
  };
  
  // Render a post card
  const renderPostCard = (item) => (
    <div 
      key={item.id} 
      className="instagram-post overflow-hidden rounded-lg bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
      style={cardStyle}
      onClick={() => openInstagramPost(item.permalink)}
    >
      {renderMediaContent(item)}
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img 
              src="/assets/images/logo-circular.png" 
              alt="MiniBiscos" 
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-medium text-gray-800">minibiscos</span>
          </div>
          
          <span className="text-xs text-gray-500">{formatDate(item.timestamp)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{truncateCaption(item.caption)}</p>
        
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <div className="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{item.likeCount}</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{item.commentsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="instagram" className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-600">
            Follow Us on Instagram
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow our news, promotions and see our cookies being prepared by hand. Use #minibiscos to share your experience!
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <a
            href="https://www.instagram.com/minibiscos/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mb-4 text-pink-600 hover:text-pink-700 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-lg font-medium">@minibiscos</span>
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-600 border-r-transparent align-[-0.125em]"></div>
            <p className="mt-2 text-gray-600">Loading Instagram Posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Latest Reel Section */}
            <div className="md:col-span-1 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-pink-600">Latest Reel</h3>
              <div className="w-full">
                {reels.length > 0 ? (
                  renderPostCard(reels[0])
                ) : (
                  <div className="text-center p-8 bg-white rounded-lg shadow">
                    <p>No reels available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Latest Posts Section */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-center text-pink-600">Latest Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.length > 0 ? (
                  posts.map(post => renderPostCard(post))
                ) : (
                  <div className="col-span-2 text-center p-8 bg-white rounded-lg shadow">
                    <p>No posts available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <a 
            href="https://www.instagram.com/minibiscos/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
          >
            See More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default DynamicInstagramFeed;