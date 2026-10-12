# NDA3 数の幾何と同時Diophantine近似

[NT7の一次元Dirichlet近似](../../NT/NT7/index.md#lem-nt7-dirichlet-approximation)では、数直線を区間に分け、二つの小数部分を同じ区間へ入れました。[前章のHurwitzの近似定理](../NDA2/index.md#thm-nda2-hurwitz)はその一変数の誤差定数を精密化しました。しかし、複数の実数 $\alpha_1,\ldots,\alpha_d$ を**同じ分母**で近似するには、各座標を別々に近似するだけでは足りません。分母が一致する保証がないからです。

発想を変え、整数点を多次元空間の格子として配置します。十分大きい立体の中には格子点が必ず入る、という**体積による存在証明**を得られれば、同時近似も一つの不等式系として処理できます。今回は格子の基礎から体積による衝突の補題、対称な凸体の格子点定理へ進み、同時近似・線形形式への二つの応用を導きます。

## 1. 整数点を線形変換して格子を作る

整数点の集合 $\mathbb Z^n$ を、可逆な実行列で変換したものを考えます。例えば平面で横方向を2倍、縦方向を3倍すると、整数点は幅2・高さ3の網目になります。近傍の点の間隔は変化しますが、一つの網目が占める面積は一定です。

<a id="def-nda3-lattice"></a>

<!-- formal-statement-start -->
> **定義（格子と基本領域）**  
> $n\ge1$、$A\in\mathbb R^{n\times n}$、$\det A\ne0$ とする。集合
$$
\Lambda=A\mathbb Z^n
=\{Az:z\in\mathbb Z^n\}
$$
> を $\mathbb R^n$ の全階数格子という。また、半開平行多面体
$$
F_A=A[0,1)^n
$$
> をこの基底 $A$ による基本領域と呼ぶ。格子の共体積（基本領域の体積）は
$$
\operatorname{covol}(\Lambda)=|\det A|
$$
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda3-lattice -->
**定義の確認**：$A=\operatorname{diag}(2,3)$ と置くと、$\Lambda=\{(2m,3k):m,k\in\mathbb Z\}$、$F_A=[0,2)\times[0,3)$ です。その面積は $2\cdot3=6=|\det A|$ となります。整数の組 $(m,k)$ を一つずつずらすと、基本領域の平行移動は重なりなく平面を覆います。
<!-- definition-example-end -->

この定義が行列 $A$ の選び方に依存しない理由も確認します。各 $x\in\mathbb R^n$ には一意な表示
$$
A^{-1}x=z+u,\qquad z\in\mathbb Z^n,\quad u\in[0,1)^n
$$
があります。各座標について整数部分 $z_i=\lfloor(A^{-1}x)_i\rfloor$ を取るためです。ゆえに $x=Az+Au$ で、$\{F_A+\lambda:\lambda\in\Lambda\}$ は空間を境界の扱いも含めて一意に分割します。

<a id="prop-nda3-covolume-independent"></a>

<!-- formal-statement-start -->
> **命題（共体積の基底不変性）**  
> $A,B\in GL_n(\mathbb R)$ が $A\mathbb Z^n=B\mathbb Z^n$ を満たすなら
$$
|\det A|=|\det B|.
$$
> また、$\Lambda=A\mathbb Z^n$ と任意の有界集合 $S\subset\mathbb R^n$ に対し、$\Lambda\cap S$ は有限集合である。
<!-- formal-statement-end -->

### 証明の見取り図

同じ格子の基底変換行列は、逆も整数成分を持つため行列式が $\pm1$ になります。離散性は逆行列で整数点へ戻すと分かります。

<!-- proof-start -->
### 証明

$U=A^{-1}B$ と置きます。$B$ の各列は $A\mathbb Z^n$ に属するので、$U$ の全成分は整数です。逆に $A$ の列は $B\mathbb Z^n$ に属するので、$U^{-1}=B^{-1}A$ の全成分も整数です。[行列式の乗法性](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)を適用すると
$$
\det U\det U^{-1}=1.
$$
両行列式は整数であり、積が $1$ なので $\det U=\pm1$ です。したがって
$$
|\det B|=|\det A|\,|\det U|=|\det A|.
$$
離散性について、有界な $S$ を $A^{-1}$ で移すと $A^{-1}S$ も有界です。各座標は有界な区間に入り、その区間に属する整数は有限個しかありません。よって
$$
\Lambda\cap S=A\bigl(\mathbb Z^n\cap A^{-1}S\bigr)
$$
は有限です。
<!-- proof-end -->

ここで用いる $n$ 次元体積 $\operatorname{vol}_n$ は、直方体で辺長の積になり、平行移動で不変、重ならない有限個の集合で加法的な通常のEuclid体積です。可逆線形変換 $A$ が体積を $|\det A|$ 倍することは、[RA7の線形写像の体積倍率定理](../../../基礎科目/RA/RA7/index.md#thm-ra7-linear-volume)で証明済みです。基本行列変形では座標交換・せん断が体積を保ち、拡大が倍率を与えます。変換の合成に対する倍率は[行列式の乗法性](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)と一致します。

## 2. 平行移動した集合が衝突する：Blichfeldt補題

格子の一点が特定の集合に入るかどうかは、その集合の位置に依存します。しかし共体積より大きな集合を**一枚の基本領域へ折り返す**と、二つの点が同じ場所に重ならざるを得ません。その差は格子点です。

<a id="lem-nda3-blichfeldt"></a>

<!-- formal-statement-start -->
> **補題（Blichfeldt補題）**  
> $\Lambda\subset\mathbb R^n$ を全階数格子とし、$E\subset\mathbb R^n$ を有界なJordan可測集合（境界の体積が零の集合）とする。
$$
\operatorname{vol}_n(E)>\operatorname{covol}(\Lambda)
$$
> ならば、相異なる $x,y\in E$ が存在して
$$
x-y\in\Lambda\setminus\{0\}
$$
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

整数点を単に数えるのではありません。集合 $E$ の各部分を基本領域 $F_A$ に平行移動で戻し、重なり回数を数えます。重なり回数の平均は体積比なので、平均が1を超えればどこかで2以上になります。

<!-- proof-start -->
### 証明

$\Lambda=A\mathbb Z^n$、$F=F_A$ とします。$E$ が有界なので、$E$ と交わる平行移動領域 $F+\lambda$ は有限個しかありません。$u\in F$ で
$$
N(u)=\sum_{\lambda\in\Lambda}\mathbf1_E(u+\lambda)
$$
と置きます。ここで $\mathbf1_E(v)$ は $v\in E$ なら1、それ以外なら0です。和に寄与する $\lambda$ は有限個で、$N(u)$ は非負整数です。各項を $F$ 上で積分し、平行移動 $x=u+\lambda$ を行うと
$$
\begin{aligned}
\int_F N(u)\,du
&=\sum_{\lambda\in\Lambda}\int_F\mathbf1_E(u+\lambda)\,du\\
&=\sum_{\lambda\in\Lambda}\operatorname{vol}_n(E\cap(F+\lambda))\\
&=\operatorname{vol}_n(E).
\end{aligned}
$$
最後の等号は、平行移動領域が空間を重複なく分割することと体積の有限加法性によります。[Jordan可測性](../../../基礎科目/RA/RA7/index.md#def-ra7-jordan-measurable)により、0か1かを取る関数の積分は通常の体積計算として扱えます。

もしすべての $u\in F$ で $N(u)\le1$ なら
$$
\operatorname{vol}_n(E)=\int_F N(u)\,du
\le\operatorname{vol}_n(F)=\operatorname{covol}(\Lambda)
$$
となり仮定に反します。したがってある $u\in F$ で $N(u)\ge2$ です。相異なる $\lambda_1,\lambda_2\in\Lambda$ を選べば
$$
x=u+\lambda_1\in E,\qquad y=u+\lambda_2\in E,
$$
かつ $x-y=\lambda_1-\lambda_2\in\Lambda\setminus\{0\}$ です。
<!-- proof-end -->

重要なのは、補題が得るのは**集合そのものに属する格子点**ではなく、**集合の二点の差としての格子点**だという点です。この差を元の集合へ戻すため、次に対称性と凸性を使います。

## 3. 差を元の凸体へ戻す：Minkowskiの凸体定理

原点を中心とする対称な凸体 $K$ を半分に縮めて $E=K/2$ とすると、$x,y\in E$ の差は $K$ に入ります。これは $2x\in K$ と $-2y\in K$ の中点が $x-y$ になるからです。

<a id="def-nda3-symmetric-convex-body"></a>

<!-- formal-statement-start -->
> **定義（原点対称な凸体）**  
> $K\subset\mathbb R^n$ がコンパクトで、内部が空でなく、二点を結ぶ線分をすべて含み、さらに $K=-K$ を満たすとき、原点対称な凸体という。二点を結ぶ線分を含む条件は
$$
u,v\in K,\quad 0\le t\le1
\ \Longrightarrow\ (1-t)u+tv\in K
$$
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda3-symmetric-convex-body -->
**定義の確認**：$K=[-2,2]\times[-3,3]$ は閉・有界で、内部に開長方形を含みます。二点の座標を $0\le t\le1$ で補間しても各座標は同じ範囲にとどまり、$(x,y)\in K$ なら $(-x,-y)\in K$ です。従って原点対称な凸体です。一方 $(1,3)\times[-M,M]$ は凸でも原点対称ではありません。
<!-- definition-example-end -->

<a id="thm-nda3-minkowski"></a>

<!-- formal-statement-start -->
> **定理（Minkowskiの凸体定理）**  
> $n\ge1$、$\Lambda\subset\mathbb R^n$ を全階数格子、$K\subset\mathbb R^n$ を原点対称な凸体とする。
$$
\operatorname{vol}_n(K)\ge 2^n\operatorname{covol}(\Lambda)
$$
> ならば
$$
(K\cap\Lambda)\setminus\{0\}\ne\varnothing.
$$
<!-- formal-statement-end -->

### 証明の見取り図

体積が厳密に大きいときは、$K/2$ に[Blichfeldt補題](#lem-nda3-blichfeldt)を使います。等号の場合はわずかに拡大した凸体で格子点を見つけ、有界領域内の格子点の有限性と $K$ の閉性で極限を取ります。境界上の格子点を落とさないための二段階です。

<!-- proof-start -->
### 証明

まず $\operatorname{vol}_n(K)>2^n\operatorname{covol}(\Lambda)$ とします。$E=\tfrac12K$ は有界なJordan可測集合であり、
$$
\operatorname{vol}_n(E)=2^{-n}\operatorname{vol}_n(K)>
\operatorname{covol}(\Lambda)
$$
です。凸体はJordan可測です。実際、原点が内部にあることを利用し、境界を $(1-\delta)K$ と $(1+\delta)K$ の間の薄い層で覆うと、その層の体積比は $(1+\delta)^n-(1-\delta)^n\to0$ です。

[Blichfeldt補題](#lem-nda3-blichfeldt)から相異なる $x,y\in E$ が取れ、$z=x-y\in\Lambda\setminus\{0\}$ です。$2x,2y\in K$ で、対称性から $-2y\in K$。凸性へ係数 $t=1/2$ を代入すれば
$$
z=x-y=\frac12(2x)+\frac12(-2y)\in K.
$$

次に $\operatorname{vol}_n(K)=2^n\operatorname{covol}(\Lambda)$ とします。$m=1,2,\ldots$ に対して
$$
K_m=(1+1/m)K
$$
と置くと、$\operatorname{vol}_n(K_m)=(1+1/m)^n\operatorname{vol}_n(K)>2^n\operatorname{covol}(\Lambda)$。既に証明した厳密不等号の場合から
$$
z_m\in (K_m\cap\Lambda)\setminus\{0\}
$$
を選べます。$K_m\subset2K$ であり、[格子点の局所有限性](#prop-nda3-covolume-independent)から $\Lambda\cap2K$ は有限集合です。従って、ある非零格子点 $z$ が無限個の $m$ に対して $z_m=z$ となります。その添字を無限大へ送ると
$$
\frac{z}{1+1/m}\in K,\qquad
\frac{z}{1+1/m}\longrightarrow z.
$$
[閉集合の点列特徴付け](../../../基礎科目/F0/F0-00B/index.md#thm-f0-00b-01)を、$K$ 内の点列 $z/(1+1/m)$ に適用すると $z\in K$ です。等号の場合も非零格子点が得られました。
<!-- proof-end -->

**境界の意味**を確認します。$\Lambda=\mathbb Z^2$、$K=[-1,1]^2$ は面積 $4=2^2\operatorname{covol}(\Lambda)$ で、$(1,0)$ が境界上にあります。開正方形 $(-1,1)^2$ は同じ面積でも零以外の整数点を含みません。後者はコンパクトでないため、等号の場合の定理に反しません。

**対称性の意味**も重要です。$K=[1/10,9/10]\times[-M,M]$ は面積 $(8/10)(2M)$ がいくらでも大きくできますが、第一座標が整数にならないので $\mathbb Z^2$ の格子点を一つも含みません。原点対称性を外すと、Blichfeldtで得た差を $K$ に戻す論理が失われます。

## 4. 同時Dirichlet近似：一つの分母で全座標を近づける

実数ベクトル $\boldsymbol\alpha=(\alpha_1,\ldots,\alpha_d)$ を整数 $q$ 倍し、整数ベクトル $\boldsymbol p$ に近づけます。$q$ の上限を $Q^d$、各座標の誤差を $1/Q$ と指定しても、この条件を満たす整数組が必ず存在することを示します。

<a id="thm-nda3-simultaneous-dirichlet"></a>

<!-- formal-statement-start -->
> **定理（同時Dirichlet近似）**  
> $d\ge1$、$\boldsymbol\alpha\in\mathbb R^d$、整数 $Q\ge2$ に対し、整数 $q,p_1,\ldots,p_d$ が存在し、
$$
1\le q\le Q^d,\qquad
|q\alpha_i-p_i|\le\frac1Q\quad (1\le i\le d)
$$
> を同時に満たす。従って
$$
\max_{1\le i\le d}
\left|\alpha_i-\frac{p_i}{q}\right|
\le\frac1{qQ}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\mathbb R^{d+1}$ で、最初の座標に分母候補 $t$、残りの座標に誤差 $t\alpha_i-x_i$ を置きます。この線形変換の行列式の絶対値は1です。$\mathbb Z^{d+1}$ の像に[Minkowskiの凸体定理](#thm-nda3-minkowski)を適用すると、必要な $d+1$ 個の不等式が同時に出ます。

<!-- proof-start -->
### 証明

整数組 $(q,p_1,\ldots,p_d)$ へ実線形写像
$$
T(q,p_1,\ldots,p_d)
=(q,q\alpha_1-p_1,\ldots,q\alpha_d-p_d)
$$
を適用し、格子 $\Lambda=T(\mathbb Z^{d+1})$ を作ります。$T$ の行列は第一列が $(1,\alpha_1,\ldots,\alpha_d)^\mathsf T$、残りが対角成分 $-1$ のブロック下三角行列なので
$$
\det T=(-1)^d,\qquad
\operatorname{covol}(\Lambda)=1.
$$
原点対称な直方体
$$
K_Q=\{(t,u_1,\ldots,u_d):
|t|\le Q^d,\ |u_i|\le Q^{-1}\}
$$
はコンパクトかつ凸で、体積は
$$
\operatorname{vol}_{d+1}(K_Q)
=(2Q^d)\left(\frac2Q\right)^d
=2^{d+1}
=2^{d+1}\operatorname{covol}(\Lambda).
$$
[Minkowskiの凸体定理](#thm-nda3-minkowski)により、$K_Q$ に非零の格子点 $T(q,\boldsymbol p)$ が存在します。これを座標で読むと
$$
|q|\le Q^d,\qquad |q\alpha_i-p_i|\le 1/Q
$$
です。もし $q=0$ なら $|p_i|\le1/Q<1$。整数 $p_i$ は全て零となり、非零の格子点という条件に反します。従って $q\ne0$ です。$(q,\boldsymbol p)$ の符号を一斉に反転できるので $q>0$ としてよく、最初の結論を得ます。最後に $q>0$ で各不等式を割れば第二の表示が従います。
<!-- proof-end -->

**二座標での確認**：$(\alpha_1,\alpha_2)=(\sqrt2,\sqrt3)$、$Q=2$ とすると $1\le q\le4$、両方の誤差が $1/2$ 以下という条件です。実際 $q=1$、$\boldsymbol p=(1,2)$ が使えます。
$$
|\sqrt2-1|<\frac12,\qquad
|\sqrt3-2|<\frac12.
$$
第一の不等式は $\sqrt2<3/2$、第二は $3/2<\sqrt3<2$ から確認できます。定理の構成はこの具体解が最小の分母であることまで主張しません。

<a id="cor-nda3-infinitely-many-simultaneous"></a>

<!-- formal-statement-start -->
> **系（少なくとも一座標が無理数なら分母は無限個）**  
> $\boldsymbol\alpha\in\mathbb R^d$ に無理数の座標が少なくとも一つあれば、相異なる正整数 $q$ が無限個存在し、適当な $\boldsymbol p\in\mathbb Z^d$ に対して
$$
\max_i|q\alpha_i-p_i|\le q^{-1/d}
$$
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$Q$ を無限大へ動かしたとき同じ分母が有限回しか選べなければ、無理数の座標の誤差が正のままなので矛盾します。

<!-- proof-start -->
### 証明

[同時Dirichlet近似](#thm-nda3-simultaneous-dirichlet)を各整数 $Q\ge2$ に適用し、$(q_Q,\boldsymbol p_Q)$ を取ります。$q_Q\le Q^d$ なので
$$
\max_i|q_Q\alpha_i-p_{Q,i}|
\le Q^{-1}\le q_Q^{-1/d}.
$$
もし現れる $q_Q$ が有限個なら、無理数の座標を一つ $\alpha_j$ として、その有限集合の各 $q$ について
$$
\delta_q=\min_{p\in\mathbb Z}|q\alpha_j-p|>0
$$
です。有限個の正数の最小値 $\delta>0$ を取ると、全ての $Q$ について $|q_Q\alpha_j-p_{Q,j}|\ge\delta$ となります。一方この誤差は $1/Q\to0$ 以下なので矛盾します。したがって異なる分母が無限にあります。
<!-- proof-end -->

ここで指数 $1/d$ は**整数倍したときの誤差**の指数です。有理数近似そのものの誤差にはさらに $1/q$ が掛かります。1次元の指数をそのまま複数座標へ移してはいけません。

## 5. 線形形式：多数の係数から一つの小さい値を作る

同時近似は一つの $q$ で多数の $\alpha_i$ を近づけました。双対的な別問題は、多数の整数係数 $m_i$ を選び、線形結合 $\sum_i\alpha_i m_i$ を**一つの整数**へ近づけることです。[Minkowskiの凸体定理](#thm-nda3-minkowski)は、線形形式を行列でまとめればこの問題も扱えます。

<a id="thm-nda3-linear-forms"></a>

<!-- formal-statement-start -->
> **定理（Minkowskiの線形形式定理）**  
> $n\ge1$ とし、実係数の線形形式 $L_i(\boldsymbol x)=\sum_{j=1}^n a_{ij}x_j$（$1\le i\le n$）が作る係数行列 $A=(a_{ij})$ は $\det A\ne0$ を満たすとする。正数 $c_1,\ldots,c_n$ が
$$
\prod_{i=1}^n c_i\ge|\det A|
$$
> を満たすなら、$\boldsymbol z\in\mathbb Z^n\setminus\{0\}$ が存在して
$$
|L_i(\boldsymbol z)|\le c_i\qquad(1\le i\le n)
$$
> を同時に満たす。
<!-- formal-statement-end -->

### 証明の見取り図

線形形式の値を並べた写像 $\boldsymbol z\mapsto A\boldsymbol z$ の格子を作ります。$\prod c_i$ の条件が、像空間に置く箱の体積条件と同一になることを確認します。

<!-- proof-start -->
### 証明

$\Lambda=A\mathbb Z^n$ は[格子の定義](#def-nda3-lattice)により全階数格子で、
$$
\operatorname{covol}(\Lambda)=|\det A|.
$$
$K=\prod_{i=1}^n[-c_i,c_i]$ は原点対称な凸体であり
$$
\operatorname{vol}_n(K)=\prod_{i=1}^n(2c_i)
=2^n\prod_{i=1}^n c_i
\ge2^n\operatorname{covol}(\Lambda).
$$
[Minkowskiの凸体定理](#thm-nda3-minkowski)から非零の $A\boldsymbol z\in\Lambda\cap K$ を得ます。$A$ は可逆なので $\boldsymbol z\ne0$。$A\boldsymbol z$ の第 $i$ 座標は $L_i(\boldsymbol z)$ であるから、箱への包含を座標で書くと所望の不等式です。
<!-- proof-end -->

<a id="cor-nda3-dual-linear-approximation"></a>

<!-- formal-statement-start -->
> **系（整数係数線形結合の近似）**  
> $d\ge1$、$\boldsymbol\alpha\in\mathbb R^d$、整数 $H\ge2$ に対し、零でない $\boldsymbol m\in\mathbb Z^d$ と整数 $p$ が存在し、
$$
\max_i|m_i|\le H,\qquad
\left|\sum_{i=1}^d\alpha_i m_i-p\right|\le H^{-d}
$$
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$d$ 本の座標形式 $L_i=m_i$ と、最後の一本 $L_{d+1}=\sum_i\alpha_i m_i-p$ を組にします。行列式の絶対値は1です。

<!-- proof-start -->
### 証明

変数を $(m_1,\ldots,m_d,p)$ とし、
$$
L_i(\boldsymbol m,p)=m_i\quad(1\le i\le d),\qquad
L_{d+1}(\boldsymbol m,p)=\sum_i\alpha_i m_i-p
$$
と定めます。係数行列は
$$
A=\begin{pmatrix}
I_d&0\\ \alpha_1\ \cdots\ \alpha_d&-1
\end{pmatrix},\qquad \det A=-1.
$$
閾値を $c_1=\cdots=c_d=H$、$c_{d+1}=H^{-d}$ とすると
$$
\prod_{i=1}^{d+1}c_i=H^dH^{-d}=1=|\det A|.
$$
[線形形式定理](#thm-nda3-linear-forms)により、零でない整数組 $(\boldsymbol m,p)$ がすべての不等式を満たします。もし $\boldsymbol m=0$ なら $|p|\le H^{-d}<1$ から $p=0$ となり、非零条件に矛盾します。よって $\boldsymbol m\ne0$ です。
<!-- proof-end -->

例えば $\boldsymbol\alpha=(\sqrt2,\sqrt3)$、$H=2$ とすると、$\boldsymbol m=(1,1)$、$p=3$ が使えます。実際
$$
0<\sqrt2+\sqrt3-3<\frac14
$$
であり、左辺は約 $0.146$ です。前節の同時近似と違い、ここでは二つの座標の誤差を別々に小さくする必要はありません。

## 6. 演習：体積の閾値と近似の量化

### Level A：定義と境界を確認する

**NDA3-A1（斜め格子の共体積）**  
$A=\begin{pmatrix}2&1\\0&3\end{pmatrix}$ に対し、$A(1,0)^\mathsf T$、$A(0,1)^\mathsf T$、基本領域の面積、共体積を求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

列ベクトルの像は $(2,0)^\mathsf T$、$(1,3)^\mathsf T$ です。基本領域は
$$
F_A=\{(2s+t,3t):0\le s,t<1\}
$$
で張られる半開平行四辺形です。行列式は
$$
\det A=2\cdot3-1\cdot0=6
$$
なので、[格子の定義](#def-nda3-lattice)と体積倍率から面積も共体積も $6$ です。形が長方形でなくても共体積は基底の行列式で求まります。
<!-- solution-end -->

**NDA3-A2（Blichfeldtの差）**  
$\Lambda=\mathbb Z$、$E=[1/10,8/5]$ にBlichfeldt補題を適用できるか確認し、整数差を持つ相異なる二点を実際に挙げてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$\operatorname{covol}(\mathbb Z)=1$ です。区間の長さは
$$
\frac85-\frac1{10}=\frac{16-1}{10}=\frac32>1
$$
だから[Blichfeldt補題](#lem-nda3-blichfeldt)が使えます。$x=6/5$、$y=1/5$ は両方とも $E$ に含まれ、相異なり、
$$
x-y=\frac65-\frac15=1\in\mathbb Z\setminus\{0\}
$$
です。補題は $x$ 自身が整数であるとは主張していません。
<!-- solution-end -->

**NDA3-A3（等号と閉性）**  
$\Lambda=\mathbb Z^2$、$K=[-1,1]^2$ で[Minkowskiの凸体定理](#thm-nda3-minkowski)の体積条件が等号になることを確かめ、対応する開正方形では何が変わるか説明してください。

- Level: A

<!-- solution-start -->
**詳細解答**

閉正方形の面積は $2\cdot2=4$ です。一方 $\operatorname{covol}(\mathbb Z^2)=1$、$2^2\cdot1=4$ です。非零整数点 $(1,0)$ は閉正方形に属します。開正方形 $(-1,1)^2$ に整数点 $(m,n)$ が入ると $|m|,|n|<1$ から $m=n=0$ です。開正方形は定理の「コンパクト」の条件を失っており、等号の場合の極限で境界点を回収できません。
<!-- solution-end -->

**NDA3-A4（二つの無理数を同時近似）**  
$\alpha_1=\sqrt2$、$\alpha_2=\sqrt3$、$Q=2$ として、$q=1$、$\boldsymbol p=(1,2)$ が[同時Dirichlet近似](#thm-nda3-simultaneous-dirichlet)の不等式を満たすことを平方比較で示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$q=1\le Q^2=4$ です。$1<\sqrt2<3/2$ は $1<2<9/4$ から得られ、
$$
0<\sqrt2-1<\frac12.
$$
また $3/2<\sqrt3<2$ は $9/4<3<4$ から得られ、
$$
0<2-\sqrt3<\frac12.
$$
よって両座標の近似誤差は $1/Q=1/2$ より小さく、同じ分母 $q=1$ で成立します。
<!-- solution-end -->

### Level B：核心証明を再構成する

**NDA3-B1（基本領域へ折り返す）**  
有界なJordan可測集合 $E$ に対し、$\Lambda=A\mathbb Z^n$、$F=A[0,1)^n$、$N(u)=\sum_{\lambda\in\Lambda}\mathbf1_E(u+\lambda)$ と置きます。$\int_F N=\operatorname{vol}_n(E)$ を導き、$\operatorname{vol}_n(E)>\operatorname{covol}(\Lambda)$ なら二点の差が非零格子点になることを示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$E$ の有界性より関与する $\lambda$ は有限個で、和と積分を交換できます。$v=u+\lambda$ と平行移動すると
$$
\begin{aligned}
\int_F N(u)\,du
&=\sum_\lambda\int_F\mathbf1_E(u+\lambda)\,du\\
&=\sum_\lambda\operatorname{vol}_n(E\cap(F+\lambda))\\
&=\operatorname{vol}_n(E).
\end{aligned}
$$
最後は $F+\lambda$ が $\mathbb R^n$ を分割することを使いました。もし $N(u)\le1$ がすべての $u$ で成立すれば、左辺は $\operatorname{vol}_n(F)=\operatorname{covol}(\Lambda)$ 以下となり仮定に矛盾します。よって $N(u)\ge2$ となる $u$ を選べます。異なる $\lambda_1,\lambda_2$ によって $u+\lambda_1,u+\lambda_2\in E$ であり、差は $\lambda_1-\lambda_2\in\Lambda\setminus\{0\}$ です。[Blichfeldt補題](#lem-nda3-blichfeldt)を積分の式から再構成しました。
<!-- solution-end -->

**NDA3-B2（等号で非零点を失わない理由）**  
原点対称なコンパクト凸体 $K$ で $\operatorname{vol}_n(K)=2^n\operatorname{covol}(\Lambda)$ を仮定します。厳密不等号に限った[Minkowskiの凸体定理](#thm-nda3-minkowski)のみを既知として、等号の場合を証明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$m\ge1$ に対して $K_m=(1+1/m)K$ とすれば、
$$
\operatorname{vol}_n(K_m)=(1+1/m)^n2^n\operatorname{covol}(\Lambda)
>2^n\operatorname{covol}(\Lambda).
$$
厳密不等号版から非零点 $z_m\in\Lambda\cap K_m$ が存在します。$K_m\subset2K$ で、$2K$ は有界なので[格子点の局所有限性](#prop-nda3-covolume-independent)から $\Lambda\cap2K$ は有限です。よって一定の非零点 $z$ が無限回選ばれます。その添字に沿って $z/(1+1/m)\in K$ かつ $z/(1+1/m)\to z$ です。閉性により $z\in K\cap\Lambda$。非零性も保たれます。[Minkowskiの凸体定理](#thm-nda3-minkowski)の等号部分の核心は「有限個の候補の一つが固定される」ことです。
<!-- solution-end -->

**NDA3-B3（共体積は基底に依存しない）**  
$A,B$ が同じ全階数格子を張るとき、$A^{-1}B$ とその逆行列が整数成分を持つことから共体積の一致を導いてください。逆行列が整数成分を持つという条件を省略できない理由も述べてください。

- Level: B

<!-- solution-start -->
**詳細解答**

$U=A^{-1}B$ と置きます。$B$ の列は $A\mathbb Z^n$ の元なので $U$ は整数行列です。逆に格子が同じという仮定から $A$ の列は $B\mathbb Z^n$ に属し、$U^{-1}=B^{-1}A$ も整数行列になります。[行列式の乗法性](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)で
$$
1=\det I=\det(UU^{-1})=(\det U)(\det U^{-1}).
$$
両因子が整数だから $\det U=\pm1$、従って
$$
|\det B|=|\det A|\,|\det U|=|\det A|.
$$
$U$ だけが整数成分を持てば十分だとすると、例えば $A=I_2$、$U=2I_2$ は整数行列でも $\det U=4$ であり、$B\mathbb Z^2=2\mathbb Z^2$ は $A\mathbb Z^2$ の真部分格子です。逆向きの包含が必要です。
<!-- solution-end -->

**NDA3-B4（線形結合の整数近似）**  
$d=2$ の場合に線形形式 $m_1,m_2,\alpha_1m_1+\alpha_2m_2-p$ の係数行列を作り、$H\ge2$ に対して非零の $(m_1,m_2)\in\mathbb Z^2$ を得る証明を再構成してください。

- Level: B

<!-- solution-start -->
**詳細解答**

整数変数を $(m_1,m_2,p)$ とし、
$$
A=\begin{pmatrix}1&0&0\\0&1&0\\\alpha_1&\alpha_2&-1\end{pmatrix}
$$
と置くと $\det A=-1$ です。$c_1=c_2=H$、$c_3=H^{-2}$ なら積は $1=|\det A|$。[線形形式定理](#thm-nda3-linear-forms)を適用して、非零の整数組が
$$
|m_1|,|m_2|\le H,\qquad
|\alpha_1m_1+\alpha_2m_2-p|\le H^{-2}
$$
を満たします。$m_1=m_2=0$ なら $|p|\le H^{-2}<1$ から整数 $p=0$、全成分零となって矛盾します。したがって $(m_1,m_2)\ne(0,0)$ です。変数が三つあるのに二次元でMinkowskiを使わない点に注意します。
<!-- solution-end -->

### Level C：重み付き近似と格子の設計

**NDA3-C1（重み付き同時Dirichlet近似）**  
$d\ge1$、実数 $\alpha_1,\ldots,\alpha_d$、正数 $T,\varepsilon_1,\ldots,\varepsilon_d$ が $T\prod_i\varepsilon_i\ge1$、かつ $0<\varepsilon_i<1$ を満たすとします。適当な整数 $q,p_1,\ldots,p_d$ が存在し、
$$
1\le q\le T,\qquad
|q\alpha_i-p_i|\le\varepsilon_i\quad(1\le i\le d)
$$
を満たすことを証明してください。さらに $d=2$、$(\alpha_1,\alpha_2)=(\sqrt2,\sqrt3)$、$(\varepsilon_1,\varepsilon_2)=(1/2,1/3)$、$T=6$ の体積条件を確認し、具体的な解を一組示してください。

- Level: C

<!-- solution-start -->
**詳細解答**

整数組 $(q,\boldsymbol p)\in\mathbb Z^{d+1}$ に
$$
S(q,\boldsymbol p)=(q,q\alpha_1-p_1,\ldots,q\alpha_d-p_d)
$$
を対応させます。その行列は先に使ったものと同じく行列式 $(-1)^d$ を持つので、像格子 $\Lambda=S(\mathbb Z^{d+1})$ の共体積は $1$ です。原点対称な箱
$$
K=[-T,T]\times\prod_{i=1}^d[-\varepsilon_i,\varepsilon_i]
$$
を取ると
$$
\operatorname{vol}_{d+1}(K)
=(2T)\prod_{i=1}^d(2\varepsilon_i)
=2^{d+1}T\prod_{i=1}^d\varepsilon_i
\ge2^{d+1}\operatorname{covol}(\Lambda).
$$
[Minkowskiの凸体定理](#thm-nda3-minkowski)から非零の整数組の像が $K$ に入ります。つまり $|q|\le T$、$|q\alpha_i-p_i|\le\varepsilon_i$ です。もし $q=0$ なら各整数 $p_i$ は $|p_i|\le\varepsilon_i<1$ により零で、非零条件に矛盾します。よって $q\ne0$ であり、全整数の符号を変えて $q>0$ とできます。

数値例では
$$
T\varepsilon_1\varepsilon_2
=6\cdot\frac12\cdot\frac13=1
$$
で等号です。$q=1$、$(p_1,p_2)=(1,2)$ なら、前節と同じ平方比較で
$$
|\sqrt2-1|<\frac12,\qquad |2-\sqrt3|<\frac13
$$
となります。後者は $\sqrt3>5/3$、すなわち $3>25/9$ から従います。したがって明示解も条件を満たします。元の同時近似定理は $T=Q^d$、全 $\varepsilon_i=1/Q$ とした特別な場合です。
<!-- solution-end -->

この章の二つの構成は、**連立した誤差を一つの対称凸体へまとめる**という同じ操作です。次章では「解が一度ある」から「分母を変えてどの程度均等に現れるか」へ問いを進めます。
