<template lang="pug">
  v-row.card-wrp(align='center' justify='end')
    .msg-card
      .text-wrp(align='center', justify='left')
        .text Да
      .time-wrp
        .time 12:23
</template>

<script>
export default {
  name: 'right-msg',
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
    background-color #FFFFFF
    border-radius 10px 10px 0px 10px
    font-size 12px
    max-width 50%
    text-align left
  }

  .text-wrp {
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
