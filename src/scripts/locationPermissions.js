import currentPosition from './location/currentPosition';
import store from '../store/index';
import positionInfo from './dadata/positionInfo';
import dataParse from './dadata/dataParse';
import location from './device-modules/location';

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

function grantedPermissions() {
  location.isLocationEnabled()
    .then((enabled) => {
      if (!enabled) {
        navigator.notification.confirm(
          'Для корректной работы сервиса поиска адресов и использования собственного местоположения мы рекомендуем включить доступ к геоданным',
          (i) => {
            if (i === 1) {
              window.cordova.plugins.diagnostic.switchToLocationSettings();
            }
          }, 'Доступ к геоданным', ['Ок', 'Отмена'],
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });

  currentPosition.getCurrentPosition()
    .then((position) => {
      getPositionData(position.coords.latitude, position.coords.longitude);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function evaluateAuthorization(status) {
  switch (status) {
    case window.cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
      requestAuthorization();
      requestCount += 1;
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
      if (!requestCount) {
        navigator.notification.confirm(
          'Для корректной работы сервиса поиска адресов и использования собственного местоположения мы рекомендуем включить доступ к геоданным',
          (i) => {
            if (i === 1) {
              window.cordova.plugins.diagnostic.switchToLocationSettings();
            }
          }, 'Доступ к геоданным', ['Ок', 'Отмена'],
        );

        requestCount += 1;
      }
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.GRANTED:
      grantedPermissions();
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
      grantedPermissions();
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
