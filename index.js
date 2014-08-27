'use strict';

var isTar = require('is-tar');
var sbuff = require('simple-bufferstream');
var stripDirs = require('strip-dirs');
var tar = require('tar');

/**
 * tar decompress plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
    opts = opts || {};
    opts.strip = +opts.strip || 0;

    return function (file, decompress, cb) {
        var files = [];

        if (!isTar(file.contents)) {
            cb();
            return;
        }

        sbuff(file.contents).pipe(tar.Parse())
            .on('error', function (err) {
                cb(err);
                return;
            })

            .on('entry', function (file) {
                if (file.type !== 'Directory') {
                    var chunk = '';

                    file.on('data', function (data) {
                        chunk += data.toString();
                    });

                    file.on('end', function () {
                        chunk = new Buffer(chunk);
                        files.push({ contents: chunk, path: stripDirs(file.path, opts.strip) });
                    });
                }
            })

            .on('end', function () {
                decompress.files = files;
                cb();
            });
    };
};
