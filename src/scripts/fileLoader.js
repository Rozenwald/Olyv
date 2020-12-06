import axios from 'axios';
import logger from './logger';

function download(url) {
  try {
    return axios.get(url, { responseType: 'blob' });
  } catch (error) {
    logger.log(error);
    return null;
  }
}

export default {
  download,
};
