import store from '../store/index';
import router from '../router/index';

const cordova = {};

function getToken() {
  window.FirebasePlugin.getToken((token) => {
    store.dispatch('setAppToken', token);
  }, (error) => {
    console.log(JSON.stringify(error));
  });
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

  getToken();
  notificationListener();
}

cordova.listen = () => {
  document.addEventListener('deviceready', onDeviceReady);
};

export default cordova;
