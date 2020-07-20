'use strict';

// закрузка данных с сервера

(function () {

  var RESPONSE_TYPE = 'json';
  var TIMEOUT = 10000;

  var Url = {
    LOAD: 'https://javascript.pages.academy/kekstagram/data',
    SAVE: 'https://javascript.pages.academy/kekstagram'
  };

  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var StatusCode = {
    OK: 200
  };

  var addListeners = function (request, successHandler, failHandler) {
    request.addEventListener('load', function () {
      if (request.status === StatusCode.OK) {
        successHandler(request.response);
      } else {
        failHandler('Статус ответа: ' + request.status + ' ' + request.statusText);
      }
    });
    request.addEventListener('error', function () {
      failHandler('Произошла ошибка соединения');
    });
    request.addEventListener('timeout', function () {
      failHandler('Запрос не успел выполнится за ' + request.timeout + 'мс');
    });
    request.timeout = TIMEOUT;
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    addListeners(xhr, onLoad, onError);
    return xhr;
  };

  // получение данных с сервера
  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open(Method.GET, Url.LOAD);
    xhr.send();
  };

  // отправка данных на сервер
  var save = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open(Method.POST, Url.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
