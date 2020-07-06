<template lang="pug">
  v-app-bar#toolbar(app)
    .toolbar-title-wrapper
      .toolbar-title {{title}}
</template>

<script>
export default {
  name: 'Appbar',
  props: ['title'],
};
</script>

<style lang="stylus" scoped>

  #toolbar{
    background-color #56D68B
    box-shadow 0px 2px 2px rgba(0, 0, 0, 0.05)
  }

  .toolbar-title-wrapper{
    width 100%
    height 56px
    line-height 56px
    font-style normal
    font-weight 600
    font-size 17px
    text-align center
    color #FFFFFF
  }
</style>
