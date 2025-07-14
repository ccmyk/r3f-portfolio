// next.config.js
const { withContentlayer } = require('next-contentlayer2')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config
}

module.exports = withContentlayer(nextConfig)