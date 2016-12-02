var should = require('chai').should(),
    ssn = require('../index');

describe('generate and validate', function() {
    for (var state in ssn.states) { 
        var num = ssn.generate(ssn.states[state]);
        it('ssn for ' + ssn.states[state], function() {
            ssn.validate(num).should.equal(ssn.states[state]);
        });
    }
});
