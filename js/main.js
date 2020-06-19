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

var FILTERS = [
  {name: 'chrome', filter: 'grayscale', minValue: 0, maxValue: 1},
  {name: 'sepia', filter: 'sepia', minValue: 0, maxValue: 1},
  {name: 'marvin', filter: 'invert', minValue: 0, maxValue: 100},
  {name: 'phobos', filter: 'blur', minValue: 0, maxValue: 3},
  {name: 'heat', filter: 'brightness', minValue: 0, maxValue: 3},
  {name: 'none', filter: 'none'}
];

var REG_HASHTAGS = /^(#[a-zA-Zа-яА-Я0-9]{2,20})(\s(#[a-zA-Zа-яА-Я0-9]{2,20})){0,4}$/;

var ScaleProperty = {
  SCALE_MIN: 25,
  SCALE_MAX: 100,
  SCALE_STEP: 25,
};

var KeyCode = {
  ESCAPE: 'Escape',
};

var PHOTOS_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 10;
var AVATARS_MIN = 1;
var AVATARS_MAX = 6;
var AVATAR_WIDTH = 35;
var AVATAR_HEIGHT = 35;

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

// module3-task2 create FullSize preview for the First Photo of the array of generated photos

var photo = photos[0];
var bigPhotoBlock = document.querySelector('.big-picture');
var bigPhoto = bigPhotoBlock.querySelector('.big-picture__img img');

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

var renderComments = function (comments) {
  removeChildren(document.querySelectorAll('.social__comment'));

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    var commentItem = createElementWithClass('li', 'social__comment');

    var avatar = createElementWithClass('img', 'social__picture');
    avatar.src = comments[i].avatar;
    avatar.alt = comments[i].name;
    avatar.width = AVATAR_WIDTH;
    avatar.heigth = AVATAR_HEIGHT;
    commentItem.appendChild(avatar);

    var commentText = createElementWithClass('p', 'social__text');
    commentText.textContent = comments[i].message;
    commentItem.appendChild(commentText);

    fragment.appendChild(commentItem);
  }
  return fragment;
};

var renderBigPhoto = function (photoBig, photoObject) {
  photoBig.src = photoObject.url;
  photoBig.alt = photoObject.description;

  bigPhotoBlock.querySelector('.likes-count').textContent = photoObject.likes;
  bigPhotoBlock.querySelector('.comments-count').textContent = photoObject.comments.length;
  bigPhotoBlock.querySelector('.social__caption').textContent = photoObject.description;

  bigPhotoBlock.querySelector('.social__comment-count').classList.add('hidden');
  bigPhotoBlock.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  var commentsList = bigPhotoBlock.querySelector('.social__comments');
  commentsList.appendChild(renderComments(photoObject.comments));
};

userPhotos.appendChild(renderPhotos(photos));
// bigPhotoBlock.classList.remove('hidden'); // временно, чтобы не мешало пока
renderBigPhoto(bigPhoto, photo);


// module4-task2 Загрузка изображения и показ формы редактирования, валидация хэш-тегов
var imageUploadForm = document.querySelector('#upload-select-image');
var editImageSection = imageUploadForm.querySelector('.img-upload__overlay');
var loadImageButton = imageUploadForm.querySelector('#upload-file');
var closeFormButton = imageUploadForm.querySelector('#upload-cancel');

var previewPhoto = imageUploadForm.querySelector('.img-upload__preview img');

var effectLevel = imageUploadForm.querySelector('.effect-level'); // блок со слайдером
var levelPin = effectLevel.querySelector('.effect-level__pin');
var levelValueInput = effectLevel.querySelector('.effect-level__value');
var effectsList = imageUploadForm.querySelector('.effects__list'); // список эффектов

var textHashtags = imageUploadForm.querySelector('.text__hashtags');
var commentsArea = imageUploadForm.querySelector('.text__description');

// открытие и закрытие модального окна редактирования эффектов
var toggleFormHandler = function (openForm) {
  if (openForm) {
    editImageSection.classList.remove('hidden');
    effectLevel.style.display = 'none';
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', escapeClickHandler);
  } else {
    editImageSection.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', escapeClickHandler);
    loadImageButton.value = '';
    imageUploadForm.removeEventListener('invalid', formValidityHandler);
  }
};

var escapeClickHandler = function (evt) {
  if (evt.key === KeyCode.ESCAPE && evt.target !== textHashtags && evt.target !== commentsArea) {
    evt.preventDefault();
    toggleFormHandler(false);
  }
};

loadImageButton.addEventListener('change', function () {
  toggleFormHandler(true);
});

closeFormButton.addEventListener('click', function () {
  toggleFormHandler(false);
});

// проверка валидности хэштегов
var hashtagsChangeHandler = function () {
  if (!REG_HASHTAGS.test(textHashtags.value)) {
    textHashtags.setCustomValidity('Хэш-тег начинается с символа #. Строка после решётки должна состоять только из букв и чисел. Длина хэштега от 2 до 20 символов. Количество хэштегов не более 5');
    imageUploadForm.reportValidity();
  } else {
    textHashtags.setCustomValidity('');
    var tags = textHashtags.value.split(' ');
    for (var i = 0; i < tags.length - 1; i++) {
      for (var j = i + 1; j < tags.length; j++) {
        if (tags[i] === tags[j]) {
          textHashtags.setCustomValidity('Есть одинаковые элементы! Проверьте хэштеги ' + (i + 1) + ' и ' + (j + 1));
          imageUploadForm.reportValidity();
        } else {
          textHashtags.setCustomValidity('');
        }
      }
    }
  }
};

var formValidityHandler = function () {
  imageUploadForm.reportValidity();
};

textHashtags.addEventListener('change', hashtagsChangeHandler);

imageUploadForm.addEventListener('invalid', formValidityHandler);

// применение эффектов и настройка уровня выбранного эффекта при mouseup
var effectChangeHandler = function (evt) {
  previewPhoto.classList = '';
  previewPhoto.classList.add('effects__preview--' + evt.target.value);
  previewPhoto.style = '';
  selectedEffect = evt.target.value;

  effectLevel.style.display = evt.target.value === 'none' ? 'none' : 'block';
};

var selectedEffect; // сохраняет эффект, выбранный в списке эффектов при наступлении события change

var levelPinChangeHandler = function () {
  for (var i = 0; i < FILTERS.length; i++) {
    if (selectedEffect === FILTERS[i].name) {
      switch (selectedEffect) {
        case 'marvin' :
          previewPhoto.style.filter = 'none';
          previewPhoto.style.filter = FILTERS[i].filter + '(' + levelValueInput.value * FILTERS[i].maxValue / 100 + '%)';
          break;
        case 'phobos' :
          previewPhoto.style.filter = 'none';
          previewPhoto.style.filter = FILTERS[i].filter + '(' + levelValueInput.value * FILTERS[i].maxValue / 100 + 'px)';
          break;
        case 'none' :
          previewPhoto.style.filter = FILTERS[i].filter;
          break;
        default :
          previewPhoto.style.filter = 'none';
          previewPhoto.style.filter = FILTERS[i].filter + '(' + levelValueInput.value * FILTERS[i].maxValue / 100 + ')';
          break;
      }
    }
  }
};

effectsList.addEventListener('change', effectChangeHandler);

levelPin.addEventListener('mouseup', levelPinChangeHandler);

// редактирование размера изображения
var scaleBlock = imageUploadForm.querySelector('.img-upload__scale');
var scaleValueInput = imageUploadForm.querySelector('.scale__control--value');
var scaleSmaller = imageUploadForm.querySelector('.scale__control--smaller');
var scaleBigger = imageUploadForm.querySelector('.scale__control--bigger');

var changeImageSizeHandler = function (evt) {
  var scaleValue = parseInt(scaleValueInput.value, 10);
  switch (evt.target) {
    case scaleSmaller :
      if (scaleValue !== ScaleProperty.SCALE_MIN) {
        scaleValue -= ScaleProperty.SCALE_STEP;
      }
      break;
    case scaleBigger :
      if (scaleValue !== ScaleProperty.SCALE_MAX) {
        scaleValue += ScaleProperty.SCALE_STEP;
      }
      break;
  }
  scaleValueInput.value = scaleValue + '%';
  previewPhoto.style.transform = 'scale(' + scaleValue / 100 + ')';
};

scaleBlock.addEventListener('click', changeImageSizeHandler);
