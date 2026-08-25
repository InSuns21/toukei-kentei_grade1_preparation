import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

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

await Promise.all([
  access(sourceRendererPath),
  access(builtRendererPath),
  access(builtIndexPath),
  access(regressionPath),
]);

const [rendererCode, builtRendererCode, indexHtml, regressionMarkdown] = await Promise.all([
  readFile(sourceRendererPath, 'utf8'),
  readFile(builtRendererPath, 'utf8'),
  readFile(builtIndexPath, 'utf8'),
  readFile(regressionPath, 'utf8'),
]);

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
const conditionalCovariance = regressionMath.find((tex) => tex.includes(String.raw`\Sigma_{W\mid X}`));
assert.ok(conditionalCovariance, 'Regression page must expose the conditional-covariance display formula.');
assert.ok(
  conditionalCovariance.includes(String.raw`\begin{pmatrix}1&1/4\\1/4&1\end{pmatrix}`),
  'Regression page must preserve the first pmatrix including its row separator.',
);
assert.ok(
  conditionalCovariance.includes(String.raw`\begin{pmatrix}3/4&0\\0&3/4\end{pmatrix}`),
  'Regression page must preserve the final pmatrix including its row separator.',
);

console.log(
  `GitHub Pages math-renderer validation passed: ${regressionMath.length} formulas protected on the conditional-normal regression page.`,
);
