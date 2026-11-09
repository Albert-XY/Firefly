const res = await fetch("https://api.github.com/repos/git-for-windows/git/releases/latest", {
	headers: { "user-agent": "dsh" },
});
if (!res.ok) {
	console.error("api", res.status);
	process.exit(1);
}
const rel = await res.json();
const asset = rel.assets.find((a) => /^PortableGit-.*64-bit\.7z\.exe$/.test(a.name));
if (!asset) {
	console.error("assets:", rel.assets.map((a) => a.name).join("\n"));
	process.exit(1);
}
console.log(rel.tag_name);
console.log(asset.name);
console.log(asset.browser_download_url);
