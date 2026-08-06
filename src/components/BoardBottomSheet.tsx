/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Modal, Pressable, ScrollView } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { BOARDS } from '../data/boards';
import { lightTap } from '../services/HapticService';
import { playSound } from '../services/SoundService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import CloseIcon from '../assets/icon/close.svg';
import TickIcon from '../assets/icon/tick.svg';

type Props = {
  visible: boolean;
  onClose: () => void;
};

function BoardPreview({ theme }: { theme: (typeof BOARDS)[number] }) {
  const device = useDeviceHelper();
  const size = device.scaleWidth(84);
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx={50}
        cy={50}
        r={48}
        fill={theme.bgEnd}
        stroke={theme.borderC1}
        strokeWidth="2.5"
      />
      <Circle cx={50} cy={50} r={34} fill={theme.bgStart} />
      <Circle
        cx={50}
        cy={50}
        r={34}
        fill="none"
        stroke={theme.ring}
        strokeWidth="1.5"
      />
      <Circle cx={50} cy={50} r={13} fill={theme.glow} opacity={0.7} />
      <Circle cx={50} cy={30} r={5} fill={theme.pointer} />
    </Svg>
  );
}

export default function BoardBottomSheet({ visible, onClose }: Props) {
  const { selectedBoard, setSelectedBoardId, soundEnabled } = useGame();
  const { t } = useTranslation();
  const device = useDeviceHelper();

  function handleSelect(id: string) {
    lightTap();
    playSound('tap', soundEnabled);
    setSelectedBoardId(id);
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
                {t('boards.title')}
              </Text>
              <Text variant="note" color="textSecondary" marginTop={2}>
                {t('boards.subtitle')}
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

          {/* Board grid */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box
              flexDirection="row"
              flexWrap="wrap"
              marginTop={device.scaleHeight(10)}
            >
              {BOARDS.map(board => {
                const isActive = board.id === selectedBoard.id;
                return (
                  <Pressable
                    key={board.id}
                    onPress={() => handleSelect(board.id)}
                    style={{ width: '50%' }}
                  >
                    <Box
                      flex={1}
                      marginBottom={device.scaleHeight(12)}
                      marginHorizontal={device.scaleWidth(6)}
                      borderRadius="lg"
                      paddingVertical={device.scaleHeight(12)}
                      alignItems="center"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderWidth: 2,
                        borderColor: isActive
                          ? board.color
                          : 'rgba(255,255,255,0.08)',
                        shadowColor: isActive ? board.color : 'transparent',
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
                            ? board.color
                            : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        {isActive && (
                          <TickIcon
                            width={device.scaleWidth(12)}
                            height={device.scaleHeight(12)}
                            color="#241249"
                          />
                        )}
                      </Box>

                      <BoardPreview theme={board} />

                      <Text
                        variant="caption"
                        color={isActive ? 'white' : 'textSecondary'}
                        marginTop={device.scaleHeight(8)}
                        letterSpacing={0.5}
                      >
                        {t(board.nameKey)}
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
