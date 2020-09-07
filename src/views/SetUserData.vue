<template lang="pug">
  v-container
    .set-user-data
      v-row(align='center' justify='center')
        v-skeleton-loader(type="avatar" :loading="!hasData")
          avatar(:src="src" size="100" isChange)
      v-skeleton-loader(type="text" :loading="!hasData")
        v-text-field.edit-data(
          label="Имя"
          dense
          color="#65686C"
          hide-details="auto"
          v-model="firstName"
        )
      v-skeleton-loader(type="text" :loading="!hasData")
        v-text-field.edit-data(
          label="Фамилия"
          dense
          color="#65686C"
          hide-details="auto"
          v-model="lastName"
        )
      v-row.btn-wrapper(align='center' justify='center')
        v-btn.btn-save(rounded @click="checkForm") Сохранить
</template>

<script>
import axios from 'axios';
import store from '../store';
import SvgIcon from '../components/SvgIcon.vue';
import Avatar from '../components/Avatar.vue';

export default {
  name: 'SetUserData',
  components: {
    axios,
    store,
    SvgIcon,
    Avatar,
  },
  data() {
    return {
      isFocus: false,
      windowHeight: null,
      firstName: null,
      lastName: null,
    };
  },
  methods: {
    checkForm() {
      if (this.firstName == null) {
        this.error = 'Введите имя';
        return undefined;
      }

      if (this.firstName.length === 0) {
        this.error = 'Введите имя';
        return undefined;
      }

      this.sendData();
      return undefined;
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
          this.getUserData();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

    getUserData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'my',
          token: this.token,
        })
        .then((response) => (this.checkUserData(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },

    checkUserData(response) {
      switch (response.data.status) {
        case 'success':
          this.$store.dispatch('setUser', response.data.data);
          this.$router.back();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
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
    src() {
      if (!this.user.photo) {
        return null;
      }

      if (this.user.photo.length) {
        return this.user.photo[this.user.photo.length - 1].urlMin;
      }

      return null;
    },
    user() {
      return this.$store.getters.getUser;
    },
    hasData() {
      return this.$store.getters.hasData;
    },

    error: {
      get() {
        return this.$store.getters.getError;
      },
      set(val) {
        this.$store.dispatch('setError', val);
      },
    },
  },
  watch: {
    isFocus() {
      this.$store.dispatch('showBottomNavigation', !this.isFocus);
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!store.getters.isAuth) {
      next(from.name);
      store.dispatch('showLoginDialog', true);
    } else {
      next();
    }
  },
};
</script>

<style lang="stylus" scoped>

  .set-user-data {
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    margin-bottom 12px
  }

  .edit-data {
    margin 12px 0 0 !important
  }

  .btn-wrapper{
    margin-top 24px
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

  input[type="file"]{
    position absolute
    left -500px
  }
</style>
