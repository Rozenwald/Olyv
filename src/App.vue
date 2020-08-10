<template lang="pug">
  #app
    v-app
      appbar
      router-view.router
      bottom-navigation
      login-dialog
</template>

<script>
import axios from 'axios';
import Appbar from './components/Appbar.vue';
import BottomNavigation from './components/BottomNavigation.vue';
import store from './store/index';
import LoginDialog from './components/LoginDialog.vue';

export default {
  name: 'App',
  store,
  axios,
  components: {
    Appbar,
    BottomNavigation,
    LoginDialog,
  },

  data: () => ({
    error: '',
  }),
  methods: {
    getData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'my',
          token: window.localStorage.getItem('token'),
        })
        .then((response) => (this.checkResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },
    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showLoginDialog', true);
          break;
        case 'notExist':
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
    this.$store.dispatch('setToken', window.localStorage.getItem('token'));
    if (window.localStorage.getItem('token') != null) {
      this.getData();
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
