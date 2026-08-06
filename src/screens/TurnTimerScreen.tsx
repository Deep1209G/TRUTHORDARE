/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import { Pressable, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import TickIcon from '../assets/icon/tick.svg';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

const PRESETS = [
  { seconds: 0 },
  { seconds: 15 },
  { seconds: 30 },
  { seconds: 45 },
  { seconds: 60 },
];

const CUSTOM_MIN = 1;
const CUSTOM_MAX = 3600;

export default function TurnTimerScreen({ navigation }: Props) {
  const { setTurnTimer } = useGame();
  const { t } = useTranslation();
  const device = useDeviceHelper();
  const [selected, setSelected] = useState<number | null>(null);
  const [customActive, setCustomActive] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const customSeconds = parseInt(customInput, 10);
  const customValid =
    Number.isInteger(customSeconds) &&
    customSeconds >= CUSTOM_MIN &&
    customSeconds <= CUSTOM_MAX;
  const canContinue = customActive ? customValid : selected !== null;

  function selectPreset(seconds: number) {
    lightTap();
    setSelected(seconds);
    setCustomActive(false);
  }

  function selectCustom() {
    lightTap();
    setSelected(null);
    setCustomActive(true);
  }

  function handleContinue() {
    if (!canContinue) return;
    lightTap();
    const seconds = customActive ? customSeconds : (selected as number);
    setTurnTimer(seconds);
    navigation.navigate('PlayerSetup');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        {/* Header */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(16)}>
          <Box flexDirection="row" alignItems="center">
            <Box width={device.scaleWidth(42)}>
              <Pressable
                onPress={() => {
                  lightTap();
                  navigation.goBack();
                }}
              >
                <Box
                  width={device.scaleWidth(42)}
                  height={device.scaleHeight(42)}
                  borderRadius="md"
                  backgroundColor="surface"
                  justifyContent="center"
                  alignItems="center"
                >
                  <BackIcon width={device.scaleWidth(18)} height={device.scaleHeight(18)} color="white" />
                </Box>
              </Pressable>
            </Box>
            <Box alignItems="center" flex={1}>
              <Text variant="screenTitle" color="yellow" textAlign="center">
                {t('app.title')}
              </Text>
            </Box>
            <Box width={device.scaleWidth(42)} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(32)}>
          <Text variant="title" color="white">
            {t('timer.title')}
          </Text>
          <Text variant="note" color="textSecondary" marginTop={4}>
            {t('timer.subtitle')}
          </Text>
        </Box>

        {/* Timer options */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(24)}>
          {PRESETS.map(item => {
            const active = !customActive && selected === item.seconds;
            return (
              <Pressable key={item.seconds} onPress={() => selectPreset(item.seconds)}>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  borderRadius="lg"
                  padding={device.scaleWidth(16)}
                  marginBottom={12}
                  style={
                    active
                      ? {
                          backgroundColor: '#818CF8',
                          borderRadius: 24,
                          shadowColor: '#818CF8',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.4,
                          shadowRadius: 12,
                          elevation: 8,
                          borderWidth: 1.5,
                          borderColor: 'rgba(255,255,255,0.2)',
                        }
                      : {
                          backgroundColor: 'rgba(255,255,255,0.07)',
                          borderRadius: 24,
                        }
                  }
                >
                  <Box flex={1}>
                    <Text
                      variant="bodyBold"
                      color={active ? 'white' : 'textSecondary'}
                    >
                      {item.seconds > 0
                        ? t('timer.seconds', { count: item.seconds })
                        : t('timer.noTimer')}
                    </Text>
                  </Box>
                  {active && (
                    <TickIcon width={device.scaleWidth(24)} height={device.scaleHeight(24)} color="white" />
                  )}
                </Box>
              </Pressable>
            );
          })}

          {/* Custom Time */}
          <Pressable onPress={selectCustom}>
            <Box
              borderRadius="lg"
              padding={device.scaleWidth(16)}
              style={
                customActive
                  ? {
                      backgroundColor: '#818CF8',
                      borderRadius: 24,
                      shadowColor: '#818CF8',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.4,
                      shadowRadius: 12,
                      elevation: 8,
                      borderWidth: 1.5,
                      borderColor: 'rgba(255,255,255,0.2)',
                    }
                  : {
                      backgroundColor: 'rgba(255,255,255,0.07)',
                      borderRadius: 24,
                    }
              }
            >
              <Box flexDirection="row" alignItems="center">
                <Box flex={1}>
                  <Text
                    variant="bodyBold"
                    color={customActive ? 'white' : 'textSecondary'}
                  >
                    {t('timer.custom')}
                  </Text>
                  <Text
                    variant="label"
                    color={customActive ? 'white' : 'textSecondary'}
                    opacity={customActive ? 0.8 : 0.6}
                  >
                    {t('timer.customDesc')}
                  </Text>
                </Box>
                {customActive && (
                  <TickIcon width={device.scaleWidth(24)} height={device.scaleHeight(24)} color="white" />
                )}
              </Box>

              {customActive && (
                <Box
                  flexDirection="row"
                  alignItems="center"
                  marginTop={14}
                  backgroundColor="bgDeep"
                  borderRadius="md"
                  paddingHorizontal={device.scaleWidth(14)}
                  paddingVertical={4}
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  <Box flex={1}>
                    <TextInput
                      value={customInput}
                      onChangeText={setCustomInput}
                      placeholder={t('timer.placeholder')}
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="number-pad"
                      style={{
                        color: '#FFF',
                        fontSize: device.scaleWidth(15),
                        paddingVertical: 8,
                      }}
                    />
                  </Box>
                  <Text
                    color={customValid ? 'white' : 'textSecondary'}
                  >
                    {t('timer.unit')}
                  </Text>
                </Box>
              )}
            </Box>
          </Pressable>

          {customActive && !customValid && customInput.length > 0 && (
            <Text
              variant="caption"
              color="orange"
              marginTop={6}
              paddingLeft={6}
            >
              {t('timer.error', {
                min: CUSTOM_MIN,
                max: CUSTOM_MAX,
              })}
            </Text>
          )}
        </Box>

        {/* Bottom section */}
        <Box flex={1} justifyContent="flex-end" paddingHorizontal={device.scaleWidth(24)} paddingBottom={device.scaleHeight(32)}>
          <Pressable onPress={handleContinue}>
            <Box
              height={device.scaleHeight(58)}
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: canContinue ? '#818CF8' : '#334155',
                shadowColor: '#818CF8',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: canContinue ? 0.4 : 0,
                shadowRadius: 12,
                elevation: canContinue ? 8 : 0,
                borderRadius: 16,
              }}
            >
              <Text
                variant="heading"
                letterSpacing={1}
                style={{ color: canContinue ? '#FFF' : '#64748B' }}
              >
                {t('common.continue')}
              </Text>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
