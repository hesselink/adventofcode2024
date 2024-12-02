import { readFile } from "fs/promises";
import { tail, zipWith } from "./array";

async function readInput(): Promise<number[][]> {
  const f = await readFile("input/2");
  const str = f.toString();
  const ls = str.split(/\r?\n/);
  const ns: number[][] = ls.map((l) => l.split(/ +/).map((s) => +s));
  return ns;
}

export async function part1() {
  const ns = await readInput();
  return ns.filter(isSafe).length;
}

function isSafe(report: number[]): boolean {
  const diffs: number[] = zipWith((x, y) => x - y, report, tail(report) || []);
  const check: (d: number) => boolean =
    diffs[0] > 0 ? (d) => d > 0 : (d) => d < 0;
  const allIncreasingOrDecreasing = diffs.every(check);
  const allBetweenOneAndThree = diffs.every(
    (d) => Math.abs(d) >= 1 && Math.abs(d) <= 3
  );
  return allIncreasingOrDecreasing && allBetweenOneAndThree;
}
