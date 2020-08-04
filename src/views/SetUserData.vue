<template lang="pug">
  v-container
    .set-user-data
      v-row.load-avatar-wrapper(align='center' justify='center')
        .load-avatar(align='center' justify='center')
          .load-avatar-description
            img(src="../assets/photo-camera.png", alt="photo camera icon")
            .load-ur-photo(v-show="!isFocus") Загрузите Ваше фото

      v-text-field.input-data(label="Имя"
                              dense color="#65686C"
                              clearable
                              v-model="firstName"
                             )
      v-text-field(label="Фамилия"
                   dense color="#65686C"
                   clearable
                   v-model="lastName"
                  )

      v-row.btn-wrapper(align='center' justify='center')
        v-btn.btn-save(rounded @click="checkForm") Сохранить
</template>

<script>
import axios from 'axios';

export default {
  name: 'SetUserData',
  components: {
    axios,
  },
  data() {
    return {
      isFocus: false,
      windowHeight: null,
      firstName: null,
      lastName: null,
      error: '',
    };
  },
  methods: {
    checkForm() {
      if (this.firstName !== null) {
        if (this.firstName.length === 0) {
          this.error = 'Введите имя';
        }
      } else {
        this.error = 'Введите имя';
      }

      if (this.error.length === 0) {
        this.sendData();
      }
    },
    sendData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'update',
          submethod: 'nameLastname',
          token: this.token,
          name: this.firstName,
          lastname: this.lastName,
        })
        .then((response) => (this.checkResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },
    checkResponse(response) {
      switch (response.data.status) {
        case 'success':
          if (response.data.data == null) {
            this.getData();
          } else {
            this.$store.dispatch('setUser', response.data.data);
            this.$router.push('customerProfile');
          }
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },
    getData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'my',
          token: this.token,
        })
        .then((response) => (this.checkResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },
  },
  created() {
    this.$store.commit('setTitle', 'Личный кабинет');
    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      if (window.innerHeight < this.windowHeight) {
        this.isFocus = true;
      } else {
        this.isFocus = false;
      }
    });
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    token() {
      return this.$store.getters.getToken;
    },
  },
  watch: {
    isFocus() {
      this.$store.dispatch('showBottomNavigation', !this.isFocus);
    },
  },
};
</script>

<style lang="stylus" scoped>

  .load-avatar-wrapper{
    height 40vh
  }

  .set-user-data{
    margin-bottom 53px
  }

  .load-avatar{
    width 27vh !important
    height 27vh !important
    border-radius 14vh
    background #FFFFFF
    display block
  }

  .load-avatar-description{
    width 27vh
    height 27vh
    vertical-align middle
    display table-cell
    text-align center
  }

  .load-ur-photo{
    margin-bottom 0
    margin-top 10px
    font-style normal
    font-weight normal
    font-size 13px
    line-height 16px
  }

  .btn-wrapper{
    min-height 20vh
  }

  .btn-save{
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 240px
    box-shadow none
  }
</style>
