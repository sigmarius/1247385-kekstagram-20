'use strict';

// открытие и закрытие модального окна редактирования эффектов

(function () {

  var imageUploadForm = document.querySelector('#upload-select-image');
  var editImageSection = imageUploadForm.querySelector('.img-upload__overlay');
  var loadImageButton = imageUploadForm.querySelector('#upload-file');
  var closeFormButton = imageUploadForm.querySelector('#upload-cancel');

  var effectLevel = imageUploadForm.querySelector('.effect-level'); // блок со слайдером
  var textHashtags = imageUploadForm.querySelector('.text__hashtags');
  var commentsArea = imageUploadForm.querySelector('.text__description');

  var setVisible = function (visible) {
    if (visible) {
      editImageSection.classList.remove('hidden');
      effectLevel.style.display = 'none';
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', escapeClickHandler);
    } else {
      editImageSection.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', escapeClickHandler);
      loadImageButton.value = '';
    }
  };

  var escapeClickHandler = function (evt) {
    if (evt.key === window.utils.KeyCode.ESCAPE
        && evt.target !== textHashtags
        && evt.target !== commentsArea) {
      evt.preventDefault();
      setVisible(false);
    }
  };

  var setLoadImageHandler = function (handler) {
    loadImageButton.addEventListener('change', handler);
  };

  var getSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content;
    var main = document.querySelector('main');
    var successMessage = successTemplate.cloneNode(true);

    var successSection = successMessage.querySelector('.success');
    var successWindow = successMessage.querySelector('.success__inner');
    var successButton = successMessage.querySelector('.success__button');

    main.appendChild(successMessage);

    var closeHandler = function () {
      successSection.removeEventListener('click', closeHandler);
      main.removeChild(successSection);
    };

    successSection.addEventListener('click', function (evt) {
      if (evt.target !== successWindow) {
        closeHandler();
      }
    });

    successButton.addEventListener('click', closeHandler);
  };

  var successSaveHandler = function () {
    textHashtags.value = '';
    commentsArea.value = '';
    setVisible(false);
    getSuccessMessage();
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(imageUploadForm), successSaveHandler, window.message.showError);
    evt.preventDefault();
  };

  imageUploadForm.addEventListener('submit', formSubmitHandler);

  var setCloseHandler = function (handler) {
    closeFormButton.addEventListener('click', handler);
  };

  window.form = {
    setLoadImageHandler: setLoadImageHandler,
    setCloseHandler: setCloseHandler,
    setVisible: setVisible
  };

})();
