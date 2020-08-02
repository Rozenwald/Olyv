<template lang="pug">
  .container
    v-row#RegBigToolBar(align='center' justify='center')
      img#regLogo(src="../assets/icons/Plus.svg", alt="alt")

    v-text-field.RegNumber(v-model="email"
                          label='E-mail'
                          type='email'
                          required)

    v-text-field.RegNumber(v-model="password"
                          type='password'
                          label='Пароль'
                          required)

    span#SpanRulesNM(v-show="!isFocus") Нажимая кнопку зарегестрироваться вы принимаете:

    v-row#modalContainer(v-show="!isFocus" justify="center")
      v-dialog(v-model='dialog')
        template(v-slot:activator="{ on, attrs }")
          v-btn#ModalRules(text
              color="normal"
              v-bind="attrs"
              v-on="on") Правила и условия политики конфеденциальности
        v-card
          v-card-title#V-card-title-rules
            span#SpanRulesM
            |Правила и условия политики конфеденциальности
          v-card-text#ModalRulesText
          |Текст о правилах и политике конфеденциальности
          |бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла
          v-card-actions
            v-btn(color="green darken-1"
            @click="dialog = false") OK

    v-btn#RegButton(v-on:click="checkForm") Зарегестрироваться
    v-btn#SmallAuthButton(@click="route('auth')") Уже есть аккаунт

    span#SpanRulesNM(v-show="!isFocus") Регистрация с помощью:

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
  name: 'Registration',
  components: {
    axios,
    SvgIcon,
  },
  data() {
    return {
      email: null,
      password: null,
      error: '',
      dialog: false,
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
    },
    validEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    signUp() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/public/signup/email`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => (this.checkSignUp(response)))
        .catch(() => (this.error = 'Ошибка регистрации'));
      /* eslint-enable no-return-assign */
    },

    signIn() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/public/signin/email`, {
          username: this.email,
          password: this.password,
        })
        .then((response) => (this.checkSignIn(response)))
        .catch(() => (this.error = 'Ошибка регистрации'));
      /* eslint-enable no-return-assign */
    },

    checkForm(e) {
      this.error = '';
      if (!this.validEmail(this.email)) {
        this.error = 'Некоректный email';
      }

      if (this.password.length < 6) {
        this.error = 'Пароль должен содержать больше 6 символов';
      }

      if (!this.error.length) {
        this.signUp();
      }

      e.preventDefault();
    },

    checkSignUp(response) {
      switch (response.data.status) {
        case 'invalidEmail':
          this.error = 'Некоректный email';
          break;
        case 'invalidPassword':
          this.error = 'Пароль должен содержать больше 6 символов';
          break;
        case 'existEmail':
          this.error = 'Данная почта уже зарегистрирована';
          break;
        case 'notSuccess':
          this.error = 'Ошибка регистрации';
          break;
        case 'success':
          this.signIn();
          break;
        default:
          this.error = 'Ошибка регистрации';
          break;
      }
    },

    checkSignIn(response) {
      switch (response.data.status) {
        case 'success':
          window.localStorage.setItem('token', response.data.data);
          this.$store.dispatch('setToken', response.data.data);
          this.$router.back();
          break;
        case 'notSuccess':
          this.error = 'Ошибка регистрации';
          break;
        default:
          this.error = 'Ошибка регистрации';
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
    show() {
      return this.$store.getters.isVisibleAppbar;
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
          #modalContainer{
            margin 0
          }
          toolbarIcon{
            width 100%
            height 100%
            display block
          }
          .regIcon{
            margin 5px
          }
          .iconContainer{
            margin 10px
            height auto
          }
          #ModalRulesText{
            font-size: 16px
          }
          #V-card-title-rules{
            word-break normal
          }
          #SpanRulesNM{
            display block
            font-size: 13px
            text-align center
          }
          #SpanRulesM{
            font-size: 20px
            text-align center
          }
          #ModalRules{
            font-size: 10px
            text-decoration:underline
          }
          #SmallAuthButton{
            margin-top 10px
            margin-bottom 10px
            color #56D68B
            font-size: 10px
            background: transparent
            border 1px solid #56D68B
            border-radius 30px
            height 30px
            width 50%
          }
          #RegButton{
            margin-top 10px
            margin-bottom 10px
            color #FFF
            font-size: 13px
            background: linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
            border none
            border-radius 30px
            height 56px
            width 72%
          }
          .container{
            position relative
            width 100%;
            height 100%;
            padding 0
            text-align: center;
            vertical-align middle
          }
          .RegNumber{
            margin-top 10px
            padding-right 10px
            padding-left 10px
            }
          #RegBigToolBar{
            position relative;
            background-color: #2AB06A;
            margin-bottom 50px
            margin-right 0
            margin-left 0
            margin-top 0
            height: 30vh;
            width: 100%;
            border: none;
            border-radius:0px 0px 50px 0px;
            text-align: center;
          }

          #RegBottomBar{
            position fixed;
            bottom 0;
            background-color: #2AB06A;
            width: 100%;
            height 10%
            border: none;
            border-radius:50px 0px 0px 0px;
            align-items: center;
          }

          #regLogo{
            position relative
            vertical-align middle
            width:auto;
            height:50%;
          }

</style>
