/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';

import { Pressable, ActivityIndicator } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { playSound } from '../services/SoundService';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import GameHeader from '../components/GameHeader';
import QuestionCard from '../components/QuestionCard';

type Props = {
  navigation: any;
};

export default function QuestionScreen({ navigation }: Props) {
  const {
    players,
    selectedPlayerIndex,
    selectedType,
    currentQuestion,
    completeDare,
    gameMode,
    turnTimer,
    soundEnabled,
  } = useGame();
  const { t } = useTranslation();
  const device = useDeviceHelper();

  const player = players[selectedPlayerIndex];
  const isTruth = selectedType === 'truth';
  const accentColor = isTruth ? '#0D9488' : '#EA580C';
  const glowColor = isTruth ? '#2DD4BF' : '#FB923C';

  const duration =
    gameMode === 'physical' ? (turnTimer > 0 ? turnTimer : null) : 60;
  const hasTimer = duration !== null;

  const [timeLeft, setTimeLeft] = useState<number>(duration ?? 0);
  const [timerStarted, setTimerStarted] = useState<boolean>(
    gameMode !== 'physical',
  );
  const questionReady = !!currentQuestion;

  useEffect(() => {
    if (!hasTimer || !timerStarted || timeLeft <= 0 || !questionReady) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          playSound('result', soundEnabled);
          lightTap();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hasTimer, timerStarted, timeLeft, soundEnabled, questionReady]);

  if (!player || !selectedType) {
    return null;
  }

  function handleResult(nailed: boolean) {
    completeDare(nailed);
    navigation.goBack();
  }

  function handleStartTimer() {
    lightTap();
    playSound('tap', soundEnabled);
    setTimerStarted(true);
  }

  const timerColor =
    timeLeft > 10 ? '#2DD4BF' : timeLeft > 5 ? '#FB923C' : '#EF4444';
  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(
    timeLeft % 60,
  ).padStart(2, '0')}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <GameHeader navigation={navigation} />

        {/* Body */}
        <Box flex={1} paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(32)}>
          {/* Player + timer */}
          <Box flexDirection="row" alignItems="center" marginBottom={16}>
            <Box
              flex={1}
              height={device.scaleHeight(60)}
              borderRadius="lg"
              backgroundColor="surface"
              justifyContent="center"
              paddingHorizontal={device.scaleWidth(16)}
              marginRight={6}
              style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <Text
                variant="micro"
                color="textSecondary"
                alignSelf='center'
                letterSpacing={2}
                marginBottom={2}
              >
                {t('question.nowPlaying')}
              </Text>
              <Text
                variant="bodyBold"
                alignSelf='center'
                color="white"
                numberOfLines={1}
                style={{
                  textShadowColor: player.color,
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 4,
                }}
              >
                {player.name}
              </Text>
            </Box>
            {hasTimer && questionReady && !timerStarted ? (
              <Pressable onPress={handleStartTimer} style={{ flex: 1 }}>
                <Box
                  height={device.scaleHeight(60)}
                  borderRadius="lg"
                  backgroundColor="surface"
                  justifyContent="center"
                  alignItems="center"
                  paddingHorizontal={device.scaleWidth(16)}
                  marginLeft={6}
                  style={{
                    borderWidth: 1,
                    borderColor: '#818CF8',
                  }}
                >
                  <Text
                    variant="note"
                    letterSpacing={1}
                  >
                    {t('question.startTimer')}
                  </Text>
                </Box>
              </Pressable>
            ) : hasTimer && questionReady ? (
              <Box
                flex={1}
                height={device.scaleHeight(60)}
                borderRadius="lg"
                backgroundColor="surface"
                justifyContent="center"
                alignItems="center"
                paddingHorizontal={device.scaleWidth(16)}
                marginLeft={6}
              >
                <Text
                  variant="micro"
                  color="textSecondary"
                  letterSpacing={2}
                  marginBottom={2}
                >
                  {t('question.timeLeft')}
                </Text>
                <Text
                  variant="title"
                  style={{
                    color: timerColor,
                    fontVariant: ['tabular-nums'],
                  }}
                >
                  {formattedTime}
                </Text>
              </Box>
            ) : (
              <Box
                flex={1}
                height={device.scaleHeight(60)}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                paddingHorizontal={device.scaleWidth(16)}
                marginLeft={6}
                style={{
                  backgroundColor: accentColor,
                }}
              >
                <Text
                  variant="note"
                  color="white"
                  letterSpacing={2}
                >
                  {selectedType === 'truth'
                    ? t('common.truth')
                    : t('common.dare')}
                </Text>
              </Box>
            )}
          </Box>

          {/* Truth badge + question */}
          <Box flex={1} alignItems="center" marginTop={device.scaleHeight(80)}>
            {!currentQuestion ? (
              <Box alignItems="center" justifyContent="center" flex={1}>
                <ActivityIndicator size="large" color={accentColor} />
                <Text
                  variant="bodyBold"
                  color="textSecondary"
                  marginTop={device.scaleHeight(20)}
                  letterSpacing={1}
                >
                  {t('question.generating', {
                    type: selectedType === 'truth'
                      ? t('common.truth')
                      : t('common.dare'),
                  })}
                </Text>
              </Box>
            ) : (
              <>
                <Box
                  borderRadius="md"
                  paddingHorizontal={device.scaleWidth(20)}
                  paddingVertical={8}
                  marginBottom={device.scaleHeight(20)}
                  style={{
                    backgroundColor: accentColor,
                    shadowColor: glowColor,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.5,
                    shadowRadius: 14,
                    elevation: 8,
                  }}
                >
                  <Text
                    variant="bodyBold"
                    color="white"
                    letterSpacing={3}
                  >
                    {selectedType === 'truth'
                      ? t('common.truth')
                      : t('common.dare')}
                  </Text>
                </Box>

                <Box width="100%">
                  <QuestionCard
                    type={selectedType}
                    playerName={player.name}
                    question={currentQuestion}
                  />
                </Box>
              </>
            )}
          </Box>

          {/* Actions */}
          <Box
            flexDirection="row"
            paddingBottom={device.scaleHeight(32)}
            pointerEvents={!currentQuestion ? 'none' : 'auto'}
            opacity={!currentQuestion ? 0.4 : 1}
          >
            <Pressable
              onPress={() => handleResult(false)}
              style={{ flex: 1, marginRight: 8 }}
            >
              <Box
                height={device.scaleHeight(58)}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                style={{
                  backgroundColor: 'rgba(239,68,68,0.15)',
                  borderWidth: 1.5,
                  borderColor: '#EF4444',
                }}
              >
                <Text
                  variant="bodyBold"
                  letterSpacing={1}
                  style={{ color: '#EF4444' }}
                >
                  {t('question.forfeit')}
                </Text>
              </Box>
            </Pressable>
            <Pressable
              onPress={() => handleResult(true)}
              style={{ flex: 1, marginLeft: 8 }}
            >
              <Box
                height={device.scaleHeight(58)}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                style={{
                  backgroundColor: accentColor,
                }}
              >
                <Text
                  variant="bodyBold"
                  color="white"
                  letterSpacing={1}
                >
                  {t('question.nailedIt')}
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
