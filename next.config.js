// Importing the startFlagshipSDK function from the startFlagshipSDK module
const { startFlagshipSDKAsync } = require('./startFlagshipSDK');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

// Exporting a function that returns the Next.js configuration object
module.exports = () => {
  // Check if the 'dev' or 'start' argument is present in the process arguments
  if (process.argv.includes('dev') || process.argv.includes('start')) {
    startFlagshipSDKAsync(); // If it is, start the Flagship SDK
  }
  return nextConfig; // Return the Next.js configuration object
};