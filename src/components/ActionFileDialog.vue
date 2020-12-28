<template lang="pug">
  v-dialog.dialog( v-model="open" )
    v-sheet.dialog-main
      v-row.dialog-main-title
        span Файл

      v-row.dialog-main-btn-gallery( @click="openGallery" align="center" v-ripple="{center: true}")
        span Загрузить с устройства

      v-row.dialog-main-btn-camera-photo(
        @click="openCameraPhoto"
        align="center"
        v-ripple="{ center: true }")
        span Сделать фото

      v-row.dialog-main-btn-camera-video(
        align="center"
        v-ripple="{ center: true }")
        span Сделать видео

</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'action-file-dialog',
  methods: {
    ...mapActions('actionFileDialog', [
      'setStatus',
      'setSourceType',
    ]),

    openGallery() {
      this.setSourceType('gallery');
      this.open = false;
    },

    openCameraPhoto() {
      this.setSourceType('camera-photo');
      this.open = false;
    },

    openCameraVideo() {
      this.setSourceType('camera-video');
      this.open = false;
    },
  },
  computed: {
    open: {
      get() { return this.$store.state.actionFileDialog.status; },
      set(value) { this.setStatus(value); },
    },
  },
};
</script>

<style lang="stylus" scoped>
  .dialog {
    &-main {
      padding-bottom 6px

      .row {
        margin 0
        height 48px
      }

      &-title {
        font-weight 500
        font-size 18px
        padding 12px 12px 6px 12px
      }

      &-btn-gallery, &-btn-camera-photo {
        font-size 16px
        padding 6px 12px 6px 12px
      }

      &-btn-camera-video {
        font-size 16px
        padding 6px 12px 6px 12px
      }
    }
  }
</style>
