/**
 * Buffer model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Buffer = require('./buffer.model');
var BufferEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BufferEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Buffer.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BufferEvents.emit(event + ':' + doc._id, doc);
    BufferEvents.emit(event, doc);
  }
}

module.exports = BufferEvents;
