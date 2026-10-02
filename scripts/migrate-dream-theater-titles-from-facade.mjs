import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const facadePath = path.join(root, 'textbook', 'dream-theater.md');
const manifestPath = path.join(root, 'textbook', 'dream-theater-index.json');

const overrides = new Map([
  ['textbook/volumes/00_foundations/NA6/index.md', 'NA6 常微分方程式の一段法と収束'],
  ['textbook/volumes/00_foundations/NA7/index.md', 'NA7 Runge–Kutta 法・絶対安定性'],
  ['textbook/volumes/00_foundations/NA8/index.md', 'NA8 数値線形代数の直接法'],
  ['textbook/volumes/00_foundations/NA9/index.md', 'NA9 数値線形代数の反復法・Krylov 法'],
  ['textbook/volumes/00_foundations/GEO10/index.md', 'GEO10 Euclid 空間の曲線・超曲面：基本形式と形作用素'],
  ['textbook/volumes/00_foundations/GEO11/index.md', 'GEO11 Euclid 空間の超曲面：構造方程式・Gauss--Codazzi・基本定理'],
  ['textbook/volumes/00_foundations/OPT10/index.md', 'OPT10 多面体・極点・線形計画双対'],
  ['textbook/volumes/00_foundations/OPT11/index.md', 'OPT11 単体法・内点法・感度解析'],
]);

const facade = fs.readFileSync(facadePath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const expected = (manifest.sections ?? []).flatMap((section) => section.paths ?? []);
const expectedSet = new Set(expected);

const linkPattern = /\[([^\]]+)\]\((textbook\/volumes\/00_foundations\/[^)]+\/index\.md)\)/g;
const labels = new Map();
for (const match of facade.matchAll(linkPattern)) {
  if (!expectedSet.has(match[2])) continue;
  if (labels.has(match[2])) throw new Error(`duplicate facade link: ${match[2]}`);
  labels.set(match[2], match[1]);
}

for (const rel of expected) {
  if (!labels.has(rel)) throw new Error(`missing facade label for ${rel}`);
}

let changedIndex = 0;
let changedYaml = 0;
for (const rel of expected) {
  const desiredH1 = overrides.get(rel) ?? labels.get(rel);
  const absolute = path.join(root, rel);
  const source = fs.readFileSync(absolute, 'utf8');
  if (!/^#\s+.+$/m.test(source)) throw new Error(`no H1 in ${rel}`);
  const next = source.replace(/^#\s+.+$/m, `# ${desiredH1}`);
  if (next !== source) {
    fs.writeFileSync(absolute, next, 'utf8');
    changedIndex += 1;
  }

  const yamlPath = path.join(path.dirname(absolute), 'chapter.yaml');
  if (!fs.existsSync(yamlPath)) continue;
  const idMatch = /^([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)?)\s+(.+)$/u.exec(desiredH1);
  const desiredTitle = idMatch ? idMatch[2] : desiredH1;
  const yaml = fs.readFileSync(yamlPath, 'utf8');
  if (!/^title:\s*.*$/m.test(yaml)) throw new Error(`no title in ${path.relative(root, yamlPath)}`);
  const yamlNext = yaml.replace(/^title:\s*.*$/m, `title: ${JSON.stringify(desiredTitle)}`);
  if (yamlNext !== yaml) {
    fs.writeFileSync(yamlPath, yamlNext, 'utf8');
    changedYaml += 1;
  }
}

let nextFacade = facade;
for (const [rel, desired] of overrides) {
  const old = labels.get(rel);
  if (!old) throw new Error(`override target not present in facade: ${rel}`);
  nextFacade = nextFacade.replace(`[${old}](${rel})`, `[${desired}](${rel})`);
}
if (nextFacade !== facade) fs.writeFileSync(facadePath, nextFacade, 'utf8');

console.log(`Migrated DREAM THEATER titles: ${changedIndex} H1 files, ${changedYaml} chapter.yaml files, ${overrides.size} facade label overrides.`);
