'use strict';

module.exports = (function() {
  return function(src, jsonCallBack) {
    var url = src + '?callback=' + jsonCallBack;
    var scriptElem = document.createElement('script');
    scriptElem.src = url;
    document.body.appendChild(scriptElem);
  };
})();
