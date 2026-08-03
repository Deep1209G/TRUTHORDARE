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

const AGE_GROUPS = [
  {
    key: 'kids',
    image: require('../assets/images/kids.png'),
    title: 'Kids',
    description: 'Fun and family-friendly',
  },
  {
    key: 'teens',
    image: require('../assets/images/teens.png'),
    title: 'Teens',
    description: 'A little more playful and daring',
  },
  {
    key: 'adults',
    image: require('../assets/images/adults.png'),
    title: 'Adults',
    description: 'Full party mode',
  },
  {
    key: 'family',
    image: require('../assets/images/family.png'),
    title: 'Family',
    description: 'For the whole family to enjoy together',
  },
  {
    key: 'couple',
    image: require('../assets/images/coplus.png'),
    title: 'Couple',
    description: 'Romantic and spicy questions for two',
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
                Who's Playing?
              </Text>
            </Box>
            <Box width={42} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={24} paddingTop={16}>
          <Text fontSize={13} color="textSecondary" marginTop={4}>
           Enjoy questions designed just for your group.
          </Text>
        </Box>

        {/* Age options */}
        <Box paddingHorizontal={24} paddingTop={24}>
          {AGE_GROUPS.map(group => (
            <Pressable
              key={group.key}
              onPress={() => {
                lightTap();
                setAgeGroup(group.key as 'kids' | 'teens' | 'adults' | 'family' | 'couple');
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
                    source={group.image}
                    style={{ width: 40, height: 35, resizeMode: 'contain' }}
                  />
                </Box>
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
