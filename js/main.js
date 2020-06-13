'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Ария Старк', 'Тирион Ланнистер', 'Теон Грейджой', 'Джон Сноу', 'Белые Ходоки', 'Дайенерис Таргариен', 'Серсея Ланнистер', 'Миссандея', 'Бронн Черноводный', 'Сандор Клиган'
];
var PHOTOS_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 10;
var AVATARS_MIN = 1;
var AVATARS_MAX = 6;
var AVATAR_WIDTH = 35;
var AVATAR_HEIGHT = 35;

var photoTemplate = document.querySelector('#picture').content;
var userPhotos = document.querySelector('.pictures');

var generateRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  return arr[generateRandomNumber(0, arr.length - 1)];
};

var generateComments = function (count) {
  var comments = [];

  for (var i = 0; i < count; i++) {
    comments.push({
      avatar: 'img/avatar-' + generateRandomNumber(AVATARS_MIN, AVATARS_MAX) + '.svg',
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES)
    });
  }
  return comments;
};

var generatePhotos = function () {
  var photos = [];

  for (var i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push({
      url: ('photos/' + i + '.jpg'),
      description: 'Фотография №' + i,
      likes: generateRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: generateComments(generateRandomNumber(COMMENTS_MIN, COMMENTS_MAX))
    });
  }
  return photos;
};

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
  return fragment;
};

var photos = generatePhotos();

// create FullSize preview for the First Photo of the array of generated photos

var photo = photos[0];
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

userPhotos.appendChild(renderPhotos(photos));
bigPhotoBlock.classList.remove('hidden');
renderBigPhoto(bigPhoto, photo);
