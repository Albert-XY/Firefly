// Local-only helper: lets Node import astro.config.mjs natively (bypassing
// Astro's Vite "runner" config loader, which cannot execute CJS deps in this
// sandbox). Resolves the project's tsconfig path aliases + directory imports
// to real files; Node's built-in type stripping handles the TypeScript.
import fs from "node:fs";
import { registerHooks } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();

const aliases = {
	"@components/": "src/components/",
	"@assets/": "src/assets/",
	"@constants/": "src/constants/",
	"@utils/": "src/utils/",
	"@i18n/": "src/i18n/",
	"@layouts/": "src/layouts/",
	"@/": "src/",
};

const extensions = [".ts", ".tsx", ".mts", ".js", ".mjs", ".jsx", ".json"];

function resolveFile(base) {
	if (fs.existsSync(base) && fs.statSync(base).isFile()) return base;
	for (const ext of extensions) {
		const candidate = base + ext;
		if (fs.existsSync(candidate)) return candidate;
	}
	if (fs.existsSync(base) && fs.statSync(base).isDirectory()) {
		for (const ext of extensions) {
			const candidate = path.join(base, `index${ext}`);
			if (fs.existsSync(candidate)) return candidate;
		}
	}
	return null;
}

registerHooks({
	load(url, context, nextLoad) {
		if (url.includes("?raw")) {
			const filePath = decodeURIComponent(new URL(url).pathname.replace(/^\/([A-Za-z]:)/, "$1").replace(/\?raw$/, ""));
			const source = fs.readFileSync(filePath, "utf8");
			return {
				format: "module",
				source: `export default ${JSON.stringify(source)};`,
				shortCircuit: true,
			};
		}
		return nextLoad(url, context);
	},
	resolve(specifier, context, nextResolve) {
		if (specifier.includes("?raw")) {
			const bare = specifier.split("?")[0];
			const parentDir = context.parentURL
				? path.dirname(new URL(context.parentURL).pathname.replace(/^\/([A-Za-z]:)/, "$1"))
				: root;
			const found = resolveFile(path.resolve(parentDir, bare));
			if (found) {
				return { url: `${pathToFileURL(found).href}?raw`, shortCircuit: true };
			}
		}

		let mapped = null;
		for (const [prefix, replacement] of Object.entries(aliases)) {
			if (specifier.startsWith(prefix)) {
				mapped = path.join(root, replacement, specifier.slice(prefix.length));
				break;
			}
		}

		if (mapped) {
			const found = resolveFile(mapped);
			if (found) {
				return { url: pathToFileURL(found).href, shortCircuit: true };
			}
		}

		if (specifier.startsWith("./") || specifier.startsWith("../")) {
			const parentDir = context.parentURL
				? path.dirname(new URL(context.parentURL).pathname.replace(/^\/([A-Za-z]:)/, "$1"))
				: root;
			const found = resolveFile(path.resolve(parentDir, specifier));
			if (found) {
				return { url: pathToFileURL(found).href, shortCircuit: true };
			}
		}

		return nextResolve(specifier, context);
	},
});
