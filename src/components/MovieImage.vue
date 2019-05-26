<template>
  <div class="movie-image">
    <img :src="srcUrl" :srcset="srcset" :sizes="sizes" alt="" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/constants/api";

const { IMAGE, ORIGINAL_IMAGE_WIDTH } = api;

export default {
  props: {
    src: { type: String, default: "" },
    type: { type: String, default: "poster" },
    targetWidth: { type: Number, default: 500 }
  },
  data: () => ({
    imageWidth: 100
  }),
  computed: {
    ...mapState({
      baseUrl: state => state.movies.configuration.imageBaseUrl,
      sizeArray(state) {
        if (!state.movies.configuration[`${this.type}Sizes`]) return [];

        return state.movies.configuration[`${this.type}Sizes`].filter(size =>
          // Numbers leading with 'w' or the word 'original'
          size.match(/^w[0-9]+$|^original$/)
        );
      }
    }),
    /** @returns {string} */
    srcUrl() {
      const size = this.sizeArray.length ? this.sizeArray[0] : "";
      return IMAGE(this.baseUrl, size, this.src);
    },
    srcset() {
      return this.sizeArray
        .map(size => {
          const query =
            size === "original"
              ? `${ORIGINAL_IMAGE_WIDTH}w`
              : `${parseInt(size.slice(1))}w`;

          return `${IMAGE(this.baseUrl, size, this.src)} ${query}`;
        })
        .join(", ");
    },
    sizes() {
      const getSizeQuery = i =>
        `(min-width: ${this.targetWidth * i}px) ${(100 / i).toFixed(2)}vw`;
      const result = [];

      // Loop from 7, above 7 the size changes are minimal
      for (let i = 7; i > 1; i--) {
        result.push(getSizeQuery(i));
      }
      result.push("100vw");

      return result.join(", ");
    }
  }
};
</script>

<style lang="scss">
.movie-image {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
