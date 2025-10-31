export type StatKey =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed'

export const STAT_META: Record<StatKey, { abbr: string; color: string }> = {
  hp: { abbr: 'HP', color: 'bg-red-500 text-white' },
  attack: { abbr: 'ATK', color: 'bg-orange-400 text-white' },
  defense: { abbr: 'DEF', color: 'bg-amber-400 text-white' },
  'special-attack': { abbr: 'SpA', color: 'bg-sky-400 text-white' },
  'special-defense': { abbr: 'SpD', color: 'bg-green-400 text-white' },
  speed: { abbr: 'SPD', color: 'bg-pink-400 text-white' },
}

export function getStatMeta(key: string): { abbr: string; color: string } {
  const meta = STAT_META[key as StatKey]
  return meta ?? { abbr: key.toUpperCase().slice(0, 3), color: 'bg-gray-400 text-white' }
}


