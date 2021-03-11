<template lang="pug">
  .description
    .description-title Описание
    v-row(align='center' justify='center' v-if="description == null")
      semipolar-spinner(
        :animation-duration="1500"
        :size="75"
        color="#fd7363")
    .description-body(v-text="description || 'Нет информации'")
    v-row.description-actions(v-if="!description")
      v-btn(text @click="route('setUserData')") Добавить описание
</template>

<script>
import { SemipolarSpinner } from 'epic-spinners';

export default {
  name: 'description',
  components: {
    SemipolarSpinner,
  },
  methods: {
    route(routeName) {
      this.$router.push({ name: routeName });
    },
  },
  computed: {
    userCard() {
      return this.$store.getters.getUserCard;
    },
    description() {
      return this.userCard.description;
    },
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

    &-actions button {
      width 100%
      margin-bottom -12px
      margin-top 10px
    }
  }
</style>
