'use strict';

// отображает комментарии пользователей в окне Превью

(function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;

  var COMMENTS_COUNT = 5; // количество добавляемых комментариев

  var commentsLoader = document.querySelector('.comments-loader');

  var loadedComments = []; // общее количество комментариев у выбранной фотографии
  var leftComments = []; // сколько комментариев осталось загрузить
  var isLoaded = false; // флаг, подгружались ли комментарии

  var renderComments = function (comments) {
    var commentsList = document.querySelector('.social__comments');

    if (comments.length > COMMENTS_COUNT) {
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', loaderClickHandler);
    } else {
      commentsLoader.classList.add('hidden');
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      if (i < COMMENTS_COUNT) {
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

        commentsList.appendChild(fragment);
      }
    }
  };

  var loaderClickHandler = function () {
    if (!isLoaded) {
      loadedComments = window.preview.selectedPhoto.comments.slice();
      isLoaded = true;
    } else {
      loadedComments = leftComments;
    }

    loadedComments.splice(0, COMMENTS_COUNT);
    renderComments(loadedComments);

    leftComments = loadedComments;

  };

  var removeCommentsListener = function () {
    commentsLoader.removeEventListener('click', loaderClickHandler);
    isLoaded = false;
  };


  window.comments = {
    renderComments: renderComments,
    removeCommentsListener: removeCommentsListener
  };

})();
