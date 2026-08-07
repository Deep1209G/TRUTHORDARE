/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Alert, Modal, Pressable } from 'react-native';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import CloseIcon from '../assets/icon/close.svg';
import LeaderboardIcon from '../assets/icon/leaderboard.svg';
import RulebookIcon from '../assets/icon/rulebook.svg';
import ResetIcon from '../assets/icon/reset.svg';
import ExitIcon from '../assets/icon/exit.svg';

type Props = {
  visible: boolean;
  onClose: () => void;
  onOpenLeaderboard: () => void;
  onNavigate: (screen: string) => void;
};

export default function GameSettingsModal({
  visible,
  onClose,
  onOpenLeaderboard,
  onNavigate,
}: Props) {
  const { resetGame, endGame } = useGame();
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
            lightTap();
            resetGame();
            onClose();
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
            lightTap();
            endGame();
            onClose();
            onNavigate('GameOver');
          },
        },
      ],
    );
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Box flex={1} style={{ backgroundColor: 'rgba(12,4,24,0.7)' }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        <Box
          backgroundColor="bgDeep"
          borderTopLeftRadius="xl"
          borderTopRightRadius="xl"
          paddingHorizontal={device.scaleWidth(20)}
          paddingTop={device.scaleHeight(12)}
          paddingBottom={device.scaleHeight(28)}
          style={{
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
            borderBottomWidth: 0,
          }}
        >
          {/* Handle bar */}
          <Box alignItems="center" marginBottom={device.scaleHeight(10)}>
            <Box
              width={device.scaleWidth(44)}
              height={4}
              borderRadius="md"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
          </Box>

          {/* Header */}
          <Box flexDirection="row" alignItems="center" marginBottom={4}>
            <Box flex={1}>
              <Text variant="heading" color="white">
                {t('gameMenu.title')}
              </Text>
            </Box>
            <Pressable
              onPress={() => {
                lightTap();
                onClose();
              }}
            >
              <Box
                width={device.scaleWidth(36)}
                height={device.scaleHeight(36)}
                borderRadius="md"
                backgroundColor="surface"
                justifyContent="center"
                alignItems="center"
              >
                <CloseIcon
                  width={device.scaleWidth(16)}
                  height={device.scaleHeight(16)}
                  color="white"
                />
              </Box>
            </Pressable>
          </Box>

          {/* Leaderboard */}
          <Pressable
            onPress={() => {
              lightTap();
              onClose();
              onOpenLeaderboard();
            }}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              backgroundColor="surface"
              borderRadius="md"
              paddingHorizontal={device.scaleWidth(16)}
              paddingVertical={device.scaleHeight(14)}
              marginTop={device.scaleHeight(10)}
            >
              <Box
                width={device.scaleWidth(36)}
                height={device.scaleHeight(36)}
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                marginRight={device.scaleWidth(14)}
                style={{ backgroundColor: 'rgba(124,92,255,0.15)' }}
              >
                <LeaderboardIcon
                  width={device.scaleWidth(18)}
                  height={device.scaleHeight(18)}
                  color="#7C5CFF"
                />
              </Box>
              <Box flex={1}>
                <Text variant="bodyBold" color="white">
                  {t('leaderboard.title')}
                </Text>
              </Box>
            </Box>
          </Pressable>

          {/* Rules */}
          <Pressable
            onPress={() => {
              lightTap();
              onClose();
              onNavigate('Rules');
            }}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              backgroundColor="surface"
              borderRadius="md"
              paddingHorizontal={device.scaleWidth(16)}
              paddingVertical={device.scaleHeight(14)}
              marginTop={device.scaleHeight(10)}
            >
              <Box
                width={device.scaleWidth(36)}
                height={device.scaleHeight(36)}
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                marginRight={device.scaleWidth(14)}
                style={{ backgroundColor: 'rgba(52,211,153,0.15)' }}
              >
                <RulebookIcon
                  width={device.scaleWidth(18)}
                  height={device.scaleHeight(18)}
                  color="#34D399"
                />
              </Box>
              <Box flex={1}>
                <Text variant="bodyBold" color="white">
                  {t('rules.title')}
                </Text>
              </Box>
            </Box>
          </Pressable>

          {/* Reset Game */}
          <Pressable onPress={handleReset}>
            <Box
              flexDirection="row"
              alignItems="center"
              backgroundColor="surface"
              borderRadius="md"
              paddingHorizontal={device.scaleWidth(16)}
              paddingVertical={device.scaleHeight(14)}
              marginTop={device.scaleHeight(10)}
            >
              <Box
                width={device.scaleWidth(36)}
                height={device.scaleHeight(36)}
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                marginRight={device.scaleWidth(14)}
                style={{ backgroundColor: 'rgba(251,191,36,0.15)' }}
              >
                <ResetIcon
                  width={device.scaleWidth(18)}
                  height={device.scaleHeight(18)}
                  color="#FBBF24"
                />
              </Box>
              <Box flex={1}>
                <Text variant="bodyBold" color="white">
                  {t('settings.reset')}
                </Text>
                <Text variant="label" color="textSecondary" marginTop={2}>
                  {t('settings.resetDesc')}
                </Text>
              </Box>
            </Box>
          </Pressable>

          {/* Leave Game */}
          <Pressable onPress={handleLeave}>
            <Box
              flexDirection="row"
              alignItems="center"
              borderRadius="md"
              paddingHorizontal={device.scaleWidth(16)}
              paddingVertical={device.scaleHeight(14)}
              marginTop={device.scaleHeight(10)}
              style={{
                backgroundColor: 'rgba(239,68,68,0.12)',
                borderWidth: 1,
                borderColor: 'rgba(239,68,68,0.25)',
              }}
            >
              <Box
                width={device.scaleWidth(36)}
                height={device.scaleHeight(36)}
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                marginRight={device.scaleWidth(14)}
                style={{ backgroundColor: 'rgba(239,68,68,0.15)' }}
              >
                <ExitIcon
                  width={device.scaleWidth(18)}
                  height={device.scaleHeight(18)}
                  color="#EF4444"
                />
              </Box>
              <Box flex={1}>
                <Text variant="bodyBold" style={{ color: '#EF4444' }}>
                  {t('settings.leave')}
                </Text>
                <Text variant="label" color="textSecondary" marginTop={2}>
                  {t('settings.leaveDesc')}
                </Text>
              </Box>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </Modal>
  );
}
