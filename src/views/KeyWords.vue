<template lang="pug">
  v-container
    v-combobox(v-model="chips"
              chips
              clearable
              label="Ключевые слова или фразы"
              multiple
              solo)
      template(v-slot:selection="{ attrs, item }")
        v-chip(
          v-bind="attrs"
          close
          @click:close="remove(item)")
          strong {{ item }}&nbsp;

    .text-message-wrp(align='center')
      v-textarea.text-message.ma-0(
          v-model="keyword"
          solo
          flat
          hide-details
          placeholder='Сообщение'
          @click:append="addKeyWord"
          rows="1"
          auto-grow)
        template(slot="append")
          .text-input-icon(@click="addKeyWord")
            svg-icon(name="SendMsg")
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'keyWords',
  data() {
    return {
      chips: [],
      keyword: null,
      date: null,
    };
  },
  components: {
    SvgIcon,
    axios,
  },
  methods: {

    remove(item) {
      console.log(item);
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },

    getKeyWord() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/keyword`, {
          token: this.token,
          method: 'receive',
          date: this.date,
        })
        .then((response) => (this.checkKeyWord(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },
    checkKeyWord(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.date = new Date(response.data.data[response.data.data.length - 1].createDate);
          this.date = this.date.getTime();
          response.data.data.forEach((element) => {
            this.chips.push(`${element.text}`);
          });
          this.getKeyWord();
          break;
        case 'notExist':
          console.log(this.chips);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

    addKeyWord() {
      axios
        .post(`${this.$baseUrl}api/v1/private/keyword`, {
          token: this.token,
          method: 'add',
          text: this.keyword,
        })
        .then((response) => (this.checkAddKeyWord(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },
    checkAddKeyWord(response) {
      switch (response.data.status) {
        case 'success':
          this.chips.unshift(this.keyword);
          this.keyword = null;
          break;
        case 'notExist':
          console.log(this.chips);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

    tokenadd() {
      console.log(this.token);
    },
  },

  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },

  mounted() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', false);
  },
  beforeDestroy() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', true);
  },
  created() {
    this.getKeyWord();
  },
};
</script>

<style lang="stylus" scoped>
  .text-message-wrp {
    width 100%
    position: fixed;
    bottom 0;
    left 0;
  }
</style>
