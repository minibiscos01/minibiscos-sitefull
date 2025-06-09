import React, { useEffect, useRef } from 'react';

/**
 * InstagramEmbed - A React component for embedding Instagram posts without API setup
 * 
 * @param {Object} props - Component props
 * @param {string} props.postId - Instagram post ID (e.g., "CqGcE5Pu_B1")
 * @param {string} [props.postUrl] - Full Instagram post URL (optional, overrides postId)
 * @param {boolean} [props.captioned=true] - Whether to show the caption
 * @param {Object} [props.containerStyle] - Additional styles for the container
 * @returns {JSX.Element} Instagram embed component
 */
const InstagramEmbed = ({ 
  postId, 
  postUrl,
  captioned = true,
  containerStyle = {}
}) => {
  const embedRef = useRef(null);
  
  // Determine the URL to use
  const embedUrl = postUrl || `https://www.instagram.com/p/${postId}/`;
  
  useEffect(() => {
    // Function to load the Instagram embed script
    const loadInstagramScript = () => {
      if (window.instgrm) {
        // If script is already loaded, just process the embeds
        window.instgrm.Embeds.process();
      } else {
        // Load the script
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    // Load Instagram embed script
    loadInstagramScript();

    // Check if the script has loaded and process embeds
    const timer = setInterval(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        clearInterval(timer);
      }
    }, 500);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, [postId, postUrl]); // Re-run when the post changes

  const defaultStyle = {
    background: '#FFF',
    border: 0,
    borderRadius: '8px',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
    margin: '10px auto',
    maxWidth: '540px',
    minWidth: '326px',
    padding: 0,
    width: '100%',
  };

  return (
    <div ref={embedRef} style={{ ...defaultStyle, ...containerStyle }}>
      <blockquote 
        className="instagram-media" 
        data-instgrm-permalink={embedUrl}
        data-instgrm-version="14"
        data-instgrm-captioned={captioned ? "true" : undefined}
        style={{ 
          margin: 0,
          width: '100%'
        }}
      >
        <div style={{ padding: 16 }}>
          <a href={embedUrl} 
             target="_blank" 
             rel="noopener noreferrer"
             style={{ 
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               height: 150,
               textAlign: 'center',
               textDecoration: 'none',
               color: '#d62976',
               fontFamily: 'Arial, sans-serif'
             }}
          >
            <span>View this post on Instagram</span>
          </a>
        </div>
      </blockquote>
    </div>
  );
};

export default InstagramEmbed;