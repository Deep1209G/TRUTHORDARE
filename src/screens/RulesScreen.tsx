/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Pressable, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import BackIcon from '../assets/icon/back.svg';
import { useTranslation } from 'react-i18next';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';

type Props = {
  navigation: any;
};

const RULES = [
  { titleKey: 'rules.rule1Title', bodyKey: 'rules.rule1Body' },
  { titleKey: 'rules.rule2Title', bodyKey: 'rules.rule2Body' },
  { titleKey: 'rules.rule3Title', bodyKey: 'rules.rule3Body' },
  { titleKey: 'rules.rule4Title', bodyKey: 'rules.rule4Body' },
  { titleKey: 'rules.rule5Title', bodyKey: 'rules.rule5Body' },
  { titleKey: 'rules.rule6Title', bodyKey: 'rules.rule6Body' },
];

export default function RulesScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const device = useDeviceHelper();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(16)} paddingBottom={device.scaleHeight(40)} flex={1}>
          <Box flexDirection="row" alignItems="center" marginBottom={device.scaleHeight(24)}>
            <Pressable
              onPress={() => {
                lightTap();
                navigation.goBack();
              }}
            >
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
              {t('rules.title')}
            </Text>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false}>
            {RULES.map((rule, i) => (
              <Box
                key={i}
                backgroundColor="surface"
                borderRadius="md"
                padding={device.scaleWidth(16)}
                marginBottom={12}
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <Box flexDirection="row" alignItems="center" marginBottom={8}>
                  <Box
                    width={device.scaleWidth(26)}
                    height={device.scaleHeight(26)}
                    borderRadius="circle"
                    backgroundColor="purple"
                    justifyContent="center"
                    alignItems="center"
                    marginRight={device.scaleWidth(12)}
                  >
                    <Text variant="note" color="white">
                      {i + 1}
                    </Text>
                  </Box>
                  <Text variant="bodyBold" color="white">
                    {t(rule.titleKey)}
                  </Text>
                </Box>
                <Text
                  variant="note"
                  color="textSecondary"
                  lineHeight={device.scaleHeight(20)}
                  paddingLeft={device.scaleWidth(32)}
                >
                  {t(rule.bodyKey)}
                </Text>
              </Box>
            ))}
          </ScrollView>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
