<template lang="pug">
  swipe-list(
    ref="list"
    class="card"
    :disabled="!enabled"
    :items="mockSwipeList"
    item-key="id"
    @swipeout:click="itemClick")
      <template v-slot="{ item, index, revealLeft, revealRight, close }">
        <div class="card-content">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <span>{{ index }}</span>
        </div>
      </template>
      <template v-slot:left="{ item, close }">
        <div class="swipeout-action red" title="remove" @click="remove(item)">
          <i class="fa fa-trash"></i>
        </div>
        <div class="swipeout-action purple" @click="close">
          <i class="fa fa-close"></i>
        </div>
      </template>
      <template v-slot:right="{ item }">
        <div class="swipeout-action blue">
          <i class="fa fa-heart"></i>
        </div>
        <div class="swipeout-action green">
          <i class="fa fa-heart"></i>
        </div>
      </template>
      <template v-slot:empty>
        <div>
          list is empty ( filtered or just empty )
        </div>
      </template>
  </swipe-list>
</template>

<script>
import { SwipeList, SwipeOut } from 'vue-swipe-actions';

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

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

.swipeout-list {
  display: flex;
  flex-direction: column;
}
.swipeout-action {
  display: flex;
  > div {
    display: flex;
    align-items: center;
    padding: 0 3rem;
    cursor: pointer;
  }
  &.action-panel-right {
    > div {
      background-color: dodgerblue;
      color: white;
      &:hover {
        background-color: darken(dodgerblue, 5%);
      }
    }
  }
  &.action-panel-left {
    > div:nth-of-type(even) {
      background-color: darkorchid;
      color: white;
      &:hover {
        background-color: darken(darkorchid, 5%);
      }
    }
    > div:nth-of-type(odd) {
      background-color: dodgerblue;
      color: white;
      &:hover {
        background-color: darken(dodgerblue, 5%);
      }
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
