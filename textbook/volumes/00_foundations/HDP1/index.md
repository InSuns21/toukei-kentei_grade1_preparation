# HDP1 指数Markov法・Hoeffding補題・Hoeffding不等式

大量の独立な観測値を平均すれば、平均は期待値に近づきます。しかし、どれくらいの標本数で、どの確率までずれを小さくできるのでしょうか。[チェビシェフの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev) は分散だけで答えられますが、偏差が大きくなるにつれて指数関数的に小さくなる確率までは捉えません。

この章では、まず確率変数を指数関数に通してから [Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov) を適用します。次に、有界な確率変数の指数モーメントを精密に押さえる補題を証明します。最後に独立な和へ適用し、**非同分布でも使える有限標本の偏差評価**を導きます。

道具の使い分けは次の通りです。指数関数を介する確率評価は独立性を必要としません。有界性は指数モーメントの二次上界に使い、独立性は和の指数モーメントを積へ分解する箇所だけに使います。どちらかを外した場合に何が壊れるかも、具体的な反例で確認します。

## 1. なぜ指数関数を通すのか

実数値確率変数 $Y$ の右裾 $P(Y\ge t)$ を知りたいとします。$Y$ は負になってもよいため、そのまま非負変数にしか使えない Markovの不等式を適用できません。一方、$e^{\lambda Y}$ は常に正であり、$Y$ が大きいほど急速に増えます。

<a id="prop-hdp1-exponential-markov"></a>

<!-- formal-statement-start -->
> **命題（指数Markov法）**  
> 確率空間上の実数値確率変数 $Y$、$\lambda>0$、$t\in\mathbb R$ に対し、$E[e^{\lambda Y}]<\infty$ と仮定する。このとき

$$
P(Y\ge t)\le e^{-\lambda t}E[e^{\lambda Y}].
$$

> この不等式は $Y$ の独立性などを仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

指数関数は単調増加なので、元の右裾事象を正の確率変数の右裾事象へ置き換えます。$\lambda$ は後から最適な値を選ぶ自由なパラメータです。

<!-- proof-start -->
### 証明

$\lambda>0$ より

$$
\{Y\ge t\}=\{e^{\lambda Y}\ge e^{\lambda t}\}
$$

です。非負変数 $W=e^{\lambda Y}$ と正数 $c=e^{\lambda t}$ を [Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov) に代入して

$$
P(Y\ge t)=P(W\ge c)
\le\frac{E[W]}{c}
=e^{-\lambda t}E[e^{\lambda Y}]
$$

を得ます。期待値が有限という仮定は、右辺が実数として定まるために必要です。
<!-- proof-end -->

例えば $Y$ が確率 $1/2$ ずつ $0,2$ を取るなら、$P(Y\ge2)=1/2$ です。$\lambda=\log2$ を代入すると

$$
e^{-2\lambda}E[e^{\lambda Y}]
=\frac{1}{4}\left(\frac12+\frac12\cdot4\right)
=\frac58
$$

となり、実際に $1/2\le5/8$ です。この段階の界は必ずしも鋭くありません。指数モーメントをうまく見積もることが次の課題です。

## 2. 中心化した指数モーメントを測る

$X$ の期待値を $\mu=E[X]$ とします。偏差を測るには、原点からではなく平均からのずれ $X-\mu$ を調べる必要があります。$X$ が有界なら $E[e^{s(X-\mu)}]$ はすべての実数 $s$ で有限です。その対数を取ると、独立和の積が和になるため計算しやすくなります。

<a id="def-hdp1-centered-log-mgf"></a>

<!-- formal-statement-start -->
> **定義（中心化対数指数モーメント）**  
> 実数値の可積分確率変数 $X$ について、実数 $s$ で $E[e^{s(X-E[X])}]<\infty$ のとき

$$
K_X(s)=\log E[e^{s(X-E[X])}]
$$

> と置く。これは平均からのずれについての対数指数モーメントである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp1-centered-log-mgf -->
### 直接例：二点分布で定義を確認する

**定義の確認**：$P(X=1)=P(X=-1)=1/2$ とします。$E[X]=0$ であり、$X$ は有界なので指数モーメントは全実数 $s$ で有限です。従って

$$
E[e^{s(X-E[X])}]
=\frac12e^s+\frac12e^{-s}
=\cosh s
$$

で、$K_X(s)=\log(\cosh s)$ です。$K_X(0)=0$、また $K'_X(0)=0$ です。$s$ が小さいときの二次係数が、後で得る有界性の評価と直接関係します。
<!-- definition-example-end -->

指数モーメントが存在しない分布では、そもそも $K_X(s)$ が有限値として定義できないことがあります。今回の主定理は **確実に有界な $X$** を扱うので、この問題を避けられます。

## 3. 有界性だけで指数モーメントを制御する

$X$ が区間 $[a,b]$ に収まっているとき、分布の細部を知らなくても指数モーメントを抑えられます。鍵は、指数で重み付けした新しい確率分布でも、値が同じ区間から出ないことです。

<a id="lem-hdp1-hoeffding"></a>

<!-- formal-statement-start -->
> **補題（Hoeffding補題）**  
> 実数値確率変数 $X$ がほとんど確実に $a\le X\le b$ を満たすとする。ただし $a,b\in\mathbb R$、$a\le b$ とする。すべての $s\in\mathbb R$ について

$$
E[e^{s(X-E[X])}]
\le\exp\left(\frac{s^2(b-a)^2}{8}\right)
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$a=b$ なら $X$ は定数なので等号です。$a<b$ のとき $U=(X-a)/(b-a)$ へ縮尺を変えて $0\le U\le1$ とします。関数 $g(z)=\log E[e^{zU}]-zE[U]$ の二階微分を、指数重み付き分布での分散として計算します。区間 $[0,1]$ 上の分散はどんな分布でも $1/4$ 以下です。最後に二度積分して $g(z)\le z^2/8$ を得ます。

<!-- proof-start -->
### 証明

まず $a=b$ の場合、$X=a$ がほとんど確実に成立するので $X-E[X]=0$ です。両辺は $1$ となります。

$a<b$ とします。$w=b-a>0$、$U=(X-a)/w$、$m=E[U]$ と置きます。すると

$$
0\le U\le1,\qquad
X-E[X]=w(U-m)
$$

が成立します。任意の実数 $z$ について

$$
M(z)=E[e^{zU}]>0,\qquad
g(z)=\log M(z)-zm
$$

と置きます。$U$ が有界であるため、固定した $z$ の近傍で $e^{zU}$ とその一階・二階微分は同じ有限定数で抑えられます。よって差商を期待値に入れる操作は有界収束で正当化でき、

$$
M'(z)=E[Ue^{zU}],\qquad
M''(z)=E[U^2e^{zU}]
$$

です。商と対数の微分を順に計算すると

$$
g'(z)=\frac{M'(z)}{M(z)}-m
$$

および

$$
g''(z)=\frac{M''(z)}{M(z)}
-\left(\frac{M'(z)}{M(z)}\right)^2
$$

となります。各事象の確率を $e^{zU}/M(z)$ 倍した確率測度 $P_z$ を考えます。確かに

$$
E\left[\frac{e^{zU}}{M(z)}\right]
=\frac{M(z)}{M(z)}=1
$$

なので全確率は $1$ です。この測度の期待値を $E_z$ と記すと

$$
E_z[U]=\frac{M'(z)}{M(z)},\qquad
E_z[U^2]=\frac{M''(z)}{M(z)}
$$

ゆえに $g''(z)=E_z[(U-E_z[U])^2]$ です。$0\le U\le1$ から $(U-1/2)^2\le1/4$ です。$\nu=E_z[U]$ と書くと

$$
\begin{aligned}
E_z[(U-\tfrac12)^2]
&=E_z[(U-\nu+\nu-\tfrac12)^2]\\
&=E_z[(U-\nu)^2]+(\nu-\tfrac12)^2
\end{aligned}
$$

となります。交差項は $E_z[U-\nu]=0$ のため消えます。したがって

$$
0\le g''(z)
\le E_z[(U-\tfrac12)^2]
\le\frac14.
$$

さらに $M(0)=1$、$M'(0)=m$ なので

$$
g(0)=0,\qquad g'(0)=0.
$$

$z\ge0$ のとき、微分積分の基本定理を二回用いると

$$
g(z)=\int_0^z(z-v)g''(v)\,dv
\le\frac14\int_0^z(z-v)\,dv
=\frac{z^2}{8}.
$$

$z<0$ では積分の向きに注意して

$$
g(z)=\int_z^0(v-z)g''(v)\,dv
\le\frac14\int_z^0(v-z)\,dv
=\frac{z^2}{8}
$$

です。最後に $z=sw$ を代入すると

$$
\begin{aligned}
\log E[e^{s(X-E[X])}]
&=\log E[e^{sw(U-m)}]\\
&=g(sw)\\
&\le\frac{s^2w^2}{8}.
\end{aligned}
$$

両辺で指数を取れば所望の不等式です。
<!-- proof-end -->

### 定数 $1/8$ はどこから来たか

最大分散 $1/4$ を二回積分すると $1/8$ になります。$U$ が $0,1$ を等確率で取る場合、$g''(0)=\operatorname{Var}(U)=1/4$ です。従って原点付近の二次係数はちょうど $1/8$ であり、この定数を全分布に対して一律に小さくすることはできません。

例えば $X$ が $0,1$ を等確率で取ると、$E[X]=1/2$ で

$$
E[e^{s(X-1/2)}]
=\frac12e^{-s/2}+\frac12e^{s/2}
=\cosh(s/2)
\le e^{s^2/8}
$$

となります。$s=0$ の周囲で両辺の二階微分はともに $1/4$ です。

## 4. 独立な和への拡張

ここまで独立性は一度も使っていません。標本が複数あるとき、各変数の指数モーメントに前節で示した二次上界を使うには、和の指数モーメントを因数分解できる必要があります。これが独立性の出番です。

<a id="thm-hdp1-hoeffding"></a>

<!-- formal-statement-start -->
> **定理（Hoeffdingの不等式：独立・非同分布版）**  
> 同じ確率空間上の相互に独立な実数値確率変数 $X_1,\ldots,X_n$ が、各 $i$ についてほとんど確実に $a_i\le X_i\le b_i$ を満たすとする。ただし $n\ge1$、$a_i,b_i\in\mathbb R$、$a_i\le b_i$ とする。$V=\sum_{i=1}^n(b_i-a_i)^2>0$ のとき、すべての $t>0$ について

$$
P\left(\sum_{i=1}^n(X_i-E[X_i])\ge t\right)
\le\exp\left(-\frac{2t^2}{V}\right).
$$

> $V=0$ なら左辺は $t>0$ で $0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正の $\lambda$ を固定し、[指数Markov法](#prop-hdp1-exponential-markov) で右裾を指数モーメントへ変えます。独立性で積を作り、[Hoeffding補題](#lem-hdp1-hoeffding) により対数の二次式を得ます。その二次式が最も小さくなる $\lambda$ を選びます。ここでは同分布性を一切使いません。

<!-- proof-start -->
### 証明

$S=\sum_{i=1}^n(X_i-E[X_i])$ とします。各 $X_i$ は有界なので $E[X_i]$ と $E[e^{\lambda(X_i-E[X_i])}]$ は有限です。$\lambda>0$ を任意に固定し、[指数Markov法](#prop-hdp1-exponential-markov) を $Y=S$ に適用すると

$$
P(S\ge t)\le e^{-\lambda t}E[e^{\lambda S}].
$$

指数の和を積へ変換すると

$$
e^{\lambda S}
=\prod_{i=1}^n e^{\lambda(X_i-E[X_i])}.
$$

$X_i$ は相互に独立であり、指数関数は可測、各因子は有界です。よって [独立な確率変数の期待値因数分解](../F0_00P3_独立_積測度_条件付き期待値/index.md#thm-f0-00p3-expectation-factorization) を各因子に適用して

$$
E[e^{\lambda S}]
=\prod_{i=1}^n E[e^{\lambda(X_i-E[X_i])}]
$$

を得ます。各 $i$ に [Hoeffding補題](#lem-hdp1-hoeffding) を $s=\lambda$ として代入すると

$$
\begin{aligned}
E[e^{\lambda S}]
&\le\prod_{i=1}^n
\exp\left(\frac{\lambda^2(b_i-a_i)^2}{8}\right)\\
&=\exp\left(\frac{\lambda^2}{8}
\sum_{i=1}^n(b_i-a_i)^2\right)\\
&=\exp\left(\frac{\lambda^2V}{8}\right).
\end{aligned}
$$

以上から、任意の $\lambda>0$ で

$$
P(S\ge t)\le
\exp\left(-\lambda t+\frac{\lambda^2V}{8}\right)
$$

です。$V>0$ のとき平方完成すると

$$
-\lambda t+\frac{\lambda^2V}{8}
=\frac V8\left(\lambda-\frac{4t}{V}\right)^2
-\frac{2t^2}{V}.
$$

$t>0$ より $\lambda_*=4t/V>0$ が許容範囲に入ります。$\lambda=\lambda_*$ を選べば右辺の平方項は $0$ となり、主張を得ます。

$V=0$ ならすべての $b_i-a_i=0$ で、$X_i=a_i$ がほとんど確実に成立します。そのため $S=0$ がほとんど確実で、$t>0$ に対し $P(S\ge t)=0$ です。この場合に $V$ で割る最適化は行いません。
<!-- proof-end -->

負の偏差については $-X_i$ を用います。$-b_i\le-X_i\le-a_i$ で区間の幅は同じなので、同じ定理を適用して

$$
P(S\le-t)\le\exp\left(-\frac{2t^2}{V}\right)
$$

です。二つの事象の和集合について [可算劣加法性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) を使うと次の系を得ます。

<a id="cor-hdp1-two-sided"></a>

<!-- formal-statement-start -->
> **系（Hoeffdingの両側不等式）**  
> 上の定理と同じ仮定で $V>0$、$t>0$ なら

$$
P\left(\left|\sum_{i=1}^n(X_i-E[X_i])\right|\ge t\right)
\le2\exp\left(-\frac{2t^2}{V}\right).
$$
<!-- formal-statement-end -->

ここで係数 $2$ は両裾を足したために生じます。右辺が $1$ を超える場合には、確率の自明な上界 $1$ と小さい方を採用できます。

## 5. 数値例：標本平均の精度を計画する

$X_1,\ldots,X_n$ が相互に独立で、$0\le X_i\le1$ とします。同一分布は必要ありません。$\overline X=n^{-1}\sum_i X_i$ とすると $V=n$ です。

[Hoeffdingの両側不等式](#cor-hdp1-two-sided) へ $t=n\varepsilon$ を代入すると

$$
\begin{aligned}
P\left(\left|\overline X-E[\overline X]\right|
\ge\varepsilon\right)
&=P(|S|\ge n\varepsilon)\\
&\le2\exp\left(-\frac{2n^2\varepsilon^2}{n}\right)\\
&=2e^{-2n\varepsilon^2}.
\end{aligned}
$$

目標失敗確率を $0<\delta<1$ とすると、十分条件 $2e^{-2n\varepsilon^2}\le\delta$ を解いて

$$
-2n\varepsilon^2\le\log(\delta/2)
$$

すなわち

$$
n\ge\frac{\log(2/\delta)}{2\varepsilon^2}
$$

を得ます。例えば $\varepsilon=0.1$、$\delta=0.05$ なら $\log40/0.02\approx184.44$ なので、整数標本数は $n\ge185$ が十分です。これは全ての $[0,1]$ 分布に共通する保証で、分布固有の情報を捨てたぶん保守的なこともあります。ここで標本数の条件は各観測値の期待値が同じであることを要求しません。保証の中心は、同一母平均ではなく $E[\overline X]=n^{-1}\sum_iE[X_i]$ です。

幅が揃っていない場合は $V$ が効きます。たとえば、三変数の幅がそれぞれ $1,2,3$ なら $V=1+4+9=14$ です。単に三個あるという情報より、幅が大きい一変数に結果が敏感になります。

## 6. どの仮定を外すと壊れるか

### 6.1 独立性を外す

$Z$ が $-1,1$ を等確率で取るとし、$X_1=X_2=Z$ とします。各変数は $[-1,1]$ に収まり、$E[X_i]=0$ です。しかし $X_1,X_2$ は独立ではありません。

$$
P(X_1+X_2\ge2)=P(Z=1)=\frac12.
$$

もし [Hoeffdingの不等式](#thm-hdp1-hoeffding) を独立性の確認なしに使うと $V=2^2+2^2=8$、$t=2$ なので

$$
\exp\left(-\frac{2\cdot2^2}{8}\right)
=e^{-1}<\frac12
$$

という誤った結論になります。壊れたのは、$E[e^{\lambda(X_1+X_2)}]$ を指数モーメントの積へ変える段階です。同じ変数を二回数えると偏差も二倍になり、独立な情報は二倍には増えません。

### 6.2 有界性を外す

裾の重い確率変数は指数モーメントが発散し得ます。例えば $P(X=k)=c/k^3$、$k=1,2,\ldots$ とし、$c$ は確率の総和が $1$ になる定数とします。$E[X]=c\sum_{k\ge1}k^{-2}<\infty$ ですが、任意の $s>0$ で

$$
E[e^{sX}]=c\sum_{k\ge1}\frac{e^{sk}}{k^3}=\infty.
$$

和の一般項 $e^{sk}/k^3$ は $0$ に近づかず、むしろ無限大へ発散するからです。この分布では中心化しても正の指数モーメントは無限大です。[指数Markov法](#prop-hdp1-exponential-markov) の右辺が有限にならず、有効な指数型上界を得られません。「有限の平均」だけでは Hoeffding型の指数集中は保証されない、という失敗機構です。

## 7. 演習：道具を独立に組み立てる

### Level A：適用条件と基本計算

#### A1. 指数Markov法の数値確認

$P(Y=0)=P(Y=2)=1/2$ のとき、$\lambda=\log2$、$t=2$ を用い、指数Markov法の右辺と実際の確率を計算せよ。

- Level: A
- ID: HDP1-A1

<!-- solution-start -->
**詳細解答**　$e^{\lambda}=2$ なので、$e^{2\lambda}=4$ です。まず

$$
E[e^{\lambda Y}]=\frac12e^0+\frac12e^{2\lambda}
=\frac12+\frac42=\frac52.
$$

[指数Markov法](#prop-hdp1-exponential-markov) の右辺は

$$
e^{-\lambda t}E[e^{\lambda Y}]
=\frac14\cdot\frac52=\frac58.
$$

実際は $P(Y\ge2)=P(Y=2)=1/2$ で、$1/2\le5/8$ を確認できます。指数モーメントは有限で、$\lambda>0$ です。
<!-- solution-end -->

#### A2. Bernoulli変数と二階係数

$P(U=0)=P(U=1)=1/2$ に対し、中心化対数指数モーメント $K_U(s)$ と $K_U''(0)$ を求めよ。

- Level: A
- ID: HDP1-A2

<!-- solution-start -->
**詳細解答**　$E[U]=1/2$ で、

$$
E[e^{s(U-1/2)}]
=\frac12e^{-s/2}+\frac12e^{s/2}
=\cosh(s/2).
$$

[中心化対数指数モーメントの定義](#def-hdp1-centered-log-mgf) から

$$
K_U(s)=\log\cosh(s/2),\qquad
K_U'(s)=\frac12\tanh(s/2).
$$

もう一度微分すると

$$
K_U''(s)=\frac14\left(1-\tanh^2(s/2)\right).
$$

ゆえに $K_U''(0)=1/4$ です。$U\in[0,1]$ なので [Hoeffding補題](#lem-hdp1-hoeffding) の対数上界は $s^2/8$ で、その二階微分は同じく $1/4$ です。
<!-- solution-end -->

#### A3. 幅が異なる三変数

相互に独立な $X_1,X_2,X_3$ が $0\le X_1\le1$、$2\le X_2\le4$、$-1\le X_3\le2$ を満たす。中心化和の右裾 $t=2$ に対して Hoeffdingの不等式を適用せよ。

- Level: A
- ID: HDP1-A3

<!-- solution-start -->
**詳細解答**　区間の幅は順に $1,2,3$ なので

$$
V=1^2+2^2+3^2=14.
$$

確率変数は相互に独立で有界です。[Hoeffdingの不等式](#thm-hdp1-hoeffding) へ $t=2$、$V=14$ を代入すると

$$
P\left(\sum_{i=1}^3(X_i-E[X_i])\ge2\right)
\le e^{-2\cdot4/14}
=e^{-4/7}.
$$

分布が同一であることや、各平均値の数値は必要ありません。
<!-- solution-end -->

#### A4. 百個の観測値の両側偏差

相互に独立な $[0,1]$ 値確率変数 $X_1,\ldots,X_{100}$ の標本平均が期待値から $0.1$ 以上ずれる確率を評価せよ。

- Level: A
- ID: HDP1-A4

<!-- solution-start -->
**詳細解答**　幅の二乗和は $V=100$ です。平均の偏差 $0.1$ は和の偏差 $t=100\cdot0.1=10$ に等しいので、[Hoeffdingの両側不等式](#cor-hdp1-two-sided) により

$$
P(|\overline X-E[\overline X]|\ge0.1)
\le2\exp(-2\cdot10^2/100)
=2e^{-2}.
$$

この数値は約 $0.2707$ です。同分布性は仮定されておらず、各変数の期待値が異なっても成立します。
<!-- solution-end -->

#### A5. 幅の二乗和が零の場合

$X_i=c_i$ がそれぞれほとんど確実に成立するなら、中心化和の右裾を評価し、定理の $V>0$ の場合と分ける理由を説明せよ。

- Level: A
- ID: HDP1-A5

<!-- solution-start -->
**詳細解答**　$E[X_i]=c_i$ なので各差は $X_i-E[X_i]=0$ です。したがって

$$
\sum_{i=1}^n(X_i-E[X_i])=0\quad\text{ほとんど確実}.
$$

$t>0$ に対して $P(S\ge t)=0$ です。この場合の $V=0$ を分母とする式 $e^{-2t^2/V}$ は定義されません。[Hoeffdingの不等式](#thm-hdp1-hoeffding) の証明にある最適化 $\lambda_*=4t/V$ も行えないため、定数の場合を別に処理します。
<!-- solution-end -->

### Level B：仮定・重み・他の不等式との比較

#### B1. 独立でないと何が壊れるか

$P(Z=-1)=P(Z=1)=1/2$ とし、$X_1=X_2=Z$ と置く。$t=2$ で Hoeffding型の式が失敗することを計算し、証明中で使えない等式を示せ。

- Level: B
- ID: HDP1-B1

<!-- solution-start -->
**詳細解答**　各 $X_i$ の平均は $0$、区間幅は $2$ なので、独立だと仮定してしまうと $V=8$ です。しかし

$$
P(X_1+X_2\ge2)=P(Z=1)=\frac12
>e^{-1}
=\exp(-2\cdot2^2/8).
$$

指数モーメントを計算して失敗位置も確かめます。

$$
E[e^{\lambda(X_1+X_2)}]
=E[e^{2\lambda Z}]
=\cosh(2\lambda).
$$

一方、各指数モーメントの積は

$$
E[e^{\lambda X_1}]E[e^{\lambda X_2}]
=(\cosh\lambda)^2.
$$

$\cosh(2\lambda)=2\cosh^2\lambda-1$ なので、$\lambda\ne0$ では両者は一致しません。[独立な確率変数の期待値因数分解](../F0_00P3_独立_積測度_条件付き期待値/index.md#thm-f0-00p3-expectation-factorization) の独立性条件が欠けています。
<!-- solution-end -->

#### B2. 重み付き和の偏差

相互に独立な $X_1,X_2,X_3\in[-1,1]$ に対して $T=X_1+2X_2-X_3$ とする。$P(T-E[T]\ge3)$ の一様な上界を求めよ。

- Level: B
- ID: HDP1-B2

<!-- solution-start -->
**詳細解答**　$Y_1=X_1$、$Y_2=2X_2$、$Y_3=-X_3$ と置きます。個々の可測な変換は独立性を保つので $Y_i$ は相互に独立です。各区間の幅は $2,4,2$ です。従って

$$
V=2^2+4^2+2^2=24,\qquad
\sum_{i=1}^3(Y_i-E[Y_i])=T-E[T].
$$

[Hoeffdingの不等式](#thm-hdp1-hoeffding) で $t=3$ とすれば

$$
P(T-E[T]\ge3)
\le\exp(-2\cdot3^2/24)
=e^{-3/4}.
$$

負の係数も、像の区間の端点を入れ替えることで幅 $2$ に戻せます。
<!-- solution-end -->

#### B3. 複数候補の最大偏差

$1\le j\le d$ ごとに $X_{1j},\ldots,X_{nj}$ が相互に独立で $[0,1]$ に収まるとする。異なる $j$ の列間には独立性を仮定しない。$\overline X_j=n^{-1}\sum_iX_{ij}$ に対する

$$
P\left(\max_{1\le j\le d}
|\overline X_j-E[\overline X_j]|\ge\varepsilon\right)
$$

を評価せよ。ただし $\varepsilon>0$、$n,d\ge1$ とする。

- Level: B
- ID: HDP1-B3

<!-- solution-start -->
**詳細解答**　各固定 $j$ については列の中で独立なので、[Hoeffdingの両側不等式](#cor-hdp1-two-sided) を $t=n\varepsilon$、$V=n$ に適用できます。

$$
P(|\overline X_j-E[\overline X_j]|\ge\varepsilon)
\le2e^{-2n\varepsilon^2}.
$$

最大偏差の事象は各 $j$ の事象の和集合です。[可算劣加法性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) により

$$
\begin{aligned}
P\left(\max_j|\overline X_j-E[\overline X_j]|\ge\varepsilon\right)
&\le\sum_{j=1}^d
P(|\overline X_j-E[\overline X_j]|\ge\varepsilon)\\
&\le2d e^{-2n\varepsilon^2}.
\end{aligned}
$$

列間の独立性は和集合の評価に不要です。確率は $1$ 以下なので、最終的には $\min\{1,2d e^{-2n\varepsilon^2}\}$ と書いてもよいです。
<!-- solution-end -->

#### B4. 分散だけの界との比較

相互に独立な Bernoulli$(p)$ 変数 $X_1,\ldots,X_n$ を考える。$p=0.1$、$n=100$、$\varepsilon=0.2$ のとき、$P(|\overline X-p|\ge\varepsilon)$ に対する Chebyshev と Hoeffding の両側上界を比較せよ。

- Level: B
- ID: HDP1-B4

<!-- solution-start -->
**詳細解答**　$X_i\in\{0,1\}$ で $E[X_i]=p$、$\operatorname{Var}(X_i)=p(1-p)$ です。独立性から

$$
\operatorname{Var}(\overline X)
=\frac1{n^2}\sum_{i=1}^n p(1-p)
=\frac{p(1-p)}n.
$$

[チェビシェフの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev) を用いると

$$
P(|\overline X-p|\ge\varepsilon)
\le\frac{p(1-p)}{n\varepsilon^2}
=\frac{0.1\cdot0.9}{100\cdot0.04}
=0.0225.
$$

一方、[Hoeffdingの両側不等式](#cor-hdp1-two-sided) は

$$
P(|\overline X-p|\ge0.2)
\le2e^{-2\cdot100\cdot0.2^2}
=2e^{-8}\approx0.000671.
$$

この例では Hoeffding の界の方が小さいです。ただし常に大小が固定されるわけではなく、小さい $n\varepsilon^2$ では両側Hoeffdingの右辺が $1$ を超えることもあります。
<!-- solution-end -->

### Level C：多座標の同時保証と反例

#### C1. $d$ 個の平均を同時に保証する

$0<\varepsilon<1/2$、$0<\delta<1$、整数 $d,n\ge1$ とする。確率変数 $X_{ij}$（$1\le i\le n$、$1\le j\le d$）はすべて $[0,1]$ に収まり、固定した $j$ に対して $X_{1j},\ldots,X_{nj}$ は相互に独立とする。列間の独立性は仮定しない。$\mu_j=E[n^{-1}\sum_iX_{ij}]$ と置く。

1. 全ての $j$ に対して標本平均が $\mu_j$ から $\varepsilon$ 未満しかずれない確率が $1-\delta$ 以上となるための、$n$ に関する十分条件を求めよ。
2. $d$ に関して必要となる標本数の増大を説明せよ。
3. 各列内の独立性を除いたとき、$d=1$ で結論が一般には成り立たない反例を作れ。

- Level: C
- ID: HDP1-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$\overline X_j=n^{-1}\sum_iX_{ij}$ とします。固定した各 $j$ の $n$ 個について独立性と有界性があるので、[Hoeffdingの両側不等式](#cor-hdp1-two-sided) から

$$
P(|\overline X_j-\mu_j|\ge\varepsilon)
\le2e^{-2n\varepsilon^2}.
$$

全ての $j$ の誤差が $\varepsilon$ 未満となる事象を $G$ とすると、その補集合は

$$
G^c=\bigcup_{j=1}^d
\{|\overline X_j-\mu_j|\ge\varepsilon\}.
$$

[可算劣加法性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) を有限回の和に適用して

$$
P(G^c)\le\sum_{j=1}^d2e^{-2n\varepsilon^2}
=2d e^{-2n\varepsilon^2}.
$$

これを $\delta$ 以下にするには

$$
2d e^{-2n\varepsilon^2}\le\delta
\quad\Longleftrightarrow\quad
-2n\varepsilon^2\le\log\frac{\delta}{2d}.
$$

$\varepsilon>0$ に注意して不等号を変形すると

$$
n\ge\frac{\log(2d/\delta)}{2\varepsilon^2}.
$$

従ってこの条件を満たす整数 $n$ を選べば $P(G)=1-P(G^c)\ge1-\delta$ です。

**(2)**　$\varepsilon,\delta$ を固定すると、十分標本数は $\log d$ に比例して増えます。これは候補数 $d$ 個の事象について、確率をそのまま $d$ 倍する [可算劣加法性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) を使ったためです。列間に独立性がなくても保証できます。

**(3)**　$d=1$ とし、$Z$ を $0,1$ 等確率の Bernoulli 変数として、すべての $i$ で $X_{i1}=Z$ とします。各値は確かに $[0,1]$ ですが、標本同士は完全に従属しています。

$$
\overline X_1=Z,\qquad
\mu_1=E[Z]=\frac12.
$$

従って $0<\varepsilon<1/2$ のとき

$$
P(|\overline X_1-\mu_1|\ge\varepsilon)=1
$$

です。右辺を $n$ とともに $0$ に近づけるような Hoeffding型保証は成立しません。破綻するのは、和の指数モーメントを独立因子の積へ分解する操作であり、$n$ 回の観測に見えて実際は一つの乱数しかありません。
<!-- solution-end -->

## 8. 次に必要になるもの

この章の評価は、確率変数の台を確実に有限区間へ閉じ込めることができる場合に強力です。しかし Gaussian のような非有界の変数、稀に大きな値を取る変数にはこのまま使えません。次の段階では、分散の大きさを残した Bernstein型の不等式と、指数モーメントを条件にした sub-Gaussian・sub-exponential の枠組みを学びます。さらに、候補が無限個なら単純な和集合の評価だけでは足りず、被覆数や chaining が必要になります。
