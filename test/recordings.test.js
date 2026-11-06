import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { loopChannel, RECORDINGS } from '../src/recordings.js';

test('packaged sparse drop textures match the checked generated assets', async () => {
  const hashes = { bed: '338e2559ab91a329ca6f9fab083425d6490a40f8dac100f1b16c8603d44c79ad', detail: '579664bc3fa10cba6b4adcfb74bde54b2ec3ab9b751f7c68cd5a7a7682e87bdf' };
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
