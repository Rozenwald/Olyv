<template lang="pug">
  v-container
    .customer-more-info
      v-row.customer-more-info-header(align='center' justify='space-between')
        .name Лавр гей
        v-rating(
          :length="5"
          :half-increments="true"
          :dense="true"
          :color="starColor"
          :background-color="starColor"
          size="14"
          )
      v-parallax.parallax(
        height="150"
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      )
      v-row.more-info-wrp-first(align='center' justify='space-between')
        v-row.save-deal(align='center')
          v-icon(v-text='icons.saveDealIcon')
          span Защищенная сделка
        v-row#cost-wrp(align='center' justify='center')
          .cost 4235
      v-row.more-info-wrp-second(align='center' justify='start')
        v-row.responded(align='center')
          v-icon(v-text='icons.responded')
          .responded-text
            span Откликнулось <br/>
            span.black-text {{respondedCount}} человек
        v-row.distantion(align='center')
          v-icon(v-text='icons.distantion')
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
      v-row.edit-price(align='center', justify='center')
        v-btn.minus-btn(@click='setPrice(-1 * changeValue)') -
        input.currentPrice(
                            v-model="currentPrice"
                            type="text"
                            :style="{width: inputWidth + 'px'}"
                            size="10"
                            maxlength="10"
                          )
        v-btn.plus-btn(@click='setPrice(changeValue)') +
      v-row.btns(align='center', justify='space-between')
        v-btn.accept-btn Согласиться
        v-btn.chat-btn Перейти в чат
</template>

<script>
export default {
  name: 'CustomerMoreInfo',
  data() {
    return {
      starColor: '#FFCA10',
      icons: {
        saveDealIcon: '$vuetify.icons.save_deal',
        responded: '$vuetify.icons.responded',
        distantion: '$vuetify.icons.distantion',
      },
      changeValue: 1000,
      currentPrice: 5000, // Number
      respondedCount: 12,
      distantion: 3,
      inputWidth: null,
      description: 'Lorem Ipsum - це текст-"риба", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. "Риба" не тільки успішно пережила пять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам компютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum',
    };
  },
  methods: {
    setPrice(val) {
      if (Number.parseInt(this.currentPrice, 10) + val > 0) {
        this.currentPrice = Number.parseInt(this.currentPrice, 10) + val;
      }
    },
    setInputWidth() {
      this.inputWidth = (this.currentPrice.toString().length + 1);
      if (this.currentPrice.toString().length > 2) {
        this.inputWidth *= 12;
      } else {
        this.inputWidth *= 16;
      }
    },
  },
  watch: {
    currentPrice() {
      this.setInputWidth();
      if (Number.parseInt(this.currentPrice, 10) === 0) {
        this.currentPrice = this.changeValue;
      }
    },
  },
  mounted() {
    this.setInputWidth();
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
  }

  .row{
    margin 0
  }

  #cost-wrp {
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
</style>
