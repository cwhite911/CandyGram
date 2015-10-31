/**
 * Shapefile model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Shapefile = require('./shapefile.model');
var ShapefileEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ShapefileEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Shapefile.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ShapefileEvents.emit(event + ':' + doc._id, doc);
    ShapefileEvents.emit(event, doc);
  }
}

module.exports = ShapefileEvents;
