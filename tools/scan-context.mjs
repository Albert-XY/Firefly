const html = await (await fetch("http://127.0.0.1:4321/")).text();
const needles = ["cuteleaf", "xiaye", "CuteLeaf", "XiaYe"];
for (const n of needles) {
	let idx = -1;
	while ((idx = html.indexOf(n, idx + 1)) !== -1) {
		const start = Math.max(0, idx - 160);
		const snippet = html.slice(start, idx + 160).replace(/\s+/g, " ");
		console.log(`--- ${n} @${idx} ---`);
		console.log(snippet);
	}
}
