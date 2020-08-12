<template lang="pug">
  v-menu(
      v-model="menu"
      :close-on-content-click="true"
      :nudge-width="200"
      rounded)
    template(v-slot:activator="{ on, attrs }")
      v-btn.btn(v-bind="attrs" v-on="on" rounded)
        v-img(src="../assets/i.png" height='30' width='2')
    .menu-wrp
      v-row.notification-wrp(align='center' justify='center' ref="wrp")
        span Нет уведомлений
      v-divider
      v-skeleton-loader.skeleton(type="button" :loading="!verificationStatus")
        .btn-wrp
          v-btn.go-edit-data(
            text
            v-text="'Редактировать данные'"
            v-show="this.user.name == null"
            @click='route("setUserData")')
          v-btn.go-verification(
            text
            v-text="'Стать исполнителем'"
            v-show="verificationStatus=='notCompleted' && user.name != null"
            @click='route("verification")'
          )
          v-btn.go-verification-await(
            text
            v-text="'Ожидание верификации'"
            v-show="verificationStatus=='await' && user.name != null"
            @click='route("verification")'
          )
</template>

<script>
import axios from 'axios';

export default {
  name: 'popup-menu-profile',
  components: {
    axios,
  },
  data() {
    return {
      menu: false,
      verificationStatus: null,
      error: '',
      wrpWidth: null,
    };
  },
  methods: {
    checkVerification() {
      axios
        .post(`${this.$baseUrl}api/v1/private/passport`, {
          method: 'receive',
          submethod: 'verification',
          token: this.token,
        })
        .then((response) => (this.checkStatusResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },

    checkStatusResponse(response) {
      if (response.data.status === 'success') {
        this.verificationStatus = response.data.data.verification;
      } else {
        this.error = 'Ошибка';
      }
    },

    route(routeName) {
      this.$router.push(routeName);
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  created() {
    this.checkVerification();
  },
};
</script>

<style lang="stylus" scoped>
  .btn {
    width 30px !important
    height 30px !important
    min-width 0 !important
    padding 0 !important
    position absolute
    top 12px
    right 12px
  }

  .menu-wrp {
    background-color #FFFFFF
  }

  .notification-wrp {
    height 200px
  }

  .btn-wrp {
    text-align center
  }

  .go-verification {
    padding 0
    color #56D68B
  }

  .go-edit-data {
    padding 0
  }

  .go-verification-await {
    padding 0
    color #FFFF00
  }

  .v-skeleton-loader {
    border-radius 0
  }
  .v-skeleton-loader {
    height 36px
    border-radius 0
    margin-bottom 0
  }
</style>

<style lang="stylus">
  .v-skeleton-loader__button {
    border-radius 0 !important
    width inherit !important
  }
</style>
