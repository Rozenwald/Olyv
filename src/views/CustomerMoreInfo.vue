<template lang="pug">
  v-container
    .executor-more-info
      .information-wrp
        v-row.more-info-wrp-first(align='center' justify='space-between')
          v-row.save-deal(align='center')
            svg-icon(name="SaveDeal" v-show="isSaveDeal")
            span(v-show="isSaveDeal") Защищенная сделка
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
          v-col( v-for="n in 2" :key="n" align='center')
<<<<<<< HEAD
            v-btn.edit-btn(rounded v-if="n == 1" @click="editOrder") Редактировать
            v-btn.delete-btn(rounded v-else @click="delOrder") Удалить
        #responded-title Отозвались
        MoreInfoUserCard(
              v-for='item in items'
              :key='item.id'
              :id='item.title'
              :title='item.title'
              :cost='item.cost')
=======
            v-btn.accept-btn(rounded v-if="n == 1") Согласиться
            v-btn.chat-btn(rounded v-else @click="route('chat')") Чат
>>>>>>> refs/remotes/origin/master
</template>

<script>
import axios from 'axios';
import store from '../store';
import SvgIcon from '../components/SvgIcon.vue';
import MoreInfoUserCard from './MoreInfoUserCard.vue';

export default {
  name: 'CustomerMoreInfoIspoln',
  components: {
    SvgIcon,
    MoreInfoUserCard,
    axios,
    store,
  },
  data() {
    return {
      order: [],
      currentPrice: 5000, // Number
      respondedCount: 12,
      distantion: 3,
      description: 'Lorem Ipsum - це текст-"риба", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. "Риба" не тільки успішно пережила пять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам компютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum',
      items: [
        { title: 'Уведомления', cost: '10 909р', id: 1 },
        { title: 'Черныйсписок', cost: '10 909р', id: 2 },
        { title: 'Редактирваниепрофиля', cost: '10 909р', id: 3 },
        { title: 'Связьсразработчиком', cost: '10 909р', id: 4 },
        { title: 'Информация', cost: '10 909р', id: 5 },
      ],
    };
  },
  methods: {
<<<<<<< HEAD
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
      this.$router.push({ name: 'create', params: { order: this.order } });
=======
    route(routeName) {
      this.$router.push(routeName);
    },
    setPrice(val) {
      if (Number.parseInt(this.currentPrice, 10) + val > 0) {
        this.currentPrice = Number.parseInt(this.currentPrice, 10) + val;
      }
>>>>>>> refs/remotes/origin/master
    },

    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          if (response.data.data !== null) {
            // eslint-disable-next-line prefer-destructuring
            this.order = response.data.data[0];
          } else {
            this.$router.back();
          }
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
    isSaveDeal() {
      if (this.order.protect === 'no') {
        return false;
      }
      return true;
    },
  },
  beforeRouteEnter(to, from, next) {
    function getData(id, token) {
      /* eslint-disable no-return-assign */
      return axios
        .post(`${window.$baseUrl}api/v1/private/order`, {
          token,
          method: 'receive',
          submethod: 'my',
          step: 0,
          id,
        });
      /* eslint-enable no-return-assign */
    }

    getData(store.getters.getMyOrderId, store.getters.getToken).then((response) => {
      next((vm) => vm.checkResponse(response));
    });
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

  #responded-title{
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
</style>
