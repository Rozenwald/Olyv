<template lang="pug">
  v-container
    .set-user-data
      v-row.load-avatar-wrapper(align='center' justify='center')
        .load-avatar(align='center' justify='center')
          .load-avatar-description
            img(src="../assets/photo-camera.png", alt="photo camera icon")
            .load-ur-photo(v-show="!isFocus") Загрузите Ваше фото

      v-text-field.input-data(label="Имя"
                              dense color="#65686C"
                              clearable
                              @focus="isFocus = true"
                              @blur="isFocus = false"
                             )
      v-text-field(label="Фамилия"
                   dense color="#65686C"
                   clearable
                   @focus="isFocus = true"
                   @blur="isFocus = false"
                  )

      v-row.btn-wrapper(align='center' justify='center')
        v-btn.btn-save(rounded) Сохранить
</template>

<script>
export default {
  name: 'SetUserData',
  data() {
    return {
      isFocus: false,
      bodyHeight: null,
    };
  },
  created() {
    this.$store.commit('setTitle', 'Личный кабинет');
    this.bodyHeight = document.body.offsetHeight;
  },
  watch: {
    isFocus() {
      this.$store.dispatch('showBottomNavigation', !this.isFocus);
    },
  },
};
</script>

<style lang="stylus" scoped>

  .load-avatar-wrapper{
    height 40vh
  }

  .set-user-data{
    margin-bottom 44px
  }

  .load-avatar{
    width 27vh !important
    height 27vh !important
    border-radius 14vh
    background #FFFFFF
    display block
  }

  .load-avatar-description{
    width 27vh
    height 27vh
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

  .btn-wrapper{
    min-height 20vh
  }

  .btn-save{
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 240px
    box-shadow none
  }
</style>
