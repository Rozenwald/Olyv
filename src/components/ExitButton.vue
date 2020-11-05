<template lang="pug">
  v-btn.exit-btn(block)
    v-icon(dense color="red") exit_to_app
    span.text Выход
</template>

<script>
export default {
  name: 'exit-button',
  methods: {
  },
};
</script>

<style lang="stylus">
  .exit-btn {
    background-color #FFFFFF !important
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    text-transform none
  }

  .text{
    color red
    margin-left 5px
  }
</style>
