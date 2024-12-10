type Ordering = number
type Ord<T> = (t1: T, t2: T) => Ordering

export function comparing<T, U>(proj: (b: U) => T, compare?: Ord<T>): Ord<U> {
  if (!compare) {
    compare = defaultCompare()
  }
  return (u1, u2) => compare(proj(u1), proj(u2))
}

export function defaultCompare<T>(): Ord<T> {
  return (t1, t2) => t1 < t2 ? -1 : t1 > t2 ? 1 : 0
}

export function combineOrdering<T>(o1: Ord<T>, o2: Ord<T>): Ord<T> {
  return (t1, t2) => {
    const r1 = o1(t1, t2);
    if (r1 === 0) {
      return o2(t1, t2);
    }
    return r1;
  }
}
