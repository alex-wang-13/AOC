import { readFile } from "fs";

readFile("./input", "utf8", (err, data) => {
  if (err) console.error(err);

  console.log(calculateSimilarity(data));
});

const calculateSimilarity = (data) => {
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

  // Store frequencies in map
  const map = new Map();
  l2.forEach((id) => {
    if (map.has(id)) {
      map.set(id, map.get(id) + 1);
    } else {
      map.set(id, 1);
    }
  });

  // Calculate sum of similarities
  let sum = 0;
  for (let index = 0; index < l1.length; index++) {
    const value = l1[index];
    if (map.has(value)) {
      sum += map.get(value) * value;
    }
  }

  return sum;
};
