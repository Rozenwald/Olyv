<template lang="pug">
  .review
    .title-review Отзывы
    .comments
      comment(v-for="item in items" :key="item.id" v-show="items")
      v-row.no-comments-wrp(align='center' justify='center')
        .no-comments Никто не оставил отзывов
</template>

<script>
import Comment from './Comment.vue';

export default {
  name: 'review',
  components: {
    Comment,
  },
  data() {
    return {
      items: null,
    };
  },
};
</script>

<style lang="stylus" scoped>
  .title-review {
    color #656565
  }

  .review {
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
  }

  .comment:first-child {
    margin-top 0
  }

  .no-comments-wrp {
    margin 15px
  }
</style>
