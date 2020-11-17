<template lang="pug">
  v-sheet.user-card(elevation="1" rounded)
    v-list-item(dense)
      v-list-item-avatar
        avatar
      v-list-item-content
        v-list-item-title {{name}}
        v-list-item-subtitle
          v-rating(
            :length="5"
            readonly
            :half-increments="true"
            dense
            color="#FFCA10"
            background-color="#FFCA10"
            size="14")
      v-list-item-action
        v-row.cost(align='center') {{cost}} руб.
</template>

<script>
import axios from 'axios';
import Avatar from '../Avatar.vue';

export default {
  name: 'user-card',
  components: {
    Avatar,
  },
  props: {
    idUser: String,
    cost: String,
  },
  data() {
    return {
      userData: {},
    };
  },
  methods: {
    getExecutorData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'id',
          token: this.token,
          id: this.idUser,
        })
        .then((response) => (this.checkExecutorData(response)))
        // eslint-disable-next-line no-return-assign
        .catch(() => (this.error = 'Ошибка'));
    },

    checkExecutorData(response) {
      console.log(response);
      switch (response.data.status) {
        case 'success':
          this.userData = response.data.data;
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
  computed: {
    token() {
      return this.$store.getters.getToken;
    },

    name() {
      if (this.userData.name && this.userData.lastname) {
        return `${this.userData.name} ${this.userData.lastname}`;
      }

      if (this.userData.name) {
        return this.userData.name;
      }

      if (this.userData.email) {
        return this.userData.email;
      }

      return '';
    },
  },
  watch: {
    idUser() {
      if (this.idUser) {
        this.getExecutorData();
      }
    },
  },
  mounted() {
    this.getExecutorData();
  },
};
</script>

<style lang="stylus" scoped>
  .row {
    margin 0
  }
</style>
