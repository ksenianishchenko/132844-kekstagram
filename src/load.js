'use strict';

module.exports = (function() {
  return function(src, params, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      var loadData = JSON.parse(evt.target.response);
      callback(loadData);
    };

    xhr.open('GET', src +
        '?from=' + (params.from || 0) +
        '&to=' + (params.to || Infinity) +
        '&filter=' + (params.filter || 'default'));
    xhr.send();
  };
})();
