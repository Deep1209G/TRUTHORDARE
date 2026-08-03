/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Box, Text } from '@src';

type Props = {
  type: 'truth' | 'dare';
  playerName: string;
  question: string;
};  

export default function ResultCard({ type, playerName, question }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const isTruth = type === 'truth';
  const accentColor = isTruth ? '#0D9488' : '#EA580C';
  const glowColor = isTruth ? 'rgba(45,212,191,0.3)' : 'rgba(251,146,60,0.3)';

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        width: '100%',
      }}
    >
      <Box
        width="100%"
        backgroundColor="surface"
        borderRadius="md"
        padding={20}
        marginBottom={24}
        style={{
          borderWidth: 1,
          borderColor: accentColor,
          shadowColor: glowColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Box flexDirection="row" alignItems="center" marginBottom={12}>
          <Box
            width={8}
            height={8}
            borderRadius="circle"
            marginRight={8}
            style={{ backgroundColor: accentColor }}
          />
          <Text
            fontSize={11}
            fontWeight="700"
            letterSpacing={2}
            style={{ color: accentColor }}
          >
            {isTruth ? 'TRUTH' : 'DARE'} — {playerName}
          </Text>
        </Box>
        <Text
          fontSize={18}
          fontWeight="600"
          color="white"
          textAlign="center"
          lineHeight={26}
        >
          {question}
        </Text>
      </Box>
    </Animated.View>
  );
}
