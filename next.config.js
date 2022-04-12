const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  pwa: {
    dest: 'public',
    swSrc: 'sw.js',
    // disable: process.env.NODE_ENV === 'development',
    // register: true,
    // skipWaiting: true,
    // scope: '/app',
    // sw: 'service-worker.js',
    //...
  },
})
