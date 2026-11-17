# MIR2-07 B側Yukawaの座標変換と規格化

<!-- definition-example-audit: strict -->

## 1. 何を揃えれば、A側とB側の三次結合を比較できるか

[前講の量子微分系](../MIR2-06/index.md#prop-mir2-06-quintic-system)は、quinticのA側三点関数を係数として持つ。一方、[MIR1-16で得たB側Yukawa結合](../MIR1-16/index.md#def-mir1-16-yukawa-cubic)は、ミラー族の正則3形式をGauss–Manin接続で三回微分して作る。両方を「Yukawa」と呼ぶだけで等しいわけではない。変数、微分方向、3形式の倍率、交叉形式の倍率が一致して初めて係数を比較できる。

今回は既習の座標変換公式を、**どの倍率を変えても値が保存されるか**という観点から組み立て直す。さらに、正則周期を一回だけ割る誤りや、$2\pi i$ を落とす誤りを実際の係数で見分ける。

B側では、[正則周期](../MIR1-11/index.md#thm-mir1-11-regular-period)と[ミラー写像](../MIR1-15/index.md#def-mir1-15-mirror-coordinate)を

$$
\omega_0(z)=1+120z+113400z^2+O(z^3),\qquad
h(z)=\frac{A_1(z)}{\omega_0(z)}
=770z+717825z^2+O(z^3),
$$

$$
q_B=ze^{h(z)},\qquad
u_B=\operatorname{Log}q_B=\operatorname{Log}z+h(z),\qquad
t_B=\frac{u_B}{2\pi i}
$$

とする。ここで $z=(5\psi)^{-5}$ はB側族の座標、$u_B$ は選んだ対数分枝上の座標、$q_B$ は単価な局所座標である。$0<|z|<\delta<1/3125$ の単連結な切断領域を取り、$\omega_0(z)\ne0$ かつ $1+zh'(z)\ne0$ を満たすよう $\delta$ を小さくする。[局所双正則性](../MIR1-15/index.md#thm-mir1-15-local-biholomorphism)により $q_B$ を逆に解ける。

A側では、[種数0の三点関数](../MIR2-05/index.md#prop-mir2-05-yukawa-series)を、独立な形式変数 $Q,\tau$ に対して

$$
Y_A^X(\tau,Q)=C_{HHH}^X(x),\qquad
x=Qe^\tau,\qquad
C_{HHH}^X(x)=5+\sum_{d\ge1}d^3N_d^Xx^d
$$

と書く。$N_d^X$ は有理数値の種数0仮想GW不変量である。**$x$ と $q_B$ は現時点で別の対象**であり、形式変数を同じ文字で書くことと、A/Bの等式を証明することは区別する。

## 2. 三つの変換：座標、正則3形式、交叉形式

B側の3形式 $\Omega_z$ と平行な交代形式 $Q_{\!B}$ から、[Hodge三次結合](../MIR1-16/index.md#def-mir1-16-yukawa-cubic)

$$
C_{zzz}=Q_{\!B}(\Omega_z,\nabla_z^3\Omega_z)
$$

を作る。ここでは $Q_{\!B}$ とA側のNovikov変数 $Q$ を混同しない。$Q_{\!B}$ はコホモロジー類二つを数へ送る双線形形式、$Q$ は曲線次数を数える形式変数である。

既習の[三次結合の座標変換・形式の再規格化](../MIR1-16/index.md#prop-mir1-16-cubic-coordinate)では、$w$ が別の局所座標、$g$ が零を持たない正則関数のとき

$$
C_{www}=\left(\frac{dz}{dw}\right)^3C_{zzz},\qquad
C^{g\Omega}_{zzz}=g(z)^2 C^\Omega_{zzz}
$$

となる。第一式の三乗は三つの微分方向に由来し、第二式の二乗は交叉形式の**左右に現れる二つの3形式**に由来する。

一方、$Q_{\!B}$ を $cQ_{\!B}$（$c\ne0$ は定数）とすれば、$C_{zzz}$ は $c$ 倍になる。この第三の自由度は3形式の倍率とは異なる。

<a id="prop-mir2-07-period-gauge"></a>

<!-- formal-statement-start -->
> **命題（周期で割った三次結合の変換不変性）**  
> 重さ3のHodgeフィルトレーションと平行交代形式 $Q_{\!B}$ のもとで、$\Omega$ が $Q_{\!B}(\Omega,\nabla\Omega)=Q_{\!B}(\Omega,\nabla^2\Omega)=0$ を満たすとする。局所座標 $z,w$ は双正則に対応し、$g(z)$ は零を持たない正則関数とする。$\omega(z)=\int_\gamma\Omega_z$ を同じ平行サイクル $\gamma$ 上の非零周期とする。対数座標 $u_B$ を固定したとき

$$
\mathcal K(u_B):=\frac{C_{zzz}}{\omega^2}
\left(\frac{dz}{du_B}\right)^3
$$

> は $z$ を $w$ に取り替えても、$\Omega$ を $g\Omega$ に取り替えても不変である。ただし $Q_{\!B}$ を $cQ_{\!B}$ と取り替えれば $\mathcal K$ は $c$ 倍になる。
<!-- formal-statement-end -->

### 証明の見取り図

座標変換では三つのJacobianが逆向きの三つと相殺される。形式を掛け替える場合は三次結合の $g^2$ と周期の $g^2$ を相殺する。交叉形式だけの倍率は分母には現れない。

<!-- proof-start -->
### 証明

$w=w(z)$ は局所双正則だから、$dw/dz$ と $dz/dw$ はともに非零である。[三次結合の変換公式](../MIR1-16/index.md#prop-mir1-16-cubic-coordinate)と連鎖律により

$$
\begin{aligned}
\frac{C_{www}}{\omega^2}\left(\frac{dw}{du_B}\right)^3
&=\frac{(dz/dw)^3C_{zzz}}{\omega^2}
\left(\frac{dw}{dz}\frac{dz}{du_B}\right)^3\\
&=\frac{C_{zzz}}{\omega^2}\left(\frac{dz}{du_B}\right)^3.
\end{aligned}
$$

一方、$\widetilde\Omega=g\Omega$ とすると線形な周期積分により $\widetilde\omega=g\omega$ である。3形式の三階微分には $g',g'',g'''$ を含む項が生じるが、仮定の二つの直交性と交代性でそれらが消え、[同じ既習命題](../MIR1-16/index.md#prop-mir1-16-cubic-coordinate)より $\widetilde C=g^2C$ となる。ゆえに

$$
\frac{\widetilde C}{\widetilde\omega^2}
=\frac{g^2C}{(g\omega)^2}
=\frac C{\omega^2}.
$$

最後に $Q_{\!B}\mapsto cQ_{\!B}$ は $C$ のみに $c$ を掛け、周期 $\omega$ や座標微分を変えないので $\mathcal K\mapsto c\mathcal K$ である。
<!-- proof-end -->

**定義に立ち返る確認例。** $z=w+w^2$、$q_B=z$、$\omega=1$、$C_{zzz}=5/z^3$ とする。$w$ が0の十分小さい穿孔近傍では $dz/dw=1+2w\ne0$ である。また $du_B/dw=(1+2w)/z$ なので $dw/du_B=z/(1+2w)$。従って

$$
C_{www}=\frac{5(1+2w)^3}{z^3},\qquad
C_{www}\left(\frac{dw}{du_B}\right)^3=5.
$$

次に $g(z)=1+z$（$|z|<1/2$）とすれば $\widetilde C=(1+z)^2C$、$\widetilde\omega=1+z$ だから、やはり商は5となる。これに対し $Q_{\!B}\mapsto 2Q_{\!B}$ だけを行うと結果は10であり、不変ではない。**何を同時に変えたか**が結論を決める。

## 3. 規格化を固定してから平坦座標に移す

[MIR1-16の有理形定理](../MIR1-16/index.md#thm-mir1-16-rational-yukawa)から、適切な局所的3形式に対し

$$
C_{zzz}=\frac{\kappa}{z^3(1-3125z)}
$$

である。ただし $\kappa$ はPicard–Fuchs方程式**だけからは決まらない**。以下では周期 $\omega_0(0)=1$ に対応する3形式と、古典三重交叉数に合わせる追加の幾何学的規格化 $\kappa=5$ を採る。$g(0)\ne1$ の掛け替えをして $\kappa$ の数値だけを5に固定し直すことはしない。

[周期規格化したB側Yukawa結合](../MIR1-16/index.md#def-mir1-16-normalized-yukawa)を、選択した対数分枝上で

$$
K_B(q_B)=\frac{C_{zzz}}{\omega_0(z)^2}
\left(\frac{dz}{du_B}\right)^3,\qquad z=Z(q_B)
$$

と読む。$u_B=2\pi it_B$ なので

$$
\frac{dz}{dt_B}=2\pi i\frac{dz}{du_B},\qquad
K_B(q_B)=\frac{1}{(2\pi i)^3}
\frac{C_{zzz}}{\omega_0^2}
\left(\frac{dz}{dt_B}\right)^3.
$$

この $1/(2\pi i)^3$ は都合のよい補正ではなく、**三つの微分方向を $t_B$ から $u_B$ に戻す**Jacobianである。

<a id="prop-mir2-07-regularity"></a>

<!-- formal-statement-start -->
> **命題（quinticの規格化式と原点での正則延長）**  
> $\omega_0(0)=1$、$h(0)=0$、$q_B=ze^{h(z)}$ とし、$\omega_0$ と $h$ は原点近傍で正則とする。$\omega_0(z)\ne0$、$1+zh'(z)\ne0$ の穿孔近傍で、$C_{zzz}=5/[z^3(1-3125z)]$ を採る。このとき

$$
K_B(q_B(z))
=\frac{5}{(1-3125z)\,\omega_0(z)^2\,(1+zh'(z))^3}
$$

> は $z=0$ へ正則延長し、$K_B(0)=5$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

対数微分を一度計算して $dz/du_B$ を得る。三乗して有理形の $z^{-3}$ と消去すると、原点で零にならない三因子だけが残る。

<!-- proof-start -->
### 証明

[ミラー写像の微分公式](../MIR1-15/index.md#prop-mir1-15-coordinate-derivatives)を $q_B=ze^h$ に適用すると

$$
\frac{dq_B}{dz}=e^h(1+zh'),\qquad
\frac{du_B}{dz}=\frac{q_B'}{q_B}
=\frac{1+zh'}{z}.
$$

$z\ne0$、$1+zh'\ne0$ の範囲で逆数を取れば $dz/du_B=z/(1+zh')$ である。よって

$$
\begin{aligned}
K_B(q_B(z))
&=\frac{5}{z^3(1-3125z)}
\frac1{\omega_0(z)^2}
\left(\frac{z}{1+zh'(z)}\right)^3\\
&=\frac{5}{(1-3125z)\omega_0(z)^2(1+zh'(z))^3}.
\end{aligned}
$$

$\omega_0(0)=1$、$1+0\cdot h'(0)=1$、$1-3125\cdot0=1$ だから三つの分母は0で非零であり、積の逆数は正則である。$q_B'(0)=e^{h(0)}=1$ なので逆座標 $Z(q_B)$ も正則で、$K_B(0)=5$ が得られる。
<!-- proof-end -->

**三つの異なる役割。** $z^{-3}$ とJacobianの三乗の相殺は極の消去、$\omega_0^{-2}$ は3形式の選択の消去、$\kappa=5$ は交叉形式まで含む幾何学的倍率の固定である。相殺が成立したことだけから $\kappa=5$ は導けない。

## 4. 一次係数を使った規格化診断

二次まで長い展開を行う前に、一次係数だけで誤った倍率を発見できる。$h'(0)$ は $u_B$ のJacobianに、$\omega_0'(0)$ は分母に、判別式因子 $1-3125z$ は別々に寄与する。

<a id="thm-mir2-07-first-coefficient"></a>

<!-- formal-statement-start -->
> **定理（規格化B側結合の一次係数公式）**  
> 第3節の仮定を満たし、$\omega_0(z)=1+az+O(z^2)$、$h(z)=bz+O(z^2)$ とする。定数 $\kappa$ を任意の非零値に固定して $C_{zzz}=\kappa/[z^3(1-3125z)]$ と書くと、原点で正則延長した結合のTaylor展開は

$$
K_B(q_B)=\kappa+\kappa(3125-2a-3b)\,q_B+O(q_B^2)
$$

> となる。とくに $(\kappa,a,b)=(5,120,770)$ なら $K_B(q_B)=5+2875q_B+O(q_B^2)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各因子の一次だけを展開し、最後に $q_B=z+O(z^2)$ を使う。$z$ と $q_B$ の差は二次以降なので、一次係数は同じである。

<!-- proof-start -->
### 証明

$\omega_0=1+az+O(z^2)$ なら $(1+az)^{-2}=1-2az+O(z^2)$ なので $\omega_0^{-2}=1-2az+O(z^2)$。また $h'=b+O(z)$ より

$$
(1+zh')^{-3}=1-3bz+O(z^2),\qquad
(1-3125z)^{-1}=1+3125z+O(z^2).
$$

三因子を掛けると、一次係数は $3125-2a-3b$ の和となる。さらに

$$
q_B=ze^{h(z)}=z+bz^2+O(z^3),\qquad
z=q_B+O(q_B^2)
$$

だから一次係数は $q_B$ へ移しても不変である。数値を代入すると

$$
3125-2\cdot120-3\cdot770
=3125-240-2310=575,\qquad 5\cdot575=2875.
$$
<!-- proof-end -->

同じ数値は対数微分からも確認できる。正則な $K_B(q_B(z))$ について、第3節の積の対数微分を取ると

$$
\frac{d}{dz}\log K_B(q_B(z))
=\frac{3125}{1-3125z}
-2\frac{\omega_0'}{\omega_0}
-3\frac{h'+zh''}{1+zh'}.
$$

$z=0$ の値は $3125-240-2310=575$。$K_B(0)=5$ と $q_B'(0)=1$ を掛ければ、再び $dK_B/dq_B|_0=2875$ となる。非零な $K_B$ の局所対数を使うため、原点近傍で $K_B\ne0$ に制限している。

**誤った規格化を係数で見抜く例。**

- 周期を割り忘れて $C_{zzz}(dz/du_B)^3$ とすると、正しい値の $\omega_0^2$ 倍であり、一次係数は $2875+2\cdot120\cdot5=4075$。
- $\omega_0^{-2}$ の代わりに $\omega_0^{-3}$ とすると正しい値を $\omega_0$ でさらに割るので、一次係数は $2875-120\cdot5=2275$。
- $t_B$ で三階微分した値に $(2\pi i)^{-3}$ を付けなければ、比較したい $u_B$ 座標の三次結合の $(2\pi i)^3$ 倍になる。
- $z$ での $C_{zzz}$ をそのまま平坦座標の値だとすれば、$z^{-3}$ の極を含み、原点の古典値5すら回収できない。

これらの失敗は単なる記法の違いではなく、どの変換を省いたかを特定できる。

## 5. 二次係数と鏡像座標の規格化

[既習の逆ミラー級数](../MIR1-15/index.md#thm-mir1-15-inverse-coefficients)から $z=q_B-770q_B^2+O(q_B^3)$ である。正則延長の式の各因子を二次まで展開する。

$$
\begin{aligned}
(1-3125z)^{-1}
&=1+3125z+9765625z^2+O(z^3),\\
\omega_0^{-2}
&=1-240z-183600z^2+O(z^3),\\
(1+zh')^{-3}
&=1-2310z-749550z^2+O(z^3).
\end{aligned}
$$

例えば最後の二次係数は、$1+zh'=1+770z+1435650z^2+O(z^3)$ と $(1+y)^{-3}=1-3y+6y^2+O(y^3)$ から

$$
-3\cdot1435650+6\cdot770^2
=-4306950+3557400=-749550
$$

と確認できる。最初の二因子を掛けると

$$
1+(3125-240)z+
(9765625-3125\cdot240-183600)z^2
=1+2885z+8832025z^2.
$$

三番目を掛けた二次係数は

$$
8832025-2885\cdot2310-749550=1418125.
$$

したがって

$$
K_B(q_B(z))=5+2875z+7090625z^2+O(z^3).
$$

最後にだけ $z=q_B-770q_B^2+O(q_B^3)$ を代入し、

$$
\begin{aligned}
K_B(q_B)
&=5+2875q_B+(7090625-2875\cdot770)q_B^2+O(q_B^3)\\
&=\boxed{5+2875q_B+4876875q_B^2+O(q_B^3)}.
\end{aligned}
$$

この係数は[先行章のB側級数定理](../MIR1-16/index.md#thm-mir1-16-normalized-series)の独立した計算経路による照合であって、ここではA側の曲線計数とまだ同一視していない。

定数シフト $u_B\mapsto\widetilde u_B=u_B+c$ も区別しよう。このとき $\widetilde q_B=e^cq_B$ となる。微分演算子 $d/d\widetilde u_B=d/du_B$ は同じでも、展開する変数は変わる。

<a id="prop-mir2-07-coordinate-shift"></a>

<!-- formal-statement-start -->
> **命題（対数座標の定数シフトと級数係数）**  
> $q_B=ze^{h(z)}=z+O(z^2)$ とし、$\widetilde u_B=u_B+c$、$\lambda=e^c\ne0$、$\widetilde q_B=e^{\widetilde u_B}$ とする。同じ3形式・周期・交叉形式を用いた場合、

$$
\widetilde K_B(\widetilde q_B)=K_B(\widetilde q_B/\lambda).
$$

> とくに $K_B(q_B)=5+k_1q_B+k_2q_B^2+\cdots$ なら $\widetilde K_B(\widetilde q_B)=5+(k_1/\lambda)\widetilde q_B+(k_2/\lambda^2)\widetilde q_B^2+\cdots$ となる。両方の座標に $q=z+O(z^2)$ を要求するなら $\lambda=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

定数シフトは微分の値を変えないが、冪級数の引数を倍率だけ変える。先頭係数1という座標規約はこの自由度を排除する。

<!-- proof-start -->
### 証明

$\widetilde u_B=u_B+c$ から $d\widetilde u_B/du_B=1$、従って $dz/d\widetilde u_B=dz/du_B$ であり、正規化三次結合の値は各点で同じである。しかし $\widetilde q_B=\lambda q_B$ だから $q_B=\widetilde q_B/\lambda$ を代入した表示になる。$q_B^d=(\widetilde q_B/\lambda)^d$ により次数 $d$ の係数は $\lambda^{-d}$ 倍される。

また $q_B=z+O(z^2)$ なので $\widetilde q_B=\lambda z+O(z^2)$。これを再び $z+O(z^2)$ とする条件は $\lambda=1$ に同値である。
<!-- proof-end -->

**注意。** $\lambda=1$ は $c\in2\pi i\mathbb Z$ を意味する。これは局所正則座標の先頭係数を固定したにすぎず、[積分周期格子の選択](../MIR1-14/index.md#def-mir1-14-integral-period-lattice)を証明したことではない。

## 6. A側の級数と「比較できる」ことの正確な意味

B側では既に $K_B(q_B)\in\mathbb C[[q_B]]$ を構成した。A側では $C^X_{HHH}(x)\in\mathbb Q[[x]]$ が[因子公理に基づく三点関数](../MIR2-03/index.md#def-mir2-03-three-point-series)から定義されている。二つの形式冪級数は、**同じ記号の変数へ代入して初めて係数を比較できる**が、比較可能性は等式の証明ではない。

<a id="def-mir2-07-comparison-convention"></a>

<!-- formal-statement-start -->
> **定義（A/Bの三次結合の形式的比較規約）**  
> $X$ を滑らかなquintic三次元多様体とする。A側の $x=Qe^\tau$ とB側の $q_B=ze^{A_1/\omega_0}$ はそれぞれ前節までの規約に従う。A側の形式級数 $C^X_{HHH}(x)$ に対し、**比較用の代入**を

$$
\iota:\mathbb Q[[x]]\longrightarrow\mathbb C[[q_B]],\qquad
\iota\!\left(\sum_{d\ge0}a_dx^d\right)
=\sum_{d\ge0}a_dq_B^d
$$

> と定める。B側の $\kappa=5$、$\omega_0(0)=1$、$q_B=z+O(z^2)$ を採用したとき、比較すべき二つの級数を $K_B(q_B)$ と $\iota(C^X_{HHH})(q_B)$ とする。これは**比較対象の指定**であり、二級数の一致を定義するものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-07-comparison-convention -->

**定義の確認。** $C^X_{HHH}(x)=5+N_1^Xx+8N_2^Xx^2+O(x^3)$ に代入 $\iota$ を行うと、定数5は5のまま、一次は $N_1^Xq_B$、二次は $8N_2^Xq_B^2$ になる。次数2の係数8は $d^3$ から来るので、代入自体が作る値ではない。また $\iota(x^2)=q_B^2=\iota(x)^2$、$\iota(1)=1$ であり、加法と乗法を保つ。元の $N_1^X,N_2^X$ を知らない段階ではB側の $2875,4876875$ と一致するとはまだ結論できない。

<!-- definition-example-end -->

<a id="prop-mir2-07-conditional-coefficients"></a>

<!-- formal-statement-start -->
> **命題（A/B一致を追加で仮定した場合の係数帰結）**  
> 第6節の比較規約を採り、さらに数学的な別の入力として

$$
\iota(C^X_{HHH})(q_B)=K_B(q_B)
$$

> が形式冪級数として成り立つと**仮定する**。このときA側の種数0仮想GW不変量は

$$
N_1^X=2875,\qquad N_2^X=\frac{4876875}{8}
$$

> を満たす。ここでは一致自体を証明しておらず、整数型の曲線数についても結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

A側三点関数の次数 $d$ の係数は $d^3N_d^X$。仮定した等式の一次と二次を比較し、$d^3$ を割り戻す。

<!-- proof-start -->
### 証明

[三点関数の級数](../MIR2-05/index.md#prop-mir2-05-yukawa-series)を比較用の変数で展開すると

$$
\iota(C_{HHH}^X)
=5+1^3N_1^Xq_B+2^3N_2^Xq_B^2+O(q_B^3)
=5+N_1^Xq_B+8N_2^Xq_B^2+O(q_B^3).
$$

仮定した形式冪級数の等式では、各次数の係数が一致する。第5節のB側の展開から

$$
N_1^X=2875,\qquad 8N_2^X=4876875
$$

を得るので、二次係数を8で割れば結論となる。形式級数が等しいと仮定しなければ、B側の計算単独ではこの値は従わない。
<!-- proof-end -->

この等式を根拠づける深い内容は、後続の $I/J$ 関数、局所化、quinticミラー定理で扱う。**B側のTaylor係数、A側の有理GW数、整数型数値、実際の曲線本数は同一の概念ではない**。

## 7. 演習と詳細解答

以下では $q_B=ze^{h(z)}$、$u_B=\operatorname{Log}q_B$、$K_B=(C_{zzz}/\omega_0^2)(dz/du_B)^3$ を共通の設定とする。必要な場合は $C_{zzz}=\kappa/[z^3(1-3125z)]$ を仮定に追加する。

### Level A：変換因子を一つずつ確かめる

<a id="ex-mir2-07-a01"></a>
#### MIR2-07-A01 対数座標のJacobian
- Level: A

$h$ は原点で正則、$h(0)=0$ とする。$q_B=ze^h$ から $du_B/dz$ と $dz/du_B$ を導き、逆数を取れる条件をすべて挙げよ。

<!-- solution-start -->
**詳細解答**。積の微分で $q_B'=e^h+ze^hh'=e^h(1+zh')$ となる。$q_B\ne0$ の領域で $u_B'=(\operatorname{Log}q_B)'q_B'=q_B'/q_B=(1+zh')/z$。この微分が非零になるためには $z\ne0$ かつ $1+zh'\ne0$ が必要である。また対数分枝を一つ選び、その領域では $e^h\ne0$ である。従って $dz/du_B=z/(1+zh')$ を得る。$z=0$ では $u_B$ 自体は有限値の正則座標ではないが、三次結合の相殺後には正則延長できる。
<!-- solution-end -->

<a id="ex-mir2-07-a02"></a>
#### MIR2-07-A02 3形式の倍率を追う
- Level: A

$\omega_0=1+120z+O(z^2)$、$\widetilde\Omega=(1+2z)\Omega$ とし、$|z|<1/4$ とする。周期と三次結合の変換倍率を求め、$\widetilde C/\widetilde\omega^2=C/\omega_0^2$ を一次まで確認せよ。

<!-- solution-start -->
**詳細解答**。$g=1+2z$ は与えた円板で非零なので、$\widetilde\omega=g\omega_0=(1+2z)(1+120z+\cdots)=1+122z+O(z^2)$。既習の[再規格化公式](../MIR1-16/index.md#prop-mir1-16-cubic-coordinate)から $\widetilde C=(1+2z)^2C=(1+4z+O(z^2))C$。また $\widetilde\omega^2=(1+244z+O(z^2))$、$\omega_0^2=1+240z+O(z^2)$。ゆえに $\widetilde C/\widetilde\omega^2=C(1+4z)(1-244z)+O(z^2)C=C(1-240z+O(z^2))=C/\omega_0^2$ である。ここで $C$ はLaurent級数でもよく、括弧内の係数として等式を比較している。
<!-- solution-end -->

<a id="ex-mir2-07-a03"></a>
#### MIR2-07-A03 一次係数の三つの寄与
- Level: A

$\kappa=5$、$\omega_0=1+120z+O(z^2)$、$h=770z+O(z^2)$ とする。$K_B$ の定数項と一次係数を、三つの分母因子から求めよ。

<!-- solution-start -->
**詳細解答**。[正則延長の式](#prop-mir2-07-regularity)に $\kappa=5$ を入れると、$(1-3125z)^{-1}=1+3125z+\cdots$、$\omega_0^{-2}=1-240z+\cdots$、$(1+zh')^{-3}=1-2310z+\cdots$。積は $1+(3125-240-2310)z+\cdots=1+575z+\cdots$。$q_B=z+O(z^2)$ なので $K_B=5+5\cdot575q_B+O(q_B^2)=5+2875q_B+O(q_B^2)$ である。
<!-- solution-end -->

<a id="ex-mir2-07-a04"></a>
#### MIR2-07-A04 周期を三回割る誤り
- Level: A

正しい規格化 $K_B=5+2875q_B+O(q_B^2)$ と $\omega_0=1+120q_B+O(q_B^2)$ が与えられた。誤って $C_{zzz}\omega_0^{-3}(dz/du_B)^3$ とした場合の一次係数を求めよ。

<!-- solution-start -->
**詳細解答**。誤った式は正しい $K_B$ をさらに $\omega_0$ で割ったもの。$\omega_0^{-1}=1-120q_B+O(q_B^2)$ なので積は $5+(2875-5\cdot120)q_B+O(q_B^2)=5+2275q_B+O(q_B^2)$。三次結合自体の微分が三階だからといって周期を三乗するのは誤りである。形式の倍率は左右の二つの因子に由来する。
<!-- solution-end -->

<a id="ex-mir2-07-a05"></a>
#### MIR2-07-A05 $2\pi i$ の位置
- Level: A

$u_B=2\pi it_B$ とする。$dz/dt_B$ と $dz/du_B$ の関係を示し、$t_B$ 方向の三次結合から $K_B$ を作る式を記せ。

<!-- solution-start -->
**詳細解答**。$du_B/dt_B=2\pi i$ は零でない定数。連鎖律で $dz/dt_B=(dz/du_B)(du_B/dt_B)=2\pi i\,dz/du_B$。三乗すると $(dz/dt_B)^3=(2\pi i)^3(dz/du_B)^3$ となる。従って $K_B=(2\pi i)^{-3}(C_{zzz}/\omega_0^2)(dz/dt_B)^3$ であり、因子は分母に置く。
<!-- solution-end -->

### Level B：不変性・級数・反例の再構成

<a id="ex-mir2-07-b01"></a>
#### MIR2-07-B01 非線形座標でも三次結合は同じ
- Level: B

$z=w+w^2$、$q_B=z$、$\omega=1$、$C_{zzz}=5z^{-3}$ とする。$w$ 座標の三次結合を計算し、$u_B=\operatorname{Log}q_B$ での規格化値が5であることを導け。

<!-- solution-start -->
**詳細解答**。$dz/dw=1+2w$ は原点近傍で非零。既習の[三次結合変換](../MIR1-16/index.md#prop-mir1-16-cubic-coordinate)により $C_{www}=(1+2w)^3(5/z^3)$。一方、$du_B/dw=(1/z)(dz/dw)=(1+2w)/z$ であり、$dw/du_B=z/(1+2w)$。従って $K_B=C_{www}(dw/du_B)^3=5(1+2w)^3z^{-3}\cdot z^3(1+2w)^{-3}=5$。$w\ne0$ の計算で得た定数は原点へ正則延長する。
<!-- solution-end -->

<a id="ex-mir2-07-b02"></a>
#### MIR2-07-B02 交叉形式だけを倍にしたら何が壊れるか
- Level: B

$C_{zzz}=5/[z^3(1-3125z)]$、$\omega_0(0)=1$ とする。(i) $\Omega\mapsto2\Omega$、(ii) $Q_{\!B}\mapsto2Q_{\!B}$、(iii) 両方の操作、の三場合について、$\kappa$、$\omega(0)$、$K_B(0)$ を求めよ。元の値との比較で「不変」と言えるものを明記せよ。

<!-- solution-start -->
**詳細解答**。最初の値は $(\kappa,\omega(0),K_B(0))=(5,1,5)$。(i) では三次結合に $2^2=4$、周期に2が掛かるので $(20,2,20/2^2)=(20,2,5)$。(ii) では三次結合だけが2倍なので $(10,1,10)$。(iii) では三次結合に4と2が掛かり、周期に2が掛かるので $(40,2,40/2^2)=(40,2,10)$。規格化値が元の5を保つのは(i)だけ。$\kappa=5$ という数値は形式の変更にも固定される絶対定数ではない。
<!-- solution-end -->

<a id="ex-mir2-07-b03"></a>
#### MIR2-07-B03 二次係数を全て再計算する
- Level: B

$\omega_0=1+120z+113400z^2+O(z^3)$、$h=770z+717825z^2+O(z^3)$、$z=q_B-770q_B^2+O(q_B^3)$ とする。第3節の規格化式から $[q_B^2]K_B=4876875$ を計算し、$z$ と $q_B$ の係数の差を示せ。

<!-- solution-start -->
**詳細解答**。まず $1+zh'=1+770z+1435650z^2+O(z^3)$。$(1+y)^{-2}=1-2y+3y^2+\cdots$ から $\omega_0^{-2}=1-240z+(3\cdot14400-226800)z^2+\cdots=1-240z-183600z^2+\cdots$。$(1+y)^{-3}=1-3y+6y^2+\cdots$ から $(1+zh')^{-3}=1-2310z+(6\cdot592900-3\cdot1435650)z^2+\cdots=1-2310z-749550z^2+\cdots$。判別式因子は $(1-3125z)^{-1}=1+3125z+9765625z^2+\cdots$。

二つを先に掛けると一次 $3125-240=2885$、二次 $9765625-750000-183600=8832025$。最後の因子との積は一次 $2885-2310=575$、二次 $8832025-2885\cdot2310-749550=1418125$。5倍して $K_B(q_B(z))=5+2875z+7090625z^2+\cdots$。$z=q_B-770q_B^2+\cdots$ へ代入すると二次係数は $7090625-2875\cdot770=4876875$ となる。$z$ 座標の二次係数は $7090625$ で、平坦座標の係数とは $2213750$ 異なる。
<!-- solution-end -->

<a id="ex-mir2-07-b04"></a>
#### MIR2-07-B04 ミラー座標の定数シフト
- Level: B

$K_B(q_B)=5+2875q_B+4876875q_B^2+O(q_B^3)$ とする。$\widetilde u_B=u_B+\log2$（局所的に分枝を固定）なら、$\widetilde q_B$ での展開を求めよ。$\widetilde q_B=z+O(z^2)$ が成り立つかも判定せよ。

<!-- solution-start -->
**詳細解答**。指数を取って $\widetilde q_B=e^{u_B+\log2}=2q_B$、従って $q_B=\widetilde q_B/2$。微分方向は $d/d\widetilde u_B=d/du_B$ と同じだから、[定数シフト命題](#prop-mir2-07-coordinate-shift)より $\widetilde K_B(\widetilde q_B)=5+(2875/2)\widetilde q_B+(4876875/4)\widetilde q_B^2+O(\widetilde q_B^3)$。一方 $\widetilde q_B=2z+O(z^2)$ なので先頭係数は2であり、$z+O(z^2)$ という規格化を満たさない。
<!-- solution-end -->

<a id="ex-mir2-07-b05"></a>
#### MIR2-07-B05 A側の係数8はどこから来るか
- Level: B

$C^X_{HHH}(x)=5+\sum_{d\ge1}d^3N_d^Xx^d$ とする。二次まで展開し、**仮に** $\iota(C^X_{HHH})=K_B$ が成立するときの $N_1^X,N_2^X$ を求めよ。条件なしに本数と呼べない理由も述べよ。

<!-- solution-start -->
**詳細解答**。[A側Yukawaの式](../MIR2-05/index.md#prop-mir2-05-yukawa-series)で $d=1$ と $d=2$ の項だけ取ると $C^X_{HHH}(x)=5+N_1^Xx+8N_2^Xx^2+O(x^3)$。比較の代入 $\iota(x)=q_B$ を行い、仮定した等式のB側係数 $2875$、$4876875$ と比較すると $N_1^X=2875$、$8N_2^X=4876875$、すなわち $N_2^X=4876875/8$。この仮定はミラー定理の深い内容を先取りしており、本講で証明していない。またGW不変量は仮想類で定義される有理数で、多重被覆を含むため、そのまま曲線像の本数とは限らない。
<!-- solution-end -->

### Level C：規格化から比較の限界まで

<a id="ex-mir2-07-c01"></a>
#### MIR2-07-C01 三つの倍率を整理してA/B照合までつなぐ
- Level: C

$C_{zzz}=\kappa/[z^3(1-3125z)]$、$\omega_0=1+120z+113400z^2+O(z^3)$、$h=770z+717825z^2+O(z^3)$、$q_B=ze^h$ とする。

1. $dz/du_B$ と $dz/dt_B$ を導き、正しいB側三次結合を $u_B,t_B$ の両表示で書け。
2. $\kappa=5$ を追加したときの $K_B(q_B)$ の二次までを、三因子の展開と逆変数の代入から導け。
3. $g(z)$ を非零正則関数とし $\Omega\mapsto g\Omega$ とするとき、3形式と周期を両方変える理由、$Q_{\!B}$ だけを変える場合との違いを証明せよ。
4. A側 $C_{HHH}^X(x)$ と比較する規約を述べ、二つの係数をGW数へ戻すため追加で何を仮定すべきかを明示せよ。

<!-- solution-start -->
**詳細解答**。

**(1) 座標の微分。** $u_B=\operatorname{Log}z+h(z)$ から $du_B/dz=z^{-1}+h'=(1+zh')/z$。$z\ne0$、$1+zh'\ne0$ なら $dz/du_B=z/(1+zh')$。$u_B=2\pi it_B$ より $dz/dt_B=2\pi iz/(1+zh')$。規格化三次結合は

$$
K_B=\frac{C_{zzz}}{\omega_0^2}\left(\frac{z}{1+zh'}\right)^3
=\frac1{(2\pi i)^3}\frac{C_{zzz}}{\omega_0^2}
\left(\frac{2\pi iz}{1+zh'}\right)^3.
$$

**(2) 正則化と二次展開。** $\kappa=5$ を代入すると $z^{-3}$ がJacobianの $z^3$ と消え、$K_B=5[(1-3125z)\omega_0^2(1+zh')^3]^{-1}$。$\omega_0^{-2}=1-240z-183600z^2+\cdots$、$(1+zh')^{-3}=1-2310z-749550z^2+\cdots$、$(1-3125z)^{-1}=1+3125z+9765625z^2+\cdots$ である。前二因子（判別式と周期）を掛けて $1+2885z+8832025z^2+\cdots$、最後を掛けて $1+575z+1418125z^2+\cdots$。従って $K_B(q_B(z))=5+2875z+7090625z^2+\cdots$。[逆ミラー級数](../MIR1-15/index.md#thm-mir1-15-inverse-coefficients) $z=q_B-770q_B^2+\cdots$ を代入すると $K_B=5+2875q_B+(7090625-2875\cdot770)q_B^2+\cdots=5+2875q_B+4876875q_B^2+\cdots$。

**(3) 規格化の不変性。** $\widetilde\Omega=g\Omega$ なら周期の線形性から $\widetilde\omega_0=g\omega_0$ であり、[交叉の三次変換](../MIR1-16/index.md#prop-mir1-16-cubic-coordinate)から $\widetilde C=g^2C$。ゆえに $\widetilde C/\widetilde\omega_0^2=C/\omega_0^2$。座標微分は同じなので $K_B$ は不変。ただし $Q_{\!B}\mapsto cQ_{\!B}$ は周期を変えず、$K_B\mapsto cK_B$ となる。

**(4) 数学的な比較。** A側は[三点関数](../MIR2-05/index.md#prop-mir2-05-yukawa-series) $C_{HHH}^X(x)=5+N_1^Xx+8N_2^Xx^2+\cdots$。$x\mapsto q_B$ の形式的代入を行ったうえで、**別の数学的入力**として $\iota(C_{HHH}^X)=K_B$ を仮定して初めて係数比較が可能となる。そのとき $N_1^X=2875$、$N_2^X=4876875/8$。今回証明したのはB側の規格化であり、GWの仮想類とミラー定理の同一視を証明したのではない。
<!-- solution-end -->

## 8. 次講へ

$\omega_0^{-2}$、$(dz/du_B)^3$、$\kappa=5$ はそれぞれ**3形式・座標・交叉形式**の別の自由度に対応する。三つの規約を明示すれば、B側には定数項5の正則級数 $K_B(q_B)$ が得られる。しかし、この級数がA側の種数0三点関数に一致するという命題はまだ得られていない。

次の MIR2-08 では、特殊幾何で周期からprepotentialを組み立てるときの積分定数・低次多項式の自由度と、三階微分が何を固定するのかを扱う。その後の $I/J$ 関数とミラー定理がA/B同一視の数学的橋になる。

---

**参考文献**：[D. Cox / S. Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)；[K. Hori et al., *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)；[Candelas et al., *A Pair of Calabi–Yau Manifolds as an Exactly Soluble Superconformal Theory*](https://www.staff.science.uu.nl/~beuke106/HypergeometricFunctions/COGP.pdf)。本講の局所座標・級数計算は本文に導出を示し、A/Bの定理的同一視は後続講の外部数学的入力として区別する。
