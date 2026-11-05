import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { loopChannel, RECORDINGS } from '../src/recordings.js';

test('packaged CC0 recordings are the curated and balanced excerpts', async () => {
  const hashes = { bed: '04ebfce1d35385f9a68cc584673c320b0bf8858028252dac94c6d8f0149764c2', detail: 'bc8091bd832ab7a1668e3ed2ed906291e00d7d69fa080a9ae22e33897cb413d9' };
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
