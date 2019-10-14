import { createReadStream } from "fs";
import { createInterface } from "readline";
import { Node } from "./node";

(async () => {
  console.log("Reading in dataset..");

  const reader = createInterface({
    input: createReadStream("./ds/livejournal.txt"),
    crlfDelay: Infinity
  });

  const network = {};

  for await (const line of reader) {
    const splitted = line.split("\t");
    const left = Number.parseInt(splitted[0]);
    const right = Number.parseInt(splitted[1]);

    if (!network[left]) network[left] = new Node(left, network);
    if (!network[right]) network[right] = new Node(right, network);

    network[left].addLink(right);
    network[right].addLink(left);
  }
})();
