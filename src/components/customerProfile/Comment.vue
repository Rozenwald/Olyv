<template lang="pug">
  v-card.comment
    v-list-item(dense)
      v-list-item-avatar(color="#56D68B")
      v-list-item-content
        v-list-item-title {{name}} {{lastname}}
      v-list-item-action
        v-row.rating-wrp(align='center' justify='center')
          v-rating(
            :length="1"
            readonly
            :value="1"
            :half-increments="true"
            :dense="true"
            color="#FFCA10"
            background-color="#FFCA10"
            size="14"
          )
          span 4.8
    v-card-text {{comment}}
</template>

<script>
export default {
  name: 'comment',
  data() {
    return {
      items: ['Мргл мргл мрльк мрльк мрррглл флллурлоккр мурчаль н лок млгггррр мурчаль мрругл дрррзя ммгр ммм мммм флллурлок'],
    };
  },
  computed: {

    name() {
      return 'Коля';
    },

    lastname() {
      return 'Иноватик';
    },

    comment() {
      return 'Мргл мргл мрльк мрльк мрррглл флллурлоккр мурчаль н лок млгггррр мурчаль мрругл дрррзя ммгр ммм мммм флллурлок';
    },
  },
};
</script>

<style lang="stylus" scoped>
  .v-card {
    width 100%
    background-color inherit
    box-shadow none !important
    margin-top 15px
  }

  .v-list-item {
    padding 0
  }

  .v-card__text {
    padding 0
  }

  .rating-wrp {
    margin 0
    font-size 14px
    line-height 1
  }

  .v-list-item__title {
    font-weight bold
    font-size 14px
  }

  .v-rating {
    margin-right 3px
  }
</style>
