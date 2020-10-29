import axios from 'axios';
import dadata from './dadata';
import store from '../../store/index';

const token = dadata.getToken();
const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

async function getSuggestions({
  query,
  count,
  toBound,
  fromBound,
  language,
  locations,
  locationsBoost,
}) {
  const kladrId = store.getters.getCurrentPosition.data.kladr_id;

  const payload = {
    query,
    count: count || 10,
    to_bound: { value: toBound },
    from_bound: { value: fromBound },
    language,
    locations,
    locations_boost: locationsBoost || {
      kladr_id: kladrId,
    },
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
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export default getSuggestions;
