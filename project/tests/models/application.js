var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Application = require('../../models/application');

describe('Application Model', function () {
    it('should get the Applications list and have properties description, id', function () {
        Application.get(null, function (err, rows) {
            expect(err).to.equal(null);
            expect(rows.length).to.be.above(0);
            expect(rows[0]).to.have.property('description');
            expect(rows[0]).to.have.property('id');
            //console.log("Application get result is " + JSON.stringify(rows));
        });
    });

    it('should create an application', function () {
        Application.create("from_test", 199, 199, 199, 199, "2016-11-09T14:01", "2016-11-09T14:01", 2, function (err, result) {
            expect(err).to.equal(null);
            //console.log("Application create insertId is " + result.insertId);
        });
    });

    it('should update an application with id 1', function () {
        Application.update(1, "from_test", 199, 199, 199, 199, "2016-11-09T14:01", "2016-11-09T14:01", 2, function (err, result) {
            expect(err).to.equal(null);
            //console.log("Application update result is " + JSON.stringify(result));
        });
    });

    it('should delete an application with id 1', function () {
        Application.delete(1, function (err, result) {
            expect(err).to.equal(null);
            //console.log("Application delete result is " + JSON.stringify(result));
        });
    });
});