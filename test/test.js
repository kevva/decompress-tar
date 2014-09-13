'use strict';

var File = require('vinyl');
var fs = require('fs');
var isJpg = require('is-jpg');
var path = require('path');
var tar = require('../');
var test = require('ava');

test('decompress a TAR file', function (t) {
    t.plan(2);

    fs.readFile(path.join(__dirname, 'fixtures/test.tar'), function (err, buf) {
        t.assert(!err);

        var stream = tar();
        var file = new File({
            contents: buf
        });

        stream.on('data', function (file) {
            t.assert(isJpg(file.contents));
        });

        stream.end(file);
    });
});

test('strip path level using the `strip` option', function (t) {
    t.plan(3);

    fs.readFile(path.join(__dirname, 'fixtures/test-nested.tar'), function (err, buf) {
        t.assert(!err);

        var stream = tar({ strip: 1 });
        var file = new File({
            contents: buf
        });

        stream.on('data', function (file) {
            t.assert(file.path === 'test.jpg');
            t.assert(isJpg(file.contents));
        });

        stream.end(file);
    });
});
