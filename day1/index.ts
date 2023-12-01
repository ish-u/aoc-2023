import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day1/input.txt")).toString().split("\n");

  let total = 0;
  for (const line of input) {
    const digitArray = line.split("").filter((d) => !isNaN(parseInt(d)));
    const digit = parseInt(
      (digitArray.at(0) ?? "0") + (digitArray.at(-1) ?? "0")
    );
    total += digit;
  }

  console.log("Part 1 : ", total);
}

function getNumberFromString(number) {
  switch (number) {
    case "one":
      return "1";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
  }
  return "0";
}

async function part2() {
  const input = (await fs.readFile("./day1/input.txt")).toString().split("\n");

  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  let total = 0;
  for (const line of input) {
    const digitArray: { digit: string; index: number }[] = [];
    const digits = line.split("");
    for (let i = 0; i < digits.length; i++) {
      const digit = digits[i];
      if (!isNaN(parseInt(digit))) {
        digitArray.push({ digit: digit, index: i });
      }
    }
    for (const number of numbers) {
      let index = line.indexOf(number);
      while (index !== -1) {
        digitArray.push({ digit: getNumberFromString(number), index: index });
        index = line.indexOf(number, index + number.length);
      }
    }
    digitArray.sort((a, b) => a.index - b.index);
    const filteredDigitsArray = digitArray.map((digit) => digit.digit);
    const digit = parseInt(
      (filteredDigitsArray.at(0) ?? "0") + (filteredDigitsArray.at(-1) ?? "0")
    );
    total += digit;
  }

  console.log("Part 2 : ", total);
}

part1();
part2();
