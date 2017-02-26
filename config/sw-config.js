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
    title: "url-shortener-front",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
