import Sound from 'react-native-sound';

Sound.setCategory('Playback');

type SoundName = 'tap' | 'spin' | 'result';

const names: SoundName[] = ['tap', 'spin', 'result'];

const sounds: Partial<Record<SoundName, Sound>> = {};

let loadPromise: Promise<void> | null = null;

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

function allLoaded(): boolean {
  return names.every((name) => sounds[name]);
}

function ensureLoaded(): Promise<void> {
  if (allLoaded()) return Promise.resolve();
  let promise = loadPromise;
  if (!promise) {
    promise = Promise.all(names.map(loadSound))
      .then(() => undefined)
      .finally(() => {
        loadPromise = null;
      });
    loadPromise = promise;
  }
  return promise;
}

export function playSound(name: SoundName, soundEnabled: boolean) {
  if (!soundEnabled) return;
  ensureLoaded().then(() => {
    const sound = sounds[name];
    if (sound) {
      sound.stop(() => {
        sound.currentTime = 0;
        sound.play();
      });
    }
  });
}

export async function releaseSounds() {
  await ensureLoaded();
  names.forEach((name) => {
    sounds[name]?.release();
    delete sounds[name];
  });
}
