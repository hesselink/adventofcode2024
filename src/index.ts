import * as day1 from "./day1";
import * as day2 from "./day2";
import Process, { exit } from "process";

const day = +Process.argv[2];

if (!day) {
  console.log("Please specify the day as an argument");
  exit(1);
}

switch (day) {
  case 1:
    day1.part1().then(console.log).then(day1.part2).then(console.log);
    break;
  case 2:
    day2.part1().then(console.log).then(day2.part2).then(console.log);
    break;
}
