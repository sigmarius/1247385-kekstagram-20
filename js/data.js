'use strict';

// создает моковые данные для галереи на Главной странице, экспортирует массив данных в Window

(function () {

  var PHOTOS_COUNT = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 0;
  var COMMENTS_MAX = 10;
  var AVATARS_MIN = 1;
  var AVATARS_MAX = 6;

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

  var generateComments = function (count) {
    var comments = [];

    for (var i = 0; i < count; i++) {
      comments.push({
        avatar: 'img/avatar-' + window.utils.generateRandomNumber(AVATARS_MIN, AVATARS_MAX) + '.svg',
        message: window.utils.getRandomElement(MESSAGES),
        name: window.utils.getRandomElement(NAMES)
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
        likes: window.utils.generateRandomNumber(LIKES_MIN, LIKES_MAX),
        comments: generateComments(window.utils.generateRandomNumber(COMMENTS_MIN, COMMENTS_MAX))
      });
    }
    return photos;
  };

  window.data = {
    generatePhotos: generatePhotos
  };

})();
