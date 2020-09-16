<template lang="pug">
  #app
    v-app
      appbar
      router-view.router
      bottom-sheet
      back-step
      bottom-navigation
      login-dialog
      error-dialog
      repeat-login-dialog
</template>

<script>
import axios from 'axios';
import Appbar from './components/Appbar.vue';
import BottomSheet from './components/BottomSheet.vue';
import BottomNavigation from './components/BottomNavigation.vue';
import store from './store/index';
import LoginDialog from './components/LoginDialog.vue';
import ErrorDialog from './components/ErrorDialog.vue';
import RepeatLoginDialog from './components/RepeatLoginDialog.vue';
import BackStep from './components/BackStep.vue';

export default {
  name: 'App',
  store,
  axios,
  components: {
    Appbar,
    BottomSheet,
    BackStep,
    BottomNavigation,
    LoginDialog,
    ErrorDialog,
    RepeatLoginDialog,
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
  created() {
    this.$store.dispatch('setToken', window.localStorage.getItem('token'));
    this.$store.dispatch('setChatToken', window.localStorage.getItem('chatToken'));
    this.$store.dispatch('setIdChanal', window.localStorage.getItem('idChanal'));

    if (window.localStorage.getItem('token')) {
      this.getUserData();
    }
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
