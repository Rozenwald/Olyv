<template lang="pug">
  v-container.executor-more-info-wrp
    user-card.user-card(:user="customerUser")
    address-field.address-field(:order="order")
    order-information.order-information(:order="order")
    bottom-field.bottom-field(:order="order")
</template>

<script>
import axios from 'axios';
import UserCard from '../components/executorMoreInfo/UserCard.vue';
import BottomField from '../components/executorMoreInfo/BottomField.vue';
import AddressField from '../components/executorMoreInfo/AddressField.vue';
import OrderInformation from '../components/executorMoreInfo/OrderInformation.vue';

export default {
  name: 'moreInfoOrder',
  components: {
    axios,
    UserCard,
    BottomField,
    AddressField,
    OrderInformation,
  },
  data() {
    return {
      customerUser: {},
      changeValue: 1000,
      currentPrice: null, // Number
      respondedCount: 12,
      distantion: 3,
      inputWidth: null,
    };
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },

    goChat() {
      this.$store.dispatch('setIdUserRequest', this.order.idUserCustomer);
      this.$router.push('chat');
    },

    getCustomerUserData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'id',
          token: this.token,
          id: this.order.idUserCustomer,
        })
        .then((response) => (this.checkCustomerUserData(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка загрузки данных'));
    },

    getMyResponseOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
          // eslint-disable-next-line no-underscore-dangle
          id: this.order._id,
        })
        .then((response) => (this.checkMyResponseOrder(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkMyResponseOrder(response) {
      console.log(response);
    },

    checkCustomerUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.customerUser = response.data.data;
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка загрузки данных';
          break;
      }
    },

  },
  computed: {
    order() {
      return this.$store.getters.getMyOrder || {};
    },

    orderType() {
      return this.$store.getters.getOrderType;
    },

    token() {
      return this.$store.getters.getToken;
    },
  },
  watch: {
    token() {
      if (this.token) {
        this.getCustomerUserData();
      }
    },
  },
  created() {
    this.$store.commit('setTitle', 'Все заказы');

    if (this.token) {
      this.getCustomerUserData();
    }
  },
};
</script>

<style lang="stylus" scoped>
  .executor-more-info-wrp {
    min-height 100vh
    padding-bottom 130px
  }
  .container {
    background-color #fff
  }

  .order-information, .address-field {
    margin-top 15px
  }
</style>
