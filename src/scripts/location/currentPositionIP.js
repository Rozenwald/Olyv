import axios from 'axios';
import store from '../../store/index';
import currentPositionIP from '../dadata/currentPositionIP';

async function getCurrentPositionIP() {
  const response = await axios.get('https://json.geoiplookup.io/api?callback');
  let data = response.data.substring(1, response.data.length - 2);
  data = JSON.parse(data);
  store.dispatch('setCurrentPosition', { ip: data.ip } || {});
  console.log(store.getters.getCurrentPosition);
  currentPositionIP.getCurrentPositionIP(data.ip);
}

export default {
  getCurrentPositionIP,
};
