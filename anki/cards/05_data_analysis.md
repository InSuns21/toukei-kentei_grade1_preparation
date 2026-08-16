---
id: data-ols-slope
title: 単回帰の傾きを中心化平方和から求める
category: math-data-analysis
subcategory: math-regression
topic: ordinary-least-squares
type: formula
difficulty: 2
priority: B
hashtags: [回帰分析, 最小二乗法, 平方和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰分析 }]
---
## 問題
データ $(x,y)=(1,1),(2,2),(3,5)$ に切片あり単回帰を当てはめ、傾き $\widehat\beta_1$ を求めよ。
## 答え
$$\widehat\beta_1=\frac{\sum_i(x_i-\overline x)(y_i-\overline y)}{\sum_i(x_i-\overline x)^2}.$$
## 使用公式・定理
切片あり単回帰の正規方程式を解くと
$$\widehat\beta_1=\frac{S_{xy}}{S_{xx}},\quad S_{xy}=\sum_i(x_i-\overline x)(y_i-\overline y),\quad S_{xx}=\sum_i(x_i-\overline x)^2.$$
## 計算例
まず $\overline x=2$, $\overline y=8/3$。公式の分子・分母を別々に計算すると
$$\begin{aligned}S_{xy}&=(-1)(-5/3)+0(-2/3)+1(7/3)=4,\\S_{xx}&=(-1)^2+0^2+1^2=2.\end{aligned}$$
したがって $\widehat\beta_1=S_{xy}/S_{xx}=4/2=2$。
## 注意
切片ありなら必ず中心化する。

<!-- CARD -->
---
id: data-anova-decomposition
title: 一元配置分散分析の平方和を分解する
category: math-data-analysis
subcategory: math-anova
topic: sums-of-squares
type: expansion
difficulty: 2
priority: B
hashtags: [ANOVA, 平方和, 分散分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散分析 }]
---
## 問題
観測 $y_{ij}$ の全平方和を群間平方和と群内平方和へ分解せよ。
## 答え
$y_{ij}-\overline y=(y_{ij}-\overline y_i)+(\overline y_i-\overline y)$ と分ける。
## 使用公式・定理
一元配置の平方和分解は
$$SS_T=SS_B+SS_W.$$
## 計算例
交差項は各群で $\sum_j(y_{ij}-\overline y_i)=0$ だから消え、
$$\sum_{i,j}(y_{ij}-\overline y)^2=\sum_i n_i(\overline y_i-\overline y)^2+\sum_{i,j}(y_{ij}-\overline y_i)^2.$$
数値例 $y_1=(1,3)$、$y_2=(2,4)$ では $\overline y=2.5$、群平均は $2,3$ である。
$$SS_T=5,\qquad SS_B=1,\qquad SS_W=4,$$
よって $5=1+4$ と確認できる。
## 重要な一手
群平均を足して引く。

<!-- CARD -->
---
id: data-odds-ratio
title: 2×2分割表のオッズ比を計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: odds-ratio
type: formula
difficulty: 1
priority: B
hashtags: [分割表, オッズ比, カテゴリカル]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分割表 }]
---
## 問題
2×2表を $\begin{pmatrix}a&b\\c&d\end{pmatrix}=\begin{pmatrix}20&10\\5&15\end{pmatrix}$ とする。第1列を事象あり、第2列を事象なしとして、第1行対第2行の標本オッズ比を求めよ。
## 答え
$$\widehat{\mathrm{OR}}=\frac{a/b}{c/d}=\frac{ad}{bc}.$$
## 使用公式・定理
$$\text{オッズ比}=\frac{\text{第1群のオッズ}}{\text{第2群のオッズ}}=\frac{a/b}{c/d}.$$
## 計算例
$$\widehat{\mathrm{OR}}=\frac{20\cdot15}{10\cdot5}=6.$$
## 注意
行・列の基準カテゴリーを反転すると逆数になる。

<!-- CARD -->
---
id: data-bootstrap-mean
title: bootstrapで標準誤差を推定する
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap
type: strategy
difficulty: 2
priority: B
hashtags: [bootstrap, シミュレーション, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: bootstrap }]
---
## 問題
標本 $x=(1,2,3)$ から標本平均の標準誤差をbootstrapで推定する手順は？
## 方針
経験分布からサイズ3の復元抽出を繰り返し、再標本平均の標準偏差を取る。
## 使用公式・定理
bootstrap標準誤差は、再標本統計量 $T^{*(1)},\ldots,T^{*(B)}$ の標本標準偏差
$$\widehat{\operatorname{se}}_{\mathrm{boot}}=\sqrt{\frac1{B-1}\sum_{b=1}^B(T^{*(b)}-\overline T^*)^2}.$$
## 計算例
再標本 $(1,1,3),(2,3,3),(1,2,2)$ の平均は $5/3,8/3,5/3$。実際には多数回 $B$ 反復し、
$$\widehat{\mathrm{se}}_{\mathrm{boot}}=\sqrt{\frac1{B-1}\sum_{b=1}^B(\overline x^{*(b)}-\overline{\overline x^*})^2}.$$
この3反復では平均の平均が $2$ だから
$$\begin{aligned}\widehat{\mathrm{se}}_{\mathrm{boot}}&=\sqrt{\frac{(5/3-2)^2+(8/3-2)^2+(5/3-2)^2}{3-1}}\\&=\sqrt{\frac{1/9+4/9+1/9}{2}}\\&=\sqrt{\frac13}.\end{aligned}$$
これは手順確認用の粗い値であり、実用上は十分大きい $B$ を使う。
## 注意
元標本から非復元抽出しない。
