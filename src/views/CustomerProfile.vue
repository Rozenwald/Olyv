<template lang="pug">
  .customer-profile-wrp
    .customer-profile
      UserProfileData
      v-btn#btn-verification(rounded
                             elevation="0"
                             @click="route('verification')"
                             v-text="'Пройти верификацию'"
                            )
</template>

<script>
import axios from 'axios';
import store from '../store';
import UserProfileData from '../components/UserProfileData.vue';

export default {
  name: 'CustomerProfile',
  components: {
    UserProfileData,
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
  beforeRouteEnter(to, from, next) {
    if (store.getters.getUser != null) {
      if (store.getters.getUser.name == null) {
        next('profile');
      } else {
        next();
      }
    } else {
      next();
    }
  },
};
</script>

<style lang="stylus" scoped>

  .customer-profile{
    margin 0 15px
    text-align center
  }

  .user-profile-wrp{
    margin 95px auto 0
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
