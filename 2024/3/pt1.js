import { readFile } from "fs";

readFile("input", "utf8", (err, data) => {
  if (err) console.error(err);

  const values = parse(data);
  console.log(values.reduce((acc, val) => acc + val, 0));
});

const parse = (data) => {
  const regex = /(?<=mul\()\d+,\d+(?=\))/dg;

  let arr;
  const values = [];
  while ((arr = regex.exec(data)) !== null) {
    values.push(arr[0]);
  }

  return values.map(
    (value) => value.split(",").reduce((acc, cur) => Number(acc) * Number(cur)),
    1
  );
};