module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-custom-properties': {},
    'postcss-custom-media': {},
    'autoprefixer': {},
    'cssnano': process.env.NODE_ENV === 'production' ? {} : false,
  },
}
