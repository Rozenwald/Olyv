/* eslint-disable no-undef */
import store from '../store/index';
import router from '../router/index';
import logger from '../scripts/logger';
import nativeStorage from '../scripts/nativeStorage';

function getStorageItem(key, action) {
  nativeStorage.getItem(key)
    .then((item) => {
      logger.log(item);
      store.dispatch(action, item);
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
      router.replace({ name: 'executorMoreInfo' });
      break;
    case 'response':
      store.dispatch('setMyOrder', messageData.order);
      store.dispatch('setType', 'await');
      router.replace({ name: 'customerMoreInfo' });
      break;
    case 'chat':
      store.dispatch('setIdUserRequest', messageData.idUserRequest);
      router.replace({ name: 'chat' });
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
