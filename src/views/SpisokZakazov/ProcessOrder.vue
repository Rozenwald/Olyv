`<template lang="pug">
  .order-container
    v-row.icon-container(justify='center' align='center' v-if="loadType ==='icon'")
      semipolar-spinner(:animation-duration="1500"
                        :size="75"
                        :color="'#fd7363'")
    v-row.text-container(justify='center'
                         align='center'
                         v-else-if="loadType === 'text'")
      .errorText-container
        span.errorText-container {{textForUser1}} <br/>
        span.errorText-container {{textForUser2}}
    OrderCard2(v-else-if="loadType === 'order'"
               v-for='item in processOrders'
               type='process'
               :key='item._id'
               :item='item')
</template>

<script>
import axios from 'axios';
import { SemipolarSpinner } from 'epic-spinners';
import OrderCard2 from '../OrderCard2.vue';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'allOrder',
  data: () => ({
    processOrders: null,
    type: 'process',
    loadType: 'icon',
    textForUser1: '',
    textForUser2: '',
  }),
  components: {
    OrderCard2,
    axios,
    SemipolarSpinner,
  },
  methods: {
    // Получаю объект с массивом заказов которые в исполнении
    getProcessOrders() {
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'process',
        })
        .then((response) => (this.checkProcessOrdersResponse(response)))
        .catch((error) => {
          logger.log(error);
        });
    },
    // Создаю массив и отправляю его во Vuex
    checkProcessOrdersResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.processOrders = response.data.data;
          this.loadType = 'order';
          // this.$store.dispatch('setProcessOrder', this.processOrders);
          break;
        case 'notExist':
          this.textForUser1 = 'Вас пока не взяли исполнителем';
          this.textForUser2 = 'Советуем предложить заказчику более интересные условия';
          this.loadType = 'text';
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          break;
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  watch: {
    token() {
      if (this.token) {
        this.getProcessOrders();
      }
    },
  },
  created() {
    this.$store.dispatch('setChipStatus', 'process');
    if (this.token) {
      this.getProcessOrders();
    }
  },
};
</script>

<style lang="stylus" scoped>
  .text-container{
    text-align center
    height 100%
    padding-bottom: 75px
  }
  .errorText-container{
    display: inline-block
    font-style normal
    font-weight bold
    font-size 18px
  }
  .order-container{
    padding 0
    height 100%
  }
  .icon-container{
    padding-bottom: 75px
    height 100%
  }
  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }
  .v-list-item:last-child {
    border-bottom none
  }
</style>
