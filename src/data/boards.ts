export type BoardTheme = {
  id: string;
  nameKey: string;
  color: string;
  bgStart: string;
  bgEnd: string;
  glow: string;
  borderC1: string;
  borderC2: string;
  ring: string;
  pointer: string;
};

export const BOARDS: BoardTheme[] = [
  {
    id: 'classic',
    nameKey: 'boards.classic',
    color: '#7C5CFF',
    bgStart: '#1E293B',
    bgEnd: '#0F172A',
    glow: '#818CF8',
    borderC1: '#818CF8',
    borderC2: '#C084FC',
    ring: '#334155',
    pointer: '#E2E8F0',
  },
  {
    id: 'sunset',
    nameKey: 'boards.sunset',
    color: '#FB923C',
    bgStart: '#33200F',
    bgEnd: '#1F1208',
    glow: '#FB923C',
    borderC1: '#FBBF24',
    borderC2: '#F472B6',
    ring: '#5A4020',
    pointer: '#FFE4CC',
  },
  {
    id: 'ocean',
    nameKey: 'boards.ocean',
    color: '#2FE0C6',
    bgStart: '#0F2B36',
    bgEnd: '#081B22',
    glow: '#2FE0C6',
    borderC1: '#2FE0C6',
    borderC2: '#38BDF8',
    ring: '#1E4A5A',
    pointer: '#D5F8F2',
  },
  {
    id: 'emerald',
    nameKey: 'boards.emerald',
    color: '#34D399',
    bgStart: '#12321F',
    bgEnd: '#0A1F12',
    glow: '#34D399',
    borderC1: '#34D399',
    borderC2: '#10B981',
    ring: '#1E5A3A',
    pointer: '#D6F5E5',
  },
  {
    id: 'rose',
    nameKey: 'boards.rose',
    color: '#F472B6',
    bgStart: '#33121E',
    bgEnd: '#200B13',
    glow: '#F472B6',
    borderC1: '#F472B6',
    borderC2: '#EC4899',
    ring: '#5A1E35',
    pointer: '#FFE0EE',
  },
  {
    id: 'gold',
    nameKey: 'boards.gold',
    color: '#FBBF24',
    bgStart: '#332412',
    bgEnd: '#1F150A',
    glow: '#FBBF24',
    borderC1: '#FBBF24',
    borderC2: '#F59E0B',
    ring: '#5A4420',
    pointer: '#FFEFCC',
  },
  {
    id: 'ice',
    nameKey: 'boards.ice',
    color: '#67E8F9',
    bgStart: '#12333A',
    bgEnd: '#0A1F24',
    glow: '#67E8F9',
    borderC1: '#67E8F9',
    borderC2: '#38BDF8',
    ring: '#1E4A55',
    pointer: '#E0FAFF',
  },
  {
    id: 'midnight',
    nameKey: 'boards.midnight',
    color: '#A78BFA',
    bgStart: '#1E1740',
    bgEnd: '#110C28',
    glow: '#A78BFA',
    borderC1: '#A78BFA',
    borderC2: '#7C5CFF',
    ring: '#382A5C',
    pointer: '#EAE4FF',
  },
];

export function getBoardById(id: string): BoardTheme {
  return BOARDS.find(board => board.id === id) ?? BOARDS[0];
}
