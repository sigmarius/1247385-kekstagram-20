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

  var toggleFormHandler = function (openForm) {
    if (openForm) {
      editImageSection.classList.remove('hidden');
      effectLevel.style.display = 'none';
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', escapeClickHandler);
    } else {
      editImageSection.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', escapeClickHandler);
      loadImageButton.value = '';
      window.hashtags.removeListeners();
    }
  };

  var escapeClickHandler = function (evt) {
    if (evt.key === window.main.KeyCode.ESCAPE && evt.target !== textHashtags && evt.target !== commentsArea) {
      evt.preventDefault();
      toggleFormHandler(false);
    }
  };

  loadImageButton.addEventListener('change', function () {
    toggleFormHandler(true);
  });

  closeFormButton.addEventListener('click', function () {
    toggleFormHandler(false);
  });

})();
