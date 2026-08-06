import React, { useState } from 'react';

import { Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Box, Text } from '@src';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import { SUPPORTED_LANGUAGES, setLanguage, type AppLanguage } from '../i18n';
import TickIcon from '../assets/icon/tick.svg';
import BackIcon from '../assets/icon/back.svg';

type Props = {
  navigation: any;
};

export default function LanguageScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<AppLanguage>(
    (SUPPORTED_LANGUAGES.some(l => l.code === i18n.language)
      ? i18n.language
      : 'en') as AppLanguage,
  );
  const device = useDeviceHelper();

  function handleSelect(code: AppLanguage) {
    lightTap();
    setSelected(code);
    setLanguage(code);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(16)} paddingBottom={device.scaleHeight(40)}>
          <Box flexDirection="row" alignItems="center" marginBottom={device.scaleHeight(32)}>
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
              {t('language.title')}
            </Text>
          </Box>

          {SUPPORTED_LANGUAGES.map(lang => {
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
                  paddingHorizontal={device.scaleWidth(16)}
                  paddingVertical={device.scaleHeight(14)}
                  marginBottom={8}
                  style={{
                    borderWidth: 1,
                    borderColor: active ? '#7C5CFF' : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <Box flex={1}>
                    <Text
                      variant="bodyBold"
                      color={active ? 'white' : 'textSecondary'}
                    >
                      {t(lang.labelKey)}
                    </Text>
                  </Box>
                  {active && (
                    <Box
                      width={device.scaleWidth(22)}
                      height={device.scaleHeight(22)}
                      borderRadius="circle"
                      backgroundColor="purple"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <TickIcon width={device.scaleWidth(12)} height={device.scaleHeight(12)} color="white" />
                    </Box>
                  )}
                </Box>
              </Pressable>
            );
          })}

          <Box
            marginTop={device.scaleHeight(24)}
            backgroundColor="surface"
            borderRadius="md"
            padding={device.scaleWidth(16)}
            style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <Text variant="note" color="textSecondary" lineHeight={device.scaleHeight(20)}>
              {t('language.info')}
            </Text>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
