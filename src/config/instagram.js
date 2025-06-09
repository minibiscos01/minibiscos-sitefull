/**
 * Instagram API Configuration
 * 
 * This file contains all configuration parameters needed for the Instagram API integration.
 * Replace the placeholder values with your actual Instagram API credentials.
 */

// Instagram API configuration
export const INSTAGRAM_CONFIG = {
  // Your Instagram Business Account ID
  // You'll get this when setting up the Instagram Graph API
  userId: 'YOUR_INSTAGRAM_USER_ID', 
  
  // Access token from Facebook Developer Portal
  // This should be a long-lived token (60 days) that you can refresh
  accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
  
  // API Version
  apiVersion: 'v17.0',
  
  // Default number of posts to fetch
  defaultLimit: 10,
  
  // Endpoint URLs
  endpoints: {
    baseUrl: 'https://graph.instagram.com',
    media: '/media',
    refresh: 'https://graph.instagram.com/refresh_access_token',
  },
  
  // Fields to request from the API
  fields: [
    'id',
    'caption',
    'media_type',
    'media_url',
    'permalink',
    'thumbnail_url',
    'timestamp',
    'username',
    'children{media_url,media_type}',
    'like_count',
    'comments_count'
  ].join(','),
};

// Media types returned by Instagram API
export const MEDIA_TYPES = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  CAROUSEL_ALBUM: 'CAROUSEL_ALBUM'
};

// Function to check if the configuration has been set up properly
export const isConfigured = () => {
  return (
    INSTAGRAM_CONFIG.userId !== 'YOUR_INSTAGRAM_USER_ID' &&
    INSTAGRAM_CONFIG.accessToken !== 'YOUR_INSTAGRAM_ACCESS_TOKEN'
  );
};

export default INSTAGRAM_CONFIG;