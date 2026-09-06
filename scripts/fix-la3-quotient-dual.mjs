import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const path = 'textbook/volumes/00_foundations/LA3/index.md';
let source = fs.readFileSync(path, 'utf8');

const from = '実際、$W^\\circ$ は $(V/W)^*$ と自然に同一視できます。「$W$ を潰してから測る」ことと「最初から $W$ を0にする測定器を使う」ことは同じです。';

const to = String.raw`実際、この「自然に同一視できる」の中身を写像まで書き下します。商写像を
$$
\pi:V\to V/W,
\qquad
\pi(v)=v+W
$$
とします。まず
$$
\Phi:(V/W)^*\to W^\circ,
\qquad
\Phi(\psi)=\psi\circ\pi
$$
と定めます。

本当に値が $W^\circ$ に入ることを確認します。任意の $w\in W$ について
$$
\pi(w)=w+W=W=0_{V/W}
$$
なので
$$
(\Phi(\psi))(w)
=\psi(\pi(w))
=\psi(0_{V/W})
=0.
$$
したがって $\psi\circ\pi$ は $W$ を消し、確かに $\Phi(\psi)\in W^\circ$ です。また合成の線形性から $\Phi$ 自身も線形です。

次に逆向きの写像を作ります。$\varphi\in W^\circ$ に対して
$$
\Psi(\varphi):V/W\to\mathbb F,
\qquad
\Psi(\varphi)(v+W)=\varphi(v)
$$
と定めたいのですが、商空間では同じ剰余類に複数の代表元があるので、ここで **well-defined性** を確認する必要があります。

もし
$$
v+W=v'+W
$$
なら
$$
v-v'\in W.
$$
$\varphi\in W^\circ$ だから
$$
\varphi(v-v')=0.
$$
線形性より
$$
\varphi(v)-\varphi(v')=0,
$$
したがって
$$
\varphi(v)=\varphi(v').
$$
よって $\Psi(\varphi)(v+W)$ は代表元の選び方に依存せず、写像として正しく定まります。

さらに商空間の加法・スカラー倍は
$$
(v+W)+(u+W)=(v+u)+W,
\qquad
c(v+W)=cv+W
$$
なので、任意の $a,b\in\mathbb F$ に対して
$$
\begin{aligned}
\Psi(\varphi)(a(v+W)+b(u+W))
&=\Psi(\varphi)((av+bu)+W)\\
&=\varphi(av+bu)\\
&=a\varphi(v)+b\varphi(u)\\
&=a\Psi(\varphi)(v+W)+b\Psi(\varphi)(u+W).
\end{aligned}
$$
従って $\Psi(\varphi)\in(V/W)^*$ です。

最後に二つの写像が互いに逆であることを直接確認します。$\varphi\in W^\circ$ と $v\in V$ に対して
$$
(\Phi\circ\Psi)(\varphi)(v)
=\Psi(\varphi)(\pi(v))
=\Psi(\varphi)(v+W)
=\varphi(v),
$$
したがって
$$
\Phi\circ\Psi=\operatorname{id}_{W^\circ}.
$$
一方 $\psi\in(V/W)^*$ と任意の剰余類 $v+W$ に対して
$$
(\Psi\circ\Phi)(\psi)(v+W)
=\Phi(\psi)(v)
=\psi(\pi(v))
=\psi(v+W),
$$
なので
$$
\Psi\circ\Phi=\operatorname{id}_{(V/W)^*}.
$$

以上から
$$
(V/W)^*\cong W^\circ
$$
です。ここでは基底を一度も選んでいません。つまりこれは単なる「同じ次元だから同型」ではなく、商写像 $\pi$ から自動的に決まる **自然な同型** です。「$W$ を潰してから測る」ことと「最初から $W$ を0にする測定器を使う」ことが、写像レベルで完全に一致しています。`;

if (!source.includes(from)) {
  throw new Error('LA3 quotient-dual replacement point not found');
}
source = source.replace(from, to);
fs.writeFileSync(path, source);

// Remove temporary one-shot machinery from the resulting commit.
for (const temp of [
  'scripts/fix-la3-quotient-dual.mjs',
  '.github/workflows/fix-la3-quotient-dual.yml'
]) {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
}

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: expand LA3 quotient-dual correspondence'], { stdio: 'inherit' });

for (const [cmd, args] of [
  [process.execPath, ['scripts/validate-formal-reference-links.mjs']],
  [process.execPath, ['scripts/validate-dream-theater-concepts-changed.mjs']],
  ['npm', ['run', 'validate:proof-folding']],
  ['npm', ['run', 'validate:definition-examples']],
  ['npm', ['run', 'validate:named-formals']]
]) {
  execFileSync(cmd, args, { stdio: 'inherit' });
}

execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-linear-algebra-core'], { stdio: 'inherit' });
