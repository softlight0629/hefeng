'use strict';


const msgs = [];


module.exports = {

  push: function(msg) {
    msgs.push(msg);
  },

  list: function() {
    return msgs;
  }
}
