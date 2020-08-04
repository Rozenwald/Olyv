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
          token: this.token,
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
        default:
          this.error = 'Ошибка';
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
    this.getData();
  },
};
</script>

<style lang="stylus">
  #app{
    background-color #E5E5E5;
    font-family Inter
  }
  .router{
    padding-bottom 63px+12px
    padding-top 56px+12px
  }
</style>
