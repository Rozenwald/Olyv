import axios from 'axios';
import logger from './logger';
import nativeStorage from './nativeStorage';
import store from '../store/index';

function receiveAppTokens(notificationToken) {
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

function getTokenId(data, appToken) {
  if (!data) {
    return null;
  }

  if (!appToken) {
    logger.log('App token is null');
    return null;
  }

  logger.log(appToken);

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].tokenApp === appToken) {
      // eslint-disable-next-line no-underscore-dangle
      return data[i]._id;
    }
  }

  return null;
}

function removeTokenApp(idTokenApp, notificationToken) {
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

async function deleteAppToken(notificationToken, appToken) {
  const tokenList = await receiveAppTokens(notificationToken);
  if (!tokenList) return null;

  logger.log(tokenList);

  const tokenId = getTokenId(tokenList.data.data, appToken);
  if (!tokenId) return null;

  logger.log(tokenId);

  const resultData = await removeTokenApp(tokenId, notificationToken);

  return resultData;
}

async function exit() {
  const notificationToken = store.getters.getNotificationToken;
  const appToken = store.getters.getAppToken;

  nativeStorage.clear();
  store.dispatch('clear');

  logger.log(store.getters.getAppToken);
  logger.log(store.getters.getToken);
  logger.log(store.getters.getNotificationToken);
  logger.log(store.getters.getChatToken);

  if (window.cordova.platformId !== 'browser') {
    const result = await deleteAppToken(notificationToken, appToken);

    if (!result) return false;

    if (result.data.status !== 'success') return false;

    return true;
  }

  return true;
}

export default {
  exit,
};
