import axios from 'axios';
import dadata from './dadata';

const token = dadata.getToken();
const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

function getSuggestions({
  query,
  count,
  toBound,
  fromBound,
  language,
  locations,
  locationsBoost,
}) {
  const payload = {
    query,
    count: count || 10,
    to_bound: { value: toBound },
    from_bound: { value: fromBound },
    language,
    locations,
    locations_boost: locationsBoost,
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
    console.error(error);
    return null;
  }
}

export default {
  getSuggestions,
};
