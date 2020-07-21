'use strict';

// загрузка пользовательского изображения

(function () {

  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var preview = document.querySelector('.img-upload__preview img');
  var fileInput = document.querySelector('#upload-file');

  var previewChangeHandler = function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var extensionMatch = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (extensionMatch) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  fileInput.addEventListener('change', previewChangeHandler);

})();
