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
      imageUploadForm.addEventListener('submit', formSubmitHandler);
      window.filters.setEffectHandler();
    } else {
      editImageSection.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', escapeClickHandler);
      loadImageButton.value = '';
      window.filters.getDefaultEffect();
      window.filters.removeEffectHandler();
      imageUploadForm.removeEventListener('submit', formSubmitHandler);
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

  var successSaveHandler = function () {
    textHashtags.value = '';
    commentsArea.value = '';
    setVisible(false);
    window.message.showSuccess();
  };

  var errorSaveHandler = function () {
    setVisible(false);
    window.message.showSaveError();
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(imageUploadForm), successSaveHandler, errorSaveHandler);
    evt.preventDefault();
  };


  var setCloseHandler = function (handler) {
    closeFormButton.addEventListener('click', handler);
  };

  window.form = {
    setLoadImageHandler: setLoadImageHandler,
    setCloseHandler: setCloseHandler,
    setVisible: setVisible
  };

})();
