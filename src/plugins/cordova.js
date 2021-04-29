/* eslint-disable no-undef */
import axios from 'axios';
import store from '../store/index';
import router from '../router/index';
import logger from '../scripts/logger';
import nativeStorage from '../scripts/nativeStorage';
import DeepLinks from '../scripts/deep-links/deepLinks';

function addAppToken(tokenApp, notificationToken) {
  axios
    .post(`${window.$baseNotificationUrl}api/v1/private/tokenApp`, {
      token: notificationToken,
      method: 'add',
      tokenApp,
    })
    .then((response) => (logger.log(response)))
    .catch((error) => {
      logger.log(error);
    });
}

function getStorageItem(key, action) {
  nativeStorage.getItem(key)
    .then((item) => {
      logger.log(item);
      store.dispatch(action, item);
      if (key === 'notificationToken') {
        FirebasePlugin.onTokenRefresh((fcmToken) => {
          logger.log('App token refresh');
          addAppToken(fcmToken, item);
        }, (error) => {
          logger.log(error);
        });
      }
    })
    .catch((error) => {
      logger.log(error);
    });
}

function getStorage() {
  getStorageItem('token', 'setToken');
  getStorageItem('chatToken', 'setChatToken');
  getStorageItem('idChanal', 'setIdChanal');
  getStorageItem('notificationToken', 'setNotificationToken');
  getStorageItem('idNotificationChanal', 'setNotificationIdChanal');
}

function getToken() {
  return new Promise(((onSuccess, onError) => {
    window.FirebasePlugin.getToken(onSuccess, onError);
  }));
}

function checkNotification(messageData) {
  switch (messageData.type) {
    case 'process':
      store.dispatch('setMyOrder', messageData.order);
      store.dispatch('setType', 'process');
      router.push({ name: 'executorMoreInfo' });
      break;
    case 'response':
      store.dispatch('setMyOrder', messageData.order);
      store.dispatch('setType', 'await');
      router.push({ name: 'customerMoreInfo' });
      break;
    case 'chat':
      store.dispatch('setIdUserRequest', messageData.idUserRequest);
      router.push({ name: 'chat' });
      break;
    default:
      break;
  }
}

function notificationListener() {
  if (!window.FirebasePlugin) {
    return;
  }

  window.FirebasePlugin.onMessageReceived((message) => {
    logger.log(JSON.stringify(message));

    const rawMessageData = decodeURIComponent(escape(atob(message.data)));
    logger.log(JSON.stringify(rawMessageData));

    const messageData = JSON.parse(rawMessageData);
    logger.log(JSON.stringify(messageData));

    if (message.messageType === 'notification') {
      if (message.tap === 'background') {
        checkNotification(messageData);
      } else {
        cordova.plugins.notification.local.schedule({
          title: message.title,
          text: message.body,
          foreground: true,
          data: messageData,
        });
      }
    }
  }, (error) => {
    logger.error(error);
  });
}

function onDeviceReady() {
  logger.log('onDeviceReady');

  cordova.plugins.notification.local.on('click', (notification) => {
    logger.log(JSON.stringify(notification));
    checkNotification(notification.data);
  }, { });

  const deepLinks = new DeepLinks();
  deepLinks.subscribeAll();

  getStorage();
  getToken()
    .then((token) => {
      logger.log(token);
      store.dispatch('setAppToken', token);
      logger.log(token);
    })
    .catch((error) => {
      logger.log(error);
    });
  notificationListener();

  // SocialVk.init('7665832'); // APP ID только цифры
  // SocialVk.login(['offline'], (value) => {
  // eslint-disable-next-line max-len
  //  console.log(JSON.stringify(value)); // value - вернет JSON с token и user (информация аккаунта)
  // });

  navigator.splashscreen.hide();
}

function listen() {
  document.addEventListener('deviceready', onDeviceReady);
}

export default {
  listen,
  getToken,
};
