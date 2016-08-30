'use strict';

module.exports = (function() {
  var gallery = require('./gallery');
  var pictureTemplate = document.querySelector('#picture-template');
  var pictureBlockToClone;
  if('content' in pictureTemplate) {
    pictureBlockToClone = pictureTemplate.content.querySelector('.picture');
  } else {
    pictureBlockToClone = pictureTemplate.querySelector('.picture');
  }
  return function(data, container, index) {
    var pictureBlock = pictureBlockToClone.cloneNode(true);
    pictureBlock.querySelector('.picture-comments').textContent = data.comments;
    pictureBlock.querySelector('.picture-likes').textContent = data.likes;

    var newPhoto = new Image(182, 182);
    var imgElement = pictureBlock.querySelector('img');
    newPhoto.onload = function(evt) {
      imgElement.src = evt.target.src;
    };
    newPhoto.onerror = function() {
      pictureBlock.classList.add('.picture-load-failure');
    };

    newPhoto.src = data.url;

    container.appendChild(pictureBlock);

    pictureBlock.onclick = function(e) {
      e.preventDefault();
      gallery.show(index);
    };
    return pictureBlock;
  };
})();
