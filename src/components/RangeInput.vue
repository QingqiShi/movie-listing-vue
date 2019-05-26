<template>
  <input
    type="range"
    :min="0"
    :max="(max - min) / step"
    :value="(value - min) / step"
    @input="modelEmit"
  />
</template>

<script>
export default {
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    value: { type: Number, default: 0 }
  },
  methods: {
    modelEmit(e) {
      const value = this.min + parseInt(e.target.value) * this.step;
      this.$emit("input", value);
    }
  }
};
</script>

<style>
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  margin: 4.5px 0;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  box-shadow: 0px 0px 0.1px #000000, 0px 0px 0px #0d0d0d;
  background: #0055f6;
  border-radius: 6px;
  border: 2px solid #ffffff;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 2px solid #0055f6;
  height: 15px;
  width: 15px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6.5px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #1163ff;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  box-shadow: 0px 0px 0.1px #000000, 0px 0px 0px #0d0d0d;
  background: #0055f6;
  border-radius: 6px;
  border: 2px solid #ffffff;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 2px solid #0055f6;
  height: 15px;
  width: 15px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #004cdd;
  border: 2px solid #ffffff;
  border-radius: 12px;
  box-shadow: 0px 0px 0.1px #000000, 0px 0px 0px #0d0d0d;
}
input[type="range"]::-ms-fill-upper {
  background: #0055f6;
  border: 2px solid #ffffff;
  border-radius: 12px;
  box-shadow: 0px 0px 0.1px #000000, 0px 0px 0px #0d0d0d;
}
input[type="range"]::-ms-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 2px solid #0055f6;
  height: 15px;
  width: 15px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  height: 6px;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #0055f6;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #1163ff;
}
</style>
