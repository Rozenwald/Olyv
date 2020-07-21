<template lang="pug">
    v-app
        .container
            #RegBigToolBar
                .container
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

            span#SpanRulesNM Нажимая кнопку зарегестрироваться вы принимаете:
            <template>
                    v-dialog(
                        width="600px")
                        <template v-slot:activator="{ on, attrs }">
                        v-btn#ModalRules(
                                text
                                color="normal"
                                v-bind="attrs"
                                v-on="on") Правила и условия политики конфеденциальности
                        </template>
                        <v-card>
                        v-card-title#V-card-title-rules
                            span#SpanRulesM
                            |Правила и условия политики конфеденциальности
                        v-card-text#ModalRulesText
                        |Текст о правилах и политике конфеденциальности
                        |бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1">Dis</v-btn>
                            <v-btn color="green darken-1">Agree</v-btn>
                        </v-card-actions>
                        </v-card>
            </template>
            v-btn#RegButton(v-on:click="checkForm") Зарегестрироваться
            #RegBottomBar
            v-dialog(v-model="isError")
              v-row(align='center' justify='center')
                .dialog_title {{error}}
              v-btn(@click="error = ''") ок
</template>

<script>
import axios from 'axios';

export default {
  name: 'Registration',
  components: {
    axios,
  },
  data() {
    return {
      email: null,
      password: null,
      error: '',
    };
  },
  methods: {

    validEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    signUp() {
      /* eslint-disable no-return-assign */
      axios
        .post('http://test.cabinet.olyv.services:8888/api/v1/public/signup/email', {
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
        .post('http://test.cabinet.olyv.services:8888/api/v1/public/signin/email', {
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
  },
  created() {
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
    #ModalRulesText{
        font-size: 16px
    }
    #V-card-title-rules{
        word-break normal
    }
    #SpanRulesNM{
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
    #RegButton{
        margin-top 25px
        color #FFF
        font-size: 13px
        background: linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
        border none
        border-radius 30px
        height 6.8%
        width 72%
    }
    .container{
        position relative
        width 100%;
        height 100%;
        padding 0px;
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
        margin-top 13%
        margin-bottom 13%
        vertical-align middle
        width:auto;
        height:50%;
    }

</style>
