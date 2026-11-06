export const RECORDINGS = {
  bed: new URL('../assets/audio/rain-on-leaves.mp3', import.meta.url)
};

export function rainMix({ amount = 65, texture = 75, scene = 'forest' } = {}) {
  const rain = Math.max(0, Math.min(1, amount / 100));
  const detail = Math.max(0, Math.min(1, texture / 100));
  if (scene === 'day') return { cutoff: 1500 + detail * 2000, levels: { bed: 0, detail: 0, wind: .32 + rain * .22 } };
  if (scene === 'lake') return { cutoff: 1000 + detail * 1400, levels: { bed: 0, detail: 0, wind: .6 + rain * .3 } };
  const sheltered = scene === 'window';
  return {
    cutoff: sheltered ? 3500 + detail * 3500 : Math.min(20000, 6000 + detail * 14000 / .75),
    levels: {
      bed: (.64 + rain * .36) * (sheltered ? .72 : 1),
      detail: 0,
      wind: 0
    }
  };
}

// Overlap the recording's tail with its head; the resulting buffer can loop
// without a hard cut. Keep stereo timing and the original rain's dynamics.
export function loopChannel(samples, sampleRate, seconds = 1.25) {
  const overlap = Math.min(Math.round(sampleRate * seconds), Math.floor(samples.length / 4));
  if (overlap < 2) return samples.slice();
  const output = samples.slice(0, samples.length - overlap);
  for (let i = 0; i < overlap; i++) {
    const angle = i / (overlap - 1) * Math.PI / 2;
    output[i] = samples[output.length + i] * Math.cos(angle) + samples[i] * Math.sin(angle);
  }
  return output;
}
