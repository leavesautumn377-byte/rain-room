import test from 'node:test';
import assert from 'node:assert/strict';
import { synthesizeRain } from '../src/rain-sound.js';
import { rainMix } from '../src/audio.js';

function seeded(seed = 72) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
}
function stats(samples) {
  let peak = 0, square = 0;
  for (const sample of samples) { assert.ok(Number.isFinite(sample)); peak = Math.max(peak, Math.abs(sample)); square += sample * sample; }
  return { peak, rms: Math.sqrt(square / samples.length) };
}
test('all rain layers produce bounded, non-silent stereo at common audio rates', () => {
  for (const rate of [44100, 48000]) for (const kind of ['bed', 'leaves', 'drops', 'glass']) {
    const channels = synthesizeRain(kind, rate, 2, seeded());
    assert.equal(channels.length, 2); assert.equal(channels[0].length, rate * 2);
    for (const channel of channels) { const signal = stats(channel); assert.ok(signal.peak <= .851); assert.ok(signal.rms > .001); }
    assert.notDeepEqual(channels[0], channels[1]);
  }
});
test('selected leaf recording stays continuous outdoors and is softened through the window', () => {
  const forest = rainMix({ scene: 'forest' }), window = rainMix({ scene: 'window' });
  assert.ok(window.cutoff < forest.cutoff);
  assert.ok(window.levels.bed < forest.levels.bed);
  for (const scene of ['spring', 'pond', 'forest', 'window']) {
    const mix = rainMix({ scene, texture: 100 });
    assert.ok(mix.levels.bed > 0); assert.equal(mix.levels.detail, 0);
    assert.equal(mix.levels.wind, 0);
  }
});

test('texture changes distance without layering a different rain or synthetic droplets', () => {
  const soft = rainMix({ scene: 'forest', texture: 0 });
  const clear = rainMix({ scene: 'forest', texture: 100 });
  const normal = rainMix({ scene: 'forest' });
  assert.ok(normal.levels.bed > normal.levels.detail);
  assert.ok(clear.cutoff > soft.cutoff);
  assert.equal(clear.levels.bed, soft.levels.bed);
  assert.equal(normal.cutoff, 20000, 'default outdoor setting retains the approved recording tone');
  for (const mix of [soft, clear, normal]) {
    assert.equal(mix.levels.detail, 0, 'only the approved field recording should play');
    assert.ok(mix.levels.bed > 0, 'the selected rain must remain continuous');
  }
});

test('soft drop samples have a rounded onset rather than sharp single-sample clicks', () => {
  const samples = synthesizeRain('glass', 44100, 3, seeded())[0];
  let difference = 0, energy = 0;
  for (let i = 1; i < samples.length; i++) { difference += (samples[i] - samples[i - 1]) ** 2; energy += samples[i] ** 2; }
  assert.ok(difference / energy < .4);
});
test('near water drops retain distinct transients rather than becoming a continuous hiss', () => {
  const bed = stats(synthesizeRain('bed', 44100, 3, seeded())[0]);
  const drops = stats(synthesizeRain('drops', 44100, 3, seeded())[0]);
  assert.ok(drops.peak / drops.rms > bed.peak / bed.rms * 1.2);
});
