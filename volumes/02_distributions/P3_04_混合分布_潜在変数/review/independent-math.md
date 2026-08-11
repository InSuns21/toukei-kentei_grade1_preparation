# P3-04 独立数理査読

- 担当ID: `/root/p304_math_review`
- 実行モデル: `gpt-5.6-sol`
- 初回査読日時: 2026-08-11T12:45:35+09:00
- 対象: `00_overview.md` から `09_past_exam_practice.md`、`chapter.yaml`、`glossary.yaml`

## 独立再計算

### 有限混合と全分散

各 $g_j$ が確率質量関数または確率密度で、$\pi_j\geq0$、$\sum_j\pi_j=1$ なら
$$
\sum_x\sum_j\pi_jg_j(x)=\sum_j\pi_j=1
$$
または積分版の同じ計算から、周辺分布は正規化される。$E[|X|]<\infty$ のとき
$$
E[X]=\sum_j\pi_j\mu_j,
\qquad \mu_j=E[X\mid Z=j].
$$
$E[X^2]<\infty$ のとき
$$
\begin{aligned}
\operatorname{Var}(X)
&=E[\operatorname{Var}(X\mid Z)]+\operatorname{Var}(E[X\mid Z])\\
&=\sum_j\pi_jv_j+\sum_j\pi_j(\mu_j-\mu)^2.
\end{aligned}
$$
二成分では第2項が $\pi(1-\pi)(\mu_1-\mu_2)^2$ になる。本文の最終式は正しいが、これらの存在条件と導出が本文に欠ける。

### Poisson--Gamma混合

shape-rate表示のGamma密度を用いると
$$
\begin{aligned}
P(X=k)
&=\frac{\beta^\alpha}{k!\Gamma(\alpha)}
\int_0^\infty\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}\,d\lambda.
\end{aligned}
$$
$u=(\beta+1)\lambda$ と置けば $d\lambda=du/(\beta+1)$ なので
$$
\int_0^\infty\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}\,d\lambda
=\frac{\Gamma(k+\alpha)}{(\beta+1)^{k+\alpha}}.
$$
したがって掲載された周辺確率質量関数は正しい。また
$$
E[X]=E[\Lambda]=\frac\alpha\beta,
$$
$$
\operatorname{Var}(X)=E[\Lambda]+\operatorname{Var}(\Lambda)
=\frac\alpha\beta+\frac\alpha{\beta^2}
$$
も正しい。

### 正規混合と責務

二成分正規混合の平均・分散公式は正しい。P3L-B04では
$$
\tau_1(x)=\frac{\phi(x)}{\phi(x)+3\phi(x-3)}.
$$
よって
$$
\tau_1(0)=\frac{\phi(0)}{\phi(0)+3\phi(3)}\approx0.9677,
$$
$$
\tau_1(3)=\frac{\phi(3)}{\phi(3)+3\phi(0)}\approx0.00369.
$$
大小関係は解答どおりだが、$\tau_1(3)=1/4$ は誤りである。さらに $\phi(3/2)=\phi(-3/2)$ だから
$$
\tau_1(3/2)=\frac{1}{1+3}=\frac14
$$
であり、現在の問題文の「$1/2$ となる条件を確認」は成立しない。

### Poisson--Gamma事後分布と予測

$X=x$ と新しい $Y$ が同じ潜在率 $\Lambda$ の下で条件付き独立であると明記した場合、Bayes公式により
$$
\begin{aligned}
f(\lambda\mid X=x)
&\propto e^{-\lambda}\lambda^x
\lambda^{\alpha-1}e^{-\beta\lambda}\\
&=\lambda^{\alpha+x-1}e^{-(\beta+1)\lambda},
\end{aligned}
$$
したがって
$$
\Lambda\mid X=x\sim\operatorname{Gamma}(\alpha+x,\beta+1).
$$
さらに
$$
\begin{aligned}
P(Y=0\mid X=x)
&=E[e^{-\Lambda}\mid X=x]\\
&=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.
\end{aligned}
$$
掲載結果はこの解釈なら正しい。一方、新しい $Y$ が独立な新しい潜在率に従うなら $X$ では更新されず、答えは $(\beta/(\beta+1))^\alpha$ である。問題文は両者を区別できていない。

### 推定と識別

$X_i$ が独立であるとの仮定の下では
$$
\operatorname{Var}(\bar X)=\frac{\alpha(\beta+1)}{n\beta^2},
\qquad
\operatorname{Var}(\beta\bar X)=\frac{\alpha(\beta+1)}n,
$$
であり、Chebyshev不等式による確率収束は正しい。ただし、潜在率の独立性だけでは観測の条件付き独立性は自動的に書面上確定しないため、問題文に仮定が必要である。

平均・分散だけで二成分正規混合の3母数が決まらないことは、未知数と式の個数だけでなく反例で示せる。例えば分散を各成分で1とすると、
$$
(\pi,\mu_1,\mu_2)=(1/2,-1,1)
$$
と
$$
(\pi,\mu_1,\mu_2)=(1/5,-2,1/2)
$$
はいずれも平均0、分散2だが異なる混合分布である。

## 初回指摘

### major

1. `06_exercises.md` のP3L-C01・P3L-D01、`08_exam_drill.md` — $\Lambda_i$ の独立同分布性だけが書かれ、$X_i$ の条件付き独立性が明記されていない。$\operatorname{Var}(\bar X)=\operatorname{Var}(X_i)/n$ を使うため、階層モデル全体の独立性を問題文に追加する。
2. `06_exercises.md` のP3L-D01(4)、`08_exam_drill.md` の(5) — $Y$ が $X_1$ と同じ $\Lambda_1$ を共有するのか、新しい独立な潜在率を持つのか不明で、二つの異なる答えが生じる。同じ率を共有し、$X_1,Y$ がその率の下で条件付き独立であると明記する。
3. `07_solutions.md` のP3L-B04 — $\phi(3)=\phi(0)$ とする誤計算があり、$\tau_1(3)=1/4$ は誤り。上の独立計算へ修正し、P3L-B04(3)の偽の前提も「$1/2$ か判定せよ」などへ改稿する。
4. `03_theorems.md` — 全分散、Poisson--Gamma周辺化、正規混合分散の結果だけが示され、正規化、期待値存在条件、Gamma積分の置換、群間分散の整理が省略されている。大学初年度読者が再現できる証明を一段ずつ追加する。
5. `07_solutions.md` と `08_exam_drill.md` — 詳細解答が「共役性より」など未導入の結果を直接使い、方針・仮定・中間計算・検算・本番答案・採点基準も大半で欠ける。特に事後Gamma密度はBayes公式から正規化まで導出する。
6. `07_solutions.md` のP3L-C05(4) — 「式が2つ、未知数が3つ」だけでは非識別の数学的実証として不十分。上記のように同じ平均・分散を持つ異なる母数組を少なくとも一組示す。

### minor

1. `02_definitions.md` — `$Lambda\sim...$` は `\Lambda` の脱字である。
2. `02_definitions.md` — 連続型でも一点の確率は通常0なので、$g(x)=0$ の説明を「その点は観測されない」ではなく「周辺密度が0の範囲では責務の値は結果に影響しない」とする。
3. `03_theorems.md` のP3L-THM-02 — $\alpha$ は任意の正実数なのに「必要成功回数 $r=\alpha$」と説明している。試行回数の解釈は $\alpha\in\mathbb N$ の場合に限るか、一般の $r>0$ の負の二項型と記す。
4. `04_examples.md` の例3 — 「値を代入して比較」としながら数値または比の整理まで完了していない。$\tau_1(1)=1/(1+3e^{-3/2})\approx0.599$ まで示す。
5. `07_solutions.md` のP3L-C03(5) — $(1-\bar X)/2$ は標本によって $[0,1]$ を外れる。モーメント方程式の形式解であること、母数空間内に制約するなら0と1へ切り詰めることを記す。
6. `07_solutions.md` のP3L-C04(2) — 微分方程式だけでは $n_1=0,n$ の境界最尤解を扱っていない。$0<n_1<n$ の内点計算と、両端の場合を分ける。

## 初回判定

`fatal: 0 / major: 6 / minor: 6`

## 修正後再査読

- 再査読日時: 2026-08-11T13:06:08+09:00
- 再査読範囲: 対象章全文、全14演習、全解答、P3L-DRILL-01、初回指摘後に追加された本番答案・時間判断・検算一覧
- `npm run validate`: 成功（KaTeX strict 160 Markdown、本文検査177ファイル）

### majorの解消確認

1. P3L-C01・D01・ドリルに、潜在率の独立同分布性と観測値の条件付き独立性が明記された。独立性を用いる標本平均の分散計算と一致する。
2. D01・ドリルは $X_1,Y$ が共有潜在率 $\Lambda_1$ の下で条件付き独立という一つのモデルに統一された。事後は $\operatorname{Gamma}(\alpha+x,\beta+1)$、予測確率は $((\beta+1)/(\beta+2))^{\alpha+x}$ となり、問題と解答が一致する。
3. P3L-B04は $\tau_1(3)=e^{-9/2}/(e^{-9/2}+3)\approx0.00369$ へ修正され、$x=3/2$ では事前重みにより $1/4$ となる設問へ改稿された。
4. 全分散の交差項、Gamma積分、正規混合分散、観測尤度と責務の導出が追加された。期待値には $E[|X|]<\infty$、分散には $E[X^2]<\infty$ が明記された。
5. Poisson--Gamma事後分布は尤度と事前密度の積から導出され、C/D本番答案、採点、時間判断、ドリル詳細解答、全14問の方針・仮定・検算一覧が追加された。
6. P3L-C05は平均0・分散2を共有する二つの異なる母数組を、$d=4/\sqrt3$ として正しく構成した。$1+(3/16)d^2=2$ を再計算して確認した。

### minorの解消確認

1. `\Lambda` の脱字は修正された。
2. 周辺質量または密度が0の範囲では責務の値が確率計算に影響しない、という説明へ修正された。
3. 負の二項型の $r=\alpha$ は形状パラメータであり、非整数の場合は解析的拡張であると明記された。
4. 例3は $\tau_1(1)\approx0.599$ まで計算された。
5. P3L-C03は形式推定量と $[0,1]$ への制約付き推定量を区別し、本番答案とも一致した。
6. P3L-C04は $0<n_1<n$ の内点と $n_1=0,n$ の境界を場合分けした。

### 全文再計算の最終確認

- 混合質量・密度、責務、全期待値、全分散、Poisson--Gamma周辺分布の式は相互に整合する。
- P3L-A01--D01の全小問を再計算し、掲載結論と一致した。
- 共有潜在率による事後予測と、独立な新規潜在率の場合の違いが定義上区別された。
- 演習ID、解答、完成形答案、検算一覧は一対一に対応する。
- 新規の数理的指摘はない。

## 最終判定

`fatal: 0 / major: 0 / minor: 0`
