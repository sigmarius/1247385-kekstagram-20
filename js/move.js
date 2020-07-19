'use strict';

(function () {
  var DEFAULT_VALUE = 100;

  var effectPin = document.querySelector('.effect-level__pin');
  var effectLine = document.querySelector('.effect-level__line');
  var effectDepth = document.querySelector('.effect-level__depth');
  var effectValueInput = document.querySelector('.effect-level__value');

  var isMoved = false; // флаг, было ли перемещение ползунка

  var getDefaultPosition = function () {
    effectValueInput.value = DEFAULT_VALUE;
    effectDepth.style.width = DEFAULT_VALUE + '%';
    effectPin.style.left = DEFAULT_VALUE + '%';
  };

  var pinMousedownHandler = function (evt) {
    var pinLimits = {
      left: 0,
      right: effectLine.offsetWidth
    };

    isMoved = true;

    evt.preventDefault();

    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      var pos = effectPin.offsetLeft - shiftX;

      if (pos < pinLimits.left) {
        pos = 0;
      } else if (pos > pinLimits.right) {
        pos = pinLimits.right;
      }

      var delta = Math.floor((pos / pinLimits.right) * 100);
      effectValueInput.value = delta;
      effectDepth.style.width = delta + '%';

      effectPin.style.left = pos + 'px';

      window.filters.setEffectLevel();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var initMove = function () {
    effectPin.addEventListener('mousedown', pinMousedownHandler);
  };

  var stopMove = function () {
    if (isMoved) {
      effectPin.removeEventListener('mousedown', pinMousedownHandler);
      getDefaultPosition();
    }
  };

  window.move = {
    initMove: initMove,
    stopMove: stopMove,
    getDefaultPosition: getDefaultPosition
  };

})();
