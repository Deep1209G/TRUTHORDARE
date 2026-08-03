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

const AGE_GROUPS = [
  {
    key: 'kids',
    emoji: '\u{1F476}',
    title: 'Kids',
    description: 'Fun and family-friendly',
  },
  {
    key: 'teens',
    emoji: '\u{1F9D1}',
    title: 'Teens',
    description: 'A little more playful and daring',
  },
  {
    key: 'adults',
    emoji: '\u{1F474}',
    title: 'Adults',
    description: 'Full party mode',
  },
];

export default function AgeSelectionScreen({ navigation }: Props) {
  const { setAgeGroup } = useGame();

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
            Choose Age Group
          </Text>
          <Text fontSize={13} color="textSecondary" marginTop={4}>
            We will tailor the questions to your group
          </Text>
        </Box>

        {/* Age options */}
        <Box paddingHorizontal={24} paddingTop={24}>
          {AGE_GROUPS.map(group => (
            <Pressable
              key={group.key}
              onPress={() => {
                lightTap();
                setAgeGroup(group.key as 'kids' | 'teens' | 'adults');
                navigation.navigate('CategorySelection');
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
                  {group.emoji}
                </Text>
                <Box flex={1}>
                  <Text fontSize={16} fontWeight="700" color="white">
                    {group.title}
                  </Text>
                  <Text fontSize={12} color="textSecondary" marginTop={2}>
                    {group.description}
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
