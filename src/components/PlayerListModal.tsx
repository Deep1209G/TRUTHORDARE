/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';

import {
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
import { useDeviceHelper } from '../hooks/useDeviceHelper';
import CloseIcon from '../assets/icon/close.svg';
import AddPlayerIcon from '../assets/icon/addplayer.svg';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const PRESET_NAMES = [
  'Maya',
  'Leo',
  'Priya',
  'Sam',
  'Zara',
  'Kai',
  'Ava',
  'Noah',
  'Mia',
  'Liam',
];

export default function PlayerListModal({ visible, onClose }: Props) {
  const { players, addPlayer, removePlayer, renamePlayer } = useGame();
  const { t } = useTranslation();
  const device = useDeviceHelper();
  const [newName, setNewName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimer.current) clearTimeout(errorTimer.current);
    };
  }, []);

  function showError(msg: string) {
    setErrorMsg(msg);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setErrorMsg(null), 2500);
  }

  function handleAdd() {
    lightTap();
    const name = newName.trim();
    if (!name) return;
    if (!addPlayer(name)) {
      showError(t('playerModal.errorExists'));
      return;
    }
    setNewName('');
  }

  function handleQuickAdd() {
    lightTap();
    const used = new Set(players.map(p => p.name.toLowerCase()));
    const name =
      PRESET_NAMES.find(n => !used.has(n.toLowerCase())) ||
      t('players.playerFallback', { number: players.length + 1 });
    if (!addPlayer(name)) {
      showError(t('playerModal.errorMax'));
    }
  }

  function startRename(index: number, currentName: string) {
    lightTap();
    setEditingIndex(index);
    setEditingName(currentName);
  }

  function cancelRename() {
    setEditingIndex(null);
    setEditingName('');
  }

  function saveRename() {
    lightTap();
    if (editingIndex === null) return;
    if (!renamePlayer(editingIndex, editingName)) {
      showError(t('playerModal.errorEmpty'));
      return;
    }
    cancelRename();
  }

  function confirmRemove() {
    lightTap();
    if (confirmIndex === null) return;
    if (!removePlayer(confirmIndex)) {
      showError(t('playerModal.errorMin'));
    }
    setConfirmIndex(null);
  }

  const confirmPlayer = confirmIndex !== null ? players[confirmIndex] : null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Box
          flex={1}
          style={{ backgroundColor: 'rgba(12,4,24,0.88)' }}
          justifyContent="center"
          paddingHorizontal={20}
        >
          <Box
            backgroundColor="bgDeep"
            borderRadius="xl"
            padding={device.scaleWidth(20)}
            maxHeight="82%"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            {/* Header */}
            <Box flexDirection="row" alignItems="center" marginBottom={16}>
              <Text variant="caption" letterSpacing={2} color="purple">
                {'\u{1F465}'} {t('players.section')}
              </Text>
              <Box flex={1} />
              <Box
                borderRadius="md"
                paddingHorizontal={device.scaleWidth(10)}
                paddingVertical={4}
                marginRight={device.scaleWidth(8)}
                style={{ backgroundColor: 'rgba(129,140,248,0.15)' }}
              >
                <Text variant="label" style={{ color: '#818CF8' }}>
                  {players.length} / 10
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
                  <CloseIcon width={device.scaleWidth(16)} height={device.scaleHeight(16)} color="white" />
                </Box>
              </Pressable>
            </Box>

            {/* Add player input */}
            <Box
              flexDirection="row"
              alignItems="center"
              backgroundColor="surface"
              borderRadius="md"
              paddingHorizontal={device.scaleWidth(14)}
              paddingVertical={4}
              marginBottom={10}
              style={{
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <Box flex={1}>
                <TextInput
                  value={newName}
                  onChangeText={setNewName}
                  placeholder={t('common.enterName')}
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  style={{
                    color: '#FFF',
                    fontSize: device.scaleWidth(14),
                    paddingVertical: 8,
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleAdd}
                />
              </Box>
              <Pressable onPress={handleAdd}>
                <Box
                  width={device.scaleWidth(32)}
                  height={device.scaleHeight(32)}
                  borderRadius="circle"
                  backgroundColor="purple"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AddPlayerIcon width={device.scaleWidth(16)} height={device.scaleHeight(16)} color="white" />
                </Box>
              </Pressable>
            </Box>

            <Pressable onPress={handleQuickAdd}>
              <Box
                height={device.scaleHeight(38)}
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                marginBottom={16}
                style={{
                  borderWidth: 1.5,
                  borderColor: 'rgba(129,140,248,0.35)',
                  borderStyle: 'dashed',
                  borderRadius: 12,
                }}
              >
                <Text variant="label" style={{ color: '#818CF8' }}>
                  {t('common.quickAdd')}
                </Text>
              </Box>
            </Pressable>

            {errorMsg && (
              <Box
                borderRadius="md"
                paddingHorizontal={device.scaleWidth(12)}
                paddingVertical={8}
                marginBottom={12}
                style={{
                  backgroundColor: 'rgba(239,68,68,0.12)',
                  borderWidth: 1,
                  borderColor: 'rgba(239,68,68,0.3)',
                }}
              >
                <Text variant="label" style={{ color: '#EF4444' }}>
                  {errorMsg}
                </Text>
              </Box>
            )}

            {/* Player list */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {players.map((player, index) => {
                const editing = editingIndex === index;
                return (
                  <Box
                    key={`${player.name}-${index}`}
                    flexDirection="row"
                    alignItems="center"
                    paddingVertical={8}
                    style={{
                      borderBottomWidth: index < players.length - 1 ? 1 : 0,
                      borderBottomColor: 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <Box width={device.scaleWidth(34)} alignItems="center" marginRight={device.scaleWidth(10)}>
                      <Text
                        variant="caption"
                        color="textSecondary"
                        style={{ fontVariant: ['tabular-nums'] }}
                      >
                        {index + 1}/{players.length}
                      </Text>
                    </Box>

                    <Box
                      width={device.scaleWidth(36)}
                      height={device.scaleHeight(36)}
                      borderRadius="circle"
                      justifyContent="center"
                      alignItems="center"
                      marginRight={device.scaleWidth(12)}
                      style={{
                        backgroundColor: player.color,
                        shadowColor: player.color,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.4,
                        shadowRadius: 6,
                        elevation: 4,
                      }}
                    >
                      <Text variant="bodyBold" color="bgDeep">
                        {player.name[0]}
                      </Text>
                    </Box>

                    {editing ? (
                      <Box
                        flex={1}
                        flexDirection="row"
                        alignItems="center"
                        backgroundColor="surface"
                        borderRadius="md"
                        paddingHorizontal={device.scaleWidth(10)}
                        paddingVertical={2}
                      >
                        <TextInput
                          value={editingName}
                          onChangeText={setEditingName}
                          placeholder={t('common.namePlaceholder')}
                          placeholderTextColor="rgba(255,255,255,0.3)"
                          style={{
                            color: '#FFF',
                            fontSize: device.scaleWidth(14),
                            paddingVertical: 6,
                            flex: 1,
                          }}
                          returnKeyType="done"
                          onSubmitEditing={saveRename}
                          autoFocus
                        />
                        <Pressable onPress={saveRename} style={{ marginRight: 8 }}>
                          <Text variant="bodyBold" style={{ color: '#34D399' }}>
                            {'\u2713'}
                          </Text>
                        </Pressable>
                        <Pressable onPress={cancelRename}>
                          <Text variant="bodyBold" style={{ color: '#EF4444' }}>
                            {'\u2715'}
                          </Text>
                        </Pressable>
                      </Box>
                    ) : (
                      <Box flex={1}>
                        <Text variant="bodyBold" color="white">
                          {player.name}
                        </Text>
                      </Box>
                    )}

                    {!editing && (
                      <>
                        <Pressable onPress={() => startRename(index, player.name)}>
                          <Box
                            width={device.scaleWidth(30)}
                            height={device.scaleHeight(30)}
                            borderRadius="circle"
                            justifyContent="center"
                            alignItems="center"
                            marginRight={device.scaleWidth(10)}
                            style={{ backgroundColor: 'rgba(129,140,248,0.15)' }}
                          >
                            <Text variant="note" style={{ color: '#818CF8' }}>
                              {'\u270E'}
                            </Text>
                          </Box>
                        </Pressable>
                        <Pressable onPress={() => { lightTap(); setConfirmIndex(index); }}>
                          <Box
                            width={device.scaleWidth(30)}
                            height={device.scaleHeight(30)}
                            borderRadius="circle"
                            justifyContent="center"
                            alignItems="center"
                            style={{ backgroundColor: 'rgba(239,68,68,0.15)' }}
                          >
                            <Text style={{ color: '#EF4444' }}>
                              x
                            </Text>
                          </Box>
                        </Pressable>
                      </>
                    )}
                  </Box>
                );
              })}
            </ScrollView>
          </Box>

          {/* Remove confirmation (stays inside the modal) */}
          {confirmPlayer && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              justifyContent="center"
              alignItems="center"
              style={{ backgroundColor: 'rgba(12,4,24,0.7)' }}
            >
              <Box
                backgroundColor="bgDeep"
                borderRadius="xl"
                padding={device.scaleWidth(24)}
                width="80%"
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <Text
                  variant="heading"
                  color="white"
                  textAlign="center"
                  marginBottom={6}
                >
                  {t('playerModal.removeTitle')}
                </Text>
                <Text
                  variant="note"
                  color="textSecondary"
                  textAlign="center"
                  marginBottom={device.scaleHeight(20)}
                >
                  {t('playerModal.removeBody', { name: confirmPlayer.name })}
                </Text>

                <Pressable onPress={confirmRemove}>
                  <Box
                    height={device.scaleHeight(50)}
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
                    <Text variant="bodyBold" color="white" letterSpacing={1}>
                      {t('common.remove')}
                    </Text>
                  </Box>
                </Pressable>

                <Pressable
                  onPress={() => {
                    lightTap();
                    setConfirmIndex(null);
                  }}
                >
                  <Box
                    height={device.scaleHeight(50)}
                    borderRadius="lg"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                  >
                    <Text variant="bodyBold" color="white">
                      {t('common.cancel')}
                    </Text>
                  </Box>
                </Pressable>
              </Box>
            </Box>
          )}
        </Box>
      </KeyboardAvoidingView>
    </Modal>
  );
}
