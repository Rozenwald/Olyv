<template lang="pug">
  v-sheet.information(elevation="1" rounded)
    v-row.information-header(align="center")
      v-col(cols="6")
        v-row(align="center" justify="center")
          svg-icon(name="Responded")
          span {{order.countResponse}} ответов
      v-col(cols="6")
        v-row(align="center" justify="center")
          svg-icon(name="Time")
          span {{formatedTime}}
    v-row.information-description {{order.description}}
    .media-wrp(v-show="mediaFiles.length")
      .media-file(
        v-for="mediaFile in mediaFiles"
        :key="mediaFile.src")
        v-img(
          v-if="mediaFile.type != 'video'"
          :src="mediaFile.src"
          @click="showMedia(mediaFile)"
          aspect-ratio='1')
        v-img.status-content(v-else aspect-ratio='1')
          v-row.status-content(align="center" justify="center")
            v-icon(x-large) play_arrow
    photo-swipe(
      :isOpen="isOpenGallery"
      :items="photoFiles"
      :options="optionsGallery"
      @close="hidePhotoGallery")
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { PhotoSwipe } from 'v-photoswipe';
import Avatar from '../Avatar.vue';
import SvgIcon from '../SvgIcon.vue';
import logger from '../../scripts/logger';

export default {
  name: 'order-information',
  components: {
    SvgIcon,
    Avatar,
    'photo-swipe': PhotoSwipe,
  },
  data() {
    return {
      mediaFiles: [],
      photoFiles: [],
      photoObject: null,
      isOpenGallery: false,
      options: {
        index: 0,
      },
      optionsGallery: {
        index: 0,
        showHideOpacity: true,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        arrowEl: false,
      },
    };
  },
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    download(url) {
      axios.get(url, { responseType: 'blob' })
        .then((res) => logger.log(res))
        .catch((error) => logger.log(error));
    },

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

        logger.log('dsdsdsdsdsdsds');
        logger.log(mediaFile.src);

        window.plugins.streamingMedia.playVideo(
          mediaFile.src,
          options,
        );
      }
    },
    mediaSort(media) {
      let mediaObject = {};
      let index = 0;
      media.forEach((element) => {
        if ((element.ext === 'jpg') || (element.ext === 'png')) {
          mediaObject = {
            src: this.$baseUrlNoPort + element.url.substr(1),
            type: 'image',
            photoIndex: index,
            serverData: element.src,
          };
          index = +1;
          this.photoFiles.push(mediaObject);
        }
        if ((element.ext === 'mp4') || (element.ext === 'wav')) {
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
        console.log(this.photoFiles);
        console.log(this.mediaFiles);
      });
    },
    hidePhotoGallery() {
      this.isOpenGallery = false;
    },
  },
  computed: {
    time() {
      return moment(this.order.createDate);
    },
    formatedTime() {
      if (this.time.isAfter(moment().subtract(1, 'days'))) {
        return this.time.calendar();
      }
      return this.time.format('D MMMM, HH:mm');
    },
  },
  created() {
    this.mediaSort(this.order.files, {});
  },
};
</script>

<style lang="stylus" scoped>
  .gallery {
    display inline-block
  }
  .media-file {
    width 42%
    height 100%
    display inline-block
    vertical-align: top
    margin-right 7px
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
  .media-container{
    margin 5px
    width 45%
    padding 0
    overflow auto
    white-space nowrap
    flex-wrap nowrap
  }
  .media-files .row{
    display inlane
    overflow auto
    white-space nowrap
    flex-wrap nowrap
  }
  .information {
    .row {
      margin 0
    }
    &-header {
      padding 12px
      .col {
        padding 0
      }
      svg {
        margin-right 5px
      }
      span {
        font-style normal
        font-size 12px
        line-height 1.4
        color #65686c
      }
    }    &-description {
      padding 0 12px 12px
    }
  }
  .status-content {
    width 100%
    height 100%
    background-color rgba(189, 189, 189, 0.5) !important
  }
</style>
