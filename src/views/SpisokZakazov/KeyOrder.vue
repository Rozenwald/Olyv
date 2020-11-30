<template lang="pug">
  .order-container(ref="scrollUpdate")
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
               v-for='item in keyOrder'
               type='keyword'
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
  name: 'keyOrder',
  data: () => ({
    keyword: '',
    keyRegexp: null,
    textForRegexp: '',
    awaitMyRegexp: null,
    all: null,
    keyOrder: [],
    date: null,
    lastDate: null,
    keyData: null,
    error: '',
    type: 'keyword',
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
    // Получение заказов
    getData() {
      /* eslint-disable no-return-assign */
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
      /* eslint-enable no-return-assign */
    },
    // Формирование массива всех заказов
    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.all = response.data.data;
          this.getAwaitOrder();
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
          this.error = 'Ошибка';
          break;
      }
    },
    getAwaitOrder() {
      /* eslint-disable no-return-assign */
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
      /* eslint-enable no-return-assign */
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
            this.$router.push('auth'),
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
          this.getClearAll();
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
        case 'notExist':
          this.getClearAll();
          break;
        default:
          logger.log(response);
          break;
      }
    },
    // Получение ключевых слов
    getKeyWord() {
      axios
        .post(`${this.$baseUrl}api/v1/private/keyword`, {
          token: this.token,
          method: 'receive',
          date: this.keyData,
        })
        .then((response) => (this.checkKeyWord(response)))
      // eslint-disable-next-line no-return-assign
        .catch((error) => {
          logger.log(error);
        });
    },
    // формирование текста для регулярки и формирование регулярки
    checkKeyWord(response) {
      switch (response.data.status) {
        case 'success':
          this.keyData = new Date(response.data.data[response.data.data.length - 1].createDate);
          this.keyData = this.keyData.getTime();
          response.data.data.forEach((element) => {
            this.keyword = `${this.keyword + element.text}|`;
          });
          this.getKeyWord();
          break;
        case 'notExist':
          if (this.keyword === '') {
            this.textForUser1 = 'У вас отсутствуют ключевые слова';
            this.textForUser2 = 'Перейдите в настройки чтобы их заполнить';
            this.loadType = 'text';
          } else {
            this.keyword = this.keyword.substring(0, this.keyword.length - 1);
            this.keyRegexp = new RegExp(`${this.keyword}`, 'im');
          }
          break;
        default:
          logger.log(response);
          break;
      }
    },
    getClearAll() {
      /* eslint-disable max-len */
      if (this.textForRegexp !== '') {
        this.textForRegexp = this.textForRegexp.substring(0, this.textForRegexp.length - 1);
        for (let j = 0; j < this.all.length; j += 1) {
          // eslint-disable-next-line no-underscore-dangle
          if ((this.awaitMyRegexp.test(this.all[j]._id) !== true) && (this.keyRegexp.test(this.all[j].description))) {
            this.keyOrder.push(this.all[j]);
          }
        }
      } else {
        for (let j = 0; j < this.all.length; j += 1) {
          if (this.keyRegexp.test(this.all[j].description)) {
            this.keyOrder.push(this.all[j]);
          }
        }
      }
      this.loadType = 'order';
      this.watchScroll();
      /* eslint-disable max-len */
    },
    watchScroll() {
      this.lastDate = this.all[this.all.length - 1].ofCreateDate;
      const date = new Date(this.lastDate).getTime() + 1000;
      if (this.keyOrder.length < 10) {
        this.getMoreOrder(date);
      }
      window.onscroll = () => {
        if (((this.$refs.scrollUpdate.clientHeight - window.scrollY) <= 1000)) {
          this.getMoreOrder(date);
        }
      };
    },
    getMoreOrder(date) {
      /* eslint-disable no-return-assign */
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
      /* eslint-enable no-return-assign */
    },
    checkMoreOrderResponse(response) {
      switch (response.data.status) {
        case 'success':
          if ((response.data.data[response.data.data.length - 1].ofCreateDate === this.lastDate) && (this.keyOrder.length === 0)) {
            this.textForUser1 = 'По вашим ключевым словам и настройкам';
            this.textForUser2 = 'Не найдено ни одной заявки';
            this.loadType = 'text';
          }
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
            this.$router.push('auth'),
          );
          break;
        default:
          logger.log(response);
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
        this.getKeyWord();
        this.getData();
      }
    },
  },
  created() {
    this.$store.commit('setTitle', 'Исполнитель');
    this.$store.dispatch('setChipStatus', 'keyword');
    if (this.token) {
      this.getKeyWord();
      this.getData();
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
    height 100%
    padding-bottom: 75px
  }
  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }
  .v-list-item:last-child {
    border-bottom none
  }
</style>
