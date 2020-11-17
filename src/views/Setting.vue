<template lang="pug">
  v-container
    .setting
      v-list
        template(v-for="(item, index) in items")
          v-list-item(:key="item.title"  @click="route(item.route)")
            v-list-item-icon.icon-left
              svg-icon(:name='item.icon')
            v-list-item-content
              v-list-item-title(v-text='item.title')
            v-list-item-action.icon-right
              v-btn(icon)
                svg-icon(name='RightArrow' width="8" height="12")
          v-divider(v-if="index + 1 < items.length" :key="index")
</template>

<script>
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'Setting',
  components: {
    SvgIcon,
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
  },
  computed: {
    items() {
      return this.$store.getters.getItemsSetting;
    },
    token() {
      return this.$store.getters.getToken;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Настройки');
    this.$store.dispatch('showBackBtn', false);
  },
  beforeDestroy() {
    this.$store.dispatch('showBackBtn', true);
  },
};
</script>

<style lang="stylus" scoped>
  .container{
    background-color white
    padding-top 56px !important
    padding-bottom 0 !important
    padding-left 0 !important
    padding-right 0 !important
    margin-bottom 63px
  }

  .v-list{
    padding 0 !important
  }

  .v-list-item{
    padding 0 !important
  }
  .icon-left{
    padding-left 12px  !important
  }
  .icon-right{
    padding-right 12px !important
  }
</style>
