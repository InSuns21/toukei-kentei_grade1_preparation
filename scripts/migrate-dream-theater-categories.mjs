/**
 * DREAM THEATER category migration, one-time deterministic repository transform.
 *
 * Use ONLY on an isolated git branch. This is deliberately not a generator that
 * changes lecture status or material; all indexed chapter trees move intact.
 * --apply: mutate tracked files and git mv every canonical indexed chapter.
 * --check: read-only verification that the new manifest and folders agree.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';

const OLD = 'textbook/volumes/00_foundations';
const ROOT = 'textbook/volumes/dream_thater';
const INDEX = 'textbook/dream-theater-index.json';
const SERIES = 'textbook/dream-theater-series';
const cwd = process.cwd();
const apply = process.argv.includes('--apply');
const check = process.argv.includes('--check');
if (apply === check) throw new Error('Choose exactly one of --apply or --check');
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, body) => fs.writeFileSync(p, body, 'utf8');
const exists = (p) => fs.existsSync(p);
const posix = (p) => p.split(path.sep).join('/');
const tracked = () => execFileSync('git', ['ls-files', '-z'], {encoding:'utf8', maxBuffer: 100*1024*1024}).split('\0').filter(Boolean);
const CATEGORY_NAMES = ['基礎科目','基礎論系','解析系','計算系','幾何系','代数系','応用系','物理系'];
const index = JSON.parse(read(INDEX));
const actualNames = index.sections.map(s => s.name);
if (JSON.stringify(actualNames) !== JSON.stringify(CATEGORY_NAMES)) {
  throw new Error('Published category list differs; inspect index before migrating');
}
const mapping = new Map();
const seriesCategories = new Map();
const idCategories = new Map();
const errors = [];
for (const section of index.sections) {
  for (const item of section.paths) {
    if (typeof item !== 'string' || !item.endsWith('/index.md')) throw new Error('Unexpected index entry: '+item);
    const oldDir = path.posix.dirname(item);
    let id;
    let destDir;
    if (oldDir.startsWith(OLD+'/')) {
      const chapterPath = oldDir+'/chapter.yaml';
      if (!exists(chapterPath)) throw new Error('Missing: '+chapterPath);
      id = YAML.parse(read(chapterPath))?.id;
      destDir = ROOT+'/'+section.name+'/'+id;
      if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(id)) throw new Error('Invalid ID: '+id);
      if (!exists(oldDir)) throw new Error('Missing source: '+oldDir);
    } else if (oldDir.startsWith(ROOT+'/'+section.name+'/')) {
      id = path.posix.basename(oldDir);
      destDir = oldDir;
    } else throw new Error('Unexpected category path: '+oldDir);
    if (idCategories.has(id)) throw new Error('Duplicate ID: '+id);
    idCategories.set(id, section.name);
    if (mapping.has(oldDir)) throw new Error('Duplicate source: '+oldDir);
    mapping.set(oldDir, destDir);
  }
}
if (idCategories.size < 500) throw new Error('Suspiciously few indexed DREAM THEATER chapters: '+idCategories.size);
const sortedMappings = [...mapping].sort((a,b)=>b[0].length-a[0].length);
const sourceToDest = new Map(sortedMappings.filter(([s,t])=>s!==t));

for (const file of fs.readdirSync(SERIES).filter(x=>x.endsWith('.yaml'))) {
  const rel = SERIES+'/'+file;
  const data = YAML.parse(read(rel));
  const cats = [...new Set((data.chapters??[]).map(ch=>idCategories.get(ch.id)).filter(Boolean))];
  if (cats.length !== 1) {
    throw new Error('Series category unresolved/ambiguous: '+file+' '+cats.join(','));
  }
  seriesCategories.set(data.id,cats[0]);
}

function mappedPath(value) {
  // Resolve longest paths first: F0_00A1C must not be masked by F0_00A.
  for (const [src, dest] of sortedMappings) {
    if (value===src || value.startsWith(src+'/')) return dest+value.slice(src.length);
  }
  return value;
}

// Regenerate relative hyperlinks from the original file location, not from
// the post-move file location. This preserves sibling stable-anchor links when
// moving between categories (../SYM5 is no longer a sibling of ../GEO7).
function rewriteRelative(href, oldFile, newFile) {
  if (!href || /^(?:https?:|mailto:|tel:|data:|javascript:|#|\/)/i.test(href)) return href;
  if (href.startsWith('textbook/') || href.startsWith('references/') ||
      href.startsWith('anki/') || href.startsWith('pages/') ||
      href.startsWith('statistical-mathematics/') ||
      href.startsWith('applied-rikou-80/')) return mappedPath(href);
  const cut = href.search(/[?#]/);
  const pathname = cut === -1 ? href : href.slice(0,cut);
  const suffix = cut === -1 ? '' : href.slice(cut);
  if (!pathname || !/^(?:\.\.?\/)/.test(pathname)) return href;
  const absoluteOld = path.posix.normalize(path.posix.join(path.posix.dirname(oldFile),pathname));
  const absoluteNew = mappedPath(absoluteOld);
  const newDir = path.posix.dirname(newFile);
  let relative = path.posix.relative(newDir,absoluteNew);
  if (!relative) relative = '.';
  if (!relative.startsWith('.')) relative = './'+relative;
  return relative+suffix;
}
function rewriteLinks(text, oldFile, newFile) {
  // Keep Markdown anchors intact and transform only actual link targets.
  let out = text.replace(/(!?\[[^\]\n]*\]\()([^\s)]+)(\))/g,
    (all,begin,href,end)=>begin+rewriteRelative(href,oldFile,newFile)+end);
  // HTML source/src/href links are root or chapter relative.
  out = out.replace(/(\b(?:href|src)=["'])([^"'<>]+)(["'])/g,
    (all,begin,href,end)=>begin+rewriteRelative(href,oldFile,newFile)+end);
  return out;
}
function rewriteAbsolute(text) {
  // Real source paths: URL fragments, YAML/JSON strings, JS strings and docs.
  // Preserve non-indexed archive and ordinary chapters at 00_foundations.
  for (const [src,dest] of sortedMappings) {
    if (src !== dest) text=text.split(src).join(dest);
  }
  return text;
}
const TEXT_FILE = /\.(?:md|yaml|yml|json|js|mjs|cjs|ts|tsx|jsx|html|css|scss|txt|py|sh|xml|svg|toml|csv)$/i;
const ignore = (p) => p.startsWith('node_modules/') || p.startsWith('_site/') ||
  p.startsWith('dist/') || p.endsWith('package-lock.json');

if (apply) {
  const allPaths = tracked();
  // Map final file -> original path before git mv. Keeps local links correct.
  const origins = new Map();
  for (const file of allPaths) origins.set(mappedPath(file), file);
  for (const [from,to] of sourceToDest) {
    if (exists(to)) throw new Error('Destination already exists: '+to);
    fs.mkdirSync(path.dirname(to),{recursive:true});
    execFileSync('git',['mv','--',from,to],{stdio:'pipe'});
  }
  // Move the DT-specific authoring rules to the new root, retaining existing
  // rules in old roots for any non-DT educational/support material remaining.
  if (!exists(ROOT+'/AGENTS.md')) {
    fs.copyFileSync(OLD+'/AGENTS.md',ROOT+'/AGENTS.md');
  }

  // Update each series, including future planned chapter IDs, based on its
  // unique published series category. Keep comments, statuses and order.
  for (const [id,cat] of seriesCategories) {
    const filename=SERIES+'/'+id+'.yaml';
    let data=read(filename);
    data=data.replace(/^chapter_root: .*$/m,'chapter_root: '+ROOT);
    const parsed=YAML.parse(data);
    for (const ch of parsed.chapters) {
      const oldPath = ch.path;
      const nextPath = ROOT+'/'+cat+'/'+ch.id;
      if (!data.includes('path: '+oldPath)) throw new Error('Series path not found: '+filename+' / '+ch.id);
      data=data.replace('path: '+oldPath,'path: '+nextPath);
    }
    write(filename,data);
  }
  const router='textbook/dream-theater-work.yaml';
  write(router,read(router).replace('chapter_root: '+OLD,'chapter_root: '+ROOT));

  // Mark canonical index entries first, then rewrite other content.
  for (const s of index.sections) s.paths=s.paths.map(p=>mappedPath(p));
  write(INDEX,JSON.stringify(index,null,2)+'\n');

  let revised=0;
  const files=tracked();
  for (const filename of files) {
    if (!TEXT_FILE.test(filename) || ignore(filename) || !exists(filename)) continue;
    if (!fs.statSync(filename).isFile()) continue;
    const oldFilename=origins.get(filename)||filename;
    const src=read(filename);
    let dest=rewriteLinks(src,oldFilename,filename);
    dest=rewriteAbsolute(dest);
    // Do not rewrite route fixtures in JS code unless their target is real.
    if (dest!==src) {write(filename,dest);revised++;}
  }
  // Textbook-level rules: new DT scope must travel with migrated articles.
  const scoped=ROOT+'/AGENTS.md';
  const current=read(scoped);
  write(scoped,current.replaceAll('textbook/volumes/00_foundations/**','textbook/volumes/dream_thater/**'));
  console.log('Migrated '+sourceToDest.size+' directories; revised '+revised+' text files.');
}

const after=JSON.parse(read(INDEX));
let checked=0;
for (const s of after.sections) {
  for (const href of s.paths) {
    const dir=path.posix.dirname(href), id=path.posix.basename(dir);
    if (dir !== ROOT+'/'+s.name+'/'+id) errors.push('Invalid destination: '+dir);
    if (!exists(href)) errors.push('Missing index: '+href);
    if (!exists(dir+'/chapter.yaml')) errors.push('Missing metadata: '+dir);
    else if (YAML.parse(read(dir+'/chapter.yaml'))?.id!==id) errors.push('ID drift: '+dir);
    checked++;
  }
}
if (exists(ROOT)) {
  for (const category of fs.readdirSync(ROOT,{withFileTypes:true}).filter(d=>d.isDirectory())) {
    for (const entry of fs.readdirSync(ROOT+'/'+category.name,{withFileTypes:true}).filter(d=>d.isDirectory())) {
      const file=ROOT+'/'+category.name+'/'+entry.name+'/index.md';
      if (exists(file) && !after.sections.some(s=>s.paths.includes(file))) errors.push('Orphan: '+file);
    }
  }
}
for (const [id,cat] of seriesCategories) {
  const f=SERIES+'/'+id+'.yaml', m=YAML.parse(read(f));
  for(const ch of m.chapters) {
    if(ch.path!==ROOT+'/'+cat+'/'+ch.id) errors.push('Series drift: '+id+' '+ch.id);
  }
}
if (errors.length) {
  console.error(errors.slice(0,80).join('\n'));
  throw new Error('Migration validation failed: '+errors.length+' issues');
}
console.log('Category migration '+(apply?'applied':'checked')+': '+checked+' indexed chapters, '+seriesCategories.size+' series, '+CATEGORY_NAMES.length+' categories.');
