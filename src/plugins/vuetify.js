import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'material-design-icons-iconfont/dist/material-design-icons.css';
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
import SaveDeal from '../components/icons/SaveDeal.vue';
import Responded from '../components/icons/Responded.vue';
import Distantion from '../components/icons/Distantion.vue';
import SendMsg from '../components/icons/SendMsg.vue';
import Rubl from '../components/icons/Rubl.vue';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
    values: {
      rubl: {
        component: Rubl,
      },
      sendMsg: {
        component: SendMsg,
      },
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
      save_deal: {
        component: SaveDeal,
      },
      responded: {
        component: Responded,
      },
      distantion: {
        component: Distantion,
      },
    },
  },
});
