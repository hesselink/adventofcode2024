import { readFile } from "fs/promises"

async function day1() {
  const f = await readFile("input/1")
  const str = f.toString()
  const ls = str.split(/\r?\n/)
  const ns: [number, number][] = ls.map(l => l.split(/ +/).map(s => +s)).map(ns => [ns[0], ns[1]])
  const [xs, ys] = unzip(ns)
  const sortedXs = sort(xs)
  const sortedYs = sort(ys)
  const diffs = zipWith((x, y) => Math.abs(x - y), sortedXs, sortedYs)
  return sum(diffs)
}

function unzip<T, U>(xs: [T, U][]): [T[], U[]] {
  const ys: T[] = []
  const zs: U[] = []
  xs.forEach(x => {
    ys.push(x[0])
    zs.push(x[1])
  })
  return [ys, zs]
}

function zipWith<T, U, V>(f: (t: T, u: U) => V, ts: T[], us: U[]): V[] {
  const minLen = Math.min(ts.length, us.length)
  const vs = []
  for (let i = 0; i < minLen; i++) {
    vs.push(f(ts[i], us[i]))
  }
  return vs
}

function sort<T>(xs: T[], compareFn?: ((a: T, b: T) => number) | undefined): T[] {
  const copy = xs.slice()
  copy.sort(compareFn)
  return copy
}

function sum(xs: number[]): number {
  return xs.reduce((x, y) => x + y, 0)
}

day1().then(x => console.log(x))
