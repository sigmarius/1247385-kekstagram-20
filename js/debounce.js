'use strict';

// устраняет дребезг

(function () {

  var DEBOUNCE_INTERVAL = 500; // 0.5c

  window.debounce = function (cb) {
    var lastTimeout = null; // запоминает последний таймаут

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);

    };
  };

})();
