module.exports = {
  cache: {
    cacheId: "url-shortener-front",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    staticFileGlobs: ['dist/**/*']
  },
  manifest: {
    background: "#00BCD4",
    title: "URL Shortener",
    short_name: "lfum.es",
    theme_color: "#00BCD4"
  }
};
