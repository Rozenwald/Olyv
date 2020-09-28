<template lang="pug">
    v-container
      v-row.chips(v-show="user.verification == 'completed'"
                  align='center'
                  justify='space-around')

        v-chip-group(v-model="type" mandatory active-class="active-chip")

          v-chip.keyword-chip(value="keyword")
            svg-icon(name='KeyWord' width='30' height='30' color='#000')

          v-chip(value="free"
                outlined
                color="#56d67b"
                text-color="#000") Все заказы
          v-chip(value="await"
                outlined
                color="#56d67b"
                text-color="#000") В ожидании
          v-chip(value="process"
                outlined
                color="#56d67b"
                text-color="#000") В процессе
      .free-list(v-show="type=='keyword'")
        OrderCard2(
                  v-for='item in keyOrder'
                  type='keyword'
                  :key='item._id'
                  :item='item'
                  )
      .free-list(v-show="type=='free'")
        OrderCard2(
                  v-for='item in all'
                  type='free'
                  :key='item._id'
                  :item='item'
                  )
      .await-list(v-show="type=='await'")
        OrderCard2(
                  v-for='item in myOrders'
                  type='await'
                  :key='item._id'
                  :item='item'
                  )
      .process-list(v-show="type=='process'")
        OrderCard2(
                  v-for='item in processOrders'
                  type='process'
                  :key='item._id'
                  :item='item'
                  )
</template>

<script>
import axios from 'axios';
import OrderCard2 from './OrderCard2.vue';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'spisokZakazov',
  data: () => ({
    keyword: '',
    text: [],
    keyOrder: [],
    all: null,
    myOrders: [],
    processOrders: null,
    error: '',
    type: 'free',
    step: 0,
  }),
  components: {
    OrderCard2,
    axios,
    SvgIcon,
  },
  methods: {

    getKeyWord() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/keyword`, {
          token: this.token,
          method: 'receive',
          step: this.step,
        })
        .then((response) => (this.checkKeyWord(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },

    checkKeyWord(response) {
      console.log(response);
      console.log(response.data.data.length);
      switch (response.data.status) {
        case 'success':
          if (response.data.data.length <= 9) {
            response.data.data.forEach((element) => {
              this.keyword = `${this.keyword + element.text}|`;
              console.log(this.keyword);
            });
          } else {
            response.data.data.forEach((element) => {
              this.keyword = `${this.keyword + element.text}|`;
              console.log(this.keyword);
            });
            this.step += 1;
            console.log(this.step);
            this.getKeyWord();
          }
          break;
        case 'notExist':
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
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
        // this.keyOrder[j] = response.data.data[j].description.match(/"черти", "биба"/i);
        console.log(this.keyOrder[j]);
      }
      console.log(this.keyOrder);
    },

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

    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.all = response.data.data.reverse();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    getMyResponseOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/response`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'await',
        })
        .then((response) => (this.checkMyResponseOrder(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkMyResponseOrder(response) {
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
    getProcessOrders() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'receive',
          submethod: 'executor',
          status: 'process',
        })
        .then((response) => (this.checkProcessOrdersResponse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },

    checkProcessOrdersResponse(response) {
      switch (response.data.status) {
        case 'success':
          this.processOrders = response.data.data;
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
    user() {
      return this.$store.getters.getUser;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Список заказов');
    this.getData();
    this.getMyResponseOrder();
    this.getProcessOrders();
    this.getKeyWord();
    this.addKeyOrder();
  },
};
</script>

<style lang="stylus" scoped>
  .keyword-chip{
    padding 0
    height 30px !important
  }

  .await-list:first-child, .free-list:first-child, .free-process:first-child {
    margin-top 0
  }
  .setting{
    padding 0 15px
    background-color white
  }

  .right_arrow{
    width 8px !important
    height auto !important
  }

  .v-list-item{
    border-bottom 0.5px solid #65686C
    padding 0 !important
  }

  .v-list-item:last-child {
    border-bottom none
  }
  .chips {
   margin-bottom 12px
   background: #e3e3e3 50%
   padding-left 15px
   padding-right 15px
  }

  .active-chip {
    background-color #56d68b
    color #56d68b !important
  }
</style>
