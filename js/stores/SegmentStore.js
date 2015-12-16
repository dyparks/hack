var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _segments = {};

/**
 * Create a Segment item.
 * @param {string} name The name of the segment
 * @param {string} size The size of the segment
 */

function create(name, size) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _segments[id] = {
    name: name, 
    size: size,
  };
}

/**
 * Remove a Segment item.
 * @param {string} id
 */

function remove(id){
  delete _segments[id];
}

var SegmentStore = assign({}, EventEmitter.prototype, {
   /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _segments;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

   /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

   /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
      case 0:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          SegmentStore.emitChange();
        }
        break;

      case 1:
        destroy(action.id);
        SegmentStore.emitChange();
        break;
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

module.exports = SegmentStore;

