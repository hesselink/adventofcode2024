import { readFile } from "fs/promises";
import { Grid, Point, Direction, move, getAt, comparePoint, eqPoint } from "./grid";
import { unique } from "./array"

const tiles = [".", "#"] as const
export type Char = typeof tiles[number]
type Guard = {
  position: Point,
  direction: Direction,
}

async function readInput(): Promise<[Grid<Char>, Guard]> {
  const f = await readFile("input/6");
  const str = f.toString();
  const ls = str.split(/\r?\n/);
  const grid = ls.map(s => [...s].map(parseChar));
  const guardPos = findGuard(ls)
  return [grid, { position: guardPos, direction: "N" } ]
}

export async function part1() {
  const [grid, guard_] = await readInput()
  let guard = guard_
  const positions = []
  while (isInBounds(grid, guard.position)) {
    positions.push(guard.position)
    guard = step(grid, guard)
  }
  positions.sort(comparePoint)
  const uniques = unique(positions, eqPoint)
  return uniques.length
}

export async function part2() {
}

function parseChar(str: string): Char {
  switch (str) {
    case ".": return str;
    case "#": return str;
    case "^": return "#";
    default: throw new Error("Unrecognized character: " + str);
  }
}

function findGuard(ls: string[]): Point {
  for (let y = 0; y < ls.length; y++) {
    const x = ls[y].indexOf("^");
    if (x > -1) {
      return { x, y }
    }
  }
  throw new Error("Failed to find guard")
}

function step(grid: Grid<Char>, guard: Guard): Guard {
  const inFront = move(guard.position, guard.direction);
  const tile = getAt(inFront, grid)
  if (tile == "#") {
    return { ...guard, direction: turnRight(guard.direction) }
  } else {
    return { ...guard, position: inFront }
  }
}

function turnRight(dir: Direction): Direction {
  switch(dir) {
    case "N": return "E"
    case "E": return "S"
    case "S": return "W"
    case "W": return "N"
    default: throw new Error("Unsupported direction in turnRight: " + dir);
  }
}

function isInBounds<T>(grid: Grid<T>, point: Point) {
  return point.x >= 0 && point.y >= 0 && point.x < grid[0].length && point.y < grid.length;
}
