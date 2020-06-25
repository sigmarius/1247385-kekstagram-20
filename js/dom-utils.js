'use strict';

// утилиты для работы с DOM - создание и удаление элементов

(function () {

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

  window.domUtils = {
    createElementWithClass: createElementWithClass,
    removeChildren: removeChildren,
  };

})();
