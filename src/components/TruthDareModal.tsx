/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';

import { Modal, Pressable, Animated } from 'react-native';
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
import { useGame } from '../context/GameContext';
import { playSound } from '../services/SoundService';
import { lightTap } from '../services/HapticService';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectType?: () => void;
};

export default function TruthDareModal({
  visible,
  onClose,
  onSelectType,
}: Props) {
  const { players, selectedPlayerIndex, selectedType, selectType, soundEnabled } =
    useGame();

  const player = players[selectedPlayerIndex];

  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const btnTruth = useRef(new Animated.Value(0.8)).current;
  const btnDare = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible && !selectedType) {
      scaleAnim.setValue(0.3);
      fadeAnim.setValue(0);
      bounceAnim.setValue(0);

      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.delay(200),
        Animated.spring(bounceAnim, {
          toValue: 1,
          friction: 3,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.delay(400),
        Animated.parallel([
          Animated.spring(btnTruth, {
            toValue: 1,
            friction: 4,
            tension: 70,
            useNativeDriver: true,
          }),
          Animated.spring(btnDare, {
            toValue: 1,
            friction: 4,
            tension: 70,
            useNativeDriver: true,
            delay: 100,
          }),
        ]),
      ]).start();
    }
  }, [visible, selectedType, scaleAnim, fadeAnim, bounceAnim, btnTruth, btnDare]);

  function handleSelect(type: 'truth' | 'dare') {
    lightTap();
    playSound('tap', soundEnabled);
    Animated.sequence([
      Animated.spring(type === 'truth' ? btnTruth : btnDare, {
        toValue: 0.9,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(type === 'truth' ? btnTruth : btnDare, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      selectType(type);
      onClose();
      onSelectType?.();
    }, 200);
  }

  const avatarScale = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <Modal visible={visible} transparent animationType="none">
      <Box
        flex={1}
        style={{ backgroundColor: 'rgba(12,4,24,0.88)' }}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal={20}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            width: '100%',
          }}
        >
          <Box
            backgroundColor="bgDeep"
            borderRadius="xl"
            padding={24}
            alignItems="center"
            style={{
              shadowColor: player.color,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 20,
              elevation: 12,
            }}
          >
            {/* Player avatar with glow */}
            <Animated.View
              style={{
                transform: [{ scale: avatarScale }],
                marginBottom: 16,
              }}
            >
              <Svg width={100} height={100} viewBox="0 0 100 100">
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
                width={72}
                height={72}
                borderRadius="circle"
                justifyContent="center"
                alignItems="center"
                style={{ left: 14, top: 14 }}
              >
                <Text fontSize={32} fontWeight="800" color="bgDeep">
                  {player.name[0]}
                </Text>
              </Box>
            </Animated.View>

            <Text
              fontSize={26}
              fontWeight="800"
              color="white"
              marginBottom={4}
              style={{
                textShadowColor: player.color,
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 12,
              }}
            >
              {player.name}
            </Text>

            <Text
              fontSize={13}
              fontWeight="700"
              color="textSecondary"
              letterSpacing={3}
              marginBottom={24}
            >
              IT'S YOUR TURN
            </Text>

            <Pressable
              onPress={() => handleSelect('truth')}
              style={{ width: '100%' }}
            >
              <Animated.View style={{ transform: [{ scale: btnTruth }] }}>
                <Box
                  height={68}
                  borderRadius="lg"
                  justifyContent="center"
                  alignItems="center"
                  marginBottom={16}
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
                    fontSize={22}
                    fontWeight="800"
                    color="white"
                    letterSpacing={2}
                    style={{
                      textShadowColor: '#0D9488',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 8,
                    }}
                  >
                    TRUTH
                  </Text>
                </Box>
              </Animated.View>
            </Pressable>

            <Pressable
              onPress={() => handleSelect('dare')}
              style={{ width: '100%' }}
            >
              <Animated.View style={{ transform: [{ scale: btnDare }] }}>
                <Box
                  height={68}
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
                    fontSize={22}
                    fontWeight="800"
                    color="white"
                    letterSpacing={2}
                    style={{
                      textShadowColor: '#EA580C',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 8,
                    }}
                  >
                    DARE
                  </Text>
                </Box>
              </Animated.View>
            </Pressable>
          </Box>
        </Animated.View>
      </Box>
    </Modal>
  );
}
