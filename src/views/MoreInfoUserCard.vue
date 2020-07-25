<template lang='pug'>
  v-card.card(elevation="1")
    v-list-item(dense)
      v-list-item-avatar(color="grey")
      v-list-item-content
        v-list-item-title 3 км от Вас
      v-list-item-action
        v-row.cost-wrp(align='center' justify='center')
          .cost 423
</template>

<script>
export default {
  name: 'OrderCard1',
  props: {
    title: String,
    cost: String,
  },
};
</script>

<style lang="stylus" scoped>
  .card{
      margin-bottom 7px
  }
  .card:last-child{
      margin-bottom 0
  }

  .cost-wrp {
    background #FEF5EE
    border-radius 10px 0 0 10px
    width 100px
    height 36px
    max-width 100px
    margin-right -16px
  }

  .cost {
    font-family Golos
    font-style normal
    font-weight 600
    font-size 18px
    color: #FE7664
  }
</style>
