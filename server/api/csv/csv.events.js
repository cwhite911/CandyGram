/**
 * Csv model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Csv = require('./csv.model');
var CsvEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CsvEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Csv.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CsvEvents.emit(event + ':' + doc._id, doc);
    CsvEvents.emit(event, doc);
  }
}

module.exports = CsvEvents;
