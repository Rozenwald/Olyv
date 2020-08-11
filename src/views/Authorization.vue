<template lang="pug">
        .container
            v-row#RegBigToolBar(align='center' justify='center')
              img#regLogo(src="../assets/icons/Plus.svg", alt="alt")

            v-text-field.RegNumber(
                v-model="email"
                label='E-mail'
                type='email'
                required)

            v-text-field.RegNumber(
                v-model="password"
                type='password'
                label='Пароль'
                required)

            v-btn#RegButton(v-on:click="checkForm") Войти
            v-btn#SmallAuthButton(
              @click="route('registration')"
              v-model="regButton")
              |Пройти регистрацию

            span#SpanRulesNM(v-show="!isFocus") Войти с помощью:

            .iconContainer(v-show="!isFocus")
              svg-icon.regIcon(name='VK'  width='37' height='37')
              svg-icon.regIcon(name='Google'  width='37' height='37')
              svg-icon.regIcon(name='Facebook'  width='37' height='37')
              //svg-icon.regIcon(name='Instagram'  width='37' height='37')

            #RegBottomBar(v-show="!isFocus")

            v-dialog(v-model="isError")
              v-row(align='center' justify='center')
                .dialog_title {{error}}
              v-btn(@click="error = ''") ок
</template>
<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'Authorization',
  components: {
    axios,
    SvgIcon,
  },
  data() {
    return {
      email: null,
      password: '',
      error: '',
      isFocus: false,
      windowHeight: null,
    };
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
  methods: {
    route(routeName) {
      this.$router.push(routeName);
      this.password.blur();
    },

    validEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    signIn() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/public/signin/email`, {
          username: this.email,
          password: this.password,
        })
        .then((response) => (this.checkSignIn(response)))
        .catch(() => (this.error = 'Ошибка Авторизации'));
      /* eslint-enable no-return-assign */
    },

    checkForm(e) {
      if (this.password.length < 6) {
        this.error = 'Пароль должен содержать больше 6 символов';
      }

      if (!this.validEmail(this.email)) {
        this.error = 'Некоректный email';
      }

      if (!this.error.length) {
        this.signIn();
      }

      e.preventDefault();
    },

    checkSignIn(response) {
      switch (response.data.status) {
        case 'success':
          window.localStorage.setItem('token', response.data.data);
          this.$store.dispatch('setToken', response.data.data);
          this.$router.back();
          this.getData();
          break;
        case 'invalidEmail':
          this.error = 'Неверный email';
          break;
        case 'invalidPassword':
          this.error = 'Неверный пароль';
          break;
        default:
          this.error = 'Ошибка авторизации';
          break;
      }
    },
    getData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'my',
          token: window.localStorage.getItem('token'),
        })
        .then((response) => (this.checkUserData(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },
    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

  },
  computed: {
    isError: {
      get() {
        if (this.error.length) {
          return true;
        }
        return false;
      },
      set() {
        this.error = '';
      },
    },
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
    #SpanRulesNM{
        display block
        font-size: 13px
        text-align center
    }
    .iconContainer{
      margin 10px
      height auto
    }
    .regIcon{
      margin 5px
    }
    #ModalRulesText{
        font-size: 16px
    }
    #V-card-title-rules{
        word-break normal
    }
    #SmallAuthButton{
        margin-top 10px
        margin-bottom 10px
        color #FFF
        font-size: 10px
        background: linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
        border none
        border-radius 30px
        height 30px
        width 50%
    }
    #RegButton{
        margin-top 10px
        margin-bottom 10px
        color #56D68B
        font-size: 13px
        background: transparent
        border 1px solid #56D68B
        border-radius 30px
        height 56px
        width 72%
    }
    .container{
        position relative
        width 100%
        height 100%
        padding 0px
        text-align: center;
        vertical-align middle
    }
    .RegNumber {
        margin-top 10px
        padding-right 10px
        padding-left 10px
    }
    #RegBigToolBar {
        position relative
        margin-bottom 50px
        margin-right 0
        margin-left 0
        margin-top 0
        background-color: #2AB06A
        height: 30vh
        width: 100%
        border: none
        border-radius:0px 0px 50px 0px
        text-align: center
    }

    #RegBottomBar {
        position fixed
        bottom 0
        background-color: #2AB06A
        width: 100%
        height 10%
        border: none
        border-radius:50px 0px 0px 0px
        align-items: center
    }

    #regLogo {
        position relative
        vertical-align middle
        width:auto;
        height:50%;
    }

</style>
