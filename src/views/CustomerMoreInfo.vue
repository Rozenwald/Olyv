  <template lang="pug">
    v-container
      order-information.order-information(
        :order="(orderType !== 'endedCustomer') ? order : order.order")
      responded-users.responded-users(v-if="orderType == 'await'")
      bottom-field.bottom-field(v-if="orderType == 'await' || 'endedCustomer'")
      executor-card.executor-card(v-if="orderType == 'process'")
      feedbackDialog
</template>

<script>
import axios from 'axios';
import OrderInformation from '../components/customerMoreInfo/OrderInformation.vue';
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';
import dialogMessages from '../scripts/dialogMessages';
import feedbackDialog from '../components/FeedbackDialog.vue';

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
    feedbackDialog,
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
        .catch((error) => {
          logger.log(error);
        });
      /* eslint-enable no-return-assign */
    },

    checkOrderResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setRespondedList', response.data.data);
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
    orderType() {
      return this.$store.getters.getOrderType;
    },
    token() {
      return this.$store.getters.getToken;
    },
    order() {
      if (this.orderType !== 'endedCustomer') {
        return this.$store.getters.getMyOrder;
      }
      return this.$store.getters.getMyFeedbackOrder;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Мои заказы');

    if (this.orderType === 'await') {
      logger.log(this.order);
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
