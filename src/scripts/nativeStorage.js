function setSuccess(item) {
  console.log(`Success set item: ${JSON.stringify(item)}`);
}

function setRemove(item) {
  console.log(`Success remove item: ${JSON.stringify(item)}`);
}

function setClear() {
  console.log('clear All');
}

function onError(error) {
  console.log(JSON.stringify(error));
}

function setItem(key, value) {
  window.NativeStorage.setItem(key, value, setSuccess, onError);
}

function removeItem(key) {
  window.NativeStorage.remove(key, setRemove, setRemove);
}

function clear() {
  window.NativeStorage.clear(setClear, onError);
}

function getItem(key) {
  return new Promise(((success, error) => {
    window.NativeStorage.getItem(key, success, error);
  }));
}

export default {
  setItem,
  getItem,
  removeItem,
  clear,
};
