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
    .media-wrp
      v-photoswipe-gallery(
          :isOpen="isOpenGallery"
          :options="optionsGallery"
          :items="photoFiles")
        v-img.media-file(
            slot-scope="props"
            :src="props.item.src",
            aspect-ratio='1')
          template(v-slot:placeholder)
            v-row(align='center', justify='center')
              v-progress-circular(indeterminate, color='grey lighten-5')
</template>

<script>
import moment from 'moment';
import { PhotoSwipeGallery } from 'v-photoswipe';
import Avatar from '../Avatar.vue';
import SvgIcon from '../SvgIcon.vue';

export default {
  name: 'order-information',
  components: {
    SvgIcon,
    Avatar,
    'v-photoswipe-gallery': PhotoSwipeGallery,
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
    mediaSort(media) {
      let index = 0;
      media.forEach((element) => {
        if (element.ext === ('jpg' || 'png')) {
          this.photoObject = {
            src: this.$baseUrlNoPort + element.url.substr(1),
            type: 'image',
            w: 400,
            h: 400,
            indexPhoto: index,
            serverData: element,
          };
          this.photoFiles.push(this.photoObject);
          index = +1;
        }
        if (element.ext === ('mp4' || 'wav')) {
          this.photoObject = {
            src: this.$baseUrlNoPort + element.url.substr(1),
            type: 'video',
            w: 400,
            h: 400,
            serverData: element,
          };
          this.mediaFiles.push(this.photoObject);
        }
      });
      console.log('media', this.mediaFiles);
      console.log('photo', this.photoFiles);
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
    this.mediaSort(this.order.files);
  },
};
</script>

<style lang="stylus" scoped>
  .media-file {
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
</style>
