<template lang="pug">
  .registration-container
    v-row.logo(align='center' justify='center')
      img.logo-icon(src="../assets/nedomain-logo.png", alt="alt")

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
        .text-field-center-rules-text(
          v-show="!isFocus") Нажимая кнопку зарегистрироваться вы принимаете:
        .text-field-center-rules-button(
          v-show="!isFocus"
          text color="normal"
          @click='open()') Правила и условия политики конфиденциальности
    v-row.button(align='center' justify='center')
      .button-center
        v-btn.button-center-registration(v-on:click="checkForm") Зарегистрироваться
        v-btn.button-center-go-to-auth(
          @click="route('auth')"
          v-show="!isFocus") Уже есть аккаунт
      .button-icon(v-show="!isFocus")
        svg-icon.button-icon-svg-icon(name='VK'  width='37' height='37')
        svg-icon.button-icon-svg-icon(name='Google'  width='37' height='37')
        svg-icon.button-icon-svg-icon(name='Facebook'  width='37' height='37')
      // *добавить диалоги к ошибкам
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
// eslint-disable-next-line import/no-cycle
import cordova from '../plugins/cordova';
import dialogWindow from '../scripts/openDialog';

export default {
  name: 'Registration',
  components: {
    axios,
    SvgIcon,
  },
  data() {
    return {
      showPassword: false,
      email: null,
      password: null,
      error: '',
      dialog: false,
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
    open() {
      dialogWindow.open('ВРЕМЯ АТРЕЗАТЬ ПИПИСЬКИ', ' сэекс каблучки мокияжсэекс каблучки мокияжсэекс каблучки мокияжсэекс каблучки мокияж', true, false);
    },
    route(routeName) {
      this.$router.push(routeName);
    },
    validEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    signUp() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/public/signup/email`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => (this.checkSignUp(response)))
        .catch(() => (this.error = 'Ошибка регистрации'));
      /* eslint-enable no-return-assign */
    },

    signIn() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/public/signin/email`, {
          username: this.email,
          password: this.password,
        })
        .then((response) => (this.checkSignIn(response)))
        .catch(() => (this.error = 'Ошибка регистрации'));
      /* eslint-enable no-return-assign */
    },

    checkForm(e) {
      this.error = '';
      if (!this.validEmail(this.email)) {
        this.error = 'Некоректный email';
      }

      if (this.password.length < 6) {
        this.error = 'Пароль должен содержать больше 6 символов';
      }

      if (!this.error.length) {
        this.signUp();
      }

      e.preventDefault();
    },

    checkSignUp(response) {
      switch (response.data.status) {
        case 'invalidEmail':
          this.error = 'Некоректный email';
          break;
        case 'invalidPassword':
          this.error = 'Пароль должен содержать больше 6 символов';
          break;
        case 'existEmail':
          this.error = 'Данная почта уже зарегистрирована';
          break;
        case 'success':
          this.signIn();
          break;
        default:
          this.error = 'Ошибка регистрации';
          break;
      }
    },

    checkSignIn(response) {
      switch (response.data.status) {
        case 'success':
          window.localStorage.setItem('token', response.data.data);
          this.$store.dispatch('setToken', response.data.data);
          this.getData();
          break;
        default:
          this.error = 'Ошибка регистрации';
          break;
      }
    },
    getData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'my',
          token: window.localStorage.getItem('token'),
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
        .catch(() => (this.error = 'Ошибка авторизации в чате'));
      /* eslint-disable no-return-assign */
    },

    checkChatAuth(response) {
      switch (response.data.status) {
        case 'success':
          window.localStorage.setItem('chatToken', response.data.data.token);
          window.localStorage.setItem('idChanal', response.data.data.idChanal);
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
          window.localStorage.setItem('notificationToken', response.data.data.token);
          window.localStorage.setItem('idNotificationChanal', response.data.data.idChanal);
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
                this.error = '(client)';
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
        this.$router.go(-2);
      } else {
        this.error = 'Token app error. Повторите попытку позже';
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

    show() {
      return this.$store.getters.isVisibleAppbar;
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
  .registration-container {
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
          color #FFA967
          font-size: 13px
          background: transparent
          border 1px solid #FFA967
          border-radius 30px
          width 72%
        }
        &-go-to-auth {
          height 35% !important
          margin-top 10px
          color #56D68B
          font-size: 13px
          background: transparent
          border 1px solid #56D68B
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
