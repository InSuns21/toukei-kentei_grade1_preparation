---
id: test-np-bernoulli
title: Neyman--Pearson補題で棄却方向を決める
category: math-testing
subcategory: math-test-derivation
topic: neyman-pearson
type: strategy
difficulty: 3
priority: S
hashtags: [ネイマン・ピアソンの基本定理, 検定, 尤度比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Neyman--Pearsonの補題 }]
---
## 問題
$X$ は二項分布 $\operatorname{Binomial}(n,p)$ に従うとする。ただし $X\in\{0,\ldots,n\}$、$P(X=x)=\binom nxp^x(1-p)^{n-x}$ である。$H_0:p=p_0$ 対 $H_1:p=p_1$（$0<p_0<p_1<1$）の最強力検定の棄却方向は？
## 方針
尤度比が $X$ の単調増加関数かを調べる。
## 使用公式・定理
Neyman--Pearson補題：単純仮説同士では $L(p_1;x)/L(p_0;x)$ が大きい標本点から棄却域へ入れる。
## 計算例
$$\frac{L(p_1;X)}{L(p_0;X)}=\left(\frac{p_1}{p_0}\right)^X\left(\frac{1-p_1}{1-p_0}\right)^{n-X}.$$
尤度比を $R(x)$ とすると
$$\frac{R(x+1)}{R(x)}=\frac{p_1(1-p_0)}{p_0(1-p_1)}>1.$$
よって $R(x)$ は $x$ とともに増え、$X$ が大きいとき棄却する。
## 重要な一手
有意水準を満たす臨界値は $H_0$ 下で決める。厳密なサイズが必要なら臨界点で無作為化する場合がある。

<!-- CARD -->
---
id: test-chi-square-fit
title: 適合度検定の自由度を数える
category: math-testing
subcategory: math-various-tests
topic: chi-square-goodness-fit
type: pitfall
difficulty: 2
priority: A
hashtags: [適合度の検定, カイ二乗, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 適合度の検定 }]
---
## 問題
$k=5$ 区分の正則で識別可能な帰無モデルで、各区分確率は正、期待度数は標本サイズとともに増えるとする。内部母数を最尤法で1個推定したときの自由度は？
## 答え
区分確率の和が1という制約と、推定した母数の個数を引く。
## 使用公式・定理
母数を $r$ 個推定したPearson適合度統計量は、条件の下でカイ二乗分布へ収束し、
$$\sum_{j=1}^k\frac{(O_j-E_j)^2}{E_j}\xrightarrow{d}\chi^2_{k-1-r}.$$
## 計算例
$$\mathrm{df}=k-1-r=5-1-1=3.$$
## 注意
機械的に $k-1$ としない。期待度数が小さすぎる区分は統合も検討する。

<!-- CARD -->
---
id: test-sign-test
title: 符号検定を二項分布へ帰着する
category: math-testing
subcategory: math-various-tests
topic: sign-test
type: recognition
difficulty: 2
priority: A
hashtags: [ノンパラメトリック, 符号検定, 二項分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック法 }]
---
## 問題
連続な共通分布からの独立同分布標本 $X_1,\ldots,X_{10}$ について、中央値が $m_0$ かを符号だけで検定する。$m_0$ より大きい個数 $S$ の帰無分布は？
## 答え
同値を除けば各符号は成功確率 $1/2$ のベルヌーイ試行である。
## 使用公式・定理
連続分布で中央値が $m_0$ なら $P(X_i>m_0)=1/2$。独立標本の正符号数は
$$S=\sum_{i=1}^n\boldsymbol{1}_{\{X_i>m_0\}}\sim\operatorname{Binomial}(n,1/2).$$
## 計算例
$$S\sim\operatorname{Binomial}(10,1/2),\qquad P(S=10)=2^{-10}.$$
## 注意
$X_i=m_0$ の同値は通常除外し、有効標本数を数え直す。
