/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

const MODES = [
  {
    key: 'standard',
    emoji: '\u{1F916}',
    title: 'App Host',
    description: 'The app asks all Truth and Dare questions',
    screen: 'AgeSelection',
  },
  {
    key: 'physical',
    emoji: '\u{1F464}',
    title: 'Player Host',
    description: 'Players create and ask their own Truths and Dares',
    screen: 'TurnTimer',
  },
];

export default function HostModeScreen({ navigation }: Props) {
  const { setGameMode } = useGame();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        {/* Header */}
        <Box paddingHorizontal={24} paddingTop={16}>
          <Box flexDirection="row" alignItems="center">
            <Box width={42}>
              <Pressable
                onPress={() => {
                  lightTap();
                  navigation.goBack();
                }}
              >
                <Box
                  width={42}
                  height={42}
                  borderRadius="md"
                  backgroundColor="surface"
                  justifyContent="center"
                  alignItems="center"
                >
                  <BackIcon width={18} height={18} color="white" />
                </Box>
              </Pressable>
            </Box>
            <Box alignItems="center" flex={1}>
              <Text variant="title" fontSize={28} textAlign="center">
                TRUTH OR DARE
              </Text>
            </Box>
            <Box width={42} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={24} paddingTop={32}>
          <Text fontSize={24} fontWeight="700" color="white">
            Choose Host Mode
          </Text>
          <Text fontSize={13} color="textSecondary" marginTop={4}>
            Who should ask the Truths and Dares?
          </Text>
        </Box>

        {/* Mode options */}
        <Box paddingHorizontal={24} paddingTop={24}>
          {MODES.map(mode => (
            <Pressable
              key={mode.key}
              onPress={() => {
                lightTap();
                setGameMode(mode.key as 'standard' | 'physical');
                navigation.navigate(mode.screen);
              }}
            >
              <Box
                flexDirection="row"
                alignItems="center"
                borderRadius="lg"
                padding={16}
                marginBottom={12}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  borderRadius: 24,
                }}
              >
                <Text fontSize={28} marginRight={14}>
                  {mode.emoji}
                </Text>
                <Box flex={1}>
                  <Text fontSize={16} fontWeight="700" color="white">
                    {mode.title}
                  </Text>
                  <Text fontSize={12} color="textSecondary" marginTop={2}>
                    {mode.description}
                  </Text>
                </Box>
              </Box>
            </Pressable>
          ))}
        </Box>
      </Box>
    </SafeAreaView>
  );
}
