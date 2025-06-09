/**
 * Token Refresh Script for Instagram API Integration
 * 
 * This script demonstrates how to implement automatic token refreshing
 * for Instagram API tokens. It can be set up as a scheduled job (e.g., using cron)
 * to run every 30 days to ensure your tokens never expire.
 * 
 * To use this script:
 * 1. Install required packages: npm install node-fetch fs dotenv
 * 2. Create a .env file with your API credentials
 * 3. Set up as a scheduled task using cron or a similar scheduler
 * 
 * NOTE: This is a Node.js script example and NOT meant to be executed in the browser.
 */

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// Import required modules
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// Configuration
const CONFIG_PATH = path.join(__dirname, '../config/instagram.js');
const LOG_PATH = path.join(__dirname, '../logs/instagram-token-refresh.log');
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'your-email@example.com';

// Function to log messages with timestamps
async function log(message, isError = false) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  
  // Ensure log directory exists
  const logDir = path.dirname(LOG_PATH);
  try {
    await fs.mkdir(logDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  
  // Append to log file
  await fs.appendFile(LOG_PATH, logEntry);
  
  // Also output to console
  if (isError) {
    console.error(logEntry);
  } else {
    console.log(logEntry);
  }
  
  // If it's an error, send notification
  if (isError && NOTIFICATION_EMAIL) {
    await sendNotificationEmail(`Instagram Token Refresh Error: ${message}`);
  }
}

// Function to send notification email
async function sendNotificationEmail(subject, body = '') {
  // This is a placeholder. Implement your preferred email sending method here.
  // Examples include: Nodemailer, SendGrid, AWS SES, etc.
  console.log(`Would send email to ${NOTIFICATION_EMAIL} with subject: ${subject}`);
  
  // Example using Nodemailer:
  /*
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: NOTIFICATION_EMAIL,
    subject: subject,
    text: body || subject
  });
  */
}

// Function to read the current configuration file
async function readCurrentConfig() {
  try {
    const configContent = await fs.readFile(CONFIG_PATH, 'utf8');
    
    // Extract access token using regex
    const tokenMatch = configContent.match(/accessToken:\s*['"]([^'"]+)['"]/);
    if (!tokenMatch || !tokenMatch[1]) {
      throw new Error('Could not find access token in config file');
    }
    
    // Extract user ID using regex
    const userIdMatch = configContent.match(/userId:\s*['"]([^'"]+)['"]/);
    if (!userIdMatch || !userIdMatch[1]) {
      throw new Error('Could not find user ID in config file');
    }
    
    return {
      accessToken: tokenMatch[1],
      userId: userIdMatch[1]
    };
  } catch (error) {
    await log(`Error reading configuration file: ${error.message}`, true);
    throw error;
  }
}

// Function to update the configuration file with new token
async function updateConfig(newToken) {
  try {
    // Read current config
    let configContent = await fs.readFile(CONFIG_PATH, 'utf8');
    
    // Update access token
    configContent = configContent.replace(
      /(accessToken:\s*['"])([^'"]+)(['"])/,
      `$1${newToken}$3`
    );
    
    // Include comment with expiry date (60 days from now)
    const expiryDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    configContent = configContent.replace(
      /(accessToken:.*)/,
      `$1 // Expires on ${expiryDate}`
    );
    
    // Write updated config back
    await fs.writeFile(CONFIG_PATH, configContent, 'utf8');
    await log(`Configuration updated with new token, expires on ${expiryDate}`);
    
    return true;
  } catch (error) {
    await log(`Error updating configuration: ${error.message}`, true);
    throw error;
  }
}

// Function to refresh the Instagram access token
async function refreshToken() {
  try {
    await log('Starting Instagram access token refresh process...');
    
    // Get current configuration
    const config = await readCurrentConfig();
    
    // Construct the refresh URL
    const refreshUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${config.accessToken}`;
    
    // Send request to refresh the token
    const response = await fetch(refreshUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to refresh token. Status: ${response.status}, Response: ${errorText}`);
    }
    
    // Parse the response
    const data = await response.json();
    
    if (!data.access_token) {
      throw new Error('Refreshed token not found in response');
    }
    
    // Update configuration with new token
    await updateConfig(data.access_token);
    
    // Log success
    await log(`Token successfully refreshed. New token expires in ${data.expires_in} seconds (approximately ${Math.floor(data.expires_in / 86400)} days).`);
    
    return {
      success: true,
      newToken: data.access_token,
      expiresIn: data.expires_in
    };
  } catch (error) {
    await log(`Token refresh failed: ${error.message}`, true);
    
    return {
      success: false,
      error: error.message
    };
  }
}

// Create a backup of the config file
async function backupConfig() {
  try {
    const configContent = await fs.readFile(CONFIG_PATH, 'utf8');
    const backupPath = `${CONFIG_PATH}.backup-${new Date().toISOString().replace(/:/g, '-')}`;
    await fs.writeFile(backupPath, configContent, 'utf8');
    await log(`Configuration backup created at: ${backupPath}`);
    return true;
  } catch (error) {
    await log(`Failed to create config backup: ${error.message}`, true);
    return false;
  }
}

// Main function
async function main() {
  try {
    // Create backup before making any changes
    await backupConfig();
    
    // Refresh the token
    const refreshResult = await refreshToken();
    
    // Exit with success or failure code
    process.exit(refreshResult.success ? 0 : 1);
  } catch (error) {
    await log(`Unhandled error in token refresh process: ${error.message}`, true);
    process.exit(1);
  }
}

// Run the main function
if (require.main === module) {
  main();
}

// Export functions for potential use in other scripts
module.exports = {
  refreshToken,
  readCurrentConfig,
  updateConfig,
  backupConfig
};