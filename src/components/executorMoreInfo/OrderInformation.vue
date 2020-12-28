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
    .media-files
      v-row
        v-col.d-flex.child-flex.custom-card-wrp(v-for='n in 5', :key='n', cols='6')
          v-photoswipe-gallery.image-container(
              :isOpen="isOpenGallery"
              :options="optionsGallery"
              :items="items")
            v-card.d-flex.custom-card(flat, tail)
              v-img.grey.lighten-2(slot-scope="props" :src="media", :lazy-src='`https://picsum.photos/10/6?image=${n * 5 + 10}`', aspect-ratio='1')
                template(v-slot:placeholder)
                  v-row.fill-height.ma-0(align='center', justify='center')
                    v-progress-circular(indeterminate, color='grey lighten-5')
          // v-img(v-if="!media" :src="media")
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
    showPhotoSwipe(index) {
      this.isOpen = true;
      this.$set(this.options, 'index', index);
    },
    hidePhotoSwipe() {
      this.isOpen = false;
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
    media() {
      const url = 'http://pm1.narvii.com/7616/357dcc68740d783ed5c7aac60508720afa87e90ar1-1200-1697v2_uhq.jpg';
      return url;
    },
  // media() {
  //  if (!this.order) {
  //    return ' ';
  //  }
  //  if (!this.order.files) {
  //    return ' ';
  //  }
  //  if (!this.order.files.length) {
  //    return null;
  //  }
  //  const url = this.order.files[this.order.files.length - 1].urlMax.substr(1);
  //  return this.$baseUrlNoPort + url;
  // },
  },
  created() {
    console.log(this.order);
  },
};
</script>

<style lang="stylus" scoped>
  .media-files .row{
    overflow auto
    white-space nowrap
    flex-wrap nowrap
  }
  .image-container{
    margin-top 5px !important
    width 100%
    height 100%;
      &-image{
      }
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
    }

    &-description {
      padding 0 12px 12px
    }
  }
</style>
