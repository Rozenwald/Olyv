<template lang="pug">
  .customer-profile-wrp
    .customer-profile
      UserProfileData
      v-btn#btn-verification(rounded elevation="0") Пройти верификацию
</template>

<script>

import UserProfileData from '../components/UserProfileData.vue';

export default {
  name: 'CustomerProfile',
  components: {
    UserProfileData,
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
