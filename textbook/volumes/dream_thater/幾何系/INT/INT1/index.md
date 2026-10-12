# INT1 第一積分とLiouville可積分性

[Hamiltonベクトル場とPoisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)を学ぶと、運動に沿って値の変わらない関数を計算できます。[GMECH8の二振動子の計算](../../GMECH/GMECH8/index.md#prop-gmech8-involution-check)では、二つの保存量が互いにPoisson可換であり、その微分も一般の点で独立でした。しかし「保存量を幾つか見つけた」というだけでは、運動をどこまで整理できるのか分かりません。

まず保存されるという条件を式にし、次に複数の保存量が**互いに可換**で、しかも**同じ情報の重複ではない**ことを確かめます。$2n$ 次元の位相空間では、なぜ独立な可換保存量の最大数が $n$ なのかも証明します。最後に、それらの値を固定した共通レベル集合の次元と接空間を調べます。一般のレベル集合がトーラスになるという主張は次章INT2で必要な追加仮定とともに証明します。

## 1. 第一積分は「軌道に沿って一定」の厳密な表現

$(M,\omega)$ を連結とは限らない $2n$ 次元の滑らかなシンプレクティック多様体、$H\in C^\infty(M)$ を時間に陽に依存しないHamiltonianとします。[Hamiltonベクトル場](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)は $\iota_{X_H}\omega=dH$ で定義し、Poisson括弧の符号を

$$
\{F,G\}=\omega(X_F,X_G)=dF(X_G)
$$

と固定します。正準座標では $\{F,G\}=\sum_i(F_{q_i}G_{p_i}-F_{p_i}G_{q_i})$ です。

曲線 $x(t)$ が $\dot x=X_H(x)$ を満たすとき、連鎖律から

$$
\frac{d}{dt}F(x(t))
=dF_{x(t)}(\dot x(t))
=dF_{x(t)}(X_H(x(t)))
=\{F,H\}(x(t))
$$

となります。[観測量の時間発展](../../SYM/SYM4/index.md#prop-sym4-observable-evolution)を、今回の関数 $F$ に代入した式です。これが恒等的に零なら $F$ は全ての局所解に沿って一定です。

<a id="def-int1-first-integral"></a>

<!-- formal-statement-start -->
> **定義（第一積分）**  
> $(M,\omega)$ 上の滑らかな時間非依存Hamiltonian $H$ に対し、滑らかな関数 $F:M\to\mathbb R$ が
>
$$
\{F,H\}=0\quad\text{on }M
$$
>
> を満たすとき、$F$ を $H$ の第一積分と呼ぶ。開集合 $U\subset M$ でのみ成り立つ場合は $U$ 上の局所的な第一積分と呼ぶ（軌道が $U$ にとどまる時間内の保存を意味する）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int1-first-integral -->
### 直接例：一自由度の振動子のエネルギー

$M=\mathbb R^2$、$\omega=dq\wedge dp$、$H=(p^2+\omega_0^2q^2)/2$（$\omega_0>0$）とします。$H_q=\omega_0^2q$、$H_p=p$ を用いると

$$
\{H,H\}=H_qH_p-H_pH_q
=\omega_0^2qp-p\omega_0^2q=0.
$$

従って $F=H$ は第一積分です。実際 $\dot q=p,\ \dot p=-\omega_0^2q$ を使えば $dH/dt=\omega_0^2q\,p+p(-\omega_0^2q)=0$ となり、同じ事実を軌道から直接確認できます。
<!-- definition-example-end -->

「全ての軌道で値が一定」と $\{F,H\}=0$ の同値性には、微分方程式の局所解が各初期点から存在することを使います。

<a id="prop-int1-conservation-criterion"></a>

<!-- formal-statement-start -->
> **命題（第一積分の軌道判定）**  
> 滑らかなHamiltonian $H$ と滑らかな $F$ に対し、$\{F,H\}=0$ が $M$ の全点で成り立つことと、$X_H$ の任意の最大積分曲線 $x(t)$ 上で $F(x(t))$ が定数であることは同値である。Hamilton流の大域的完備性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

一方向は先ほどの連鎖律です。逆向きでは、任意の点を時刻0の初期点とする局所解を選び、その点で定数関数の時間微分を計算します。

<!-- proof-start -->
### 証明

$\{F,H\}\equiv0$ なら、任意の積分曲線が定義される開時間区間 $I$ 上で

$$
(F\circ x)'(t)=\{F,H\}(x(t))=0.
$$

時間区間は連結なので平均値の定理から $F\circ x$ は定数です。逆に任意の $a\in M$ に対して滑らかなベクトル場の局所解 $x_a:(-\delta,\delta)\to M$ があり、$x_a(0)=a$ です。全軌道上で $F$ が一定なら

$$
0=\left.\frac{d}{dt}F(x_a(t))\right|_{t=0}
=dF_a(X_H(a))=\{F,H\}(a).
$$

$a$ は任意なのでPoisson括弧は $M$ 上で零です。
<!-- proof-end -->

## 2. 保存量を組にすると何が追加で必要か

二つの第一積分 $F,G$ は、それぞれ $H$ とPoisson可換でも、互いには可換とは限りません。これは単なる用語上の違いではありません。後で共通レベル集合に沿った複数のHamilton流を同時に扱う際、互いの流れが干渉しないことを保証する条件です。

<a id="def-int1-involution"></a>

<!-- formal-statement-start -->
> **定義（Poisson可換な関数族）**  
> シンプレクティック多様体 $(M,\omega)$ 上の滑らかな関数 $F_1,\ldots,F_k$ が
>
$$
\{F_i,F_j\}=0
\quad(1\le i,j\le k)
$$
>
> を全点で満たすとき、この関数族はPoisson可換（in involution）であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int1-involution -->
### 直接例：別々の正準座標への依存

$M=\mathbb R^4$ に $(q_1,q_2,p_1,p_2)$ を置き、$F_1=(p_1^2+q_1^2)/2$ と $F_2=(p_2^2+4q_2^2)/2$ を考えます。$F_1$ の偏微分が零でないのは第一座標対、$F_2$ は第二座標対だけです。従って各 $i$ の項で二つの偏微分の少なくとも一方が零になり、

$$
\{F_1,F_2\}
=\sum_{i=1}^2(F_{1,q_i}F_{2,p_i}-F_{1,p_i}F_{2,q_i})=0.
$$

この計算の一般形は[GMECH8の可換性検査](../../GMECH/GMECH8/index.md#prop-gmech8-involution-check)にもあります。ここでは定義の全ての $i,j$ に対する条件を実際に確かめました。自己括弧は反対称性で零、逆順も反対称性で零です。
<!-- definition-example-end -->

### 保存されても可換ではない例

自由粒子 $H=(p_1^2+p_2^2)/2$ に対して、$P=p_1$ と角運動量 $L=q_1p_2-q_2p_1$ は第一積分です。座標式を省略せず計算すると

$$
\{P,H\}=0,\qquad
\{L,H\}=p_2p_1-p_1p_2=0,
$$

$$
\{P,L\}
=0\cdot(-q_2)-1\cdot p_2
=-p_2.
$$

従って $p_2\ne0$ の点では $P,L$ は可換ではありません。保存性は $\{F,H\}=0$、相互可換性は $\{F,G\}=0$ と、相手にしている関数が異なります。

## 3. 「異なる保存量」と「独立な保存量」は異なる

例えば $F_1=H,F_2=H^2$ はどちらも第一積分で、互いに可換です。しかし $dF_2=2H\,dH$ なので、二つの保存量は局所的に一つ分の情報しか与えません。そこで関数の値ではなく、その微分の階数を調べます。

<a id="def-int1-functional-independence"></a>

<!-- formal-statement-start -->
> **定義（関数的独立性）**  
> $2n$ 次元多様体 $M$ 上の滑らかな関数 $F_1,\ldots,F_k$ が点 $x$ で関数的に独立であるとは、余接空間 $T_x^*M$ の $k$ 個の元 $dF_1(x),\ldots,dF_k(x)$ が一次独立であることをいう。同値に、写像
>
$$
F=(F_1,\ldots,F_k):M\longrightarrow\mathbb R^k
$$
>
> の微分 $dF_x:T_xM\to\mathbb R^k$ が階数 $k$ を持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int1-functional-independence -->
### 直接例：二つの振動子の軸上と軸外

第2節の $F_1,F_2$ に対して

$$
dF_1=q_1\,dq_1+p_1\,dp_1,\qquad
dF_2=4q_2\,dq_2+p_2\,dp_2.
$$

もし $a\,dF_1+b\,dF_2=0$ なら、第一座標対の係数から $a(q_1,p_1)=0$、第二座標対から $b(4q_2,p_2)=0$ です。各対が非零なら $a=b=0$ で独立です。反対に $(q_1,p_1)=(0,0)$ では $dF_1=0$ なので独立ではありません。可換性は軸上でも成り立ちますが、独立性はそこで失われます。
<!-- definition-example-end -->

何個まで互いに可換かつ独立な関数を持てるのでしょうか。シンプレクティック形式の非退化性だけから上限を求められます。

<a id="thm-int1-isotropic-bound"></a>

<!-- formal-statement-start -->
> **定理（独立なPoisson可換関数の個数の上限）**  
> $(M,\omega)$ を $2n$ 次元シンプレクティック多様体とする。点 $x\in M$ の近傍でPoisson可換な滑らかな関数 $F_1,\ldots,F_k$ が、$x$ で関数的に独立なら、$k\le n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$F_i$ の微分を $\omega$ でHamiltonベクトル $X_{F_i}$ に変えます。非退化性によって独立性が保たれ、相互のPoisson括弧が零なので、その張る空間は等方部分空間になります。等方空間とそのシンプレクティック直交補空間の次元を比較します。

<!-- proof-start -->
### 証明

$x$ におけるベクトル $v_i=X_{F_i}(x)$ と $W=\operatorname{span}(v_1,\ldots,v_k)$ を取ります。[Hamiltonベクトル場の存在・一意性](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)で使った線形同型

$$
\omega_x^\flat:T_xM\to T_x^*M,\qquad v\mapsto\omega_x(v,\cdot)
$$

は $v_i$ を $dF_i(x)$ に写すので、$dF_i(x)$ の独立性から $\dim W=k$ です。一方、Poisson可換性より

$$
\omega_x(v_i,v_j)=\{F_i,F_j\}(x)=0.
$$

双線形性から任意の $v,w\in W$ にも $\omega_x(v,w)=0$、つまり $W\subset W^\omega$ です。ただし

$$
W^\omega=\{v\in T_xM:\omega_x(v,w)=0\ \text{for all }w\in W\}
$$

です。$\omega^\flat$ が同型なので、$W^\omega$ は通常の消滅部分空間 $W^0\subset T_x^*M$ の逆像です。$W$ の基底を $T_xM$ の基底に延長すると、$W^0$ は最初の $k$ 個の基底ベクトルで零になる余ベクトルからなり、次元 $2n-k$ です。よって

$$
k=\dim W\le\dim W^\omega=2n-k,
\qquad 2k\le2n,
\qquad k\le n.
$$
<!-- proof-end -->

この上限は「$n$ 個を超える保存量は存在しない」という意味ではありません。**全てが相互に可換で、同じ点で独立**という二条件を同時に満たす関数の個数の上限です。自由粒子などではそれ以上の第一積分があっても、全部を可換な独立族として並べることはできません。

## 4. Liouville可積分性を定義し、共通レベルを調べる

$2n$ 次元で $n$ 個という上限を達成することを可積分性の中心に据えます。ここではHamiltonianそのものを関数族の先頭に置き、$F_1=H$ として数えます。

<a id="def-int1-liouville-integrability"></a>

<!-- formal-statement-start -->
> **定義（Liouville可積分性）**  
> $(M^{2n},\omega)$ 上の滑らかな時間非依存Hamilton系 $(M,\omega,H)$ がLiouville可積分（完全積分可能）であるとは、滑らかな実数値関数 $F_1,\ldots,F_n$ があり、$F_1=H$ かつ
>
> 1. 任意の $i,j$ で $\{F_i,F_j\}=0$。
> 2. $dF_1,\ldots,dF_n$ が $M$ の稠密な開集合上で一次独立。
>
> を満たすことをいう。独立性の成立する開集合 $U$ を明示して議論する場合は、その領域上でのLiouville可積分性という。全点で独立であることは要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int1-liouville-integrability -->
### 直接例：任意個の非結合調和振動子

$M=\mathbb R^{2n}$、$\omega=\sum_i dq_i\wedge dp_i$、$\omega_i>0$ とし、

$$
F_i=\frac12(p_i^2+\omega_i^2q_i^2),\qquad
H=\sum_{i=1}^nF_i
$$

とします。$F_1=H$ という記法と合わせるため、可積分性を定義する族は $H,F_2,\ldots,F_n$ としてもよいし、元の全 $F_i$ を使い先頭の一つを $H$ に取り替えてもよいです。両者の微分が張る空間は等しく、置換行列の行列式は $1$ です。

各 $F_i$ は第 $i$ 座標対だけに依存するためPoisson可換です。また $dF_i=\omega_i^2q_i\,dq_i+p_i\,dp_i$ なので、各 $(q_i,p_i)\ne(0,0)$ の点では一次独立です。この領域

$$
U=\{(q,p): (q_i,p_i)\ne(0,0)\ \text{for all }i\}
$$

は開かつ稠密です（除外した各座標対の原点集合は内点を持ちません）。よってこの系はLiouville可積分です。
<!-- definition-example-end -->

最後の直接例で使った $H,F_2,\ldots,F_n$ が $F_1,\ldots,F_n$ と同じ情報を持つ理由を、係数行列でも確認できます。先頭の行が $(1,1,\ldots,1)$、残る行が第2〜第$n$ 成分を選ぶ行であり、第一列に沿って展開すると行列式は $1$ です。したがって独立性は保たれます。

正則な共通レベルでは何が言えるでしょうか。$F=(F_1,\ldots,F_n)$ に対し

$$
N_c=\{x\in M:F_1(x)=c_1,\ldots,F_n(x)=c_n\}
$$

を考えます。共通レベルに入っているHamilton軌道は $n$ 個の保存量を一定に保つので、そこから出ません。さらに、正則性があれば次元まで確定します。

<a id="def-int1-regular-fiber"></a>

<!-- formal-statement-start -->
> **定義（正則共通レベル集合）**  
> 滑らかな写像 $F:M^{2n}\to\mathbb R^n$ と $c\in\mathbb R^n$ に対し、$N_c=F^{-1}(c)$ の各点で $\operatorname{rank}dF=n$ が成り立つとき、$N_c$ を正則共通レベル集合という。空でない $N_c$ の各点で独立性を確認する必要がある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int1-regular-fiber -->
### 直接例：正エネルギーで固定した振動子

二振動子の $F_1=(p_1^2+\omega_1^2q_1^2)/2$、$F_2=(p_2^2+\omega_2^2q_2^2)/2$ を考えます。$c_1,c_2>0$ ならレベル集合の各点で両座標対が非零なので $dF_1,dF_2$ は独立です。従って $N_{(c_1,c_2)}$ は正則です。一方、$c_1=0$ なら第一対は必ず $(0,0)$ で $dF_1=0$ となり、正則性を失います。
<!-- definition-example-end -->

<a id="thm-int1-regular-fiber"></a>

<!-- formal-statement-start -->
> **定理（正則共通レベルの不変性とLagrange性）**  
> $(M^{2n},\omega,H)$ 上で $F_1=H,F_2,\ldots,F_n$ が互いにPoisson可換であり、空でない共通レベル $N_c=F^{-1}(c)$ の各点で $dF_1,\ldots,dF_n$ が独立とする。このとき $N_c$ は $n$ 次元の滑らかな部分多様体であり、各 $X_{F_i}$ は $N_c$ に接して全ての点で接空間を張る。さらに
>
$$
\omega_x|_{T_xN_c\times T_xN_c}=0
\qquad(x\in N_c).
$$
>
> 従って $N_c$ はLagrange部分多様体で、各 $F_i$ の局所Hamilton流の下で不変である。ここから $N_c$ のコンパクト性・連結性・トーラス性は結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

正則値の局所座標を使って $n$ 個の独立な方程式を解き、次元が $2n-n=n$ になることを確認します。Poisson可換性から $dF_j(X_{F_i})=0$ なので、これらのベクトルは全てレベル集合に接します。独立な $n$ 本は接空間の基底になり、その相互の $\omega$ の値が零になるためLagrange性が出ます。

<!-- proof-start -->
### 証明

$x\in N_c$ を固定します。$dF_x$ の階数が $n$ なので、局所座標の $n$ 個の方向を選んだ小行列が可逆です。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)をその $n$ 方向と残りの $n$ 座標を合わせた写像へ適用すれば、近傍で $F_1,\ldots,F_n$ 自身を最初の $n$ 個の局所座標にできます。従って $N_c$ は局所的に最初の $n$ 座標を $c$ に固定した集合であり、滑らかな $n$ 次元部分多様体です。その接空間は

$$
T_xN_c=\ker dF_x
=\{v\in T_xM:dF_j(x)(v)=0,\ 1\le j\le n\}.
$$

任意の $i,j$ についてPoisson可換性から

$$
dF_j(x)(X_{F_i}(x))=\{F_j,F_i\}(x)=0.
$$

よって $X_{F_i}(x)\in T_xN_c$ です。さらに $\omega_x^\flat(X_{F_i}(x))=dF_i(x)$ であり、後者が一次独立なので前者も一次独立です。$T_xN_c$ はちょうど $n$ 次元ゆえ、これらは基底となります。任意の接ベクトルを $v=\sum_i a_iX_{F_i}(x)$、$w=\sum_j b_jX_{F_j}(x)$ と表すと

$$
\omega_x(v,w)
=\sum_{i,j}a_ib_j\omega_x(X_{F_i}(x),X_{F_j}(x))
=\sum_{i,j}a_ib_j\{F_i,F_j\}(x)=0.
$$

$n$ 次元の等方部分多様体は最大等方、すなわちLagrange部分多様体です。最後に $X_{F_i}$ が各点で接するので、局所流の一意性によって $N_c$ を初期点とする局所積分曲線は $N_c$ 内を進みます。具体的にはその曲線上で $(F_j\circ x)'=\{F_j,F_i\}=0$ であり、各 $F_j$ は初期値 $c_j$ を保ちます。
<!-- proof-end -->

### コンパクト性がなくてもよい例と、その限界

$M=\mathbb R^4$ の自由粒子 $H=(p_1^2+p_2^2)/2$ と $P=p_1$ を考えます。$p_2\ne0$ の領域で $dH=p_1\,dp_1+p_2\,dp_2$ と $dP=dp_1$ は独立、$\{H,P\}=0$ です。$H=E>P^2/2$、$P=a$ の共通レベルは、運動量が $(a,\pm\sqrt{2E-a^2})$ に固定され、位置 $(q_1,q_2)$ が自由な二枚の平面です。各成分は $\mathbb R^2$ で非コンパクトですが、前定理どおり二次元Lagrange部分多様体です。**トーラスになるためのコンパクト性と連結性**は、次章で別に仮定する必要があります。

## 5. 中心力の検査で三条件を区別する

中心力の例は「第一積分が二つある」ことと「その微分が独立である」ことの差を具体的に示します。極座標の正準領域 $r>0$ で $\omega=dr\wedge dp_r+d\theta\wedge d\ell$、質量 $m>0$ とし、

$$
H=\frac{p_r^2}{2m}+\frac{\ell^2}{2mr^2}+V(r),
\qquad J=\ell
$$

を考えます。$H$ は角度 $\theta$ に依存しないので[正準Poisson括弧](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)から

$$
\{J,H\}
=J_rH_{p_r}-J_{p_r}H_r
+J_\theta H_\ell-J_\ell H_\theta
=-H_\theta=0.
$$

$H,J$ は第一積分で、相互にPoisson可換です。独立性は $dJ=d\ell$ と

$$
dH=\left(V'(r)-\frac{\ell^2}{mr^3}\right)dr
+\frac{p_r}{m}dp_r+\frac{\ell}{mr^2}d\ell
$$

を比べて判定します。$p_r\ne0$ または $V'(r)-\ell^2/(mr^3)\ne0$ なら、$dH$ に $d\ell$ 以外の成分があるため独立です。逆に両者が零の点では

$$
dH=\frac{\ell}{mr^2}dJ
$$

となり独立性を失います。これは[GMECH8の相対平衡の臨界点判定](../../GMECH/GMECH8/index.md#thm-gmech8-relative-critical)にも現れた円軌道の条件です。

中心力系が一般の点で二つの独立な可換積分を持つことと、特定の円軌道上でその独立性が崩れることは矛盾しません。**可積分性は一般点での構造であり、正則な共通レベルを個別に調べるには階数の再確認が必要**なのです。

## 6. 演習：定義を検査し、共通レベルまで組み立てる

### Level A

<a id="ex-int1-a01"></a>
**A1. 第一積分の時間微分。** $H=(p^2+\alpha q^2)/2$、$\alpha>0$ とする。$F=H^2$ が第一積分であることをPoisson括弧と連鎖律からそれぞれ示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** $H_q=\alpha q,H_p=p$、$F_q=2H\alpha q,F_p=2Hp$ です。よって

$$
\{F,H\}=F_qH_p-F_pH_q
=2H\alpha qp-2Hp\alpha q=0.
$$

一方、Hamilton方程式 $\dot q=p,\dot p=-\alpha q$ から

$$
\frac{dH}{dt}=\alpha q\dot q+p\dot p
=\alpha qp-\alpha pq=0,
\qquad
\frac{dF}{dt}=2H\frac{dH}{dt}=0.
$$

二つの方法は[第一積分の軌道判定](#prop-int1-conservation-criterion)に従って同じ結論を与えます。
<!-- solution-end -->

<a id="ex-int1-a02"></a>
**A2. 保存しても非可換。** $\mathbb R^4$ 上の自由粒子 $H=(p_1^2+p_2^2)/2$ に対して $P=p_1,L=q_1p_2-q_2p_1$ が第一積分であることを確認し、$\{P,L\}$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $H_{q_1}=H_{q_2}=0$、$H_{p_i}=p_i$ です。$P$ については $P_{q_i}=0$ なので $\{P,H\}=0$ です。$L_{q_1}=p_2,L_{q_2}=-p_1,L_{p_1}=-q_2,L_{p_2}=q_1$ を代入すると

$$
\{L,H\}=p_2p_1+(-p_1)p_2=0.
$$

他方、

$$
\{P,L\}
=\sum_i(P_{q_i}L_{p_i}-P_{p_i}L_{q_i})
=-(1\cdot p_2+0\cdot(-p_1))=-p_2.
$$

従って二つとも第一積分ですが、$p_2\ne0$ でPoisson可換ではありません。[Poisson可換性の定義](#def-int1-involution)は個々の保存性と別に検査します。
<!-- solution-end -->

<a id="ex-int1-a03"></a>
**A3. 独立性が壊れる場所。** $\mathbb R^4$ で $F_1=(q_1^2+p_1^2)/2$、$F_2=(q_2^2+p_2^2)/2$ の微分が独立な点を全て求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $dF_1=q_1dq_1+p_1dp_1$、$dF_2=q_2dq_2+p_2dp_2$ です。$a\,dF_1+b\,dF_2=0$ と置き、第一対の係数 $(aq_1,ap_1)=(0,0)$、第二対の係数 $(bq_2,bp_2)=(0,0)$ を比較します。$(q_1,p_1)\ne(0,0)$ なら $a=0$、$(q_2,p_2)\ne(0,0)$ なら $b=0$ です。従って**両対が非零**のとき、かつそのときに限り独立です。どちらかの対が零なら対応する $dF_i$ 自身が零になり独立ではありません。
<!-- solution-end -->

<a id="ex-int1-a04"></a>
**A4. 一自由度と臨界点。** $H=(p^2+q^2)/2$ を $\mathbb R^2$ に置く。Liouville可積分性と、$H=0$ および $H=c>0$ の正則性を区別して答えよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 自由度は $n=1$ なので $F_1=H$ 一個で十分です。$\{H,H\}=0$、$dH=q\,dq+p\,dp$ だから $(q,p)\ne(0,0)$ で階数1です。原点を除いた集合は開かつ稠密なので[Liouville可積分性の定義](#def-int1-liouville-integrability)を満たします。$H=c>0$ では $q^2+p^2=2c$ 上の各点が非零なので正則です。$H=0$ は原点だけで $dH=0$ となり、正則共通レベルではありません。系が可積分であることは全てのレベルが正則であることを要求しません。
<!-- solution-end -->

### Level B

<a id="ex-int1-b01"></a>
**B1. 保存量を数え過ぎる失敗。** $\mathbb R^4$ で $H=(p_1^2+p_2^2)/2$、$F_1=H$、$F_2=H^2$ を取る。Poisson可換性、微分の階数、非空な共通レベルの余次元を計算し、この二関数が可積分性の証明にならない理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 反対称性から $\{H,H\}=0$ であり、Leibniz則により $\{H,H^2\}=2H\{H,H\}=0$、$\{H^2,H^2\}=0$ です。しかし

$$
dF_1=p_1\,dp_1+p_2\,dp_2,\qquad
dF_2=2H(p_1\,dp_1+p_2\,dp_2)=2H\,dF_1.
$$

従って $(p_1,p_2)\ne(0,0)$ でも階数は1、両運動量が零なら階数0です。例えば $c_1=E>0,c_2=E^2$ の共通レベルは $H=E$ と同じ一つの条件で定まります。運動量平面で半径 $\sqrt{2E}$ の円、位置は $\mathbb R^2$ を自由に動くため、次元は $1+2=3$、余次元は1です。本来 $2n=4$ のLiouville可積分性に必要なのは階数2の可換族なので、二つという**関数の表面的個数**では条件を満たしません。
<!-- solution-end -->

<a id="ex-int1-b02"></a>
**B2. 中心力と円軌道での階数低下。** $m=1$、$V(r)=\kappa r^2/2$（$\kappa>0$）とした第5節の $H,J$ に対し、独立性の失われる点を求めよ。また $\ell=\mu\ne0$ の円軌道半径を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $J=\ell$ に対し $\{H,J\}=\partial_\theta H=0$ なので相互に可換です。微分は

$$
dH=\left(\kappa r-\frac{\ell^2}{r^3}\right)dr
+p_r\,dp_r+\frac{\ell}{r^2}d\ell,\qquad dJ=d\ell.
$$

$dH,dJ$ が従属となるのは、$dr$ と $dp_r$ の係数が両方零のとき、すなわち

$$
p_r=0,\qquad \kappa r^4=\ell^2.
$$

$\ell=\mu\ne0$ を固定すれば $r>0$ より

$$
r_0=\left(\frac{\mu^2}{\kappa}\right)^{1/4}.
$$

この点では $dH=(\mu/r_0^2)dJ$ となり、二つの微分は独立ではありません。他方、条件から外れた開集合では独立なので系自体のLiouville可積分性は失われません。半径は[GMECH8の円運動計算](../../GMECH/GMECH8/index.md#thm-gmech8-relative-critical)とも整合します。
<!-- solution-end -->

<a id="ex-int1-b03"></a>
**B3. 最大個数の線形代数を再構成。** $2n$ 次元シンプレクティックベクトル空間 $(V,\omega)$ に等方部分空間 $W$ がある。$\dim W=k$ なら $\dim W^\omega=2n-k$ と $k\le n$ を、$\omega^\flat$ の同型性から証明せよ。さらに $n=2$ で3本の独立な互いに可換Hamiltonベクトルが存在し得ないことを説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\omega^\flat(v)=\omega(v,\cdot)$ は非退化性により同型です。$W$ の基底 $w_1,\ldots,w_k$ を $V$ の基底 $w_1,\ldots,w_{2n}$ に延長します。消滅空間

$$
W^0=\{\lambda\in V^*:\lambda(w_i)=0,\ 1\le i\le k\}
$$

は双対基底の第 $k+1$〜第 $2n$ の成分で自由に表されるため次元 $2n-k$ です。定義より $W^\omega=(\omega^\flat)^{-1}(W^0)$ なので同じ次元です。等方性は $\omega(W,W)=0$、従って $W\subset W^\omega$ を意味します。次元を比較して $k\le2n-k$、つまり $k\le n$ を得ます。$n=2$ なら $k\le2$ なので、独立でかつ相互の $\omega$ が零になる3本は存在しません。[個数の上限定理](#thm-int1-isotropic-bound)の核心がこの次元計算です。
<!-- solution-end -->

<a id="ex-int1-b04"></a>
**B4. 結合を解いて保存量を作る。** $|\varepsilon|<1$ とし、

$$
H=\frac12(p_1^2+p_2^2+q_1^2+q_2^2)+\varepsilon q_1q_2
$$

を考える。$q_\pm=(q_1\pm q_2)/\sqrt2$、$p_\pm=(p_1\pm p_2)/\sqrt2$ に変換し、二つのPoisson可換な第一積分を構成して、その独立な領域を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** まず同じ直交行列 $A=2^{-1/2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ で $q'=Aq,p'=Ap$ と変換します。$AA^{\mathsf T}=I$ なので

$$
\sum_i dq_i\wedge dp_i
=\sum_{i,a,b}A_{ai}A_{bi}\,dq'_a\wedge dp'_b
=\sum_a dq'_a\wedge dp'_a.
$$

中辺は逆変換 $q=A^{\mathsf T}q',p=A^{\mathsf T}p'$ の成分展開を意味し、$\sum_i A_{ai}A_{bi}=\delta_{ab}$ を使っています。従って $(q_\pm,p_\pm)$ は正準座標です。また

$$
q_1^2+q_2^2=q_+^2+q_-^2,\quad
2q_1q_2=q_+^2-q_-^2,\quad
p_1^2+p_2^2=p_+^2+p_-^2.
$$

代入して

$$
H=F_++F_-,\qquad
F_\pm=\frac12\bigl(p_\pm^2+(1\pm\varepsilon)q_\pm^2\bigr).
$$

$F_\pm$ は互いに異なる正準座標対にしか依存しないため $\{F_+,F_-\}=0$、さらに $\{F_\pm,H\}=0$ です。$\omega_\pm^2=1\pm\varepsilon>0$ なので

$$
dF_\pm=p_\pm\,dp_\pm+(1\pm\varepsilon)q_\pm\,dq_\pm
$$

は各 $(q_\pm,p_\pm)\ne(0,0)$ で非零であり、支持する座標対が異なるため二つの微分は独立です。$H,F_-$ に取り替えても独立です。二つの正規モードがともに静止していない開稠密領域でLiouville可積分です。
<!-- solution-end -->

### Level C

<a id="ex-int1-c01"></a>
**C1. $n$ 自由度振動子の正則共通レベルを全て検査する。** $\omega_i>0$、$H=\sum_{i=1}^n F_i$、$F_i=(p_i^2+\omega_i^2q_i^2)/2$ とする。次を示せ。(i) $F_i$ は互いに可換で、一般の点で独立。(ii) $c_i>0$ のレベル $N_c$ は正則な $n$ 次元Lagrange部分多様体。(iii) $N_c$ を角度 $\theta_i$ により明示し、時間発展を求めよ。(iv) ある $c_i=0$ の場合と対比せよ。一般のLiouville–Arnold定理を用いずに解答すること。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) 正準座標式で $F_i$ は第 $i$ 対にしか依存しません。$i\ne j$ のとき各項に現れる微分の一方が零なので $\{F_i,F_j\}=0$、$i=j$ は反対称性で零です。また

$$
dF_i=\omega_i^2q_i\,dq_i+p_i\,dp_i.
$$

$\sum_i a_i dF_i=0$ と置くと、各座標対の係数から $a_i\omega_i^2q_i=a_ip_i=0$ です。全ての対が非零なら全て $a_i=0$、従って独立です。この集合は開稠密であり、$H,F_2,\ldots,F_n$ への入れ替えも可逆なのでLiouville可積分です。

(ii) $F_i=c_i>0$ なら $(q_i,p_i)$ は零になれません。従って $N_c$ の全点で階数 $n$ です。[正則共通レベル定理](#thm-int1-regular-fiber)を、可換性と独立性を確認したこの $F$ に適用すると、$\dim N_c=2n-n=n$、接空間を $X_{F_i}$ が張り、$\omega$ の接空間への制限は零となります。

(iii) 各二次式は一つの楕円を表します。角度 $\theta_i\in\mathbb R/(2\pi\mathbb Z)$ を用いて

$$
q_i=\frac{\sqrt{2c_i}}{\omega_i}\sin\theta_i,\qquad
p_i=\sqrt{2c_i}\cos\theta_i
$$

と置くと、直接代入により

$$
F_i=\frac12\left(2c_i\cos^2\theta_i+
2c_i\sin^2\theta_i\right)=c_i.
$$

逆に楕円上の点はこの $(\sin\theta_i,\cos\theta_i)$ を一意な円周上の角度として定めるため、$N_c$ は**この具体例では** $n$ 個の円の直積です。Hamilton方程式は $\dot q_i=p_i$、$\dot p_i=-\omega_i^2q_i$ です。先ほどの $q_i$ 表示を微分すると

$$
\dot q_i=\frac{\sqrt{2c_i}}{\omega_i}\cos\theta_i\,\dot\theta_i.
$$

一方 $p_i=\sqrt{2c_i}\cos\theta_i$ です。$\cos\theta_i\ne0$ の点では $\dot\theta_i=\omega_i$。$\cos\theta_i=0$ の点では $p_i$ を微分して

$$
\dot p_i=-\sqrt{2c_i}\sin\theta_i\,\dot\theta_i
=-\omega_i\sqrt{2c_i}\sin\theta_i
$$

から同じ結論を得ます。従って全点で $\theta_i(t)=\theta_i(0)+\omega_i t$（$2\pi$ を法として）となります。

(iv) $c_j=0$ なら非負の二次式 $F_j$ の条件から $(q_j,p_j)=(0,0)$ であり、その点で $dF_j=0$ です。よって正則性は破れ、対応する円は一点へ潰れます。正則値の場合の次元・接空間の結論を、そのまま適用することはできません。ここでは角度が定義できないことも同じ退化の現れです。
<!-- solution-end -->

## 7. 次章への問い

ここまでの議論は、独立な可換第一積分を $n$ 個持つと正則共通レベルが $n$ 次元の不変なLagrange部分多様体になる、というところで止まります。$N_c$ がコンパクトかつ連結なら、そこを走る可換Hamilton流を組み合わせてトーラスの構造が現れます。しかしその結論には、流れの完備性・軌道の推移性・離散的な周期格子の分析が残っています。これらを次章INT2で証明し、その後INT3で作用角変数を構成します。
