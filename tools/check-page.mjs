const url = process.argv[2];
const res = await fetch(url);
const body = await res.text();
console.log("status", res.status, "bytes", body.length);
const title = body.match(/<title>(.*?)<\/title>/s);
console.log("title:", title ? title[1].trim() : "(none)");
const h1 = body.match(/<h1[^>]*>(.*?)<\/h1>/s);
if (h1) console.log("h1:", h1[1].replace(/<[^>]+>/g, "").trim().slice(0, 120));
