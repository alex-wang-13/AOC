import { readFile } from "fs";

readFile("input", "utf8", (err, data) => {
  if (err) console.error(err);

  // Convert the raw data into an array
  const values = parse(data);
  // Count the number of times XMAS appears
  console.log(search(values));
});

const parse = (data) => {
  return data.split(/\r?\n/).map((line) => line.split(""));
};

// Perform BFS on the array
const search = (vArray) => {
  const directions = {
    // <direction>: [<row movement>, <col movement>]
    l: [0, -1],
    ul: [-1, -1],
    u: [-1, 0],
    ur: [-1, 1],
    r: [0, 1],
    dr: [1, 1],
    d: [1, 0],
    dl: [1, -1],
  };
  const target = "XMAS";

  const isValidSquare = (row, col) => {
    // A valid square is in bounds
    return (
      row >= 0 && col >= 0 && row < vArray.length && col < vArray[0].length
    );
  };

  // Search in all 8 directions for target
  const starfish = (row, col) => {
    let count = 0;

    // Iterate through directions
    for (let dir of Object.values(directions)) {
      // Set start point and offsets
      const [rStep, cStep] = [dir[0], dir[1]];
      let r = row;
      let c = col;
      // Step through target string (i.e. "XMAS")
      for (let index = 0; index < target.length; index++) {
        if (
          isValidSquare(r, c) &&
          index === target.length - 1 &&
          vArray[r][c] === target[index]
        ) {
          // If "S" is reached (or the last letter), increment count
          count += 1;
        } else if (isValidSquare(r, c) && vArray[r][c] === target[index]) {
          // If another valid letter is reached in the target string
          r += rStep;
          c += cStep;
        } else {
          // Reached a dead end; backtrack
          break;
        }
      }
    }

    return count;
  };

  // Initialize count
  let count = 0;
  for (let row = 0; row < vArray.length; row++) {
    for (let col = 0; col < vArray[0].length; col++) {
      // Search each row & col for the target string
      count += starfish(row, col);
    }
  }
  return count;
};
