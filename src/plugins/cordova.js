/* eslint-disable no-undef */
import store from '../store/index';
import router from '../router/index';
import nativeStorage from '../scripts/nativeStorage';

function getStorageItem(key, action) {
  nativeStorage.getItem(key)
    .then((item) => {
      console.log(item);
      store.dispatch(action, item);
    })
    .catch((error) => {
      console.log(error);
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

function checkNotification(message) {
  const data = JSON.parse(message.data);
  switch (message.type) {
    case 'order':
      store.dispatch('setMyOrder', data);
      store.dispatch('setType', 'all');
      router.replace('executorMoreInfo');
      break;
    case 'chat':
      store.dispatch('setIdUserRequest', data.idUserRequest);
      router.replace('chat');
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
    console.log(JSON.stringify(message));
    if (message.messageType === 'notification') {
      if (message.tap) {
        console.log(message.type);
        checkNotification(message);
      } else {
        cordova.plugins.notification.local.schedule({
          title: message.title,
          text: message.body,
          foreground: true,
        });
      }
    }
  }, (error) => {
    console.error(error);
  });
}

function onDeviceReady() {
  console.log('onDeviceReady');
  cordova.plugins.notification.local.on('click', (notification) => { console.log(JSON.stringify(notification)); }, { });

  getStorage();
  getToken()
    .then((token) => {
      console.log(token);
      store.dispatch('setAppToken', token);
      console.log(token);
    })
    .catch((error) => {
      console.log(error);
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
