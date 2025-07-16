// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  // Your Next.js config here
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // add md/mdx
});
 
module.exports = nextConfig;