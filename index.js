'use strict';
const fileType = require('file-type');
const tarStream = require('tar-stream');

module.exports = () => buf => {
	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError(`Expected a Buffer, got ${typeof buf}`));
	}

	if (!fileType(buf) || fileType(buf).ext !== 'tar') {
		return Promise.resolve([]);
	}

	const extract = tarStream.extract();
	const files = [];

	extract.on('entry', (header, stream, cb) => {
		const chunk = [];

		stream.on('data', data => chunk.push(data));
		stream.on('end', () => {
			const file = {
				data: Buffer.concat(chunk),
				mode: header.mode,
				mtime: header.mtime,
				path: header.name,
				type: header.type
			};

			if (header.type === 'symlink' || header.type === 'link') {
				file.linkname = header.linkname;
			}

			files.push(file);
			cb();
		});
	});

	extract.end(buf);

	return new Promise((resolve, reject) => {
		extract.on('finish', () => resolve(files));
		extract.on('error', reject);
	});
};
