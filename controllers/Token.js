'use strict';

var utils = require('../utils/writer.js');
var Token = require('../service/TokenService');

module.exports.refresh = function refresh (req, res, next, body) {
  Token.refresh(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.token = function token (req, res, next, body) {
  Token.token(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.log("here");
      utils.writeJson(res, response);
    });
};
