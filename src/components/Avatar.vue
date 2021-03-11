<template lang="pug">
  v-avatar(:size='size' :color='color' @click="openFullScreen()")
    v-icon(v-if="!src" color="#FFFFFF" ) no_photography
    v-img(:src="src" v-else)

    photo-swipe(
      :isOpen="isOpenGallery"
      :items="avatar"
      :options="optionsGallery"
      @close="hidePhotoGallery")
</template>

<script>
import { PhotoSwipe } from 'v-photoswipe';
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
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SvgIcon,
    PhotoSwipe,
  },
  data() {
    return {
      isOpenGallery: false,
      optionsGallery: {
        index: 0,
        showHideOpacity: true,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        arrowEl: false,
        counterEl: false,
      },
      avatar: [],
    };
  },
  methods: {
    openFullScreen() {
      if (this.fullscreen && this.src) {
        this.isOpenGallery = true;
        this.$set(this.optionsGallery, 'index', 0);
      }
    },

    hidePhotoGallery() {
      this.isOpenGallery = false;
    },

    loadImage() {
      const image = new Image();
      image.src = this.src;

      image.onload = (el) => {
        this.avatar = [
          {
            w: el.target.width,
            h: el.target.height,
            src: this.src,
          },
        ];
      };
    },
  },
  created() {
    if (this.src) this.loadImage();
  },
};
</script>
