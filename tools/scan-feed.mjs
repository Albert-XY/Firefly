const html = await (await fetch("http://127.0.0.1:4321/")).text();
for (const m of html.matchAll(/href="([^"]*(?:rss|atom)[^"]*)"/g)) {
	console.log(m[1]);
}
