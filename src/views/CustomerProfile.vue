<template lang="pug">
  v-container
    user-profile-header
    v-divider
    user-profile-subheader
    v-divider
    review
</template>

<script>
import axios from 'axios';
import store from '../store';
import Review from '../components/Review.vue';
import UserProfileHeader from '../components/UserProfileHeader.vue';
import UserProfileSubheader from '../components/UserProfileSubheader.vue';

export default {
  name: 'CustomerProfile',
  components: {
    UserProfileHeader,
    UserProfileSubheader,
    Review,
    store,
    axios,
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
  },
  created() {
    this.$store.commit('setTitle', 'Личный кабинет');
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
