<template lang="pug">
  v-container
    .set-user-data
      v-row(align='center' justify='center')
        v-skeleton-loader(type="avatar" :loading="!hasData")
          v-row.avatar-wrp(@click="actionPhoto")
            avatar(:src="src" size="100" @click="actionPhoto")
      v-skeleton-loader(type="text" :loading="!hasData")
        v-text-field.edit-data(
          solo
          color="#65686C"
          hide-details="auto"
          v-model="firstName"
        )
      v-skeleton-loader(type="text" :loading="!hasData")
        v-text-field.edit-data(
          solo
          color="#65686C"
          hide-details="auto"
          v-model="lastName"
        )
      v-row.btn-wrapper(align='center' justify='center')
        v-btn.btn-save(rounded @click="checkForm") Сохранить
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import store from '../store';
import SvgIcon from '../components/SvgIcon.vue';
import Avatar from '../components/Avatar.vue';
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';
import camera from '../scripts/device-modules/camera';
import file from '../scripts/device-modules/file';

export default {
  name: 'SetUserData',
  components: {
    axios,
    store,
    SvgIcon,
    Avatar,
  },
  data() {
    return {
      isFocus: false,
      windowHeight: null,
      firstName: null,
      lastName: null,
      errorBody: '',
      file: null,
    };
  },
  methods: {
    checkForm() {
      if (this.firstName == null) {
        this.errorBody = 'Введите имя';
        return undefined;
      }

      if (this.firstName.length === 0) {
        this.errorBody = 'Введите имя';
        dialog.open('Ошибка', this.errorBody, true, false);
        return undefined;
      }

      this.sendData();
      return undefined;
    },

    sendData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'update',
          submethod: 'nameLastname',
          token: this.token,
          name: this.firstName,
          lastname: this.lastName,
        })
        .then((response) => (this.checkResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          dialog.open('Ошибка', 'Такого пользователя не существует, скорее всего вы еще просто не зарегистрировались', true, true);
          logger.log(error);
        });
    },

    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.getUserData();
          break;
        case 'notAuthenticate':
          dialog.open('Ошибка', 'Пользователь неавторизирован, советуем пройти авторизацию, чтобы получить доступ к полному функционалу приложения', true, true, this.$router.push('auth'));
          break;
        default:
          dialog.open('Ошибка', '', true, false);
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
          dialog.open('Ошибка', 'Такого пользователя не существует, скорее всего вы еще просто не зарегистрировались', true, true);
          logger.log(error);
        });
    },

    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          if (!this.file) this.$router.back();
          this.file = null;
          break;
        case 'notAuthenticate':
          dialog.open('Ошибка', 'Пользователь неавторизирован, советуем пройти авторизацию, чтобы получить доступ к полному функционалу приложения', true, true, this.$router.push('auth'));
          break;
        default:
          dialog.open('Ошибка', '', true, false);
          break;
      }
    },

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
          if (this.file) this.sendPhoto();
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
        .catch((error) => {
          dialog.open('Ошибка', 'Не удалось загрузить фото попробуйте позже', true, false);
          logger.log(error);
        });
    },

    checkPhoto(response) {
      logger.log(response);
      switch (response.data.status) {
        case 'success':
          this.getUserData();
          break;
        case 'invalidPhoto':
          dialog.open('Ошибка', 'Неверный формат фото', true);
          break;
        case 'notAuthenticate':
          dialog.open('Ошибка', 'Авторизируйтесь, чтобы пользоваться данным функционалом', true, true, this.route('auth'));
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          dialog.open('Ошибка', 'Ошибка загрузки фото', true);
          break;
      }
    },

    route(route) {
      this.$router.push(route);
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
  created() {
    this.firstName = this.user.name;
    this.lastName = this.user.lastname;

    this.$store.commit('setTitle', 'Личный кабинет');

    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      if (window.innerHeight < this.windowHeight) {
        this.isFocus = true;
      } else {
        this.isFocus = false;
      }
    });
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },

    token() {
      return this.$store.getters.getToken;
    },

    src() {
      if (!this.hasData) {
        return null;
      }
      if (!this.user.photo.length) {
        return null;
      }
      const url = this.user.photo[this.user.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
    },

    user() {
      return this.$store.getters.getUser;
    },

    hasData() {
      return this.$store.getters.hasData;
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
  beforeRouteEnter(to, from, next) {
    if (!store.getters.isAuth) {
      next(from.name);
      store.dispatch('showLoginDialog', true);
    } else {
      next();
    }
  },
};
</script>

<style lang="stylus" scoped>

  .set-user-data {
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    margin-bottom 12px
  }

  .edit-data {
    margin 12px 0 0 !important
  }

  .btn-wrapper{
    margin-top 24px
  }

  .btn-save{
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 240px
    box-shadow none
  }

  input[type="file"]{
    position absolute
    left -500px
  }
</style>
