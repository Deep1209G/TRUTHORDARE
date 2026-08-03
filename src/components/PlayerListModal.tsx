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
import { useGame } from '../context/GameContext';
import { lightTap } from '../services/HapticService';
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
      showError('Name already exists or max 10 players reached.');
      return;
    }
    setNewName('');
  }

  function handleQuickAdd() {
    lightTap();
    const used = new Set(players.map(p => p.name.toLowerCase()));
    const name =
      PRESET_NAMES.find(n => !used.has(n.toLowerCase())) ||
      `Player ${players.length + 1}`;
    if (!addPlayer(name)) {
      showError('Max 10 players reached.');
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
      showError('Name cannot be empty or already in use.');
      return;
    }
    cancelRename();
  }

  function confirmRemove() {
    lightTap();
    if (confirmIndex === null) return;
    if (!removePlayer(confirmIndex)) {
      showError('Minimum 2 players.');
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
            padding={20}
            maxHeight="82%"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            {/* Header */}
            <Box flexDirection="row" alignItems="center" marginBottom={16}>
              <Text fontSize={11} fontWeight="700" letterSpacing={2} color="purple">
                {'\u{1F465}'} PLAYERS
              </Text>
              <Box flex={1} />
              <Box
                borderRadius="md"
                paddingHorizontal={10}
                paddingVertical={4}
                marginRight={8}
                style={{ backgroundColor: 'rgba(129,140,248,0.15)' }}
              >
                <Text fontSize={12} fontWeight="700" style={{ color: '#818CF8' }}>
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
                  width={36}
                  height={36}
                  borderRadius="md"
                  backgroundColor="surface"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CloseIcon width={16} height={16} color="white" />
                </Box>
              </Pressable>
            </Box>

            {/* Add player input */}
            <Box
              flexDirection="row"
              alignItems="center"
              backgroundColor="surface"
              borderRadius="md"
              paddingHorizontal={14}
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
                  placeholder="Enter name..."
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  style={{
                    color: '#FFF',
                    fontSize: 14,
                    paddingVertical: 8,
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleAdd}
                />
              </Box>
              <Pressable onPress={handleAdd}>
                <Box
                  width={32}
                  height={32}
                  borderRadius="circle"
                  backgroundColor="purple"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AddPlayerIcon width={16} height={16} color="white" />
                </Box>
              </Pressable>
            </Box>

            <Pressable onPress={handleQuickAdd}>
              <Box
                height={38}
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
                <Text fontSize={12} fontWeight="600" style={{ color: '#818CF8' }}>
                  + Quick Add
                </Text>
              </Box>
            </Pressable>

            {errorMsg && (
              <Box
                borderRadius="md"
                paddingHorizontal={12}
                paddingVertical={8}
                marginBottom={12}
                style={{
                  backgroundColor: 'rgba(239,68,68,0.12)',
                  borderWidth: 1,
                  borderColor: 'rgba(239,68,68,0.3)',
                }}
              >
                <Text fontSize={12} fontWeight="600" style={{ color: '#EF4444' }}>
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
                    <Box width={34} alignItems="center" marginRight={10}>
                      <Text
                        fontSize={11}
                        fontWeight="700"
                        color="textSecondary"
                        style={{ fontVariant: ['tabular-nums'] }}
                      >
                        {index + 1}/{players.length}
                      </Text>
                    </Box>

                    <Box
                      width={36}
                      height={36}
                      borderRadius="circle"
                      justifyContent="center"
                      alignItems="center"
                      marginRight={12}
                      style={{
                        backgroundColor: player.color,
                        shadowColor: player.color,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.4,
                        shadowRadius: 6,
                        elevation: 4,
                      }}
                    >
                      <Text fontSize={14} fontWeight="700" color="bgDeep">
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
                        paddingHorizontal={10}
                        paddingVertical={2}
                      >
                        <TextInput
                          value={editingName}
                          onChangeText={setEditingName}
                          placeholder="Name..."
                          placeholderTextColor="rgba(255,255,255,0.3)"
                          style={{
                            color: '#FFF',
                            fontSize: 14,
                            paddingVertical: 6,
                            flex: 1,
                          }}
                          returnKeyType="done"
                          onSubmitEditing={saveRename}
                          autoFocus
                        />
                        <Pressable onPress={saveRename} style={{ marginRight: 8 }}>
                          <Text fontSize={15} fontWeight="700" style={{ color: '#34D399' }}>
                            {'\u2713'}
                          </Text>
                        </Pressable>
                        <Pressable onPress={cancelRename}>
                          <Text fontSize={14} fontWeight="700" style={{ color: '#EF4444' }}>
                            {'\u2715'}
                          </Text>
                        </Pressable>
                      </Box>
                    ) : (
                      <Box flex={1}>
                        <Text fontSize={15} fontWeight="600" color="white">
                          {player.name}
                        </Text>
                      </Box>
                    )}

                    {!editing && (
                      <>
                        <Pressable onPress={() => startRename(index, player.name)}>
                          <Box
                            width={30}
                            height={30}
                            borderRadius="circle"
                            justifyContent="center"
                            alignItems="center"
                            marginRight={10}
                            style={{ backgroundColor: 'rgba(129,140,248,0.15)' }}
                          >
                            <Text fontSize={13} style={{ color: '#818CF8' }}>
                              {'\u270E'}
                            </Text>
                          </Box>
                        </Pressable>
                        <Pressable onPress={() => { lightTap(); setConfirmIndex(index); }}>
                          <Box
                            width={30}
                            height={30}
                            borderRadius="circle"
                            justifyContent="center"
                            alignItems="center"
                            style={{ backgroundColor: 'rgba(239,68,68,0.15)' }}
                          >
                            <Text fontSize={14} fontWeight="600" style={{ color: '#EF4444' }}>
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
                padding={24}
                width="80%"
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <Text
                  fontSize={17}
                  fontWeight="700"
                  color="white"
                  textAlign="center"
                  marginBottom={6}
                >
                  Remove player?
                </Text>
                <Text
                  fontSize={13}
                  color="textSecondary"
                  textAlign="center"
                  marginBottom={20}
                >
                  Remove {confirmPlayer.name} from the game?
                </Text>

                <Pressable onPress={confirmRemove}>
                  <Box
                    height={50}
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
                    <Text fontSize={15} fontWeight="700" color="white" letterSpacing={1}>
                      REMOVE
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
                    height={50}
                    borderRadius="lg"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                  >
                    <Text fontSize={15} fontWeight="700" color="white">
                      CANCEL
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
