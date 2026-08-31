---
id: cat-table-margins
title: 2×2分割表の周辺度数を計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: margins
type: calc_step
difficulty: 1
priority: A
hashtags: [分割表, 周辺度数, 2×2表]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分割表と周辺度数 }]
---

## 問題
観測表 $\begin{pmatrix}30&20\\10&40\end{pmatrix}$ の行和、列和、総数を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$n_{i\cdot}=\sum_jn_{ij}$、$n_{\cdot j}=\sum_in_{ij}$、$n=\sum_{i,j}n_{ij}$。

## 答え
行和は $(50,50)$、列和は $(40,60)$、総数は
$$n=30+20+10+40=100.$$

## 計算例
行和の合計と列和の合計はともに100。

## 注意
期待度数や条件付き割合の分母を選ぶ前に周辺度数を確認する。
<!-- CARD -->

---
id: cat-multinomial-model
title: 1標本分割表を多項分布で表す
category: math-data-analysis
subcategory: math-contingency-tables
topic: multinomial-model
type: formula
difficulty: 2
priority: A
hashtags: [多項分布, 分割表, セル確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多項分布モデル }]
---

## 問題
$K$ セルの度数ベクトルの多項分布モデルを書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$E[N_k]=np_k$、$\operatorname{Cov}(N_k,N_l)=-np_kp_l$（$k\ne l$）。

## 答え
$$\boldsymbol N=(N_1,\ldots,N_K)\sim\operatorname{Multinomial}(n;p_1,\ldots,p_K),$$
ここで $n_k\in\mathbb N_0$、$\sum_kn_k=n$、$p_k\ge0$、$\sum_kp_k=1$ とする。
$$P(\boldsymbol N=\boldsymbol n)=\frac{n!}{\prod_kn_k!}\prod_kp_k^{n_k},\qquad \sum_kp_k=1.$$

## 計算例
最尤推定量は $\widehat p_k=N_k/n$。

## 注意
総数nを固定するため、セル度数は独立ではない。
<!-- CARD -->

---
id: cat-product-multinomial
title: 行和固定の積多項モデルを区別する
category: math-data-analysis
subcategory: math-contingency-tables
topic: product-multinomial
type: recognition
difficulty: 3
priority: A
hashtags: [積多項分布, 分割表, 標本設計]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多項分布モデル }]
---

## 問題
各処理群の標本数 $n_{i\cdot}$ を事前に固定して反応カテゴリを数える設計の確率モデルを答えよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

固定された周辺度数は確率変数としてモデル化しない。

## 答え
各行が独立な多項分布に従う積多項モデル
$$\boldsymbol N_i\sim\operatorname{Multinomial}(n_{i\cdot};p_{i1},\ldots,p_{ic})$$
を使う。

## 計算例
治療群50人、対照群50人を固定した試験では行和固定。

## 注意
どの周辺和が固定かは標本設計から判断する。
<!-- CARD -->

---
id: cat-expected-counts-independence
title: 独立性帰無仮説の期待度数を導く
category: math-data-analysis
subcategory: math-contingency-tables
topic: expected-counts
type: calc_step
difficulty: 2
priority: A
hashtags: [期待度数, 独立性, カイ二乗検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 期待度数の計算 }]
---

## 問題
独立性の下で $E_{ij}=n_{i\cdot}n_{\cdot j}/n$ を導け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立なら同時確率は周辺確率の積。

## 答え
独立性より $p_{ij}=p_{i\cdot}p_{\cdot j}$。周辺確率を
$$\widehat p_{i\cdot}=n_{i\cdot}/n,\qquad \widehat p_{\cdot j}=n_{\cdot j}/n$$
で推定すると
$$E_{ij}=n\widehat p_{i\cdot}\widehat p_{\cdot j}
=\frac{n_{i\cdot}n_{\cdot j}}n.$$

## 計算例
行和50、列和40、n=100のセル期待度数は20。

## 注意
期待度数は観測度数ではなく帰無仮説下の当てはめ値。
<!-- CARD -->

---
id: cat-pearson-shortcut-2x2
title: 2×2表のPearson統計量を短縮公式で計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: pearson-shortcut
type: calc_step
difficulty: 3
priority: A
hashtags: [カイ二乗検定, 2×2表, 短縮公式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗検定 }]
---

## 問題
表 $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ のPearson統計量の短縮公式を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$X^2=\sum_{i,j}(O_{ij}-E_{ij})^2/E_{ij}$ を2×2表で整理したもの。

## 答え
$$X^2=\frac{n(ad-bc)^2}{(a+b)(c+d)(a+c)(b+d)}.$$

## 計算例
$(a,b,c,d)=(30,20,10,40)$ なら
$$X^2=\frac{100(1200-200)^2}{50\cdot50\cdot40\cdot60}=16.67.$$

## 注意
セル配置を変えると $ad-bc$ の対応も変わる。
<!-- CARD -->

---
id: cat-likelihood-ratio-g2
title: 尤度比カイ二乗統計量G二乗を計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: likelihood-ratio-g2
type: formula
difficulty: 3
priority: A
hashtags: [尤度比検定, G二乗, 分割表]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗検定 }]
---

## 問題
観測度数 $O_{ij}$ と帰無モデル期待度数 $E_{ij}$ からG二乗統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$0\log(0/E)$ の寄与は極限により0とする。

## 答え
$$G^2=2\sum_{i,j}O_{ij}\log\frac{O_{ij}}{E_{ij}}.$$
帰無仮説下で大標本ではPearson $X^2$ と同じ自由度のカイ二乗分布へ近づく。

## 計算例
$O=12,E=10$ のセル寄与は $24\log1.2\approx4.376$。

## 注意
単一セル寄与は負にもなり得るが、全体のG二乗は非負。
<!-- CARD -->

---
id: cat-standardized-residual
title: 分割表のPearson残差を計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: pearson-residual
type: calc_step
difficulty: 2
priority: A
hashtags: [Pearson残差, セル診断, 期待度数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗検定 }]
---

## 問題
あるセルで $O=18,E=10$ のPearson残差を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$X^2=\sum r_{ij}^2$。

## 答え
$$r=\frac{O-E}{\sqrt E}=\frac8{\sqrt{10}}\approx2.53.$$
このセルのPearson統計量への寄与は
$$r^2=6.4.$$

## 計算例
正の残差は帰無モデルより観測が多いことを示す。

## 注意
多くのセルを同時に見る場合、単純な±2基準は探索的。
<!-- CARD -->

---
id: cat-odds-ratio-formula
title: 2×2表のオッズ比をセルから求める
category: math-data-analysis
subcategory: math-contingency-tables
topic: odds-ratio
type: formula
difficulty: 2
priority: B
hashtags: [オッズ比, 2×2表, 効果量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 2×2表のオッズ比 }]
---

## 問題
表 $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ のオッズ比を書け。

## 記号・用語
- OR：オッズ比（odds ratio）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$OR=1$ は行と列の独立に対応する。

## 答え
第1行のオッズは $a/b$、第2行は $c/d$ なので
$$\widehat{OR}=\frac{a/b}{c/d}=\frac{ad}{bc}.$$

## 計算例
$(a,b,c,d)=(30,20,10,40)$ なら $OR=6$。

## 注意
行・列の基準カテゴリを反転すると逆数になる。
<!-- CARD -->

---
id: cat-log-odds-ratio-ci
title: オッズ比の信頼区間を対数尺度で作る
category: math-data-analysis
subcategory: math-contingency-tables
topic: odds-ratio-ci
type: calc_step
difficulty: 3
priority: B
hashtags: [オッズ比, 信頼区間, デルタ法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 2×2表のオッズ比 }]
---

## 問題
$a=30,b=20,c=10,d=40$ のオッズ比の95%信頼区間を近似せよ。$z_{0.025}=1.96$ とする。

## 記号・用語
- SE：標準誤差（standard error）
- OR：オッズ比（odds ratio）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

2×2表のセル度数を $a,b,c,d$ とすると、標本オッズ比とその対数の標準誤差は
$$\widehat{OR}=\frac{ad}{bc},\qquad
\operatorname{SE}(\log\widehat{OR})=
\sqrt{\frac1a+\frac1b+\frac1c+\frac1d}.$$
したがって近似的な信頼係数 $1-\alpha$ の区間は
$$\left[
\exp\{\log\widehat{OR}-z_{\alpha/2}\operatorname{SE}\},
\exp\{\log\widehat{OR}+z_{\alpha/2}\operatorname{SE}\}
\right],$$
ただし $z_{\alpha/2}$ は標準正規分布の上側 $\alpha/2$ 点である。

## 答え
$$\widehat{OR}=6,\qquad
\operatorname{SE}(\log\widehat{OR})=\sqrt{1/30+1/20+1/10+1/40}\approx0.456.$$
したがって対数区間は
$$\log6\pm1.96(0.456)=1.792\pm0.894.$$
指数変換して
$$[e^{0.898},e^{2.686}]\approx[2.45,14.67].$$

## 計算例
区間が1を含まないので独立性を否定する方向。

## 注意
小度数や0セルでは正確法などを検討する。
<!-- CARD -->

---
id: cat-relative-risk
title: コホート表から相対リスクを計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: relative-risk
type: calc_step
difficulty: 2
priority: B
hashtags: [相対リスク, コホート研究, リスク]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 相対リスク }]
---

## 問題
曝露群で発症30/100、非曝露群で発症10/100。相対リスクを求めよ。

## 記号・用語
- RR：リスク比（risk ratio）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$RR=P(D=1\mid E=1)/P(D=1\mid E=0)$。

## 答え
$$RR=\frac{30/100}{10/100}=3.$$
曝露群の発症リスクは非曝露群の3倍。

## 計算例
各行の発症割合を先に計算する。

## 注意
症例対照研究では行別リスクが標本設計で固定されず、通常RRを直接推定できない。
<!-- CARD -->

---
id: cat-risk-difference
title: リスク差と治療必要数を計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: risk-difference
type: calc_step
difficulty: 2
priority: B
hashtags: [リスク差, 絶対効果, NNT]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: リスク差 }]
---

## 問題
対照群の発症率0.20、治療群0.10。治療によるリスク差と治療必要数を求めよ。

## 記号・用語
- NNT：治療必要数（number needed to treat）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

リスク差は2群の確率の差、NNTは有益方向の絶対リスク差の逆数。

## 答え
絶対リスク減少は
$$0.20-0.10=0.10.$$
したがって治療必要数は
$$NNT=1/0.10=10.$$

## 計算例
10人治療すると平均1件の発症を防ぐ尺度。

## 注意
NNTは観察期間と基準リスクに依存する。
<!-- CARD -->

---
id: cat-or-versus-rr
title: オッズ比と相対リスクを区別する
category: math-data-analysis
subcategory: math-contingency-tables
topic: or-versus-rr
type: recognition
difficulty: 2
priority: B
hashtags: [オッズ比, 相対リスク, 稀な事象]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 相対リスク }]
---

## 問題
曝露群リスク0.20、非曝露群0.10のRRとORを比較せよ。

## 記号・用語
- OR：オッズ比（odds ratio）
- RR：リスク比（risk ratio）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

オッズは $p/(1-p)$。

## 答え
$$RR=0.20/0.10=2,$$
$$OR=\frac{0.20/0.80}{0.10/0.90}=2.25.$$
事象が稀ならオッズと確率が近くORはRRへ近づく。

## 計算例
リスクが高いとORはRRより1から遠くなりやすい。

## 注意
ORを「リスクが何倍」とそのまま読むのは避ける。
<!-- CARD -->

---
id: cat-fisher-hypergeometric
title: フィッシャー検定の条件付き確率を計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: fisher-exact
type: calc_step
difficulty: 3
priority: B
hashtags: [フィッシャー検定, 超幾何分布, 2×2表]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー検定 }]
---

## 問題
行和 $(4,6)$、第1列和5の2×2表で左上セル $A=3$ の帰無確率を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$A\sim\operatorname{Hypergeometric}(N=10,K=5,n=4)$。

## 答え
周辺和を固定すると
$$P(A=3)=\frac{\binom53\binom51}{\binom{10}4}
=\frac{50}{210}\approx0.2381.$$

## 計算例
残り3セルは周辺和から一意に決まる。

## 注意
両側P値は「同程度以上に帰無確率が小さい表」の合計など定義流儀がある。
<!-- CARD -->

---
id: cat-yates-corrected-shortcut
title: 2×2表のYates修正短縮式を書く
category: math-data-analysis
subcategory: math-contingency-tables
topic: yates-correction
type: formula
difficulty: 3
priority: B
hashtags: [イェーツの補正, 連続修正, 2×2表]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: イェーツの補正 }]
---

## 問題
2×2表のYates連続修正統計量を短縮形で書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

各セルで $|O-E|$ を0.5だけ縮めるPearson統計量と同値。

## 答え
$$X_Y^2=\frac{n\{\max(0,|ad-bc|-n/2)\}^2}
{(a+b)(c+d)(a+c)(b+d)}.$$

## 計算例
修正により通常のPearson統計量以下になる。

## 注意
小標本ではフィッシャー検定の方が直接的なことが多い。
<!-- CARD -->

---
id: cat-mcnemar-choice
title: 対応あり2値表でMcNemar検定を選ぶ
category: math-data-analysis
subcategory: math-contingency-tables
topic: mcnemar-choice
type: recognition
difficulty: 2
priority: B
hashtags: [マクネマー検定, 対応あり, 不一致対]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マクネマー検定 }]
---

## 問題
同じ30人の治療前後の陽性・陰性を2×2表にした。どのセルを使って何を検定するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

一致セルは変化方向の比較に情報を与えない。

## 答え
不一致対の度数を $b,c$ とし
$$H_0:P(\text{前+・後-})=P(\text{前-・後+})$$
をMcNemar検定で調べる。帰無仮説下では
$$b\mid(b+c)\sim\operatorname{Binomial}(b+c,1/2).$$

## 計算例
$b+c$ が小さければ正確二項検定を使う。

## 注意
独立2群のフィッシャー検定と混同しない。
<!-- CARD -->

---
id: cat-mantel-haenszel-or
title: 層別2×2表のMantel–Haenszel共通オッズ比を計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: mantel-haenszel
type: formula
difficulty: 4
priority: B
hashtags: [Mantel-Haenszel法, 層別解析, 共通オッズ比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Mantel–Haenszel法（基本） }]
---

## 問題
層 $k$ の2×2セルを $(a_k,b_k,c_k,d_k)$、総数を $n_k$ とするとき共通オッズ比推定量を書け。

## 記号・用語
- OR：オッズ比（odds ratio）
- MH：Mantel–Haenszel法

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

各層の交差積を層サイズで重み付けして合成する。

## 答え
$$\widehat{OR}_{MH}=
\frac{\sum_k a_kd_k/n_k}{\sum_k b_kc_k/n_k}.$$

## 計算例
2層で $a_kd_k/n_k=(2,3)$、$b_kc_k/n_k=(1,1)$ なら $OR_{MH}=5/2=2.5$。

## 注意
層ごとのオッズ比が概ね共通という前提で要約する。
<!-- CARD -->

---
id: cat-mantel-haenszel-numeric
title: 2層の共通オッズ比を数値で求める
category: math-data-analysis
subcategory: math-contingency-tables
topic: mantel-haenszel-numeric
type: calc_step
difficulty: 4
priority: B
hashtags: [Mantel-Haenszel法, 層別解析, 計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Mantel–Haenszel法（基本） }]
---

## 問題
層1の $(a,b,c,d)=(8,2,4,6)$、層2は $(3,7,2,8)$。$OR_{MH}$ を求めよ。

## 記号・用語
- OR：オッズ比（odds ratio）
- MH：Mantel–Haenszel法
- 交絡：処置・曝露と結果の双方に関係する第三の要因によって効果比較が歪むこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\widehat{OR}_{MH}=\sum a_kd_k/n_k\,/\,\sum b_kc_k/n_k$。

## 答え
両層とも $n_k=20$。
$$\sum_k\frac{a_kd_k}{n_k}=\frac{48}{20}+\frac{24}{20}=3.6,$$
$$\sum_k\frac{b_kc_k}{n_k}=\frac8{20}+\frac{14}{20}=1.1.$$
よって
$$\widehat{OR}_{MH}=3.6/1.1\approx3.27.$$

## 計算例
層別交絡を調整した共通関連の尺度。

## 注意
各層ORが大きく異なるなら単一の共通ORで要約しない。
<!-- CARD -->

---
id: cat-simpson-paradox
title: Simpsonのパラドックスを数値で確認する
category: math-data-analysis
subcategory: math-contingency-tables
topic: simpson-paradox
type: calc_step
difficulty: 3
priority: B
hashtags: [Simpsonのパラドックス, 交絡, 層別解析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Simpsonのパラドックス }]
---

## 問題
軽症層で治療A 9/10、B 80/100、重症層でA 20/100、B 1/10が成功した。層別と合計の成功率を比較せよ。

## 記号・用語
- 交絡：処置・曝露と結果の双方に関係する第三の要因によって効果比較が歪むこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

層構成比が群間で異なると、周辺割合は層別割合の異なる重み付き平均になる。

## 答え
軽症ではA 90%>B 80%、重症でもA 20%>B 10%。しかし合計では
$$A:\frac{29}{110}=26.4\%,\qquad B:\frac{81}{110}=73.6\%,$$
となり方向が逆転する。

## 計算例
Aには重症が多く、Bには軽症が多い。

## 注意
周辺関連だけで因果効果を判断せず、交絡候補で層別する。
<!-- CARD -->

---
id: cat-independence-homogeneity
title: 独立性検定と同質性検定を区別する
category: math-data-analysis
subcategory: math-contingency-tables
topic: independence-homogeneity
type: recognition
difficulty: 2
priority: A
hashtags: [独立性, 同質性, 標本設計]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗検定 }]
---

## 問題
独立性検定と同質性検定は何が異なり、何が同じか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

検定計算は同じでも確率モデルと解釈が異なる。

## 答え
独立性検定は1母集団から2カテゴリ変数を観測し独立性を問う。同質性検定は複数母集団・群のカテゴリ分布が同じかを問う。どちらも期待度数
$$E_{ij}=n_{i\cdot}n_{\cdot j}/n$$
と自由度 $(r-1)(c-1)$ のPearson統計量を使う。

## 計算例
群サイズ固定の比較は同質性、無作為抽出者の性別×選好は独立性。

## 注意
結論文を標本設計に合わせる。
<!-- CARD -->

---
id: cat-loglinear-independence
title: 2元分割表の独立モデルを対数線形で表す
category: math-data-analysis
subcategory: math-contingency-tables
topic: loglinear-independence
type: formula
difficulty: 3
priority: B
hashtags: [対数線形モデル, 独立性, 期待度数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 対数線形モデル（基本） }]
---

## 問題
2元表の期待度数 $m_{ij}$ に対する独立対数線形モデルを書け。

## 記号・用語
- 飽和モデル：各観測を完全に当てはめられる最大自由度のモデル

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立モデルの最尤当てはめ値は $\widehat m_{ij}=n_{i\cdot}n_{\cdot j}/n$。

## 答え
$$\log m_{ij}=\lambda+\lambda_i^A+\lambda_j^B.$$
交互作用項 $\lambda_{ij}^{AB}$ がないため
$$m_{ij}=e^\lambda e^{\lambda_i^A}e^{\lambda_j^B}$$
と行効果と列効果の積へ分解される。

## 計算例
飽和モデルはさらに $\lambda_{ij}^{AB}$ を含む。

## 注意
識別のため基準カテゴリ制約または和0制約が必要。
<!-- CARD -->

---
id: cat-loglinear-deviance-df
title: 対数線形独立モデルの逸脱度自由度を求める
category: math-data-analysis
subcategory: math-contingency-tables
topic: loglinear-deviance
type: calc_step
difficulty: 3
priority: B
hashtags: [対数線形モデル, 逸脱度, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 対数線形モデル（基本） }]
---

## 問題
$3\times4$ 表で独立モデルを飽和モデルと比べる逸脱度の自由度を求めよ。

## 記号・用語
- 飽和モデル：各観測を完全に当てはめられる最大自由度のモデル
- 逸脱度：当てはめモデルと飽和モデルの最大対数尤度差を2倍した適合度指標

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

飽和モデルとの独立なパラメータ数差が自由度。

## 答え
$$\nu=(r-1)(c-1)=(3-1)(4-1)=6.$$
逸脱度は
$$G^2=2\sum_{i,j}O_{ij}\log(O_{ij}/\widehat m_{ij})$$
で、大標本では $\chi_6^2$ へ近づく。

## 計算例
Pearson独立性検定と同じ自由度。

## 注意
疎な表ではカイ二乗近似が悪いことがある。
<!-- CARD -->

---
id: cat-logistic-odds-ratio
title: ロジスティック回帰係数をオッズ比へ変換する
category: math-data-analysis
subcategory: math-contingency-tables
topic: logistic-connection
type: calc_step
difficulty: 3
priority: A
hashtags: [ロジスティック回帰, オッズ比, 分割表]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ロジスティック回帰との接続 }]
---

## 問題
$\operatorname{logit}P(Y=1\mid X)=\beta_0+\beta_1X$ で、Xが1増えるときのオッズ比を求めよ。

## 記号・用語
- OR：オッズ比（odds ratio）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{logit}(p)=\log\{p/(1-p)\}$。

## 答え
$$\log\frac{\operatorname{odds}(X+1)}{\operatorname{odds}(X)}=\beta_1$$
だから
$$OR=e^{\beta_1}.$$

## 計算例
$\beta_1=\log2$ なら調整オッズ比は2。

## 注意
他の共変量を含む場合は、それらを固定した条件付きオッズ比。
<!-- CARD -->

---
id: cat-logistic-2x2-equivalence
title: 2×2表の標本オッズ比とロジスティック係数を結ぶ
category: math-data-analysis
subcategory: math-contingency-tables
topic: logistic-2x2
type: calc_step
difficulty: 3
priority: A
hashtags: [ロジスティック回帰, 2×2表, オッズ比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ロジスティック回帰との接続 }]
---

## 問題
2群の2×2表 $(a,b;c,d)$ を群ダミーXでロジスティック回帰したときの傾き推定量を書け。

## 記号・用語
- OR：オッズ比（odds ratio）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

飽和した2群ロジスティックモデルは各群の観測割合を再現する。

## 答え
各群の標本オッズの対数差なので
$$\widehat\beta_1=\log(a/b)-\log(c/d)=\log\frac{ad}{bc}=\log\widehat{OR}.$$

## 計算例
$\widehat{OR}=4$ なら $\widehat\beta_1=\log4\approx1.386$。

## 注意
0セルでは有限な最尤推定値が存在しないことがある。
<!-- CARD -->

---
id: cat-zero-cell-correction
title: 0セルでオッズ比計算の問題を判定する
category: math-data-analysis
subcategory: math-contingency-tables
topic: zero-cell
type: recognition
difficulty: 2
priority: B
hashtags: [0セル, オッズ比, 完全分離]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 2×2表のオッズ比 }]
---

## 問題
2×2表の1セルが0のとき、通常の標本ORと対数標準誤差に何が起こるか。

## 記号・用語
- OR：オッズ比（odds ratio）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ロジスティック回帰では完全分離に対応することがある。

## 答え
$$\widehat{OR}=ad/(bc)$$
は0または無限大となり、
$$\sqrt{1/a+1/b+1/c+1/d}$$
も定義できない。正確法、罰則付き推定、目的に応じた0.5補正などを検討する。

## 計算例
補正を使うなら全4セルに0.5を加える流儀がある。

## 注意
補正は万能ではなく、解析法と解釈を明示する。
<!-- CARD -->

---
id: cat-trend-test-scores
title: 順序カテゴリの傾向検定を構成する
category: math-data-analysis
subcategory: math-contingency-tables
topic: trend-test
type: formula
difficulty: 4
priority: B
hashtags: [傾向検定, 順序カテゴリ, スコア]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分割表と周辺度数 }]
---

## 問題
曝露水準が順序付き3群で発症割合の単調傾向を検定するとき、カテゴリに何を与えるか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

順序情報を無視した一般独立性検定より自由度1で方向性を捉える。

## 答え
順序を表すスコア $x_1<x_2<x_3$ を与え、二項反応との線形関連を検定する。代表的にはロジスティックモデル
$$\operatorname{logit}(p_i)=\beta_0+\beta_1x_i$$
で $H_0:\beta_1=0$ を検定する。

## 計算例
等間隔水準ならスコア $(0,1,2)$。

## 注意
スコア選択は仮定する傾向の形を反映する。
<!-- CARD -->

---
id: cat-measure-selection
title: 標本設計から2×2効果尺度を選ぶ
category: math-data-analysis
subcategory: math-contingency-tables
topic: measure-selection
type: recognition
difficulty: 2
priority: B
hashtags: [オッズ比, 相対リスク, リスク差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 2×2表のオッズ比 }]
---

## 問題
(a) コホート研究、(b) 症例対照研究で自然に推定できる関連尺度を答えよ。

## 記号・用語
- OR：オッズ比（odds ratio）
- RR：リスク比（risk ratio）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

症例対照抽出でも疾患オッズ比は曝露オッズ比と一致する。

## 答え
(a) 群別リスクが推定できるため、リスク差・相対リスク・オッズ比を計算できる。(b) 症例数と対照数が設計で固定されるためリスクは直接推定できず、オッズ比が基本となる。

## 計算例
稀な疾患では症例対照研究のORをRRの近似として扱うことがある。

## 注意
効果尺度の選択は研究設計と問いに依存する。
<!-- CARD -->

---
id: np-sign-median-ci
title: 符号検定を二項分布へ帰着し中央値の信頼区間まで解く
category: math-data-analysis
subcategory: math-nonparametric
topic: sign-test-median-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 符号検定
  - 中央値
  - 二項分布
  - 信頼区間
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 符号検定
---

## 問題
連続な共通分布からの独立同分布標本 $X_1,\ldots,X_n$ を考える。

1. 帰無仮説 $H_0:\operatorname{median}(X)=m_0$ の下で、$m_0$ より大きい観測数
$$
S=\sum_{i=1}^n\boldsymbol1_{\{X_i>m_0\}}
$$
の帰無分布を求めよ。$n=10$ で $S=10$ となる確率も求めよ。
2. 順序統計量 $X_{(1)}\le\cdots\le X_{(n)}$ を用いて、符号検定を反転した中央値の分布によらない $100(1-\alpha)$% 信頼区間を書け。

## 使用公式・定理
連続分布で $m_0$ が中央値なら
$$
P(X_i>m_0)=P(X_i<m_0)=\frac12.
$$
独立標本では各符号が独立なベルヌーイ試行となるため
$$
S\sim\operatorname{Binomial}(n,1/2).
$$

同値 $X_i=m_0$ が起こり得る場合は通常その観測を除き、有効標本数 $n_{\mathrm{eff}}$ で二項分布を作る。

信頼区間はこの二項帰無分布を反転する。$B\sim\operatorname{Binomial}(n,1/2)$ とし
$$
P(B\le k-1)\le\frac\alpha2
$$
を満たす最大の $k$ を選べば
$$
[X_{(k)},X_{(n-k+1)}]
$$
は被覆確率が少なくとも $1-\alpha$ の中央値信頼区間となる。

## 答え
1.
$$
\boxed{S\sim\operatorname{Binomial}(n,1/2)}.
$$
$n=10$ では
$$
P(S=10)=\left(\frac12\right)^{10}=\boxed{2^{-10}}.
$$

2. $B\sim\operatorname{Binomial}(n,1/2)$ に対して
$$
P(B\le k-1)\le\alpha/2
$$
を満たす最大の $k$ を選ぶと
$$
\boxed{[X_{(k)},X_{(n-k+1)}]}
$$
が分布によらない中央値の信頼区間となる。

## 計算例
符号検定では観測値の大きさ自体を使わず、$m_0$ の上か下かだけを数える。したがって外れ値の大きさに直接は影響されない一方、順位や距離の情報は捨てる。

信頼区間では $k$ を大きくするほど区間は狭くなるが、二項尾確率が増えて被覆確率は下がる。離散性のため名目被覆率より保守的になることがある。

## 注意
$X_i=m_0$ の同値をそのまま成功・失敗へ割り当てない。通常は除外して有効標本数を数え直す。

符号検定が仮定するのは中央値の位置であり、ウィルコクソン符号付き順位和検定が使う0対称性とは別である。
<!-- CARD -->

---
id: np-wilcoxon-null-moments
title: ウィルコクソン符号付き順位和の平均と分散を求める
category: math-data-analysis
subcategory: math-nonparametric
topic: signed-rank-moments
type: formula
difficulty: 3
priority: B
hashtags: [ウィルコクソン符号付き順位和検定, 帰無分布, 正規近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ウィルコクソン符号付き順位和検定 }]
---

## 問題
独立同分布な対応差が連続で0について対称であり、0差・同順位がない標本サイズnで、正順位和 $W_+$ の帰無平均と分散を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\sum r=n(n+1)/2$、$\sum r^2=n(n+1)(2n+1)/6$。

## 答え
対称性により各絶対値順位の符号が独立に確率1/2で正側へ入るので
$$E[W_+]=\frac12\sum_{r=1}^nr=\frac{n(n+1)}4,$$
$$\operatorname{Var}(W_+)=\frac14\sum_{r=1}^nr^2
=\frac{n(n+1)(2n+1)}{24}.$$

## 計算例
n=5なら平均7.5、分散13.75。

## 注意
同順位があると分散補正が必要。
<!-- CARD -->

---
id: np-wilcoxon-normal-approx
title: ウィルコクソン符号付き順位和検定を正規近似する
category: math-data-analysis
subcategory: math-nonparametric
topic: signed-rank-normal
type: calc_step
difficulty: 3
priority: B
hashtags: [ウィルコクソン符号付き順位和検定, 正規近似, 連続修正]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ウィルコクソン符号付き順位和検定 }]
---

## 問題
独立同分布な対応差が連続で0対称、0差・同順位なしとする。n=20、$W_+=150$ を連続修正なしで標準化せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

大標本で $Z=\{W_+-E(W_+)\}/\sqrt{\operatorname{Var}(W_+)}\approx N(0,1)$。

## 答え
$$E[W_+]=20\cdot21/4=105,$$
$$\operatorname{Var}(W_+)=20\cdot21\cdot41/24=717.5.$$
したがって
$$Z=\frac{150-105}{\sqrt{717.5}}\approx1.68.$$

## 計算例
右片側5%点1.645と比べれば棄却する。

## 注意
実務では連続修正と同順位補正の有無を明示する。
<!-- CARD -->

---
id: np-mann-whitney-ranksum-equivalence
title: マン・ホイットニーU統計量と順位和を結ぶ
category: math-data-analysis
subcategory: math-nonparametric
topic: mann-whitney-ranksum
type: formula
difficulty: 3
priority: B
hashtags: [マン・ホイットニーU検定, ウィルコクソン順位和検定, 順位和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ウィルコクソン順位和検定（マン・ホイットニーU検定） }]
---

## 問題
第1群の順位和を $R_1$ としたときのマン・ホイットニーU統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

第1群だけを最小順位に並べたときの順位和 $n_1(n_1+1)/2$ を引く。

## 答え
$$U_1=R_1-\frac{n_1(n_1+1)}2.$$
$U_1$ は第1群の観測が第2群の観測より大きい対の個数（同値は1/2）に一致する。

## 計算例
n1=3、順位和R1=12ならU1=12-6=6。

## 注意
Uの向きは定義流儀により逆になるため式を確認する。
<!-- CARD -->

---
id: np-mann-whitney-null-moments
title: マン・ホイットニーU統計量の帰無平均と分散を書く
category: math-data-analysis
subcategory: math-nonparametric
topic: mann-whitney-moments
type: formula
difficulty: 3
priority: B
hashtags: [マン・ホイットニーU検定, 帰無分布, 正規近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ウィルコクソン順位和検定（マン・ホイットニーU検定） }]
---

## 問題
連続な同一分布の帰無仮説下でU統計量の平均と分散を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

群ラベルの全割当てが交換可能である。

## 答え
同順位がなければ
$$E[U]=\frac{n_1n_2}{2},\qquad
\operatorname{Var}(U)=\frac{n_1n_2(n_1+n_2+1)}{12}.$$

## 計算例
$n_1=4,n_2=5$ なら平均10、分散 $4\cdot5\cdot10/12=50/3$。

## 注意
同順位では分散を小さくする補正項が入る。
<!-- CARD -->

---
id: np-mann-whitney-normal-numeric
title: マン・ホイットニーU統計量を正規近似で判定する
category: math-data-analysis
subcategory: math-nonparametric
topic: mann-whitney-normal
type: calc_step
difficulty: 3
priority: B
hashtags: [マン・ホイットニーU検定, 正規近似, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ウィルコクソン順位和検定（マン・ホイットニーU検定） }]
---

## 問題
$n_1=n_2=10,U=20$ を連続修正なしで標準化せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

大標本で標準化Uは近似的に標準正規分布。

## 答え
$$E[U]=50,\qquad \operatorname{Var}(U)=\frac{10\cdot10\cdot21}{12}=175.$$
$$Z=\frac{20-50}{\sqrt{175}}\approx-2.27.$$
両側5%点1.96より絶対値が大きいので帰無仮説を棄却する。

## 計算例
観測Uが帰無平均50よりかなり小さい。

## 注意
小標本では正確分布を使う。
<!-- CARD -->

---
id: np-kruskal-wallis-formula
title: Kruskal–Wallis統計量を構成する
category: math-data-analysis
subcategory: math-nonparametric
topic: kruskal-wallis
type: formula
difficulty: 3
priority: B
hashtags: [Kruskal-Wallis検定, 多群比較, 順位和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Kruskal–Wallis検定 }]
---

## 問題
k独立群、総数N、群iの順位和 $R_i$ に対するKruskal–Wallis統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全標本をまとめて順位付けし、群間の平均順位差を測る。

## 答え
同順位なしでは
$$H=\frac{12}{N(N+1)}\sum_{i=1}^k\frac{R_i^2}{n_i}-3(N+1).$$
帰無仮説下で大標本では $H\approx\chi_{k-1}^2$。

## 計算例
k=3なら漸近自由度2。

## 注意
位置差として解釈するには群分布の形状が同じなどの条件が必要。
<!-- CARD -->

---
id: np-kruskal-wallis-numeric
title: Kruskal–Wallis統計量を数値で計算する
category: math-data-analysis
subcategory: math-nonparametric
topic: kruskal-wallis-numeric
type: calc_step
difficulty: 3
priority: B
hashtags: [Kruskal-Wallis検定, 順位和, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Kruskal–Wallis検定 }]
---

## 問題
3群各2個、順位和が $R=(3,7,11)$ のときHを求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$H=12\sum R_i^2/n_i\,/\{N(N+1)\}-3(N+1)$。

## 答え
$N=6$ なので
$$H=\frac{12}{6\cdot7}\left(\frac{3^2}{2}+\frac{7^2}{2}+\frac{11^2}{2}\right)-3\cdot7.$$
括弧内は $89.5$ だから
$$H=\frac27(89.5)-21\approx4.571.$$

## 計算例
5%点 $\chi^2_{2,0.05}=5.991$ より小さく棄却しない。

## 注意
順位和の合計は $3+7+11=21=N(N+1)/2$ と確認する。
<!-- CARD -->

---
id: np-friedman-formula
title: Friedman検定統計量を書く
category: math-data-analysis
subcategory: math-nonparametric
topic: friedman
type: formula
difficulty: 3
priority: B
hashtags: [Friedman検定, 対応多群, ブロック]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Friedman検定 }]
---

## 問題
bブロック、k処理で、処理jのブロック内順位和を $R_j$ とするFriedman統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

各ブロック内で1からkまで順位を付ける。

## 答え
同順位なしでは
$$Q=\frac{12}{bk(k+1)}\sum_{j=1}^kR_j^2-3b(k+1).$$
帰無仮説下で大標本では $Q\approx\chi_{k-1}^2$。

## 計算例
k=3なら自由度2。

## 注意
独立群のKruskal–Wallis検定ではなく、対応・ブロックありの比較に使う。
<!-- CARD -->

---
id: np-friedman-numeric
title: Friedman検定を順位和から計算する
category: math-data-analysis
subcategory: math-nonparametric
topic: friedman-numeric
type: calc_step
difficulty: 3
priority: B
hashtags: [Friedman検定, 順位和, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Friedman検定 }]
---

## 問題
b=4ブロック、k=3処理で順位和 $R=(4,8,12)$。Qを求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$Q=12\sum R_j^2/\{bk(k+1)\}-3b(k+1)$。

## 答え
$$Q=\frac{12}{4\cdot3\cdot4}(4^2+8^2+12^2)-3\cdot4\cdot4.$$
平方和は224なので
$$Q=224/4-48=8.$$

## 計算例
$\chi^2_{2,0.05}=5.991$ より大きく、漸近5%で棄却する。

## 注意
各ブロックの順位和は $1+2+3=6$、全体では24。
<!-- CARD -->

---
id: np-ks-two-sample
title: 2標本Kolmogorov–Smirnov統計量を計算する
category: math-data-analysis
subcategory: math-nonparametric
topic: ks-two-sample
type: formula
difficulty: 3
priority: B
hashtags: [Kolmogorov-Smirnov検定, 2標本, 経験分布関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Kolmogorov–Smirnov検定 }]
---

## 問題
互いに独立な2つの独立同分布標本の経験分布関数を $F_m,G_n$ とするとき、両側KS統計量を書け。

## 記号・用語
- KS：Kolmogorov–Smirnov

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

経験分布関数の最大垂直距離を測る。

## 答え
$$D_{m,n}=\sup_x|F_m(x)-G_n(x)|.$$
連続な同一分布の帰無仮説下では、分布によらない帰無分布を持つ。

## 計算例
ある点で $F_m=0.8,G_n=0.3$ なら $D_{m,n}\ge0.5$。

## 注意
位置差だけでなく分散・形状差にも反応する。
<!-- CARD -->

---
id: np-spearman-formula
title: Spearman順位相関を順位差から計算する
category: math-data-analysis
subcategory: math-nonparametric
topic: spearman
type: formula
difficulty: 2
priority: B
hashtags: [Spearman順位相関, 順位差, 単調関連]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順位相関係数 }]
---

## 問題
同順位なしのn組で、X順位とY順位の差を $d_i$ とするSpearman順位相関を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Spearman相関は順位に置き換えたPearson相関。

## 答え
$$r_S=1-\frac{6\sum_{i=1}^nd_i^2}{n(n^2-1)}.$$

## 計算例
順位が完全一致なら全 $d_i=0$ で $r_S=1$。

## 注意
同順位がある場合は平均順位に対するPearson相関を直接計算する。
<!-- CARD -->

---
id: np-spearman-numeric
title: Spearman順位相関を数値で求める
category: math-data-analysis
subcategory: math-nonparametric
topic: spearman-numeric
type: calc_step
difficulty: 2
priority: B
hashtags: [Spearman順位相関, 数値計算, 順位]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順位相関係数 }]
---

## 問題
n=4、順位差が $(0,-1,1,0)$ のとき $r_S$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$r_S=1-6\sum d_i^2/\{n(n^2-1)\}$。

## 答え
$$\sum d_i^2=0+1+1+0=2,$$
$$r_S=1-\frac{6\cdot2}{4(4^2-1)}=1-\frac{12}{60}=0.8.$$

## 計算例
強い正の単調関連を示す。

## 注意
元尺度での直線関係を直接測るものではない。
<!-- CARD -->

---
id: np-kendall-tau
title: Kendallのtauを一致対と不一致対から計算する
category: math-data-analysis
subcategory: math-nonparametric
topic: kendall-tau
type: calc_step
difficulty: 3
priority: B
hashtags: [Kendall順位相関, 一致対, 不一致対]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順位相関係数 }]
---

## 問題
同順位なしのn=5組で、一致対C=8、不一致対D=2。Kendallの $\tau$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

2観測対でXとYの大小方向が同じなら一致対、逆なら不一致対。

## 答え
全対数は $\binom52=10$ で
$$\tau=\frac{C-D}{\binom n2}=\frac{8-2}{10}=0.6.$$

## 計算例
$C+D=10$ を確認する。

## 注意
同順位にはtau-bなどの補正版を使う。
<!-- CARD -->

---
id: np-runs-test-moments
title: 連検定の連の数の平均と分散を書く
category: math-data-analysis
subcategory: math-nonparametric
topic: runs-test
type: formula
difficulty: 4
priority: B
hashtags: [連検定, 無作為性, 連]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 連検定 }]
---

## 問題
2種類の記号がそれぞれ $n_1,n_2$ 個ある無作為列で、連の数Rの平均と分散を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同じ記号が連続する最大ブロックを1つの連と数える。

## 答え
$$E[R]=1+\frac{2n_1n_2}{n_1+n_2},$$
$$\operatorname{Var}(R)=\frac{2n_1n_2(2n_1n_2-n_1-n_2)}{(n_1+n_2)^2(n_1+n_2-1)}.$$

## 計算例
列 $++--+- $ の連は $++,--,+,-$ の4個。

## 注意
連が少なすぎても多すぎても無作為性に反する。
<!-- CARD -->

---
id: np-runs-test-numeric
title: 連の数を標準化する
category: math-data-analysis
subcategory: math-nonparametric
topic: runs-test-numeric
type: calc_step
difficulty: 3
priority: B
hashtags: [連検定, 正規近似, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 連検定 }]
---

## 問題
$n_1=n_2=10$、観測された連の数がR=5。連続修正なしで標準化せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

大標本で標準化Rは近似的に標準正規分布。

## 答え
$$E[R]=1+\frac{2\cdot10\cdot10}{20}=11,$$
$$\operatorname{Var}(R)=\frac{200(200-20)}{20^2\cdot19}=\frac{90}{19}\approx4.737.$$
したがって
$$Z=\frac{5-11}{\sqrt{90/19}}\approx-2.76.$$

## 計算例
両側5%で無作為性を棄却する。

## 注意
少ない連は同種記号のクラスタリングを示す。
<!-- CARD -->

---
id: np-median-test
title: k標本中央値検定を分割表へ帰着する
category: math-data-analysis
subcategory: math-nonparametric
topic: median-test
type: strategy
difficulty: 2
priority: B
hashtags: [中央値検定, 分割表, 多群比較]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中央値検定 }]
---

## 問題
k群の中央値が等しいかを調べる中央値検定の手順を述べよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度は $(k-1)(2-1)=k-1$。

## 答え
全データの共通標本中央値を求め、各観測を「中央値以下」「中央値超」に二分する。群×上下の $k\times2$ 表を作り、独立性のカイ二乗検定を行う。

## 計算例
k=3なら自由度2。

## 注意
順位の大部分を捨てるためKruskal–Wallis検定より検出力が低いことが多い。
<!-- CARD -->

---
id: np-permutation-difference-means
title: 置換検定の正確P値を列挙する
category: math-data-analysis
subcategory: math-nonparametric
topic: permutation-exact
type: calc_step
difficulty: 3
priority: B
hashtags: [置換検定, 交換可能性, 正確P値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 置換検定の考え方 }]
---

## 問題
結合データ $(1,2,3,4)$ を2群各2個へ分け、観測群が $(1,2)$ と $(3,4)$。統計量を平均差の絶対値とする両側置換P値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

帰無仮説下の交換可能性により全群ラベル割当てが等確率。

## 答え
群1の選び方は $\binom42=6$ 通り。観測統計量は
$$|1.5-3.5|=2.$$
同程度以上は群1が $(1,2)$ または $(3,4)$ の2通りなので
$$p=2/6=1/3.$$

## 計算例
5%では棄却しない。

## 注意
順列を数えるとき群内順序は区別しない。
<!-- CARD -->

---
id: np-exchangeability-condition
title: 置換検定の交換可能性を判定する
category: math-data-analysis
subcategory: math-nonparametric
topic: exchangeability
type: condition
difficulty: 3
priority: B
hashtags: [置換検定, 交換可能性, 標本設計]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 置換検定の考え方 }]
---

## 問題
独立2群のラベルを全観測間で置換してよい帰無仮説上の条件を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

無作為割付け実験では割付け機構そのものが置換分布の根拠になる。

## 答え
帰無仮説下で結合分布が群ラベルの置換に不変、すなわち観測が同一分布から来て交換可能であることが必要。

## 計算例
群間で分散だけが異なる帰無設定では、単純なラベル置換は一般に正確でない。

## 注意
独立性だけでは交換可能性を保証しない。
<!-- CARD -->

---
id: np-rank-null-distribution
title: 順位検定の帰無分布が分布によらない理由を説明する
category: math-data-analysis
subcategory: math-nonparametric
topic: rank-null-distribution
type: recognition
difficulty: 3
priority: B
hashtags: [順位検定, 帰無分布, 分布によらない検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順位検定の帰無分布 }]
---

## 問題
連続な同一分布の帰無仮説下で、順位検定の帰無分布が元の分布形に依存しない理由を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

確率積分変換により累積分布関数 $F$ に対する $F(X_i)$ は独立な一様分布となり、順位は保たれる。

## 答え
連続同一分布の独立標本では同順位が確率0で、全ての順位順列が等確率 $1/n!$ になる。統計量が順位だけの関数なら、その分布は元の累積分布関数に依存しない。

## 計算例
正規分布でも指数分布でも、同一分布帰無仮説下の順位順列確率は同じ。

## 注意
離散分布の同順位ではこの単純な議論を補正する必要がある。
<!-- CARD -->

---
id: np-tie-correction
title: Kruskal–Wallis検定の同順位補正を計算する
category: math-data-analysis
subcategory: math-nonparametric
topic: tie-correction
type: formula
difficulty: 4
priority: B
hashtags: [同順位補正, Kruskal-Wallis検定, 順位]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順位検定の帰無分布 }]
---

## 問題
同順位群の大きさを $t_g$ とするとき、Kruskal–Wallis統計量の補正係数を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同順位は順位分散を減らすため、その減少分を補う。

## 答え
$$C=1-\frac{\sum_g(t_g^3-t_g)}{N^3-N},$$
未補正統計量を
$$H_{\mathrm{corr}}=H/C$$
と補正する。

## 計算例
同順位がなければ全 $t_g=1$ でC=1。

## 注意
平均順位の付与と分散補正を両方行う。
<!-- CARD -->

---
id: np-asymptotic-relative-efficiency
title: ウィルコクソン検定の漸近相対効率を解釈する
category: math-data-analysis
subcategory: math-nonparametric
topic: nonparametric-efficiency
type: recognition
difficulty: 3
priority: B
hashtags: [漸近相対効率, ウィルコクソン検定, t検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック法の効率 }]
---

## 問題
正規分布の位置差に対するウィルコクソン順位和検定のt検定に対する漸近相対効率が $3/\pi\approx0.955$ とは何を意味するか。

## 記号・用語
- ARE：漸近相対効率（asymptotic relative efficiency）
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{ARE}(W,T)$ は同一検出力を得るための必要標本数比の逆比。

## 答え
同じ局所的検出力を得るため、ウィルコクソン検定は漸近的にt検定の約
$$1/(3/\pi)=\pi/3\approx1.047$$
倍の標本数を要するという意味。

## 計算例
正規分布でも必要標本数の増加は約4.7%にとどまる（効率そのものは約4.5%低い）。

## 注意
重い裾の分布では順位検定がt検定より高効率になり得る。
<!-- CARD -->

---
id: np-hodges-lehmann-paired
title: 対応差のホッジス–レーマン推定量を求める
category: math-data-analysis
subcategory: math-nonparametric
topic: hodges-lehmann
type: calc_step
difficulty: 4
priority: B
hashtags: [ホッジス–レーマン推定量, ウィルコクソン符号付き順位和検定, 位置差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ウィルコクソン符号付き順位和検定 }]
---

## 問題
対応差が $(1,3)$ のとき、ウォルシュ平均に基づくホッジス–レーマン推定量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

1標本・対応ありのホッジス–レーマン推定量は全ウォルシュ平均 $(D_i+D_j)/2$ の中央値。

## 答え
$i\le j$ のWalsh平均は
$$\frac{1+1}{2}=1,\qquad \frac{1+3}{2}=2,\qquad \frac{3+3}{2}=3.$$
その中央値は2なので位置差推定量は2。

## 計算例
単なる差の中央値も2だが一般には一致しない。

## 注意
ウィルコクソン符号付き順位和検定に対応する効果推定量。
<!-- CARD -->

---
id: np-rank-biserial-effect
title: マン・ホイットニーU統計量から確率的優越度を求める
category: math-data-analysis
subcategory: math-nonparametric
topic: probabilistic-superiority
type: calc_step
difficulty: 3
priority: B
hashtags: [マン・ホイットニーU検定, 効果量, 確率的優越度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ウィルコクソン順位和検定（マン・ホイットニーU検定） }]
---

## 問題
$n_1=5,n_2=4$、第1群が第2群に勝つ対の数としてU=15。確率的優越度を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Uは全 $n_1n_2$ 対の勝数（同値は1/2）を数える。

## 答え
$$\widehat P(X_1>X_2)+\frac12\widehat P(X_1=X_2)
=\frac{U}{n_1n_2}=\frac{15}{20}=0.75.$$

## 計算例
無差の基準は0.5。

## 注意
Uの向きの定義を確認して解釈する。
<!-- CARD -->

---
id: np-method-choice-summary
title: 設計と群数から順位検定を選ぶ
category: math-data-analysis
subcategory: math-nonparametric
topic: method-choice
type: recognition
difficulty: 2
priority: B
hashtags: [検定選択, ノンパラメトリック検定, 標本設計]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック法の効率 }]
---

## 問題
(a) 対応2群、(b) 独立2群、(c) 独立k群、(d) 対応k群の位置差に適する順位検定を選べ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立・対応と群数を先に判定する。

## 答え
(a) ウィルコクソン符号付き順位和検定、(b) マン・ホイットニーU検定（ウィルコクソン順位和検定）、(c) クラスカル–ウォリス検定、(d) フリードマン検定。

## 計算例
同じ被験者を3条件で測定したらFriedman検定。

## 注意
各検定の対称性・同形分布など追加仮定も確認する。
<!-- CARD -->
