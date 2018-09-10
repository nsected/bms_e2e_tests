const addContext = require('mochawesome/addContext');
var util = require('util');

describe('test suite', function () {
    it('should add context', function () {
        console.log(util.inspect(this));
        // context can be a simple string
        addContext(JSON.parse(JSON.stringify(util.inspect(this))), 'simple string');

        // context can be a url and the report will create a link
        addContext(this, 'http://www.url.com/pathname');

        // context can be an image url and the report will show it inline
        addContext(this, 'http://www.url.com/screenshot-maybe.jpg');

        // context can be an object with title and value properties
        addContext(this, {
            title: 'expected output',
            value: {
                a: 1,
                b: '2',
                c: 'd'
            }
        });
    })
});