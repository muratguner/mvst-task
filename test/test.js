var expect  = require('chai').expect;
var request = require('request');

it('Default Test', function(done) {
    request('http://localhost:5000' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

it('Invalid Access Token Test', function(done) {
    request('http://localhost:5000/api/repositories?name=awesome' , function(error, response, body) {
        expect(response.body).to.equal('"Invalid Token"');
        done();
    });
});