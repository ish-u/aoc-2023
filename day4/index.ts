import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day4/input.txt")).toString().split("\n");
  let total = 0;

  for (const line of input) {
    const card = line
      .split(":")[1]
      .split("|")
      .map((arr) =>
        arr
          .trim()
          .split(" ")
          .filter((num) => num.length > 0)
      );
    const winningNumbers = card[0];
    const scratchNumbers = card[1];
    let points = 0;
    // console.log(winningNumbers, scratchNumbers);
    for (const winningNumber of winningNumbers) {
      if (scratchNumbers.includes(winningNumber)) {
        if (points === 0) {
          points = 1;
        } else {
          points *= 2;
        }
      }
    }
    // console.log(points);
    total += points;
  }

  console.log("Part 1 : ", total);
}

async function part2() {
  const input = (await fs.readFile("./day4/input.txt")).toString().split("\n");
  let total = 0;

  const cardTable: { [key: string]: number } = {};
  for (let i = 0; i < input.length; i++) {
    cardTable[(i + 1).toString()] = 1;
  }
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const card = line
      .split(":")[1]
      .split("|")
      .map((arr) =>
        arr
          .trim()
          .split(" ")
          .filter((num) => num.length > 0)
      );
    const winningNumbers = card[0];
    const scratchNumbers = card[1];
    let points = 0;
    for (const winningNumber of winningNumbers) {
      if (scratchNumbers.includes(winningNumber)) {
        points++;
      }
    }
    // console.log(i + 1, points);
    for (let j = 0; j < points; j++) {
      // console.log(j + i + 2);
      cardTable[(j + i + 2).toString()] += cardTable[(i + 1).toString()];
    }
  }
  // console.log(
  //   cardTable,
  //   Object.values(cardTable).reduce((curr, prev) => (prev += curr), 0)
  // );
  total = Object.values(cardTable).reduce((curr, prev) => (prev += curr), 0);

  console.log("Part 2 : ", total);
}

part1();
part2();
