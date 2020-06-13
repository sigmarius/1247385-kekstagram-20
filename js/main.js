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
userPhotos.appendChild(renderPhotos(photos));

// create FullSize preview for the First Photo of the array of generated photos

var firstPhotoElement = photos[0];

var bigPhotoBlock = document.querySelector('.big-picture');
bigPhotoBlock.classList.remove('hidden');

var addElementClass = function (elementName, selector, className) {
  var element = elementName.querySelector(selector);
  element.classList.add(className);

  return element;
};

var changeElementText = function (selector, text) {
  var element = bigPhotoBlock.querySelector(selector);
  element.textContent = text;

  return element;
};

var createElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);

  return element;
};

var clearExistedComments = function () {
  var comments = document.querySelectorAll('.social__comment');

  for (var i = 0; i < comments.length; i++) {
    comments[i].remove();
  }
};

var createEnvironment = function () {
  var bigPhoto = bigPhotoBlock.querySelector('.big-picture__img img');
  bigPhoto.src = firstPhotoElement.url;
  bigPhoto.alt = firstPhotoElement.description;

  changeElementText('.likes-count', firstPhotoElement.likes);
  changeElementText('.comments-count', firstPhotoElement.comments.length);
  changeElementText('.social__caption', firstPhotoElement.description);
  addElementClass(bigPhotoBlock, '.social__comment-count', 'hidden');
  addElementClass(bigPhotoBlock, '.comments-loader', 'hidden');
  addElementClass(document, 'body', 'modal-open');
};

var commentsList = bigPhotoBlock.querySelector('.social__comments');
var fragment = document.createDocumentFragment();

var renderComments = function () {
  clearExistedComments();

  var comments = firstPhotoElement.comments;
  var avatarWidth = '35';
  var avatarHeigth = '35';

  for (var i = 0; i < comments.length; i++) {
    var commentItem = createElement('li', 'social__comment');

    var avatar = createElement('img', 'social__picture');
    avatar.src = comments[i].avatar;
    avatar.alt = comments[i].name;
    avatar.width = avatarWidth;
    avatar.heigth = avatarHeigth;
    commentItem.appendChild(avatar);

    var commentText = createElement('p', 'social__text');
    commentText.textContent = comments[i].message;
    commentItem.appendChild(commentText);

    fragment.appendChild(commentItem);
  }
  return fragment;
};

createEnvironment();
commentsList.appendChild(renderComments());
