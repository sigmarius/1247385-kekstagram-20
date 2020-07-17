'use strict';

// фильтрация галереи фотографий

(function () {

  var RANDOM_COUNT = 10; // количество случайных фотографий

  var Filter = {
    DEFAULT: document.querySelector('button[id="filter-default"]'),
    RANDOM: document.querySelector('button[id="filter-random"]'),
    DISCUSSED: document.querySelector('button[id="filter-discussed"]')
  };

  var filtersContainer = document.querySelector('.img-filters__form');

  var clearPictures = function () {
    var pictures = document.querySelectorAll('.picture');
    window.domUtils.removeChildren(pictures);
  };

  var getDebouncedPhotos = window.debounce(function (arr) {
    window.renderPhotos(arr);
    window.setThumbnailClickHandler(arr);
  });


  var getRandomPhotos = function () {
    var randomPhotos = window.photos.slice();
    var deletedPhotos = [];

    for (var i = randomPhotos.length; i > RANDOM_COUNT; i--) {
      var index = window.utils.generateRandomNumber(0, randomPhotos.length - 1);
      deletedPhotos.push(randomPhotos.splice(index, 1));
    }
    getDebouncedPhotos(randomPhotos);
  };

  // для устойчивости сортировки - если comments.length одинаково, сортируем по likes
  var compareLikes = function (left, right) {
    if (left > right) {
      return -1;
    } else if (left < right) {
      return 1;
    } else {
      return 0;
    }
  };

  var compareComments = function (left, right) {
    var diff = right.comments.length - left.comments.length;
    if (diff === 0) {
      diff = compareLikes(left.likes, right.likes);
    }
    return diff;
  };

  var getDescComments = function () {
    var descComments = window.photos.slice().sort(compareComments);
    getDebouncedPhotos(descComments);
  };

  var updatePhotosHandler = function (evt) {
    clearPictures();
    switch (evt.target) {
      case Filter.DEFAULT :
        getDebouncedPhotos(window.photos);
        break;
      case Filter.RANDOM :
        getRandomPhotos();
        break;
      case Filter.DISCUSSED :
        getDescComments();
    }
  };

  window.setSortHandler = function () {
    filtersContainer.addEventListener('click', updatePhotosHandler);
  };

})();
