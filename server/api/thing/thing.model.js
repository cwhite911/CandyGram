'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var LidarSchema = new Schema({
  x: Number,
  y: Number,
  z: Number
});

module.exports = mongoose.model('Lidar', LidarSchema, 'lidar');
