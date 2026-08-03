import Sound from 'react-native-sound';

Sound.setCategory('Playback');

type SoundName = 'tap' | 'spin' | 'result';

const sounds: Partial<Record<SoundName, Sound>> = {};

function loadSound(name: SoundName): Promise<void> {
  return new Promise((resolve) => {
    const sound = new Sound(`${name}.wav`, Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        resolve();
        return;
      }
      sounds[name] = sound;
      resolve();
    });
  });
}

let loaded = false;

async function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  await Promise.all([loadSound('tap'), loadSound('spin'), loadSound('result')]);
}

export function playSound(name: SoundName, soundEnabled: boolean) {
  if (!soundEnabled) return;
  ensureLoaded();
  const sound = sounds[name];
  if (sound) {
    sound.stop(() => {
      sound.currentTime = 0;
      sound.play();
    });
  }
}

export function releaseSounds() {
  Object.values(sounds).forEach((s) => s?.release());
  loaded = false;
}
