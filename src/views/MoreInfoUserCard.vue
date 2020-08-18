<template lang="pug">
  .swiper-container(:id="id")
    .swiper-wrapper
      v-list(class="swiper-slide")
      v-card.card.swiper-slide(@click="route('chat')")
          v-list-item(dense)
            v-list-item-avatar(color="grey")
            v-list-item-content
              v-list-item-title {{distation}}
            v-list-item-action
              v-row.cost-wrp(align='center' justify='center')
                .cost {{cost}}
</template>

<script>
import { SwipeList, SwipeOut } from 'vue-swipe-actions';

export default {
  name: 'OrderCard1',
  props: {
    title: String,
    cost: String,
    distation: String,
    idUser: String,
  },
  components: {
    SwipeOut,
    SwipeList,
  },
  data() {
    return {
        id: String,
    };
  },

  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
    getRandomId() {
      return `id${Math.floor(Math.random * Math.floor(100))}`;
    },
  },
  mounted() {
  },
  created() {
    this.id = this.getRandomId();
  },
};
</script>

<style lang="stylus">
.card{
  margin-bottom 7px
}
.cost-wrp {
    background #FEF5EE
    border-radius 10px 0 0 10px
    width 100px
    height 36px
    max-width 100px
    margin-right -16px
}
</style>
