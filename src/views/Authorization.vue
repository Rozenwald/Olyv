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
import nativeStorage from '../scripts/nativeStorage';
// eslint-disable-next-line import/no-cycle
import cordova from '../plugins/cordova';

export default {
  name: 'Authorization',
  components: {
    axios,
    SvgIcon,
  },
  data() {
    return {
      show1: false,
      email: null,
      password: '',
      error: '',
      isFocus: false,
      windowHeight: null,
      currentAuthToken: null,
    };
  },
  created() {
    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      if (window.innerHeight < this.windowHeight) {
        this.isFocus = true;
      } else {
        this.isFocus = false;
      }
    });
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

    signIn() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/public/signin/email`, {
          username: this.email,
          password: this.password,
        })
        .then((response) => (this.checkSignIn(response)))
        .catch((error) => (console.log(error)));
      /* eslint-enable no-return-assign */
    },

    checkForm(e) {
      if (this.password.length < 6) {
        this.error = 'Пароль должен содержать больше 6 символов';
      }

      if (!this.validEmail(this.email)) {
        this.error = 'Некоректный email';
      }

      if (!this.error.length) {
        this.signIn();
      }

      e.preventDefault();
    },

    checkSignIn(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          window.localStorage.setItem('token', response.data.data);
          nativeStorage.setItem('token', response.data.data);
          this.$store.dispatch('setToken', response.data.data);
          this.getData();
          break;
        case 'invalidEmail':
          this.error = 'Неверный email';
          break;
        case 'invalidPassword':
          this.error = 'Неверный пароль';
          break;
        default:
          this.error = `${response.data.status} d`;
          break;
      }
    },
    getData() {
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
          this.currentAuthToken = response.data.data.currentAuthToken;
          this.getChatAuth();
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

    getChatAuth() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseChatUrl}api/v1/public/signin`, {
          method: 'token',
          token: this.currentAuthToken,
        })
        .then((response) => (this.checkChatAuth(response)))
        .catch((error) => console.log(error));
      /* eslint-disable no-return-assign */
    },

    checkChatAuth(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          window.localStorage.setItem('chatToken', response.data.data.token);
          window.localStorage.setItem('idChanal', response.data.data.idChanal);
          nativeStorage.setItem('chatToken', response.data.data.token);
          nativeStorage.setItem('idChanal', response.data.data.idChanal);
          this.$store.dispatch('setChatToken', response.data.data.token);
          this.$store.dispatch('setIdChanal', response.data.data.idChanal);
          this.getNotificationAuth();
          break;
        case 'notSuccess':
          this.error = 'что-то наебнулось, ошибка с бд и т.д';
          break;
        case 'notExist':
          this.error = 'видимо косяк в токе не либо он прогорел и следовательно такого юзера найти не может (вдруг кто-то спиздил токен и пытается авторизироваться)';
          break;
        default:
          this.error = 'Ошибка чата';
          break;
      }
    },

    getNotificationAuth() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseNotificationUrl}api/v1/public/signin`, {
          method: 'token',
          token: this.currentAuthToken,
        })
        .then((response) => (this.checkNotificationAuth(response)))
        .catch((error) => (console.log(error)));
      /* eslint-disable no-return-assign */
    },

    checkNotificationAuth(response) {
      switch (response.data.status) {
        case 'success':
          // ! Оставил для обрабной совместимости
          window.localStorage.setItem('notificationToken', response.data.data.token);
          window.localStorage.setItem('idNotificationChanal', response.data.data.idChanal);
          // ! новая технология
          nativeStorage.setItem('notificationToken', response.data.data.token);
          nativeStorage.setItem('idNotificationChanal', response.data.data.idChanal);
          this.$store.dispatch('setNotificationToken', response.data.data.token);
          this.$store.dispatch('setNotificationIdChanal', response.data.data.idChanal);

          if (this.appToken) {
            this.addAppToken(this.appToken);
          } else {
            cordova.getToken()
              .then((token) => {
                this.$store.dispatch('setAppToken', token);
                this.addAppToken(token);
              })
              .catch(() => {
                this.error = 'Token app error (client). Повторите попытку позже';
              });
          }

          break;
        case 'notSuccess':
          this.error = 'Ошибка авторизации в уведомлениях';
          break;
        case 'notExist':
          this.error = 'Ошибка авторизации в уведомлениях';
          break;
        default:
          this.error = 'Ошибка авторизации в уведомлениях';
          break;
      }
    },

    addAppToken(tokenApp) {
      console.log(tokenApp);
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseNotificationUrl}api/v1/private/tokenApp`, {
          token: this.notificationToken,
          method: 'add',
          tokenApp,
        })
        .then((response) => (this.checkAppToken(response)))
        .catch((error) => (console.log(error)));
      /* eslint-disable no-return-assign */
    },

    checkAppToken(response) {
      if (response.data.status === 'success' || response.data.status === 'exist') {
        this.$router.back();
      } else {
        this.error = 'Token app error (server). Повторите попытку позже';
      }
    },

  },
  computed: {
    isError: {
      get() {
        if (this.error.length) {
          return true;
        }
        return false;
      },
      set() {
        this.error = '';
      },
    },
    token() {
      return this.$store.getters.getToken;
    },

    appToken() {
      return this.$store.getters.getAppToken;
    },

    notificationToken() {
      return this.$store.getters.getNotificationToken;
    },
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
