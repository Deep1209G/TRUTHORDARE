import React from 'react';

import { Pressable, Alert } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useGame, Difficulty } from '../context/GameContext';
import TickIcon from '../assets/icon/tick.svg';
import ResetIcon from '../assets/icon/reset.svg';
import CloseIcon from '../assets/icon/close.svg';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

const DIFFICULTIES: {
  label: string;
  value: Difficulty;
  description: string;
}[] = [
  { label: 'Mild', value: 'mild', description: 'Playful & fun' },
  { label: 'Medium', value: 'medium', description: 'A bit spicy' },
  { label: 'Wild', value: 'wild', description: 'Full chaos' },
];

export default function SettingsScreen({ navigation }: Props) {
  const {
    soundEnabled,
    setSoundEnabled,
    difficulty,
    setDifficulty,
    resetGame,
    endGame,
  } = useGame();

  function handleReset() {
    Alert.alert(
      'Reset Game',
      'This will clear all scores and reset settings. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetGame();
            navigation.goBack();
          },
        },
      ],
    );
  }

  function handleLeave() {
    Alert.alert(
      'End Game',
      'Are you sure you want to end the game? All progress will be lost and the entire game will stop.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Game',
          style: 'destructive',
          onPress: () => {
            endGame();
            navigation.navigate('GameOver');
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <Box paddingHorizontal={24} paddingTop={16} paddingBottom={40}>
          <Box flexDirection="row" alignItems="center" marginBottom={32}>
            <Pressable onPress={() => navigation.goBack()}>
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
              Settings
            </Text>
          </Box>

          {/* Difficulty */}
          <Box marginBottom={32}>
            <Text variant="subtitle" marginBottom={16}>
              DIFFICULTY
            </Text>
            {DIFFICULTIES.map(item => {
              const active = difficulty === item.value;
              return (
                <Pressable
                  key={item.value}
                  onPress={() => setDifficulty(item.value)}
                >
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    backgroundColor="surface"
                    borderRadius="md"
                    paddingHorizontal={16}
                    paddingVertical={14}
                    marginBottom={8}
                    style={{
                      borderWidth: 1,
                      borderColor: active ? '#818CF8' : 'transparent',
                    }}
                  >
                    <Box flex={1}>
                      <Text
                        fontSize={15}
                        fontWeight="600"
                        color={active ? 'white' : 'textSecondary'}
                      >
                        {item.label}
                      </Text>
                      <Text fontSize={12} color="textSecondary" marginTop={2}>
                        {item.description}
                      </Text>
                    </Box>
                    {active && (
                      <Box
                        width={22}
                        height={22}
                        borderRadius="circle"
                        backgroundColor="purple"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <TickIcon width={12} height={12} color="white" />
                      </Box>
                    )}
                  </Box>
                </Pressable>
              );
            })}
          </Box>

          {/* Sound */}
          <Box marginBottom={32}>
            <Text variant="subtitle" marginBottom={16}>
              AUDIO
            </Text>
            <Pressable onPress={() => setSoundEnabled(!soundEnabled)}>
              <Box
                flexDirection="row"
                alignItems="center"
                backgroundColor="surface"
                borderRadius="md"
                paddingHorizontal={16}
                paddingVertical={14}
                marginBottom={8}
              >
                <Box flex={1}>
                  <Text fontSize={15} fontWeight="600" color="white">
                    Sound Effects
                  </Text>
                  <Text fontSize={12} color="textSecondary" marginTop={2}>
                    Spin sounds, button taps, and celebration effects
                  </Text>
                </Box>
                <Box
                  width={48}
                  height={28}
                  borderRadius="circle"
                  justifyContent="center"
                  paddingHorizontal={3}
                  style={{
                    backgroundColor: soundEnabled ? '#818CF8' : '#334155',
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
          </Box>

          {/* Reset */}
          <Box marginBottom={16}>
            <Text variant="subtitle" marginBottom={16}>
              GAME DATA
            </Text>
            <Pressable onPress={handleReset}>
              <Box
                flexDirection="row"
                alignItems="center"
                borderRadius="md"
                paddingHorizontal={16}
                paddingVertical={14}
                style={{
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  borderWidth: 1,
                  borderColor: 'rgba(239,68,68,0.2)',
                }}
              >
                <Box flex={1}>
                  <Text
                    fontSize={15}
                    fontWeight="600"
                    style={{ color: '#EF4444' }}
                  >
                    Reset Game
                  </Text>
                  <Text fontSize={12} color="textSecondary" marginTop={2}>
                    Clear scores, reset difficulty and sound settings
                  </Text>
                </Box>
                <ResetIcon width={20} height={20} color="#EF4444" />
              </Box>
            </Pressable>
          </Box>

          {/* Leave Game */}
          <Box>
            <Pressable onPress={handleLeave}>
              <Box
                flexDirection="row"
                alignItems="center"
                borderRadius="md"
                paddingHorizontal={16}
                paddingVertical={14}
                style={{
                  backgroundColor: 'rgba(220,38,38,0.12)',
                  borderWidth: 1,
                  borderColor: 'rgba(220,38,38,0.25)',
                }}
              >
                <Box flex={1}>
                  <Text
                    fontSize={15}
                    fontWeight="600"
                    style={{ color: '#EF4444' }}
                  >
                    Leave Game
                  </Text>
                  <Text fontSize={12} color="textSecondary" marginTop={2}>
                    End the current game and show final scores
                  </Text>
                </Box>
                <CloseIcon width={20} height={20} color="#EF4444" />
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
