const urls = ["http://127.0.0.1:4321/", "http://127.0.0.1:4321/about/", "http://127.0.0.1:4321/archive/", "http://127.0.0.1:4321/dynamic/", "http://127.0.0.1:4321/projects/"];
const needles = ["cuteleaf", "CuteLeaf", "xiaye", "XiaYe", "夏叶", "Lovely firefly", "Demo site", "Firefly 是一款"];

for (const url of urls) {
	const html = await (await fetch(url)).text();
	const hits = [];
	for (const n of needles) {
		const count = html.split(n).length - 1;
		if (count > 0) hits.push(`${n}×${count}`);
	}
	console.log(url.replace("http://127.0.0.1:4321", ""), hits.length ? hits.join(", ") : "clean");
}
