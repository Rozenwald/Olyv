<template lang="pug">
  v-dialog.dialog( v-model="open" )
    v-sheet.dialog-main
      v-row.dialog-main-title
        span Фотография

      v-row.dialog-main-btn-gallery( @click="openGallery" align="center" v-ripple="{center: true}")
        span Загрузить с устройства

      v-row.dialog-main-btn-camera( @click="openCamera" align="center" v-ripple="{ center: true }")
        span Сделать фото

      v-row.dialog-main-btn-close(
        @click="close"
        align="center"
        v-ripple="{ center: true }")
        span Выйти
</template>

<script>

export default {
  name: 'action-photo-dialog-verification',
  methods: {
    openGallery() {
      this.$store.dispatch('setSourceTypePhotoDialogVerification', 'gallery');
      this.open = false;
    },

    openCamera() {
      this.$store.dispatch('setSourceTypePhotoDialogVerification', 'camera-photo');
      this.open = false;
    },
    close() {
      this.$store.dispatch('setStatusPhotoDialogVerification', false);
    },
  },
  computed: {
    open: {
      get() {
        return this.$store.getters.getStatusPhotoDialogVerification;
      },
      set(val) {
        this.$store.dispatch('setStatusPhotoDialogVerification', val);
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

      &-btn-gallery {
        font-size 16px
        padding 6px 12px 6px 12px
      }

      &-btn-camera {
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
