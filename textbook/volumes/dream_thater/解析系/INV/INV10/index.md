# INV10 非線形逆問題を局所的に見分けられるか

<!-- definition-example-audit: strict -->

[INV1の観測写像と逆問題](../INV1/index.md#def-inv1-forward-map)では、線形か非線形かを問わず、同じ観測値を返す未知量があるかを問いにしました。[INV2の下界評価](../INV2/index.md#def-inv2-bounded-below)は、線形作用素 $A$ について

$$
\|Ah\|_Y\ge c\|h\|_X\qquad(c>0)
$$

が逆の安定性を支えることを示します。しかし非線形な $F$ には一つの行列 $A$ がありません。ある未知量 $x_*$ の近くで観測の変化を線形作用素に近似し、その近似が**何を保証し、何を保証しないか**を調べます。

目標は次の三点です。

1. 非線形観測写像を Fréchet 微分し、線形化誤差をノルムで評価する。
2. 有限次元では微分が列フルランクなら、局所的な識別だけでなく局所的な Lipschitz 安定性まで得られることを証明する。
3. 無限次元では微分が単射でも同じ結論は出ず、逆に微分が非単射でも元の写像は識別可能な場合があることを反例と条件付き安定性で確かめる。

本講の空間は、特に断らない限り実 Banach 空間です。数列空間の例では実 Hilbert 空間 $\ell^2=\{x=(x_j)_{j\ge1}:\sum_j|x_j|^2<\infty\}$ を使います。微分による局所結論と、[INV8の変分最小点の存在](../INV8/index.md#thm-inv8-existence)は異なる問題です。局所的に一意に見えることだけでは、大域的な最小点や大域的な一意性は保証しません。

## 1. 観測を「一次の変化」と「それ以外」に分ける

例えば一変数の $F(t)=t^2$ は、$t_*$ の近くで

$$
F(t_*+h)-F(t_*)=2t_*h+h^2
$$

と分解できます。$2t_*h$ は $h$ に線形で、残る $h^2$ は $|h|$ より速く小さくなります。多変数・関数空間でも、この「残りを入力変化のノルムで割ると零へ行く」という要求を使います。

<a id="def-inv10-frechet-forward"></a>

<!-- formal-statement-start -->
> **定義（観測写像の Fréchet 微分）**  
> $X,Y$ を実 Banach 空間、$U\subset X$ を開集合、$F:U\to Y$、$x\in U$ とする。有界線形作用素 $A:X\to Y$ が存在し、

$$
\lim_{\substack{\|h\|_X\to0\\h\ne0}}
\frac{\|F(x+h)-F(x)-Ah\|_Y}{\|h\|_X}=0
$$

> （十分小さい $h$ について $x+h\in U$）なら、$F$ は $x$ で **Fréchet 微分可能**という。この $A$ を $DF(x)$ と記す。近似 $F(x)+DF(x)h$ を $x$ における**線形化**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv10-frechet-forward -->

**定義の確認**：$X=Y=\mathbb R^2$、$U=\mathbb R^2$、

$$
F(s,t)=(s,t+s^2)
$$

とします。$x=(s,t)$、$h=(a,b)$ とおくと

$$
F(x+h)-F(x)=(a,b+2sa+a^2).
$$

そこで $A_x(a,b)=(a,b+2sa)$ とおけば、$A_x$ は各固定点 $x$ について有界線形で、差は $(0,a^2)$ です。Euclid ノルムで

$$
\frac{\|(0,a^2)\|_2}{\sqrt{a^2+b^2}}
=\frac{|a|^2}{\sqrt{a^2+b^2}}
\le\sqrt{a^2+b^2}\longrightarrow0.
$$

よって実際に定義の極限を満たし、

$$
DF(s,t)=
\begin{pmatrix}1&0\\2s&1\end{pmatrix}
$$

です。行列はこの基底での線形写像 $A_x$ の表示であり、単に偏導関数を並べて微分の成立を宣言したわけではありません。
<!-- definition-example-end -->

微分は一意です。もし $A,B$ のどちらも定義を満たすなら、任意の固定した $v\in X$ と $h=\tau v$（$\tau>0$）について

$$
\|(A-B)v\|_Y
\le
\frac{\|F(x+\tau v)-F(x)-A(\tau v)\|_Y}{\tau}
+
\frac{\|F(x+\tau v)-F(x)-B(\tau v)\|_Y}{\tau}
\longrightarrow0.
$$

従って $(A-B)v=0$ がすべての $v$ で成り立ちます。

**微分可能と微分の連続性は違います。** $F$ が近傍の各点で Fréchet 微分可能で、$x\mapsto DF(x)$ が作用素ノルムに関して連続なら、$F$ はその近傍で $C^1$ といいます。以下の局所安定性の証明ではこの連続性を使います。

## 2. 「一点で見分ける」と「近くの二点を見分ける」

[INV1の識別可能性](../INV1/index.md#def-inv1-identifiability)は観測が同じ未知量を区別できるかという問いでした。非線形写像では、空間全体で一意に決まらなくても、既知の候補 $x_*$ に十分近い未知量だけを調べる場合があります。

<a id="def-inv10-local-identifiability"></a>

<!-- formal-statement-start -->
> **定義（局所識別可能性）**  
> $X,Y$ をノルム空間、$U\subset X$ を開集合、$F:U\to Y$、$x_*\in U$ とする。ある $r>0$ に対し $B_r(x_*)\subset U$ で、

$$
x\in B_r(x_*),\quad F(x)=F(x_*)
\quad\Longrightarrow\quad x=x_*
$$

> が成立するとき、$x_*$ は $F$ により**局所識別可能**という。さらに $F$ が $B_r(x_*)$ 上で単射なら、その球上で**局所的に二点を識別できる**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv10-local-identifiability -->

**定義の確認**：$F(t)=t^2$ とし、$x_*=1$ を選びます。$r=1/2$ なら $B_r(1)=(1/2,3/2)$ に含まれる二点 $u,v$ はともに正です。$u^2=v^2$ から $(u-v)(u+v)=0$、$u+v>0$ より $u=v$。従ってこの球では二点識別が成り立ち、特に $x_*=1$ を局所識別できます。

一方 $x_*=0$ では、任意の $r>0$ に対して $0<t<r$ とすれば $F(t)=F(-t)$ ですから、近傍上の二点識別は成立しません。それでも $F(t)=F(0)=0$ を満たすのは $t=0$ だけなので、**一点 $0$ の局所識別は成立します**。二つの条件を取り違えないでください。
<!-- definition-example-end -->

識別できても、測定誤差に対して安定とは限りません。より強い定量的主張として、球のすべての $u,v$ について

$$
\|u-v\|_X\le C\|F(u)-F(v)\|_Y
$$

を示せれば、その球上で観測が同じなら $u=v$ であり、観測値の差から未知量の差も評価できます。この二点評価を次節で導きます。

## 3. 微分の下界から局所的な二点安定性を証明する

線形の [INV2の下界評価](../INV2/index.md#def-inv2-bounded-below) と同じ形を、今度は基準点の微分 $DF(x_*)$ に要求します。ただし微分が入力の位置で変わるため、**周囲の微分が基準点の微分から大きく離れない**ことが必要です。

<a id="thm-inv10-local-stability"></a>

<!-- formal-statement-start -->
> **定理（微分の下界による局所二点安定性）**  
> $X,Y$ を実 Banach 空間、$U\subset X$ を開集合、$x_*\in U$ とし、$F:U\to Y$ は $x_*$ のある開近傍で $C^1$ とする。$A=DF(x_*)$ について、ある $c>0$ が存在して

$$
\|Ah\|_Y\ge c\|h\|_X\qquad(h\in X)
$$

> が成り立つとする。このときある $r>0$ が存在し、$B_r(x_*)\subset U$ の任意の $u,v$ に対し

$$
\|F(u)-F(v)\|_Y\ge\frac c2\|u-v\|_X
$$

> が成立する。特に $F$ はこの球上で単射であり、逆写像を $F(B_r(x_*))$ 上で定義すると Lipschitz 連続である。
<!-- formal-statement-end -->

### 証明の見取り図

同じ観測の差を、**基準点の微分が作る差**と**その近くで変わった分**に分けます。二点を結ぶ線分は球内に収まるため、その線分に沿う一変数の微積分で誤差を抑えます。下界 $c$ に対し誤差を $c/2$ 以下にすれば結論が出ます。

<!-- proof-start -->
### 証明

$DF$ の $x_*$ での作用素ノルム連続性により、$r>0$ を十分小さく取り、閉じた線分が $C^1$ の領域に含まれるようにし、全 $w\in B_r(x_*)$ で

$$
\|DF(w)-A\|_{\mathcal L(X,Y)}\le\frac c2
$$

とできます。任意の $u,v\in B_r(x_*)$ を固定し、$h=u-v$ とします。球の凸性から $v+th\in B_r(x_*)$（$0\le t\le1$）です。

一変数の関数 $g(t)=F(v+th)$ を考えると、連鎖律の適用対象は $t\mapsto v+th$ で、その導関数は $h$ です。したがって

$$
g'(t)=DF(v+th)h.
$$

ここで $g'$ は区間 $[0,1]$ 上連続です。細かな分割 $0=t_0<t_1<\cdots<t_N=1$ を取ります。各小区間の増分を $g'(t_k)(t_{k+1}-t_k)$ で近似すると、微分の剰余と $g'$ の一様連続性から剰余のノルムの和は分割幅とともに零へ収束します。$Y$ の完備性により連続関数 $g'$ の Riemann 和が収束するので、その極限を取ると

$$
\begin{aligned}
F(u)-F(v)
&=\int_0^1DF(v+th)h\,dt\\
&=Ah+\int_0^1\bigl(DF(v+th)-A\bigr)h\,dt.
\end{aligned}
$$

積分のノルム評価を使うと

$$
\begin{aligned}
\|F(u)-F(v)-Ah\|_Y
&\le\int_0^1\|DF(v+th)-A\|\,\|h\|_X\,dt\\
&\le\frac c2\|h\|_X.
\end{aligned}
$$

[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)および仮定から

$$
\begin{aligned}
\|F(u)-F(v)\|_Y
&\ge\|Ah\|_Y-\|F(u)-F(v)-Ah\|_Y\\
&\ge\left(c-\frac c2\right)\|h\|_X.
\end{aligned}
$$

$c>0$ なので $F(u)=F(v)$ なら $u=v$ です。像の任意の $y_1=F(u)$、$y_2=F(v)$ に対し

$$
\|F^{-1}(y_1)-F^{-1}(y_2)\|_X
\le\frac2c\|y_1-y_2\|_Y
$$

も成立します。ここで逆写像の定義域は **像 $F(B_r(x_*))$ のみ**であり、$Y$ 全体への全射性は主張していません。
<!-- proof-end -->

### 有限次元なら「列フルランク」が足りる

<a id="cor-inv10-finite-full-rank"></a>

<!-- formal-statement-start -->
> **系（有限次元のフルランク微分と局所識別）**  
> $U\subset\mathbb R^n$ は開集合、$F:U\to\mathbb R^m$ は $x_*\in U$ の近傍で $C^1$ とする。Jacobi 行列 $DF(x_*)\in\mathbb R^{m\times n}$ の階数が $n$（従って $m\ge n$）なら、ある $r,C>0$ に対して

$$
\|u-v\|_2\le C\|F(u)-F(v)\|_2
\qquad(u,v\in B_r(x_*))
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

列フルランクなら $DF(x_*)h=0$ を満たすのは $h=0$ のみです。有限次元では単位球面がコンパクトなので、単射性から一様な正の下界を取り出せます。

<!-- proof-start -->
### 証明

$A=DF(x_*)$ とし、$S=\{h\in\mathbb R^n:\|h\|_2=1\}$ とします。$A$ が単射なら $\|Ah\|_2>0$ が $S$ の各点で成立します。関数 $h\mapsto\|Ah\|_2$ は連続で、$S$ はコンパクトなので最小値

$$
c=\min_{h\in S}\|Ah\|_2>0
$$

を持ちます。$h\ne0$ なら $h/\|h\|_2\in S$ であり、線形性より

$$
\|Ah\|_2=\|h\|_2\left\|A\frac h{\|h\|_2}\right\|_2
\ge c\|h\|_2.
$$

$h=0$ の場合も同じ不等式が成立します。よって[微分の下界による局所二点安定性](#thm-inv10-local-stability)を $X=\mathbb R^n$、$Y=\mathbb R^m$ に適用し、$C=2/c$ と取れます。
<!-- proof-end -->

**直接例**：第1節の $F(s,t)=(s,t+s^2)$ は $DF(0,0)=I_2$ です。$c=1$ を使います。$(s,t)\in B_{1/4}(0)$ なら

$$
DF(s,t)-I_2=\begin{pmatrix}0&0\\2s&0\end{pmatrix},
\qquad
\|DF(s,t)-I_2\|=2|s|<\frac12.
$$

従って定理の証明をそのまま適用すると $B_{1/4}(0)$ 内の任意の二点に対し

$$
\|u-v\|_2\le2\|F(u)-F(v)\|_2
$$

です。実際、観測 $(p,q)=F(s,t)$ から $s=p$、$t=q-p^2$ と戻せます。局所安定性は、この具体的な復元公式とも矛盾しません。

**限界**：列フルランクは十分条件であって必要条件ではありません。$F(t)=t^3$ では $DF(0)=0$ ですが $F$ は全域で単射です。反対に $F(t)=t^2$ は $DF(0)=0$ で、$0$ の近傍の二点を識別できません。微分の階数不足という情報だけで非線形写像の識別可能性を断定できないのです。

## 4. 条件付き安定性：追加の制約で何を回復するか

線形であっても [INV2のコンパクト作用素の不安定性](../INV2/index.md#thm-inv2-compact-instability)が教えるように、無限次元では単射と下界評価は異なります。さらに「下界がない」ことと「追加仮定の下でも何も分からない」ことも別です。

復元候補を滑らかさや大きさで制約した集合 $C$ に絞り、観測値の差が小さいときに未知量の差も小さいことを、線形とは限らない関数で測ります。

<a id="def-inv10-conditional-stability"></a>

<!-- formal-statement-start -->
> **定義（条件付き安定性と安定性の指標）**  
> $X,Y$ をノルム空間、$C\subset X$ を空でない集合、$F:C\to Y$ とする。非減少関数 $\omega:[0,\infty)\to[0,\infty)$ で $\omega(0)=0$ かつ $\lim_{t\downarrow0}\omega(t)=0$ を満たし、

$$
\|u-v\|_X\le\omega(\|F(u)-F(v)\|_Y)
\qquad(u,v\in C)
$$

> が成立するとき、$F$ は $C$ 上で **条件付き安定**という。$\omega$ を安定性の指標という。特に $\omega(t)=Kt^\beta$（$K>0$、$0<\beta\le1$）なら Hölder 型、$\beta=1$ なら Lipschitz 型の評価という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv10-conditional-stability -->

**定義の確認**：$C=[-1,1]\subset\mathbb R$、$F(t)=2t$、$\omega(s)=s/2$ とします。$\omega$ は非負・非減少、$\omega(0)=0$ で原点で右連続です。すべての $u,v\in C$ に対し

$$
|u-v|=\frac12|F(u)-F(v)|=\omega(|F(u)-F(v)|)
$$

が成り立ちます。指標の条件と二点評価を**両方**確かめたので、この例は Lipschitz 型の条件付き安定性です。
<!-- definition-example-end -->

### 微分が零でも非線形観測に情報が残る

$a,b\in\mathbb R$ に対し

$$
a^3-b^3=(a-b)(a^2+ab+b^2)
$$

です。右側の二次式は

$$
a^2+ab+b^2=\frac14(a-b)^2+\frac34(a+b)^2
\ge\frac14(a-b)^2.
$$

従って

$$
|a^3-b^3|\ge\frac14|a-b|^3,
\qquad
|a-b|\le(4|a^3-b^3|)^{1/3}.
$$

$F(t)=t^3$ は全域で Hölder 指標 $\omega(s)=(4s)^{1/3}$ を持ちます。これは $\omega$ の条件を満たしますが、Lipschitz 評価ではありません。実際に $b=0$、$a=\varepsilon\ne0$ を代入すると Lipschitz 定数は $|\varepsilon|\le K|\varepsilon|^3$ を要求し、$\varepsilon\to0$ で不可能です。$DF(0)=0$ でも元の写像が単射であること、そして安定性が弱くなることを区別できました。

## 5. 無限次元では微分が単射でも局所識別できない

有限次元の系で使ったのは、「単射な線形写像なら単位球面上で正の最小値を持つ」という事実です。無限次元の単位球面には通常そのコンパクト性がありません。しかも安定性どころか**局所的な二点識別**まで失う、明示的な滑らかな写像を作れます。

<a id="prop-inv10-infinite-counterexample"></a>

<!-- formal-statement-start -->
> **命題（単射な Fréchet 微分だけでは局所識別を保証しない）**  
> 実 Hilbert 空間 $X=Y=\ell^2$ 上の写像 $F:\ell^2\to\ell^2$ を、各 $j\ge1$ について

$$
F(x)_j=\frac{x_j}{j}-x_j^2
$$

> で定める。この写像は全域で $C^1$ であり、$DF(0):\ell^2\to\ell^2$ は単射である。しかし $F$ は $0$ で局所識別可能でなく、どの $0$ の近傍上でも単射でない。
<!-- formal-statement-end -->

### 証明の見取り図

線形部分は各座標を $1/j$ 倍するので単射ですが、$j$ が大きくなるほど小さな変化しか観測できません。そこへ二次項を足すと、座標 $j$ の大きさ $1/j$ で線形項と二次項が打ち消し合います。この点が $j\to\infty$ で原点に集まります。

<!-- proof-start -->
### 証明

**（1）写像が $\ell^2$ に値を持つこと。** $x\in\ell^2$ なら $|x_j|\le\|x\|_2$ ですから

$$
\sum_{j=1}^{\infty}|x_j^2|^2
=\sum_j|x_j|^4
\le\|x\|_2^2\sum_j|x_j|^2
=\|x\|_2^4.
$$

従って $(x_j^2)_j\in\ell^2$ であり、$(x_j/j)_j\in\ell^2$ でもあるため $F(x)$ は定義できます。

**（2）Fréchet 微分。** 任意の $x,h\in\ell^2$ に対して座標ごとに

$$
F(x+h)_j-F(x)_j
=\left(\frac1j-2x_j\right)h_j-h_j^2.
$$

$T_xh=((1/j-2x_j)h_j)_j$ と置きます。これは線形で、$|1/j-2x_j|\le1+2\|x\|_2$ より有界です。また

$$
\|F(x+h)-F(x)-T_xh\|_2
=\|(h_j^2)_j\|_2\le\|h\|_2^2.
$$

$h\ne0$ で $\|h\|_2$ により割ると右辺は $\|h\|_2\to0$ なので $DF(x)=T_x$ です。さらに任意の $x,z$ で

$$
\|DF(x)-DF(z)\|_{\mathcal L(\ell^2,\ell^2)}
\le2\sup_j|x_j-z_j|
\le2\|x-z\|_2.
$$

従って $DF$ は作用素ノルム連続であり、$F$ は全域で $C^1$ です。

**（3）微分は単射。** 原点では

$$
DF(0)h=(h_j/j)_{j\ge1}.
$$

これが零列なら $h_j/j=0$ がすべての $j$ で成立し、$h=0$ です。ただし標準単位ベクトル $e_j$ に対して

$$
\|e_j\|_2=1,\qquad\|DF(0)e_j\|_2=\frac1j\longrightarrow0,
$$

なので正の一様下界はありません。

**（4）局所識別の失敗。** $x^{(j)}=e_j/j$ と置けば

$$
\|x^{(j)}\|_2=\frac1j\longrightarrow0,
\qquad
F(x^{(j)})_j=\frac1{j^2}-\frac1{j^2}=0.
$$

他の座標も零です。ゆえに $F(x^{(j)})=0=F(0)$ なのに $x^{(j)}\ne0$。任意の $r>0$ について $j>1/r$ と選べば $x^{(j)}\in B_r(0)$ です。[局所識別可能性の定義](#def-inv10-local-identifiability)の含意が破れるため、主張が従います。
<!-- proof-end -->

この例は微分が存在しないから失敗したのではありません。微分は全域で連続です。失ったのは[局所安定性定理](#thm-inv10-local-stability)に必要な**一様な下界**であり、その隙間に二次項が入り込んで複数解を生みました。

## 6. 同じ写像でも候補集合を制限すると Hölder 安定になる

第5節の $F$ は全空間では原点すら局所識別できません。しかし高周波成分を制限した未知量だけを許せば、二次項の打消しを抑えられます。まず観測の線形部分

$$
(Ah)_j=\frac{h_j}{j}
$$

と、重み付きの成分 $(jh_j)_j$ を結ぶ不等式を作ります。

$\sum_j j^2|h_j|^2<\infty$ を仮定すると、$\ell^2$ 上の [Cauchy–Schwarz 不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
\begin{aligned}
\|h\|_2^2
&=\sum_j\left|\frac{h_j}{j}\right|\,|jh_j|\\
&\le\left(\sum_j\frac{|h_j|^2}{j^2}\right)^{1/2}
\left(\sum_jj^2|h_j|^2\right)^{1/2}\\
&=\|Ah\|_2\left(\sum_jj^2|h_j|^2\right)^{1/2}.
\end{aligned}
$$

追加の重み付き有界性がないと、右端の第二因子を統一的に抑えられません。

<a id="prop-inv10-restricted-holder"></a>

<!-- formal-statement-start -->
> **命題（非線形対角観測の制約集合上での Hölder 安定性）**  
> $F:\ell^2\to\ell^2$ を

$$
F(x)_j=\frac{x_j}{j}-x_j^2
$$

> とし、候補集合を

$$
C=\left\{x\in\ell^2:\sum_{j=1}^{\infty}j^2|x_j|^2\le\frac1{16}\right\}
$$

> とする。このときすべての $u,v\in C$ に対し

$$
\|u-v\|_2\le\|F(u)-F(v)\|_2^{1/2}
$$

> が成立する。従って $F|_C$ は単射で、$C$ 上では指数 $1/2$ の条件付き安定性を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$C$ 上では各座標が高々 $1/(4j)$ に制限されます。すると $F(u)_j-F(v)_j$ を因数分解した際に、線形部分の係数 $1/j$ を二次項が完全には打ち消せません。残る $1/(2j)$ の下界と、先ほどの重み付き不等式を組み合わせます。

<!-- proof-start -->
### 証明

$u,v\in C$ とします。非負項の和が $1/16$ 以下なので、各 $j$ で

$$
j^2|u_j|^2\le\frac1{16},\qquad
j^2|v_j|^2\le\frac1{16}.
$$

よって $|u_j|,|v_j|\le1/(4j)$ です。座標ごとの因数分解から

$$
F(u)_j-F(v)_j
=(u_j-v_j)\left(\frac1j-u_j-v_j\right).
$$

$|u_j+v_j|\le1/(2j)$ なので

$$
\left|\frac1j-u_j-v_j\right|
\ge\frac1j-|u_j+v_j|
\ge\frac1{2j}.
$$

従って各座標で $|(u_j-v_j)/j|\le2|F(u)_j-F(v)_j|$ となり、二乗和を取ると

$$
\|A(u-v)\|_2\le2\|F(u)-F(v)\|_2.
$$

さらに $h=u-v$ とします。二つの数列 $(ju_j)_j$, $(jv_j)_j$ は $\ell^2$ に属します。その差が $(jh_j)_j$ なので、[三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-triangle-inequality)を適用すると

$$
\left(\sum_jj^2|h_j|^2\right)^{1/2}
\le
\left(\sum_jj^2|u_j|^2\right)^{1/2}
+
\left(\sum_jj^2|v_j|^2\right)^{1/2}
\le\frac12.
$$

第6節冒頭の Cauchy–Schwarz による評価を $h$ に適用して

$$
\begin{aligned}
\|u-v\|_2^2
&\le\|A(u-v)\|_2
\left(\sum_jj^2|u_j-v_j|^2\right)^{1/2}\\
&\le 2\|F(u)-F(v)\|_2\cdot\frac12\\
&=\|F(u)-F(v)\|_2.
\end{aligned}
$$

両辺は非負ですから平方根を取れます。[条件付き安定性の定義](#def-inv10-conditional-stability)に対し $\omega(t)=\sqrt t$ は非減少、$\omega(0)=0$、原点で右連続です。特に $F(u)=F(v)$ なら $u=v$ です。
<!-- proof-end -->

**制約が実際に働く例**：$x^{(j)}=e_j/j$ は第5節で局所識別を壊しましたが、重み付き和は $\sum_k k^2|x^{(j)}_k|^2=1$ であり $C$ に入りません。代わりに $z^{(j)}=e_j/(4j)$ は重み付き和が $1/16$ で $C$ に入り、

$$
\|z^{(j)}\|_2=\frac1{4j},\qquad
\|F(z^{(j)})\|_2=\frac3{16j^2}.
$$

従ってこの制約集合でも Lipschitz 定数を一つに統一することはできません。比

$$
\frac{\|z^{(j)}\|_2}{\|F(z^{(j)})\|_2}
=\frac{4j}{3}\longrightarrow\infty
$$

だからです。**制約付き Hölder 安定性は、制約なしの Lipschitz 安定性を回復したという意味ではありません。**

## 7. 演習：線形化・局所識別・追加制約を自分でつなぐ

### Level A：定義と微分を直接確かめる

<a id="ex-inv10-a01"></a>

### INV10-A01 二変数の非線形観測を微分する
- Level: A

$F:\mathbb R^2\to\mathbb R^2$ を $F(s,t)=(s^2+t,st)$ とする。$DF(s,t)$ を求め、残差が Fréchet 微分の定義を満たすことをノルムで示せ。また $(s,t)=(1,2)$ での階数を求めよ。

<!-- solution-start -->
#### 詳細解答

$h=(a,b)$ を加えると

$$
\begin{aligned}
F(s+a,t+b)-F(s,t)
&=(2sa+a^2+b,\,sb+ta+ab)\\
&=(2sa+b,\,ta+sb)+(a^2,ab).
\end{aligned}
$$

一次部分は線形写像であり、その行列表示は

$$
DF(s,t)=\begin{pmatrix}2s&1\\t&s\end{pmatrix}.
$$

残差は $\sqrt{a^4+a^2b^2}=|a|\sqrt{a^2+b^2}\le\|h\|_2^2$ です。$\|h\|_2$ で割れば $\|h\|_2\to0$ なので Fréchet 微分です。$(1,2)$ では行列は $\begin{pmatrix}2&1\\2&1\end{pmatrix}$ となり二行が等しいため階数は $1$ です。この階数不足だけから元の写像の局所識別を断定することはできません。
<!-- solution-end -->

<a id="ex-inv10-a02"></a>

### INV10-A02 実際に局所 Lipschitz 定数を取る
- Level: A

$F(s,t)=(s,t+s^2)$ について $B_{1/4}(0)$ 上で $\|F(u)-F(v)\|_2\ge\frac12\|u-v\|_2$ を、微分の作用素ノルムの評価から導け。

<!-- solution-start -->
#### 詳細解答

$DF(0)=I_2$ なので $c=1$ です。また第1節の微分式から $DF(s,t)-I_2$ は $(a,b)$ を $(0,2sa)$ に写します。従って作用素ノルムは $2|s|$ です。球内では $|s|<1/4$ だから一様に $2|s|<1/2$ となります。任意の $u,v$ を結ぶ線分も球内なので

$$
\|F(u)-F(v)-(u-v)\|_2
\le\frac12\|u-v\|_2.
$$

ここで用いたのは[局所二点安定性定理](#thm-inv10-local-stability)の証明中の線分積分評価です。[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)から $\|F(u)-F(v)\|_2\ge\|u-v\|_2-\frac12\|u-v\|_2$ を得ます。
<!-- solution-end -->

<a id="ex-inv10-a03"></a>

### INV10-A03 一点の識別と二点の識別
- Level: A

$F(t)=t^2$ に対して $x_*=0$ は局所識別可能か。またどの原点近傍でも二点識別が可能か、定義に従って別々に判定せよ。

<!-- solution-start -->
#### 詳細解答

$F(t)=F(0)$ は $t^2=0$ ですから $t=0$ に限られます。任意の $r>0$ でこの含意が成立するため、[局所識別可能性の定義](#def-inv10-local-identifiability)により $0$ は局所識別可能です。しかし $0<a<r$ を取ると $a,-a\in B_r(0)$ かつ $F(a)=a^2=F(-a)$ で二点は異なります。従ってどの原点近傍でも二点識別は不可能です。
<!-- solution-end -->

<a id="ex-inv10-a04"></a>

### INV10-A04 三角関数で二点安定性を確認する
- Level: A

$F(t)=\sin t$ とし $C=[-\pi/3,\pi/3]$ とする。すべての $u,v\in C$ に対して $|u-v|\le2|F(u)-F(v)|$ を証明せよ。原点の微分も求めよ。

<!-- solution-start -->
#### 詳細解答

$F'(t)=\cos t$ なので $F'(0)=1$ です。$u=v$ の場合は明らかに成立します。$u\ne v$ では一変数の平均値の定理を $u,v$ の間に適用し、ある $\xi$ に対して

$$
\sin u-\sin v=\cos\xi\,(u-v)
$$

です。$|\xi|\le\pi/3$ で $\cos\xi\ge1/2$ なので $|\sin u-\sin v|\ge\frac12|u-v|$。従って求める二点評価が成立します。微分が原点で非零という情報に加えて、区間全体で導関数が正に保たれていることがこの直接証明を支えています。
<!-- solution-end -->

<a id="ex-inv10-a05"></a>

### INV10-A05 微分単射と下界を区別する
- Level: A

$\ell^2$ 上の $A(x)_j=x_j/j$ が有界線形かつ単射であることを示せ。ある $c>0$ ですべての $h$ に $\|Ah\|_2\ge c\|h\|_2$ が成立するか。

<!-- solution-start -->
#### 詳細解答

成分ごとの線形性から $A$ は線形です。また

$$
\|Ax\|_2^2=\sum_j\frac{|x_j|^2}{j^2}
\le\sum_j|x_j|^2=\|x\|_2^2
$$

なので有界です。$Ax=0$ なら各 $x_j/j=0$ から $x=0$ で単射です。しかし $h=e_j$ とすると $\|h\|_2=1$、$\|Ah\|_2=1/j$ なので、下界があれば $1/j\ge c$ がすべての $j$ で必要になり、$j\to\infty$ で矛盾します。
<!-- solution-end -->

### Level B：仮定を変えたときの結論を追う

<a id="ex-inv10-b01"></a>

### INV10-B01 正方根による局所復元
- Level: B

$F(s,t)=(s^2+t,t)$ とする。$(1,0)$ の近傍で局所的に二点識別できることを、明示的な逆公式で示せ。$(0,0)$ の近傍ではどうか。

<!-- solution-start -->
#### 詳細解答

観測を $(p,q)=F(s,t)$ と書くと $t=q$、$s^2=p-q$ です。$(1,0)$ を含み $s>0$ に収まる開集合、例えば $B_{1/2}(1,0)$ を選べば $s=\sqrt{p-q}$ の正の枝だけが許されます。従ってこの集合の像上で

$$
F^{-1}(p,q)=(\sqrt{p-q},q)
$$

が成立し、二点識別できます。さらに $DF(s,t)=\begin{pmatrix}2s&1\\0&1\end{pmatrix}$ なので $(1,0)$ では行列式が $2\ne0$、[有限次元フルランクの系](#cor-inv10-finite-full-rank)も適用できます。一方 $(0,0)$ の任意の近傍に $(a,0)$ と $(-a,0)$（$a>0$ を十分小さく取る）が含まれ、両者の像は $(a^2,0)$ です。よって原点近傍での二点識別は失敗します。ただし $F(s,t)=F(0,0)$ は $t=0$、$s^2=0$ を意味するので原点そのものの局所識別は成立します。
<!-- solution-end -->

<a id="ex-inv10-b02"></a>

### INV10-B02 立方写像の安定性指数は改善できるか
- Level: B

$F(t)=t^3$ について全 $\mathbb R$ で $|u-v|\le(4|F(u)-F(v)|)^{1/3}$ を導き、原点付近では指数 $\beta>1/3$ の Hölder 評価 $|u-v|\le K|F(u)-F(v)|^\beta$ が定数 $K$ によらず不可能であることを示せ。

<!-- solution-start -->
#### 詳細解答

$$
u^3-v^3=(u-v)(u^2+uv+v^2)
$$

に対して

$$
u^2+uv+v^2=\frac14(u-v)^2+\frac34(u+v)^2\ge\frac14(u-v)^2
$$

です。従って $|F(u)-F(v)|\ge\frac14|u-v|^3$ となり、立方根を取って第一の評価が得られます。次に $v=0,u=t>0$ として、ある $K$ による $\beta>1/3$ の評価を仮定すると

$$
t\le Kt^{3\beta}
\quad\Longleftrightarrow\quad
t^{1-3\beta}\le K.
$$

$1-3\beta<0$ のため、$t\downarrow0$ で左辺が無限大となり矛盾します。非線形の次数によって安定性の指数が決まり、単射性だけでは指数を上げられません。
<!-- solution-end -->

<a id="ex-inv10-b03"></a>

### INV10-B03 無限次元の反例を係数列へ一般化する
- Level: B

正の数列 $a_j\downarrow0$ で $\sup_j a_j<\infty$ とし、$G:\ell^2\to\ell^2$ を $G(x)_j=a_jx_j-x_j^2$ とする。$G$ が $C^1$、$DG(0)$ が単射であるにもかかわらず $0$ が局所識別可能でないことを証明せよ。

<!-- solution-start -->
#### 詳細解答

任意の $x\in\ell^2$ で $(a_jx_j)_j$ は有界係数による積なので $\ell^2$ に属します。また $\|(x_j^2)_j\|_2\le\|x\|_2^2$ なので $G$ は $\ell^2$ に値を取ります。$h$ に対して

$$
G(x+h)_j-G(x)_j=(a_j-2x_j)h_j-h_j^2
$$

です。線形部分 $T_xh=((a_j-2x_j)h_j)_j$ は有界で、剰余のノルムは $\|h\|_2^2$ 以下です。従って $DG(x)=T_x$。微分の差は

$$
\|DG(x)-DG(z)\|\le2\|x-z\|_2
$$

なので $G$ は $C^1$ です。$DG(0)h=(a_jh_j)_j$ は各 $a_j>0$ より単射です。一方 $x^{(j)}=a_je_j$ は非零で $\|x^{(j)}\|_2=a_j\to0$ ですが、$G(x^{(j)})_j=a_j^2-a_j^2=0$、他成分も零です。$G(0)=0$ と一致する異なる点が原点へ近づくため局所識別は失敗します。
<!-- solution-end -->

<a id="ex-inv10-b04"></a>

### INV10-B04 線形観測の条件付き安定性を導く
- Level: B

$A:\ell^2\to\ell^2$ を $(Ax)_j=x_j/j$、$C_M=\{x:\sum_jj^2|x_j|^2\le M^2\}$（$M>0$）とする。$u,v\in C_M$ に対し

$$
\|u-v\|_2\le(2M)^{1/2}\|Au-Av\|_2^{1/2}
$$

を示し、$A$ は全空間で Lipschitz 型の逆評価を持たないことも説明せよ。

<!-- solution-start -->
#### 詳細解答

$h=u-v$ と置くと、Cauchy–Schwarz より

$$
\begin{aligned}
\|h\|_2^2
&=\sum_j\left|\frac{h_j}{j}\right||jh_j|\\
&\le\left(\sum_j\frac{|h_j|^2}{j^2}\right)^{1/2}
\left(\sum_jj^2|h_j|^2\right)^{1/2}
=\|Ah\|_2\left(\sum_jj^2|h_j|^2\right)^{1/2}.
\end{aligned}
$$

まず $u,v\in C_M$ より、数列 $(ju_j)_j$, $(jv_j)_j$ の $\ell^2$ ノルムはそれぞれ $M$ 以下です。その差が $(jh_j)_j$ なので、[三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-triangle-inequality)を適用すると

$$
\left(\sum_j j^2|h_j|^2\right)^{1/2}
\le M+M=2M.
$$

この上界を先ほどの積の評価へ代入すると

$$
\|h\|_2^2\le2M\|A(u-v)\|_2.
$$

両辺が非負なので平方根を取り、結論を得ます。一方 $e_j$ に対する $\|e_j\|_2/\|Ae_j\|_2=j\to\infty$ より全空間で Lipschitz 型の逆評価はありません。この $e_j$ は $j>M$ で $C_M$ に入らず、制約集合上の評価と矛盾しません。
<!-- solution-end -->

### Level C：識別・安定性・観測ノイズを統合する

<a id="ex-inv10-c01"></a>

### INV10-C01 非線形対角観測を制約付きで復元する
- Level: C

$F:\ell^2\to\ell^2$、$C\subset\ell^2$ を

$$
F(x)_j=\frac{x_j}{j}-x_j^2,\qquad
C=\left\{x:\sum_jj^2|x_j|^2\le\frac1{16}\right\}
$$

とする。

1. $F$ は全空間では原点で局所識別可能でないが、$C$ 上では単射であることを証明せよ。
2. 真の未知量 $x^\dagger\in C$、厳密観測 $y=F(x^\dagger)$、雑音データ $y^\delta$ が $\|y^\delta-y\|_2\le\delta$ を満たすとする。$x^\delta\in C$ が $\|F(x^\delta)-y^\delta\|_2\le\delta$ を満たすとき、復元誤差を $\delta$ で評価せよ。$x^\delta$ の存在を仮定した問題であることに注意せよ。
3. $C$ 上でも一様な Lipschitz 型の逆評価が成立しないことを、具体的な列で示せ。

<!-- solution-start -->
#### 詳細解答

**設問1**。まず $x^{(j)}=e_j/j\to0$ に対して $F(x^{(j)})=0=F(0)$ なので原点の局所識別は失敗します。次に $u,v\in C$ なら $|u_j|,|v_j|\le1/(4j)$ です。各座標で

$$
F(u)_j-F(v)_j=(u_j-v_j)(1/j-u_j-v_j)
$$

であり、括弧内の絶対値は $1/(2j)$ 以上です。従って $A(h)_j=h_j/j$ とすると $\|A(u-v)\|_2\le2\|F(u)-F(v)\|_2$ です。また $\left(\sum_jj^2|u_j-v_j|^2\right)^{1/2}\le1/2$ であり、Cauchy–Schwarz から

$$
\|u-v\|_2^2
\le\|A(u-v)\|_2\left(\sum_jj^2|u_j-v_j|^2\right)^{1/2}
\le\|F(u)-F(v)\|_2.
$$

従って $F(u)=F(v)$ なら $u=v$ で、$C$ 上では単射です。

**設問2**。$x^\delta$ の残差が $\delta$ 以下であることとデータの雑音仮定から

$$
\begin{aligned}
\|F(x^\delta)-F(x^\dagger)\|_2
&\le\|F(x^\delta)-y^\delta\|_2+\|y^\delta-y\|_2\\
&\le2\delta.
\end{aligned}
$$

設問1の二点評価を $u=x^\delta$、$v=x^\dagger$ に適用すると

$$
\boxed{\ \|x^\delta-x^\dagger\|_2\le\sqrt{2\delta}\ }.
$$

これは雑音が $\delta\downarrow0$ なら誤差も零へ向かうことを意味します。ただし任意の観測からこの残差条件を満たす点が存在するかは**別の問題**であり、今回は条件として与えられています。

**設問3**。$z^{(j)}=e_j/(4j)$ は $\sum_k k^2|z^{(j)}_k|^2=1/16$ なので $C$ に入ります。$0\in C$ でもあります。像を計算すると

$$
F(z^{(j)})_j=\frac1{4j^2}-\frac1{16j^2}=\frac3{16j^2}.
$$

他座標は零であり、

$$
\frac{\|z^{(j)}-0\|_2}{\|F(z^{(j)})-F(0)\|_2}
=\frac{1/(4j)}{3/(16j^2)}=\frac{4j}{3}\to\infty.
$$

従って一様な Lipschitz 定数は存在しません。条件付き Hölder 安定性は得られても、微分の一様下界に基づく Lipschitz 安定性までは得られないことが、この列から分かります。
<!-- solution-end -->

## 8. 次講への接続

本講で得た局所識別・局所安定性は、「ある基準点の近くで観測が未知量を区別するか」の主張です。実際の反復法では、まだ真の未知量を知らないため、近似点を更新していかなければなりません。そのとき微分を使うこと自体は正当化できても、**更新方向が観測残差を減らすか、誤差のあるデータに何回まで適合させるか**は別に検証する必要があります。

次の INV11 では、非線形 Landweber と Gauss–Newton 型の反復を取り上げ、線形化誤差の仮定と、ノイズ水準に依存する停止則を調べます。