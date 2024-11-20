import { Audio } from 'expo-av';

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
});
const soundFileSuccess = require('../../../assets/sounds/notification-sound.wav');
const soundFileError = require('../../../assets/sounds/error-sound.mp3');

type EventType = 'success' | 'error';

const soundByEvent = {
  ['success']: soundFileSuccess,
  ['error']: soundFileError,
};

/** Function ue to play an wav/mp3 sound */
export async function playSound(eventType: EventType) {
  const sound = new Audio.Sound();

  try {
    await sound.loadAsync(soundByEvent[eventType]);
    await sound.playAsync();
  } catch (error) {
    console.error(error);
  }
}
