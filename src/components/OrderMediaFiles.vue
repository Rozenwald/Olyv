<template lang="pug">
  v-row.media(
    solo
    hide-details
    readonly
  )
    input(type="file" ref="file" v-on:change="handle()")
    .no-file-selected-wrp(v-show="!mediaFiles.length")
      v-list-item.no-file-selected
        v-list-item-action
          v-btn.media-file-wrp-add-btn( rounded @click="actionAddMedia" )
            svg-icon(name="Plus")
        v-list-item-content
          v-list-item-subtitle Вы можете загружать до 10 фото и видео файлов

    .media-wrp(v-show="mediaFiles.length")
      v-badge(
        color="#BDBDBD"
        icon
        overlap
        v-for="mediaFile in mediaFiles"
        :key="mediaFile.src")

        template(v-slot:badge)
          v-row.badge-wrp(align="center" justify="center" @click="deleteMediaFile(mediaFile)")
            v-icon clear

        v-img.media-file(
          :src="mediaFile.src"
          @click="showPhotoGallery(mediaFile)")

          .status-wrp(v-show="mediaFile.status != 'upload'")
            v-row.status-content(align="center" justify="center")
              v-progress-circular.progress(
                v-show="mediaFile.status == 'loading'"
                indeterminate
                :size="40"
                :width="4"
                color="#56D68B")
              v-icon(v-show="mediaFile.status == 'error'") error

      .media-file(v-show="mediaFiles.length < 10")
        v-row.media-file-wrp-add(align="center")
          v-btn.media-file-wrp-add-btn( rounded @click="actionAddMedia" )
            svg-icon(name="Plus")

    photo-swipe(
        :isOpen="isOpenGallery"
        :items="photoFiles"
        :options="optionsGallery"
        @close="hidePhotoGallery")
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { PhotoSwipe } from 'v-photoswipe';
import SvgIcon from './SvgIcon.vue';
import camera from '../scripts/device-modules/camera';
import file from '../scripts/device-modules/file';
import dialogWindow from '../scripts/openDialog';
import dialogMessages from '../scripts/dialogMessages';
import logger from '../scripts/logger';

export default {
  name: 'order-media-files',
  components: {
    SvgIcon,
    PhotoSwipe,
  },
  data() {
    return {
      mediaFiles: [],
      photoFiles: [],
      isOpenGallery: false,
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
  methods: {
    showPhotoGallery(mediaFile) {
      if (mediaFile.type === 'image') {
        this.isOpenGallery = true;
        this.$set(this.optionsGallery, 'index', mediaFile.photoIndex);
      }
    },

    hidePhotoGallery() {
      this.isOpenGallery = false;
    },

    handle() {
      const mediaFile = {};
      // eslint-disable-next-line prefer-destructuring
      mediaFile.file = this.$refs.file.files[0];
      mediaFile.status = 'loading';

      const reader = new FileReader();
      reader.onload = (e) => {
        mediaFile.src = e.target.result;

        const image = new Image();
        image.src = e.target.result;
        image.onload = (el) => {
          mediaFile.w = el.target.width;
          mediaFile.h = el.target.height;
        };

        this.mediaFiles.push(mediaFile);
      };
      reader.readAsDataURL(mediaFile.file);

      this.sendFile(mediaFile);
    },
    ...mapActions('actionFileDialog', [
      'setStatus',
      'setSourceType',
    ]),

    actionAddMedia() {
      this.setStatus(true);
    },

    async deleteMediaFile(mediaFile) {
      const index = this.mediaFiles.indexOf(mediaFile);
      const res = await this.deleteFile(this.mediaFiles[index]);

      logger.log(res);

      const status = this.checkDeleteFileResponse(res);

      logger.log(status);

      if (this.mediaFiles[index] === mediaFile && (status || mediaFile.status === 'error')) {
        this.mediaFiles.splice(index, 1);
      }
    },

    getOptions(srcType) {
      const options = {
        // eslint-disable-next-line no-undef
        destinationType: Camera.DestinationType.FILE_URI,
        // eslint-disable-next-line no-undef
        direction: Camera.Direction.BACK,
        // eslint-disable-next-line no-undef
        mediaType: Camera.MediaType.ALLMEDIA,
      };

      if (srcType === 'gallery') {
        // eslint-disable-next-line no-undef
        options.sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
      }

      if (srcType === 'camera-photo') {
        // eslint-disable-next-line no-undef
        options.sourceType = Camera.PictureSourceType.CAMERA;
      }

      return options;
    },

    choosePhoto(innerOptions) {
      camera.open(innerOptions)
        .then((dataUri) => {
          let filePath = dataUri;
          if (filePath.indexOf('file') !== 0 && filePath.indexOf('content') !== 0) filePath = `file://${dataUri}`;

          logger.log(dataUri);
          logger.log(filePath);

          const mediaFile = {
            status: 'loading',
          };

          this.mediaFiles.push(mediaFile);

          file.getSystemFile(filePath)
            .then((fileEntry) => {
              file.getFile(fileEntry)
                .then((inputFile) => {
                  mediaFile.file = inputFile;

                  if (inputFile.type.indexOf('image') !== 0) {
                    mediaFile.type = 'video';

                    this.createThumbnail(mediaFile, filePath, fileEntry.name);
                  } else {
                    mediaFile.type = 'image';
                    mediaFile.src = inputFile.localURL;

                    mediaFile.photoIndex = this.photoFiles.length;
                    this.photoFiles.push(mediaFile);

                    const image = new Image();
                    image.src = inputFile.localURL;
                    image.onload = (el) => {
                      mediaFile.w = el.target.width;
                      mediaFile.h = el.target.height;
                    };
                  }

                  this.sendFile(mediaFile);
                });
            })
            .catch((error) => {
              logger.log(error);
              mediaFile.status = 'error';
            });
        })
        .catch((error) => {
          logger.log(error);
        });
    },

    /* eslint-disable no-param-reassign */
    createThumbnail(mediaFile, fileUri, outputFileName) {
      // eslint-disable-next-line no-undef
      VideoEditor.createThumbnail(
        (path) => {
          logger.log(path);
          file.getSystemFile(`file://${path}`)
            .then((thumbnailFileEntry) => {
              file.getFile(thumbnailFileEntry)
                .then((thumbnailFile) => {
                  mediaFile.src = thumbnailFile.localURL;

                  const image = new Image();
                  image.src = thumbnailFile.localURL;
                  image.onload = (el) => {
                    mediaFile.w = el.target.width;
                    mediaFile.h = el.target.height;
                  };
                })
                .catch((error) => logger.log(error));
            })
            .catch((error) => logger.log(error));
        },
        (error) => logger.log(error),
        {
          fileUri,
          outputFileName,
        },
      );
    },
    /* eslint-disable no-param-reassign */

    /* eslint-disable no-param-reassign */
    async sendFile(mediaFile) {
      const res = await this.uploadFile(mediaFile);
      logger.log(res);

      mediaFile.serverData = this.checkUploadFile(res);

      if (mediaFile.serverData) mediaFile.status = 'upload';
      else mediaFile.status = 'error';

      logger.log(mediaFile);
    },
    /* eslint-enable no-param-reassign */

    async uploadFile(mediaFile) {
      const formData = new FormData();
      formData.append('token', this.token);
      formData.append('method', 'add');
      formData.append('file', mediaFile.file);

      try {
        const res = await axios.post(
          `${this.$baseUrl}api/v1/private/file`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        return res;
      } catch (error) {
        logger.log(error);
      }

      return null;
    },

    checkUploadFile(response) {
      if (!response) return null;

      switch (response.data.status) {
        case 'success':
          return response.data.data;
        case 'invalidFile':
          dialogWindow.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('invalidPhoto'),
            true,
            false,
          );
          break;
        case 'notAuthenticate':
          dialogWindow.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          dialogWindow.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorPhoto'),
            true,
            false,
          );
          logger.log(response);
          break;
      }

      return null;
    },

    async deleteFile(mediaFile) {
      try {
        const res = await axios.post(
          `${this.$baseUrl}api/v1/private/file`,
          {
            token: this.token,
            method: 'del',
            file: mediaFile.path,
          },
        );

        return res;
      } catch (error) {
        logger.log(error);
      }

      return null;
    },

    checkDeleteFileResponse(response) {
      if (!response) return null;

      if (response.data.status === 'success' || response.data.status === 'notExist') {
        return response.data.status;
      }

      return null;
    },
  },
  computed: {
    sourceType: {
      get() { return this.$store.state.actionFileDialog.sourceType; },
      set(value) { this.setSourceType(value); },
    },
    token() {
      return this.$store.getters.getToken;
    },
  },
  watch: {
    sourceType() {
      const options = this.getOptions(this.sourceType);

      if (this.sourceType === 'gallery') {
        this.choosePhoto(options);
        logger.log('open gallery');
      }

      if (this.sourceType === 'camera-photo') {
        this.choosePhoto(options);
        logger.log('open camera');
      }

      if (this.sourceType) {
        this.sourceType = null;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .row {
    margin 0
  }

  .media {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
                0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                0px 1px 5px 0px rgba(0, 0, 0, 0.12)
    border-color: rgba(0, 0, 0, 0.87);
    padding 12px
    margin 0 0 30px 0
    border-radius 4px

    &-wrp {
      overflow: hidden;
      overflow-x: scroll;
      white-space:nowrap;
    }
  }

  .media-file {
    display inline-block
    vertical-align: top
    width 120px
    height 100px
    max-height 100px
    margin-right 7px
    border-radius 4px

    &-wrp-add {
      height 100px
      max-height 100px
      margin 0

      &-btn {
        background-color #56D68B !important
        height 50px !important
        width 50px !important
        max-width 50px !important
        min-width 0 !important
      }
    }
  }

  .no-file-selected{
      padding 0
  }

  .v-list-item__action {
    margin 0 !important
    margin-right 12px !important
  }

  .v-list-item__subtitle {
    white-space normal
  }

// общая обертка кнопки
  .v-badge :last-child {
    height 95px
    width 115px
    top -3px !important
  }

// обертка иконки
  .v-badge :last-child :first-child {
    height 20px
    width 20px
    top 0 !important
    bottom none !important
    padding 0
  }

// иконка
  .v-badge :last-child :first-child :first-child {
    height 12px
    width 12px
  }

  .badge-wrp {
    height 20px !important
    width 20px !important
  }

  .status-wrp {
    position absolute
    height 100%
    width 100%
    top 0
    left 0
  }

  .status-content {
    height 100px !important
    width 120px !important
    background-color rgba(189, 189, 189, 0.5) !important
  }

  .progress :first-child{
    height 40px !important
    width 40px !important
  }
</style>
