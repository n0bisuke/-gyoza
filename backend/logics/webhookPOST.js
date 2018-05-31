'use strict';
var config = require('../config');
var Request = require('request');

exports.webhookPOSTStart = function (req, res, results, next) {
  // @see https://devdocs.line.me/ja/#webhook-event-object
  
  // @todo edit backend/config.js to set Channel Secret
  var secret = config.line.secret;
  
  var signature = require('crypto').createHmac('sha256', secret).update(req.body).digest('base64');
  
  if (req.headers['x-line-signature'] === signature) {
    next(JSON.parse(req.body));
  } else {
    // @todo handle error
  }

}

exports.webhookPOST1 = function (req, res, results, next) {
  // @see https://devdocs.line.me/en/#push-message
  
  // @todo edit backend/config.js to set Channel Access Token
  // @todo set ID of the receiver
  var accessToken = config.line.accessToken;
  var messageReceiverId = '';
  
  // @todo Send message object
  var message = [
    {
      "type":"text",
      "text":"hello world"
    },
  ];
  
  var options = {
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: {
      "to": messageReceiverId,
      "messages": message,
    }
  };
  
  Request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // Returns the status code 200 OK and an empty JSON object.
      next(body);
    } else {
      // @todo handle error
    }
  });

}

exports.webhookPOSTEnd = function (req, res, results) {
  if (typeof results === 'object') {
    res.json(results);
  } else {
    // @todo change the type if this API doesn't return json.
    res.setHeader('Content-Type', 'application/json');
    res.end(results);
  }
}
