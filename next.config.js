const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    skipWaiting: true,
    publicExcludes: ['!*.mp3'],
    buildExcludes: [
      /chunks\/images\/.*$/, // Don't precache files under .next/static/chunks/images this improves next-optimized-images behaviour
      /chunks\/pages\/api\/.*/, // Dont cache the API it needs fresh serverinfo
    ],
  },
})
