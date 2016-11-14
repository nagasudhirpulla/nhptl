var express = require('express');
var router = express.Router();
var Application = require('../models/application.js');
var Approval = require('../models/approval.js');

router.get('/', function (req, res) {
    res.redirect('/home');
});

router.get('/home', function (req, res) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    res.render('home', {user: req.user});
});

router.get('/application-create', function (req, res) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    res.render('application-create', {user: req.user});
});

router.get('/application-update', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user, 'application_data': {}};
    var app_id = req.query.id;
    if (typeof app_id == 'undefined') {
        app_id = null;
    }
    responseData.application_id = app_id;
    Application.get(app_id, function (err, rows) {
        if (err) return next(err);
        responseData['application_data'] = rows[0];
        res.render('application-update', responseData);
    });
});

router.get('/approval-create', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user, 'application_data': {}};
    var app_id = req.query.id;
    if (typeof app_id == 'undefined') {
        app_id = null;
    }
    responseData.application_id = app_id;
    Application.get(app_id, function (err, rows) {
        if (err) return next(err);
        responseData['application_data'] = rows[0];
        res.render('approval-create', responseData);
    });
});

router.get('/approval-update', function (req, res,next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user, 'approval_data': null};
    var app_id = req.query.id;
    if (typeof app_id == 'undefined') {
        app_id = null;
    }
    responseData.application_id = app_id;
    Approval.get(app_id, function (err, rows) {
        if (err) return next(err);
        responseData['approval_data'] = rows[0];
        res.render('approval-update', responseData);
    });
});

module.exports = router;
