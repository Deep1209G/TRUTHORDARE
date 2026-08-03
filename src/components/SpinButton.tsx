import React, { useRef } from 'react';

import { Pressable, Animated } from 'react-native';

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';
import { playSound } from '../services/SoundService';
import { lightTap } from '../services/HapticService';

type Props = {
  onSpin: () => void;
  spinning: boolean;
};

export default function SpinButton({ onSpin, spinning }: Props) {
  const { soundEnabled } = useGame();
  const scale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  }

  function pressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  function handlePress() {
    lightTap();
    playSound('tap', soundEnabled);
    onSpin();
  }

  return (
    <Box alignItems="center" marginTop={20}>
      <Pressable
        onPress={handlePress}
        disabled={spinning}
        onPressIn={pressIn}
        onPressOut={pressOut}
      >
        <Animated.View
          style={{
            transform: [
              {
                scale,
              },
            ],
          }}
        >
          <Box
            width={104}
            height={104}
            borderRadius="circle"
            backgroundColor="orange"
            justifyContent="center"
            alignItems="center"
            opacity={spinning ? 0.6 : 1}
          >
            <Text variant="button">{spinning ? '...' : 'SPIN'}</Text>
          </Box>
        </Animated.View>
      </Pressable>

      <Text variant="subtitle" marginTop={16}>
        {spinning ? 'SPINNING' : 'TAP TO SPIN THE BOTTLE'}
      </Text>
    </Box>
  );
}
