const token = process.env.GITHUB_TOKEN;
if (!token) {
	console.error("missing GITHUB_TOKEN");
	process.exit(1);
}

const api = async (path, init = {}) => {
	const res = await fetch(`https://api.github.com${path}`, {
		...init,
		headers: {
			authorization: `Bearer ${token}`,
			accept: "application/vnd.github+json",
			"user-agent": "dsh",
			"x-github-api-version": "2022-11-28",
			...(init.headers || {}),
		},
	});
	const text = await res.text();
	let body = null;
	try {
		body = text ? JSON.parse(text) : null;
	} catch {
		body = text;
	}
	return { status: res.status, body, headers: res.headers };
};

const me = await api("/user");
console.log("user:", me.status, me.body?.login);

const repo = await api("/repos/AlbertXY/Firefly");
console.log("repo exists:", repo.status, repo.status === 200 ? repo.body.full_name : repo.body?.message);

if (repo.status === 404) {
	const created = await api("/user/repos", {
		method: "POST",
		body: JSON.stringify({
			name: "Firefly",
			description: "aIbert的前哨站",
			homepage: "https://albertxy.github.io/Firefly/",
			private: false,
			has_issues: true,
			has_wiki: false,
			auto_init: false,
		}),
	});
	console.log("create repo:", created.status, created.body?.full_name || created.body?.message);
}

const pages = await api("/repos/AlbertXY/Firefly/pages");
console.log("pages:", pages.status, pages.status === 200 ? pages.body.html_url : pages.body?.message);
