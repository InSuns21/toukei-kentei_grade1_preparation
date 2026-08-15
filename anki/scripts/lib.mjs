import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export const ROOT = path.resolve(import.meta.dirname, "..");

export function walk(dir) {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
      })
    : [];
}

export function readCards() {
  return walk(path.join(ROOT, "cards"))
    .filter((file) => file.endsWith(".md"))
    .flatMap((file) => parseCards(file))
    .filter((card) => card.published !== false);
}

export function parseCards(file) {
  const source = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const chunks = source.split(/^<!-- CARD -->\s*$/m).map((part) => part.trim()).filter(Boolean);
  return chunks.map((chunk) => parseCardChunk(file, chunk));
}

function parseCardChunk(file, source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${path.relative(ROOT, file)}: カードの YAML front matter がありません`);
  const meta = YAML.parse(match[1]);
  const body = match[2].trim();
  const sections = {};
  let current = "";
  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = heading[1].trim();
      sections[current] = [];
    } else if (current) {
      sections[current].push(line);
    }
  }
  return {
    ...meta,
    file,
    body,
    sections: Object.fromEntries(Object.entries(sections).map(([key, lines]) => [key, lines.join("\n").trim()])),
  };
}

export function loadSyllabus() {
  return YAML.parse(fs.readFileSync(path.join(ROOT, "syllabus", "syllabus.yaml"), "utf8"));
}

export function baselineFile(workId) {
  return path.join(ROOT, ".state", `${workId}-baseline.yaml`);
}

export function readBaseline(workId) {
  const file = baselineFile(workId);
  return fs.existsSync(file) ? YAML.parse(fs.readFileSync(file, "utf8")) : null;
}

export function plainText(value = "") {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$+/g, " ")
    .replace(/[\\*_`#>\[\](){}|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
