export type Bottle = {
  id: string;
  nameKey: string;
  image: number;
  color: string;
};

export const BOTTLES: Bottle[] = [
  {
    id: 'b1',
    nameKey: 'bottles.b1',
    image: require('../assets/bottle_stock/b1.png'),
    color: '#7C5CFF',
  },
  {
    id: 'b2',
    nameKey: 'bottles.b2',
    image: require('../assets/bottle_stock/b2.png'),
    color: '#38BDF8',
  },
  {
    id: 'b3',
    nameKey: 'bottles.b3',
    image: require('../assets/bottle_stock/b3.png'),
    color: '#A855F7',
  },
  {
    id: 'b4',
    nameKey: 'bottles.b4',
    image: require('../assets/bottle_stock/b4.png'),
    color: '#10B981',
  },
  {
    id: 'b5',
    nameKey: 'bottles.b5',
    image: require('../assets/bottle_stock/b5.png'),
    color: '#EC4899',
  },
  {
    id: 'b6',
    nameKey: 'bottles.b6',
    image: require('../assets/bottle_stock/b6.png'),
    color: '#F59E0B',
  },
  {
    id: 'b7',
    nameKey: 'bottles.b7',
    image: require('../assets/bottle_stock/b7.png'),
    color: '#EF4444',
  },
];

export function getBottleById(id: string): Bottle {
  return BOTTLES.find(bottle => bottle.id === id) ?? BOTTLES[0];
}
