import fs from 'fs';
import path from 'path';
import isJpg from 'is-jpg';
import pify from 'pify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test('extract file', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures', 'file.tar'));
	const files = await m()(buf);

	t.is(files[0].path, 'test.jpg');
	t.true(isJpg(files[0].data));
});

test('extract symlinks', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures', 'symlink.tar'));
	const files = await m()(buf);

	t.is(files[0].path, 'test-symlink/symlink');
	t.is(files[0].type, 'symlink');
	t.is(files[0].linkname, 'file.txt');
	t.is(files[1].path, 'test-symlink/file.txt');
	t.is(files[1].type, 'file');
});

test('ignore non-valid files', async t => {
	const buf = await fsP.readFile(__filename);
	const data = await m()(buf);

	t.deepEqual(buf, data);
});

test('throw on wrong input', async t => {
	t.throws(m()('foo'), 'Expected a Buffer, got string');
});
