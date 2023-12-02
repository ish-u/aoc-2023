import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day2/input.txt")).toString().split("\n");
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    const game = line
      .split(":")[1]
      .split(";")
      .map((value) =>
        value
          .trim()
          .split(",")
          .map((value) => value.trim())
      );

    let isValid = true;
    for (const set of game) {
      if (!isValid) {
        continue;
      }
      for (const cube of set) {
        const cubeCountArray = cube.split(" ");
        switch (cubeCountArray[1]) {
          case "red": {
            if (parseInt(cubeCountArray[0]) > 12) {
              isValid = false;
              continue;
            }
            break;
          }
          case "green": {
            if (parseInt(cubeCountArray[0]) > 13) {
              isValid = false;
              continue;
            }
            break;
          }
          case "blue": {
            if (parseInt(cubeCountArray[0]) > 14) {
              isValid = false;
              continue;
            }
            break;
          }
        }
      }
    }
    if (isValid) {
      total += i + 1;
    }
  }
  console.log("Part 1 :", total);
}

async function part2() {
  const input = (await fs.readFile("./day2/input.txt")).toString().split("\n");
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    const game: string[] = [];
    line
      .split(":")[1]
      .split(";")
      .map((value) =>
        value
          .trim()
          .split(",")
          .map((value) => value.trim())
      )
      .forEach((set) => game.push(...set));

    let red = 0;
    let green = 0;
    let blue = 0;
    for (const cube of game) {
      const cubeCountArray = cube.split(" ");
      switch (cubeCountArray[1]) {
        case "red": {
          if (parseInt(cubeCountArray[0]) > red) {
            red = parseInt(cubeCountArray[0]);
          }
          break;
        }
        case "green": {
          if (parseInt(cubeCountArray[0]) > green) {
            green = parseInt(cubeCountArray[0]);
          }
          break;
        }
        case "blue": {
          if (parseInt(cubeCountArray[0]) > blue) {
            blue = parseInt(cubeCountArray[0]);
          }
          break;
        }
      }
    }

    total += red * green * blue;
  }

  console.log("Part 2 :", total);
}

part1();
part2();
