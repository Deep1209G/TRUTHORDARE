import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from 'react';

import { truths } from '../data/truths';
import { dares } from '../data/dares';
import type { QuestionType, Question } from '../data/questionTypes';
import { getBottleById, BOTTLES } from '../data/bottles';
import type { Bottle } from '../data/bottles';
import { getBoardById, BOARDS } from '../data/boards';
import type { BoardTheme } from '../data/boards';
import { isGeminiConfigured } from '../config/gemini';
import { generateQuestions } from '../services/GeminiService';

export type Player = {
  name: string;
  color: string;
};

type GameType = 'truth' | 'dare' | null;

const COLORS = [
  '#FBBF24',
  '#34D399',
  '#F472B6',
  '#FB923C',
  '#A78BFA',
  '#67E8F9',
  '#F87171',
  '#4ADE80',
  '#E879F9',
  '#FACC15',
];

const AI_BATCH_SIZE = 10;
const AI_REFILL_THRESHOLD = 3;

type Difficulty = 'mild' | 'medium' | 'wild';
type GameMode = 'standard' | 'physical';
type AgeGroup = 'kids' | 'teens' | 'adults' | 'family' | 'couple';

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
  lastPlayerIndex: number;
  selectedBottle: Bottle;
  selectedBoard: BoardTheme;
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
  prepareAiDecks: (types: QuestionType[]) => Promise<void>;
  setSpinning: (spinning: boolean) => void;
  setRotation: (rotation: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setGameMode: (mode: GameMode) => void;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  setQuestionTypes: (questionTypes: QuestionType[]) => void;
  setTurnTimer: (seconds: number) => void;
  setSelectedBottleId: (id: string) => void;
  setSelectedBoardId: (id: string) => void;
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
  const matchesTypes = (q: Question) =>
    types.length === 0 || types.includes(q.type);
  let pool = source.filter(
    q => matchesAge(q) && matchesTypes(q) && q.category === cat,
  );
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

export function getNextColor(players: { color: string }[]): string {
  const used = new Set(players.map(p => p.color));
  return COLORS.find(c => !used.has(c)) ?? getRandomColor(players.length);
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
  const [difficulty, setDifficulty] = useState<Difficulty>('mild');
  const [gameMode, setGameMode] = useState<GameMode>('standard');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adults');
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [turnTimer, setTurnTimer] = useState<number>(0);
  const [truthDeck, setTruthDeck] = useState<Question[]>([]);
  const [dareDeck, setDareDeck] = useState<Question[]>([]);
  const [deckIndex, setDeckIndex] = useState({ truth: 0, dare: 0 });
  const [deckSignature, setDeckSignature] = useState('');
  const [aiDecks, setAiDecks] = useState<{
    truth: Question[];
    dare: Question[];
  }>({
    truth: [],
    dare: [],
  });
  const [aiUsed, setAiUsed] = useState<string[]>([]);
  const [aiSignature, setAiSignature] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const aiCallsRef = useRef(0);
  const [lastPlayerIndex, setLastPlayerIndex] = useState(-1);
  const [round, setRound] = useState(1);
  const [selectedBottleId, setSelectedBottleIdState] = useState<string>('b1');
  const [selectedBoardId, setSelectedBoardIdState] = useState<string>('classic');

  const selectedBottle = getBottleById(selectedBottleId);
  const selectedBoard = getBoardById(selectedBoardId);

  const setSelectedBottleId = useCallback((id: string) => {
    if (BOTTLES.some(bottle => bottle.id === id)) {
      setSelectedBottleIdState(id);
    }
  }, []);

  const setSelectedBoardId = useCallback((id: string) => {
    if (BOARDS.some(board => board.id === id)) {
      setSelectedBoardIdState(id);
    }
  }, []);

  const spin = useCallback(() => {
    if (spinning) return;

    setSpinning(true);
    setSelectedType(null);
    setCurrentQuestion('');

    const segmentSize = 360 / players.length;

    // Each player gets a turn in order (round-robin)
    const randomIndex = (lastPlayerIndex + 1) % players.length;

    // Aim for the middle of that player's segment
    const targetAngle = randomIndex * segmentSize + segmentSize / 2;

    setRotation(prev => prev - (prev % 360) + 5 * 360 + targetAngle);
  }, [spinning, players, lastPlayerIndex]);

  const resolvePlayer = useCallback(
    (finalRotation: number) => {
      const normalizedAngle = finalRotation % 360;
      const segmentSize = 360 / players.length;
      const index = Math.floor(normalizedAngle / segmentSize) % players.length;
      setLastPlayerIndex(index);
      setSelectedPlayerIndex(index);
    },
    [players.length],
  );

  const serveStatic = useCallback(
    (type: 'truth' | 'dare') => {
      const signature = `${ageGroup}|${difficulty}|${[...questionTypes]
        .sort()
        .join(',')}`;
      const source = type === 'truth' ? truths : dares;

      let deck: Question[];
      let index: number;

      if (signature !== deckSignature) {
        const newTruthDeck = buildPool(
          truths,
          ageGroup,
          difficulty,
          questionTypes,
        );
        const newDareDeck = buildPool(
          dares,
          ageGroup,
          difficulty,
          questionTypes,
        );
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
      ageGroup,
      difficulty,
      questionTypes,
      deckSignature,
      truthDeck,
      dareDeck,
      deckIndex,
    ],
  );

  const generateAiDeck = useCallback(
    async (
      type: 'truth' | 'dare',
      used: string[],
      types: QuestionType[] = questionTypes,
    ) => {
      aiCallsRef.current += 1;
      setAiGenerating(true);
      try {
        const generated = await generateQuestions({
          kind: type,
          ageGroup,
          difficulty,
          questionTypes: types,
          count: AI_BATCH_SIZE,
          exclude: used,
        });

        if (generated.length > 0) {
          setAiDecks(prev => ({ ...prev, [type]: generated }));
          setAiUsed(prev => [...prev, ...generated.map(q => q.text)]);
        }
      } finally {
        aiCallsRef.current -= 1;
        if (aiCallsRef.current === 0) setAiGenerating(false);
      }
    },
    [ageGroup, difficulty, questionTypes],
  );

  const prepareAiDecks = useCallback(
    async (types: QuestionType[]) => {
      if (!isGeminiConfigured()) return;
      const signature = `${ageGroup}|${difficulty}|${[...types]
        .sort()
        .join(',')}`;
      setAiSignature(signature);
      await Promise.allSettled([
        generateAiDeck('truth', [], types),
        generateAiDeck('dare', [], types),
      ]);
    },
    [ageGroup, difficulty, generateAiDeck],
  );

  const selectType = useCallback(
    (type: 'truth' | 'dare') => {
      setSelectedType(type);
      setCurrentQuestion('');

      if (gameMode === 'physical') {
        setCurrentQuestion(`Make up a ${type} for the group!`);
        setRound(r => r + 1);
        return;
      }

      if (isGeminiConfigured()) {
        const signature = `${ageGroup}|${difficulty}|${[...questionTypes]
          .sort()
          .join(',')}`;
        const fresh = aiSignature === signature;
        const deck = type === 'truth' ? aiDecks.truth : aiDecks.dare;
        if (fresh && deck.length > 0) {
          const [next, ...rest] = deck;
          setAiDecks(prev => ({ ...prev, [type]: rest }));
          setAiUsed(prev => [...prev, next.text]);
          setCurrentQuestion(next.text);
          setRound(r => r + 1);
          if (rest.length < AI_REFILL_THRESHOLD) {
            generateAiDeck(type, [...aiUsed, next.text]);
          }
          return;
        }
        if (!fresh) {
          setAiDecks({ truth: [], dare: [] });
          setAiSignature('');
        }
        if (!aiGenerating) {
          prepareAiDecks(questionTypes);
        }
      }

      serveStatic(type);
    },
    [
      gameMode,
      ageGroup,
      difficulty,
      questionTypes,
      aiSignature,
      aiDecks,
      aiUsed,
      aiGenerating,
      generateAiDeck,
      prepareAiDecks,
      serveStatic,
    ],
  );

  const nextTurn = useCallback(() => {
    setSelectedType(null);
    setCurrentQuestion('');
  }, []);

  const completeDare = useCallback(
    (nailed: boolean) => {
      const playerName = players[selectedPlayerIndex]?.name;
      if (playerName) {
        setScores(prev => ({
          ...prev,
          [playerName]: (prev[playerName] || 0) + (nailed ? 1 : 0),
        }));
      }
      nextTurn();
    },
    [players, selectedPlayerIndex, nextTurn],
  );

  const addPlayer = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    let success = false;
    setPlayers(prev => {
      if (prev.length >= 10) return prev;
      if (prev.some(p => p.name.toLowerCase() === trimmed.toLowerCase()))
        return prev;
      success = true;
      return [
        ...prev,
        { name: trimmed, color: getNextColor(prev) },
      ];
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
      if (
        players.some(
          (p, i) =>
            i !== index && p.name.toLowerCase() === trimmed.toLowerCase(),
        )
      ) {
        return false;
      }
      const oldName = target.name;
      setPlayers(prev =>
        prev.map((p, i) => (i === index ? { ...p, name: trimmed } : p)),
      );
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
    setLastPlayerIndex(-1);
    setSelectedType(null);
    setCurrentQuestion('');
    setScores({});
    setRotation(0);
    setSoundEnabled(true);
    setDifficulty('mild');
    setGameMode('standard');
    setAgeGroup('adults');
    setQuestionTypes([]);
    setTurnTimer(0);
    setTruthDeck([]);
    setDareDeck([]);
    setDeckIndex({ truth: 0, dare: 0 });
    setDeckSignature('');
    setAiDecks({ truth: [], dare: [] });
    setAiUsed([]);
    setAiSignature('');
    aiCallsRef.current = 0;
    setAiGenerating(false);
    setSelectedBottleId('b1');
    setSelectedBoardId('classic');
    setRound(1);
  }, [setSelectedBottleId, setSelectedBoardId]);

  const endGame = useCallback(() => {
    setSelectedPlayerIndex(0);
    setLastPlayerIndex(-1);
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
        lastPlayerIndex,
        selectedBottle,
        selectedBoard,
        setPlayers,
        spin,
        resolvePlayer,
        selectType,
        completeDare,
        nextTurn,
        resetGame,
        endGame,
        prepareAiDecks,
        setSpinning,
        setRotation,
        setSoundEnabled,
        setDifficulty,
        setGameMode,
        setAgeGroup,
        setQuestionTypes,
        setTurnTimer,
        setSelectedBottleId,
        setSelectedBoardId,
        addPlayer,
        removePlayer,
        renamePlayer,
      }}
    >
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
