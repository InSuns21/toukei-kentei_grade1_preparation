# QFT54 OPE・大域共形ブロックと四点関数の交差対称性

<!-- definition-example-audit: strict -->

QFT53では自由bosonと自由Majoranaの二点関数から四点相関を作りました。しかし相互作用のある理論では、一般にWick対合だけでは四点を計算できません。そこで、**近い二点を一つの局所場の和として展開し、遠くの二点との相関を再構成する**方法を考えます。

舞台は二次元Euclid平面の正則部分です。正則座標を $z$ とし、互いに異なる挿入点を扱います。自由bosonの電流 $a(z)$ はウェイト $h=1$、二点関数 $\langle a(z)a(w)\rangle=(z-w)^{-2}$、応力テンソル $t=\tfrac12:\!a^2\!:$、中心電荷 $c=1$ という [QFT51の規格化](../QFT51/index.md#def-qft51-wick-stress) に従います。[QFT53の四点Wick対合](../QFT53/index.md#prop-qft53-four-point) と [QFT52の放射量子化](../QFT52/index.md#def-qft52-radial-state) を既習とします。一般の局所場では反正則部分も必要であり、正則部分だけの解析接続を完全な局所理論と同一視しません。

以降 $\partial=\partial_z$ は $\bar z$ を固定した[正則方向のWirtinger微分](../QFT50/index.md#def-qft50-wirtinger)で、$\partial^n\mathcal O(w)=\partial_w^n\mathcal O(w)$ と書きます。$s=z-w$ は二挿入点の複素変位です。$O(s^k)$ は他の挿入点を衝突させず固定した相関関数内での、$s\to0$ の剰余を表します。

## 1. 近い二点を展開するOPE

普通のTaylor展開は $a(z)a(w)$ のように $z\to w$ で発散する場の積には直接使えません。まず二点収縮の特異な $1/(z-w)^2$ を分離してから残りを展開します。この局所的な分解が演算子積展開（OPE）です。

位置 $w$ を中心とする円内に他の挿入点がなく、$z$ がその円内にある場合を考えます。相関関数内で場の積を $w$ の局所場と導関数の和に展開します。ただし一般のOPEが収束するか、形式的な漸近展開なのかは、状態空間と理論の仮定によって決まります。

以下の $p$ は展開に現れる局所場の種類、$n\in\mathbb N_0$ はその正則方向の微分の階数、$C_{AB}^{p,n}$ は展開係数を表します。ウェイトを合わせると各項の $(z-w)$ の指数は $h_p+n-h_A-h_B$ です。

<a id="def-qft54-ope"></a>

<!-- formal-statement-start -->
> **定義（相関関数内の演算子積展開）**  
> 正則場 $A,B$ のウェイトを $h_A,h_B$ とし、局所場 $\mathcal O_p$ のウェイトを $h_p$ とする。他の挿入 $\mathcal X$ から孤立した $z,w$ に対して
>
$$
\langle A(z)B(w)\mathcal X\rangle
=\sum_p\sum_{n\ge0}C_{AB}^{p,n}(z-w)^{h_p-h_A-h_B+n}
\langle\partial^n\mathcal O_p(w)\mathcal X\rangle
$$
>
> と書ける展開をOPEという。等号は収束が保証された相関関数内の等式、または指定次数までの漸近的関係を意味する。場の点ごとの有界作用素積や、無条件の収束を意味しない。
<!-- formal-statement-end -->

<a id="prop-qft54-current-ope"></a>

<!-- formal-statement-start -->
> **命題（自由電流の局所OPE）**  
> 正則Gaussian電流 $a$ を次のように点分離で正規順序化し、応力テンソル $t$ を定める。
>
$$
:\!a(z)a(w)\!:=a(z)a(w)-(z-w)^{-2},\qquad
t=\tfrac12:\!a^2\!:.
$$
>
> 他の挿入点が衝突しない領域の相関関数内で
>
$$
a(w+s)a(w)=s^{-2}+2t(w)+s\,\partial t(w)+O(s^2).
$$
<!-- formal-statement-end -->

### 証明の見取り図

特異な二点収縮を引けば正規順序積になり、第1因子をTaylor展開できます。その定数項と一次項を応力テンソルで書き直します。

<!-- proof-start -->
### 証明

[点分離正規順序と量子応力テンソル](../QFT51/index.md#def-qft51-wick-stress) の定義より

$$
a(w+s)a(w)=s^{-2}+:\!a(w+s)a(w)\!:.
$$

正規順序積の第1因子を展開すると

$$
:\!a(w+s)a(w)\!:
=:\!a(w)^2\!:+s:\!(\partial a(w))a(w)\!:
+\frac{s^2}{2}:\!(\partial^2a(w))a(w)\!:+\cdots.
$$

偶場なので $:\!(\partial a)a\!:=:\!a\partial a\!:$。積の微分から $\partial t=\tfrac12(:\!(\partial a)a\!:+:\!a\partial a\!:)=:\!(\partial a)a\!:$ です。さらに $:\!a^2\!:=2t$ なので所望の係数が出ます。
<!-- proof-end -->

<!-- definition-example-start: def-qft54-ope -->
**定義の確認**：単位演算子 $\mathbf1$ はウェイト0なので $s^{0-1-1}=s^{-2}$、応力テンソルはウェイト2なので $s^{2-1-1}=s^0$、その微分は $s^1$ に現れます。さらに $u,v$ を $w$ から離して固定し、$B(u,v)=(u-v)^{-2}$ と書きます。[QFT53のWick対合](../QFT53/index.md#prop-qft53-four-point)の二つの交差項は

$$
B(w+s,u)B(w,v)+B(w+s,v)B(w,u)
\xrightarrow[s\to0]{}2B(w,u)B(w,v).
$$

これは[点分離正規順序](../QFT51/index.md#def-qft51-wick-stress)から計算した $\langle2t(w)a(u)a(v)\rangle$ と一致します。したがって相関関数内の特異項・定数項をともに確認できました。なお無限和を勝手に作用素ノルム収束と読むことはできません。
<!-- definition-example-end -->

## 2. 四点関数の変数と二つのチャネル

[QFT48の実Euclid交差比](../QFT48/index.md#def-qft48-conformal-cross-ratios)は距離の二乗で定義されました。二次元の**正則**四点では、まず $z_{ij}=z_i-z_j$ と置き、複素交差比

$$
\chi=\frac{z_{12}z_{34}}{z_{13}z_{24}}
$$

を使います。[CA6で定義したMöbius変換](../../../解析系/CA/CA6/index.md#def-ca6-mobius-transformation) $f(z)=(az+b)/(cz+d)$（$ad-bc\ne0$）では

$$
f(z_i)-f(z_j)
=\frac{(ad-bc)z_{ij}}{(cz_i+d)(cz_j+d)}
$$

となるため、四つの点に依存する倍率が分子・分母で消え、$\chi$ は不変です。この変換で相異なる三点を $0,1,\infty$ に送れます。QFT48の実距離交差比との対応は $u=|\chi|^2$、$v=|1-\chi|^2$ ですが、**$d\ge3$ の定理を正則場へそのまま適用しているわけではありません**。正則一次場 $\phi$ の無限遠挿入は、ウェイト $h$ に対して $\phi(\infty)=\lim_{R\to\infty}R^{2h}\phi(R)$ と規格化します（実配置では $R\to+\infty$ とし、複素配置では冪の枝を固定します）。

<a id="def-qft54-reduced-four-point"></a>

<!-- formal-statement-start -->
> **定義（縮約四点関数とOPEチャネル）**  
> 同一の正則boson一次場 $\phi$（ウェイト $h$）の四点関数を $0,x,1,\infty$ で
>
$$
F(x)=\langle\phi(\infty)\phi(1)\phi(x)\phi(0)\rangle,
\qquad \mathcal G(x)=x^{2h}F(x)
$$
>
> と置く。$x\to0$ の $\phi(x)\phi(0)$ のOPEを **$s$ チャネル**、$x\to1$ の $\phi(x)\phi(1)$ のOPEを **$t$ チャネル**と呼ぶ。以下での実配置は $0<x<1$ とする。複素配置で枝を持つ場合は解析接続の経路も指定する。
<!-- formal-statement-end -->

自由電流 $a$ なら $h=1$。[QFT53のboson四点Wick則](../QFT53/index.md#prop-qft53-four-point) の三対合を、各々 $R\to\infty$ まで計算します。

$$
\begin{aligned}
F_a(x)&=\lim_{R\to\infty}R^2\left[
\frac1{(R-1)^2x^2}+\frac1{(R-x)^2}
+\frac1{R^2(1-x)^2}\right]\\
&=\frac1{x^2}+1+\frac1{(1-x)^2},\\
\mathcal G_a(x)&=1+x^2+\frac{x^2}{(1-x)^2}.
\end{aligned}
$$

最後の式を $|x|<1$ で展開すると

$$
\mathcal G_a(x)=1+2x^2+2x^3+3x^4+4x^5+\cdots.
$$

最初の1は $a(x)a(0)$ の単位OPE項に対応し、次の係数は応力テンソルなどの局所場に対応します。反対に $x\to1$ では $(1-x)^{-2}$ が特異項です。同じ四点を二通りの近接関係から展開するのが、この章の中心課題です。

<!-- definition-example-start: def-qft54-reduced-four-point -->
**定義の確認**：四点 $z_1=0,z_2=x,z_3=1,z_4=R$ に上の差 $z_{ij}$ を代入すると

$$
\chi=\frac{(-x)(1-R)}{(-1)(x-R)}
=\frac{x(R-1)}{R-x}\xrightarrow[R\to\infty]{}x.
$$

自由電流では無限遠の係数 $R^{2h}=R^2$ を掛けることで三対合が有限な $x^{-2},1,(1-x)^{-2}$ に移ります。$x\to0$ で前者が支配的、$x\to1$ で最後が支配的なので、二つのチャネルのどの二点が近いかも実際に判定できます。
<!-- definition-example-end -->

## 3. 微分子孫を束ねる大域共形ブロック

[QFT52の一次場と子孫](../QFT52/index.md#def-qft52-primary-descendant) では、$L_{-1}$ が $z$ 方向の導関数を作りました。ここではそのうち**大域共形代数** $L_{-1},L_0,L_1$ だけを使います。$L_0|p\rangle=h_p|p\rangle$ と $L_1|p\rangle=0$ を満たす場を「大域一次場（準一次場）」と呼び、その全微分 $L_{-1}^n|p\rangle$ をまとめたものが**大域共形ブロック**です。これはすべての正モードで消えるVirasoro一次場より弱い条件で、$L_{-2}$ なども含むVirasoroブロックとは異なります。

例えば $t$ の状態は $|t\rangle=L_{-2}|0\rangle$ です。[Virasoro交換子](../QFT51/index.md#thm-qft51-virasoro)と[真空の $L_{-1}$ 消滅](../QFT52/index.md#prop-qft52-sugawara-levels)から

$$
L_1|t\rangle=[L_1,L_{-2}]|0\rangle
=3L_{-1}|0\rangle=0
$$

となり、$t$ はウェイト2の大域一次場です。しかし中心電荷が非零なら $L_2|t\rangle=c|0\rangle/2\ne0$ で、Virasoro一次場とは限りません。この違いが後のウェイト4の別の大域族を理解する鍵です。

ウェイト $h_p>0$ の一次場 $\mathcal O_p$ を二点関数 $\langle\mathcal O_p(\infty)\mathcal O_p(0)\rangle=1$ で規格化します。三点関数の係数を $C_{\phi\phi p}=\langle\phi(\infty)\phi(1)\mathcal O_p(0)\rangle$ とします。ウェイトが縮退する場合は二点内積で直交する基底を選びます。

<a id="def-qft54-global-block"></a>

<!-- formal-statement-start -->
> **定義（正則大域共形ブロック）**  
> $L_0|p\rangle=h_p|p\rangle$、$L_1|p\rangle=0$ を満たすウェイト $h_p>0$ の正則大域一次場とその微分子孫の、縮約四点関数への単位規格化寄与を
>
$$
g_{h_p}(x)=x^{h_p}\sum_{n=0}^{\infty}
\frac{(h_p)_n^2}{n!(2h_p)_n}x^n
=x^{h_p}{}_2F_1(h_p,h_p;2h_p;x)
$$
>
> と呼ぶ。$(q)_0=1$、$(q)_n=q(q+1)\cdots(q+n-1)$（$n\ge1$）。単位場は $g_0(x)=1$ と別に定める。級数表示は $|x|<1$ を基本領域とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft54-global-block -->
**定義の確認**：自由電流の $t$ は上で $L_1|t\rangle=0$ と確認しました。[Virasoro交換子](../QFT51/index.md#thm-qft51-virasoro)と真空条件から

$$
L_0|t\rangle=[L_0,L_{-2}]|0\rangle=2L_{-2}|0\rangle=2|t\rangle.
$$

[QFT51の中心電荷付きOPE](../QFT51/index.md#def-qft51-stress-ope)で二点ノルムは $\langle t|t\rangle=c/2=1/2>0$ なので、$\sqrt2|t\rangle$ が規格化されたウェイト2の大域一次状態です。この $h_p=2$ を代入し、最初の三つのPochhammer係数を計算します。

$$
g_2(x)
=x^2\left[1+\frac{2^2}{4}x+
\frac{(2\cdot3)^2}{2!(4\cdot5)}x^2+\cdots\right]
=x^2\left(1+x+\frac9{10}x^2+\cdots\right).
$$

この係数は、特殊関数の名前からではなく、微分子孫のノルムから得られます。
<!-- definition-example-end -->

<a id="thm-qft54-global-block"></a>

<!-- formal-statement-start -->
> **定理（大域子孫の状態和）**  
> 大域Möbius変換に不変な球面真空を持ち、規格化 $\langle\phi(\infty)\phi(0)\rangle=1$ の同一boson一次場の四点が、放射量子化において $L_n^\dagger=L_{-n}$ の随伴性を持つ正値内積の下で、正ノルムの大域一次場 $\mathcal O_p$ とその微分子孫に分解でき、$|x|<1$ で状態和が収束するとする。二点内積で直交規格化された各一次場について
>
$$
\mathcal G(x)=1+\sum_{p:h_p>0}C_{\phi\phi p}^{\,2}
x^{h_p}{}_2F_1(h_p,h_p;2h_p;x)
$$
>
> が成り立つ。ただし単位OPE係数を1としたチャネルを考え、三点係数を実に取れる場合の式である。複素場・異種場では左右の三点係数の積に置き換える。係数が非負という結論には正値性と適切な共役規約が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

第 $n$ 子孫 $L_{-1}^n|p\rangle$ を挿入し、その三点重なり二つの積をノルムで割ります。三点微分で $(h_p)_n$、ノルムで $n!(2h_p)_n$ が現れます。

<!-- proof-start -->
### 証明

[QFT52の動径反射による随伴規約](../QFT52/index.md#thm-qft52-level-gram)に合わせ $L_{-1}^\dagger=L_1$ とします。[QFT51のVirasoro交換子](../QFT51/index.md#thm-qft51-virasoro) で $m=1,n=-1$ を取れば中心項は零で、
$[L_1,L_{-1}]=2L_0$、$[L_0,L_{-1}]=L_{-1}$ です。$L_1|p\rangle=0$、$L_0|p\rangle=h_p|p\rangle$ を用いて積の交換子を展開すると

$$
\begin{aligned}
L_1L_{-1}^n|p\rangle
&=\sum_{k=0}^{n-1}L_{-1}^k(2L_0)L_{-1}^{n-1-k}|p\rangle\\
&=2\sum_{k=0}^{n-1}(h_p+n-1-k)L_{-1}^{n-1}|p\rangle\\
&=n(2h_p+n-1)L_{-1}^{n-1}|p\rangle.
\end{aligned}
$$

$N_n=\langle p|L_1^nL_{-1}^n|p\rangle$ とすれば $N_0=1$、$N_n=n(2h_p+n-1)N_{n-1}$。従って

$$
N_n=n!(2h_p)_n.
$$

[QFT48のスカラー三点関数定理](../QFT48/index.md#thm-qft48-primary-three-point)は $d\ge3$ の実距離による主張なので、ここで二次元正則三点関数に直接適用しません。[QFT50の二次元一次場の変換則](../QFT50/index.md#def-qft50-weights)から、三点の正則部分 $H(z_1,z_2,z_3)$ に並進・拡大縮小・特別共形変換のWard作用を課すと

$$
\sum_i\partial_{z_i}H=0,\quad
\sum_i(z_i\partial_{z_i}+h_i)H=0,\quad
\sum_i(z_i^2\partial_{z_i}+2h_i z_i)H=0.
$$

相異なる三点では大域Möbius変換で配置を標準位置へ移せるため、相関関数の位置依存性はこの連立式で定数倍まで決まります。$H=C_{123}z_{12}^{-\alpha_{12}}z_{13}^{-\alpha_{13}}z_{23}^{-\alpha_{23}}$ と置き、各挿入点でのウェイトを比較すると

$$
\alpha_{12}+\alpha_{13}=2h_1,\quad
\alpha_{12}+\alpha_{23}=2h_2,\quad
\alpha_{13}+\alpha_{23}=2h_3,
$$

ゆえに $\alpha_{ij}=h_i+h_j-h_k$（$\{i,j,k\}=\{1,2,3\}$）です。枝を固定し、$(h_1,h_2,h_3)=(h,h,h_p)$ と $(z_1,z_2,z_3)=(R,1,y)$ を代入してから $R\to+\infty$ を取れば

$$
\begin{aligned}
\langle\phi(\infty)\phi(1)\mathcal O_p(y)\rangle
&=\lim_{R\to\infty}R^{2h}C_{\phi\phi p}
(R-1)^{-(2h-h_p)}(R-y)^{-h_p}(1-y)^{-h_p}\\
&=C_{\phi\phi p}(1-y)^{-h_p}.
\end{aligned}
$$

$y=0$ で $n$ 回微分した値は $(h_p)_n C_{\phi\phi p}$ です。もう一方の重なりは、[QFT52の一次場モード作用](../QFT52/index.md#thm-qft52-primary-modes)で $L_1$ を挿入点 $x$ に作用させて確かめます。$[L_1,\phi(x)]=(x^2\partial_x+2hx)\phi(x)$、$[L_1,\phi(0)]=0$、$L_1|0\rangle=0$ なので、$D_x=x^2\partial_x+2hx$ と置けば

$$
\begin{aligned}
\langle p|L_1^n\phi(x)\phi(0)|0\rangle
&=D_x^n\langle p|\phi(x)\phi(0)|0\rangle\\
&=C_{\phi\phi p}D_x^n x^{h_p-2h}\\
&=C_{\phi\phi p}(h_p)_n x^{h_p-2h+n},
\end{aligned}
$$

ここで $D_x x^{h_p-2h+k}=(h_p+k)x^{h_p-2h+k+1}$ を繰り返しました。二つの重なりの積を子孫ノルム $N_n$ で割り、縮約の因子 $x^{2h}$ を掛けると、正規直交化された子孫の寄与は

$$
C_{\phi\phi p}^{\,2}
\frac{(h_p)_n^2}{n!(2h_p)_n}x^{h_p+n}.
$$

状態和の収束という仮定の下で全 $p,n$ を足せば定義の超幾何級数になります。単位場には $L_{-1}|\mathbf1\rangle=0$ のため定数1だけを割り当てます。
<!-- proof-end -->

これは**大域**子孫の構成です。一般のVirasoro表現の $L_{-2}$ 子孫などは、大域代数についてさらに別の準一次場の族に分解されます。またWard恒等式だけから、状態和の存在・正値性・収束が無条件に従うわけではありません。

## 4. 応力テンソルは最初の非自明なブロック

自由電流の $\mathcal G_a(x)=1+2x^2+2x^3+\cdots$ の係数を、OPEに現れたウェイト2の応力テンソル $t$ から求め直します。この係数は一般の一次場に対してもWard恒等式で固定されます。

<a id="prop-qft54-stress-coefficient"></a>

<!-- formal-statement-start -->
> **命題（一次場OPEの応力テンソル係数）**  
> 正則boson一次場 $\phi$ が [QFT50の一次場Ward OPE](../QFT50/index.md#thm-qft50-primary-ward) を満たし、球面真空で $t$ 挿入相関関数にWard核以外の大域正則項がなく、$t(z)$ が無限遠で $O(z^{-4})$ として減衰するとする。二点関数を次のように規格化する。
>
$$
\langle\phi(x)\phi(0)\rangle=x^{-2h},\qquad
\langle t(z)t(0)\rangle=\frac{c}{2z^4},\quad c\ne0.
$$
>
> ウェイト2のOPEを二点内積で $t$ 方向へ射影した係数は
>
$$
\phi(x)\phi(0)
=x^{-2h}\left[\mathbf1+\frac{2h}{c}x^2t(0)+\cdots\right]
$$
>
> の形になる。省略部分には別の局所場・子孫の寄与があり得る。
<!-- formal-statement-end -->

### 証明の見取り図

遠い位置の $t(z)$ と相関を取り、Ward恒等式で計算した $z^{-4}x^{-2h+2}$ 係数を $tt$ 二点核と比較します。

<!-- proof-start -->
### 証明

$|z|>|x|>0$ として [一次場Ward核](../QFT50/index.md#thm-qft50-primary-ward) を二点へ作用させます。第二挿入点を先に $w$ と置き、$G(x,w)=(x-w)^{-2h}$ とすれば、微分する変数を固定して

$$
\partial_xG=-2h(x-w)^{-2h-1},\qquad
\partial_wG=+2h(x-w)^{-2h-1}
$$

です。両微分を求めてから $w=0$ と置き、上の球面真空の仮定で正則な余剰項がないことを用いると

$$
\begin{aligned}
\langle t(z)\phi(x)\phi(0)\rangle
&=\left.\left[\frac{h}{(z-x)^2}+\frac{\partial_x}{z-x}
+\frac{h}{(z-w)^2}+\frac{\partial_w}{z-w}\right]G(x,w)\right|_{w=0}\\
&=hx^{-2h}\left[\frac1{(z-x)^2}+\frac1{z^2}
-\frac2{x(z-x)}+\frac2{xz}\right]\\
&=\frac{hx^{-2h+2}}{z^2(z-x)^2}
=\frac{hx^{-2h+2}}{z^4}+O(x^{-2h+3}z^{-5}).
\end{aligned}
$$

OPEの $t$ 項を $Ax^{-2h+2}t(0)$ とすると、その寄与は $A c x^{-2h+2}/(2z^4)$ です。他のウェイト2成分は $t$ に直交射影して除きます。$Ac/2=h$ より $A=2h/c$。
<!-- proof-end -->

自由電流では $h=c=1$ なので係数は2で、第1節の直接計算と一致します。$t$ の二点ノルムは $c/2=1/2$。正規化された $t/\sqrt{c/2}$ の三点係数は $h/\sqrt{c/2}=\sqrt2$ なので、ブロック係数は2です。

$$
1+2g_2(x)=1+2x^2+2x^3+\frac95x^4+O(x^5).
$$

一方でWick四点の $x^4$ 係数は3。差は $3-9/5=6/5$ で、ウェイト4から始まる別の大域共形族が必要です。**一つのVirasoro真空族でも、複数の大域ブロックを含みます。**

## 5. 二つのチャネルが一致する交差対称性

OPEの二つの展開が一つの四点相関関数を表しているなら、共通領域で同じ値を与えねばなりません。局所boson一次場なら挿入の交換で統計符号は生じず、$x$ と $1-x$ を入れ替えた四点関数を比較できます。この一致が**交差対称性（crossing）**です。QFT13の散乱振幅の交差とは、対象が異なります。

<a id="thm-qft54-crossing"></a>

<!-- formal-statement-start -->
> **定理（同一局所boson一次場の四点交差式）**  
> 正則ウェイト $h$ の同一局所boson一次場 $\phi$ の四点 $F(x)$ が、実配置の範囲 $0<x<1$ で挿入の交換に対称で共形共変性を満たし、両チャネルのOPEが共通領域で収束するとする。縮約四点を
>
$$
\mathcal G(x)=x^{2h}F(x)
$$
>
> と定義すれば
>
$$
F(x)=F(1-x),\qquad
\mathcal G(x)=\left(\frac{x}{1-x}\right)^{2h}\mathcal G(1-x).
$$
>
> フェルミオン、異種場、複素平面の枝を持つ正則成分には、交換統計・融合行列・解析接続を反映した別の式が必要となる。
<!-- formal-statement-end -->

### 証明の見取り図

相関関数自体は同じで、縮約関数は $x^{2h}$ を掛けて定義したことを使います。個々の大域ブロックが対称である必要はありません。

<!-- proof-start -->
### 証明

交換対称性と共形共変性から、二つの配置の全四点は $F(x)=F(1-x)$。定義に代入すれば

$$
\mathcal G(x)=x^{2h}F(1-x)
=\frac{x^{2h}}{(1-x)^{2h}}\mathcal G(1-x).
$$

各チャネルのOPEは、これを同じ相関関数の異なる状態和で表す方法です。個別ブロックを項ごとに不変と置いたわけではありません。
<!-- proof-end -->

**自由電流による検算**：$F_a(x)=x^{-2}+1+(1-x)^{-2}$ は対称です。$x=1/3$ では

$$
F_a(1/3)=F_a(2/3)=\frac{49}{4},\qquad
\mathcal G_a(1/3)=\frac{49}{36},\quad
\mathcal G_a(2/3)=\frac{49}{9}.
$$

比は $1/4=[(1/3)/(2/3)]^2$ で、正しい交差式に一致します。$\mathcal G(x)=\mathcal G(1-x)$ と書いてしまうと誤りです。

複素 $x$ では典型的に $s$ チャネルが $|x|<1$、$t$ チャネルが $|1-x|<1$ で使われ、両領域の交わりで同じ解析枝を比較します。その外側へは特異点を避けた解析接続が必要です。正値Hilbert空間、局所性、OPE収束は形式的Ward恒等式だけでは保証されません。また [QFT53のMajorana四点のPfaffian符号](../QFT53/index.md#prop-qft53-four-point) を無視してbosonの交差式を流用してはいけません。

## 演習：近接展開から四点の整合性へ

### 演習 QFT54-A1：交差比と無限遠

- Level: A
- 問題: $z_1=0,z_2=x,z_3=1,z_4=R$、$0<x<1<R$ とする。$u=z_{12}z_{34}/(z_{13}z_{24})$ を計算し $R\to\infty$ を取れ。

**詳細解答**：二点差は $z_{12}=-x$、$z_{34}=1-R$、$z_{13}=-1$、$z_{24}=x-R$ です。交差比へ順に代入し、分子分母を $R$ で割ると

$$
u=\frac{(-x)(1-R)}{(-1)(x-R)}
=\frac{x(R-1)}{R-x}
=\frac{x(1-R^{-1})}{1-xR^{-1}}\longrightarrow x.
$$

### 演習 QFT54-A2：OPEの導関数項

- Level: A
- 問題: $a(w+s)a(w)=s^{-2}+:\!a(w+s)a(w)\!:$、$t=\tfrac12:\!a^2\!:$ から $s^0,s^1$ の係数を求めよ。

**詳細解答**：第1因子のTaylor展開により $:\!a(w+s)a(w)\!:=:\!a^2\!:+s:\!(\partial a)a\!:+O(s^2)$。定数項は $2t$、一次項は $\partial t=\tfrac12(:\!(\partial a)a\!:+:\!a\partial a\!:)=:\!(\partial a)a\!:$ だから $\partial t$ です。

### 演習 QFT54-A3：三つのWick対合

- Level: A
- 問題: $\langle a(z)a(w)\rangle=(z-w)^{-2}$、$a(\infty)=\lim_{R\to\infty}R^2a(R)$ から $F_a(x)$ を三対合の極限で求めよ。

**詳細解答**：[四点Wick対合](../QFT53/index.md#prop-qft53-four-point)の三組について、無限遠の因子 $R^2$ を掛けた極限は順に

$$
\begin{aligned}
(R,1)(x,0)&:\ \frac{R^2}{(R-1)^2x^2}\longrightarrow x^{-2},\\
(R,x)(1,0)&:\ \frac{R^2}{(R-x)^2}\longrightarrow1,\\
(R,0)(1,x)&:\ \frac{R^2}{R^2(1-x)^2}\longrightarrow(1-x)^{-2}.
\end{aligned}
$$

よって $F_a(x)=x^{-2}+1+(1-x)^{-2}$ です。

### 演習 QFT54-A4：ウェイト2のブロック

- Level: A
- 問題: $(q)_n=q(q+1)\cdots(q+n-1)$ と $g_2=x^2\sum_{n\ge0}(2)_n^2x^n/[n!(4)_n]$ から $x^4$ まで展開せよ。

**詳細解答**：$n=0,1,2$ での係数はそれぞれ

$$
1,\qquad \frac{2^2}{4}=1,\qquad
\frac{(2\cdot3)^2}{2!(4\cdot5)}=\frac{36}{40}=\frac9{10}.
$$

したがって $g_2(x)=x^2+x^3+\tfrac9{10}x^4+O(x^5)$ です。

### 演習 QFT54-A5：縮約四点のべき級数

- Level: A
- 問題: $F_a=x^{-2}+1+(1-x)^{-2}$ と $(1-x)^{-2}=\sum_{n\ge0}(n+1)x^n$ から $\mathcal G_a$ の $x^5$ までの係数を求めよ。

**詳細解答**：$\mathcal G_a=x^2F_a=1+x^2+x^2(1+2x+3x^2+4x^3+\cdots)$。従って $1+2x^2+2x^3+3x^4+4x^5+O(x^6)$ であり、$x^2$ には二つの寄与がある点に注意します。

### 演習 QFT54-A6：チャネルの重なり

- Level: A
- 問題: 実数 $x$ について $|x|<1$ と $|1-x|<1$ の共通範囲を求め、$x=1/2$ が両チャネルの展開変数を小さくすることを確認せよ。

**詳細解答**：前者は $-1<x<1$、後者は $0<x<2$ なので共通部分は $0<x<1$。$x=1/2$ では $|x|=|1-x|=1/2$ でいずれも1未満です。ただし一般CFTのOPE状態和が収束するかは別の理論的仮定です。

### 演習 QFT54-B1：Ward核から $2h/c$

- Level: B
- 問題: $\langle\phi(x)\phi(0)\rangle=x^{-2h}$、一次場Ward核と $\langle t(z)t(0)\rangle=c/(2z^4)$（$c\ne0$）から、$\phi(x)\phi(0)$ の $t$ 方向への射影係数を求めよ。

**詳細解答**：第二の挿入点を変数 $w$ とし、$G(x,w)=(x-w)^{-2h}$ と置いてから微分します。

$$
\left.\partial_xG\right|_{w=0}=-2hx^{-2h-1},\qquad
\left.\partial_wG\right|_{w=0}=+2hx^{-2h-1}.
$$

[QFT50のWard核](../QFT50/index.md#thm-qft50-primary-ward)に代入し、球面真空で余剰正則項がない条件の下で、共通因子 $hx^{-2h}$ の括弧を通分すると

$$
\frac1{(z-x)^2}+\frac1{z^2}-\frac2{x(z-x)}+\frac2{xz}
=\frac{x^2}{z^2(z-x)^2}.
$$

従って $|z|>|x|$ の遠方係数は $h x^{-2h+2}/z^4$。$t$ 項を $Ax^{-2h+2}t(0)$ とすればその寄与は $Acx^{-2h+2}/(2z^4)$ なので $Ac/2=h$、$A=2h/c$。

### 演習 QFT54-B2：二階子孫のノルム

- Level: B
- 問題: $L_1|p\rangle=0$、$L_0|p\rangle=h_p|p\rangle$、$[L_1,L_{-1}]=2L_0$、$[L_0,L_{-1}]=L_{-1}$、$\langle p|p\rangle=1$、$L_{-1}^\dagger=L_1$、$h_p>0$ を仮定する。$\|L_{-1}^2|p\rangle\|^2$ と $g_{h_p}$ の二階係数を求めよ。

**詳細解答**：[QFT52の動径反射の規約](../QFT52/index.md#thm-qft52-level-gram)に従って $L_{-1}^\dagger=L_1$ と仮定します。$L_1L_{-1}|p\rangle=2h_p|p\rangle$。さらに

$$
\begin{aligned}
L_1L_{-1}^2|p\rangle
&=2L_0L_{-1}|p\rangle+2L_{-1}L_0|p\rangle\\
&=2(h_p+1)L_{-1}|p\rangle+2h_pL_{-1}|p\rangle\\
&=2(2h_p+1)L_{-1}|p\rangle.
\end{aligned}
$$

よってノルムは $2(2h_p+1)\cdot2h_p=2!(2h_p)(2h_p+1)$。三点関数を二階微分した重なりは $h_p(h_p+1)$ なので、ブロック係数は $[h_p(h_p+1)]^2/[2!(2h_p)(2h_p+1)]$ です。

### 演習 QFT54-B3：縮約関数の交差式

- Level: B
- 問題: 自由電流について $x=1/3,2/3$ の $F_a$ と $\mathcal G_a$ を比較し、$\mathcal G(x)=\mathcal G(1-x)$ が誤りであることを説明せよ。

**詳細解答**：対合で得た $F_a(x)=x^{-2}+1+(1-x)^{-2}$ に代入すると

$$
F_a(1/3)=9+1+\frac94=\frac{49}4,
\qquad F_a(2/3)=\frac94+1+9=\frac{49}4.
$$

しかし縮約には $x^{2h}=x^2$ を掛けるため

$$
\mathcal G_a(1/3)=\frac19\frac{49}4=\frac{49}{36},\qquad
\mathcal G_a(2/3)=\frac49\frac{49}4=\frac{49}9.
$$

比は $1/4=[(1/3)/(2/3)]^2$ です。全四点は対称でも縮約関数同士は等しくありません。

### 演習 QFT54-B4：ウェイト4の不足分

- Level: B
- 問題: $\mathcal G_a=1+2x^2+2x^3+3x^4+O(x^5)$ と $g_2=x^2+x^3+9x^4/10+O(x^5)$ から、単位と応力テンソルの大域ブロックで説明できない最初の係数を計算し、解釈せよ。

**詳細解答**：$x^2$ と $x^3$ の係数をそろえるには $2g_2$ が必要です。以下 $[x^4]f$ は級数 $f$ の $x^4$ 係数を表します。両者を比較すると

$$
[x^4](2g_2)=2\cdot\frac9{10}=\frac95,
\qquad [x^4](\mathcal G_a-1-2g_2)=3-\frac95=\frac65.
$$

ウェイト4から始まる別の大域共形族が必要であり、Virasoro真空族のすべてが単一の大域ブロックに入るわけではありません。

### 演習 QFT54-C1：OPE・ブロック・交差を通す

- Level: C
- 問題: $\langle a(z)a(w)\rangle=(z-w)^{-2}$、$t=\tfrac12:\!a^2\!:$、$h=c=1$ の自由電流について、次を求めよ。

  1. $a(x)a(0)$ の $x^0,x^1$ の係数。
  2. 四点 $F_a$ と縮約関数の $x^4$ までの級数。
  3. Ward恒等式から導く $t$ のOPE係数と、大域ブロックのウェイト4の不足分。
  4. $x=1/3$ での交差式の検算と、一般化に必要な仮定。

**詳細解答**：

**（1）局所展開。** $a(x)a(0)=x^{-2}+:\!a(x)a(0)\!:$ から正規順序積をTaylor展開し、[本章のOPEの証明](#prop-qft54-current-ope)と同様に正規順序の積の微分を使うと

$$
:\!a(x)a(0)\!:
=:\!a^2\!:+x:\!(\partial a)a\!:+O(x^2)
=2t+x\partial t+O(x^2).
$$

**（2）三対合。** $(R,1)(x,0)$、$(R,x)(1,0)$、$(R,0)(1,x)$ に $R^2$ を掛けて極限を取ると、順に $x^{-2},1,(1-x)^{-2}$。よって

$$
F_a=x^{-2}+1+(1-x)^{-2},\qquad
\mathcal G_a=1+x^2+x^2\sum_{n\ge0}(n+1)x^n
=1+2x^2+2x^3+3x^4+O(x^5).
$$

**（3）Ward係数。** 二点核を $G(x,w)=(x-w)^{-2h}$ とし、[一次場Ward核](../QFT50/index.md#thm-qft50-primary-ward)の $\partial_x$ は $w$ を、$\partial_w$ は $x$ をそれぞれ固定して作用させます。微分後に $w=0$ と置くと

$$
\left.\partial_xG\right|_{w=0}=-2hx^{-2h-1},\qquad
\left.\partial_wG\right|_{w=0}=+2hx^{-2h-1}.
$$

球面真空で余剰正則項がない条件の下、Ward核を通分し、$z^{-4}$ 係数をOPEの $t$ 項と比較すると

$$
\frac{hx^{-2h+2}}{z^2(z-x)^2}
=\frac{hx^{-2h+2}}{z^4}+O(z^{-5}),
\qquad \frac{Ac}{2}=h,\qquad A=\frac{2h}{c}=2.
$$

一方 $2g_2=2x^2+2x^3+\tfrac95x^4+\cdots$ なので、不足分は $3-9/5=6/5$ です。

**（4）交差。** $F_a(1/3)=F_a(2/3)=49/4$。縮約値は $49/36$ と $49/9$ なので比 $1/4=[(1/3)/(2/3)]^2$ で一致します。一般化には共形共変性、同一局所bosonの交換対称性、両OPEの収束と共通解析枝が必要です。フェルミオンなら交換符号、一般の正則場なら枝の単価性も吟味し、Virasoro子孫を大域ブロック一個へ押し込んではいけません。

## この章で確認したこと

自由電流の特異な二点積を局所場へ展開し、同じ自由四点をWick計算とOPEの両方から追えました。微分子孫のノルムを使うと大域共形ブロックの超幾何係数が求まり、Ward恒等式は応力テンソル係数 $2h/c$ を固定します。交差対称性は**個々のブロックの対称性ではなく、異なる近接チャネルから得る四点関数の整合条件**です。

次は平面から円筒への共形写像に進みます。Schwarzian項、有限サイズ効果と真空エネルギーの係数を、今回のWard核・中心電荷に照らして検算します。
