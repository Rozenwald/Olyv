import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Notification from '../components/icons/Notification.vue';
import BlackList from '../components/icons/BlackList.vue';
import RightArrow from '../components/icons/RightArrow.vue';
import EditProfile from '../components/icons/EditProfile.vue';
import ConnectDev from '../components/icons/ConnectDev.vue';
import Info from '../components/icons/Info.vue';
import MyOrder from '../components/icons/MyOrder.vue';
import OrdersList from '../components/icons/OrdersList.vue';
import User from '../components/icons/User.vue';
import Setting from '../components/icons/Setting.vue';
import Plus from '../components/icons/Plus.vue';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      notification: {
        component: Notification,
      },
      black_list: {
        component: BlackList,
      },
      right_arrow: {
        component: RightArrow,
      },
      edit_profile: {
        component: EditProfile,
      },
      connect_dev: {
        component: ConnectDev,
      },
      info: {
        component: Info,
      },
      my_orders: {
        component: MyOrder,
      },
      orders_list: {
        component: OrdersList,
      },
      user: {
        component: User,
      },
      setting: {
        component: Setting,
      },
      plus: {
        component: Plus,
      },
    },
  },
});
