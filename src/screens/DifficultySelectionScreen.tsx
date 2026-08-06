/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame, Difficulty } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';

import TickIcon from '../assets/icon/tick.svg';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

const CATEGORIES: {
  labelKey: string;
  value: Difficulty;
  descKey: string;
}[] = [
  { labelKey: 'difficulty.mild', value: 'mild', descKey: 'difficulty.mildDesc' },
  { labelKey: 'difficulty.medium', value: 'medium', descKey: 'difficulty.mediumDesc' },
  { labelKey: 'difficulty.wild', value: 'wild', descKey: 'difficulty.wildDesc' },
];

export default function DifficultySelectionScreen({ navigation }: Props) {
  const { difficulty, setDifficulty } = useGame();
  const { t } = useTranslation();
  const device = useDeviceHelper();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        {/* Header */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(16)}>
          <Box flexDirection="row" alignItems="center">
            <Box width={device.scaleWidth(42)}>
              <Pressable
                onPress={() => {
                  lightTap();
                  navigation.goBack();
                }}
              >
                <Box
                  width={device.scaleWidth(42)}
                  height={device.scaleHeight(42)}
                  borderRadius="md"
                  backgroundColor="surface"
                  justifyContent="center"
                  alignItems="center"
                >
                  <BackIcon
                    width={device.scaleWidth(18)}
                    height={device.scaleHeight(18)}
                    color="white"
                  />
                </Box>
              </Pressable>
            </Box>

            <Box alignItems="center" flex={1}>
              <Text variant="screenTitle" color="yellow" textAlign="center">
                {t('difficulty.title')}
              </Text>
            </Box>

            <Box width={device.scaleWidth(42)} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(16)}>
          <Text variant="note" color="textSecondary" marginTop={4}>
            {t('difficulty.subtitle')}
          </Text>
        </Box>

        {/* Category options */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(24)}>
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
                  padding={device.scaleWidth(16)}
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
                      variant="bodyBold"
                      color={active ? 'white' : 'textSecondary'}
                    >
                      {t(item.labelKey)}
                    </Text>

                    <Text
                      variant="label"
                      color={active ? 'white' : 'textSecondary'}
                      opacity={active ? 0.8 : 0.6}
                    >
                      {t(item.descKey)}
                    </Text>
                  </Box>

                  {active && (
                    <TickIcon
                      width={device.scaleWidth(24)}
                      height={device.scaleHeight(24)}
                      color="white"
                    />
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
