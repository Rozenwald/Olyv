function isLocationEnabled() {
  return new Promise((onSuccess, onError) => {
    window.cordova.plugins.diagnostic.isLocationEnabled(onSuccess, onError);
  });
}

export default {
  isLocationEnabled,
};
