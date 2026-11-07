# MFL4 密度・標本被覆・観測ノイズ

<!-- definition-example-audit: strict -->

## 1. 無限個の真の点に、有限個の標本はどこまで近づけるか

[多様体上の独立同分布標本模型](../MFL1/index.md#def-mfl1-01-clean-sample)では、滑らかなコンパクト埋め込み多様体 $M\subset\mathbb R^D$ 上の確率分布 $P_X$ から真の点 $X_1,\ldots,X_n$ を抽出した。前章の [reach](../MFL3/index.md#def-mfl3-reach)は多様体自体の幾何を測るが、標本がどこに来るかは保証しない。

例えば円周上の10点が偶然すべて右半円に集まると、左半円に何も標本がない。必要なのは「どの真の点からも近くに標本があるか」を測る量である。

以下、空でないコンパクト集合 $M\subset\mathbb R^D$ とその上の確率分布 $P_X$ を扱う。多様体が必要な箇所では改めて仮定する。$B_s(c)=\{z\in\mathbb R^D:\|z-c\|<s\}$ を開 Euclid 球とし、$S_n=\{X_1,\ldots,X_n\}\subset M$、$n\ge1$ とする（標本の重複は許す）。

標本から最も遠い真の点までの距離と、多様体全体を覆うための球の個数をまず導入する。

<a id="def-mfl4-fill-cover"></a>

<!-- formal-statement-start -->
> **定義（標本被覆半径と有限被覆数）**  
> $M\subset\mathbb R^D$ を空でないコンパクト集合、$S_n\subset M$ を空でない有限標本集合とする。標本被覆半径（fill distance）を

$$
h_n(M,S_n)=\max_{x\in M}\min_{1\le i\le n}\|x-X_i\|
$$

> と定める。また $s>0$ について、中心 $c_1,\ldots,c_K\in M$ を選び $M\subset\bigcup_{j=1}^{K}B_s(c_j)$ とできる最小の正整数 $K$ を有限被覆数 $N(M,s)$ とする。
<!-- formal-statement-end -->

距離の最小値は有限個の連続関数の最小値なので $x$ の連続関数であり、コンパクトな $M$ 上で最大値を取る。また中心を各 $x\in M$ とする開球族は開被覆だから有限部分被覆を持ち、$N(M,s)$ は有限である。中心を $M$ 内に制限したことに注意する。

<!-- definition-example-start: def-mfl4-fill-cover -->
**定義の確認**。$M=[0,1]$、$X_1=1/4$、$X_2=3/4$ とする。最近標本距離を区間ごとに計算すると

$$
\min_{i=1,2}|x-X_i|=
\begin{cases}
|x-1/4| &(0\le x\le1/2),\\
|x-3/4| &(1/2\le x\le1).
\end{cases}
$$

両区間の端で最大 $1/4$ を取るので $h_2=1/4$。半径 $3/10$ の開球を両標本点に置けば区間全体を覆う。他方、開球1個の長さは $3/5<1$ なので1個では覆えない。従って

$$
N([0,1],3/10)=2.
$$
<!-- definition-example-end -->

既存の点を残して標本を追加すれば、各 $x$ の最小距離は増えず $h_{n+1}\le h_n$。しかし増やした点が同じ場所に集中すれば、最大の穴は縮まらない。そこで各場所に標本が入る確率を調べる。

## 2. 小球の確率と有限被覆

一つの球に標本が入る確率は中心によって異なる。最も不利な中心を調べれば、すべての球に共通の下界を作れる。

<a id="def-mfl4-small-ball"></a>

<!-- formal-statement-start -->
> **定義（最小小球確率）**  
> 空でないコンパクト集合 $M\subset\mathbb R^D$ 上の確率分布 $P_X$ と $s>0$ に対し

$$
q_M(s)=\inf_{x\in M}P_X(B_s(x))
$$

> を半径 $s$ の最小小球確率とする。$P_X(B_s(x))=P(X\in M\cap B_s(x))$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl4-small-ball -->
**定義の確認**。$M=[0,1]$ で定数密度 $p(x)=1$ を考える。$0<s<1/2$ のとき $P_X(B_s(x))$ は $(x-s,x+s)\cap[0,1]$ の長さであり、端点 $x=0,1$ で $s$、内部でそれ以上だから $q_M(s)=s$。端点では球の片側が集合からはみ出すので、すべての中心で長さ $2s$ とはならない。
<!-- definition-example-end -->

<a id="prop-mfl4-covering"></a>

<!-- formal-statement-start -->
> **命題（有限被覆による標本近接確率）**  
> $M\subset\mathbb R^D$ は空でないコンパクト集合、$X_1,\ldots,X_n$ は $P_X$ に従う独立同分布の $M$ 値標本、$n\ge1$ とする。$r>0$ に対して $K=N(M,r/2)$、$q=q_M(r/2)$ と置くと

$$
P(h_n\ge r)\le K(1-q)^n\le K e^{-nq}.
$$

> 特に $q>0$ なら、任意の $0<\delta<1$ について

$$
n\ge\frac{\log K+\log(1/\delta)}{q}
$$

> を満たす整数 $n$ で $P(h_n<r)\ge1-\delta$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

半径 $r/2$ の有限個の球がすべて標本を含むなら、球の中心を経由してどの真の点からも距離 $r$ 未満で標本に到達できる。一つ以上の球が空になる確率を[独立標本の欠落確率](../MFL1/index.md#prop-mfl1-01-missing-region)と[和事象評価](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)で抑える。

<!-- proof-start -->
### 証明

[被覆数の定義](#def-mfl4-fill-cover)から $M\subset\bigcup_{j=1}^K B_{r/2}(c_j)$ となる中心 $c_j\in M$ がある。$E_j$ を球 $B_{r/2}(c_j)$ が全標本から外れる事象とする。

どの $E_j$ も起こらなければ、各球に標本 $X_{i(j)}$ がある。任意の $x\in M$ について球 $B_{r/2}(c_j)$ に含まれる $j$ を選び、三角不等式を使うと

$$
\min_i\|x-X_i\|
\le\|x-X_{i(j)}\|
\le\|x-c_j\|+\|c_j-X_{i(j)}\|<r.
$$

距離関数はコンパクトな $M$ 上で最大値を取る。その最大点にも上の厳密不等式を適用できるため $h_n<r$ となる。従って

$$
\{h_n\ge r\}\subset\bigcup_{j=1}^K E_j.
$$

各球の標本確率は $q$ 以上だから、[欠落確率の公式](../MFL1/index.md#prop-mfl1-01-missing-region)より

$$
P(E_j)=\bigl(1-P_X(B_{r/2}(c_j))\bigr)^n\le(1-q)^n.
$$

[和事象評価](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)と $1-q\le e^{-q}$ を使い、$P(h_n\ge r)\le K(1-q)^n\le Ke^{-nq}$。$Ke^{-nq}\le\delta$ を $n$ について解けば十分標本数の式となる。$\square$
<!-- proof-end -->

**有限被覆によって、無限個の真の点を有限個の検査球へ還元できた。** $q=0$ では上界が有用でない。標本同士が独立でなければ $(1-q)^n$ も使えない。例えば一個の点を $n$ 回複製した場合、球が空の確率は $1-q$ のままである。

### 密度と幾何は別々に必要

[多様体標本模型](../MFL1/index.md#def-mfl1-01-clean-sample)では、密度 $p$ は誘導体積測度 $dV_g$ に関して $P_X(A)=\int_{M\cap A}p\,dV_g$ を意味する。密度が正でも、小球自体の体積を測らないと確率質量は評価できない。

<a id="prop-mfl4-density-volume"></a>

<!-- formal-statement-start -->
> **命題（密度下界と局所体積による被覆率）**  
> $M\subset\mathbb R^D$ を内在次元 $d\ge1$ のコンパクト埋め込み多様体、$X_i$ を $p\,dV_g$ からの独立同分布標本とする。定数 $p_{\min},v_0,s_0>0$ が存在し、体積測度についてほとんど至る所で $p\ge p_{\min}$、任意の $x\in M$ と $0<s\le s_0$ に対し

$$
\operatorname{Vol}_g(M\cap B_s(x))\ge v_0s^d
$$

> と仮定する。このとき $0<r\le2s_0$ について

$$
P(h_n\ge r)\le N(M,r/2)
\exp\left(-np_{\min}v_0(r/2)^d\right).
$$

> さらに $N(M,r/2)\le Cr^{-d}$ がこの範囲で成り立てば、右辺の被覆数を $Cr^{-d}$ で置き換えられる。
<!-- formal-statement-end -->

### 証明の見取り図

確率質量は密度と体積の積で下から評価できる。これを[被覆確率の命題](#prop-mfl4-covering)の $q$ に代入する。

<!-- proof-start -->
### 証明

任意の $x\in M$ と $0<s\le s_0$ について

$$
\begin{aligned}
P_X(B_s(x))
&=\int_{M\cap B_s(x)}p(z)\,dV_g(z)\\
&\ge p_{\min}\operatorname{Vol}_g(M\cap B_s(x))\\
&\ge p_{\min}v_0s^d.
\end{aligned}
$$

中心 $x$ に関して下限を取り $q_M(s)\ge p_{\min}v_0s^d$。$s=r/2$ を[被覆確率の命題](#prop-mfl4-covering)へ代入すれば結論を得る。被覆数上界が別途分かる場合もそのまま代入できる。$\square$
<!-- proof-end -->

$N(M,r/2)\le Cr^{-d}$ と仮定すれば、失敗確率を $\delta$ 以下にする十分標本数は

$$
n\ge\frac{2^d}{p_{\min}v_0r^d}
\left(\log C+d\log\frac1r+\log\frac1\delta\right)
$$

である（$Cr^{-d}\ge1$ の範囲で用いる）。$r^{-d}$ は局所の点数不足、対数因子は多数の球を**同時に**埋める難しさに対応する。一般の多様体の体積下界や被覆数上界をここで無条件に証明したわけではない。これらは明示した**仮定**であり、次の円周では直接計算する。

## 3. 円周で被覆率を具体的に計算する

半径 $R>0$ の円周 $S_R^1$ を弧長について一様に抽出する。[円周の内在距離と弦長](../MFL2/index.md#prop-mfl2-circle)から、短い中心角 $\alpha\in[0,\pi]$ の弦長は $2R\sin(\alpha/2)$。$0<s<2R$ の開球が切り取る角度幅は $4\arcsin(s/(2R))$、弧長は $4R\arcsin(s/(2R))$ である。全周長が $2\pi R$ だから

$$
q_M(s)=\frac2\pi\arcsin\frac{s}{2R}.
$$

回転対称性により、これはどの中心でも同じ値となる。

<a id="prop-mfl4-circle"></a>

<!-- formal-statement-start -->
> **命題（一様円周の被覆確率）**  
> $M=S_R^1\subset\mathbb R^2$、$R>0$ とし、$X_1,\ldots,X_n$ を弧長について一様な独立同分布標本とする。$0<r<2R$ に対し $K_r=\lceil2\pi R/r\rceil$ と置けば

$$
P(h_n\ge r)\le K_r
\exp\left[-\frac{2n}{\pi}\arcsin\left(\frac{r}{4R}\right)\right].
$$
<!-- formal-statement-end -->

### 証明の見取り図

円周を等分し、各分割点を中心とする球で覆う。円弧は対応する弦より長いので、弧長で $r/2$ 以内に中心を置けば Euclid 開球でも覆える。

<!-- proof-start -->
### 証明

$K_r$ 個の中心を角度 $2\pi j/K_r$（$j=0,\ldots,K_r-1$）に置く。任意の円周点から最も近い中心までの短い弧長は高々 $\pi R/K_r\le r/2$。[円周の内在距離と弦長](../MFL2/index.md#prop-mfl2-circle)で弦長は弧長より厳密に短い（離れた二点の場合）ので、半径 $r/2$ の**開球**で円周を覆える。よって

$$
N(S_R^1,r/2)\le K_r.
$$

上の小球質量の式に $s=r/2$ を代入して

$$
q_M(r/2)=\frac2\pi\arcsin\left(\frac{r}{4R}\right)>0.
$$

これらを[被覆確率の命題](#prop-mfl4-covering)へ代入する。$\square$
<!-- proof-end -->

この上界は一般に等号ではない。小さな $r$ は検査球を増やし、各球の確率を減らすため、必要な標本数を増やす。

### 密度が偏るとどうなるか

円周上の密度が $p\ge p_{\min}>0$ なら、同じ半径 $s$ の球の弧長計算により

$$
q_M(s)\ge4Rp_{\min}\arcsin\frac{s}{2R}.
$$

ただし密度下界がないことと、支持集合が欠けていることは別である。$M=[0,1]$、密度 $p(x)=2x$ では、端点を含む $[0,r]$ の質量は

$$
P(X\in[0,r])=\int_0^r2x\,dx=r^2.
$$

独立な $n$ 点がこの区間を外す確率は $(1-r^2)^n$。一様密度の場合の $(1-r)^n$ より、小さい $r$ では減少が遅い。特に $q_M(s)\le P_X(B_s(0))=s^2$ だから、一定の $c>0$ による $q_M(s)\ge cs$ はすべての小さな $s$ には成り立たない。それでも $p(x)>0$ は $x>0$ で成立し、支持は区間全体である。

反対に、[支持集合の定義](../MFL1/index.md#def-mfl1-01-support)で見たように、円周の右半円だけに密度を与え左の開半円を確率0とすれば、左半円内の十分小さい球の質量は0である。標本をいくら増やしても左の開弧は永久に観測されない。**到達までの遅さ**と**そもそも到達不可能**を区別したい。

## 4. 真の標本とノイズを含む観測は違う

手元にあるのは[加法観測模型](../MFL1/index.md#def-mfl1-01-noisy-observation)の $Y_i=X_i+\xi_i$ かもしれない。観測集合を $T_n=\{Y_1,\ldots,Y_n\}$ と置く。真の点から観測点への移動を評価するため、集合から集合への距離を二方向で測る。

<a id="def-mfl4-hausdorff"></a>

<!-- formal-statement-start -->
> **定義（Hausdorff距離）**  
> $\mathbb R^D$ 内の空でないコンパクト集合 $A,B$ に対し、$\operatorname{dist}(z,B)=\min_{b\in B}\|z-b\|$ を用いて

$$
d_H(A,B)=\max\left\{
\max_{a\in A}\operatorname{dist}(a,B),
\max_{b\in B}\operatorname{dist}(b,A)\right\}
$$

> を Hausdorff 距離とする。前半は $A$ 側の取りこぼし、後半は $B$ 側の逸脱を測る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl4-hausdorff -->
**定義の確認**。$A=[0,1]$、$B=[a,1+a]$、$a>0$ とする。各 $x\in A$ に $x+a\in B$ が対応するから第一方向は高々 $a$、端点 $x=0$ ではちょうど $a$。逆向きも $y\in B$ に $y-a\in A$ を対応させ、端点 $y=1+a$ でちょうど $a$。よって $d_H(A,B)=a$。
<!-- definition-example-end -->

真の標本では $S_n\subset M$ だから[二方向の定義](#def-mfl4-hausdorff)の後半は0であり

$$
d_H(M,S_n)=h_n(M,S_n).
$$

<a id="prop-mfl4-bounded-noise"></a>

<!-- formal-statement-start -->
> **命題（有界ノイズ下のHausdorff誤差）**  
> $M\subset\mathbb R^D$ は空でないコンパクト集合、$X_i\in M$、$Y_i=X_i+\xi_i$（$i=1,\ldots,n$）とする。全ての $i$ について $\|\xi_i\|\le\eta$、$\eta\ge0$ なら

$$
d_H(M,T_n)\le h_n(M,S_n)+\eta.
$$

> ノイズの独立性は不要である。さらに $\operatorname{reach}(M)=\tau>0$ かつ $\eta<\tau$ なら各 $Y_i$ の最近点射影は一意に定義されるが、一般に $\pi_M(Y_i)=X_i$ とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

任意の真の点 $x$ に最も近い $X_i$ を選び、対応する $Y_i$ まで三角不等式で運ぶ。逆向きでは各 $Y_i$ の生成点 $X_i$ を候補にできる。射影の一意性には[reach 内の射影可能性](../MFL3/index.md#prop-mfl3-distance-stability)を使う。

<!-- proof-start -->
### 証明

任意の $x\in M$ について $\|x-X_i\|$ を最小にする添字 $i(x)$ を選ぶと

$$
\begin{aligned}
\operatorname{dist}(x,T_n)
&=\min_j\|x-Y_j\|
\le\|x-Y_{i(x)}\|\\
&\le\|x-X_{i(x)}\|+\|\xi_{i(x)}\|\\
&\le h_n+\eta.
\end{aligned}
$$

逆方向には、各 $Y_i$ で $X_i\in M$ を候補とすれば $\operatorname{dist}(Y_i,M)\le\|Y_i-X_i\|\le\eta$。[Hausdorff 距離の定義](#def-mfl4-hausdorff)の二方向の最大値を取れば主張を得る。

さらに $\operatorname{dist}(Y_i,M)\le\eta<\tau$ なので[reach 内の射影可能性](../MFL3/index.md#prop-mfl3-distance-stability)を各 $Y_i$ に適用できる。ただし保証されるのは射影の一意性だけである。$\square$
<!-- proof-end -->

[被覆確率の命題](#prop-mfl4-covering)で $P(h_n<r)\ge1-\delta$ が得られ、全点の有界ノイズ条件が確実に成立するなら

$$
P\bigl(d_H(M,T_n)<r+\eta\bigr)\ge1-\delta.
$$

$r$ を小さくしても $\eta$ は消えない。有限標本の疎らさと観測ノイズは**別の誤差源**である。

### Gaussian ノイズは確定的な上界を持たない

$\xi_i\sim N(0,\sigma^2I_D)$、$\sigma>0$ とすると、Gaussian密度は全空間のどの点でも0にならないため、固定した $\eta$ 以内に全点が入ることを確率1で保証できない。ここで $I_D$ は $D$ 次単位行列で、共分散行列 $\sigma^2I_D$ は各座標の分散が $\sigma^2$ であることを表す。ただし有限 $n$ なら、どれほど大きな閾値でどれほど高い確率を得るかは計算できる。

<a id="prop-mfl4-gaussian"></a>

<!-- formal-statement-start -->
> **命題（Gaussianノイズの最大偏差）**  
> $M\subset\mathbb R^D$ は空でないコンパクト集合、$X_i$ は $P_X$ からの独立同分布の $M$ 値標本とし、$Y_i=X_i+\xi_i$ とする。各 $\xi_i$ の周辺分布が $N(0,\sigma^2I_D)$、$\sigma>0$ であるとする（ノイズ同士の独立性は不要）。任意の $r,t>0$ に対し

$$
\begin{aligned}
P\bigl(d_H(M,T_n)>r+t\bigr)
&\le N(M,r/2)e^{-nq_M(r/2)}\\
&\quad+2nD\exp\left(-\frac{t^2}{2D\sigma^2}\right).
\end{aligned}
$$

> 特に $0<\delta<1$ に対し、確率 $1-\delta$ 以上で

$$
\max_i\|\xi_i\|
\le\sigma\sqrt{2D\log\frac{2nD}{\delta}}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

ベクトル長が $t$ を超えるなら、いずれかの座標成分の絶対値が $t/\sqrt D$ 以上になる。正規分布の裾を成分ごとに評価し、被覆失敗とノイズ超過の二事象の和を取る。

<!-- proof-start -->
### 証明

$v_k$ をベクトル $v\in\mathbb R^D$ の第 $k$ 成分とし、ノイズの第 $k$ 成分を $\xi_{ik}$ と書く。$\|v\|^2=\sum_{k=1}^D v_k^2$ なので、全成分で $|v_k|<t/\sqrt D$ なら $\|v\|<t$ である。従って

$$
\{\|\xi_i\|\ge t\}
\subset\bigcup_{k=1}^D\{|\xi_{ik}|\ge t/\sqrt D\}.
$$

平均0、分散 $\sigma^2$ の正規変数 $Z$ に対し、$u>0$、$\lambda>0$ として指数変換 $e^{\lambda Z}$ に[Markov の不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用すると

$$
P(Z\ge u)\le e^{-\lambda u}E[e^{\lambda Z}]
=e^{-\lambda u+\lambda^2\sigma^2/2}.
$$

正規密度の指数部を平方完成すると

$$
\lambda z-\frac{z^2}{2\sigma^2}
=-\frac{(z-\lambda\sigma^2)^2}{2\sigma^2}
+\frac{\lambda^2\sigma^2}{2}.
$$

従って $E[e^{\lambda Z}]$ の積分は、平均を $\lambda\sigma^2$ だけ移した正規密度の積分1に $e^{\lambda^2\sigma^2/2}$ を掛けたものになる。$\lambda=u/\sigma^2$ を入れると $P(Z\ge u)\le e^{-u^2/(2\sigma^2)}$。さらに $-Z$ も同じ $N(0,\sigma^2)$ に従うので $P(Z\le-u)=P(-Z\ge u)\le e^{-u^2/(2\sigma^2)}$。両側を足して $P(|Z|\ge u)\le2e^{-u^2/(2\sigma^2)}$ を得る。

これを $nD$ 個の座標へ[和事象評価](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)で適用すると

$$
P\left(\max_i\|\xi_i\|\ge t\right)
\le2nD e^{-t^2/(2D\sigma^2)}.
$$

他方、[有限被覆による標本近接確率](#prop-mfl4-covering)で $P(h_n\ge r)\le N(M,r/2)e^{-nq_M(r/2)}$。両失敗事象が起きなければ $h_n<r$、$\max_i\|\xi_i\|<t$。そこで[有界ノイズ下のHausdorff誤差](#prop-mfl4-bounded-noise)を適用すると $d_H<r+t$。従って確率を加算して最初の評価を得る。

最後は $2nD e^{-t^2/(2D\sigma^2)}=\delta$ を $t$ について解く。$\square$
<!-- proof-end -->

この評価は粗いが、「全点が多様体の近くにある」要求は、$n$ を増やすと極端なノイズ点のため難しくなり得ると分かる。固定した $\sigma>0$ の下で、全観測点をそのまま使う Hausdorff 誤差と、平均化・外れ値除去を含む幾何推定は同じ問題ではない。

## 5. reach の中でも真の幾何は識別不能になり得る

前章では射影が一意でも真の生成点と異なる例を見た。今度は**無限個の観測があっても真の半径を一意に決められない**二つの模型を考える。

<a id="prop-mfl4-radial"></a>

<!-- formal-statement-start -->
> **命題（半径方向ノイズの観測非識別性）**  
> $0<\eta<1$、$\Theta_i$ を $[0,2\pi)$ 上の独立な一様角度とする。次の二つの模型を考える。
>
> **模型A**：$M_A=S_1^1$、$X_i=(\cos\Theta_i,\sin\Theta_i)$、$\xi_i=\eta X_i$、$Y_i=X_i+\xi_i$。
>
> **模型B**：$M_B=S_{1+\eta}^1$、$X'_i=(1+\eta)(\cos\Theta_i,\sin\Theta_i)$、$\xi'_i=0$、$Y'_i=X'_i+\xi'_i$。
>
> 両模型は大きさ $\eta$ 以下のノイズと真の円上の正の一様密度を持ち、模型Aでは $\eta<\operatorname{reach}(M_A)$ が成立する。それでも任意の $n$ で観測ベクトル $(Y_1,\ldots,Y_n)$ と $(Y'_1,\ldots,Y'_n)$ の同時分布は一致し、真の集合は異なる。
<!-- formal-statement-end -->

### 証明の見取り図

半径1の点を外向きに $\eta$ 動かすと、半径 $1+\eta$ の円になり、模型Bのノイズなしの点と同じになる。確率密度、reach、同時分布をそれぞれ確認する。

<!-- proof-start -->
### 証明

模型Aでは $\|X_i\|=1$ なので $\|\xi_i\|=\eta<1$。[円周の最近点とreach](../MFL3/index.md#prop-mfl3-circle-reach)から $\operatorname{reach}(M_A)=1$。模型Bのノイズは0なので同じ上界を満たす。[円周の弧長要素](../MFL1/index.md#def-mfl1-01-clean-sample)は $R\,d\theta$ で、角度密度 $1/(2\pi)$ は弧長密度 $1/(2\pi R)>0$ に対応する。従って双方とも正の一様密度である。

同じ角度列から構成すると、全ての $i$ で

$$
Y_i=(1+\eta)(\cos\Theta_i,\sin\Theta_i)=X'_i=Y'_i.
$$

従って任意の $n$ で観測ベクトルが確率1で一致し、同時分布も一致する。一方、円の半径がそれぞれ1と $1+\eta$ なので $M_A\ne M_B$。$\square$
<!-- proof-end -->

これは**未知のノイズ模型を単に上界で制限するだけでは真の幾何を特定できない**という反例である。ノイズ方向・分布などを既知とする別問題まで不可能と言っているわけではない。

## 6. 再現実験：円周の最大空白弧

`coverage_lab.py` は標準 Python だけで動く実験である。角度密度

$$
f_a(\theta)=\frac{1+a\cos\theta}{2\pi},\qquad0\le a<1
$$

から拒否サンプリングで独立標本を作り、密度の偏り $a$、標本数 $n$、被覆半径の閾値 $r$、外向き有界ノイズ $\eta$ を変えられる。乱数生成の初期値を固定して再現できる。

```bash
python3 textbook/volumes/dream_thater/応用系/MFL/MFL4/coverage_lab.py --n 250 --trials 300 --radius 0.4 --density-amplitude 0.6 --noise 0.08 --seed 2026
```

標本の角度を $\theta_1,\ldots,\theta_n$ とし、昇順に並べたときの最後から最初へ戻る部分も含め、最大角度間隔を $G\in(0,2\pi]$ とする。任意の角度から最近標本までの短い角度差は、空白弧の両端で0、中点でその角度間隔の半分になる。従ってその最大値は $G/2$ である。[円周の内在距離と弦長](../MFL2/index.md#prop-mfl2-circle)により、単位円の被覆半径は**格子近似を用いずに**

$$
h_n=2\sin(G/4)
$$

と正確に計算できる。

外向きノイズ $Y_i=(1+\eta)X_i$ の場合、任意の真の点 $x(\theta)=(\cos\theta,\sin\theta)$ から観測点への距離を直接展開すると

$$
\|x(\theta)-Y_i\|^2
=1+(1+\eta)^2-2(1+\eta)\cos(\theta-\theta_i).
$$

各 $\theta$ で最近の観測点を選ぶことは、最小の短い角度差 $\Delta(\theta)\in[0,\pi]$ を選ぶことと同じである。$\cos$ はこの区間で単調減少し、$\max_\theta\Delta(\theta)=G/2$ だから

$$
\max_{x\in S^1}\operatorname{dist}(x,T_n)
=\sqrt{1+(1+\eta)^2-2(1+\eta)\cos(G/2)}.
$$

逆向きは各 $Y_i$ の単位円までの距離が $\operatorname{dist}(Y_i,S^1)=\eta$ である。上の平方根は $G>0$ より $\eta$ 以上だから、[Hausdorff距離の二方向の定義](#def-mfl4-hausdorff)を使って

$$
d_H(S^1,T_n)=
\sqrt{1+(1+\eta)^2-2(1+\eta)\cos(G/2)}
$$

と結論できる。

実験で得る失敗頻度は[理論上の円周被覆確率](#prop-mfl4-circle)の上界と比較できる。上界は実際の確率より保守的になり得るので、特定の乱数列で失敗が0回でも理論値が0とは限らない。有限回の実験は確率命題の証明にはならない。

## 演習

### MFL4-A01 区間の被覆半径
- Level: A
- 目安時間: 12分

$M=[0,1]$、$S=\{1/4,3/4\}$ とする。標本被覆半径を計算し、半径 $s=0.3$ の開球での最小被覆数が2であることを示せ。

<!-- solution-start -->
#### 詳細解答

$[0,1/2]$ では最寄りの標本は $1/4$、$[1/2,1]$ では $3/4$。したがって最近距離はそれぞれ $|x-1/4|$ と $|x-3/4|$、両区間の最大値は $1/4$ なので[被覆半径](#def-mfl4-fill-cover)は $h=1/4$。

半径0.3の開球を中心 $1/4,3/4$ に置くと、区間との共通部分は $[0,0.55)$、$(0.45,1]$ で全体を覆う。一球の長さは $0.6<1$ だから一区間全体を覆えない。よって $N(M,0.3)=2$。
<!-- solution-end -->

### MFL4-A02 円周の一球が空になる確率
- Level: A
- 目安時間: 15分

単位円で一様な角度から点 $X$ を選ぶ。中心 $c=(1,0)$ の開球 $B_1(c)$ に入る角度範囲と確率を求め、独立な6点が全て球を外す確率を計算せよ。

<!-- solution-start -->
#### 詳細解答

$X=(\cos\theta,\sin\theta)$ について

$$
\|X-c\|^2=(\cos\theta-1)^2+\sin^2\theta
=2-2\cos\theta=4\sin^2(\theta/2).
$$

$\theta\in[-\pi,\pi)$ では $\|X-c\|<1$ は $|\theta|<\pi/3$ と同値。角度幅は $2\pi/3$、全体が $2\pi$ なので確率は $1/3$。[独立標本の欠落確率](../MFL1/index.md#prop-mfl1-01-missing-region)で全6点が外れる確率は

$$
(1-1/3)^6=(2/3)^6=\frac{64}{729}.
$$
<!-- solution-end -->

### MFL4-A03 12球を同時に埋める
- Level: A
- 目安時間: 12分

コンパクト集合 $M$ を12個の半径 $r/2$ の開球で覆え、各球の標本確率は少なくとも0.1とする。独立な50点について $P(h_{50}\ge r)$ を $(1-q)^n$ と指数による二通りで抑えよ。12が最小被覆数でなくてもよいか。

<!-- solution-start -->
#### 詳細解答

12球が全て標本を含めば、[被覆命題](#prop-mfl4-covering)の中心経由の三角不等式で $h_{50}<r$。各球が空になる確率は高々 $0.9^{50}$ だから、[和事象評価](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)で

$$
P(h_{50}\ge r)\le12(0.9)^{50}\approx0.0618.
$$

$1-q\le e^{-q}$ を使えば $12e^{-5}\approx0.0809$。最小でなくても**実際に12球で覆える**ことが分かれば同じ議論を使える。
<!-- solution-end -->

### MFL4-A04 Hausdorff距離を二方向から測る
- Level: A
- 目安時間: 12分

$A=[0,1]$、$B=[0.2,1.2]$ のHausdorff距離を二方向から求めよ。$S=\{0,1\}\subset A$ について標本被覆半径を求め $d_H(A,S)$ に一致することも確かめよ。

<!-- solution-start -->
#### 詳細解答

$x\in A$ には $x+0.2\in B$ があり距離は高々0.2。端点 $x=0$ は $B$ までちょうど0.2離れるので第一方向の最大値は0.2。逆向きにも $y\in B$ に $y-0.2\in A$ があり、$y=1.2$ で距離0.2。従って[Hausdorff距離](#def-mfl4-hausdorff)は0.2。

一方、$S$ への距離 $\min(x,1-x)$ は $x=1/2$ で最大 $1/2$、よって $h(A,S)=1/2$。$S\subset A$ なので逆方向の距離は0、従って $d_H(A,S)=1/2$。
<!-- solution-end -->

### MFL4-B01 端点の密度が消える場合
- Level: B
- 目安時間: 20分

$M=[0,1]$ 上の密度 $p(x)=2x$ に従い $n$ 点を独立抽出する。$0<r<1/2$ について次を示せ。

1. $P(X\in[0,r])=r^2$。
2. 全点が $[0,r]$ を外す確率と、そのときの $h_n$ の下界を求めよ。
3. 一様密度と比較し、$q_M(s)\ge cs$ という固定 $c>0$ の下界を小さい $s$ 全体で持てない理由を示せ。

<!-- solution-start -->
#### 詳細解答

1. $\int_0^1 2x\,dx=1$ で正規化され、指定区間の確率は

   $$
   \int_0^r 2x\,dx=[x^2]_0^r=r^2.
   $$

2. 一点が区間外に落ちる確率は $1-r^2$、独立性から全点では $(1-r^2)^n$。この事象では標本は全て $X_i>r$ で、端点 $x=0$ から最寄り標本まで距離 $>r$ なので $h_n\ge r$。

3. 定数密度 $p(x)=1$ の場合、区間の確率は $r$ で、欠落確率は $(1-r)^n$。[最小小球確率](#def-mfl4-small-ball)の中心 $x=0$ を選べば $q_M(s)\le P_X(B_s(0))=s^2$。もし全ての小さい $s$ で $q_M(s)\ge cs$ なら $cs\le s^2$、つまり $c\le s$ が必要で、固定の $c>0$ と矛盾する。なお $x>0$ では密度が正で支持は $[0,1]$ 全体である。
<!-- solution-end -->

### MFL4-B02 円周の標本数設計
- Level: B
- 目安時間: 25分

単位円上の独立な一様標本で $P(h_n<1)\ge0.95$ を保証したい。[一様円周の命題](#prop-mfl4-circle)を使い、中心数、最小小球確率、十分な整数標本数を式で求めよ。最小必要標本数と一致するか。

<!-- solution-start -->
#### 詳細解答

$R=r=1$ なので $K_r=\lceil2\pi\rceil=7$、$q_M(r/2)=(2/\pi)\arcsin(1/4)$。[被覆確率の命題](#prop-mfl4-covering)に失敗確率 $\delta=0.05$ を入れれば

$$
7e^{-n(2/\pi)\arcsin(1/4)}\le0.05.
$$

両辺を7で割って対数を取り、負号で不等号が逆転することに注意すると

$$
n\ge\left\lceil
\frac{\log(7/0.05)}{(2/\pi)\arcsin(1/4)}
\right\rceil
$$

が十分である。分母は約 $0.160861$、分子は $\log140\approx4.94164$ なので、十分な整数は

$$
n\ge\left\lceil\frac{4.94164}{0.160861}\right\rceil=31
$$

である。実際に $n=31$ を代入すると

$$
7e^{-31(2/\pi)\arcsin(1/4)}\approx0.0478<0.05.
$$

これは和事象評価などを重ねた**上界による十分条件**であり、真の最小必要標本数とは限らない。
<!-- solution-end -->

### MFL4-B03 ノイズの上界と射影
- Level: B
- 目安時間: 22分

$M=S_2^1$ で真の標本被覆半径が $h_n\le0.15$、観測ノイズが全点で $\|\xi_i\|\le0.08$ とする。$d_H(M,T_n)$ を評価し各点の最近点射影が一意と示せ。それでも $\pi_M(Y_i)\ne X_i$ となる一点の例を作れ。

<!-- solution-start -->
#### 詳細解答

[有界ノイズ下のHausdorff誤差](#prop-mfl4-bounded-noise)から $d_H(M,T_n)\le0.15+0.08=0.23$。[円周の最近点とreach](../MFL3/index.md#prop-mfl3-circle-reach)により $\operatorname{reach}(S_2^1)=2$。各観測点は $M$ まで高々0.08なので、reach未満の最近点射影は一意。

例えば $X=(2,0)$、$\xi=(0,0.08)$ と取ると、[円周の射影公式](../MFL3/index.md#prop-mfl3-circle-reach)で

$$
\pi_M(Y)=\frac{2(2,0.08)}{\sqrt{4+0.08^2}}\ne(2,0)=X.
$$

従って射影可能性は潜在点の識別を保証しない。
<!-- solution-end -->

### MFL4-B04 Gaussianノイズの最大偏差
- Level: B
- 目安時間: 20分

$n=100$、$D=2$、$\sigma=0.05$ で各ノイズの周辺分布が $N(0,\sigma^2I_D)$ とする。$P(\max_i\|\xi_i\|\le t)\ge0.99$ を保証する十分な $t$ を[最大偏差の命題](#prop-mfl4-gaussian)から計算せよ。$n$ が増えるとこの閾値は小さくなるか。

<!-- solution-start -->
#### 詳細解答

$\delta=0.01$ を[最大偏差の命題](#prop-mfl4-gaussian)に代入すると

$$
\begin{aligned}
t&=\sigma\sqrt{2D\log(2nD/\delta)}\\
&=0.05\sqrt{4\log(40000)}\approx0.326.
\end{aligned}
$$

これなら失敗確率は和事象評価で0.01以下。実際の99%分位点とは限らない。固定の $\sigma,D,\delta$ に対し、この十分閾値は $\log n$ に伴って**大きくなる**。被覆半径が標本数とともに減ることとは異なる。
<!-- solution-end -->

### MFL4-C01 非一様円周と有界ノイズの統合
- Level: C
- 目安時間: 35分

単位円の角度密度を $f(\theta)=(1+a\cos\theta)/(2\pi)$、$0<a<1$ とする。独立な $n$ 点から真の標本を得て $\|\xi_i\|\le\eta<1$ のノイズを加える。$0<r<2$、$0<\delta<1$ とする。

1. 半径 $r/2$ の全ての開球に共通する確率下界 $q_*$ を求めよ。
2. $P(h_n<r)\ge1-\delta$ となる十分標本数を式で求めよ。
3. 同じ条件で $P(d_H(S^1,T_n)<r+\eta)\ge1-\delta$ となる理由と、reachに関する $\eta<1$ の意味・限界を述べよ。

<!-- solution-start -->
#### 詳細解答

1. $f(\theta)\ge(1-a)/(2\pi)>0$。[円の弦長公式](../MFL2/index.md#prop-mfl2-circle)から半径 $r/2$ の球の角度幅は $4\arcsin(r/4)$ だから

   $$
   P_X(B_{r/2}(c))\ge
   \frac{1-a}{2\pi}\,4\arcsin\frac r4
   =\frac{2(1-a)}{\pi}\arcsin\frac r4
   =q_*.
   $$

2. $K=\lceil2\pi/r\rceil$ 個の等間隔中心で円を覆える。[被覆確率の命題](#prop-mfl4-covering)から $P(h_n\ge r)\le Ke^{-nq_*}$ なので

   $$
   n\ge\left\lceil
   \frac{\log K+\log(1/\delta)}{q_*}
   \right\rceil
   $$

   は十分である。

3. 全点で確定的に $\|\xi_i\|\le\eta$ である。[有界ノイズ下のHausdorff誤差](#prop-mfl4-bounded-noise)より $d_H\le h_n+\eta$。$h_n<r$ の事象で $d_H<r+\eta$。また[円周の最近点とreach](../MFL3/index.md#prop-mfl3-circle-reach)が1なので $\eta<1$ は最近点射影の一意性を与える。しかし射影が元の $X_i$ と一致する保証はなく、標本数を増やしても $\eta$ は上界から消えない。
<!-- solution-end -->

### MFL4-C02 有界ノイズ下でも円の半径は識別不能
- Level: C
- 目安時間: 35分

$0<\eta<1$ とし、模型Aでは真の単位円の一様点 $X_i$ に $\xi_i=\eta X_i$ を加える。模型Bでは真の半径 $1+\eta$ の円の一様点 $X'_i$ にノイズ0を加える。

1. 両模型の弧長密度とノイズ上界、模型Aのreachを明示せよ。
2. 同じ角度列を用いて、観測の同時分布が任意の $n$ で一致することを示せ。
3. 観測だけから真の半径を両方の模型で確率1で正しく返す推定手続きが存在しない理由を示せ。

<!-- solution-start -->
#### 詳細解答

1. [半径 $R$ の円周の弧長要素](../MFL1/index.md#def-mfl1-01-clean-sample)は $R\,d\theta$、一様角度密度は $1/(2\pi)$ なので弧長密度は $1/(2\pi R)>0$。模型Aは $1/(2\pi)$、模型Bは $1/(2\pi(1+\eta))$。模型Aのノイズ長は $\|\eta X_i\|=\eta$、模型Bは0でともに上界 $\eta$ を満たす。[円周の最近点とreach](../MFL3/index.md#prop-mfl3-circle-reach)から模型Aのreachは1。

2. 同じ独立一様角度 $\Theta_i$ で $X_i=(\cos\Theta_i,\sin\Theta_i)$、$X'_i=(1+\eta)(\cos\Theta_i,\sin\Theta_i)$ と構成すると

   $$
   Y_i=X_i+\eta X_i
   =(1+\eta)(\cos\Theta_i,\sin\Theta_i)
   =X'_i=Y'_i.
   $$

   全添字で確率1で一致するので、任意の $n$ の観測同時分布も等しい。

3. 観測から計算する推定値 $\widehat R(Y_1,\ldots,Y_n)$ は、入力分布が同じ両模型で同じ分布を持つ。両方で確率1で正しく返すなら、その同じ分布が模型Aでは $\widehat R=1$、模型Bでは $\widehat R=1+\eta$ に集中しなければならない。しかし $\eta>0$ で二値は異なるため矛盾する。これは未知ノイズを許した模型の非識別性である。
<!-- solution-end -->

## 次に進む

標本の密度下界、幾何学的な小球体積、独立性を分けて、有限標本が多様体に近づく確率を得た。観測ノイズがあると、標本の疎らさとは別の誤差が残る。次章 MFL5 では近傍の**観測点の共分散行列**から接空間を推定し、曲率による偏りと標本誤差・ノイズを分解する。
