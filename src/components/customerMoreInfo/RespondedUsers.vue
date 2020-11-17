<template lang="pug">
  v-sheet.responded-user(elevation="1" rounded)
    v-row.responded-user-title.font-weight-medium() Отозвались ({{respondedList.length || 0}})
    swipe-cards
</template>

<script>
import SwipeCards from './SwipeCards.vue';

export default {
  name: 'responded-users',
  components: {
    SwipeCards,
  },
  computed: {
    respondedList() {
      return this.$store.getters.getRespondedList || [];
    },
  },
};
</script>

<style lang="stylus" scoped>
  .responded-user {
    padding 12px 0

    .row {
      margin 0
    }

    &-title {
      margin-bottom 5px !important
      margin-left 12px !important
    }
  }
</style>
