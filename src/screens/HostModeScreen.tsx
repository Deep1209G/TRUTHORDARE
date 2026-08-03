/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Pressable, Image } from 'react-native';

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
    image: require('../assets/images/robot.png'),
    title: 'App Host',
    description: 'The app asks all Truth and Dare questions',
    screen: 'AgeSelection',
  },
  {
    key: 'physical',
    image: require('../assets/images/people.png'),
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
                Game Host
              </Text>
            </Box>
            <Box width={42} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={24} paddingTop={16}>
          {/* <Text fontSize={24} fontWeight="700" color="white">
            Choose Host Mode
          </Text> */}
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
                <Box
                  width={52}
                  height={52}
                  borderRadius="circle"
                  marginRight={14}
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: 'rgba(124,92,255,0.15)',
                  }}
                >
                  <Image
                    source={mode.image}
                    style={{ width: 40, height: 40, resizeMode: 'contain' }}
                  />
                </Box>
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
