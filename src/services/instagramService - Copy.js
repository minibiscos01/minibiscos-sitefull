/**
 * Instagram Service
 * 
 * This service handles all interactions with the Instagram Graph API.
 * It provides methods to fetch media, refresh access tokens, and process the response data.
 */
import INSTAGRAM_CONFIG, { MEDIA_TYPES, isConfigured } from '../config/instagram';

class InstagramService {
  /**
   * Fetch media items from the Instagram Graph API
   * @param {number} limit - Number of posts to fetch
   * @param {string} after - Pagination cursor for fetching next page
   * @returns {Promise<Object>} - Instagram media items and pagination info
   */
  async fetchMedia(limit = INSTAGRAM_CONFIG.defaultLimit, after = null) {
    if (!isConfigured()) {
      throw new Error('Instagram API is not properly configured');
    }

    try {
      const { userId, accessToken, fields, endpoints } = INSTAGRAM_CONFIG;
      
      let url = `${endpoints.baseUrl}/${userId}${endpoints.media}?access_token=${accessToken}&fields=${fields}&limit=${limit}`;
      
      if (after) {
        url += `&after=${after}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Instagram API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return this._processMediaResponse(data);
      
    } catch (error) {
      console.error('Failed to fetch Instagram media:', error);
      throw error;
    }
  }
  
  /**
   * Refresh the access token to extend its validity
   * @returns {Promise<Object>} - New access token information
   */
  async refreshAccessToken() {
    if (!isConfigured()) {
      throw new Error('Instagram API is not properly configured');
    }
    
    try {
      const { accessToken, endpoints } = INSTAGRAM_CONFIG;
      const url = `${endpoints.refresh}?grant_type=ig_refresh_token&access_token=${accessToken}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        tokenType: data.token_type
      };
      
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      throw error;
    }
  }
  
  /**
   * Get the latest Instagram posts
   * @param {number} count - Number of posts to fetch
   * @returns {Promise<Array>} - Array of processed post objects
   */
  async getLatestPosts(count = 6) {
    const response = await this.fetchMedia(count);
    return response.media;
  }
  
  /**
   * Get the latest Instagram reels
   * @param {number} count - Number of reels to fetch
   * @returns {Promise<Array>} - Array of processed reel objects
   */
  async getLatestReels(count = 3) {
    const response = await this.fetchMedia(count * 3); // Fetch more to ensure we get enough reels
    const reels = response.media.filter(item => item.mediaType === MEDIA_TYPES.VIDEO);
    return reels.slice(0, count);
  }
  
  /**
   * Process the raw API response into a more usable format
   * @param {Object} response - Raw API response
   * @returns {Object} - Processed media and pagination data
   * @private
   */
  _processMediaResponse(response) {
    const media = response.data.map(item => ({
      id: item.id,
      caption: item.caption || '',
      mediaType: item.media_type,
      mediaUrl: item.media_url || (item.thumbnail_url || ''),
      thumbnailUrl: item.thumbnail_url || item.media_url || '',
      permalink: item.permalink,
      timestamp: item.timestamp,
      username: item.username,
      likeCount: item.like_count || 0,
      commentsCount: item.comments_count || 0,
      children: item.children ? item.children.data.map(child => ({
        mediaType: child.media_type,
        mediaUrl: child.media_url
      })) : []
    }));
    
    return {
      media,
      pagination: response.paging || null
    };
  }
  
  /**
   * Simulate fetching media items (for development)
   * @returns {Object} - Mock media items
   */
  getMockMedia() {
    return {
      media: [
        {
          id: '1',
          caption: 'Nossos deliciosos biscoitos de goiabada! 😋 #minibiscos #artesanal',
          mediaType: MEDIA_TYPES.IMAGE,
          mediaUrl: '/assets/images/biscoito_goiabada_tratado.jpg',
          thumbnailUrl: '/assets/images/biscoito_goiabada_tratado.jpg',
          permalink: 'https://www.instagram.com/p/Cvd4y88rsgm/',
          timestamp: '2023-09-10T18:30:00+0000',
          username: 'minibiscos',
          likeCount: 45,
          commentsCount: 5,
          children: []
        },
        {
          id: '2',
          caption: 'Novos biscoitos de chocolate belga disponíveis agora! 🍫 #minibiscos #chocolate',
          mediaType: MEDIA_TYPES.IMAGE,
          mediaUrl: '/assets/images/biscoito_chocolate_belga.png',
          thumbnailUrl: '/assets/images/biscoito_chocolate_belga.png',
          permalink: 'https://www.instagram.com/p/Cvd4vFLr6Ln/',
          timestamp: '2023-09-05T15:45:00+0000',
          username: 'minibiscos',
          likeCount: 38,
          commentsCount: 7,
          children: []
        },
        {
          id: '3',
          caption: 'Processo de fabricação dos nossos biscoitos artesanais! Veja como fazemos cada biscoito com amor e dedicação. ❤️ #minibiscos #artesanal #processofabricacao',
          mediaType: MEDIA_TYPES.VIDEO,
          mediaUrl: '/assets/images/biscoito_doce_de_leite.png',
          thumbnailUrl: '/assets/images/biscoito_doce_de_leite.png',
          permalink: 'https://www.instagram.com/reel/Cvd4qPbrk9L/',
          timestamp: '2023-09-01T12:00:00+0000',
          username: 'minibiscos',
          likeCount: 67,
          commentsCount: 12,
          children: []
        }
      ],
      pagination: {
        cursors: {
          before: 'QVFIUjJfbEQzckZABQy1FYXBja3ZA5M0FTZAEFiMHo5X3hVUEJtNnA5UEVsSS0tVG94LW5GTzB3QXlMbGJxVW02S2FGR3dsNXFnV1JzQ045NHd5LURPWmJvZAWNB',
          after: 'QVFIUml1LXdKN3ZA0SGhEeWJHbDBMUEpGQVQydVhDdlRFMEEtVWNHSk5fZAVdoM0o4RHV3cVo5NWM3dUFKVXdzeVVLdmZAzSGV6b3Q2YVFzd3o5MVp3X3o3ZA2tB'
        },
        next: 'https://graph.instagram.com/v17.0/me/media?access_token=IGQWRP...'
      }
    };
  }
}

// Create helper functions for the API
export const fetchInstagramPosts = async (count = 6) => {
  return await instagramService.getLatestPosts(count);
};

export const fetchInstagramReels = async (count = 3) => {
  return await instagramService.getLatestReels(count);
};

// Export a singleton instance
const instagramService = new InstagramService();
export default instagramService;