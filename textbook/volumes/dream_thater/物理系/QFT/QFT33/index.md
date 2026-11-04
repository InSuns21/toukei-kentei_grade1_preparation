# QFT33 大域対称性の自発的破れ・真空多様体・Goldstoneの定理

[QFT2の内部対称性とNoether流](../QFT2/index.md#def-qft2-internal-symmetry)では、作用が連続変換で不変なら保存流を作れると学びました。しかし**作用が対称であること**と、**実際に選ばれた真空がその対称性を保つこと**は別です。例えば円形の谷を持つポテンシャルは回転対称ですが、谷の一点を選べばその点は回転で動きます。

この違いから、なぜ質量を持つ動径振動と質量零の接線振動が現れるのでしょうか。まず手で微分できる二実成分スカラー模型で確かめ、一般の対称性軌道のHessianへ拡張します。さらに量子場でのGoldstone定理が必要とする**保存流・局所性・無限体積**を明示し、古典質量行列の計算との論理的な差を調べます。

以下は $3+1$ 次元Minkowski空間、計量 $\eta=\operatorname{diag}(-1,1,1,1)$、$\hbar=c=1$ です。添字 $a,b$ は内部の実成分を表し、$x^\mu=(t,\boldsymbol x)$、$\Box=\partial_\mu\partial^\mu=-\partial_t^2+\Delta$ とします。正エネルギーのスカラー場には $-\partial_\mu\phi\,\partial^\mu\phi/2$ を使います。まず古典作用を扱い、量子化に移る箇所で仮定を追加します。

## 1. 対称な作用から非対称な真空が選ばれる

二つの実スカラー場 $\phi=(\phi_1,\phi_2)^T$ を一つの内部平面上のベクトルとみなし、次の作用を考えます。

$$
\mathcal L=-\frac12\partial_\mu\phi_a\partial^\mu\phi_a-V(\phi),
\qquad
V(\phi)=\frac{\lambda}{4}(\phi_1^2+\phi_2^2-v^2)^2,
\qquad \lambda>0,\ v>0.
$$

繰り返した内部添字は $a=1,2$ について足します。$R(\alpha)=\begin{pmatrix}\cos\alpha&-\sin\alpha\\\sin\alpha&\cos\alpha\end{pmatrix}$ は $R^TR=I$ を満たすので、$\phi\mapsto R(\alpha)\phi$ で運動項も $V$ も不変です。[QFT1の場のEuler–Lagrange方程式](../QFT1/index.md#thm-qft1-field-el)に従い、運動方程式は

$$
-\Box\phi_a+\lambda(\phi_b\phi_b-v^2)\phi_a=0
$$

です。空間一定・時間一定の古典真空候補は $V$ の**大域的最小点**から探します。$V\ge0$ で等号は $\phi_1^2+\phi_2^2=v^2$ のときだけです。したがって最低エネルギーの点は一つではありません。

一般に連続群 $G$ が作用とポテンシャルを不変にする場合、その古典的最小点の集合を**真空多様体**として調べます。真空の一点が $G$ で動くなら、方程式の対称性は残っていても、その一点を選んだ解には全対称性が残りません。量子論では一点の古典場と真空期待値を同一視できないため、後に無限体積の条件を付けます。

<a id="def-qft33-vacuum"></a>

<!-- formal-statement-start -->
> **定義（真空多様体と自発的対称性の破れ）**
> 非負ポテンシャル $V:\mathbb R^n\to\mathbb R$ が連続群 $G$ の線形作用で不変であるとする。古典真空多様体を

$$
\mathcal M=\{\phi_0\in\mathbb R^n:V(\phi_0)=\min_\phi V(\phi)\}
$$

> とする。$\phi_0\in\mathcal M$ を選んだとき、その**非破れ部分群**を $H_{\phi_0}=\{g\in G:g\phi_0=\phi_0\}$ とする。ある $g\in G$ で $g\phi_0\ne\phi_0$ なら、その真空は $G$ を自発的に破るという。量子論では、作用を保つ対称性が真空状態を不変にせず、局所演算子の期待値がその差を検出できることを、無限体積極限での自発的破れとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft33-vacuum -->
### 例：円形の谷とその一点

**定義の確認**：最小値の条件、群の作用、固定部分群を別々に検査します。

上の $V$ は非負で、最小値0を取る条件が $\phi_1^2+\phi_2^2=v^2$ なので、真空多様体は

$$
\mathcal M=\{v(\cos\alpha,\sin\alpha):0\le\alpha<2\pi\}.
$$

$\phi_0=(v,0)^T$ を選ぶと、$R(\alpha)\phi_0=(v\cos\alpha,v\sin\alpha)^T$ は $\alpha\notin2\pi\mathbb Z$ で別の最小点になります。行列式1の回転群 $SO(2)$ の中で固定するのは恒等元だけです。一方、反射も含む直交群 $O(2)$ なら、$\phi_2\mapsto-\phi_2$ という反射が $\phi_0$ を固定します。**どの群を用いるか**で固定部分群は変わります。
<!-- definition-example-end -->

より一般に、真空の連続軌道は $G/H_{\phi_0}$ と対応します。これは群の元 $g,g'$ を、$g\phi_0=g'\phi_0$、すなわち $g^{-1}g'\in H_{\phi_0}$ のとき同一視するという意味です。ただし $\mathcal M$ 全体が一つの軌道とは限りません。異なる軌道や偶然の縮退もあり得るからです。ここでは上の円周がちょうど一つの $SO(2)$ 軌道となっています。

量子論で破れを検査するには、選ばれた真空を観測する演算子が必要です。例えば $\langle\phi_1\rangle=v$、$\langle\phi_2\rangle=0$ という期待値は、回転により向きが変わるため対称性の破れを示します。このとき考えるのは、異なる向きの真空を確率的に混ぜた状態ではなく、一つの向きを選んだ**純粋な真空相**です。このような期待値を秩序変数として整理します。以下の $T$ は[QFT2の内部連続変換の生成子](../QFT2/index.md#def-qft2-internal-symmetry)を行列で表したものです。

<a id="def-qft33-order-parameter"></a>

<!-- formal-statement-start -->
> **定義（秩序変数と破れた生成子）**
> 連続な**大域的内部対称性**の無限小変換を $\delta\phi=\alpha T\phi$ とし、無限体積で選択した並進不変真空を $|\Omega\rangle$ とする。局所演算子 $O$ の期待値が変換を検出するとき、$\langle\Omega|O|\Omega\rangle$ を秩序変数という。適切な空間切断で定義した保存電荷 $Q_R=\int d^3x\,f_R(\boldsymbol x)j^0(0,\boldsymbol x)$ に対し、極限

$$
\lim_{R\to\infty}\langle\Omega|\,i[Q_R,O(0)]\,|\Omega\rangle\ne0
$$

> なら生成子 $T$ はその真空で**破れている**という。ここで $f_R$ は原点周辺で1、十分遠方で0となる滑らかな切断関数であり、極限の存在と局所演算子との交換を仮定する。無限体積の $Q=\lim Q_R$ 自体がHilbert空間上の作用素として存在するとは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft33-order-parameter -->
### 例：第二成分を秩序変数の試験に使う

**定義の確認**：回転の生成子を $T=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、試験する演算子を $O=\phi_2$ とします。すると $\delta\phi_2=\alpha\phi_1$ で、$T(v,0)^T=(0,v)^T\ne0$ より真空の向きが変わります。

次に[QFT2のNoether流の定義](../QFT2/index.md#def-qft2-noether-current)へ $\Delta\phi=(-\phi_2,\phi_1)$ と正準運動量 $\Pi_a=-\partial^0\phi_a=\partial_0\phi_a$ を代入して $j^0=\phi_1\Pi_2-\phi_2\Pi_1$ を得ます。量子論の等時刻正準交換関係

$$
[\Pi_a(0,\boldsymbol x),\phi_b(0)]=-i\delta_{ab}\delta^3(\boldsymbol x)
$$

を仮定すれば、

$$
i[Q_R,\phi_2(0)]=i\int d^3x\,f_R(\boldsymbol x)\phi_1(0,\boldsymbol x)[\Pi_2(0,\boldsymbol x),\phi_2(0)]
=f_R(0)\phi_1(0).
$$

$f_R(0)=1$ と $\langle\phi_1\rangle=v$ なら $\langle i[Q_R,\phi_2(0)]\rangle=v\ne0$ です。これで局所演算子、非零の交換子、切断極限という定義の条件を直接検査しました。ここでの正準計算は量子場の構成を証明するものではなく、第4節で保存則・Ward恒等式と合わせて再使用します。
<!-- definition-example-end -->

## 2. 谷に沿う振動と谷を横切る振動

場の小さな揺らぎの質量を決めるのは、真空でのポテンシャルの**二階微分行列（Hessian）**です。場の成分を $\phi=\phi_0+\xi$ と置き、$\nabla V(\phi_0)=0$ を用いてTaylor展開すると

$$
V(\phi_0+\xi)=V(\phi_0)
+\frac12\xi_a H_{ab}(\phi_0)\xi_b+O(|\xi|^3),
\qquad
H_{ab}=\frac{\partial^2V}{\partial\phi_a\partial\phi_b}
$$

となります。Hessianは実対称行列なので、正規直交固有ベクトル $u_i$ によって $H(\phi_0)u_i=m_i^2u_i$ と対角化できます。$\xi=\sum_i q_i u_i$ を代入し、$u_i^Tu_j=\delta_{ij}$ を使うと、二次のラグランジアンは

$$
\mathcal L_2=-\frac12\sum_i\bigl(\partial_\mu q_i\partial^\mu q_i+m_i^2q_i^2\bigr),
\qquad (-\Box+m_i^2)q_i=0.
$$

従って、運動項がこのように正準規格化されているときに限り、**質量二乗行列**は $H(\phi_0)$ に等しくなります。最小点では二階微分の二次形式が非負なので $m_i^2\ge0$ です。非正準運動項なら単純なHessianの固有値を物理的質量と同一視できません。

<a id="prop-qft33-o2-masses"></a>

<!-- formal-statement-start -->
> **命題（O(2)スカラー模型の真空と質量行列）**
> $\lambda,v>0$、正準運動項と上記 $V=\lambda(\phi_a\phi_a-v^2)^2/4$ を持つ二実成分スカラー場について、すべての古典真空は $|\phi_0|=v$ を満たす。真空 $\phi_0=(v,0)^T$ のHessianは

$$
H(\phi_0)=\begin{pmatrix}2\lambda v^2&0\\0&0\end{pmatrix}.
$$

> 従って線形化された動径場 $h$ と接線場 $\pi$ の質量二乗は $m_h^2=2\lambda v^2$、$m_\pi^2=0$ である。これは古典作用の二次近似の主張であり、全量子理論の極の存在を単独では証明しない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $V$ の一階微分が真空で消えることを確認し、二階微分の $\phi_a\phi_b$ 項だけが残ることを使います。Cartesian座標で相互作用まで展開し、質量項の係数 $1/2$ を検算します。

<!-- proof-start -->
### 証明

$r^2=\phi_a\phi_a$ と置くと微分の連鎖律より

$$
\frac{\partial V}{\partial\phi_a}
=\frac{\lambda}{4}\,2(r^2-v^2)\,2\phi_a
=\lambda(r^2-v^2)\phi_a.
$$

もう一回 $\phi_b$ で微分すれば

$$
H_{ab}(\phi)
=\lambda(r^2-v^2)\delta_{ab}+2\lambda\phi_a\phi_b.
$$

真空では $r^2=v^2$ なので $H_{ab}(\phi_0)=2\lambda\phi_{0a}\phi_{0b}$ です。$\phi_0=(v,0)^T$ を代入すると表示した対角行列になります。固有ベクトル $(1,0)^T$ が固有値 $2\lambda v^2$、$(0,1)^T$ が固有値0を持ちます。

場を $\phi_1=v+h,\ \phi_2=\pi$ と置いて確認します。

$$
\begin{aligned}
\phi_a\phi_a-v^2&=(v+h)^2+\pi^2-v^2=2vh+h^2+\pi^2,\\
V&=\lambda v^2h^2+\lambda v h(h^2+\pi^2)
+\frac{\lambda}{4}(h^2+\pi^2)^2.
\end{aligned}
$$

二次のラグランジアン密度は

$$
\mathcal L_2
=-\frac12(\partial_\mu h)^2-\frac12(2\lambda v^2)h^2
-\frac12(\partial_\mu\pi)^2.
$$

従って $(-\Box+2\lambda v^2)h=0$、$\Box\pi=0$ です。[QFT1の平面波分散関係](../QFT1/index.md#prop-qft1-dispersion)により $h$ は $E^2=|\boldsymbol p|^2+2\lambda v^2$、$\pi$ は $E^2=|\boldsymbol p|^2$ を持ちます。
<!-- proof-end -->

### 例：別の真空でも零方向は接線

**命題の確認**：$\phi_0=(0,v)^T$ なら $H=2\lambda v^2\operatorname{diag}(0,1)$ です。今度は $\phi_1$ が質量零です。ラベル「第2成分がGoldstone場」ではなく、**選んだ真空ベクトルに直交する方向**が質量零であることを確かめました。

### 極座標で見る「角度にポテンシャルがない」理由

真空円の近くで、局所座標として

$$
\phi_1=(v+\rho)\cos(\theta/v),\qquad
\phi_2=(v+\rho)\sin(\theta/v)
$$

を置きます。$\rho>-v$、角度は $\theta\equiv\theta+2\pi v$ と同一視するので、この表示は**円全体で一価な実数座標ではありません**。以下の $(\partial f)^2$ は $\partial_\mu f\partial^\mu f$ の略記です。微分して二乗和を取ると交差項が消え、

$$
\begin{aligned}
(\partial_\mu\phi_1)^2+(\partial_\mu\phi_2)^2
&=(\partial_\mu\rho)^2
+\frac{(v+\rho)^2}{v^2}(\partial_\mu\theta)^2,\\
\mathcal L
&=-\frac12(\partial\rho)^2
-\frac12\left(1+\frac{\rho}{v}\right)^2(\partial\theta)^2
-\frac{\lambda}{4}(2v\rho+\rho^2)^2.
\end{aligned}
$$

$\rho=0$ 付近の二次項は $-\frac12(\partial\rho)^2-\frac12(\partial\theta)^2-\lambda v^2\rho^2$ です。$\theta$ の**非微分**のポテンシャルがなく、回転すると $\theta\mapsto\theta+v\alpha$ と移ります。$\rho$ と $\theta$ は元の二つの実自由度の座標変換であり、粒子数が増えたのではありません。

実際、真空近傍でCartesian変数と比べると

$$
\theta=v\arctan\left(\frac{\pi}{v+h}\right)
=\pi-\frac{h\pi}{v}+O\!\left(\frac{(|h|+|\pi|)^3}{v^2}\right).
$$

線形次数では $\theta=\pi$ なので、Cartesian表示の質量と一致します。

## 3. 一般の対称性からHessianの零方向を導く

円形ポテンシャルで零固有値が出たのは特別な多項式の偶然ではありません。対称変換に沿って真空を動かしてもポテンシャル値が変わらず、その変換が**真空の位置を実際に動かす**なら、Hessianはその方向で零になります。これを一般の有限成分模型で証明します。以下の $T$ は実 $n\times n$ 行列で、$e^{tT}$ はその行列指数関数（$t=0$ で $I$、微分が $T$）です。

<a id="thm-qft33-hessian-zero"></a>

<!-- formal-statement-start -->
> **定理（停留点における対称性軌道のHessian零方向）**
> $V:\mathbb R^n\to\mathbb R$ を二回連続微分可能とし、$e^{tT}$ を実線形一パラメータ群とする。全ての $\phi,t$ について $V(e^{tT}\phi)=V(\phi)$、かつ $\nabla V(\phi_0)=0$ なら

$$
H(\phi_0)T\phi_0=0.
$$

> とくに $T\phi_0\ne0$ ならHessianは零固有ベクトルを持つ。複数の生成子 $T_A$ に対し、$T_A\phi_0$ の張る空間の次元だけ独立な零方向がある。ただし零方向がすべて対称性に由来するとも、量子場の全てが物理的一粒子として存続するとも主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

ポテンシャルの不変性を $t$ で一回微分して $\nabla V(\phi)\cdot T\phi=0$ を作り、さらに $\phi$ の各成分で微分します。停留条件が余計な項を消します。

<!-- proof-start -->
### 証明

$V(e^{tT}\phi)=V(\phi)$ を $t=0$ で微分すると、連鎖律より

$$
0=\left.\frac{d}{dt}V(e^{tT}\phi)\right|_{t=0}
=\frac{\partial V}{\partial\phi_a}(\phi)\,T_{ab}\phi_b.
$$

この恒等式を $\phi_c$ で微分すると

$$
0=\frac{\partial^2V}{\partial\phi_c\partial\phi_a}T_{ab}\phi_b
+\frac{\partial V}{\partial\phi_a}T_{ac}.
$$

$\phi=\phi_0$ において第二項は $\nabla V(\phi_0)=0$ により消えます。第一項は $H_{ca}(\phi_0)(T\phi_0)_a$ なので、全ての $c$ で $[H(\phi_0)T\phi_0]_c=0$ です。$\{T_A\phi_0\}$ の独立な元の線形結合も核に属するから、核の次元はその張る空間の次元以上です。
<!-- proof-end -->

### 例：二成分・三成分で零方向を数える

$SO(2)$ の生成子 $T=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ と $\phi_0=(v,0)^T$ なら $T\phi_0=(0,v)^T\ne0$ です。[質量行列](#prop-qft33-o2-masses)との積は零になります。

三成分の $V=\lambda(|\phi|^2-v^2)^2/4$、$G=SO(3)$ へ拡張します。$\phi_0=(0,0,v)^T$ を選び、$T_i\phi=e_i\times\phi$ と定めた各軸回転の生成子を作用させると

$$
T_x\phi_0=(0,-v,0)^T,\quad
T_y\phi_0=(v,0,0)^T,\quad T_z\phi_0=0.
$$

Hessianは $H(\phi_0)=2\lambda v^2\operatorname{diag}(0,0,1)$ なので、最初の二方向は核に入り互いに独立です。$z$ 軸回転は真空を固定し、**独立な零方向は二つ**であって $SO(3)/SO(2)$ の二次元軌道と合います。一般の $O(N)$ 模型なら $N-1$ 個です。

逆は成り立ちません。例えば $V(\phi_1,\phi_2)=\phi_1^2+\phi_2^4$ は原点でHessianに一つの零固有方向を持ちますが、その零方向は連続する**縮退した最小点の軌道**ではありません。Hessianが零でも四次の復元力を持ち、真空を動かす対称性の存在は導けません。

## 4. 保存流はなぜ質量零の励起を要求するか

古典Hessianの零方向は、場の相互作用や量子補正をまだ調べていません。量子論でGoldstoneの主張へ進むには、[QFT2のNoether保存則](../QFT2/index.md#thm-qft2-noether)と、[QFT4の正準量子化](../QFT4/index.md#thm-qft4-equal-time-ccr)に対応する等時刻交換関係を利用します。ここでの流れは**大域的な内部対称性**です。ゲージ変換のような記述上の冗長性とは区別します。

無限小回転は $\delta\phi_1=-\alpha\phi_2,\ \delta\phi_2=\alpha\phi_1$ です。正準運動量を $\Pi_a=-\partial^0\phi_a=\partial_0\phi_a$ とすると、[Noether流](../QFT2/index.md#def-qft2-noether-current)は運動項の全体負号を受け、流と電荷は

$$
j^\mu=-\phi_1\partial^\mu\phi_2+\phi_2\partial^\mu\phi_1,\qquad
Q_R(t)=\int d^3x\,f_R(\boldsymbol x)j^0(t,\boldsymbol x).
$$

場の方程式を代入すれば、全ての古典解について

$$
\begin{aligned}
\partial_\mu j^\mu
&=-\phi_1\Box\phi_2+\phi_2\Box\phi_1\\
&=-\lambda(r^2-v^2)\phi_1\phi_2
+\lambda(r^2-v^2)\phi_2\phi_1=0.
\end{aligned}
$$

量子場では局所的な演算子積の定義と正則化を要します。ここでは保存流の量子Ward恒等式が異常なく成立すると仮定し、自由場の先頭次数で係数を確かめます。等時刻に $[\phi_a(t,\boldsymbol x),\Pi_b(t,\boldsymbol y)]=i\delta_{ab}\delta^3(\boldsymbol x-\boldsymbol y)$ と取れば、$\boldsymbol y$ が切断の内側にあるとき

$$
i[Q_R,\phi_2(t,\boldsymbol y)]
=i\int d^3x\,f_R(\boldsymbol x)\phi_1(t,\boldsymbol x)[\Pi_2(t,\boldsymbol x),\phi_2(t,\boldsymbol y)]
=f_R(\boldsymbol y)\phi_1(t,\boldsymbol y).
$$

選ばれた真空で $\langle\phi_1\rangle=v$ なら、この交換子の期待値が消えません。以下の相関関数に付く $T$ は演算子を**時間順序**に並べる記号であり、第1・3節の内部回転の生成行列 $T$ とは別物です。また $i0$ は[QFT6のFeynman処方](../QFT6/index.md#thm-qft6-feynman-poles)と同じ分布の境界値を表します。

<a id="prop-qft33-ward-pole"></a>

<!-- formal-statement-start -->
> **命題（保存流・接触項と質量零極：二次近似）**
> 上の $O(2)$ 模型で真空 $\phi_0=(v,0)^T$ の周りを正準量子化し、二次作用の自由真空、時間順序積、Fourier規約 $\widetilde F(p)=\int d^4x\,e^{ip\cdot x}F(x)$ を使う。木レベルでは

$$
\partial_\mu\langle Tj^\mu(x)\pi(0)\rangle
=-iv\,\delta^4(x),\qquad
\widetilde{\langle Tj^\mu\pi\rangle}(p)
=-\frac{vp^\mu}{-p^2+i0}.
$$

> 分母に現れる $p^2=0$ の極は接線場の質量零伝播に対応する。これらの式は摂動論の先頭次数であり、一般の相互作用理論のGoldstone定理そのものではない。
<!-- formal-statement-end -->

### 証明の見取り図

$j^\mu$ を $h,\pi$ で展開すると先頭項は $-v\partial^\mu\pi$ です。時間順序の微分では演算子の時間依存だけでなく、二つの演算子を入れ替える境界 $x^0=0$ のデルタ関数が生じます。

<!-- proof-start -->
### 証明

$\phi_1=v+h,\ \phi_2=\pi$ を代入して

$$
j^\mu=-(v+h)\partial^\mu\pi+\pi\partial^\mu h
=-v\partial^\mu\pi-h\partial^\mu\pi+\pi\partial^\mu h
$$

です。二次の自由理論で $\pi$ のFeynman二点分布は [QFT6の時間順序伝播関数](../QFT6/index.md#def-qft6-feynman-two-point) の質量零版です。QFT6の定義は $m>0$ ですが、ここで使う $3+1$ 次元では $m\downarrow0$ の赤外端における一粒子測度は局所的に可積分です。実際、固定した $\delta>0$ に対し

$$
\int_0^\delta\frac{p^2\,dp}{2\sqrt{p^2+m^2}}
\le\int_0^\delta\frac{p\,dp}{2}=\frac{\delta^2}{4}.
$$

従って局所的に平滑化した二点分布の質量零極限を取り、そのFourier境界値を用いると

$$
\int d^4x\,e^{ip\cdot x}\langle T\pi(x)\pi(0)\rangle
=\frac{i}{-p^2+i0}.
$$

$e^{ip\cdot x}$ によるFourier変換では $\partial_x^\mu$ が $-ip^\mu$ に対応するので

$$
\widetilde{\langle Tj^\mu\pi\rangle}(p)
=-v(-ip^\mu)\frac{i}{-p^2+i0}
=-\frac{vp^\mu}{-p^2+i0}.
$$

一方、時間順序積では、角度場 $\theta$ と区別して階段関数を $\Theta(t)$（正の引数で1、負の引数で0）と書きます。[QFT6の時間順序二点分布の定義](../QFT6/index.md#def-qft6-feynman-two-point)と同様に

$$
\langle Tj^\mu(x)\pi(0)\rangle
=\Theta(x^0)\langle j^\mu(x)\pi(0)\rangle
+\Theta(-x^0)\langle\pi(0)j^\mu(x)\rangle
$$

と分け、$d\Theta(t)/dt=\delta(t)$ を用いると

$$
\partial_\mu\langle Tj^\mu(x)\pi(0)\rangle
=\langle T(\partial_\mu j^\mu)(x)\pi(0)\rangle
+\delta(x^0)\langle[j^0(x),\pi(0)]\rangle.
$$

保存則と $[j^0(0,\boldsymbol x),\pi(0)]=-iv\,\delta^3(\boldsymbol x)$ の木レベル関係により右辺は $-iv\delta^4(x)$ です。Fourier変換を取れば $-ip_\mu G^\mu(p)=-iv$、従って $p_\mu G^\mu(p)=v$ となり、上の極を持つ形と合います。
<!-- proof-end -->

この計算の核心は、**電荷が真空を動かす非零の接触項**と、**保存流の発散が接触点以外で零**という二条件の同居です。もし全ての励起が正の質量ギャップを持つなら、十分小さい $p$ で $G^\mu$ が正則となり、Lorentz共変な形 $p^\mu F(p^2)$ から $p_\mu G^\mu\to0$ になって非零の $v$ と矛盾します。一般の定理ではこの「小運動量に非正則な成分が必要」をスペクトル条件で厳密に言い換えます。

<a id="thm-qft33-goldstone"></a>

<!-- formal-statement-start -->
> **定理（大域的内部対称性のGoldstone定理：スペクトル形）**
> $3+1$ 次元の相対論的局所量子場理論で、以下を仮定する。
>
> 1. 正エネルギースペクトル条件と並進・Lorentz不変な純粋真空。
> 2. 異常のない保存された局所的な**大域内部対称性**の電流 $j^\mu$。
> 3. Lorentzスカラー局所演算子 $O$ と適切な切断電荷 $Q_R$ が存在する。
>
> さらに切断電荷の交換子が

$$
c=\lim_{R\to\infty}\langle\Omega|\,i[Q_R,O(0)]\,|\Omega\rangle\ne0
$$

> であるとする。局所性に基づく電荷極限と、電流–$O$ の二点分布に通常のLorentz共変スペクトル表示（余分な異常的接触項なし）が成立すると仮定する。このときそのスペクトルは $p^2=0$ に非零の寄与を含み、**正の質量ギャップを持てない**。通常の粒子解釈が可能な場合にはこれが質量零Goldstone励起に対応する。孤立した自由粒子極の存在や全量子論の構成を、この結論だけで無条件に主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

局所電流とスカラー演算子の真空交換子は、Lorentz共変性から運動量 $p^\mu$ に比例します。保存則はその係数のスペクトルを質量零に集中させ、破れた生成子との交換子がその係数を非零と決めます。

<!-- proof-start -->
### 証明（スペクトル表示を仮定した導出）

$C^\mu(x)=\langle\Omega|[j^\mu(x),O(0)]|\Omega\rangle$ とします。相対論的スペクトル条件に加え、スカラー $O$、四元ベクトル $j^\mu$、Lorentz不変真空を仮定すると、通常のKällén–Lehmann型表示は

$$
C^\mu(x)=\int_0^\infty ds\,\rho(s)\,\partial^\mu\Delta(x;s),
\qquad
\Delta(x;s)=\int\frac{d^3p}{(2\pi)^3\,2E_{s,\boldsymbol p}}
\left(e^{-ip\cdot x}-e^{ip\cdot x}\right),
$$

$$
E_{s,\boldsymbol p}=\sqrt{|\boldsymbol p|^2+s},\qquad p^0=E_{s,\boldsymbol p}
$$

と書けます。ここで $\rho(s)$ は第2節の動径場 $\rho(x)$ と異なり、質量二乗 $s\ge0$ に関する局所有限なスペクトル測度です。質量殻以外の接触項を含めない仮定を用いています。[QFT32の不変質量殻積分](../QFT32/index.md#prop-qft32-mass-shell-measure)のため、各 $\Delta$ はLorentz共変なスカラー分布です。

各質量殻では $p^2=-s$ なので $(\Box-s)\Delta(x;s)=0$ です。保存則から

$$
0=\partial_\mu C^\mu(x)
=\int_0^\infty ds\,s\rho(s)\Delta(x;s).
$$

異なる $s$ の質量殻はFourier空間で区別されるため、スペクトルの一意性により $s\rho(s)=0$ です。従って $\rho$ の台は $s=0$ に含まれ、通常の測度なら $\rho(s)=c_0\delta(s)$ と書けます。

ここで等時刻のPauli–Jordan分布の微分を直接積分します。第二の指数項は空間運動量の積分変数を $\boldsymbol p\mapsto-\boldsymbol p$ と置き換え、第一項と同じ空間位相に揃えます。

$$
\left.\partial_0\Delta(t,\boldsymbol x;s)\right|_{t=0}
=\int\frac{d^3p}{(2\pi)^3\,2E_s}
(iE_s+iE_s)e^{-i\boldsymbol p\cdot\boldsymbol x}
=+i\delta^3(\boldsymbol x).
$$

ここでは $p\cdot x=-E_st+\boldsymbol p\cdot\boldsymbol x$ であり、$\partial^0=-\partial_0$ です。従って $\partial^0\Delta|_{t=0}=-i\delta^3$ となります。よって切断を十分広げると

$$
\lim_{R\to\infty}\int d^3x\,f_R(\boldsymbol x)C^0(0,\boldsymbol x)
=-ic_0.
$$

左辺に $i$ を掛けたものが仮定の非零数 $c$ だから $c_0=c\ne0$ です。従って質量零のスペクトル寄与は消えず、全スペクトルが $-p^2\ge m_*^2>0$ に限られることはありません。

この議論は**スペクトル表示と切断極限を使う条件付き導出**です。一般の相対論的局所場のスペクトル定理そのものの証明、異常的接触項がないことの検証、相互作用理論の非摂動構成を暗黙に済ませたわけではありません。
<!-- proof-end -->

### 古典の零固有値と量子の定理をつなぐ条件

- [Hessian零方向の定理](#thm-qft33-hessian-zero)は有限成分の滑らかな**古典ポテンシャル**と停留条件だけを仮定し、二次作用の質量行列を制約します。
- [スペクトル形Goldstone定理](#thm-qft33-goldstone)は局所量子場の**保存流・スペクトル・非零の秩序変数**を仮定し、質量零のスペクトル寄与を結論します。量子補正後の有効ポテンシャルを古典式のまま固定する必要はありません。
- $O$ がLorentzスカラーでない場合、非相対論系やLorentz非不変な状態ではスペクトルのテンソル構造とGoldstoneモードの計数が変わり得ます。破れた生成子の数と粒子種の数を無条件に同一視しません。

## 5. 明示的破れ・有限体積・ゲージ対称性との境界

### 小さな外部源を加えると何が変わるか

作用に $+\varepsilon\phi_1$（$\varepsilon>0$）を加える、すなわちポテンシャルを $V_\varepsilon=V-\varepsilon\phi_1$ に変えます。これは $\phi_1$ 方向を**理論そのものが優遇**するので、真空の選択による自発的破れとは異なります。最小点を $(w,0)$、$w>v$ と書くと、停留条件は

$$
\lambda w(w^2-v^2)=\varepsilon.
$$

<a id="prop-qft33-explicit-breaking"></a>

<!-- formal-statement-start -->
> **命題（明示的破れによる擬Goldstone質量）**
> $\lambda,v,\varepsilon>0$、正準運動項、$V_\varepsilon=\lambda(|\phi|^2-v^2)^2/4-\varepsilon\phi_1$ の古典模型で、正の解 $w>v$ が $\lambda w(w^2-v^2)=\varepsilon$ を満たすとき、唯一の大域的最小点は $(w,0)$ である。この点のHessianの固有値は

$$
m_\parallel^2=2\lambda w^2+\frac{\varepsilon}{w},
\qquad
m_\perp^2=\frac{\varepsilon}{w}>0.
$$

> とくに $\varepsilon\to0^+$ で $w\to v$、$m_\perp^2\to0$ となる。Noether流は $\partial_\mu j^\mu=-\varepsilon\phi_2$ を満たし、もはや厳密には保存しない。
<!-- formal-statement-end -->

### 証明の見取り図

与えられた半径で線形源を最小にする方向は $\phi_1=|\phi|$ です。半径について停留条件を解き、Hessianの動径・接線成分を別々に評価します。保存流の発散では方程式の源項だけが残ります。

<!-- proof-start -->
### 証明

$r=|\phi|\ge0$ とすると $\phi_1\le r$ なので

$$
V_\varepsilon(\phi)\ge\frac{\lambda}{4}(r^2-v^2)^2-\varepsilon r
$$

であり、$r>0$ では等号は $\phi=(r,0)$ に限ります。右辺の微分は $\lambda r(r^2-v^2)-\varepsilon$ です。$0\le r\le v$ では負、$r>v$ では単調に増え、$r=v$ で負、無限大で正なので、ただ一つの解 $w>v$ が大域最小を与えます。

Hessianは $\lambda(r^2-v^2)I+2\lambda\phi\phi^T$ だから

$$
H_\varepsilon(w,0)=
\begin{pmatrix}
\lambda(w^2-v^2)+2\lambda w^2&0\\
0&\lambda(w^2-v^2)
\end{pmatrix}.
$$

停留式を $w>0$ で割ると $\lambda(w^2-v^2)=\varepsilon/w$ なので表示した固有値になります。$w$ は $\varepsilon\to0$ で $v$ に近づきます。運動方程式は

$$
\Box\phi_1=\lambda(r^2-v^2)\phi_1-\varepsilon,
\qquad
\Box\phi_2=\lambda(r^2-v^2)\phi_2.
$$

これを $\partial_\mu j^\mu=-\phi_1\Box\phi_2+\phi_2\Box\phi_1$ に代入すれば $-\varepsilon\phi_2$ です。保存則が壊れたため[Goldstone定理の仮定](#thm-qft33-goldstone)を直接適用できず、接線質量が許されるわけです。
<!-- proof-end -->

### 有限体積で回転対称な真空しか見えないのはなぜか

空間を体積 $\mathcal V$ の周期箱に入れ、動径揺らぎを凍結し、場を空間一様な $\phi=v(\cos\alpha,\sin\alpha)$ と近似します。運動項を積分すると

$$
L_{\mathrm{zero}}=\frac{\mathcal V v^2}{2}\dot\alpha^2,
\qquad
p_\alpha=\mathcal V v^2\dot\alpha,\qquad
H_{\mathrm{zero}}=\frac{p_\alpha^2}{2\mathcal V v^2}.
$$

$\alpha\equiv\alpha+2\pi$ なので、量子化では周期波動関数に $p_\alpha=-i\,d/d\alpha$ を作用させます。周期境界条件を満たす規格化固有関数と固有値は

$$
\psi_\ell(\alpha)=\frac{e^{i\ell\alpha}}{\sqrt{2\pi}},\qquad
p_\alpha\psi_\ell=\ell\psi_\ell,\qquad \ell\in\mathbb Z.
$$

従ってエネルギーは $E_\ell=\ell^2/(2\mathcal V v^2)$ です。有限体積で一意な基底 $\ell=0$ は回転不変で、$\langle\phi_1\rangle=\langle\phi_2\rangle=0$ となります。一方、最初の励起ギャップは $1/(2\mathcal V v^2)\to0$ です。この**零モード近似**は高運動量の場を無視していますが、「有限体積では真空を一点に固定できない」と「無限体積で対称性を破る純粋相を選べる」が矛盾しないことを示します。

小さな外部源を加えて向きを決め、先に $\mathcal V\to\infty$、後で $\varepsilon\to0^+$ とする極限は、有限体積で先に $\varepsilon\to0$ として回転対称な基底を取る極限と一般には交換しません。量子真空での $v$ はくりこまれた秩序変数へ読み替え、古典 $v$ をそのまま厳密値とはしません。

### 低次元・局所ゲージとの比較

- $1+1$ 次元の通常の相対論的局所量子場理論では、連続内部対称性を有限の秩序変数で破る真空が存在しないというColeman型の制限があります。質量零自由角度場の揺らぎは形式的に $\int_0^\Lambda dk/k$ と赤外発散し、古典の谷の一点を固定する摂動展開が失敗します。したがって上の**古典Hessian**の計算をそのまま低次元の量子破れの証明に使えません。
- [QFT15のゲージ冗長性](../QFT15/index.md#def-qft15-gauge)や[QFT28の局所ゲージ変換](../QFT28/index.md#thm-qft28-gauge-covariance)は物理状態の重複した表現に関わります。局所ゲージ変換を破れた**物理的な大域対称性**として数え、必ず観測可能なGoldstone粒子が出ると主張するのは誤りです。次のHiggs機構では拘束と物理自由度を明示してこの点を扱います。
- 温度のある非相対論系では分散関係や時間・空間対称性の仮定が異なります。Goldstoneの数え上げを「破れた生成子一個につき必ず一粒子」と機械的に適用しません。

## 6. 演習：何が対称で、どの仮定が質量零を守るか

### 演習 QFT33-A1：真空円と非破れ部分群

- Level: A
- 問題：$\lambda=2,\ v=3$ として $V(\phi_1,\phi_2)=\lambda(\phi_1^2+\phi_2^2-v^2)^2/4$ を考え、次を求めよ。

  1. 大域最小値と最小点の集合。
  2. $SO(2)$ の回転で $(3,0)$ を固定する角度と、$\alpha=\pi/2$ による変化。
  3. $O(2)$ に拡張したとき固定部分群に加わる要素。

<!-- solution-start -->
**詳細解答**

1. $V=\frac12(r^2-9)^2\ge0$ であり、等号は $r^2=\phi_1^2+\phi_2^2=9$ のときだけです。従って最小値は0、最小点集合は $\{(3\cos\beta,3\sin\beta):0\le\beta<2\pi\}$ です。
2. [真空多様体の定義](#def-qft33-vacuum)を用います。$R(\alpha)(3,0)^T=(3\cos\alpha,3\sin\alpha)^T$ が $(3,0)^T$ に等しいのは $\cos\alpha=1,\sin\alpha=0$、すなわち $\alpha\in2\pi\mathbb Z$ に限ります。$\alpha=\pi/2$ では $(0,3)$ となり、同じ最低エネルギーですが別の真空です。
3. $S=\operatorname{diag}(1,-1)$ は $S(3,0)^T=(3,0)^T$ で、$S^TS=I$、$\det S=-1$ です。従って $SO(2)$ の回転には入らず、$O(2)$ に含まれる固定反射です。
<!-- solution-end -->

### 演習 QFT33-A2：Hessianを任意方向で対角化する

- Level: A
- 問題：$\phi_0=(v/\sqrt2,v/\sqrt2)^T$ とする。$H_{ab}=\lambda(r^2-v^2)\delta_{ab}+2\lambda\phi_a\phi_b$ からHessianを求め、正規直交する動径・接線固有ベクトルと固有値を全て示せ。

<!-- solution-start -->
**詳細解答**

$r^2=v^2$ なので第一項は零です。第二項を成分で計算すると

$$
H(\phi_0)=\lambda v^2
\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

動径単位ベクトル $e_\parallel=(1,1)^T/\sqrt2$ を掛けると $He_\parallel=2\lambda v^2e_\parallel$ です。接線単位ベクトル $e_\perp=(-1,1)^T/\sqrt2$ では $He_\perp=0$ です。$e_\parallel^Te_\perp=0$、両方のノルムは1なので正規直交基底です。[質量行列の命題](#prop-qft33-o2-masses)の結果が、真空の方向を回しても変わらないことを確認できました。
<!-- solution-end -->

### 演習 QFT33-A3：保存流の発散と電荷の作用

- Level: A
- 問題：$\mathcal L=-\frac12(\partial\phi_a)^2-\lambda(\phi_a\phi_a-v^2)^2/4$ で、$j^\mu=-\phi_1\partial^\mu\phi_2+\phi_2\partial^\mu\phi_1$ を考えよ。

  1. 運動方程式から $\partial_\mu j^\mu=0$ を示せ。
  2. 等時刻正準交換関係から、切断 $f_R(\boldsymbol y)=1$ の点で $i[Q_R,\phi_1(\boldsymbol y)]$ を求めよ。

<!-- solution-start -->
**詳細解答**

1. 積の微分をすると

   $$
   \begin{aligned}
   \partial_\mu j^\mu
   &=-\partial_\mu\phi_1\partial^\mu\phi_2-\phi_1\Box\phi_2
    +\partial_\mu\phi_2\partial^\mu\phi_1+\phi_2\Box\phi_1\\
   &=-\phi_1[\lambda(r^2-v^2)\phi_2]
    +\phi_2[\lambda(r^2-v^2)\phi_1]=0.
   \end{aligned}
   $$

2. $j^0=\phi_1\Pi_2-\phi_2\Pi_1$ です。$[\Pi_1(\boldsymbol x),\phi_1(\boldsymbol y)]=-i\delta^3(\boldsymbol x-\boldsymbol y)$、異なる成分の交換子は零なので

   $$
   \begin{aligned}
   i[Q_R,\phi_1(\boldsymbol y)]
   &=-i\int d^3x\,f_R(\boldsymbol x)\phi_2(\boldsymbol x)
      [\Pi_1(\boldsymbol x),\phi_1(\boldsymbol y)]\\
   &=-f_R(\boldsymbol y)\phi_2(\boldsymbol y)
   =-\phi_2(\boldsymbol y).
   \end{aligned}
   $$

   これは無限小回転 $\delta\phi_1=-\alpha\phi_2$ と一致します。第2成分にはプラス符号が出ることと対になっています。
<!-- solution-end -->

### 演習 QFT33-A4：極座標の運動項と周期

- Level: A
- 問題：$\phi=(v+\rho)(\cos(\theta/v),\sin(\theta/v))$、$v>0$ とする。

  1. $\partial_\mu\phi_a\partial^\mu\phi_a$ を $\rho,\theta$ で計算せよ。
  2. $\rho=0$ での $\theta$ の周期と二次作用を求めよ。
  3. $\rho=-v$ で座標が壊れる理由を説明せよ。

<!-- solution-start -->
**詳細解答**

1. $c=\cos(\theta/v),s=\sin(\theta/v)$ とすると $\partial_\mu\phi_1=c\partial_\mu\rho-(v+\rho)s\partial_\mu\theta/v$、$\partial_\mu\phi_2=s\partial_\mu\rho+(v+\rho)c\partial_\mu\theta/v$ です。二乗の和の交差係数は $2cs-2sc=0$、$c^2+s^2=1$ なので

   $$
   \partial_\mu\phi_a\partial^\mu\phi_a
   =(\partial_\mu\rho)^2+\frac{(v+\rho)^2}{v^2}(\partial_\mu\theta)^2.
   $$

2. $\theta\mapsto\theta+2\pi v$ なら三角関数が同じです。$\rho=0$ に置いた二次の運動項は $-\frac12(\partial\theta)^2$、ポテンシャルは $\theta$ に依存しないので質量項はありません。
3. $\rho=-v$ では $\phi=(0,0)$ が全ての $\theta$ に対応し、角度を識別できません。同時に $\theta$ の運動項係数 $(v+\rho)^2/v^2$ が零になり、座標変換のJacobianが退化します。局所座標を真空近傍でだけ使う理由です。
<!-- solution-end -->

### 演習 QFT33-A5：破れと零Hessianは同値か

- Level: A
- 問題：$V(x,y)=x^2+y^4$ を考え、次を検討せよ。

  1. 最も低いポテンシャル値を与える点とHessianを求めよ。
  2. $y$ 方向のHessian固有値が零であることから「真空が連続対称性を自発的に破る」と結論できるか。
  3. $y$ を小さく動かすとエネルギーはどう変わるか。

<!-- solution-start -->
**詳細解答**

1. $V\ge0$、等号は $x=y=0$ だけです。$\nabla V=(2x,4y^3)$、$H=\operatorname{diag}(2,12y^2)$ なので原点で $H(0,0)=\operatorname{diag}(2,0)$ です。
2. できません。[Hessian零方向の定理](#thm-qft33-hessian-zero)は対称性が動かす真空から零方向を導く**片方向の含意**です。ここでは原点しか真空がなく、$y$ 方向の非零変位は最小点ではありません。
3. $x=0$ として $y=\delta$ に動かせば $V(0,\delta)-V(0,0)=\delta^4>0$（$\delta\ne0$）です。二次の係数が零でも四次の復元力が残ることが、連続真空軌道との違いです。
<!-- solution-end -->

### 演習 QFT33-B1：$SO(3)$ の破れた生成子

- Level: B
- 問題：実三成分場の $V=\lambda(|\phi|^2-v^2)^2/4$、$\phi_0=(0,0,v)^T$ を考える。$T_x,T_y,T_z$ を三次元の右手系の微小回転生成子とする。

  1. それぞれの $T_i\phi_0$ を求めよ。
  2. Hessianの核と一致することを示せ。
  3. 生成子は3個あるのにGoldstone方向が2個である理由を説明せよ。

<!-- solution-start -->
**詳細解答**

1. 回転軸の単位ベクトル $e_i$ を使うと $T_i\phi=e_i\times\phi$ です。外積の成分を計算して

   $$
   T_x\phi_0=(0,-v,0)^T,\quad
   T_y\phi_0=(v,0,0)^T,\quad
   T_z\phi_0=(0,0,0)^T.
   $$

2. 一般のHessian式へ $\phi_0$ を代入すると

   $$
   H(\phi_0)=2\lambda v^2
   \begin{pmatrix}0&0&0\\0&0&0\\0&0&1\end{pmatrix}.
   $$

   第一・第二成分だけを持つベクトルには零を掛けるので、$T_x\phi_0,T_y\phi_0$ は独立な核ベクトルです。第三方向は固有値 $2\lambda v^2>0$ です。
3. $T_z$ は選んだ真空を固定する生成子なので**破れていません**。非破れ部分群は $SO(2)$、軌道の次元は $3-1=2$ です。[対称性軌道とHessianの定理](#thm-qft33-hessian-zero)では生成子の総数ではなく $T_i\phi_0$ の線形独立な数を数えます。
<!-- solution-end -->

### 演習 QFT33-B2：Ward接触項から極を検算する

- Level: B
- 問題：正準規格化された質量零実場 $\pi$ で $\widetilde{\langle T\pi\pi\rangle}(p)=i/(-p^2+i0)$、電流の線形部分が $j^\mu=-v\partial^\mu\pi$（$v\ne0$）とする。

  1. 規約 $\widetilde F(p)=\int e^{ipx}F(x)d^4x$ で $G^\mu(p)=\widetilde{\langle Tj^\mu\pi\rangle}$ を求めよ。
  2. $-ip_\mu G^\mu=-iv$ を検算せよ。
  3. 同じ条件で $G^\mu=p^\mu F(p^2)$ が $p=0$ 近くで正則だと仮定すると何が矛盾するか。

<!-- solution-start -->
**詳細解答**

1. 微分のFourier変換は $-ip^\mu$ 倍なので

   $$
   G^\mu(p)=-v(-ip^\mu)\frac{i}{-p^2+i0}
   =-\frac{vp^\mu}{-p^2+i0}.
   $$

2. 分布の境界値として $(-p^2)/(-p^2+i0)=1$ を使うと

   $$
   -ip_\mu G^\mu=-iv\frac{-p^2}{-p^2+i0}=-iv.
   $$

   これは[保存流とWard接触項の命題](#prop-qft33-ward-pole)で、時間順序の境界に現れる交換子です。
3. $F$ が原点の近くで有限なら $p_\mu G^\mu=p^2F(p^2)\to0$ です。しかし(2)の接触項は $p_\mu G^\mu=v\ne0$ を要求します。したがって正則性を仮定できず、質量零の非正則寄与が必要です。この計算だけから高次の相互作用理論を厳密に構成したとは言えません。
<!-- solution-end -->

### 演習 QFT33-B3：外部源と質量の符号

- Level: B
- 問題：$V_\varepsilon(\phi)=\lambda(|\phi|^2-v^2)^2/4-\varepsilon\phi_1$、$\lambda,v,\varepsilon>0$ とする。

  1. 最小点の条件を求め、その解 $w$ が $v$ より大きい理由を述べよ。
  2. 接線質量二乗を求めよ。
  3. $\varepsilon$ が小さいとき $w=v+\delta$ として $\delta$ と $m_\perp^2$ の先頭項を導け。
  4. $\partial_\mu j^\mu$ の符号を検算せよ。

<!-- solution-start -->
**詳細解答**

1. 半径 $r$ を固定すると $-\varepsilon\phi_1$ が最小なのは $\phi_1=r,\phi_2=0$ のときです。半径方向の微分から $\lambda r(r^2-v^2)-\varepsilon=0$、従って $\lambda w(w^2-v^2)=\varepsilon>0$ です。$w>0$ なので $w^2>v^2$、よって $w>v$ です。
2. [明示的破れの命題](#prop-qft33-explicit-breaking)により $H_{22}(w,0)=\lambda(w^2-v^2)=\varepsilon/w$ です。
3. $w=v+\delta$ を代入すると

   $$
   \lambda(v+\delta)\bigl(2v\delta+\delta^2\bigr)
   =2\lambda v^2\delta+3\lambda v\delta^2+\lambda\delta^3
   =\varepsilon.
   $$

   従って $\delta=\varepsilon/(2\lambda v^2)+O(\varepsilon^2)$（$v,\lambda$ 固定）、さらに

   $$
   m_\perp^2=\frac{\varepsilon}{v+\delta}
   =\frac{\varepsilon}{v}+O(\varepsilon^2).
   $$

4. 方程式は $\Box\phi_1=\lambda(r^2-v^2)\phi_1-\varepsilon$ と $\Box\phi_2=\lambda(r^2-v^2)\phi_2$ です。$-\phi_1\Box\phi_2+\phi_2\Box\phi_1$ に代入すると、対称なポテンシャル由来の二項が相殺して $-\varepsilon\phi_2$ だけが残ります。プラス符号ではありません。
<!-- solution-end -->

### 演習 QFT33-B4：有限体積回転子と量子真空

- Level: B
- 問題：体積 $\mathcal V$ の箱内で一様な場 $\phi=v(\cos\alpha,\sin\alpha)$ を保ち、$L=\mathcal V v^2\dot\alpha^2/2$ とする。

  1. 正準運動量とHamiltonianを求めよ。
  2. 周期境界条件を課して固有状態とエネルギーを求めよ。
  3. 基底の $\langle\phi_1\rangle$ が零であることと、励起ギャップの体積依存を比較せよ。

<!-- solution-start -->
**詳細解答**

1. 微分すると $p_\alpha=\partial L/\partial\dot\alpha=\mathcal V v^2\dot\alpha$ で、Legendre変換から

   $$
   H=p_\alpha\dot\alpha-L
   =\frac{p_\alpha^2}{\mathcal V v^2}
    -\frac{p_\alpha^2}{2\mathcal V v^2}
   =\frac{p_\alpha^2}{2\mathcal V v^2}.
   $$

2. $\alpha$ は $2\pi$ 周期なので、規格化された固有関数は $\psi_\ell(\alpha)=e^{i\ell\alpha}/\sqrt{2\pi}$、$\ell\in\mathbb Z$ です。$p_\alpha=-i\partial_\alpha$ を作用させると $p_\alpha\psi_\ell=\ell\psi_\ell$、よって $E_\ell=\ell^2/(2\mathcal V v^2)$ です。
3. 基底は $\ell=0$、$\psi_0$ は一定なので

   $$
   \langle\phi_1\rangle_{\ell=0}
   =\frac{v}{2\pi}\int_0^{2\pi}\cos\alpha\,d\alpha
   =\frac{v}{2\pi}[\sin\alpha]_0^{2\pi}=0.
   $$

   しかし最初の励起 $\ell=\pm1$ とのギャップは $E_{\pm1}-E_0=1/(2\mathcal V v^2)$ で、$\mathcal V\to\infty$ により零へ近づきます。有限体積の不変基底と無限体積の自発的破れを区別できます。
<!-- solution-end -->

### 演習 QFT33-C1：対称性・粒子質量・明示的破れの総合判定

- Level: C
- 問題：$3+1$ 次元の実二成分スカラー場で

  $$
  \mathcal L=-\frac12(\partial\phi_1)^2-\frac12(\partial\phi_2)^2
  -\frac{\lambda}{4}(\phi_1^2+\phi_2^2-v^2)^2+\varepsilon\phi_1,
  \qquad\lambda,v>0,\quad \varepsilon\ge0
  $$

  とする。次を順に扱い、各段階が**古典**か**量子**かを記せ。

  1. $\varepsilon=0$ の真空を一つ選び、非破れ部分群、Hessianの固有値・固有方向を求めよ。
  2. 対称性の生成子からHessian零方向を導き、逆は一般に成り立たない理由を挙げよ。
  3. $\varepsilon=0$ の正準量子化の木レベルで、$O=\phi_2$ の電荷交換子と混合流相関関数の質量零極を計算せよ。相互作用のある量子論で同じ結論を保証する追加条件を挙げよ。
  4. $\varepsilon>0$ で真空 $(w,0)$ の接線質量二乗を求め、$\varepsilon\to0^+$ の極限と保存流の発散を検算せよ。
  5. 箱を有限体積にした場合と、$\phi$ を局所ゲージ対称性の下で変換する場合に、上の結論のどこを無条件に延長できないか説明せよ。

<!-- solution-start -->
**詳細解答**

1. **古典：** $\varepsilon=0$ なら $\mathcal M=\{(\phi_1,\phi_2):\phi_1^2+\phi_2^2=v^2\}$ です。$\phi_0=(v,0)$ を選べば $SO(2)$ 内の非破れ部分群は恒等元のみで、$T\phi_0=(0,v)$ です。[Hessianの命題](#prop-qft33-o2-masses)を微分から使うと

   $$
   H_{ab}(\phi_0)=\lambda(|\phi_0|^2-v^2)\delta_{ab}
   +2\lambda\phi_{0a}\phi_{0b}
   =\begin{pmatrix}2\lambda v^2&0\\0&0\end{pmatrix}.
   $$

   固有ベクトル $(1,0)$ が動径・質量二乗 $2\lambda v^2$、$(0,1)$ が接線・質量二乗0です。

2. **古典：** $V(e^{tT}\phi)=V(\phi)$ を微分して $\nabla V(\phi)\cdot T\phi=0$、さらに各成分で微分して

   $$
   H(\phi_0)T\phi_0+T^T\nabla V(\phi_0)=0.
   $$

   停留条件で第二項が零となるため $H(\phi_0)T\phi_0=0$ です。[一般定理](#thm-qft33-hessian-zero)の前提が全て必要です。逆の反例 $V(x,y)=x^2+y^4$ は原点で零Hessian方向を持つのに孤立真空であり、非零変位 $(0,\delta)$ のエネルギーは $\delta^4>0$ です。

3. **量子（二次・木レベル）：** $j^0=(v+h)\Pi_\pi-\pi\Pi_h$、$Q_R=\int f_Rj^0$ とすると正準交換関係から

   $$
   i[Q_R,\pi(0)]=f_R(0)(v+h(0)),\qquad
   \langle i[Q_R,\pi(0)]\rangle=v
   $$

   です。流の線形項 $j^\mu=-v\partial^\mu\pi+O(h\pi)$、$i/(-p^2+i0)$ の自由伝播関数から

   $$
   G^\mu(p)=(-ip^\mu)(-v)\frac{i}{-p^2+i0}
   =-\frac{vp^\mu}{-p^2+i0},\qquad
   p_\mu G^\mu=v.
   $$

   相互作用量子論の主張には、無限体積の並進・Lorentz不変な真空、保存された**大域**電流、正エネルギースペクトル、局所性、非零の切断電荷交換子と適切なスペクトル表示が必要です。これらは[スペクトル形Goldstone定理](#thm-qft33-goldstone)の仮定であり、古典Hessianだけからは得られません。

4. **古典：** $\varepsilon>0$ では停留条件 $\lambda w(w^2-v^2)=\varepsilon$ により $w>v$。Hessianの接線成分は

   $$
   m_\perp^2=\lambda(w^2-v^2)=\frac{\varepsilon}{w}>0
   $$

   で、$\varepsilon\to0^+$ により $w\to v,\ m_\perp^2\to0$ です。$+\varepsilon\phi_1$ の作用は $\phi_1$ 方程式へ $+\varepsilon$ を加えるので

   $$
   \partial_\mu j^\mu=-\phi_1\Box\phi_2+\phi_2\Box\phi_1=-\varepsilon\phi_2.
   $$

   この非零発散がGoldstone定理の厳密な保存則を破っています。

5. **量子の限界：** 有限体積では角度零モードの一意な回転不変基底を選べ、$\langle\phi\rangle=0$ でも回転子ギャップは $1/(2\mathcal V v^2)\to0$ です。自発的破れの秩序変数を議論するには体積極限と微小源極限の順序が重要です。また**局所ゲージ変換**は場の記述の冗長性であり、上で仮定した物理的な大域保存電荷と同一視できません。ゲージ固定後の接線成分を、無条件に観測可能な質量零粒子とは数えません。
<!-- solution-end -->

## 7. まとめ：Higgs機構への問い

- 対称な作用から一つの真空が選ばれると、連続対称性の**軌道方向**が古典Hessianの零方向になります。$O(2)$ 模型では動径が質量正、接線が質量零です。
- 量子場のGoldstone定理は保存された**大域内部対称性の流**、非零の秩序変数、局所性とスペクトル条件を要します。保存流のWard接触項が質量零のスペクトル寄与を強制します。
- 小さな明示的破れは $\partial_\mu j^\mu\ne0$ を生み、接線場に $m_\perp^2=\varepsilon/w$ を与えます。有限体積や低次元では極限・揺らぎを別途考えます。

次は、この回転を**局所ゲージ変換**にしたとき、接線の自由度がなぜ物理的な質量零粒子としては現れず、ゲージ場の縦成分との組み合わせで何が起こるのかを調べます。
