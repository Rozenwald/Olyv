import axios from 'axios';
import dadata from './dadata';

const token = dadata.getToken();
const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=';

async function getCurrentPositionIP() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const response = await axios.get(`${url}185.57.31.248`, config);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export default {
  getCurrentPositionIP,
};
