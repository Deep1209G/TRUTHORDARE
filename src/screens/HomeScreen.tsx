/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';

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
import { useGame } from '../context/GameContext';
import { playSound } from '../services/SoundService';
import { lightTap } from '../services/HapticService';

import Header from '../components/Header';
import GameBoard from '../components/GameBoard';
import TruthDareModal from '../components/TruthDareModal';

export default function HomeScreen({ navigation }: any) {
  const {
    players,
    scores,
    spinning,
    setSpinning,
    rotation,
    spin,
    resolvePlayer,
    soundEnabled,
  } = useGame();
  const [showModal, setShowModal] = useState(false);
  const rotationRef = useRef(rotation);
  const pulseAnim = useSharedValue(1);
  const glowAnim = useSharedValue(0);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    if (spinning) {
      playSound('spin', soundEnabled);
      const timer = setTimeout(() => {
        setSpinning(false);
        resolvePlayer(rotationRef.current);
        setShowModal(true);
        playSound('result', soundEnabled);
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, [spinning, setSpinning, resolvePlayer, soundEnabled]);

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
    setShowModal(false);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <Header navigation={navigation} />

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
              disabled={spinning}
            >
              <Animated.View
                style={[
                  pulseStyle,
                  {
                    width: 128,
                    height: 128,
                    borderRadius: 64,
                    shadowColor: '#7C5CFF',
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 24,
                    elevation: 12,
                  },
                  glowShadowStyle,
                ]}
              >
                <Box
                  width={128}
                  height={128}
                  borderRadius="circle"
                  justifyContent="center"
                  alignItems="center"
                  opacity={spinning ? 0.5 : 1}
                  style={{ backgroundColor: '#7C5CFF' }}
                >
                  <Box
                    position="absolute"
                    width={128}
                    height={128}
                    borderRadius="circle"
                    style={{
                      borderWidth: 2,
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                  />
                  <Text
                    fontSize={24}
                    fontWeight="800"
                    color="white"
                    letterSpacing={3}
                    style={{
                      textShadowColor: 'rgba(124,92,255,0.6)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 12,
                    }}
                  >
                    {spinning ? '...' : 'PLAY'}
                  </Text>
                </Box>
              </Animated.View>
            </Pressable>

            <Animated.View style={[glowStyle, { marginTop: 14 }]}>
              <Text
                fontSize={11}
                fontWeight="700"
                color="textSecondary"
                letterSpacing={2}
              >
                {spinning ? 'SPINNING...' : 'TAP TO SPIN'}
              </Text>
            </Animated.View>
          </Box>
        </Box>

        {/* Scoreboard */}
        <Box
          flexDirection="row"
          justifyContent="center"
          flexWrap="wrap"
          paddingHorizontal={16}
          paddingVertical={14}
          style={{
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.06)',
          }}
        >
          {players.map(player => (
            <Box
              key={`score-${player.name}`}
              alignItems="center"
              marginHorizontal={10}
              marginBottom={4}
            >
              <Box
                width={38}
                height={38}
                borderRadius="circle"
                justifyContent="center"
                alignItems="center"
                style={{
                  backgroundColor: player.color,
                  shadowColor: player.color,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Text fontSize={15} fontWeight="700" color="bgDeep">
                  {player.name[0]}
                </Text>
              </Box>
              <Text
                fontSize={9}
                fontWeight="600"
                color="textSecondary"
                marginTop={4}
              >
                {player.name}
              </Text>
              <Text
                fontSize={18}
                fontWeight="800"
                marginTop={2}
                style={{ color: player.color }}
              >
                {scores[player.name] || 0}
              </Text>
            </Box>
          ))}
        </Box>

        <TruthDareModal
          visible={showModal}
          onClose={handleCloseModal}
          onSelectType={() => navigation.navigate('Question')}
        />
      </Box>
    </SafeAreaView>
  );
}
