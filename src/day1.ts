import { readFile } from "fs/promises";
import { zipWith, unzip, sum, sort } from "./array";

async function readInput(): Promise<[number[], number[]]> {
  const f = await readFile("input/1");
  const str = f.toString();
  const ls = str.split(/\r?\n/);
  const ns: [number, number][] = ls
    .map((l) => l.split(/ +/).map((s) => +s))
    .map((ns) => [ns[0], ns[1]]);
  const [xs, ys] = unzip(ns);
  return [sort(xs), sort(ys)];
}
export async function part1() {
  const [sortedXs, sortedYs] = await readInput();
  const diffs = zipWith((x, y) => Math.abs(x - y), sortedXs, sortedYs);
  return sum(diffs);
}
