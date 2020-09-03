<template lang="pug">
  v-container.container
    MessageCard(v-for='newMessage in messages'
                :message= 'newMessage' )

    v-row.container-message(align='center' justify='space-between')
      v-text-field.send-message.ma-0(solo
                                    flat
                                    hide-details
                                    label='Сообщение'
                                    v-model="newMessage"
                                    required
                                    background-color="light-blue"
                                    append-icon="$vuetify.icons.sendMsg"
                                    @click:append="sendMessage"
                                    )
    v-dialog()
      v-row(align='center' justify='center')
        .dialog_title {{error}}
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
      messages: [],
      error: '',
    };
  },
  methods: {

    sendMessage() {
      axios
        .post(`${this.baseChatUrl}api/v1/private/message`, {
          token: this.chatToken(),
          method: 'add',
          text: 'витя умер от голода',
          idUserRequest: 'витя умер от голода',
        })
        .then((response) => (this.checkAddMessage(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'ошибка, Витя выжил'));
    },
    getMessage() {
      axios
        .post(`${this.baseChatUrl}api/v1/private/message`, {
          token: this.chatToken(),
          method: 'add',
          submethod: 'chat',
          idUserRequest: 'витя умер от голода',
          step: 0,
          status: 'completed',
        })
        .then((response) => (this.checkGetMessage(response)))
      // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'ошибка, Витя выжил'));
    },

    handler() {
      axios
        .get(this.url)
        .then((response) => (this.handlerCheck(response)))
        .catch((error) => (this.errorCheck(error)));
    },
    handlerCheck(response) {
      console.log(response.data);
      this.handler(this.url);
    },
    errorCheck(error) {
      console.log(error);
      this.handler(this.url);
    },
  },

  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    idChanal() {
      return this.$store.getters.getIdChanal;
    },
    chatToken() {
      return this.$store.getters.getChatToken;
    },
    url() {
      return `${this.$baseChatUrl}api/v1/private/chat/e2e${this.idChanal}/?token=${this.chatToken}`;
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
    this.handler();
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
