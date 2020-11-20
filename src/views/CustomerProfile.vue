<template lang="pug">
  v-container
    user-profile-header
    verification-status
    review
    exit-button
</template>

<script>
import axios from 'axios';
import store from '../store';
import Review from '../components/customerProfile/Review.vue';
import ExitButton from '../components/customerProfile/ExitButton.vue';
import UserProfileHeader from '../components/customerProfile/UserProfileHeader.vue';
import VerificationStatus from '../components/customerProfile/VerificationStatus.vue';

export default {
  name: 'CustomerProfile',
  components: {
    UserProfileHeader,
    VerificationStatus,
    ExitButton,
    Review,
    store,
    axios,
  },
  data() {
    return {
      error: '',
    };
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
    getData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/passport`, {
          method: 'receive',
          submethod: 'verification',
          token: this.token,
        })
        .then((response) => (this.checkResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },
    checkResponse(response) {
      console.log(response);
      switch (response.data.status) {
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'success':
          this.$store.dispatch('setComment', response.data.data.comment);
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
    user() {
      return this.$store.getters.getUser;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Личный кабинет');
    if (this.user.verification === 'notCompleted') {
      this.getData();
    }
    this.getData();
  },
  beforeRouteEnter(to, from, next) {
    if (!store.getters.isAuth) {
      next(from.name);
      store.dispatch('showLoginDialog', true);
    } else {
      next();
    }
  },
};
</script>

<style lang="stylus" scoped>

  .v-divider{
    margin 12px -12px
    max-width none
  }

  #btn-verification{
    background none
    font-style normal
    font-weight 600
    font-size 13px
    color #56D68B
    width 240px
    margin-top 88px
    border 1px solid #56D68B
    border-radius 100px
    box-shadow none
  }
</style>
