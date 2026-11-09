import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const version = process.argv[2];
const out = process.argv[3];
const url = `https://registry.npmjs.org/vite/-/vite-${version}.tgz`;
const res = await fetch(url, { redirect: "follow" });
if (!res.ok) {
	console.error("HTTP", res.status);
	process.exit(1);
}
await pipeline(Readable.fromWeb(res.body), createWriteStream(out));
console.log("saved", out);
