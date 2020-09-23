<template lang="pug">
  v-container
    v-textarea.keyword-input(
      v-model="keyWord"
      solo
      rows="3"
      placeholder="Ключевые слова"
      hide-details)

    v-row.btn-wrapper(align='center' justify='center')
        v-btn.btn-save(rounded @click="addKeyWord") Сохранить
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'keyWord',
  components: {
    SvgIcon,
    axios,
  },
  data() {
    return {
      keyWord: null,
    };
  },
  methods: {
    addKeyWord() {
      axios
        .post(`${this.$baseUrl}api/v1/private/keyword`, {
          method: 'add',
          text: this.keyWord,
          submethod: 'id',
          id: this.idUserRequest,
        })
        .then((response) => (this.checkUserData(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },
  },

  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },

  mounted() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', true);
  },
  beforeDestroy() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', true);
  },
  created() {
  },
};
</script>

<style lang="stylus" scoped>
  .keyword-input{
    margin-bottom 10px
    margin-top 10px
  }
  .btn-save{
    margin-top 10px
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 240px
    box-shadow none
  }

</style>
