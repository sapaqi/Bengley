// Builds the static prototype into site/.
//   node build.mjs          HTML + JS + CSS
//   node build.mjs --watch  rebuild CSS on change (HTML: run again)
import { readFile, writeFile, mkdir, rm, readdir, copyFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { imageSize } from "image-size";
import { site } from "./src/content/site.mjs";
import { pages } from "./src/content/pages.mjs";
import * as collections from "./src/content/collections.mjs";
import { sections } from "./src/sections/index.mjs";
import { document } from "./src/layout/shell.mjs";
import { createContext, headingId, esc } from "./src/lib/html.mjs";
import { propertyTemplate, newsTemplate, jobTemplate, articleQuote } from "./src/templates/detail-templates.mjs";

const root = new URL("./site/", import.meta.url);
const sizes = new Map();
async function dimensions(name) {
  if (!sizes.has(name)) sizes.set(name, imageSize(await readFile(new URL(`assets/images/${name}`, root))));
  return sizes.get(name);
}

// Pre-read every image so templates can stay synchronous.
for (const name of await readdir(new URL("assets/images/", root))) await dimensions(name);
const lookup = (name) => sizes.get(name) || {};

// Remove previously generated pages (everything except assets/).
for (const entry of await readdir(root)) {
  if (entry !== "assets") await rm(new URL(entry, root), { recursive: true, force: true });
}

function renderSections(list, ctx) {
  const used = new Set();
  return list.map((section, index) => {
    const render = sections[section.type];
    if (!render) throw new Error(`Unknown section type "${section.type}" on /${ctx.route}`);
    let id = `${headingId(section.heading || section.title || section.type)}-heading`;
    while (used.has(id)) id += "-2";
    used.add(id);
    const meta = { index, id, prev: list[index - 1], next: list[index + 1], isLast: index === list.length - 1 };
    return render(section, ctx, meta);
  }).join("\n\n  ");
}

async function writePage(page, main) {
  const ctx = createContext({ route: page.route, site, dimensions: lookup });
  const html = document(ctx, page, typeof main === "function" ? main(ctx) : main);
  const dir = new URL(page.route, root);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL("index.html", dir), html);
}

const routes = [];
const withCollections = (ctx) => Object.assign(ctx, { collections });

for (const page of pages) {
  await writePage(page, (ctx) => renderSections(page.sections, withCollections(ctx)));
  routes.push(page.route);
}
for (const property of collections.properties) {
  await writePage({ route: property.route, title: `${property.title} — Property Details` }, (ctx) => propertyTemplate(property, withCollections(ctx)));
  routes.push(property.route);
}
for (const post of collections.news) {
  const page = { route: post.route, title: post.title, description: post.excerpt };
  await writePage(page, (ctx) => {
    withCollections(ctx);
    const html = post.paragraphs.map((p) => (typeof p === "string" ? `<p>${esc(p)}</p>` : articleQuote(ctx, p.quote))).join("\n      ");
    return newsTemplate({ ...post, html }, ctx);
  });
  routes.push(post.route);
}
for (const job of collections.jobs) {
  await writePage({ route: job.route, title: job.title }, (ctx) => jobTemplate(job, withCollections(ctx)));
  routes.push(job.route);
}

// Scripts and styles.
await mkdir(new URL("assets/js/", root), { recursive: true });
await copyFile(new URL("./src/js/app.js", import.meta.url), new URL("assets/js/app.js", root));
execFileSync("npx", ["@tailwindcss/cli", "-i", "src/css/app.css", "-o", "site/assets/css/app.css", "--minify", ...(process.argv.includes("--watch") ? ["--watch"] : [])], { stdio: "inherit" });

console.log(`Built ${routes.length} pages into site/`);
