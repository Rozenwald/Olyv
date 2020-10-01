<template>
  <svg class="svg-icon" :style="style" xmlns="http://www.w3.org/2000/svg">
    <use :width="style.width" :color="style.color" :height="style.height" :href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink"/>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',

  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: false,
      default: '24',
    },
    height: {
      type: String,
      required: false,
      default: '24',
    },
  },
  /* eslint-disable global-require */
  computed: {
    iconPath() {
      // eslint-disable-next-line import/no-dynamic-require
      const icon = require(`@/assets/icons/${this.name}.svg`);
      /* eslint-enable global-require */
      return `${icon}#${this.name}`;
    },
    currentWidth() {
      return `${this.width}px`;
    },
    currentHeight() {
      return `${this.height}px`;
    },
    style() {
      return { width: `${this.width}px`, height: `${this.height}px` };
    },
  },
};
</script>
