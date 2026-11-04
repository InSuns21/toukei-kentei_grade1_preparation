import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { replaceOutsideMarkdownMath } from './lib/replace-outside-markdown-math.mjs';

const root = process.cwd();
const sourceRendererPath = path.join(root, 'pages', 'math-renderer.js');
const builtRendererPath = path.join(root, '_site', 'math-renderer.js');
const builtIndexPath = path.join(root, '_site', 'index.html');
const regressionPath = path.join(
  root,
  'statistical-mathematics',
  'core',
  '26_conditional_normal_partial_correlation.md',
);
const comb9Path = path.join(root, 'textbook', 'volumes', 'dream_thater', '計算系', 'COMB', 'COMB9', 'index.md');
const publishedComb9Path = path.join(root, '_site', 'textbook', 'volumes', 'dream_thater', '計算系', 'COMB', 'COMB9', 'index.md');

await Promise.all([
  access(sourceRendererPath),
  access(builtRendererPath),
  access(builtIndexPath),
  access(regressionPath),
  access(comb9Path),
  access(publishedComb9Path),
]);

const [rendererCode, builtRendererCode, indexHtml, regressionMarkdown] = await Promise.all([
  readFile(sourceRendererPath, 'utf8'),
  readFile(builtRendererPath, 'utf8'),
  readFile(builtIndexPath, 'utf8'),
  readFile(regressionPath, 'utf8'),
]);

// The Pages link orienter must not rewrite TeX coefficient extraction as
// [x^0](textbook/volumes/.../AB), even though it resembles Markdown links.
const linkLikeMath = [
  '$$','\\begin{aligned}', '[x^0](AB)&=1,', '[x^1](AB)&=3.', '\\end{aligned}', '$$',
  'Inline $[x^2](AB)$ and [前提 $x$](../COMB8/index.md).',
  '`[code](untouched.md)`',
  '```markdown', '[fenced](untouched.md)', '```',
].join('\n');
const linkPattern = /(!?\[[^\]]*\]\()([^)]+)(\))/g;
const mathAware = replaceOutsideMarkdownMath(linkLikeMath, linkPattern, (match, open, href, close) =>
  `${open}ROOT/${href}${close}`,
);
assert.ok(mathAware.includes('[x^0](AB)&=1,'), 'Display math must be preserved.');
assert.ok(mathAware.includes('$[x^2](AB)$'), 'Inline math must be preserved.');
assert.ok(mathAware.includes('[前提 $x$](ROOT/../COMB8/index.md)'), 'A real link containing math must be oriented.');
assert.ok(mathAware.includes('`[code](untouched.md)`'), 'Inline code must be preserved.');
assert.ok(mathAware.includes('[fenced](untouched.md)'), 'Fenced code must be preserved.');

const [sourceComb9, publishedComb9] = await Promise.all([
  readFile(comb9Path, 'utf8'),
  readFile(publishedComb9Path, 'utf8'),
]);
for (const coefficient of [String.raw`[x^0](AB)&=1\cdot1=1`, String.raw`[x^1](AB)&=1\cdot1+2\cdot1=3`, String.raw`[x^2](AB)&=1\cdot1+2\cdot1+3\cdot1=6`]) {
  assert.ok(sourceComb9.includes(coefficient), 'COMB9 must contain the source regression example.');
  assert.ok(publishedComb9.includes(coefficient), `Pages build corrupted coefficient extraction: ${coefficient}`);
}

assert.equal(builtRendererCode, rendererCode, 'Pages build must copy math-renderer.js unchanged.');
assert.match(indexHtml, /src=["']math-renderer\.js["']/, 'Pages index must load the local math renderer.');
assert.match(
  indexHtml,
  /ToukeiMathRenderer\.docsifyPlugin/,
  'Docsify must register the local math renderer plugin.',
);
assert.doesNotMatch(indexHtml, /docsify-katex/i, 'The fragile docsify-katex bridge must not be loaded.');
assert.doesNotMatch(
  indexHtml,
  /marked@/i,
  'Pages must not load a second Marked instance just for math rendering.',
);

const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(rendererCode, sandbox, { filename: sourceRendererPath });
const protectMath = sandbox.ToukeiMathRenderer?.protectMath;
assert.equal(typeof protectMath, 'function', 'math-renderer.js must expose protectMath().');

function decodedMath(markdown) {
  const protectedMarkdown = protectMath(markdown);
  return [...protectedMarkdown.matchAll(/data-tex="([^"]*)"/g)].map((match) =>
    decodeURIComponent(match[1]),
  );
}

const matrixSource = String.raw`$$
\Sigma_{W\mid X}
=
\begin{pmatrix}1&1/4\\1/4&1\end{pmatrix}
-
\begin{pmatrix}1/4&1/4\\1/4&1/4\end{pmatrix}
$$`;
const matrixMath = decodedMath(matrixSource);
assert.equal(matrixMath.length, 1, 'A multiline display formula must become one protected token.');
assert.ok(matrixMath[0].includes(String.raw`\begin{pmatrix}`), 'Matrix command must survive preprocessing.');
assert.ok(matrixMath[0].includes(String.raw`1&1/4\\1/4&1`), 'Matrix row separator \\\\ must survive preprocessing.');

const inlineMath = decodedMath(String.raw`密度は $f_X(x)=\frac{1}{\sqrt{2\pi}}e^{-x^2/2}$ とする。`);
assert.deepEqual(
  inlineMath,
  [String.raw`f_X(x)=\frac{1}{\sqrt{2\pi}}e^{-x^2/2}`],
  'Inline TeX commands must round-trip exactly.',
);

const unicodeMath = decodedMath(String.raw`\[\text{日本語} + x\]`);
assert.deepEqual(unicodeMath, [String.raw`\text{日本語} + x`], 'Unicode inside TeX must round-trip exactly.');

const codeSample = `Inline code: \`$x$\`

\`\`\`text
$$
\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}
$$
\`\`\``;
const protectedCode = protectMath(codeSample);
assert.match(protectedCode, /`\$x\$`/, 'Inline code containing dollar signs must remain untouched.');
assert.match(
  protectedCode,
  /```text[\s\S]*\$\$[\s\S]*\\begin\{pmatrix\}[\s\S]*```/,
  'Fenced code containing TeX-like text must remain untouched.',
);

const regressionMath = decodedMath(regressionMarkdown);
const firstMatrix = String.raw`\begin{pmatrix}1&1/4\\1/4&1\end{pmatrix}`;
const finalMatrix = String.raw`\begin{pmatrix}3/4&0\\0&3/4\end{pmatrix}`;
const conditionalCovariance = regressionMath.find(
  (tex) =>
    tex.includes(String.raw`\Sigma_{W\mid X}`) &&
    tex.includes(firstMatrix) &&
    tex.includes(finalMatrix),
);
assert.ok(
  conditionalCovariance,
  'Regression page must preserve the full conditional-covariance matrix calculation.',
);
assert.ok(
  conditionalCovariance.includes(firstMatrix),
  'Regression page must preserve the first pmatrix including its row separator.',
);
assert.ok(
  conditionalCovariance.includes(finalMatrix),
  'Regression page must preserve the final pmatrix including its row separator.',
);

console.log(
  `GitHub Pages math-renderer validation passed: ${regressionMath.length} formulas protected on the conditional-normal regression page.`,
);
