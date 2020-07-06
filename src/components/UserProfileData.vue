<template lang="pug">
  .user-profile-wrp
    .user-avatar-wrp
      .user-avatar
        img(src="../assets/photo-camera.png", alt="фото профиля")
    .user-name User Name
</template>

<script>
export default {
  name: 'UserProfileData',
};
</script>

<style lang="stylus" scoped>
  .user-profile-wrp{
    width 170px
  }

  .user-avatar-wrp{
    width 170px
    height 170px
    border-radius 85px
    background #FFFFFF
  }

  .user-avatar{
    width 170px
    height 170px
    vertical-align middle
    display table-cell
    text-align center
  }

  .user-name{
    font-style normal
    font-weight 500
    font-size 16px
    line-height 19px
    text-align center
    margin-top 27px
  }
</style>
