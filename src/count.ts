type Count<T> = {
  v: Map<T, number>;
  readonly __tag: unique symbol;
};

export function count<T>(xs: T[]): Count<T> {
  const c = empty<T>();
  xs.forEach((x) => incCount(x, c));
  return c;
}

function empty<T>(): Count<T> {
  return { v: new Map() } as Count<T>;
}

function incCount<T>(x: T, c: Count<T>): void {
  const m = c.v;
  const v = m.get(x) || 0;
  m.set(x, v + 1);
}

export function getCount<T>(x: T, c: Count<T>): number {
  return c.v.get(x) || 0;
}
