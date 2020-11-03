function setSuccess(item) {
  console.log(`Success set item: ${JSON.stringify(item)}`);
}

function onError(error) {
  console.log(JSON.stringify(error));
}

function setItem(key, value) {
  window.NativeStorage.setItem(key, value, setSuccess, onError);
}

function getItem(key) {
  return new Promise(((success, error) => {
    window.NativeStorage.getItem(key, success, error);
  }));
}

export default {
  setItem,
  getItem,
};
