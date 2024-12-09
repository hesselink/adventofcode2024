export type Multimap<K, V> = Map<K, V[]>

export function empty<K, V>(): Multimap<K, V> {
  return new Map();
}

export function add<K, V>(k: K, v: V, m: Multimap<K, V>): Multimap<K, V> {
  const existing = m.get(k) || [];
  m.set(k, [v, ...existing])
  return m
}

export function fromList<K, V>(l: [K, V][]): Multimap<K, V> {
  return l.reduce((m, [k, v, ..._]) => add(k, v, m), empty<K,V>())
}
