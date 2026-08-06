/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Pressable, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';

import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

const MODES = [
  {
    key: 'standard',
    image: require('../assets/images/robot.png'),
    titleKey: 'host.appHost',
    descKey: 'host.appHostDesc',
    screen: 'AgeSelection',
  },
  {
    key: 'physical',
    image: require('../assets/images/people.png'),
    titleKey: 'host.playerHost',
    descKey: 'host.playerHostDesc',
    screen: 'TurnTimer',
  },
];

export default function HostModeScreen({ navigation }: Props) {
  const { setGameMode } = useGame();
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
                {t('host.title')}
              </Text>
            </Box>

            <Box width={device.scaleWidth(42)} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(16)}>
          <Text variant="note" color="textSecondary" marginTop={4}>
            {t('host.subtitle')}
          </Text>
        </Box>

        {/* Mode options */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(24)}>
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
                padding={device.scaleWidth(16)}
                marginBottom={12}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  borderRadius: 24,
                }}
              >
                <Box
                  width={device.scaleWidth(52)}
                  height={device.scaleHeight(52)}
                  borderRadius="circle"
                  marginRight={device.scaleWidth(14)}
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: 'rgba(124,92,255,0.15)',
                  }}
                >
                  <Image
                    source={mode.image}
                    style={{
                      width: device.scaleWidth(40),
                      height: device.scaleHeight(40),
                      resizeMode: 'contain',
                    }}
                  />
                </Box>

                <Box flex={1}>
                  <Text variant="bodyBold" color="white">
                    {t(mode.titleKey)}
                  </Text>

                  <Text variant="label" color="textSecondary" marginTop={2}>
                    {t(mode.descKey)}
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
