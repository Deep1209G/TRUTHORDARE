/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Pressable, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import BackIcon from '../assets/icon/back.svg';
import { lightTap } from '../services/HapticService';

type Props = {
  navigation: any;
};

const RULES = [
  {
    title: 'Setup',
    body: 'Gather 2-10 players. Each player gets a unique color. Arrange yourselves in a circle around the device.',
  },
  {
    title: 'Spin the Bottle',
    body: 'Tap the PLAY button to spin the bottle. When it stops, it points to one player — that player is IT!',
  },
  {
    title: 'Choose Truth or Dare',
    body: 'The selected player must choose: answer a TRUTH question honestly, or complete a DARE challenge. No backing out!',
  },
  {
    title: 'Scoring',
    body: 'Complete a dare or answer a truth to earn 1 point. Forfeit and you get nothing. The player with the most points at the end wins!',
  },
  {
    title: 'Difficulty Levels',
    body: 'MILD — fun and lighthearted. MEDIUM — a bit spicy. WILD — full chaos. Choose wisely in Settings.',
  },
  {
    title: 'Fair Play',
    body: 'Be a good sport. Keep it fun for everyone. Skip any question or dare that makes you truly uncomfortable.',
  },
];

export default function RulesScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <Box paddingHorizontal={24} paddingTop={16} paddingBottom={40} flex={1}>
          <Box flexDirection="row" alignItems="center" marginBottom={24}>
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
              Game Rules
            </Text>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false}>
            {RULES.map((rule, i) => (
              <Box
                key={i}
                backgroundColor="surface"
                borderRadius="md"
                padding={16}
                marginBottom={12}
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <Box flexDirection="row" alignItems="center" marginBottom={8}>
                  <Box
                    width={26}
                    height={26}
                    borderRadius="circle"
                    backgroundColor="purple"
                    justifyContent="center"
                    alignItems="center"
                    marginRight={12}
                  >
                    <Text fontSize={13} fontWeight="700" color="white">
                      {i + 1}
                    </Text>
                  </Box>
                  <Text fontSize={16} fontWeight="700" color="white">
                    {rule.title}
                  </Text>
                </Box>
                <Text
                  fontSize={13}
                  color="textSecondary"
                  lineHeight={20}
                  paddingLeft={32}
                >
                  {rule.body}
                </Text>
              </Box>
            ))}
          </ScrollView>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
