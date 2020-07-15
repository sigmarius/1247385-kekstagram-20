'use strict';

// точка входа
(function () {

  var successLoadHandler = function (data) {
    // отображает фильтры на главной странице при успешной загрузке
    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');

    window.renderPhotos(data);
    window.photos = data; // массив фотографий с сервера
  };

  window.backend.load(successLoadHandler, window.message.showError);

  window.setSortHandler();

  window.form.setLoadImageHandler(function () {
    window.form.setVisible(true);
  });

  window.form.setCloseHandler(function () {
    window.form.setVisible(false);
  });

  window.hashtags.setHashtagsHandler();

  window.filters.setEffectHandler();

  window.filters.setEffectLevelHandler(function () {
    window.filters.setEffectLevel(window.filters.selectedEffect);
  });

  window.scale.setScaleHandler();

})();
