'use strict';

var isJpg = require('is-jpg');
var path = require('path');
var read = require('vinyl-file').read;
var tar = require('../');
var test = require('ava');

test('decompress a TAR file', function (t) {
	t.plan(2);

	read(path.join(__dirname, 'fixtures/test.tar'), function (err, file) {
		t.assert(!err, err);

		var stream = tar();

		stream.on('data', function (file) {
			t.assert(isJpg(file.contents));
		});

		stream.end(file);
	});
});

test('strip path level using the `strip` option', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test-nested.tar'), function (err, file) {
		t.assert(!err, err);

		var stream = tar({strip: 1});

		stream.on('data', function (file) {
			t.assert(file.path === 'test.jpg');
			t.assert(isJpg(file.contents));
		});

		stream.end(file);
	});
});
