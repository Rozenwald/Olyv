<template lang="pug">
    v-card.card(@click='this.route')
      v-row.main-part(no-gutters)
          v-col(cols="8").description-wrp
            .description {{item.description}}
          v-col(cols="4" align='right')
            v-row.cost-wrp(align='center' justify='center')
              .cost {{cost}}
              svg-icon(name="RubDefault" color="#FE7664" height="15" width="15")
      v-row.more-info-wrp(align='center' justify='start' no-gutters)
        v-row.response-wrp(align='center' justify='start')
          svg-icon(name="Responded")
          .response-text {{userCount}} ответов
        v-row.date-time-wrp(align='center' justify='start')
          svg-icon(name="Time")
          .distantion-text {{formatedTime}}
</template>

<script>
import moment from 'moment';
import SvgIcon from '../components/SvgIcon.vue';
import dialog from '../scripts/openDialog';
import dialogMessages from '../scripts/dialogMessages';

export default {
  name: 'OrderCard2',
  components: {
    SvgIcon,
  },
  props: {
    type: String,
    item: Object,
  },
  methods: {
    route() {
      // eslint-disable-next-line no-underscore-dangle
      if (this.isAuth === true) {
        this.$store.dispatch('setMyOrder', this.item);
        this.$store.dispatch('setType', this.type);
        this.$router.push({ name: 'executorMoreInfo' });
      } else {
        dialog.open(
          dialogMessages.getTitle('needToAuth'),
          dialogMessages.getBody('needToAuth'),
          true,
          true,
          () => { this.$router.push({ name: 'auth' }); },
        );
      }
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    userCount() {
      return this.item.countResponse;
    },
    lowcost() {
      return this.item.lowcost;
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
  },
};
</script>

<style lang="stylus" scoped>
  .card {
    margin-top 10px
    padding 10px 0 10px 10px
    border 0
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
    border-radius  10px 0px 0px 10px
  }

  .cost {
    font-style normal
    font-weight bold
    font-size 18px
    color #FE7664
    margin-right 5px
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
