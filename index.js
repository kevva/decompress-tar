'use strict';

var ifStream = require('if-stream');
var isTar = require('is-tar');
var stripDirs = require('strip-dirs');
var tarStream = require('tar-stream');

module.exports = function (opts) {
	opts = opts || {};
	opts.strip = typeof opts.strip === 'number' ? opts.strip : 0;

	var extract = tarStream.extract();
	var ret = ifStream(isTar, extract);

	extract.on('entry', function (header, stream, cb) {
		if (header.type !== 'directory') {
			header.name = stripDirs(header.name, opts.strip);
			ret.emit('entry', header, stream, cb);
		}

		stream.on('end', cb);
		stream.resume();
	});

	return ret;
};
