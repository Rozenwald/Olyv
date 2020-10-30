import axios from 'axios';
import dadata from './dadata';

const token = dadata.getToken();
const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';

function getData({
  lat,
  lon,
  radiusMeters,
}) {
  const payload = {
    lat,
    lon,
    radius_meters: radiusMeters,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    return axios.post(url, payload, config);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default {
  getData,
};
