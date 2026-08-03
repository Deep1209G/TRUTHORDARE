/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';

import { Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';
import { playSound } from '../services/SoundService';
import { lightTap } from '../services/HapticService';
import Header from '../components/Header';
import ResultCard from '../components/ResultCard';

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

  useEffect(() => {
    if (!hasTimer || !timerStarted || timeLeft <= 0) return;
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
  }, [hasTimer, timerStarted, timeLeft, soundEnabled]);

  if (!player || !selectedType || !currentQuestion) {
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
        <Header navigation={navigation} />

        {/* Body */}
        <Box flex={1} paddingHorizontal={24} paddingTop={32}>
          {/* Player + timer */}
          <Box flexDirection="row" alignItems="center" marginBottom={16}>
            <Box
              flex={1}
              height={60}
              borderRadius="lg"
              backgroundColor="surface"
              justifyContent="center"
              paddingHorizontal={16}
              marginRight={6}
              style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <Text
                fontSize={9}
                fontWeight="700"
                color="textSecondary"
                alignSelf='center'
                letterSpacing={2}
                marginBottom={2}
              >
                NOW PLAYING
              </Text>
              <Text
                fontSize={16}
                fontWeight="800"
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
            {hasTimer && !timerStarted ? (
              <Pressable onPress={handleStartTimer} style={{ flex: 1 }}>
                <Box
                  height={60}
                  borderRadius="lg"
                  backgroundColor="surface"
                  justifyContent="center"
                  alignItems="center"
                  paddingHorizontal={16}
                  marginLeft={6}
                  style={{
                    borderWidth: 1,
                    borderColor: '#818CF8',
                  }}
                >
                  <Text
                    fontSize={13}
                    fontWeight="800"
                    letterSpacing={1}
                  >
                    START TIMER
                  </Text>
                </Box>
              </Pressable>
            ) : hasTimer ? (
              <Box
                flex={1}
                height={60}
                borderRadius="lg"
                backgroundColor="surface"
                justifyContent="center"
                alignItems="center"
                paddingHorizontal={16}
                marginLeft={6}
              >
                <Text
                  fontSize={9}
                  fontWeight="700"
                  color="textSecondary"
                  letterSpacing={2}
                  marginBottom={2}
                >
                  TIME LEFT
                </Text>
                <Text
                  fontSize={22}
                  fontWeight="800"
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
                height={60}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                paddingHorizontal={16}
                marginLeft={6}
                style={{
                  backgroundColor: accentColor,
                }}
              >
                <Text
                  fontSize={13}
                  fontWeight="800"
                  color="white"
                  letterSpacing={2}
                >
                  {selectedType === 'truth' ? 'TRUTH' : 'DARE'}
                </Text>
              </Box>
            )}
          </Box>

          {/* Truth badge + question */}
          <Box flex={1} alignItems="center" marginTop={80}>
            <Box
              borderRadius="md"
              paddingHorizontal={20}
              paddingVertical={8}
              marginBottom={20}
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
                fontSize={16}
                fontWeight="800"
                color="white"
                letterSpacing={3}
              >
                {selectedType === 'truth' ? 'TRUTH' : 'DARE'}
              </Text>
            </Box>

            <Box width="100%">
              <ResultCard
                type={selectedType}
                playerName={player.name}
                question={currentQuestion}
              />
            </Box>
          </Box>

          {/* Actions */}
          <Box flexDirection="row" paddingBottom={32}>
            <Pressable
              onPress={() => handleResult(false)}
              style={{ flex: 1, marginRight: 8 }}
            >
              <Box
                height={58}
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
                  fontSize={15}
                  fontWeight="700"
                  letterSpacing={1}
                  style={{ color: '#EF4444' }}
                >
                  FORFEIT
                </Text>
              </Box>
            </Pressable>
            <Pressable
              onPress={() => handleResult(true)}
              style={{ flex: 1, marginLeft: 8 }}
            >
              <Box
                height={58}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                style={{
                  backgroundColor: accentColor,
                }}
              >
                <Text
                  fontSize={15}
                  fontWeight="700"
                  color="white"
                  letterSpacing={1}
                >
                  NAILED IT
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
