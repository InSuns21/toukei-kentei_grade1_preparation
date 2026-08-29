---
id: data-ols-slope
title: 単回帰の傾きを中心化平方和から求める
category: math-data-analysis
subcategory: math-regression
topic: ordinary-least-squares
type: formula
difficulty: 2
priority: S
hashtags:
  - 回帰分析
  - 最小二乗法
  - 平方和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 回帰分析
archive_reason: duplicate
canonical_card: reg-ols-normal-equations-simple
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
id: data-odds-ratio
title: 2×2分割表のオッズ比を計算する
category: math-data-analysis
subcategory: math-contingency-tables
topic: odds-ratio
type: formula
difficulty: 1
priority: A
hashtags:
  - 分割表
  - オッズ比
  - カテゴリカル
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分割表
archive_reason: duplicate
canonical_card: cat-odds-ratio-formula
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
