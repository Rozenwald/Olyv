<template lang="pug">
  .orderContainer
    OrderCard2(
              v-for='item in keyOrder'
              type='keyword'
              :key='item._id'
              :item='item'
              )

</template>

<script>
import axios from 'axios';
import OrderCard2 from '../OrderCard2.vue';

export default {
  name: 'allOrder',
  data: () => ({
    keyword: '',
    textForRegexp: '',
    keyRegexp: null,
    awaitMyRegexp: null,
    all: [],
    keyOrder: [],
    date: null,
    error: '',
    type: 'keyword',
  }),
  components: {
    OrderCard2,
    axios,
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
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    // Формирование массива всех заказов
    checkResponse(response) {
      console.log(response.data);
      switch (response.data.status) {
        case 'success':
          this.all = response.data.data;
          this.getAwaitOrder();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
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
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkAwaitOrder(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          response.data.data.forEach((element) => {
            // eslint-disable-next-line no-underscore-dangle
            this.textForRegexp = `${this.textForRegexp + element.idOrder}|`;
          });
          this.getMyOrder();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'notExist':
          this.getMyOrder();
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    getMyOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'customer',
          status: 'await',
        })
        .then((response) => (this.checkMyOrderResponse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
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
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'notExist':
          this.getClearAll();
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    getClearAll() {
      console.log(this.textForRegexp);
      console.log(this.keyRegexp);
      console.log(this.keyword);
      /* eslint-disable max-len */
      if (this.textForRegexp !== '') {
        this.textForRegexp = this.textForRegexp.substring(0, this.textForRegexp.length - 1);
        this.awaitMyRegexp = new RegExp(`${this.textForRegexp}`);
        for (let j = 0; j < this.all.length; j += 1) {
          // eslint-disable-next-line no-underscore-dangle
          if ((this.awaitMyRegexp.test(this.all[j]._id) !== true) && (this.keyRegexp.test(this.all[j].description))) {
            this.allClear.push(this.all[j]);
          }
        }
      } else {
        for (let j = 0; j < this.all.length; j += 1) {
          if (this.keyRegexp.test(this.all[j].description)) {
            this.allClear.push(this.all[j]);
          }
        }
      }
      /* eslint-disable max-len */
    },
    // Получение ключевых слов
    getKeyWord() {
      axios
        .post(`${this.$baseUrl}api/v1/private/keyword`, {
          token: this.token,
          method: 'receive',
          date: this.date,
        })
        .then((response) => (this.checkKeyWord(response)))
      // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },
    // формирование текста для регулярки и формирование регулярки
    checkKeyWord(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.date = new Date(response.data.data[response.data.data.length - 1].createDate);
          this.date = this.date.getTime();
          response.data.data.forEach((element) => {
            this.keyword = `${this.keyword + element.text}|`;
          });
          this.getKeyWord();
          break;
        case 'notExist':
          this.keyword = this.keyword.substring(0, this.keyword.length - 1);
          console.log(this.keyword);
          console.log(new RegExp(`${this.keyword}`, 'im'));
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
  created() {
    this.$store.commit('setTitle', 'Исполнитель');
    this.getKeyWord();
    this.getData();
  },
};
</script>

<style lang="stylus" scoped>
  .orderContainer{
    padding 0
  }
  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }
  .v-list-item:last-child {
    border-bottom none
  }
</style>
