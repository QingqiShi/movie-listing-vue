const urls = {
  API_KEY: "e8e8b3d77e2a85c1ae77d3c6a5fafc6e",
  API_HOST: "https://api.themoviedb.org/3",
  ORIGINAL_IMAGE_WIDTH: 2000,

  CONFIGURATION: () => `${urls.API_HOST}/configuration?api_key=${urls.API_KEY}`,

  /** @type {(language:string) => string} */
  NOW_PLAYING: language =>
    `${urls.API_HOST}/movie/now_playing?api_key=${
      urls.API_KEY
    }&language=${language}`,

  /** @type {(language:string) => string} */
  GENRES_LIST: language =>
    `${urls.API_HOST}/genre/movie/list?api_key=${
      urls.API_KEY
    }&language=${language}`,

  /** @type {(baseUrl:string, size:string, src:string) => string} */
  IMAGE: (baseUrl, size, src) => `${baseUrl}${size}${src}`
};

export default urls;
