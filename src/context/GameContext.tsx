import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

import { truths } from '../data/truths';
import { dares } from '../data/dares';
import type { QuestionType, Question } from '../data/questionTypes';

export type Player = {
  name: string;
  color: string;
};

type GameType = 'truth' | 'dare' | null;

const COLORS = [
  '#FBBF24', '#34D399', '#F472B6', '#FB923C',
  '#A78BFA', '#67E8F9', '#F87171', '#4ADE80',
  '#E879F9', '#FACC15',
];

type Difficulty = 'mild' | 'medium' | 'wild';
type GameMode = 'standard' | 'physical';
type AgeGroup = 'kids' | 'teens' | 'adults';

type GameState = {
  players: Player[];
  selectedPlayerIndex: number;
  selectedType: GameType;
  currentQuestion: string;
  scores: Record<string, number>;
  spinning: boolean;
  rotation: number;
  soundEnabled: boolean;
  difficulty: Difficulty;
  gameMode: GameMode;
  ageGroup: AgeGroup;
  questionTypes: QuestionType[];
  turnTimer: number;
  round: number;
};

type GameContextType = GameState & {
  setPlayers: (players: Player[]) => void;
  spin: () => void;
  resolvePlayer: (finalRotation: number) => void;
  selectType: (type: 'truth' | 'dare') => void;
  completeDare: (nailed: boolean) => void;
  nextTurn: () => void;
  resetGame: () => void;
  endGame: () => void;
  setSpinning: (spinning: boolean) => void;
  setRotation: (rotation: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setGameMode: (mode: GameMode) => void;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  setQuestionTypes: (questionTypes: QuestionType[]) => void;
  setTurnTimer: (seconds: number) => void;
  addPlayer: (name: string) => boolean;
  removePlayer: (index: number) => boolean;
  renamePlayer: (index: number, newName: string) => boolean;
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildPool = (
  source: Question[],
  age: AgeGroup,
  cat: Difficulty,
  types: QuestionType[],
): Question[] => {
  const matchesAge = (q: Question) => q.ageGroup === age;
  const matchesTypes = (q: Question) => types.length === 0 || types.includes(q.type);
  let pool = source.filter(q => matchesAge(q) && matchesTypes(q) && q.category === cat);
  if (pool.length === 0) {
    pool = source.filter(q => matchesAge(q) && matchesTypes(q));
  }
  if (pool.length === 0) {
    pool = source.filter(q => matchesAge(q));
  }
  return shuffle(pool);
};

export type { Difficulty, GameMode, AgeGroup };

export function getRandomColor(index: number): string {
  return COLORS[index % COLORS.length];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<GameType>(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameMode, setGameMode] = useState<GameMode>('standard');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adults');
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [turnTimer, setTurnTimer] = useState<number>(0);
  const [truthDeck, setTruthDeck] = useState<Question[]>([]);
  const [dareDeck, setDareDeck] = useState<Question[]>([]);
  const [deckIndex, setDeckIndex] = useState({ truth: 0, dare: 0 });
  const [deckSignature, setDeckSignature] = useState('');
  const [round, setRound] = useState(1);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setSelectedType(null);
    setCurrentQuestion('');
    setRotation(prev => prev + 5 * 360 + Math.floor(Math.random() * 360));
  }, [spinning]);

  const resolvePlayer = useCallback(
    (finalRotation: number) => {
      const normalizedAngle = finalRotation % 360;
      const segmentSize = 360 / players.length;
      const index = Math.floor(normalizedAngle / segmentSize) % players.length;
      setSelectedPlayerIndex(index);
    },
    [players.length],
  );

  const selectType = useCallback(
    (type: 'truth' | 'dare') => {
      setSelectedType(type);
      if (gameMode === 'physical') {
        setCurrentQuestion(`Make up a ${type} for the group!`);
        return;
      }

      const signature = `${ageGroup}|${difficulty}|${[...questionTypes]
        .sort()
        .join(',')}`;
      const source = type === 'truth' ? truths : dares;

      let deck: Question[];
      let index: number;

      if (signature !== deckSignature) {
        const newTruthDeck = buildPool(truths, ageGroup, difficulty, questionTypes);
        const newDareDeck = buildPool(dares, ageGroup, difficulty, questionTypes);
        setTruthDeck(newTruthDeck);
        setDareDeck(newDareDeck);
        setDeckSignature(signature);
        deck = type === 'truth' ? newTruthDeck : newDareDeck;
        index = 0;
      } else {
        deck = type === 'truth' ? truthDeck : dareDeck;
        index = type === 'truth' ? deckIndex.truth : deckIndex.dare;
        if (deck.length === 0 || index >= deck.length) {
          const fresh = buildPool(source, ageGroup, difficulty, questionTypes);
          if (type === 'truth') {
            setTruthDeck(fresh);
          } else {
            setDareDeck(fresh);
          }
          deck = fresh;
          index = 0;
        }
      }

      setCurrentQuestion(deck[index]?.text ?? 'No questions available');
      setDeckIndex(prev =>
        type === 'truth'
          ? { ...prev, truth: index + 1 }
          : { ...prev, dare: index + 1 },
      );
      setRound(r => r + 1);
    },
    [
      gameMode,
      ageGroup,
      difficulty,
      questionTypes,
      deckSignature,
      truthDeck,
      dareDeck,
      deckIndex,
    ],
  );

  const nextTurn = useCallback(() => {
    setSelectedType(null);
    setCurrentQuestion('');
  }, []);

  const completeDare = useCallback((nailed: boolean) => {
    const playerName = players[selectedPlayerIndex]?.name;
    if (playerName) {
      setScores(prev => ({
        ...prev,
        [playerName]: (prev[playerName] || 0) + (nailed ? 1 : 0),
      }));
    }
    nextTurn();
  }, [players, selectedPlayerIndex, nextTurn]);

  const addPlayer = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    let success = false;
    setPlayers(prev => {
      if (prev.length >= 10) return prev;
      if (prev.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) return prev;
      success = true;
      return [...prev, { name: trimmed, color: getRandomColor(prev.length) }];
    });
    return success;
  }, []);

  const removePlayer = useCallback(
    (index: number) => {
      if (players.length <= 2) return false;
      const removed = players[index];
      if (!removed) return false;
      setPlayers(prev => prev.filter((_, i) => i !== index));
      setScores(prev => {
        const next = { ...prev };
        delete next[removed.name];
        return next;
      });
      setSelectedPlayerIndex(prev => {
        const max = players.length - 2;
        return prev > max ? max : prev;
      });
      return true;
    },
    [players],
  );

  const renamePlayer = useCallback(
    (index: number, newName: string) => {
      const trimmed = newName.trim();
      const target = players[index];
      if (!target || !trimmed) return false;
      if (players.some((p, i) => i !== index && p.name.toLowerCase() === trimmed.toLowerCase())) {
        return false;
      }
      const oldName = target.name;
      setPlayers(prev => prev.map((p, i) => (i === index ? { ...p, name: trimmed } : p)));
      setScores(prev => {
        const next = { ...prev };
        next[trimmed] = next[oldName] || 0;
        delete next[oldName];
        return next;
      });
      return true;
    },
    [players],
  );

  const resetGame = useCallback(() => {
    setSelectedPlayerIndex(0);
    setSelectedType(null);
    setCurrentQuestion('');
    setScores({});
    setRotation(0);
    setSoundEnabled(true);
    setDifficulty('medium');
    setGameMode('standard');
    setAgeGroup('adults');
    setQuestionTypes([]);
    setTurnTimer(0);
    setTruthDeck([]);
    setDareDeck([]);
    setDeckIndex({ truth: 0, dare: 0 });
    setDeckSignature('');
    setRound(1);
  }, []);

  const endGame = useCallback(() => {
    setSelectedPlayerIndex(0);
    setSelectedType(null);
    setCurrentQuestion('');
    setSpinning(false);
    setRotation(0);
    setRound(1);
  }, []);

  return (
    <GameContext.Provider
      value={{
        players,
        selectedPlayerIndex,
        selectedType,
        currentQuestion,
        scores,
        spinning,
        rotation,
        soundEnabled,
        difficulty,
        gameMode,
        ageGroup,
        questionTypes,
        turnTimer,
        round,
        setPlayers,
        spin,
        resolvePlayer,
        selectType,
        completeDare,
        nextTurn,
        resetGame,
        endGame,
        setSpinning,
        setRotation,
        setSoundEnabled,
        setDifficulty,
        setGameMode,
        setAgeGroup,
        setQuestionTypes,
        setTurnTimer,
        addPlayer,
        removePlayer,
        renamePlayer,
      }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
