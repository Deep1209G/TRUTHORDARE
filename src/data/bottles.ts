export type Bottle = {
  id: string;
  nameKey: string;
  image: number;
  color: string;
};

export const BOTTLES: Bottle[] = [
  {
    id: 'b1',
    nameKey: 'Green',
    image: require('../assets/bottle_stock/b1.png'),
    color: '#7C5CFF',
  },
  {
    id: 'b2',
    nameKey: 'Chambedin',
    image: require('../assets/bottle_stock/b2.png'),
    color: '#38BDF8',
  },
  {
    id: 'b3',
    nameKey: 'Red',
    image: require('../assets/bottle_stock/b3.png'),
    color: '#A855F7',
  },
  {
    id: 'b4',
    nameKey: 'Jaquart',
    image: require('../assets/bottle_stock/b4.png'),
    color: '#10B981',
  },
  {
    id: 'b5',
    nameKey: 'Bibs',
    image: require('../assets/bottle_stock/b5.png'),
    color: '#EC4899',
  },
  {
    id: 'b6',
    nameKey: 'Tank',
    image: require('../assets/bottle_stock/b6.png'),
    color: '#F59E0B',
  },
  {
    id: 'b7',
    nameKey: 'Coca',
    image: require('../assets/bottle_stock/b7.png'),
    color: '#EF4444',
  },
  {
    id: 'b8',
    nameKey: 'Black',
    image: require('../assets/bottle_stock/b8.png'),
    color: '#22D3EE',
  },
  {
    id: 'b9',
    nameKey: 'Brown',
    image: require('../assets/bottle_stock/b9.png'),
    color: '#84CC16',
  },
  {
    id: 'b10',
    nameKey: 'Martin',
    image: require('../assets/bottle_stock/b10.png'),
    color: '#F97316',
  },
  {
    id: 'b11',
    nameKey: 'Squad',
    image: require('../assets/bottle_stock/b11.png'),
    color: '#8B5CF6',
  },
  {
    id: 'b12',
    nameKey: 'Tito',
    image: require('../assets/bottle_stock/b12.png'),
    color: '#14B8A6',
  },
  {
    id: 'b13',
    nameKey: 'Transparent',
    image: require('../assets/bottle_stock/b13.png'),
    color: '#E11D48',
  },

  {
    id: 'b15',
    nameKey: 'Green',
    image: require('../assets/bottle_stock/b15.png'),
    color: '#D946EF',
  },
];

export function getBottleById(id: string): Bottle {
  return BOTTLES.find(bottle => bottle.id === id) ?? BOTTLES[0];
}
