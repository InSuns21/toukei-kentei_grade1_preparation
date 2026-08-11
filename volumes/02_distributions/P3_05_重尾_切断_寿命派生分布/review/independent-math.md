# P3-05 独立数理査読

- 担当ID: `/root/p305_math_review`
- 実行モデル: `gpt-5.6-sol`
- 初回査読日時: 2026-08-11T14:43:32+09:00
- 対象: `00_overview.md` から `09_past_exam_practice.md`、`chapter.yaml`、`glossary.yaml`

## 独立再計算

### Pareto分布と最小値

$X\sim\operatorname{Pareto}(x_m,\alpha)$ なら、$x\geq x_m$ で
$$
S(x)=\int_x^\infty \alpha x_m^\alpha u^{-\alpha-1}\,du
=\left(\frac{x_m}{x}\right)^\alpha.
$$
実数 $r$ について
$$
E[X^r]
=\alpha x_m^\alpha\int_{x_m}^\infty x^{r-\alpha-1}\,dx
=\frac{\alpha x_m^r}{\alpha-r}
$$
は $r<\alpha$ のとき有限であり、$r\geq\alpha$ で発散する。本文の定理のように $r>0$ に限定するなら、条件は $0<r<\alpha$ である。

独立標本の最小値 $M$ は $t\geq x_m$ で
$$
P(M>t)=\left(\frac{x_m}{t}\right)^{n\alpha},
\qquad
f_M(t)=n\alpha x_m^{n\alpha}t^{-n\alpha-1}.
$$
従って $M\sim\operatorname{Pareto}(x_m,n\alpha)$ であり、
$$
E[M]=\frac{n\alpha x_m}{n\alpha-1}
$$
は $n\alpha>1$ のときに限り有限である。この条件の下だけで
$$
\widetilde x_m=\frac{n\alpha-1}{n\alpha}M
$$
を不偏補正と呼べる。現行解答は $n\alpha\leq1$ を除外せず、期待値、バイアス、不偏補正を無条件に述べている。

### Laplace分布とRayleigh分布

$Y=X-\mu$ と置くとLaplace密度は左右対称であり、
$$
\int_{-\infty}^\infty \frac{e^{-|y|/b}}{2b}\,dy
=\frac1b\int_0^\infty e^{-y/b}\,dy=1.
$$
また
$$
E[Y]=0,
\qquad
E[Y^2]=\frac1b\int_0^\infty y^2e^{-y/b}\,dy=2b^2.
$$
$t\geq0$ なら
$$
P(|X-\mu|>t)=\frac1b\int_t^\infty e^{-u/b}\,du=e^{-t/b}.
$$
$t<0$ では左辺は1であり、問題・解答に $t\geq0$ が必要である。

Rayleigh変数について $U=X^2/(2\sigma^2)$ とすれば、$u\geq0$ で
$$
P(U\leq u)=P(X\leq\sigma\sqrt{2u})=1-e^{-u},
$$
$u<0$ では0である。従って $U\sim\operatorname{Exp}(1)$ で、
$$
E[X]=\sigma\sqrt2\,E[U^{1/2}]
=\sigma\sqrt2\,\Gamma(3/2)
=\sigma\sqrt{\frac\pi2}.
$$

### 切断と右打切り

右切断密度 $f(x)/F(c)$ は $F(c)>0$ のとき、元の台と $x\leq c$ の共通部分で定義される。指数分布では $c>0$ が必要である。

固定された、または寿命と独立な右打切り点について、$y_i=\min(X_i,c_i)$、$\delta_i=\boldsymbol1_{\{X_i\leq c_i\}}$ と書けば、寿命母数に関する尤度は
$$
L(\theta)=\prod_i f_\theta(y_i)^{\delta_i}S_\theta(y_i)^{1-\delta_i}
$$
である。打切り時には $y_i=c_i$ なので、本文の $S(c_i)$ 表示と一致する。

指数分布の故障2件、打切り2件では、$T=t_1+t_2+c_1+c_2$ として
$$
L(\lambda)=\lambda^2e^{-\lambda T},
\qquad
\widehat\lambda=\frac2T.
$$
打切り2件を故障と誤認すると指数部分は変わらず、$\lambda$ の因子が $\lambda^2$ から $\lambda^4$ に変わるため、誤った推定量は $4/T$ となる。現行解答の「指数部を過大にする」は根拠として誤っている。全件打切りで母数空間が $\lambda>0$ なら、$e^{-\lambda\sum c_i}$ の上限1は $\lambda\downarrow0$ で近づくだけで、最尤推定量は存在しない。$\widehat\lambda=0$ と断定してはいけない。

### 生存関数・ハザード・平均残存寿命

非負寿命で $S(0)=1$、$S$ が微分可能なら
$$
h(x)=-\frac{S'(x)}{S(x)},
\qquad
\int_0^x h(u)\,du=-\log S(x).
$$
現行定義は非負寿命と $S(0)=1$ を明示せずに $H(x)=-\log S(x)$ としている。一般には
$$
\int_0^xh(u)\,du=-\log S(x)+\log S(0)
$$
である。

Weibull$(2,5)$ の時刻5における平均残存寿命は
$$
m(5)=e\int_5^\infty e^{-(u/5)^2}\,du
=\frac{5\sqrt\pi}{2}e\,\operatorname{erfc}(1)
\approx1.895.
$$
例3は「数値評価する」で止めず、この結果まで示す必要がある。

### P3T-D01の右打切りWeibull尤度

故障数を
$$
d=\sum_{i=1}^n\delta_i
$$
とし、各観測時間を $y_i=\min(X_i,c_i)$ と統一すると、$c$ が既知の場合
$$
\begin{aligned}
L(\eta)
&=\prod_i
\left[
\frac{c y_i^{c-1}}{\eta^c}e^{-(y_i/\eta)^c}
\right]^{\delta_i}
\left[e^{-(y_i/\eta)^c}\right]^{1-\delta_i}\\
&=c^d\left(\prod_{i:\delta_i=1}y_i^{c-1}\right)
\eta^{-cd}\exp\left(-\frac{\sum_i y_i^c}{\eta^c}\right).
\end{aligned}
$$
従って $d>0$ なら
$$
\widehat\eta^c=\frac{\sum_i y_i^c}{d}.
$$
現行解答は $-nc\log\eta$ とし、打切り観測にも密度の母数因子を掛けている。また $D=\sum_i t_i^c$ の定義では打切り時間を含められない。$d=0$ なら内部の最尤推定量はなく、$\eta\to\infty$ で尤度の上限へ近づく。

### P3T-DRILL-01

故障時刻2、4と打切り時刻5に対し、
$$
\begin{aligned}
L(\eta)
&=f_\eta(2)f_\eta(4)S_\eta(5)\\
&=\frac4{\eta^2}e^{-4/\eta^2}
\frac8{\eta^2}e^{-16/\eta^2}
e^{-25/\eta^2}\\
&=32\eta^{-4}e^{-45/\eta^2}.
\end{aligned}
$$
従って
$$
\ell'(\eta)=-\frac4\eta+\frac{90}{\eta^3}=0,
\qquad
\widehat\eta^2=\frac{45}{2},
\qquad
\widehat\eta=\frac{3\sqrt{10}}2.
$$
推定値を代入すると
$$
\widehat h(5)=\frac{10}{45/2}=\frac49,
\qquad
\widehat S(5)=\exp\left(-\frac{25}{45/2}\right)=e^{-10/9}.
$$
掲載された係数16、指数25、$\widehat\eta^2=25/2$、$\widehat h(5)=4/5$、$\widehat S(5)=e^{-2}$ はすべてこの独立計算と一致しない。

## 初回指摘

### major

1. `07_solutions.md` のP3T-C01 — $E[M]$ の存在条件 $n\alpha>1$ がなく、$n\alpha\leq1$ でもバイアスと不偏補正を定義している。問題文の要求どおり存在条件を場合分けし、補正は $n\alpha>1$ に限定する。
2. `07_solutions.md` のP3T-D01 — 右打切りWeibull尤度で故障数 $d=\sum\delta_i$ を $n$ と取り違え、打切り時間の指数寄与も欠落している。上の $y_i,d$ 表記で尤度と最尤推定量を全面修正する。
3. `08_exam_drill.md` — $f(2)f(4)S(5)$ の積が誤っており、尤度、最尤推定量、推定ハザード、生存確率が連鎖して不正解である。上の独立計算へ修正する。
4. `03_theorems.md`、`07_solutions.md` — Laplaceの正規化・二次モーメント、Rayleighの期待値、$c=2$ の平均残存寿命、D01(5)の平均残存寿命比較が結果または「数値評価する」だけで、詳細解答として再現できる積分・置換・境界評価が不足している。独立再計算の段階を本文と詳細解答に反映する。

### minor

1. `02_definitions.md` の切断・ハザード — 切断には $F(c)>0$、累積ハザードには非負寿命と $S(0)=1$ が必要である。条件を明記する。
2. `06_exercises.md` の問題冒頭、A04、B04、C05 — 指数分布を名前で使うが、母数規約・台・密度が問題近傍にない。$\operatorname{Exp}(\lambda)$ を rate 表示として定義し、切断点は $c>0$ とする。
3. `06_exercises.md` のB01 — $r$ の範囲がない。$r>0$ と限定するか、実数 $r$ に対する条件 $r<\alpha$ とする。
4. `06_exercises.md`・`07_solutions.md` のB02 — $P(|X-\mu|>t)=e^{-t/b}$ には $t\geq0$ が必要である。
5. `07_solutions.md` のB03 — CDFの条件が「$x\geq0$」になっており、変換後変数に合わせて $u\geq0$ とし、$u<0$ では0と補う。
6. `04_examples.md` の例3 — 平均残存寿命を「数値評価する」と読者へ残している。少なくとも積分変換と約1.895まで示す。
7. `07_solutions.md` のC03(3)(5) — 打切り誤認で変わるのは指数部ではなく $\lambda$ の次数である。また $\lambda>0$ なら全件打切り時のMLEは0ではなく存在しない。上限と境界極限を区別する。
8. `07_solutions.md` のC04(3) — 全観測が既知の $\mu$ と一致すると $b\downarrow0$ で尤度が発散し、$b>0$ 内にMLEがない。通常の場合 $\sum|x_i-\mu|>0$ と境界例を分ける。

## 初回機械検証

- 実行日時: 2026-08-11T14:43:32+09:00
- `npm run validate`: 成功（KaTeX strict 171 Markdown、本文検査190ファイル）
- 機械検証成功は、上記の数理的誤りがないことを意味しない。

## 初回判定

`fatal: 0 / major: 4 / minor: 8`

## 修正後再査読

- 第1回再査読日時: 2026-08-11T14:52:09+09:00
- `npm run validate`: 成功（KaTeX strict 173 Markdown、本文検査192ファイル）

### 解消を確認した指摘

1. P3T-C01は $n\alpha>1$ のときだけ $E[M]$ と不偏補正を述べる形へ修正された。
2. P3T-D01は故障数 $d=\sum_i\delta_i$ と全寄与 $A=\sum_i\{\delta_it_i^c+(1-\delta_i)c_i^c\}$ を用い、$\widehat\eta^c=A/d$ へ修正された。
3. P3T-DRILL-01は $32\eta^{-4}e^{-45/\eta^2}$、$\widehat\eta^2=45/2$、$\widehat h(5)=4/9$、$\widehat S(5)=e^{-10/9}$ へ修正され、独立計算と一致した。

### 残存指摘

1. 初回major 4の詳細導出不足が未解消である。`03_theorems.md` のP3T-THM-02、`04_examples.md` の例3、`07_solutions.md` のP3T-D01(5)は初回時点の短い記述のままである。
2. 初回minor 1--8が未解消である。特に $F(c)>0$、非負寿命と $S(0)=1$、指数分布のrate規約と $c>0$、B01の $r$、B02の $t\geq0$、B03の $u\geq0$、C03の全打切り境界、C04の退化標本を明記する必要がある。
3. 新規の `P3T-C05 concrete numerical check` は既存IDを英語で重複使用し、独立した安定IDがない。`08_exam_drill.md` も全文が英語へ置換されている。日本語教材・問題IDと解答IDの一対一契約へ戻す必要がある。
4. P3T-C01の生存関数は $t<x_m$ で1、密度は台外で0となる場合分けを補う必要がある。
5. P3T-D01は $d=0$ では内部MLEがなく、$\eta\to\infty$ で尤度の上限へ近づくことを補う必要がある。

### 第1回再査読判定

`fatal: 0 / major: 2 / minor: 10`（未承認）

## 第2回再査読

- 再査読日時: 2026-08-11T15:11:32+09:00
- `npm run validate`: 成功（KaTeX strict 173 Markdown、本文検査192ファイル）

### 追加解消確認

1. 指数分布のrate母数規約、$r>0$、$t\geq0$、変換後CDFの $u$ の範囲が問題集冒頭へ追加された。
2. C03の打切り誤処理は $\lambda$ の次数増加と率の過大推定へ修正され、全打切りでは $\lambda>0$ 内にMLEがないと正しく記された。
3. C04は全標本が既知の $\mu$ と一致する退化例を場合分けした。
4. 例3は $m(5)=5e\int_1^\infty e^{-v^2}dv\approx1.895$ まで計算された。
5. 30分ドリルは日本語化され、問題ID、詳細解答、本番答案、時間判断を持つ。全5小問を再計算し、数式・結論はすべて正しい。

### 第2回残存指摘

#### major

1. `06_exercises.md` のP3T-C05A(iii)は「切断を打切りと誤認したとき」を問うが、`07_solutions.md` は「右打切りを故障と誤認し、$S(4)$ を $f(4)$ に置き換える」問題を解いている。異なる観測機構を混同しているため、問題または解答を同じ問いへ統一する。
2. `07_solutions.md` のC/D答案チェック表P3T-C03は「全打切りの境界 $\widehat\lambda=0$」とし、同ファイルの詳細解答と完成形答案にある「$\lambda>0$ 内でMLEなし」と矛盾する。「全打切りでは内部MLEなし、$\lambda\downarrow0$ で上限」と統一する。

#### minor

1. `02_definitions.md` の `Conditions used below` と本文、`07_solutions.md` のP3T-C05A解答が英語のままである。日本語教材の契約に合わせる。
2. `07_solutions.md` のP3T-B03(1)は条件が依然として「$x\geq0$」である。変換後CDFの変数に合わせて「$u\geq0$、$u<0$ では0」とする。
3. `07_solutions.md` のP3T-C01(1)(2)は $t<x_m$ で $P(M>t)=1$、台外で $f_M(t)=0$ となる場合分けがない。
4. `07_solutions.md` のP3T-D01は $d=0$ の場合を扱っていない。全打切りでは有限な $\eta$ にMLEがなく、$\eta\to\infty$ で尤度の上限へ近づく。
5. `07_solutions.md` のP3T-D01(5)は $c=2$ の平均残存寿命が減少するとの結論だけである。$m(x)=e^{(x/\eta)^2}\int_x^\infty e^{-(u/\eta)^2}du$ またはハザードとの比較根拠を示す。
6. Laplace密度の正規化とRayleighの $E[X]=\sigma\sqrt{\pi/2}$ は、依然として積分評価の途中が省略されている。定理または詳細解答で置換後の積分と境界評価を一段ずつ示す。

### 第2回再査読判定

`fatal: 0 / major: 2 / minor: 6`（未承認）

## 第3回再査読

- 再査読日時: 2026-08-11T15:16:12+09:00
- `npm run validate`: 成功（KaTeX strict 173 Markdown、本文検査192ファイル）

### 追加解消確認

1. C05Aは独立IDから削除され、C05へ統合された。C03答案表の全打切り境界は詳細解答と一致した。
2. 条件説明と30分ドリルは日本語化された。
3. C01は $t<x_m$ の生存関数、D01は $d=0$ の境界と $c=2$ の平均残存寿命の式を追加した。

### 第3回残存指摘

#### major

1. P3T-C05は小問(1)--(8)となり、Level Cの4--6小問契約を超える。また $\lambda=1/4$ を既知としているのに「取り違えによる尾確率の偏り」を問うため、推定量を定めない限り偏りが数学的に定義されない。小問を統合し、未知率について正しい尤度と誤った尤度から推定値・尾確率を比較するか、偏りではなく尤度寄与の違いだけを問う。

#### minor

1. P3T-B03解答(1)の条件は依然「$x\geq0$」であり、$u\geq0$ へ修正が必要である。P3T-C01の密度にも $t<x_m$ で0を明記する。
2. P3T-B01解答の `for`、P3T-C05解答の `on` を日本語化する。
3. Laplaceの正規化とRayleighの期待値は、積分またはGamma関数の評価段階を一段追加する。
4. P3T-D01では故障時刻 $t_i$ と打切り時刻 $c_i$ のいずれかしか存在しない書き方なのに、$f(t_i)^{\delta_i}$ と $\delta_it_i^c$ を用いている。$y_i=\min(X_i,c_i)$ と統一して未定義記号を避ける。
5. $c=2$ の平均残存寿命が減少することを、未導入の一般定理だけに依存せず、$m'(x)=h(x)m(x)-1<0$ などの根拠で示す。

### 第3回再査読判定

`fatal: 0 / major: 1 / minor: 5`（未承認）

## 第4回再査読

- 再査読日時: 2026-08-11T15:19:09+09:00
- `npm run validate`: 成功（KaTeX strict 173 Markdown、本文検査192ファイル）

### 解消確認

- C05は見かけ上5小問へ統合され、未知率の正しい尤度 $\lambda e^{-6\lambda}$ と誤った尤度 $\lambda^2e^{-6\lambda}$、推定値 $1/6,1/3$ は正しい。

### 第4回残存指摘

1. **major**: C05の問題は $\lambda=1/4$ を指定していないが、解答は突然 $\lambda=1/4$ の右切断密度を計算する。また問題が要求する推定後の $S(4)$ 比較を数値で答えていない。正しい解析では $S_{1/6}(4)=e^{-2/3}$、誤解析では $S_{1/3}(4)=e^{-4/3}$ である。右切断密度の数値例を残すなら問題文にも $\lambda=1/4$ を明記し、未知率の打切り比較とは役割を分ける。
2. **minor**: 第3回minor 1--5が実ファイルに残っている。具体的にはB03(1)の $x\geq0$、C01密度の台外0、英語 `for` / `on`、Laplace・Rayleigh積分評価、D01の観測時刻 $y_i$ と平均残存寿命減少の根拠である。

### 第4回再査読判定

`fatal: 0 / major: 1 / minor: 5`（未承認）

## 第5回再査読

- 再査読日時: 2026-08-11T15:22:22+09:00
- `npm run validate`: 成功（KaTeX strict 173 Markdown、本文検査192ファイル）

### 解消確認

- C05は未知 $\lambda$ の一般式へ統一され、正しい解析の $\widehat\lambda=1/6$、$\widehat S(4)=e^{-2/3}$ と、誤解析の $\widetilde\lambda=1/3$、$\widetilde S(4)=e^{-4/3}$ が明記された。設問と解答は一致する。
- B01の英語断片、B03の変換後CDF変数、C05の英語断片は修正された。
- D01は $y_i$ を導入し、$d=0$ と平均残存寿命の微分式を追加した。

### 第5回残存指摘

1. P3T-C01(2)は $t\geq x_m$ の密度式だけで、$t<x_m$ では0となる台外の場合分けがない。
2. P3T-B02の正規化・二次モーメントとP3T-B03の期待値は、依然として積分評価から結果へ飛ぶ。$E[\sqrt U]=\Gamma(3/2)=\sqrt\pi/2$ など、大学初年度読者が再現する一段を補う。
3. P3T-D01は導入した $y_i$ が尤度の第2因子・$A$・完成形答案まで統一されていない。また $m'(x)=h(x)m(x)-1<0$ の不等号は未導入の含意であるため、Gaussian尾積分の上界などで $h(x)m(x)<1$ を示す。
4. P3T-C05解答(5)の「切断を打切りと誤認すると尾を過小評価」は推定手順なしの一般主張である。今回一意に計算した「打切りを故障と誤認する」比較へ限定するか、条件を明記する。

### 第5回再査読判定

`fatal: 0 / major: 0 / minor: 4`（未承認）

## 最終再査読

- 再査読日時: 2026-08-11T15:24:46+09:00
- 再査読範囲: 対象章全文、全14演習、全解答、P3T-DRILL-01、統合後のC05具体比較、完成形本番答案
- `npm run validate`: 成功（KaTeX strict 173 Markdown、本文検査192ファイル）

### 最終解消確認

1. P3T-C01は生存関数と密度を $t<x_m$、$t\geq x_m$ で場合分けし、$n\alpha>1$ の存在条件と不偏補正を正しく扱う。
2. Laplaceは左右の正規化と二次モーメント、Rayleighは指数変換と $\Gamma(3/2)=\sqrt\pi/2$ まで記載され、期待値を再現できる。
3. P3T-C03は故障と打切りの寄与、追加故障、全件打切りの境界を区別する。
4. P3T-C05は5小問内に統合され、未知率モデルで正しい尤度 $\lambda e^{-6\lambda}$ と誤った尤度 $\lambda^2e^{-6\lambda}$ を比較する。$\widehat\lambda=1/6$、$\widetilde\lambda=1/3$、$e^{-2/3}>e^{-4/3}$ は独立計算と一致する。
5. P3T-D01は $y_i=\min(X_i,c_i)$、$d=\sum\delta_i$、$A$ を一貫して用いる。$d>0$ で $\widehat\eta^c=A/d$、$d=0$ で内部MLEなしとなる。$c=2$ の平均残存寿命はGaussian尾積分の上界から $m'(x)<0$ と確認できる。
6. P3T-DRILL-01は $L(\eta)=32\eta^{-4}e^{-45/\eta^2}$、$\widehat\eta^2=45/2$、$\widehat h(5)=4/9$、$\widehat S(5)=e^{-10/9}$ で全小問・詳細解答・本番答案が一致する。
7. 全問題IDと解答、台・母数、尤度、境界、完成形答案を照合し、新規指摘はない。

## 最終判定

`fatal: 0 / major: 0 / minor: 0`（承認）
