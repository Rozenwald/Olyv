let deniedCount = 0;

function requestAuthorization() {
  // eslint-disable-next-line no-use-before-define
  window.cordova.plugins.diagnostic.requestLocationAuthorization(evaluateAuthorization, onError);
}

function checkAuthorization() {
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
      if (deniedCount === 0) {
        deniedCount += 1;
        requestAuthorization();
      }
      break;
    case window.cordova.plugins.diagnostic.permissionStatus.DENIED:
      if (deniedCount === 0) {
        deniedCount += 1;
        requestAuthorization();
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
    default:
      console.log(status);
      break;
  }
}

function onError(error) {
  console.log(error);
}

export default checkAuthorization;
