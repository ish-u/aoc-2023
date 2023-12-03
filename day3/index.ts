import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day3/input.txt")).toString().split("\n");

  const numberMap: {
    number: number;
    line: number;
    start: number;
    end: number;
    valid: boolean;
  }[] = [];
  for (let lineNumber = 0; lineNumber < input.length; lineNumber++) {
    const line = input[lineNumber];
    // console.log(line);
    let number = "";
    let start = -1;
    for (let i = 0; i < line.length; i++) {
      if (!isNaN(parseInt(line[i]))) {
        if (start === -1) {
          start = i;
        }
        number += line[i];
      } else {
        if (number.length && start !== -1 && parseInt(number)) {
          // console.log(number, lineNumber, start, i);
          numberMap.push({
            start: start,
            end: i - 1,
            line: lineNumber,
            number: parseInt(number),
            valid: false,
          });
          start = -1;
          number = "";
        }
      }
    }
    // THIS CONDITION MADE ME LOSE 2 HOURS :(
    if (number.length && start !== -1 && parseInt(number)) {
      // console.log(number, lineNumber, start, i);
      numberMap.push({
        start: start,
        end: line.length,
        line: lineNumber,
        number: parseInt(number),
        valid: false,
      });
      start = -1;
      number = "";
    }
  }

  const engineGrid = input.map((line) => line.split(""));
  // console.dir(engineGrid, { depth: null });

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < engineGrid[i].length; j++) {
      if (isNaN(parseInt(engineGrid[i][j])) && engineGrid[i][j] !== ".") {
        //UP
        if (i - 1 >= 0 && !isNaN(parseInt(engineGrid[i - 1][j]))) {
          const number = numberMap.findIndex(
            (ele) => ele.line === i - 1 && ele.start <= j && ele.end >= j
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(line, numberMap[number]);
          }
        }
        //DOWN
        if (i + 1 < input.length && !isNaN(parseInt(engineGrid[i + 1][j]))) {
          const number = numberMap.findIndex(
            (ele) => ele.line === i + 1 && ele.start <= j && ele.end >= j
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(line, numberMap[number]);
          }
        }
        //LEFT
        if (j - 1 >= 0 && !isNaN(parseInt(engineGrid[i][j - 1]))) {
          const number = numberMap.findIndex(
            (ele) => ele.line === i && ele.start <= j - 1 && ele.end >= j - 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(line, numberMap[number]);
          }
        }
        //RIGHT
        if (
          j + 1 < engineGrid[i].length &&
          !isNaN(parseInt(engineGrid[i][j + 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) => ele.line === i && ele.start <= j + 1 && ele.end >= j + 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(line, numberMap[number]);
          }
        }
        //DOWN-RIGHT
        if (
          j + 1 < engineGrid[i].length &&
          i + 1 < input.length &&
          !isNaN(parseInt(engineGrid[i + 1][j + 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) =>
              ele.line === i + 1 && ele.start <= j + 1 && ele.end >= j + 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(line, numberMap[number]);
          }
        }
        //DOWN-LEFT
        if (
          j - 1 >= 0 &&
          i + 1 < input.length &&
          !isNaN(parseInt(engineGrid[i + 1][j - 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) =>
              ele.line === i + 1 && ele.start <= j - 1 && ele.end >= j - 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
          }
        }
        //UP-RIGHT
        if (
          j + 1 < engineGrid[i].length &&
          i - 1 >= 0 &&
          !isNaN(parseInt(engineGrid[i - 1][j + 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) =>
              ele.line === i - 1 && ele.start <= j + 1 && ele.end >= j + 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(line, numberMap[number]);
          }
        }
        //UP-LEFT
        if (
          j - 1 >= 0 &&
          i - 1 >= 0 &&
          !isNaN(parseInt(engineGrid[i - 1][j - 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) =>
              ele.line === i - 1 && ele.start <= j - 1 && ele.end >= j - 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(line, numberMap[number]);
          }
        }
      }
    }
  }

  // console.log(
  //   numberMap.map((ele) => ele.number),
  //   numberMap.filter((ele) => ele.valid).map((ele) => ele.number)
  // );
  const total = numberMap
    .filter((ele) => ele.valid)
    .map((ele) => ele.number)
    .reduce((curr, prev) => curr + prev, 0);

  console.log("Part 1 : ", total);
}

async function part2() {
  const input = (await fs.readFile("./day3/input.txt")).toString().split("\n");

  let total = 0;

  const numberMap: {
    number: number;
    line: number;
    start: number;
    end: number;
    valid: boolean;
  }[] = [];
  for (let lineNumber = 0; lineNumber < input.length; lineNumber++) {
    const line = input[lineNumber];
    let number = "";
    let start = -1;
    for (let i = 0; i < line.length; i++) {
      if (!isNaN(parseInt(line[i]))) {
        if (start === -1) {
          start = i;
        }
        number += line[i];
      } else {
        if (number.length && start !== -1 && parseInt(number)) {
          // console.log(number, lineNumber, start, i);
          numberMap.push({
            start: start,
            end: i - 1,
            line: lineNumber,
            number: parseInt(number),
            valid: false,
          });
          start = -1;
          number = "";
        }
      }
    }
    if (number.length && start !== -1 && parseInt(number)) {
      // console.log(number, lineNumber, start, i);
      numberMap.push({
        start: start,
        end: line.length,
        line: lineNumber,
        number: parseInt(number),
        valid: false,
      });
      start = -1;
      number = "";
    }
  }

  const engineGrid = input.map((line) => line.split(""));
  // console.dir(engineGrid, { depth: null });

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < engineGrid[i].length; j++) {
      if (isNaN(parseInt(engineGrid[i][j])) && engineGrid[i][j] == "*") {
        const gear = new Set<number>();
        //UP
        if (i - 1 >= 0 && !isNaN(parseInt(engineGrid[i - 1][j]))) {
          const number = numberMap.findIndex(
            (ele) => ele.line === i - 1 && ele.start <= j && ele.end >= j
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(i, numberMap[number].number);
            gear.add(numberMap[number].number);
          }
        }
        //DOWN
        if (i + 1 < input.length && !isNaN(parseInt(engineGrid[i + 1][j]))) {
          const number = numberMap.findIndex(
            (ele) => ele.line === i + 1 && ele.start <= j && ele.end >= j
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(i, numberMap[number].number);
            gear.add(numberMap[number].number);
          }
        }
        //LEFT
        if (j - 1 >= 0 && !isNaN(parseInt(engineGrid[i][j - 1]))) {
          const number = numberMap.findIndex(
            (ele) => ele.line === i && ele.start <= j - 1 && ele.end >= j - 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(i, numberMap[number].number);
            gear.add(numberMap[number].number);
          }
        }
        //RIGHT
        if (
          j + 1 < engineGrid[i].length &&
          !isNaN(parseInt(engineGrid[i][j + 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) => ele.line === i && ele.start <= j + 1 && ele.end >= j + 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(i, numberMap[number].number);
            gear.add(numberMap[number].number);
          }
          // console.log(line, number);
        }
        //DOWN-RIGHT
        if (
          j + 1 < engineGrid[i].length &&
          i + 1 < input.length &&
          !isNaN(parseInt(engineGrid[i + 1][j + 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) =>
              ele.line === i + 1 && ele.start <= j + 1 && ele.end >= j + 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(i, numberMap[number].number);
            gear.add(numberMap[number].number);
          }
        }
        //DOWN-LEFT
        if (
          j - 1 >= 0 &&
          i + 1 < input.length &&
          !isNaN(parseInt(engineGrid[i + 1][j - 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) =>
              ele.line === i + 1 && ele.start <= j - 1 && ele.end >= j - 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(i, numberMap[number].number);
            gear.add(numberMap[number].number);
          }
        }
        //UP-RIGHT
        if (
          j + 1 < engineGrid[i].length &&
          i - 1 >= 0 &&
          !isNaN(parseInt(engineGrid[i - 1][j + 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) =>
              ele.line === i - 1 && ele.start <= j + 1 && ele.end >= j + 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(i, numberMap[number].number);
            gear.add(numberMap[number].number);
          }
        }
        //UP-LEFT
        if (
          j - 1 >= 0 &&
          i - 1 >= 0 &&
          !isNaN(parseInt(engineGrid[i - 1][j - 1]))
        ) {
          const number = numberMap.findIndex(
            (ele) =>
              ele.line === i - 1 && ele.start <= j - 1 && ele.end >= j - 1
          );
          if (number !== -1) {
            numberMap[number].valid = true;
            // console.log(i, numberMap[number].number);
            gear.add(numberMap[number].number);
          }
        }
        if (gear.size === 2) {
          total += Array.from(gear)[0] * Array.from(gear)[1];
        }
      }
    }
  }

  console.log("Part 2 : ", total);
}

part1();
part2();
