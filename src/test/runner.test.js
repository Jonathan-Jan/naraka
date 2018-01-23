let assert = require('assert');
let StoryRunner = require('../core/story/story.runner');

describe('StoryRunner', function() {
    describe('#constructor()', function() {
        it('should has a step', function() {
            const story = new StoryRunner();
            assert(story.step !== undefined);
        });
    });
});
