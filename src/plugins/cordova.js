const cordova = {};

function onDeviceReady() {
  console.log('deviceready');
  cordova.firebasePlugin = window.FirebasePlugin;
  cordova.cordovaPlugin = window.cordova;
}

document.addEventListener('deviceready', onDeviceReady);

export default cordova;
