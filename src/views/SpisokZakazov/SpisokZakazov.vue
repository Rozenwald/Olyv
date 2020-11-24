<template lang="pug">
  v-container.orderContainerHeight
    v-row.chips(
                align='center'
                justify='space-around')
      v-chip-group(v-model="type" mandatory active-class="active-chip")
        v-chip.keyword-chip(value="keyword")
          svg-icon(name='KeyWord' width='30' height='30' color='#000')
        v-chip(value="all"
              outlined
              color="#56d67b"
              text-color="#000") Общие
        v-chip(value="await"
              outlined
              color="#56d67b"
              text-color="#000") Ожидание
        v-chip(value="process"
              outlined
              color="#56d67b"
              text-color="#000") Сделка
    AllOrder.list-item(v-if="type=='all'")
    AwaitOrder.list-item(v-if="type=='await'")
    ProcessOrder.list-item(v-if="type=='process'")
    KeyOrder.list-item(v-if="type=='keyword'")
</template>

<script>
import axios from 'axios';
import SvgIcon from '../../components/SvgIcon.vue';
import KeyOrder from './KeyOrder.vue';
import AllOrder from './AllOrder.vue';
import AwaitOrder from './AwaitOrder.vue';
import ProcessOrder from './ProcessOrder.vue';

export default {
  name: 'spisokZakazov',
  data: () => ({
    error: '',
    type: 'all',
  }),
  components: {
    axios,
    SvgIcon,
    KeyOrder,
    AllOrder,
    AwaitOrder,
    ProcessOrder,
  },
  methods: {
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    user() {
      return this.$store.getters.getUser;
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
  .chips {
   margin-bottom 12px
   background: #e3e3e3 50%
   padding-left 15px
   padding-right 15px
  }
  .active-chip {
    background-color #56d68b
    color #56d68b !important
  }
  .orderContainerHeight {
    height 100%
  }
</style>
