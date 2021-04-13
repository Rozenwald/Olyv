<template lang="pug">
  v-row.wrp(align="center" justify="center")
    v-row.text-wrp(align="center" justify="center")
      v-icon.text-wrp-icon(color="#56D68B") done
      span Пароль успешно изменен

    a(href="olyvapp://")
      v-btn(rounded).btn-go-app Открыть в Olyv
</template>

<script>
export default {
  name: 'SuccessUpadatePassword',
  created() {
    this.$store.commit('setTitle', 'Восстановление пароля');
  },
};
</script>

<style lang="stylus" scoped>
  .wrp {
    color #56D68B
    height 200px
    max-height 200px
    margin 24px 0 0 0
  }

  .text-wrp {
    width 100%
    margin 0

    &-icon {
      margin-right 5px
    }
  }

  .btn-go-app {
    color #FFA967
    font-size: 13px
    border 1px solid #FFA967
    margin-top 40px
  }
</style>
