'use strict';

// точка входа
(function () {

  var successLoadHandler = function (data) {
    // отображает фильтры на главной странице при успешной загрузке
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');

    window.renderPhotos(data);
    window.photos = data; // массив фотографий с сервера

    // полноразмерный просмотр изображения на главной странице
    window.preview.setThumbnailClickHandler(window.photos);
  };

  window.backend.load(successLoadHandler, window.message.showLoadError);

  window.setSortHandler();

  window.form.setLoadImageHandler(function () {
    window.form.setVisible(true);
  });

  window.form.setCloseHandler(function () {
    window.form.setVisible(false);
  });

  window.hashtags.setHashtagsHandler();

  window.scale.setScaleHandler();

})();
