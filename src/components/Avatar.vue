<template lang="pug">
  v-avatar(:size='size' :color='color')
    v-icon(v-if="!src" color="#FFFFFF" ) no_photography
    v-img(:src="src" v-else)
</template>

<script>
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'avatar',
  props: {
    size: {
      type: String,
      default: '36',
    },
    color: {
      type: String,
      default: '#56D68B',
    },
    src: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'private',
    },

  },
  components: {
    SvgIcon,
  },
};
</script>

<style lang="stylus" scoped>
  input[type="file"] {
    position absolute
    left -500px
  }
</style>
