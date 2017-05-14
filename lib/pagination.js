'use strict';

module.exports = function(sum, pageNum, pageSize) {

  const count = sum.length;
  const pageCount = Math.floor(count/pageSize) + (count%pageSize > 0 ? 1 : 0);
  const start = (pageNum - 1) * pageSize;
  let end = start + pageSize;

  if (pageNum * pageSize > count) {
    end = count;
  }

  const items = sum.slice(start, end);

  return {
    count,
    pageCount,
    pageNum,
    pageSize,
    items,
  }
}
