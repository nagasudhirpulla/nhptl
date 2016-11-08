var express = require('express');
var router = express.Router();
var Application = require('../models/application.js');

router.get('/', function (req, res) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Application.get(req.query.id, function (err, rows) {
        if (err) {
            res.json({'Error': err});
        }
        res.json({'applications': rows});
    });
});


router.post('/', function (req, res, next) {
    if (req.user.username != "nhptl") {
        return next(new Error("user is not nhptl"));
    }
    var description = req.body["description"];
    var sc_ka = req.body["sc_ka"];
    var failure_fault_ka = req.body["failure_fault_ka"];
    var sc_duration = req.body["sc_duration"];
    var n_shots = req.body["n_shots"];
    var from_time = req.body["from_time"];
    var to_time = req.body["to_time"];
    var user_id = req.user.id;


    //console.log("Username is " + req.user.username);
    //console.log("Code create explicit post request body object is " + JSON.stringify(req.body));
    Application.create(description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, function (err, inserted_code) {
        if (err) {
            return next(err);
        }
        res.json({'new_application': inserted_code});
    });
});

router.put('/', function (req, res) {
    //console.log("The code update request body is " + JSON.stringify(req.body) + "\n");
    var description = req.body["description"];
    var sc_ka = req.body["sc_ka"];
    var failure_fault_ka = req.body["failure_fault_ka"];
    var sc_duration = req.body["sc_duration"];
    var n_shots = req.body["n_shots"];
    var from_time = req.body["from_time"];
    var to_time = req.body["to_time"];
    var user_id = req.user.id;

    Application.update(description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, function (err, result) {
        if (err) {
            res.json({'Error': err});
        }
        //console.log("code update success query result returned is " + JSON.stringify(result));
        res.json({'updated_code': result});
    });
});

module.exports = router;