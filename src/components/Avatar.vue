<template lang="pug">
  v-avatar(:size='size' :color='color' @click="actionPhoto")
    v-icon(v-if="!src" color="#FFFFFF" ) no_photography
    v-img(:src="src" v-else)
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import SvgIcon from './SvgIcon.vue';
import camera from '../scripts/device-modules/camera';
import file from '../scripts/device-modules/file';
import logger from '../scripts/logger';

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

    isChange: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'private',
    },

  },
  components: {
    SvgIcon,
    axios,
  },
  data() {
    return {
      file: null,
    };
  },
  methods: {
    ...mapActions('actionPhotoDialog', [
      'setStatus',
      'setSourceType',
    ]),

    actionPhoto() {
      this.setStatus(true);
    },

    choosePhoto(innerOptions) {
      // eslint-disable-next-line no-undef
      camera.open(innerOptions)
        .then((imageUrl) => {
          logger.log(imageUrl);
          const blob = file.dataURLtoBlob(`data:image/jpeg;base64,${imageUrl}`);
          logger.log(blob);
          this.file = blob;
          this.sendPhoto();
        })
        .catch((error) => {
          logger.log(error);
        });
    },

    sendPhoto() {
      logger.log(this.file);
      // eslint-disable-next-line prefer-const
      let data = new FormData();
      data.append('token', this.token);
      data.append('method', 'update');
      data.append('photo', this.file);
      data.append('submethod', 'photo');
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, data)
        .then((response) => (this.checkPhoto(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка загрузки фото'));
    },

    checkPhoto(response) {
      logger.log(response);
      switch (response.data.status) {
        case 'success':
          this.getUserData();
          break;
        case 'invalidPhoto':
          this.error = 'Неверный формат фото';
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка загрузки фото';
          break;
      }
    },

    getUserData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'my',
          token: this.token,
        })
        .then((response) => (this.checkUserData(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },

    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

    getOptions(srcType) {
      // eslint-disable-next-line no-undef
      const options = { destinationType: Camera.DestinationType.DATA_URL };

      if (srcType === 'gallery') {
        // eslint-disable-next-line no-undef
        options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      }

      if (srcType === 'camera') {
        // eslint-disable-next-line no-undef
        options.sourceType = Camera.PictureSourceType.CAMERA;
      }

      return options;
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },

    user() {
      return this.$store.getters.getUser;
    },

    error: {
      get() {
        return this.$store.getters.getError;
      },
      set(val) {
        this.$store.dispatch('setError', val);
      },
    },

    sourceType: {
      get() { return this.$store.state.actionPhotoDialog.sourceType; },
      set(value) { this.setSourceType(value); },
    },
  },

  watch: {
    sourceType() {
      const options = this.getOptions(this.sourceType);

      if (this.sourceType === 'gallery') {
        this.choosePhoto(options);
        logger.log('open gallery');
      }

      if (this.sourceType === 'camera') {
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
  input[type="file"] {
    position absolute
    left -500px
  }
</style>
