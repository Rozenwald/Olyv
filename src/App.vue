<template lang="pug">
  #app
    v-app
      appbar
      router-view.router
      bottom-sheet-group
      bottom-navigation
      login-dialog
      error-dialog
      back-step
      repeat-login-dialog
</template>

<script>
import axios from 'axios';
import Appbar from './components/Appbar.vue';
import BottomSheetGroup from './components/BottomSheetGroup.vue';
import BottomNavigation from './components/BottomNavigation.vue';
import store from './store/index';
import LoginDialog from './components/LoginDialog.vue';
import ErrorDialog from './components/ErrorDialog.vue';
import RepeatLoginDialog from './components/RepeatLoginDialog.vue';
import BackStep from './components/BackStep.vue';
import 'leaflet/dist/leaflet.css';
import cordova from './plugins/cordova';

export default {
  name: 'App',
  store,
  axios,
  components: {
    Appbar,
    BottomNavigation,
    LoginDialog,
    ErrorDialog,
    BackStep,
    RepeatLoginDialog,
    BottomSheetGroup,
  },

  data: () => ({
    error: '',
  }),
  methods: {
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
        case 'notExist':
          this.$store.dispatch('setToken', null);
          window.localStorage.removeItem('token');
          this.$store.dispatch('showLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка входа';
          break;
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  created() {
    this.$store.dispatch('showBubble', false);
    cordova.listen();
    if (this.token) {
      this.getUserData();
    }
  },
  watch: {
    token() {
      if (this.token) {
        this.getUserData();
      }
    },
  },
};
</script>

<style lang="stylus">
  #app{
    background-color #f7f7f7;
    font-family Inter
  }
  .router{
    padding-bottom 63px+12px
    padding-top 56px+12px
  }

  .text-message .v-input__append-inner {
    align-self flex-end !important
    margin-top 0
    margin-bottom 10px
  }
</style>
