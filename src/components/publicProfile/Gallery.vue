<template lang="pug">
  .gallery
    .gallery-title Галерея
    .media-wrp(v-if="userCard._id")
      .media-file(
        v-for="mediaFile in mediaFiles"
        v-if="mediaFile.type == 'image'"
        :key="mediaFile.src")
        v-img(
          @click="showMedia(mediaFile)"
          :src="mediaFile"
          aspect-ratio='1')

      .no-media(v-if="!mediaFiles.length") Нет фотографий

    v-skeleton-loader(type="image" :loading="true" height="170" v-else)

    photo-swipe(
      :isOpen="isOpenGallery"
      :items="photoFiles"
      :options="optionsGallery"
      @close="hidePhotoGallery")
</template>

<script>
import { PhotoSwipe } from 'v-photoswipe';
import logger from '../../scripts/logger';

export default {
  name: 'public-gallery',
  components: {
    PhotoSwipe,
  },
  props: {
    userCard: Object,
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
      },
      mediaFiles: [],
      photoFiles: [],
    };
  },
  methods: {
    showMedia(mediaFile) {
      if (mediaFile.type === 'image') {
        this.isOpenGallery = true;
        this.$set(this.optionsGallery, 'index', mediaFile.photoIndex);
      }

      if (mediaFile.type === 'video') {
        const options = {
          successCallback() {
            logger.log('Video was closed without error.');
          },
          errorCallback(error) {
            logger.log(error);
          },
        };

        window.plugins.streamingMedia.playVideo(
          mediaFile.fileEntry.nativeURL,
          options,
        );
      }
    },

    hidePhotoGallery() {
      this.isOpenGallery = false;
    },

    prepareMediaFiles(rowMediaFiles) {
      let mediaObject = {};
      let index = 0;

      this.mediaFiles = [];
      this.photoFiles = [];

      rowMediaFiles.forEach((element) => {
        if (element.ext === 'jpg' || element.ext === 'png') {
          mediaObject = {
            src: this.$baseUrlNoPort + element.url.substr(1),
            type: 'image',
            photoIndex: index,
            serverData: element,
            status: 'upload',
          };

          index += 1;
          this.photoFiles.push(mediaObject);
        }

        if (element.ext === 'mp4' || element.ext === 'wav') {
          mediaObject = {
            src: this.$baseUrlNoPort + element.url.substr(1),
            type: 'video',
            serverData: element.src,
          };
        }

        this.mediaFiles.push(mediaObject);

        this.photoFiles.forEach((elementObject) => {
          if (elementObject.type === 'image') {
            const image = new Image();
            image.src = elementObject.src;
            image.onload = (el) => {
              // eslint-disable-next-line no-param-reassign
              elementObject.w = el.target.width;
              // eslint-disable-next-line no-param-reassign
              elementObject.h = el.target.height;
            };
          }
        });
      });
    },
  },
  watch: {
    userCard() {
      if (this.userCard.photos?.length) this.prepareMediaFiles(this.userCard.photos);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .gallery {
    margin-top 10px
    margin-bottom 10px
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px

    &-title {
      color #656565;
    }
  }

  .media-file {
    width 170px
    height 150px
    max-height 150px
    display inline-block
    vertical-align: top
    margin-right 7px
    border-radius 4px
  }

  .media-file .v-responsive {
    border-radius 4px
  }

  .video-file {
    width 42%
    display inline-block
    vertical-align: top
    margin-right 7px
    border-radius 4px
  }

  .media-wrp{
    overflow: hidden;
    overflow-x: scroll;
    white-space:nowrap;
    padding 12px
  }

  .media-files .row{
    display inlane
    overflow auto
    white-space nowrap
    flex-wrap nowrap
  }

  .no-media {
    margin -12px
  }
</style>
