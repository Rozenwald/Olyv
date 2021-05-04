<template lang="pug">
    v-card.card(@click='this.route')
      v-row.main-part(no-gutters)
        v-col(cols="8").description-wrp
          .description {{item.description}}

        v-col(cols="4" align='right')
            v-row.cost-wrp(align='center' justify='center')
              .cost {{cost}}
              svg-icon(name="RubDefault" color="#FE7664" height="10" width="10")
            v-row.lowcost-wrp(v-show='lowcost != null' align='center' justify='center')
              svg-icon(name="Lowcost" color="#FE7664" height="10" width="10")
              .lowcost {{lowcost}}
              svg-icon(name="RubDefault" color="#FE7664" height="10" width="10")

      v-row.more-info-wrp(align='center' justify='start' no-gutters)
        v-row.response-wrp(align='center' justify='start')
          svg-icon(name="Responded")
          .response-text {{userCount}} ответов

        v-row.date-time-wrp(align='center' justify='start')
          svg-icon(name="Time")
          .distantion-text {{formatedTime}}
        v-row.date-time-wrp(v-if='address' align='center' justify='start')
          v-icon(color='#33CD74') mdi-Place
          .distantion-text {{address}}
</template>

<script>
import moment from 'moment';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'OrderCard1',
  components: {
    SvgIcon,
  },
  props: {
    type: String,
    item: Object,
  },
  data() {
    return {
      text: 'Ошибка: текст не опознан',
    };
  },
  methods: {
    route() {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('setMyOrder', this.item);
      this.$store.dispatch('setType', this.type);
      this.$router.push({ name: 'customerMoreInfo' });
    },
  },
  computed: {
    userCount() {
      return this.item.countResponse;
    },
    lowcost() {
      const lowCostStr = String(this.item.lowCost);
      if (lowCostStr.length > 6) {
        return `${lowCostStr.substr(0, 1)}М`;
      }
      if (lowCostStr.length > 5) {
        return `${lowCostStr.substr(0, 3)}K`;
      }
      return `${this.item.lowCost}`;
    },
    token() {
      return this.$store.getters.getToken;
    },
    cost() {
      const costStr = String(this.item.cost);
      if (costStr.length > 6) {
        return `${costStr.substr(0, 1)}М`;
      }
      if (costStr.length > 5) {
        return `${costStr.substr(0, 3)}K`;
      }
      return `${this.item.cost}`;
    },
    time() {
      return moment(this.item.createDate);
    },
    formatedTime() {
      if (this.time.isAfter(moment().subtract(1, 'days'))) {
        return this.time.calendar();
      }
      return this.time.format('D MMMM, HH:mm');
    },
    address() {
      let nightCity = this.item.address;
      let index = nightCity.indexOf(',', 0);
      while (nightCity[0].toLowerCase() !== nightCity[0]) {
        index = nightCity.indexOf(',', 0);
        if (index !== -1) {
          nightCity = nightCity.slice(index + 2);
        } else {
          nightCity[0] = nightCity[0].toLowerCase();
        }
      }
      if (index === -1) {
        nightCity[0] = nightCity[0].toUpperCase();
      }
      index = nightCity.indexOf(',', 0);
      if (index !== -1) {
        nightCity = nightCity.slice(0, index);
      }
      return nightCity;
    },
  },
  created() {
    moment.locale('RU');
  },
};
</script>

<style lang="stylus" scoped>
  .card {
    padding 10px 0 10px 10px
    border 0
    margin-top 10px
  }

  .swiper:first-child {
    margin-top 0
  }

  .row{
    margin 0
  }

  .main-part{
    margin-bottom 10px
  }

  .description {
    overflow hidden
    text-overflow ellipsis
    line-height 1.2
    min-height 57.6px
    display -webkit-box
    -webkit-line-clamp 3
    -webkit-box-orient vertical
    margin-right 5px
  }

  .cost-wrp {
    margin 0
    height 36px
    max-width 100px
    background #FEF5EE
    border-radius 10px 0px 0px 10px
  }
  .lowcost-wrp {
    margin 0
    height 36px
    max-width 100px
    border-radius 10px 0px 0px 10px
  }
  .cost {
    font-style normal
    font-weight bold
    font-size 18px
    color #FE7664
    margin-right 3px
    margin-left 5px
  }
  .lowcost {
    font-style normal
    font-weight bold
    font-size 16px
    color #FE7664
    margin-right 3px
    margin-left 5px
  }

  .more-info-wrp {
    text-align center
    font-style normal
    font-size 10px
    line-height 1.4
    color #65686C
  }

  .more-info-wrp svg {
    margin-right 5px
  }
</style>
