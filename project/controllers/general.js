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

router.get('/application-update', function (req, res) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user, 'application_data': null};
    if (req.query.id != null) {
        Application.get(req.query.id, function (err, rows) {
            if (err) {
                res.json({'Error': err});
            }
            responseData['application_data'] = rows;
        });
    }

    res.render('application-update', responseData);
});

router.get('/approval-create', function (req, res) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    res.render('approval-create', {user: req.user});
});

router.get('/approval-update', function (req, res) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user, 'approval_data': null};
    if (req.query.id != null) {
        Approval.get(req.query.id, function (err, rows) {
            if (err) {
                res.json({'Error': err});
            }
            responseData['approval_data'] = rows;
        });
    }
    res.render('approval-update', responseData);
});

module.exports = router;
