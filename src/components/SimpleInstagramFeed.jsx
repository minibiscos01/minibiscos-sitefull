import React, { useState, useEffect } from 'react';
import InstagramEmbed from './InstagramEmbed';

/**
 * SimpleInstagramFeed - A simplified Instagram feed component that uses embeds
 * rather than API calls, displayed in a responsive grid layout
 * 
 * @param {Object} props Component props
 * @param {Array<string>} props.postIds Array of Instagram post IDs to display
 * @param {number} [props.columns=2] Number of columns in the grid
 * @param {boolean} [props.showCaptions=true] Whether to show post captions
 * @param {Object} [props.containerStyle] Additional styles for container
 * @param {string} [props.title="Instagram Feed"] Title for the feed section
 * @returns {JSX.Element} Instagram feed component
 */
const SimpleInstagramFeed = ({
  postIds = [],
  columns = 2,
  showCaptions = true,
  containerStyle = {},
  title = "Instagram Feed"
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  
  // Handle responsive columns
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine actual number of columns based on screen size
  const getResponsiveColumns = () => {
    if (windowWidth < 640) return 1; // Mobile: always single column
    if (windowWidth < 1024) return Math.min(columns, 2); // Tablet: max 2 columns
    return columns; // Desktop: use specified columns
  };
  
  // Simulate loading effect for embeds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!postIds || postIds.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No Instagram posts to display</p>
      </div>
    );
  }
  
  return (
    <div style={containerStyle} className="instagram-feed py-8">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      ) : (
        <div 
          className="grid gap-6" 
          style={{ 
            gridTemplateColumns: `repeat(${getResponsiveColumns()}, minmax(0, 1fr))` 
          }}
        >
          {postIds.map((postId) => (
            <div key={postId} className="instagram-post-container">
              <InstagramEmbed 
                postId={postId}
                captioned={showCaptions}
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="text-center mt-8">
        <a 
          href="https://www.instagram.com/minibiscos/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          Follow us on Instagram
        </a>
      </div>
    </div>
  );
};

export default SimpleInstagramFeed;