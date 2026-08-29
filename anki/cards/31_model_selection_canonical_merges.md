---
id: ms-information-criteria-canonical
title: AIC・BIC・MallowsのCpで当てはまりと複雑さを比較する
category: math-estimation
subcategory: math-model-selection
topic: information-criteria-comparison
type: strategy
difficulty: 3
priority: S
hashtags: [AIC, BIC, MallowsのCp, モデル選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---

## 問題
モデル選択で使う AIC、BIC、Mallows の $C_p$ について、次を答えよ。

1. AIC と BIC の式を書き、罰則の違いを説明せよ。
2. $n=200$ で、モデルAは $-2\ell(\widehat\theta)=300,k=4$、モデルBは $-2\ell(\widehat\theta)=294,k=7$ である。AIC と BIC で比較せよ。
3. 回帰の候補モデルで $SSE_p=80$、完全モデルから得た $\widehat\sigma^2=4$、$n=30$、候補モデルの切片込み係数数 $p=6$ のとき、Mallows の $C_p$ を求めよ。

## 使用公式・定理
AIC と BIC はどちらも
$$
\text{当てはまりの悪さ}+\text{複雑さへの罰則}
$$
という形で、値が小さいモデルを選ぶ。

$$
\operatorname{AIC}=-2\ell(\widehat\theta)+2k,
$$
$$
\operatorname{BIC}=-2\ell(\widehat\theta)+k\log n.
$$
ここで $k$ は推定した自由母数の個数である。

回帰で完全モデルから共通の誤差分散推定値 $\widehat\sigma^2$ を得るとき、Mallows の $C_p$ は
$$
C_p=\frac{SSE_p}{\widehat\sigma^2}-n+2p.
$$
適切に指定された候補モデルでは $C_p$ が $p$ 付近になることが一つの目安である。

## 一手
規準名ごとに別々の暗記カードを作らず、まず
$$
\text{適合改善が、追加した複雑さの罰則を上回るか}
$$
を見る。

AIC は1母数あたり2、BIC は1母数あたり $\log n$ を罰する。$n$ が大きいと通常 BIC の方が複雑なモデルを強く罰する。$C_p$ は回帰の残差平方和を共通の誤差分散で尺度化して複雑さを補正する。

## 答え
数値例では
$$
\operatorname{AIC}_A=308,
\qquad
\operatorname{AIC}_B=308
$$
で同点である。

一方
$$
\operatorname{BIC}_A\approx321.19,
\qquad
\operatorname{BIC}_B\approx331.09
$$
なので BIC ではモデルAを選ぶ。

Mallows の $C_p$ は
$$
C_p=2.
$$

## 計算例
AIC は
$$
\begin{aligned}
\operatorname{AIC}_A
&=300+2(4)\\
&=308,
\end{aligned}
$$
$$
\begin{aligned}
\operatorname{AIC}_B
&=294+2(7)\\
&=308.
\end{aligned}
$$
モデルBは $-2\ell$ を6だけ改善したが、3母数追加によるAIC罰則も $2\times3=6$ 増えたため同点になる。

BIC では
$$
\log200\approx5.2983.
$$
したがって
$$
\begin{aligned}
\operatorname{BIC}_A
&=300+4(5.2983)\\
&\approx321.19,
\end{aligned}
$$
$$
\begin{aligned}
\operatorname{BIC}_B
&=294+7(5.2983)\\
&\approx331.09.
\end{aligned}
$$
追加3母数のBIC罰則は約
$$
3\log200\approx15.89
$$
なので、適合改善6を上回りモデルAが選ばれる。

Mallows の $C_p$ は
$$
\begin{aligned}
C_p
&=\frac{80}{4}-30+2(6)\\
&=20-30+12\\
&=2.
\end{aligned}
$$
この例では $C_p=2$ は $p=6$ よりかなり小さい。$C_p\approx p$ は絶対的な合否判定ではなく、候補モデル間比較やモデル仮定と合わせて使う目安である。

## 注意
AIC と BIC は同じデータ・同じ尤度定義のモデル同士で比較する。BIC の $\log$ は自然対数。AIC は予測的なKL損失との関係、BIC は正則条件下でのモデル同定・周辺尤度近似との関係が強く、目的が異なるため常に同じモデルを選ぶとは限らない。

$C_p$ では $\widehat\sigma^2$ を候補ごとに別々に作らず、通常は十分大きい共通モデルから得る。
