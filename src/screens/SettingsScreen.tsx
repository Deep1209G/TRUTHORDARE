import React from 'react';

import { Pressable, Alert } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame, Difficulty } from '../context/GameContext';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import TickIcon from '../assets/icon/tick.svg';
import ResetIcon from '../assets/icon/reset.svg';
import CloseIcon from '../assets/icon/close.svg';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

const DIFFICULTIES: {
  labelKey: string;
  value: Difficulty;
  descKey: string;
}[] = [
  { labelKey: 'difficulty.mild', value: 'mild', descKey: 'difficulty.mildDesc' },
  { labelKey: 'difficulty.medium', value: 'medium', descKey: 'difficulty.mediumDesc' },
  { labelKey: 'difficulty.wild', value: 'wild', descKey: 'difficulty.wildDesc' },
];

export default function SettingsScreen({ navigation }: Props) {
  const {
    soundEnabled,
    setSoundEnabled,
    difficulty,
    setDifficulty,
    resetGame,
    endGame,
  } = useGame();
  const { t } = useTranslation();
  const device = useDeviceHelper();

  function handleReset() {
    Alert.alert(
      t('settings.resetTitle'),
      t('settings.resetMsg'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.resetBtn'),
          style: 'destructive',
          onPress: () => {
            resetGame();
            navigation.goBack();
          },
        },
      ],
    );
  }

  function handleLeave() {
    Alert.alert(
      t('settings.endTitle'),
      t('settings.endMsg'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.endBtn'),
          style: 'destructive',
          onPress: () => {
            endGame();
            navigation.navigate('GameOver');
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(16)} paddingBottom={device.scaleHeight(40)}>
          <Box flexDirection="row" alignItems="center" marginBottom={device.scaleHeight(32)}>
            <Pressable onPress={() => navigation.goBack()}>
              <Box
                width={device.scaleWidth(40)}
                height={device.scaleHeight(40)}
                borderRadius="md"
                backgroundColor="surface"
                justifyContent="center"
                alignItems="center"
                marginRight={device.scaleWidth(16)}
              >
                <BackIcon width={device.scaleWidth(18)} height={device.scaleHeight(18)} color="white" />
              </Box>
            </Pressable>
            <Text variant="screenTitle">
              {t('settings.title')}
            </Text>
          </Box>

          {/* Difficulty */}
          <Box marginBottom={device.scaleHeight(32)}>
            <Text variant="caption" color="textSecondary" letterSpacing={2} marginBottom={16}>
              {t('settings.difficulty')}
            </Text>
            {DIFFICULTIES.map(item => {
              const active = difficulty === item.value;
              return (
                <Pressable
                  key={item.value}
                  onPress={() => setDifficulty(item.value)}
                >
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    backgroundColor="surface"
                    borderRadius="md"
                    paddingHorizontal={device.scaleWidth(16)}
                    paddingVertical={device.scaleHeight(14)}
                    marginBottom={8}
                    style={{
                      borderWidth: 1,
                      borderColor: active ? '#818CF8' : 'transparent',
                    }}
                  >
                    <Box flex={1}>
                      <Text
                        variant="bodyBold"
                        color={active ? 'white' : 'textSecondary'}
                      >
                        {t(item.labelKey)}
                      </Text>
                      <Text variant="label" color="textSecondary" marginTop={2}>
                        {t(item.descKey)}
                      </Text>
                    </Box>
                    {active && (
                      <Box
                        width={device.scaleWidth(22)}
                        height={device.scaleHeight(22)}
                        borderRadius="circle"
                        backgroundColor="purple"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <TickIcon width={device.scaleWidth(12)} height={device.scaleHeight(12)} color="white" />
                      </Box>
                    )}
                  </Box>
                </Pressable>
              );
            })}
          </Box>

          {/* Sound */}
          <Box marginBottom={device.scaleHeight(32)}>
            <Text variant="caption" color="textSecondary" letterSpacing={2} marginBottom={16}>
              {t('settings.audio')}
            </Text>
            <Pressable onPress={() => setSoundEnabled(!soundEnabled)}>
              <Box
                flexDirection="row"
                alignItems="center"
                backgroundColor="surface"
                borderRadius="md"
                paddingHorizontal={device.scaleWidth(16)}
                paddingVertical={device.scaleHeight(14)}
                marginBottom={8}
              >
                <Box flex={1}>
                  <Text variant="bodyBold" color="white">
                    {t('settings.soundEffects')}
                  </Text>
                  <Text variant="label" color="textSecondary" marginTop={2}>
                    {t('settings.soundEffectsDesc')}
                  </Text>
                </Box>
                <Box
                  width={device.scaleWidth(48)}
                  height={device.scaleHeight(28)}
                  borderRadius="circle"
                  justifyContent="center"
                  paddingHorizontal={3}
                  style={{
                    backgroundColor: soundEnabled ? '#818CF8' : '#334155',
                  }}
                >
                  <Box
                    width={device.scaleWidth(22)}
                    height={device.scaleHeight(22)}
                    borderRadius="circle"
                    backgroundColor="white"
                    style={{
                      alignSelf: soundEnabled ? 'flex-end' : 'flex-start',
                    }}
                  />
                </Box>
              </Box>
            </Pressable>
          </Box>

          {/* Reset */}
          <Box marginBottom={device.scaleHeight(16)}>
            <Text variant="caption" color="textSecondary" letterSpacing={2} marginBottom={16}>
              {t('settings.gameData')}
            </Text>
            <Pressable onPress={handleReset}>
              <Box
                flexDirection="row"
                alignItems="center"
                borderRadius="md"
                paddingHorizontal={device.scaleWidth(16)}
                paddingVertical={device.scaleHeight(14)}
                style={{
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  borderWidth: 1,
                  borderColor: 'rgba(239,68,68,0.2)',
                }}
              >
                <Box flex={1}>
                  <Text
                    variant="bodyBold"
                    style={{ color: '#EF4444' }}
                  >
                    {t('settings.reset')}
                  </Text>
                  <Text variant="label" color="textSecondary" marginTop={2}>
                    {t('settings.resetDesc')}
                  </Text>
                </Box>
                <ResetIcon width={device.scaleWidth(20)} height={device.scaleHeight(20)} color="#EF4444" />
              </Box>
            </Pressable>
          </Box>

          {/* Leave Game */}
          <Box>
            <Pressable onPress={handleLeave}>
              <Box
                flexDirection="row"
                alignItems="center"
                borderRadius="md"
                paddingHorizontal={device.scaleWidth(16)}
                paddingVertical={device.scaleHeight(14)}
                style={{
                  backgroundColor: 'rgba(220,38,38,0.12)',
                  borderWidth: 1,
                  borderColor: 'rgba(220,38,38,0.25)',
                }}
              >
                <Box flex={1}>
                  <Text
                    variant="bodyBold"
                    style={{ color: '#EF4444' }}
                  >
                    {t('settings.leave')}
                  </Text>
                  <Text variant="label" color="textSecondary" marginTop={2}>
                    {t('settings.leaveDesc')}
                  </Text>
                </Box>
                <CloseIcon width={device.scaleWidth(20)} height={device.scaleHeight(20)} color="#EF4444" />
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
