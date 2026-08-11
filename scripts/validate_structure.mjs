import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const root = process.cwd();
const errors = [];
const requiredRoot = ['AGENTS.md', 'README.md', 'curriculum.yaml', 'notation.md', 'style-guide.md', 'dependency-graph.md', 'references/distribution-notation-guide.md', 'references/past-exam-trends.md', 'references/past-exam-index.yaml'];
const requiredChapter = ['00_overview.md', '01_motivation.md', '02_definitions.md', '03_theorems.md', '04_examples.md', '05_problem_solving.md', '06_exercises.md', '07_solutions.md', '08_exam_drill.md', '09_past_exam_practice.md', 'chapter.yaml', 'glossary.yaml', 'review/validation.md'];
for (const file of requiredRoot) if (!fs.existsSync(path.join(root, file))) errors.push(`必須ファイルがありません: ${file}`);
validateDistributionGuide(errors);

let data;
try { data = YAML.parse(fs.readFileSync(path.join(root, 'curriculum.yaml'), 'utf8')); }
catch (error) { errors.push(`curriculum.yaml を解析できません: ${error.message}`); }

if (data) {
  if (data.schema_version !== 1 || data.progress?.schema_version !== 1) errors.push('schema_version は 1 でなければなりません');
  if (data.math_renderer !== 'katex') errors.push('math_renderer は katex でなければなりません');
  const chapters = data.chapters ?? [];
  const ids = new Set();
  for (const chapter of chapters) {
    if (!chapter.id || ids.has(chapter.id)) errors.push(`章IDがないか重複しています: ${chapter.id}`);
    ids.add(chapter.id);
    if (!Array.isArray(chapter.official_scope) || !chapter.official_scope.length) errors.push(`${chapter.id}: official_scope がありません`);
  }
  for (const chapter of chapters) for (const id of chapter.prerequisites ?? []) if (!ids.has(id)) errors.push(`${chapter.id}: 存在しない前提章 ${id}`);
  detectCycles(chapters, errors);
  validateProgress(data, ids, errors);
  validateGeneratedChapters(data, requiredChapter, errors);
}

if (errors.length) {
  console.error(`構造検証で ${errors.length} 件の問題が見つかりました:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('教材構造、依存関係、進捗メタデータを検証しました。');

function validateProgress(data, ids, errors) {
  const valid = ['planned', 'drafting', 'self_review', 'independent_review', 'revision', 'reviewed', 'blocked'];
  const states = data.progress?.chapters ?? {};
  const counts = Object.fromEntries(valid.map((status) => [status, 0]));
  for (const id of ids) {
    const state = states[id];
    if (!state || !valid.includes(state.status)) errors.push(`${id}: 進捗状態が不正です`);
    else {
      counts[state.status] += 1;
      if (state.status === 'reviewed' && (!state.completed_at || Object.values(state.review_result ?? {}).some((v) => v !== 0))) errors.push(`${id}: reviewed の完了情報が不正です`);
      if (state.status === 'blocked' && !state.note) errors.push(`${id}: blocked には理由が必要です`);
    }
  }
  const summary = data.progress?.summary ?? {};
  if (summary.total !== ids.size) errors.push(`progress.summary.total は ${ids.size} でなければなりません`);
  for (const status of valid) if (summary[status] !== counts[status]) errors.push(`progress.summary.${status} が集計と一致しません`);
  const active = [...ids].filter((id) => ['drafting', 'self_review', 'independent_review', 'revision'].includes(states[id]?.status));
  if (active.length > 1) errors.push(`進行中の章が複数あります: ${active.join(', ')}`);
  if ((data.progress.current_chapter ?? null) !== (active[0] ?? null)) errors.push('current_chapter が進捗状態と一致しません');
  const expected = active[0] ?? data.chapters.find((chapter) => states[chapter.id]?.status === 'planned' && (chapter.prerequisites ?? []).every((id) => states[id]?.status === 'reviewed'))?.id ?? null;
  if ((data.progress.next_chapter ?? null) !== expected) errors.push(`next_chapter が不正です（期待値 ${expected}）`);
}

function validateGeneratedChapters(data, required, errors) {
  let pastExamIds = new Set();
  let pastExamEntries = new Map();
  try {
    const index = YAML.parse(fs.readFileSync(path.join(root, 'references', 'past-exam-index.yaml'), 'utf8'));
    const entries = index.entries ?? [];
    pastExamIds = new Set(entries.map((entry) => entry.id));
    pastExamEntries = new Map(entries.map((entry) => [entry.id, entry]));
    for (const item of entries) {
      if (!item.evidence || !['official_problem', 'third_party_topic_index'].includes(item.evidence.source_type)) errors.push(`${item.id}: source_type が不正です`);
      if (!Array.isArray(item.evidence?.confirmed_by) || item.evidence.confirmed_by.length < 1) errors.push(`${item.id}: confirmed_by がありません`);
      if (!['high', 'medium', 'low'].includes(item.evidence?.confidence)) errors.push(`${item.id}: confidence が不正です`);
      if (!item.evidence?.problem_source) errors.push(`${item.id}: problem_source がありません`);
    }
  } catch (error) {
    errors.push(`past-exam-index.yaml を解析できません: ${error.message}`);
  }
  for (const volume of data.volumes ?? []) {
    const directory = path.join(root, volume.directory);
    if (!fs.existsSync(directory)) continue;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).filter((e) => e.isDirectory())) {
      const chapterDir = path.join(directory, entry.name);
      if (!fs.existsSync(path.join(chapterDir, 'chapter.yaml'))) continue;
      for (const name of required) if (!fs.existsSync(path.join(chapterDir, name))) errors.push(`${path.relative(root, chapterDir)}: ${name} がありません`);
      const manifest = YAML.parse(fs.readFileSync(path.join(chapterDir, 'chapter.yaml'), 'utf8'));
      if (!data.chapters.some((chapter) => chapter.id === manifest.id)) errors.push(`${entry.name}: curriculum.yaml にない章ID ${manifest.id}`);
      const state = data.progress?.chapters?.[manifest.id]?.status;
      if (state === 'reviewed') {
        validateReaderAccessibility(chapterDir, manifest.id, errors);
        if (!Array.isArray(manifest.past_exam_alignment) || manifest.past_exam_alignment.length < 2) errors.push(`${manifest.id}: reviewed 章には past_exam_alignment が2件以上必要です`);
        for (const item of manifest.past_exam_alignment ?? []) {
          if (!pastExamIds.has(item.id)) errors.push(`${manifest.id}: 未登録の過去問ID ${item.id}`);
          else if (!(pastExamEntries.get(item.id).chapters ?? []).includes(manifest.id)) errors.push(`${manifest.id}: ${item.id} の索引側 chapters に逆参照がありません`);
        }
        if (!Array.isArray(manifest.integrated_exam_problems) || manifest.integrated_exam_problems.length < 1) errors.push(`${manifest.id}: integrated_exam_problems がありません`);
        const drill = fs.readFileSync(path.join(chapterDir, '08_exam_drill.md'), 'utf8');
        const practice = fs.readFileSync(path.join(chapterDir, '09_past_exam_practice.md'), 'utf8');
        if (!drill.includes('## 過去問傾向との対応')) errors.push(`${manifest.id}: 08_exam_drill.md に過去問傾向との対応がありません`);
        if (!practice.includes('## 実過去問演習')) errors.push(`${manifest.id}: 09_past_exam_practice.md に実過去問演習がありません`);
      }
    }
  }
}

function validateReaderAccessibility(chapterDir, chapterId, errors) {
  const readerFiles = fs.readdirSync(chapterDir)
    .filter((name) => /^0[0-9]_.*\.md$/.test(name));
  const advancedTerms = [
    ['Borel', 'Borel集合'],
    ['Lebesgue', 'Lebesgue測度'],
    ['Tonelli', 'Tonelliの定理'],
    ['ほとんど至る所', '「ほとんど至る所」'],
    ['微分同相', '微分同相'],
    ['零集合', '零集合'],
  ];
  for (const name of readerFiles) {
    const text = fs.readFileSync(path.join(chapterDir, name), 'utf8');
    for (const [needle, label] of advancedTerms) {
      if (text.includes(needle)) errors.push(`${chapterId}/${name}: 初学者向け主線に未導入の測度論用語 ${label} があります`);
    }
  }

  const overview = fs.readFileSync(path.join(chapterDir, '00_overview.md'), 'utf8');
  if (!overview.includes('references/distribution-notation-guide.md')) {
    errors.push(`${chapterId}/00_overview.md: 分布・略語の共通索引への導線がありません`);
  }
  validateAcronymIntroductions(overview, `${chapterId}/00_overview.md`, errors);

  const exercisesPath = path.join(chapterDir, '06_exercises.md');
  if (!fs.existsSync(exercisesPath)) return;
  const exercises = fs.readFileSync(exercisesPath, 'utf8');
  const usesNamedDistribution = /\\operatorname\{(?:Unif|Exp|Poisson|Bin|Bernoulli|Geom|Gamma|Beta|Cauchy|Logistic|Lognormal|Weibull|Hypergeom|NegBin|Multinomial)\}|N(?:_p|_2)?\s*\(|(?:一様|正規|指数|ポアソン|二項|幾何|ガンマ|ベータ|コーシー|ワイブル|ロジスティック|超幾何|負の二項|多項)分布に従/.test(exercises);
  if (usesNamedDistribution && !exercises.includes('## 問題で使う分布の定義')) {
    errors.push(`${chapterId}/06_exercises.md: 分布名を使う問題には「問題で使う分布の定義」が必要です`);
  }
  if (usesNamedDistribution) {
    const definitionBlock = exercises.split('## 問題で使う分布の定義')[1]?.split('\n## ')[0] ?? '';
    if (!/[=]|P\(/.test(definitionBlock)) errors.push(`${chapterId}/06_exercises.md: 分布定義節に確率または密度の式がありません`);
    if (!/[<>]|\\in/.test(definitionBlock)) errors.push(`${chapterId}/06_exercises.md: 分布定義節に母数または台の範囲がありません`);
  }
  validateAcronymIntroductions(exercises, `${chapterId}/06_exercises.md`, errors);
  validateAccessibilityContract(chapterDir, chapterId, errors);
}

function validateAcronymIntroductions(text, label, errors) {
  const terms = [
    ['PMF', '確率質量関数', 'probability mass function'],
    ['PDF', '確率密度関数', 'probability density function'],
    ['CDF', '累積分布関数', 'cumulative distribution function'],
    ['PGF', '確率母関数', 'probability generating function'],
    ['MGF', 'モーメント母関数', 'moment generating function'],
  ];
  for (const [acronym, japanese, english] of terms) {
    if (new RegExp(`\\b${acronym}\\b`).test(text) && (!text.includes(japanese) || !text.includes(english))) {
      errors.push(`${label}: ${acronym} は日本語名・英語名と同じファイルで導入してください`);
    }
  }
}

function validateDistributionGuide(errors) {
  const guidePath = path.join(root, 'references', 'distribution-notation-guide.md');
  if (!fs.existsSync(guidePath)) return;
  const guide = fs.readFileSync(guidePath, 'utf8');
  const required = ['P(X=0)=1-p', 'P(X=1)=p', '0\\leq p\\leq1', 'max(0,n-N+K)', '0<p\\leq1', 'm\\geq2', 'p_i\\geq0', 'Cauchy$(x_0,\\gamma)$ | $x_0\\in\\mathbb R$, $\\gamma>0$, $x\\in\\mathbb R$', '\\mu\\in\\mathbb R', 'c,\\eta>0'];
  for (const needle of required) if (!guide.includes(needle)) errors.push(`distribution-notation-guide.md: 必須の母数・台・式がありません: ${needle}`);
  validateDistributionRows(guide, 'distribution-notation-guide.md', {
    'Bernoulli$(p)$': ['0\\leq p\\leq1', 'k\\in\\{0,1\\}', 'P(X=0)=1-p', 'P(X=1)=p'],
    'Bin$(n,p)$': ['n\\in\\mathbb N', '0\\leq p\\leq1', 'k=0,\\ldots,n', 'P(X=k)'],
    'Hypergeom$(N,K,n)$': ['N\\in\\mathbb N', 'K,n\\in\\{0,\\ldots,N\\}', 'max(0,n-N+K)', 'min(n,K)', 'P(X=k)'],
    'Geom$(p)$': ['0<p\\leq1', 'k=1,2,\\ldots', 'P(X=k)'],
    'NegBin$(r,p)$': ['r\\in\\mathbb N', '0<p\\leq1', 'k=r,r+1,\\ldots', 'P(X=k)'],
    'Poisson$(\\lambda)$': ['\\lambda>0', 'k\\in\\mathbb N_0', 'P(X=k)'],
    'Multinomial$(n;p_1,\\ldots,p_m)$': ['m\\geq2', 'n\\in\\mathbb N', 'p_i\\geq0', '\\sum_i p_i=1', 'x_i\\in\\mathbb N_0', '\\sum_i x_i=n', 'P(\\boldsymbol X=\\boldsymbol x)'],
    'Unif$(a,b)$': ['a<b', 'a<x<b', 'f(x)='],
    '$N(\\mu,\\sigma^2)$': ['\\mu\\in\\mathbb R', '\\sigma>0', 'x\\in\\mathbb R', 'f(x)='],
    'Exp$(\\lambda)$': ['\\lambda>0', 'x>0', 'f(x)='],
    'Gamma$(\\alpha,\\beta)$': ['\\alpha,\\beta>0', 'x>0', 'f(x)='],
    'Beta$(\\alpha,\\beta)$': ['\\alpha,\\beta>0', '0<x<1', 'f(x)='],
    'Lognormal$(\\mu,\\sigma^2)$': ['\\mu\\in\\mathbb R', '\\sigma>0', 'x>0', 'f(x)='],
    'Cauchy$(x_0,\\gamma)$': ['x_0\\in\\mathbb R', '\\gamma>0', 'x\\in\\mathbb R', 'f(x)='],
    'Weibull$(c,\\eta)$': ['c,\\eta>0', 'x>0', 'f(x)='],
    'Logistic$(\\mu,s)$': ['\\mu\\in\\mathbb R', 's>0', 'x\\in\\mathbb R', 'F(x)='],
  }, errors);
}

function validateDistributionRows(text, label, contracts, errors) {
  const lines = text.split(/\r?\n/);
  for (const [distribution, needles] of Object.entries(contracts)) {
    const row = lines.find((line) => line.startsWith(`| ${distribution} |`));
    if (!row) {
      errors.push(`${label}: 分布表に ${distribution} の行がありません`);
      continue;
    }
    const cells = row.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 3 || !cells[2] || !/[=]|P\(/.test(cells[2])) {
      errors.push(`${label}: ${distribution} 行の第3列に確率・密度・分布関数の式がありません`);
    }
    for (const needle of needles) if (!row.includes(needle)) errors.push(`${label}: ${distribution} 行に要素がありません: ${needle}`);
  }
}

function validateAccessibilityContract(chapterDir, chapterId, errors) {
  const contracts = {
    'F0-01': { '06_exercises.md': ['a<b', '\\lambda>0', 'f_X(x)='] },
    'P3-01': {
      '03_theorems.md': ['q=1-p', 'n\\in\\mathbb N', 'r\\in\\mathbb N', '\\lambda>0', 'P(X=k)'],
      '06_exercises.md': ['Hypergeom$(N,K,n)$', 'max(0,n-N+K)', 'NegBin$(r,p)$', 'r\\in\\mathbb N', 'p_i\\geq0', 'x_i\\in\\mathbb N_0', 'P(\\boldsymbol X=\\boldsymbol x)'],
      '08_exam_drill.md': ['P\\{N(t)=k\\}', '重ならない時間区間', '確率収束'],
    },
    'P3-02': {
      '03_theorems.md': ['a<b', '\\mu\\in\\mathbb R', '\\sigma>0', '\\lambda>0', '\\alpha,\\beta>0', '\\gamma>0', 'c,\\eta>0', 's>0'],
      '06_exercises.md': ['a<b', '\\mu\\in\\mathbb R', '\\sigma>0', '\\lambda>0', '\\alpha,\\beta>0', '\\gamma>0', 'c,\\eta>0', 's>0'],
      '08_exam_drill.md': ['P(X>x)=', '\\eta>0', '最尤推定値', '確率収束'],
    },
    'P3-03': {
      '03_theorems.md': ['N_p', '\\boldsymbol\\mu\\in\\mathbb R^p', 'f(\\boldsymbol x)='],
      '06_exercises.md': ['N_p', '\\boldsymbol\\mu\\in\\mathbb R^p', 'f(\\boldsymbol x)='],
      '08_exam_drill.md': ['N_2', '正定値', 'f(\\boldsymbol z)='],
    },
    'P4-01': {
      '03_theorems.md': ['Unif$(0,1)$', 'Beta$(a,b)$', 'a,b>0', 'f(u)='],
      '06_exercises.md': ['a<b', '\\lambda>0', 'a,b>0', 'cumulative distribution function', 'moment generating function'],
      '08_exam_drill.md': ['f_\\theta(x)=', '\\theta>0', 'Beta$(n-1,2)$'],
    },
  };
  for (const [name, needles] of Object.entries(contracts[chapterId] ?? {})) {
    const text = fs.readFileSync(path.join(chapterDir, name), 'utf8');
    for (const needle of needles) if (!text.includes(needle)) errors.push(`${chapterId}/${name}: 独習入口契約の要素がありません: ${needle}`);
  }
  if (chapterId === 'P3-01') {
    const text = fs.readFileSync(path.join(chapterDir, '06_exercises.md'), 'utf8');
    validateDistributionRows(text, `${chapterId}/06_exercises.md`, {
      'Bernoulli$(p)$': ['0\\leq p\\leq1', 'P(X=0)=1-p', 'P(X=1)=p'],
      'Bin$(n,p)$': ['n\\in\\mathbb N', '0\\leq p\\leq1', 'P(X=k)'],
      'Hypergeom$(N,K,n)$': ['N\\in\\mathbb N', 'K,n\\in\\{0,\\ldots,N\\}', 'max(0,n-N+K)', 'min(n,K)', 'P(X=k)'],
      'Geom$(p)$': ['0<p\\leq1', 'k=1,2,\\ldots', 'P(X=k)'],
      'NegBin$(r,p)$': ['r\\in\\mathbb N', '0<p\\leq1', 'P(X=k)'],
      'Poisson$(\\lambda)$': ['\\lambda>0', 'k\\in\\mathbb N_0', 'P(X=k)'],
      'Multinomial$(n;p_1,\\ldots,p_m)$': ['m\\geq2', 'n\\in\\mathbb N', 'p_i\\geq0', '\\sum_i p_i=1', 'x_i\\in\\mathbb N_0', '\\sum_i x_i=n', 'P(\\boldsymbol X=\\boldsymbol x)'],
    }, errors);
  }
  if (chapterId === 'P3-02') {
    const rows = {
      'Unif$(a,b)$': ['a<b', 'a<x<b'],
      '$N(\\mu,\\sigma^2)$': ['\\mu\\in\\mathbb R', '\\sigma>0', 'x\\in\\mathbb R'],
      'Exp$(\\lambda)$': ['\\lambda>0', 'x>0'],
      'Gamma$(\\alpha,\\beta)$': ['\\alpha,\\beta>0', 'x>0'],
      'Beta$(\\alpha,\\beta)$': ['\\alpha,\\beta>0', '0<x<1'],
      'Cauchy$(x_0,\\gamma)$': ['x_0\\in\\mathbb R', '\\gamma>0', 'x\\in\\mathbb R'],
      'Lognormal$(\\mu,\\sigma^2)$': ['\\mu\\in\\mathbb R', '\\sigma>0', 'x>0'],
      'Weibull$(c,\\eta)$': ['c,\\eta>0', 'x>0'],
      'Logistic$(\\mu,s)$': ['\\mu\\in\\mathbb R', 's>0', 'x\\in\\mathbb R'],
    };
    for (const name of ['03_theorems.md', '06_exercises.md']) {
      validateDistributionRows(fs.readFileSync(path.join(chapterDir, name), 'utf8'), `${chapterId}/${name}`, rows, errors);
    }
  }
}

function detectCycles(chapters, errors) {
  const graph = new Map(chapters.map((chapter) => [chapter.id, chapter.prerequisites ?? []]));
  const visiting = new Set(); const visited = new Set();
  function visit(id, trail) {
    if (visiting.has(id)) { errors.push(`循環依存: ${[...trail, id].join(' -> ')}`); return; }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dep of graph.get(id) ?? []) visit(dep, [...trail, id]);
    visiting.delete(id); visited.add(id);
  }
  for (const id of graph.keys()) visit(id, []);
}
