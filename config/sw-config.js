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
    background: "#FFFFFF",
    title: "URL Shortener",
    short_name: "lfum.es",
    theme_color: "#FFFFFF"
  }
};
