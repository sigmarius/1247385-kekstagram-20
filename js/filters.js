'use strict';

// Применяет выбранный эффект к загруженному фото, настраивает уровень эффекта

(function () {

  var FILTERS = [
    {name: 'none', filter: 'none'},
    {name: 'chrome', filter: 'grayscale', minValue: 0, maxValue: 1},
    {name: 'sepia', filter: 'sepia', minValue: 0, maxValue: 1},
    {name: 'marvin', filter: 'invert', minValue: 0, maxValue: 100},
    {name: 'phobos', filter: 'blur', minValue: 0, maxValue: 3},
    {name: 'heat', filter: 'brightness', minValue: 0, maxValue: 3}
  ];

  var imageUploadForm = document.querySelector('#upload-select-image');
  var previewPhoto = imageUploadForm.querySelector('.img-upload__preview img');

  var effectLevel = imageUploadForm.querySelector('.effect-level'); // блок со слайдером
  var levelValueInput = effectLevel.querySelector('.effect-level__value');
  var effectsList = imageUploadForm.querySelector('.effects__list'); // список эффектов

  var selectedEffect; // сохраняет эффект, выбранный в списке эффектов при наступлении события change

  var getDefaultEffect = function () {
    effectLevel.style.display = 'none';
    previewPhoto.style.filter = FILTERS[0].filter;
    previewPhoto.classList = '';
    document.querySelector('.effects__list').children[0].children[0].checked = true;
  };

  var setEffect = function (evt) {
    previewPhoto.classList = '';
    previewPhoto.classList.add('effects__preview--' + evt.target.value);
    previewPhoto.style = '';
    selectedEffect = evt.target.value;

    if (evt.target.value !== 'none') {
      effectLevel.style.display = 'block';
      window.move.getDefaultPosition();

      window.move.stopMove();
      window.move.initMove();
    } else {
      effectLevel.style.display = 'none';
    }

    return selectedEffect;
  };

  var setEffectLevel = function () {
    for (var i = 0; i < FILTERS.length; i++) {
      if (selectedEffect === FILTERS[i].name) {
        switch (selectedEffect) {
          case 'marvin' :
            previewPhoto.style.filter = 'none';
            previewPhoto.style.filter = FILTERS[i].filter + '(' + levelValueInput.value * FILTERS[i].maxValue / 100 + '%)';
            break;
          case 'phobos' :
            previewPhoto.style.filter = 'none';
            previewPhoto.style.filter = FILTERS[i].filter + '(' + levelValueInput.value * FILTERS[i].maxValue / 100 + 'px)';
            break;
          case 'none' :
            previewPhoto.style.filter = FILTERS[i].filter;
            break;
          default :
            previewPhoto.style.filter = 'none';
            previewPhoto.style.filter = FILTERS[i].filter + '(' + levelValueInput.value * FILTERS[i].maxValue / 100 + ')';
            break;
        }
      }
    }
  };

  var setEffectHandler = function () {
    effectsList.addEventListener('change', setEffect);
  };

  var removeEffectHandler = function () {
    effectsList.removeEventListener('change', setEffect);
  };

  window.filters = {
    setEffectHandler: setEffectHandler,
    removeEffectHandler: removeEffectHandler,
    setEffectLevel: setEffectLevel,
    getDefaultEffect: getDefaultEffect
  };

})();
