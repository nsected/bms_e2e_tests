const addContext = require('mochawesome/addContext');
var util = require('util');

describe('test suite', function () {
    it('should add context', function () {
        addContext(this, { title: 'Screenshot', value: 'videos/publisher/store/game-keys/game keys -- publisherstoregame-keysgame-keyscreate-packagebase-settingsjs -- before all hook (failed).png'});
        addContext(this, { title: 'Video', value: 'videos/publisher/store/game-keys/game2.mp4'});
    })
});