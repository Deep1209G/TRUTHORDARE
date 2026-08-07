/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';

import { Pressable, BackHandler, Modal } from 'react-native';

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
import BottleBottomSheet from '../components/BottleBottomSheet';
import BoardBottomSheet from '../components/BoardBottomSheet';
import TruthOrDareModal from '../components/TruthOrDareModal';
import QuestionModal from '../components/QuestionModal';
import BottleIcon from '../assets/icon/bottle.svg';
import BoardIcon from '../assets/icon/gameboard.svg';
import VolumeIcon from '../assets/icon/volume.svg';
import MuteIcon from '../assets/icon/mute.svg';

export default function GameScreen({ navigation }: any) {
  const {
    players,
    spinning,
    setSpinning,
    rotation,
    spin,
    resolvePlayer,
    soundEnabled,
    setSoundEnabled,
    selectedPlayerIndex,
    lastPlayerIndex,
    resetGame,
    setPlayers,
  } = useGame();
  const rotationRef = useRef(rotation);
  const [revealed, setRevealed] = useState(false);
  const [isBottleSheetVisible, setIsBottleSheetVisible] = useState(false);
  const [isBoardSheetVisible, setIsBoardSheetVisible] = useState(false);
  const [isTruthOrDareVisible, setIsTruthOrDareVisible] = useState(false);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
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
        setIsTruthOrDareVisible(true);
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

  useEffect(() => {
    if (showLeave || isBottleSheetVisible || isBoardSheetVisible || isTruthOrDareVisible || isQuestionVisible) {
      return;
    }
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setShowLeave(true);
        return true;
      },
    );
    return () => subscription.remove();
  }, [
    showLeave,
    isBottleSheetVisible,
    isBoardSheetVisible,
    isTruthOrDareVisible,
    isQuestionVisible,
  ]);

  function handleLeave() {
    lightTap();
    setShowLeave(false);
    resetGame();
    setPlayers([]);
    navigation?.reset({ index: 0, routes: [{ name: 'MainMenu' }] });
  }

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
        <GameHeader
          navigation={navigation}
          onLeaveRequest={() => setShowLeave(true)}
        />

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

            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap={device.scaleWidth(28)}
              marginTop={20}
            >
              <Pressable
                onPress={() => {
                  lightTap();
                  playSound('tap', soundEnabled);
                  setIsBoardSheetVisible(true);
                }}
                disabled={spinning || revealed}
              >
                <Box
                  width={44}
                  height={44}
                  borderRadius="circle"
                  justifyContent="center"
                  alignItems="center"
                  opacity={spinning ? 0.5 : 1}
                  style={{
                    backgroundColor: 'rgba(124,92,255,0.15)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.12)',
                  }}
                >
                  <BoardIcon
                    width={device.scaleWidth(30)}
                    height={device.scaleHeight(30)}
                    color="white"
                  />
                </Box>
              </Pressable>

              <Pressable
                onPress={() => {
                  lightTap();
                  playSound('tap', soundEnabled);
                  setIsBottleSheetVisible(true);
                }}
                disabled={spinning || revealed}
              >
                <Box
                  width={44}
                  height={44}
                  borderRadius="circle"
                  justifyContent="center"
                  alignItems="center"
                  opacity={spinning ? 0.5 : 1}
                  style={{
                    backgroundColor: 'rgba(124,92,255,0.15)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.12)',
                  }}
                >
                  <BottleIcon
                    width={device.scaleWidth(30)}
                    height={device.scaleHeight(28)}
                    color="white"
                  />
                </Box>
              </Pressable>

              <Pressable
                onPress={() => {
                  lightTap();
                  setSoundEnabled(!soundEnabled);
                }}
                disabled={spinning || revealed}
              >
                <Box
                  width={44}
                  height={44}
                  borderRadius="circle"
                  justifyContent="center"
                  alignItems="center"
                  opacity={spinning ? 0.5 : 1}
                  style={{
                    backgroundColor: 'rgba(124,92,255,0.15)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.12)',
                  }}
                >
                  {soundEnabled ? (
                    <VolumeIcon
                      width={device.scaleWidth(30)}
                      height={device.scaleHeight(30)}
                      color="white"
                    />
                  ) : (
                    <MuteIcon
                      width={device.scaleWidth(30)}
                      height={device.scaleHeight(30)}
                      color="white"
                    />
                  )}
                </Box>
              </Pressable>
            </Box>
          </Box>
        </Box>

        <BottleBottomSheet
          visible={isBottleSheetVisible}
          onClose={() => setIsBottleSheetVisible(false)}
        />

        <BoardBottomSheet
          visible={isBoardSheetVisible}
          onClose={() => setIsBoardSheetVisible(false)}
        />

        <TruthOrDareModal
          visible={isTruthOrDareVisible}
          onSelectType={() => {
            setIsTruthOrDareVisible(false);
            setIsQuestionVisible(true);
          }}
        />

        <QuestionModal
          visible={isQuestionVisible}
          onClose={() => setIsQuestionVisible(false)}
        />

        <Modal visible={showLeave} transparent animationType="fade" onRequestClose={() => setShowLeave(false)}>
          <Box
            flex={1}
            style={{ backgroundColor: 'rgba(12,4,24,0.88)' }}
            justifyContent="center"
            alignItems="center"
            paddingHorizontal={20}
          >
            <Box
              backgroundColor="bgDeep"
              borderRadius="xl"
              padding={device.scaleWidth(24)}
              width="80%"
              style={{
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <Text
                variant="heading"
                color="white"
                textAlign="center"
                marginBottom={6}
              >
                {t('header.leaveTitle')}
              </Text>
              <Text
                variant="note"
                color="textSecondary"
                textAlign="center"
                marginBottom={device.scaleHeight(20)}
              >
                {t('header.leaveBody')}
              </Text>

              <Pressable onPress={handleLeave}>
                <Box
                  height={device.scaleHeight(50)}
                  borderRadius="lg"
                  justifyContent="center"
                  alignItems="center"
                  marginBottom={10}
                  style={{
                    backgroundColor: '#EF4444',
                    shadowColor: '#EF4444',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.4,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                >
                  <Text variant="bodyBold" color="white" letterSpacing={1}>
                    {t('header.leaveBtn')}
                  </Text>
                </Box>
              </Pressable>

              <Pressable
                onPress={() => {
                  lightTap();
                  setShowLeave(false);
                }}
              >
                <Box
                  height={device.scaleHeight(50)}
                  borderRadius="lg"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    borderWidth: 1.5,
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  <Text variant="bodyBold" color="white">
                    {t('common.cancel')}
                  </Text>
                </Box>
              </Pressable>
            </Box>
          </Box>
        </Modal>
      </Box>
    </SafeAreaView>
  );
}
