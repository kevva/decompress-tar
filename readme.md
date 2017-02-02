# decompress-tar [![Build Status](http://img.shields.io/travis/kevva/decompress-tar.svg?style=flat)](https://travis-ci.org/kevva/decompress-tar)

> tar decompress plugin


## Install

```
$ npm install --save decompress-tar
```


## Usage

```js
const decompress = require('decompress');
const decompressTar = require('decompress-tar');

decompress('unicorn.tar', 'dist', {
	plugins: [
		decompressTar()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressTar()(input, [options])

Returns both a Promise for a Buffer and a [Duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

#### input

Type: `Buffer` `Stream`

Buffer or stream to decompress.

#### options

##### legacyTar

Type: `boolean`<br>
Default: `false`

Prevent file check for [pre-POSIX.1-1988 (i.e. v7)](https://en.wikipedia.org/wiki/Tar_(computing)#File_format) tar files where there is no magic number for recognition. Should use if is generated from old Linux releases.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
