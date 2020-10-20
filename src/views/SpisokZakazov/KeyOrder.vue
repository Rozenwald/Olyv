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
    textForRegular: [],
    keyOrder: [],
    date: null,
    regexp: null,
    error: '',
    type: 'free',
  }),
  components: {
    OrderCard2,
    axios,
  },
  methods: {
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
      switch (response.data.status) {
        case 'success':
          response.data.data.forEach((element) => {
            this.getOrder(element);
          });
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'notExist':
          break;
        case 'invalidSubmethod':
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
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
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkOrder(response, element) {
      switch (response.data.status) {
        case 'success':
          this.myOrders.push(response.data.data[0]);
          // eslint-disable-next-line no-underscore-dangle
          this.myOrders[this.myOrders.length - 1].idResponse = element._id;
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        case 'notExist':
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
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
          this.regexp = new RegExp(`${this.keyword}`, 'im');
          console.log(this.regexp);
          this.addKeyOrder();
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    // Массив заказов из ключевых слов
    addKeyOrder() {
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
        })
        .then((response) => (this.checkKeyOrder(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },

    checkKeyOrder(response) {
      console.log(response);
      console.log(response.data.data.length);
      for (let j = 0; j < response.data.data.length; j += 1) {
        if (this.regexp.test(response.data.data[j].description)) {
          console.log(this.regexp.test(response.data.data[j].description));
          console.log(this.keyOrder.push(response.data.data[j]));
        }
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
    // this.getData();
    // this.getAwaitOrder();
    // this.getKeyWord();
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
