'use strict';

const Config = require("../config");
const fetch = require("node-fetch");

var utils = require('../utils/writer.js');

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}



/**
 * Refresh token
 *
 * body RefreshRequest Refresh request
 * returns RefreshResponse
 **/
exports.refresh = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "access_token" : "a9b723...",
      "refresh_token" : "b5c569...",
      "expires_at" : 1568775134,
      "token_type" : "Bearer",
      "expires_in" : 20566
    };

    if (body.refresh_token) {
      let reqData = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: body.refresh_token
      };
      postData(Config.STRAVA_ENDPOINT, reqData).then(
        (response) => {
          response.json().then(
            json => {
              resolve(utils.respondWithCode(response.status, json));
            }
          );
          //resolve(response.json());
          //resolve(utils.respondWithCode(response.status, response.json()));
        }
      );
    } else {
      resolve();
    }
  });
}


/**
 * Get access and refresh tokens
 *
 * body TokenRequest Token request
 * returns TokenResponse
 **/
exports.token = function(body) {
  return new Promise(function(resolve, reject) {
    // var examples = {};
    // examples['application/json'] = {
    //   "access_token" : "a9b723...",
    //   "refresh_token" : "b5c569...",
    //   "expires_at" : 1568775134,
    //   "token_type" : "Bearer",
    //   "expires_in" : 20566
    // };

    if (body.code) {
      let reqData = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: body.code
      };
      postData(Config.STRAVA_ENDPOINT, reqData).then(
        (response) => {
          response.json().then(
            json => {
              resolve(utils.respondWithCode(response.status, json));
            }
          );
          //resolve(response.json());
          //resolve(utils.respondWithCode(response.status, response.json()));
        }
      );
    } else {
      resolve();
    }
  });
}

