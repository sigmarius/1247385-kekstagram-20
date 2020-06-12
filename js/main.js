'use strict';

var MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Ария Старк', 'Тирион Ланнистер', 'Теон Грейджой', 'Джон Сноу', 'Белые Ходоки', 'Дайенерис Таргариен', 'Серсея Ланнистер', 'Миссандея', 'Бронн Черноводный', 'Сандор Клиган'];
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

var generateComments = function () {
  var commentsCount = generateRandomNumber(COMMENTS_MIN, COMMENTS_MAX);
  var comments = [];

  for (var i = 0; i < commentsCount; i++) {
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
      comments: generateComments().length
    });
  }
  return photos;
};

var renderOnePhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments;

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
