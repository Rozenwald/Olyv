<template lang="pug">
  v-avatar(:size='size' :color='color' @click="choosePhoto")
    v-icon(v-if="!picture" color="#FFFFFF" ) no_photography
    v-img(:src="picture" v-else)

    input(type="file" @change="handleFileUpload" ref="input")
</template>

<script>
import axios from 'axios';
import SvgIcon from './SvgIcon.vue';
import dialogWindow from '../scripts/openDialog';
import logger from '../scripts/logger';
import route from '../store/modules/route';

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
    logger,
  },
  data() {
    return {
      content: null,
      file: null,
    };
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
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
      console.log(this.file);
      this.sendPhoto();
      const reader = new FileReader();
      reader.onload = this.onImageLoad;
      reader.readAsDataURL(file);
    },

    onImageLoad(e) {
      this.content = e.target.result;
      console.log(e.target.result);
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
        .catch((error) => {
          dialogWindow.open('Ошибка', 'Не удалось загрузить фото попробуйте позже', true, false);
          logger.log(error);
        });
    },

    checkPhoto(response) {
      switch (response.data.status) {
        case 'success':
          this.getUserData();
          break;
        case 'invalidPhoto':
          dialogWindow.open('Ошибка', 'Неверный формат фото', true);
          break;
        case 'notAuthenticate':
          dialogWindow.open('Ошибка', 'Зарегестрируйтесь чтобы пользоваться данным функционалом', true, true, route('auth'));
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          dialogWindow.open('Ошибка', 'Ошибка загрузки фото', true);
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
        .catch((error) => {
          dialogWindow.open('Ошибка', 'Пользователь неавторизирован, советуем пройти авторизацию, чтобы получить доступ к полному функционалу приложения', true, true);
          logger.log(error);
        });
    },

    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          break;
        case 'notAuthenticate':
          dialogWindow.open('Ошибка', 'Пользователь неавторизирован, советуем пройти авторизацию, чтобы получить доступ к полному функционалу приложения', true, true, route('auth'));
          break;
        default:
          dialogWindow.open('Ошибка', 'Такого пользователя не существует, скорее всего вы еще просто не зарегистрировались', true, true);
          logger.log(response.data);
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
  },
};
</script>

<style lang="stylus" scoped>
  input[type="file"] {
    position absolute
    left -500px
  }
</style>
