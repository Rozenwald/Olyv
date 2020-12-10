<template lang="pug">
v-container.orderContainerHeight
  .order-container(ref="scrollUpdate")
    v-row.icon-container(justify='center' align='center' v-if='loadType')
      semipolar-spinner(:animation-duration="1500"
                        :size="75"
                        :color="'#fd7363'")
    OrderCard2(v-else
               v-for='item in allClear'
               type='all'
               :key='item._id'
               :item='item')
</template>

<script>
import axios from 'axios';
import store from '../store';
import OrderCard1 from './OrderCard1.vue';

export default {
  name: 'moiZakazi',
  components: {
    OrderCard1,
    axios,
    store,
  },
  methods: {
    route(name) {
      this.$router.push({ name });
    },
  },
  computed: {
    type() {
      return this.$store.getters.getChipStatus;
    },
    token() {
      return this.$store.getters.getToken;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Сообщения');
  },
};
</script>

<style lang="stylus" scoped>
  .list-item{
    margin-top 48px
  }
  .chips-wrp {
    top 48px
    position fixed
    width 100%
    z-index 2
    left 0
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.1),
                0px 1px 1px 0px rgba(0, 0, 0, 0.11),
                0px 1px 3px 0px rgba(0, 0, 0, 0.01) !important;
  }

  .await-order-list:first-child,
  .process-order-list:first-child {
    margin-top 0
  }

  .await-order-list, .process-order-list {
    margin-top: 48px
  }

  .active-chip {
    background-color #56d67b
    color #56d67b !important
    text-color #56d67b
  }
  .orderContainerHeight {
    height 100%
  }
</style>
