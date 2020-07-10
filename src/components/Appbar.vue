<template lang="pug">
  v-app-bar#toolbar(app v-show="show")
    .toolbar-title-wrapper
      .toolbar-title {{title}}
</template>

<script>
export default {
  name: 'appbar',
  computed: {
    title() {
      return this.$store.getters.getTitle;
    },
    show() {
      return this.$store.getters.isVisibleAppbar;
    },
  },
};
</script>

<style lang="stylus" scoped>

  #toolbar{
    background-color #56D68B
    box-shadow 0px 2px 2px rgba(0, 0, 0, 0.05)
    max-height 56px
    position static
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
