'use strict';

module.exports = (function() {
  var load = require('./load');
  var gallery = require('./gallery');
  var Picture = require('./picture');
  var PICTURES_URL = 'http://localhost:1506/api/pictures';
  var THROTTLE_TIMEOUT = 100;
  var filters = document.querySelector('.filters');
  var picturesContainer = document.querySelector('.pictures');
  var activeFilter = 'filter-popular';
  var footer = document.querySelector('footer');
  var pageNumber = 0;
  var pageSize = 12;

  window.pictures = [];

  window.picturesList = function(pics) {
    window.pictures = pics;
    gallery.setPictures(pics);
    var i = 0;
    window.pictures.forEach(function(photo) {
      var myPictureBlock = new Picture(photo, picturesContainer, i);
      picturesContainer.appendChild(myPictureBlock.element);
      i++;
    });
  };

  filters.classList.add('hidden');
  var loadPictures = function(filter, currentpage) {
    load(PICTURES_URL, {
      from: currentpage * pageSize,
      to: currentpage * pageSize + pageSize,
      filter: filter
    }, window.picturesList);
  };

  filters.classList.remove('hidden');

  var filterChange = function(filterID) {
    picturesContainer.innerHTML = '';
    activeFilter = filterID;
    pageNumber = 0;
    loadPictures(filterID, pageNumber);
  };

  filters.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('filters-radio')) {
      filterChange(evt.target.id);
    }
  });

  var lastCall = Date.now();

  window.addEventListener('scroll', function() {
    if (Date.now() - lastCall >= THROTTLE_TIMEOUT) {
      if (footer.getBoundingClientRect().bottom - window.innerHeight <= 50) {
        loadPictures(activeFilter, pageNumber++);
      }

      lastCall = Date.now();
    }
  });

  filterChange(activeFilter);

})();
