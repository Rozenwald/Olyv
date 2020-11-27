<template lang="pug">
  v-container
    v-combobox(v-model="chips"
              chips
              multiple
              outlined
              readonly
              rounded)
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
          placeholder='Ключевое слово и фраза'
          rows="1"
          auto-grow)
        template(slot="append")
          .text-input-icon(@click="checkNullKeyword")
            svg-icon(name="SendMsg")
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';
import dialogMessages from '../scripts/dialogMessages';

export default {
  name: 'keyWords',
  data() {
    return {
      chips: [],
      keywords: [],
      keyword: null,
      date: null,
      id: null,
      errorBody: '',
    };
  },
  components: {
    SvgIcon,
    axios,
  },
  methods: {
    getKeyWord() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/keyword`, {
          token: this.token,
          method: 'receive',
          date: this.date,
        })
        .then((response) => (this.checkKeyWord(response)))
        .catch((error) => {
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(error);
        });
      /* eslint-enable no-return-assign */
    },
    checkKeyWord(response) {
      switch (response.data.status) {
        case 'success':
          this.date = new Date(response.data.data[response.data.data.length - 1].createDate);
          this.date = this.date.getTime();
          response.data.data.forEach((element) => {
            this.chips.push(`${element.text}`);
            this.keywords.push(element);
          });
          this.getKeyWord();
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push('auth'),
          );
          break;
        default:
          logger.log(response);
          break;
      }
    },
    checkNullKeyword() {
      if (this.keyword == null) {
        return undefined;
      }
      this.keyword = this.keyword.trim();
      if (this.keyword.length !== 0) {
        this.sendKeyWord();
      }
      return undefined;
    },
    sendKeyWord() {
      const word = this.keyword;
      this.keyword = null;
      axios
        .post(`${this.$baseUrl}api/v1/private/keyword`, {
          token: this.token,
          method: 'add',
          text: word,
        })
        .then((response) => (this.checkSendKeyWord(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => {
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('addKeyWordError'),
            true,
            false,
          );
        });
    },
    checkSendKeyWord(response) {
      switch (response.data.status) {
        case 'success':
          this.chips.unshift(response.data.data.text);
          this.keywords.unshift(response.data.data);
          break;
        case 'notExist':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('addKeyWordError'),
            true,
            false,
          );
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push('auth'),
          );
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('addKeyWordError'),
            true,
            false,
          );
          break;
      }
    },
    remove(item) {
      /* eslint-disable no-underscore-dangle */
      const id = this.keywords[this.chips.indexOf(item)]._id;

      if (id !== undefined) {
        /* eslint-disable no-return-assign */
        axios
          .post(`${this.$baseUrl}api/v1/private/keyword`, {
            token: this.token,
            method: 'del',
            id,
          })
          .then((response) => (this.checkRemove(response, item)))
          .catch((error) => {
            dialog.open(
              dialogMessages.getTitle('error'),
              dialogMessages.getBody('removeKeyWordError'),
              true,
              false,
            );
            logger.log(error);
          });
        /* eslint-enable no-return-assign */
      } else {
        this.chips.splice(this.chips.indexOf(item), 1);
        this.chips = [...this.chips];
      }
    },
    checkRemove(response, item) {
      switch (response.data.status) {
        case 'success':
          this.keywords.splice(this.chips.indexOf(item), 1);
          this.chips.splice(this.chips.indexOf(item), 1);
          this.chips = [...this.chips];
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push('auth'),
          );
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('removeKeyWordError'),
            true,
            false,
          );
      }
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
    this.$store.commit('setTitle', 'Ключевые слова');
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
  .chipKeyWord {
    background-color #56d68b
    color #56d68b !important
  }
  .v-input__slot{
    padding-right 0 !important
  }
</style>
