<template lang="pug">
  .auth-container
    v-row.logo(align='center' justify='center')
      img.logo-icon(src="../assets/nedomain-logo.png", alt="../assets/main-logo.png")

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
            div.recovery-password
              a(@click="losePassword()") Забыли пароль?
    v-row.button(align='center' justify='center')
      .button-center
        v-btn.button-center-registration(
          @click="checkForm()"
          :loading='loading'
          :disabled='loading') Войти
        v-btn.button-center-go-to-auth(
          @click="route('registration')"
          v-show="!isFocus") Пройти регистрацию
      // .button-icon(v-show="!isFocus")
        v-btn.button-icon-svg-icon(icon @click="getDataVk()")
          svg-icon(name='VK'  width='41' height='41')
        v-btn.button-icon-svg-icon(icon)
          svg-icon(name='Google'  width='41' height='41')
        v-btn.button-icon-svg-icon(icon)
          svg-icon(name='Facebook'  width='41' height='41')
</template>
<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
import nativeStorage from '../scripts/nativeStorage';
// eslint-disable-next-line import/no-cycle
import cordova from '../plugins/cordova';
import clientVk from '../scripts/vk/client';
import authVk from '../scripts/vk/auth';
import auth from '../scripts/auth';
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';
import dialogMessages from '../scripts/dialogMessages';

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
      isAddAppToken: false,
      loading: false,
    };
  },
  methods: {

    route(routeName) {
      this.$router.push(routeName);
    },

    validEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    losePassword() {
      if (this.validEmail(this.email)) {
        nativeStorage.setItem('lastEmail', this.email);
      }
      this.route('recoveryPassword');
    },

    getDataVk() {
      clientVk.init();
      authVk.login()
        .then((response) => {
          logger.log(response);

          const res = JSON.parse(response);

          const accessToken = res.token;
          logger.log(accessToken);

          const userId = res.user[0].id;
          logger.log(userId);
        });
    },

    signInVk() {
    },

    checkForm(e) {
      this.loading = true;
      if (!this.validEmail(this.email)) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('invalidEmail'),
          true,
          false,
        );
        this.loading = false;
        return null;
      }

      if (!this.password) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('invalidPassword'),
          true,
          false,
        );
        this.loading = false;
        return null;
      }

      if (this.password.length < 6) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('invalidPassword'),
          true,
          false,
        );
        this.loading = false;
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
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAuth'),
            true,
            false,
          );
          logger.log(error);
          this.loading = false;
        });
    },

    checkSignIn(response) {
      logger.log(response);
      switch (response.data.status) {
        case 'success':
          nativeStorage.setItem('token', response.data.data);
          this.$store.dispatch('setToken', response.data.data);
          break;
        case 'notExist':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('invalidAuthData'),
            true,
            false,
          );
          this.loading = false;
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAuth'),
            true,
            false,
          );
          logger.log(response);
          this.loading = false;
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
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAuth'),
            true,
            false,
          );
          logger.log(error);
          this.loading = false;
        });
    },
    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAuth'),
            true,
            false,
          );
          logger.log(response);
          this.loading = false;
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
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAuth'),
            true,
            false,
          );
          logger.log(error);
          this.loading = false;
        });
    },

    checkChatAuth(response) {
      switch (response.data.status) {
        case 'success':
          nativeStorage.setItem('chatToken', response.data.data.token);
          nativeStorage.setItem('idChanal', response.data.data.idChanal);
          this.$store.dispatch('setChatToken', response.data.data.token);
          this.$store.dispatch('setIdChanal', response.data.data.idChanal);
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAuth'),
            true,
            false,
          );
          logger.log(response);
          this.loading = false;
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
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAuth'),
            true,
            false,
          );
          logger.log(error);
          this.loading = false;
        });
    },

    checkNotificationAuth(response) {
      switch (response.data.status) {
        case 'success':
          nativeStorage.setItem('notificationToken', response.data.data.token);
          nativeStorage.setItem('notificationIdChanal', response.data.data.idChanal);
          this.$store.dispatch('setNotificationToken', response.data.data.token);
          this.$store.dispatch('setNotificationIdChanal', response.data.data.idChanal);
          this.loading = false;
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
                dialog.open(
                  dialogMessages.getTitle('error'),
                  dialogMessages.getBody('errorAuth'),
                  true,
                  false,
                );
                logger.log(error);
                this.loading = false;
              });
          }
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAuth'),
            true,
            false,
          );
          logger.log(response);
          this.loading = false;
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
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('errorAuth'),
            true,
            false,
          );
          logger.log(error);
          this.loading = false;
        });
    },

    checkAppToken(response) {
      if (response.data.status === 'success' || response.data.status === 'exist') {
        this.isAddAppToken = true;
      } else {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('errorAuth'),
          true,
          false,
        );
        logger.log(response);
        this.loading = false;
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

        if (window.cordova.platformId !== 'browser') {
          this.getNotificationAuth();
        } else {
          this.isAddAppToken = true;
        }
      }
    },

    chatToken() {
      if (this.chatToken && this.isAddAppToken) {
        logger.log('good auth');
        this.$router.replace('spisokZakazov');
        this.loading = false;
      }
    },

    isAddAppToken() {
      if (this.chatToken && this.isAddAppToken) {
        logger.log('good auth');
        this.$router.replace('spisokZakazov');
        this.loading = false;
      }
    },
  },
  created() {
    auth.exit();

    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      if (window.innerHeight < this.windowHeight) {
        this.isFocus = true;
      } else {
        this.isFocus = false;
      }
    });
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
  a {
    color #000 !important
  }
  .recovery-password {
    margin-top 10px
    text-decoration underline
  }
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
            font-size 13px
            word-break: normal
          }
          &-rules-button {
            font-size 13px
            margin-top 5px
            text-decoration:underline
            word-break: normal
          }
      }
  }
  .button {
    width 100% !important
    height 34vh;
    margin 0;
    &-center {
      width 100% !important;
        &-registration {
          height 56px !important
          color #56D68B
          font-size: 13px
          background: transparent
          border 1px solid #56D68B
          border-radius 30px
          width 72% !important
        }
        &-go-to-auth {
          height 56px !important
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
      width 100%

      &-svg-icon{
        width 41px
        height 41px
        margin 5px
      }
    }
  }
</style>
