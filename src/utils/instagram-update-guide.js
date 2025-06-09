/**
 * Instagram Feed Update Guide
 * ---------------------------
 * This file provides instructions on how to update the MiniBiscos Instagram feed
 * with the latest posts and reels.
 */

/**
 * HOW TO UPDATE INSTAGRAM POSTS AND REELS
 * ---------------------------------------
 * 
 * 1. MANUAL UPDATE METHOD (Current Implementation)
 * ------------------------------------------------
 * To update the Instagram posts and reels displayed on the website:
 * 
 * a) Navigate to src/components/InstagramFeed.jsx
 * b) Locate the following section (around line 27-30):
 * 
 *    const latestPostsData = [
 *      'https://www.instagram.com/p/Cvd4y88rsgm/', // Latest post 1
 *      'https://www.instagram.com/p/Cvd4vFLr6Ln/'  // Latest post 2
 *    ];
 *    
 *    const latestReelData = 'https://www.instagram.com/reel/Cvd4qPbrk9L/';
 * 
 * c) Replace these URLs with your latest Instagram post URLs:
 *    - Replace the URLs in 'latestPostsData' with your 2 most recent post URLs
 *    - Replace 'latestReelData' with your most recent reel URL
 * 
 * d) To get the correct URLs:
 *    - Go to your Instagram profile at https://www.instagram.com/minibiscos/
 *    - Click on a post/reel you want to display
 *    - Copy the URL from the browser address bar
 *    - The URL format should look like:
 *      • Posts: https://www.instagram.com/p/XXXXXXXX/
 *      • Reels: https://www.instagram.com/reel/XXXXXXXX/
 *
 * 
 * 2. AUTOMATED UPDATE METHOD (Future Implementation)
 * -------------------------------------------------
 * For a more automated solution, you will need:
 * 
 * a) An Instagram Developer Account
 * b) Set up a Facebook Developer App with Instagram Basic Display API
 * c) Generate a long-lived access token
 * d) Implement a backend service to fetch the latest posts
 * 
 * Implementation Steps:
 * 1. Create a Meta for Developers account: https://developers.facebook.com/
 * 2. Create a new app in Meta for Developers dashboard
 * 3. Add the Instagram Basic Display product
 * 4. Set up authentication and obtain access tokens
 * 5. Create a server-side API endpoint that:
 *    - Fetches latest posts using the Instagram Graph API
 *    - Returns formatted data for your frontend
 * 6. Update the fetchInstagramPosts function in InstagramFeed.jsx to call your API
 * 
 * Example API endpoint implementation:
 * 
 * async function getInstagramFeed() {
 *   const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
 *   const userId = 'YOUR_INSTAGRAM_USER_ID';
 *   
 *   // Get user media
 *   const response = await fetch(
 *     `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}&limit=10`
 *   );
 *   const data = await response.json();
 *   
 *   // Filter for posts and reels
 *   const posts = data.data.filter(item => item.media_type === 'IMAGE').slice(0, 2);
 *   const reels = data.data.filter(item => item.media_type === 'VIDEO').slice(0, 1);
 *   
 *   return {
 *     posts: posts.map(post => post.permalink),
 *     reel: reels.length > 0 ? reels[0].permalink : null
 *   };
 * }
 */

/**
 * EMBEDDING INSTAGRAM POSTS IN OTHER PARTS OF YOUR SITE
 * ----------------------------------------------------
 * If you want to embed Instagram posts in other parts of your website,
 * follow these steps:
 * 
 * 1. Create a new component or modify an existing one
 * 2. Add a blockquote element with the following attributes:
 *    - className="instagram-media"
 *    - data-instgrm-permalink="{post_url}"
 *    - data-instgrm-version="14"
 * 3. Include the Instagram embed.js script in your component:
 *    
 *    useEffect(() => {
 *      const script = document.createElement('script');
 *      script.src = '//www.instagram.com/embed.js';
 *      script.async = true;
 *      document.body.appendChild(script);
 *      
 *      script.onload = () => {
 *        if (window.instgrm) {
 *          window.instgrm.Embeds.process();
 *        }
 *      };
 *      
 *      return () => {
 *        document.body.removeChild(script);
 *      };
 *    }, []);
 */

export const INSTAGRAM_USERNAME = 'minibiscos';

// Export these constants for potential future use in automated implementation
export const INSTAGRAM_API = {
  BASE_URL: 'https://graph.instagram.com',
  FIELDS: 'id,caption,media_type,media_url,permalink,thumbnail_url',
  LIMIT: 10
};

export default {
  INSTAGRAM_USERNAME,
  INSTAGRAM_API
};