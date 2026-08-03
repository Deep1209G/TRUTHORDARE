/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';

import { Pressable, Animated, Share, ScrollView, Image } from 'react-native';
import AnimatedRN, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
  G,
} from 'react-native-svg';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import RulebookIcon from '../assets/icon/rulebook.svg';
import VolumeIcon from '../assets/icon/volume.svg';
import GlobalIcon from '../assets/icon/global.svg';
import SettingIcon from '../assets/icon/setting.svg';
import ShareIcon from '../assets/icon/share.svg';

type Props = {
  navigation: any;
};

const BOARD_COLORS = [
  '#FBBF24',
  '#34D399',
  '#F472B6',
  '#FB923C',
  '#A78BFA',
  '#67E8F9',
];

const MENU_BUTTONS = [
  { key: 'Rules', icon: 'Rules', label: 'Game Rules', screen: 'Rules' },
  { key: 'Sound', icon: 'Sound', label: 'Sound', screen: 'Sound' },
  { key: 'Share', icon: 'Share', label: 'Share App', screen: null },
];

export default function HomeMenuScreen({ navigation }: Props) {
  const { setPlayers, resetGame } = useGame();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const playScale = useRef(new Animated.Value(0.5)).current;
  const buttonsAnim = useRef(new Animated.Value(0)).current;

  const spin = useSharedValue(0);
  useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [spin]);

  const bottleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(playScale, {
          toValue: 1,
          friction: 4,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(buttonsAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, playScale, buttonsAnim]);

  function handlePlay() {
    lightTap();
    resetGame();
    setPlayers([]);
    navigation.navigate('HostMode');
  }

  function handleShare() {
    lightTap();
    Share.share({
      message:
        'Truth or Dare - the ultimate party game! Spin the bottle and take on challenges!',
    });
  }

  function handleMenuPress(screen: string | null) {
    lightTap();
    if (screen === null) {
      handleShare();
    } else {
      navigation.navigate(screen);
    }
  }

  const dots = BOARD_COLORS.map((color, i) => {
    const angle = (i / BOARD_COLORS.length) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      color,
      x1: 140 + 112 * Math.cos(rad),
      y1: 140 + 112 * Math.sin(rad),
      x2: 140 + 132 * Math.cos(rad),
      y2: 140 + 132 * Math.sin(rad),
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        {/* Top bar with Settings & Language */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          paddingHorizontal={22}
          paddingTop={20}
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
          style={{ zIndex: 10 }}
        >
          <Pressable
            onPress={() => {
              lightTap();
              navigation.navigate('Language');
            }}
          >
            <Box
              width={42}
              height={42}
              borderRadius="md"
              backgroundColor="surface"
              justifyContent="center"
              alignItems="center"
              marginRight={10}
            >
              <GlobalIcon width={20} height={20} color="white" />
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              lightTap();
              navigation.navigate('Settings');
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
              <SettingIcon width={30} height={30} color="white" />
            </Box>
          </Pressable>
        </Box>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 40,
          }}
        >
          <Box flex={1} justifyContent="center" alignItems="center">
            {/* Game board centered */}
            <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
              <Svg width={220} height={220} viewBox="0 0 280 280">
                <Defs>
                  <RadialGradient id="boardBg" cx="50%" cy="50%" r="50%">
                    <Stop offset="0%" stopColor="#1E293B" />
                    <Stop offset="100%" stopColor="#0F172A" />
                  </RadialGradient>
                  <LinearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0%" stopColor="#818CF8" stopOpacity="0.4" />
                    <Stop offset="50%" stopColor="#C084FC" stopOpacity="0.25" />
                    <Stop offset="100%" stopColor="#818CF8" stopOpacity="0.4" />
                  </LinearGradient>
                </Defs>
                <Circle cx={140} cy={140} r={138} fill="#0F172A" />
                <Circle cx={140} cy={140} r={135} fill="url(#boardBg)" />
                <Circle
                  cx={140}
                  cy={140}
                  r={134}
                  fill="none"
                  stroke="url(#borderGrad)"
                  strokeWidth="1.5"
                />
                {dots.map(d => (
                  <G key={d.color}>
                    <Circle
                      cx={d.x2}
                      cy={d.y2}
                      r={6}
                      fill={d.color}
                      opacity={0.6}
                    />
                    <Circle
                      cx={d.x1}
                      cy={d.y1}
                      r={3}
                      fill={d.color}
                      opacity={0.3}
                    />
                  </G>
                ))}
                <Circle
                  cx={140}
                  cy={140}
                  r={90}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="0.75"
                  opacity={0.5}
                />
              </Svg>

              {/* Bottle overlay */}
              <Box
                position="absolute"
                alignItems="center"
                justifyContent="center"
                style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <AnimatedRN.View style={bottleStyle}>
                  <Image
                    source={require('../assets/images/vodka.png')}
                    style={{ width: 55, height: 140, resizeMode: 'contain' }}
                  />
                </AnimatedRN.View>
              </Box>
            </Animated.View>

            {/* Title */}
            <Animated.View
              style={{ opacity: fadeAnim, alignItems: 'center', marginTop: 8 }}
            >
              <Text
                variant="header"
                fontSize={28}
                textAlign="center"
                letterSpacing={3}
              >
                TRUTH OR DARE
              </Text>
              <Text
                variant="subtitle"
                fontSize={11}
                textAlign="center"
                marginTop={2}
              >
                SPIN THE BOTTLE
              </Text>
            </Animated.View>

            {/* Play button */}
            <Animated.View
              style={{
                transform: [{ scale: playScale }],
                alignItems: 'center',
                marginVertical: 20,
              }}
            >
              <Pressable onPress={handlePlay}>
                <Box
                  width={180}
                  height={56}
                  borderRadius="lg"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: '#7C5CFF',
                    shadowColor: '#7C5CFF',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.4,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                >
                  <Text
                    fontSize={18}
                    fontWeight="800"
                    color="white"
                    letterSpacing={3}
                    style={{
                      textShadowColor: 'rgba(124,92,255,0.5)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 8,
                    }}
                  >
                    PLAY
                  </Text>
                </Box>
              </Pressable>
            </Animated.View>
          </Box>

          {/* Bottom buttons: Rules, Sound, Share */}
          <Animated.View style={{ opacity: buttonsAnim, paddingBottom: 20 }}>
            <Box flexDirection="row" justifyContent="center">
              {MENU_BUTTONS.map(btn => {
                const translateY = buttonsAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                });
                return (
                  <Animated.View
                    key={btn.key}
                    style={{
                      opacity: buttonsAnim,
                      transform: [{ translateY }],
                      marginHorizontal: 14,
                    }}
                  >
                    <Pressable onPress={() => handleMenuPress(btn.screen)}>
                      <Box
                        width={42}
                        height={42}
                        borderRadius="md"
                        backgroundColor="surface"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {btn.key === 'Rules' ? (
                          <RulebookIcon width={15} height={15} color="white" />
                        ) : btn.key === 'Sound' ? (
                          <VolumeIcon width={20} height={20} color="white" />
                        ) : (
                          <ShareIcon width={20} height={20} color="white" />
                        )}
                      </Box>
                    </Pressable>
                  </Animated.View>
                );
              })}
            </Box>
          </Animated.View>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
