<template lang="pug">
  v-sheet.user-card(elevation="1" rounded)
    v-list-item(dense)
      v-list-item-avatar(@click.stop="openProfile()")
        avatar(:src="photo")
      v-list-item-content
        v-list-item-title {{name}}
        <!-- v-list-item-subtitle
           v-rating(
            :length="5"
            readonly
            :half-increments="true"
            dense
            color="#FFCA10"
            background-color="#FFCA10"
            size="14"
              ) -->
      v-list-item-action
        v-row.cost(align='center') {{cost}} руб.
</template>

<script>
import axios from 'axios';
import Avatar from '../Avatar.vue';
import dialog from '../../scripts/openDialog';
import logger from '../../scripts/logger';
import dialogMessages from '../../scripts/dialogMessages';

export default {
  name: 'user-card',
  components: {
    Avatar,
  },
  props: {
    idUser: String,
    cost: Number,
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
        .catch((error) => {
          logger.log(error);
        });
    },

    openProfile() {
      if (this.idUser) this.$root.$emit('openProfile', this.idUser);
    },

    checkExecutorData(response) {
      switch (response.data.status) {
        case 'success':
          this.userData = response.data.data;
          break;
        case 'notAuthenticate':
          dialog.open(
            dialogMessages.getTitle('error'),
            dialogMessages.getBody('notAuthentucate'),
            true,
            true,
            () => { this.$router.push({ name: 'auth' }); },
          );
          break;
        default:
          logger.log(response);
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

    photo() {
      if (!this.userData.photo) {
        return ' ';
      }

      if (!this.userData.photo.length) {
        return null;
      }
      const url = this.userData.photo[this.userData.photo.length - 1].urlMin.substr(1);
      return this.$baseUrlNoPort + url;
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
