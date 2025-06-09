import React, { useState, useEffect } from 'react';
import InstagramEmbed from './InstagramEmbed';
import { fetchInstagramPosts, fetchInstagramReels } from '../services/instagramService';
import { INSTAGRAM_CONFIG } from '../config/instagram';

/**
 * InstagramIntegrationDemo - Component that demonstrates both Instagram integration methods
 * side by side: API-based (DynamicInstagramFeed) and Embed-based (InstagramEmbed)
 */
const InstagramIntegrationDemo = () => {
  const [apiPosts, setApiPosts] = useState([]);
  const [apiReels, setApiReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Example post IDs for embedding
  const embedPostIds = ['CqGcE5Pu_B1', 'CpXzF7VuM9p']; 
  
  // Check if the Instagram API is properly configured
  const isConfigured = () => {
    return INSTAGRAM_CONFIG && 
      INSTAGRAM_CONFIG.accessToken && 
      INSTAGRAM_CONFIG.userId && 
      INSTAGRAM_CONFIG.accessToken !== 'YOUR_INSTAGRAM_ACCESS_TOKEN';
  };
  
  // Load posts from the Instagram API
  useEffect(() => {
    const loadInstagramContent = async () => {
      setLoading(true);
      try {
        if (isConfigured()) {
          // Fetch real data if API is configured
          const posts = await fetchInstagramPosts(2);  // Get 2 posts
          const reels = await fetchInstagramReels(1);  // Get 1 reel
          setApiPosts(posts);
          setApiReels(reels);
        } else {
          // Use fallback mock data
          setApiPosts([
            { 
              id: 'mock1', 
              media_url: '/assets/images/mock-instagram-1.jpg',
              caption: 'Delicious cookies fresh from the oven! #minibiscos #artisanal',
              permalink: 'https://instagram.com/'
            },
            {
              id: 'mock2',
              media_url: '/assets/images/mock-instagram-2.jpg',
              caption: 'Perfect for your morning coffee! #cookies #handmade',
              permalink: 'https://instagram.com/'
            }
          ]);
          setApiReels([
            {
              id: 'mock-reel',
              media_url: '/assets/images/mock-reel-thumbnail.jpg',
              caption: 'Behind the scenes of our cookie making process!',
              permalink: 'https://instagram.com/'
            }
          ]);
        }
      } catch (err) {
        console.error('Error loading Instagram content:', err);
        setError('Failed to load Instagram content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadInstagramContent();
  }, []);
  
  // Render a post card for the API-based approach
  const renderApiPostCard = (post) => (
    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto">
      <img 
        src={post.media_url} 
        alt="Instagram Post" 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">
          {post.caption ? post.caption.substring(0, 100) + (post.caption.length > 100 ? '...' : '') : 'No caption'}
        </p>
        <a 
          href={post.permalink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-800 text-sm font-medium"
        >
          View on Instagram
        </a>
      </div>
    </div>
  );

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Instagram Integration Methods</h1>
        
        {/* Method Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">Method 1: API-based Integration</h2>
            <div className="mb-4">
              <h3 className="font-medium text-lg mb-2">Advantages:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Automatically updates when new posts are published</li>
                <li>Fully customizable design and layout</li>
                <li>Can fetch posts by hashtags or user</li>
                <li>Better control over loading states and errors</li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-medium text-lg mb-2">Limitations:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Requires API setup and configuration</li>
                <li>Access tokens expire and need refreshing</li>
                <li>Subject to API rate limits</li>
                <li>More complex implementation</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">Method 2: Embed-based Integration</h2>
            <div className="mb-4">
              <h3 className="font-medium text-lg mb-2">Advantages:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>No API credentials or setup required</li>
                <li>Official Instagram styling and features</li>
                <li>Includes likes, comments and interaction buttons</li>
                <li>Simple implementation with minimal code</li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-medium text-lg mb-2">Limitations:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Requires manual updates for new content</li>
                <li>Limited customization options</li>
                <li>Less control over appearance and loading</li>
                <li>Additional script loading affects performance</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Live Examples Section */}
        <h2 className="text-2xl font-bold text-center mb-8">Live Examples</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* API-based Method */}
          <div>
            <h3 className="text-xl font-semibold text-center mb-6">API-based Method</h3>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apiPosts.map(post => renderApiPostCard(post))}
              </div>
            )}
            
            <div className="mt-8">
              {apiReels.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium mb-3">Latest Reel:</h4>
                  {renderApiPostCard(apiReels[0])}
                </div>
              )}
            </div>
          </div>
          
          {/* Embed-based Method */}
          <div>
            <h3 className="text-xl font-semibold text-center mb-6">Embed-based Method</h3>
            
            <div className="space-y-6">
              {embedPostIds.map(postId => (
                <InstagramEmbed 
                  key={postId}
                  postId={postId}
                  captioned={true}
                  containerStyle={{ margin: '0 auto 20px' }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Recommendation Section */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Our Recommendation</h2>
          
          <div className="text-lg">
            <p className="mb-4">
              Based on your needs for MiniBiscos, we recommend a <span className="font-semibold">hybrid approach</span>:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <span className="font-medium">Use the API-based method</span> for your main Instagram feed to keep content automatically updated with your latest posts
              </li>
              <li>
                <span className="font-medium">Use the embed-based method</span> for special featured posts that you want to highlight in specific sections of your site
              </li>
            </ul>
            
            <p>
              This combination gives you both the automation benefits of the API integration and the simplicity of embedded posts for specific content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramIntegrationDemo;