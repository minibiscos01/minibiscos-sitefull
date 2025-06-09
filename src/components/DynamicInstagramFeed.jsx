import React, { useState, useEffect } from 'react';
import instagramService from '../services/instagramService';

const DynamicInstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const postsData = await instagramService.getLatestPosts(2);
        const reelsData = await instagramService.getLatestReels(1);

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

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const truncateCaption = (caption, maxLength = 100) => {
    if (!caption || caption.length <= maxLength) return caption;
    return `${caption.substring(0, maxLength)}...`;
  };

  const openInstagramPost = (permalink) => {
    window.open(permalink, '_blank', 'noopener,noreferrer');
  };

  const renderMediaContent = (item) => {
    if (item.mediaType === 'VIDEO') {
      return (
        <video
          src={item.mediaUrl}
          controls
          className="w-full h-full object-cover"
        />
      );
    } else {
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
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07...z" />
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
