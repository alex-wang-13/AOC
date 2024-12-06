import { readFile } from "fs";

readFile("./input", "utf8", (err, data) => {
  // Return on error
  if (err) console.error(err);

  // Parse data
  const result = parse(data);
  console.log(result);
});

const parse = (data) => {
  // Split data into lines
  const lines = data.split(/\r?\n/);
  const l1 = [];
  const l2 = [];

  // Split lines into 2 lists
  lines.forEach((line) => {
    const [i1, i2] = line.split(/\W+/);
    // Convert from str to num
    l1.push(Number(i1));
    l2.push(Number(i2));
  });

  // Sort in order
  l1.sort();
  l2.sort();

  // Add differences
  let sum = 0;
  for (let index = 0; index < l1.length; index++) {
    sum += Math.abs(l1[index] - l2[index]);
  }

  return sum;
};
