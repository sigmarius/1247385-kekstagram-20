'use strict';

// module3-task3 показывает превью для Первой фотографии из массива сгенерированных объектов photos

(function () {

  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;

  var photo = window.data.photos[0];
  var bigPhotoBlock = document.querySelector('.big-picture');
  var bigPhoto = bigPhotoBlock.querySelector('.big-picture__img img');

  var createElementWithClass = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);

    return element;
  };

  var removeChildren = function (container) {
    for (var i = 0; i < container.length; i++) {
      container[i].remove();
    }
  };

  var renderComments = function (comments) {
    removeChildren(document.querySelectorAll('.social__comment'));

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var commentItem = createElementWithClass('li', 'social__comment');

      var avatar = createElementWithClass('img', 'social__picture');
      avatar.src = comments[i].avatar;
      avatar.alt = comments[i].name;
      avatar.width = AVATAR_WIDTH;
      avatar.heigth = AVATAR_HEIGHT;
      commentItem.appendChild(avatar);

      var commentText = createElementWithClass('p', 'social__text');
      commentText.textContent = comments[i].message;
      commentItem.appendChild(commentText);

      fragment.appendChild(commentItem);
    }
    return fragment;
  };

  var renderBigPhoto = function (photoBig, photoObject) {
    photoBig.src = photoObject.url;
    photoBig.alt = photoObject.description;

    bigPhotoBlock.querySelector('.likes-count').textContent = photoObject.likes;
    bigPhotoBlock.querySelector('.comments-count').textContent = photoObject.comments.length;
    bigPhotoBlock.querySelector('.social__caption').textContent = photoObject.description;

    bigPhotoBlock.querySelector('.social__comment-count').classList.add('hidden');
    bigPhotoBlock.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');

    var commentsList = bigPhotoBlock.querySelector('.social__comments');
    commentsList.appendChild(renderComments(photoObject.comments));
  };

  // bigPhotoBlock.classList.remove('hidden'); // временно, чтобы не мешало пока
  renderBigPhoto(bigPhoto, photo);

})();
