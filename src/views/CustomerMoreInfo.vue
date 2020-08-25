<template lang="pug">
  v-container
    .executor-more-info
      .information-wrp
        v-row.more-info-wrp-first(align='center' justify='space-between')
          v-row.save-deal(align='center')
            svg-icon(name="SaveDeal"  v-show="order.protect == 'yes'")
            span( v-show="order.protect == 'yes'") Защищенная сделка
          v-row.cost-wrp(align='center' justify='center')
            .cost {{order.cost}}
        .description {{order.description}}
        .media-files
          v-row
            v-col.d-flex.child-flex.custom-card-wrp(v-for='n in 5', :key='n', cols='4')
              v-card.d-flex.custom-card(flat, tail)
                v-img.grey.lighten-2(:src='`https://picsum.photos/500/300?image=${n * 5 + 10}`', :lazy-src='`https://picsum.photos/10/6?image=${n * 5 + 10}`', aspect-ratio='1')
                  template(v-slot:placeholder)
                    v-row.fill-height.ma-0(align='center', justify='center')
                      v-progress-circular(indeterminate, color='grey lighten-5')
        v-row.btns(no-gutters  align='center')
          v-col( v-show="orderType == 'process'" align='center')
            v-btn.chat-btn(rounded) Чат
          v-col( v-show="orderType == 'await'" v-for="n in 2" :key="n" align='center')
            v-btn.edit-btn(rounded v-if="n == 1" @click="editOrder") Редактировать
            v-btn.delete-btn(rounded v-else @click="delOrder") Удалить
        .responded-title(v-show="orderType=='await'") Отозвались
        .responded-list(v-show="orderType=='await'")
          MoreInfoUserCard(
            v-for="item in responseList"
            :key='item._id'
            :idResponse='item._id'
            :idUserResponse='item.idUserResponse'
            :cost='item.comment'
          )
        v-row.process-title(v-show="orderType=='process'" align='center', justify='center')
          span Заказ выполняет {{executorData.name}} {{executorData.lastname}}
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
import MoreInfoUserCard from './MoreInfoUserCard.vue';
import store from '../store';

export default {
  name: 'moreInfoOrder',
  components: {
    SvgIcon,
    axios,
    store,
    MoreInfoUserCard,
  },
  data() {
    return {
      currentPrice: 5000, // Number
      respondedCount: 12,
      distantion: 3,
      responseList: null,
      executorData: {},
    };
  },
  methods: {
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

    delOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'del',
          // eslint-disable-next-line no-underscore-dangle
          id: this.order._id,
        })
        .then((response) => (this.checkResponse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },

    editOrder() {
      this.$router.push({ name: 'editOrder', params: { order: this.order } });
    },

    route(routeName) {
      this.$router.push(routeName);
    },

    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.$router.back();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

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
          this.responseList = response.data.data;
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
  }
  .responded-text-header {
    font-style normal
    font-weight 500
    font-size 10px
    line-height 10px
    color #65EB9C
    margin-left 5px
  }
  .executor-more-info-header{
    padding 0 !important
    height 56px
  }
  .row{
    margin 0
  }
  .cost-wrp {
    background #FEF5EE
    border-radius 10px 0 0 10px
    width 100px
    height 36px
    max-width 100px
    margin 0 -12px 0 0
  }
  .cost {
    font-family Golos
    font-style normal
    font-weight 600
    font-size 18px
    color: #FE7664
  }
  .save-deal span {
    font-style normal
    font-weight bold
    font-size 10px
    color #FE7664
    margin-left 5px
  }
  .description {
    margin-top 15px
    font-family Golos
    font-style normal
    font-weight normal
    font-size 13px
    line-height 19px
    color #3C3F44
  }
  .media-files .row {
    overflow auto
    white-space nowrap
    flex-wrap nowrap
    margin-top 10px
  }
  .plus-btn, .minus-btn {
    width 40px !important
    height 40px !important
    background none !important
    opacity: 0.3;
    border: 1px solid rgba(101, 104, 108, 0.8);
    box-sizing: border-box;
    border-radius 20px
    box-shadow none !important
    min-width 0 !important
    padding 0 !important
  }

  .chat-btn{
    width 100%
    background none !important
    font-style normal
    font-weight 600
    font-size 13px
    color #56D68B
    border 1px solid #56D68B
    box-shadow none !important
  }

  .currentPrice{
    padding 0 12px
    text-align center
    font-family Golos
    font-style normal
    font-size 14px
    color #3C3F44
  }
  .btns{
    margin-top 15px
  }
  .edit-price{
    margin-top 3px
  }
  .edit-btn{
    width 90%
    margin-right 5%
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    box-shadow none !important
  }
  .delete-btn{
    width 90%
    background none !important
    font-style normal
    font-weight 600
    font-size 13px
    color #56D68B
    border 1px solid #56D68B
    box-shadow none !important
  }
  .responded-title{
    text-align center
    font-size 16px
    color #56D68B
    margin 15px 0
  }
  .v-alert{
    margin -12px
    margin-bottom 12px
    border-radius 0 !important
  }

  .process-title {
    margin-top 15px !important
  }
</style>
