'use strict';

// module3-task3 показывает превью для Первой фотографии из массива сгенерированных объектов photos

(function () {

  var bigPhotoBlock = document.querySelector('.big-picture');
  var bigPhoto = bigPhotoBlock.querySelector('.big-picture__img img');
  var closeButton = document.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');

  var renderBigPhoto = function (photoObject) {
    bigPhoto.src = photoObject.url;
    bigPhoto.alt = photoObject.description;

    bigPhotoBlock.querySelector('.likes-count').textContent = photoObject.likes;
    bigPhotoBlock.querySelector('.comments-count').textContent = photoObject.comments.length;
    bigPhotoBlock.querySelector('.social__caption').textContent = photoObject.description;

    bigPhotoBlock.querySelector('.social__comment-count').classList.add('hidden');
    bigPhotoBlock.querySelector('.comments-loader').classList.add('hidden');

    window.domUtils.removeChildren(document.querySelectorAll('.social__comment'));
    window.comments.renderComments(photoObject.comments);

    setVisible(true);
  };

  var escapeKeyHandler = function (evt) {
    if (evt.key === window.utils.KeyCode.ESCAPE) {
      evt.preventDefault();
      setVisible(false);
    }
  };

  var setVisible = function (visible) {
    if (visible) {
      bigPhotoBlock.classList.remove('hidden');
      body.classList.add('modal-open');
      document.addEventListener('keydown', escapeKeyHandler);
    } else {
      bigPhotoBlock.classList.add('hidden');
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', escapeKeyHandler);
      window.comments.removeCommentsListener();
    }
  };

  var setThumbnailClickHandler = function (photos) {
    var pictureLinks = document.querySelectorAll('.picture');

    var addPictureClickHandler = function (picture, photo) {
      picture.addEventListener('click', function () {
        renderBigPhoto(photo);
        // сохраняет выбранную фотографию для подгрузки комментариев
        window.preview.selectedPhoto = photo;
      });
    };

    for (var i = 0; i < pictureLinks.length; i++) {
      addPictureClickHandler(pictureLinks[i], photos[i]);
    }

    closeButton.addEventListener('click', function () {
      setVisible(false);
    });
  };

  window.preview = {
    setThumbnailClickHandler: setThumbnailClickHandler
  };

})();
