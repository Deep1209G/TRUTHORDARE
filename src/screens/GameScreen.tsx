/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';

import { Pressable } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  interpolate,
  cancelAnimation,
} from 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { playSound } from '../services/SoundService';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';

import GameHeader from '../components/GameHeader';
import GameBoard from '../components/GameBoard';
import BottleIcon from '../assets/icon/bottle.svg';

export default function GameScreen({ navigation }: any) {
  const {
    players,
    spinning,
    setSpinning,
    rotation,
    spin,
    resolvePlayer,
    soundEnabled,
    selectedPlayerIndex,
    lastPlayerIndex,
  } = useGame();
  const rotationRef = useRef(rotation);
  const [revealed, setRevealed] = useState(false);
  const pulseAnim = useSharedValue(1);
  const glowAnim = useSharedValue(0);
  const device = useDeviceHelper();
  const { t } = useTranslation();
  const playSize = device.scaleWidth(128);
  const winner = players[selectedPlayerIndex];
  const spinner = players[(lastPlayerIndex + 1) % players.length];

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    if (spinning) {
      playSound('spin', soundEnabled);
      const timer = setTimeout(() => {
        setSpinning(false);
        resolvePlayer(rotationRef.current);
        setRevealed(true);
        playSound('result', soundEnabled);
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, [spinning, setSpinning, resolvePlayer, soundEnabled, navigation]);

  useEffect(() => {
    if (revealed) {
      const timer = setTimeout(() => {
        setRevealed(false);
        navigation.navigate('TruthOrDare');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [revealed, navigation]);

  useEffect(() => {
    if (!spinning) {
      pulseAnim.value = withRepeat(
        withSequence(
          withTiming(0.85, { duration: 1200 }),
          withTiming(1, { duration: 1200 }),
        ),
        -1,
        true,
      );
      glowAnim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1500 }),
          withTiming(0.3, { duration: 1500 }),
        ),
        -1,
        true,
      );
    } else {
      pulseAnim.value = 1;
      glowAnim.value = 0;
    }
  }, [spinning, pulseAnim, glowAnim]);

  useEffect(() => {
    return () => {
      cancelAnimation(pulseAnim);
      cancelAnimation(glowAnim);
    };
  }, [pulseAnim, glowAnim]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pulseAnim.value, [0.85, 1], [0.92, 1]) }],
  }));

  const glowShadowStyle = useAnimatedStyle(() => ({
    shadowOpacity: interpolate(glowAnim.value, [0, 1], [0.3, 0.7]),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowAnim.value, [0, 1], [0.3, 0.7]),
  }));

  function handleSpin() {
    spin();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <GameHeader navigation={navigation} />

        <Box flex={1} justifyContent="center" alignItems="center">
          <GameBoard rotation={rotation} />

          {/* Play button */}
          <Box marginTop={24} alignItems="center">
            <Pressable
              onPress={() => {
                lightTap();
                playSound('tap', soundEnabled);
                handleSpin();
              }}
              disabled={spinning || revealed}
            >
              <Animated.View
                style={[
                  pulseStyle,
                  {
                    width: playSize,
                    height: playSize,
                    borderRadius: playSize / 2,
                    shadowColor: '#7C5CFF',
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 24,
                    elevation: 12,
                  },
                  glowShadowStyle,
                ]}
              >
                <Box
                  width={playSize}
                  height={playSize}
                  borderRadius="circle"
                  justifyContent="center"
                  alignItems="center"
                  opacity={spinning ? 0.5 : 1}
                  style={{ backgroundColor: '#7C5CFF' }}
                >
                  <Box
                    position="absolute"
                    width={playSize}
                    height={playSize}
                    borderRadius="circle"
                    style={{
                      borderWidth: 2,
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                  />
                  <Text
                    variant="title"
                    color="white"
                    letterSpacing={3}
                    style={{
                      textShadowColor: 'rgba(124,92,255,0.6)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 12,
                    }}
                  >
                    {spinning ? '...' : t('app.play')}
                  </Text>
                </Box>
              </Animated.View>
            </Pressable>

            {spinning ? (
              <Animated.View style={[glowStyle, { marginTop: 14 }]}>
                <Text
                  variant="caption"
                  color="textSecondary"
                  letterSpacing={2}
                >
                  {t('game.spinning')}
                </Text>
              </Animated.View>
            ) : revealed && winner ? (
              <Text
                variant="bodyBold"
                color="white"
                letterSpacing={2}
                marginTop={14}
                style={{
                  textShadowColor: winner.color,
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 8,
                }}
              >
                {winner.name}! {t('tord.yourTurn')}
              </Text>
            ) : (
              <Text
                variant="bodyBold"
                color="white"
                letterSpacing={2}
                marginTop={14}
                style={{
                  textShadowColor: spinner.color,
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 8,
                }}
              >
                {spinner.name}! {t('tord.yourTurn')}
              </Text>
            )}

            <Pressable
              onPress={() => { () => console.log('Bottle pressed')}}
            >
              <Box
                width={44}
                height={44}
                borderRadius="circle"
                marginTop={20}
                justifyContent="center"
                alignItems="center"
                opacity={spinning ? 0.5 : 1}
                style={{
                  backgroundColor: 'rgba(124,92,255,0.15)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.12)',
                }}
              >
                <BottleIcon width={device.scaleWidth(30)} height={device.scaleHeight(25)} color="white"  />
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
