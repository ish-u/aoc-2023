import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day/input.txt")).toString().split("\n");

  let total = 0;

  console.log("Part 1 : ", total);
}


async function part2() {
  const input = (await fs.readFile("./day/input.txt")).toString().split("\n");

  let total = 0;

  console.log("Part 2 : ", total);
}

part1();
part2();
