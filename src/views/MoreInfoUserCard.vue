<template lang="pug">
  swipe-list.usercard(
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
          v-avatar()
          .name()
          .cost()

      template(v-slot:left="{ item, close }")
        .swipeout-action.delete.red(@click="remove(item)")
          svg-icon.icon(name='Delete')

      template(v-slot:right="{ item}")
        .swipeout-action.chat(@click="route('chat')")
          svg-icon.icon(name='Chat')
        .swipeout-action.agree()
          svg-icon.icon(name='Agree')

      template(v-slot:empty)
        .divclass
          list is empty ( filtered or just empty )

</template>

<script>
import { SwipeList, SwipeOut } from 'vue-swipe-actions';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'OrderCard1',
  props: {
    title: String,
    cost: String,
    distation: String,
    idUser: String,
  },
  components: {
    SwipeOut,
    SwipeList,
    SvgIcon,
  },
  data() {
    return {
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
  },
  mounted() {
  },
  created() {
    this.id = this.getRandomId();
  },
};
</script>

<style lang="stylus">
.chat{
    background-color: #f5f5f5 !important;
    border-color: #56d68b !important;
    border: 1px solid #d3d3d3}
.delete{
    background-color: #F44336 !important;
    border-color: #F44336 !important;
}
.agree{
    background-color: #56d68b !important;
    border-color: #56d68b !important;}
.usercard{
  height 65px
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
  border-radius: 3px;
  box-shadow: none;
  border: 1px solid lightgray;
}
.card-content {
  padding: 1rem;
}
</style>
