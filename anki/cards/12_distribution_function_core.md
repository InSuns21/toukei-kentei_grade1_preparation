---
id: prob-pmf-normalization
title: 確率質量関数の定数を総和1で決める
category: math-probability
subcategory: math-distribution-functions
topic: pmf-normalization
type: calc_step
difficulty: 1
priority: B
hashtags: [確率質量関数, 正規化, 総和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率関数 }]
---
## 問題
$p_X(x)=c(x+1)$（$x=0,1,2$）、それ以外で $0$ が確率質量関数となるように $c$ を求めよ。

## 答え
台上の確率質量を全て足して1へ等置する。

## 使用公式・定理
確率質量関数は $p_X(x)\ge0$ かつ
$$\sum_xp_X(x)=1$$
を満たす。

## 計算例
$$\begin{aligned}1&=c(0+1)+c(1+1)+c(2+1)\\&=c+2c+3c\\&=6c.\end{aligned}$$
したがって $c=1/6$ である。

## 一手
未知定数を見たら、まず台を列挙して総和1を使う。

## 注意
台の外の値は総和へ入れない。

<!-- CARD -->
---
id: prob-cdf-validity
title: 関数が累積分布関数かを3条件で判定する
category: math-probability
subcategory: math-distribution-functions
topic: cdf-properties
type: condition
difficulty: 2
priority: B
hashtags: [累積分布関数, 単調性, 右連続]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 累積分布関数 }]
---
## 問題
$F(x)=0$（$x<0$）、$F(x)=x/2$（$0\le x<2$）、$F(x)=1$（$x\ge2$）は累積分布関数か。

## 答え
非減少、右連続、両端の極限が0と1であるため、累積分布関数である。

## 使用公式・定理
累積分布関数 $F$ は、非減少かつ右連続で
$$\lim_{x\to-\infty}F(x)=0,\qquad \lim_{x\to\infty}F(x)=1$$
を満たす。

## 計算例
$0\le x<2$ では傾き $1/2>0$、区間の接続値は $F(0)=0$、$F(2)=1$ で右側の値と一致する。また両端では0と1へ収束する。したがって全条件を満たす。

## 一手
候補関数では、値域だけでなく単調性・右連続性・両端極限を順に検査する。

## 注意
$0\le F(x)\le1$ だけでは十分でない。

<!-- CARD -->
---
id: prob-interval-from-cdf
title: 累積分布関数の差で区間確率を求める
category: math-probability
subcategory: math-distribution-functions
topic: interval-probability-cdf
type: formula
difficulty: 1
priority: B
hashtags: [累積分布関数, 区間確率, 差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 累積分布関数 }]
---
## 問題
連続分布の累積分布関数が $F(x)=x^2$（$0\le x\le1$）である。$P(1/4<X\le3/4)$ を求めよ。

## 答え
上端までの累積確率から下端までの累積確率を引く。

## 使用公式・定理
$$P(a<X\le b)=F(b)-F(a).$$

## 計算例
$$\begin{aligned}P(1/4<X\le3/4)&=F(3/4)-F(1/4)\\&=\left(\frac34\right)^2-\left(\frac14\right)^2\\&=\frac9{16}-\frac1{16}\\&=\frac12.\end{aligned}$$

## 一手
区間確率は右端の累積から左端の累積を引く。

## 注意
一般の分布では左端を含むかどうかで $F(a-)$ と $F(a)$ を使い分ける。

<!-- CARD -->
---
id: prob-cdf-endpoint-choice
title: 区間端点の点確率を左極限で処理する
category: math-probability
subcategory: math-distribution-functions
topic: cdf-endpoints
type: pitfall
difficulty: 2
priority: B
hashtags: [累積分布関数, 左極限, 点確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 累積分布関数 }]
---
## 問題
$F_X(1-)=0.2$、$F_X(1)=0.5$、$F_X(3)=0.9$ である。$P(1\le X\le3)$ を求めよ。

## 答え
左端 $1$ を含むので、$1$ 未満の確率 $F_X(1-)$ を引く。

## 使用公式・定理
$$P(a\le X\le b)=F_X(b)-F_X(a-).$$

## 計算例
$$P(1\le X\le3)=F_X(3)-F_X(1-)=0.9-0.2=0.7.$$
実際、$X=1$ の点確率 $0.5-0.2=0.3$ もこの値に含まれる。

## 一手
左端を含むなら左極限、含まないならその点の累積分布関数を引く。

## 注意
$F_X(3)-F_X(1)=0.4$ とすると $X=1$ の確率を落とす。

<!-- CARD -->
---
id: prob-mixed-cdf
title: 点質量と連続部分を持つ累積分布関数を作る
category: math-probability
subcategory: math-distribution-functions
topic: mixed-distribution-cdf
type: calc_step
difficulty: 2
priority: A
hashtags: [混合分布, 累積分布関数, 点質量]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 確率分布 }, { type: past_exam, id: MATH-2024-Q4, topic: 経験分布・混合分布 }]
---
## 問題
$P(X=0)=1/2$ で、残りの確率 $1/2$ は区間 $(0,1)$ 上に一定の密度で分布する。$F_X(x)$ を求めよ。

## 答え
$x=0$ の跳びと、$(0,1)$ 上の連続な増加を分けて足す。

## 使用公式・定理
点質量と密度が共存するとき
$$F_X(x)=\sum_{u\le x}P(X=u)+\int_{-\infty}^x f_{\mathrm{cont}}(u)\,du.$$

## 計算例
連続部分の密度は $(0,1)$ で $1/2$ だから
$$F_X(x)=\begin{cases}0&(x<0),\\1/2&(x=0),\\1/2+x/2&(0<x<1),\\1&(x\ge1).\end{cases}$$

## 一手
混合分布では、跳びと密度の積分を別々に数える。

## 注意
累積分布関数を微分するだけでは点 $0$ の確率質量を回収できない。

<!-- CARD -->
---
id: prob-joint-cdf-from-density
title: 同時密度を二重積分して同時累積分布関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: joint-cdf
type: calc_step
difficulty: 2
priority: B
hashtags: [同時累積分布関数, 同時密度, 二重積分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布 }]
---
## 問題
$f_{X,Y}(x,y)=1$（$0<x<1$, $0<y<1$）、それ以外で $0$ である。$0\le x,y\le1$ で同時累積分布関数 $F_{X,Y}(x,y)$ を求めよ。

## 答え
左下の長方形 $(0,x]\times(0,y]$ 上で同時密度を積分する。

## 使用公式・定理
$$F_{X,Y}(x,y)=P(X\le x,Y\le y)=\int_{-\infty}^x\int_{-\infty}^y f_{X,Y}(u,v)\,dv\,du.$$

## 計算例
$$\begin{aligned}F_{X,Y}(x,y)&=\int_0^x\int_0^y1\,dv\,du\\&=\int_0^x y\,du\\&=xy.\end{aligned}$$

## 一手
同時累積分布関数は点 $(x,y)$ の左下にある確率を集める。

## 注意
$F_{X,Y}(x,y)$ は同時密度の点 $(x,y)$ での値ではない。

<!-- CARD -->
---
id: prob-rectangle-from-joint-cdf
title: 同時累積分布関数から長方形確率を包除で求める
category: math-probability
subcategory: math-distribution-functions
topic: joint-cdf-rectangle
type: formula
difficulty: 2
priority: B
hashtags: [同時累積分布関数, 長方形確率, 包除原理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布 }]
---
## 問題
$F_{X,Y}(x,y)=xy$（$0\le x,y\le1$）である。$P(0.2<X\le0.8,0.3<Y\le0.7)$ を求めよ。

## 答え
右上までの累積確率から不要な2本の帯を引き、二重に引いた左下を戻す。

## 使用公式・定理
$$\begin{aligned}P(a<X\le b,c<Y\le d)={}&F(b,d)-F(a,d)\\&-F(b,c)+F(a,c).\end{aligned}$$

## 計算例
$$\begin{aligned}P&=0.8\cdot0.7-0.2\cdot0.7-0.8\cdot0.3+0.2\cdot0.3\\&=0.56-0.14-0.24+0.06\\&=0.24.\end{aligned}$$

## 一手
二次元の区間確率は4隅の累積分布関数を符号 $+,-,-,+$ で組み合わせる。

## 注意
最後の左下項を足し戻すのを忘れない。

<!-- CARD -->
---
id: prob-survival-from-cdf
title: 累積分布関数から生存関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: survival-function
type: formula
difficulty: 1
priority: A
hashtags: [生存関数, 累積分布関数, 補集合]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 生存関数 }, { type: past_exam, id: SCI-2019-Q1, topic: 生存関数・平均残存寿命 }]
---
## 問題
$X$ の累積分布関数が $F_X(t)=1-e^{-t^2}$（$t\ge0$）、$F_X(t)=0$（$t<0$）である。生存関数を求めよ。

## 答え
生存関数は累積分布関数の補集合である。

## 使用公式・定理
$$S_X(t)=P(X>t)=1-F_X(t).$$

## 計算例
$t\ge0$ では
$$S_X(t)=1-(1-e^{-t^2})=e^{-t^2}.$$
$t<0$ では $F_X(t)=0$ なので $S_X(t)=1$ である。

## 一手
生存関数そのものを求めるときは、台の外も含めて書く。

## 注意
非負変数では $t<0$ の生存関数は0ではなく1である。

<!-- CARD -->
---
id: prob-cumulative-hazard
title: 生存関数から累積危険率を求める
category: math-probability
subcategory: math-distribution-functions
topic: cumulative-hazard
type: formula
difficulty: 2
priority: A
hashtags: [累積危険率, 生存関数, 対数]
frequency: { past_exam: 2, textbook: 0, independent_problems: 0, source_confirmations: 2 }
sources: [{ type: official_syllabus, topic: 危険率 }, { type: past_exam, id: SCI-2019-Q1, topic: 生存関数 }, { type: past_exam, id: SCI-2017-Q2, topic: 故障率 }]
---
## 問題
$t\ge0$ で生存関数が $S_X(t)=e^{-t^2}$ である。累積危険率 $H_X(t)$ と危険率 $h_X(t)$ を求めよ。

## 答え
生存関数の負の対数が累積危険率で、その微分が危険率である。

## 使用公式・定理
$$H_X(t)=-\log S_X(t),\qquad h_X(t)=H_X'(t).$$

## 計算例
$$H_X(t)=-\log(e^{-t^2})=t^2,$$
したがって
$$h_X(t)=\frac{d}{dt}t^2=2t.$$

## 一手
生存関数が指数形なら、負の対数を取って指数部を取り出す。

## 注意
危険率と累積危険率を混同しない。

<!-- CARD -->
---
id: prob-survival-from-hazard
title: 危険率を積分して生存関数を復元する
category: math-probability
subcategory: math-distribution-functions
topic: hazard-to-survival
type: calc_step
difficulty: 2
priority: A
hashtags: [危険率, 生存関数, 累積危険率]
frequency: { past_exam: 2, textbook: 0, independent_problems: 0, source_confirmations: 2 }
sources: [{ type: official_syllabus, topic: 危険率 }, { type: past_exam, id: SCI-2019-Q1, topic: 生存関数 }, { type: past_exam, id: SCI-2017-Q2, topic: 故障率 }]
---
## 問題
$t\ge0$ で危険率が $h_X(t)=3t^2$ である。$S_X(0)=1$ として生存関数を求めよ。

## 答え
危険率を0から $t$ まで積分し、その負の指数を取る。

## 使用公式・定理
非負で絶対連続な寿命分布で $S_X(0)=1$ のとき
$$H_X(t)=\int_0^t h_X(u)\,du,\qquad S_X(t)=e^{-H_X(t)}.$$

## 計算例
$$H_X(t)=\int_0^t3u^2\,du=[u^3]_0^t=t^3.$$
したがって
$$S_X(t)=e^{-t^3}.$$

## 一手
危険率から生存関数へ戻る順序は「積分してから負の指数」である。

## 注意
$S_X(t)=e^{-h_X(t)}$ と直接置かない。
