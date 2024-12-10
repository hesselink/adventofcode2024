import { readFile } from "fs/promises";
import { Grid, Point, Direction, move, getAt, setAt, comparePoint, eqPoint } from "./grid";
import { sort, unique, reverse } from "./array"
import { comparing, combineOrdering } from "./ordering"

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
  const [grid, guard] = await readInput()
  const path = guardPath(grid, guard)
  const positions = path.map(g => g.position)
  positions.sort(comparePoint)
  const uniques = unique(positions, eqPoint)
  return uniques.length
}

export async function part2() {
  const [grid, guard] = await readInput()
  const path = guardPath(grid, guard)
  let blockedPoss = []
  for (let i = 0; i < path.length; i++) {
    const guardH = path[i]
    const posToBlock = move(guardH.position, guardH.direction)
    if (!isInBounds(grid, posToBlock)) {
      continue;
    }
    const blockedGrid = setAt(posToBlock, "#", grid)
    if (isLoop(blockedGrid, guard)) {
      blockedPoss.push(posToBlock)
    }
  }
  const uniquePoss = unique(sort(blockedPoss, comparePoint), eqPoint)
  return uniquePoss.length
}

function isLoop(grid: Grid<Char>, guard: Guard): boolean {
  const guardHistory = new Set()
  function str(g: Guard): string {
    return g.position.x + "," + g.position.y + ":" + g.direction
  }
  while (isInBounds(grid, guard.position)) {
    const guardStr = str(guard)
    if (guardHistory.has(guardStr)) {
      return true
    }
    guardHistory.add(guardStr)
    guard = step(grid, guard)
  }
  return false
}

function guardPath(grid: Grid<Char>, guard: Guard): Guard[] {
  const guardPath = []
  while (isInBounds(grid, guard.position)) {
    guardPath.push(guard)
    guard = step(grid, guard)
  }
  return guardPath
}

function parseChar(str: string): Char {
  switch (str) {
    case ".": return str;
    case "#": return str;
    case "^": return ".";
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
