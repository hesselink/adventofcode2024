import {readFile} from "fs/promises";
import {sum} from "./array";

const xmas = ["X", "M", "A", "S"] as const
type Char = typeof xmas[number]

async function readInput(): Promise<Char[][]> {
  const f = await readFile("input/4");
  const str = f.toString();
  const ls = str.split(/\r?\n/);
  return ls.map(s => [...s].map(parseChar));
}

export async function part1() {
  const grid = await readInput();
  const total = sum(grid.map((l, y) => sum(l.map((_, x) => countXmasAt({x, y}, grid)))))
  return total
}

export async function part2() {
  const grid = await readInput();
  const total = sum(grid.map((l, y) => l.filter((_, x) => hasMasXAt({x, y}, grid)).length))
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

type Point = {
  x: number,
  y: number,
}

const directions =  ["N", "NW", "W", "SW", "S", "SE", "E", "NE"] as const
type Direction = typeof directions[number]


function move(p: Point, d: Direction): Point {
  switch (d) {
    case "N": return { x: p.x, y: p.y - 1 }
    case "NW": return { x: p.x - 1, y: p.y - 1 }
    case "W": return { x: p.x - 1, y: p.y }
    case "SW": return { x: p.x - 1, y: p.y + 1 }
    case "S": return { x: p.x, y: p.y + 1 }
    case "SE": return { x: p.x + 1, y: p.y + 1 }
    case "E": return { x: p.x + 1, y: p.y }
    case "NE": return { x: p.x + 1, y: p.y - 1 }
  }
}

function countXmasAt(p: Point, grid: Char[][]): number {
  let total = 0;
  for (let d of directions) {
    if (hasXmasIn(d, p, grid)) {
      total++;
    }
  }
  return total;
}

function hasXmasIn(d: Direction, p: Point, grid: Char[][]): boolean {
  for (let i = 0; i < xmas.length; i++) {
    if (xmas[i] !== getAt(p, grid)) {
      return false;
    }
    p = move(p, d);
  }
  return true;
}

function hasMasXAt(p: Point, grid: Char[][]): boolean {
  if (getAt(p, grid) !== "A") {
    return false;
  }
  const nw = getAt(move(p, "NW"), grid);
  const se = getAt(move(p, "SE"), grid);
  const sw = getAt(move(p, "SW"), grid);
  const ne = getAt(move(p, "NE"), grid);
  return (nw === "M" && se === "S" || nw === "S" && se === "M") && (sw === "M" && ne === "S" || sw === "S" && ne === "M")
}

function getAt(p: Point, grid: Char[][]): Char | undefined {
  return grid[p.y]?.[p.x];
}
