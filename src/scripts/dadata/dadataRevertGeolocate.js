import axios from 'axios';
import dadata from './dadata';
import store from '../../store/index';
import getSuggestions from './dadataSuggestion';

const token = dadata.getToken();
const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';

async function getInfoAboutLocation({
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
    const response = await axios.post(url, payload, config);
    store.dispatch('setCurrentPosition', response.data.suggestions[0] || {});
    getSuggestions({
      query: 'проспект',
    });
  } catch (error) {
    console.error(error);
  }
}

export default getInfoAboutLocation;
