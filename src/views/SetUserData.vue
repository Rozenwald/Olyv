<template lang="pug">
  .set-user-data-wrapper
    .load-avatar-wrapper
      .load-avatar-description
        img(src="../assets/photo-camera.png", alt="photo camera icon")
        .load-ur-photo Загрузите Ваше фото

    v-text-field.input-data(label="Имя" dense color="#65686C")
    v-text-field(label="Фамилия" dense color="#65686C")

    v-btn(rounded id="btn-save") Сохранить

</template>

<script>
export default {
  name: 'SetUserData',
};
</script>

<style lang="stylus" scoped>

  .set-user-data-wrapper{
    margin 0 15px
    text-align center
  }

  .load-avatar-wrapper{
    width 170px
    height 170px
    border-radius 85px
    background #FFFFFF
    margin 45px auto 0
  }

  .load-avatar-description{
    width 170px
    height 170px
    vertical-align middle
    display table-cell
    text-align center
  }

  .load-ur-photo{
    margin-bottom 0
    margin-top 10px
    font-style normal
    font-weight normal
    font-size 13px
    line-height 16px
  }

  #btn-save{
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 240px
    margin-top 40px
  }

  .input-data{
    margin-top 35px
  }

</style>
