<template lang="pug">
  v-container.executor-more-info-wrp
    user-card.user-card(:user="customerUser" v-if='isAuth === true')
    address-field.address-field(
      :order="(orderType !== 'endedExecutor') ? order : order.order")
    order-information.order-information(
      :order="(orderType !== 'endedExecutor') ? order : order.order")
    bottom-field.bottom-field(
      :order="(orderType !== 'endedExecutor') ? order : order.order")
    snackbar(feedbackText)
</template>

<script>
import axios from 'axios';
import UserCard from '../components/executorMoreInfo/UserCard.vue';
import BottomField from '../components/executorMoreInfo/BottomField.vue';
import AddressField from '../components/executorMoreInfo/AddressField.vue';
import OrderInformation from '../components/executorMoreInfo/OrderInformation.vue';
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';
import dialogMessages from '../scripts/dialogMessages';
import feedbackDialog from '../components/FeedbackDialog.vue';
import Snackbar from '../components/Snackbar.vue';

export default {
  name: 'moreInfoOrder',
  components: {
    axios,
    UserCard,
    BottomField,
    AddressField,
    OrderInformation,
    feedbackDialog,
    Snackbar,
  },
  data() {
    return {
      customerUser: {},
    };
  },
  methods: {
    feedbackText() {
      return 'Отзыв оставлен';
    },
    route(routeName) {
      this.$router.push(routeName);
    },

    goChat() {
      this.$store.dispatch('setIdUserRequest', this.order.idUserCustomer);
      this.$router.push('chat');
    },

    getCustomerUserData() {
      if (this.isAuth === true) {
        axios
          .post(`${this.$baseUrl}api/v1/private/user`, {
            method: 'receive',
            submethod: 'id',
            token: this.token,
            id: (this.orderType !== 'endedExecutor') ? this.order.idUserCustomer : this.order.order.idUserCustomer,
          })
          .then((response) => (this.checkCustomerUserData(response)))
          // eslint-disable-next-line no-return-assign
          .catch((error) => {
            logger.log(error);
          });
      }
    },

    checkCustomerUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.customerUser = response.data.data;
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
          logger.log(response);
          break;
      }
    },

  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },

    token() {
      return this.$store.getters.getToken;
    },

    orderType() {
      return this.$store.getters.getOrderType;
    },

    order() {
      if (this.orderType !== 'endedExecutor') {
        return this.$store.getters.getMyOrder;
      }
      return this.$store.getters.getMyFeedbackOrder;
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

    logger.log(this.order);

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
