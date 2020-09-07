<template lang="pug">
  v-avatar(:size='size' :color='color')
    svg-icon(name='PhotoCamera' v-if="!src")
    v-img(:src="src" v-else)
</template>

<script>
import axios from 'axios';
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

  },
  components: {
    SvgIcon,
    axios,
  },
};
</script>
