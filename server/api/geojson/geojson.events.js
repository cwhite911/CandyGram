/**
 * Geojson model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Geojson = require('./geojson.model');
var GeojsonEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GeojsonEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Geojson.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GeojsonEvents.emit(event + ':' + doc._id, doc);
    GeojsonEvents.emit(event, doc);
  }
}

module.exports = GeojsonEvents;
