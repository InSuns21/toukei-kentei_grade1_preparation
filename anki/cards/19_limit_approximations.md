---
id: dist-weak-law-chebyshev
title: チェビシェフの不等式から大数の弱法則を導く
category: math-probability
subcategory: math-limit-approximations
topic: weak-law-chebyshev
type: expansion
difficulty: 3
priority: S
hashtags: [大数の弱法則, チェビシェフの不等式, 確率収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の弱法則 }]
---
## 問題
$X_1,X_2,\ldots$ は独立同分布で $E[X_i]=\mu$、$\operatorname{Var}(X_i)=\sigma^2<\infty$ とする。標本平均 $\overline X_n$ が $\mu$ に確率収束することを、チェビシェフの不等式から示せ。

## 答え
任意の $\varepsilon>0$ に対して $P(|\overline X_n-\mu|\ge\varepsilon)\to0$ を示す。

## 使用公式・定理
有限分散の確率変数 $Y$ に対するチェビシェフの不等式は
$$P(|Y-E[Y]|\ge\varepsilon)\le\frac{\operatorname{Var}(Y)}{\varepsilon^2}\qquad(\varepsilon>0).$$
独立性から
$$E[\overline X_n]=\mu,\qquad \operatorname{Var}(\overline X_n)=\frac{\sigma^2}{n}.$$

## 計算例
チェビシェフの不等式を $Y=\overline X_n$ に適用すると
$$P(|\overline X_n-\mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}.$$
$\sigma^2$ と $\varepsilon$ は固定なので、右辺は $n\to\infty$ で0へ収束する。したがって
$$\overline X_n\xrightarrow{p}\mu.$$

## 一手
まず標本平均の分散を $\sigma^2/n$ と書き、チェビシェフの不等式の右辺が0へ行くことを確認する。

## 注意
この証明で必要なのは独立同分布と有限分散である。平均だけが有限で分散が無限の場合、このチェビシェフ型の証明は使えない。

<!-- CARD -->

---
id: dist-weak-law-sample-mean
title: 大数の弱法則を標本平均の確率収束として読む
category: math-probability
subcategory: math-limit-approximations
topic: weak-law-sample-mean
type: recognition
difficulty: 1
priority: S
hashtags: [大数の弱法則, 標本平均, 確率収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の弱法則 }]
---
## 問題
独立同分布な確率変数列が平均 $\mu$、有限分散を持つとする。大数の弱法則の結論を、確率収束の定義を用いて書け。

## 答え
標本平均は母平均から任意に離れる確率が0へ近づく。

## 使用公式・定理
確率変数列 $Y_n$ が $Y$ に確率収束するとは、任意の $\varepsilon>0$ に対し
$$P(|Y_n-Y|\ge\varepsilon)\longrightarrow0$$
が成り立つことである。大数の弱法則は、適切な独立性・同分布性と有限な平均・分散の下で
$$\overline X_n\xrightarrow{p}\mu$$
を主張する。

## 計算例
例えば $\mu=5$ のとき、固定した $\varepsilon=0.1$ に対して
$$P(|\overline X_n-5|\ge0.1)\longrightarrow0.$$
これは「十分大きい $n$ では標本平均が必ず5になる」という意味ではなく、5から0.1以上離れる確率が小さくなるという意味である。

## 一手
記号 $\xrightarrow{p}$ を見たら、まず「任意の $\varepsilon>0$ に対する確率が0へ行く」と言い換える。

## 注意
確率収束は各標本列が最終的に必ず固定値になることを意味しない。収束の種類を a.s. 収束や分布収束と混同しない。

<!-- CARD -->

---
id: dist-weak-law-conditions
published: false
title: 大数の弱法則を適用できる条件を判定する
category: math-probability
subcategory: math-limit-approximations
topic: weak-law-conditions
type: recognition
difficulty: 2
priority: S
hashtags: [大数の弱法則, 仮定, 有限分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の弱法則 }]
---
## 問題
次の3つの列のうち、標本平均に対する「独立同分布・有限分散」を使った大数の弱法則をそのまま適用できるものを選べ。

1. 独立同分布で $E[X_i]=\mu$、$\operatorname{Var}(X_i)=\sigma^2<\infty$。
2. 同じ分布だが、全ての $X_i$ が同じ1つの乱数に等しい。
3. 独立同分布だが、分散が無限大である。

## 答え
1だけである。

## 使用公式・定理
チェビシェフの不等式を使う標準的な弱法則の証明には、標本平均の分散を
$$\operatorname{Var}(\overline X_n)=\frac{\sigma^2}{n}$$
と評価できることが必要である。そのため独立性と有限分散が必要になる。

## 計算例
2では $X_i=X_1$ なので $\overline X_n=X_1$ となり、$n$ を増やしても分散は減らない。実際
$$\operatorname{Var}(\overline X_n)=\operatorname{Var}(X_1)=\sigma^2.$$
3では $\sigma^2/n$ という有限値の評価自体ができない。よって両者はこの定理をそのまま適用できない。

## 一手
「同分布」だけでなく、分散を $1/n$ まで減らす独立性と、分散の有限性を確認する。

## 注意
より一般的な大数の法則には別の仮定もある。このカードでは、有限分散を仮定した標準形だけを扱う。

<!-- CARD -->

---
id: dist-clt-statement
title: 中心極限定理の標準形を記述する
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-theorem
type: formula
difficulty: 2
priority: S
hashtags: [中心極限定理, 標準化, 正規分布（ガウス分布）]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
$X_1,X_2,\ldots$ が独立同分布で、$E[X_i]=\mu$、$0<\operatorname{Var}(X_i)=\sigma^2<\infty$ とする。中心極限定理の標準形を書け。

## 答え
標本平均を平均0・分散1になるよう標準化すると、標準正規分布へ分布収束する。

## 使用公式・定理
標準正規分布を $N(0,1)$ と書く。中心極限定理は
$$\frac{\sqrt n(\overline X_n-\mu)}{\sigma}\xrightarrow{d}N(0,1)$$
または同値に
$$\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}\xrightarrow{d}N(0,1)$$
と述べられる。

## 計算例
標本平均の平均と分散は $\mu$、$\sigma^2/n$ なので、標準偏差は $\sigma/\sqrt n$ である。したがって
$$\frac{\overline X_n-\mu}{\sigma/\sqrt n}=\frac{\sqrt n(\overline X_n-\mu)}{\sigma}.$$
これが $n$ の増加とともに標準正規分布で近似できる量である。

## 一手
「平均を引く→標準偏差 $\sigma/\sqrt n$ で割る」の順で標準化する。

## 注意
中心極限定理は有限の $n$ で標本平均が厳密に正規分布になるという主張ではなく、分布収束の主張である。

<!-- CARD -->

---
id: dist-clt-sample-mean
title: 中心極限定理で標本平均と合計の確率を近似する
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-sample-mean
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 中心極限定理
  - 標本平均
  - 合計
  - 確率近似
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
---
## 問題
$X_1,\ldots,X_n$ は独立同分布で $E[X_i]=10$、$\operatorname{Var}(X_i)=4$ とし、$n=100$ とする。標準正規分布の累積分布関数を $\Phi$ とする。

1. $P(9.6\le\overline X_{100}\le10.4)$ を中心極限定理で近似せよ。
2. $S_{100}=\sum_{i=1}^{100}X_i$ とするとき、$P(S_{100}>1030)$ を中心極限定理で近似せよ。

## 記号・用語
$\overline X_n=n^{-1}\sum_{i=1}^nX_i$ は標本平均、$S_n=\sum_{i=1}^nX_i=n\overline X_n$ は合計である。$\Phi(z)=P(Z\le z)$（$Z\sim N(0,1)$）とする。

## 答え
$\mu=10$、$\sigma=2$、$n=100$ である。

1. 標本平均の標準誤差は
$$
\frac{\sigma}{\sqrt n}=\frac2{10}=0.2.
$$
両端を標準化すると
$$
\frac{9.6-10}{0.2}=-2,
\qquad
\frac{10.4-10}{0.2}=2.
$$
よって
$$
P(9.6\le\overline X_{100}\le10.4)
\approx\Phi(2)-\Phi(-2)
\approx\boxed{0.9545}.
$$

2. 合計の平均と標準偏差は
$$
E[S_{100}]=100\cdot10=1000,
\qquad
\operatorname{SD}(S_{100})=2\sqrt{100}=20.
$$
したがって
$$
z=\frac{1030-1000}{20}=1.5,
$$
$$
P(S_{100}>1030)
\approx1-\Phi(1.5)
\approx\boxed{0.0668}.
$$

## 使用公式・定理
中心極限定理より
$$
\frac{\overline X_n-\mu}{\sigma/\sqrt n}\xrightarrow{d}N(0,1),
$$
また同値に
$$
\frac{S_n-n\mu}{\sigma\sqrt n}\xrightarrow{d}N(0,1).
$$
したがって大標本では、標本平均なら平均 $\mu$・標準偏差 $\sigma/\sqrt n$、合計なら平均 $n\mu$・標準偏差 $\sigma\sqrt n$ で標準化する。

## 計算例
合計の問題を標本平均へ直しても同じ結果になる。
$$
S_{100}>1030
\iff
\overline X_{100}>10.3.
$$
標本平均の標準誤差は0.2なので
$$
\frac{10.3-10}{0.2}=1.5.
$$
これは合計を直接標準化した値と一致する。つまり「合計用の公式」を別暗記する必要はない。

## 一手／方針
**平均か合計かを先に確認し、その量自身の平均と標準偏差で標準化する。** 合計は別の定理ではなく $S_n=n\overline X_n$ なので、中心極限定理の同じ内容を尺度だけ変えて使う。

## 注意
元分布が正規分布でない場合、有限標本での値は中心極限定理による近似である。また元分布が離散型でも支持や刻み幅が指定されていない問題では、機械的に連続性補正を入れない。二項分布など刻み幅が明確な場合の連続性補正は別途判断する。

<!-- CARD -->

---
id: dist-clt-bernoulli-proportion
title: ベルヌーイ標本比率を中心極限定理で近似する
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-bernoulli
type: calc_step
difficulty: 2
priority: S
hashtags: [中心極限定理, ベルヌーイ分布, 標本比率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
$X_1,\ldots,X_n$ は成功確率 $p=0.3$ のベルヌーイ分布に従う独立標本とし、$\widehat p=\overline X_n$ とする。$\sqrt n(\widehat p-p)$ の極限分布を求めよ。

## 答え
平均0、分散 $p(1-p)=0.21$ の正規分布へ分布収束する。

## 使用公式・定理
ベルヌーイ分布 $\operatorname{Bernoulli}(p)$ は台 $\{0,1\}$、$P(X=1)=p$、$P(X=0)=1-p$ で、平均 $p$、分散 $p(1-p)$ を持つ。中心極限定理より
$$\frac{\sqrt n(\widehat p-p)}{\sqrt{p(1-p)}}\xrightarrow{d}N(0,1).$$

## 計算例
両辺の分母を移項すると
$$\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p)).$$
$p=0.3$ を代入して
$$\sqrt n(\widehat p-0.3)\xrightarrow{d}N(0,0.3\cdot0.7)=N(0,0.21).$$

## 一手
ベルヌーイ標本では、一般の分散 $\sigma^2$ を $p(1-p)$ に置き換える。

## 注意
標準化した量の極限分布は $N(0,1)$、標準化していない量の極限分布は $N(0,p(1-p))$ である。

<!-- CARD -->

---
id: dist-clt-normal-quantile
published: false
title: 中心極限定理で標本平均の上側確率を求める
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-quantile
type: calc_step
difficulty: 2
priority: S
hashtags: [中心極限定理, 標本平均, 二項分布の正規近似とポアソン近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
$E[X_i]=4$、$\operatorname{Var}(X_i)=9$ の独立同分布標本について、$n=36$ のとき $P(\overline X_{36}>4.5)$ を中心極限定理で表せ。$\Phi$ は標準正規分布の累積分布関数とする。

## 答え
標準化点は1なので、近似値は $1-\Phi(1)$ である。

## 使用公式・定理
$$\frac{\overline X_n-\mu}{\sigma/\sqrt n}\approx N(0,1),$$
したがって
$$P(\overline X_n>a)\approx1-\Phi\left(\frac{a-\mu}{\sigma/\sqrt n}\right).$$

## 計算例
標準誤差は $\sigma/\sqrt n=3/6=0.5$ であるから
$$\frac{4.5-4}{0.5}=1.$$
よって
$$P(\overline X_{36}>4.5)\approx P(Z>1)=1-\Phi(1)\approx0.1587.$$

## 一手
上側確率では、標準化した後に $1-\Phi$ を取る。

## 注意
$\Phi(1)$ と上側確率 $P(Z>1)$ を取り違えない。正規分布は連続なので、$>$ と $\ge$ の違いはない。

<!-- CARD -->

---
id: dist-clt-sum-variance
title: 和の中心極限定理で標準偏差の次数を確認する
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-sum
type: formula
difficulty: 2
priority: S
hashtags: [中心極限定理, 和, 標準偏差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
独立同分布な $X_i$ の平均が $\mu$、$0<\operatorname{Var}(X_i)=\sigma^2<\infty$ のとき、和 $S_n=\sum_{i=1}^nX_i$ の中心極限定理による標準化を記せ。なぜ分母が $\sigma n$ ではないか説明せよ。

## 答え
標準化は $(S_n-n\mu)/(\sigma\sqrt n)$ である。独立な分散は加法的なので、和の分散が $n\sigma^2$ になるからである。

## 使用公式・定理
独立性から
$$E[S_n]=n\mu,\qquad \operatorname{Var}(S_n)=n\sigma^2.$$
よって $S_n$ の標準偏差は $\sqrt{n\sigma^2}=\sigma\sqrt n$ である。中心極限定理は
$$\frac{S_n-n\mu}{\sigma\sqrt n}\xrightarrow{d}N(0,1).$$

## 計算例
分散を標準偏差へ変換すると
$$\operatorname{SD}(S_n)=\sqrt{\operatorname{Var}(S_n)}=\sqrt{n\sigma^2}=\sigma\sqrt n.$$
したがって分母は $\sigma\sqrt n$ であり、$\sigma n$ ではない。

## 一手
和ではまず分散を足し、その後に平方根を取る。

## 注意
分散の増加は $n$ 倍、標準偏差の増加は $\sqrt n$ 倍である。

<!-- CARD -->

---
id: dist-binomial-normal-conditions
title: 二項分布の正規近似を使う条件を確認する
category: math-probability
subcategory: math-limit-approximations
topic: binomial-normal-conditions
type: recognition
difficulty: 2
priority: A
hashtags: [二項分布, 二項分布の正規近似とポアソン近似, 近似条件]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(n,p)$ の正規近似を考える。近似の中心と分散を答え、$n=100,p=0.2$ で近似が妥当と判断できるか述べよ。

## 答え
中心は $np$、分散は $np(1-p)$ である。$np=20$、$n(1-p)=80$ と両側が十分大きいため、通常の目安では妥当である。

## 使用公式・定理
二項分布 $\operatorname{Binomial}(n,p)$ は台 $\{0,1,\ldots,n\}$、質量関数
$$P(X=x)=\binom nxp^x(1-p)^{n-x}$$
を持ち、平均 $np$、分散 $np(1-p)$ である。$np$ と $n(1-p)$ がともに十分大きいとき
$$X\approx N(np,np(1-p))$$
と近似する。

## 計算例
与えられた値では
$$E[X]=100\cdot0.2=20,$$
$$\operatorname{Var}(X)=100\cdot0.2\cdot0.8=16.$$
したがって $X$ を $N(20,16)$ で近似する。どちらか一方が小さい場合は、正規近似よりポアソン近似や二項分布の厳密計算を検討する。

## 一手
まず $np$ と $n(1-p)$ を計算し、中心 $np$ と分散 $np(1-p)$ を書く。

## 注意
「$n$ が大きい」だけでは十分とは限らない。$p$ が極端に0または1に近いと分布が歪み、正規近似の精度が下がる。

<!-- CARD -->

---
id: dist-binomial-normal-probability
title: 二項分布の確率を正規近似で計算する
category: math-probability
subcategory: math-limit-approximations
topic: binomial-normal-probability
type: calc_step
difficulty: 2
priority: A
hashtags: [二項分布, 二項分布の正規近似とポアソン近似, 標準化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(100,0.4)$ とする。連続修正をまだ使わずに、$P(35\le X\le45)$ を正規近似で表せ。

## 答え
$X$ を $N(40,24)$ で近似し、標準化すると $\Phi(5/\sqrt{24})-\Phi(-5/\sqrt{24})$ となる。

## 使用公式・定理
二項分布の平均と分散は $np$、$np(1-p)$。正規分布 $N(\mu,\sigma^2)$ の確率は標準化して
$$P(a\le Y\le b)=\Phi\left(\frac{b-\mu}{\sigma}\right)-\Phi\left(\frac{a-\mu}{\sigma}\right).$$

## 計算例
平均と分散は
$$\mu=100\cdot0.4=40,\qquad \sigma^2=100\cdot0.4\cdot0.6=24.$$
したがって
$$P(35\le X\le45)\approx P(35\le Y\le45),\quad Y\sim N(40,24).$$
標準化すると
$$P(35\le Y\le45)=\Phi\left(\frac{45-40}{\sqrt{24}}\right)-\Phi\left(\frac{35-40}{\sqrt{24}}\right)$$
$$=\Phi\left(\frac5{\sqrt{24}}\right)-\Phi\left(-\frac5{\sqrt{24}}\right).$$

## 一手
二項分布の平均・分散を先に固定し、その正規分布の端点を標準化する。

## 注意
整数値の二項分布を連続分布で近似するため、通常は次の連続修正を加えると精度が上がる。

<!-- CARD -->

---
id: dist-binomial-normal-tail
title: 二項分布の上側確率を正規近似で評価する
category: math-probability
subcategory: math-limit-approximations
topic: binomial-normal-tail
type: calc_step
difficulty: 3
priority: A
hashtags: [二項分布, 二項分布の正規近似とポアソン近似, 上側確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(400,0.5)$ とする。連続修正を用いて $P(X\ge220)$ を正規近似せよ。標準正規分布の上側確率を $\overline\Phi(z)=1-\Phi(z)$ とする。

## 答え
$X\ge220$ を $Y\ge219.5$ に直し、$Y\sim N(200,100)$ として $\overline\Phi(1.95)$ と近似する。

## 使用公式・定理
二項分布の平均は $np$、分散は $np(1-p)$。連続修正では
$$P(X\ge k)\approx P(Y\ge k-0.5),$$
ただし $Y\sim N(np,np(1-p))$ とする。

## 計算例
$$\mu=400\cdot0.5=200,\qquad \sigma^2=400\cdot0.5\cdot0.5=100,$$
なので $\sigma=10$。連続修正により
$$P(X\ge220)\approx P(Y\ge219.5).$$
標準化すると
$$P(Y\ge219.5)=P\left(Z\ge\frac{219.5-200}{10}\right)=P(Z\ge1.95)=\overline\Phi(1.95).$$

## 一手
「以上」は下端を $0.5$ 下げ、「以下」は上端を $0.5$ 上げる。

## 注意
連続修正を忘れると標準化点が2になり、近似値が変わる。$X$ の整数値と $Y$ の連続区間を対応させてから計算する。

<!-- CARD -->

---
id: dist-continuity-correction-interval
title: 区間確率に連続修正を施す
category: math-probability
subcategory: math-limit-approximations
topic: continuity-correction-interval
type: calc_step
difficulty: 2
priority: A
hashtags: [連続修正, 二項分布, 区間確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 連続修正 }]
---
## 問題
整数値確率変数 $X$ の $P(10\le X\le20)$ を、連続確率変数 $Y$ で近似する。連続修正後の区間を答えよ。

## 答え
修正後は $P(9.5\le Y\le20.5)$ とする。

## 使用公式・定理
整数 $k$ に対応する連続区間を、隣り合う整数の中点で区切る。したがって
$$P(a\le X\le b)\approx P(a-0.5\le Y\le b+0.5).$$

## 計算例
整数10の領域を $9.5$ から $10.5$、整数20の領域を $19.5$ から $20.5$ と対応させる。10から20までをつなぐと
$$[9.5,10.5]\cup\cdots\cup[19.5,20.5]=[9.5,20.5].$$
よって求める近似は $P(9.5\le Y\le20.5)$ である。

## 一手
両端の整数をそれぞれ左へ $0.5$、右へ $0.5$ 広げる。

## 注意
連続分布では一点の確率が0なので、開区間・閉区間の違いは値を変えない。

<!-- CARD -->

---
id: dist-continuity-correction-tail
title: 上側・下側確率に連続修正を施す
category: math-probability
subcategory: math-limit-approximations
topic: continuity-correction-tail
type: recognition
difficulty: 2
priority: A
hashtags: [連続修正, 上側確率, 下側確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 連続修正 }]
---
## 問題
整数値確率変数 $X$ を連続確率変数 $Y$ で近似する。$k\in\mathbb Z$ とし、次の各事象を連続修正後の事象へ直せ。

1. $X\ge k$
2. $X>k$
3. $X\le k$
4. $X<k$

## 答え
順に $Y\ge k-0.5$、$Y\ge k+0.5$、$Y\le k+0.5$、$Y\le k-0.5$ とする。

## 使用公式・定理
整数値の各点 $k$ を、区間 $[k-0.5,k+0.5]$ に対応させる。これを使うと
$$X\ge k\ \leftrightarrow\ Y\ge k-0.5,$$
$$X\le k\ \leftrightarrow\ Y\le k+0.5.$$

## 計算例
$X>k$ は整数値なら $X\ge k+1$ と同じである。したがって下端を $0.5$ 下げて
$$X>k\ \leftrightarrow\ X\ge k+1\ \approx\ Y\ge k+0.5.$$
同様に $X<k$ は $X\le k-1$ なので
$$X<k\ \approx\ Y\le k-0.5.$$

## 一手
まず整数値の不等号を $\ge$ または $\le$ に直し、その後で端点を $0.5$ 動かす。

## 注意
「$>$ だから常に $k+0.5$」と暗記せず、整数値であることを使って境界を確認する。

<!-- CARD -->

---
id: dist-binomial-poisson-conditions
title: 二項分布のポアソン近似を使う条件を判定する
category: math-probability
subcategory: math-limit-approximations
topic: binomial-poisson-conditions
type: recognition
difficulty: 2
priority: A
hashtags: [二項分布, 二項分布の正規近似とポアソン近似, 少数法則]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(n,p)$ をポアソン分布で近似する状況と、近似するポアソン分布の母数を答えよ。

## 答え
$n$ が大きく $p$ が小さい一方、$np=\lambda$ を一定程度に保つとき、$X$ を $\operatorname{Poisson}(\lambda)$、通常 $\lambda=np$、で近似する。

## 使用公式・定理
ポアソン分布 $\operatorname{Poisson}(\lambda)$ は台 $\mathbb N_0$、$\lambda>0$、質量関数
$$P(Y=x)=e^{-\lambda}\frac{\lambda^x}{x!}$$
を持つ。二項分布の少数成功を近似するとき $\lambda=np$ とする。

## 計算例
$n=1000,p=0.002$ なら
$$\lambda=np=1000\cdot0.002=2.$$
したがって $\operatorname{Binomial}(1000,0.002)$ を $\operatorname{Poisson}(2)$ で近似する。平均も二項分布の1000×0.002=2と一致する。

## 一手
「試行回数大・成功確率小・期待成功数 $np$ は有限」を確認し、$\lambda=np$ を置く。

## 注意
$np$ が大きい場合はポアソン分布が少数成功の形を表さない。正規近似の条件と混同しない。

<!-- CARD -->

---
id: dist-binomial-poisson-probability
title: 二項分布の0回成功確率をポアソン近似する
category: math-probability
subcategory: math-limit-approximations
topic: binomial-poisson-probability
type: calc_step
difficulty: 2
priority: A
hashtags: [二項分布, 二項分布の正規近似とポアソン近似, 確率の計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(500,0.004)$ とする。$P(X=0)$ をポアソン近似で求めよ。

## 答え
$\lambda=np=2$ なので、近似値は $e^{-2}$ である。

## 使用公式・定理
二項分布の少数成功を
$$X\approx Y,\qquad Y\sim\operatorname{Poisson}(\lambda),\quad \lambda=np$$
と近似する。ポアソン分布では
$$P(Y=x)=e^{-\lambda}\frac{\lambda^x}{x!}.$$

## 計算例
まず
$$\lambda=500\cdot0.004=2.$$
したがって
$$P(X=0)\approx P(Y=0)=e^{-2}\frac{2^0}{0!}=e^{-2}\approx0.1353.$$

## 一手
ポアソン近似では $np$ を先に計算し、求める整数値を質量関数へ代入する。

## 注意
厳密な二項確率は $(1-p)^n$ である。この例でも $(0.996)^{500}$ と $e^{-2}$ は近いが、同一ではない。

<!-- CARD -->

---
id: dist-poisson-limit-derivation
title: 二項分布からポアソン分布の極限を導く
category: math-probability
subcategory: math-limit-approximations
topic: poisson-limit
type: expansion
difficulty: 3
priority: A
hashtags: [少数法則, ポアソン分布, 極限]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 少数法則 }]
---
## 問題
二項分布 $X_n\sim\operatorname{Binomial}(n,\lambda/n)$ とし、$\lambda>0$ を固定する。十分大きい整数 $n$（例えば $n\ge\lceil\lambda\rceil$）を考え、固定した $x\in\mathbb N_0$ に対して $P(X_n=x)$ の極限を求めよ。

## 答え
極限は $e^{-\lambda}\lambda^x/x!$ であり、ポアソン分布の質量関数になる。

## 使用公式・定理
二項分布の質量関数は
$$P(X_n=x)=\binom nx\left(\frac\lambda n\right)^x\left(1-\frac\lambda n\right)^{n-x}.$$
固定した $x$ に対し
$$\frac{n(n-1)\cdots(n-x+1)}{n^x}\to1,\qquad \left(1-\frac\lambda n\right)^n\to e^{-\lambda}.$$

## 計算例
階乗を展開して整理すると
$$P(X_n=x)=\frac{\lambda^x}{x!}\frac{n(n-1)\cdots(n-x+1)}{n^x}\left(1-\frac\lambda n\right)^n\left(1-\frac\lambda n\right)^{-x}.$$
各因子の極限は順に $\lambda^x/x!$ の係数、1、$e^{-\lambda}$、1 なので
$$P(X_n=x)\to e^{-\lambda}\frac{\lambda^x}{x!}.$$

## 一手
二項係数を積の形へ展開し、$n$ を含む因子を極限1または $e^{-\lambda}$ に分ける。

## 注意
$x$ は $n$ とともに増やさず固定する。また、積の展開には $n\ge x$ も必要だが、固定した $x$ なので十分大きい $n$ では満たされる。この極限が少数法則の数学的根拠である。

<!-- CARD -->

---
id: dist-law-small-numbers
title: 少数法則の意味を二項分布の期待成功数で説明する
category: math-probability
subcategory: math-limit-approximations
topic: law-of-small-numbers
type: recognition
difficulty: 1
priority: A
hashtags: [少数法則, 希少事象, ポアソン分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 少数法則 }]
---
## 問題
「少数法則」とは何か。二項分布 $\operatorname{Binomial}(n,p_n)$ で $n\to\infty$ のとき、どの量を固定する考え方か答えよ。

## 答え
各試行の成功確率が小さい希少事象を多数回観測し、期待成功数 $np_n$ を $\lambda$ に保つと、成功回数が $\operatorname{Poisson}(\lambda)$ に近づくという法則である。

## 使用公式・定理
$$p_n\to0,\qquad np_n\to\lambda>0$$
なら、二項分布の成功回数 $X_n$ は
$$X_n\xrightarrow{d}\operatorname{Poisson}(\lambda)$$
とみなせる。ポアソン分布の平均と分散はともに $\lambda$ である。

## 計算例
$p_n=2/n$ と定める列では、$n=10^4$ のとき $p_n=2/10^4=0.0002$ であり
$$p_n=\frac2n\to0,\qquad np_n=2.$$
成功回数は平均2回程度で、$\operatorname{Poisson}(2)$ による近似を考えられる。

## 一手
成功確率そのものではなく、$p_n\to0$ と $np_n\to\lambda$ の組を確認する。

## 注意
「少数」は標本サイズが小さいという意味ではなく、各試行の成功確率が小さいという意味である。

<!-- CARD -->

---
id: dist-approximation-choice
title: 二項分布に対する正規近似とポアソン近似を選ぶ
category: math-probability
subcategory: math-limit-approximations
topic: approximation-choice
type: recognition
difficulty: 2
priority: S
hashtags: [二項分布, 二項分布の正規近似とポアソン近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
次の二項分布に対して、正規近似・ポアソン近似のどちらを第一候補にするか答えよ。

1. 二項分布 $\operatorname{Binomial}(200,0.5)$
2. 二項分布 $\operatorname{Binomial}(2000,0.001)$
3. 二項分布 $\operatorname{Binomial}(30,0.4)$

## 答え
1は正規近似、2はポアソン近似、3は厳密な二項計算を優先する。ただし3では正規近似も候補になり得るので、これは「厳密計算が容易なため第一候補とする」という目安である。

## 使用公式・定理
正規近似は $np$ と $n(1-p)$ がともに十分大きいとき、ポアソン近似は $n$ が大きく $p$ が小さく $np$ が有限のときに使う。

## 計算例
1では $np=n(1-p)=100$ で、分布は中央付近に集まり正規近似が適する。2では $np=2$、$p$ が小さく、ポアソン近似が適する。3では $np=12$、$n(1-p)=18$ で、通常の「両方が十分大きい」という目安を満たすかは微妙である。したがって、まず二項分布の質量関数を直接計算し、必要なら正規近似を粗い比較値として併記する。

本番答案では、例えば「$np=12$、$n(1-p)=18$ で正規近似は候補だが、厳密計算が容易なので厳密値を採用する」と判定を書く。

## 一手
まず $np$ と $n(1-p)$、次に $p$ の小ささ、最後に $n$ の大きさを見る。

## 注意
近似条件は厳密な合否境界ではなく精度の目安である。必要なら厳密値と近似値を比較する。

<!-- CARD -->

---
id: dist-approximation-error
title: 近似計算の誤差と連続修正の役割を区別する
category: math-probability
subcategory: math-limit-approximations
topic: approximation-error
type: recognition
difficulty: 2
priority: A
hashtags: [近似, 連続修正, 誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 連続修正 }]
---
## 問題
二項分布を正規近似するとき、(a) $n$ を大きくすること、(b) 連続修正を使うこと、(c) ポアソン近似へ切り替えることは、それぞれどの誤差・分布形状に対応する工夫か説明せよ。

## 答え
(a)は、$p$ を固定し $np\to\infty$ かつ $n(1-p)\to\infty$ となる条件では、中心極限定理により正規近似が改善する方向である。(b)は離散分布と連続分布の境界ずれを補正し、(c)は成功確率が小さい二項分布を希少事象の極限で近似する工夫である。

## 使用公式・定理
二項分布の正規近似は、$p$ を固定し $np,n(1-p)\to\infty$ となるときの中心極限定理に基づく。連続修正は
$$P(a\le X\le b)\approx P(a-0.5\le Y\le b+0.5).$$
ポアソン近似は $p\to0$、$np\to\lambda$ の少数法則に基づく。

## 計算例
例えば $X\sim\operatorname{Binomial}(400,0.5)$ では左右対称で正規近似が働きやすく、$X\ge220$ を $Y\ge219.5$ とするのが (b) である。一方 $X\sim\operatorname{Binomial}(4000,0.0005)$ では $np=2$ なので、$\operatorname{Poisson}(2)$ を使うのが (c) である。

## 一手
「正規近似の極限誤差」「整数境界のずれ」「希少事象の形状」を別々に考える。

## 注意
連続修正は正規近似をポアソン近似へ変える操作ではない。二項分布を正規分布で近似する際の境界調整である。また、$p=p_n\to0$ で $np_n\to\lambda$ の状況では、$n$ を大きくしても正規近似の改善を自動的に意味せず、ポアソン極限を検討する。

<!-- CARD -->

---
id: dist-clt-convergence-notation
published: false
title: 分布収束と確率収束を大数則・中心極限定理で区別する
category: math-probability
subcategory: math-limit-approximations
topic: convergence-distinction
type: recognition
difficulty: 2
priority: S
hashtags: [大数の弱法則, 中心極限定理, 分布収束, 確率収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の弱法則 }, { type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
大数の弱法則と中心極限定理の結論に現れる収束記号をそれぞれ答えよ。

## 答え
大数の弱法則は確率収束 $\xrightarrow{p}$、中心極限定理は分布収束 $\xrightarrow{d}$ である。

## 使用公式・定理
大数の弱法則:
$$\overline X_n\xrightarrow{p}\mu.$$
中心極限定理:
$$\frac{\sqrt n(\overline X_n-\mu)}{\sigma}\xrightarrow{d}N(0,1).$$

## 計算例
前者は任意の $\varepsilon>0$ について
$$P(|\overline X_n-\mu|\ge\varepsilon)\to0$$
を意味する。一方、後者は標準化した確率変数の分布関数が標準正規分布の分布関数へ近づくことを意味する。したがって、中心極限定理の式を $\overline X_n\xrightarrow{d}\mu$ と書くのは適切でない。

## 一手
標本平均そのものの収束は $p$、揺らぎを $\sqrt n$ 倍した極限分布は $d$ と覚える。

## 注意
確率収束と分布収束は異なる概念である。近似確率を計算するときは、中心極限定理の標準化された量を使う。

<!-- CARD -->

---
id: dist-clt-standard-error
title: 中心極限定理で標本平均の標準誤差を作る
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-standard-error
type: calc_step
difficulty: 1
priority: S
hashtags: [中心極限定理, 標本平均, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
母分散が $\sigma^2=16$、標本サイズが $n=64$ のとき、標本平均の標準誤差を求めよ。

## 答え
標準誤差は $\sigma/\sqrt n=4/8=0.5$ である。

## 使用公式・定理
独立同分布標本では
$$\operatorname{Var}(\overline X_n)=\frac{\sigma^2}{n},$$
したがって標本平均の標準誤差は
$$\operatorname{SE}(\overline X_n)=\sqrt{\operatorname{Var}(\overline X_n)}=\frac{\sigma}{\sqrt n}.$$

## 計算例
$$\sigma=\sqrt{16}=4,\qquad \sqrt n=\sqrt{64}=8.$$
よって
$$\operatorname{SE}(\overline X_{64})=\frac48=0.5.$$

## 一手
分散をそのまま使わず、平方根を取ってから $\sqrt n$ で割る。

## 注意
$\sigma^2/n=16/64=0.25$ は標本平均の分散であり、標準誤差はその平方根の0.5である。

<!-- CARD -->

---
id: dist-poisson-mean-variance-approximation
published: false
title: ポアソン近似で平均と分散の一致を確認する
category: math-probability
subcategory: math-limit-approximations
topic: poisson-approximation-check
type: calc_step
difficulty: 2
priority: A
hashtags: [少数法則, 二項分布の正規近似とポアソン近似, 期待値, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 少数法則 }]
---
## 問題
$X\sim\operatorname{Binomial}(n,p)$ で $n$ が大きく $p$ が小さいとする。$\lambda=np$ と置いたとき、二項分布と $\operatorname{Poisson}(\lambda)$ の平均・分散を比較せよ。

## 答え
二項分布は平均 $\lambda$、分散 $\lambda(1-p)$、ポアソン分布は平均・分散とも $\lambda$ である。$p$ が小さいと分散も近い。

## 使用公式・定理
二項分布の平均・分散は
$$E[X]=np=\lambda,\qquad \operatorname{Var}(X)=np(1-p)=\lambda(1-p).$$
ポアソン分布 $Y\sim\operatorname{Poisson}(\lambda)$ では
$$E[Y]=\lambda,\qquad \operatorname{Var}(Y)=\lambda.$$

## 計算例
分散差は
$$\operatorname{Var}(Y)-\operatorname{Var}(X)=\lambda-\lambda(1-p)=\lambda p=np^2.$$
$p\to0$ ならこの差は小さくなり、平均だけでなく分散も一致する方向へ進む。

## 一手
$\lambda=np$ を代入して、二項分布の分散に残る $(1-p)$ を確認する。

## 注意
平均が同じだから分布が同じとは限らない。ポアソン近似は希少事象という追加条件に基づく。

<!-- CARD -->

---
id: dist-normal-approximation-symmetry
published: false
title: 二項分布の正規近似で中心対称性を利用する
category: math-probability
subcategory: math-limit-approximations
topic: binomial-normal-symmetry
type: calc_step
difficulty: 2
priority: A
hashtags: [二項分布, 二項分布の正規近似とポアソン近似, 対称性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
偶数の正整数 $n$ に対し、二項分布 $X\sim\operatorname{Binomial}(n,1/2)$ を正規近似する。連続修正を用いて $P(X\ge n/2)$ を求める近似を、標準正規分布の累積分布関数 $\Phi$ で表せ。

## 答え
$Y\sim N(n/2,n/4)$ とし、$P(X\ge n/2)\approx\Phi(1/\sqrt n)$ である。

## 使用公式・定理
連続修正と標準化により
$$P(X\ge k)\approx1-\Phi\left(\frac{k-0.5-np}{\sqrt{np(1-p)}}\right).$$
また $\Phi(-z)=1-\Phi(z)$ を使う。

## 計算例
$p=1/2$、$k=n/2$ なので平均は $n/2$、標準偏差は $\sqrt n/2$。修正後の標準化点は
$$\frac{n/2-0.5-n/2}{\sqrt n/2}=-\frac1{\sqrt n}.$$
よって
$$P(X\ge n/2)\approx1-\Phi\left(-\frac1{\sqrt n}\right)=\Phi\left(\frac1{\sqrt n}\right).$$

## 一手
修正後の下端を標準化し、最後に標準正規分布の対称性を使う。

## 注意
連続修正をしない場合はちょうど $1/2$ になるが、整数値分布の中心点の質量を落としている。修正後の方が二項確率に近い。

<!-- CARD -->

---
id: dist-weak-law-variance-rate
published: false
title: 大数の弱法則で標本平均の誤差確率を評価する
category: math-probability
subcategory: math-limit-approximations
topic: weak-law-error-rate
type: calc_step
difficulty: 2
priority: S
hashtags: [大数の弱法則, チェビシェフの不等式, 誤差確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の弱法則 }]
---
## 問題
独立同分布で $\operatorname{Var}(X_i)=9$ とする。$n=100$ の標本平均について、$P(|\overline X_{100}-\mu|\ge1)$ の上界をチェビシェフの不等式で求めよ。

## 答え
上界は $9/(100\cdot1^2)=0.09$ である。

## 使用公式・定理
$$\operatorname{Var}(\overline X_n)=\frac{\sigma^2}{n},\qquad P(|\overline X_n-\mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}.$$

## 計算例
$\sigma^2=9$、$n=100$、$\varepsilon=1$ を代入すると
$$P(|\overline X_{100}-\mu|\ge1)\le\frac{9}{100\cdot1^2}=0.09.$$
これは実際の確率そのものではなく、上から押さえる値である。

## 一手
分子に母分散、分母に $n\varepsilon^2$ を置く。

## 注意
チェビシェフの上界が1を超える場合も、確率の上界としては1と合わせて解釈する。ここでは0.09なのでそのままでよい。

<!-- CARD -->

---
id: dist-clt-approximation-limit
published: false
title: 中心極限定理の近似を確率表現へ戻す
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-approximation-limit
type: formula
difficulty: 2
priority: S
hashtags: [中心極限定理, 分布収束, 確率近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
中心極限定理から、固定した $a<b$ に対する $P(a\le\overline X_n\le b)$ をどのように近似するか一般式で書け。

## 答え
標準化端点を $z_a=\sqrt n(a-\mu)/\sigma$、$z_b=\sqrt n(b-\mu)/\sigma$ とすれば、近似値は $\Phi(z_b)-\Phi(z_a)$ である。

## 使用公式・定理
$$\frac{\sqrt n(\overline X_n-\mu)}{\sigma}\approx Z,\qquad Z\sim N(0,1).$$
したがって
$$P(a\le\overline X_n\le b)\approx P\left(\frac{\sqrt n(a-\mu)}\sigma\le Z\le\frac{\sqrt n(b-\mu)}\sigma\right).$$

## 計算例
端点をそれぞれ変換すると
$$z_a=\frac{\sqrt n(a-\mu)}\sigma,\qquad z_b=\frac{\sqrt n(b-\mu)}\sigma.$$
標準正規分布の累積分布関数を使い
$$P(a\le\overline X_n\le b)\approx\Phi(z_b)-\Phi(z_a).$$

## 一手
原スケールの区間を標準化スケールの区間へ写してから、累積分布関数の差を取る。

## 注意
標準化端点の分母は母標準偏差 $\sigma$ ではなく、標本平均の標準偏差 $\sigma/\sqrt n$ と同値な形である。

<!-- CARD -->

---
id: dist-poisson-tail-approximation
title: ポアソン近似で少なくとも1回の成功確率を求める
category: math-probability
subcategory: math-limit-approximations
topic: poisson-tail
type: calc_step
difficulty: 1
priority: A
hashtags: [二項分布の正規近似とポアソン近似, 少数法則, 補集合]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 少数法則 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(2000,0.001)$ とする。少なくとも1回成功する確率をポアソン近似で求めよ。

## 答え
$\lambda=2$ なので、近似値は $1-e^{-2}$ である。

## 使用公式・定理
少数法則から $X\approx Y\sim\operatorname{Poisson}(\lambda)$、$\lambda=np$。補集合を使うと
$$P(Y\ge1)=1-P(Y=0)=1-e^{-\lambda}.$$

## 計算例
$$\lambda=np=2000\cdot0.001=2.$$
したがって
$$P(X\ge1)\approx P(Y\ge1)=1-P(Y=0)=1-e^{-2}\approx0.8647.$$

## 一手
「少なくとも1」は「0でない」の補集合にして、ポアソンの0回確率を使う。

## 注意
厳密値は $1-(1-0.001)^{2000}$。ポアソン近似値と厳密値は近いが、近似である。

<!-- CARD -->

---
id: dist-normal-approximation-continuity-full
title: 二項分布の両側区間を連続修正して標準化する
category: math-probability
subcategory: math-limit-approximations
topic: normal-approximation-continuity-full
type: calc_step
difficulty: 3
priority: A
hashtags: [二項分布, 二項分布の正規近似とポアソン近似, 連続修正, 標準化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }, { type: official_syllabus, topic: 連続修正 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(100,0.3)$ とする。$P(25\le X\le35)$ を連続修正付き正規近似で $\Phi$ を用いて表せ。

## 答え
$Y\sim N(30,21)$ とし、近似値は $\Phi(5.5/\sqrt{21})-\Phi(-5.5/\sqrt{21})$ である。

## 使用公式・定理
二項分布の平均と分散は $np$、$np(1-p)$。区間の連続修正は
$$P(a\le X\le b)\approx P(a-0.5\le Y\le b+0.5).$$

## 計算例
$$\mu=100\cdot0.3=30,\qquad \sigma^2=100\cdot0.3\cdot0.7=21.$$
修正後の区間は $[24.5,35.5]$ である。標準化すると
$$\frac{24.5-30}{\sqrt{21}}=-\frac{5.5}{\sqrt{21}},\qquad \frac{35.5-30}{\sqrt{21}}=\frac{5.5}{\sqrt{21}}.$$
したがって
$$P(25\le X\le35)\approx\Phi\left(\frac{5.5}{\sqrt{21}}\right)-\Phi\left(-\frac{5.5}{\sqrt{21}}\right).$$

## 一手
平均・分散→整数区間の両端を $0.5$ 拡張→標準化、の順で進める。

## 注意
分散21の平方根が標準偏差である。分散21をそのまま標準化の分母にしない。

<!-- CARD -->

---
id: dist-weak-law-mean-identification
title: 大数の弱法則で標本平均の極限値を同定する
category: math-probability
subcategory: math-limit-approximations
topic: weak-law-mean-identification
type: calc_step
difficulty: 1
priority: S
hashtags: [大数の弱法則, 期待値, 標本平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の弱法則 }]
---
## 問題
$X_i$ は独立同分布で $P(X_i=1)=0.7$、$P(X_i=0)=0.3$ とする。大数の弱法則により $\overline X_n$ が確率収束する値を求めよ。

## 答え
極限は $E[X_i]=0.7$ である。

## 使用公式・定理
ベルヌーイ分布の平均は $p$ であり、大数の弱法則は
$$\overline X_n\xrightarrow{p}E[X_i]$$
を与える。

## 計算例
$$E[X_i]=1\cdot0.7+0\cdot0.3=0.7.$$
分散は $0.7\cdot0.3<\infty$ なので、弱法則を適用して
$$\overline X_n\xrightarrow{p}0.7.$$

## 一手
標本平均の極限は分布の平均。まず $E[X_i]$ を計算する。

## 注意
成功回数そのもの $\sum_iX_i$ は $n$ とともに増えるが、標本比率 $\overline X_n$ が0.7へ近づく。

<!-- CARD -->

---
id: dist-clt-bernoulli-count
title: 二項分布の成功回数を中心極限定理で標準化する
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-binomial-count
type: formula
difficulty: 2
priority: S
hashtags: [中心極限定理, 二項分布, 標準化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }, { type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(n,p)$ を、$0<p<1$ の独立なベルヌーイ試行の成功回数とみなす。$n\to\infty$ における中心極限定理に対応する標準化を $X$ だけで書け。また、有限標本で正規近似を使う場合の条件にも触れよ。

## 答え
$$\frac{X-np}{\sqrt{np(1-p)}}\xrightarrow{d}N(0,1).$$

## 使用公式・定理
二項分布は $X=\sum_{i=1}^nB_i$、$B_i\sim\operatorname{Bernoulli}(p)$ と表せる。各 $B_i$ の平均は $p$、分散は $p(1-p)$ なので中心極限定理より
$$\frac{\sum_{i=1}^nB_i-np}{\sqrt{np(1-p)}}\xrightarrow{d}N(0,1).$$

## 計算例
$X=\sum_iB_i$ を代入すると
$$\frac{X-np}{\sqrt{np(1-p)}}\xrightarrow{d}N(0,1).$$
これは二項分布の正規近似で標準化に使う式そのものである。有限標本での近似では、$np$ と $n(1-p)$ がともに十分大きいことを確認する。

## 一手
二項分布をベルヌーイ変数の和へ戻し、平均と分散を合計する。

## 注意
分母は $\sqrt{np(1-p)}$。$np(1-p)$ は分散なので、平方根を取る。$p=0,1$ では分母が0となり、この非退化な標準化は使えない。

<!-- CARD -->

---
id: dist-poisson-approximation-complement
title: ポアソン近似で少なくとも指定回数の成功を求める
category: math-probability
subcategory: math-limit-approximations
topic: poisson-approximation-complement
type: calc_step
difficulty: 2
priority: A
hashtags: [二項分布の正規近似とポアソン近似, 補集合, 確率の計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(1000,0.002)$ とする。$P(X\ge2)$ をポアソン近似で求めよ。

## 答え
$\lambda=2$ として $P(X\ge2)\approx1-e^{-2}(1+2)$ である。

## 使用公式・定理
補集合とポアソン質量関数から
$$P(Y\ge2)=1-P(Y=0)-P(Y=1)$$
$$=1-e^{-\lambda}-e^{-\lambda}\lambda=1-e^{-\lambda}(1+\lambda).$$

## 計算例
$$\lambda=np=1000\cdot0.002=2.$$
したがって
$$P(X\ge2)\approx1-P(Y=0)-P(Y=1)$$
$$=1-e^{-2}\frac{2^0}{0!}-e^{-2}\frac{2^1}{1!}=1-3e^{-2}\approx0.5940.$$

## 一手
「2回以上」を0回・1回の補集合にしてから、ポアソン質量関数を2項だけ計算する。

## 注意
補集合では $P(Y=0)+P(Y=1)$ の両方を引く。$1-P(Y=1)$ だけにはしない。

<!-- CARD -->

---
id: dist-clt-finite-variance
title: 中心極限定理の有限分散条件を確認する
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-conditions
type: recognition
difficulty: 2
priority: S
hashtags: [中心極限定理, 有限分散, 仮定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
平均は有限だが分散が無限大の分布から独立同分布標本を取ったとする。通常の中心極限定理の標準形をそのまま適用できるか。

## 答え
適用できない。通常の中心極限定理は $0<\sigma^2<\infty$ を仮定し、$\sigma$ による標準化を使うからである。

## 使用公式・定理
通常の中心極限定理は
$$E[X_i]=\mu,\qquad 0<\operatorname{Var}(X_i)=\sigma^2<\infty$$
の下で
$$\frac{\sqrt n(\overline X_n-\mu)}\sigma\xrightarrow{d}N(0,1)$$
を与える。

## 計算例
分散が無限大なら $\sigma=\sqrt{\operatorname{Var}(X_i)}$ が有限値として定まらない。そのため式の分母 $\sigma$ を作れず、通常の標準正規極限を結論できない。

## 一手
極限定理を使う前に、平均・分散・独立同分布の仮定を一覧で確認する。

## 注意
別の正規化で別種の極限定理が成り立つ場合はあるが、それはこのカードの通常形の範囲外である。

<!-- CARD -->

---
id: dist-normal-approximation-standardization
published: false
title: 二項分布の正規近似で標準化式を組み立てる
category: math-probability
subcategory: math-limit-approximations
topic: binomial-normal-standardization
type: formula
difficulty: 1
priority: S
hashtags: [二項分布, 二項分布の正規近似とポアソン近似, 標準化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布の正規近似とポアソン近似 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(n,p)$（$0<p<1$）を正規近似するとき、$X$ を標準化した式を答えよ。有限標本での近似条件も述べよ。

## 答え
$$Z=\frac{X-np}{\sqrt{np(1-p)}}$$
と置き、$Z$ を標準正規分布で近似する。

## 使用公式・定理
二項分布は平均 $np$、分散 $np(1-p)$ なので、標準化は
$$\frac{X-E[X]}{\sqrt{\operatorname{Var}(X)}}.$$

## 計算例
平均・分散を代入して
$$\frac{X-E[X]}{\sqrt{\operatorname{Var}(X)}}=\frac{X-np}{\sqrt{np(1-p)}}.$$
$np$ と $n(1-p)$ がともに十分大きいという正規近似の条件が満たされるとき、この量を $N(0,1)$ で近似する。

## 一手
「値−平均」を「標準偏差」で割るという標準化の定義へ戻す。

## 注意
正規近似分布そのものは $N(np,np(1-p))$ で、標準化後が $N(0,1)$ である。$p=0,1$ では分散が0なので、この標準化式は定義できない。

<!-- CARD -->

---
id: dist-weak-law-bernoulli-frequency
title: 成功頻度の大数の弱法則を計算する
category: math-probability
subcategory: math-limit-approximations
topic: weak-law-frequency
type: calc_step
difficulty: 1
priority: S
hashtags: [大数の弱法則, ベルヌーイ分布, 相対度数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の弱法則 }]
---
## 問題
成功確率 $p=0.6$ のベルヌーイ試行を独立に繰り返す。成功回数を $S_n$ としたとき、$S_n/n$ の確率極限を答えよ。

## 答え
$$\frac{S_n}{n}\xrightarrow{p}0.6.$$

## 使用公式・定理
成功を表す独立なベルヌーイ変数 $B_i$ を使うと $S_n=\sum_{i=1}^nB_i$、$E[B_i]=p$。大数の弱法則から
$$\frac{S_n}{n}=\overline B_n\xrightarrow{p}p.$$

## 計算例
ここでは $p=0.6$ なので
$$\frac{S_n}{n}=\frac1n\sum_{i=1}^nB_i\xrightarrow{p}E[B_i]=0.6.$$
相対度数が成功確率を推定する直観が得られる。

## 一手
回数をベルヌーイ変数の和へ直し、$n$ で割って標本平均にする。

## 注意
$S_n$ ではなく $S_n/n$ が有限値へ収束する。成功回数自体は一般に増加する。
