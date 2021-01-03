/* eslint-disable max-len */
import file from '../device-modules/file';
import logger from '../logger';

let requestCount = 0;

function requestAuthorization() {
  // eslint-disable-next-line no-use-before-define
  window.cordova.plugins.diagnostic.requestExternalStorageAuthorization(evaluateAuthorization, onError);
}

function checkStorageAuthorization() {
  requestCount = 0;

  if (window.cordova.platformId === 'browser') {
    return;
  }

  if (!window.cordova.plugins) {
    return;
  }

  if (!window.cordova.plugins.diagnostic) {
    return;
  }

  // eslint-disable-next-line no-use-before-define
  window.cordova.plugins.diagnostic.getExternalStorageAuthorizationStatus(evaluateAuthorization, onError);
}

function grantedPermissions() {
  file.isStorageEnabled()
    .then((enabled) => {
      if (!enabled) {
        navigator.notification.confirm(
          'Для корректной работы сервиса мы рекомендуем включить доступ к памяти устройства',
          (i) => {
            if (i === 1) {
              window.cordova.plugins.diagnostic.switchToSettings();
            }
          }, 'Доступ к памяти устройства', ['Ок', 'Отмена'],
        );
      }
    })
    .catch((error) => {
      logger.log(error);
    });
}

function evaluateAuthorization(status) {
  logger.log(status);
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
      navigator.notification.confirm(
        'Для корректной работы сервиса мы рекомендуем включить доступ к памяти устройства',
        (i) => {
          if (i === 1) {
            window.cordova.plugins.diagnostic.switchToSettings();
          }
        }, 'Доступ к памяти устройства', ['Ок', 'Отмена'],
      );
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.GRANTED:
      grantedPermissions();
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
      grantedPermissions();
      break;
    default:
      logger.log(status);
      break;
  }
}

function onError(error) {
  logger.log(error);
}

export default {
  checkStorageAuthorization,
};
