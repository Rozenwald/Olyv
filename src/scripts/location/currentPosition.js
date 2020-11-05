function getCurrentPosition() {
  return new Promise(((onSuccess, onError) => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }));
}

export default {
  getCurrentPosition,
};
