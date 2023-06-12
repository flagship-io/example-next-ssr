const startFlagshipSDK = require('./startFlagshipSDK')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = () => {

  if (process.argv.includes('dev')) {
    startFlagshipSDK()
  }
  return nextConfig
}
