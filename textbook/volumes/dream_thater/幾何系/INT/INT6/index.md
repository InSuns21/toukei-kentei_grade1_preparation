# INT6 Birkhoff標準形

[INT5の一次正準変換](../INT5/index.md#def-int5-type2-generator)は、遠く離れた周波数を持つ波を消し、共鳴する波を残しました。ところが振動子の平衡点の近くでは、角度は原点で定義できず、作用角変数のままTaylor展開をするのは不便です。そこで位置・運動量から始め、次数ごとの多項式を正準変換で整理します。

目標は三つです。第一に、二次の振動子を基準として三次以降の項を一段ずつ消すこと。第二に、何が共鳴して消せないかを振動数についての整数係数の等式から判定すること。第三に、**有限次数までの標準形と無限級数の収束は別の主張**だと明確にすることです。正定値の平衡点ならエネルギー保存だけで近傍安定性が従いますが、標準形はさらに作用の変化が遅い理由を説明します。

## 1. 平衡点での線形振動を正準座標へ直す

実座標を $x=(q_1,p_1,\ldots,q_n,p_n)\in\mathbb R^{2n}$ とし、シンプレクティック形式は $\sum_jdq_j\wedge dp_j$、[Poisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)は

$$
\{f,g\}=\sum_{j=1}^n(f_{q_j}g_{p_j}-f_{p_j}g_{q_j})
$$

です。$H$ は原点の近傍で実解析的（有限次数の議論だけなら十分高階の $C^k$ 級でもよい）で、$dH(0)=0$ とします。原点が平衡点なのは $\dot x=J\nabla H(x)$ から分かります。ただし $J$ は各 $(q_j,p_j)$ 平面で $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ と作用する行列です。

二次形式のHessian $K=D^2H(0)$ が正定値なら、十分小さい位置では $H(x)-H(0)>0$ となります。このクラスは、固有値が純虚数であるだけの一般の楕円型平衡点より条件が強いものです。

<a id="def-int6-positive-elliptic"></a>

<!-- formal-statement-start -->
> **定義（正定値楕円型平衡点）**  
> $H$ が原点近傍の実数値 $C^2$ 級Hamilton関数であり、$dH(0)=0$ かつ対称行列 $D^2H(0)$ が正定値であるとき、原点を本章で扱う正定値楕円型平衡点と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int6-positive-elliptic -->
### 直接例：二振動子の平衡点を判定する

**定義の確認**：$H=(p_1^2+4q_1^2+p_2^2+9q_2^2)/2+\lambda q_1^2q_2^2$ とします。原点の勾配は零、Hessianは $(q_1,p_1,q_2,p_2)$ の順で $\operatorname{diag}(4,1,9,1)$ です。任意の非零ベクトル $v$ に対し $v^\mathsf{T}Kv=4v_1^2+v_2^2+9v_3^2+v_4^2>0$ なので、$\lambda$ の符号にかかわらず原点は定義を満たします。結合の四次項は二次線形化を変えません。
<!-- definition-example-end -->

楕円型振動子として議論するには、正定値の二次形式を正準線形変換で標準形へ移す必要があります。「対角化できる」だけでは正準性が保証されないので、その構成を確認します。

<a id="prop-int6-linear-symplectic"></a>

<!-- formal-statement-start -->
> **命題（正定値二次Hamilton関数の正準線形標準化）**  
> $K$ が実対称正定値の $2n\times2n$ 行列なら、実線形シンプレクティック変換 $x=Sy$ と正数 $\omega_1,\ldots,\omega_n$ が存在し、
>
$$
\frac12x^\mathsf{T}Kx
=\sum_{j=1}^n\frac{\omega_j}{2}(Q_j^2+P_j^2),
\qquad y=(Q_1,P_1,\ldots,Q_n,P_n)
$$
>
> が成り立つ。ここで $S^\mathsf{T}JS=J$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$K$ を単に直交対角化する代わりに、歪対称行列 $K^{1/2}JK^{1/2}$ を調べます。その直交標準形の各二次元ブロックから、二次形式とシンプレクティック形式の両方を保つ尺度変換を作ります。

<!-- proof-start -->
### 証明

$K>0$ なので実対称正定値の平方根 $K^{1/2}$ と逆平方根 $K^{-1/2}$ が存在します。$A=K^{1/2}JK^{1/2}$ とおくと

$$
A^\mathsf{T}=-A,\qquad \det A=\det K\det J\ne0.
$$

実歪対称行列の直交標準形より、ある直交行列 $U$ と正数 $\omega_j$ を選んで

$$
U^\mathsf{T}AU=D_J,\qquad
D_J=\operatorname{diag}(\omega_1J_2,\ldots,\omega_nJ_2),\quad
J_2=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

とできます。歪対称行列のこの標準形は、複素固有値が対 $\pm i\omega_j$ で現れ、各二次元実不変平面の正規直交基底を選ぶことで得られます。$\Omega=\operatorname{diag}(\omega_1I_2,\ldots,\omega_nI_2)$ とし、$S=K^{-1/2}U\Omega^{1/2}$ と置きます。

まず二次形式は

$$
S^\mathsf{T}KS
=\Omega^{1/2}U^\mathsf{T}K^{-1/2}KK^{-1/2}U\Omega^{1/2}
=\Omega.
$$

次に $A^{-1}= -K^{-1/2}JK^{-1/2}$ なので

$$
\begin{aligned}
S^\mathsf{T}JS
&=-\Omega^{1/2}U^\mathsf{T}A^{-1}U\Omega^{1/2}\\
&=-\Omega^{1/2}D_J^{-1}\Omega^{1/2}
=\operatorname{diag}(J_2,\ldots,J_2)=J.
\end{aligned}
$$

最後の等号には $(\omega_jJ_2)^{-1}=-J_2/\omega_j$ を使いました。したがって $S$ は正準変換であり、$x=Sy$ への代入から表示したHamilton関数が得られます。
<!-- proof-end -->

一自由度で $H_2=(p^2+\omega^2q^2)/2$ なら $Q=\sqrt{\omega}\,q$、$P=p/\sqrt{\omega}$ を選ぶと $dq\wedge dp=dQ\wedge dP$ で、$H_2=\omega(Q^2+P^2)/2$ と実際に標準化されます。以下ではこの線形変換を済ませ、定数 $H(0)$ を取り除きます。

## 2. 複素振動子座標と「消せない項」

各 $(Q_j,P_j)$ に対して複素座標と実数値の振動子作用を

$$
z_j=\frac{Q_j+iP_j}{\sqrt2},\qquad
\bar z_j=\frac{Q_j-iP_j}{\sqrt2},\qquad
I_j=z_j\bar z_j=\frac{Q_j^2+P_j^2}{2}
$$

と置きます。ここで $\bar z_j$ は $z_j$ の複素共役で、独立な実変数を追加したわけではありません。[Poisson括弧の基本性質](../../SYM/SYM4/index.md#prop-sym4-poisson-elementary)を実座標で計算すると

$$
\{z_j,\bar z_k\}=-i\delta_{jk},\qquad
H_2=\sum_{j=1}^n\omega_jz_j\bar z_j.
$$

例えば $\partial_Qz=1/\sqrt2$、$\partial_P\bar z=-i/\sqrt2$ なので、同じ添字での括弧は $-i/2-i/2=-i$ です。$H_2$ との括弧では反対の順序を取ることに注意します。

$$
\{H_2,z_j\}=i\omega_jz_j,\qquad
\{H_2,\bar z_j\}=-i\omega_j\bar z_j.
$$

指数ベクトル $\alpha,\beta\in\mathbb Z_{\ge0}^n$ に対し $z^\alpha\bar z^\beta=\prod_jz_j^{\alpha_j}\bar z_j^{\beta_j}$ と書きます。積の微分則を各因子へ使うと

$$
\boxed{\ \{H_2,z^\alpha\bar z^\beta\}
=i\bigl((\alpha-\beta)\cdot\omega\bigr)z^\alpha\bar z^\beta.\ }
$$

ここが次数別のホモロジー方程式の計算エンジンです。

<a id="def-int6-homogeneous-resonance"></a>

<!-- formal-statement-start -->
> **定義（同次次数とBirkhoff非共鳴条件）**  
> 単項式 $z^\alpha\bar z^\beta$ の同次次数は次で定める。

$$
m=|\alpha|_1+|\beta|_1.
$$

> 周波数差が次の等式を満たすとき、単項式を共鳴項という。

$$
(\alpha-\beta)\cdot\omega=0.
$$

> 整数 $r\ge3$ に対し、零でない整数ベクトル $k$ について次を満たすなら、振動数 $\omega$ は次数 $r$ まで非共鳴であるという。

$$
0<|k|_1\le r\quad\Longrightarrow\quad k\cdot\omega\ne0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-int6-homogeneous-resonance -->
### 直接例：何が作用だけの多項式として残るか

**定義の確認**：$n=2$、$\omega=(1,\sqrt2)$ とすると、整数係数の一次関係 $k_1+k_2\sqrt2=0$ は $k=0$ しかありません。したがって任意の有限次数で非共鳴です。四次の $z_1^2\bar z_1^2=I_1^2$ は $\alpha=\beta$ だから共鳴し、$z_1^2\bar z_2^2$ は差ベクトル $(2,-2)$ のため非共鳴です。一方 $\omega=(1,2)$ なら三次項 $z_1^2\bar z_2$ は差ベクトル $(2,-1)$ で、$2\omega_1-\omega_2=0$ となって共鳴します。
<!-- definition-example-end -->

この「共鳴」は[INT4の整数共鳴](../INT4/index.md#def-int4-resonance)と同じ周波数の整数係数の等式です。ただし今はFourier級数ではなく、原点における同次多項式が相手です。非共鳴なら $(\alpha-\beta)\cdot\omega=0$ から $\alpha=\beta$ が従うので、**除去できずに残る多項式は作用 $I_j$ の多項式**になります。

## 3. 有限次数のBirkhoff標準形を構成する

$H$ のTaylor展開を

$$
H=H_2+H_3+H_4+\cdots,\qquad
H_m=\sum_{|\alpha|_1+|\beta|_1=m}h_{\alpha\beta}z^\alpha\bar z^\beta
$$

とし、$H_m$ は実数値の同次多項式とします。目指すのは、低次数の角度依存を正準変換で取り去り、作用だけの項 $Z_m(I)$ を残すことです。[INT5の生成関数](../INT5/index.md#def-int5-type2-generator)と同じく正準性が必要ですが、ここでは同次Hamilton関数 $\chi_m$ 自身の時間1流を使用します。[Hamiltonベクトル場](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)の流れは局所シンプレクティックで、原点近傍では $\chi_m$ の次数 $m\ge3$ により恒等写像に近くなります。

<a id="thm-int6-finite-birkhoff"></a>

<!-- formal-statement-start -->
> **定理（有限次数Birkhoff標準形）**  
> $r\ge3$ を整数とする。実解析的Hamilton関数 $H$ が原点を正定値楕円型平衡点に持ち、その二次部分を正準線形変換で
>
$$
H_2=\sum_{j=1}^n\omega_jI_j,\qquad \omega_j>0
$$
>
> としたとする。$\omega$ が次数 $r$ まで非共鳴なら、原点を固定し接写像が恒等の局所解析的正準変換 $\Phi_r$ が存在し、
>
$$
H\circ\Phi_r=H_2+\sum_{j=2}^{\lfloor r/2\rfloor}Z_{2j}(I)+R_{r+1},
\qquad R_{r+1}(z,\bar z)=O(|z|^{r+1})
$$
>
> が成り立つ。各 $Z_{2j}$ は作用に関して次数 $j$ の実多項式で、和には $2j\le r$ の項だけを含み、$r=3$ のときは空和とする。有限次数での存在は、$r\to\infty$ での変換の収束を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

三次から順に、その次数の共鳴項を $Z_m$ として残し、残りを $\chi_m$ の流れで消します。括弧 $\{F_a,G_b\}$ は、零でなければ次数 $a+b-2$ なので、$m$ 次の生成関数はすでに整えた $3,\ldots,m-1$ 次の項を再び壊しません。係数除算で必要になるのは有限個の非零な振動数差だけです。

<!-- proof-start -->
### 証明

まず[線形正準標準化](#prop-int6-linear-symplectic)で $H_2$ を表示した形にします。$m=3$ から $r$ まで帰納します。$m$ より低い次数が標準化済みであるとし、現在のHamilton関数を

$$
H^{(m-1)}=H_2+\sum_{3\le j<m}Z_j(I)+P_m(z,\bar z)+O(|z|^{m+1})
$$

と書きます。$P_m$ は $m$ 次の実同次多項式です。各 $P_m$ を $\alpha,\beta$ で展開し、$\alpha=\beta$ の項だけを足したものを $Z_m$ とします。$\alpha=\beta$ は $m$ が偶数の場合にのみ可能で、このとき $z^\alpha\bar z^\alpha=I^\alpha$ です。

除去すべき単項式 $\alpha\ne\beta$ については $k=\alpha-\beta\ne0$ かつ $|k|_1\le m\le r$ なので、非共鳴条件から $k\cdot\omega\ne0$ です。そこで

$$
\chi_m=-\sum_{\substack{|\alpha|_1+|\beta|_1=m\\\alpha\ne\beta}}
\frac{h_{\alpha\beta}}{i(\alpha-\beta)\cdot\omega}\,
z^\alpha\bar z^\beta,\qquad
P_m=\sum h_{\alpha\beta}z^\alpha\bar z^\beta
$$

と置きます。$P_m$ が実数値なら $h_{\beta\alpha}=\overline{h_{\alpha\beta}}$ です。分母は $\alpha,\beta$ を入れ替えると符号が逆転するため、$\chi_m$ の共役対の係数も互いに複素共役になり、$\chi_m$ は実数値です。[括弧の単項式公式](#def-int6-homogeneous-resonance)の直前で計算した式から

$$
\{H_2,\chi_m\}=-(P_m-Z_m)
$$

を得ます。$\chi_m$ のHamilton流の時間1写像を $\Psi_m$ とします。$\chi_m$ は次数 $m$ であり、そのベクトル場は $O(|z|^{m-1})$ だから、十分小さい近傍で流れが定義され $\Psi_m(z)=z+O(|z|^{m-1})$ です。Poisson括弧の次数評価

$$
\{F_a,G_b\}\not\equiv0\quad\Longrightarrow\quad\deg\{F_a,G_b\}=a+b-2
$$

は、同次多項式の偏微分がそれぞれ次数を1下げることから従います。括弧が恒等的に零なら対応する項は現れません。時間に沿う微分が $d(F\circ\Psi_m^t)/dt=\{F,\chi_m\}\circ\Psi_m^t$ なので、Taylor展開により $m$ 次まで

$$
\begin{aligned}
H^{(m-1)}\circ\Psi_m
&=H^{(m-1)}+\{H^{(m-1)},\chi_m\}+O(|z|^{m+1})\\
&=H_2+\sum_{3\le j<m}Z_j+P_m+\{H_2,\chi_m\}+O(|z|^{m+1})\\
&=H_2+\sum_{3\le j\le m}Z_j+O(|z|^{m+1}).
\end{aligned}
$$

二行目で、$j\ge3$ の $\{Z_j,\chi_m\}$ は次数 $j+m-2\ge m+1$、$\{P_m,\chi_m\}$ は次数 $2m-2\ge m+1$ と確認しました。$\{H_2,\chi_m\}$ への二重括弧も次数 $2m-2$ 以上なので落とせます。

帰納法により $\Phi_r=\Psi_3\circ\cdots\circ\Psi_r$（写像の合成順序は各段階で更新される座標に合わせる）は局所解析的な正準変換です。各段階の一次部分は恒等であり、最終的なTaylor剰余は $O(|z|^{r+1})$ です。非共鳴では奇数次数の $Z_m$ は存在しないため、定理の偶数次数の和になります。
<!-- proof-end -->

この証明で分母を割った回数は、固定した $r$ について有限回でした。次数を上げるほど非零の分母が小さくなり得ることは、[INT4の小分母](../INT4/index.md#def-int4-resonance)で見た障害の平衡点版です。形式的に全次数を処理できても、生成関数の係数が収束半径を持つとは限りません。

## 4. 四次振動子を自分で標準化する

一自由度の非線形振動子

$$
H(Q,P)=\frac{\omega}{2}(Q^2+P^2)+\lambda Q^4,\qquad \omega>0,\quad\lambda\in\mathbb R
$$

を計算します。$z=(Q+iP)/\sqrt2$、$I=z\bar z$ とすると $Q=(z+\bar z)/\sqrt2$ だから

$$
H_4=\frac{\lambda}{4}(z+\bar z)^4
=\frac{\lambda}{4}\bigl(z^4+4z^3\bar z+6z^2\bar z^2+4z\bar z^3+\bar z^4\bigr).
$$

非共鳴の一自由度では、$z^2\bar z^2=I^2$ だけが共鳴します。

<a id="prop-int6-quartic"></a>

<!-- formal-statement-start -->
> **命題（四次振動子のBirkhoff係数）**  
> $\omega>0$、$\lambda\in\mathbb R$ とする。$H=\omega(Q^2+P^2)/2+\lambda Q^4$ には原点近傍の接写像が恒等である正準変換があり、四次までの標準形は
>
$$
H\circ\Phi_4=\omega I+\frac{3\lambda}{2}I^2+O(|z|^6)
$$
>
> となる。ここで $I=|z|^2$ は新座標における作用である。
<!-- formal-statement-end -->

### 証明の見取り図

四次項から $z^2\bar z^2$ の係数を読み、残り四つの単項式を $\{H_2,\chi_4\}$ で打ち消します。奇数次数はもともとありません。四次の生成関数を使った新しい項は六次から始まります。

<!-- proof-start -->
### 証明

共鳴項の係数は $(\lambda/4)\binom42=6\lambda/4=3\lambda/2$ です。[有限次数Birkhoff標準形の構成](#thm-int6-finite-birkhoff)に従って、非共鳴項の分母 $i\omega(\alpha-\beta)$ を割ると

$$
\chi_4=\frac{i\lambda}{16\omega}(z^4-\bar z^4)
+\frac{i\lambda}{2\omega}(z^3\bar z-z\bar z^3).
$$

この式は共役を取っても不変なので実数値です。単項式ごとに検算すると

$$
\begin{aligned}
\{H_2,z^4\}&=4i\omega z^4,\\
\{H_2,z^3\bar z\}&=2i\omega z^3\bar z,\\
\{H_2,z\bar z^3\}&=-2i\omega z\bar z^3,\\
\{H_2,\bar z^4\}&=-4i\omega\bar z^4,
\end{aligned}
$$

ゆえに

$$
\{H_2,\chi_4\}
=-\frac\lambda4(z^4+4z^3\bar z+4z\bar z^3+\bar z^4)
=-H_4+\frac{3\lambda}{2}I^2.
$$

$\chi_4$ のベクトル場は三次で、$\{H_4,\chi_4\}$ および $\{\{H_2,\chi_4\},\chi_4\}$ は六次です。元の $H$ は偶数次数だけを持つので五次項も生じず、

$$
H\circ\Phi_4=H_2+H_4+\{H_2,\chi_4\}+O(|z|^6)
=\omega I+\frac{3\lambda}{2}I^2+O(|z|^6).
$$

を得ます。
<!-- proof-end -->

標準形の角速度は、残した項を作用で微分して

$$
\dot\theta=\frac{d}{dI}\left(\omega I+\frac{3\lambda}{2}I^2\right)
=\omega+3\lambda I
$$

となります。これは実際の運動の角速度について**小振幅での近似**を与えるのであって、無限時間にわたり剰余が零という意味ではありません。

### 共鳴で壊れる場所

二自由度の $\omega=(1,2)$ で $\mu\in\mathbb R$ とし、三次の実数値項 $\mu(z_1^2\bar z_2+\bar z_1^2z_2)$ があると、差ベクトル $(2,-1)$ に対する分母は零です。[有限次数の証明](#thm-int6-finite-birkhoff)の $\chi_3$ を定める除算がそこで停止します。こうした項は $I_1,I_2$ だけでは表せず、共鳴角 $2\arg z_1-\arg z_2$ に依存します。これは[INT5の共鳴射影](../INT5/index.md#def-int5-resonant-projection)と同じ「消せない項を残す」という考え方ですが、平衡点では複素多項式を使用します。

## 5. 剰余から読める安定性と読めないこと

標準形だけを取り出した $N(I)=\omega\cdot I+\sum Z_{2j}(I)$ では、Hamilton方程式から $\dot I_j=0$ です。元の関数には $R_{r+1}$ が残り、時間微分を計算すると

$$
\dot I_j=\{I_j,N+R_{r+1}\}=\{I_j,R_{r+1}\}.
$$

$I_j=(Q_j^2+P_j^2)/2$ の導関数は一次なので、剰余のTaylor展開に次数 $r$ 以下の項がないので、その勾配は $O(|z|^r)$ となり、$\dot I_j=O(|z|^{r+1})$ が従います。

<a id="prop-int6-action-drift"></a>

<!-- formal-statement-start -->
> **命題（有限次数標準形の作用変動評価）**  
> [有限次数Birkhoff標準形](#thm-int6-finite-birkhoff)の仮定と記法を用い、正規化後の原点からの距離を $\rho>0$ とする。十分小さい $\rho$ に対し、$|z(0)|\le\rho$ を満たす解はある一定 $C_0$ によって全時間 $|z(t)|\le C_0\rho$ を満たす。また各作用について、初期値に依存しない定数 $C_1$ が存在し、
>
$$
|I_j(t)-I_j(0)|\le C_1|t|\rho^{r+1}
$$
>
> が全ての実時間 $t$ で成立する。特に $|t|\le c\rho^{1-r}$ では作用の差は $O(\rho^2)$ である。これは有限次数の評価であり、無限次数で厳密な可積分性が生じるという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

正定値の二次エネルギーが軌道を小球に閉じ込めます。その球の中で、作用のPoisson括弧を積分します。**軌道が球内にいること**と**作用がほぼ一定なこと**を別々に示す点が大切です。

<!-- proof-start -->
### 証明

二次形式は正定値で $\omega_j>0$ です。高次項が二次に比べて小さいことから、十分小さい $|z|$ に対し正数 $a,b$ が存在して

$$
a|z|^2\le(H\circ\Phi_r)(z)-(H\circ\Phi_r)(0)\le b|z|^2
$$

が成立します。$H\circ\Phi_r$ は保存されるため、出発点で $|z(0)|\le\rho$ とすると

$$
a|z(t)|^2\le (H\circ\Phi_r)(z(t))-(H\circ\Phi_r)(0)
\le b\rho^2.
$$

ここで小球の境界までの初到達時刻を仮定すると同じ評価が境界で矛盾を与えるよう、あらかじめ $\rho$ を十分小さく選びます。したがって解は小球を出ず、局所ODEの延長可能性から全実時間で定義され、$|z(t)|\le\sqrt{b/a}\rho=:C_0\rho$ が成り立ちます。

解析的剰余のTaylor展開は次数 $r+1$ 未満の項を含まないため、ある定数 $M$ により $|\nabla R_{r+1}(z)|\le M|z|^r$ です。さらに $|\nabla I_j(z)|=\sqrt{Q_j^2+P_j^2}=\sqrt2|z_j|\le\sqrt2|z|$ だから、[Poisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)に対するCauchy–Schwarzの不等式で

$$
|\dot I_j|=|\{I_j,R_{r+1}\}|
\le|\nabla I_j|\,|\nabla R_{r+1}|
\le \sqrt2 M(C_0\rho)^{r+1}.
$$

$t=0$ から $t$ まで積分すると $|I_j(t)-I_j(0)|\le\sqrt2 MC_0^{r+1}|t|\rho^{r+1}$ です。$|t|\le c\rho^{1-r}$ を代入すれば右辺は $\sqrt2 MC_0^{r+1}c\rho^2$ です。
<!-- proof-end -->

正定値性による近傍安定性は、非共鳴を使わず**エネルギー保存だけ**からも証明できます。一方、作用が遅く変わる評価は、非共鳴条件の下で剰余を高次数へ追いやったことの効果です。平衡点の二次形式が不定符号の場合、純虚数固有値であっても上のエネルギー閉じ込めを流用できません。

無限次数へ進むには、除算する分母の大きさと変換の高階微分を一様に制御しなければなりません。固定 $r$ の有限和を作れたことから、その無限列が収束するとは言えません。さらにKAM理論が扱う不変トーラスの存続は、ここでの有限次数の作用変動評価とは異なる追加条件と反復推定を必要とします。

## 6. 演習：次数・共鳴・剰余を紙上で確認する

### Level A

<a id="ex-int6-a01"></a>
**A1. 正定値性の判定。** $H=(q^2+4p^2)/2+\eta q^3$ が原点で正定値楕円型平衡点を持つことを示し、二次Hamilton関数を $\omega(Q^2+P^2)/2$ に直す正準線形変換を一つ構成せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\partial_qH=q+3\eta q^2$、$\partial_pH=4p$ なので原点で勾配は零です。Hessianは $\operatorname{diag}(1,4)$ で、非零 $(u,v)$ に対し $u^2+4v^2>0$ です。[正定値楕円型の定義](#def-int6-positive-elliptic)を満たします。$q=\sqrt2Q$、$p=P/\sqrt2$ とすれば $dq\wedge dp=dQ\wedge dP$ です。二次部分に代入すると $(2Q^2+2P^2)/2=Q^2+P^2$ ですから $\omega=2$ です。三次項は $2\sqrt2\,\eta Q^3$ で、二次の標準化には影響しません。
<!-- solution-end -->

<a id="ex-int6-a02"></a>
**A2. 複素座標の符号。** $\{z,\bar z\}$ と $\{H_2,z^2\bar z\}$ を、$z=(Q+iP)/\sqrt2$、$H_2=\omega z\bar z$ の定義から求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\partial_Qz=1/\sqrt2$、$\partial_Pz=i/\sqrt2$、$\partial_Q\bar z=1/\sqrt2$、$\partial_P\bar z=-i/\sqrt2$ です。[Poisson括弧の定義](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)から $\{z,\bar z\}=(1/\sqrt2)(-i/\sqrt2)-(i/\sqrt2)(1/\sqrt2)=-i$ となります。反対順序は $\{\bar z,z\}=i$ です。積の微分則を使い $\{H_2,z\}=i\omega z$、$\{H_2,\bar z\}=-i\omega\bar z$ なので、$\{H_2,z^2\bar z\}=2z\bar z(i\omega z)+z^2(-i\omega\bar z)=i\omega z^2\bar z$ です。
<!-- solution-end -->

<a id="ex-int6-a03"></a>
**A3. 三次の共鳴。** $\omega=(1,2)$ で $z_1^2\bar z_2$ と $z_1\bar z_1z_2$ の共鳴判定をし、非共鳴な方の $\{H_2,\chi_3\}$ の係数を求めよ。係数を $h$ とする。

- Level: A

<!-- solution-start -->
**詳細解答。** 最初の単項式の差ベクトルは $(2,-1)$ で、内積は $2-2=0$ です。従って共鳴して消せません。後者は $(0,1)$ で内積は $2$ です。後者だけが $h z_1\bar z_1z_2$ として現れたとき、除去用生成関数の係数は $-h/(2i)$ です。実数値のHamilton関数では共役の単項式も同時に入れて、生成関数を実数値にします。[次数別公式](#def-int6-homogeneous-resonance)に従って $\{H_2,-hz_1\bar z_1z_2/(2i)\}=-hz_1\bar z_1z_2$ となります。
<!-- solution-end -->

<a id="ex-int6-a04"></a>
**A4. 四次の射影。** $P_4=az^4+bz^3\bar z+cz^2\bar z^2+\bar b z\bar z^3+\bar a\bar z^4$ とする。$\omega>0$ のとき共鳴部分 $Z_4$ と、$z^4$ の除去に使う生成関数係数を答えよ。ただし $c$ は実数とする。

- Level: A

<!-- solution-start -->
**詳細解答。** 差指数 $\alpha-\beta$ は順に $4,2,0,-2,-4$ です。一自由度の $\omega>0$ では零になるのは中央だけなので $Z_4=cz^2\bar z^2=cI^2$ です。[有限次数標準形](#thm-int6-finite-birkhoff)のホモロジー方程式は $\{H_2,\chi_4\}=-(P_4-Z_4)$ です。$\{H_2,z^4\}=4i\omega z^4$ から、生成関数に入れる $z^4$ の係数は $-a/(4i\omega)$ です。共役の $\bar z^4$ の係数はその複素共役になります。
<!-- solution-end -->

### Level B

<a id="ex-int6-b01"></a>
**B1. 四次の周波数補正。** $H=\omega(Q^2+P^2)/2+gQ^4$、$\omega>0$ とする。四次標準形の作用係数を求め、振幅 $A$ の $Q$ 振動について周波数補正の主項を書け。

- Level: B

<!-- solution-start -->
**詳細解答。** $Q=(z+\bar z)/\sqrt2$ として $Q^4=(z+\bar z)^4/4$ です。展開の $z^2\bar z^2$ 係数は $\binom42/4=3/2$ なので、[四次係数の命題](#prop-int6-quartic)から $N(I)=\omega I+(3g/2)I^2$ です。作用微分により $\Omega(I)=\omega+3gI$ となります。非摂動振動子で $Q=A\cos(\omega t)$、$P=-A\sin(\omega t)$ のとき $I=A^2/2$ です。近恒等変換は作用へ高次補正を生じますが、主項では $I=A^2/2+O(A^4)$ なので、周波数は $\omega+(3g/2)A^2+O(A^4)$ です。$O(A^4)$ の係数まで四次標準形だけで決定したわけではありません。
<!-- solution-end -->

<a id="ex-int6-b02"></a>
**B2. 低次数が壊れない理由。** 三次の非共鳴項を除去して $Z_3=0$ となった後、五次生成関数 $\chi_5$ を使うとする。$\{H_2,\chi_5\}$、$\{Z_4,\chi_5\}$、$\{\chi_5,\{H_2,\chi_5\}\}$ の零でない場合の次数を求め、五次までに現れる項を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 同次多項式の括弧は、両因子の偏微分で次数が1ずつ下がるので、零でなければ $\deg\{F_a,G_b\}=a+b-2$ です。よって、各括弧が零でない場合

$$
\begin{aligned}
\deg\{H_2,\chi_5\}&=2+5-2=5,\\
\deg\{Z_4,\chi_5\}&=4+5-2=7,\\
\deg\{\chi_5,\{H_2,\chi_5\}\}&=5+5-2=8.
\end{aligned}
$$

括弧が恒等的に零なら該当項は現れません。五次までの補正は $\{H_2,\chi_5\}$ のみなので、四次の $Z_4$ はその次数まで変化しません。[正規化の証明](#thm-int6-finite-birkhoff)の次数判定を個別に確認できました。
<!-- solution-end -->

<a id="ex-int6-b03"></a>
**B3. 共鳴しているのにエネルギー安定。** $\omega=(1,2)$、$\mu\in\mathbb R$ として $H=I_1+2I_2+\mu(z_1^2\bar z_2+\bar z_1^2z_2)$ を原点近傍で考える。三次非共鳴標準形にできない理由と、それでも原点がLyapunov安定である理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $z_1^2\bar z_2$ の差ベクトルは $(2,-1)$ です。周波数差を代入すると

$$
(2,-1)\cdot(1,2)=2-2=0
$$

なので、三次のホモロジー方程式で必要な除算ができず、共鳴項は消せません。一方、二次部分 $H_2=I_1+2I_2$ は正定値で、三次項は原点近傍で $O(|z|^3)$ です。十分小さい球では正数 $a,b$ を選んで

$$
a|z|^2\le H(z)\le b|z|^2
$$

と評価できます。エネルギー保存により

$$
a|z(t)|^2\le H(z(t))=H(z(0))\le b|z(0)|^2.
$$

球の境界への初到達時刻を考えると、これから $|z(t)|\le\sqrt{b/a}|z(0)|$ が全時間で成立します。共鳴とエネルギー安定性は矛盾しません。
<!-- solution-end -->

<a id="ex-int6-b04"></a>
**B4. 剰余が作用へ与える影響。** $n=1$ の正規化されたHamilton関数が $H=N(I)+R_7(Q,P)$ を満たし、ある小球で $|\nabla R_7|\le M|(Q,P)|^6$ とする。$|(Q(t),P(t))|\le C\rho$ の時間区間で作用の変化を上から評価し、$|t|\le c\rho^{-4}$ のときの次数を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $I=(Q^2+P^2)/2$ より $\nabla I=(Q,P)$ なので $|\nabla I|\le C\rho$ です。また $|\nabla R_7|\le M(C\rho)^6$ です。$N$ は $I$ の関数だから $\{I,N\}=0$ となり、

$$
|\dot I|=|\{I,R_7\}|\le |\nabla I|\,|\nabla R_7|
\le MC^7\rho^7.
$$

積分すると $|I(t)-I(0)|\le MC^7|t|\rho^7$ です。$|t|\le c\rho^{-4}$ なら差は高々 $MC^7c\rho^3$ となります。[作用変動評価](#prop-int6-action-drift)の一般式では $r=6$ ですから、そこでの標準的な時間幅 $\rho^{-5}$ より短い時間を指定した分、$\rho^3$ というさらに小さい上界が得られます。
<!-- solution-end -->

### Level C

<a id="ex-int6-c01"></a>
**C1. 四次の除去から長時間評価へ。** $\omega>0$、$\lambda\in\mathbb R$ の一自由度Hamilton関数

$$
H(Q,P)=\frac{\omega}{2}(Q^2+P^2)+\lambda Q^4
$$

について次を求めよ。

1. 四次単項式を全て列挙し、共鳴部分を決定せよ。
2. 実数値生成関数 $\chi_4$ を構成し、Poisson括弧を代入して四次の非共鳴項が消えることを確かめよ。
3. 新しい座標で $N(I)$ と剰余の次数を述べ、$|z(0)|\le\rho$ の解について $|\Delta I(t)|$ を評価せよ。

- Level: C

<!-- solution-start -->
**詳細解答。**

**1. 共鳴部分。** $Q=(z+\bar z)/\sqrt2$ を代入し、

$$
\lambda Q^4=\frac\lambda4z^4+\lambda z^3\bar z+\frac{3\lambda}{2}z^2\bar z^2
+\lambda z\bar z^3+\frac\lambda4\bar z^4
$$

です。$\{H_2,z^\alpha\bar z^\beta\}=i\omega(\alpha-\beta)z^\alpha\bar z^\beta$ で $\omega>0$ だから、$\alpha=\beta=2$ の項だけが残ります。従って $Z_4=(3\lambda/2)I^2$ です。

**2. 生成関数。** 非共鳴な四項にそれぞれ $-1/[i\omega(\alpha-\beta)]$ を掛けると

$$
\chi_4=\frac{i\lambda}{16\omega}(z^4-\bar z^4)
+\frac{i\lambda}{2\omega}(z^3\bar z-z\bar z^3).
$$

各括弧の係数を検査すると、例えば $z^3\bar z$ に対して $(i\omega\cdot2)(i\lambda/(2\omega))=-\lambda$、$\bar z^4$ に対して $(-4i\omega)(-i\lambda/(16\omega))=-\lambda/4$ となります。共役側も符号が整い、

$$
H_4+\{H_2,\chi_4\}=\frac{3\lambda}{2}I^2
$$

が成り立ちます。生成関数は実数値で、時間1流は局所正準です。

**3. 剰余と作用。** 三次項はなく、四次と四次のPoisson括弧は六次です。従って

$$
H\circ\Phi_4=N(I)+R_6,\qquad
N(I)=\omega I+\frac{3\lambda}{2}I^2,\qquad
R_6=O(|z|^6).
$$

$\omega>0$ だから保存エネルギーは原点近傍で $|z|^2$ の上下からの定数倍に挟まれます。よって $|z(0)|\le\rho$ なら全時間で $|z(t)|\le C_0\rho$ です。解析的剰余の勾配は $O(|z|^5)$ であり、$\nabla I=O(|z|)$ を用いると

$$
|\dot I|=|\{I,R_6\}|\le C\rho^6,\qquad
|I(t)-I(0)|\le C|t|\rho^6.
$$

特に $|t|\le c\rho^{-4}$ なら変動は $O(\rho^2)$ です。四次の非共鳴項が消えたことは、剰余が恒等的に零、あるいは無限級数が収束することを意味しません。
<!-- solution-end -->
