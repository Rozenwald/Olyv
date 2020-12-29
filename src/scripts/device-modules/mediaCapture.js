import merge from 'lodash.merge';

function mergeOptions(defaultOptions, innerOptions) {
  let options = { ...defaultOptions };
  options = merge(options, innerOptions);

  return options;
}

const defaultVideoOptions = {
  limit: 1,
  duration: 180,
};

function captureVideo(innerOptions) {
  if (window.cordova.platformId === 'browser') return null;

  const options = mergeOptions(defaultVideoOptions, innerOptions);

  return new Promise((onSuccess, onError) => {
    navigator.device.capture.captureVideo(onSuccess, onError, options);
  });
}

export default {
  captureVideo,
};
