/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Pressable, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';

type Props = {
  navigation: any;
};

const MEDALS = ['\u{1F947}', '\u{1F948}', '\u{1F949}'];

export default function GameOverScreen({ navigation }: Props) {
  const { players, scores, resetGame, setPlayers } = useGame();

  const sorted = [...players].sort(
    (a, b) => (scores[b.name] || 0) - (scores[a.name] || 0),
  );

  function handleRestart() {
    resetGame();
    setPlayers([]);
    navigation.reset({ index: 0, routes: [{ name: 'HostMode' }] });
  }

  function handleHome() {
    resetGame();
    setPlayers([]);
    navigation.reset({ index: 0, routes: [{ name: 'HomeMenu' }] });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 40,
          }}
        >
          {/* Title */}
          <Box alignItems="center" marginBottom={8}>
            <Text
              fontSize={40}
              fontWeight="800"
              color="white"
              letterSpacing={2}
            >
              GAME OVER
            </Text>
            <Text fontSize={14} color="textSecondary" marginTop={4}>
              Final Scores
            </Text>
          </Box>

          {/* Trophy */}
          <Box alignItems="center" marginBottom={32}>
            <Text fontSize={56}>{'\u{1F3C6}'}</Text>
          </Box>

          {/* Leaderboard */}
          <Box
            backgroundColor="surface"
            borderRadius="lg"
            padding={16}
            marginBottom={32}
          >
            {sorted.map((player, index) => {
              const score = scores[player.name] || 0;
              const isFirst = index === 0;
              return (
                <Box
                  key={player.name}
                  flexDirection="row"
                  alignItems="center"
                  paddingVertical={12}
                  style={{
                    borderBottomWidth: index < sorted.length - 1 ? 1 : 0,
                    borderBottomColor: 'rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Rank */}
                  <Box width={40} alignItems="center">
                    <Text
                      fontSize={20}
                      fontWeight="700"
                      color={isFirst ? 'purple' : 'textSecondary'}
                    >
                      {index < 3 ? MEDALS[index] : `#${index + 1}`}
                    </Text>
                  </Box>

                  {/* Avatar */}
                  <Box
                    width={36}
                    height={36}
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
                    <Text fontSize={15} fontWeight="700" color="bgDeep">
                      {player.name[0]}
                    </Text>
                  </Box>

                  {/* Name */}
                  <Box flex={1}>
                    <Text
                      fontSize={15}
                      fontWeight={isFirst ? '700' : '600'}
                      color="white"
                    >
                      {player.name}
                    </Text>
                  </Box>

                  {/* Score */}
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
                      fontSize={18}
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

          {/* Actions */}
          <Pressable onPress={handleRestart}>
            <Box
              height={54}
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              marginBottom={12}
              style={{
                backgroundColor: '#818CF8',
                shadowColor: '#818CF8',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text
                fontSize={16}
                fontWeight="700"
                color="white"
                letterSpacing={1}
              >
                RESTART GAME
              </Text>
            </Box>
          </Pressable>

          <Pressable onPress={handleHome}>
            <Box
              height={54}
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              style={{
                borderWidth: 1.5,
                borderColor: 'rgba(129,140,248,0.4)',
              }}
            >
              <Text
                fontSize={16}
                fontWeight="700"
                style={{ color: '#818CF8' }}
                letterSpacing={1}
              >
                GO TO HOME
              </Text>
            </Box>
          </Pressable>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
