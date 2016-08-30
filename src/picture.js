'use strict';

var getPictureBlock = require('./get-picture-block');
var gallery = require('./gallery');

var Picture = function(data, container, index) {
  this.data = data;
  this.element = getPictureBlock(this.data, container, index);
};

Picture.prototype = {
  onPictureClick: function() {
    gallery.show(this.data.pictures);
  },

  remove: function() {
    this.element.removeEventListener('click', this.onPictureClick);
    this.elementparentNode.removeChild(this.element);
  },

  add: function() {
    this.element.addEventListener('click', this.onPictureClick);
    this.container.appendChild(this.element);
  }
};

module.exports = Picture;
