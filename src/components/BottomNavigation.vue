<template lang="pug">
  v-bottom-navigation#bottom-navigation(:value="activeBtn" fixed grow)
    v-btn.nav-btn(v-for="item in items" :key="item.title" @click="route(item.routeName)")
      span(v-text="item.title" v-if='item.title.length > 0')
      v-icon.bottom-navigation-icon(v-text="item.icon" v-if='item.title.length > 0')
      v-row#create-order-btn(v-else align='center', justify='center')
        v-icon(v-text="item.icon")
</template>

<script>
export default {
  name: 'BottomNavigation',
  data: () => ({
    items: [
      { title: 'Мои заявки', icon: '$vuetify.icons.my_orders', routeName: '' },
      { title: 'Список заказов', icon: '$vuetify.icons.orders_list', routeName: '' },
      { title: '', icon: '$vuetify.icons.plus' },
      { title: 'Личный кабинет', icon: '$vuetify.icons.user', routeName: 'profile' },
      { title: 'Настройки', icon: '$vuetify.icons.setting', routeName: 'setting' },
    ],
    activeBtn: 1,
  }),

  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
  },
};
</script>

<style lang="stylus" scoped>

  span{
    font-family Golos
    font-style normal
    font-weight 500
    font-size 8px
    line-height 8px
    text-align center
    color #656565
    opacity 0.7
  }

  .bottom-navigation-icon{
    padding-bottom 5px
  }

  .nav-btn{
    max-width 20% !important
    min-width 0 !important
    width 20%
  }

  #create-order-btn{
    position absolute
    bottom 9px
    height 60px
    width 60px
    border-radius 30px
    background linear-gradient(180deg, #65EB9C 0%, #068B4B 100%)
    border 5px solid #FFFFFF
  }
</style>
