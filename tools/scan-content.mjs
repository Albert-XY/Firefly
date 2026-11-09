const posts = await (await fetch("http://127.0.0.1:4321/api/allPostMeta.json")).json();
console.log("posts:", posts.length, posts.map((p) => p.title).join(" | "));
const dyn = await fetch("http://127.0.0.1:4321/api/dynamic.json");
console.log("dynamic api:", dyn.status);
if (dyn.ok) {
	const d = await dyn.json();
	console.log("dynamic entries:", Array.isArray(d) ? d.length : typeof d);
}
