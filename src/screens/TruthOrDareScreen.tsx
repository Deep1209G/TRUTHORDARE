/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
  Filter,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode,
} from 'react-native-svg';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { playSound } from '../services/SoundService';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';

type Props = {
  navigation: any;
};

export default function TruthOrDareScreen({ navigation }: Props) {
  const { players, selectedPlayerIndex, selectType, soundEnabled } = useGame();
  const { t } = useTranslation();

  const player = players[selectedPlayerIndex];
  const device = useDeviceHelper();
  const avatarSize = device.scaleWidth(100);

  if (!player) {
    return null;
  }

  function handleSelect(type: 'truth' | 'dare') {
    lightTap();
    playSound('tap', soundEnabled);
    selectType(type);
    navigation.replace('Question');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        {/* Body */}
        <Box
          flex={1}
          justifyContent="center"
          paddingHorizontal={device.scaleWidth(24)}
          paddingBottom={device.scaleHeight(32)}
        >
          {/* Player */}
          <Box alignItems="center" marginBottom={device.scaleHeight(32)}>
            <Box>
              <Svg width={avatarSize} height={avatarSize} viewBox="0 0 100 100">
                <Defs>
                  <RadialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
                    <Stop
                      offset="0%"
                      stopColor={player.color}
                      stopOpacity="0.6"
                    />
                    <Stop
                      offset="60%"
                      stopColor={player.color}
                      stopOpacity="0.15"
                    />
                    <Stop
                      offset="100%"
                      stopColor={player.color}
                      stopOpacity="0"
                    />
                  </RadialGradient>
                  <Filter
                    id="glow"
                    x="-80%"
                    y="-80%"
                    width="260%"
                    height="260%"
                  >
                    <FeGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    />
                    <FeMerge>
                      <FeMergeNode in="blur" />
                      <FeMergeNode in="SourceGraphic" />
                    </FeMerge>
                  </Filter>
                </Defs>
                <Circle cx={50} cy={50} r={48} fill="url(#avatarGlow)" />
                <Circle
                  cx={50}
                  cy={50}
                  r={42}
                  fill="none"
                  stroke={player.color}
                  strokeWidth={3}
                  opacity={0.5}
                  filter="url(#glow)"
                />
                <Circle
                  cx={50}
                  cy={50}
                  r={42}
                  fill="none"
                  stroke={player.color}
                  strokeWidth={2}
                  opacity={0.8}
                />
                <Circle cx={50} cy={50} r={36} fill={player.color} />
              </Svg>
              <Box
                position="absolute"
                width={device.scaleWidth(72)}
                height={device.scaleHeight(72)}
                borderRadius="circle"
                justifyContent="center"
                alignItems="center"
                style={{
                  left: avatarSize * 0.14,
                  top: avatarSize * 0.14,
                }}
              >
                <Text variant="hero" color="bgDeep">
                  {player.name[0]}
                </Text>
              </Box>
            </Box>

            <Text
              variant="title"
              color="white"
              marginTop={device.scaleHeight(16)}
              style={{
                textShadowColor: player.color,
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 12,
              }}
            >
              {player.name}
            </Text>

            <Text
              variant="note"
              color="textSecondary"
              letterSpacing={3}
              marginTop={6}
            >
              {t('tord.yourTurn')}
            </Text>
          </Box>

          {/* Buttons */}
          <Pressable onPress={() => handleSelect('truth')}>
            <Box
              height={device.scaleHeight(68)}
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              marginBottom={device.scaleHeight(16)}
              style={{
                backgroundColor: '#0D9488',
                shadowColor: '#2DD4BF',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text
                variant="title"
                color="white"
                letterSpacing={2}
                style={{
                  textShadowColor: '#0D9488',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 8,
                }}
              >
                {t('common.truth')}
              </Text>
            </Box>
          </Pressable>

          <Pressable onPress={() => handleSelect('dare')}>
            <Box
              height={device.scaleHeight(68)}
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: '#EA580C',
                shadowColor: '#FB923C',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text
                variant="title"
                color="white"
                letterSpacing={2}
                style={{
                  textShadowColor: '#EA580C',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 8,
                }}
              >
                {t('common.dare')}
              </Text>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
