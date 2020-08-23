<template lang="pug">
  #app
    v-app
      appbar
      router-view.router
      bottom-navigation
      login-dialog
      repeat-login-dialog
</template>

<script>
import axios from 'axios';
import Appbar from './components/Appbar.vue';
import BottomSheet from './components/BottomShit.vue';
import BottomNavigation from './components/BottomNavigation.vue';
import store from './store/index';
import LoginDialog from './components/LoginDialog.vue';
import RepeatLoginDialog from './components/RepeatLoginDialog.vue';

export default {
  name: 'App',
  store,
  axios,
  components: {
    Appbar,
    BottomSheet,
    BottomNavigation,
    LoginDialog,
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
</style>
