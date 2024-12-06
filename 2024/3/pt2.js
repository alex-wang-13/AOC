import { readFile } from "fs";

readFile("input", "utf8", (err, data) => {
  if (err) console.error(err);

  const values = parse(data);
  console.log(values.reduce((acc, val) => acc + val, 0));
});

const parse = (data) => {
  const regex = /do\(\)|don't\(\)|(?<=mul\()\d+,\d+(?=\))/dg;

  let arr;
  let enabled = true;
  const values = [];
  while ((arr = regex.exec(data)) !== null) {
    if (arr[0] === "do()") {
      enabled = true;
    } else if (arr[0] === "don't()") {
      enabled = false;
    }

    if (enabled && arr[0] !== "do()" && arr[0] !== "don't()") {
      values.push(arr[0]);
    }
  }

  return values.map(
    (value) => value.split(",").reduce((acc, cur) => Number(acc) * Number(cur)),
    1
  );
};
