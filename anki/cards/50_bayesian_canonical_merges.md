---
id: bayes-loss-decision-canonical
title: 事後期待損失を最小化してベイズ推定量を決める
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-loss-decision
type: strategy
difficulty: 4
priority: A
hashtags: [ベイズ統計, 損失関数, 事後平均, 事後中央値, MAP]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベイズ推定量と損失関数 }]
---

## 問題
データ $x$ を観測した後の事後密度を $\pi(\theta\mid x)$ とする。ベイズ決定は
$$
\rho(a\mid x)=E[L(\theta,a)\mid x]
$$
を最小にする行動 $a$ である。

次の損失に対する最適な $a$ を求めよ。

1. 二乗損失 $L(\theta,a)=(\theta-a)^2$
2. 絶対損失 $L(\theta,a)=|\theta-a|$
3. 過小評価の単位損失を $c_1$、過大評価の単位損失を $c_2$ とする非対称絶対損失
4. 離散母数に対する0-1損失 $L(\theta,a)=\boldsymbol1_{\{\theta\ne a\}}$

## 使用公式・定理
ベイズ推定量は、**事後期待損失を最小化する行動**である。

事後分布関数を
$$
F(a\mid x)=P(\theta\le a\mid x)
$$
と書く。

## 一手
損失関数を見たら推定量を丸暗記するのではなく、

$$
\text{損失} \to \text{事後期待損失} \to a\text{で最小化}
$$

の順に処理する。二乗損失なら微分、絶対損失なら $a$ の左右へ積分を分ける。

## 答え
- 二乗損失：事後平均 $E[\theta\mid x]$
- 絶対損失：事後中央値
- 非対称絶対損失：$c_1/(c_1+c_2)$ 事後分位点
- 離散0-1損失：MAP

## 計算例
### 1. 二乗損失

事後平均を $m=E[\theta\mid x]$ とする。事後期待損失を $a$ で微分すると
$$
\begin{aligned}
\rho(a\mid x)
&=E[(\theta-a)^2\mid x],\\
\frac{d}{da}\rho(a\mid x)
&=E[-2(\theta-a)\mid x]\\
&=-2E[\theta\mid x]+2a\\
&=2(a-m).
\end{aligned}
$$
したがって
$$
\frac{d}{da}\rho(a\mid x)=0
\Longleftrightarrow a=m.
$$
二階微分は2なので最小値である。

### 2. 絶対損失

連続事後分布を仮定すると
$$
\rho(a\mid x)
=\int_{-\infty}^{a}(a-\theta)\pi(\theta\mid x)d\theta
+\int_a^{\infty}(\theta-a)\pi(\theta\mid x)d\theta.
$$
Leibniz則で微分すると
$$
\begin{aligned}
\rho'(a\mid x)
&=\int_{-\infty}^{a}\pi(\theta\mid x)d\theta
 -\int_a^{\infty}\pi(\theta\mid x)d\theta\\
&=F(a\mid x)-\{1-F(a\mid x)\}\\
&=2F(a\mid x)-1.
\end{aligned}
$$
よって
$$
\rho'(a\mid x)=0
\Longleftrightarrow F(a\mid x)=\frac12,
$$
すなわち事後中央値を選ぶ。

### 3. 非対称絶対損失

過小評価側を $c_1$、過大評価側を $c_2$ とすると
$$
\rho'(a\mid x)
=-c_1\{1-F(a\mid x)\}+c_2F(a\mid x).
$$
これを0と置けば
$$
\begin{aligned}
c_2F(a\mid x)
&=c_1\{1-F(a\mid x)\},\\
(c_1+c_2)F(a\mid x)
&=c_1,\\
F(a\mid x)
&=\frac{c_1}{c_1+c_2}.
\end{aligned}
$$
例えば $c_1=3,c_2=1$ なら75%事後分位点である。

### 4. 0-1損失

離散母数なら
$$
\begin{aligned}
\rho(a\mid x)
&=E[\boldsymbol1_{\{\theta\ne a\}}\mid x]\\
&=P(\theta\ne a\mid x)\\
&=1-P(\theta=a\mid x).
\end{aligned}
$$
したがって事後確率 $P(\theta=a\mid x)$ を最大にするMAPを選ぶ。

## 注意
「二乗損失→平均、絶対損失→中央値、0-1損失→MAP」は結果だけでなく、すべて **事後期待損失の最小化**から出る。同じ原理の派生を別カードへ増殖させない。

<!-- CARD -->
---
id: bayes-posterior-predictive-canonical
title: 事後分布を積分して事後予測分布を作る
category: math-data-analysis
subcategory: math-bayesian-methods
topic: posterior-predictive
type: strategy
difficulty: 3
priority: A
hashtags: [ベイズ統計, 事後予測分布, 共役事前分布, ベータ分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 事後予測分布 }]
---

## 問題
観測済みデータを $x$、未知母数を $\theta$、新しい観測を $Y_{\mathrm{new}}$ とする。

1. 事後予測分布 $p(y\mid x)$ を事後分布 $\pi(\theta\mid x)$ で表せ。
2. $p\sim\operatorname{Beta}(2,3)$、条件付きで $X\mid p\sim\operatorname{Binomial}(5,p)$ とし、$X=4$ を観測した。次のベルヌーイ試行が成功する事後予測確率を求めよ。

## 使用公式・定理
新観測は母数 $\theta$ を条件にすると既存データと独立なので、観測後の事後予測分布は
$$
p(y_{\mathrm{new}}\mid x)
=\int p(y_{\mathrm{new}}\mid\theta)\pi(\theta\mid x)d\theta.
$$
観測前の事前予測分布は同じ周辺化で
$$
m(y)
=\int p(y\mid\theta)\pi(\theta)d\theta
$$
と書く。違いは、母数を平均する重みが事前分布か事後分布かだけである。

ベータ–二項共役更新では
$$
p\mid X=x\sim\operatorname{Beta}(a+x,b+n-x).
$$

## 一手
事後予測では母数を点推定値へ固定しない。

$$
\text{新データの条件付き分布}
\times
\text{母数の事後分布}
$$

を母数について積分し、母数不確実性を消去する。

## 答え
一般形は
$$
p(y\mid x)
=\int p(y\mid\theta)\pi(\theta\mid x)d\theta.
$$

数値例の次回成功確率は
$$
P(Y_{\mathrm{new}}=1\mid X=4)=0.6.
$$

## 計算例
事前分布は $\operatorname{Beta}(2,3)$、5回中4成功だから、事後分布は
$$
\begin{aligned}
p\mid X=4
&\sim\operatorname{Beta}(2+4,\ 3+5-4)\\
&=\operatorname{Beta}(6,4).
\end{aligned}
$$

新しいベルヌーイ試行について
$$
P(Y_{\mathrm{new}}=1\mid p)=p
$$
だから、事後予測確率は
$$
\begin{aligned}
P(Y_{\mathrm{new}}=1\mid X=4)
&=\int_0^1 p\,\pi(p\mid X=4)dp\\
&=E[p\mid X=4]\\
&=\frac{6}{6+4}\\
&=0.6.
\end{aligned}
$$

プラグイン法との違いは、$p$ を1個の推定値へ固定せず、事後分布全体で平均している点である。

## 注意
事前予測と事後予測はどちらも「条件付き分布を母数分布で平均して母数を消去する」操作である。観測前は $\pi(\theta)$、観測後は $\pi(\theta\mid x)$ を使う。ガンマ–ポアソン、ガンマ–指数などでも本質は同じであり、分布名ごとに同じ周辺化操作を別カード化しない。
