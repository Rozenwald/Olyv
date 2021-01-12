function log(message) {
  if (window.cordova.platformId === 'browser') {
    console.log(message);
    return null;
  }

  if (window.cordova.platformId === 'android') {
    console.log(JSON.stringify(message));
    console.log(message);
    return null;
  }

  return null;
}

export default {
  log,
};
