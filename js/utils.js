'use strict';

// утилитарный модуль - экспортирует общие функции и переменные для всех модулей
(function () {

  window.utils = {
    KeyCode: {
      ESCAPE: 'Escape',
    },
    generateRandomNumber: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; // max и min включаются
    },
    getRandomElement: function (arr) {
      return arr[window.utils.generateRandomNumber(0, arr.length - 1)];
    },
  };

})();
