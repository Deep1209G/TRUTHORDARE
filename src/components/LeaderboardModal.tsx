/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Modal, Pressable } from 'react-native';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import CloseIcon from '../assets/icon/close.svg';
import LeaderboardIcon from '../assets/icon/leaderboard.svg';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const MEDALS = ['\u{1F947}', '\u{1F948}', '\u{1F949}'];

export default function LeaderboardModal({ visible, onClose }: Props) {
  const { players, scores } = useGame();
  const { t } = useTranslation();
  const device = useDeviceHelper();

  const sorted = [...players].sort(
    (a, b) => (scores[b.name] || 0) - (scores[a.name] || 0),
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
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
          padding={device.scaleWidth(20)}
          width="100%"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <Box flexDirection="row" alignItems="center" marginBottom={4}>
            <Box marginRight={6}>
              <LeaderboardIcon width={device.scaleWidth(16)} height={device.scaleHeight(16)} color="#7C5CFF" />
            </Box>
            <Text variant="caption" letterSpacing={2} color="purple">
              {t('leaderboard.title')}
            </Text>
            <Box flex={1} />
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
                <CloseIcon width={device.scaleWidth(16)} height={device.scaleHeight(16)} color="white" />
              </Box>
            </Pressable>
          </Box>

          {sorted.map((player, index) => {
            const score = scores[player.name] || 0;
            const isFirst = index === 0;
            return (
              <Box
                key={player.name}
                flexDirection="row"
                alignItems="center"
                paddingVertical={10}
                style={{
                  borderBottomWidth: index < sorted.length - 1 ? 1 : 0,
                  borderBottomColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <Box width={device.scaleWidth(36)} alignItems="center">
                  <Text
                    variant="heading"
                    color={isFirst ? 'purple' : 'textSecondary'}
                  >
                    {index < 3 ? MEDALS[index] : `#${index + 1}`}
                  </Text>
                </Box>

                <Box
                  width={device.scaleWidth(32)}
                  height={device.scaleHeight(32)}
                  borderRadius="circle"
                  justifyContent="center"
                  alignItems="center"
                  marginRight={device.scaleWidth(12)}
                  style={{
                    backgroundColor: player.color,
                    shadowColor: player.color,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: isFirst ? 0.6 : 0.3,
                    shadowRadius: isFirst ? 8 : 4,
                    elevation: isFirst ? 6 : 3,
                  }}
                >
                  <Text variant="note" color="bgDeep">
                    {player.name[0]}
                  </Text>
                </Box>

                <Box flex={1}>
                  <Text
                    variant="bodyBold"
                    color="white"
                  >
                    {player.name}
                  </Text>
                </Box>

                <Box
                  borderRadius="md"
                  paddingHorizontal={device.scaleWidth(12)}
                  paddingVertical={4}
                  style={{
                    backgroundColor: isFirst
                      ? 'rgba(129,140,248,0.15)'
                      : 'transparent',
                  }}
                >
                  <Text
                    variant="bodyBold"
                    style={{ color: isFirst ? '#818CF8' : player.color }}
                  >
                    {score}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
}
