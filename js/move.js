'use strict';

(function () {
  var effectPin = document.querySelector('.effect-level__pin');
  var effectLine = document.querySelector('.effect-level__line');
  var effectDepth = document.querySelector('.effect-level__depth');
  var effectValueInput = document.querySelector('.effect-level__value');

  window.initMove = function (callback) {
    var pinLimits = {
      left: 0,
      right: effectLine.offsetWidth
    };

    effectPin.addEventListener('mousedown', function (evt) {
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

        callback();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
