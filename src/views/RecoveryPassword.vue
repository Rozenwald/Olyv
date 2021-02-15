<template lang="pug">
  .auth-container

    v-row.logo(align='center' justify='center')
      img.logo-icon(src="../assets/nedomain-logo.png", alt="Логотип")

    v-row.text-field(align='center' justify='center')
      .text-field-center
        v-text-field.text-field-center-input(
          v-model="email"
          solo hide-details
          label='E-mail'
          type='email'
          required)

    v-row.button(align='center' justify='center')
      .button-center
        v-btn.button-center-registration(
          @click="checkForm()"
          :loading='loading'
          :disabled='loading') Продолжить

        v-btn.button-center-go-to-auth(
          @click="stepback()"
          v-show="!isFocus") Назад
</template>
<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';
// eslint-disable-next-line import/no-cycle
import dialog from '../scripts/openDialog';
import logger from '../scripts/logger';
import nativeStorage from '../scripts/nativeStorage';
import dialogMessages from '../scripts/dialogMessages';

export default {
  name: 'RecoveryPassword',
  components: {
    axios,
    SvgIcon,
    nativeStorage,
  },
  data() {
    return {
      showPassword: false,
      email: null,
      emailHash: {},
      password: null,
      isFocus: false,
      windowHeight: null,
      isAddAppToken: false,
      loading: false,
    };
  },
  methods: {
    route(routeName) {
      this.$router.push(routeName);
      this.password.blur();
    },

    stepback() {
      this.$router.back();
    },

    checkForm(e) {
      this.loading = true;
      if (!this.validEmail(this.email)) {
        dialog.open(
          dialogMessages.getTitle('error'),
          dialogMessages.getBody('invalidEmail'),
          true,
          false,
        );
      } else {
        this.recoveryPassword();
      }
      e.preventDefault();
      this.loading = false;
      return null;
    },

    validEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    recoveryPassword() {
      axios
        .post(`${this.$baseUrl}api/v1/public/recovery`, {
          method: 'password',
          submethod: 'request',
          email: this.email,
        })
        .then((response) => (this.checkRecoveryPassword(response)))
        .catch((error) => {
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('standartError'),
            true,
            false,
          );
          logger.log(error);
        });
    },
    checkRecoveryPassword(response) {
      switch (response.data.status) {
        case 'success':
          this.emailHash[response.data.data] = this.email;
          nativeStorage.setItem('emailHash', this.emailHash);
          this.stepback();
          break;
        case 'notSuccess':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notSuccess'),
            true,
            false,
          );
          break;
        case 'invalidEmail':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('invalidEmail'),
            true,
            false,
          );
          break;
        default:
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('error'),
            true,
            false,
          );
          logger.log(response);
          break;
      }
      this.loading = false;
    },
  },
  created() {
    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      if (window.innerHeight < this.windowHeight) {
        this.isFocus = true;
      } else {
        this.isFocus = false;
      }
    });
  },
  mounted() {
    this.$store.dispatch('showAppbar', false);
    this.$store.dispatch('showBottomNavigation', false);
  },
  beforeDestroy() {
    this.$store.dispatch('showAppbar', true);
    this.$store.dispatch('showBottomNavigation', true);
  },
};
</script>
<style lang="stylus" scoped>
  .recovery-password {
    margin 5px
  }
  .auth-container {
    width 100%
    height 100%
    padding 0
    text-align: center;
    vertical-align middle
  }
  .logo {
    position relative
    height: 33vh;
    width: 100%;
    margin-bottom 0
    margin-right 0
    margin-left 0
    margin-top 0
    text-align: center;
      &-icon {
        position relative
        vertical-align middle
        width:auto;
        height:100%;
      }
  }
  .text-field {
    width 100%;
    height 33vh;
    margin 0;
      &-center {
        width 100%;
        padding-right 10px;
        padding-left 10px;
          &-input {
            padding-right 10px;
            padding-left 10px;
            margin-top 10px
          }
          &-rules-text {
            margin-top 20px
            font-size 13px
            word-break: normal
          }
          &-rules-button {
            font-size 13px
            margin-top 5px
            text-decoration:underline
            word-break: normal
          }
      }
  }
  .button {
    width 100% !important
    height 34vh;
    margin 0;
    &-center {
      width 100% !important;
        &-registration {
          height 56px !important
          color #56D68B
          font-size: 13px
          background: transparent
          border 1px solid #56D68B
          border-radius 30px
          width 72% !important
        }
        &-go-to-auth {
          height 56px !important
          margin-top 10px
          color #FFA967
          font-size: 13px
          background: transparent
          border 1px solid #FFA967
          border-radius 30px
          width 72%
        }
    }
    &-icon {
      width 100%

      &-svg-icon{
        width 41px
        height 41px
        margin 5px
      }
    }
  }
</style>
