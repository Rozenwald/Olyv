<template lang="pug">
  v-container
    user-profile-header
    verification-status
    review
    v-btn.exit-btn(block :loading='loading' @click='exit')
      v-icon(dense color="red") exit_to_app
      span.text Выход
</template>

<script>
import axios from 'axios';
import store from '../store';
import auth from '../scripts/auth';
import Review from '../components/customerProfile/Review.vue';
import UserProfileHeader from '../components/customerProfile/UserProfileHeader.vue';
import VerificationStatus from '../components/customerProfile/VerificationStatus.vue';
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';
import dialogMessages from '../scripts/dialogMessages';
// eslint-disable-next-line import/no-cycle
import router from '../router';

export default {
  name: 'CustomerProfile',
  components: {
    UserProfileHeader,
    VerificationStatus,
    Review,
    store,
    axios,
  },
  data() {
    return {
      errorBody: '',
      loading: false,
    };
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
    getData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/passport`, {
          method: 'receive',
          submethod: 'comment',
          token: this.token,
        })
        .then((response) => (this.checkResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => {
          logger.log(error);
        });
    },
    checkResponse(response) {
      logger.log(response);
      switch (response.data.status) {
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            this.$router.push('auth'),
          );
          break;
        case 'success':
          this.$store.dispatch('setComment', response.data.data.comment);
          break;
        default:
          break;
      }
    },
    exit() {
      this.loading = true;
      auth.exit();
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
  watch: {
    token() {
      if (!this.token) {
        this.loading = false;
        this.$router.replace('auth');
      }
    },
  },
  created() {
    this.$store.commit('setTitle', 'Личный кабинет');
    if (this.user.verification === 'notCompleted') {
      this.getData();
    }
    this.getData();
  },
  beforeRouteEnter(to, from, next) {
    if (!store.getters.isAuth) {
      next(from.name);
      dialog.open(
        dialogMessages.getTitle('error'),
        dialogMessages.getBody('notAuthentucate'),
        true,
        true,
        router.push('auth'),
      );
    } else {
      next();
    }
  },
};
</script>

<style lang="stylus" scoped>

  .v-divider{
    margin 12px -12px
    max-width none
  }

  #btn-verification{
    background none
    font-style normal
    font-weight 600
    font-size 13px
    color #56D68B
    width 240px
    margin-top 88px
    border 1px solid #56D68B
    border-radius 100px
    box-shadow none
  }

  .exit-btn {
    background-color #FFFFFF !important
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    text-transform none
    margin-top 10px
    margin-bottom 10px
  }

  .text{
    color red
    margin-left 5px
  }
</style>
