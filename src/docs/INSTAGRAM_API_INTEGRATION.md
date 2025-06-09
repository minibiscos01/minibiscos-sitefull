# Instagram API Integration for MiniBiscos

This document provides an overview of the Instagram API integration implemented for the MiniBiscos website. The integration allows you to display your Instagram posts and reels dynamically on your website.

## Table of Contents

1. [Implementation Overview](#implementation-overview)
2. [Files Structure](#files-structure)
3. [Quick Start Guide](#quick-start-guide)
4. [Detailed Setup Instructions](#detailed-setup-instructions)
5. [Maintenance and Token Management](#maintenance-and-token-management)
6. [Troubleshooting](#troubleshooting)
7. [Customization](#customization)

## Implementation Overview

The MiniBiscos website now includes a robust Instagram integration that:

- Displays your 2 most recent Instagram posts
- Shows your latest Instagram reel
- Includes post captions, like counts, and comment counts
- Provides links back to the original posts
- Handles errors gracefully
- Includes a fallback to mock data during development

The implementation uses the Instagram Graph API to fetch data directly from your Instagram account. This ensures your website always displays your latest content without manual updates.

## Files Structure

The Instagram API integration consists of the following files:

- **`src/config/instagram.js`**: Configuration file for your Instagram API credentials
- **`src/services/instagramService.js`**: Service that handles API calls to Instagram
- **`src/components/DynamicInstagramFeed.jsx`**: React component that displays the Instagram feed
- **`src/docs/instagram-api-setup-guide.md`**: Detailed guide for setting up the Instagram API
- **`src/docs/token-refresh-example.js`**: Example script for automating token refresh
- **`src/utils/instagram-update-guide.js`**: Manual update guide (for the previous implementation)

## Quick Start Guide

1. **Set up a Facebook Developer account** (if you don't have one already)
2. **Create a Facebook App** for your website
3. **Configure the Instagram Basic Display API** in your app
4. **Obtain access tokens** for your Instagram account
5. **Update the configuration file** with your credentials:
   ```javascript
   // src/config/instagram.js
   export const INSTAGRAM_CONFIG = {
     userId: 'YOUR_INSTAGRAM_USER_ID',
     accessToken: 'YOUR_LONG_LIVED_ACCESS_TOKEN',
     // Other values can remain unchanged
   };
   ```
6. **Deploy your updated website**

## Detailed Setup Instructions

### Prerequisites

- Facebook account
- Instagram Business account linked to a Facebook Page
- Basic understanding of web development

### Step 1: Create a Facebook Developer Account

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click on "Get Started" or "Log In"
3. Log in with your Facebook account
4. Complete the registration process if you're a new developer

### Step 2: Create a Facebook App

1. Go to [My Apps](https://developers.facebook.com/apps/) in the Facebook Developer Dashboard
2. Click on "Create App"
3. Select "Business" as the app type
4. Enter your app name (e.g., "MiniBiscos Website")
5. Enter your email address
6. Select your Business Account (create one if needed)
7. Click "Create App"

### Step 3: Set Up Instagram Basic Display API

1. In your new app's dashboard, click "Add Product" in the left sidebar
2. Find "Instagram Basic Display" and click "Set Up"
3. Configure the following settings:
   - **Valid OAuth Redirect URIs**: Add your website URL (e.g., `https://minibiscos.com/instagram-callback`)
   - **Deauthorize Callback URL**: Add your website URL (e.g., `https://minibiscos.com/instagram-deauth`)
   - **Data Deletion Request URL**: Add your website URL (e.g., `https://minibiscos.com/instagram-delete`)
4. Click "Save Changes"

### Step 4: Link Your Instagram Account

1. In the left sidebar, navigate to "Instagram Basic Display" > "Basic Display"
2. Under "User Token Generator", click "Add or Remove Instagram Testers"
3. Click "Add Instagram Testers" and enter your Instagram username
4. Go to your Instagram account and accept the tester invitation:
   - Open Instagram on your phone
   - Go to Settings > Apps and Websites > Tester Invites
   - Accept the invitation from your Facebook app

### Step 5: Obtain Access Tokens

1. Go back to your Facebook app dashboard
2. Navigate to "Instagram Basic Display" > "Basic Display"
3. Under "User Token Generator", click on "Generate Token" for the Instagram account you added
4. Log in with your Instagram credentials if prompted
5. Grant the necessary permissions
6. Copy the generated token - this is your **Short-lived Access Token**

### Step 6: Convert to a Long-lived Access Token

Short-lived tokens expire after 1 hour. Convert it to a long-lived token using the following steps:

1. Make a GET request to the following URL (you can use a browser):
   ```
   https://graph.instagram.com/access_token
   ?grant_type=ig_exchange_token
   &client_secret=YOUR_INSTAGRAM_APP_SECRET
   &access_token=SHORT_LIVED_ACCESS_TOKEN
   ```

   Replace:
   - `YOUR_INSTAGRAM_APP_SECRET` with your app secret (found in App Dashboard > Settings > Basic)
   - `SHORT_LIVED_ACCESS_TOKEN` with the token generated in the previous step

2. The response will contain a new token that is valid for 60 days:
   ```json
   {
     "access_token": "LONG_LIVED_ACCESS_TOKEN",
     "token_type": "bearer",
     "expires_in": 5184000
   }
   ```

3. Copy the `access_token` value - this is your **Long-lived Access Token**

### Step 7: Get Your Instagram User ID

1. Make a GET request to the following URL:
   ```
   https://graph.instagram.com/me?fields=id,username&access_token=LONG_LIVED_ACCESS_TOKEN
   ```
   
   Replace `LONG_LIVED_ACCESS_TOKEN` with your long-lived token

2. The response will contain your user ID:
   ```json
   {
     "id": "YOUR_INSTAGRAM_USER_ID",
     "username": "minibiscos"
   }
   ```

3. Copy the `id` value - this is your **Instagram User ID**

### Step 8: Update Configuration

1. Open the file `src/config/instagram.js` in your MiniBiscos website project
2. Update the configuration values:
   ```javascript
   export const INSTAGRAM_CONFIG = {
     userId: 'YOUR_INSTAGRAM_USER_ID', // The ID you obtained
     accessToken: 'YOUR_LONG_LIVED_ACCESS_TOKEN', // The long-lived token
     // Other values can remain unchanged
   };
   ```

3. Save the file
4. Deploy your updated website

## Maintenance and Token Management

Long-lived tokens expire after 60 days. To refresh them:

1. **Manual Refresh**: Make a GET request to the following URL before the token expires:
   ```
   https://graph.instagram.com/refresh_access_token
   ?grant_type=ig_refresh_token
   &access_token=CURRENT_LONG_LIVED_ACCESS_TOKEN
   ```

2. **Automated Refresh**: Set up a scheduled task using the provided example script:
   - See `src/docs/token-refresh-example.js` for implementation details
   - This script can be scheduled to run every 30 days to ensure your token never expires

3. **Monitoring**: Set up monitoring for your Instagram feed to ensure it's working properly:
   - Check the API responses for error codes
   - Implement error notifications (email/SMS alerts)
   - Set up a fallback to display cached content if the API fails

## Troubleshooting

### Common Issues

1. **No posts are displaying**:
   - Check if your Instagram API credentials are correct
   - Verify your Instagram account has public posts
   - Check browser console for API errors

2. **Error: Instagram API not properly configured**:
   - Update your access token and user ID in `src/config/instagram.js`

3. **Token expired error**:
   - Refresh your token following the steps in the "Maintenance" section

4. **Instagram API rate limit exceeded**:
   - The Instagram Graph API has rate limits. Add caching to your implementation to reduce API calls

5. **API changes breaking functionality**:
   - Meta occasionally updates their API. Check the [Graph API Changelog](https://developers.facebook.com/docs/graph-api/changelog/) for updates

### Debugging Tools

- Check the browser console for JavaScript errors
- Use the Network tab in Developer Tools to inspect API responses
- Test your API credentials using tools like Postman or cURL

## Customization

You can customize the Instagram feed component in the following ways:

1. **Styling**:
   - Modify the styles in `src/components/DynamicInstagramFeed.jsx` to match your website's design
   - Adjust the card styles, colors, and layout

2. **Number of Posts**:
   - Change the number of posts and reels displayed:
     ```javascript
     // In src/components/DynamicInstagramFeed.jsx
     if (isConfigured()) {
       postsData = await instagramService.getLatestPosts(3); // Change 2 to your desired number
       reelsData = await instagramService.getLatestReels(2); // Change 1 to your desired number
     }
     ```

3. **Display Options**:
   - Modify the `renderPostCard` function to change what information is displayed
   - Add or remove elements like comments, timestamps, or user information

4. **Filtering**:
   - Add filtering by hashtags:
     ```javascript
     // Filter posts by hashtag
     const filterByHashtag = (posts, hashtag) => {
       return posts.filter(post => 
         post.caption && post.caption.includes(`#${hashtag}`)
       );
     };
     
     // Usage
     const filteredPosts = filterByHashtag(postsData, 'minibiscos');
     ```

For additional customization needs, consult the Instagram Graph API documentation or contact your web development team.

---

**Note**: This implementation relies on the Instagram Graph API, which is subject to Instagram's terms of service and rate limits. Always review Meta's developer policies when implementing social media integrations.