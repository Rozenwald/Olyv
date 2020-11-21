import axios from 'axios';
import logger from '../logger';
import nativeStorage from '../nativeStorage';
import store from '../../store/index';

let notificationToken;
let appToken;

function receiveAppTokens() {
  notificationToken = store.getters.getNotificationToken;
  appToken = store.getters.getAppToken;

  try {
    return axios.post(`${window.$baseNotificationUrl}api/v1/private/tokenApp`, {
      token: notificationToken,
      method: 'receive',
      submethod: 'tokenApp',
    });
  } catch (error) {
    logger.log(error);
    return null;
  }
}

function getTokenId(data) {
  if (!data) {
    return null;
  }

  if (!appToken) {
    logger.log('App token is null');
    return null;
  }

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].tokenApp === appToken) {
      // eslint-disable-next-line no-underscore-dangle
      return data[i]._id;
    }
  }

  return null;
}

function removeTokenApp(idTokenApp) {
  if (!idTokenApp) {
    return null;
  }

  try {
    return axios.post(`${window.$baseNotificationUrl}api/v1/private/tokenApp`, {
      token: notificationToken,
      method: 'del',
      idTokenApp,
    });
  } catch (error) {
    logger.log(error);
    return null;
  }
}

async function deleteAppToken() {
  const tokenList = await receiveAppTokens();
  if (!tokenList) return null;

  const token = getTokenId(tokenList.data.data);
  if (!token) return null;

  const resultData = await removeTokenApp(token);
  return resultData;
}

async function exit() {
  nativeStorage.clear();
  store.dispatch('clear');

  logger.log(store.getters.getAppToken);
  logger.log(store.getters.getToken);
  logger.log(store.getters.getNotificationToken);
  logger.log(store.getters.getChatToken);

  if (!window.cordova.platformId === 'browser') {
    const result = await deleteAppToken();

    if (!result) return false;

    if (result.data.status !== 'success') return false;

    return true;
  }

  return true;
}

export default {
  exit,
};
