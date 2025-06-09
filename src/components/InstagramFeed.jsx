import React, { useEffect, useState, useRef } from 'react';

const InstagramFeed = () => {
  const instagramRef = useRef(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestReel, setLatestReel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const instagramUsername = 'minibiscos';

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        // Use Instagram's oembed API endpoint to get the latest posts
        const response = await fetch(`https://www.instagram.com/${instagramUsername}/channel/?__a=1&__d=dis`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        // Since Instagram's API might be restricted, we'll use fixed URLs for demo purposes
        // In production, you would use the proper Instagram Graph API with authentication
        
        // Mock latest posts data - in production, you'd parse the API response
        const latestPostsData = [
          'https://www.instagram.com/p/Cvd4y88rsgm/', // Latest post 1
          'https://www.instagram.com/p/Cvd4vFLr6Ln/'  // Latest post 2
        ];
        
        // Mock latest reel data
        const latestReelData = 'https://www.instagram.com/reel/Cvd4qPbrk9L/';
        
        setLatestPosts(latestPostsData);
        setLatestReel(latestReelData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        setError('Unable to load Instagram posts');
        setLoading(false);
      }
    };
    
    fetchInstagramPosts();
    
    // Add Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;

    // Initialize Instagram embed once the script is loaded
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Style for Instagram embeds
  const instagramEmbedStyle = {
    background: '#FFF',
    border: '0',
    borderRadius: '3px',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
    margin: '1px',
    maxWidth: '540px',
    minWidth: '326px',
    padding: '0',
    width: '99.375%'
  };

  return (
    <section id="instagram" className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-600">
            Nos Siga no Instagram
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acompanhe nossas novidades, promoções e veja nossos biscoitos sendo preparados artesanalmente. Use #minibiscos para compartilhar sua experiência!
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
            <p className="mt-2 text-gray-600">Carregando posts do Instagram...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div ref={instagramRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Latest Reel Section */}
            <div className="md:col-span-1 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-pink-600">Último Reel</h3>
              <div className="instagram-post w-full">
                {latestReel && (
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={latestReel}
                    data-instgrm-version="14"
                    style={instagramEmbedStyle}
                  ></blockquote>
                )}
              </div>
            </div>

            {/* Latest Posts Section */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-center text-pink-600">Últimos Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestPosts.map((postUrl, index) => (
                  <div key={index} className="instagram-post">
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={postUrl}
                      data-instgrm-version="14"
                      style={instagramEmbedStyle}
                    ></blockquote>
                  </div>
                ))}
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
            Ver Mais no Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;