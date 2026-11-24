# LREP23 正質量little group

<!-- definition-example-audit: strict -->

[未来円錐のLorentz軌道](../LREP22/index.md#thm-lrep22-orbits)では、質量が正の運動量を静止運動量へ移せました。しかし静止系に移した後にも、空間の座標軸を回す自由があります。この残った自由を群として取り出すと、粒子の内部自由度であるスピンを記述できます。さらに、異なる運動量を持つ静止系同士の回転を比較するための公式を作ります。

[共通の符号規約](../../../../../dream-theater-lorentz-conventions.md)に従い、$c=\hbar=1$、$\eta=\operatorname{diag}(-1,1,1,1)$ とします。

$m>0$ を固定し、[未来質量殻](../LREP22/index.md#def-lrep22-mass-shell)を $\mathcal O_m$ と書き、その点を $p=(E,\boldsymbol q)$、$E=\sqrt{m^2+|\boldsymbol q|^2}$、静止点を $k=(m,0,0,0)$ と書きます。ここで $\boldsymbol q=(q_1,q_2,q_3)\in\mathbb R^3$、$E=p^0>0$、$\eta(x,y)=x^{\mathsf T}\eta y$ です。変換は能動作用で、右側の行列から先に作用させます。

## 1. 運動量を変えない変換

運動量の時間成分と空間成分を指定しても、すべてのLorentz変換が決まるわけではありません。例えば静止点 $k$ はどの空間回転でも変わりません。一方、速度が零でないboostを加えると、空間運動量は零でなくなります。ある点を動かさない群元の集合は安定化群です。運動量に対してこの集合を調べるのが本講の出発点です。

$G=SO^+(1,3)$ は [Lorentz群と単位元成分](../LREP9/index.md#def-lrep9-lorentz-group) です。[特殊線形群](../../LIE/LIE3/index.md#def-lie3-special-linear-group) $SL(2,\mathbb C)$ は行列式1の二次複素行列の群です。本講では [Lorentz群の二重被覆](../LREP10/index.md#thm-lrep10-double-cover) を $\pi:SL(2,\mathbb C)\to G$ と書きます。これは LREP10 の $\Phi$、LREP22 の $\rho$ と同じ写像です。

四元ベクトル $x=(x^0,\boldsymbol x)$ を [エルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model) によって

$$
H(x)=x^0 I_2+\boldsymbol x\cdot\boldsymbol\sigma,\qquad
\boldsymbol x\cdot\boldsymbol\sigma=\sum_{a=1}^3 x^a\sigma_a
$$

と表します。$\sigma_a$ は [Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)、$I_n$ は $n$ 次単位行列、$\dagger$ は共役転置です。$H$ は実線形同型であり、[SL(2,C)の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action) は

$$
H(\pi(A)x)=AH(x)A^\dagger
$$

で定まります。従って $\pi(A)x=x$ を判定するには、行列の合同作用で $H(x)$ が変わらないかを確かめればよいのです。

本講で使う回転群 $SO(3)$ は [特殊直交群](../../LIE/LIE3/index.md#def-lie3-orthogonal-groups)、$SU(2)$ は [特殊ユニタリ群](../../LIE/LIE3/index.md#def-lie3-unitary-groups) の具体例です。条件はそれぞれ $R^{\mathsf T}R=I_3,\ \det R=1$ と $U^\dagger U=I_2,\ \det U=1$ です。

<a id="def-lrep23-little-group"></a>

<!-- formal-statement-start -->
> **定義（運動量のlittle group）**
> 任意の四元運動量 $p$ に対し、Lorentz群およびその被覆群における固定群をそれぞれ

$$
G_p=\{\Lambda\in G:\Lambda p=p\},
\qquad
\widetilde G_p=\{A\in SL(2,\mathbb C):\pi(A)p=p\}
$$

> とする。これらを運動量のlittle groupとその被覆群におけるlittle groupという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep23-little-group -->
**定義の確認**。 恒等変換は $p$ を固定し、$\Lambda_1p=\Lambda_2p=p$ なら $\Lambda_1\Lambda_2p=p$ です。また $\Lambda p=p$ の両辺に逆変換を作用させると $\Lambda^{-1}p=p$。従って固定群は部分群です。被覆側でも [合同作用によるLorentz群準同型](../LREP10/index.md#thm-lrep10-lorentz-action) により $\pi(I_2)=I_4$、$\pi(A_1A_2)=\pi(A_1)\pi(A_2)$、$\pi(A^{-1})=\pi(A)^{-1}$ なので、恒等元・積・逆元の三条件が成立します。

静止点 $k$ について、時間座標を変えず空間の標準基底で $z$ 軸まわりに角度 $\theta\in\mathbb R$ だけ回転する変換を考えます。空間部分の行列

$$
R_z(\theta)=\begin{pmatrix}
\cos\theta&-\sin\theta&0\\
\sin\theta&\cos\theta&0\\
0&0&1
\end{pmatrix}
$$

は $R_z^{\mathsf T}R_z=I_3$、$\det R_z=\cos^2\theta+\sin^2\theta=1$ を満たします。$\operatorname{diag}(1,R_z)$ は時間成分に $1$、空間成分に $R_z$ を作用させるブロック対角行列です。[Lorentz群と単位元成分](../LREP9/index.md#def-lrep9-lorentz-group) の判定条件に代入すると

$$
\operatorname{diag}(1,R_z)^{\mathsf T}\eta
\operatorname{diag}(1,R_z)=\operatorname{diag}(-1,R_z^{\mathsf T}R_z)=\eta .
$$

角度を零から連続的に変えれば恒等元に接続でき、空間成分が零の $k$ を固定します。従って $G_k$ の元です。

対してラピディティ $\chi\ne0$ の $z$ 方向boostは $k$ を $(m\cosh\chi,0,0,m\sinh\chi)$ へ移すので $G_k$ の元ではありません。

被覆側では $A=\operatorname{diag}(e^{-i\theta/2},e^{i\theta/2})$ は行列式1、$AA^\dagger=I_2$ です。[SL(2,C)の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)で $H(k)=mI_2$ へ作用させると $A(mI_2)A^\dagger=mI_2$ となり、$\widetilde G_k$ に属します。
<!-- definition-example-end -->

回転以外の変換が静止点を固定できないことも示しましょう。時間軸を固定すれば、その軸と計量に関して直交する空間全体が保存されます。被覆側では静止点が単位行列の定数倍であることが決め手になります。

<a id="thm-lrep23-rest-group"></a>

<!-- formal-statement-start -->
> **定理（正質量の静止安定化群）**
> $m>0$、$k=(m,0,0,0)$ とする。このとき

$$
G_k=\{\operatorname{diag}(1,R):R\in SO(3)\},
\qquad \widetilde G_k=SU(2).
$$

> 被覆写像のこの部分群への制限は、核 $\{I_2,-I_2\}$ を持つ $SU(2)$ から $SO(3)$ への二重被覆である。
<!-- formal-statement-end -->

**証明の見取り図。** 四次元側では空間への制限が直交行列になることを示し、二次元側では固定条件がユニタリ条件になることを示します。

<!-- proof-start -->
### 証明

$e_0=(1,0,0,0)$ とします。$\Lambda k=k$ と $m>0$ から $\Lambda e_0=e_0$ です。時間成分0の任意の $v=(0,\boldsymbol v)$ について、計量保存性より

$$
\eta(e_0,\Lambda v)
=\eta(\Lambda e_0,\Lambda v)
=\eta(e_0,v)=0.
$$

左辺は $-(\Lambda v)^0$ なので空間部分が保存されます。第一列は $e_0$、残り三列の時間成分は零だから $\Lambda=\operatorname{diag}(1,R)$ です。

$\Lambda^{\mathsf T}\eta\Lambda=\eta$ にこの形を代入すると $R^{\mathsf T}R=I_3$。さらに $1=\det\Lambda=\det R$ なので $R\in SO(3)$ です。

逆に任意の $R\in SO(3)$ に対し、[SU(2)からSO(3)への二重被覆](../LREP5/index.md#thm-lrep5-double-cover) の全射性から対応する $U\in SU(2)$ を選べます。[共役による三次元作用](../LREP5/index.md#def-lrep5-conjugation-map) と四元ベクトルの合同作用から

$$
UH(x)U^\dagger=x^0 I_2+(R\boldsymbol x)\cdot\boldsymbol\sigma .
$$

よって $\pi(U)=\operatorname{diag}(1,R)\in G$ であり、この変換は $k$ を固定します。

被覆側では [エルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model) により $H(k)=mI_2$ です。[SL(2,C)の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action) と $H$ の単射性から

$$
\pi(A)k=k
\ \Longleftrightarrow\ A(mI_2)A^\dagger=mI_2
\ \Longleftrightarrow\ AA^\dagger=I_2 .
$$

$A\in SL(2,\mathbb C)$ には既に $\det A=1$ が課されているので、最後の条件は $A\in SU(2)$ と同値です。

空間成分への合同作用は [共役による三次元作用](../LREP5/index.md#def-lrep5-conjugation-map) と一致します（$A^\dagger=A^{-1}$）。従って [SU(2)からSO(3)への二重被覆](../LREP5/index.md#thm-lrep5-double-cover) がその制限を与えます。$\square$
<!-- proof-end -->

正質量という仮定は最初の $m$ による除算で使われています。$m=0$ なら $k=0$ はすべての群元で固定されるので、非零の光的運動量を調べるためには別の標準点が必要です。

## 2. 静止運動量から一般運動量へ移す標準boost

各 $p$ に対して $k$ を $p$ へ移す変換を一つ選びます。このような選択は一意ではありません。

例えば先に静止点を回転させてからboostしても同じ $p$ に到達します。ここでは回転を付け加えない選択を、被覆群の正定値エルミート行列で具体的に構成します。

ここで正定値エルミートとは $T^\dagger=T$ かつ任意の非零列ベクトル $v\in\mathbb C^2$ に対して $v^\dagger T v>0$ となることです。[スペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral) で正規直交固有基底を取れば、$v=\sum_a c_a u_a$ に対して $v^\dagger T v=\sum_a\lambda_a|c_a|^2$ なので、エルミート行列の正定値性は全固有値の正値性と同値です。

$S=\boldsymbol q\cdot\boldsymbol\sigma$ とおきます。各Pauli行列はエルミートかつ跡が零で、[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product) により

$$
S^\dagger=S,\qquad S^2=|\boldsymbol q|^2I_2,\qquad \operatorname{tr}S=0.
$$

固有値を $\lambda$ とすれば $\lambda^2=|\boldsymbol q|^2$、二つの固有値の和は零です。従って固有値は $\pm|\boldsymbol q|$（$\boldsymbol q=0$ では両方零）です。同じ固有基底で $H(p)=EI_2+S$ の固有値は $E\pm|\boldsymbol q|>0$ となります。最後の不等式は $E^2-|\boldsymbol q|^2=m^2>0$ と $E>0$ から従います。

静止点を $p$ へ移す正定値エルミート行列 $T$ を探す条件は、合同作用により $mT^2=H(p)$ です。そこで $H(p)$ と同じ固有基底を持つ $I_2$ と $S$ の一次結合で正の平方根を作ります。次の式がその具体形です。

<a id="def-lrep23-standard-boost"></a>

<!-- formal-statement-start -->
> **定義（正質量の標準boost）**
> $m>0$、$p=(E,\boldsymbol q)\in\mathcal O_m$ とする。被覆側の標準boost $b(p)$ と四次元側の標準boost $L(p)$ を

$$
b(p)=\frac{(E+m)I_2+\sum_{i=1}^3 q_i\sigma_i}
{\sqrt{2m(E+m)}},
\qquad L(p)=\pi(b(p))
$$

> で定める。ここで $\sigma_i$ はPauli行列である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep23-standard-boost -->
**定義の確認**。 $m=4$、$p=(5,0,0,3)$ なら $25-9=16=m^2$、$E>0$ です。$\sigma_3=\operatorname{diag}(1,-1)$ を代入すると

$$
b(p)=\frac{1}{\sqrt{72}}\operatorname{diag}(12,6)
=\operatorname{diag}(\sqrt2,1/\sqrt2).
$$

実対角行列なのでエルミートであり、非零の $v=(v_1,v_2)^{\mathsf T}$ について

$$
v^\dagger b(p)v=\sqrt2|v_1|^2+\frac{|v_2|^2}{\sqrt2}>0,\qquad
\det b(p)=\sqrt2\cdot\frac1{\sqrt2}=1.
$$

従って正定値で $SL(2,\mathbb C)$ に属します。合同作用による静止点の像は

$$
b(p)H(k)b(p)^\dagger
=4\operatorname{diag}(2,1/2)
=\operatorname{diag}(8,2)=H(p).
$$

従って $L(p)k=p$ です。$p=k$ の場合は分子が $2mI_2$、分母が $2m$ なので $b(k)=I_2$ となります。
<!-- definition-example-end -->

この例では標準boostがラピディティ $\log 2$ のboostに対応します。一般にも同じ構成が可能で、正定値エルミートという条件が選択を一意にします。

<a id="thm-lrep23-boost-section"></a>

<!-- formal-statement-start -->
> **定理（標準boostの存在と一意性）**
> 各 $p\in\mathcal O_m$、$m>0$ について、[標準boost](#def-lrep23-standard-boost) は $SL(2,\mathbb C)$ の正定値エルミート行列であり、

$$
b(p)H(k)b(p)^\dagger=H(p),
\qquad L(p)k=p
$$

> を満たす。この合同条件を満たす正定値エルミート行列は一意である。写像 $p\mapsto b(p)$ は空間運動量の座標に関して滑らかである。
<!-- formal-statement-end -->

**証明の見取り図。** $S^2=|\boldsymbol q|^2I_2$ と $E^2-|\boldsymbol q|^2=m^2$ を使うと、標準boostの二乗が $H(p)/m$ になります。

<!-- proof-start -->
### 証明

分母は $m>0$ と $E\ge m$ から正です。分子の固有値は $E+m\pm|\boldsymbol q|>0$ であり、$b(p)$ は正定値エルミートです。行列式は固有値の積から

$$
\det b(p)
=\frac{(E+m)^2-|\boldsymbol q|^2}{2m(E+m)}
=\frac{2m^2+2Em}{2m(E+m)}=1 .
$$

また、$S^2=|\boldsymbol q|^2I_2$ を代入すると

$$
mb(p)^2
=\frac{((E+m)^2+|\boldsymbol q|^2)I_2+2(E+m)S}{2(E+m)}.
$$

$|\boldsymbol q|^2=E^2-m^2$ により単位行列の係数の分子は $2E(E+m)$ です。従って $mb(p)^2=EI_2+S=H(p)$ となります。

$b(p)^\dagger=b(p)$、$H(k)=mI_2$ なので合同条件が成立します。[SL(2,C)の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action) は $H(L(p)k)=b(p)H(k)b(p)^\dagger$ を意味するので、右辺は上の計算により $H(p)$ です。単射性により $L(p)k=p$ です。

別の正定値エルミート行列 $T$ が同じ合同条件を満たすなら $T^2=H(p)/m$ です。$T$ は $T^2$ と可換なので $H(p)$ の各固有空間を保存します。

固有値 $\lambda>0$ の空間に制限すると $T^2=(\lambda/m)I$。その空間上でエルミートな $T$ の固有値は正であり、二乗が $\lambda/m$ だからすべて $\sqrt{\lambda/m}$ です。従って各固有空間上の $T$ はその定数倍の恒等作用となり、一意に決まります。

$E=\sqrt{m^2+|\boldsymbol q|^2}$ は全 $\mathbb R^3$ で滑らかで、分母も零にならないので $b(p)$ は滑らかです。$\square$
<!-- proof-end -->

$\boldsymbol q\ne0$ なら $\boldsymbol n=\boldsymbol q/|\boldsymbol q|$ とし、$\cosh\chi=E/m$、$\sinh\chi=|\boldsymbol q|/m$ となる $\chi\ge0$ を選びます。双曲線関数の半角公式に代入すると

$$
\cosh(\chi/2)=\sqrt{\frac{E+m}{2m}},
\qquad \sinh(\chi/2)=\frac{|\boldsymbol q|}{\sqrt{2m(E+m)}}.
$$

よって $b(p)=\cosh(\chi/2)I_2+\sinh(\chi/2)\boldsymbol n\cdot\boldsymbol\sigma$ です。$\boldsymbol n\cdot\boldsymbol\sigma$ の二乗が $I_2$ なので指数級数の偶数次と奇数次を分けると、これは $\exp(\chi\boldsymbol n\cdot\boldsymbol\sigma/2)$ に等しくなります。

実際、$H(x)=x^0I_2+x_\parallel N+X_\perp$（$N=\boldsymbol n\cdot\boldsymbol\sigma$、$x_\parallel=\boldsymbol n\cdot\boldsymbol x$、$X_\perp=(\boldsymbol x-x_\parallel\boldsymbol n)\cdot\boldsymbol\sigma$）と分解すれば、[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product) より $NX_\perp+X_\perp N=0$。$N^2=I_2$ なので $NX_\perp N=-X_\perp$ です。ここだけ $b=b(p)=aI_2+dN$、$a=\cosh(\chi/2)$、$d=\sinh(\chi/2)$ と略記すると

$$
bX_\perp b=a^2X_\perp+ad(NX_\perp+X_\perp N)+d^2NX_\perp N
=(a^2-d^2)X_\perp=X_\perp.
$$

また $bI_2b=(a^2+d^2)I_2+2adN$、$bNb=2adI_2+(a^2+d^2)N$ なので、

$$
bI_2b=\cosh\chi I_2+\sinh\chi N,\qquad
bNb=\sinh\chi I_2+\cosh\chi N .
$$

従って時間・平行成分はラピディティ $\chi$ のboost、垂直成分は不変です。$\boldsymbol q=0$ では軸を選ぶ必要はなく $L(k)=I_4$ です。

## 3. 動いている系の回転を静止系へ戻す

変換 $\Lambda$ を運動量 $p$ へ作用させると $\Lambda p$ になります。静止点から $p$ へ移し、$\Lambda$ を掛け、最後に新しい静止系へ戻すと、出発点と到着点はともに $k$ です。この三段階の積は静止系の回転になるはずです。[未来円錐のLorentz軌道](../LREP22/index.md#thm-lrep22-orbits) により変換後の運動量も $\mathcal O_m$ に属し、[標準boostの存在と一意性](#thm-lrep23-boost-section) により各boostは可逆です。従って次の積は定義できます。本講の $W(\Lambda,p)$ は変換の積であり、前講のPauli–Lubanskiベクトル $W^\mu$ とは別の対象です。

<a id="def-lrep23-wigner-rotation"></a>

<!-- formal-statement-start -->
> **定義（正質量のWigner回転）**
> $m>0$、$p\in\mathcal O_m$、$\Lambda\in G$、$A\in SL(2,\mathbb C)$ とする。標準boostを用いて

$$
W(\Lambda,p)=L(\Lambda p)^{-1}\Lambda L(p),
$$

$$
w(A,p)=b(\pi(A)p)^{-1}A b(p)
$$

> と定める。前者は $G$ の元、後者は $SL(2,\mathbb C)$ の元であり、後者を被覆群におけるWigner回転という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep23-wigner-rotation -->
**定義の確認**。 $p=k$ とし、$A=\operatorname{diag}(e^{-i\theta/2},e^{i\theta/2})$ を選びます。この $A$ は行列式1かつ $AA^\dagger=I_2$ なので [正質量の静止安定化群](#thm-lrep23-rest-group) により静止点を固定します。

[標準boost](#def-lrep23-standard-boost) では $b(k)=I_2$ なので $w(A,k)=I_2^{-1}AI_2=A$ です。[軸角表示と三次元回転](../LREP5/index.md#prop-lrep5-rodrigues) によれば $\pi(A)=\operatorname{diag}(1,R_z(\theta))$ です。$L(k)=I_4$ だから四次元側でも $W(\pi(A),k)=\pi(A)$ となります。どちらも静止点を固定し、前者は $SU(2)$、後者は回転部分群の元です。

また $p=k$、$A=b(p')$（任意の $p'\in\mathcal O_m$）なら $\pi(A)k=p'$。この場合 $w(A,k)=b(p')^{-1}b(p')=I_2$ です。運動量を変える変換そのものと、静止系に戻した回転は同じではありません。
<!-- definition-example-end -->

次の性質は、変換を二回行うとき内部状態をどの順序で変換するかを決めます。積の右側の回転には元の運動量、左側の回転には一回変換した運動量が入ります。この運動量依存の合成関係をcocycle（コサイクル）条件といいます。

<a id="thm-lrep23-wigner-cocycle"></a>

<!-- formal-statement-start -->
> **定理（正質量のWigner回転の合成則）**
> $m>0$、$p\in\mathcal O_m$、$A,A_1,A_2\in SL(2,\mathbb C)$ とする。[正質量のWigner回転](#def-lrep23-wigner-rotation) は $w(A,p)\in SU(2)$ を満たし、

$$
\pi(w(A,p))=W(\pi(A),p),
$$

$$
w(A_2A_1,p)=w(A_2,\pi(A_1)p)w(A_1,p).
$$

> 特に $w(I_2,p)=I_2$ である。四次元側でも

$$
W(\Lambda_2\Lambda_1,p)
=W(\Lambda_2,\Lambda_1p)W(\Lambda_1,p)
$$

> が任意の $\Lambda_1,\Lambda_2\in G$ に対して成立する。
<!-- formal-statement-end -->

**証明の見取り図。** $\pi(A)p$ から静止点への逆boostで元の静止点へ戻ります。合成については中間運動量のboostとその逆を挿入します。

<!-- proof-start -->
### 証明

$q=\pi(A)p$ とおきます。[未来円錐のLorentz軌道](../LREP22/index.md#thm-lrep22-orbits) により $q\in\mathcal O_m$ です。[標準boostの存在と一意性](#thm-lrep23-boost-section) より

$$
\pi(w(A,p))k
=L(q)^{-1}\pi(A)L(p)k
=L(q)^{-1}q=k .
$$

$w(A,p)$ は行列式1の行列の積なので $SL(2,\mathbb C)$ の元です。[正質量の静止安定化群](#thm-lrep23-rest-group) から $SU(2)$ に属します。また $\pi$ の準同型性により $\pi(w(A,p))=W(\pi(A),p)$ です。

$p_1=\pi(A_1)p$、$p_2=\pi(A_2)p_1$ と置きます。[正質量のWigner回転](#def-lrep23-wigner-rotation) において中間点の $b(p_1)b(p_1)^{-1}=I_2$ を挿入すると

$$
\begin{aligned}
w(A_2A_1,p)
&=b(p_2)^{-1}A_2A_1b(p)\\
&=b(p_2)^{-1}A_2b(p_1)
  b(p_1)^{-1}A_1b(p)\\
&=w(A_2,p_1)w(A_1,p).
\end{aligned}
$$

恒等元では $b(p)^{-1}b(p)=I_2$ です。任意の $\Lambda_1,\Lambda_2$ に対し二重被覆の全射性から持ち上げ $A_1,A_2$ を選び、今の等式に $\pi$ を作用させれば四次元側の等式も得られます。$\square$
<!-- proof-end -->

ここで $w(-A,p)=-w(A,p)$ です。四次元側では同じ $\Lambda$ に対応する二つの持ち上げが、被覆側で異なる内部作用を与え得ます。

<a id="prop-lrep23-section-change"></a>

<!-- formal-statement-start -->
> **命題（標準boostの選択変更）**
> $m>0$ とする。すべての $p\in\mathcal O_m$ に対し $\pi(b'(p))k=p$ を満たす $b'(p)\in SL(2,\mathbb C)$ を別に選ぶと、一意な $r(p)\in SU(2)$ が存在して

$$
b'(p)=b(p)r(p).
$$

> この選択で計算したWigner回転 $w'$ は、任意の $A\in SL(2,\mathbb C)$ と $p\in\mathcal O_m$ について

$$
w'(A,p)=r(\pi(A)p)^{-1}w(A,p)r(p)
$$

> を満たす。
<!-- formal-statement-end -->

**証明の見取り図。** 二つの変換を比較すると静止点を固定する変換が残ります。それを新旧のWigner回転の式に代入します。

<!-- proof-start -->
### 証明

$r(p)=b(p)^{-1}b'(p)$ とおくと $\pi(r(p))k=L(p)^{-1}p=k$ です。[正質量の静止安定化群](#thm-lrep23-rest-group) により $r(p)\in SU(2)$。$b(p)$ は可逆だから一意です。$q=\pi(A)p$ とおけば

$$
\begin{aligned}
w'(A,p)
&=(b(q)r(q))^{-1}A b(p)r(p)\\
&=r(q)^{-1}b(q)^{-1}A b(p)r(p)\\
&=r(q)^{-1}w(A,p)r(p).
\end{aligned}
$$

逆に任意の $r(p)\in SU(2)$ を右から掛けても、$r(p)$ は静止点を固定するので $b'(p)$ は $k$ を $p$ へ送ります。$\square$
<!-- proof-end -->

これはスピンの基底を運動量ごとに変更したことに対応します。なお $p$ 自身を固定する群も $b(p)$ を用いれば静止固定群に移せます。

[正質量の静止安定化群](#thm-lrep23-rest-group) から $A\in\widetilde G_p$ であることは $b(p)^{-1}Ab(p)\in SU(2)$ と同値です。従って $\widetilde G_p=b(p)SU(2)b(p)^{-1}$ です。

## 4. スピンの内部自由度

運動量 $p$ の指定と、固定群が作用する内部ベクトルの指定は別です。静止点で選んだ内部空間に $SU(2)$ の有限次元既約ユニタリ表現を入れれば、Wigner回転にその表現を適用して、異なる運動量の内部空間を比較できます。

具体的には有限次元複素内積空間 $V$ 上の [線形表現](../LREP1/index.md#def-lrep1-linear-representation) $D:SU(2)\to U(V)$ を選びます。$U(V)$ は内積を保つ線形同型の群です。ここで [既約](../LREP1/index.md#def-lrep1-irreducible) とは零空間と $V$ 以外の不変部分空間を持たないことです。群の作用が滑らかであるものを扱い、通常の回転群への [降下](../LREP3/index.md#def-lrep3-descent) は二つの持ち上げが同じ線形作用を与えることを意味します。

<a id="prop-lrep23-spin-multiplicity"></a>

<!-- formal-statement-start -->
> **命題（正質量の既約内部スピン空間）**
> $m>0$ とし、静止点の被覆固定群 $\widetilde G_k$ の非零有限次元滑らかな既約ユニタリ表現 $D$ を選ぶ。このとき一意な

$$
j\in\{0,1/2,1,3/2,\ldots\}
$$

> に対して内部空間の複素次元は $2j+1$ である。中心元 $-I_2$ の作用は $(-1)^{2j}I$ であり、通常の $SO(3)$ 表現へ降りるのは $j$ が整数のときに限る。
>
> 任意の $A\in SL(2,\mathbb C)$、$p\in\mathcal O_m$ に対し、$D$ を用いた内部変換 $D(w(A,p))$ はユニタリであり、Wigner回転と同じ合成則を満たす。
<!-- formal-statement-end -->

**証明の見取り図。** 固定群を $SU(2)$ と同定したので、既に学んだ有限次元表現の分類がそのまま使えます。合成則は群表現の準同型性から移ります。

<!-- proof-start -->
### 証明

[正質量の静止安定化群](#thm-lrep23-rest-group) から $D$ は $SU(2)$ の表現です。[群表現と微分表現の既約性・同値性](../LREP6/index.md#prop-lrep6-group-lie-equivalence) により一意な整数 $n\ge0$ に対して $D_n$ と同値です。

[多項式模型の既約性と群への積分](../LREP6/index.md#thm-lrep6-polynomial-model) で空間次元は $n+1$。$j=n/2$ と置くと $2j+1$ です。

[回転群への降下と次元の偶奇](../LREP6/index.md#thm-lrep6-descent) により $D_n(-I_2)=(-1)^nI$ で、降下の必要十分条件は $n$ が偶数です。同値な表現でも定数倍の恒等作用は変わらないため、同じ結論が成り立ちます。

[正質量のWigner回転の合成則](#thm-lrep23-wigner-cocycle) によれば $w(A,p)\in SU(2)$ です。$D$ がユニタリ表現なので $D(w(A,p))$ は内積を保存し、$D(UV)=D(U)D(V)$ を合成則の両辺に適用すると

$$
D(w(A_2A_1,p))
=D(w(A_2,\pi(A_1)p))D(w(A_1,p))
$$

となります。$\square$
<!-- proof-end -->

例えば $j=0$ は一成分、$j=1/2$ は二成分、$j=1$ は三成分です。

磁気量子数（LREP7では $m$ と書いた $J_3$ の固有値で、本講の質量 $m$ とは別です）は [有限次元スピンの量子化と昇降公式](../LREP7/index.md#thm-lrep7-spin-spectrum) により $-j,-j+1,\ldots,j$ の $2j+1$ 個です。

前講で仮定した滑らかな内部空間・共変作用を持つユニタリ粒子表現にこの内部表現を用いる場合、[正質量の静止系スピン不変量](../LREP22/index.md#prop-lrep22-rest-spin) に現れる $s$ をこの $j$ とすれば、対応する値は $m^2j(j+1)$ となります。

ここで数えているのは選んだ既約内部空間の次元であって、連続的な運動量も含めた1粒子Hilbert空間の次元ではありません。後者は次々講で波束を使って構成します。

## 5. 演習

### Level A

<a id="ex-lrep23-a01"></a>

#### LREP23-A01 静止固定群の判定
- Level: A
- ID: LREP23-A01

$m>0$ とする。$A=\operatorname{diag}(i,-i)$ と $B=\operatorname{diag}(2,1/2)$ はともに $SL(2,\mathbb C)$ の元である。それぞれが静止運動量 $k$ を固定するか調べよ。

<!-- solution-start -->
**詳細解答。** [運動量のlittle group](#def-lrep23-little-group) の固定条件を $H(k)=mI_2$ に適用する。両行列の行列式は $i(-i)=1$ と $2/2=1$ である。

$$
AA^\dagger=I_2,\qquad BB^\dagger=\operatorname{diag}(4,1/4).
$$

従って $A H(k) A^\dagger=mI_2$、$B H(k) B^\dagger=m\operatorname{diag}(4,1/4)\ne mI_2$。$A$ のみが固定群に属する。後者について [エルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model) の対角成分を比較すると $x^0+x^3=4m$、$x^0-x^3=m/4$ なので $x^0=17m/8$、$x^3=15m/8$ となり、静止していない。
<!-- solution-end -->

<a id="ex-lrep23-a02"></a>

#### LREP23-A02 標準boostの計算
- Level: A
- ID: LREP23-A02

$m=3$、$p=(5,4,0,0)$ について $b(p)$ とその逆を求め、$k$ を $p$ へ移すことを確認せよ。

<!-- solution-start -->
**詳細解答。** $25-16=9$、$E>0$ なので未来質量殻に属する。[標準boost](#def-lrep23-standard-boost) で $E+m=8$、分母 $\sqrt{2\cdot3\cdot8}=4\sqrt3$、$S=4\sigma_1$ を代入すると

$$
b(p)=\frac{2I_2+\sigma_1}{\sqrt3},
\qquad b(p)^{-1}=\frac{2I_2-\sigma_1}{\sqrt3}.
$$

積は $(4I_2-\sigma_1^2)/3=I_2$。$b(p)$ の固有値は $3/\sqrt3,1/\sqrt3$ で正、積は1である。二乗を展開すれば

$$
3b(p)^2=5I_2+4\sigma_1=H(p).
$$

$b(p)$ はエルミートなので合同作用で $k$ を $p$ へ移す。
<!-- solution-end -->

<a id="ex-lrep23-a03"></a>

#### LREP23-A03 同一直線上の二つのboost
- Level: A
- ID: LREP23-A03

$A_\chi=\operatorname{diag}(e^{\chi/2},e^{-\chi/2})$ とし、$p=\pi(A_\alpha)k$ とする。$w(A_\beta,p)$ を任意の実数 $\alpha,\beta$ に対して求めよ。

<!-- solution-start -->
**詳細解答。** $A_\alpha$ は正定値エルミートで行列式1だから [標準boostの存在と一意性](#thm-lrep23-boost-section) により $b(p)=A_\alpha$。

対角成分の積から $A_\beta A_\alpha=A_{\alpha+\beta}$ であり、$\pi(A_\beta)p=\pi(A_{\alpha+\beta})k$。同じ一意性により $b(\pi(A_\beta)p)=A_{\alpha+\beta}$ となる。[正質量のWigner回転](#def-lrep23-wigner-rotation) は

$$
w(A_\beta,p)=A_{\alpha+\beta}^{-1}A_\beta A_\alpha=I_2.
$$

同一直線方向のboostだけではこの選択のWigner回転は生じない。
<!-- solution-end -->

<a id="ex-lrep23-a04"></a>

#### LREP23-A04 内部自由度と被覆
- Level: A
- ID: LREP23-A04

$j=0,1/2,3/2,2$ の内部空間の次元、$-I_2$ の作用、$SO(3)$ への降下の可否を求めよ。

<!-- solution-start -->
**詳細解答。** [正質量の既約内部スピン空間](#prop-lrep23-spin-multiplicity) において $n=2j$ だから次元は $n+1$、中心作用は $(-1)^nI$ である。

| $j$ | $n$ | 次元 | 中心作用 | 降下 |
| --- | --- | --- | --- | --- |
| $0$ | $0$ | $1$ | $+I$ | 可 |
| $1/2$ | $1$ | $2$ | $-I$ | 不可 |
| $3/2$ | $3$ | $4$ | $-I$ | 不可 |
| $2$ | $4$ | $5$ | $+I$ | 可 |

$SO(3)$ の恒等元へ写る $-I_2$ が恒等作用にならない場合、持ち上げの選択によって作用が変わってしまうため降下できない。
<!-- solution-end -->

### Level B

<a id="ex-lrep23-b01"></a>

#### LREP23-B01 空間回転に対するWigner回転
- Level: B
- ID: LREP23-B01

$U\in SU(2)$、$R$ を対応する空間回転とする。任意の正質量運動量 $p=(E,\boldsymbol q)$ について $w(U,p)=U$ を証明せよ。

<!-- solution-start -->
**詳細解答。** [共役による三次元作用](../LREP5/index.md#def-lrep5-conjugation-map) により

$$
U(\boldsymbol q\cdot\boldsymbol\sigma)U^{-1}
=(R\boldsymbol q)\cdot\boldsymbol\sigma.
$$

回転は $E$ と $|\boldsymbol q|$ を保つため、[標準boost](#def-lrep23-standard-boost) の分母は同じであり

$$
b(\pi(U)p)=U b(p)U^{-1}.
$$

この式を [正質量のWigner回転](#def-lrep23-wigner-rotation) に代入する。

$$
w(U,p)=U b(p)^{-1}U^{-1}U b(p)=U.
$$

この結論は正定値エルミートな標準boostを用いたことに依存する。
<!-- solution-end -->

<a id="ex-lrep23-b02"></a>

#### LREP23-B02 移動中の固定群
- Level: B
- ID: LREP23-B02

$p=(5,0,0,3)$、$m=4$ とする。$U=i\sigma_1$ を用いて $A=b(p)Ub(p)^{-1}$ を計算し、$A$ が $p$ を固定するが一般の静止系回転ではないことを確認せよ。

<!-- solution-start -->
**詳細解答。** $U=i\sigma_1$ は $U^\dagger U=I_2$、$\det U=i^2\det\sigma_1=(-1)(-1)=1$ なので $SU(2)$ に属する。[標準boost](#def-lrep23-standard-boost) に $E=5,m=4,q_3=3$ を代入すると $b(p)=\operatorname{diag}(\sqrt2,1/\sqrt2)$ である。

$$
A=\begin{pmatrix}0&2i\\i/2&0\end{pmatrix}.
$$

行列式は $-(2i)(i/2)=1$ である。$H(p)=\operatorname{diag}(8,2)$ に合同作用させると

$$
AH(p)=\begin{pmatrix}0&4i\\4i&0\end{pmatrix},
\qquad AH(p)A^\dagger=\operatorname{diag}(8,2)=H(p).
$$

従って $\pi(A)p=p$。しかし $AA^\dagger=\operatorname{diag}(4,1/4)\ne I_2$ なので [正質量の静止安定化群](#thm-lrep23-rest-group) には属さない。[正質量のWigner回転](#def-lrep23-wigner-rotation) は $w(A,p)=b(p)^{-1}Ab(p)=U$ となる。
<!-- solution-end -->

<a id="ex-lrep23-b03"></a>

#### LREP23-B03 逆変換と基底変更
- Level: B
- ID: LREP23-B03

$m>0$、$p\in\mathcal O_m$、$A\in SL(2,\mathbb C)$ とし、$q=\pi(A)p$ とする。$w(A^{-1},q)=w(A,p)^{-1}$ を導け。また別の選択 $b'(p)=b(p)r(p)$ の下でもこの関係が成立することを確かめよ。

<!-- solution-start -->
**詳細解答。** [正質量のWigner回転の合成則](#thm-lrep23-wigner-cocycle) で $A_1=A,A_2=A^{-1}$ とすると

$$
I_2=w(I_2,p)=w(A^{-1},q)w(A,p).
$$

右から $w(A,p)^{-1}$ を掛ければ主張を得る。[標準boostの選択変更](#prop-lrep23-section-change) により

$$
w'(A^{-1},q)=r(p)^{-1}w(A^{-1},q)r(q).
$$

また

$$
w'(A,p)^{-1}
=(r(q)^{-1}w(A,p)r(p))^{-1}
=r(p)^{-1}w(A,p)^{-1}r(q).
$$

元の逆変換関係により両者は等しい。中間点の $r(q)$ とその逆が消えるため、基底の選択を変更しても変換の整合性が保たれる。
<!-- solution-end -->

### Level C

<a id="ex-lrep23-c01"></a>

#### LREP23-C01 非平行boostによる回転
- Level: C
- ID: LREP23-C01

$m>0$ とし、$X=(2I_2+\sigma_1)/\sqrt3$、$Z=(2I_2+\sigma_3)/\sqrt3$ をこの順序で静止運動量に作用させる。

1. $p=\pi(X)k$ と $q=\pi(Z)p$ を求めよ。
2. $ZX=b(q)w(Z,p)$ と分解し、Wigner回転を具体的に計算せよ。
3. スピン $1/2$ の内部空間で初期ベクトル $(1,0)^{\mathsf T}$ がどのように変換されるか求めよ。ノルムを確認せよ。

<!-- solution-start -->
**詳細解答。** $X,Z$ の固有値は共に $\sqrt3,1/\sqrt3$ なので正定値エルミートかつ行列式1である。最初のboostでは

$$
mX^2=\frac m3(5I_2+4\sigma_1)
$$

だから $p=m(5/3,4/3,0,0)$。[標準boostの存在と一意性](#thm-lrep23-boost-section) から $X=b(p)$ である。

次の $Z$ は $z$ 方向のboostである。第2節の半角表示で $\cosh(\chi/2)=2/\sqrt3$、$\sinh(\chi/2)=1/\sqrt3$ なので、$\cosh\chi=5/3$、$\sinh\chi=4/3$ となる。時間成分と第三成分への作用を具体的に計算すると

$$
q^0=\frac53p^0+\frac43p^3=\frac{25m}{9},
\qquad q^3=\frac43p^0+\frac53p^3=\frac{20m}{9}.
$$

垂直な第一・第二成分は保存されるので

$$
q=m(25/9,4/3,0,20/9).
$$

実際 $(25/9)^2-(4/3)^2-(20/9)^2=(625-144-400)/81=1$、時間成分は正である。

[標準boost](#def-lrep23-standard-boost) で $E+m=34m/9$、分母 $\sqrt{2m(E+m)}=2m\sqrt{17}/3$ を用いると

$$
b(q)=\frac{17I_2+6\sigma_1+10\sigma_3}{3\sqrt{17}}.
$$

[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product) の $\sigma_3\sigma_1=i\sigma_2$ により

$$
ZX=\frac{4I_2+2\sigma_1+2\sigma_3+i\sigma_2}{3}.
$$

ここで $V=(4I_2+i\sigma_2)/\sqrt{17}$ と置く。$V V^\dagger=(16I_2+\sigma_2^2)/17=I_2$ で、固有値 $(4\pm i)/\sqrt{17}$ の積は1なので $V\in SU(2)$ である。積を展開して

$$
\begin{aligned}
ZXV^\dagger
&=\frac{(4I_2+i\sigma_2)(4I_2-i\sigma_2)
 +(2\sigma_1+2\sigma_3)(4I_2-i\sigma_2)}
 {3\sqrt{17}}\\
&=\frac{17I_2+6\sigma_1+10\sigma_3}{3\sqrt{17}}
=b(q).
\end{aligned}
$$

二行目では $\sigma_1\sigma_2=i\sigma_3$、$\sigma_3\sigma_2=-i\sigma_1$ を使った。従って $ZX=b(q)V$ で、[正質量のWigner回転](#def-lrep23-wigner-rotation) により

$$
w(Z,p)=V=\frac1{\sqrt{17}}\begin{pmatrix}4&1\\-1&4\end{pmatrix}.
$$

最初のWigner回転は $w(X,k)=I_2$ だから [正質量のWigner回転の合成則](#thm-lrep23-wigner-cocycle) でも $w(ZX,k)=V$ となる。$V=\exp(-i\theta\sigma_2/2)$ と比べると $\cos(\theta/2)=4/\sqrt{17}$、$\sin(\theta/2)=-1/\sqrt{17}$ であり、回転角の一つの選択は $\theta=-2\arctan(1/4)$ である。

[角運動量演算子と昇降演算子](../LREP7/index.md#def-lrep7-angular-momentum) の二次元標準表現では $D(U)=U$。従って

$$
V\begin{pmatrix}1\\0\end{pmatrix}
=\frac1{\sqrt{17}}\begin{pmatrix}4\\-1\end{pmatrix},
\qquad \frac{16+1}{17}=1.
$$

非平行boostの積は静止系へ戻しても内部回転が残る。同一直線方向のboost（A03）と異なる点である。
<!-- solution-end -->

## 6. まとめ

正質量の静止点を固定する群は空間回転、その被覆は $SU(2)$ です。正定値エルミートな標準boostで一般の運動量へ移し、Wigner回転によって内部空間の変換を合成できます。既約内部空間はスピン $j$ に対して $2j+1$ 次元です。

次講では非零光的運動量を固定する群を調べます。静止点が存在しないため、今回とは異なる内部対称性が現れます。
