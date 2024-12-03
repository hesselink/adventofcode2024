import {readFile} from "fs/promises";
import {sum} from "./array";

async function readInput(): Promise<string> {
  const f = await readFile("input/3");
  const str = f.toString();
  return str;
}

export async function part1() {
  const str = await readInput();
  const matches = [...str.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
  const results = matches.map(m => +m[1] * +m[2])
  return sum(results)
}

export async function part2() {
  const str = await readInput();
  const matches = [...str.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g)]

  let sum = 0
  let enabled = true;
  for (let m of matches) {
    if (enabled && m[0].startsWith("mul(")) {
      sum += +m[1] * +m[2]
    } else if (m[0].startsWith("don't(")) {
      enabled = false;
    } else if (m[0].startsWith("do(")) {
      enabled = true
    }
  }
  return sum;
}
