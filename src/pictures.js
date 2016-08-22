'use strict';

window.pictures = [];
window.picturesList = function(pics) {
  window.pictures = pics;
};

var createRequest = function(src, jsonCallBack) {
  var url = src + '?callback=' + jsonCallBack;
  var scriptElem = document.createElement('script');
  scriptElem.src = url;
  document.body.appendChild(scriptElem);
};

createRequest('http://localhost:1506/api/pictures', 'picturesList');
