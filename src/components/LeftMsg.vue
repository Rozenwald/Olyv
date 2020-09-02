<template lang="pug">
  v-row.card-wrp
    .msg-card
      .text-wrp(align='center', justify='left')
        .text Бля CERF TMFDNJ FDMSD NCSJCN
      .time-wrp
        .time 12:23
</template>

<script>
export default {
  name: 'left-msg',
};
</script>

<style lang="stylus" scoped>
  .card-wrp {
    margin 5px 0
  }

  .card-wrp:first-child {
    margin-top 0
  }

  .msg-card {
    padding 5px
    background-color #e7e7e7
    border-radius 10px 10px 10px 0px
    font-size 12px
    max-width 50%
    text-align right
  }

  .text-wrp, .text {
    text-align left
  }

  .time-wrp {
    padding-left 5px
    font-size 10px
  }

  .msg-card, .time-wrp, .text-wrp  {
    display inline-block
    vertical-align bottom
  }
</style>
