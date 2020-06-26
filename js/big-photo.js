'use strict';

// module3-task3 показывает превью для Первой фотографии из массива сгенерированных объектов photos

(function () {

  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;

  var bigPhotoBlock = document.querySelector('.big-picture');
  var bigPhoto = bigPhotoBlock.querySelector('.big-picture__img img');

  var renderComments = function (comments) {
    window.domUtils.removeChildren(document.querySelectorAll('.social__comment'));

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var commentItem = window.domUtils.createElementWithClass('li', 'social__comment');

      var avatar = window.domUtils.createElementWithClass('img', 'social__picture');
      avatar.src = comments[i].avatar;
      avatar.alt = comments[i].name;
      avatar.width = AVATAR_WIDTH;
      avatar.heigth = AVATAR_HEIGHT;
      commentItem.appendChild(avatar);

      var commentText = window.domUtils.createElementWithClass('p', 'social__text');
      commentText.textContent = comments[i].message;
      commentItem.appendChild(commentText);

      fragment.appendChild(commentItem);
    }
    return fragment;
  };

  var renderBigPhoto = function (photoObject) {
    bigPhoto.src = photoObject.url;
    bigPhoto.alt = photoObject.description;

    bigPhotoBlock.querySelector('.likes-count').textContent = photoObject.likes;
    bigPhotoBlock.querySelector('.comments-count').textContent = photoObject.comments.length;
    bigPhotoBlock.querySelector('.social__caption').textContent = photoObject.description;

    bigPhotoBlock.querySelector('.social__comment-count').classList.add('hidden');
    bigPhotoBlock.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');

    var commentsList = bigPhotoBlock.querySelector('.social__comments');
    commentsList.appendChild(renderComments(photoObject.comments));
  };

  window.bigPhoto = {
    renderBigPhoto: renderBigPhoto
  };

})();
