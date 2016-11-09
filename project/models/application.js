var db = require('../db.js');
var SQLHelper = require('../helpers/sqlHelper');
var DateHelper = require('../helpers/date.js');
var ArrayHelper = require('../helpers/arrayHelper.js');
var tableName = "applications";
var tableColumns = ["id", "description", "sc_ka", "failure_fault_ka", "sc_duration", "n_shots", "from_time", "to_time", "user_id", "cancel_request"];

exports.get = function (id, done) {
    var whereClause = "";
    if (id && !isNaN(id)) {//qualifies if id != "" and id!=null and id is a number
        whereClause = " WHERE id = " + id;
    }
    var sql = "SELECT * FROM " + tableName + whereClause;
    //console.log("sql for get single is " + sql);
    db.get().query(sql, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.create = function (description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, done) {
    var f_time_sql = DateHelper.getDateTimeString(new Date(from_time) - 5.5 * 60 * 60 * 1000);
    var t_time_sql = DateHelper.getDateTimeString(new Date(to_time) - 5.5 * 60 * 60 * 1000);
    var values = [[description], [sc_ka], [failure_fault_ka], [sc_duration], [n_shots], [f_time_sql], [t_time_sql], [user_id]];
    var sql = SQLHelper.createSQLInsertString(tableName, tableColumns.slice(1, tableColumns.length - 1), values);
    db.get().query(sql.SQLQueryString, sql.SQLQueryValues, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};