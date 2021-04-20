<template lang="pug">
  v-sheet.about-order(elevation="1" rounded)
    v-row.about-order-title.font-weight-medium() Информация о заказе
    .about-order-content
      v-row.about-order-content-cost
        span.about-order-content-title Цена:
        v-row.about-order-content-main {{formatedCost}}
      v-row.about-order-content-address
        span.about-order-content-title Адрес:
        v-row.about-order-content-main {{order.address}}
      v-row.about-order-content-description
        span.about-order-content-title Описание:
        v-row.about-order-content-main {{order.description}}
      v-row.about-order-content-status
        span.about-order-content-title Статус:
        v-row.about-order-content-main(
          :style="{color: statusColor}"
        ) {{formatedOrderType}}
      .media-wrp(v-show="mediaFiles.length")
        .media-file(
          v-for="mediaFile in mediaFiles"
          :key="mediaFile.src")
          v-img(
            v-if="mediaFile.type != 'video'"
            :src="mediaFile.src"
            @click="showMedia(mediaFile)"
            aspect-ratio='1')
          v-img.status-content(v-else aspect-ratio='1' @click="showMedia(mediaFile)")
            v-row.status-content(align="center" justify="center")
              v-icon(x-large) play_arrow
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
  name: 'order-information',
  components: {
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
          console.log('dg');
          mediaObject = {
            src: this.$baseUrlNoPort + element.url.substr(1),
            type: 'image',
            photoIndex: index,
            serverData: element.src,
          };
          index = +1;
          console.log(mediaObject);
          this.photoFiles.push(mediaObject);
          console.log(this.photoFiles);
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
      });
    },
    hidePhotoGallery() {
      this.isOpenGallery = false;
    },
  },
  computed: {
    orderType() {
      return this.$store.getters.getOrderType;
    },

    formatedOrderType() {
      switch (this.orderType) {
        case 'await':
          return 'Ожидание';
        case 'process':
          return 'В процессе';
        case 'endedCustomer':
          return 'Ожидает отзыв';
        case 'completed':
          return 'Завершен';
        default:
          return '';
      }
    },

    statusColor() {
      switch (this.orderType) {
        case 'await':
          return '#FBC02D';
        case 'process':
          return '#FE7664';
        case 'endedCustomer':
          return '#FBC02D';
        case 'completed':
          return '#56D68B';
        default:
          return 'inherit';
      }
    },

    formatedCost() {
      const price = Number.prototype.toFixed.call(parseFloat(this.order.cost || 0) || 0);
      let priceSep = price.replace(/(\D)/g, ',');
      priceSep = priceSep.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

      return `${priceSep} руб.`;
    },
  },
  created() {
    this.mediaSort(this.order.files);
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
  .about-order {
    padding 12px

    .row {
      margin 0
    }

    &-title {
      margin-bottom 5px !important
    }

    &-content {
      &-title {
        color rgba(0,0,0,.6) !important;
        margin-right 10px
      }
    }
  }
</style>
