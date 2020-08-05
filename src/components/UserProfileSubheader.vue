<template lang="pug">
  v-row.subheader(no-gutters)
    v-col.statistic(align='center' justify='center')
      .num 43
      .description Заказчик
    v-col.statistic(align='center' justify='center')
      .num 234
      .description Исполнитель
    v-col.statistic(align='center' justify='center')
      .num 3
      .description Отзывы
</template>
<script>
export default {
  name: 'user-profile-subheader',
};
</script>

<style lang="stylus" scoped>
  .num {
    font-weight bold
  }
  .statistic {
    line-height 1.2
  }
  .description {
    color #656565
  }
</style>
