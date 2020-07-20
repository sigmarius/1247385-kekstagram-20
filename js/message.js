'use strict';

// сообщения пользователям

(function () {

  var main = document.querySelector('main');
  var area; // хранит тип области вызываевого сообщения - Success/Error

  var showLoadError = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'position: absolute; top: 0; left: 0; right: 0; z-index: 10; margin: 0 auto; padding: 50px; font-size: 2em; text-align: center; background-color: rgba(255, 0, 0, 0.9);';
    message.textContent = errorMessage;
    document.body.appendChild(message);
  };

  var escapeClickHandler = function (evt) {
    if (evt.key === window.utils.KeyCode.ESCAPE) {
      evt.preventDefault();
      closeHandler(area);
    }
  };

  var closeHandler = function (section) {
    main.removeChild(section);

    section.removeEventListener('click', closeHandler);
    document.removeEventListener('keydown', escapeClickHandler);
  };

  var showSuccess = function () {
    var successTemplate = document.querySelector('#success').content;
    var successMessage = successTemplate.cloneNode(true);

    var successSection = successMessage.querySelector('.success');
    var successWindow = successMessage.querySelector('.success__inner');
    var successButton = successMessage.querySelector('.success__button');

    main.appendChild(successMessage);
    area = successSection;

    successSection.addEventListener('click', function (evt) {
      if (evt.target !== successWindow || evt.target === successButton) {
        closeHandler(successSection);
      }
    });
    document.addEventListener('keydown', escapeClickHandler);
  };

  var showSaveError = function () {
    var errorTemplate = document.querySelector('#error').content;
    var errorMessage = errorTemplate.cloneNode(true);

    var errorSection = errorMessage.querySelector('.error');
    var errorWindow = errorMessage.querySelector('.error__inner');
    var errorButton = errorMessage.querySelector('.error__button');

    main.appendChild(errorMessage);
    area = errorSection;

    errorSection.addEventListener('click', function (evt) {
      if (evt.target !== errorWindow || evt.target === errorButton) {
        closeHandler(errorSection);
      }
    });
    document.addEventListener('keydown', escapeClickHandler);
  };

  window.message = {
    showSuccess: showSuccess,
    showSaveError: showSaveError,
    showLoadError: showLoadError
  };

})();
