/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import {
  Pressable,
  Alert,
  TextInput,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useGame, getRandomColor, Player } from '../context/GameContext';
import AddPlayerIcon from '../assets/icon/addplayer.svg';
import BackIcon from '../assets/icon/back.svg';

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

type Props = {
  navigation: any;
};

function getAvailablePresets(players: Player[]) {
  return PRESET_NAMES.filter(
    n => !players.some(p => p.name.toLowerCase() === n.toLowerCase()),
  );
}

export default function PlayerSetupScreen({ navigation }: Props) {
  const { setPlayers } = useGame();
  const [players, setLocalPlayers] = useState<Player[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [modalPlayers, setModalPlayers] = useState<Player[]>([]);

  function openModal() {
    setNewName('');
    setModalPlayers([]);
    setModalVisible(true);
  }

  function addPlayerToModal() {
    const name = newName.trim();
    if (!name) return;
    const allPlayers = [...players, ...modalPlayers];
    if (allPlayers.length >= 10) {
      Alert.alert('Max 10 players');
      return;
    }
    if (allPlayers.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      Alert.alert('Name already exists');
      return;
    }
    setModalPlayers(prev => [
      ...prev,
      { name, color: getRandomColor(allPlayers.length) },
    ]);
    setNewName('');
  }

  function quickAddToModal() {
    const allPlayers = [...players, ...modalPlayers];
    if (allPlayers.length >= 10) {
      Alert.alert('Max 10 players');
      return;
    }
    const available = getAvailablePresets(allPlayers);
    const name =
      available.length > 0 ? available[0] : `Player ${allPlayers.length + 1}`;
    setModalPlayers(prev => [
      ...prev,
      { name, color: getRandomColor(allPlayers.length) },
    ]);
  }

  function removeModalPlayer(index: number) {
    setModalPlayers(prev => prev.filter((_, i) => i !== index));
  }

  function doneModal() {
    setLocalPlayers(prev => [...prev, ...modalPlayers]);
    setModalVisible(false);
  }

  function removePlayer(index: number) {
    if (players.length <= 2) {
      Alert.alert('Minimum 2 players');
      return;
    }
    setLocalPlayers(players.filter((_, i) => i !== index));
  }

  function startGame() {
    if (players.length < 2) {
      Alert.alert('Need at least 2 players');
      return;
    }
    setPlayers(players);
    navigation.navigate('Home');
  }

  function renderItem({ item, index }: { item: Player; index: number }) {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        backgroundColor="surface"
        paddingHorizontal={16}
        paddingVertical={14}
        marginBottom={16}
        style={{ borderRadius: 20 }}
      >
        {/* Avatar */}
        <Box
          width={44}
          height={44}
          borderRadius="circle"
          justifyContent="center"
          alignItems="center"
          marginRight={14}
          style={{ backgroundColor: item.color }}
        >
          <Text fontSize={18} fontWeight="700" color="bgDeep">
            {item.name[0]}
          </Text>
        </Box>

        {/* Name */}
        <Box flex={1} alignItems="center">
          <Text fontSize={16} fontWeight="600" color="white">
            {item.name}
          </Text>
        </Box>

        {/* Remove */}
        <Pressable onPress={() => removePlayer(index)}>
          <Box
            width={28}
            height={28}
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
      </Box>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120826' }}>
      <Box flex={1} backgroundColor="background">
        {/* Header */}
        <Box paddingHorizontal={24} paddingTop={16}>
          <Box flexDirection="row" alignItems="center">
            <Box width={42}>
              <Pressable onPress={() => navigation.goBack()}>
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
                Add Players{' '}
              </Text>
            </Box>
            <Box width={42} />
          </Box>
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          paddingHorizontal={24}
          paddingTop={8}
        >
          <Box flex={1}>
            <Text fontSize={22} fontWeight="700" color="white">
              Players
            </Text>
            <Text fontSize={13} color="textSecondary" marginTop={2}>
              Add at least 2 players
            </Text>
          </Box>
          <Pressable onPress={openModal}>
            <Box
              width={48}
              height={48}
              borderRadius="circle"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: '#818CF8',
                shadowColor: '#818CF8',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <AddPlayerIcon width={25} height={25} color="white" />
            </Box>
          </Pressable>
        </Box>

        {/* Player list or empty state */}
        <Box flex={1} paddingHorizontal={24} paddingTop={24}>
          {players.length === 0 ? (
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              paddingBottom={60}
            >
              <Text fontSize={14} color="textSecondary">
                No players added yet
              </Text>
              <Text
                fontSize={12}
                color="textSecondary"
                marginTop={4}
                opacity={0.6}
              >
                Tap + to add players
              </Text>
            </Box>
          ) : (
            <FlatList
              data={players}
              keyExtractor={(item, i) => `${item.name}-${i}`}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </Box>

        {/* Bottom section */}
        <Box paddingHorizontal={24} paddingBottom={32}>
          {/* Start button */}
          <Pressable onPress={startGame}>
            <Box
              height={58}
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: players.length >= 2 ? '#818CF8' : '#334155',
                shadowColor: '#818CF8',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: players.length >= 2 ? 0.4 : 0,
                shadowRadius: 12,
                elevation: players.length >= 2 ? 8 : 0,
                borderRadius: 16,
              }}
            >
              <Text
                fontSize={18}
                fontWeight="700"
                letterSpacing={1}
                style={{ color: players.length >= 2 ? '#FFF' : '#64748B' }}
              >
                START GAME
              </Text>
            </Box>
          </Pressable>

          <Text
            fontSize={12}
            color="textSecondary"
            textAlign="center"
            marginTop={14}
          >
            {players.length} / 10 players
          </Text>
        </Box>

        {/* Add Player Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
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
                padding={24}
                maxHeight="80%"
              >
                {/* Title */}
                <Text
                  fontSize={20}
                  fontWeight="700"
                  color="white"
                  textAlign="center"
                  marginBottom={20}
                >
                  Add Players
                </Text>

                {/* Input row */}
                <Box
                  flexDirection="row"
                  alignItems="center"
                  backgroundColor="surface"
                  borderRadius="md"
                  paddingHorizontal={14}
                  paddingVertical={4}
                  marginBottom={12}
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
                        fontSize: 15,
                        paddingVertical: 8,
                      }}
                      returnKeyType="done"
                      onSubmitEditing={addPlayerToModal}
                    />
                  </Box>
                  <Pressable onPress={addPlayerToModal}>
                    <Box
                      width={34}
                      height={34}
                      borderRadius="circle"
                      backgroundColor="purple"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <AddPlayerIcon width={18} height={18} color="white" />
                    </Box>
                  </Pressable>
                </Box>

                {/* Quick Add */}
                <Pressable onPress={quickAddToModal}>
                  <Box
                    height={42}
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
                    <Text
                      fontSize={13}
                      fontWeight="600"
                      style={{ color: '#818CF8' }}
                    >
                      + Quick Add
                    </Text>
                  </Box>
                </Pressable>

                {/* Preview list */}
                {modalPlayers.length > 0 && (
                  <Box marginBottom={16}>
                    <Text
                      fontSize={11}
                      fontWeight="700"
                      color="textSecondary"
                      letterSpacing={1}
                      marginBottom={8}
                    >
                      ADDED ({modalPlayers.length})
                    </Text>
                    {modalPlayers.map((p, i) => (
                      <Box
                        key={`${p.name}-${i}`}
                        flexDirection="row"
                        alignItems="center"
                        paddingVertical={6}
                      >
                        <Box
                          width={28}
                          height={28}
                          borderRadius="circle"
                          justifyContent="center"
                          alignItems="center"
                          marginRight={10}
                          style={{ backgroundColor: p.color }}
                        >
                          <Text fontSize={12} fontWeight="700" color="bgDeep">
                            {p.name[0]}
                          </Text>
                        </Box>
                        <Box flex={1}>
                          <Text fontSize={14} fontWeight="500" color="white">
                            {p.name}
                          </Text>
                        </Box>
                        <Pressable onPress={() => removeModalPlayer(i)}>
                          <Text fontSize={14} style={{ color: '#EF4444' }}>
                            x
                          </Text>
                        </Pressable>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Done button */}
                <Pressable onPress={doneModal}>
                  <Box
                    height={50}
                    borderRadius="lg"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      backgroundColor:
                        modalPlayers.length > 0 ? '#818CF8' : '#334155',
                      borderRadius: 14,
                    }}
                  >
                    <Text
                      fontSize={16}
                      fontWeight="700"
                      letterSpacing={1}
                      style={{
                        color: modalPlayers.length > 0 ? '#FFF' : '#64748B',
                      }}
                    >
                      DONE ({modalPlayers.length})
                    </Text>
                  </Box>
                </Pressable>
              </Box>
            </Box>
          </KeyboardAvoidingView>
        </Modal>
      </Box>
    </SafeAreaView>
  );
}
