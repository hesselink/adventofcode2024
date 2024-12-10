export type Point = {
  x: number;
  y: number;
};

export const directions = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"] as const
export type Direction = (typeof directions)[number];

export function move(p: Point, d: Direction): Point {
  switch (d) {
    case "N": return { x: p.x, y: p.y - 1 };
    case "NW": return { x: p.x - 1, y: p.y - 1 };
    case "W": return { x: p.x - 1, y: p.y };
    case "SW": return { x: p.x - 1, y: p.y + 1 };
    case "S": return { x: p.x, y: p.y + 1 };
    case "SE": return { x: p.x + 1, y: p.y + 1 };
    case "E": return { x: p.x + 1, y: p.y };
    case "NE": return { x: p.x + 1, y: p.y - 1 };
  }
}

export type Grid<T> = T[][]

export function getAt<T>(p: Point, grid: Grid<T>): T | undefined {
  return grid[p.y]?.[p.x];
}

export function comparePoint(p1: Point, p2: Point): number {
  const compareX = p1.x - p2.x;
  return compareX === 0 ? p1.y - p2.y : compareX
}

export function eqPoint(p1: Point, p2: Point): boolean {
  return p1.x === p2.x && p1.y === p2.y
}
