'use strict';

window.pictures = [];
window.picturesList = function(pics) {
  window.pictures = pics;
  window.pictures.forEach(function(photo) {
    getPictureBlock(photo, picturesContainer);
  });
};

var createRequest = function(src, jsonCallBack) {
  var url = src + '?callback=' + jsonCallBack;
  var scriptElem = document.createElement('script');
  scriptElem.src = url;
  document.body.appendChild(scriptElem);
};

var filters = document.querySelector('.filters');
filters.classList.add('hidden');

createRequest('http://localhost:1506/api/pictures', 'picturesList');

var pictureTemplate = document.querySelector('#picture-template');
var picturesContainer = document.querySelector('.pictures');
var pictureBlockToClone;

if('content' in pictureTemplate) {
  pictureBlockToClone = pictureTemplate.content.querySelector('.picture');
} else {
  pictureBlockToClone = pictureTemplate.querySelector('.picture');
}

var getPictureBlock = function(data, container) {
  var pictureBlock = pictureBlockToClone.cloneNode(true);
  pictureBlock.querySelector('.picture-comments').textContent = data.comments;
  pictureBlock.querySelector('.picture-likes').textContent = data.likes;

  var newPhoto = new Image(182, 182);
  newPhoto.onload = function() {
    newPhoto.src = data.url;
  };
  newPhoto.onerror = function() {
    pictureBlock.classList.add('.picture-load-failure');
  };
  newPhoto.src = data.url;

  var pictureStats = pictureBlock.querySelector('.picture-stats');
  pictureBlock.insertBefore(newPhoto, pictureStats);

  container.appendChild(pictureBlock);
  return pictureBlock;
};

filters.classList.remove('hidden');
