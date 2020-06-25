'use strict';

// точка входа
(function () {

  var userPhotos = document.querySelector('.pictures');

  var photos = window.data.generatePhotos();
  userPhotos.appendChild(window.gallery.renderPhotos(photos));

  window.bigPhoto.renderBigPhoto(photos[0]);

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
