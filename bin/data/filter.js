'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'filter-new':
      list = list.filter(function(date) {
        return new Date() - Date.parse(date.created) < 259200000;
      });
      return list.sort(function(a, b) {
        return b.created - a.created;
      });
    case 'filter-discussed':
      return list.sort(function(a, b) {
        return b.comments - a.comments;
      });
  }
  return list;
};
