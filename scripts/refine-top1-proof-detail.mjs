import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const path = 'textbook/volumes/00_foundations/TOP1/index.md';
let s = fs.readFileSync(path, 'utf8');

const replacements = [
  [
`> **定義（部分基底と生成位相）**  
> 集合 $X$ の部分集合族 $\\mathcal S\\subseteq\\mathcal P(X)$ が

$$
X=\\bigcup_{S\\in\\mathcal S}S
$$

> を満たすとする。$\\mathcal S$ の有限個の要素の交差全体を $\\mathcal B_{\\mathcal S}$ とする。空個の交差は $X$ とする。$\\mathcal B_{\\mathcal S}$ が生成する位相を、$\\mathcal S$ が **生成する位相** といい、$\\mathcal S$ をその **部分基底** という。`,
`> **定義（部分基底と生成位相）**  
> 集合 $X$ の任意の部分集合族 $\\mathcal S\\subseteq\\mathcal P(X)$ を考える。$\\mathcal S$ の有限個の要素の交差全体を $\\mathcal B_{\\mathcal S}$ とし、空個の交差は $X$ と約束する。$\\mathcal B_{\\mathcal S}$ が生成する位相を、$\\mathcal S$ が **生成する位相** といい、$\\mathcal S$ をその **部分基底** という。
>
> 特に $\\mathcal S=\\varnothing$ でも、空交差 $X$ が基底に入るため、生成位相は $\\{\\varnothing,X\\}$ と定まる。`
  ],
  [
`**3. 普遍的な連続性判定。**  まず $g$ が連続なら、1で各 $f_i$ が連続なので、連続写像の合成 $f_i\\circ g$ も連続です。`,
`**3. 普遍的な連続性判定。**  まず $g$ が連続とします。$U\\subseteq Y_i$ を開集合とすると、1より $f_i^{-1}(U)$ は $X$ で開です。従って

$$
(f_i\\circ g)^{-1}(U)
=g^{-1}(f_i^{-1}(U))
$$

は $Z$ で開です。よって各 $f_i\\circ g$ は連続です。`
  ],
  [
`**3. 普遍的な連続性判定。**  $h$ が連続なら、各 $q_i$ も連続なので合成 $h\\circ q_i$ は連続です。`,
`**3. 普遍的な連続性判定。**  まず $h$ が連続とします。$V\\subseteq Z$ を開集合とすると $h^{-1}(V)$ は $Y$ で開です。final topology の定義から各 $i$ について

$$
q_i^{-1}(h^{-1}(V))
$$

は $X_i$ で開です。一方

$$
(h\\circ q_i)^{-1}(V)
=q_i^{-1}(h^{-1}(V)),
$$

なので各 $h\\circ q_i$ は連続です。`
  ],
  [
`語呂より、**矢印が入ってくる側に initial、矢印が出ていく側に final の普遍性が働く**と図で覚える方が安全です。`,
`向きを曖昧な語呂で覚えず、構造写像そのものを見る方が安全です。**initial topology は $f_i:X\\to Y_i$ の共通定義域 $X$ に入り、final topology は $q_i:X_i\\to Y$ の共通値域 $Y$ に入ります。** そのうえで連続性を試す写像は、initial では $g:Z\\to X$ と「入ってくる」向き、final では $h:Y\\to Z$ と「出ていく」向きになります。`
  ]
];

for (const [from, to] of replacements) {
  if (!s.includes(from)) throw new Error('TOP1 replacement point not found:\n' + from.slice(0, 120));
  s = s.replace(from, to);
}
fs.writeFileSync(path, s);

for (const temp of ['scripts/refine-top1-proof-detail.mjs', '.github/workflows/refine-top1-proof-detail.yml']) {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
}

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: refine TOP1 universal-property proofs'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
