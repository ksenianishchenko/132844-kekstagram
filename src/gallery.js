'use strict';

var Gallery = function() {
  this.pictures = [];
  this.activePicture = 0;

  this.galleryOverlay = document.querySelector('.gallery-overlay');
  this.galleryOverlayClose = this.galleryOverlay.querySelector('.gallery-overlay-close');
  this.galleryOverlayImage = this.galleryOverlay.querySelector('.gallery-overlay-image');
  this.likesCount = this.galleryOverlay.querySelector('.likes-count');
  this.commentsCount = this.galleryOverlay.querySelector('.comments-count');
};

Gallery.prototype = {
  setPictures: function(getPictureArray) {
    this.pictures = getPictureArray;
  },

  show: function(selectedPicture) {
    this.galleryOverlay.classList.remove('invisible');
    this.setActivePicture(selectedPicture);
    this.galleryOverlayClose.onclick = function() {
      this.hide();
    }.bind(this);

    var pictureBlock = document.querySelector('.picture-index-' + selectedPicture);
    if (pictureBlock.classList.contains('picture-load-failure')) {
      if (selectedPicture + 1 >= this.pictures.length) {
        this.show(0);
      } else {
        this.show(selectedPicture + 1);
      }
      return;
    }

    this.galleryOverlayImage.onclick = function(evt) {
      evt.preventDefault();
      if (this.activePicture + 1 >= this.pictures.length) {
        this.show(0);
      } else {
        this.show(this.activePicture + 1);
      }
    }.bind(this);
  },

  hide: function() {
    this.galleryOverlay.classList.add('invisible');
    this.galleryOverlayClose.onclick = null;
  },

  setActivePicture: function(pictureId) {
    this.activePicture = pictureId;
    var picture = this.pictures[pictureId];
    this.galleryOverlayImage.src = picture.url;
    this.likesCount.textContent = picture.likes;
    this.commentsCount.textContent = picture.comments;
  }
};


module.exports = new Gallery();
