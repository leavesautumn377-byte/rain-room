import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { loopChannel, RECORDINGS } from '../src/recordings.js';

test('only the approved rain-on-leaves recording is packaged for rain playback', async () => {
  const hashes = { bed: '113d987903eea28f28e27e124eaa67844c2312de7ee1bd9c615ede905ce5cd20' };
  assert.deepEqual(Object.keys(RECORDINGS), ['bed']);
  for (const [kind, url] of Object.entries(RECORDINGS)) {
    const bytes = await readFile(url);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), hashes[kind]);
  }
});

test('crossfade removes a discontinuity between a recording tail and head', () => {
  const input = Float32Array.from({ length: 1000 }, (_, i) => i / 999 * .8 - .4);
  const loop = loopChannel(input, 100, 2);
  assert.equal(loop.length, 800);
  assert.ok(Math.abs(loop[0] - loop.at(-1)) < .002);
  assert.ok(Math.abs(loop[199] - loop[200]) < .002);
  assert.deepEqual(loop.slice(200), input.slice(200, 800));
  assert.equal(input[0], Math.fround(-.4));
});
