'use strict';
var url = require('url');

var sample_locationsGETLogic = require('../logics/sample_locationsGET');
var webhookPOSTLogic = require('../logics/webhookPOST');

module.exports.sample_locationsGET = function sample_locationsGET (req, res, next) {
  sample_locationsGETLogic.sample_locationsGETStart(req, res, {}, function (result) {
    sample_locationsGETLogic.sample_locationsGETEnd(req, res, result);
  });
};

module.exports.webhookPOST = function webhookPOST (req, res, next) {
  webhookPOSTLogic.webhookPOSTStart(req, res, {}, function (result) {
    webhookPOSTLogic.webhookPOST1(req, res, result, function (result) {
      webhookPOSTLogic.webhookPOSTEnd(req, res, result);
    });
  });
};

