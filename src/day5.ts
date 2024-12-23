import { readFile } from "fs/promises";
import { reverse, sum } from "./array"
import * as M from "./multimap"

type Orderings = M.Multimap<number, number>
type Update = number[]

async function readInput(): Promise<[Orderings, Update[]]> {
  const f = await readFile("input/5");
  const str = f.toString();
  const [ordStr, updStr, ..._rest] = str.split("\n\n")
  const orderings = ordStr.split(/\r?\n/).map(l => l.split("|").map(v => +v) as [number, number]);
  const updates = updStr.split(/\r?\n/).map(l => l.split(",").map(v => +v))
  updates.pop() // empty line at the end, :shrug:
  return [M.fromList(orderings), updates]
}

export async function part1() {
  const [orderings, updates] = await readInput()
  const correctUpdates = updates.filter(u => correctlyOrdered(orderings, u))
  const middles = correctUpdates.map(getMiddle)
  return sum(middles)
}

export async function part2() {
  const [orderings, updates] = await readInput()
  const incorrectUpdates = updates.filter(u => !correctlyOrdered(orderings, u))
  const reordered = incorrectUpdates.map(u => fixOrder(orderings, u))
  const middles = reordered.map(getMiddle)
  return sum(middles)
}

function correctlyOrdered(orderings: Orderings, update: Update): boolean {
  const reversed = reverse(update)
  let disallowed: number[] = []
  for (let i = 0; i < reversed.length; i++) {
    const current = reversed[i];
    if (disallowed.includes(current)) {
      return false;
    }
    const newDisallowed = orderings.get(current) || []
    disallowed = disallowed.concat(newDisallowed)
  }
  return true;
}

function getMiddle<T>(xs: T[]): T {
  const ix = Math.floor(xs.length / 2);
  return xs[ix]
}

function fixOrder(orderings: Orderings, update: Update): Update {
  let newUpdate: Update = []
  for (let i = 0; i < update.length; i++) {
    const current = update[i];
    const disallowed = orderings.get(current) || []
    for (let j = 0; j < newUpdate.length; j++) {
      if (disallowed.includes(newUpdate[j])) {
        newUpdate.splice(j, 0, current)
        break;
      }
    }
    if (newUpdate.length === i) {
      newUpdate.push(current)
    }
  }
  return newUpdate
}
