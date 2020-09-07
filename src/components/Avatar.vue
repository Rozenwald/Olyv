<template lang="pug">
  v-avatar(:size='size' :color='color' @click="choosePhoto")
    svg-icon(name='PhotoCamera' v-if="!picture")
    v-img(:src="picture" v-else)

    input(type="file" @change="handleFileUpload" ref="input")
</template>

<script>
import axios from 'axios';
import SvgIcon from './SvgIcon.vue';

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

  },
  components: {
    SvgIcon,
    axios,
  },
  data() {
    return {
      content: '',
      file: null,
    };
  },
  methods: {
    choosePhoto() {
      if (this.isChange) {
        this.$refs.input.click();
      }
    },

    handleFileUpload(event) {
      event.preventDefault();
      this.selectImage(event.target.files[0]);
    },

    selectImage(file) {
      this.file = file;
      this.sendPhoto();
      const reader = new FileReader();
      reader.onload = this.onImageLoad;
      reader.readAsDataURL(file);
    },

    onImageLoad(e) {
      this.content = e.target.result;
      const filename = this.file instanceof File ? this.file.name : '';
      this.$emit('input', filename);
      this.$emit('image-changed', this.content);
    },

    sendPhoto() {
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
  },

  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    user() {
      return this.$store.getters.getUser;
    },

    picture() {
      if (this.content) {
        return this.content;
      }

      return this.src;
    },
    error: {
      get() {
        return this.$store.getters.getError;
      },
      set(val) {
        this.$store.dispatch('setError', val);
      },
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
