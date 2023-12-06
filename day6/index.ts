import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day6/input.txt")).toString().split("\n");
  let total = 1;
  const lines = input
    .map((line) =>
      line
        .split(":")
        .slice(1)
        .map((ele) => ele.trim())
    )
    .map((ele) => ele[0])
    .map((ele) =>
      ele
        .split(" ")
        .filter((ele) => ele.length > 0)
        .map((ele) => parseInt(ele))
    );

  // console.log(lines);
  for (let i = 0; i < lines[0].length; i++) {
    let currentWins = 0;
    const maxTime = lines[0][i];
    const distance = lines[1][i];
    for (let j = 0; j <= maxTime; j++) {
      const speed = j;
      const remainingTime = maxTime - j;
      // console.log(
      //   speed,
      //   remainingTime,
      //   speed * remainingTime,
      //   distance,
      //   speed * remainingTime > distance
      // );
      if (speed * remainingTime > distance) {
        currentWins++;
      }
    }
    // console.log(currentWins);
    total *= currentWins;
  }

  console.log("Part 1 : ", total);
}

async function part2() {
  const input = (await fs.readFile("./day6/input.txt")).toString().split("\n");
  let total = 1;
  const lines = input
    .map((line) =>
      line
        .split(":")
        .slice(1)
        .map((ele) => ele.trim())
    )
    .map((ele) => ele[0])
    .map((ele) => ele.split(" ").filter((ele) => ele.length > 0))
    .map((ele) => parseInt(ele.join("")));

  // console.log(lines);
  let currentWins = 0;
  const maxTime = lines[0];
  const distance = lines[1];
  for (let j = 0; j <= maxTime; j++) {
    const speed = j;
    const remainingTime = maxTime - j;
    // console.log(
    //   speed,
    //   remainingTime,
    //   speed * remainingTime,
    //   distance,
    //   speed * remainingTime > distance
    // );
    if (speed * remainingTime > distance) {
      currentWins++;
    }
  }
  // console.log(currentWins);
  total *= currentWins;

  console.log("Part 2 : ", total);
}

part1();
part2();
