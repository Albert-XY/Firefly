import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const url = process.argv[2];
const out = process.argv[3];

const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "dsh-node" } });
if (!res.ok) {
	console.error("HTTP", res.status, res.statusText);
	process.exit(1);
}
await pipeline(Readable.fromWeb(res.body), createWriteStream(out));
console.log("saved", out);
