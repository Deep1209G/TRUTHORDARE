/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import { Pressable, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import TickIcon from '../assets/icon/tick.svg';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

const PRESETS = [
  { label: 'No Timer', seconds: 0 },
  { label: '15 Seconds', seconds: 15 },
  { label: '30 Seconds', seconds: 30 },
  { label: '45 Seconds', seconds: 45 },
  { label: '60 Seconds', seconds: 60 },
];

const CUSTOM_MIN = 1;
const CUSTOM_MAX = 3600;

export default function TurnTimerScreen({ navigation }: Props) {
  const { setTurnTimer } = useGame();
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
        <Box paddingHorizontal={24} paddingTop={16}>
          <Box flexDirection="row" alignItems="center">
            <Box width={42}>
              <Pressable
                onPress={() => {
                  lightTap();
                  navigation.goBack();
                }}
              >
                <Box
                  width={42}
                  height={42}
                  borderRadius="md"
                  backgroundColor="surface"
                  justifyContent="center"
                  alignItems="center"
                >
                  <BackIcon width={18} height={18} color="white" />
                </Box>
              </Pressable>
            </Box>
            <Box alignItems="center" flex={1}>
              <Text variant="title" fontSize={28} textAlign="center">
                TRUTH OR DARE
              </Text>
            </Box>
            <Box width={42} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={24} paddingTop={32}>
          <Text fontSize={24} fontWeight="700" color="white">
            Choose Turn Timer
          </Text>
          <Text fontSize={13} color="textSecondary" marginTop={4}>
            Countdown for each player's turn
          </Text>
        </Box>

        {/* Timer options */}
        <Box paddingHorizontal={24} paddingTop={24}>
          {PRESETS.map(item => {
            const active = !customActive && selected === item.seconds;
            return (
              <Pressable key={item.seconds} onPress={() => selectPreset(item.seconds)}>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  borderRadius="lg"
                  padding={16}
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
                      fontSize={16}
                      fontWeight="700"
                      color={active ? 'white' : 'textSecondary'}
                    >
                      {item.label}
                    </Text>
                  </Box>
                  {active && <TickIcon width={24} height={24} color="white" />}
                </Box>
              </Pressable>
            );
          })}

          {/* Custom Time */}
          <Pressable onPress={selectCustom}>
            <Box
              borderRadius="lg"
              padding={16}
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
                    fontSize={16}
                    fontWeight="700"
                    color={customActive ? 'white' : 'textSecondary'}
                  >
                    Custom Time
                  </Text>
                  <Text
                    fontSize={12}
                    color={customActive ? 'white' : 'textSecondary'}
                    opacity={customActive ? 0.8 : 0.6}
                  >
                    Set your own duration
                  </Text>
                </Box>
                {customActive && (
                  <TickIcon width={24} height={24} color="white" />
                )}
              </Box>

              {customActive && (
                <Box
                  flexDirection="row"
                  alignItems="center"
                  marginTop={14}
                  backgroundColor="bgDeep"
                  borderRadius="md"
                  paddingHorizontal={14}
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
                      placeholder="Enter seconds..."
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="number-pad"
                      style={{
                        color: '#FFF',
                        fontSize: 15,
                        paddingVertical: 8,
                      }}
                    />
                  </Box>
                  <Text
                    fontSize={14}
                    fontWeight="600"
                    color={customValid ? 'white' : 'textSecondary'}
                  >
                    s
                  </Text>
                </Box>
              )}
            </Box>
          </Pressable>

          {customActive && !customValid && customInput.length > 0 && (
            <Text
              fontSize={11}
              color="orange"
              marginTop={6}
              paddingLeft={6}
            >
              Enter a value between {CUSTOM_MIN} and {CUSTOM_MAX} seconds
            </Text>
          )}
        </Box>

        {/* Bottom section */}
        <Box flex={1} justifyContent="flex-end" paddingHorizontal={24} paddingBottom={32}>
          <Pressable onPress={handleContinue}>
            <Box
              height={58}
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
                fontSize={18}
                fontWeight="700"
                letterSpacing={1}
                style={{ color: canContinue ? '#FFF' : '#64748B' }}
              >
                CONTINUE
              </Text>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
