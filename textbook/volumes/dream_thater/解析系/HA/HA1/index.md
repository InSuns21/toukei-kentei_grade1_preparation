# HA1 高次元最大作用素とLebesgue微分定理

[MT4の1次元Lebesgue微分定理](../../MT/MT4/index.md#thm-mt4-lebesgue-differentiation-local)では、区間で測った平均から関数の値をほとんど至る所で回復しました。平面や空間のデータを扱うなら、区間を球や立方体に置き換えたいところです。しかし高次元では、重なる球をどう選び直すかが1次元の区間とは異なります。

例えば $f=\boldsymbol{1}_{B(0,1)}$ を平面上で考えます。球の内部では小さな球の平均は1、外部では0です。境界上では平均は中間の値を取り得ます。境界は面積0なので、「ほとんど至る所で回復する」という主張と両立します。重要なのは、この現象を任意の局所可積分関数に対して証明することです。

ここでは次の論理を順に組み立てます。

- 重なる有限個の球から、互いに交わらない球を選び、もとの球全体を3倍球で覆う。
- その幾何学から「局所平均が大きい点の集合」の体積を制御する。
- 連続関数による近似と最大作用素の評価を合わせ、局所平均がほとんど至る所で元に戻ることを示す。
- 最後に立方体や重み付きの局所平均へ応用し、強い $L^1$ 評価が成立しない理由を確認する。

以後 $d\ge1$ は固定した整数、$B(x,r)=\{y\in\mathbb R^d:|y-x|<r\}$ は中心 $x$・半径 $r>0$ の開Euclid球、$v_d=|B(0,1)|$ は単位球のLebesgue測度とします。従って $|B(x,r)|=v_dr^d$ です。$|E|$ は可測集合 $E$ のLebesgue測度を表します。

## 1. 球の平均を最大化する

平均を一点 $x$ の近くで測るには、$x$ を中心とする球をすべて調べる方法と、$x$ を含む任意の球を調べる方法があります。後者はより広い球を許すので値は小さくなりません。

<a id="def-ha1-centered-maximal"></a>
<!-- formal-statement-start -->
> **定義（中心付きHardy--Littlewood最大作用素）**  
> $f\in L^1_{\mathrm{loc}}(\mathbb R^d)$ に対し、$x\in\mathbb R^d$ での中心付き最大関数を

$$
(Mf)(x):=\sup_{r>0}\frac{1}{v_dr^d}\int_{B(x,r)}|f(y)|\,dy
$$

> と定める。値 $+\infty$ も許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha1-centered-maximal -->
**定義の確認**　$f=\boldsymbol{1}_{B(0,1)}$ とすると、$0<r\le1$ では

$$
\frac{1}{v_dr^d}\int_{B(0,r)}f(y)\,dy
=\frac{|B(0,r)|}{|B(0,r)|}=1.
$$

$f$ は0と1の間の値しか取らないので、他の球でも平均は1以下です。よって $(Mf)(0)=1$ です。反対に、$f\equiv c$ なら任意の球の平均が $|c|$ となり、$Mf\equiv|c|$ です。
<!-- definition-example-end -->

<a id="def-ha1-uncentered-maximal"></a>
<!-- formal-statement-start -->
> **定義（非中心Hardy--Littlewood最大作用素）**  
> $f\in L^1_{\mathrm{loc}}(\mathbb R^d)$ に対し

$$
(M_{\mathrm u}f)(x)
:=\sup_{\substack{a\in\mathbb R^d,\ r>0\\ x\in B(a,r)}}
\frac{1}{v_dr^d}\int_{B(a,r)}|f(y)|\,dy
$$

> と定める。最大化する球の中心は $x$ でなくてもよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha1-uncentered-maximal -->
**定義の確認**　$f=\boldsymbol{1}_{B(0,1)}$ では $M_{\mathrm u}f(0)=1$ です。中心0の半径1/2の球で平均1を実現し、すべての球の平均は1以下だからです。一般に中心付き球も非中心球の候補なので、$(Mf)(x)\le(M_{\mathrm u}f)(x)$ となります。
<!-- definition-example-end -->

<a id="prop-ha1-basic-maximal"></a>
<!-- formal-statement-start -->
> **命題（最大作用素の基本性質）**  
> $f,g\in L^1_{\mathrm{loc}}(\mathbb R^d)$、$a\in\mathbb C$ とする。$M$ と $M_{\mathrm u}$ は非負値を取り、劣線形性

$$
M(f+g)\le Mf+Mg,\qquad M(af)=|a|Mf
$$

> を満たす。非中心版にも同じ性質がある。また各 $x$ で

$$
Mf(x)\le M_{\mathrm u}f(x)\le 2^d Mf(x).
$$

> $f\in L^\infty$ なら両最大関数は $L^\infty$ に属し、ノルムは $\|f\|_\infty$ 以下である。
<!-- formal-statement-end -->

### 証明の見取り図

劣線形性は各球で $|f+g|\le|f|+|g|$ を積分してから上限を取ります。二つの作用素の比較では、$x\in B(a,r)$ の球を、$x$ を中心とする半径 $2r$ の球で包みます。

<!-- proof-start -->
### 証明

任意の球 $B$ に対して $|f+g|\le|f|+|g|$ なので

$$
\frac1{|B|}\int_B|f+g|
\le\frac1{|B|}\int_B|f|+\frac1{|B|}\int_B|g|.
$$

同じ球の全候補について上限を取ると劣加法性が出ます。斉次性は $|af|=|a||f|$ によります。

$x\in B(a,r)$ とすると、任意の $y\in B(a,r)$ について

$$
|y-x|\le |y-a|+|a-x|<2r
$$

なので $B(a,r)\subset B(x,2r)$ です。従って

$$
\begin{aligned}
\frac1{v_dr^d}\int_{B(a,r)}|f|
&\le \frac1{v_dr^d}\int_{B(x,2r)}|f|\\
&=2^d\frac1{v_d(2r)^d}\int_{B(x,2r)}|f|\\
&\le2^dMf(x).
\end{aligned}
$$

非中心球のすべてで上限を取れば比較式が従います。$f\in L^\infty$ なら各球で $|f|\le\|f\|_\infty$ がほとんど至る所成立し、両方の平均は $\|f\|_\infty$ 以下です。
<!-- proof-end -->

最大作用素は積分を滑らかにする作用素ではありません。後で見るとおり、局所的に大きな値を周囲に「広げる」ため、$L^1$ ノルムを保つとは限りません。

## 2. 重なり合う球の整理

弱い $(1,1)$ 評価には、悪い点 $x$ ごとに「平均が大きい球」を一つ選び、重複を制御する必要があります。任意の球を全部足すと重なりの分だけ積分を何度も数えてしまいます。

<a id="lem-ha1-finite-balls"></a>
<!-- formal-statement-start -->
> **補題（有限球の3倍被覆）**  
> $\mathbb R^d$ 内の有限個の開球 $B_1,\ldots,B_N$ に対し、互いに素な球からなる部分族 $B_{i_1},\ldots,B_{i_m}$ が存在し、

$$
\bigcup_{j=1}^N B_j
\subset\bigcup_{k=1}^m 3B_{i_k}
$$

> が成り立つ。ここで $3B(a,r):=B(a,3r)$ であり、選んだ球は二つずつ交わらない。
<!-- formal-statement-end -->

### 証明の見取り図

半径が最大の球を先に選び、それと交わる球を候補から外します。外された球は選んだ球より大きくないので、中心間距離と半径を足しても3倍球に入ります。

<!-- proof-start -->
### 証明

最初に全 $N$ 個を候補にする。候補が残る間、半径最大の球 $B(a,R)$ を一つ選んで記録し、それ自身と交わる球を候補から取り除く。この操作は有限回で終わります。

選んだ球どうしが交わらないのは、後で選ぶ候補が以前選んだ球とは交わらないよう除去したからです。元の球 $B(b,s)$ は、選ばれた球自身か、ある選択球 $B(a,R)$ と交わるため除去されています。後者では $s\le R$ であり、交点 $z$ を取れば

$$
|a-b|\le |a-z|+|z-b|<R+s.
$$

さらに $y\in B(b,s)$ なら

$$
|y-a|\le|y-b|+|b-a|<s+(R+s)=R+2s\le3R.
$$

従って $B(b,s)\subset B(a,3R)$ です。前者も明らかに自分自身の3倍球へ含まれます。全ての元の球はどれかの3倍球に含まれます。
<!-- proof-end -->

半径の大きい球から選ぶことが重要です。選んだ球より大きい球を後から捨ててしまうと、$s\le R$ を使った最後の評価は成立しません。

## 3. 平均が大きい点はどれほど多いか

作用素 $M$ の強い $L^1$ 推定は一般には偽ですが、「$Mf$ が閾値を超える点の測度」は制御できます。

<a id="thm-ha1-weak11"></a>
<!-- formal-statement-start -->
> **定理（Hardy--Littlewood最大作用素の弱(1,1)評価）**  
> $d\ge1$、$f\in L^1(\mathbb R^d)$、$\lambda>0$ に対し、中心付き最大関数の超水準集合は可測で

$$
\left|\{x\in\mathbb R^d:Mf(x)>\lambda\}\right|
\le \frac{3^d}{\lambda}\|f\|_1.
$$

> 非中心最大関数については右辺の係数を $6^d$ にして同じ結論が成り立つ。従って $Mf$ と $M_{\mathrm u}f$ はほとんど至る所で有限である。
<!-- formal-statement-end -->

### 証明の見取り図

閾値を超える各点 $x$ には平均が $\lambda$ より大きい証人の球があります。コンパクト集合を有限個の証人球で覆い、[有限球の3倍被覆](#lem-ha1-finite-balls)で互いに素な球だけに整理します。選択球上では積分が $\lambda$ 倍の体積を上回るので、全 $L^1$ 質量が球の体積和を抑えます。

<!-- proof-start -->
### 証明

まず可測性を確かめます。$r>0$ を固定して

$$
A_r(x):=\frac1{v_dr^d}\int_{\mathbb R^d}|f(y)|\boldsymbol{1}_{B(x,r)}(y)\,dy
$$

と置きます。$x_n\to x$ なら球 $B(x_n,r)$ の指示関数は境界球面（測度0）以外で $\boldsymbol{1}_{B(x,r)}$ へ収束します。また全ての被積分関数は $|f|$ で抑えられます。[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)より $A_r(x_n)\to A_r(x)$、すなわち $A_r$ は連続です。$Mf=\sup_{r>0}A_r$ は連続関数族の上限なので下半連続であり、$E_\lambda:=\{Mf>\lambda\}$ は開集合です。

非中心版の超水準集合も可測です。実際、球 $B(a,r)$ の平均が $\lambda$ を超えるという条件は $x$ に依存しないので

$
\{M_{\mathrm u}f>\lambda\}
=\bigcup_{\substack{a\in\mathbb R^d,\ r>0\\
|B(a,r)|^{-1}\int_{B(a,r)}|f|>\lambda}}B(a,r)
$

と表せます。右辺は開球の合併であり開集合です。これは上限を取る球の中心が $x$ と一致しなくても成り立ちます。

任意のコンパクト集合 $K\subset E_\lambda$ を取ります。各 $x\in K$ について、定義から $r_x>0$ を選んで

$$
\int_{B(x,r_x)}|f(y)|\,dy>\lambda v_dr_x^d
$$

とできます。この球族は $K$ を覆う開被覆です。コンパクト性より有限個 $B_1,\ldots,B_N$ で $K$ を覆えます。[有限球の3倍被覆](#lem-ha1-finite-balls)を適用し、互いに素な選択球 $D_1,\ldots,D_m$ を得ます。体積の尺度変換と球の互いに素であることから

$$
\begin{aligned}
|K|
&\le\left|\bigcup_{k=1}^m3D_k\right|
 \le\sum_{k=1}^m|3D_k|
 =3^d\sum_{k=1}^m|D_k|,\\
\lambda\sum_{k=1}^m|D_k|
&<\sum_{k=1}^m\int_{D_k}|f(y)|\,dy\\
&=\int_{\bigcup_{k=1}^mD_k}|f(y)|\,dy
\le\|f\|_1.
\end{aligned}
$$

よって $|K|\le3^d\|f\|_1/\lambda$ です。Lebesgue測度の開集合に対する内正則性（コンパクト集合による下からの近似）により、$E_\lambda$ にも同じ不等式が成立します。

最後に [最大作用素の比較](#prop-ha1-basic-maximal)を使うと

$$
\{M_{\mathrm u}f>\lambda\}
\subset \{Mf>\lambda/2^d\},
$$

従って非中心版の測度は $6^d\|f\|_1/\lambda$ 以下です。さらに $n\to\infty$ で

$$
|\{Mf=+\infty\}|
\le|\{Mf>n\}|
\le3^d\|f\|_1/n\to0.
$$

非中心版も同じです。
<!-- proof-end -->

この定理は「作用素の値があらゆる点で有限」とは言いません。零測度の例外集合を許すところが、次の微分定理と同じ構造です。また $p>1$ の強型有界性を、この弱型推定だけから無条件に主張することはできません。補間はHA2で扱います。

## 4. 球の平均から値を回復する

局所可積分関数は点での値が変わっても同じ $L^1_{\mathrm{loc}}$ の元を表すことがあります。したがって「平均が元へ戻る」という結論は、代表元を選んだ上でほとんど至る所と解釈します。

<a id="def-ha1-lebesgue-point"></a>
<!-- formal-statement-start -->
> **定義（Lebesgue点）**  
> $f\in L^1_{\mathrm{loc}}(\mathbb R^d)$ の有限値を取る代表元と $x\in\mathbb R^d$ に対し

$$
\lim_{r\downarrow0}
\frac1{|B(x,r)|}
\int_{B(x,r)}|f(y)-f(x)|\,dy=0
$$

> が成立するなら、$x$ を $f$ のLebesgue点という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha1-lebesgue-point -->
**定義の確認**　$f=\boldsymbol{1}_{B(0,1)}$ について $|x|<1$ なら $0<r<1-|x|$ で $f(y)=f(x)=1$ が球内で成り立つので、差の平均は0です。$|x|>1$ でも $0<r<|x|-1$ で同様に0です。境界 $|x|=1$ では $f(x)$ の代表値や球の内外比が効き、一般にはLebesgue点になりません。境界球面の $d$ 次元Lebesgue測度は0です。
<!-- definition-example-end -->

<a id="thm-ha1-differentiation"></a>
<!-- formal-statement-start -->
> **定理（高次元Lebesgue微分定理）**  
> $d\ge1$、$f\in L^1_{\mathrm{loc}}(\mathbb R^d)$ とする。このとき $\mathbb R^d$ のほとんどすべての点 $x$ は $f$ のLebesgue点である。特に、そのような点では

$$
\lim_{r\downarrow0}
\frac1{|B(x,r)|}\int_{B(x,r)}f(y)\,dy=f(x).
$$

<!-- formal-statement-end -->

### 証明の見取り図

まず $L^1(\mathbb R^d)$ の場合を証明します。[連続コンパクト台関数の $L^1$ 稠密性](../../MT/MT7/index.md#thm-mt7-cc-dense)で $f$ を連続関数 $g$ によって近似します。

$g$ の球平均は各点で $g(x)$ に戻ります。一方、差 $h=f-g$ の球平均は [最大作用素の弱 $(1,1)$ 評価](#thm-ha1-weak11)で抑えます。

$h$ の点値が大きい点も、閾値を超える集合上の積分を評価して除外できます。最後に局所可積分関数へ、大きな球による切断を使って拡張します。

<!-- proof-start -->
### 証明

**第1段階：$f\in L^1(\mathbb R^d)$。**　任意の $\varepsilon>0$ について [連続コンパクト台関数の稠密性](../../MT/MT7/index.md#thm-mt7-cc-dense)から $g\in C_c(\mathbb R^d)$ を $\|f-g\|_1<\varepsilon$ となるよう選びます。$h=f-g$ と置きます。$f(x),g(x)$ が有限な点で $|u+v|\le|u|+|v|$ を二度用いると

$$
\begin{aligned}
\frac1{|B(x,r)|}\int_{B(x,r)}|f(y)-f(x)|\,dy
&\le\frac1{|B(x,r)|}\int_{B(x,r)}|h(y)|\,dy\\
&\quad+\frac1{|B(x,r)|}\int_{B(x,r)}|g(y)-g(x)|\,dy+|h(x)|.
\end{aligned}
$$

$g$ は連続なので、$r\downarrow0$ で第2項は0へ収束します。第1項は $Mh(x)$ 以下です。従って左辺の上極限を $D_f(x)$ と書けば

$$
0\le D_f(x)\le Mh(x)+|h(x)|.
$$

固定した $\delta>0$ に対し、$D_f(x)>\delta$ なら $Mh(x)>\delta/2$ または $|h(x)|>\delta/2$ です。[弱型評価](#thm-ha1-weak11)を使います。また $|h|>\delta/2$ の集合上で $|h|\ge\delta/2$ を積分すれば

$
|\{|h|>\delta/2\}|\le\frac{2}{\delta}\int_{\{|h|>\delta/2\}}|h|\le\frac{2\|h\|_1}{\delta}
$

です。従って

$$
\begin{aligned}
|\{D_f>\delta\}|
&\le|\{Mh>\delta/2\}|+|\{|h|>\delta/2\}|\\
&\le\frac{2\cdot3^d}{\delta}\|h\|_1
+\frac2\delta\|h\|_1\\
&<\frac{2(3^d+1)}{\delta}\varepsilon.
\end{aligned}
$$

ここで $D_f$ は可測です。球平均の上極限は、半径を正の有理数に限っても変わりません。

その理由は、固定した $x$ に対し、[Lebesgue積分の絶対連続性](../../MT/MT4/index.md#thm-mt4-integral-absolute-continuity)により、球の半径を変えた積分が連続であるためです。分母の球体積も正の半径について連続なので、平均全体が連続になります。

$\varepsilon>0$ は任意ですから、先ほどの上界を0へ近づけて $|\{D_f>\delta\}|=0$ を得ます。$\delta=1/n$（$n=1,2,\ldots$）とすれば、零測度集合の可算和を除いて $D_f(x)=0$ が成立します。

**第2段階：$f\in L^1_{\mathrm{loc}}(\mathbb R^d)$。**　各自然数 $m$ に対して

$$
f_m(y):=f(y)\boldsymbol{1}_{B(0,m+2)}(y)
$$

とすれば $f_m\in L^1(\mathbb R^d)$ です。第1段階から $f_m$ のLebesgue点でない点は零測度集合です。$x\in B(0,m)$、$r<1$ なら $B(x,r)\subset B(0,m+2)$ なので、$f_m(y)=f(y)$ が球内でほとんど至る所成立し、$f_m(x)=f(x)$ となる代表値も選べます。従って $B(0,m)$ のほとんどすべての点は $f$ のLebesgue点です。$\mathbb R^d=\bigcup_{m\ge1}B(0,m)$ なので全空間でも成立します。

最後の平均値の極限は

$$
\left|\frac1{|B(x,r)|}\int_{B(x,r)}f(y)\,dy-f(x)\right|
\le\frac1{|B(x,r)|}\int_{B(x,r)}|f(y)-f(x)|\,dy
$$

で従います。
<!-- proof-end -->

重要なのは、ほとんど至る所で **絶対値を取った差の平均** が0になるという強い形を得たことです。この形があれば、球以外の平均核にも結果を移せます。

## 5. 立方体・密度点・近似恒等族

球の幾何は最大作用素の証明に便利ですが、データを格子セルで集計するときは立方体を使います。中心 $x$、半辺長 $r$ の軸平行立方体を $Q(x,r)=x+(-r,r)^d$ とすると、体積は $(2r)^d$ です。

<a id="prop-ha1-cubes"></a>
<!-- formal-statement-start -->
> **命題（球と立方体による微分の一致）**  
> $d\ge1$、$f\in L^1_{\mathrm{loc}}(\mathbb R^d)$ とする。$x$ が球についてのLebesgue点なら

$$
\lim_{r\downarrow0}
\frac1{|Q(x,r)|}\int_{Q(x,r)}|f(y)-f(x)|\,dy=0.
$$

> 逆に、立方体での差の平均が0なら球でも0となる。
<!-- formal-statement-end -->

### 証明の見取り図

体積が同程度の図形による平均は、片方を包含するもう一方の平均で比較できます。$B(x,r)\subset Q(x,r)\subset B(x,\sqrt d\,r)$ が鍵です。

<!-- proof-start -->
### 証明

非負関数 $h(y)=|f(y)-f(x)|$ に対し

$$
\begin{aligned}
\frac1{|Q(x,r)|}\int_{Q(x,r)}h
&\le\frac{|B(x,\sqrt d\,r)|}{|Q(x,r)|}
\frac1{|B(x,\sqrt d\,r)|}\int_{B(x,\sqrt d\,r)}h\\
&=\frac{v_dd^{d/2}}{2^d}
\frac1{|B(x,\sqrt d\,r)|}\int_{B(x,\sqrt d\,r)}h.
\end{aligned}
$$

右辺の球平均は仮定で0へ収束します。逆方向には $B(x,r)\subset Q(x,r)$ を用い

$$
\frac1{|B(x,r)|}\int_{B(x,r)}h
\le\frac{2^d}{v_d}
\frac1{|Q(x,r)|}\int_{Q(x,r)}h
$$

とすればよいです。定数は $r$ と $x$ に依存しません。
<!-- proof-end -->

<a id="cor-ha1-density"></a>
<!-- formal-statement-start -->
> **系（高次元Lebesgue密度定理）**  
> Lebesgue可測集合 $E\subset\mathbb R^d$ に対して、ほとんどすべての $x\in E$ では

$$
\lim_{r\downarrow0}\frac{|E\cap B(x,r)|}{|B(x,r)|}=1
$$

> となる。また、ほとんどすべての $x\notin E$ ではこの比は0へ収束する。球を中心付き立方体へ置き換えてもよい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

局所可積分関数 $f=\boldsymbol{1}_E$ に [高次元Lebesgue微分定理](#thm-ha1-differentiation)を適用します。$f(x)=1$ の点では球平均が1へ、$f(x)=0$ の点では0へ収束します。実際

$$
\frac1{|B(x,r)|}\int_{B(x,r)}\boldsymbol{1}_E(y)\,dy
=\frac{|E\cap B(x,r)|}{|B(x,r)|}
$$

だからです。立方体の場合は [球と立方体の比較](#prop-ha1-cubes)を使います。
<!-- proof-end -->

次に、近傍に重みを付けるより一般の平均を考えます。$k\in L^\infty(\mathbb R^d)$ がコンパクトな球 $B(0,R)$ に台を持ち、$\int k=1$ を満たすとします。$k_r(y)=r^{-d}k(y/r)$ は全質量1を保ちながら $r\downarrow0$ で原点近くへ集中します。

<a id="prop-ha1-approximate-identity"></a>
<!-- formal-statement-start -->
> **命題（コンパクト台の近似恒等族）**  
> $f\in L^1_{\mathrm{loc}}(\mathbb R^d)$、$k\in L^\infty(\mathbb R^d)$、$\operatorname{supp}k\subset B(0,R)$、$\int_{\mathbb R^d}k(y)\,dy=1$ とする。$r>0$ に対し $k_r(y)=r^{-d}k(y/r)$ と置く。このとき $f*k_r$ は各点で絶対収束し、$f$ の各Lebesgue点 $x$ で

$$
\lim_{r\downarrow0}(f*k_r)(x)=f(x)
$$

> が成り立つ。特に、ほとんど至る所で収束する。
<!-- formal-statement-end -->

### 証明の見取り図

球平均と違って核は一定ではありませんが、$k_r$ は半径 $Rr$ の球の外で0、内で $\|k\|_\infty r^{-d}$ 以下です。差の畳み込みを、いつもの球平均の定数倍で抑えます。

<!-- proof-start -->
### 証明

任意の固定 $x$ と $r>0$ について、$f$ は $B(x,Rr)$ 上で絶対可積分であり $k_r$ は有界かつこの球の外で0なので畳み込みは絶対収束します。変数変換 $z=y/r$ により $\int k_r=1$ です。従って

$$
\begin{aligned}
|(f*k_r)(x)-f(x)|
&=\left|\int_{\mathbb R^d}k_r(x-y)(f(y)-f(x))\,dy\right|\\
&\le\frac{\|k\|_\infty}{r^d}
\int_{B(x,Rr)}|f(y)-f(x)|\,dy\\
&=v_dR^d\|k\|_\infty
\frac1{|B(x,Rr)|}\int_{B(x,Rr)}|f(y)-f(x)|\,dy.
\end{aligned}
$$

$x$ が [Lebesgue点](#def-ha1-lebesgue-point)なら最後の平均は $r\downarrow0$ で0へ収束します。
<!-- proof-end -->

## 6. 強い $L^1$ 有界性が破れる例

<a id="prop-ha1-no-strong11"></a>
<!-- formal-statement-start -->
> **命題（強い(1,1)評価の失敗）**  
> どの $d\ge1$ についても、$M:L^1(\mathbb R^d)\to L^1(\mathbb R^d)$ は有界作用素ではない。実際、ある $f\in L^1$ に対して $Mf\notin L^1$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクトな球の指示関数を取ると、中心から遠く離れても大きな球がその質量を拾います。値は距離の $-d$ 乗程度で減衰しますが、$d$ 次元の体積要素は半径の $d-1$ 乗なので、積分は対数的に発散します。

<!-- proof-start -->
### 証明

$f=\boldsymbol{1}_{B(0,1)}$ を取ると $\|f\|_1=v_d<\infty$ です。$|x|>2$ なら $B(0,1)\subset B(x,|x|+1)$ であり、

$$
Mf(x)\ge\frac1{v_d(|x|+1)^d}\int_{B(0,1)}1\,dy
=\frac1{(|x|+1)^d}.
$$

$|x|>2$ では $|x|+1\le(3/2)|x|$ なので

$$
Mf(x)\ge(2/3)^d|x|^{-d}.
$$

極座標で $d$ 次元球面の面積を $d v_d$ と書けば

$$
\begin{aligned}
\int_{\mathbb R^d}Mf(x)\,dx
&\ge(2/3)^d\int_{|x|>2}|x|^{-d}\,dx\\
&=(2/3)^d d v_d\int_2^\infty t^{-d}t^{d-1}\,dt\\
&=(2/3)^d d v_d\int_2^\infty\frac{dt}{t}
=+\infty.
\end{aligned}
$$

従って $Mf\notin L^1$ です。
<!-- proof-end -->

弱 $(1,1)$ は真ですが強 $(1,1)$ は偽です。弱型は超水準集合の体積を評価する条件であって、最大関数の全空間積分を直接評価する条件ではない、という違いが具体的に見えました。

---

## 7. 演習

以下ではすべて $d\ge1$ とし、球はEuclid球、測度はLebesgue測度とします。各問題の $M$ は [中心付き最大作用素](#def-ha1-centered-maximal)です。

### 演習 HA1-A01（指示関数の原点平均）
<a id="ex-ha1-a01"></a>
- Level: A
- 問題: $f=\boldsymbol{1}_{B(0,a)}$、$a>0$ とする。原点での半径 $r$ の球平均を $r\le a$ と $r>a$ に分けて求め、$Mf(0)$ を示せ。

<!-- solution-start -->
**詳細解答**

$r\le a$ のとき球全体が $B(0,a)$ 内にあるので平均は1です。$r>a$ のとき $f=1$ となる部分の体積は $v_da^d$ であり、

$$
\frac1{v_dr^d}\int_{B(0,r)}f=\frac{v_da^d}{v_dr^d}=(a/r)^d.
$$

いずれも1以下で、$r\le a$ で1を達成するため $Mf(0)=1$ です。
<!-- solution-end -->

### 演習 HA1-A02（劣線形性）
<a id="ex-ha1-a02"></a>
- Level: A
- 問題: $f,g\in L^1_{\mathrm{loc}}(\mathbb R^d)$、$c\in\mathbb R$ とする。$M(f+g)\le Mf+Mg$ と $M(cf)=|c|Mf$ を、各球での評価から示せ。

<!-- solution-start -->
**詳細解答**

各 $r>0$ で $|f+g|\le|f|+|g|$ を積分すると

$$
\frac1{|B(x,r)|}\int_{B(x,r)}|f+g|
\le\frac1{|B(x,r)|}\int_{B(x,r)}|f|
+\frac1{|B(x,r)|}\int_{B(x,r)}|g|.
$$

左辺の $r$ に関する上限を取り、右辺の各項をそれぞれの上限で抑えると $M(f+g)(x)\le Mf(x)+Mg(x)$ です。また $|cf|=|c||f|$ を各球で積分し、上限の外へ非負の定数 $|c|$ を出して $M(cf)=|c|Mf$ を得ます。
<!-- solution-end -->

### 演習 HA1-A03（球と立方体の半径比較）
<a id="ex-ha1-a03"></a>
- Level: A
- 問題: $Q(x,r)=x+(-r,r)^d$ とする。$B(x,r)\subset Q(x,r)\subset B(x,\sqrt d\,r)$ を証明し、それぞれの体積比を求めよ。

<!-- solution-start -->
**詳細解答**

$|y-x|<r$ なら全成分について $|y_j-x_j|\le|y-x|<r$ なので球は立方体に含まれます。$y\in Q(x,r)$ なら

$$
|y-x|^2=\sum_{j=1}^d|y_j-x_j|^2<\sum_{j=1}^d r^2=dr^2
$$

なので半径 $\sqrt d\,r$ の球に含まれます。体積は順に $v_dr^d$、$2^dr^d$、$v_dd^{d/2}r^d$ です。従って $\lvert Q\rvert/\lvert B(x,r)\rvert=2^d/v_d$、$\lvert B(x,\sqrt d\,r)\rvert/\lvert Q\rvert=v_dd^{d/2}/2^d$ です。
<!-- solution-end -->

### 演習 HA1-A04（$L^\infty$の端点）
<a id="ex-ha1-a04"></a>
- Level: A
- 問題: $f\in L^\infty(\mathbb R^d)$ に対して $\|Mf\|_\infty\le\|f\|_\infty$ を示せ。定数関数 $f\equiv c$ の場合に等号が成立することを示せ。

<!-- solution-start -->
**詳細解答**

$a=\|f\|_\infty$ とすれば $|f(y)|\le a$ がほとんどすべての $y$ で成立します。したがって任意の $x,r$ について

$$
\frac1{|B(x,r)|}\int_{B(x,r)}|f(y)|\,dy
\le\frac{a|B(x,r)|}{|B(x,r)|}=a.
$$

半径について上限を取ると各 $x$ で $Mf(x)\le a$ です。定数関数なら各球の平均が $|c|$ に等しいので $Mf\equiv|c|$ となり等号です。
<!-- solution-end -->

### 演習 HA1-A05（尺度変換）
<a id="ex-ha1-a05"></a>
- Level: A
- 問題: $a>0$、$f\in L^1_{\mathrm{loc}}(\mathbb R^d)$ に対し $f_a(x)=f(ax)$ と定める。$M f_a(x)=Mf(ax)$ を示せ。

<!-- solution-start -->
**詳細解答**

各球で変数変換 $z=ay$ をすると $dy=a^{-d}dz$、$B(x,r)$ は $B(ax,ar)$ へ移ります。従って

$$
\begin{aligned}
\frac1{v_dr^d}\int_{B(x,r)}|f(ay)|\,dy
&=\frac{a^{-d}}{v_dr^d}\int_{B(ax,ar)}|f(z)|\,dz\\
&=\frac1{v_d(ar)^d}\int_{B(ax,ar)}|f(z)|\,dz.
\end{aligned}
$$

$r>0$ が動けば $ar$ は正のすべての実数を動くため、上限は $Mf(ax)$ です。
<!-- solution-end -->

### 演習 HA1-B01（有限被覆の中心間距離）
<a id="ex-ha1-b01"></a>
- Level: B
- 問題: $B(a,R)$ と $B(b,s)$ が交わり、$0<s\le R$ とする。$B(b,s)\subset B(a,3R)$ を証明せよ。また、交差条件を落とした場合に結論が偽となる具体例を示せ。

<!-- solution-start -->
**詳細解答**

交点 $z$ を取ると $|a-b|\le|a-z|+|z-b|<R+s$ です。任意の $y\in B(b,s)$ について

$$
|y-a|\le|y-b|+|b-a|<s+R+s=R+2s\le3R.
$$

よって包含が成り立ちます。交差条件なしでは、例えば $a=0$、$R=s=1$、$b=(10,0,\ldots,0)$ とすれば二球は交わらず、$b\in B(b,1)$ ですが $b\notin B(0,3)$ です。被覆補題で除去する球を交差によって対応させる理由はこの条件にあります。
<!-- solution-end -->

### 演習 HA1-B02（非中心版の弱型定数）
<a id="ex-ha1-b02"></a>
- Level: B
- 問題: $f\in L^1(\mathbb R^d)$、$\lambda>0$ とする。$M_{\mathrm u}f\le2^dMf$ と中心付き最大作用素の弱 $(1,1)$ 推定から、$\{M_{\mathrm u}f>\lambda\}$ の測度を評価せよ。$M_{\mathrm u}f<\infty$ がほとんど至る所で成立することも示せ。

<!-- solution-start -->
**詳細解答**

比較式から $M_{\mathrm u}f(x)>\lambda$ なら $Mf(x)>\lambda/2^d$ です。[弱 $(1,1)$ 推定](#thm-ha1-weak11)の閾値を $\lambda/2^d$ に取ると

$$
|\{M_{\mathrm u}f>\lambda\}|
\le|\{Mf>\lambda/2^d\}|
\le\frac{3^d\|f\|_1}{\lambda/2^d}
=\frac{6^d}{\lambda}\|f\|_1.
$$

$\{M_{\mathrm u}f=\infty\}$ はすべての集合 $\{M_{\mathrm u}f>n\}$ に含まれるので、その測度は任意の $n$ に対して $6^d\|f\|_1/n$ 以下です。$n\to\infty$ で0となります。
<!-- solution-end -->

### 演習 HA1-B03（可測集合の密度）
<a id="ex-ha1-b03"></a>
- Level: B
- 問題: $E\subset\mathbb R^d$ をLebesgue可測集合とする。$E$ が無限測度でも $\boldsymbol{1}_E\in L^1_{\mathrm{loc}}$ であることを確認し、$\lvert E\cap B(x,r)\rvert/\lvert B(x,r)\rvert$ がほとんど至る所で $\boldsymbol{1}_E(x)$ へ収束することを示せ。

<!-- solution-start -->
**詳細解答**

任意のコンパクト集合 $K$ について

$$
\int_K|\boldsymbol{1}_E(y)|\,dy=|E\cap K|\le|K|<\infty.
$$

よって $\boldsymbol{1}_E\in L^1_{\mathrm{loc}}$ です。[高次元Lebesgue微分定理](#thm-ha1-differentiation)をこの関数に適用すれば、ほとんどすべての $x$ で

$$
\lim_{r\downarrow0}\frac1{|B(x,r)|}\int_{B(x,r)}\boldsymbol{1}_E(y)\,dy
=\boldsymbol{1}_E(x).
$$

積分は $E\cap B(x,r)$ の測度に等しいので結論が出ます。$|E|$ が有限であることは一度も使っていません。
<!-- solution-end -->

### 演習 HA1-B04（畳み込み核の形）
<a id="ex-ha1-b04"></a>
- Level: B
- 問題: $k\in L^\infty(\mathbb R^d)$ の台が $B(0,R)$ に含まれ、$\int k=1$ とする。$k_r(x)=r^{-d}k(x/r)$ とおく。$f\in L^1_{\mathrm{loc}}$ のLebesgue点 $x$ で $f*k_r(x)\to f(x)$ を、正規化と積分差の上界を明記して示せ。

<!-- solution-start -->
**詳細解答**

変数変換 $u=z/r$ によって

$$
\int_{\mathbb R^d}k_r(z)\,dz
=\int_{\mathbb R^d}r^{-d}k(z/r)\,dz
=\int_{\mathbb R^d}k(u)\,du=1.
$$

また $k_r(x-y)$ は $|x-y|\ge Rr$ で0なので、

$$
\begin{aligned}
|f*k_r(x)-f(x)|
&=\left|\int k_r(x-y)[f(y)-f(x)]\,dy\right|\\
&\le r^{-d}\|k\|_\infty\int_{B(x,Rr)}|f(y)-f(x)|\,dy\\
&=v_dR^d\|k\|_\infty
\frac1{|B(x,Rr)|}\int_{B(x,Rr)}|f(y)-f(x)|\,dy.
\end{aligned}
$$

最後の平均はLebesgue点の定義から0へ収束します。核が非負であるという仮定は不要で、質量1と一様な大きさ・台の制御が使われています。
<!-- solution-end -->

### 演習 HA1-C01（弱型と強型を同時に判定）
<a id="ex-ha1-c01"></a>
- Level: C
- 問題: $f=\boldsymbol{1}_{B(0,1)}$ とする。$d$ 次元で $f\in L^1$ かつ $Mf\notin L^1$ を証明せよ。一方、$f$ のLebesgue点がほとんど至る所にあることを、球の内部・外部・境界の場合に分けて確認せよ。弱 $(1,1)$ と微分定理に矛盾しない理由も説明せよ。

<!-- solution-start -->
**詳細解答**

まず $\|f\|_1=|B(0,1)|=v_d$ なので $f\in L^1$ です。$|x|>2$ なら半径 $|x|+1$ の球 $B(x,|x|+1)$ は $B(0,1)$ を含み、

$$
Mf(x)\ge\frac{|B(0,1)|}{|B(x,|x|+1)|}
=\frac1{(|x|+1)^d}
\ge(2/3)^d|x|^{-d}.
$$

したがって

$$
\int_{\mathbb R^d}Mf(x)\,dx
\ge(2/3)^ddv_d\int_2^\infty t^{-1}\,dt=\infty,
$$

であり、強 $(1,1)$ は失敗します。

一方 $|x|<1$ なら $r<1-|x|$ で $f(y)=f(x)=1$ が $B(x,r)$ 内で成立します。$|x|>1$ なら $r<|x|-1$ で $f(y)=f(x)=0$ が球内で成立します。どちらも差の平均は0です。境界 $\{x:|x|=1\}$ はLebesgue測度0なので、ここでの挙動を除外して「ほとんど至る所のLebesgue点」を得ます。

[弱型評価](#thm-ha1-weak11)は $|\{Mf>\lambda\}|\le3^d\|f\|_1/\lambda$ という超水準集合の評価で、$\int Mf<\infty$ を要請しません。微分定理は $r\downarrow0$ という局所極限の主張です。一方 $Mf\notin L^1$ の原因は $|x|\to\infty$ での減衰の遅さです。対象にする極限・量が異なるため矛盾はありません。
<!-- solution-end -->

---

高次元でも、「重なりを整理した球の体積制御」から「ほとんど至る所での値の回復」までが一続きの論証として得られました。次は、この弱い端点評価と $L^\infty$ 評価をどのような条件で $L^p$ の強い評価へ結び付けられるかを調べます。
