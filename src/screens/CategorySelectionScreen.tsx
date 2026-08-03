/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Text } from '@src';
import { useGame, Difficulty } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import TickIcon from '../assets/icon/tick.svg';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

const CATEGORIES: {
  label: string;
  value: Difficulty;
  description: string;
}[] = [
  { label: 'Mild', value: 'mild', description: 'Playful & fun' },
  { label: 'Medium', value: 'medium', description: 'A bit spicy' },
  { label: 'Wild', value: 'wild', description: 'Full chaos' },
];

export default function CategorySelectionScreen({ navigation }: Props) {
  const { difficulty, setDifficulty } = useGame();

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
                Challenge Level
              </Text>
            </Box>
            <Box width={42} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={24} paddingTop={16}>
          {/* <Text fontSize={24} fontWeight="700" color="white">
            Choose Category
          </Text> */}
          <Text fontSize={13} color="textSecondary" marginTop={4}>
            Pick the intensity level for this game
          </Text>
        </Box>

        {/* Category options */}
        <Box paddingHorizontal={24} paddingTop={24}>
          {CATEGORIES.map(item => {
            const active = difficulty === item.value;
            return (
              <Pressable
                key={item.value}
                onPress={() => {
                  lightTap();
                  setDifficulty(item.value);
                  navigation.navigate('QuestionType');
                }}
              >
                <Box
                  flexDirection="row"
                  alignItems="center"
                  borderRadius="lg"
                  padding={16}
                  marginBottom={12}
                  style={
                    active
                      ? {
                          backgroundColor: '#818CF8',
                          borderRadius: 24,
                          shadowColor: '#818CF8',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.4,
                          shadowRadius: 12,
                          elevation: 8,
                          borderWidth: 1.5,
                          borderColor: 'rgba(255,255,255,0.2)',
                        }
                      : {
                          backgroundColor: 'rgba(255,255,255,0.07)',
                          borderRadius: 24,
                        }
                  }
                >
                  <Box flex={1}>
                    <Text
                      fontSize={16}
                      fontWeight="700"
                      color={active ? 'white' : 'textSecondary'}
                    >
                      {item.label}
                    </Text>
                    <Text
                      fontSize={12}
                      color={active ? 'white' : 'textSecondary'}
                      opacity={active ? 0.8 : 0.6}
                    >
                      {item.description}
                    </Text>
                  </Box>
                  {active && (
                    <TickIcon width={24} height={24} color="white" />
                  )}
                </Box>
              </Pressable>
            );
          })}
        </Box>
      </Box>
    </SafeAreaView>
  );
}
