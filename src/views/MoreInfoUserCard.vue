<template lang="pug">
  swipe-list.usercar(
    ref="list"
    class="card"
    :disabled="!enabled"
    :items="mockSwipeList"
    item-key="id"
    @swipeout:click="itemClick"
    :id="id"
  )
    template(v-slot="{ item, index, revealLeft, revealRight, close }")
      .card-content
        v-row.avatar-name-container(align='center')
          .avatar
            v-avatar(size='60' color='#fff' border-color='#000')
              svg-icon(name='User'  width='60' height='15'  v-if="!photo")
              v-img(:src="photo" v-if="photo")
          .name
            span {{executorData.name}} {{executorData.lastname}}
        v-row.cost(align='center')
          span {{cost}}

    template(v-slot:left="{ item, close }")
      .swipeout-action.chat(@click="route('chat')")
        svg-icon.icon(name='Chat')

    template(v-slot:right="{item}")
      .swipeout-action.agree(@click="agreeResponse")
        svg-icon.icon(name='Agree')

    template(v-slot:empty)
      .divclass
        list is empty ( filtered or just empty )

</template>

<script>
import { SwipeList, SwipeOut } from 'vue-swipe-actions';
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'userCard',
  props: {
    title: String,
    cost: String,
    idUserResponse: String,
    idResponse: String,
  },
  components: {
    SwipeOut,
    SwipeList,
    SvgIcon,
    axios,
  },
  data() {
    return {
      executorData: {},
      enabled: true,
      mockSwipeList: [
        {
          id: 0,
          title: 'Some title',
          description: 'some description',
        },
      ],
    };
  },

  methods: {
    route(routeName) {
      this.$router.push(routeName);
    },
    getRandomId() {
      return `id${Math.floor(Math.random * Math.floor(100))}`;
    },
    revealFirstRight() {
      this.$refs.list.revealRight(0);
    },
    revealFirstLeft() {
      this.$refs.list.revealLeft(0);
    },
    closeFirst() {
      this.$refs.list.closeActions(0);
    },
    closeAll() {
      this.$refs.list.closeActions();
    },
    itemClick(e) {
      console.log(e, 'item click');
    },
    fbClick(e) {
      console.log(e, 'First Button Click');
    },
    sbClick(e) {
      console.log(e, 'Second Button Click');
    },
    agreeResponse() {
      axios
        .post(`${this.$baseUrl}api/v1/private/process`, {
          method: 'add',
          submethod: 'customer',
          token: this.token,
          idResponse: this.idResponse,
        })
        .then((response) => (this.checkAgreeResponse(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => (console.log(error)));
    },
    checkAgreeResponse(response) {
      switch (response.data.status) {
        case 'success':
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
    getExecutorData() {
      axios
        .post(`${this.$baseUrl}api/v1/private/user`, {
          method: 'receive',
          submethod: 'id',
          token: this.token,
          id: this.idUserResponse,
        })
        .then((response) => (this.checkExecutorData(response)))
        // eslint-disable-next-line no-return-assign
        .catch((error) => (console.log(error)));
    },

    checkExecutorData(response) {
      switch (response.data.status) {
        case 'success':
          this.executorData = response.data.data;
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

    photo() {
      if (!this.executorData.photo) {
        return null;
      }
      if (!this.executorData.photo.length) {
        return null;
      }
      return this.executorData.photo[this.executorData.photo.length - 1].urlMin;
    },
  },
  mounted() {
  },
  created() {
    this.id = this.getRandomId();
    this.getExecutorData();
  },
};
</script>

<style lang="stylus">

.card-content{
  display flex !important
  height 100% !important
  width 100% !important
  padding 5px !important
}
  .avatar-name-container{
    width 75%
    display flex
    flex-wrap nowrap
    margin-right 0px
    margin-left 0px
  }
    .avatar{
      flex-wrap nowrap
    }
    .name{
      flex-wrap nowrap
    }
  .cost{
    display flex
    flex-wrap nowrap
    justify-content center
    margin-right 0px
    margin-left 0px
  }
    .chat{
        background-color: #fff !important;
        border: 1px solid #56d68b !important}
    .delete{
        background-color: #F44336 !important;
        border-color: #F44336 !important;
    }
    .agree{
        background-color: #56d68b !important;
        border-color: #56d68b !important;}
.usercard{
  height 70px
}
.icon{
  display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
}
.swipeout {
    position: relative;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    display: flex;
}
.swipeout-list {
  display: flex;
  flex-direction: column;
}
.swipeout-left, .swipeout-right {
    position: absolute;
    height: 100%;
    display: flex;
    z-index: 1;
}
.swipeout-left {
    left: 0;
    transform: translateX(-100%);
}
.swipeout-right {
    right: 0;
    transform: translateX(100%);
}
.swipeout-content {
    width: 100%;
}

.swipeout-action {
  display: flex;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    cursor: pointer;

  &.action-panel-right {
    > div {
      background-color: dodgerblue;
      color: white;
    }
  }
  &.action-panel-left {
    > div:nth-of-type(even) {
      background-color: darkorchid;
      color: white;
    }
    > div:nth-of-type(odd) {
      background-color: dodgerblue;
      color: white;
    }
  }
}
.swipeout-list-item {
  flex: 1;
  border-bottom: 1px solid lightgray;
  &:last-of-type {
    border-bottom: none;
  }
}
.card {
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid lightgray;
}
</style>
