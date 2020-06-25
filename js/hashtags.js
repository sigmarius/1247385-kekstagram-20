'use strict';

// Проверяет валидность хэштегов, экспортирует функцию установки обработчика на событие input для формы

(function () {

  var REG_HASHTAGS = /^(#[a-zA-Zа-яА-Я0-9]{1,19})(\s(#[a-zA-Zа-яА-Я0-9]{1,19})){0,4}$/;

  var imageUploadForm = document.querySelector('#upload-select-image');
  var textHashtags = imageUploadForm.querySelector('.text__hashtags');

  var validateHashtags = function () {
    var error = '';

    if (!REG_HASHTAGS.test(textHashtags.value)) {
      error = 'Хэш-тег начинается с символа #. Строка после решётки должна состоять только из букв и чисел. Длина хэштега от 2 до 20 символов. Количество хэштегов не более 5';
      imageUploadForm.reportValidity();
    } else {
      var tags = textHashtags.value.split(' ');
      for (var i = 0; i < tags.length - 1; i++) {
        for (var j = i + 1; j < tags.length; j++) {
          if (tags[i] === tags[j]) {
            error = 'Есть одинаковые элементы! Проверьте хэштеги ' + (i + 1) + ' и ' + (j + 1);
            imageUploadForm.reportValidity();
          } else {
            error = '';
          }
        }
      }
    }
    return textHashtags.setCustomValidity(error);
  };

  var setHashtagsHandler = function () {
    textHashtags.addEventListener('input', validateHashtags);
  };

  window.hashtags = {
    setHashtagsHandler: setHashtagsHandler
  };

})();

