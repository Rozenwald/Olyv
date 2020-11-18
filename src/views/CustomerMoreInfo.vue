<template lang="pug">
  v-container
    order-information.order-information
    responded-users.responded-users(v-if="orderType == 'await'")
    bottom-field.bottom-field(v-if="orderType == 'await'")
    executor-card.executor-card(v-if="orderType == 'process'")
</template>

<script>
import axios from 'axios';
import OrderInformation from '../components/customerMoreInfo/OrderInformation.vue';

const BottomField = () => import('../components/customerMoreInfo/BottomField.vue');
const ExecutorCard = () => import('../components/customerMoreInfo/ExecutorCard.vue');
const RespondedUsers = () => import('../components/customerMoreInfo/RespondedUsers.vue');

export default {
  name: 'moreInfoOrder',
  components: {
    axios,
    OrderInformation,
    RespondedUsers,
    BottomField,
    ExecutorCard,
  },
  data() {
    return {
      responseList: [],
      executorData: {},
    };
  },
  methods: {
    getOrderResponse() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'receive',
          submethod: 'customer',
          // eslint-disable-next-line no-underscore-dangle
          idOrder: this.order._id,
        })
        .then((response) => (this.checkOrderResponse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },

    checkOrderResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setRespondedList', response.data.data);
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },

    orderType() {
      return this.$store.getters.getOrderType;
    },

    order() {
      return this.$store.getters.getMyOrder;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Мои заказы');

    if (this.orderType === 'await') {
      this.getOrderResponse();
    }
  },
};
</script>

<style lang="stylus" scoped>
  .container {
    background-color #fff
    min-height 100vh
  }
  .responded-users, .executor-card {
    margin-top 15px
  }
</style>
