# P3-01 独立数理査読

- 担当ID: `/root/f0_math_review`
- 初回査読日時: 2026-08-10T00:56:59+09:00
- 対象: `00_overview.md`〜`08_exam_drill.md`、`chapter.yaml`、`glossary.yaml`、全12演習・詳細解答・完成形本番答案・P3-DRILL-01
- 参照: `notation.md`、`style-guide.md`、前提章 P2-02、`agents/independent-math-reviewer.md`、`prompts/review-chapter.md`
- 判定: **非承認**。下記の major / minor を修正し、同一担当による全文再査読が必要。

## 独立再計算と照合

- 7分布の正規化を独立確認した。Bernoulliは $p+q=1$、二項は二項定理、超幾何はVandermondeの恒等式、幾何は等比級数、負の二項は $(1-q)^{-r}$ の級数、Poissonは指数級数、多項は多項定理により総和1となる。
- Bernoulli、二項、幾何、負の二項、PoissonのPGF・平均・分散はP3-THM-01の表と一致する。超幾何の平均・分散、多項の周辺平均・分散・異カテゴリ共分散も独立な指示変数計算と一致する。
- P3-A01: $P(X=2)=0.2048$、平均1、分散0.8を確認。
- P3-A02: $P(X=4)=27/256$、平均4、分散12を確認。
- P3-A03: $P(X\leq1)=3e^{-2}$、平均・分散2を確認。
- P3-B01: 台 $0,\ldots,5$、組合せ確率、平均1.5、分散 $63/76$ を確認。
- P3-B02: $P(T=5)=\binom42(0.4)^3(0.6)^2=0.13824$、平均7.5、分散11.25を確認。
- P3-B03: 多項確率0.135、$E[X_1]=1.2$、$\operatorname{Cov}(X_1,X_2)=-0.36$ を確認。
- P3-C01: 復元側 Bin$(10,0.2)$、非復元側 Hypergeom$(100,20,10)$、両平均2、分散1.6と $16/11$ を確認。
- P3-C02: $P(X>m)=q^m$ と無記憶性は $m,n\in\mathbb N_0$ なら正しい。NegBin$(2,p)$ のPMF、平均、分散、および $P(T>2\mid T>1)=1-p^2\neq1=P(T>1)$ という反例も確認。ただし問題文の量化がないため P3-MATH-002 とした。
- P3-C03: $S\sim\operatorname{Poisson}(\lambda+\mu)$、条件付き分布 Bin$(n,\lambda/(\lambda+\mu))$ とその平均を再計算した。
- P3-C04: 周辺二項分布、集約二項分布、分散 $n(p_1+p_2)\{1-(p_1+p_2)\}$ を確認。ただし共分散の狭義負性は現仮定では偽であり P3-MATH-003 とした。
- P3-C05: 5モデルの分布名、台、平均を全て確認。
- P3-D01: $0<p<1$ なら同時PMFは Poisson$(\lambda p)$ と Poisson$(\lambda q)$ のPMF積へ因数分解され、周辺分布と独立性が従う。端点問題は P3-MATH-004 に記録した。
- P3-DRILL-01: $N\sim\operatorname{Poisson}(8)$、条件付き Bin$(3,1/4)$、確率 $27/64$、$U\sim\operatorname{Poisson}(2)$、$V\sim\operatorname{Poisson}(6)$、独立、共分散0を確認。
- 演習IDは Level A 3問、B 3問、C 5問、D 1問の計12問で、解答IDと一対一に対応する。

## 指摘

### P3-MATH-001 — major

- 場所: `02_definitions.md` P3-DEF-01〜05、`03_theorems.md` P3-THM-01
- 根拠: 7分布のPMFを掲げるが、正規化は一つも示していない。P3-THM-01も5分布のPGF・平均・分散を表で提示し、「各PMFを級数へ代入」とだけ述べ、実際の級数和・微分を示していない。特に超幾何のVandermonde恒等式、負の二項の負の二項級数、多項定理は非自明であり、学習目標「平均分散を暗記だけでなく指示変数・PGFから再現する」を本文から達成できない。
- 修正案: 各PMFについて台上の総和を1まで導出する。少なくとも

$$
\sum_k\binom Kk\binom{N-K}{n-k}=\binom Nn,
$$

$$
\sum_{j=0}^{\infty}\binom{j+r-1}{r-1}q^j=(1-q)^{-r},
$$

および多項定理を明記する。P3-THM-01では各PGFをPMFから求め、$G'(1)$ と $G''(1)+G'(1)-G'(1)^2$ へ代入する過程を示すか、指示変数・独立和による導出を逐行で示す。

### P3-MATH-002 — major

- 場所: `06_exercises.md` P3-C02 (1)(2)、`07_solutions.md` P3-C02 詳細解答・本番答案
- 根拠: $m,n$ の範囲が問題文にない。台が整数である幾何分布に対し $P(X>m)=q^m$ は一般の実数 $m$ では偽で、例えば $m=1/2$ なら左辺は1、右辺は $q^{1/2}<1$ である。解答は暗黙に非負整数と仮定している。
- 修正案: 問題文に「$m,n\in\mathbb N_0$ とする」を明記し、詳細解答でもその範囲の下で最初の $m$ 回の失敗列を数える。

### P3-MATH-003 — major

- 場所: `06_exercises.md` P3-C04 (5)、`07_solutions.md` P3-C04 詳細解答・本番答案
- 根拠: 多項分布の定義は $p_i\geq0$ を許すため、$\operatorname{Cov}(X_1,X_2)=-np_1p_2$ は $p_1=0$ または $p_2=0$ なら0であり、問題文の $\operatorname{Cov}(X_1,X_2)<0$ は成立しない。解答も無条件に「負」としている。
- 修正案: P3-C04に $p_1>0,p_2>0$（および $n\geq1$）を仮定するか、設問と解答を $\operatorname{Cov}(X_1,X_2)\leq0$ に変更し、等号条件 $p_1p_2=0$ も説明する。

### P3-MATH-004 — major

- 場所: `06_exercises.md` P3-D01、`07_solutions.md` P3-D01
- 根拠: 分類確率 $p$ の範囲が明記されず、確率としては $p=0,1$ も許される。一方、P3-DEF-04はPoissonパラメータを $\lambda>0$ と定義しているため、端点では結論の Poisson$(\lambda p)$ または Poisson$(\lambda q)$ が章内未定義の Poisson$(0)$ になる。
- 修正案: P3-D01に $\lambda>0,0<p<1$ を明記する。またはP3-DEF-04を $\lambda\geq0$ に拡張して Poisson$(0)$ が0に退化する分布であることを説明し、端点を場合分けする。

### P3-MATH-005 — major

- 場所: `07_solutions.md` P3-C03・P3-C04・P3-D01 の完成形本番答案
- 根拠: P3-C03は設問(2)(3)への回答を「表示の積PMF」「周辺で割ると二項PMF」、P3-C04は分散を「表示式」、P3-D01は証明を「上の積へ因数分解」と書き、完成形答案そのものに参照先の式がない。詳細解答を見なければ主要な要求式・約分・因数分解を再現できず、「完成形」として採点可能な答案になっていない。
- 修正案: C03本番答案には $P(X=k,S=n)$ と条件付き二項PMFを明記する。C04には共分散を代入した分散式と最終式を残す。D01には同時PMFが二つのPoisson PMFの積になる等式を少なくとも一行残す。

### P3-MATH-006 — minor

- 場所: `03_theorems.md` P3-THM-03 証明末尾
- 根拠: $E[I_j]$ と二つの共分散を示した後、「分散和へ代入」とだけ書き、有限母集団補正が現れる代数を省略している。
- 修正案: 次を逐行で追加する。

$$
\begin{aligned}
\operatorname{Var}(X)
&=np(1-p)+n(n-1)\left\{-\frac{p(1-p)}{N-1}\right\}\\
&=np(1-p)\left(1-\frac{n-1}{N-1}\right)\\
&=np(1-p)\frac{N-n}{N-1}.
\end{aligned}
$$

### P3-MATH-007 — minor

- 場所: `02_definitions.md` P3-DEF-05 多項分布
- 根拠: $p_i\geq0$ と総和1はあるが、カテゴリ数 $m$ と試行回数 $n$ の範囲を明記していない。台・パラメータ範囲を初出時に示す規約に反する。
- 修正案: 例えば $m\geq2$、$n\in\mathbb N$（0試行も扱うなら $n\in\mathbb N_0$ と退化ケース）を明記する。

## 査読中に最新版で確認した修正

- P3-THM-04の裸 `qquad` は `\qquad` へ修正済みで、指示変数による多項共分散の導出も逐行化されている。
- P3-C02の負の二項分布が無記憶でないことは、$P(T>2\mid T>1)=1-p^2\neq1=P(T>1)$ により詳細解答・本番答案とも反証済みである。

## 機械検証

- 実行日時: 2026-08-10T00:58:17+09:00（査読記録作成後の最終実行）
- コマンド: `npm run validate`
- 結果: 成功（structure、KaTeX strict: 98 Markdown files、text: 106 generated files）。強化後の裸コマンド検査も成功した。

## 初回最終件数

- fatal: 0
- major: 5
- minor: 2

## 修正後再査読（第1回）

- 再査読担当ID: `/root/f0_math_review`（初回と同一担当）
- 再査読日時: 2026-08-10T01:04:55+09:00
- 対象: `00_overview.md`〜`08_exam_drill.md`、`chapter.yaml`、`glossary.yaml` の全文、新設P3-A04を含む全13演習・詳細解答・完成形本番答案、P3-DRILL-01
- 判定: **非承認**。初回7指摘は解消したが、新規 major 2件・minor 2件がある。

### 初回指摘の解消確認

- P3-MATH-001: **解消**。7分布のPMFは、二項定理、Vandermonde恒等式、幾何級数・負の二項級数、指数級数、多項定理により正規化された。P3-THM-01も各PGFと平均・分散の導出を追加した。ただし幾何PGFの新規転記誤りは P3-MATH-008 として切り出す。
- P3-MATH-002: **解消**。P3-C02は問題文と詳細解答で $m,n\in\mathbb N_0$ を明記し、尾確率と無記憶性の量化が正しくなった。
- P3-MATH-003: **解消**。P3-C04は $p_1>0,p_2>0$ を仮定し、$n\in\mathbb N$ はP3-DEF-05から従うため、$-np_1p_2<0$ が成立する。詳細解答・本番答案も一致する。
- P3-MATH-004: **解消**。P3-D01は $\lambda>0,0<p<1$ を明記し、$\lambda p,\lambda q>0$ がP3-DEF-04のパラメータ範囲に入る。
- P3-MATH-005: **解消**。P3-C03は積PMFと条件付き二項PMF、P3-C04は共分散を含む分散式、P3-D01は同時PMFのPoisson積への因数分解を完成形本番答案内に明記した。
- P3-MATH-006: **解消**。P3-THM-03は分散和から有限母集団補正まで3行で代数展開した。
- P3-MATH-007: **解消**。P3-DEF-05は $m\geq2,n\in\mathbb N$ を明記した。

### 全13問・ドリルの再計算

- 新設P3-A04は Bernoulli$(0.3)$ のPMF、平均0.3、分散0.21で正しい。問題ID 13件と解答ID 13件、`chapter.yaml` の個数 `4+3+5+1=13` は一致する。
- 初回の12問について確率、台、平均、分散、共分散、条件付き分布を全て再計算し、修正後の詳細解答・本番答案の数値に誤りはない。
- 超幾何の台と有限母集団補正、幾何・負の二項の試行回数規約、Poisson再生性・thinning、多項共分散、Poisson和を所与とした条件付き二項分布は再計算と一致する。
- P3-C05 (4) は問題文でPoisson過程モデルを明記したため Poisson$(3)$ の選択自体は正しい。ただし本番答案の表現は P3-MATH-011 のとおり修正が必要。

### P3-MATH-008 — major（新規）

- 場所: `03_theorems.md` P3-THM-01 幾何分布のPGF導出
- 根拠: 記載は

$$
G(s)=\sum_{k=1}^{\infty}q^{k-1}ps=\frac{ps}{1-qs}
$$

だが、PGFの被加数は $P(X=k)s^k=q^{k-1}ps^k$ である。記載された左辺をそのまま和すると $ps/(1-q)=s$ であり、右辺は導けない。
- 修正案: 左辺を $\sum_{k=1}^{\infty}q^{k-1}ps^k$ とし、$ps\sum_{j=0}^{\infty}(qs)^j=ps/(1-qs)$ と一段ずつ示す。

### P3-MATH-009 — major（新規）

- 場所: `08_exam_drill.md` P3-DRILL-01 問題冒頭と全解答
- 根拠: 「1時間当たり平均4のPoisson分布に従う」ことだけでは、2時間の総件数がPoisson$(8)$ になるとは限らない。異なる1時間区間の独立性と、区間長に比例するPoissonパラメータが必要である。現在の解答は暗黙に一様Poisson過程を仮定している。
- 修正案: 問題冒頭を「到着は率4/時の一様Poisson過程に従う」とするか、「2時間の総件数 $N$ は Poisson$(8)$ に従う」と直接仮定する。前者なら時間尺度と独立定常増分から $N\sim\operatorname{Poisson}(8)$ と説明する。

### P3-MATH-010 — minor（新規）

- 場所: `06_exercises.md` P3-C03、`07_solutions.md` P3-C03
- 根拠: 条件 $S=n$ と値 $X=k$ に用いる $n,k$ の整数範囲が問題文にない。詳細解答は $0\leq k\leq n$ のみ示すが、$n\in\mathbb N_0$ と整数性を明記していない。
- 修正案: 問題文に「$n\in\mathbb N_0$ とし、$k=0,\ldots,n$ について」と明記し、範囲外の確率は0であることも必要に応じて記す。

### P3-MATH-011 — minor（新規）

- 場所: `07_solutions.md` P3-C05 完成形本番答案 (4)
- 根拠: 問題文は「Poisson過程に従う到着の、平均3件となる区間」を問うが、本番答案は根拠なく「単位区間の件数」と言い換えている。区間長や率は与えられておらず、当該区間が単位区間とは限らない。
- 修正案: 「平均3件となる区間の発生件数なのでPoisson$(3)$」または「当該区間の件数なので」と直す。

### 機械検証

- 実行日時: 2026-08-10T01:04:55+09:00
- コマンド: `npm run validate`
- 結果: 成功（structure、KaTeX strict: 99 Markdown files、text: 107 generated files）。P3-MATH-008はKaTeXとして構文可能な誤式であるため機械検証では検出されない。

### 第1回再査読後の最終件数

- fatal: 0
- major: 2
- minor: 2

最終件数がゼロではないため、**承認しない**。

## 修正後再査読（第2回・最終）

- 再査読担当ID: `/root/f0_math_review`（初回から同一担当）
- 再査読日時: 2026-08-10T01:07:55+09:00
- 対象: `00_overview.md`〜`08_exam_drill.md`、`chapter.yaml`、`glossary.yaml` の全文、全13演習・詳細解答・完成形本番答案、P3-DRILL-01

### P3-MATH-008〜011 解消確認

- P3-MATH-008: **解消**。幾何分布のPGFは

$$
\sum_{k=1}^{\infty}q^{k-1}ps^k
=ps\sum_{j=0}^{\infty}(qs)^j
=\frac{ps}{1-qs}
$$

と正しい被加数と添字変換で逐行導出された。続く一階・二階微分、平均 $1/p$、分散 $q/p^2$ と整合する。
- P3-MATH-009: **解消**。P3-DRILL-01は到着を率4/時の斉時Poisson過程と明記したため、2時間の件数 $N\sim\operatorname{Poisson}(8)$、その後の条件付き二項分布とthinningを正当に適用できる。
- P3-MATH-010: **解消**。P3-C03は $n\in\mathbb N_0$、$k=0,\ldots,n$ を問題文に明記し、詳細解答の同時確率・条件付きPMFの範囲と一致する。
- P3-MATH-011: **解消**。P3-C05の詳細解答・本番答案は「指定区間」「その区間の平均が3」と記し、根拠なく単位区間へ言い換える表現を除いた。5項全てにモデル選択理由がある。

### 第2回全文再査読

- 全7分布について、台、パラメータ範囲、PMF正規化、PGF、平均・分散を再計算し、修正後本文と一致した。
- 超幾何のVandermonde正規化・台・有限母集団補正、幾何・負の二項の試行回数規約、Poisson再生性とthinning、多項共分散、Poisson和を条件とする二項分布を再確認した。
- 全13演習について、問題・詳細解答・完成形本番答案・採点基準を照合した。A 4問、B 3問、C 5問、D 1問で `chapter.yaml` と一致し、IDの欠落・重複はない。
- P3-DRILL-01は $N\sim\operatorname{Poisson}(8)$、$P(N=3)=e^{-8}8^3/3!$、$U\mid N=3\sim\operatorname{Bin}(3,1/4)$、確率 $27/64$、$U,V$ の周辺 Poisson$(2)$・Poisson$(6)$、独立性、共分散0を再計算し一致した。
- 新規の数理、論理展開、台・パラメータ、KaTeX、ID対応上の指摘はない。

### 機械検証

- 実行日時: 2026-08-10T01:07:55+09:00
- コマンド: `npm run validate`
- 結果: 成功（structure、KaTeX strict: 99 Markdown files、text: 107 generated files）。

### 最終件数

- fatal: 0
- major: 0
- minor: 0

独立数理査読として **承認** する。

## 過去問傾向対応改訂の再査読

- 担当ID: `/root/f0_math_review`
- 実行日時: 2026-08-11T10:03:22+09:00
- 対象: 横断参照2ファイル、`chapter.yaml`、`09_past_exam_practice.md`、全面改稿後のP3-DRILL-01
- 独立再計算: $N\sim\operatorname{Poisson}(2\lambda)$、$U\mid N=3\sim\operatorname{Bin}(3,1/4)$、$27/64$、thinning後の率 $\lambda/2,3\lambda/2$、独立性、$\operatorname{Var}(\tilde\lambda)=\lambda/(2m)$ を再確認した。

### PAST-MATH-P3D-001 — minor

- 場所: `08_exam_drill.md`「過去問傾向との対応」と問題5
- 根拠: 前文は「一致性に必要なChebyshev不等式は問題文で与える」と宣言するが、問題5は「Chebyshev不等式を用いて」と名称を挙げるだけで、不等式の式を与えていない。P2-DRILL-02で既出なので未修前提ではないが、自己完結性の宣言とは一致しない。
- 修正案: $P(|Z-EZ|\ge\varepsilon)\le\operatorname{Var}(Z)/\varepsilon^2$ を問題文に所与の式として追加するか、前文を「前章のChebyshev不等式を用いる」へ直す。

- 機械検証: `npm run validate` 成功（structure成功、KaTeX strict 146 Markdown、text 161ファイル）。
- 最終件数: `fatal: 0 / major: 0 / minor: 1`
- 判定: **未承認**。

## 過去問傾向対応改訂の修正後再査読

- 担当ID: `/root/f0_math_review`
- 再査読日時: 2026-08-11T10:18:58+09:00
- 対象: 横断索引、章全文、修正後P3-DRILL-01
- PAST-MATH-P3D-001: **解消**。有限分散の $T$ に対するChebyshev不等式が問題文に式で与えられ、自己完結性の宣言と一致した。
- 再計算結果: 2時間Poisson、条件付き二項、thinningの同時PMF因数分解、率推定量の不偏性・分散・確率収束を再確認した。
- 新規指摘: なし。
- 機械検証: `npm run validate` 成功（structure、KaTeX strict 146 Markdown、text 161ファイル）。
- 最終件数: `fatal: 0 / major: 0 / minor: 0`
- 判定: **承認**。
