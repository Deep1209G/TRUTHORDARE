/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import { Modal, Pressable } from 'react-native';

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import BackIcon from '../assets/icon/back.svg';
import PeopleIcon from '../assets/icon/people.svg';
import LeaderboardIcon from '../assets/icon/leaderboard.svg';
import SettingIcon from '../assets/icon/setting.svg';
import PlayerListModal from './PlayerListModal';
import LeaderboardModal from './LeaderboardModal';

const CATEGORIES: {
  label: string;
  value: 'mild' | 'medium' | 'wild';
  description: string;
}[] = [
  { label: 'Mild', value: 'mild', description: 'Playful & fun' },
  { label: 'Medium', value: 'medium', description: 'A bit spicy' },
  { label: 'Wild', value: 'wild', description: 'Full chaos' },
];

type Props = {
  navigation?: any;
};

export default function Header({ navigation }: Props) {
  const {
    players,
    selectedPlayerIndex,
    round,
    difficulty,
    setDifficulty,
    resetGame,
    setPlayers,
  } = useGame();
  const [showPlayers, setShowPlayers] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const turn =
    players.length > 0 ? (selectedPlayerIndex % players.length) + 1 : 0;
  const total = players.length;

  function handleLeave() {
    lightTap();
    setShowLeave(false);
    resetGame();
    setPlayers([]);
    navigation?.reset({ index: 0, routes: [{ name: 'HomeMenu' }] });
  }

  return (
    <Box
      width="100%"
      paddingHorizontal={22}
      paddingTop={20}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Pressable
        onPress={() => {
          lightTap();
          setShowLeave(true);
        }}
      >
        <Box
          width={46}
          height={46}
          borderRadius="md"
          backgroundColor="surface"
          justifyContent="center"
          alignItems="center"
        >
          <BackIcon width={18} height={18} color="white" />
        </Box>
      </Pressable>

      <Box flexDirection="row" alignItems="center">
        <Box
          flexDirection="row"
          alignItems="center"
          borderRadius="md"
          backgroundColor="surface"
          height={46}
          width={60}
          justifyContent="center"
          marginRight={8}
        >
          <Text
            fontSize={11}
            fontWeight="700"
            color="textSecondary"
            marginRight={6}
          >
            ROUND
          </Text>
          <Text
            fontSize={11}
            fontWeight="700"
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
        >
          <Box
            width={55}
            height={46}
            borderRadius="md"
            backgroundColor="surface"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
          >
            <PeopleIcon width={18} height={18} color="white" />
            {total > 0 && (
              <Text
                paddingLeft={4}
                variant="subtitle"
                color="white"
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
        >
          <Box
            width={46}
            height={46}
            borderRadius="md"
            backgroundColor="surface"
            justifyContent="center"
            alignItems="center"
            marginRight={8}
          >
            <LeaderboardIcon width={22} height={22} color="white" />
          </Box>
        </Pressable>
        <Pressable
          onPress={() => {
            lightTap();
            navigation?.navigate('Settings');
          }}
        >
          <Box
            width={46}
            height={46}
            borderRadius="md"
            backgroundColor="surface"
            justifyContent="center"
            alignItems="center"
          >
            <SettingIcon width={24} height={24} color="white" />
          </Box>
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
            padding={24}
            width="85%"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <Text
              fontSize={18}
              fontWeight="800"
              color="white"
              textAlign="center"
              marginBottom={4}
            >
              Category
            </Text>
            <Text
              fontSize={13}
              color="textSecondary"
              textAlign="center"
              marginBottom={20}
            >
              Pick the difficulty for questions
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
                    paddingHorizontal={18}
                    height={54}
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
                      <Text fontSize={15} fontWeight="700" color="white">
                        {item.label}
                      </Text>
                      <Text fontSize={12} color="textSecondary">
                        {item.description}
                      </Text>
                    </Box>
                    <Box
                      width={22}
                      height={22}
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
                        <Text fontSize={13} fontWeight="800" color="white">
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
                height={50}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                marginTop={6}
                style={{
                  borderWidth: 1.5,
                  borderColor: 'rgba(255,255,255,0.15)',
                }}
              >
                <Text fontSize={15} fontWeight="700" color="white">
                  CLOSE
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
            padding={24}
            width="80%"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <Text
              fontSize={18}
              fontWeight="800"
              color="white"
              textAlign="center"
              marginBottom={6}
            >
              Leave the game?
            </Text>
            <Text
              fontSize={13}
              color="textSecondary"
              textAlign="center"
              marginBottom={20}
            >
              Your progress will be lost.
            </Text>

            <Pressable onPress={handleLeave}>
              <Box
                height={50}
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
                  fontSize={15}
                  fontWeight="700"
                  color="white"
                  letterSpacing={1}
                >
                  LEAVE GAME
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
                height={50}
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                style={{
                  borderWidth: 1.5,
                  borderColor: 'rgba(255,255,255,0.15)',
                }}
              >
                <Text fontSize={15} fontWeight="700" color="white">
                  CANCEL
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
