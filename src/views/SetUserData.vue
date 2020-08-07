<template lang="pug">
  v-container
    .set-user-data
      v-row(align='center' justify='center')
        v-avatar(size='62' color='#56D68B')
          svg-icon(name='PhotoCamera'  width='60' height='15')
      v-text-field.input-data(
        label="Имя"
        dense color="#65686C"
        clearable
        v-model="firstName"
      )
      v-text-field(
        label="Фамилия"
        dense color="#65686C"
        clearable
        v-model="lastName"
      )
      v-row.btn-wrapper(align='center' justify='center')
        v-btn.btn-save(rounded @click="checkForm") Сохранить

    input(type="file" @change="handleFileUpload" ref="input")
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'SetUserData',
  components: {
    axios,
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
    src() {
      if (!this.content) {
        return '@/assets/photo-camera.png';
      }
      return this.content;
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

  .set-user-data {
    background-color #FFFFFF
    padding 12px
    box-shadow 0 1px 3px rgba(0,0,0,0.12),
               0 1px 2px rgba(0,0,0,0.12)
    border-radius 2px
    margin-bottom 12px
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

  input[type="file"]{
    position absolute
    left -500px
  }
</style>
