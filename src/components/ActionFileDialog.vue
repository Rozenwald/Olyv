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
        @click="openCameraVideo"
        align="center"
        v-ripple="{ center: true }")
        span Сделать видео

      v-row.dialog-main-btn-close(
        @click="close"
        align="center"
        v-ripple="{ center: true }")
        span Выйти
</template>

<script>

export default {
  name: 'action-file-dialog',
  methods: {

    openGallery() {
      this.$store.dispatch('setSourceTypeFileDialog', 'gallery');
      this.open = false;
    },

    openCameraPhoto() {
      this.$store.dispatch('setSourceTypeFileDialog', 'camera-photo');
      this.open = false;
    },

    openCameraVideo() {
      this.$store.dispatch('setSourceTypeFileDialog', 'camera-video');
      this.open = false;
    },
    close() {
      this.$store.dispatch('setStatusFileDialog', false);
    },
  },
  computed: {
    open: {
      get() {
        return this.$store.getters.getStatusFileDialog;
      },
      set(val) {
        this.$store.dispatch('setStatusFileDialog', val);
      },
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

      &-btn-close {
        font-size 16px
        padding 6px 12px 6px 12px
      }
    }
  }
</style>
