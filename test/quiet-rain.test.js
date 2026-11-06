import test from 'node:test';
import assert from 'node:assert/strict';
import { quietDrops } from '../scripts/generate-quiet-rain.mjs';

test('quiet raindrops leave most of the track silent rather than forming a rain curtain', () => {
  for (const rate of [8000, 44100]) {
    const channels = quietDrops(rate, 8, 377);
    const frame = Math.round(rate * .02);
    let quiet = 0, frames = 0, peak = 0, biggestStep = 0;
    for (let i = 0; i + frame <= channels[0].length; i += frame) {
      let square = 0;
      for (let j = i; j < i + frame; j++) {
        const value = channels[0][j];
        assert.ok(Number.isFinite(value));
        square += value * value;
        peak = Math.max(peak, Math.abs(value));
        if (j) biggestStep = Math.max(biggestStep, Math.abs(value - channels[0][j - 1]));
      }
      if (Math.sqrt(square / frame) < .0001) quiet++;
      frames++;
    }
    assert.ok(quiet / frames > .75, 'water drops need quiet space between them');
    assert.ok(peak > .05 && peak <= .261, 'drops remain audible with peak headroom');
    assert.ok(biggestStep < .25, 'rounded attacks must avoid full-scale clicks');
    assert.equal(channels[0][0], 0); assert.equal(channels[0].at(-1), 0);
  }
});

test('distant droplets stay substantially quieter than the detail layer', () => {
  const peak = channels => Math.max(...channels[0]);
  assert.ok(peak(quietDrops(8000, 5, 801, true)) < peak(quietDrops(8000, 5, 377)) / 20);
});
