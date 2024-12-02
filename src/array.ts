export function unzip<T, U>(xs: [T, U][]): [T[], U[]] {
  const ys: T[] = [];
  const zs: U[] = [];
  xs.forEach((x) => {
    ys.push(x[0]);
    zs.push(x[1]);
  });
  return [ys, zs];
}

export function zipWith<T, U, V>(f: (t: T, u: U) => V, ts: T[], us: U[]): V[] {
  const minLen = Math.min(ts.length, us.length);
  const vs = [];
  for (let i = 0; i < minLen; i++) {
    vs.push(f(ts[i], us[i]));
  }
  return vs;
}

export function sort<T>(
  xs: T[],
  compareFn?: ((a: T, b: T) => number) | undefined
): T[] {
  const copy = xs.slice();
  copy.sort(compareFn);
  return copy;
}

export function sum(xs: number[]): number {
  return xs.reduce((x, y) => x + y, 0);
}

export function tail<T>(xs: T[]): T[] | undefined {
  if (xs.length === 0) {
    return undefined;
  }
  const copy = xs.slice();
  copy.shift();
  return copy;
}
export function deleteAt<T>(n: number, xs: T[]): T[] {
  if (n < 0 || n >= xs.length) {
    return xs;
  }
  const res = xs.slice();
  res.splice(n, 1);
  return res;
}
