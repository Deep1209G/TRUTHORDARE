import React from 'react';

import { Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import BackIcon from '../assets/icon/back.svg';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';

type Props = {
  navigation: any;
};

export default function SoundScreen({ navigation }: Props) {
  const { soundEnabled, setSoundEnabled } = useGame();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <Box paddingHorizontal={24} paddingTop={16} paddingBottom={40}>
          <Box flexDirection="row" alignItems="center" marginBottom={32}>
            <Pressable
              onPress={() => {
                lightTap();
                navigation.goBack();
              }}
            >
              <Box
                width={40}
                height={40}
                borderRadius="md"
                backgroundColor="surface"
                justifyContent="center"
                alignItems="center"
                marginRight={16}
              >
                <BackIcon width={18} height={18} color="white" />
              </Box>
            </Pressable>
            <Text variant="header" fontSize={28}>
              Sound
            </Text>
          </Box>

          <Pressable
            onPress={() => {
              lightTap();
              setSoundEnabled(!soundEnabled);
            }}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              backgroundColor="surface"
              borderRadius="md"
              paddingHorizontal={16}
              paddingVertical={16}
              style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <Box flex={1}>
                <Text fontSize={16} fontWeight="600" color="white">
                  Sound Effects
                </Text>
                <Text fontSize={12} color="textSecondary" marginTop={4}>
                  Spin sounds, button taps, and celebration effects
                </Text>
              </Box>
              <Box
                width={52}
                height={30}
                borderRadius="circle"
                justifyContent="center"
                paddingHorizontal={4}
                style={{
                  backgroundColor: soundEnabled ? '#7C5CFF' : '#334155',
                }}
              >
                <Box
                  width={22}
                  height={22}
                  borderRadius="circle"
                  backgroundColor="white"
                  style={{
                    alignSelf: soundEnabled ? 'flex-end' : 'flex-start',
                  }}
                />
              </Box>
            </Box>
          </Pressable>

          <Box
            marginTop={24}
            backgroundColor="surface"
            borderRadius="md"
            padding={16}
            style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <Text fontSize={13} color="textSecondary" lineHeight={20}>
              Sound effects play during bottle spins, button presses, and when
              revealing truth or dare questions.
            </Text>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
