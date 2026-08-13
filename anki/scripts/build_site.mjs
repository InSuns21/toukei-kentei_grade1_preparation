import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import YAML from "yaml";
import { ROOT, loadSyllabus, plainText, readCards } from "./lib.mjs";

const checkOnly = process.argv.includes("--check");
const syllabus = loadSyllabus();
const progress = YAML.parse(fs.readFileSync(path.join(ROOT, "progress.yaml"), "utf8"));
const pageSize = Number(process.env.ANKI_PAGE_SIZE || progress.cards_per_page);
if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 200) throw new Error("1ページの上限は1〜200枚です");
const order = new Map(syllabus.categories.map((item) => [item.id, item.order]));
const categoryName = new Map(syllabus.categories.map((item) => [item.id, item.name]));
const subcategoryName = new Map(Object.entries(syllabus.subcategories));
const cards = readCards().sort((a, b) => order.get(a.category) - order.get(b.category) || a.id.localeCompare(b.id, "ja"));
const escape = (value = "") => String(value).replace(/[&<>\"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);

function inline(text) {
  const tokens = [];
  const held = text.replace(/\$\$([\s\S]*?)\$\$|(?<!\$)\$([^\n$]+?)\$(?!\$)/g, (_, display, short) => {
    const latex = display ?? short;
    const html = katex.renderToString(latex, { displayMode: display !== undefined, throwOnError: true, output: "html", strict: "error" });
    const wrapped = display !== undefined
      ? `<div class="math-display" role="img" aria-label="${escape(latex)}" data-latex="${escape(latex)}">${html}</div>`
      : `<span class="math-inline" role="img" aria-label="${escape(latex)}" data-latex="${escape(latex)}">${html}</span>`;
    tokens.push(wrapped);
    return `\u0000${tokens.length - 1}\u0000`;
  });
  let html = escape(held)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
  return html;
}

function markdown(text = "") {
  const lines = text.trim().split(/\r?\n/);
  const out = [];
  let paragraph = [];
  let list = false;
  const flush = () => {
    if (paragraph.length) {
      const joined = paragraph.join("\n");
      out.push(/^\$\$[\s\S]*\$\$$/.test(joined.trim()) ? inline(joined) : `<p>${inline(paragraph.join(" "))}</p>`);
    }
    paragraph = [];
    if (list) out.push("</ul>");
    list = false;
  };
  for (const line of lines) {
    if (!line.trim()) { flush(); continue; }
    const heading = line.match(/^(#{1,3})\s+(.+)/);
    if (heading) { flush(); out.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`); continue; }
    const bullet = line.match(/^[-*]\s+(.+)/);
    if (bullet) {
      if (paragraph.length) { out.push(`<p>${inline(paragraph.join(" "))}</p>`); paragraph = []; }
      if (!list) { out.push("<ul>"); list = true; }
      out.push(`<li>${inline(bullet[1])}</li>`);
    } else if (/^\$\$/.test(line) || paragraph.some((item) => /^\$\$/.test(item))) {
      if (/^\$\$/.test(line) && paragraph.length && !paragraph.some((item) => /^\$\$/.test(item))) flush();
      paragraph.push(line);
      if ((paragraph.join("\n").match(/\$\$/g) || []).length === 2) flush();
    } else {
      paragraph.push(line);
    }
  }
  flush();
  return out.join("\n");
}

function renderCard(card, index) {
  const question = markdown(card.sections["問題"]);
  const answerSections = Object.entries(card.sections).filter(([name]) => name !== "問題");
  const tags = card.hashtags.map((tag) => `<button class="tag" type="button" data-tag-action="${escape(tag)}">#${escape(tag)}</button>`).join("");
  const search = plainText(`${card.title} ${card.topic} ${card.body} ${card.hashtags.join(" ")}`).toLowerCase();
  const frequency = Object.values(card.frequency || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  return `<article class="card" id="${escape(card.id)}" data-category="${escape(card.category)}" data-subcategory="${escape(card.subcategory)}" data-difficulty="${card.difficulty}" data-priority="${escape(card.priority)}" data-frequency="${frequency}" data-title="${escape(card.title)}" data-order="${index}" data-tags="${escape(card.hashtags.join("|"))}" data-search="${escape(search)}">
    <header class="card-head"><span class="type type-${escape(card.type)}">${escape(card.type)}</span><span>難易度 ${card.difficulty}</span><span class="priority">優先度 ${escape(card.priority)}</span><span>${escape(categoryName.get(card.category))}</span><span>${escape(subcategoryName.get(card.subcategory))}</span></header>
    <h2>${escape(card.title)}</h2>
    <section class="question"><h3>問題</h3>${question}</section>
    <details><summary>答えを見る</summary><div class="answer">${answerSections.map(([name, body]) => `<section><h3>${escape(name)}</h3>${markdown(body)}</section>`).join("")}</div></details>
    <footer>${tags}<a class="permalink" href="#${escape(card.id)}" aria-label="このカードへのリンク">#</a></footer>
  </article>`;
}

const template = fs.readFileSync(path.join(ROOT, "templates", "index.html"), "utf8");
const categoryTemplate = fs.readFileSync(path.join(ROOT, "templates", "categories.html"), "utf8");

function splitWithinMeaning(category) {
  const categoryCards = cards.filter((card) => card.category === category.id);
  if (categoryCards.length <= pageSize) return [{ category, subcategory: null, part: 1, cards: categoryCards }];
  return category.children.flatMap((subcategory) => {
    const owned = categoryCards.filter((card) => card.subcategory === subcategory);
    return Array.from({ length: Math.ceil(owned.length / pageSize) }, (_, index) => ({
      category,
      subcategory,
      part: index + 1,
      cards: owned.slice(index * pageSize, (index + 1) * pageSize),
    }));
  }).filter((page) => page.cards.length);
}

const pages = syllabus.categories.flatMap(splitWithinMeaning);
const renderedIds = pages.flatMap((page) => page.cards.map((card) => card.id));
if (renderedIds.length !== cards.length || new Set(renderedIds).size !== cards.length) throw new Error("カテゴリー分割でカードの欠落または重複が発生しました");
const pageFile = (page) => {
  const semantic = page.subcategory ? `-${page.subcategory}` : "";
  const overflow = page.part > 1 ? `-${String(page.part).padStart(3, "0")}` : "";
  return `category-${page.category.id}${semantic}${overflow}.html`;
};
const pageLabel = (page) => page.subcategory
  ? `${subcategoryName.get(page.subcategory)}${page.part > 1 ? ` ${page.part}` : ""}`
  : page.category.name;
const renderNavigation = (active) => `<nav class="page-nav" aria-label="カテゴリー別カードページ"><a href="./index.html">カテゴリー一覧</a>${pages.map((page) => `<a href="./${pageFile(page)}"${page === active ? ' aria-current="page"' : ""}>${escape(pageLabel(page))}</a>`).join("")}</nav>`;
const renderPage = (page) => {
  const pageCards = page.cards;
  const categoryOptions = `<option value="${escape(page.category.id)}">${escape(page.category.name)}</option>`;
  const subcategories = [...new Set(pageCards.map((card) => card.subcategory))].sort((a, b) => subcategoryName.get(a).localeCompare(subcategoryName.get(b), "ja"));
  const subcategoryOptions = subcategories.map((item) => `<option value="${escape(item)}">${escape(subcategoryName.get(item))}</option>`).join("");
  const allTags = [...new Set(pageCards.flatMap((card) => card.hashtags))].sort((a, b) => a.localeCompare(b, "ja"));
  const tagButtons = allTags.map((tag) => `<button type="button" class="filter-chip" data-filter-tag="${escape(tag)}">#${escape(tag)}</button>`).join("");
  return template
  .replaceAll("{{PAGE_TITLE}}", escape(pageLabel(page)))
  .replaceAll("{{CARD_COUNT}}", String(pageCards.length))
  .replaceAll("{{TOTAL_COUNT}}", String(cards.length))
  .replace("{{CATEGORY_OPTIONS}}", categoryOptions)
  .replace("{{SUBCATEGORY_OPTIONS}}", subcategoryOptions)
  .replace("{{TAG_BUTTONS}}", tagButtons)
  .replaceAll("{{PAGE_NAV}}", renderNavigation(page))
  .replace("{{CARDS}}", pageCards.map((card) => renderCard(card, cards.indexOf(card))).join("\n"));
};
const generatedPages = pages.map((page) => ({ page, html: renderPage(page) }));
const categoryLinks = syllabus.categories.map((category) => {
  const ownedPages = pages.filter((page) => page.category.id === category.id);
  const count = ownedPages.reduce((sum, page) => sum + page.cards.length, 0);
  const links = ownedPages.map((page) => `<a href="./${pageFile(page)}">${escape(pageLabel(page))}<span>${page.cards.length}枚</span></a>`).join("");
  return `<section class="category-entry"><p>${escape(category.section)}</p><h2>${escape(category.name)}</h2><strong>${count}枚</strong><div>${links}</div></section>`;
}).join("\n");
const categoryIndex = categoryTemplate
  .replaceAll("{{TOTAL_COUNT}}", String(cards.length))
  .replace("{{CATEGORY_LINKS}}", categoryLinks);
const notationBody = markdown(fs.readFileSync(path.join(ROOT, "notation.md"), "utf8"));
const favicon = `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23171914'/%3E%3Ctext x='32' y='45' text-anchor='middle' font-size='38' fill='%23d8ff37'%3EΣ%3C/text%3E%3C/svg%3E">`;
const notationHtml = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>記法一覧 | 統計検定1級 解法定跡カード</title>${favicon}<link rel="stylesheet" href="./assets/katex.min.css"><link rel="stylesheet" href="./assets/style.css"></head><body><main class="notation-page"><p><a href="./index.html">← カードへ戻る</a></p>${notationBody}</main></body></html>`;
const formulaeBody = markdown(fs.readFileSync(path.join(ROOT, "formulae.md"), "utf8"));
const formulaeHtml = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>公式・定理・定義 | 統計検定1級 解法定跡カード</title>${favicon}<link rel="stylesheet" href="./assets/katex.min.css"><link rel="stylesheet" href="./assets/style.css"></head><body><main class="notation-page"><p><a href="./index.html">← カードへ戻る</a></p>${formulaeBody}</main></body></html>`;
const dist = path.join(ROOT, "dist");
const expectedHtml = new Map([
  ["index.html", categoryIndex],
  ["notation.html", notationHtml],
  ["formulae.html", formulaeHtml],
  ...generatedPages.map(({ page, html }) => [pageFile(page), html]),
]);
for (const [name, html] of expectedHtml) {
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!/^(?:\.\/|#|data:)/.test(match[1])) throw new Error(`ローカルリンクは ./ で始めます: ${name}: ${match[1]}`);
  }
}

if (!checkOnly) {
  fs.mkdirSync(path.join(dist, "assets", "fonts"), { recursive: true });
  for (const old of fs.readdirSync(dist).filter((name) => /^(?:cards-\d{3}|category-[a-z0-9-]+)\.html$/.test(name))) fs.unlinkSync(path.join(dist, old));
  fs.writeFileSync(path.join(dist, "index.html"), categoryIndex);
  generatedPages.forEach(({ page, html }) => fs.writeFileSync(path.join(dist, pageFile(page)), html));
  fs.writeFileSync(path.join(dist, "notation.html"), notationHtml);
  fs.writeFileSync(path.join(dist, "formulae.html"), formulaeHtml);
  fs.copyFileSync(path.join(ROOT, "static", "style.css"), path.join(dist, "assets", "style.css"));
  fs.copyFileSync(path.join(ROOT, "static", "app.js"), path.join(dist, "assets", "app.js"));
  fs.copyFileSync(path.resolve(ROOT, "..", "node_modules", "katex", "dist", "katex.min.css"), path.join(dist, "assets", "katex.min.css"));
  const fontSource = path.resolve(ROOT, "..", "node_modules", "katex", "dist", "fonts");
  for (const font of fs.readdirSync(fontSource).filter((name) => name.endsWith(".woff2"))) {
    fs.copyFileSync(path.join(fontSource, font), path.join(dist, "assets", "fonts", font));
  }
} else {
  const actualHtml = fs.existsSync(dist) ? fs.readdirSync(dist).filter((name) => name.endsWith(".html")) : [];
  for (const [name, expected] of expectedHtml) {
    const target = path.join(dist, name);
    if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== expected) throw new Error(`生成HTMLが未更新です: dist/${name}（npm run anki:build を実行してください）`);
  }
  for (const name of actualHtml) if (!expectedHtml.has(name)) throw new Error(`不要な生成HTMLが残っています: dist/${name}`);
  const katexRoot = path.resolve(ROOT, "..", "node_modules", "katex", "dist");
  const textAssets = [[path.join(ROOT, "static", "style.css"), path.join(dist, "assets", "style.css")], [path.join(ROOT, "static", "app.js"), path.join(dist, "assets", "app.js")], [path.join(katexRoot, "katex.min.css"), path.join(dist, "assets", "katex.min.css")]];
  for (const [source, target] of textAssets) {
    if (!fs.existsSync(target) || !fs.readFileSync(source).equals(fs.readFileSync(target))) throw new Error(`生成資産が未更新です: ${path.relative(ROOT, target)}`);
  }
  const sourceFonts = fs.readdirSync(path.join(katexRoot, "fonts")).filter((name) => name.endsWith(".woff2")).sort();
  const targetFontDir = path.join(dist, "assets", "fonts");
  const targetFonts = fs.existsSync(targetFontDir) ? fs.readdirSync(targetFontDir).filter((name) => name.endsWith(".woff2")).sort() : [];
  if (sourceFonts.join("\n") !== targetFonts.join("\n")) throw new Error("KaTeXフォントの集合が未更新です");
  for (const font of sourceFonts) if (!fs.readFileSync(path.join(katexRoot, "fonts", font)).equals(fs.readFileSync(path.join(targetFontDir, font)))) throw new Error(`KaTeXフォントが未更新です: ${font}`);
  const offlineTexts = [...expectedHtml.values(), ...textAssets.map(([source]) => fs.readFileSync(source, "utf8"))];
  const withoutSvgNamespace = (body) => body.replace(/xmlns=["']http:\/\/www\.w3\.org\/2000\/svg["']/gi, "");
  if (offlineTexts.some((body) => /(?:https?:)?\/\/[a-z0-9]/i.test(withoutSvgNamespace(body)))) throw new Error("配信HTMLまたは資産に外部ネットワークURLがあります");
}
if (generatedPages.some(({ html }) => !html.includes("katex"))) throw new Error("数式がビルド時レンダリングされていません");
if (pages.some((page) => page.cards.length > pageSize)) throw new Error(`1ページが${pageSize}枚を超えています`);
console.log(`${checkOnly ? "checked" : "built"} ${cards.length} cards in ${pages.length} category page(s), max ${pageSize} per page`);
