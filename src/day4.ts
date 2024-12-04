import { readFile } from "fs/promises";
import { sum } from "./array";
import { Grid, Point, Direction, directions, move, getAt } from "./grid";

const xmas = ["X", "M", "A", "S"] as const
export type Char = typeof xmas[number]

async function readInput(): Promise<Grid<Char>> {
  const f = await readFile("input/4");
  const str = f.toString();
  const ls = str.split(/\r?\n/);
  return ls.map(s => [...s].map(parseChar));
}

export async function part1() {
  const grid = await readInput();
  const total = sum(grid.map((l, y) => sum(l.map((_, x) => countXmasAt({ x, y }, grid)))))
  return total
}

export async function part2() {
  const grid = await readInput();
  const total = sum(grid.map((l, y) => l.filter((_, x) => hasMasXAt({ x, y }, grid)).length))
  return total
}

function parseChar(str: string): Char {
  switch (str) {
    case "X": return str;
    case "M": return str;
    case "A": return str;
    case "S": return str;
    default: throw new Error("Unrecognized character: " + str);
  }
}

function countXmasAt(p: Point, grid: Grid<Char>): number {
  let total = 0;
  for (let d of directions) {
    if (hasXmasIn(d, p, grid)) {
      total++;
    }
  }
  return total;
}

function hasXmasIn(d: Direction, p: Point, grid: Grid<Char>): boolean {
  for (let i = 0; i < xmas.length; i++) {
    if (xmas[i] !== getAt(p, grid)) {
      return false;
    }
    p = move(p, d);
  }
  return true;
}

function hasMasXAt(p: Point, grid: Grid<Char>): boolean {
  if (getAt(p, grid) !== "A") {
    return false;
  }
  const nw = getAt(move(p, "NW"), grid);
  const se = getAt(move(p, "SE"), grid);
  const sw = getAt(move(p, "SW"), grid);
  const ne = getAt(move(p, "NE"), grid);
  return (nw === "M" && se === "S" || nw === "S" && se === "M")
    && (sw === "M" && ne === "S" || sw === "S" && ne === "M")
}
