<template lang="pug">
  v-container
    order-information.order-information
    responded-users.responded-users
    bottom-field
</template>

<script>
import axios from 'axios';
import OrderInformation from '../components/customerMoreInfo/OrderInformation.vue';
import RespondedUsers from '../components/customerMoreInfo/RespondedUsers.vue';
import BottomField from '../components/customerMoreInfo/BottomField.vue';

export default {
  name: 'moreInfoOrder',
  components: {
    axios,
    OrderInformation,
    RespondedUsers,
    BottomField,
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

    getExecutorData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'id',
          token: this.token,
          id: this.order.idUserExecutor,
        })
        .then((response) => (this.checkExecutorData(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },

    checkExecutorData(response) {
      switch (response.data.status) {
        case 'success':
          this.executorData = response.data.data;
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

    if (this.orderType === 'process') {
      this.getExecutorData();
    }
  },
};
</script>

<style lang="stylus" scoped>
  .container {
    background-color #fff
    height 100vh
  }
  .responded-users {
    margin-top 15px
  }
</style>
