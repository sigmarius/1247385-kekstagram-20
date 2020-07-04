'use strict';

// точка входа
(function () {

  window.backend.load(window.gallery.renderPhotos, window.gallery.errorHandler);

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
