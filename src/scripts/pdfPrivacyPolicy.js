import axios from 'axios';
import logger from './logger';
import file from './device-modules/file';

function writeFile(fileEntry, dataObj) {
  fileEntry.createWriter((fileWriter) => {
    // eslint-disable-next-line no-param-reassign
    fileWriter.onwriteend = () => {
      logger.log('Success save file');
      logger.log(fileEntry);
      logger.log(dataObj);

      // eslint-disable-next-line no-undef
      cordova.plugins.fileOpener2.open(fileEntry.nativeURL, 'application/pdf');
    };

    // eslint-disable-next-line no-param-reassign
    fileWriter.onerror = (error) => {
      logger.log('Failed save file');
      logger.log(error);
    };

    fileWriter.write(dataObj);
  });
}

function downloadPdf(dirEntry) {
  axios
    .get(`${window.$baseUrlNoPort}static/ect/rules.pdf`, { responseType: 'blob' })
    .then((response) => {
      logger.log(response.data);

      file.getDirFile(dirEntry, 'privacyPolicy.pdf')
        .then((fileEntry) => {
          logger.log(fileEntry);

          writeFile(fileEntry, response.data);
        });
    })
    .catch((error) => { logger.log(error); });
}

function getPdf() {
  file.getTemporaryFile()
    .then((fileSystem) => {
      logger.log(fileSystem);

      downloadPdf(fileSystem.root);
    });
}

export default {
  getPdf,
};
