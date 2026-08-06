/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

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
import TickIcon from '../assets/icon/tick.svg';
import EditIcon from '../assets/icon/edit.svg';
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
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  function handleAdd() {
    lightTap();
    const name = newName.trim();
    if (!name) return;
    if (!addPlayer(name)) {
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
    addPlayer(name);
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
      return;
    }
    cancelRename();
  }

  function confirmRemove() {
    lightTap();
    if (confirmIndex === null) return;
    if (!removePlayer(confirmIndex)) {
      return;
    }
    setConfirmIndex(null);
  }

  const confirmPlayer = confirmIndex !== null ? players[confirmIndex] : null;
  const isFull = players.length >= 10;

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
              <Pressable
                onPress={() => {
                  lightTap();
                  onClose();
                }}
                style={{ marginRight: device.scaleWidth(12) }}
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
              <Text variant="caption" letterSpacing={2} color="purple">
                {t('players.section')}
              </Text>
              <Box flex={1} />
              <Box
                borderRadius="md"
                paddingHorizontal={device.scaleWidth(10)}
                paddingVertical={4}
                style={{ backgroundColor: 'rgba(129,140,248,0.15)' }}
              >
                <Text variant="label" style={{ color: '#818CF8' }}>
                  {players.length} / 10
                </Text>
              </Box>
            </Box>

            {/* Add player input */}
            {!isFull && (
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
                    <AddPlayerIcon
                      width={device.scaleWidth(16)}
                      height={device.scaleHeight(16)}
                      color="white"
                    />
                  </Box>
                </Pressable>
              </Box>
            )}

            {!isFull && (
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
            )}

            {/* Player list */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={{ height: device.scaleHeight(4 * 54) }}
            >
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
                    <Box
                      width={device.scaleWidth(34)}
                      alignItems="center"
                      marginRight={device.scaleWidth(10)}
                    >
                      <Text
                        variant="caption"
                        color="textSecondary"
                        style={{ fontVariant: ['tabular-nums'] }}
                      >
                        {index + 1}
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
                        <Pressable
                          onPress={saveRename}
                          style={{ marginRight: 8 }}
                        >
                          <TickIcon
                            width={device.scaleWidth(16)}
                            height={device.scaleHeight(16)}
                            color="#34D399"
                          />
                        </Pressable>
                        <Pressable onPress={cancelRename}>
                          <CloseIcon
                            width={device.scaleWidth(16)}
                            height={device.scaleHeight(16)}
                            color="#EF4444"
                          />
                        </Pressable>
                      </Box>
                    ) : (
                      <Pressable
                        style={{ flex: 1 }}
                        onPress={() => startRename(index, player.name)}
                      >
                        <Text variant="bodyBold" color="white">
                          {player.name}
                        </Text>
                      </Pressable>
                    )}

                    {!editing && (
                      <>
                        <Pressable
                          onPress={() => startRename(index, player.name)}
                        >
                          <Box
                            width={device.scaleWidth(34)}
                            height={device.scaleHeight(34)}
                            borderRadius="circle"
                            justifyContent="center"
                            alignItems="center"
                            marginRight={device.scaleWidth(10)}
                            style={{
                              backgroundColor: 'rgba(129,140,248,0.15)',
                            }}
                          >
                            <EditIcon
                              width={device.scaleWidth(14)}
                              height={device.scaleHeight(14)}
                              color="#818CF8"
                            />
                          </Box>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            lightTap();
                            setConfirmIndex(index);
                          }}
                        >
                          <Box
                            width={device.scaleWidth(34)}
                            height={device.scaleHeight(34)}
                            borderRadius="circle"
                            justifyContent="center"
                            alignItems="center"
                            style={{ backgroundColor: 'rgba(239,68,68,0.15)' }}
                          >
                            <CloseIcon
                              width={device.scaleWidth(14)}
                              height={device.scaleHeight(14)}
                              color="#EF4444"
                            />
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
