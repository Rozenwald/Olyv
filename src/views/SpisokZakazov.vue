<template lang="pug">
  v-container.orderContainerHeight
    v-sheet(fixed elevation="1" "chips" v-show="user.verification === 'completed'").chips-wrp
      v-row.chips(align='center' justify='space-around')
        v-chip-group(v-model="type" mandatory active-class="active-chip")
          v-chip.keyword-chip(
                value="keyword"
                @click="route('keyOrder')")
            svg-icon(name='KeyWord' width='30' height='30' color='#000')
          v-chip(value="all"
                outlined
                color="#56d67b"
                text-color="#000"
                @click="route('allOrder')") Общие
          v-chip(value="await"
                outlined
                color="#56d67b"
                text-color="#000"
                @click="route('awaitOrder')") Ожидание
          v-chip(value="process"
                outlined
                color="#56d67b"
                text-color="#000"
                @click="route('processOrder')") Сделка
          v-chip(value="ended"
                outlined
                color="#56d67b"
                text-color="#000"
                @click="route('endedOrder')") Отзыв
    transition(:name="transitionName" mode="out-in")
      router-view.list-item(:style="{marginTop: margin}")
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
import AllOrder from './SpisokZakazov/AllOrder.vue';
import AwaitOrder from './SpisokZakazov/AwaitOrder.vue';
import ProcessOrder from './SpisokZakazov/ProcessOrder.vue';
import KeyOrder from './SpisokZakazov/KeyOrder.vue';
import EndedOrder from './SpisokZakazov/EndedOrder.vue';

export default {
  name: 'spisokZakazov',
  data: () => ({
    error: '',
  }),
  components: {
    axios,
    SvgIcon,
    KeyOrder,
    AllOrder,
    AwaitOrder,
    ProcessOrder,
    EndedOrder,
  },
  methods: {
    route(name) {
      this.$router.push({ name });
    },
  },
  computed: {
    type: {
      get() {
        return this.$store.getters.getChipStatus;
      },

      set(value) {
        this.$store.dispatch('setChipStatus', value);
      },
    },
    token() {
      return this.$store.getters.getToken;
    },
    user() {
      return this.$store.getters.getUser;
    },
    margin() {
      let margin = 0;
      if (this.user.verification === 'completed') {
        margin = 48;
      } else {
        margin = 0;
      }
      const length = `${margin}px`;
      return length;
    },
    transitionName() {
      return this.$store.getters.getTransitionName;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Исполнитель');
  },
};
</script>

<style lang="stylus" scoped>

  .list-item:first-child{
    margin-top 0
  }

  .keyword-chip{
    padding 0
    height 30px !important
  }

  .chips-wrp {
    top 48px
    position fixed
    z-index 2
    left 0
    width 100%
    padding-left 15px
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.1),
                0px 1px 1px 0px rgba(0, 0, 0, 0.11),
                0px 1px 3px 0px rgba(0, 0, 0, 0.01) !important;
  }

  .active-chip {
    background-color #56d68b
    color #56d68b !important
  }
  .orderContainerHeight {
    height 100%
  }
</style>
