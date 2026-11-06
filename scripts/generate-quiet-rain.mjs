import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** Short water-like impacts with real quiet gaps; no continuous noise layer. */
export function quietDrops(rate = 48000, seconds = 48, seed = 72, distant = false) {
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const size = Math.round(rate * seconds);
  const channels = [new Float32Array(size), new Float32Array(size)];
  let time = .8;
  while (time < seconds - .35) {
    const start = Math.round(time * rate);
    const duration = .13 + random() * .10;
    const count = Math.round(duration * rate);
    const amplitude = .55 + random() * .45;
    const pan = .35 + random() * .30;
    const frequency = 620 + random() * 460;
    let smooth = 0, low = 0, phase = 0;
    for (let i = 0; i < count; i++) {
      const age = i / rate;
      const white = random() * 2 - 1;
      // Rates are converted from time constants, preserving tone at each sample rate.
      smooth += (1 - Math.exp(-1 / (rate * .00016))) * (white - smooth);
      low += (1 - Math.exp(-1 / (rate * .0012))) * (white - low);
      const attack = Math.sin(Math.min(1, age / .012) * Math.PI / 2) ** 2;
      const tail = (1 - i / count) ** 2;
      phase += 2 * Math.PI * frequency * (1 - .08 * (1 - Math.exp(-age / .018))) / rate;
      const waterBody = Math.sin(phase) * Math.exp(-age / .022) * .12;
      const splash = (smooth - low * .45) * Math.exp(-age / .045) * .88;
      const value = amplitude * attack * tail * (waterBody + splash);
      channels[0][start + i] += value * Math.sqrt(1 - pan);
      channels[1][start + i] += value * Math.sqrt(pan);
    }
    time += distant ? 3.6 + random() * 3.1 : 1.05 + random() * 1.25;
  }
  let peak = 0;
  for (const samples of channels) for (const value of samples) peak = Math.max(peak, Math.abs(value));
  const gain = (distant ? .009 : .26) / Math.max(peak, 1e-9);
  for (const samples of channels) for (let i = 0; i < size; i++) samples[i] *= gain;
  return channels;
}

function wav(channels, rate) {
  const size = channels[0].length;
  const result = Buffer.alloc(44 + size * 4);
  result.write('RIFF', 0); result.writeUInt32LE(result.length - 8, 4); result.write('WAVEfmt ', 8);
  result.writeUInt32LE(16, 16); result.writeUInt16LE(1, 20); result.writeUInt16LE(2, 22);
  result.writeUInt32LE(rate, 24); result.writeUInt32LE(rate * 4, 28); result.writeUInt16LE(4, 32);
  result.writeUInt16LE(16, 34); result.write('data', 36); result.writeUInt32LE(size * 4, 40);
  for (let i = 0; i < size; i++) for (let channel = 0; channel < 2; channel++) {
    result.writeInt16LE(Math.round(Math.max(-1, Math.min(1, channels[channel][i])) * 32767), 44 + i * 4 + channel * 2);
  }
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  if (!process.argv[2]) throw new Error('Pass an output directory for the WAV masters.');
  const output = path.resolve(process.argv[2]);
  await mkdir(output, { recursive: true });
  await writeFile(path.join(output, 'quiet-bed.wav'), wav(quietDrops(48000, 48, 801, true), 48000));
  await writeFile(path.join(output, 'quiet-detail.wav'), wav(quietDrops(48000, 48, 377, false), 48000));
  console.log('Created sparse soft drops with silent intervals.');
}
