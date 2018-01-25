// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const randomAsBuffer = require('./asBuffer');
const randomAsHex = require('./asHex');
const randomAsNumber = require('./asNumber');
const randomAsU8a = require('./asU8a');

/**
  @summary Returns a sequence of secure random bytes in a variety of formats
*/
module.exports = {
  randomAsBuffer,
  randomAsHex,
  randomAsNumber,
  randomAsU8a
};