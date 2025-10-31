const map: Record<string, string> = {
  normal: 'bg-stone-400 text-white',
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  grass: 'bg-green-500 text-white',
  electric: 'bg-yellow-400 text-black',
  ice: 'bg-cyan-400 text-black',
  fighting: 'bg-orange-600 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-amber-600 text-white',
  flying: 'bg-indigo-400 text-white',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-600 text-white',
  rock: 'bg-yellow-700 text-white',
  ghost: 'bg-violet-700 text-white',
  dragon: 'bg-indigo-700 text-white',
  dark: 'bg-neutral-800 text-white',
  steel: 'bg-slate-500 text-white',
  fairy: 'bg-fuchsia-400 text-white',
}

export function getTypeClasses(type: string): string {
  return map[type] ?? 'bg-gray-300 text-black'
}


