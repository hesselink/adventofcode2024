import * as day1 from "./day1";
import * as day2 from "./day2";
import * as day3 from "./day3";
import * as day4 from "./day4";
import Process, { exit } from "process";

const dayArg = +Process.argv[2];
type Day = {
  part1: () => Promise<any>,
  part2?: () => Promise<any>,
}
const days = [day1, day2, day3, day4];

if (Number.isNaN(dayArg)) {
  console.log("Please specify the day as a numeric argument");
  exit(1);
}
if (dayArg < 1 || dayArg > days.length) {
  console.log("Days argument out of bounds");
  exit(1);
}

run(days[dayArg - 1]);

function run(day: Day) {
  day.part1().then(console.log).then(day.part2).then(console.log);
}
