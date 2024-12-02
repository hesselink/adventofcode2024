import * as day1 from "./day1";
import * as day2 from "./day2";
import Process, { exit } from "process";

const dayArg = +Process.argv[2];
type Day = typeof day1;
const days = [day1, day2];

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
