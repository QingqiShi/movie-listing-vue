module.exports = {
  pwa: {
    name: "Movie Listing Vue | Qingqi Shi"
  },

  lintOnSave: undefined,

  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_import.scss";`
      }
    }
  }
};
