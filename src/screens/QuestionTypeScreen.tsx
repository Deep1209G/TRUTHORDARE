/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import { Pressable, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';
import { AGE_QUESTION_TYPES, QuestionType } from '../data/questionTypes';
import { lightTap } from '../services/HapticService';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
  route?: any;
};

export default function QuestionTypeScreen({ navigation, route }: Props) {
  const { ageGroup, gameMode, questionTypes, setQuestionTypes, prepareAiDecks } =
    useGame();
  const types = AGE_QUESTION_TYPES[ageGroup];
  const fromGame = route?.params?.source === 'game';
  const [selected, setSelected] = useState<QuestionType[]>(questionTypes);

  function toggle(type: QuestionType) {
    lightTap();
    setSelected(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type],
    );
  }

  function handleContinue() {
    if (selected.length === 0) return;
    lightTap();
    const chosen = selected;
    setQuestionTypes(chosen);
    if (gameMode === 'standard') {
      prepareAiDecks(chosen);
    }
    if (fromGame) {
      navigation.goBack();
    } else {
      navigation.navigate('PlayerSetup');
    }
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
                Choose a Topic
              </Text>
            </Box>
            <Box width={42} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={24} paddingTop={16}>
          {/* <Text fontSize={24} fontWeight="700" color="white">
            Choose Question Types
          </Text> */}
          <Text fontSize={13} color="textSecondary" marginTop={4}>
            Select one or more types for this game
          </Text>
        </Box>

        {/* Type chips */}
        <Box flex={1} paddingHorizontal={24} paddingTop={24}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box flexDirection="row" flexWrap="wrap">
              {types.map(type => {
                const active = selected.includes(type);
                return (
                  <Pressable key={type} onPress={() => toggle(type)}>
                    <Box
                      paddingHorizontal={18}
                      paddingVertical={12}
                      borderRadius="lg"
                      marginBottom={12}
                      marginRight={10}
                      style={
                        active
                          ? {
                              backgroundColor: '#818CF8',
                              borderWidth: 1.5,
                              borderColor: 'rgba(255,255,255,0.2)',
                              shadowColor: '#818CF8',
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.4,
                              shadowRadius: 12,
                              elevation: 8,
                            }
                          : {
                              backgroundColor: 'rgba(255,255,255,0.07)',
                              borderWidth: 1.5,
                              borderColor: 'rgba(255,255,255,0.12)',
                            }
                      }
                    >
                      <Text
                        fontSize={15}
                        fontWeight="700"
                        color={active ? 'white' : 'textSecondary'}
                      >
                        {type}
                      </Text>
                    </Box>
                  </Pressable>
                );
              })}
            </Box>
          </ScrollView>
        </Box>

        {/* Bottom section */}
        <Box paddingHorizontal={24} paddingBottom={32}>
          <Text
            fontSize={12}
            color="textSecondary"
            textAlign="center"
            marginBottom={14}
          >
            {selected.length} selected
          </Text>
          <Pressable onPress={handleContinue}>
            <Box
              height={58}
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: selected.length > 0 ? '#818CF8' : '#334155',
                shadowColor: '#818CF8',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: selected.length > 0 ? 0.4 : 0,
                shadowRadius: 12,
                elevation: selected.length > 0 ? 8 : 0,
                borderRadius: 16,
              }}
            >
              <Text
                fontSize={18}
                fontWeight="700"
                letterSpacing={1}
                style={{ color: selected.length > 0 ? '#FFF' : '#64748B' }}
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
