const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com','m.media-amazon.com'],
  },
  pwa: {
    dest: 'public',
    swSrc: 'service-worker.js',
    disable: process.env.NODE_ENV === 'development',
    // publicExcludes: ['!*.mp3'],
    buildExcludes: [
      /chunks\/images\/.*$/, // Don't precache files under .next/static/chunks/images this improves next-optimized-images behaviour
      /chunks\/pages\/api\/.*/, // Dont cache the API it needs fresh serverinfo
    ],
  },
})
