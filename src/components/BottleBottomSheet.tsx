/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Modal, Pressable, Image, ScrollView } from 'react-native';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { BOTTLES } from '../data/bottles';
import { lightTap } from '../services/HapticService';
import { playSound } from '../services/SoundService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import CloseIcon from '../assets/icon/close.svg';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function BottleBottomSheet({ visible, onClose }: Props) {
  const { selectedBottle, setSelectedBottleId, soundEnabled } = useGame();
  const { t } = useTranslation();
  const device = useDeviceHelper();

  function handleSelect(id: string) {
    lightTap();
    playSound('tap', soundEnabled);
    setSelectedBottleId(id);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Box flex={1} style={{ backgroundColor: 'rgba(12,4,24,0.7)' }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        <Box
          backgroundColor="bgDeep"
          borderTopLeftRadius="xl"
          borderTopRightRadius="xl"
          paddingHorizontal={device.scaleWidth(16)}
          paddingTop={device.scaleHeight(12)}
          paddingBottom={device.scaleHeight(28)}
          maxHeight="72%"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
            borderBottomWidth: 0,
          }}
        >
          {/* Handle bar */}
          <Box alignItems="center" marginBottom={device.scaleHeight(10)}>
            <Box
              width={device.scaleWidth(44)}
              height={4}
              borderRadius="md"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
          </Box>

          {/* Header */}
          <Box flexDirection="row" alignItems="center" marginBottom={4}>
            <Box flex={1}>
              <Text variant="heading" color="white">
                {t('bottles.title')}
              </Text>
              <Text variant="note" color="textSecondary" marginTop={2}>
                {t('bottles.subtitle')}
              </Text>
            </Box>
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
                <CloseIcon
                  width={device.scaleWidth(16)}
                  height={device.scaleHeight(16)}
                  color="white"
                />
              </Box>
            </Pressable>
          </Box>

          {/* Bottle grid */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box flexDirection="row" flexWrap="wrap" marginTop={device.scaleHeight(10)}>
              {BOTTLES.map(bottle => {
                const isActive = bottle.id === selectedBottle.id;
                return (
                  <Pressable
                    key={bottle.id}
                    onPress={() => handleSelect(bottle.id)}
                    style={{ width: '50%' }}
                  >
                    <Box
                      flex={1}
                      marginBottom={device.scaleHeight(12)}
                      marginHorizontal={device.scaleWidth(6)}
                      borderRadius="lg"
                      paddingVertical={device.scaleHeight(10)}
                      alignItems="center"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderWidth: 2,
                        borderColor: isActive
                          ? bottle.color
                          : 'rgba(255,255,255,0.08)',
                        shadowColor: isActive ? bottle.color : 'transparent',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: isActive ? 0.6 : 0,
                        shadowRadius: isActive ? 12 : 0,
                        elevation: isActive ? 8 : 0,
                      }}
                    >
                      <Box
                        position="absolute"
                        top={6}
                        right={8}
                        width={device.scaleWidth(20)}
                        height={device.scaleHeight(20)}
                        borderRadius="circle"
                        justifyContent="center"
                        alignItems="center"
                        style={{
                          backgroundColor: isActive
                            ? bottle.color
                            : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        {isActive && (
                          <Text variant="micro" color="bgDeep">
                            {'\u2713'}
                          </Text>
                        )}
                      </Box>

                      <Image
                        source={bottle.image}
                        style={{
                          width: device.scaleWidth(44),
                          height: device.scaleHeight(110),
                          resizeMode: 'contain',
                        }}
                      />

                      <Text
                        variant="caption"
                        color={isActive ? 'white' : 'textSecondary'}
                        marginTop={device.scaleHeight(6)}
                        letterSpacing={0.5}
                      >
                        {t(bottle.nameKey)}
                      </Text>
                    </Box>
                  </Pressable>
                );
              })}
            </Box>
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
}
