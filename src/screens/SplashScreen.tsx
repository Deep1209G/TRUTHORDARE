/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';

import { Animated, Image } from 'react-native';
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

type Props = {
  navigation: any;
};

const COLORS = [
  '#FBBF24',
  '#34D399',
  '#F472B6',
  '#FB923C',
  '#A78BFA',
  '#67E8F9',
];

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(400),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('HomeMenu');
    }, 2800);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, subtitleAnim, navigation]);

  const dots = COLORS.map((color, i) => {
    const angle = (i / COLORS.length) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const r1 = 112;
    const r2 = 132;
    return { color, rad, r1, r2 };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box
        flex={1}
        backgroundColor="background"
        justifyContent="center"
        alignItems="center"
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
                  cx={140 + d.r2 * Math.cos(d.rad)}
                  cy={140 + d.r2 * Math.sin(d.rad)}
                  r={6}
                  fill={d.color}
                  opacity={0.6}
                />
                <Circle
                  cx={140 + d.r1 * Math.cos(d.rad)}
                  cy={140 + d.r1 * Math.sin(d.rad)}
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

          <Box position="absolute" alignItems="center" justifyContent="center">
            <Image
              source={require('../assets/images/vodka.png')}
              style={{ width: 60, height: 160, resizeMode: 'contain' }}
            />
          </Box>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, marginTop: 40 }}>
          <Text
            variant="header"
            fontSize={36}
            textAlign="center"
            letterSpacing={3}
          >
            TRUTH OR DARE
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: subtitleAnim, marginTop: 12 }}>
          <Text variant="subtitle" fontSize={13} textAlign="center">
            SPIN THE BOTTLE
          </Text>
        </Animated.View>
      </Box>
    </SafeAreaView>
  );
}
