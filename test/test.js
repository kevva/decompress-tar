/*global afterEach, describe, it */
'use strict';

var assert = require('assert');
var Decompress = require('decompress');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var tar = require('../');

describe('tar()', function () {
    afterEach(function (cb) {
        rimraf(path.join(__dirname, 'tmp'), cb);
    });

    it('should decompress a TAR file', function (cb) {
        var decompress = new Decompress();

        decompress
            .src(path.join(__dirname, 'fixtures/test.tar'))
            .dest(path.join(__dirname, 'tmp'))
            .use(tar())
            .decompress(function (err) {
                assert(!err);
                assert(fs.existsSync(path.join(__dirname, 'tmp/test.jpg')));
                cb();
            });
    });

    it('should strip path level using the `strip` option', function (cb) {
        var decompress = new Decompress();

        decompress
            .src(path.join(__dirname, 'fixtures/test-nested.tar'))
            .dest(path.join(__dirname, 'tmp'))
            .use(tar({ strip: 1 }))
            .decompress(function (err) {
                assert(!err);
                assert(fs.existsSync(path.join(__dirname, 'tmp/test/test-nested.jpg')));
                cb();
            });
    });
});
