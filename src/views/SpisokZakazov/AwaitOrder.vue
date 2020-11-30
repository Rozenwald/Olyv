`<template lang="pug">
  .order-container
    v-row.icon-container(justify='center' align='center' v-if='loadType')
      semipolar-spinner(:animation-duration="1500"
                        :size="75"
                        :color="'#fd7363'")
    OrderCard2(v-else
               v-for='item in awaitOrders'
               type='await'
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
    awaitOrders: [],
    error: '',
    type: 'load',
    loadType: true,
  }),
  components: {
    OrderCard2,
    axios,
    SemipolarSpinner,
  },
  methods: {
    // Получение айдишников заказов которые в ожидании
    getAwaitOrder() {
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
        })
        .then((response) => (this.checkAwaitOrder(response)))
      // eslint-disable-next-line no-return-assign
        .catch((error) => {
          logger.log(error);
        });
    },
    // По полученным айдишникам обращаюсь на сервер по одному элементу
    checkAwaitOrder(response) {
      switch (response.data.status) {
        case 'success':
          response.data.data.forEach((element) => {
            this.getOrder(element);
          });
          this.loadType = false;
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push('auth'),
          );
          break;
        default:
          logger.log(response);
          break;
      }
    },
    // Вытаскиваю один заказ по айдишнику
    getOrder(element) {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
          id: element.idOrder,
        })
        .then((response) => (this.checkOrder(response, element)))
        .catch((error) => {
          logger.log(error);
        });
      /* eslint-enable no-return-assign */
    },
    // Добавляю этот элемент в массив заказов на которые я откликнулся
    checkOrder(response, element) {
      switch (response.data.status) {
        case 'success':
          this.awaitOrders.push(response.data.data[0]);
          // eslint-disable-next-line no-underscore-dangle
          this.awaitOrders[this.awaitOrders.length - 1].idResponse = element._id;
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push('auth'),
          );
          break;
        default:
          logger.log(response);
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
        this.getAwaitOrder();
      }
    },
  },
  created() {
    this.$store.dispatch('setChipStatus', 'await');
    if (this.token) {
      this.getAwaitOrder();
    }
  },
};
</script>

<style lang="stylus" scoped>
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
