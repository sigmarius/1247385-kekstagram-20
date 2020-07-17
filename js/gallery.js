'use strict';

// отрисовывает данные на странице

(function () {

  var photoTemplate = document.querySelector('#picture').content;
  var userPhotos = document.querySelector('.pictures');

  var renderOnePhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  window.renderPhotos = function (arrPhotos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrPhotos.length; i++) {
      fragment.appendChild(renderOnePhoto(arrPhotos[i]));
    }
    userPhotos.appendChild(fragment);
  };

})();
