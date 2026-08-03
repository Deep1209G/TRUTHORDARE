import { Vibration, Platform } from 'react-native';

export function lightTap() {
  if (Platform.OS === 'ios') {
    try {
      const RNHapticFeedback = require('react-native-haptic-feedback');
      RNHapticFeedback.default.trigger('impactLight');
    } catch {
      Vibration.vibrate(10);
    }
  } else {
    Vibration.vibrate(10);
  }
}

export function successFeedback() {
  if (Platform.OS === 'ios') {
    try {
      const RNHapticFeedback = require('react-native-haptic-feedback');
      RNHapticFeedback.default.trigger('notificationSuccess');
    } catch {
      Vibration.vibrate([0, 30, 10, 20]);
    }
  } else {
    Vibration.vibrate([0, 30, 10, 20]);
  }
}
