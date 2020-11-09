<template lang="pug">
        .container
            v-row#RegBigToolBar(align='center' justify='center')
              img#regLogo(src="../assets/icons/Plus.svg", alt="alt")

            v-text-field.RegNumber(
                v-model="email"
                label='E-mail'
                type='email'
                required)

            v-text-field.RegNumber(
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                label='Пароль'
                required)

            v-btn#RegButton(v-on:click="checkForm") Войти
            v-btn#SmallAuthButton(
              @click="route('registration')")
              |Пройти регистрацию

            span#SpanRulesNM(v-show="!isFocus") Войти с помощью:

            .iconContainer(v-show="!isFocus")
              svg-icon.regIcon(name='VK'  width='37' height='37')
              svg-icon.regIcon(name='Google'  width='37' height='37')
              svg-icon.regIcon(name='Facebook'  width='37' height='37')
              svg-icon.regIcon(name='Instagram'  width='37' height='37')

            #RegBottomBar(v-show="!isFocus")

            v-dialog(v-model="isError")
              v-row(align='center' justify='center')
                .dialog_title {{error}}
              v-btn(@click="error = ''") ок
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
          nativeStorage.setItem('notificationToken', response.data.data.token);
          nativeStorage.setItem('idNotificationChanal', response.data.data.idChanal);
          this.$store.dispatch('setNotificationToken', response.data.data.token);
          this.$store.dispatch('setNotificationIdChanal', response.data.data.idChanal);

          console.log(this.appToken);

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
      console.log(JSON.stringify(response));
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
    console.log(this.appToken);
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
    #SpanRulesNM{
        display block
        font-size: 13px
        text-align center
    }
    .iconContainer{
      margin 10px
      height auto
    }
    .regIcon{
      margin 5px
    }
    #ModalRulesText{
        font-size: 16px
    }
    #V-card-title-rules{
        word-break normal
    }
    #SmallAuthButton{
        margin-top 10px
        margin-bottom 10px
        color #FFF
        font-size: 10px
        background: linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
        border none
        border-radius 30px
        height 30px
        width 50%
    }
    #RegButton{
        margin-top 10px
        margin-bottom 10px
        color #56D68B
        font-size: 13px
        background: transparent
        border 1px solid #56D68B
        border-radius 30px
        height 56px
        width 72%
    }
    .container{
        position relative
        width 100%
        height 100%
        padding 0px
        text-align: center;
        vertical-align middle
    }
    .RegNumber {
        margin-top 10px
        padding-right 10px
        padding-left 10px
    }
    #RegBigToolBar {
        position relative
        margin-bottom 50px
        margin-right 0
        margin-left 0
        margin-top 0
        background-color: #2AB06A
        height: 30vh
        width: 100%
        border: none
        border-radius:0px 0px 50px 0px
        text-align: center
    }

    #RegBottomBar {
        position fixed
        bottom 0
        background-color: #2AB06A
        width: 100%
        height 10%
        border: none
        border-radius:50px 0px 0px 0px
        align-items: center
    }

    #regLogo {
        position relative
        vertical-align middle
        width:auto;
        height:50%;
    }

</style>
