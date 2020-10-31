import currentPosition from './location/currentPosition';
import store from '../store/index';
import positionInfo from './dadata/positionInfo';
import dataParse from './dadata/dataParse';

let requestCount = 0;

async function getPositionData(lat, lon) {
  const response = await positionInfo.getData({ lat, lon });
  const data = response.data.suggestions[0] || null;
  const result = dataParse.parse(data);
  result.lat = lat;
  result.lon = lon;
  store.dispatch('setCurrentPosition', result);
}

function requestAuthorization() {
  // eslint-disable-next-line no-use-before-define
  window.cordova.plugins.diagnostic.requestLocationAuthorization(evaluateAuthorization, onError);
}

function checkLocationAuthorization(count) {
  requestCount = count;

  if (window.cordova.platformId === 'browser') {
    currentPosition.getCurrentPosition()
      .then((position) => {
        getPositionData(position.coords.latitude, position.coords.longitude);
      })
      .catch((error) => {
        console.error(error.message);
      });

    return;
  }

  if (!window.cordova.plugins) {
    return;
  }

  if (!window.cordova.plugins.diagnostic) {
    return;
  }

  // eslint-disable-next-line no-use-before-define
  window.cordova.plugins.diagnostic.getLocationAuthorizationStatus(evaluateAuthorization, onError);
}

function evaluateAuthorization(status) {
  switch (status) {
    case window.cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
      requestAuthorization();
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
      if (!requestCount) {
        requestAuthorization();
        requestCount += 1;
      }
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.DENIED:
      if (!requestCount) {
        requestAuthorization();
        requestCount += 1;
      }
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
      navigator.notification.confirm(
        'This app has been denied access to your location and it really needs it function properly. Would you like to switch to the app settings page to allow access?',
        (i) => {
          if (i === 1) {
            window.cordova.plugins.diagnostic.switchToSettings();
          }
        }, 'Location access denied', ['Yes', 'No'],
      );
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.GRANTED:
      currentPosition.getCurrentPosition()
        .then((position) => {
          getPositionData(position.coords.latitude, position.coords.longitude);
        })
        .catch((error) => {
          console.error(error.message);
        });
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
      currentPosition.getCurrentPosition()
        .then((position) => {
          getPositionData(position.coords.latitude, position.coords.longitude);
        })
        .catch((error) => {
          console.error(error.message);
        });
      break;
    default:
      console.log(status);
      break;
  }
}

function onError(error) {
  console.log(error);
}

export default {
  checkLocationAuthorization,
};
