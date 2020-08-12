<template lang="pug">
  v-container
    .customer-more-info
      v-row.customer-more-info-header(align='center' justify='space-between')
        .name asgasdfgasg
        v-rating(
          :length="5"
          :half-increments="true"
          :dense="true"
          :color="starColor"
          :background-color="starColor"
          size="14"
          )
      .parallax(
        height="150"
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      )
      .information-wrp
        v-row.more-info-wrp-first(align='center' justify='space-between')
          v-row.save-deal(align='center')
            svg-icon(name="SaveDeal")
            span Защищенная сделка
          v-row.cost-wrp(align='center' justify='center')
            .cost 5000
        v-row.more-info-wrp-second(align='center' justify='start')
          v-row.responded(align='center')
            svg-icon(name="Responded")
            .responded-text
              span Откликнулось <br/>
              span.black-text {{respondedCount}} человек
          v-row.distantion(align='center')
            svg-icon(name="Distantion")
            .distantion-text
              span Расстояние <br/>
              span.black-text {{distantion}} км
        .description {{description}}
        .media-files
          v-row
            v-col.d-flex.child-flex.custom-card-wrp(v-for='n in 5', :key='n', cols='4')
              v-card.d-flex.custom-card(flat, tail)
                v-img.grey.lighten-2(:src='`https://picsum.photos/500/300?image=${n * 5 + 10}`', :lazy-src='`https://picsum.photos/10/6?image=${n * 5 + 10}`', aspect-ratio='1')
                  template(v-slot:placeholder)
                    v-row.fill-height.ma-0(align='center', justify='center')
                      v-progress-circular(indeterminate, color='grey lighten-5')
        v-row.edit-price(align='center' justify='center')
          v-btn.minus-btn(@click='setPrice(-1 * changeValue)') -
          input.currentPrice(
                              v-model="currentPrice"
                              type="text"
                              :style="{width: inputWidth + 'px'}"
                              size="10"
                              maxlength="10"
                            )
          v-btn.plus-btn(@click='setPrice(changeValue)') +
        v-row.btns(no-gutters  align='center')
          v-col( v-for="n in 2" :key="n" align='center')
            v-btn.accept-btn(rounded v-if="n == 1") Согласиться
            v-btn.chat-btn(rounded v-else @click="route('chat')") Чат
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
import store from '../store';

export default {
  name: 'moreInfoOrder',
  components: {
    SvgIcon,
    axios,
    store,
  },
  data() {
    return {
      currentPrice: 5000, // Number
      respondedCount: 12,
      distantion: 3,
      inputWidth: null,
      description: 'Lorem Ipsum - це текст-"риба", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. "Риба" не тільки успішно пережила пять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам компютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum',
    };
  },
  methods: {
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
    setPrice(val) {
      if (Number.parseInt(this.currentPrice, 10) + val > 0) {
        this.currentPrice = Number.parseInt(this.currentPrice, 10) + val;
      }
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
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    order() {
      return this.$store.getters.getMyOrder;
    },
    isSaveDeal() {
      if (this.order.protect === 'no') {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="stylus" scoped>

  .container {
    background-color #fff
  }

  .name {
    font-style normal
    font-weight 500
    font-size 15px
    line-height 18px
    color #000000
  }

  .customer-more-info-header{
    padding 0 !important
  }

  .customer-more-info{
    margin-bottom 56px
  }

  .parallax {
    margin 15px -12px
    height 150px
    background-color red
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

  .more-info-wrp-second {
    margin 15px 0
    text-align center
    font-style normal
    font-size 10px
    line-height 1.4
    color #65686C
  }

  .more-info-wrp-second div {
    max-width 95px
  }

  .more-info-wrp-second .black-text {
    color: #000000
  }

  .responded {
    margin-right 15px
  }

  .responded-text, .distantion-text {
    margin-left 5px
  }

  .description {
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

  .accept-btn{
    width 90%
    margin-right 5%
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    box-shadow none !important
  }

  .chat-btn{
    width 90%
    background none !important
    font-style normal
    font-weight 600
    font-size 13px
    color #56D68B
    border 1px solid #56D68B
    box-shadow none !important
  }
</style>
