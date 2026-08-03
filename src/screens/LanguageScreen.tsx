import React, { useState } from 'react';

import { Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { lightTap } from '../services/HapticService';
import TickIcon from '../assets/icon/tick.svg';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'es', label: 'Spanish', native: 'Espa\u00F1ol' },
  { code: 'fr', label: 'French', native: 'Fran\u00E7ais' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
  { code: 'pt', label: 'Portuguese', native: 'Portugu\u00EAs' },
  {
    code: 'hi',
    label: 'Hindi',
    native: '\u0939\u093F\u0928\u094D\u0926\u0940',
  },
  { code: 'ja', label: 'Japanese', native: '\u65E5\u672C\u8A9E' },
];

export default function LanguageScreen({ navigation }: Props) {
  const [selected, setSelected] = useState('en');

  function handleSelect(code: string) {
    lightTap();
    setSelected(code);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <Box paddingHorizontal={24} paddingTop={16} paddingBottom={40}>
          <Box flexDirection="row" alignItems="center" marginBottom={32}>
            <Pressable
              onPress={() => {
                lightTap();
                navigation.goBack();
              }}
            >
              <Box
                width={40}
                height={40}
                borderRadius="md"
                backgroundColor="surface"
                justifyContent="center"
                alignItems="center"
                marginRight={16}
              >
                <BackIcon width={18} height={18} color="white" />
              </Box>
            </Pressable>
            <Text variant="header" fontSize={28}>
              Language
            </Text>
          </Box>

          {LANGUAGES.map(lang => {
            const active = selected === lang.code;
            return (
              <Pressable
                key={lang.code}
                onPress={() => handleSelect(lang.code)}
              >
                <Box
                  flexDirection="row"
                  alignItems="center"
                  backgroundColor="surface"
                  borderRadius="md"
                  paddingHorizontal={16}
                  paddingVertical={14}
                  marginBottom={8}
                  style={{
                    borderWidth: 1,
                    borderColor: active ? '#7C5CFF' : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <Box flex={1}>
                    <Text
                      fontSize={15}
                      fontWeight="600"
                      color={active ? 'white' : 'textSecondary'}
                    >
                      {lang.label}
                    </Text>
                    <Text fontSize={13} color="textSecondary" marginTop={2}>
                      {lang.native}
                    </Text>
                  </Box>
                  {active && (
                    <Box
                      width={22}
                      height={22}
                      borderRadius="circle"
                      backgroundColor="purple"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <TickIcon width={12} height={12} color="white" />
                    </Box>
                  )}
                </Box>
              </Pressable>
            );
          })}

          <Box
            marginTop={24}
            backgroundColor="surface"
            borderRadius="md"
            padding={16}
            style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <Text fontSize={13} color="textSecondary" lineHeight={20}>
              Language selection changes the app text. Currently only English is
              fully supported — other languages coming soon.
            </Text>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
