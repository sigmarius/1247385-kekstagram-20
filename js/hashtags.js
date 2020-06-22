'use strict';

// Проверяет валидность хэштегов, экспортирует функцию удаления обработчиков для модуля закрытия модального окна form-modal.js

(function () {

  var REG_HASHTAGS = /^(#[a-zA-Zа-яА-Я0-9]{2,20})(\s(#[a-zA-Zа-яА-Я0-9]{2,20})){0,4}$/;

  var imageUploadForm = document.querySelector('#upload-select-image');
  var textHashtags = imageUploadForm.querySelector('.text__hashtags');

  var hashtagsChangeHandler = function () {
    if (!REG_HASHTAGS.test(textHashtags.value)) {
      textHashtags.setCustomValidity('Хэш-тег начинается с символа #. Строка после решётки должна состоять только из букв и чисел. Длина хэштега от 2 до 20 символов. Количество хэштегов не более 5');
      imageUploadForm.reportValidity();
    } else {
      textHashtags.setCustomValidity('');
      var tags = textHashtags.value.split(' ');
      for (var i = 0; i < tags.length - 1; i++) {
        for (var j = i + 1; j < tags.length; j++) {
          if (tags[i] === tags[j]) {
            textHashtags.setCustomValidity('Есть одинаковые элементы! Проверьте хэштеги ' + (i + 1) + ' и ' + (j + 1));
            imageUploadForm.reportValidity();
          } else {
            textHashtags.setCustomValidity('');
          }
        }
      }
    }
  };

  var formValidityHandler = function (evt) {
    if (!imageUploadForm.reportValidity()) {
      evt.preventDefault();
      imageUploadForm.reportValidity();
    } else {
      textHashtags.removeEventListener('input', hashtagsChangeHandler);
    }
  };

  textHashtags.addEventListener('input', hashtagsChangeHandler);
  imageUploadForm.addEventListener('submit', formValidityHandler);

  window.hashtags = {
    removeListeners: function () {
      textHashtags.removeEventListener('input', hashtagsChangeHandler);
      imageUploadForm.removeEventListener('submit', formValidityHandler);
    },
  };

})();

