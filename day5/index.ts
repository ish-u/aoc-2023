import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day5/input.txt"))
    .toString()
    .split("\n\n");
  const seeds = input[0]
    .split(":")[1]
    .split(" ")
    .filter((seed) => seed.length)
    .map((seed) => parseInt(seed));
  const categories = input.slice(1).map((category) => category.split(":"));
  const categoryMap: { [key: string]: number[][] } = {};
  categories.forEach(
    (category) =>
      (categoryMap[category[0].split("-")[2].split(" ")[0]] = category[1]
        .split("\n")
        .filter((ele) => ele.length > 0)
        .map((ele) => ele.split(" ").map((ele) => parseInt(ele))))
  );
  const categoryArray = Object.values(categoryMap);
  // console.log(seeds, categoryArray);

  let lowest = -1;
  for (const seed of seeds) {
    let current = seed;
    const mappings = [seed];
    for (const category of categoryArray) {
      for (const mapping of category) {
        const destinationStart = mapping[0];
        const sourceStart = mapping[1];
        const range = mapping[2];
        // console.log(sourceStart + range, current);
        if (sourceStart <= current && sourceStart + range > current) {
          current = destinationStart + Math.abs(sourceStart - current);
          mappings.push(current);
          break;
        }
      }
    }
    // console.log(seed, mappings);
    if (lowest === -1) {
      lowest = current;
    } else if (lowest > current) {
      lowest = current;
    }
  }

  console.log("Part 1 : ", lowest);
}

async function part2() {
  const input = (await fs.readFile("./day5/input.txt"))
    .toString()
    .split("\n\n");
  let lowest = -1;
  const seedsRange = input[0]
    .split(":")[1]
    .split(" ")
    .filter((seed) => seed.length)
    .map((seed) => parseInt(seed));
  const categories = input.slice(1).map((category) => category.split(":"));
  const categoryMap: { [key: string]: number[][] } = {};
  categories.forEach(
    (category) =>
      (categoryMap[category[0].split("-")[2].split(" ")[0]] = category[1]
        .split("\n")
        .filter((ele) => ele.length > 0)
        .map((ele) => ele.split(" ").map((ele) => parseInt(ele))))
  );
  const categoryArray = Object.values(categoryMap);

  for (let i = 0; i < seedsRange.length; i += 2) {
    let startingSeed = seedsRange[i];
    let range = seedsRange[i + 1];

    for (let i = 0; i < range; i++) {
      let current = startingSeed + i;
      // console.log(current);
      const mappings = [current];
      for (const category of categoryArray) {
        for (const mapping of category) {
          const destinationStart = mapping[0];
          const sourceStart = mapping[1];
          const range = mapping[2];
          // console.log(sourceStart + range, current);
          if (sourceStart <= current && sourceStart + range > current) {
            current = destinationStart + Math.abs(sourceStart - current);
            mappings.push(current);
            break;
          }
        }
      }
      // console.log(current, mappings);
      if (lowest === -1) {
        lowest = current;
      } else if (lowest > current) {
        lowest = current;
      }
    }
    console.log(lowest);
  }
  console.log("Part 2 : ", lowest);
}

part1();
// part2();
