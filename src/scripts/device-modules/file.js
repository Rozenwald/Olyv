// @return FileEntry
function getSystemFile(fileUrl) {
  return new Promise((onSuccess, onError) => {
    window.resolveLocalFileSystemURL(fileUrl, onSuccess, onError);
  });
}

// @return File
function getFile(fileEntry) {
  return new Promise((onSuccess, onError) => {
    fileEntry.file(onSuccess, onError);
  });
}

function dataURLtoBlob(dataUrl) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n) {
    n -= 1;
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

export default {
  getSystemFile,
  getFile,
  dataURLtoBlob,
};
