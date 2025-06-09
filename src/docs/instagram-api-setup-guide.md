# Instagram API Integration Guide for MiniBiscos

This guide will walk you through the process of setting up Instagram API integration for your MiniBiscos website. Follow these steps to display your Instagram posts and reels automatically on your website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating a Facebook Developer Account](#creating-a-facebook-developer-account)
3. [Setting Up a Facebook App](#setting-up-a-facebook-app)
4. [Setting Up Instagram Basic Display API](#setting-up-instagram-basic-display-api)
5. [Obtaining Access Tokens](#obtaining-access-tokens)
6. [Configuring Your Website](#configuring-your-website)
7. [Access Token Management](#access-token-management)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

- Facebook account
- Instagram Business account linked to a Facebook Page
- Basic understanding of web development

## Creating a Facebook Developer Account

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click on "Get Started" or "Log In"
3. Log in with your Facebook account
4. Complete the registration process if you're a new developer

## Setting Up a Facebook App

1. Go to [My Apps](https://developers.facebook.com/apps/) in the Facebook Developer Dashboard
2. Click on "Create App"
3. Select "Business" as the app type
4. Enter your app name (e.g., "MiniBiscos Website")
5. Enter your email address
6. Select your Business Account (create one if needed)
7. Click "Create App"

## Setting Up Instagram Basic Display API

1. In your new app's dashboard, click "Add Product" in the left sidebar
2. Find "Instagram Basic Display" and click "Set Up"
3. Configure the following settings:
   - **Valid OAuth Redirect URIs**: Add your website URL (e.g., `https://minibiscos.com/instagram-callback`)
   - **Deauthorize Callback URL**: Add your website URL (e.g., `https://minibiscos.com/instagram-deauth`)
   - **Data Deletion Request URL**: Add your website URL (e.g., `https://minibiscos.com/instagram-delete`)
4. Click "Save Changes"

## Linking Your Instagram Account

1. In the left sidebar, navigate to "Instagram Basic Display" > "Basic Display"
2. Under "User Token Generator", click "Add or Remove Instagram Testers"
3. Click "Add Instagram Testers" and enter your Instagram username
4. Go to your Instagram account and accept the tester invitation:
   - Open Instagram on your phone
   - Go to Settings > Apps and Websites > Tester Invites
   - Accept the invitation from your Facebook app

## Obtaining Access Tokens

1. Go back to your Facebook app dashboard
2. Navigate to "Instagram Basic Display" > "Basic Display"
3. Under "User Token Generator", click on "Generate Token" for the Instagram account you added
4. Log in with your Instagram credentials if prompted
5. Grant the necessary permissions
6. Copy the generated token - this is your **Short-lived Access Token**

### Converting to a Long-lived Access Token

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

## Getting Your Instagram User ID

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

## Configuring Your Website

1. Open the file `src/config/instagram.js` in your MiniBiscos website project
2. Update the configuration values:
   ```javascript
   export const INSTAGRAM_CONFIG = {
     userId: 'YOUR_INSTAGRAM_USER_ID', // The ID you obtained in the previous step
     accessToken: 'YOUR_LONG_LIVED_ACCESS_TOKEN', // The long-lived token you generated
     // Other values can remain unchanged
   };
   ```

3. Save the file
4. Your website will now use the Instagram API to fetch and display your latest posts and reels

## Access Token Management

Long-lived tokens expire after 60 days. To refresh them:

1. Make a GET request to the following URL before the token expires:
   ```
   https://graph.instagram.com/refresh_access_token
   ?grant_type=ig_refresh_token
   &access_token=CURRENT_LONG_LIVED_ACCESS_TOKEN
   ```

2. The response will contain a new token valid for another 60 days:
   ```json
   {
     "access_token": "NEW_LONG_LIVED_ACCESS_TOKEN",
     "token_type": "bearer",
     "expires_in": 5184000
   }
   ```

3. Update the token in `src/config/instagram.js`

You can automate this process using the `refreshAccessToken()` method in the `InstagramService` class:
