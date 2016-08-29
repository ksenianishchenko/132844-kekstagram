'use strict';

module.exports = (function() {
  var createRequest = require('./load');
  var getPictureBlock = require('./get-picture-block');
  var gallery = require('./gallery');

  window.pictures = [];
  window.picturesList = function(pics) {
    window.pictures = pics;
    gallery.setPictures(pics);
    var i = 0;
    window.pictures.forEach(function(photo) {
      getPictureBlock(photo, picturesContainer, i);
      i++;
    });
  };

  var filters = document.querySelector('.filters');
  filters.classList.add('hidden');

  createRequest('http://localhost:1506/api/pictures', 'picturesList');

  var picturesContainer = document.querySelector('.pictures');

  filters.classList.remove('hidden');
})();
