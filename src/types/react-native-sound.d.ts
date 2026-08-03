declare module 'react-native-sound' {
  class Sound {
    constructor(
      filename: string,
      basePath: string | typeof Sound.MAIN_BUNDLE,
      onError?: (error?: { message: string }) => void,
    );
    static MAIN_BUNDLE: string;
    static setCategory(category: string): void;
    play(onSuccess?: () => void): void;
    stop(onSuccess?: () => void): void;
    release(): void;
    setCurrentTime(time: number): void;
    get currentTime(): number;
    set currentTime(time: number);
  }
  export default Sound;
}
