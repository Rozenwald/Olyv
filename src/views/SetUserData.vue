<template lang="pug">
  v-container
    .set-user-data
      v-row(align='center' justify='center')
        v-skeleton-loader(type="avatar" :loading="!hasData")
          v-avatar(size='100' color='#56D68B' @click="choosePhoto")
            svg-icon(name='PhotoCamera'  width='100' height='25' v-show="!src")
            v-img(:src="src" v-show="src")
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

    input(type="file" @change="handleFileUpload" ref="input")
</template>

<script>
import axios from 'axios';
import store from '../store';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'SetUserData',
  components: {
    axios,
    store,
    SvgIcon,
  },
  data() {
    return {
      isFocus: false,
      windowHeight: null,
      firstName: null,
      lastName: null,
      error: '',
      content: '',
      file: null,
    };
  },
  methods: {
    choosePhoto(event) {
      event.preventDefault();
      this.$refs.input.click();
    },

    handleFileUpload(event) {
      event.preventDefault();
      this.selectImage(event.target.files[0]);
    },

    selectImage(file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = this.onImageLoad;
      reader.readAsDataURL(file);
    },

    onImageLoad(e) {
      this.content = e.target.result;
      const filename = this.file instanceof File ? this.file.name : '';
      this.$emit('input', filename);
      this.$emit('image-changed', this.content);
    },

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
          this.getUserData();
          if (this.file) {
            this.sendPhoto();
          }
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
          break;
      }
    },

    sendPhoto() {
      // eslint-disable-next-line prefer-const
      let data = new FormData();
      data.append('token', this.token);
      data.append('method', 'update');
      data.append('photo', this.file);
      data.append('submethod', 'photo');
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, data)
        .then((response) => (this.checkPhoto(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка загрузки фото'));
    },

    checkPhoto(response) {
      switch (response.data.status) {
        case 'success':
          this.file = null;
          this.getUserData();
          break;
        case 'invalidPhoto':
          this.error = 'Неверный формат фото';
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка загрузки фото';
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
          if (!this.file) {
            this.$router.back();
          }
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
      return this.content;
    },
    user() {
      return this.$store.getters.getUser;
    },
    hasData() {
      return this.$store.getters.hasData;
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
