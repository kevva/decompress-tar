'use strict';
const isTar = require('is-tar');
const tarStream = require('tar-stream');

module.exports = () => buf => {
	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isTar(buf)) {
		return Promise.resolve(buf);
	}

	const extract = tarStream.extract();
	const files = [];

	extract.on('entry', (header, stream, cb) => {
		const chunk = [];

		stream.on('data', data => chunk.push(data));
		stream.on('end', () => {
			files.push({
				data: Buffer.concat(chunk),
				path: header.name
			});

			cb();
		});
	});

	extract.end(buf);

	return new Promise((resolve, reject) => {
		extract.on('finish', () => resolve(files));
		extract.on('error', reject);
	});
};
