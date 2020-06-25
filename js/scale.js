'use strict';

// редактирование масштаба изображения в модальном окне Формы

(function () {

  var ScaleProperty = {
    SCALE_MIN: 25,
    SCALE_MAX: 100,
    SCALE_STEP: 25,
  };

  var imageUploadForm = document.querySelector('#upload-select-image');
  var previewPhoto = imageUploadForm.querySelector('.img-upload__preview img');

  var scaleBlock = imageUploadForm.querySelector('.img-upload__scale');
  var scaleValueInput = imageUploadForm.querySelector('.scale__control--value');
  var scaleSmaller = imageUploadForm.querySelector('.scale__control--smaller');
  var scaleBigger = imageUploadForm.querySelector('.scale__control--bigger');

  var setImageScale = function (evt) {
    var scaleValue = parseInt(scaleValueInput.value, 10);
    switch (evt.target) {
      case scaleSmaller :
        if (scaleValue !== ScaleProperty.SCALE_MIN) {
          scaleValue -= ScaleProperty.SCALE_STEP;
        }
        break;
      case scaleBigger :
        if (scaleValue !== ScaleProperty.SCALE_MAX) {
          scaleValue += ScaleProperty.SCALE_STEP;
        }
        break;
    }
    scaleValueInput.value = scaleValue + '%';
    previewPhoto.style.transform = 'scale(' + scaleValue / 100 + ')';
  };

  var setScaleHandler = function () {
    scaleBlock.addEventListener('click', setImageScale);
  };

  window.scale = {
    setScaleHandler: setScaleHandler
  };

})();
