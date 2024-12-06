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
    for (let i = 1; i < level.length; i++) {
      const increase = level[i] - level[i - 1];
      if (increase < 1 || increase > 3) return false;
    }
    return true;
  };
  // Detect if an array decreases
  const isDecreasing = (level) => {
    for (let i = 1; i < level.length; i++) {
      const decrease = level[i - 1] - level[i];
      if (decrease < 1 || decrease > 3) return false;
    }
    return true;
  };
  // Convert values to numbers
  const levels = reports.map((report) =>
    report.split(/\W+/).map((level) => Number(level))
  );

  // Count the number of safe levels
  let count = 0;
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    if (level[0] < level[1] && isIncreasing(level)) {
      // Handle increasing
      count += 1;
    } else if (level[0] > level[1] && isDecreasing(level)) {
      // Handle decreasing
      count += 1;
    }
  }

  return count;
};
