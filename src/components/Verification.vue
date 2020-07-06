<template lang="pug">
  .verification-wrp
    .verification
      .verification-step Шаг 1
      .photo-field-wrp
        .photo-field
          img(src="../assets/photo-camera.png", alt="photo" v-if="photoIsLoad")
          img(src="../assets/photo-camera.png", alt="photo camera icon" v-if="!photoIsLoad")
          .load-ur-photo(v-if="!photoIsLoad") Загрузите фото паспорта
      v-btn(rounded id="btn-next-verification") Сохранить

</template>

<script>
export default {
  name: 'Verification',
  data: () => ({
    photoIsLoad: false,
  }),
};
</script>

<style lang="stylus" scoped>

  .verification{
    margin 0 15px
    text-align center
  }

  .verification-step{
    margin-top 120px
    color #3C3F44
    font-style normal
    font-weight 600
    font-size 20px
    line-height 18px
    text-align left
  }

  .photo-field-wrp{
    margin 25px auto 0
    width 100%
    height 80vw
    background-color #ffffff
    border-radius 5px
  }

  .photo-field{
    width 100vw
    height 80vw
    vertical-align middle
    display table-cell
    text-align center
  }

  #btn-next-verification{
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 240px
    margin-top 25px
  }
</style>
