const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');

/**
 * Generate token
 * @param {Number} id
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (id) => {
  const payload = {
    sub: id,
    iat: moment().unix(),
    exp: moment().add(config.jwt.accessExpirationMinutes, 'minutes').unix(),
  };
  
  return jwt.sign(payload, config.jwt.secret);
};

/**
 * Verify token and return payload
 * @param {string} token
 * @returns {Promise<Object>}
 */
const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);
  return payload;
};

module.exports = {
  generateToken,
  verifyToken,
};
