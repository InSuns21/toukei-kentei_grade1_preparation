# ANF5 Minkowski埋め込みと格子

[ANF3の素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)は整数環のイデアルを素因子へ分解し、[ANF4のイデアルノルム](../ANF4/index.md#def-anf4-ideal-norm)はその大きさを整数で測りました。ところが、任意のイデアルの中から、**ノルムの小さい非零元**を選べるかは、分解の一意性だけでは分かりません。

ここでは数体の元をすべての複素埋め込みで同時に眺め、整数環とイデアルを実空間の**格子**に変えます。その格子の共体積を [ANF2の判別式](../ANF2/index.md#def-anf2-field-discriminant)で表し、十分大きい対称凸体には非零格子点があることを証明します。最後に格子点をノルムの評価へ戻します。次講のイデアル類群の有限性につながる核心です。

以下、$K/\mathbb Q$ は次数 $n\geq1$ の数体、$A=\mathcal O_K$ は整数環、$D_K$ は体の判別式、$I\subseteq A$ は零でない整イデアルとします。絶対イデアルノルムは $N(I)=|A/I|$、体ノルムは $N_{K/\mathbb Q}(\alpha)$ と書き分けます。

<!-- definition-example-audit: strict -->

## 1. 数体の元を実空間に置く

[埋め込みによる跡・ノルムの公式](../ANF2/index.md#thm-anf2-embedding-formulas)では、$K\hookrightarrow\mathbb C$ の $n$ 個の埋め込みを用いました。実数に値を取るものを $r_1$ 個、それ以外を複素共役な組で $r_2$ 組に分けると

$$
n=r_1+2r_2
$$

となります。各非実の共役組から一方だけを選び、$\sigma_1,\ldots,\sigma_{r_1}$ を実埋め込み、$\tau_1,\ldots,\tau_{r_2}$ を選んだ複素埋め込みとします。

<a id="def-anf5-minkowski-embedding"></a>

<!-- formal-statement-start -->
> **定義（Minkowski埋め込み）**  
> $K/\mathbb Q$ の次数を $n=r_1+2r_2$ とする。上のように選んだ埋め込みによって定まる有理線形な単射

$$
j:K\longrightarrow\mathbb R^{r_1}\times\mathbb C^{r_2}
\cong\mathbb R^n,
\qquad
j(\alpha)=(\sigma_1(\alpha),\ldots,\sigma_{r_1}(\alpha),
\tau_1(\alpha),\ldots,\tau_{r_2}(\alpha))
$$

> を **Minkowski埋め込み**という。$\mathbb C$ の各座標は実部・虚部の二つの実座標として扱い、体ノルムは次式で表される。

$$
|N_{K/\mathbb Q}(\alpha)|
=\prod_{i=1}^{r_1}|\sigma_i(\alpha)|
 \prod_{k=1}^{r_2}|\tau_k(\alpha)|^2.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf5-minkowski-embedding -->
**定義の確認（実二次体）**：$K=\mathbb Q(\sqrt5)$ の元を $a+b\sqrt5$（$a,b\in\mathbb Q$）と書くと、二つの実埋め込みは $\sigma_\pm(a+b\sqrt5)=a\pm b\sqrt5$ です。したがって

$$
j(a+b\sqrt5)=(a+b\sqrt5,a-b\sqrt5),\qquad
N_{K/\mathbb Q}(a+b\sqrt5)=(a+b\sqrt5)(a-b\sqrt5)=a^2-5b^2.
$$

$r_1=2,r_2=0$ で $r_1+2r_2=2$ です。$j(a+b\sqrt5)=0$ なら二座標の和と差から $a=b=0$ となるので単射です。各埋め込みが有理数を固定するため、$j$ は有理線形でもあります。

**定義の確認（虚二次体）**：$K=\mathbb Q(\sqrt{-5})$ で $s=\sqrt{-5}$、$\tau(s)=i\sqrt5$ を選ぶと、$r_1=0,r_2=1$ で

$$
j(a+bs)=a+ib\sqrt5\ \longleftrightarrow\ (a,b\sqrt5)\in\mathbb R^2,
\qquad
|N_{K/\mathbb Q}(a+bs)|=|a+ib\sqrt5|^2=a^2+5b^2.
$$

ここで右側の実座標は複素数の実部・虚部であり、複素共役のもう一つの埋め込みは $\overline\tau(s)=-i\sqrt5$ です。$j(a+bs)=0$ なら実部と虚部から $a=b=0$。同様に有理線形です。従ってこの例でも単射・次数・ノルム公式をそれぞれ確認できました。
<!-- definition-example-end -->

この写像は $\mathbb Q$ 上線形です。整数基底の像が実一次独立であることは、次節の判別式を用いた行列式計算で確かめます。その像がどんな配置になるかを見るには、まず「格子の間隔」を測る必要があります。

整数ベクトルの組 $(v_1,\ldots,v_n)$ が実一次独立であれば、その整数係数結合は[全階数格子](../../NDA/NDA3/index.md#def-nda3-lattice)です。基底を列にした行列 $B$ の行列式の絶対値が、基本平行体の体積である[格子の共体積](../../NDA/NDA3/index.md#def-nda3-lattice)を与えます。[共体積の基底不変性](../../NDA/NDA3/index.md#prop-nda3-covolume-independent)は既に証明済みです。

**定義をここで使う例。** $v_1=(2,0)$、$v_2=(1,3)$ を取ると、行列式が $6\ne0$ なので実一次独立です。整数係数結合は

$$
\Lambda=\{(2a+b,3b):a,b\in\mathbb Z\}
$$

となり、半開基本平行体の面積は $6$ です。この格子の各平行移動領域は重複なく平面を覆い、座標軸に平行でなくても共体積が計算できます。

## 2. 判別式から共体積を計算する

[整数基底の存在](../ANF1/index.md#thm-anf1-integral-basis)から $A=\bigoplus_{i=1}^n\mathbb Z\omega_i$ です。非零整イデアル $I$ に $0\ne\alpha\in I$ を取り、$\alpha$ の整数係数モニック最小多項式を

$$
T^d+c_{d-1}T^{d-1}+\cdots+c_1T+c_0
$$

とします。$\alpha\ne0$ なので $c_0\ne0$ であり、この多項式へ $\alpha$ を代入すると

$$
0\ne -c_0
=\alpha\left(\alpha^{d-1}+\sum_{j=1}^{d-1}c_j\alpha^{j-1}\right)\in I.
$$

よって零でない整数 $m=|c_0|$ が $I$ に属し、

$$
mA\subseteq I\subseteq A
$$

となります。$A/mA$ は整数基底によって有限集合なので、$I$ は $A$ の有限指数の部分加群で、階数 $n$ の整数基底 $\beta_1,\ldots,\beta_n$ を持ちます。$j(\beta_i)$ が実一次独立であることは以下の判別式の行列式から従い、$j(I)$ も全階数格子になります。

<a id="thm-anf5-ideal-covolume"></a>

<!-- formal-statement-start -->
> **定理（整数環とイデアルの共体積）**  
> 次数 $n=r_1+2r_2$ の数体 $K$ の整数環を $A$、判別式を $D_K$ とする。任意の非零整イデアル $I\subseteq A$ に対し、$j(I)$ は $\mathbb R^n$ の全階数格子であり、

$$
\operatorname{covol}(j(I))
=2^{-r_2}\sqrt{|D_K|}\,N(I).
$$
<!-- formal-statement-end -->

**証明の見取り図。** 全ての複素埋め込みの行列式の二乗が [判別式](../ANF2/index.md#def-anf2-basis-discriminant)です。共役な二行を実部と虚部へ置き換えると行列式の絶対値が $2$ 分の $1$ になります。さらに $I$ は $A$ の指数 $N(I)$ の部分格子です。

<!-- proof-start -->
### 証明

整数基底 $\omega_1,\ldots,\omega_n$ に対し、$n$ 個すべての埋め込み（各 $\tau_k$ と $\overline{\tau_k}$ を含む）を $\rho_1,\ldots,\rho_n$ と書き、複素行列 $M=(\rho_i(\omega_j))_{i,j}$ を作ります。

[跡の埋め込み公式](../ANF2/index.md#thm-anf2-embedding-formulas)を $\omega_a\omega_b$ に適用すると

$$
\operatorname{Tr}_{K/\mathbb Q}(\omega_a\omega_b)
=\sum_{i=1}^n\rho_i(\omega_a)\rho_i(\omega_b).
$$

従って跡行列は $M^{\mathsf T}M$、その行列式は

$$
D_K=\det(M^{\mathsf T}M)=(\det M)^2.
$$

ここでは複素共役転置ではなく**通常の転置**を使っています。したがって $|\det M|=\sqrt{|D_K|}$ です。

非実埋め込みの各組について、行 $(\tau_k(\omega_j))_j$、$(\overline{\tau_k(\omega_j)})_j$ を実部・虚部の行に変えると、

$$
\begin{pmatrix}z\\\bar z\end{pmatrix}
=
\begin{pmatrix}1&i\\1&-i\end{pmatrix}
\begin{pmatrix}\operatorname{Re}z\\\operatorname{Im}z\end{pmatrix}
$$

です。この $2\times2$ 行列の行列式の絶対値は $2$ です。ゆえに $j(\omega_1),\ldots,j(\omega_n)$ を列とする実行列 $B$ は

$$
|\det M|=2^{r_2}|\det B|,
\qquad
\operatorname{covol}(j(A))=2^{-r_2}\sqrt{|D_K|}.
$$

最後に $I$ の整数基底 $\beta_j=\sum_i u_{ij}\omega_i$ を取り、整数行列 $U=(u_{ij})$ とします。$A/I$ の元数は、この基底行列が作る部分格子の指数に等しいので

$$
N(I)=[A:I]=|\det U|.
$$

$j(I)$ の基底行列は $BU$ であり、

$$
\operatorname{covol}(j(I))
=|\det(BU)|
=|\det B|\,|\det U|
=2^{-r_2}\sqrt{|D_K|}\,N(I).
$$

以上で、次数と複素共役の係数を含めて証明できました。
<!-- proof-end -->

### 二次体の格子を描く代わりに座標で確認する

$K=\mathbb Q(\sqrt{-5})$ と $s=\sqrt{-5}$ を取ります。[二次体の整数環](../ANF1/index.md#thm-anf1-quadratic-integers)は $A=\mathbb Z[s]$、[二次体の判別式](../ANF2/index.md#thm-anf2-quadratic-discriminant)は $D_K=-20$ です。$j(a+bs)=(a,b\sqrt5)$ と実座標で書けば、基底 $(1,0),(0,\sqrt5)$ の平行四辺形の面積は $\sqrt5$。公式も $2^{-1}\sqrt{20}=\sqrt5$ になります。

さらに $\mathfrak p=(2,1+s)$ を考えます。$a+bs\mapsto a+b\pmod2$ は $s\equiv-1\equiv1\pmod{\mathfrak p}$ という関係から得られる全射 $A\to\mathbb F_2$ で、核は $(2,1+s)=\mathfrak p$ です。したがって $A/\mathfrak p\cong\mathbb F_2$、$N(\mathfrak p)=2$。基底 $(2,1+s)$ の像は $(2,0),(1,\sqrt5)$ で、行列式の絶対値は $2\sqrt5$。公式の右辺 $2^{-1}\sqrt{20}\cdot2=2\sqrt5$ と一致します。

## 3. 体積から非零格子点を保証する

格子の共体積を計算できても、特定の集合の中に格子点があるかは分かりません。ここで [NDA3のBlichfeldt補題](../../NDA/NDA3/index.md#lem-nda3-blichfeldt)と[Minkowskiの凸体定理](../../NDA/NDA3/index.md#thm-nda3-minkowski)を利用します。二つの定理の完全な証明と等号の場合の議論はリンク先にあります。数体の元の探索に使うため、どの仮定がどこで働くかを確認しましょう。

$n$ 次元の全階数格子 $\Lambda$ と、閉・有界、内部非空、凸かつ原点対称な集合 $C$ を取ります。共体積と体積が

$$
\operatorname{vol}(C)\geq2^n\operatorname{covol}(\Lambda)
$$

を満たせば、[Minkowskiの凸体定理](../../NDA/NDA3/index.md#thm-nda3-minkowski)により $C$ 内の非零格子点が存在します。

**証明機構の確認。** 厳密不等号の場合、$S=C/2$ の体積は $\operatorname{vol}(S)=2^{-n}\operatorname{vol}(C)>\operatorname{covol}(\Lambda)$。そこで [Blichfeldt補題](../../NDA/NDA3/index.md#lem-nda3-blichfeldt)を $S$ に適用すると、異なる $x,y\in S$ が得られ、その差 $\lambda=x-y$ は非零格子点になります。$2x,2y\in C$ と原点対称性から $-2y\in C$、さらに凸性から

$$
\lambda=x-y=\frac{(2x)+(-2y)}2\in C
$$

となります。等号の場合は $(1+1/m)C$ に厳密不等号の議論を使い、共通の有界領域に格子点が有限個しかないこと、$C$ が閉じていることから極限の格子点を得ます。この有限性も[NDA3の共体積の命題](../../NDA/NDA3/index.md#prop-nda3-covolume-independent)で確認できます。

**対称性が必要な理由。** $\Lambda=\mathbb Z^2$、$C=[1/10,9/10]\times[-10,10]$ は閉・有界、凸、内部非空で面積 $16>4=2^2\operatorname{covol}(\Lambda)$ ですが、第一座標が整数になる点がなく格子点を含みません。原点対称性がないため $2y\in C$ から $-2y\in C$ と言えず、二点差を $C$ に戻す核心が壊れます。

## 4. ノルムを上から抑える凸体を作る

凸体定理を $j(I)$ に適用しても、得られるのは何らかの非零 $\alpha\in I$ です。**体ノルム**を小さくするには、実成分は絶対値一個、複素成分は絶対値二個分として数える必要があります。

$t>0$ に対して次の集合を考えます。

$$
C_t=\left\{(x_1,\ldots,x_{r_1},z_1,\ldots,z_{r_2}):
\sum_{i=1}^{r_1}|x_i|+2\sum_{k=1}^{r_2}|z_k|\leq t\right\}.
$$

これは絶対値の三角不等式から凸かつ原点対称で、閉、有界、内部も持ちます。体積を計算する際は、実成分では $u_i=|x_i|$ として正負の二側を数えます。複素成分では半径 $\rho=|z|$ の極座標で面積要素が $2\pi\rho\,d\rho$ となり、$v=2\rho$ と変数変換すると $(\pi/2)v\,dv$ になります。

<a id="lem-anf5-weighted-body-volume"></a>

<!-- formal-statement-start -->
> **補題（ノルム評価用凸体の体積）**  
> $n=r_1+2r_2\geq1$、$t>0$ とし、上記の $C_t\subset\mathbb R^{r_1}\times\mathbb C^{r_2}\cong\mathbb R^n$ の体積を実 $n$ 次元の体積として測る。このとき

$$
\operatorname{vol}(C_t)
=\frac{2^{r_1-r_2}\pi^{r_2}}{n!}\,t^n.
$$
<!-- formal-statement-end -->

**証明の見取り図。** $r_1$ 個の実変数は符号で係数 $2^{r_1}$、$r_2$ 個の複素変数は極座標で $(\pi/2)^{r_2}$ を生みます。残りは単体上の $\prod v_k$ の積分です。

<!-- proof-start -->
### 証明

上で説明した正負・極座標変換を順に適用すると

$$
\operatorname{vol}(C_t)
=2^{r_1}\left(\frac\pi2\right)^{r_2}
\int_{\substack{u_i,v_k\geq0\\\sum u_i+\sum v_k\leq t}}
v_1\cdots v_{r_2}\,
du_1\cdots du_{r_1}\,dv_1\cdots dv_{r_2}.
$$

この積分は $t^n/n!$ です。確認のため、非負整数 $a,b$ に対する公式

$$
\int_0^t s^a(t-s)^b\,ds
=\frac{a!\,b!}{(a+b+1)!}t^{a+b+1}
$$

を使います。$s=tu$ で $t$ の冪を外し、$\int_0^1u^a(1-u)^b\,du$ を部分積分すれば $a$ を一つ下げ $b$ を一つ上げる操作を $a$ 回繰り返せます。最後は $\int_0^1(1-u)^{a+b}\,du=1/(a+b+1)$ となり、表示公式を得ます。

積分を途中まで実行して、なぜ $n!$ が現れるかを確かめます。$v_1,\ldots,v_{r_2}$ を固定して $T=t-\sum_k v_k\geq0$ とおくと、$r_1$ 個の $u_i$ に関する単体の体積は $T^{r_1}/r_1!$ です（$r_1=0$ のときは $0!=1$ として同じ式）。したがって残りの積分は

$$
\frac1{r_1!}
\int_{\substack{v_k\geq0\\\sum_k v_k\leq t}}
\left(t-\sum_k v_k\right)^{r_1}
\prod_{k=1}^{r_2}v_k\,dv_1\cdots dv_{r_2}.
$$

ここで上の積分公式に $a=1,b=q\geq0$ を代入すると、$T\geq0$ に対し

$$
\int_0^T v(T-v)^q\,dv
=\frac{q!}{(q+2)!}T^{q+2}
=\frac{T^{q+2}}{(q+1)(q+2)}
$$

です。ほかの $v_k$ を固定し、一変数ずつ積分すると、初めの $1/r_1!$ は $1/(r_1+2)!$、次に $1/(r_1+4)!$ と変わり、最後は $1/(r_1+2r_2)!$ になります。積分値が $t^{r_1+2r_2}/(r_1+2r_2)!=t^n/n!$ だと確かめられました。定数を掛け戻すと

$$
2^{r_1}\left(\frac\pi2\right)^{r_2}\frac{t^n}{n!}
=\frac{2^{r_1-r_2}\pi^{r_2}}{n!}t^n
$$

です。
<!-- proof-end -->

$r_1=2,r_2=0$ なら $C_t=\{(x,y):|x|+|y|\leq t\}$ で、面積は菱形の対角線 $2t,2t$ から $2t^2$。公式も $2^2t^2/2!=2t^2$ です。$r_1=0,r_2=1$ なら $C_t=\{z:2|z|\leq t\}$ は半径 $t/2$ の円盤で、面積 $\pi t^2/4$。公式 $2^{-1}\pi t^2/2!=\pi t^2/4$ と一致します。

<a id="thm-anf5-small-norm-element"></a>

<!-- formal-statement-start -->
> **定理（Minkowskiの小ノルム元の存在）**  
> $K/\mathbb Q$ を次数 $n=r_1+2r_2$ の数体、$D_K$ を体の判別式、$I\subseteq\mathcal O_K$ を非零整イデアルとする。このとき、ある $0\ne\alpha\in I$ が存在して

$$
|N_{K/\mathbb Q}(\alpha)|
\leq M_K\,N(I),
\qquad
M_K=\frac{n!}{n^n}\left(\frac4\pi\right)^{r_2}
\sqrt{|D_K|}
$$

> を満たす。
<!-- formal-statement-end -->

**証明の見取り図。** [共体積の公式](#thm-anf5-ideal-covolume)と [凸体の体積](#lem-anf5-weighted-body-volume)を [凸体定理](../../NDA/NDA3/index.md#thm-nda3-minkowski)へ代入して $t$ を決めます。続いて、$n$ 個の非負実数への相加相乗平均を用います。

<!-- proof-start -->
### 証明

$C_t$ に [Minkowskiの凸体定理](../../NDA/NDA3/index.md#thm-nda3-minkowski)を使うため、体積条件を比較します。[イデアル格子の共体積](#thm-anf5-ideal-covolume)から必要なのは

$$
\frac{2^{r_1-r_2}\pi^{r_2}}{n!}\,t^n
\geq 2^n\,2^{-r_2}\sqrt{|D_K|}\,N(I).
$$

$n=r_1+2r_2$ を使って整理すると

$$
t^n\geq\left(\frac4\pi\right)^{r_2}
n!\sqrt{|D_K|}\,N(I).
$$

等号を満たす正の $t$ を選べば、凸体定理から $0\ne\alpha\in I$ かつ $j(\alpha)\in C_t$ が存在します。この $\alpha$ に対して

$$
\sum_{i=1}^{r_1}|\sigma_i(\alpha)|
+2\sum_{k=1}^{r_2}|\tau_k(\alpha)|\leq t.
$$

左辺は $r_1$ 個の数 $|\sigma_i(\alpha)|$ と、各複素埋め込みについて二回数えた $r_2$ 組の数 $|\tau_k(\alpha)|,|\tau_k(\alpha)|$、計 $n$ 個の非負実数の和です。相加相乗平均の不等式をこの **$n$ 個**に適用すると

$$
\left(
\prod_i|\sigma_i(\alpha)|
\prod_k|\tau_k(\alpha)|^2
\right)^{1/n}
\leq\frac{t}{n}.
$$

[体ノルムの埋め込み公式](../ANF2/index.md#thm-anf2-embedding-formulas)を左辺に代入し、$n$ 乗すると

$$
|N_{K/\mathbb Q}(\alpha)|
\leq \left(\frac tn\right)^n
=\frac{n!}{n^n}\left(\frac4\pi\right)^{r_2}
\sqrt{|D_K|}\,N(I).
$$

これで主張を得ます。
<!-- proof-end -->

### 数値の検算：虚二次体と実二次体

**$\mathbb Q(\sqrt{-5})$。** $n=2,r_2=1,D_K=-20$ なので

$$
M_K=\frac{2!}{2^2}\frac4\pi\sqrt{20}
=\frac{4\sqrt5}{\pi}\approx2.847.
$$

$I=A$ なら $\alpha=1$ のノルムは $1\leq M_K$。$I=(2,1+\sqrt{-5})$ は $N(I)=2$ で、$\alpha=2\in I$ はノルム $4$ を持ちます。実際

$$
4\leq 2M_K=\frac{8\sqrt5}{\pi}\approx5.694.
$$

**$\mathbb Q(\sqrt5)$。** $r_1=2,r_2=0,D_K=5$ なので $M_K=\sqrt5/2\approx1.118$。$I=A$ では $\alpha=1$ のノルム $1$ が評価に入ります。複素埋め込みがないので $(4/\pi)^{r_2}=1$ となることに注意します。

## 5. 次講へ：小ノルムの元から小ノルムのイデアルへ

[ANF3の可逆イデアル](../ANF3/index.md#prop-anf3-invertible-ideals)を使うと、小ノルム元の存在はイデアルの代表の探索範囲も制限します。$0\ne\alpha\in I$ を上の定理で選び、

$$
J=(\alpha)I^{-1}
$$

と置きます。$(\alpha)\subseteq I$ なので $J\subseteq II^{-1}=A$、すなわち $J$ は整イデアルです。また $IJ=(\alpha)$。非零整イデアルのノルムの乗法性は、[ANF3の素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)と[ANF4の素イデアル冪のノルム](../ANF4/index.md#lem-anf4-prime-power-norm)から確認できます。$I,J$ に現れる素イデアルを合わせて $\mathfrak p_1,\ldots,\mathfrak p_h$ とし、指数が零のものも許して $I=\prod\mathfrak p_i^{a_i}$、$J=\prod\mathfrak p_i^{b_i}$ と書きます。中国剰余定理で異なる素イデアル冪の商の大きさは積に分かれるので

$$
N(IJ)=\prod_iN(\mathfrak p_i)^{a_i+b_i}
=\left(\prod_iN(\mathfrak p_i)^{a_i}\right)
 \left(\prod_iN(\mathfrak p_i)^{b_i}\right)
=N(I)N(J).
$$

従って

$$
N(I)N(J)=N((\alpha))
=|N_{K/\mathbb Q}(\alpha)|,
\qquad N(J)\leq M_K.
$$

最後の主イデアルの等式は、$\alpha$ 倍写像を整数基底で表した整数行列の行列式が体ノルムであり、$\alpha A\subseteq A$ の指数が行列式の絶対値であることから従います。

こうして任意の $I$ に対して、$IJ$ が主イデアルとなる小ノルムの $J$ を作れました。**この $J$ が逆のイデアル類を代表すること**を次講 ANF6 で定式化し、固定された上限以下のノルムを持つ整イデアルが有限個であることと接続します。

## 6. 演習：体積・判別式・ノルムを結び直す

**Level A：定義と係数の基礎計算**

### A1. 実二次体の埋め込み

$K=\mathbb Q(\sqrt2)$ とし、$j(a+b\sqrt2)$、$r_1,r_2$ および $j(A)$ の共体積を求めよ。

- Level: A
- ID: ANF5-A1

<!-- solution-start -->
**詳細解答**　[二次体の整数環](../ANF1/index.md#thm-anf1-quadratic-integers)は $A=\mathbb Z[\sqrt2]$。埋め込みは $\sqrt2\mapsto\pm\sqrt2$ なので

$$
j(a+b\sqrt2)=(a+b\sqrt2,a-b\sqrt2),
\quad (r_1,r_2)=(2,0).
$$

基底 $1,\sqrt2$ の像は $(1,1)$、$(\sqrt2,-\sqrt2)$。その行列式の絶対値は $2\sqrt2$ です。[二次体の判別式](../ANF2/index.md#thm-anf2-quadratic-discriminant)は $D_K=8$ なので、[共体積の定理](#thm-anf5-ideal-covolume)の右辺も $\sqrt8=2\sqrt2$ となります。
<!-- solution-end -->

### A2. 複素共役組の面積

$K=\mathbb Q(\sqrt{-3})$ とし、$\omega=(1+\sqrt{-3})/2$ とする。基底 $(1,\omega)$ から $j(A)$ の共体積を直接求め、判別式 $D_K=-3$ の公式と比較せよ。

- Level: A
- ID: ANF5-A2

<!-- solution-start -->
**詳細解答**　[二次体の整数環](../ANF1/index.md#thm-anf1-quadratic-integers)より $A=\mathbb Z[\omega]$。$j(1)=(1,0)$、$j(\omega)=(1/2,\sqrt3/2)$ を実部・虚部で表します。基底行列の行列式は $\sqrt3/2$。$r_2=1$ なので [共体積の定理](#thm-anf5-ideal-covolume)は $2^{-1}\sqrt{|-3|}=\sqrt3/2$ を与えます。$2^{-r_2}$ を忘れると誤って $\sqrt3$ になります。
<!-- solution-end -->

### A3. 菱形と円盤

$t>0$ とする。$r_1=2,r_2=0$ の $C_t$ の面積と、$r_1=0,r_2=1$ の $C_t$ の面積をそれぞれ幾何的に求めよ。

- Level: A
- ID: ANF5-A3

<!-- solution-start -->
**詳細解答**　実二成分なら $|x|+|y|\leq t$ で、対角線の長さがそれぞれ $2t$ の菱形です。面積は $(2t)(2t)/2=2t^2$。複素一成分なら $2|z|\leq t$、半径 $t/2$ の円盤で面積は $\pi(t/2)^2=\pi t^2/4$。どちらも [体積公式](#lem-anf5-weighted-body-volume)へ $n=2$ を代入した値と一致します。
<!-- solution-end -->

### A4. 凸体の条件を検査する

$\Lambda=2\mathbb Z\times3\mathbb Z$、$C=[-2,2]\times[-3,3]$ とする。凸体定理のすべての仮定と体積の閾値を確認し、非零格子点を一つ挙げよ。

- Level: A
- ID: ANF5-A4

<!-- solution-start -->
**詳細解答**　基底 $(2,0),(0,3)$ は実一次独立なので $\Lambda$ は全階数格子で、共体積は $6$。$C$ は閉、有界、内部を持ち、各座標について区間の凸性と原点対称性を満たします。面積は $4\cdot6=24$ で、$2^2\operatorname{covol}(\Lambda)=4\cdot6=24$ と等しいです。[凸体定理](../../NDA/NDA3/index.md#thm-nda3-minkowski)を等号の場合で適用でき、例えば $(2,0)\in C\cap\Lambda$ は非零です。
<!-- solution-end -->

### A5. ノルム評価を数値で読む

$K=\mathbb Q(\sqrt{-5})$、$I=(2,1+\sqrt{-5})$ とする。$N(I)$ と $M_KN(I)$ を計算し、$\alpha=2$ が小ノルム評価を満たすか確かめよ。

- Level: A
- ID: ANF5-A5

<!-- solution-start -->
**詳細解答**　$A/I\cong\mathbb F_2$ だから [イデアルノルム](../ANF4/index.md#def-anf4-ideal-norm)は $N(I)=2$。$n=2,r_2=1,D_K=-20$ であり、[小ノルム定理](#thm-anf5-small-norm-element)の定数は

$$
M_K=\frac{2}{4}\frac4\pi\sqrt{20}=\frac{4\sqrt5}{\pi}.
$$

よって $M_KN(I)=8\sqrt5/\pi\approx5.694$。$2\in I$ で、二つの複素共役埋め込みの積として $N_{K/\mathbb Q}(2)=2\cdot2=4$。従って $4<5.694$ です。
<!-- solution-end -->

**Level B：証明の接続と仮定の意味**

### B1. 格子部分群の指数

$K=\mathbb Q(\sqrt5)$、$\theta=(1+\sqrt5)/2$、$A=\mathbb Z[\theta]$ とする。$I=(3)$ の格子基底を求め、共体積と $N(I)$ の関係を直接検算せよ。

- Level: B
- ID: ANF5-B1

<!-- solution-start -->
**詳細解答**　整数基底 $(1,\theta)$ の埋め込み行列を $B$ とすると

$$
B=\begin{pmatrix}1&(1+\sqrt5)/2\\1&(1-\sqrt5)/2\end{pmatrix},
\quad |\det B|=\sqrt5.
$$

$I=3A$ なので整数基底は $(3,3\theta)$、埋め込み行列は $3B$。二次元のため $|\det(3B)|=3^2|\det B|=9\sqrt5$ です。また $A/3A\cong(\mathbb Z/3\mathbb Z)^2$ から $N(I)=9$。[共体積の公式](#thm-anf5-ideal-covolume)へ $r_2=0,D_K=5,N(I)=9$ を代入しても $9\sqrt5$ になります。
<!-- solution-end -->

### B2. 体積の鳩の巣から凸体定理へ

$\Lambda\subset\mathbb R^n$ を全階数格子、$C$ をコンパクト・凸・原点対称・内部非空な集合とし、$\operatorname{vol}(C)>2^n\operatorname{covol}(\Lambda)$ とする。$S=C/2$ に体積の鳩の巣原理を適用し、差 $x-y$ が $C$ に戻る理由を式で示せ。対称性を除いたときに結論が失敗する例も挙げよ。

- Level: B
- ID: ANF5-B2

<!-- solution-start -->
**詳細解答**　$n$ 次元で半分に縮小すると体積は $2^{-n}$ 倍です。ゆえに

$$
\operatorname{vol}(S)=2^{-n}\operatorname{vol}(C)>
\operatorname{covol}(\Lambda).
$$

[体積による鳩の巣原理](../../NDA/NDA3/index.md#lem-nda3-blichfeldt)は異なる $x,y\in S$ と $x-y\in\Lambda\setminus\{0\}$ を与えます。$2x,2y\in C$、原点対称性で $-2y\in C$、凸性で $(2x-2y)/2=x-y\in C$ です。

対称性がない反例は $\Lambda=\mathbb Z^2$、$C=[1/10,9/10]\times[-10,10]$ です。$C$ はコンパクト・凸・内部非空、面積 $(8/10)\cdot20=16>2^2\cdot1$ ですが、第一座標が $1/10$ と $9/10$ の間にある整数は存在しません。証明の $-2y\in C$ が使えないのが失敗機構です。
<!-- solution-end -->

### B3. 共役二つを別々に数えない理由

$K=\mathbb Q(\sqrt{-5})$ とする。$C_t$ の体積を円盤の面積として出し、$I=A$ に凸体定理を適用するための最小の $t^2$ を求めよ。また、なぜノルムの評価では $|z|$ を二回掛けるのかを述べよ。

- Level: B
- ID: ANF5-B3

<!-- solution-start -->
**詳細解答**　$r_1=0,r_2=1$ なので $C_t=\{z:2|z|\leq t\}$ は半径 $t/2$ の円盤です。面積は $\pi t^2/4$。$I=A$ の共体積は [定理](#thm-anf5-ideal-covolume)により $2^{-1}\sqrt{20}=\sqrt5$。凸体定理の条件は

$$
\frac{\pi t^2}{4}\geq 2^2\sqrt5,
\quad\text{従って}\quad
t^2\geq\frac{16\sqrt5}{\pi}.
$$

[埋め込みによる体ノルム公式](../ANF2/index.md#thm-anf2-embedding-formulas)では非実の埋め込み $z$ とその共役 $\bar z$ が両方登場し、積は $z\bar z=|z|^2$ です。従って $|z|$ を二個の非負数として相加相乗平均に入れます。これにより $n=2$ 個の数の和 $2|z|$ と積 $|z|^2$ が対応します。
<!-- solution-end -->

### B4. 小ノルム元から整イデアルを作る

$K/\mathbb Q$ を数体、$I$ を非零整イデアル、$0\ne\alpha\in I$ とする。$J=(\alpha)I^{-1}$ が整イデアルであること、$N(J)=|N_{K/\mathbb Q}(\alpha)|/N(I)$ を示せ。$K=\mathbb Q(\sqrt{-5})$、$I=(2,1+\sqrt{-5})$、$\alpha=2$ について $J$ を求めよ。

- Level: B
- ID: ANF5-B4

<!-- solution-start -->
**詳細解答**　$\alpha\in I$ より $(\alpha)\subseteq I$ です。[可逆性](../ANF3/index.md#prop-anf3-invertible-ideals)から $I I^{-1}=A$ なので、両辺に $I^{-1}$ を掛けると $J=(\alpha)I^{-1}\subseteq A$。また $IJ=(\alpha)$ です。非零整イデアルのノルムは素イデアル分解と [素イデアル冪のノルム](../ANF4/index.md#lem-anf4-prime-power-norm)から乗法的で、主イデアルのノルムは $\alpha$ 倍行列の行列式の絶対値です。従って

$$
N(I)N(J)=N(IJ)=N((\alpha))
=|N_{K/\mathbb Q}(\alpha)|.
$$

具体例では $s^2=-5$ を用いると

$$
I^2=(4,2(1+s),(1+s)^2)=(4,2+2s,-4+2s).
$$

三つの生成元はすべて $(2)$ に属し、一方で $(2+2s)-(-4+2s)-4=2$ なので $2\in I^2$ です。従って $I^2=(2)$（[ANF4の分岐判定](../ANF4/index.md#thm-anf4-quadratic-splitting)とも整合）で、$I^{-1}=I/(2)$ となります。$\alpha=2$ なので

$$
J=(2)I^{-1}=(2)\frac{I}{(2)}=I,
\quad N(J)=2=\frac{|N_{K/\mathbb Q}(2)|}{N(I)}=\frac42.
$$
<!-- solution-end -->

**Level C：定数を自力で再構成する**

### C1. Minkowski定数の完全導出

次数 $n=r_1+2r_2$、判別式 $D_K$ の数体 $K$ と非零整イデアル $I$ に対して、次を示せ。

1. $j(I)$ の共体積を $N(I)$、$D_K$、$r_2$ で表せ。
2. $C_t$ の体積から、非零元の存在に十分な $t^n$ の条件を導け。
3. $n$ 個の非負数への相加相乗平均を適用し、$|N_{K/\mathbb Q}(\alpha)|\leq M_KN(I)$ を証明せよ。
4. $K=\mathbb Q(\sqrt{-3})$ で $M_K$ の数値と $\alpha=1$ のノルムを比較せよ。

- Level: C
- ID: ANF5-C1

<!-- solution-start -->
**詳細解答**　まず [共体積の定理](#thm-anf5-ideal-covolume)を $I$ に適用すると

$$
\operatorname{covol}(j(I))
=2^{-r_2}\sqrt{|D_K|}N(I).
$$

[体積公式](#lem-anf5-weighted-body-volume)と [凸体定理](../../NDA/NDA3/index.md#thm-nda3-minkowski)の仮定を組み合わせると

$$
\frac{2^{r_1-r_2}\pi^{r_2}}{n!}t^n
\geq 2^n\,2^{-r_2}\sqrt{|D_K|}N(I).
$$

両辺に $n!2^{-r_1+r_2}\pi^{-r_2}$ を掛け、$n-r_1=2r_2$ を用いると

$$
t^n\geq 2^{n-r_1}\pi^{-r_2}n!\sqrt{|D_K|}N(I)
=\left(\frac4\pi\right)^{r_2}n!\sqrt{|D_K|}N(I).
$$

この条件の右辺に等しい $t^n$ を選び、凸体定理から $0\ne\alpha\in I$、$j(\alpha)\in C_t$ を得ます。実埋め込みから $r_1$ 個、各非実埋め込みから同じ絶対値を二つずつ取れば、計 $n$ 個の非負数です。和は $t$ 以下、積は [体ノルム公式](../ANF2/index.md#thm-anf2-embedding-formulas)で $|N_{K/\mathbb Q}(\alpha)|$ です。相加相乗平均から

$$
|N_{K/\mathbb Q}(\alpha)|
\leq\left(\frac tn\right)^n
\leq\frac{n!}{n^n}\left(\frac4\pi\right)^{r_2}
\sqrt{|D_K|}N(I).
$$

最後に $K=\mathbb Q(\sqrt{-3})$ は $n=2,r_1=0,r_2=1,D_K=-3$ です。[二次体の判別式公式](../ANF2/index.md#thm-anf2-quadratic-discriminant)より

$$
M_K=\frac{2!}{2^2}\frac4\pi\sqrt3
=\frac{2\sqrt3}{\pi}\approx1.103.
$$

$I=A$ なら $N(I)=1$ で、$\alpha=1$ はノルム $1\leq1.103$ を満たします。実二次体の定数と取り違えず、複素埋め込み一組の $4/\pi$ を掛けることが必要です。
<!-- solution-end -->

## 7. この講義で得た道具

整数環の判別式が、幾何学的には格子の共体積を決めること、共体積と凸体の体積を比べるだけで非零格子点が保証されること、そして複素共役の重みを正確に数えると体ノルムの**明示的な上限**が得られることを示しました。

次は **ANF6「イデアル類群の有限性」**です。小ノルムの整イデアルが有限個しかないことを証明し、$\mathbb Q(\sqrt{-5})$ で主イデアルでないものを具体的に調べます。
