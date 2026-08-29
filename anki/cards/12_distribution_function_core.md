---
id: prob-cdf-validity
title: 関数が累積分布関数かを3条件で判定する
category: math-probability
subcategory: math-distribution-functions
topic: cdf-properties
type: condition
difficulty: 2
priority: A
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
id: prob-cdf-endpoint-choice
title: 区間端点の点確率を左極限で処理する
category: math-probability
subcategory: math-distribution-functions
topic: cdf-endpoints
type: pitfall
difficulty: 2
priority: A
hashtags: [累積分布関数, 左極限, 点確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 累積分布関数 }]
---
## 問題
$F_X(1-)=0.2$、$F_X(1)=0.5$、$F_X(3)=0.9$ である。$P(1\le X\le3)$ を求めよ。

## 答え
$F_X(1-)=0.2$, $F_X(1)=0.5$, $F_X(3)=0.9$ なら
$$
P(1\le X\le3)=F_X(3)-F_X(1-)=0.7.
$$

## 使用公式・定理
累積分布関数を
$$
F_X(x)=P(X\le x),
\qquad
F_X(x-)=P(X<x)
$$
とする。すると
$$
P(a<X\le b)=F_X(b)-F_X(a),
$$
$$
P(a\le X\le b)=F_X(b)-F_X(a-).
$$
右端を含まない場合も同様に $F_X(b-)$ を使う。連続分布では $F_X(x-)=F_X(x)$ なので端点の違いは消える。

## 計算例
左端 $1$ を含むので、引くのは $P(X<1)=F_X(1-)$ である。したがって
$$
\begin{aligned}
P(1\le X\le3)
&=P(X\le3)-P(X<1)\\
&=F_X(3)-F_X(1-)\\
&=0.9-0.2\\
&=0.7.
\end{aligned}
$$
点 $1$ の確率は
$$
P(X=1)=F_X(1)-F_X(1-)=0.5-0.2=0.3
$$
で、この $0.3$ も区間確率 $0.7$ に含まれる。

一方、連続分布で $F(x)=x^2$（$0\le x\le1$）なら左極限と関数値は一致するので
$$
\begin{aligned}
P\left(\frac14<X\le\frac34\right)
&=F\left(\frac34\right)-F\left(\frac14\right)\\
&=\frac9{16}-\frac1{16}\\
&=\frac12.
\end{aligned}
$$

## 一手
区間確率は「右端までの累積」から「左端より前の累積」を引く。左端を含むなら $F(a-)$、含まないなら $F(a)$ を引く。

## 注意
離散・混合分布では $F(a-)$ と $F(a)$ が異なり得る。連続分布だけを見て端点記号を無視する癖を付けない。

<!-- CARD -->

---
id: prob-mixed-cdf
title: 点質量と連続部分を持つ累積分布関数を作る
category: math-probability
subcategory: math-distribution-functions
topic: mixed-distribution-cdf
type: calc_step
difficulty: 2
priority: S
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
priority: A
hashtags: [同時分布, 同時密度, 二重積分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布 }]
---
## 問題
$f_{X,Y}(x,y)=1$（$0<x<1$, $0<y<1$）、それ以外で $0$ である。$0\le x,y\le1$ で同時累積分布関数 $F_{X,Y}(x,y)$ を求めよ。

## 答え
$f_{X,Y}(x,y)=1$（$0<x<1$, $0<y<1$）なら、$0\le x,y\le1$ で
$$
F_{X,Y}(x,y)=xy.
$$

## 使用公式・定理
同時累積分布関数は
$$
F_{X,Y}(x,y)
=P(X\le x,Y\le y)
=\int_{-\infty}^x\int_{-\infty}^y
f_{X,Y}(u,v)\,dv\,du.
$$
そこから長方形確率は包除原理により
$$
\begin{aligned}
P(a<X\le b,c<Y\le d)
={}&F(b,d)-F(a,d)\\
&-F(b,c)+F(a,c)
\end{aligned}
$$
と求める。

## 計算例
まず点 $(x,y)$ の左下にある確率を積分する。
$$
\begin{aligned}
F_{X,Y}(x,y)
&=\int_0^x\int_0^y1\,dv\,du\\
&=\int_0^x y\,du\\
&=xy.
\end{aligned}
$$
次に同じ累積分布関数を使って
$$
P(0.2<X\le0.8,0.3<Y\le0.7)
$$
を求める。4隅を $+,-,-,+$ で組み合わせると
$$
\begin{aligned}
P
&=F(0.8,0.7)-F(0.2,0.7)\\
&\quad-F(0.8,0.3)+F(0.2,0.3)\\
&=0.8\cdot0.7-0.2\cdot0.7\\
&\quad-0.8\cdot0.3+0.2\cdot0.3\\
&=0.56-0.14-0.24+0.06\\
&=0.24.
\end{aligned}
$$

## 一手
同時密度からは左下領域を積分して累積分布関数を作る。長方形確率へ戻すときは4隅を $+,-,-,+$ で包除する。

## 注意
$F_{X,Y}(x,y)$ は点 $(x,y)$ での密度値ではなく、その点までの累積確率である。長方形確率では最後の左下項を足し戻す。

<!-- CARD -->

---
id: prob-cumulative-hazard
title: 生存関数から累積危険率を求める
category: math-probability
subcategory: math-distribution-functions
topic: cumulative-hazard
type: formula
difficulty: 2
priority: S
hashtags: [累積危険率, 生存関数, 対数]
frequency: { past_exam: 2, textbook: 0, independent_problems: 0, source_confirmations: 2 }
sources: [{ type: official_syllabus, topic: 危険率 }, { type: past_exam, id: SCI-2019-Q1, topic: 生存関数 }, { type: past_exam, id: SCI-2017-Q2, topic: 故障率 }]
---
## 問題
$t\ge0$ で生存関数が $S_X(t)=e^{-t^2}$ である。累積危険率 $H_X(t)$ と危険率 $h_X(t)$ を求めよ。

## 答え
$S(t)=e^{-t^2}$ なら
$$
H(t)=t^2,
\qquad
h(t)=2t.
$$

## 使用公式・定理
非負で絶対連続な寿命変数について
$$
S(t)=1-F(t),
$$
$$
H(t)=-\log S(t),
\qquad
h(t)=H'(t)=\frac{f(t)}{S(t)}.
$$
逆向きには
$$
H(t)=\int_0^t h(u)\,du,
\qquad
S(t)=e^{-H(t)},
\qquad
F(t)=1-S(t).
$$
したがって $F,S,H,h$ は、必要な滑らかさの下で相互に変換できる。

## 計算例
まず累積分布関数から始める例として
$$
F(t)=1-e^{-t^2}\qquad(t\ge0)
$$
とする。生存関数は
$$
\begin{aligned}
S(t)
&=1-F(t)\\
&=1-(1-e^{-t^2})\\
&=e^{-t^2}.
\end{aligned}
$$
したがって
$$
\begin{aligned}
H(t)
&=-\log S(t)\\
&=-\log(e^{-t^2})\\
&=t^2,
\end{aligned}
$$
さらに
$$
h(t)=H'(t)=2t.
$$

逆向きに、危険率が
$$
h(t)=3t^2
$$
と与えられたなら
$$
\begin{aligned}
H(t)
&=\int_0^t3u^2\,du\\
&=[u^3]_0^t\\
&=t^3,
\end{aligned}
$$
よって
$$
S(t)=e^{-t^3},
\qquad
F(t)=1-e^{-t^3}.
$$
「危険率をそのまま指数へ入れる」のではなく、必ず一度積分して累積危険率を作る。

## 一手
順方向は
$$
F\to S=1-F\to H=-\log S\to h=H',
$$
逆方向は
$$
h\to H=\int h\to S=e^{-H}\to F=1-S.
$$
この鎖を覚えると個別公式を暗記する必要がない。

## 注意
危険率 $h(t)$ は確率そのものではなく、時点 $t$ まで生存した条件の下での瞬間的な発生率である。累積危険率 $H(t)$ と混同しない。
