<template lang="pug">
  .order-container(ref="scrollUpdate")
    v-row.icon-container(justify='center' align='center' v-if='loadType')
      semipolar-spinner(:animation-duration="1500"
                        :size="75"
                        :color="'#fd7363'")
    OrderCard2(v-else
               v-for='item in allClear'
               type='all'
               :key='item._id'
               :item='item')
</template>

<script>
import axios from 'axios';
import { SemipolarSpinner } from 'epic-spinners';
import OrderCard2 from '../OrderCard2.vue';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';
import dialog from '../../scripts/openDialog';

export default {
  name: 'allOrder',
  data: () => ({
    all: null,
    allClear: [],
    awaitOrders: [],
    textForRegexp: '',
    regexp: null,
    lastDate: null,
    type: 'all',
    loadType: true,
  }),
  components: {
    OrderCard2,
    axios,
    SemipolarSpinner,
  },
  methods: {
    // Получение заказов
    getData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
        })
        .then((response) => (this.checkResponse(response)))
        .catch((error) => {
          logger.log(error);
        });
    },

    // Получение заказов без авторизации
    getPublicData() {
      axios
        .post(`${this.$baseUrl}api/v1/public/order`, {
          method: 'receive',
        })
        .then((response) => (this.checkResponse(response)))
        .catch((error) => {
          logger.log(error);
        });
    },

    // Формирование массива всех заказов
    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.all = response.data.data;
          if (this.token) {
            if (this.user.verification === 'completed') {
              this.getAwaitOrder();
            } else {
              this.getMyOrder();
            }
          } else {
            this.loadType = false;
            this.allClear = this.all.reverse();
          }
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push({ name: 'auth' }),
          );
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    getAwaitOrder() {
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
        })
        .then((response) => (this.checkAwaitOrder(response)))
        .catch((error) => {
          logger.log(error);
        });
    },
    checkAwaitOrder(response) {
      switch (response.data.status) {
        case 'success':
          response.data.data.forEach((element) => {
            // eslint-disable-next-line no-underscore-dangle
            this.textForRegexp = `${this.textForRegexp + element.idOrder}|`;
          });
          this.getMyOrder();
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push({ name: 'auth' }),
          );
          break;
        case 'notExist':
          this.getMyOrder();
          break;
        default:
          logger.log(response);
          break;
      }
    },
    getMyOrder() {
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'customer',
          status: 'await',
        })
        .then((response) => (this.checkMyOrderResponse(response)))
        .catch((error) => {
          logger.log(error);
        });
    },
    checkMyOrderResponse(response) {
      switch (response.data.status) {
        case 'success':
          response.data.data.forEach((element) => {
            // eslint-disable-next-line no-underscore-dangle
            this.textForRegexp = `${this.textForRegexp + element._id}|`;
          });
          this.createRegular();
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push({ name: 'auth' }),
          );
          break;
        case 'notExist':
          this.createRegular();
          break;
        default:
          logger.log(response);
          break;
      }
    },
    createRegular() {
      if (this.textForRegexp !== '') {
        this.textForRegexp = this.textForRegexp.substring(0, this.textForRegexp.length - 1);
        this.regexp = new RegExp(`${this.textForRegexp}`);
        this.getClearAll();
      } else {
        this.getClearAll();
      }
    },
    getClearAll() {
      if (this.textForRegexp === '') {
        this.allClear = [...this.allClear, ...this.all];
      } else {
        for (let j = 0; j < this.all.length; j += 1) {
          // eslint-disable-next-line no-underscore-dangle
          if (this.regexp.test(this.all[j]._id) !== true) {
            this.allClear.push(this.all[j]);
          }
        }
      }
      this.loadType = false;
      this.watchScroll();
    },
    watchScroll() {
      this.lastDate = this.all[this.all.length - 1].ofCreateDate;
      const date = new Date(this.lastDate).getTime() - 1000;
      window.onscroll = () => {
        if ((this.$refs.scrollUpdate.clientHeight - window.scrollY) <= 1000) {
          this.getMoreOrder(date);
        }
      };
    },
    getMoreOrder(date) {
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
          date,
        })
        .then((response) => (this.checkMoreOrderResponse(response)))
        .catch((error) => {
          logger.log(error);
        });
    },
    checkMoreOrderResponse(response) {
      switch (response.data.status) {
        case 'success':
          if (response.data.data[response.data.data.length - 1].ofCreateDate !== this.lastDate) {
            this.all = response.data.data;
            this.getClearAll();
          }
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push({ name: 'auth' }),
          );
          break;
        case 'notExist':
          this.error = 'Ошибка';
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
    user() {
      return this.$store.getters.getUser;
    },
  },
  watch: {
    token() {
      if (this.token) {
        this.getData();
      }
    },
  },
  created() {
    this.$store.commit('setTitle', 'Исполнитель');
    this.$store.dispatch('setChipStatus', 'all');
    if (this.token) {
      this.getData();
    } else {
      this.getPublicData();
    }
  },
  mounted() {
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
