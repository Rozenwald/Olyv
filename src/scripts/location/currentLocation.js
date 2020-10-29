import store from '../../store/index';
import getInfoAboutLocation from '../dadata/dadataRevertGeolocate';

function onSuccess(position) {
  store.dispatch('setCurrentPosition', {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  });
  getInfoAboutLocation({
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  });
}

function onError(error) {
  console.log(error);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

export default getCurrentPosition;
