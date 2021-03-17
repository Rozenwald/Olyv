<template lang="pug">
  .description
    .description-title Описание
    v-skeleton-loader(type="list-item-three-line" :loading="!userCard._id")
      .description-body(v-text="userCard.description || 'Нет информации'")
</template>

<script>
export default {
  name: 'public-description',
  props: {
    userCard: Object,
  },
};
</script>

<style lang="stylus" scoped>
  .description {
    margin-top 10px
    margin-bottom 10px
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px

    &-title {
      color #656565;
    }
  }
</style>
