import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SplashScreen,
  MainMenuScreen,
  HostModeScreen,
  AgeSelectionScreen,
  DifficultySelectionScreen,
  QuestionTypeScreen,
  TurnTimerScreen,
  PlayerSetupScreen,
  GameScreen,
  TruthOrDareScreen,
  QuestionScreen,
  SettingsScreen,
  RulesScreen,
  SoundScreen,
  LanguageScreen,
  GameOverScreen,
} from '@src';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="HostMode" component={HostModeScreen} />
        <Stack.Screen name="TurnTimer" component={TurnTimerScreen} />
        <Stack.Screen name="AgeSelection" component={AgeSelectionScreen} />
        <Stack.Screen
          name="DifficultySelection"
          component={DifficultySelectionScreen}
        />
        <Stack.Screen name="QuestionType" component={QuestionTypeScreen} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetupScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="TruthOrDare" component={TruthOrDareScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
        <Stack.Screen name="Sound" component={SoundScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="GameOver" component={GameOverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
