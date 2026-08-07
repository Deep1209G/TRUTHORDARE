/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import { Modal, Pressable } from 'react-native';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import BackIcon from '../assets/icon/back.svg';
import PeopleIcon from '../assets/icon/people.svg';
import LeaderboardIcon from '../assets/icon/leaderboard.svg';
// import SettingIcon from '../assets/icon/setting.svg';
import PlayerListModal from './PlayerListModal';
import LeaderboardModal from './LeaderboardModal';

const CATEGORIES: {
  labelKey: string;
  value: 'mild' | 'medium' | 'wild';
  descKey: string;
}[] = [
  { labelKey: 'difficulty.mild', value: 'mild', descKey: 'difficulty.mildDesc' },
  { labelKey: 'difficulty.medium', value: 'medium', descKey: 'difficulty.mediumDesc' },
  { labelKey: 'difficulty.wild', value: 'wild', descKey: 'difficulty.wildDesc' },
];

type Props = {
  navigation?: any;
  onLeaveRequest?: () => void;
};

export default function GameHeader({ navigation, onLeaveRequest }: Props) {
  const {
    players,
    selectedPlayerIndex,
    round,
    difficulty,
    setDifficulty,
    resetGame,
    setPlayers,
    spinning,
  } = useGame();
  const [showPlayers, setShowPlayers] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const { t } = useTranslation();
  const device = useDeviceHelper();
  const iconButton = device.scaleWidth(46);
  const iconButtonH = device.scaleHeight(46);
  const turn =
    players.length > 0 ? (selectedPlayerIndex % players.length) + 1 : 0;
  const total = players.length;

  function handleLeave() {
    lightTap();
    setShowLeave(false);
    resetGame();
    setPlayers([]);
    navigation?.reset({ index: 0, routes: [{ name: 'MainMenu' }] });
  }

  return (
    <Box
      width="100%"
      paddingHorizontal={device.scaleWidth(22)}
      paddingTop={device.scaleHeight(20)}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Pressable
        onPress={() => {
          lightTap();
          if (onLeaveRequest) {
            onLeaveRequest();
          } else {
            setShowLeave(true);
          }
        }}
        disabled={spinning}
      >
        <Box
          width={iconButton}
          height={iconButtonH}
          borderRadius="md"
          backgroundColor="surface"
          justifyContent="center"
          alignItems="center"
        >
          <BackIcon width={device.scaleWidth(18)} height={device.scaleHeight(18)} color="white" />
        </Box>
      </Pressable>

      <Box flexDirection="row" alignItems="center">
        <Box
          flexDirection="row"
          alignItems="center"
          borderRadius="md"
          backgroundColor="surface"
          height={iconButtonH}
          width={device.scaleWidth(60)}
          justifyContent="center"
          marginRight={device.scaleWidth(8)}
        >
          <Text
            variant="caption"
            color="textSecondary"
            marginRight={device.scaleWidth(6)}
          >
            {t('header.round')}
          </Text>
          <Text
            variant="caption"
            color="white"
            style={{
              textShadowColor: 'rgba(124,92,255,0.5)',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10,
            }}
          >
            {round}
          </Text>
        </Box>

        <Pressable
          onPress={() => {
            lightTap();
            setShowPlayers(true);
          }}
          disabled={spinning}
        >
          <Box
            width={device.scaleWidth(55)}
            height={iconButtonH}
            borderRadius="md"
            backgroundColor="surface"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
          >
            <PeopleIcon width={device.scaleWidth(18)} height={device.scaleHeight(18)} color="white" />
            {total > 0 && (
              <Text
                paddingLeft={device.scaleWidth(4)}
                variant="caption"
                color="white"
                letterSpacing={2}
                marginTop={2}
                style={{ fontVariant: ['tabular-nums'] }}
              >
                {turn}/{total}
              </Text>
            )}
          </Box>
        </Pressable>
      </Box>

      <Box flexDirection="row" alignItems="center">
        <Pressable
          onPress={() => {
            lightTap();
            setShowLeaderboard(true);
          }}
          disabled={spinning}
        >
          <Box
            width={iconButton}
            height={iconButtonH}
            borderRadius="md"
            backgroundColor="surface"
            justifyContent="center"
            alignItems="center"
            marginRight={device.scaleWidth(8)}
          >
            <LeaderboardIcon width={device.scaleWidth(22)} height={device.scaleHeight(22)} color="white" />
          </Box>
        </Pressable>
        <Pressable
          onPress={() => {
            lightTap();
            navigation?.navigate('Settings');
          }}
        >
          {/* <Box
            width={iconButton}
            height={iconButtonH}
            borderRadius="md"
            backgroundColor="surface"
            justifyContent="center"
            alignItems="center"
          >
            <SettingIcon width={device.scaleWidth(24)} height={device.scaleHeight(24)} color="white" />
          </Box> */}
        </Pressable>
      </Box>

      <PlayerListModal
        visible={showPlayers}
        onClose={() => setShowPlayers(false)}
      />

      <LeaderboardModal
        visible={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />

      <Modal visible={showCategory} transparent animationType="fade">
        <Box
          flex={1}
          style={{ backgroundColor: 'rgba(12,4,24,0.88)' }}
          justifyContent="center"
          alignItems="center"
          paddingHorizontal={20}
        >
          <Box
            backgroundColor="bgDeep"
            borderRadius="xl"
            padding={device.scaleWidth(24)}
            width="85%"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <Text
              variant="heading"
              color="white"
              textAlign="center"
              marginBottom={4}
            >
              {t('header.category')}
            </Text>
            <Text
              variant="note"
              color="textSecondary"
              textAlign="center"
              marginBottom={device.scaleHeight(20)}
            >
              {t('header.categoryDesc')}
            </Text>

            {CATEGORIES.map(item => {
              const active = item.value === difficulty;
              return (
                <Pressable
                  key={item.value}
                  onPress={() => {
                    lightTap();
                    setDifficulty(item.value);
                    setShowCategory(false);
                  }}
                >
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingHorizontal={device.scaleWidth(18)}
                    height={device.scaleHeight(54)}
                    borderRadius="lg"
                    marginBottom={10}
                    backgroundColor={active ? 'bgDeep' : 'transparent'}
                    style={{
                      borderWidth: 1.5,
                      borderColor: active
                        ? '#818CF8'
                        : 'rgba(255,255,255,0.15)',
                    }}
                  >
                    <Box>
                      <Text variant="bodyBold" color="white">
                        {t(item.labelKey)}
                      </Text>
                      <Text variant="label" color="textSecondary">
                        {t(item.descKey)}
                      </Text>
                    </Box>
                    <Box
                      width={device.scaleWidth(22)}
                      height={device.scaleHeight(22)}
                      borderRadius="sm"
                      borderWidth={1.5}
                      justifyContent="center"
                      alignItems="center"
                      style={{
                        borderColor: active
                          ? '#818CF8'
                          : 'rgba(255,255,255,0.25)',
                        backgroundColor: active ? '#818CF8' : 'transparent',
                      }}
                    >
                      {active && (
                        <Text variant="note" color="white">
                          ✓
                        </Text>
                      )}
                    </Box>
                  </Box>
                </Pressable>
              );
            })}

            <Pressable
              onPress={() => {
                lightTap();
                setShowCategory(false);
              }}
            >
              <Box
                height={device.scaleHeight(50)}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                marginTop={6}
                style={{
                  borderWidth: 1.5,
                  borderColor: 'rgba(255,255,255,0.15)',
                }}
              >
                <Text variant="bodyBold" color="white">
                  {t('common.close')}
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Modal>

      <Modal visible={showLeave} transparent animationType="fade">
        <Box
          flex={1}
          style={{ backgroundColor: 'rgba(12,4,24,0.88)' }}
          justifyContent="center"
          alignItems="center"
          paddingHorizontal={20}
        >
          <Box
            backgroundColor="bgDeep"
            borderRadius="xl"
            padding={device.scaleWidth(24)}
            width="80%"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <Text
              variant="heading"
              color="white"
              textAlign="center"
              marginBottom={6}
            >
              {t('header.leaveTitle')}
            </Text>
            <Text
              variant="note"
              color="textSecondary"
              textAlign="center"
              marginBottom={device.scaleHeight(20)}
            >
              {t('header.leaveBody')}
            </Text>

            <Pressable onPress={handleLeave}>
              <Box
                height={device.scaleHeight(50)}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                marginBottom={10}
                style={{
                  backgroundColor: '#EF4444',
                  shadowColor: '#EF4444',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 12,
                  elevation: 8,
                }}
              >
                <Text
                  variant="bodyBold"
                  color="white"
                  letterSpacing={1}
                >
                  {t('header.leaveBtn')}
                </Text>
              </Box>
            </Pressable>

            <Pressable
              onPress={() => {
                lightTap();
                setShowLeave(false);
              }}
            >
              <Box
                height={device.scaleHeight(50)}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                style={{
                  borderWidth: 1.5,
                  borderColor: 'rgba(255,255,255,0.15)',
                }}
              >
                <Text variant="bodyBold" color="white">
                  {t('common.cancel')}
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
