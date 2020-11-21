<template lang="pug">
  .auth-container
    v-row.logo(align='center' justify='center')
      img.logo-icon(src="../assets/main-logo.png", alt="alt")

    v-row.text-field(align='center' justify='center')
          .text-field-center
            v-text-field.text-field-center-input(
              v-model="email"
              solo hide-details
              label='E-mail'
              type='email'
              required)
            v-text-field.text-field-center-input(
              v-model="password"
              solo hide-details
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              label='Пароль'
              required)
    v-row.button(align='center' justify='center')
      .button-center
        v-btn.button-center-registration(v-on:click="checkForm") Войти
        v-btn.button-center-go-to-auth(
          @click="route('registration')"
          v-show="!isFocus") Пройти регистрацию
      .button-icon(v-show="!isFocus")
        svg-icon.button-icon-svg-icon(name='VK'  width='37' height='37')
        svg-icon.button-icon-svg-icon(name='Google'  width='37' height='37')
        svg-icon.button-icon-svg-icon(name='Facebook'  width='37' height='37')
</template>
<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
import dialogWindow from '../scripts/openDialog';
import nativeStorage from '../scripts/nativeStorage';
// eslint-disable-next-line import/no-cycle
import cordova from '../plugins/cordova';
import logger from '../scripts/logger';
import auth from '../scripts/auth/auth';

export default {
  name: 'Authorization',
  components: {
    axios,
    SvgIcon,
  },
  data() {
    return {
      showPassword: false,
      email: null,
      password: null,
      isFocus: false,
      windowHeight: null,
      errorBody: 'Ошибка авторизации. Повторите попытку позже',
      isAddAppToken: false,
    };
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
      this.password.blur();
    },

    validEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    checkForm(e) {
      if (!this.validEmail(this.email)) {
        dialogWindow.open('Ошибка', 'Некоректный email', true, false);
        return null;
      }

      if (!this.password) {
        dialogWindow.open('Ошибка', 'Пароль должен содержать больше 6 символов', true, false);
        return null;
      }

      if (this.password.length < 6) {
        dialogWindow.open('Ошибка', 'Пароль должен содержать больше 6 символов', true, false);
        return null;
      }

      this.signIn();
      e.preventDefault();

      return null;
    },

    signIn() {
      axios
        .post(`${this.$baseUrl}api/v1/public/signin/email`, {
          username: this.email,
          password: this.password,
        })
        .then((response) => (this.checkSignIn(response)))
        .catch((error) => {
          dialogWindow.open('Ошибка', this.errorBody, true, false);
          logger.log(error);
        });
    },

    checkSignIn(response) {
      switch (response.data.status) {
        case 'success':
          nativeStorage.setItem('token', response.data.data);
          this.$store.dispatch('setToken', response.data.data);
          break;
        case 'notExist':
          dialogWindow.open('Ошибка', 'Неверный логин или пароль', true, false);
          break;
        default:
          dialogWindow.open('Ошибка', this.errorBody, true, false);
          logger.log(response);
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
        .catch((error) => {
          dialogWindow.open('Ошибка', this.errorBody, true, false);
          logger.log(error);
        });
    },

    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          break;
        default:
          dialogWindow.open('Ошибка', this.errorBody, true, false);
          logger.log(response);
          break;
      }
    },

    getChatAuth() {
      axios
        .post(`${this.$baseChatUrl}api/v1/public/signin`, {
          method: 'token',
          token: this.currentAuthToken,
        })
        .then((response) => (this.checkChatAuth(response)))
        .catch((error) => {
          dialogWindow.open('Ошибка', this.errorBody, true, false);
          logger.log(error);
        });
    },

    checkChatAuth(response) {
      switch (response.data.status) {
        case 'success':
          nativeStorage.setItem('chatToken', response.data.data.token);
          nativeStorage.setItem('setIdChanal', response.data.data.idChanal);
          this.$store.dispatch('setChatToken', response.data.data.token);
          this.$store.dispatch('setIdChanal', response.data.data.idChanal);
          break;
        default:
          dialogWindow.open('Ошибка', this.errorBody, true, false);
          logger.log(response);
          break;
      }
    },

    getNotificationAuth() {
      axios
        .post(`${this.$baseNotificationUrl}api/v1/public/signin`, {
          method: 'token',
          token: this.currentAuthToken,
        })
        .then((response) => (this.checkNotificationAuth(response)))
        .catch((error) => {
          dialogWindow.open('Ошибка', this.errorBody, true, false);
          logger.log(error);
        });
    },

    checkNotificationAuth(response) {
      switch (response.data.status) {
        case 'success':
          nativeStorage.setItem('notificationToken', response.data.data.token);
          nativeStorage.setItem('setNotificationIdChanal', response.data.data.idChanal);
          this.$store.dispatch('setNotificationToken', response.data.data.token);
          this.$store.dispatch('setNotificationIdChanal', response.data.data.idChanal);

          logger.log(`App token => ${this.appToken}`);

          if (this.appToken) {
            this.addAppToken(this.appToken);
          } else {
            cordova.getToken()
              .then((token) => {
                this.$store.dispatch('setAppToken', token);
                this.addAppToken(token);
              })
              .catch((error) => {
                dialogWindow.open('Ошибка', this.errorBody, true, false);
                logger.log(error);
              });
          }
          break;
        default:
          dialogWindow.open('Ошибка', this.errorBody, true, false);
          logger.log(response);
          break;
      }
    },

    addAppToken(tokenApp) {
      axios
        .post(`${this.$baseNotificationUrl}api/v1/private/tokenApp`, {
          token: this.notificationToken,
          method: 'add',
          tokenApp,
        })
        .then((response) => (this.checkAppToken(response)))
        .catch((error) => {
          dialogWindow.open('Ошибка', this.errorBody, true, false);
          logger.log(error);
        });
    },

    checkAppToken(response) {
      if (response.data.status === 'success' || response.data.status === 'exist') {
        this.isAddAppToken = true;
      } else {
        dialogWindow.open('Ошибка', this.errorBody, true, false);
        logger.log(response);
      }
    },
  },
  computed: {
    show() {
      return this.$store.getters.isVisibleAppbar;
    },

    appToken() {
      return this.$store.getters.getAppToken;
    },

    token() {
      return this.$store.getters.getToken;
    },

    currentAuthToken() {
      return this.$store.getters.getCurrentAuthToken;
    },

    chatToken() {
      return this.$store.getters.getChatToken;
    },

    notificationToken() {
      return this.$store.getters.getNotificationToken;
    },
  },
  watch: {
    token() {
      if (this.token) this.getUserData();
    },

    currentAuthToken() {
      if (this.currentAuthToken) {
        this.getChatAuth();

        if (!window.cordova.platformId === 'browser') {
          this.getNotificationAuth();
        } else {
          this.isAddAppToken = true;
        }
      }
    },

    chatToken() {
      if (this.chatToken && this.isAddAppToken) {
        logger.log('good reg');
      }
    },

    isAddAppToken() {
      if (this.chatToken && this.isAddAppToken) {
        logger.log('good reg');
      }
    },
  },
  created() {
    auth.exit();
  },
  mounted() {
    this.$store.dispatch('showAppbar', false);
    this.$store.dispatch('showBottomNavigation', false);
  },
  beforeDestroy() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', true);
  },
};
</script>
<style lang="stylus" scoped>
  .auth-container {
    width 100%
    height 100%
    padding 0
    text-align: center;
    vertical-align middle
  }
  .logo {
    position relative
    height: 33vh;
    width: 100%;
    margin-bottom 0
    margin-right 0
    margin-left 0
    margin-top 0
    text-align: center;
      &-icon {
        position relative
        vertical-align middle
        width:auto;
        height:100%;
      }
  }
  .text-field {
    width 100%;
    height 33vh;
    margin 0;
      &-center {
        width 100%;
        padding-right 10px;
        padding-left 10px;
          &-input {
            padding-right 10px;
            padding-left 10px;
            margin-top 10px
          }
          &-rules-text {
            margin-top 20px
            font-size 14px
            word-break: normal
          }
          &-rules-button {
            font-size 14px
            margin-top 5px
            text-decoration:underline
            word-break: normal
          }
      }
  }
  .button {
    width 100%;
    height 34vh;
    margin 0;
    &-center {
      width 100%;
      height 60%;
        &-registration {
          height 35% !important
          color #56D68B
          font-size: 13px
          background: transparent
          border 1px solid #56D68B
          border-radius 30px
          width 72%
        }
        &-go-to-auth {
          height 35% !important
          margin-top 10px
          color #FFA967
          font-size: 13px
          background: transparent
          border 1px solid #FFA967
          border-radius 30px
          width 72%
        }
    }
    &-icon {
      width 100%;
      height 40%;
        &-svg-icon{
          margin 5px
        }
    }
  }
</style>
