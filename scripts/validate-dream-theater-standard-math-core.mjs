import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const repoRoot = process.cwd();
const curriculumPath = path.join(repoRoot, 'textbook', 'dream-theater-standard-math-core.yaml');
const indexPath = path.join(repoRoot, 'textbook', 'dream-theater-index.json');
const facadePath = path.join(repoRoot, 'textbook', 'dream-theater.md');

const fail = (errors) => {
  console.error('DREAM THEATER standard math core validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
};

const errors = [];
for (const required of [curriculumPath, indexPath, facadePath]) {
  if (!fs.existsSync(required)) errors.push(`required file does not exist: ${path.relative(repoRoot, required)}`);
}
if (errors.length) fail(errors);

let curriculum;
try {
  curriculum = parse(fs.readFileSync(curriculumPath, 'utf8'));
} catch (error) {
  fail([`cannot parse YAML: ${error.message}`]);
}

let index;
try {
  index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
} catch (error) {
  fail([`cannot parse dream-theater-index.json: ${error.message}`]);
}

if (curriculum?.schema_version !== 2) errors.push('schema_version must be 2');
if (curriculum?.id !== 'dream-theater-standard-math-core') errors.push('id must be dream-theater-standard-math-core');
if (!Array.isArray(curriculum?.nodes) || curriculum.nodes.length === 0) errors.push('nodes must be a non-empty array');
if (!Array.isArray(curriculum?.implementation_batches) || curriculum.implementation_batches.length === 0) {
  errors.push('implementation_batches must be a non-empty array');
}

const allowedStatuses = new Set(curriculum?.status_values ?? []);
const allowedTiers = new Set(curriculum?.tier_values ?? []);
for (const requiredStatus of ['planned', 'implemented', 'existing-anchor']) {
  if (!allowedStatuses.has(requiredStatus)) errors.push(`status_values must include ${requiredStatus}`);
}

const indexedChapterPaths = new Set();
const indexedChapterDirs = [];
for (const section of index?.sections ?? []) {
  for (const chapterPath of section?.paths ?? []) {
    indexedChapterPaths.add(chapterPath.split(path.sep).join('/'));
    indexedChapterDirs.push(path.basename(path.dirname(chapterPath)));
  }
}

const resolveReuse = (reuse) => indexedChapterDirs.filter((dir) => dir === reuse || dir.startsWith(`${reuse}_`));
const nodesById = new Map();
const edgeKeys = new Set();
let edgeCount = 0;

for (const node of curriculum?.nodes ?? []) {
  if (!node || typeof node !== 'object') {
    errors.push('every node must be an object');
    continue;
  }
  const { id, title, area, tier, status } = node;
  if (typeof id !== 'string' || !/^[A-Z][A-Z0-9-]*(?:[A-Z0-9])?$/.test(id)) {
    errors.push(`invalid node id: ${String(id)}`);
    continue;
  }
  if (nodesById.has(id)) errors.push(`duplicate node id: ${id}`);
  nodesById.set(id, node);
  if (typeof title !== 'string' || title.trim() === '') errors.push(`${id}: title must be a non-empty string`);
  if (typeof area !== 'string' || area.trim() === '') errors.push(`${id}: area must be a non-empty string`);
  if (!allowedTiers.has(tier)) errors.push(`${id}: tier is not declared in tier_values: ${String(tier)}`);
  if (!allowedStatuses.has(status)) errors.push(`${id}: status is not declared in status_values: ${String(status)}`);
  if (!Array.isArray(node.prerequisites)) errors.push(`${id}: prerequisites must be an array`);
  if (node.reuses !== undefined && !Array.isArray(node.reuses)) errors.push(`${id}: reuses must be an array when present`);

  if (status === 'existing-anchor' && (!Array.isArray(node.reuses) || node.reuses.length === 0)) {
    errors.push(`${id}: existing-anchor must reuse at least one indexed chapter`);
  }
  if (status === 'planned' && node.implementation_path !== undefined) {
    errors.push(`${id}: planned node must not declare implementation_path`);
  }
  if (status === 'implemented') {
    if (typeof node.implementation_path !== 'string' || node.implementation_path.trim() === '') {
      errors.push(`${id}: implemented node must declare implementation_path`);
    } else {
      const relPath = node.implementation_path.split(path.sep).join('/');
      const absPath = path.join(repoRoot, relPath);
      if (!fs.existsSync(absPath)) errors.push(`${id}: implementation_path does not exist: ${relPath}`);
      if (!indexedChapterPaths.has(relPath)) errors.push(`${id}: implementation_path is not in dream-theater-index.json: ${relPath}`);
      const chapterYamlPath = path.join(path.dirname(absPath), 'chapter.yaml');
      if (!fs.existsSync(chapterYamlPath)) {
        errors.push(`${id}: implemented chapter is missing chapter.yaml`);
      } else {
        try {
          const chapter = parse(fs.readFileSync(chapterYamlPath, 'utf8'));
          if (chapter?.id !== id) errors.push(`${id}: chapter.yaml id mismatch: ${String(chapter?.id)}`);
        } catch (error) {
          errors.push(`${id}: cannot parse chapter.yaml: ${error.message}`);
        }
      }
    }
  }

  for (const reuse of node.reuses ?? []) {
    if (typeof reuse !== 'string' || reuse.trim() === '') {
      errors.push(`${id}: reuse ids must be non-empty strings`);
      continue;
    }
    const matches = resolveReuse(reuse);
    if (matches.length === 0) errors.push(`${id}: reused chapter is not in dream-theater-index.json: ${reuse}`);
    if (matches.length > 1) errors.push(`${id}: reused chapter id is ambiguous: ${reuse} -> ${matches.join(', ')}`);
  }
}

for (const [id, node] of nodesById) {
  const seenDeps = new Set();
  for (const dependency of node.prerequisites ?? []) {
    if (typeof dependency !== 'string') {
      errors.push(`${id}: prerequisite ids must be strings`);
      continue;
    }
    if (dependency === id) errors.push(`${id}: self-dependency is not allowed`);
    if (seenDeps.has(dependency)) errors.push(`${id}: duplicate prerequisite: ${dependency}`);
    seenDeps.add(dependency);
    if (!nodesById.has(dependency)) errors.push(`${id}: prerequisite does not exist: ${dependency}`);
    const edgeKey = `${dependency}->${id}`;
    if (edgeKeys.has(edgeKey)) errors.push(`${id}: duplicate dependency edge: ${edgeKey}`);
    edgeKeys.add(edgeKey);
    edgeCount += 1;
  }
}

const visitState = new Map();
const stack = [];
const visit = (id) => {
  const state = visitState.get(id) ?? 0;
  if (state === 2) return;
  if (state === 1) {
    const cycleStart = stack.indexOf(id);
    errors.push(`dependency cycle: ${[...stack.slice(cycleStart), id].join(' -> ')}`);
    return;
  }
  visitState.set(id, 1);
  stack.push(id);
  for (const dependency of nodesById.get(id)?.prerequisites ?? []) {
    if (nodesById.has(dependency)) visit(dependency);
  }
  stack.pop();
  visitState.set(id, 2);
};
for (const id of nodesById.keys()) visit(id);

const scheduledStatuses = new Set(['planned', 'implemented']);
const batchByNode = new Map();
const seenBatchIds = new Set();
const batchOrders = [];
for (const batch of curriculum?.implementation_batches ?? []) {
  if (!batch || typeof batch !== 'object') {
    errors.push('every implementation batch must be an object');
    continue;
  }
  if (!Number.isInteger(batch.order) || batch.order < 1) errors.push(`invalid implementation batch order: ${String(batch.order)}`);
  batchOrders.push(batch.order);
  if (typeof batch.id !== 'string' || batch.id.trim() === '') errors.push(`batch ${batch.order}: id must be a non-empty string`);
  if (seenBatchIds.has(batch.id)) errors.push(`duplicate implementation batch id: ${batch.id}`);
  seenBatchIds.add(batch.id);
  if (!Array.isArray(batch.nodes) || batch.nodes.length === 0) {
    errors.push(`batch ${batch.id ?? batch.order}: nodes must be a non-empty array`);
    continue;
  }
  for (const id of batch.nodes) {
    const node = nodesById.get(id);
    if (!node) {
      errors.push(`batch ${batch.id}: unknown node: ${id}`);
      continue;
    }
    if (!scheduledStatuses.has(node.status)) {
      errors.push(`batch ${batch.id}: only planned/implemented nodes may appear, got ${id} (${node.status})`);
    }
    if (batchByNode.has(id)) errors.push(`scheduled node appears in multiple batches: ${id}`);
    batchByNode.set(id, batch.order);
  }
}

const sortedOrders = [...new Set(batchOrders)].sort((a, b) => a - b);
for (let i = 0; i < sortedOrders.length; i += 1) {
  if (sortedOrders[i] !== i + 1) errors.push(`implementation batch orders must be contiguous from 1; got ${sortedOrders.join(', ')}`);
}

const scheduledIds = [...nodesById.entries()]
  .filter(([, node]) => scheduledStatuses.has(node.status))
  .map(([id]) => id);
for (const id of scheduledIds) {
  if (!batchByNode.has(id)) errors.push(`planned/implemented node is missing from implementation_batches: ${id}`);
}

const ancestorMemo = new Map();
const ancestorsOf = (id) => {
  if (ancestorMemo.has(id)) return ancestorMemo.get(id);
  const result = new Set();
  for (const dependency of nodesById.get(id)?.prerequisites ?? []) {
    result.add(dependency);
    if (nodesById.has(dependency)) {
      for (const ancestor of ancestorsOf(dependency)) result.add(ancestor);
    }
  }
  ancestorMemo.set(id, result);
  return result;
};

if (!errors.some((error) => error.startsWith('dependency cycle:'))) {
  for (const id of scheduledIds) {
    const nodeBatch = batchByNode.get(id);
    if (nodeBatch === undefined) continue;
    for (const ancestor of ancestorsOf(id)) {
      const ancestorNode = nodesById.get(ancestor);
      if (!scheduledStatuses.has(ancestorNode?.status)) continue;
      const ancestorBatch = batchByNode.get(ancestor);
      if (ancestorBatch !== undefined && ancestorBatch > nodeBatch) {
        errors.push(`${id}: prerequisite ${ancestor} is scheduled later (batch ${ancestorBatch} > ${nodeBatch})`);
      }
    }
  }
}

if (!Array.isArray(curriculum?.deferred_integrations)) {
  errors.push('deferred_integrations must be an array');
} else {
  const required = new Set(['dream-theater-facade-entrypoint', 'docsify-mermaid-rendering']);
  const facadeText = fs.readFileSync(facadePath, 'utf8');
  for (const item of curriculum.deferred_integrations) {
    if (!item || typeof item.id !== 'string') {
      errors.push('every deferred integration must have a string id');
      continue;
    }
    required.delete(item.id);
    if (!['deferred', 'completed'].includes(item.status)) errors.push(`${item.id}: integration status must be deferred or completed`);
    if (typeof item.trigger !== 'string' || item.trigger.trim() === '') errors.push(`${item.id}: trigger must be a non-empty string`);
    if (typeof item.note !== 'string' || item.note.trim() === '') errors.push(`${item.id}: note must be a non-empty string`);

    if (item.id === 'dream-theater-facade-entrypoint' && item.status === 'completed') {
      if (!facadeText.includes('textbook/dream-theater-standard-math-core.md')) {
        errors.push('dream-theater-facade-entrypoint: facade must link to textbook/dream-theater-standard-math-core.md');
      }
      if (facadeText.includes('F0_01_統計のための微積分_線形代数_答案記法/index.md')) {
        errors.push('dream-theater-facade-entrypoint: deprecated F0-01 direct link still exists in dream-theater.md');
      }
    }
    if (item.id === 'docsify-mermaid-rendering' && item.status !== 'deferred') {
      errors.push('docsify-mermaid-rendering must remain deferred until site-rendering work is done');
    }
  }
  for (const id of required) errors.push(`required integration is missing: ${id}`);
}

if (errors.length) fail(errors);

const plannedCount = [...nodesById.values()].filter((node) => node.status === 'planned').length;
const implementedCount = [...nodesById.values()].filter((node) => node.status === 'implemented').length;
const existingCount = [...nodesById.values()].filter((node) => node.status === 'existing-anchor').length;
console.log(
  `DREAM THEATER standard math core OK: ${nodesById.size} nodes ` +
  `(${plannedCount} planned / ${implementedCount} implemented / ${existingCount} existing anchors), ` +
  `${edgeCount} prerequisite edges, ${curriculum.implementation_batches.length} implementation batches; DAG is closed and acyclic.`,
);
