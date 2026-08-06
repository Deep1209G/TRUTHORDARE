/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useDeviceHelper } from '../hooks/useDeviceHelper';

type Props = {
  type: 'truth' | 'dare';
  playerName: string;
  question: string;
};  

export default function QuestionCard({ type, playerName, question }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const { t } = useTranslation();
  const device = useDeviceHelper();

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
        padding={device.scaleWidth(20)}
        marginBottom={device.scaleHeight(24)}
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
            width={device.scaleWidth(8)}
            height={device.scaleHeight(8)}
            borderRadius="circle"
            marginRight={device.scaleWidth(8)}
            style={{ backgroundColor: accentColor }}
          />
          <Text
            variant="caption"
            color="textSecondary"
            letterSpacing={2}
            style={{ color: accentColor }}
          >
            {t('questionCard.badge', {
              type: isTruth ? t('common.truth') : t('common.dare'),
              name: playerName,
            })}
          </Text>
        </Box>
        <Text
          variant="heading"
          color="white"
          textAlign="center"
          lineHeight={device.scaleHeight(26)}
        >
          {question}
        </Text>
      </Box>
    </Animated.View>
  );
}
