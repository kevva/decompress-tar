'use strict';

var isJpg = require('is-jpg');
var path = require('path');
var test = require('ava');
var vinylFile = require('vinyl-file');
var decompressTar = require('../');

test('decompress a TAR file', function (t) {
	t.plan(2);

	var file = vinylFile.readSync(path.join(__dirname, 'fixtures/test.tar'));
	var stream = decompressTar();

	file.extract = true;

	stream.on('data', function (file) {
		t.assert(!file.stat.isDirectory());
		t.assert(isJpg(file.contents));
	});

	stream.end(file);
});

test('strip path level using the `strip` option', function (t) {
	t.plan(3);

	var file = vinylFile.readSync(path.join(__dirname, 'fixtures/test-nested.tar'));
	var stream = decompressTar({strip: 1});

	file.extract = true;

	stream.on('data', function (file) {
		t.assert(!file.stat.isDirectory());
		t.assert(file.path === 'test.jpg', file.path);
		t.assert(isJpg(file.contents));
	});

	stream.end(file);
});

test('decompress a TAR file with a symlink', function (t) {
	t.plan(5);

	var file = vinylFile.readSync(path.join(__dirname, 'fixtures/test-symlink.tar'));
	var stream = decompressTar();

	file.extract = true;

	stream.on('data', function (file) {
		switch(file.path)
		{
			case 'test-symlink/file.txt':
				t.assert(!file.stat.isDirectory());
				t.assert(file.symlink === undefined, file.symlink);
				t.assert(file.contents.length === 6, file.contents.length);
			break;

			case 'test-symlink/symlink':
				t.assert(file.symlink === 'file.txt', file.symlink);
				t.assert(file.contents.length === 0, file.contents.length);
			break;
		}
	});

	stream.end(file);
});
