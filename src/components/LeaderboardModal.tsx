/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Modal, Pressable } from 'react-native';

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import CloseIcon from '../assets/icon/close.svg';
import LeaderboardIcon from '../assets/icon/leaderboard.svg';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const MEDALS = ['\u{1F947}', '\u{1F948}', '\u{1F949}'];

export default function LeaderboardModal({ visible, onClose }: Props) {
  const { players, scores } = useGame();

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
          padding={20}
          width="100%"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <Box flexDirection="row" alignItems="center" marginBottom={4}>
            <Box marginRight={6}>
              <LeaderboardIcon width={16} height={16} color="#7C5CFF" />
            </Box>
            <Text fontSize={11} fontWeight="700" letterSpacing={2} color="purple">
              LEADERBOARD
            </Text>
            <Box flex={1} />
            <Pressable
              onPress={() => {
                lightTap();
                onClose();
              }}
            >
              <Box
                width={36}
                height={36}
                borderRadius="md"
                backgroundColor="surface"
                justifyContent="center"
                alignItems="center"
              >
                <CloseIcon width={16} height={16} color="white" />
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
                <Box width={36} alignItems="center">
                  <Text
                    fontSize={17}
                    fontWeight="700"
                    color={isFirst ? 'purple' : 'textSecondary'}
                  >
                    {index < 3 ? MEDALS[index] : `#${index + 1}`}
                  </Text>
                </Box>

                <Box
                  width={32}
                  height={32}
                  borderRadius="circle"
                  justifyContent="center"
                  alignItems="center"
                  marginRight={12}
                  style={{
                    backgroundColor: player.color,
                    shadowColor: player.color,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: isFirst ? 0.6 : 0.3,
                    shadowRadius: isFirst ? 8 : 4,
                    elevation: isFirst ? 6 : 3,
                  }}
                >
                  <Text fontSize={13} fontWeight="700" color="bgDeep">
                    {player.name[0]}
                  </Text>
                </Box>

                <Box flex={1}>
                  <Text
                    fontSize={14}
                    fontWeight={isFirst ? '700' : '600'}
                    color="white"
                  >
                    {player.name}
                  </Text>
                </Box>

                <Box
                  borderRadius="md"
                  paddingHorizontal={12}
                  paddingVertical={4}
                  style={{
                    backgroundColor: isFirst
                      ? 'rgba(129,140,248,0.15)'
                      : 'transparent',
                  }}
                >
                  <Text
                    fontSize={16}
                    fontWeight="800"
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
