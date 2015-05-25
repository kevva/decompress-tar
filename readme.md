# decompress-tar [![Build Status](http://img.shields.io/travis/kevva/decompress-tar.svg?style=flat)](https://travis-ci.org/kevva/decompress-tar)

> tar decompress plugin


## Install

```
$ npm install --save decompress-tar
```


## Usage

```js
var fs = require('fs');
var decompressTar = require('decompress-tar');
var extract = decompressTar();

extract.on('entry', function (header, stream, cb) {
	stream.on('end', cb);
	stream.resume();
});

fs.createReadStream('unicorn.tar').pipe(extract);
```


## API

### decompressTar(options)

#### options.strip

Type: `number`  
Default: `0`

Remove leading directory components from extracted files.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
