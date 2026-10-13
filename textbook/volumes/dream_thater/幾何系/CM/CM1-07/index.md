# CM1-07 Newlander–Nirenberg定理と証明境界

<!-- definition-example-audit: strict -->

## 1. Nijenhuisの障害が消えたら何が言えるか

[概複素構造](../CM1-03/index.md#def-cm1-03-almost-complex)は実 $2n$ 次元多様体 $M$ 上の $J^2=-I$ を満たす滑らかな自己準同型である。[型分解](../CM1-04/index.md#thm-cm1-04-splitting)で各点の接空間を二つの複素固有空間に分けられる。しかし、点ごとの分解が正則座標で同時に実現できるとは限らない。

[前章](../CM1-06/index.md#thm-cm1-06-necessity)では「正則座標があれば $N_J=0$」を証明した。その逆向きには、未知の複素座標関数を連立微分方程式の解として **構成する** 課題が残る。後述する主定理はその存在を保証する。本章では定理の仮定と結論、初等的に証明できる方向、局所解析を要する方向を分離し、形式的整合条件を計算する。

## 2. 積分可能な構造と正則関数

実座標 $x$ を持つことと、$J$ が複素数 $i$ の掛け算として見える座標を持つことは違う。$z^k=u^k+iv^k$ という未知関数について、実微分が複素線形になる条件を正確に定める。

<a id="def-cm1-07-integrable"></a>
<!-- formal-statement-start -->
> **定義（概複素構造の積分可能性）**  
> $M$ を滑らかな実 $2n$ 次元多様体、$J$ を滑らかな概複素構造とする。点 $p$ の近傍 $U$ 上に、実局所座標を与える滑らかな写像 $z=(z^1,\ldots,z^n):U\to V\subset\mathbb C^n$ が存在して

$$
dz_q(J_qX)=i\,dz_q(X)
\qquad(q\in U,\ X\in T_qM)
$$

> が成り立つとき、$z$ を $J$ に **適合する複素座標** という。各点にそのような座標が存在する場合、$J$ は **積分可能** である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-07-integrable -->
**直接例**。$\mathbb R^2$ の $J\partial_x=\partial_y$、$J\partial_y=-\partial_x$ に対し $z=x+iy$ とすると

$$
dz(J\partial_x)=i=i\,dz(\partial_x),\qquad
dz(J\partial_y)=-1=i\,dz(\partial_y).
$$

$(\operatorname{Re}z,\operatorname{Im}z)=(x,y)$ の実Jacobi行列は単位行列で可逆だから、微分条件と座標条件の両方を検証できた。
<!-- definition-example-end -->

適合座標 $z,w$ が重なるところでは、$F=w\circ z^{-1}$ の微分は連鎖律と $J\circ(dz)^{-1}=(dz)^{-1}\circ i$ によって

$$
\begin{aligned}
dF\circ i
&=dw\circ(dz)^{-1}\circ i\\
&=dw\circ J\circ(dz)^{-1}
=i\,dw\circ(dz)^{-1}=i\,dF.
\end{aligned}
$$

[多変数正則写像の複素線形微分による定義](../CM1-01/index.md#def-cm1-01-holomorphic-map)で $F$ は正則であり、逆遷移も同様である。従って適合座標群は正則アトラスを作る。

次にこの座標条件を、微分作用素の方程式として書きたい。実ベクトル場 $X$ から $Z=X+iJX$ を作ると、$J^2=-I$ により

$$
JZ=JX+iJ^2X=JX-iX=-iZ
$$

である。すなわち $Z$ は $(0,1)$ 型である。$f:U\to\mathbb C$ に対し

$$
Zf=df(X)+i\,df(JX)=0
\quad\Longleftrightarrow\quad
df(JX)=i\,df(X)
$$

が成り立つ。最後は $1/i=-i$ を使って両辺を解き直した。

<a id="def-cm1-07-j-holomorphic-functions"></a>
<!-- formal-statement-start -->
> **定義（J正則関数）**  
> 開集合 $U\subset M$ 上の滑らかな複素数値関数 $f$ が、任意の滑らかな $(0,1)$ 型局所ベクトル場 $Z$ に対して $Zf=0$ を満たすとき、$f$ を $J$ 正則関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-07-j-holomorphic-functions -->
**直接例**。標準 $\mathbb C^2$ では $(0,1)$ 型の枠が $\partial_{\bar w^1},\partial_{\bar w^2}$ である。$f=(w^1)^2+w^2$ はどちらで微分しても零で、任意の関数係数の線形結合でも零だから $J$ 正則である。
<!-- definition-example-end -->

<a id="prop-cm1-07-coordinate-criterion"></a>
<!-- formal-statement-start -->
> **命題（適合座標の関数による判定）**  
> $M$ と $J$ を上記のとおりとする。滑らかな複素数値関数 $z^1,\ldots,z^n$ が $J$ に適合する局所座標を与えるための必要十分条件は、各 $z^k$ が $J$ 正則であり、かつその実部と虚部の $2n$ 個の実関数のJacobi行列が可逆であることである。十分性の局所座標は必要なら定義域を縮めて取る。
<!-- formal-statement-end -->

### 証明の見取り図

関数の方程式を $dz\circ J=i\,dz$ へ戻す。逆関数定理による可逆性の確認も必要であり、方程式を満たす定数関数だけでは座標にならない。

<!-- proof-start -->
### 証明

適合座標なら全 $X,k$ に対し $dz^k(JX)=i\,dz^k(X)$ が成立する。$Z=X+iJX$ と置くと

$$
Zz^k=dz^k(X)+i\,dz^k(JX)
=dz^k(X)+i^2dz^k(X)=0.
$$

従って各 $z^k$ は $J$ 正則。座標の実Jacobi行列は定義上可逆である。

逆に各 $z^k$ が $J$ 正則なら、同じ $Z$ を代入して

$$
0=Zz^k=dz^k(X)+i\,dz^k(JX)
$$

を得る。$i\,dz^k(JX)=-dz^k(X)$ の両辺を $i$ で割ると $dz^k(JX)=i\,dz^k(X)$ となる。これが各成分について成立するので $dz\circ J=i\,dz$。さらに実Jacobi行列が可逆な点では実逆関数定理を適用し、近傍を縮めると $z$ が滑らかな実局所座標を与える。$\square$
<!-- proof-end -->

## 3. Newlander–Nirenberg定理

前章の符号規約による[Nijenhuisテンソル](../CM1-06/index.md#def-cm1-06-nijenhuis)は

$$
N_J(X,Y)=[JX,JY]-J[JX,Y]-J[X,JY]-[X,Y].
$$

これは $J$ の一階微分で計算できる。零であるかどうかを調べるだけで、未知の複素座標の存在を判定できるのが定理の力である。

<a id="thm-cm1-07-newlander-nirenberg"></a>
<!-- formal-statement-start -->
> **定理（Newlander–Nirenberg定理）**  
> $M$ を $C^\infty$ 実 $2n$ 次元多様体、$J$ を $C^\infty$ な概複素構造とする。次の三条件は同値である。
>
> 1. $J$ は積分可能であり、各点近傍に滑らかな $J$ 適合複素座標がある。
> 2. $N_J$ は恒等的に零である。
> 3. $T^{0,1}M$ の滑らかな局所切断のLie括弧は再び $T^{0,1}M$ に属する。
>
> 条件3は $T^{1,0}M$ の交換子閉性に置き換えてもよい。
<!-- formal-statement-end -->

### 証明の見取り図と扱う範囲

**1 $\Rightarrow$ 2** は[前章の必要条件の定理](../CM1-06/index.md#thm-cm1-06-necessity)で証明済みである。**2 $\Leftrightarrow$ 3** は[前章の型別交換子の定理](../CM1-06/index.md#thm-cm1-06-bracket-characterization)で証明済みであり、$(0,1)$ 型の $Z,W$ に対して $N_J(Z,W)=-4P^{1,0}[Z,W]$ を使う。

**3 $\Rightarrow$ 1** はこの定理の核心となる解析的存在結果である。一般次元について本章では完全証明しない。整合条件と解くべき偏微分方程式は次節で示すが、それだけでは非退化な局所解の存在を証明できない。この方向を利用する際は **Newlander–Nirenberg定理による結果先行** と明記する。

なお定理が保証するのは **各点の近傍** の複素座標であって、多様体全体を覆う単一の $\mathbb C^n$ 座標ではない。$C^\infty$ という仮定も勝手に落とさない。

## 4. 座標を構成する際の一次方程式

点 $p$ で $J_p$ が標準形となるように実線形座標 $w^1,\ldots,w^n$ を取る。近傍を十分小さくすると、$T^{0,1}M$ は標準の $(0,1)$ 型方向への射影で同型になるので、滑らかな局所枠は

$$
Z_j=\partial_{\bar w^j}+
\sum_{k=1}^n a_j^k(w,\bar w)\partial_{w^k},
\qquad a_j^k(p)=0
$$

と表せる。$w$ は与えられた実座標から作った補助座標であり、まだ $J$ 適合とは仮定しない。

[関数による判定](#prop-cm1-07-coordinate-criterion)により、求めるべき座標関数 $z^\alpha$ は

$$
Z_jz^\alpha=
\partial_{\bar w^j}z^\alpha
+\sum_k a_j^k\partial_{w^k}z^\alpha=0
$$

をすべての $j,\alpha$ について満たし、その実Jacobi行列が可逆でなければならない。

<a id="prop-cm1-07-compatibility"></a>
<!-- formal-statement-start -->
> **命題（局所一次方程式の交換子整合条件）**  
> 上記の局所枠では

$$
[Z_i,Z_j]=\sum_kF_{ij}^k\partial_{w^k}
$$

> となり、その係数は

$$
F_{ij}^k=
\partial_{\bar w^i}a_j^k-\partial_{\bar w^j}a_i^k+
\sum_\ell
\left(a_i^\ell\partial_{w^\ell}a_j^k-a_j^\ell\partial_{w^\ell}a_i^k\right).
$$

> $T^{0,1}M$ が交換子で閉じているための必要十分条件は $F_{ij}^k=0$ がすべての添字で成立することである。
<!-- formal-statement-end -->

### 証明の見取り図

[Lie括弧の座標公式](../../GEO/GEO5/index.md#thm-geo5-bracket-coordinate)を $Z_i,Z_j$ へ適用する。$\partial_{\bar w}$ 成分は定数なので微分されない。閉性によって括弧が $Z_k$ の和と表せるなら、$\partial_{\bar w}$ 成分の比較で係数がすべて零となる。

<!-- proof-start -->
### 証明

座標偏微分の交換子は零なので、$\partial_{w^k}$ 成分だけを求めればよい。

$$
\begin{aligned}
Z_i(a_j^k)&=\partial_{\bar w^i}a_j^k+
\sum_\ell a_i^\ell\partial_{w^\ell}a_j^k,\\
Z_j(a_i^k)&=\partial_{\bar w^j}a_i^k+
\sum_\ell a_j^\ell\partial_{w^\ell}a_i^k.
\end{aligned}
$$

差を取ると指定した $F_{ij}^k$ となる。$Z_i$ の $\partial_{\bar w^m}$ 係数は $\delta_{im}$ なので、その導関数は零。ゆえに括弧は $\partial_{\bar w}$ 成分を持たない。

閉性があれば $[Z_i,Z_j]=\sum_m c^m Z_m$ と表せる。$\partial_{\bar w^m}$ の係数を比較して $c^m=0$、従って全 $F_{ij}^k=0$。逆に全 $F$ が零なら $[Z_i,Z_j]=0$。任意の局所切断は $Z_j$ の関数係数線形結合なので、[括弧の積の微分則](../../GEO/GEO5/index.md#def-geo5-lie-bracket)よりその交換子も同じ枠の張る部分束に入る。$\square$
<!-- proof-end -->

**必要条件と存在は別**。$Z_jz^\alpha=0$ を仮定すれば $[Z_i,Z_j]z^\alpha=Z_i(0)-Z_j(0)=0$ という整合式が従う。しかし $F_{ij}^k=0$ という形式的条件だけを計算した段階では、実Jacobi行列が可逆な $n$ 個の解をまだ作れていない。一般次元の解の存在は[Newlander–Nirenberg定理](#thm-cm1-07-newlander-nirenberg)の深い方向である。

### 明示的に座標が求められる場合

$\mathbb C^2$ の補助座標 $w$ で $\varepsilon\in\mathbb C$ を固定し

$$
z^1=w^1+\varepsilon\bar w^2,\qquad z^2=w^2
$$

と置く。逆変換は $w^2=z^2,\ w^1=z^1-\varepsilon\bar z^2$ だから、実局所座標として可逆である。$J$ を $z$ 座標で標準になるように定めると、その $(0,1)$ 型枠は

$$
Z_1=\partial_{\bar w^1},\qquad
Z_2=\partial_{\bar w^2}-\varepsilon\partial_{w^1}
$$

となる。実際 $Z_2z^1=\varepsilon-\varepsilon=0$、$Z_2z^2=0$、$Z_1z^1=Z_1z^2=0$ である。係数は定数なので $[Z_1,Z_2]=0$。補助座標で $a_2^1=-\varepsilon\ne0$ でも $J$ は積分可能になり得る。

## 5. 複素次元一では障害が自動的に消える

複素次元 $n=1$ の $(0,1)$ 型部分束は複素一次元である。局所枠 $Z$ に対し任意の二切断は $fZ,gZ$ と表せるので

$$
[fZ,gZ]=fg[Z,Z]+f(Zg)Z-g(Zf)Z=(fZg-gZf)Z.
$$

右辺は再び $(0,1)$ 型である。[型別交換子の同値](../CM1-06/index.md#thm-cm1-06-bracket-characterization)より $N_J=0$ は初等計算だけから分かる。

<a id="cor-cm1-07-complex-dimension-one"></a>
<!-- formal-statement-start -->
> **系（実二次元の概複素構造は積分可能）**  
> 滑らかな実二次元多様体 $M$ の任意の滑らかな概複素構造 $J$ は積分可能である。
<!-- formal-statement-end -->

### 証明の見取り図

一次元の交換子計算から閉性を得る。そこから座標が存在するという結論に至る最後の一歩では、[Newlander–Nirenberg定理](#thm-cm1-07-newlander-nirenberg)の十分性を明示的に使う。

<!-- proof-start -->
### 証明

任意の点の近傍で上記の局所枠 $Z$ を取れば、任意の二切断の交換子は $(fZg-gZf)Z$ である。従って $T^{0,1}M$ は括弧で閉じ、[前章の同値](../CM1-06/index.md#thm-cm1-06-bracket-characterization)より $N_J=0$。ここに[Newlander–Nirenberg定理](#thm-cm1-07-newlander-nirenberg)を適用すると、各点の近傍に $J$ 適合複素座標が存在する。$\square$
<!-- proof-end -->

この系では **$N_J=0$ の証明** と **座標の存在の証明** を混同しない。一般存在定理を使わずに系全体を証明したとは言えない。

## 6. 定理を使うときの三つの判断

正則アトラスが先にあれば、[前章の必要条件](../CM1-06/index.md#thm-cm1-06-necessity)だけで $N_J=0$ と分かる。逆に滑らかな $J$ が与えられたら、[局所成分公式](../CM1-06/index.md#thm-cm1-06-components)や[型別交換子の定理](../CM1-06/index.md#thm-cm1-06-bracket-characterization)によって $N_J$ を判定し、消滅したときだけNewlander–Nirenberg定理の十分性を利用する。一点でも $N_J\ne0$ なら、その点を含む適合座標は存在しない。

最後に、局所適合座標の存在は多様体全体で一つの座標が存在することとは異なる。$\mathbb C^n$ への大域的な同一視や座標の具体式を、この定理だけで保証したことにしない。

## 7. 演習

全問で初めに与えられた $J$・座標・正則性の条件を確定し、必要なら[Newlander–Nirenberg定理](#thm-cm1-07-newlander-nirenberg)を使った箇所を区別する。

### Level A

<a id="ex-cm1-07-a01"></a>
#### CM1-07-A01 適合座標を定義から確認
- Level: A

標準 $\mathbb R^2$ で $J\partial_x=\partial_y,\ J\partial_y=-\partial_x$ とし、$z=x+iy$ が適合座標であることを示せ。

<!-- solution-start -->
**詳細解答**。$dz(\partial_x)=1,\ dz(\partial_y)=i$ より

$$
dz(J\partial_x)=i=i\,dz(\partial_x),\quad
dz(J\partial_y)=-1=i\,dz(\partial_y).
$$

実部・虚部は $(x,y)$ で、実Jacobi行列は $\begin{pmatrix}1&0\\0&1\end{pmatrix}$、行列式は $1$。微分条件と実座標の非退化性がともに成り立つ。
<!-- solution-end -->

<a id="ex-cm1-07-a02"></a>
#### CM1-07-A02 J正則性の二表現
- Level: A

$Z=X+iJX$ としたとき、$Zf=0$ と $df(JX)=i\,df(X)$ の同値を証明せよ。

<!-- solution-start -->
**詳細解答**。$JZ=JX+iJ^2X=JX-iX=-iZ$ だから $Z$ は $(0,1)$ 型。微分作用を展開すると $Zf=df(X)+i\,df(JX)$。零と置けば $i\,df(JX)=-df(X)$、よって $df(JX)=i\,df(X)$。逆にこの等式を代入すれば $Zf=df(X)+i^2df(X)=0$。
<!-- solution-end -->

<a id="ex-cm1-07-a03"></a>
#### CM1-07-A03 方程式だけで足りない例
- Level: A

$z^1=\cdots=z^n=0$ がすべての $Z_jz^\alpha=0$ を満たすことと、座標にならないことを説明せよ。

<!-- solution-start -->
**詳細解答**。ベクトル場による定数の方向微分は常に零。しかし $(\operatorname{Re}z^1,\operatorname{Im}z^1,\ldots)$ の全偏微分係数は零であり、$2n\times2n$ のJacobi行列が零行列となる。行列式は $0$ なので[座標判定](#prop-cm1-07-coordinate-criterion)の非退化条件に反する。
<!-- solution-end -->

<a id="ex-cm1-07-a04"></a>
#### CM1-07-A04 交換子を直接計算
- Level: A

$Z_1=\partial_{\bar w^1}$、$Z_2=\partial_{\bar w^2}+h(w,\bar w)\partial_{w^1}$ の交換子を求めよ。

<!-- solution-start -->
**詳細解答**。[括弧の積の微分則](../../GEO/GEO5/index.md#def-geo5-lie-bracket)を使うと

$$
\begin{aligned}
[Z_1,Z_2]
&=[\partial_{\bar w^1},\partial_{\bar w^2}]
+[\partial_{\bar w^1},h\partial_{w^1}]\\
&=0+(\partial_{\bar w^1}h)\partial_{w^1}
+h[\partial_{\bar w^1},\partial_{w^1}]\\
&=(\partial_{\bar w^1}h)\partial_{w^1}.
\end{aligned}
$$

座標偏微分同士の交換子は零である。
<!-- solution-end -->

<a id="ex-cm1-07-a05"></a>
#### CM1-07-A05 どちらの含意を使用するか
- Level: A

滑らかな $J$ に $N_J=0$ が成立した。定理から何が得られ、何が得られないか一つずつ述べよ。

<!-- solution-start -->
**詳細解答**。[Newlander–Nirenberg定理](#thm-cm1-07-newlander-nirenberg)の十分性より、各点の近傍に $J$ 適合複素座標が存在する。しかし定理は局所存在を述べるだけで、$M$ 全体を一組の $\mathbb C^n$ 座標で覆えるとは言わない。また具体的な座標関数の式を与えない。
<!-- solution-end -->

### Level B

<a id="ex-cm1-07-b01"></a>
#### CM1-07-B01 適合座標の遷移写像
- Level: B

同じ $J$ に適合する二座標 $z,w$ について $F=w\circ z^{-1}$ が正則であることを証明せよ。

<!-- solution-start -->
**詳細解答**。$dz\circ J=i\,dz$、$dw\circ J=i\,dw$ を使い、前者を $J(dz)^{-1}=(dz)^{-1}i$ と書き直す。連鎖律により

$$
dF\,i=dw(dz)^{-1}i=dw\,J(dz)^{-1}
=i\,dw(dz)^{-1}=i\,dF.
$$

従って実微分が複素線形であり、[多変数正則性の判定](../CM1-01/index.md#def-cm1-01-holomorphic-map)から正則。逆座標も適合するため、その遷移も正則である。
<!-- solution-end -->

<a id="ex-cm1-07-b02"></a>
#### CM1-07-B02 一次方程式の整合性を導く
- Level: B

$Z_jz^\alpha=0$ を仮定して $[Z_i,Z_j]z^\alpha=0$ を示せ。なぜこれだけでは解の局所存在の証明にならないか。

<!-- solution-start -->
**詳細解答**。[Lie括弧の定義](../../GEO/GEO5/index.md#def-geo5-lie-bracket)を適用し、

$$
[Z_i,Z_j]z^\alpha=Z_i(Z_jz^\alpha)-Z_j(Z_iz^\alpha)
=Z_i(0)-Z_j(0)=0.
$$

[成分公式](#prop-cm1-07-compatibility)で書けば $\sum_kF_{ij}^k\partial_{w^k}z^\alpha=0$。$F=0$ ならこの式は満たされるが、実Jacobi行列が可逆な $n$ 個の解が構成されたことにはならない。局所解の存在には[Newlander–Nirenberg定理](#thm-cm1-07-newlander-nirenberg)の十分性を使う。
<!-- solution-end -->

<a id="ex-cm1-07-b03"></a>
#### CM1-07-B03 可積分な非標準局所枠
- Level: B

$z^1=w^1+\varepsilon\bar w^2,\ z^2=w^2$ の逆変換を求め、$Z_1=\partial_{\bar w^1},\ Z_2=\partial_{\bar w^2}-\varepsilon\partial_{w^1}$ が $z^1,z^2$ を消すことを確認せよ。

<!-- solution-start -->
**詳細解答**。$w^2=z^2$ と $\bar w^2=\bar z^2$ を第一式に代入すれば $w^1=z^1-\varepsilon\bar z^2$。従って実座標として可逆。さらに

$$
\begin{aligned}
Z_1z^1&=0,&Z_1z^2&=0,\\
Z_2z^1&=\varepsilon-\varepsilon\cdot1=0,
&Z_2z^2&=0.
\end{aligned}
$$

両場は定数係数なので $[Z_1,Z_2]=0$。[座標判定](#prop-cm1-07-coordinate-criterion)から $z$ がこの枠の定める $J$ の適合座標となる。
<!-- solution-end -->

<a id="ex-cm1-07-b04"></a>
#### CM1-07-B04 複素次元一での自動閉性
- Level: B

複素一次元の局所枠を $Z$ とする。任意の複素関数 $f,g$ について $[fZ,gZ]$ を導出し、局所座標の存在に必要となる定理を特定せよ。

<!-- solution-start -->
**詳細解答**。積の微分則と $[Z,Z]=0$ から

$$
[fZ,gZ]=fg[Z,Z]+f(Zg)Z-g(Zf)Z=(fZg-gZf)Z.
$$

右辺は $(0,1)$ 型で、[前章の同値](../CM1-06/index.md#thm-cm1-06-bracket-characterization)から $N_J=0$。そこから適合座標の存在を言うには[Newlander–Nirenberg定理](#thm-cm1-07-newlander-nirenberg)の十分性を使う。
<!-- solution-end -->

### Level C

<a id="ex-cm1-07-c01"></a>
#### CM1-07-C01 非可積分な局所枠を構成
- Level: C

原点付近の $\mathbb C^2$ 上で $\lambda\in\mathbb C$ を固定し、

$$
Z_1=\partial_{\bar w^1},\qquad
Z_2=\partial_{\bar w^2}+\lambda\bar w^1\partial_{w^1}
$$

を考える。小さな近傍で $T^{0,1}$ として実概複素構造 $J$ を定められることを説明し、$N_J(Z_1,Z_2)$ の原点での値を求め、$\lambda\ne0$ の場合に適合座標がないことを示せ。$\lambda=0$ の場合も述べよ。

<!-- solution-start -->
**詳細解答**。原点では $Z_1=\partial_{\bar w^1}, Z_2=\partial_{\bar w^2}$、その共役は $\partial_{w^1},\partial_{w^2}$ である。四本は複素化接空間の基底をなし、基底行列の行列式は原点で非零。連続性から十分小さい近傍でも $D=\operatorname{span}_{\mathbb C}\{Z_1,Z_2\}$ と $\bar D$ は直和で全接空間を張る。$J=-i$ を $D$ に、$J=i$ を $\bar D$ に作用させれば共役と可換で実接束を保ち、$J^2=-I$ となる。

座標偏微分の交換子は零で、$\partial_{\bar w^1}(\lambda\bar w^1)=\lambda$ だから

$$
[Z_1,Z_2]
=[\partial_{\bar w^1},\lambda\bar w^1\partial_{w^1}]
=\lambda\partial_{w^1}.
$$

原点で $\partial_{w^1}$ は $(1,0)$ 型。従って[Nijenhuis消滅と型別交換子閉性](../CM1-06/index.md#thm-cm1-06-bracket-characterization)を適用すると

$$
N_J(Z_1,Z_2)|_0=-4P^{1,0}_0[Z_1,Z_2]|_0
=-4\lambda\,\partial_{w^1}|_0.
$$

$\lambda\ne0$ なら $N_J$ は原点で非零。[正則アトラスからの必要条件](../CM1-06/index.md#thm-cm1-06-necessity)の対偶から、原点近傍に $J$ 適合座標は存在しない。$\lambda=0$ なら標準 $(0,1)$ 枠となり $z=w$ が適合座標である。$\square$
<!-- solution-end -->

## 8. 次章への橋渡し

本章で **直接証明した** のは適合座標の判定、交換子整合条件、複素次元一での閉性と具体例の判別である。一般次元の $N_J=0$ から座標の存在を導く解析的核心は **結果先行** であり、未証明部分を計算例で代用していない。次章ではこの区別を保ったまま、積分可能・非積分可能な構造をさらに計算する。
