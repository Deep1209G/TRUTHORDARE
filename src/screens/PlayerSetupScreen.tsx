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
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Text } from '@src';
import { useTranslation } from 'react-i18next';
import { useGame, getNextColor, Player } from '../context/GameContext';
import { useDeviceHelper } from '../hooks/useDeviceHelper';

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
  const { t } = useTranslation();
  const device = useDeviceHelper();

  const [players, setLocalPlayers] = useState<Player[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [modalPlayers, setModalPlayers] = useState<Player[]>([]);
  const isModalFull = players.length + modalPlayers.length >= 10;

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
      Alert.alert(t('players.maxAlert'));
      return;
    }

    if (allPlayers.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      Alert.alert(t('players.existsAlert'));
      return;
    }

    setModalPlayers(prev => [
      ...prev,
      {
        name,
        color: getNextColor(allPlayers),
      },
    ]);

    setNewName('');
  }

  function quickAddToModal() {
    const allPlayers = [...players, ...modalPlayers];

    if (allPlayers.length >= 10) {
      Alert.alert(t('players.maxAlert'));
      return;
    }

    const available = getAvailablePresets(allPlayers);

    const name =
      available.length > 0
        ? available[0]
        : t('players.playerFallback', { number: allPlayers.length + 1 });

    setModalPlayers(prev => [
      ...prev,
      {
        name,
        color: getNextColor(allPlayers),
      },
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
      Alert.alert(t('players.minAlert'));
      return;
    }

    setLocalPlayers(players.filter((_, i) => i !== index));
  }

  function startGame() {
    if (players.length < 2) {
      Alert.alert(t('players.needMinAlert'));
      return;
    }

    setPlayers(players);
    navigation.navigate('Game');
  }

  function renderItem({ item, index }: { item: Player; index: number }) {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        backgroundColor="surface"
        paddingHorizontal={device.scaleWidth(16)}
        paddingVertical={device.scaleHeight(14)}
        marginBottom={device.scaleHeight(16)}
        style={{ borderRadius: 20 }}
      >
        <Box
          width={device.scaleWidth(44)}
          height={device.scaleHeight(44)}
          borderRadius="circle"
          justifyContent="center"
          alignItems="center"
          marginRight={device.scaleWidth(14)}
          style={{
            backgroundColor: item.color,
          }}
        >
          <Text variant="heading" color="bgDeep">
            {item.name[0]}
          </Text>
        </Box>

        <Box flex={1} alignItems="center">
          <Text variant="bodyBold" color="white">
            {item.name}
          </Text>
        </Box>

        <Pressable onPress={() => removePlayer(index)}>
          <Box
            width={device.scaleWidth(28)}
            height={device.scaleHeight(28)}
            borderRadius="circle"
            justifyContent="center"
            alignItems="center"
            style={{
              backgroundColor: 'rgba(239,68,68,0.15)',
            }}
          >
            <Text
              style={{
                color: '#EF4444',
              }}
            >
              x
            </Text>
          </Box>
        </Pressable>
      </Box>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#120826',
      }}
    >
      <Box flex={1} backgroundColor="background">
        {/* Header */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(16)}>
          <Box flexDirection="row" alignItems="center">
            <Box width={device.scaleWidth(42)}>
              <Pressable onPress={() => navigation.goBack()}>
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
                {t('players.title')}
              </Text>
            </Box>

            <Box width={device.scaleWidth(42)} />
          </Box>
        </Box>
        {/* Player header */}
        <Box
          flexDirection="row"
          alignItems="center"
          paddingHorizontal={device.scaleWidth(24)}
          paddingTop={8}
        >
          <Box flex={1}>
            <Text variant="title" color="white">
              {t('players.section')}
            </Text>

            <Text variant="note" color="textSecondary" marginTop={2}>
              {t('players.minNote')}
            </Text>
          </Box>

          <Pressable onPress={openModal}>
            <Box
              width={device.scaleWidth(48)}
              height={device.scaleHeight(48)}
              borderRadius="circle"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: '#818CF8',
                shadowColor: '#818CF8',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <AddPlayerIcon
                width={device.scaleWidth(25)}
                height={device.scaleHeight(25)}
                color="white"
              />
            </Box>
          </Pressable>
        </Box>

        {/* Player list */}
        <Box flex={1} paddingHorizontal={device.scaleWidth(24)} paddingTop={device.scaleHeight(24)}>
          {players.length === 0 ? (
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              paddingBottom={device.scaleHeight(60)}
            >
              <Text color="textSecondary">
                {t('players.emptyTitle')}
              </Text>

              <Text
                variant="label"
                color="textSecondary"
                marginTop={4}
                opacity={0.6}
              >
                {t('players.emptyHint')}
              </Text>
            </Box>
          ) : (
            <FlatList
              data={players}
              keyExtractor={(item, i) => `${item.name}-${i}`}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingBottom: device.scaleHeight(20),
              }}
            />
          )}
        </Box>

        {/* Bottom */}
        <Box paddingHorizontal={device.scaleWidth(24)} paddingBottom={device.scaleHeight(32)}>
          <Pressable onPress={startGame}>
            <Box
              height={device.scaleHeight(58)}
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: players.length >= 2 ? '#818CF8' : '#334155',
                shadowColor: '#818CF8',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: players.length >= 2 ? 0.4 : 0,
                shadowRadius: 12,
                elevation: players.length >= 2 ? 8 : 0,
                borderRadius: 16,
              }}
            >
              <Text
                variant="heading"
                letterSpacing={1}
                style={{
                  color: players.length >= 2 ? '#FFF' : '#64748B',
                }}
              >
                {t('players.startGame')}
              </Text>
            </Box>
          </Pressable>

          <Text
            variant="label"
            color="textSecondary"
            textAlign="center"
            marginTop={device.scaleHeight(14)}
          >
            {t('players.count', { count: players.length })}
          </Text>
        </Box>

        {/* Add Player Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{
              flex: 1,
            }}
          >
            <Box
              flex={1}
              style={{
                backgroundColor: 'rgba(12,4,24,0.88)',
              }}
              justifyContent="center"
              paddingHorizontal={device.scaleWidth(20)}
            >
              <Box
                backgroundColor="bgDeep"
                borderRadius="xl"
                padding={device.scaleWidth(24)}
                maxHeight="80%"
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <Text
                    variant="title"
                    color="white"
                    textAlign="center"
                    marginBottom={device.scaleHeight(20)}
                  >
                    {t('players.title')}
                  </Text>

                  {/* Input */}
                  {!isModalFull && (
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      backgroundColor="surface"
                      borderRadius="md"
                      paddingHorizontal={device.scaleWidth(14)}
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
                          placeholder={t('common.enterName')}
                          placeholderTextColor="rgba(255,255,255,0.3)"
                          style={{
                            color: '#FFF',
                            fontSize: device.scaleWidth(15),
                            paddingVertical: 8,
                          }}
                          returnKeyType="done"
                          onSubmitEditing={addPlayerToModal}
                        />
                      </Box>

                      <Pressable onPress={addPlayerToModal}>
                        <Box
                          width={device.scaleWidth(34)}
                          height={device.scaleHeight(34)}
                          borderRadius="circle"
                          backgroundColor="purple"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <AddPlayerIcon
                            width={device.scaleWidth(18)}
                            height={device.scaleHeight(18)}
                            color="white"
                          />
                        </Box>
                      </Pressable>
                    </Box>
                  )}

                  {/* Quick add */}
                  {!isModalFull && (
                    <Pressable onPress={quickAddToModal}>
                      <Box
                        height={device.scaleHeight(42)}
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
                          variant="micro"
                          style={{
                            color: '#818CF8',
                          }}
                        >
                          {t('common.quickAdd')}
                        </Text>
                      </Box>
                    </Pressable>
                  )}

                  {/* Preview */}
                  {modalPlayers.length > 0 && (
                    <Box marginBottom={16}>
                      <Text
                        variant="caption"
                        color="textSecondary"
                        letterSpacing={1}
                        marginBottom={8}
                      >
                        {t('players.added', { count: modalPlayers.length })}
                      </Text>

                      {modalPlayers.map((p, i) => (
                        <Box
                          key={`${p.name}-${i}`}
                          flexDirection="row"
                          alignItems="center"
                          paddingVertical={6}
                        >
                          <Box
                            width={device.scaleWidth(28)}
                            height={device.scaleHeight(28)}
                            borderRadius="circle"
                            justifyContent="center"
                            alignItems="center"
                            marginRight={device.scaleWidth(10)}
                            style={{
                              backgroundColor: p.color,
                            }}
                          >
                            <Text variant="label" color="bgDeep">
                              {p.name[0]}
                            </Text>
                          </Box>

                          <Box flex={1}>
                            <Text color="white">
                              {p.name}
                            </Text>
                          </Box>

                          <Pressable onPress={() => removeModalPlayer(i)}>
                            <Text
                              style={{
                                color: '#EF4444',
                              }}
                            >
                              x
                            </Text>
                          </Pressable>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Done */}
                  <Pressable onPress={doneModal}>
                    <Box
                      height={device.scaleHeight(50)}
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
                        variant="bodyBold"
                        letterSpacing={1}
                        style={{
                          color: modalPlayers.length > 0 ? '#FFF' : '#64748B',
                        }}
                      >
                        {t('players.done', { count: modalPlayers.length })}
                      </Text>
                    </Box>
                  </Pressable>
                </ScrollView>
              </Box>
            </Box>
          </KeyboardAvoidingView>
        </Modal>
      </Box>
    </SafeAreaView>
  );
}
