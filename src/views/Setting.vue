<template lang="pug">
  .setting-wrp
    .setting
      v-list
        v-list-item(v-for="item in items" :key="item.title")
          v-list-item-icon
            svg-icon(:name='item.icon')
          v-list-item-content
            v-list-item-title(v-text='item.title')
          v-list-item-action
            v-btn(icon)
              svg-icon(name='RightArrow' width="8" height="12")
</template>

<script>
import SvgIcon from '../components/SvgIcon.vue';

export default {
  components: {
    SvgIcon,
  },
  name: 'Setting',
  computed: {
    items() {
      return this.$store.getters.getItemsSetting;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Настройки');
  },
};
</script>

<style lang="stylus" scoped>
  .setting{
    padding 0 15px
    background-color white
  }

  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }

  .v-list-item:last-child {
    border-bottom none
  }

</style>
