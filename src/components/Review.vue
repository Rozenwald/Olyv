<template lang="pug">
  .review
    .title-review Отзывы
    .comments
      comment(v-for="item in 3" :key="item.id")
</template>

<script>
import Comment from './Comment.vue';

export default {
  name: 'review',
  components: {
    Comment,
  },
};
</script>

<style lang="stylus" scoped>
  .title-review {
    color #656565
    text-align center
  }

  .review {
    margin 0
  }

  .comment:first-child {
    margin-top 0
  }
</style>
