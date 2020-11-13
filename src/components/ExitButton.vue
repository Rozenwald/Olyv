<template lang="pug">
  v-btn.exit-btn(block :loading='loading' @click='exit')
    v-icon(dense color="red") exit_to_app
    span.text Выход
</template>

<script>
import axios from 'axios';
import nativeStorage from '../scripts/nativeStorage';

export default {
  name: 'exit-button',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    exit() {
      this.loading = true;
      // ! Есть ли step в получении токенов
      this.receiveAppTokens();
    },

    receiveAppTokens() {
      axios
        .post(`${this.$baseNotificationUrl}api/v1/private/tokenApp`, {
          token: this.notificationToken,
          method: 'receive',
          submethod: 'tokenApp',
        })
        .then((response) => this.checkResponse(response))
        .catch((error) => {
          console.log(error);
        });
    },

    checkResponse(response) {
      console.log(response);
      let id;
      switch (response.data.status) {
        case 'success':
          id = this.getTokenId(response.data.data);
          this.removeTokenApp(id);
          break;
        case 'notExist':
          nativeStorage.clear();
          this.$store.dispatch('clear');
          this.loading = false;
          this.$router.replace('auth');
          break;
        default:
          this.error = response.data.status;
          break;
      }
    },

    getTokenId(data) {
      if (!this.appToken) {
        console.log('Ошибка с получением токена приложения');
        return null;
      }

      for (let i = 0; i < data.length; i += 1) {
        if (data[i].tokenApp === this.appToken) {
          // eslint-disable-next-line no-underscore-dangle
          return data[i]._id;
        }
      }

      return null;
    },

    removeTokenApp(idTokenApp) {
      axios
        .post(`${this.$baseNotificationUrl}api/v1/private/tokenApp`, {
          token: this.notificationToken,
          method: 'del',
          idTokenApp,
        })
        .then((response) => this.checkRemoveResponse(response))
        .catch((error) => {
          console.log(error);
        });
    },

    checkRemoveResponse(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          nativeStorage.clear();
          this.$store.dispatch('clear');
          this.loading = false;
          this.$router.replace('auth');
          break;
        case 'notExist':
          nativeStorage.clear();
          this.$store.dispatch('clear');
          this.loading = false;
          this.$router.replace('auth');
          break;
        default:
          this.error = response.data.status;
          break;
      }
    },
  },
  computed: {
    notificationToken() {
      return this.$store.getters.getNotificationToken;
    },
    appToken() {
      return this.$store.getters.getAppToken || 'dL-oYZj7TfKt-pR5orsM2k:APA91bEasIddFlq0G3PQwuY8XYRcY4qq7yRmgxBKS2KbWT50Cdkbzbn9iIJGJzs2eEYBoizDA0thIssfq54Mx95KNY9dNslNpOAZA8S03xHzhYh91vefBEYu_J_2oPaBVPqy6ev3efIl';
    },
  },
};
</script>

<style lang="stylus" scoped>
  .exit-btn {
    background-color #FFFFFF !important
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    text-transform none
  }

  .text{
    color red
    margin-left 5px
  }
</style>
