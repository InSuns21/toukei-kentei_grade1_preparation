# P4-01 変数変換・順序統計量

本章は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md) に従います。変換後の台を先に確定し、逆像・逆変換・ヤコビアンの絶対値・正規化を順に確認します。演習は問題の直後に詳細解答・本番答案・採点基準を配置します。

## この章で解けるようになる問題

変換後の台を先に描き、逆像を全て数え、逆変換のヤコビアンの絶対値を掛けます。和・差・積・比、極座標変換、最大・最小・第$k$順序統計量を、正規化検算まで含む答案にします。

## 公式出題範囲との対応

| 範囲 | 主な問題 |
|---|---|
| 一変数変換 | P4-A01, A02, C01 |
| 多変数変換・ヤコビアン | P4-B03, C02 |
| 和・差・積・比 | P4-B01, B02, C02, C05 |
| 最大・最小 | P4-A03, B04, C04, P4-DRILL-01 |
| 一般順序統計量 | P4-A04, C03, D01 |

## 前提知識チェック

1. F0-00: [逆関数・置換積分・ヤコビアン・ガンマ関数・ベータ関数](../../00_foundations/F0_00_統計検定1級のための数学速習/index.md)を確認する。
2. P2-01: 累積分布関数から区間確率を作り、微分可能な点では密度へ戻す。
3. P1-02: 独立標本の同時確率を積で表す。
4. P3-02: 一様・指数・正規・ガンマ・ベータ分布の密度、台、母数の意味を確認する。
5. P3-03: 多変数の同時密度と周辺化を確認する。

## 学習目標

- 非単調変換で逆像の寄与を全て足せる。
- 変換前後の領域を不等式で対応させられる。
- 逆変換のヤコビアンの絶対値と積分変数を落とさない。
- 順序統計量の係数を「左・微小区間・右」の配置数から導ける。
- 最大・最小・標本範囲を累積分布関数による方法と同時密度法で処理できる。

合格基準はLevel B 85%以上、Level C 70%以上、30分ドリル70点以上です。

---

# 1. 動機と試験での位置づけ

統計量の分布は、元の標本を変換して得ます。標本平均は和、分散比は比、最大値による推定は順序統計量です。したがって変数変換は標本分布・尤度・信頼区間へ直結します。

最頻の失点は、ヤコビアンに絶対値を付け忘れること、非単調変換の逆像を一つしか数えないこと、変換後の台を書かないことです。本章では毎回「逆変換または全逆像 → 像の領域 → ヤコビアンの絶対値 → 正規化」の順で答案を作ります。

---

# 2. 定義と記法

## P4-DEF-01 一変数変換と逆像

連続確率変数$X$と、区分ごとに連続微分可能な関数$g$に対し$Y=g(X)$とします。$y$の逆像とは$g(x)=y$を満たす$x$です。$g$が非単調なら逆像が複数あり、各枝の寄与を足します。臨界点や端点そのものの確率が0でも、変換後の台の境界として明記します。

## P4-DEF-02 多変数変換とヤコビアン

$(U,V)=T(X,Y)$とし、領域$D$上で$T$と逆変換$(x,y)=T^{-1}(u,v)$がともに連続微分可能で、逆変換のヤコビアン（ヤコビ行列式）が0でないとします。逆変換のヤコビアンを
$$
J(u,v)=\det\frac{\partial(x,y)}{\partial(u,v)}
$$
と書きます。密度変換では$|J(u,v)|$を使います。

## P4-DEF-03 順序統計量

$X_1,\ldots,X_n$を連続分布$F$からの独立同分布標本とします。小さい順に並べた値を
$$
X_{(1)}\leq X_{(2)}\leq\cdots\leq X_{(n)}
$$
と書きます。連続分布では標本値が一致する確率は0なので、確率1で不等号はすべて狭義になります。$X_{(1)}$は最小値、$X_{(n)}$は最大値、$X_{(k)}$は第$k$順序統計量です。

---

# 3. 基本命題と主要定理

## P4-THM-01 一変数密度変換公式

$y$に対する逆像$x_j(y)$が有限個で、各枝で$g'(x_j)\neq0$なら
$$
f_Y(y)=\sum_j f_X\{x_j(y)\}
\left|\frac{dx_j(y)}{dy}\right|
$$
です。

単調増加の場合は
$$
F_Y(y)=P\{g(X)\leq y\}=F_X\{g^{-1}(y)\}
$$
を微分して得られます。単調減少の場合は不等号が逆転し、
$$
F_Y(y)=1-F_X\{g^{-1}(y)\}
$$
の微分から絶対値が現れます。非単調なら、元の台を$g$が単調になる区間へ分けて各枝の寄与を足します。

## P4-THM-02 多変数密度変換公式

P4-DEF-02の仮定の下で、像$T(D)$上では
$$
f_{U,V}(u,v)=f_{X,Y}\{x(u,v),y(u,v)\}
\left|\det\frac{\partial(x,y)}{\partial(u,v)}\right|,
$$
像の外では0です。

正規化は多重積分の変数変換定理から
$$
\iint_{T(D)}f_{U,V}(u,v)\,du\,dv
=\iint_Df_{X,Y}(x,y)\,dx\,dy=1
$$
と確認できます。複数の逆像がある場合は、一対一になる領域へ分割して各領域の寄与を足します。

## P4-THM-03 和・差・積・比の密度

$(X,Y)$が同時確率密度関数$f_{X,Y}$を持つとします。積分は密度が非零となる範囲で行います。
$$
f_{X+Y}(u)=\int_{-\infty}^{\infty}f_{X,Y}(x,u-x)\,dx,
$$
$$
f_{X-Y}(u)=\int_{-\infty}^{\infty}f_{X,Y}(x,x-u)\,dx,
$$
$$
f_{XY}(u)=\int_{x\neq0}f_{X,Y}\left(x,\frac ux\right)\frac{dx}{|x|},
$$
$$
f_{X/Y}(u)=\int_{-\infty}^{\infty}|v|f_{X,Y}(uv,v)\,dv.
$$

和では$(u,v)=(x+y,x)$として$x=v,y=u-v$、差では$(u,v)=(x-y,x)$として$x=v,y=v-u$で、逆変換のヤコビアンの絶対値は1です。積では$(u,v)=(xy,x)$として$x=v,y=u/v$、絶対値は$1/|v|$です。比では$(u,v)=(x/y,y)$として$x=uv,y=v$、絶対値は$|v|$です。補助変数$v$を積分消去すると上の4式を得ます。独立なら$f_{X,Y}=f_Xf_Y$を代入します。

## P4-THM-04 最大・最小と第$k$順序統計量

$F$が非負関数$f$を用いて
$$
F(b)-F(a)=\int_a^bf(t)\,dt\qquad(a<b)
$$
と表せるとします。独立性より
$$
P(X_{(n)}\leq x)=F(x)^n,
\qquad
P(X_{(1)}>x)=\{1-F(x)\}^n.
$$
したがって、$F$が微分可能で$F'(x)=f(x)$となる点では
$$
f_{X_{(n)}}(x)=nF(x)^{n-1}f(x),
$$
$$
f_{X_{(1)}}(x)=n\{1-F(x)\}^{n-1}f(x).
$$

一般に
$$
f_{X_{(k)}}(x)
=\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x).
$$

この係数を、微小区間から確認します。$F'(x)=f(x)$となる点で
$$
\Delta_h=F(x+h)-F(x)=f(x)h+o(h)
$$
とします。$x$以下へ$k-1$個、$(x,x+h]$へ1個、$x+h$より上へ$n-k$個を置く主要項は
$$
\frac{n!}{(k-1)!(n-k)!}F(x)^{k-1}\Delta_h
\{1-F(x+h)\}^{n-k}
$$
です。微小区間へ2個以上入る残りの項は$O(\Delta_h^2)=o(h)$なので、全確率を$h$で割って$h\downarrow0$とすれば上の密度を得ます。

## P4-THM-05 順序統計量の同時密度

全順序統計量の同時確率密度関数は
$$
f_{X_{(1)},\ldots,X_{(n)}}(x_1,\ldots,x_n)
=n!\prod_{r=1}^nf(x_r)
$$
（$x_1<\cdots<x_n$）で、領域外は0です。係数$n!$は、同じ順序領域へ写る元標本の$n!$個の順列から生じます。

特に最小値$U=X_{(1)}$、最大値$V=X_{(n)}$の同時確率密度関数は$n\geq2$で
$$
f_{U,V}(u,v)=n(n-1)\{F(v)-F(u)\}^{n-2}f(u)f(v),
\qquad u<v.
$$
$u$と$v$を取る標本を順序付きで$n(n-1)$通り選び、残り$n-2$個を$(u,v)$へ入れるためです。

一般の二点$x<y$でも、$F'(x)=f(x)$かつ$F'(y)=f(y)$となる点で、幅$h,\ell$の互いに交わらない区間$(x,x+h]$、$(y,y+\ell]$へ各1個を置く項は$h\ell$次です。どちらかへ2個以上入る項は
$$
O(h^2\ell+h\ell^2)=o(h\ell)
$$
なので、長方形確率を$h\ell$で割った極限には各1個の配置だけが残ります。上の積分表示をもつ$F$では、面積0の例外点を除いて$F'=f$が成り立つため、同時密度の式もその例外点を除いて得られます。例外点上の密度値を変えても積分確率は変わりません。

## P4-THM-06 確率積分変換とベータ分布

一様分布$\operatorname{Unif}(0,1)$は$0<u<1$で$f(u)=1$、範囲外で0です。ベータ分布$\operatorname{Beta}(a,b)$は$a,b>0$として、$0<u<1$で
$$
f(u)=\frac{u^{a-1}(1-u)^{b-1}}{B(a,b)}
$$
を確率密度関数にもつ分布です。

$F$が連続なら$F(X_i)\sim\operatorname{Unif}(0,1)$です。実際、$0<u<1$に対して
$$
q(u)=\sup\{x:F(x)\leq u\}
$$
と置くと、$F$の連続性から$F\{q(u)\}=u$です。単調性より
$$
\{F(X_i)\leq u\}=\{X_i\leq q(u)\}
$$
なので
$$
P\{F(X_i)\leq u\}=F\{q(u)\}=u.
$$
各$F(X_i)$は$X_i$の関数なので独立性も保たれます。また$F$は単調非減少だから、標本を並べてから$F$を作用させても順序は変わらず
$$
F\{X_{(k)}\}=\bigl(F(X_1),\ldots,F(X_n)\bigr)_{(k)}
$$
です。P4-THM-04を一様分布へ適用すると
$$
F\{X_{(k)}\}\sim\operatorname{Beta}(k,n-k+1).
$$
したがって
$$
E[F\{X_{(k)}\}]=\frac{k}{n+1},
\qquad
\operatorname{Var}(F\{X_{(k)}\})
=\frac{k(n-k+1)}{(n+1)^2(n+2)}.
$$

---

# 4. 典型例と完全な導出

## 例1：平方変換

$X\sim\operatorname{Unif}(-1,1)$、$Y=X^2$では$0<y<1$に逆像$\pm\sqrt y$があります。各枝で$|dx/dy|=1/(2\sqrt y)$なので
$$
f_Y(y)=\frac12\frac1{2\sqrt y}+\frac12\frac1{2\sqrt y}
=\frac1{2\sqrt y}.
$$
片方の逆像だけでは積分が$1/2$になり、密度として正規化されません。

## 例2：畳込み

独立な$\operatorname{Unif}(0,1)$二つの和$S$では、$x$と$s-x$がともに$(0,1)$となる区間長を求めます。
$$
f_S(s)=
\begin{cases}
s,&0<s<1,\\
2-s,&1\leq s<2,\\
0,&\text{otherwise}.
\end{cases}
$$

## 例3：極座標

独立標準正規$X,Y$に対し$R=\sqrt{X^2+Y^2}$、$\Theta=\operatorname{atan2}(Y,X)$とすると、
$$
x=r\cos\theta,\qquad y=r\sin\theta
$$
で、逆変換のヤコビアンの絶対値は$r$です。したがって
$$
f_{R,\Theta}(r,\theta)=\frac1{2\pi}re^{-r^2/2},
\quad r>0,\ 0\leq\theta<2\pi.
$$

## 例4：一様標本の最大値

$X_i\sim\operatorname{Unif}(0,\theta)$なら最大値$M$について
$$
P(M\leq m)=P(X_1\leq m,\ldots,X_n\leq m)
=\left(\frac m\theta\right)^n,
\quad0<m<\theta,
$$
なので、密度は
$$
f_M(m)=\frac{nm^{n-1}}{\theta^n}\boldsymbol{1}_{(0,\theta)}(m)
$$
です。

---

# 5. 問題解決パターン

## PREIMAGE-1：逆像を列挙する

$g(x)=y$を解き、元の台に入る解を全て書きます。平方・絶対値・三角関数では複数枝が基本です。各枝の$|dx/dy|$を足します。

## SUPPORT-MAP-1：領域を先に写す

変換前の不等式へ逆変換を代入し、変換後の台を求めます。和なら積分区間の交わり、比なら分母0と符号、極座標なら角度範囲を確認します。

## JACOBIAN-1：逆変換で計算する

密度公式へ直接入るのは
$$
\left|\frac{\partial(x,y)}{\partial(u,v)}\right|
$$
です。順変換のヤコビアンを計算した場合は、その逆数の絶対値を使います。

## CONV-1・RATIO-1

和は$y=u-x$、差は$y=x-u$、積は$y=u/x$、比は$x=uv,y=v$と補助変数を取ります。式より先に元の台から積分範囲を決めます。

## ORDER-1・EXTREME-1

最大は「全て以下」、最小は「全て超える」の累積分布関数または生存関数から始めます。第$k$順序統計量は左$k-1$個、幅$h$の区間内1個、右$n-k$個の主要配置を数えます。区間内2個以上の項が$o(h)$であることを確認してから密度極限へ進みます。

## 本番での選択判断

3分で逆変換と像の領域が書ければ選択します。15分でヤコビアンまたは順序統計量の係数まで得られれば継続します。25分では台、絶対値、正規化のいずれも空欄にせず閉じます。

---

# 6. 演習：問題の直後に解答

GitHub Pagesでは各「解答を表示」を開くと、詳細解答・本番答案・採点基準を確認できます。

## 問題で使う分布の定義

台の外では確率密度関数を0とします。
$$
\begin{aligned}
X\sim\operatorname{Unif}(a,b),\ a<b&:\quad f_X(x)=\frac1{b-a}\boldsymbol{1}_{(a,b)}(x),\\
X\sim\operatorname{Exp}(\lambda),\ \lambda>0&:\quad f_X(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x),\\
X\sim N(0,1)&:\quad f_X(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2},\quad x\in\mathbb R,\\
X\sim\operatorname{Gamma}(a,b),\ a,b>0&:\quad
f_X(x)=\frac{b^a}{\Gamma(a)}x^{a-1}e^{-bx}\boldsymbol{1}_{(0,\infty)}(x),\\
X\sim\operatorname{Beta}(a,b),\ a,b>0&:\quad
f_X(x)=\frac{x^{a-1}(1-x)^{b-1}}{B(a,b)}\boldsymbol{1}_{(0,1)}(x).
\end{aligned}
$$
ガンマ分布は**形状・率**の順で表します。累積分布関数は$F_X(x)=P(X\leq x)$、モーメント母関数は$M_X(t)=E[e^{tX}]$です。

## Level A：基礎部品

### P4-A01 平方変換
- level: A
- minutes: 8
- topics: 一変数変換
- techniques: PREIMAGE-1
- calculation_load: low

$X\sim\operatorname{Unif}(-1,1)$、$Y=X^2$とする。$Y$の台、累積分布関数、確率密度関数を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$Y$の台は$[0,1]$です。$0\leq y<1$で
$$
F_Y(y)=P(-\sqrt y\leq X\leq\sqrt y)=\sqrt y.
$$
したがって
$$
F_Y(y)=\begin{cases}
0,&y<0,\\
\sqrt y,&0\leq y<1,\\
1,&y\geq1,
\end{cases}
$$
であり、台の内部で微分して
$$
f_Y(y)=\frac1{2\sqrt y}\boldsymbol{1}_{(0,1)}(y).
$$

##### 本番答案

$Y\in[0,1]$。$F_Y(y)=0,\sqrt y,1$をそれぞれ$y<0$, $0\leq y<1$, $y\geq1$で取り、$f_Y(y)=(2\sqrt y)^{-1}\boldsymbol{1}_{(0,1)}(y)$。

##### 採点基準

台4点、累積分布関数8点、確率密度関数8点。合計20点。

<!-- solution-end -->

### P4-A02 尺度変換
- level: A
- minutes: 7
- topics: 一変数変換, 指数分布
- techniques: PREIMAGE-1
- calculation_load: low

$\lambda>0$とし、$X\sim\operatorname{Exp}(\lambda)$、$Y=2X$とする。$Y$の確率密度関数と分布名・パラメータを求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$y>0$では逆変換が$x=y/2$で
$$
\left|\frac{dx}{dy}\right|=\frac12.
$$
したがって
$$
f_Y(y)=\lambda e^{-\lambda y/2}\frac12
=\frac\lambda2e^{-(\lambda/2)y},\qquad y>0.
$$
よって
$$
Y\sim\operatorname{Exp}(\lambda/2).
$$

##### 本番答案

$f_Y(y)=(\lambda/2)e^{-(\lambda/2)y}\boldsymbol{1}_{(0,\infty)}(y)$、すなわち$Y\sim\operatorname{Exp}(\lambda/2)$。

##### 採点基準

逆変換6点、絶対微分6点、確率密度関数・分布同定8点。合計20点。

<!-- solution-end -->

### P4-A03 一様標本の最大値
- level: A
- minutes: 8
- topics: 最大値
- techniques: EXTREME-1
- calculation_load: low

$X_1,\ldots,X_4$を独立な$\operatorname{Unif}(0,1)$とし、$M=\max_iX_i$とする。$M$の累積分布関数、確率密度関数、平均を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$0\leq m\leq1$で
$$
\begin{aligned}
F_M(m)
&=P(X_1\leq m,\ldots,X_4\leq m)\\
&=\prod_{i=1}^4P(X_i\leq m)=m^4.
\end{aligned}
$$
したがって$f_M(m)=4m^3$（$0<m<1$）です。また
$$
E[M]=\int_0^1m\,4m^3\,dm=\frac45.
$$

##### 本番答案

$F_M(m)=0,m^4,1$（$m<0$, $0\leq m<1$, $m\geq1$）、$f_M(m)=4m^3\boldsymbol{1}_{(0,1)}(m)$、$E[M]=4/5$。

##### 採点基準

累積分布関数8点、確率密度関数5点、平均7点。合計20点。

<!-- solution-end -->

### P4-A04 一様順序統計量
- level: A
- minutes: 8
- topics: 順序統計量, ベータ分布
- techniques: ORDER-1
- calculation_load: low

$X_1,\ldots,X_5$を独立な$\operatorname{Unif}(0,1)$とする。P4-THM-04を用いて$X_{(2)}$の分布、平均、分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

一様分布では$F(x)=x$, $f(x)=1$（$0<x<1$）なので
$$
f_{X_{(2)}}(x)
=\frac{5!}{1!3!}x(1-x)^3
=20x(1-x)^3.
$$
ベータ分布の確率密度関数と比較して
$$
X_{(2)}\sim\operatorname{Beta}(2,4).
$$
よって
$$
E[X_{(2)}]=\frac26=\frac13,
\qquad
\operatorname{Var}(X_{(2)})=\frac{2\cdot4}{6^2\cdot7}=\frac2{63}.
$$

##### 本番答案

$X_{(2)}\sim\operatorname{Beta}(2,4)$、平均$1/3$、分散$2/63$。

##### 採点基準

順序統計量密度8点、ベータ分布同定4点、平均4点、分散4点。合計20点。

<!-- solution-end -->

## Level B：小問セット

### P4-B01 一様分布の畳込み
- level: B
- minutes: 15
- topics: 和, 畳込み
- techniques: CONV-1, SUPPORT-MAP-1
- calculation_load: medium

独立な$X,Y\sim\operatorname{Unif}(0,1)$について$S=X+Y$の確率密度関数と累積分布関数を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

畳込みより
$$
f_S(s)=\int f_X(x)f_Y(s-x)\,dx.
$$
被積分関数が1になるには
$$
0<x<1,\qquad0<s-x<1
$$
が同時に必要なので、積分区間は$(0,1)\cap(s-1,s)$です。したがって$0<s<2$では
$$
f_S(s)=\int_{\max(0,s-1)}^{\min(1,s)}dx,
$$
台外では0であり、
$$
f_S(s)=\begin{cases}
s,&0<s<1,\\
2-s,&1\leq s<2,\\
0,&\text{otherwise}.
\end{cases}
$$
積分すると
$$
F_S(s)=\begin{cases}
0,&s\leq0,\\
s^2/2,&0<s<1,\\
1-(2-s)^2/2,&1\leq s<2,\\
1,&s\geq2.
\end{cases}
$$
です。

##### 本番答案

$f_S(s)=s$（$0<s<1$）、$2-s$（$1\leq s<2$）、範囲外0。累積分布関数は$0,s^2/2,1-(2-s)^2/2,1$を各区間で取る。

##### 採点基準

積分範囲8点、確率密度関数6点、累積分布関数6点。合計20点。

<!-- solution-end -->

### P4-B02 指数比
- level: B
- minutes: 15
- topics: 比, ヤコビアン
- techniques: RATIO-1
- calculation_load: medium

$\lambda,\mu>0$とし、独立な$X\sim\operatorname{Exp}(\lambda)$、$Y\sim\operatorname{Exp}(\mu)$について$R=X/Y$の台、確率密度関数、累積分布関数を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$R=X/Y$, $V=Y$とすると
$$
x=rv,\qquad y=v.
$$
$x,y>0$なので$r>0,v>0$です。逆変換のヤコビアンは
$$
\det\begin{pmatrix}v&r\\0&1\end{pmatrix}=v,
$$
よって
$$
f_{R,V}(r,v)=\lambda\mu v e^{-(\lambda r+\mu)v},\qquad r,v>0.
$$
したがって$r>0$で
$$
\begin{aligned}
f_R(r)
&=\lambda\mu\int_0^\infty ve^{-(\lambda r+\mu)v}\,dv\\
&=\frac{\lambda\mu}{(\lambda r+\mu)^2}.
\end{aligned}
$$
また
$$
\begin{aligned}
F_R(r)
&=P(X\leq rY)\\
&=1-\int_0^\infty P(X>ry\mid Y=y)\mu e^{-\mu y}\,dy\\
&=1-\mu\int_0^\infty e^{-(\lambda r+\mu)y}\,dy\\
&=\frac{\lambda r}{\mu+\lambda r}.
\end{aligned}
$$
$r\leq0$では$F_R(r)=0$、確率密度関数も0です。

##### 本番答案

$r>0$で$f_R(r)=\lambda\mu/(\lambda r+\mu)^2$、$F_R(r)=\lambda r/(\mu+\lambda r)$。$r\leq0$では0。

##### 採点基準

変換・台5点、ヤコビアン4点、確率密度関数6点、累積分布関数5点。合計20点。

<!-- solution-end -->

### P4-B03 極座標変換
- level: B
- minutes: 15
- topics: 多変数変換, ヤコビアン
- techniques: JACOBIAN-1, SUPPORT-MAP-1
- calculation_load: medium

独立な$X,Y\sim N(0,1)$について$R=\sqrt{X^2+Y^2}$、$\Theta=\operatorname{atan2}(Y,X)\in[0,2\pi)$とする。同時確率密度関数、各周辺確率密度関数、独立性、$R^2$の分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

逆変換は
$$
x=r\cos\theta,\qquad y=r\sin\theta,
$$
像は$r>0$, $0\leq\theta<2\pi$です。ヤコビアンは
$$
\det
\begin{pmatrix}
\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta
\end{pmatrix}=r.
$$
よって
$$
\begin{aligned}
f_{R,\Theta}(r,\theta)
&=\frac1{2\pi}\exp\left(-\frac{r^2}{2}\right)r\\
&=\left\{re^{-r^2/2}\right\}\frac1{2\pi}.
\end{aligned}
$$
したがって
$$
f_R(r)=re^{-r^2/2}\boldsymbol{1}_{(0,\infty)}(r),
$$
$$
f_\Theta(\theta)=\frac1{2\pi}\boldsymbol{1}_{[0,2\pi)}(\theta),
$$
で、同時密度が周辺密度の積に分解されるので$R$と$\Theta$は独立です。

$T=R^2$では$r=\sqrt t$, $dr/dt=1/(2\sqrt t)$なので
$$
f_T(t)=f_R(\sqrt t)\frac1{2\sqrt t}=\frac12e^{-t/2},\quad t>0.
$$
これは自由度2のカイ二乗分布の確率密度関数です。

##### 本番答案

$f_{R,\Theta}(r,\theta)=(2\pi)^{-1}re^{-r^2/2}$（$r>0,0\leq\theta<2\pi$）。周辺の積へ分かれるので独立。$f_R(r)=re^{-r^2/2}$、$\Theta\sim\operatorname{Unif}(0,2\pi)$、$R^2\sim\chi_2^2$。

##### 採点基準

領域4点、ヤコビアン4点、同時密度4点、周辺・独立4点、$R^2$の変換4点。合計20点。

<!-- solution-end -->

### P4-B04 最小値と最大値
- level: B
- minutes: 15
- topics: 最小値, 最大値
- techniques: EXTREME-1
- calculation_load: medium

$X_1,X_2,X_3$を独立な$\operatorname{Unif}(0,1)$とし、$U=X_{(1)}$, $V=X_{(3)}$とする。$(U,V)$の同時確率密度関数を求め、$P(U>0.2,V<0.8)$を計算せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

P4-THM-05で$n=3$, $F(x)=x$, $f(x)=1$を用いると、$0<u<v<1$で
$$
f_{U,V}(u,v)=3\cdot2(v-u)=6(v-u).
$$
領域外では0です。

事象$U>0.2,V<0.8$は3標本全てが$(0.2,0.8)$に入ることと同値なので
$$
P(U>0.2,V<0.8)=0.6^3=0.216.
$$

##### 本番答案

$f_{U,V}(u,v)=6(v-u)\boldsymbol{1}_{\{0<u<v<1\}}$。求める確率は全3標本が長さ0.6の区間に入る確率$0.6^3=0.216$。

##### 採点基準

配置係数・密度8点、台4点、事象の言換え4点、確率4点。合計20点。

<!-- solution-end -->

## Level C：本番標準

### P4-C01 正規変数の平方
- level: C
- minutes: 25
- topics: 非単調変換, 二次形式
- techniques: PREIMAGE-1
- calculation_load: high

$X\sim N(0,1)$、$Y=X^2$とする。

1. $Y$の台と逆像を示せ。
2. $Y$の確率密度関数を求めよ。
3. 確率密度関数をガンマ分布の形で同定せよ。
4. $E[Y]$, $\operatorname{Var}(Y)$を求めよ。
5. 定義$M_Y(t)=E[e^{tY}]$からモーメント母関数を導き、有限となる$t$の範囲を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)3分、(2)7分、(3)4分、(4)3分、(5)3分、見直し2分。

##### 詳細解答

$Y=X^2$なので台は$[0,\infty)$です。$y>0$では逆像が
$$
x=\pm\sqrt y
$$
の2個あり、各枝で
$$
\left|\frac{dx}{dy}\right|=\frac1{2\sqrt y}.
$$
したがって
$$
\begin{aligned}
f_Y(y)
&=\frac1{\sqrt{2\pi}}e^{-y/2}\frac1{2\sqrt y}
+\frac1{\sqrt{2\pi}}e^{-y/2}\frac1{2\sqrt y}\\
&=\frac{e^{-y/2}}{\sqrt{2\pi y}}\boldsymbol{1}_{(0,\infty)}(y).
\end{aligned}
$$
ガンマ分布の形状・率表示
$$
f(y)=\frac{b^a}{\Gamma(a)}y^{a-1}e^{-by}
$$
と比較すると
$$
a=\frac12,\qquad b=\frac12,
$$
なので
$$
Y\sim\operatorname{Gamma}\left(\frac12,\frac12\right)=\chi_1^2.
$$
ガンマ分布の平均$a/b$、分散$a/b^2$から
$$
E[Y]=1,\qquad\operatorname{Var}(Y)=2.
$$

モーメント母関数は既知公式を置かず、得られた確率密度関数から計算します。
$$
\begin{aligned}
M_Y(t)
&=\int_0^\infty e^{ty}\frac{e^{-y/2}}{\sqrt{2\pi y}}\,dy\\
&=\frac1{\sqrt{2\pi}}
\int_0^\infty y^{-1/2}e^{-(1/2-t)y}\,dy.
\end{aligned}
$$
$t<1/2$なら$1/2-t>0$なので、ガンマ積分
$$
\int_0^\infty y^{a-1}e^{-by}\,dy=\frac{\Gamma(a)}{b^a}
$$
を$a=1/2$, $b=1/2-t$へ使って
$$
\begin{aligned}
M_Y(t)
&=\frac1{\sqrt{2\pi}}
\frac{\Gamma(1/2)}{(1/2-t)^{1/2}}\\
&=\frac1{\sqrt2}\frac1{\sqrt{1/2-t}}
=(1-2t)^{-1/2}.
\end{aligned}
$$
$t=1/2$では被積分関数が定数倍の$y^{-1/2}$となり無限遠で積分発散し、$t>1/2$では指数的に増大するため発散します。よって存在範囲は$t<1/2$です。

##### 本番答案

$Y\geq0$で、$y>0$の逆像$\pm\sqrt y$を両方足すと
$$
f_Y(y)=\frac{e^{-y/2}}{\sqrt{2\pi y}}.
$$
したがって$Y\sim\operatorname{Gamma}(1/2,1/2)=\chi_1^2$、平均1、分散2。さらに
$$
M_Y(t)=\frac1{\sqrt{2\pi}}\int_0^\infty y^{-1/2}e^{-(1/2-t)y}\,dy
=(1-2t)^{-1/2},\quad t<1/2,
$$
で、$t\geq1/2$では積分が発散する。

##### 採点基準と選択判断

台・逆像4点、確率密度関数5点、分布同定4点、平均分散3点、モーメント母関数の積分設定2点、ガンマ積分と存在範囲2点。合計20点。3分で二つの逆像が見えれば選択し、15分でガンマ分布同定まで進めば継続します。25分ではモーメント母関数の積分と存在範囲を補って閉じます。

<!-- solution-end -->

### P4-C02 指数変数の和と比率
- level: C
- minutes: 28
- topics: 多変数変換, 和, 比
- techniques: JACOBIAN-1, SUPPORT-MAP-1
- calculation_load: high

$\lambda>0$とし、独立な$X,Y\sim\operatorname{Exp}(\lambda)$とする。
$$
S=X+Y,\qquad U=\frac{X}{X+Y}
$$
とする。

1. 逆変換を求めよ。
2. 変換後の台を求めよ。
3. 逆変換のヤコビアンの絶対値を求めよ。
4. $(S,U)$の同時確率密度関数と各周辺分布を求めよ。
5. $S,U$の独立性を示せ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、逆変換4分、台4分、ヤコビアン5分、同時・周辺7分、独立3分、見直し2分。

##### 詳細解答

$S=s$, $U=u$と置くと
$$
x+y=s,\qquad x=us,
$$
なので逆変換は
$$
x=su,\qquad y=s(1-u).
$$
$x,y>0$から
$$
s>0,\qquad0<u<1.
$$
逆変換のヤコビアンは
$$
\det\frac{\partial(x,y)}{\partial(s,u)}
=\det\begin{pmatrix}u&s\\1-u&-s\end{pmatrix}=-s,
$$
なので絶対値は$s$です。したがって
$$
\begin{aligned}
f_{S,U}(s,u)
&=\lambda e^{-\lambda su}\lambda e^{-\lambda s(1-u)}s\\
&=\lambda^2s e^{-\lambda s}
\boldsymbol{1}_{(0,\infty)}(s)\boldsymbol{1}_{(0,1)}(u).
\end{aligned}
$$
これは
$$
\{\lambda^2s e^{-\lambda s}\boldsymbol{1}_{(0,\infty)}(s)\}
\{\boldsymbol{1}_{(0,1)}(u)\}
$$
と因数分解でき、前者は$\operatorname{Gamma}(2,\lambda)$、後者は$\operatorname{Unif}(0,1)$の確率密度関数です。よって
$$
S\sim\operatorname{Gamma}(2,\lambda),\qquad
U\sim\operatorname{Unif}(0,1),
$$
かつ$S,U$は独立です。

##### 本番答案

$x=su,y=s(1-u)$、台$s>0,0<u<1$、ヤコビアンの絶対値$s$。よって
$$
f_{S,U}(s,u)=\lambda^2se^{-\lambda s}\boldsymbol{1}_{(0,\infty)}(s)\boldsymbol{1}_{(0,1)}(u).
$$
周辺確率密度関数の積なので$S\sim\operatorname{Gamma}(2,\lambda)$、$U\sim\operatorname{Unif}(0,1)$かつ独立。

##### 採点基準と選択判断

逆変換4点、台4点、ヤコビアン4点、同時確率密度関数4点、周辺分布・独立4点。合計20点。3分で$x=su$が見えれば選択し、15分でヤコビアンまで進めば継続します。25分では因数分解と両周辺名を書いて閉じます。

<!-- solution-end -->

### P4-C03 第$k$順序統計量
- level: C
- minutes: 27
- topics: 順序統計量, ベータ分布
- techniques: ORDER-1
- calculation_load: high

$n\in\mathbb N$、$1\leq k\leq n$とし、連続な累積分布関数$F$と確率密度関数$f$からの独立同分布標本$X_1,\ldots,X_n$を考える。

1. $h>0$として$X_{(k)}\in(x,x+h]$となる主要な標本配置を分類せよ。
2. $h\downarrow0$の極限から$X_{(k)}$の確率密度関数を導け。
3. 正規化をベータ積分で確認せよ。
4. $F\{X_{(k)}\}$の分布を示せ。
5. $n=5$, $k=3$, $F(x)=x$（$0<x<1$）のとき平均と分散を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、配置5分、密度7分、正規化5分、変換3分、数値2分、見直し2分。

##### 詳細解答

$F$が微分可能で$F'(x)=f(x)$となる点で
$$
\Delta_h=F(x+h)-F(x)=f(x)h+o(h)
$$
とします。主要配置は、$x$以下が$k-1$個、$(x,x+h]$が1個、$x+h$より上が$n-k$個です。その配置数は
$$
\frac{n!}{(k-1)!1!(n-k)!}
$$
なので、主要項は
$$
\frac{n!}{(k-1)!(n-k)!}F(x)^{k-1}\Delta_h
\{1-F(x+h)\}^{n-k}.
$$
微小区間へ2個以上入る項は$O(\Delta_h^2)=o(h)$です。全確率を$h$で割って$h\downarrow0$とすると
$$
f_{X_{(k)}}(x)=\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x).
$$

$u=F(x)$, $du=f(x)dx$で積分すると
$$
\begin{aligned}
\int f_{X_{(k)}}(x)\,dx
&=\frac{n!}{(k-1)!(n-k)!}
\int_0^1u^{k-1}(1-u)^{n-k}\,du\\
&=\frac{n!}{(k-1)!(n-k)!}B(k,n-k+1)=1.
\end{aligned}
$$
P4-THM-06より
$$
F\{X_{(k)}\}\sim\operatorname{Beta}(k,n-k+1).
$$
$n=5,k=3$の一様標本中央値は$\operatorname{Beta}(3,3)$なので
$$
E[X_{(3)}]=\frac12,
\qquad
\operatorname{Var}(X_{(3)})=\frac{3\cdot3}{6^2\cdot7}=\frac1{28}.
$$

##### 本番答案

$\Delta_h=F(x+h)-F(x)=f(x)h+o(h)$であり、区間内2個以上の項は$o(h)$。左$k-1$個・区間内1個・右$n-k$個の主要項を$h$で割って極限を取ると
$$
f_{X_{(k)}}(x)=\frac{n!}{(k-1)!(n-k)!}F(x)^{k-1}\{1-F(x)\}^{n-k}f(x).
$$
$u=F(x)$で係数と$B(k,n-k+1)$が相殺し正規化される。また$F(X_{(k)})\sim\operatorname{Beta}(k,n-k+1)$。一様標本$n=5,k=3$では$\operatorname{Beta}(3,3)$、平均$1/2$、分散$1/28$。

##### 採点基準と選択判断

配置4点、係数・確率密度関数6点、正規化4点、ベータ変換3点、数値3点。合計20点。3分で三領域の個数が書ければ選択し、15分で密度まで進めば継続します。25分ではベータ積分とパラメータ順を残して閉じます。

<!-- solution-end -->

### P4-C04 指数標本の両極端
- level: C
- minutes: 25
- topics: 最大値, 最小値, 指数分布
- techniques: EXTREME-1
- calculation_load: medium

$n\in\mathbb N$、$\lambda>0$とし、$X_1,\ldots,X_n$を独立な$\operatorname{Exp}(\lambda)$とする。$U=X_{(1)}$, $V=X_{(n)}$とする。

1. $U$の生存関数と分布を求めよ。
2. $E[U]$を求めよ。
3. $V$の累積分布関数と確率密度関数を求めよ。
4. $0\leq a<b$に対し$P(U>a,V\leq b)$を求めよ。
5. $U,V$が$n\geq2$で独立でないことを説明せよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)5分、(2)2分、(3)6分、(4)5分、(5)2分、見直し2分。

##### 詳細解答

$u\geq0$で
$$
\begin{aligned}
P(U>u)
&=P(X_1>u,\ldots,X_n>u)\\
&=\{e^{-\lambda u}\}^n=e^{-n\lambda u}.
\end{aligned}
$$
したがって
$$
U\sim\operatorname{Exp}(n\lambda),
\qquad E[U]=\frac1{n\lambda}.
$$

$v\geq0$では
$$
F_V(v)=P(X_1\leq v,\ldots,X_n\leq v)
=\{1-e^{-\lambda v}\}^n,
$$
よって
$$
f_V(v)=n\lambda e^{-\lambda v}\{1-e^{-\lambda v}\}^{n-1}.
$$

$0\leq a<b$では、$U>a$かつ$V\leq b$は全標本が$(a,b]$に入ることなので
$$
P(U>a,V\leq b)
=\{e^{-\lambda a}-e^{-\lambda b}\}^n.
$$
もし$U,V$が独立なら
$$
P(U>a,V\leq b)=P(U>a)P(V\leq b)
=e^{-n\lambda a}\{1-e^{-\lambda b}\}^n
$$
となるはずですが、$n\geq2$では一般に一致しないので独立ではありません。

##### 本番答案

$P(U>u)=e^{-n\lambda u}$より$U\sim\operatorname{Exp}(n\lambda)$、$E[U]=1/(n\lambda)$。$v\geq0$で
$$
F_V(v)=(1-e^{-\lambda v})^n,\quad
f_V(v)=n\lambda e^{-\lambda v}(1-e^{-\lambda v})^{n-1}.
$$
$P(U>a,V\leq b)=(e^{-\lambda a}-e^{-\lambda b})^n$で、周辺確率の積とは一般に異なるため非独立。

##### 採点基準と選択判断

最小値の生存関数4点、分布・平均3点、最大値の累積分布関数・密度5点、同時事象4点、非独立4点。合計20点。3分で全件事象が見えれば選択し、15分で最大値密度まで進めば継続します。25分では非独立を確率式の不一致で閉じます。

<!-- solution-end -->

### P4-C05 差・積・比
- level: C
- minutes: 28
- topics: 差, 積, 比
- techniques: CONV-1, RATIO-1, SUPPORT-MAP-1
- calculation_load: high

独立な$X,Y\sim\operatorname{Unif}(0,1)$とする。

1. $D=X-Y$の台と確率密度関数を求めよ。
2. $P=XY$の台と確率密度関数を求めよ。
3. $R=X/Y$の台と確率密度関数を求めよ。
4. 三つの確率密度関数が正規化されることを確認せよ。
5. $P(X<Y)$を比$R$から求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、差5分、積6分、比7分、正規化4分、確率1分、見直し2分。

##### 詳細解答

差$D=X-Y$について
$$
f_D(d)=\int f_X(x)f_Y(x-d)\,dx
$$
であり、$x\in(0,1)$かつ$x-d\in(0,1)$となる区間の長さを取るので
$$
f_D(d)=(1-|d|)\boldsymbol{1}_{(-1,1)}(d).
$$

積$p=xy$では$x\in(0,1)$, $y=p/x\in(0,1)$より$0<p<1$かつ$p<x<1$です。ヤコビアンの絶対値は$1/x$なので
$$
f_P(p)=\int_p^1\frac{dx}{x}=-\log p,\qquad0<p<1.
$$

比$r=x/y$では$x=ry$、ヤコビアンの絶対値は$y$です。$0<y<1$かつ$0<ry<1$だから
$$
0<y<\min(1,1/r),\qquad r>0.
$$
よって
$$
\begin{aligned}
f_R(r)
&=\int_0^{\min(1,1/r)}y\,dy\\
&=\begin{cases}
1/2,&0<r\leq1,\\
1/(2r^2),&r>1,\\
0,&r\leq0.
\end{cases}
\end{aligned}
$$

正規化は
$$
\int_{-1}^1(1-|d|)\,dd=1,
$$
$$
\int_0^1-\log p\,dp=1,
$$
$$
\int_0^1\frac12\,dr+\int_1^\infty\frac{dr}{2r^2}=\frac12+\frac12=1.
$$
$X<Y$は$R<1$と同値なので
$$
P(X<Y)=\int_0^1\frac12\,dr=\frac12.
$$

##### 本番答案

$$
f_D(d)=(1-|d|)\boldsymbol{1}_{(-1,1)}(d),\qquad
f_P(p)=-\log p\,\boldsymbol{1}_{(0,1)}(p),
$$
$$
f_R(r)=\begin{cases}1/2,&0<r\leq1,\\1/(2r^2),&r>1,\\0,&r\leq0.
\end{cases}
$$
各積分は順に1、1、$1/2+1/2=1$。$P(X<Y)=P(R<1)=1/2$。

##### 採点基準と選択判断

差4点、積5点、比6点、正規化3点、確率2点。合計20点。3分で三つの台が書ければ選択し、15分で積まで進めば継続します。25分では比の区分点$r=1$とヤコビアン$y$を必ず残して閉じます。

<!-- solution-end -->

## Level D：発展

### P4-D01 二つの順序統計量
- level: D
- minutes: 40
- topics: 順序統計量, 同時密度
- techniques: ORDER-1
- calculation_load: high

連続な累積分布関数$F$、確率密度関数$f$からの独立同分布標本サイズ$n$について$1\leq i<j\leq n$とする。

1. $x<y$、十分小さい$h,\ell>0$に対し、$X_{(i)}\in(x,x+h]$、$X_{(j)}\in(y,y+\ell]$となる主要配置を分類せよ。
2. 配置数を求めよ。
3. 長方形確率を$h\ell$で割る極限から$(X_{(i)},X_{(j)})$の同時確率密度関数を導け。
4. $i=1,j=n$として最小・最大の公式を回収せよ。
5. 累積分布関数による変換を使い、正規化をディリクレ型積分または配置確率から説明せよ。

<!-- solution-start -->

#### 解答

##### 時間配分

領域4分、配置8分、係数6分、密度8分、特殊化5分、正規化6分、見直し3分。

##### 詳細解答

$x<y$かつ$F'(x)=f(x),F'(y)=f(y)$となる点を取り、$h,\ell>0$を十分小さくします。主要配置は

- $(-\infty,x]$に$i-1$個、
- $(x,x+h]$に1個、
- $(x+h,y]$に$j-i-1$個、
- $(y,y+\ell]$に1個、
- $(y+\ell,\infty)$に$n-j$個

です。配置数は
$$
\frac{n!}{(i-1)!1!(j-i-1)!1!(n-j)!}
=\frac{n!}{(i-1)!(j-i-1)!(n-j)!}.
$$
二つの微小区間の確率増分は
$$
F(x+h)-F(x)=f(x)h+o(h),
$$
$$
F(y+\ell)-F(y)=f(y)\ell+o(\ell).
$$
どちらかの微小区間へ2個以上入る残りの項は
$$
O(h^2\ell+h\ell^2)=o(h\ell).
$$
したがって長方形確率を$h\ell$で割って$h,\ell\downarrow0$とすると、面積0の例外点を除いて
$$
\begin{aligned}
f_{X_{(i)},X_{(j)}}(x,y)
&=\frac{n!}{(i-1)!(j-i-1)!(n-j)!}\\
&\quad\times F(x)^{i-1}f(x)
\{F(y)-F(x)\}^{j-i-1}f(y)
\{1-F(y)\}^{n-j},
\end{aligned}
$$
$x<y$であり、領域外は0です。

$i=1,j=n$とすれば
$$
f_{X_{(1)},X_{(n)}}(x,y)
=n(n-1)\{F(y)-F(x)\}^{n-2}f(x)f(y),
$$
となり、最小・最大の公式を回収します。

$a=F(x)$、$b=F(y)$と置くと、正規化積分は
$$
\frac{n!}{(i-1)!(j-i-1)!(n-j)!}
\int_{0<a<b<1}a^{i-1}(b-a)^{j-i-1}(1-b)^{n-j}\,da\,db.
$$
三つの区間長$a,b-a,1-b$に対するディリクレ型積分は
$$
\frac{(i-1)!(j-i-1)!(n-j)!}{n!}
$$
なので積は1です。これは全標本配置の排反な場合を全て足した確率が1であることとも一致します。

##### 本番答案

$x<y$かつ$F'=f$となるほとんど全ての二点で、幅$h,\ell$の二つの微小区間へ各1個、左$i-1$個、中間$j-i-1$個、右$n-j$個を配置する。複数個が入る項は$o(h\ell)$なので、長方形確率を$h\ell$で割った極限は
$$
\begin{aligned}
f_{i,j}(x,y)
&=\frac{n!}{(i-1)!(j-i-1)!(n-j)!}
F(x)^{i-1}f(x)\\
&\quad\times\{F(y)-F(x)\}^{j-i-1}f(y)
\{1-F(y)\}^{n-j}.
\end{aligned}
$$
$i=1,j=n$で最小・最大公式を得る。$a=F(x),b=F(y)$により三つの間隔のディリクレ型積分となり、係数の逆数なので正規化される。

##### 採点基準と選択判断

配置分類4点、係数4点、同時密度6点、最小最大2点、正規化4点。合計20点。3分で五領域の個数が書けなければ後回しにします。15分で係数まで得られれば継続し、25分で密度本体まで完成しなければ配置確率を残して打ち切ります。完答時は累積分布関数変換で正規化を閉じます。

<!-- solution-end -->

---

# 7. 30分ドリル

- 制限時間: 30分
- level: C

## 過去問傾向との対応

MATH-2024-Q5、MATH-2018-Q5、MATH-2024-Q2の「順序統計量、条件付き量、不偏推定、分散比較」の連鎖を校正対象とします。一様分布の設定は標準的ですが、数値・設問順・比較する推定量は独自に再構成しています。

## P4-DRILL-01 多変量ではなく順序統計量を一題でつなぐ

$X_1,\ldots,X_n$は互いに独立で同じ一様分布$\operatorname{Unif}(0,\theta)$に従い、
$$
f_\theta(x)=\frac1\theta\boldsymbol{1}_{(0,\theta)}(x),\qquad \theta>0
$$
とする。$n\geq2$とし、$U=X_{(1)}=\min_iX_i$、$V=X_{(n)}=\max_iX_i$、標本範囲を$R=V-U$とする。

ベータ分布$\operatorname{Beta}(a,b)$の平均・分散
$$
E[Z]=\frac{a}{a+b},
\qquad
\operatorname{Var}(Z)=\frac{ab}{(a+b)^2(a+b+1)}
$$
を用いてよい。

1. $V$の累積分布関数、確率密度関数、期待値を求めよ。（20点）
2. $(U,V)$の同時確率密度関数と、$0<u<v<\theta$における$f_{U\mid V}(u\mid v)$を求めよ。（25点）
3. $E[U\mid V=v]$を求め、その値を標本配置から解釈せよ。（10点）
4. $R$の確率密度関数、期待値、分散を求めよ。（25点）
5. $T_1=(n+1)V/n$と$T_2=(n+1)R/(n-1)$がともに$\theta$の不偏推定量であることを示し、分散を比較せよ。（20点）

<!-- solution-start -->

### 解答

#### 詳細解答

最大値が$v$以下であることは全標本が$v$以下であることと同値なので
$$
F_V(v)=
\begin{cases}
0,&v<0,\\
(v/\theta)^n,&0\leq v\leq\theta,\\
1,&v>\theta.
\end{cases}
$$
したがって$0<v<\theta$で
$$
f_V(v)=\frac{nv^{n-1}}{\theta^n}.
$$
期待値は
$$
E[V]=\int_0^\theta v\frac{nv^{n-1}}{\theta^n}\,dv
=\frac{n\theta}{n+1}.
$$

$0<u<v<\theta$で、最小値を取る標本と最大値を取る標本を順序付きで$n(n-1)$通り選び、残り$n-2$個を$(u,v)$へ入れるため
$$
f_{U,V}(u,v)=\frac{n(n-1)}{\theta^n}(v-u)^{n-2}.
$$
したがって
$$
\begin{aligned}
f_{U\mid V}(u\mid v)
&=\frac{f_{U,V}(u,v)}{f_V(v)}\\
&=\frac{(n-1)(v-u)^{n-2}}{v^{n-1}},\qquad0<u<v.
\end{aligned}
$$
正規化は$z=u/v$により
$$
\int_0^v\frac{(n-1)(v-u)^{n-2}}{v^{n-1}}\,du
=(n-1)\int_0^1(1-z)^{n-2}\,dz=1.
$$

さらに
$$
\begin{aligned}
E[U\mid V=v]
&=\int_0^v u\frac{(n-1)(v-u)^{n-2}}{v^{n-1}}\,du\\
&=v(n-1)\int_0^1z(1-z)^{n-2}\,dz
=\frac vn.
\end{aligned}
$$
$V=v$の下では残り$n-1$個が$(0,v)$上に一様に配置され、その最小値が$U$なので平均$v/n$となります。

次に
$$
r=v-u,\qquad w=u
$$
と置くと
$$
u=w,\qquad v=w+r,
$$
ヤコビアンの絶対値は1です。元の領域$0<u<v<\theta$は
$$
0<r<\theta,
\qquad0<w<\theta-r
$$
へ写ります。よって
$$
\begin{aligned}
f_R(r)
&=\int_0^{\theta-r}\frac{n(n-1)}{\theta^n}r^{n-2}\,dw\\
&=\frac{n(n-1)}{\theta^n}r^{n-2}(\theta-r),
\qquad0<r<\theta.
\end{aligned}
$$
$Z=R/\theta$と置けば変数変換により
$$
f_Z(z)=n(n-1)z^{n-2}(1-z),\qquad0<z<1,
$$
なので
$$
Z\sim\operatorname{Beta}(n-1,2).
$$
問題文で与えたベータ分布の平均・分散公式から
$$
E[R]=\theta\frac{n-1}{n+1},
$$
$$
\operatorname{Var}(R)=\theta^2\frac{2(n-1)}{(n+1)^2(n+2)}.
$$
同様に$V/\theta\sim\operatorname{Beta}(n,1)$だから
$$
\operatorname{Var}(V)=\theta^2\frac{n}{(n+1)^2(n+2)}.
$$

期待値から
$$
E[T_1]=\frac{n+1}{n}E[V]=\theta,
$$
$$
E[T_2]=\frac{n+1}{n-1}E[R]=\theta,
$$
なので両方とも不偏です。分散は
$$
\operatorname{Var}(T_1)
=\left(\frac{n+1}{n}\right)^2\operatorname{Var}(V)
=\frac{\theta^2}{n(n+2)},
$$
$$
\operatorname{Var}(T_2)
=\left(\frac{n+1}{n-1}\right)^2\operatorname{Var}(R)
=\frac{2\theta^2}{(n-1)(n+2)}.
$$
比は
$$
\frac{\operatorname{Var}(T_2)}{\operatorname{Var}(T_1)}
=\frac{2n}{n-1}>1
$$
なので、全ての$n\geq2$で$T_1$の分散が小さいと分かります。

#### 本番答案

$$
F_V(v)=
\begin{cases}
0,&v<0,\\
(v/\theta)^n,&0\leq v\leq\theta,\\
1,&v>\theta,
\end{cases}
\quad
f_V(v)=\frac{nv^{n-1}}{\theta^n}\boldsymbol{1}_{(0,\theta)}(v),
\quad E[V]=\frac{n\theta}{n+1}.
$$
$0<u<v<\theta$で
$$
f_{U,V}(u,v)=\frac{n(n-1)}{\theta^n}(v-u)^{n-2},\quad
f_{U\mid V}(u\mid v)=\frac{(n-1)(v-u)^{n-2}}{v^{n-1}}.
$$
$u=vz$で積分すると$E[U\mid V=v]=v/n$。また$r=v-u,w=u$の像は$0<w<\theta-r$なので
$$
f_R(r)=\frac{n(n-1)}{\theta^n}r^{n-2}(\theta-r),\quad0<r<\theta.
$$
$R/\theta\sim\operatorname{Beta}(n-1,2)$より
$$
E[R]=\frac{n-1}{n+1}\theta,
\quad
\operatorname{Var}(R)=\frac{2(n-1)\theta^2}{(n+1)^2(n+2)}.
$$
従って$T_1,T_2$は不偏で
$$
\operatorname{Var}(T_1)=\frac{\theta^2}{n(n+2)}
<\frac{2\theta^2}{(n-1)(n+2)}=\operatorname{Var}(T_2).
$$

#### 採点基準・時間配分・選択判断

最大値20点、同時・条件付き密度25点、条件付き期待値10点、標本範囲25点、推定量比較20点。初動3分、(1)4分、(2)7分、(3)3分、(4)7分、(5)3分、見直し3分。15分で条件付き密度まで進めば継続します。25分では$E[R]$と二つの不偏化係数を先に残し、ベータ分布の分散計算が間に合わなければ式を書いて打ち切ります。前半を落としても、問題文の$T_1,T_2$を使って(5)の期待値計算へ進めます。

<!-- solution-end -->

## 復習カード

1. 最大値の累積分布関数は全標本が閾値以下の確率。
2. 最小・最大の同時確率密度関数は配置係数$n(n-1)$。
3. 条件付き確率密度関数は同時確率密度関数を周辺確率密度関数で割る。
4. 条件付き分布の台も書き直す。
5. 最大値を固定すると残りは縮小一様標本として扱える。
6. 標本範囲への変換では像領域を先に求める。
7. 一様標本範囲の尺度化はベータ分布。
8. 不偏化は期待値の係数を逆にする。
9. 不偏推定量同士は分散で比較する。
10. 前半の分布結果を推定量評価へ再利用する。

---

# 8. 実過去問演習

問題文・図表は転載せず、公式問題集の年度・科目・大問番号で参照します。公式過去問題ページは掲載年度が更新されるため、2024年問題は公式問題集［2022〜2024年］を用います。

### PAST-P4-01: MATH-2024-Q5

- 入手先: 統計検定公式問題集［2022〜2024年］
- 制限時間: 現在20分、S1-02・I1-02修了後30分
- 現在解く範囲: 順序統計量の周辺・同時密度、条件付き密度、条件付き期待値
- 後続章で再挑戦: 十分性とRao--Blackwell化
- 答案確認: 領域、配置係数、正規化、条件付き密度の分母を明記する。

### PAST-P4-02: MATH-2018-Q5

- 入手先: 統計検定公式問題集［2018〜2019年］
- 制限時間: 30分
- 現在解く範囲: 最小・中央値・最大の密度、同時密度、標本範囲のモーメント
- 後続章で再挑戦: 標本範囲から作る推定量の比較
- 答案確認: 順序領域と係数を先に確定し、積分順序を図で検算する。

### PAST-P4-03: MATH-2024-Q2

- 入手先: 統計検定公式問題集［2022〜2024年］
- 制限時間: 30分
- 現在解く範囲: 幾何学的な累積分布関数、確率密度関数、最大順序統計量、不偏推定量
- 後続章で再挑戦: 最尤推定量と平均二乗誤差
- 答案確認: 台の端点、尤度が母数依存の台を持つこと、不偏化係数を確認する。

## 過去問型独自ドリルとの接続

P4-DRILL-01は最大値・最小値・標本範囲を同じ一様標本で連結します。復習では$U\mid(V=v)$の密度と期待値を導き、最大値由来と標本範囲由来の二つの不偏推定量を比較します。

---

# 9. 復習チェック

- [ ] 一変数変換で変換後の台と全逆像を列挙できる。
- [ ] 非単調変換では各逆像の寄与を足せる。
- [ ] 多変数変換で逆変換から像領域を不等式で求められる。
- [ ] 逆変換のヤコビアンの絶対値を計算できる。
- [ ] 和・差・積・比の密度公式を補助変数との変換から再現できる。
- [ ] 最大値・最小値の分布を全標本事象から導ける。
- [ ] 第$k$順序統計量の係数を配置数から導ける。
- [ ] 微小区間へ2個以上入る項が高次で消える理由を説明できる。
- [ ] 二つの順序統計量の同時密度を五領域の配置から導ける。
- [ ] 確率積分変換から$F\{X_{(k)}\}$のベータ分布を説明できる。
- [ ] 標本範囲の密度を最小・最大の同時密度から導ける。
- [ ] モーメント母関数を求める問題で、既知公式だけでなく定義積分から導出できる。
