import fs from 'fs';
import path from 'path';
import isJpg from 'is-jpg';
import pify from 'pify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test('extract file', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixture.tar'));
	const files = await m()(buf);

	t.is(files[0].path, 'test.jpg');
	t.true(isJpg(files[0].data));
});
