import store from '../store/index';
import router from '../router/index';
import nativeStorage from '../scripts/nativeStorage';

function getStorageItem(key, action) {
  nativeStorage.getItem(key)
    .then((item) => {
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
    if (message.messageType === 'notification') {
      if (message.tap) {
        console.log(message.type);
        checkNotification(message);
      }
    }
  }, (error) => {
    console.error(error);
  });
}

function onDeviceReady() {
  console.log('onDeviceReady');

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

  navigator.splashscreen.hide();
}

function listen() {
  document.addEventListener('deviceready', onDeviceReady);
}

export default {
  listen,
  getToken,
};
