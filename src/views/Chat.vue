<template lang="pug">
  v-container.container
    MessageCard(v-for='newMessage in messages'
                :message= 'newMessage' )

    v-row.container-message(align='center' justify='space-between')
      v-text-field.send-message.ma-0(solo
                                    flat
                                    dense
                                    label='Сообщение'
                                    v-model="newMessage"
                                    required
                                    @keydown.enter="sendMessage"
                                    )
      v-row.iconContainer(align='center' justify='center')
        svg-icon.send-icon(name='SendMsg'
                          height='30'
                          width='30'
                          @click="sendMessage")

    v-dialog
      v-row(align='center' justify='center')
        .dialog_title
      v-btn(@click="error = ''") ок
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
import MessageCard from './MessageCard.vue';

export default {
  name: 'Chat',
  components: {
    SvgIcon,
    axios,
    MessageCard,
  },
  data() {
    return {
      newMessage: '',
      messages: [''],
    };
  },
  methods: {
    sendMessage() {
      this.messages.push(this.newMessage);
      // this.$store.dispatch(this.message, 'myMsg');
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
    this.$store.commit('setTitle', 'Чат');
  },
  createOrder() {
    /* eslint-disable no-return-assign */
    axios
      .post('http://test.cabinet.olyv.services:8888/api/v1/private/order', {
        token: this.token,
        method: 'add',
        message: this.message,
      })
      .then((response) => (this.checkResonse(response)))
      .catch(() => (this.error = 'Ошибка'));
    /* eslint-enable no-return-assign */
  },
  checkResonse(response) {
    switch (response.data.status) {
      case 'invalidCost':
        this.error = 'Неверный формат цены';
        break;
      case 'success':
        this.$router.back();
        break;
      default:
        this.error = 'Неизвестная ошибка';
    }
  },
};
</script>

<style lang="stylus" scoped>
  .v-input__control.v-text-field__details{
    display: none !important;
  }
  .iconContainer{
    width 10%
    height 38px
    background-color #FFF
  }
  .send-icon{
    background-color #FFF
  }
  .text-field-details{
    min-height 0px
    height 0px
  }
  .container-message{
    width 100%
    position: fixed;
    bottom 0;
    left 0;
  }
  .send-message{
  }
  .RegNumber{
    margin-top 10px
    padding-right 10px
    padding-left 10px
  }
  .container {
    width 100%
    height auto
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
  .row{
    margin 0
  }
</style>
