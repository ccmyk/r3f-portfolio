module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {}, // This is the plugin that allows nested syntax
    'postcss-custom-properties': {},
    'postcss-custom-media': {},
    'autoprefixer': {},
    // Only run cssnano in production
    'cssnano': process.env.NODE_ENV === 'production' ? {} : false,
  },
}