<template lang="pug">
  v-sheet.information(elevation="1" rounded)

    v-row.information-header(align="center")

      v-col(cols="6")
        v-row(align="center" justify="center")
          svg-icon(name="Responded")
          span {{order.countResponse}} ответов

      v-col(cols="6")
        v-row(align="center" justify="center")
          svg-icon(name="Time")
          span {{formatedTime}}

    v-row.information-description {{order.description}}
</template>

<script>
import moment from 'moment';
import SvgIcon from '../SvgIcon.vue';

export default {
  name: 'order-information',
  components: {
    SvgIcon,
  },
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    time() {
      return moment(this.order.createDate);
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
  .information {
    .row {
      margin 0
    }

    &-header {
      padding 12px

      .col {
        padding 0
      }

      svg {
        margin-right 5px
      }

      span {
        font-style normal
        font-size 12px
        line-height 1.4
        color #65686c
      }
    }

    &-description {
      padding 0 12px 12px
    }
  }
</style>
