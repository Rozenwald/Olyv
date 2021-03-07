<template lang="pug">
  v-row.wrp( align="center" justify="center")
    semipolar-spinner(
      v-if="loading"
      :animation-duration="1500"
      :size="75"
      color="#fd7363")
    .success-confirm(v-else)
      .success-confirm-text Почта успешно подверждена
      a(href="olyvapp://")
        v-btn(rounded).btn-go-app Открыть в Olyv
</template>

<script>
import axios from 'axios';
import { SemipolarSpinner } from 'epic-spinners';
import logger from '../scripts/logger';
import dialog from '../scripts/openDialog';
import dialogMessages from '../scripts/dialogMessages';
import nativeStorage from '../scripts/nativeStorage';
// eslint-disable-next-line import/no-cycle
import cordova from '../plugins/cordova';

export default {
  name: 'ConfirmCabinet',
  components: {
    SemipolarSpinner,
  },
  data() {
    return {
      email: null,
      password: null,
      isAddAppToken: false,
      loading: false,
    };
  },
  methods: {
    async confirmEmail() {
      try {
        const res = await axios.post(`${this.$baseUrl}api/v1/public/confirm`, {
          method: 'email',
          token: this.confirmToken,
        });
        return res;
      } catch (error) {
        logger.log(error);
      }

      return null;
    },

    async init() {
      this.$store.commit('setTitle', 'Подтверждение почты');

      this.loading = true;

      const confirmRes = await this.confirmEmail();

      logger.log(confirmRes);

      const hashEmail = confirmRes.data.data;

      if (!confirmRes) return;

      nativeStorage.getItem('confirmEmail')
        .then((confirmEmail) => {
          this.email = confirmEmail[hashEmail].email;
          this.password = confirmEmail[hashEmail].password;

          if (window.cordova.platformId !== 'browser') this.signIn();

          nativeStorage.removeItem(hashEmail);
        })
        .catch((err) => logger.log(err));
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

    confirmToken() {
      if (window.cordova.platformId === 'browser') {
        return this.$route.query.token;
      }

      return this.$store.getters.getConfirmEmailToken;
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
    this.init();
  },
};
</script>

<style lang="stylus">
  .wrp {
    margin 0
    text-align center
  }

  .btn-go-app {
    color #FFA967
    font-size: 13px
    border 1px solid #FFA967
    margin-top 40px
  }
</style>
