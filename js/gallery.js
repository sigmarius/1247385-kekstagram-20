'use strict';

// отрисовывает данные из модуля data.js на странице

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

  var renderPhotos = function (arrPhotos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrPhotos.length; i++) {
      fragment.appendChild(renderOnePhoto(arrPhotos[i]));
    }
    userPhotos.appendChild(fragment);
    window.gallery.photos = arrPhotos;
  };

  var errorHandler = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'position: absolute; top: 0; left: 0; right: 0; z-index: 10; margin: 0 auto; padding: 50px; font-size: 2em; text-align: center; background-color: rgba(255, 0, 0, 0.9);';
    message.textContent = errorMessage;
    document.body.appendChild(message);
  };

  window.gallery = {
    renderPhotos: renderPhotos,
    errorHandler: errorHandler
  };

})();
