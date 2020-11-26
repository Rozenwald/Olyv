/* eslint-disable no-undef */

import merge from 'lodash.merge';

function mergeOptions(innerOptions) {
  const defaultOptions = {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    allowEdit: false,
    correctOrientation: true,
    saveToPhotoAlbum: true,
  };

  let options = { ...defaultOptions };
  options = merge(options, innerOptions);

  return options;
}

function open(innerOptions) {
  if (window.cordova.platformId === 'browser') return null;

  const options = mergeOptions(innerOptions);

  return new Promise((onSuccess, onError) => {
    navigator.camera.getPicture(onSuccess, onError, options);
  });
}

export default {
  open,
};
