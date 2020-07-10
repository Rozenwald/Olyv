<template lang='pug'>
    .container
      OrderCard1(v-for='item in items' :key='item.id' :title='item.title' :cost='item.cost')
</template>

<script>

import OrderCard1 from './OrderCard2.vue';

export default {
  name: 'OrderCard',
  data: () => ({
    items: [
      { title: 'Уведомления', cost: '10 909р', id: 1 },
      { title: 'Черный список', cost: '10 909р', id: 2 },
      { title: 'Редактирвание профиля', cost: '10 909р', id: 3 },
      { title: 'Связь с разработчиком', cost: '10 909р', id: 4 },
      { title: 'Информация', cost: '10 909р', id: 5 },
    ],
  }),
  components: {
    OrderCard1,
  },
};
</script>

<style lang="stylus" scoped>
  .setting{
    padding 0 15px
    background-color white
  }

  .right_arrow{
    width 8px !important
    height auto !important
  }

  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }

  .v-list-item:last-child {
    border-bottom none
  }

</style>
