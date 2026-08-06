/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import { Pressable, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { AGE_QUESTION_TYPES, QuestionType } from '../data/questionTypes';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import { useTopicLabel } from '../i18n/topicLabels';

import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
  route?: any;
};

export default function QuestionTypeScreen({ navigation, route }: Props) {
  const {
    ageGroup,
    gameMode,
    questionTypes,
    setQuestionTypes,
    prepareAiDecks,
  } = useGame();

  const device = useDeviceHelper();
  const { t } = useTranslation();
  const labelTopic = useTopicLabel();

  const types = AGE_QUESTION_TYPES[ageGroup];
  const fromGame = route?.params?.source === 'game';

  const [selected, setSelected] = useState<QuestionType[]>(questionTypes);

  function toggle(type: QuestionType) {
    lightTap();

    setSelected(prev =>
      prev.includes(type) ? prev.filter(item => item !== type) : [...prev, type],
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
                  <BackIcon
                    width={device.scaleWidth(18)}
                    height={device.scaleHeight(18)}
                    color="white"
                  />
                </Box>
              </Pressable>
            </Box>

            <Box alignItems="center" flex={1}>
              <Text variant="screenTitle" color="yellow" textAlign="center">
                {t('topic.title')}
              </Text>
            </Box>

            <Box width={device.scaleWidth(42)} />
          </Box>
        </Box>

        {/* Title */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(16)}>
          <Text variant="note" color="textSecondary" marginTop={4}>
            {t('topic.subtitle')}
          </Text>
        </Box>

        {/* Type chips */}
        <Box flex={1} paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(24)}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box flexDirection="row" flexWrap="wrap">
              {types.map(type => {
                const active = selected.includes(type);

                return (
                  <Pressable key={type} onPress={() => toggle(type)}>
                    <Box
                      paddingHorizontal={device.scaleWidth(18)}
                      paddingVertical={device.scaleHeight(12)}
                      borderRadius="lg"
                      marginBottom={device.scaleHeight(12)}
                      marginRight={device.scaleWidth(10)}
                      style={
                        active
                          ? {
                              backgroundColor: '#818CF8',
                              borderWidth: 1.5,
                              borderColor: 'rgba(255,255,255,0.2)',
                              shadowColor: '#818CF8',
                              shadowOffset: {
                                width: 0,
                                height: 4,
                              },
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
                        variant="bodyBold"
                        color={active ? 'white' : 'textSecondary'}
                      >
                        {labelTopic(type)}
                      </Text>
                    </Box>
                  </Pressable>
                );
              })}
            </Box>
          </ScrollView>
        </Box>

        {/* Bottom section */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingBottom={device.scaleHeight(32)}>
          <Text
            variant="label"
            color="textSecondary"
            textAlign="center"
            marginBottom={device.scaleHeight(14)}
          >
            {t('topic.selected', { count: selected.length })}
          </Text>

          <Pressable onPress={handleContinue}>
            <Box
              height={device.scaleHeight(58)}
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: selected.length > 0 ? '#818CF8' : '#334155',
                shadowColor: '#818CF8',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: selected.length > 0 ? 0.4 : 0,
                shadowRadius: 12,
                elevation: selected.length > 0 ? 8 : 0,
                borderRadius: 16,
              }}
            >
              <Text
                variant="heading"
                letterSpacing={1}
                style={{
                  color: selected.length > 0 ? '#FFF' : '#64748B',
                }}
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
