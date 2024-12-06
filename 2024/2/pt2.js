import { readFile } from "fs";

readFile("./input", "utf8", (err, contents) => {
  if (err) console.error(err);

  const reports = parse(contents);
  const numSafe = analyze(reports);
  console.log(numSafe);
});

const parse = (contents) => {
  return contents.split(/\r?\n/);
};

const analyze = (reports) => {
  // Detect if an array increases
  const isIncreasing = (level) => {
    // LOL try all combos if necessary
    outer: for (let rIndex = 0; rIndex < level.length; rIndex++) {
      let arr = [...level.slice(0, rIndex), ...level.slice(rIndex + 1)];
      for (let index = 1; index < arr.length; index++) {
        const increase = arr[index] - arr[index - 1];
        if (increase < 1 || increase > 3) continue outer; // GOTO
      }
      return true;
    }
    return false;
  };
  // Detect if an array increases
  const isDecreasing = (level) => {
    outer: for (let rIndex = 0; rIndex < level.length; rIndex++) {
      let arr = [...level.slice(0, rIndex), ...level.slice(rIndex + 1)];
      for (let index = 1; index < arr.length; index++) {
        const decrease = arr[index] - arr[index - 1];
        if (decrease > -1 || decrease < -3) continue outer;
      }
      return true;
    }
    return false;
  };
  // Convert values to numbers
  const levels = reports.map((report) =>
    report.split(/\W+/).map((level) => Number(level))
  );

  // Count the number of safe levels
  let count = 0;
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    if (isIncreasing(level)) {
      // Handle increasing
      count += 1;
    } else if (isDecreasing(level)) {
      // Handle decreasing
      count += 1;
    }
  }

  return count;
};
