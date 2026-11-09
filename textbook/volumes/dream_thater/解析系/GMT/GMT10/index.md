# GMT10 近似微分と幾何的Jacobian

<!-- definition-example-audit: strict -->

[GMT9のRademacher定理](../GMT9/index.md#thm-gmt9-rademacher)は、Lipschitz写像がLebesgue測度に関してほとんど至る所で線形写像に近づくことを保証しました。しかし「点に近づく**すべての**方向で近似する」ことと、「ごく薄い例外を除いた**大部分**の点で近似する」ことは別です。また、微分行列の成分だけでは、曲線や曲面の面積が何倍になるかを直ちには読めません。

そこで二つの道具を作ります。

1. **大部分の点で成り立つ一次近似**：微小球で割合が0へ落ちる例外を許す。
2. **幾何的Jacobian**：微分の列ベクトルが張る$m$次元平行多面体の体積倍率。

第11講では、この点ごとの倍率を積分して像の測度と重複回数を結びます。ここではその前段として、例外を許した線形近似の意味・一意性と、線形写像についての倍率を完全に検証します。

以下、$1\le m\le d$、$\Omega\subset\mathbb R^m$ は開集合、$f:\Omega\to\mathbb R^d$ とします。$|v|$ はEuclidノルム、$B(x,r)$ は開球、$\mathcal L^m$ は$\mathbb R^m$上の$m$次元Lebesgue測度です。特記しない **a.e.は定義域の$\mathcal L^m$について**であり、像に載る$\mathcal H^m$についてではありません。

## 1. 「ほとんどの方向」だけなら一次近似できるか

最初に集合の「薄さ」を一つの球で測ります。可測集合$E\subset\mathbb R^m$について、点$a$の近くで$E$が占める球の割合

$$
\vartheta(E,a;r)=
\frac{\mathcal L^m(E\cap B(a,r))}
{\mathcal L^m(B(a,r))}
$$

を考えます。$\vartheta(E,a;r)\to0$なら、$E$は$a$で**密度0**、補集合は**密度1**です。これは球のLebesgue測度で定義した割合で、$E$自体が空になるという意味ではありません。[Lebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)を指示関数に適用すると、可測集合のほとんどすべての点が密度1の点になります。

例えば$\mathbb R^2$の直線$E=\{(x,y):y=0\}$は、どの球との交わりも$\mathcal L^2$が0なので、直線上の点でも密度0です。一方、半平面$\{x>0\}$は原点で各小球の半分を占め、密度0ではありません。この違いを使って線形近似を判定します。

すでに学んだ[Fréchet微分](../../F0/F0-02C3/index.md#def-f0-02c3-frechet-derivative)は、ある線形写像$A:\mathbb R^m\to\mathbb R^d$について

$$
\frac{|f(a+h)-f(a)-Ah|}{|h|}
\longrightarrow0\qquad(h\to0,\ h\ne0)
$$

を要求します。次に定義する緩い近似では、この誤差が固定した閾値を超える点の**相対的な球体積**が0へ向かうことだけを要求します。

<a id="def-gmt10-approximate-differential"></a>

<!-- formal-statement-start -->
> **定義（近似微分）**  
> $\Omega\subset\mathbb R^m$を開集合、$f:\Omega\to\mathbb R^d$は各成分がLebesgue可測とし、$a\in\Omega$とする。線形写像$A:\mathbb R^m\to\mathbb R^d$が、すべての$\varepsilon>0$に対して

$$
\lim_{r\downarrow0}\frac{1}{\mathcal L^m(B(a,r))}
\mathcal L^m\left\{
x\in B(a,r):
|f(x)-f(a)-A(x-a)|>\varepsilon|x-a|
\right\}=0
$$

> を満たすとき、$f$は$a$で**近似微分可能**であり、$A$を近似微分、$\operatorname{ap}Df(a)=A$と書く。十分小さい$r$で$B(a,r)\subset\Omega$とし、$x=a$は不等式に寄与しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt10-approximate-differential -->
### 直接例：滑らかな関数では条件をどう確認するか

**定義の確認**：一次近似の残差がどの球でも閾値を超えないことを、具体式から確認します。

$f(x,y)=(x,y,x^2+y^2)$、$a=(u,v)$とします。差を実際に展開すると

$$
f(a+h)-f(a)
=
\begin{pmatrix}h_1\\h_2\\2uh_1+2vh_2\end{pmatrix}
+
\begin{pmatrix}0\\0\\h_1^2+h_2^2\end{pmatrix}.
$$

第1項を$Ah$と置けば$A$は線形で、残差のノルムは$|h|^2$です。$0<|h|<\varepsilon$なら$|h|^2<\varepsilon|h|$なので、定義の「悪い点の集合」は十分小さい球で空になります。従って$\operatorname{ap}Df(a)=A$です。通常微分が存在すれば、悪い集合が「割合0」より強く最終的に空になるのです。
<!-- definition-example-end -->

### 例：通常微分はないのに近似微分はある

$k\ge2$に対し

$$
I_k=(2^{-k}-2^{-3k},\,2^{-k}+2^{-3k}),
\qquad E=\bigcup_{k=2}^{\infty}I_k
$$

とし、$f:\mathbb R\to\mathbb R$を$f(x)=x$（$x\in E$）、それ以外では$f(x)=0$とします。$f(0)=0$です。$2^{-(N+1)}<r\le2^{-N}$（$N\ge2$）なら、$(-r,r)$と交わり得る$I_k$は$k\ge N$だけなので

$$
\begin{aligned}
\mathcal L^1(E\cap(-r,r))
&\le\sum_{k=N}^{\infty}2^{1-3k}
=\frac{2^{1-3N}}{1-2^{-3}},\\
\frac{\mathcal L^1(E\cap(-r,r))}{2r}
&\le\frac{2^{1-3N}}{(1-2^{-3})\,2^{-N}}
=\frac{2^{1-2N}}{1-2^{-3}}
\longrightarrow0.
\end{aligned}
$$

候補$A=0$に対して$|f(x)-f(0)-Ax|\le|x|$であり、$\varepsilon\in(0,1)$の悪い集合は$E$に含まれます。よって$\operatorname{ap}Df(0)=0$です。しかし$x_k=2^{-k}\in E$で$f(x_k)/x_k=1$、一方$-2^{-k}\notin E$で$f(-2^{-k})/(-2^{-k})=0$です。通常の微分は存在しません。

なおこの$f$は区間端点で跳びます。**零密度の例外を認めること**が通常微分との違いであり、Lipschitz写像なら後述のようにこの差は消えます。

## 2. 近似微分は本当に一つに決まるか

二つの異なる行列が「大部分」で同じ近似をするように見えるかもしれません。ところが、零でない線形写像はある方向の近くの**正の割合の錐**で大きさを保ちます。錐は各小球でも一定の割合を占めるため、密度0の例外へ押し込めません。

<a id="lem-gmt10-approximate-unique"></a>

<!-- formal-statement-start -->
> **補題（近似微分の一意性）**  
> 各成分がLebesgue可測な$f:\Omega\subset\mathbb R^m\to\mathbb R^d$が$a\in\Omega$で近似微分可能なら、[近似微分の定義](#def-gmt10-approximate-differential)を満たす線形写像$A$は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

$A,B$が候補なら$C=A-B$です。二つの誤差が同時に小さい点では$|Ch|$も小さい。一方、$C\ne0$なら$|Ch|/|h|$が正に離れる方向の集合は球の一定割合を占めます。

<!-- proof-start -->
### 証明

$A,B$の両方が条件を満たすとします。$C=A-B\ne0$なら単位ベクトル$v$を$Cv\ne0$となるよう選べます。$c=|Cv|/4>0$とします。単位球面上の連続関数$u\mapsto|Cu|$は$v$近傍の開集合$U$で$|Cu|>2c$を満たします。錐

$$
K_r=\{h:0<|h|<r,\ h/|h|\in U\}
$$

は相似性により$\mathcal L^m(K_r)/\mathcal L^m(B(0,r))=\alpha>0$（$m=1$では方向の一方）です。

一方、両近似条件を$\varepsilon=c$で適用し、$h=x-a$と置きます。$B(a,r)$内で

$$
|f(a+h)-f(a)-Ah|\le c|h|,
\quad
|f(a+h)-f(a)-Bh|\le c|h|
$$

を同時に満たす点の割合は1へ近づきます。これらの差を取ると

$$
|Ch|\le
|f(a+h)-f(a)-Ah|
+|f(a+h)-f(a)-Bh|
\le2c|h|
$$

となり、$h\in K_r$とは両立しません。従って$K_r$の割合$\alpha$が0へ落ちる必要があり、矛盾です。$A=B$が従います。$\square$
<!-- proof-end -->

### 折り目は零密度の例外ではない

$g(t)=|t|$の原点で、もし近似微分$A(t)=at$が存在したら、正の半直線では誤差率$|1-a|$、負の半直線では$|-1-a|$です。どちらの半直線も小区間の半分を占めます。条件がすべての$\varepsilon>0$で成り立つには$a=1$と$a=-1$を同時に満たす必要があり、不可能です。**折り目を作る二つの半方向は両方とも密度が正**なので、前節の細い区間の例とは違います。

## 3. Lipschitz写像では通常の微分に戻る

局所Lipschitz性があると、仮に一点で一次誤差が大きければ、その周囲の小球でも誤差が大きいままです。大きい誤差を「零密度の針」に集中させられなくなります。

<a id="prop-gmt10-lipschitz-rigidity"></a>

<!-- formal-statement-start -->
> **命題（Lipschitz写像の近似微分と通常微分の同値）**  
> $\Omega\subset\mathbb R^m$を開集合、$f:\Omega\to\mathbb R^d$を局所Lipschitz写像とし、$a\in\Omega$とする。$f$が$a$で近似微分可能であることと、$a$でFréchet微分可能であることは同値であり、そのとき

$$
\operatorname{ap}Df(a)=Df(a).
$$
<!-- formal-statement-end -->

### 証明の見取り図

通常微分から近似微分への向きは定義の比較です。逆向きには「一点で誤差が大きいと、その周囲にも一定割合の誤差が広がる」ことをLipschitz評価で定量化します。[GMT9の平均誤差から全方向への昇格](../GMT9/index.md#lem-gmt9-mean-to-uniform)と同じ幾何ですが、ここでは悪い集合の**密度**を入力にします。

<!-- proof-start -->
### 証明

Fréchet微分$A=Df(a)$があれば、任意の$\varepsilon>0$に対し十分小さい$0<|h|<r$のすべてで残差は$\varepsilon|h|$以下です。従って悪い集合は空、近似微分は$A$で、[一意性](#lem-gmt10-approximate-unique)により他の候補はありません。

逆に$\operatorname{ap}Df(a)=A$とします。$a$の近傍で$|f(x)-f(y)|\le L|x-y|$とし、

$$
R(h)=f(a+h)-f(a)-Ah,\qquad
|R(h)-R(k)|\le K|h-k|,
\quad K=L+\|A\|_{\mathrm{op}}
$$

と置きます。$K=0$なら$R$は定数で$R(0)=0$、従って通常微分可能です。$K>0$とし、通常微分可能でないと仮定します。ある$\eta>0$と$h_j\to0$、$r_j=|h_j|>0$で$|R(h_j)|\ge\eta r_j$です。

$$
\delta=\min\{1/4,\eta/(4K)\}>0
$$

と定めると、$|h-h_j|<\delta r_j$に対し

$$
|R(h)|\ge|R(h_j)|-K\delta r_j
\ge\frac{3\eta}{4}r_j,
\qquad |h|\le(1+\delta)r_j<2r_j.
$$

従ってこの小球全体で$|R(h)|>(\eta/4)|h|$です。しかも$B(h_j,\delta r_j)\subset B(0,2r_j)$であるため、半径$2r_j$の悪い集合の割合は少なくとも

$$
\frac{\mathcal L^m(B(h_j,\delta r_j))}
{\mathcal L^m(B(0,2r_j))}
=\left(\frac{\delta}{2}\right)^m>0
$$

です。これは近似微分の定義を$\varepsilon=\eta/4$で使った密度0の結論に反します。よって$R(h)=o(|h|)$、すなわち$Df(a)=A$です。$\square$
<!-- proof-end -->

この命題は**各点での同値**です。他方、[Rademacherの定理](../GMT9/index.md#thm-gmt9-rademacher)は、局所Lipschitz写像の微分可能点が$\mathcal L^m$-a.e.を占めると保証します。二つを合わせ、近似微分も同じ$\mathcal L^m$-a.e.の点で存在します。対象を勝手に$\mathcal H^m$-a.e.（像上）へ読み替えないでください。

## 4. 面積を測るには列ベクトルの長さだけでは足りない

次に面積倍率を考えます。$A:\mathbb R^m\to\mathbb R^d$は線形写像で、標準基底$e_1,\ldots,e_m$の像を

$$
v_i=Ae_i\in\mathbb R^d\qquad(i=1,\ldots,m)
$$

とします。微小な単位立方体は、辺$v_1,\ldots,v_m$を持つ平行多面体に移ります。$m=2$では、辺の長さだけでなく**なす角**が面積を決めるため、内積を並べた$m\times m$の**Gram行列**

$$
G(A)=(v_i\cdot v_j)_{1\le i,j\le m}=A^{\mathsf T}A
$$

を作ります。これは行列の掛け算の暗記ではなく、任意の$u=\sum_i u_ie_i$に対して

$$
|Au|^2
=\left(\sum_i u_i v_i\right)\cdot
\left(\sum_j u_j v_j\right)
=\sum_{i,j}u_i(v_i\cdot v_j)u_j
=u^{\mathsf T}G(A)u
$$

となり、**線形像の長さと角度を同時に記録する行列**だからです。[行列式の構成と交代性](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant)をこの対称行列へ適用すると、一次独立な列が張る体積の二乗に対応する量が得られます。以下で計算例を示し、線形面積倍率としての意味まで証明します。

<a id="def-gmt10-geometric-jacobian"></a>

<!-- formal-statement-start -->
> **定義（m次元幾何的Jacobian）**  
> $1\le m\le d$、線形写像$A:\mathbb R^m\to\mathbb R^d$を標準正規直交基底で$d\times m$行列とする。このとき$m$次元幾何的Jacobianを

$$
J_m(A)=\sqrt{\det(A^{\mathsf T}A)}
$$

> と定める。$A^{\mathsf T}A$は$m\times m$の対称非負定値行列なので、平方根は非負実数として定義される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt10-geometric-jacobian -->
### 直接例：二本の辺から面積倍率を読む

**定義の確認**：入力の二つの基底を線形写像で送って列を作り、その内積と行列式を確認します。

$A:\mathbb R^2\to\mathbb R^3$を$Ae_1=(2,0,0)^{\mathsf T}$、$Ae_2=(1,3,0)^{\mathsf T}$で定めます。標準基底の像を**列として**並べれば

$$
A=\begin{pmatrix}2&1\\0&3\\0&0\end{pmatrix},
\qquad
A^{\mathsf T}A=
\begin{pmatrix}4&2\\2&10\end{pmatrix}.
$$

ここで対角成分$4,10$は各辺の長さの二乗、非対角成分$2$は二辺の内積です。従って

$$
\det(A^{\mathsf T}A)=4\cdot10-2^2=36,
\qquad J_2(A)=6.
$$

直接にも底辺$v_1$の長さが2、$v_2$の底辺に垂直な成分が$(0,3,0)$で長さ3なので、平行四辺形の面積は$2\cdot3=6$です。この例では二列は独立で、Gram行列が正定値となり行列式は正です。
<!-- definition-example-end -->

<a id="thm-gmt10-gram-invariance"></a>

<!-- formal-statement-start -->
> **定理（Gram行列式と直交不変性）**  
> $1\le m\le d$、$A:\mathbb R^m\to\mathbb R^d$を線形写像とする。このとき次が成り立つ。
>
> 1. $J_m(A)=0$と$\operatorname{rank}A<m$は同値である。
> 2. $U\in O(d)$、$V\in O(m)$なら$J_m(UAV)=J_m(A)$である。
> 3. $A$の特異値を$\sigma_1,\ldots,\sigma_m\ge0$（零も含める）とすると

$$
J_m(A)=\prod_{i=1}^m\sigma_i.
$$

<!-- formal-statement-end -->

### 証明の見取り図

$A^{\mathsf T}A$の二次形式は$|Au|^2$なので、核が一致します。直交変換は内積を保ち、Gram行列を直交共役でしか変えません。最後は[実対称行列の直交対角化](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)と[特異値の定義](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-singular-values-right-vectors)を使います。

<!-- proof-start -->
### 証明

$u^{\mathsf T}A^{\mathsf T}Au=|Au|^2$より$\ker(A^{\mathsf T}A)=\ker A$です。したがって$m$次正方行列$A^{\mathsf T}A$の行列式が0であることは、$\ker A\ne\{0\}$すなわち$\operatorname{rank}A<m$と同値です。

$U^{\mathsf T}U=I_d$、$V^{\mathsf T}V=I_m$なら

$$
(UAV)^{\mathsf T}(UAV)
=V^{\mathsf T}A^{\mathsf T}U^{\mathsf T}UAV
=V^{\mathsf T}(A^{\mathsf T}A)V.
$$

行列式を取ると$\det(V^{\mathsf T})\det(V)=(\det V)^2=1$なので、$J_m(UAV)^2=J_m(A)^2$です。両辺非負だから平方根も一致します。

最後に$G=A^{\mathsf T}A$は対称非負定値なので、[実対称行列の直交対角化](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)により直交行列$V$で

$$
V^{\mathsf T}GV=\operatorname{diag}
(\sigma_1^2,\ldots,\sigma_m^2)
$$

と対角化できます。[特異値の定義](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-singular-values-right-vectors)により$\sigma_i$は対応する非負固有値の平方根であり、行列式を取れば$\det G=\prod_i\sigma_i^2$です。非負平方根から結論を得ます。$\square$
<!-- proof-end -->

$m=d$では$J_m(A)=|\det A|$、$m=1$では$J_1(A)=|Ae_1|$です。$m=2$なら

$$
J_2(A)^2=|v_1|^2|v_2|^2-(v_1\cdot v_2)^2
$$

なので、二列が平行なら面積は0です。**各列がどちらも零でなくてもrank欠損でJacobianが0になる**点を見落とさないでください。

## 5. なぜGram行列式が線形写像の面積倍率なのか

ここでは[MT8で定義したHausdorff測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)を使います。ただしMT8の$\mathcal H^m$は**直径の$m$乗を足す非正規化版**です。$\mathbb R^m$上のLebesgue測度$\mathcal L^m$と同じとは限らないので、まずその比例定数を確認します。

単位立方体$Q=[0,1]^m$について$c_m=\mathcal H^m(Q)$と置きます。次の基本事実を先に証明します。

<a id="lem-gmt10-hausdorff-normalization"></a>

<!-- formal-statement-start -->
> **補題（非正規化Hausdorff測度のEuclid空間上での比例）**  
> $m\ge1$、$\mathcal H^m$を直径による非正規化Hausdorff測度とする。$c_m=\mathcal H^m([0,1]^m)$は$0<c_m<\infty$であり、任意のBorel集合$E\subset\mathbb R^m$について

$$
\mathcal H^m(E)=c_m\,\mathcal L^m(E).
$$

> 特に$c_1=1$である。$\mathbb R^d$の任意の$m$次元線形部分空間上でも、その空間を$\mathbb R^m$と等長に同一視すれば同じ$c_m$が現れる。
<!-- formal-statement-end -->

### 証明の見取り図

直径は平行移動・回転で変わらず、相似比$t$の拡大で$t$倍になります。従ってHausdorff測度は平行移動不変で$t^m$倍に拡大します。立方体を等分して有理寸法の直方体の値を決め、Borel集合へ拡張します。

<!-- proof-start -->
### 証明

一辺$1/q$の立方体$q^m$個で$Q$を覆うと、各直径は$\sqrt m/q$です。これをさらに細分することで

$$
\mathcal H^m(Q)\le m^{m/2}<\infty.
$$

逆に、任意の可算被覆$Q\subset\bigcup_i U_i$で、各非空$U_i$の第$j$座標の値域の長さは$\operatorname{diam}U_i$以下です。従って$U_i$を一辺$\operatorname{diam}U_i$の軸平行箱で覆え、そのLebesgue外測度は高々$(\operatorname{diam}U_i)^m$です。可算劣加法性より

$$
1=\mathcal L^m(Q)\le\sum_i(\operatorname{diam}U_i)^m.
$$

したがって$1\le c_m\le m^{m/2}$です。

被覆を相似写像で移すと、次の斉次性が得られます。

$$
\mathcal H^m(tE)=t^m\mathcal H^m(E).
$$

平行移動でも不変で、Borel集合上での測度性は[MT8のHausdorff測度のBorel可測性](../../MT/MT8/index.md#thm-mt8-metric-outer-borel)に従います。

単位立方体を$q^m$個の小立方体へ分割します（ここで$q$は固定します）。互いの境界は$m$次元Hausdorff零測度です。実際、各$(m-1)$次元面をさらに一辺$1/N$の小箱$O_q(N^{m-1})$個で覆えば、$m$乗の被覆コストは$O_q(N^{-1})\to0$（$N\to\infty$）です。したがって一辺$1/q$の立方体は$c_m/q^m$の測度を持ちます。

平行移動・有限加法性から有理端点の軸平行直方体$R=\prod_i[a_i,b_i]$について

$$
\mathcal H^m(R)=c_m\prod_{i=1}^m(b_i-a_i)
=c_m\mathcal L^m(R).
$$

実端点の場合は内外から有理端点の箱で挟みます。最後に両者はBorel上の局所有限測度で、有限直方体上で一致するため、直方体が生成するBorel $\sigma$-代数上でも一致します（有限直方体に制限して測度の一意性を使い、その可算和を取ります）。$m=1$では[MT8の区間長の計算](../../MT/MT8/index.md#thm-mt8-interval-dimension)より$c_1=1$です。

等長な座標写像はすべての被覆集合の直径を保つので、同じ計算が$m$次元部分空間でも成立します。$\square$
<!-- proof-end -->

<a id="thm-gmt10-linear-area"></a>

<!-- formal-statement-start -->
> **定理（線形写像のm次元面積倍率）**  
> $1\le m\le d$、$A:\mathbb R^m\to\mathbb R^d$を線形写像、$E\subset\mathbb R^m$をBorel集合とする。$J_m(A)$を[幾何的Jacobian](#def-gmt10-geometric-jacobian)、$c_m=\mathcal H^m([0,1]^m)$を[比例定数](#lem-gmt10-hausdorff-normalization)とすると

$$
\mathcal H^m(A(E))
=c_m\,J_m(A)\,\mathcal L^m(E).
$$

> 右辺は$J_m(A)=0$なら$\mathcal L^m(E)=\infty$でも0と解釈する。特に$A$が単射なら

$$
\mathcal H^m(A(E))=J_m(A)\,\mathcal H^m(E).
$$

<!-- formal-statement-end -->

### 証明の見取り図

rank欠損なら像は$m$より低い次元の平面に収まり、$\mathcal H^m$は0です。単射なら、直交基底を選んで$m$次元の部分空間への写像に直し、普通の$m$変数線形変数変換で体積倍率$|\det|=J_m(A)$を計算します。これは**一般のLipschitz写像のarea formulaを使っていない**線形版です。

<!-- proof-start -->
### 証明

$r=\operatorname{rank}A<m$のとき、$A(E)$は$r$次元線形部分空間$V$に含まれます。任意の$M>0$に対して$V\cap B(0,M)$を、一辺$\delta$の$r$次元立方体$O_M(\delta^{-r})$個で覆います。各立方体の直径は$O(\delta)$なので$\mathcal H^m_\delta(V\cap B(0,M))\le C_M\delta^{m-r}\to0$です。$M\to\infty$の可算和により$\mathcal H^m(A(E))=0$です。[Gram行列のrank判定](#thm-gmt10-gram-invariance)から$J_m(A)=0$でもあります。

次にrank $m$とします。$v_i=Ae_i$をGram--Schmidt直交化すると、$V=\operatorname{im}A$に正規直交基底$u_1,\ldots,u_m$が取れます。$U:\mathbb R^m\to V$を$Ue_i=u_i$で定めれば等長写像で、$T=U^{-1}A$は可逆な$m\times m$実行列です。内積保存により

$$
T^{\mathsf T}T
=A^{\mathsf T}U U^{\mathsf T}A
=A^{\mathsf T}A,
$$

ここで$UU^{\mathsf T}$は$V$への直交射影、$A$の列はすべて$V$に属するので$UU^{\mathsf T}A=A$を使いました。従って

$$
|\det T|^2
=\det(T^{\mathsf T}T)
=\det(A^{\mathsf T}A),
\qquad|\det T|=J_m(A).
$$

等長写像$U$はHausdorff測度を変えません。[比例定数の補題](#lem-gmt10-hausdorff-normalization)と$m$次元Lebesgue測度の線形変数変換をBorel集合$T(E)$へ適用し、

$$
\begin{aligned}
\mathcal H^m(A(E))
&=\mathcal H^m(U(T(E)))\\
&=c_m\mathcal L^m(T(E))\\
&=c_m|\det T|\,\mathcal L^m(E)\\
&=c_mJ_m(A)\mathcal L^m(E).
\end{aligned}
$$

これで両場合を示しました。$E$が有界でなくても非負測度の等式として成立します。$\square$
<!-- proof-end -->

**測度の正規化に注意。** $m$次元Lebesgue測度と一致するよう正規化したHausdorff測度を

$$
\widehat{\mathcal H}^{\,m}:=c_m^{-1}\mathcal H^m
$$

と書けば、線形版は$\widehat{\mathcal H}^{\,m}(A(E))=J_m(A)\mathcal L^m(E)$です。例えば$m=1$では$c_1=1$ですが、一般の$m$で$c_m=1$と**無断では置けません**。後に一般の面積公式を書く際も同じ係数の位置を確認します。

## 6. 非線形写像の近似Jacobian

線形写像の倍率を理解したので、近似微分可能な点$a$では、その一次近似を線形写像$A$として[J_m](#def-gmt10-geometric-jacobian)へ代入できます。これが点ごとの面積倍率です。

<a id="def-gmt10-approximate-jacobian"></a>

<!-- formal-statement-start -->
> **定義（写像の近似Jacobian）**  
> $1\le m\le d$、$\Omega\subset\mathbb R^m$を開集合、$f:\Omega\to\mathbb R^d$は各成分がLebesgue可測とする。$f$が$a\in\Omega$で近似微分可能なら、その近似Jacobianを

$$
J_m^{\mathrm{ap}}f(a)
=J_m(\operatorname{ap}Df(a))
=\sqrt{\det\!\left[
(\operatorname{ap}Df(a))^{\mathsf T}
(\operatorname{ap}Df(a))
\right]}
$$

> と定義する。近似微分の存在しない点では、この式は未定義である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt10-approximate-jacobian -->
### 直接例：グラフの接平面

**定義の確認**：近似微分の存在を確かめ、列の内積を取ってJacobianの式へ代入します。

$g(x,y)=ax+by$のグラフを$\mathbb R^3$へ送る写像

$$
F(x,y)=(x,y,g(x,y))
$$

は滑らかなので、任意の点で近似微分は通常微分と同じです。[局所Lipschitz写像での同値](#prop-gmt10-lipschitz-rigidity)も使えます。入力の標準基底を一つずつ動かすと

$$
\operatorname{ap}DF=DF=
\begin{pmatrix}1&0\\0&1\\a&b\end{pmatrix},
\qquad
(DF)^{\mathsf T}DF
=\begin{pmatrix}
1+a^2&ab\\ab&1+b^2
\end{pmatrix}.
$$

このGram行列の対角項は各接ベクトルの長さの二乗、非対角項は内積です。従って

$$
\begin{aligned}
(J_2^{\mathrm{ap}}F)^2
&=(1+a^2)(1+b^2)-a^2b^2\\
&=1+a^2+b^2,\\
J_2^{\mathrm{ap}}F&=\sqrt{1+a^2+b^2}.
\end{aligned}
$$

ここでは$F$の第1・第2座標が$(x,y)$そのものなのでrankは2で、値は正です。$a=b=0$なら水平面で倍率1、傾きが増えれば倍率も増えます。
<!-- definition-example-end -->

<a id="cor-gmt10-ae-jacobian"></a>

<!-- formal-statement-start -->
> **系（Lipschitz写像の近似Jacobianのa.e.存在と評価）**  
> $1\le m\le d$、$\Omega\subset\mathbb R^m$を開集合、$f:\Omega\to\mathbb R^d$を$L$-Lipschitz写像とする。$J_m^{\mathrm{ap}}f$は$\mathcal L^m$-a.e.に定義でき、その集合上で

$$
0\le J_m^{\mathrm{ap}}f(x)\le L^m.
$$

> また微分可能点において$J_m^{\mathrm{ap}}f(x)=J_m(Df(x))$である。
<!-- formal-statement-end -->

### 証明の見取り図

[GMT9のRademacher定理](../GMT9/index.md#thm-gmt9-rademacher)で微分の存在集合を取り、[近似微分との同値](#prop-gmt10-lipschitz-rigidity)で置き換えます。特異値の各値が作用素ノルム以下なので積も$L^m$以下です。

<!-- proof-start -->
### 証明

[Rademacherの微分可能性定理](../GMT9/index.md#thm-gmt9-rademacher)より、$\mathcal L^m$-a.e.の$x\in\Omega$で$Df(x)$が存在します。その点で[近似微分との同値](#prop-gmt10-lipschitz-rigidity)から$\operatorname{ap}Df(x)=Df(x)$です。また[GMT9の微分ノルム評価](../GMT9/index.md#cor-gmt9-derivative-bound)より$\|Df(x)\|_{\mathrm{op}}\le L$です。

$Df(x)$の[特異値](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-singular-values-right-vectors)$\sigma_i$について$\sigma_i^2$は$Df(x)^{\mathsf T}Df(x)$の固有値です。任意の単位ベクトル$v$で$|Df(x)v|\le L$なので、固有ベクトルを代入すると$\sigma_i\le L$です。[Gram行列式と直交不変性](#thm-gmt10-gram-invariance)から

$$
J_m^{\mathrm{ap}}f(x)
=\prod_{i=1}^m\sigma_i
\le L^m.
$$

非負性は各特異値が非負であること、通常微分との一致はすでに示した$\operatorname{ap}Df(x)=Df(x)$から分かります。$\square$
<!-- proof-end -->

この結論は局所Lipschitzにも可算な局所被覆で適用できますが、その場合の上界は各小領域のLipschitz定数に依存します。

### rank欠損と折り返しを見比べる

- **rank欠損**：$F(x,y)=(x+y,2(x+y),0)$では

$$
DF=\begin{pmatrix}1&1\\2&2\\0&0\end{pmatrix},
\quad
(DF)^{\mathsf T}DF=\begin{pmatrix}5&5\\5&5\end{pmatrix},
\quad J_2^{\mathrm{ap}}F=0.
$$

  二本の列が一致するため、平面を直線へ潰します。各列の長さが$\sqrt5$でも面積倍率は0です。

- **折り返し**：$G(x,y)=(|x|,y)$は1-Lipschitzで、$x>0$では$DG=I_2$、$x<0$では$DG=\operatorname{diag}(-1,1)$です。従って$x\ne0$で$J_2^{\mathrm{ap}}G=1$ですが、$x=0$の線上では近似微分が存在しません。線は$\mathcal L^2$-零です。左半面と右半面が同じ場所へ重なるため、**Jacobianが1でも像を単純に一度だけ数えてよいとは限りません**。この重複を数えるのがGMT11の主題です。

## 7. 演習（全問詳細解答付き）

### Level A：定義と計算を確認する

<a id="ex-gmt10-a1"></a>

**A1. 密度0の集合での近似**  
- Level: A
- 問題: $E=\{0\}\cup\{2^{-k}:k\ge1\}\subset\mathbb R$、$f(x)=x$（$x\in E$）、$f(x)=0$（$x\notin E$）とする。原点での近似微分を求め、通常微分が存在しないことを示せ。

<!-- solution-start -->
**詳細解答**

$E$は可算集合なので任意の$r>0$に対して$\mathcal L^1(E\cap(-r,r))=0$です。$f(0)=0$、候補$A=0$なら悪い集合は$E$に含まれ、密度は厳密に0です。従って[定義](#def-gmt10-approximate-differential)より$\operatorname{ap}Df(0)=0$です。[一意性](#lem-gmt10-approximate-unique)から候補はこれだけです。

一方$x_k=2^{-k}\to0$では$f(x_k)/x_k=1$、$y_k=-2^{-k}\to0$では$f(y_k)/y_k=0$です。差商の極限が二つの列で異なるので通常微分は存在しません。
<!-- solution-end -->

<a id="ex-gmt10-a2"></a>

**A2. 直線の長さ倍率**  
- Level: A
- 問題: $A:\mathbb R\to\mathbb R^3$を$A(t)=(2t,-t,2t)$とする。$J_1(A)$と、$E=[0,3]$の像の$\mathcal H^1$を求めよ。

<!-- solution-start -->
**詳細解答**

唯一の列は$v=(2,-1,2)^{\mathsf T}$で、$A^{\mathsf T}A=(4+1+4)=(9)$です。[m次元幾何的Jacobian](#def-gmt10-geometric-jacobian)を$m=1$で使うと$J_1(A)=\sqrt9=3$です。[線形写像のm次元面積倍率](#thm-gmt10-linear-area)で$m=1$、$c_1=1$、$\mathcal L^1([0,3])=3$を代入し、$\mathcal H^1(A(E))=1\cdot3\cdot3=9$です。像は実際に長さ9の線分です。
<!-- solution-end -->

<a id="ex-gmt10-a3"></a>

**A3. Gram行列の非対角成分**  
- Level: A
- 問題: $A:\mathbb R^2\to\mathbb R^3$の列が$v_1=(1,1,0)^{\mathsf T}$、$v_2=(1,0,1)^{\mathsf T}$であるとき、$A^{\mathsf T}A$、$J_2(A)$を求め、各成分の意味を説明せよ。

<!-- solution-start -->
**詳細解答**

$|v_1|^2=2$、$|v_2|^2=2$、$v_1\cdot v_2=1$なので

$$
A^{\mathsf T}A=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\quad
\det(A^{\mathsf T}A)=4-1=3,
\quad J_2(A)=\sqrt3.
$$

対角成分2は辺の長さの二乗、非対角成分1は角度を決める内積です。$2\cdot2$だけを面積の二乗とすると、辺の間の角度を無視してしまいます。
<!-- solution-end -->

<a id="ex-gmt10-a4"></a>

**A4. rankの欠損**  
- Level: A
- 問題: $A:\mathbb R^2\to\mathbb R^3$を$A(x,y)=(x+2y,3x+6y,0)$とする。rank、Gram行列式、$J_2(A)$を求めよ。

<!-- solution-start -->
**詳細解答**

二列は$v_1=(1,3,0)^{\mathsf T}$、$v_2=(2,6,0)^{\mathsf T}=2v_1$なのでrankは1です。Gram行列は

$$
A^{\mathsf T}A=
\begin{pmatrix}10&20\\20&40\end{pmatrix},
\qquad\det(A^{\mathsf T}A)=400-400=0.
$$

従って[Gram行列式と直交不変性の定理](#thm-gmt10-gram-invariance)のrank条件からも、Jacobianの式への直接代入からも$J_2(A)=0$です。像は1次元の直線なので2次元面積を持ちません。
<!-- solution-end -->

<a id="ex-gmt10-a5"></a>

**A5. 折り目のa.e.Jacobian**  
- Level: A
- 問題: $G:\mathbb R^2\to\mathbb R^2$を$G(x,y)=(|x|,2y)$とする。$x>0$、$x<0$での近似微分とJacobianを求め、例外線の測度を述べよ。

<!-- solution-start -->
**詳細解答**

$x>0$の点の近傍では$G(x,y)=(x,2y)$なので$DG=\operatorname{diag}(1,2)$です。$x<0$では$G(x,y)=(-x,2y)$、$DG=\operatorname{diag}(-1,2)$です。[Lipschitz写像での同値](#prop-gmt10-lipschitz-rigidity)からこれらは近似微分でもあります。どちらも

$$
(DG)^{\mathsf T}DG=\operatorname{diag}(1,4),
\quad J_2^{\mathrm{ap}}G=\sqrt{1\cdot4}=2.
$$

$x=0$では右と左の$x$方向の傾きが反対で、どちらの半球の割合も$1/2$のため近似微分は存在しません。この線の$\mathcal L^2$は0なので、Jacobianは$\mathcal L^2$-a.e.で2です。
<!-- solution-end -->

### Level B：証明の機構を再現する

<a id="ex-gmt10-b1"></a>

**B1. 二つの候補が一致する理由**  
- Level: B
- 問題: $f:\mathbb R^2\to\mathbb R$が原点で近似微分可能で、候補の行ベクトルが$A=(a,b)$と$B=(c,d)$であるとする。$A\ne B$なら近似微分の定義と矛盾することを、球の一定割合を占める方向集合を作って示せ。

<!-- solution-start -->
**詳細解答**

$C=A-B=(a-c,b-d)\ne0$とします。単位ベクトル$v=C^{\mathsf T}/|C|$では$|Cv|=|C|>0$です。連続性により単位円上の$v$近傍の開弧$U$で$|Cu|>|C|/2$です。各半径$r$の球のうち$h/|h|\in U$となる扇形$K_r$は、開弧の角度を$\beta>0$として$\mathcal L^2(K_r)/(\pi r^2)=\beta/(2\pi)>0$です。

二候補の悪い集合をそれぞれ閾値$\varepsilon=|C|/4$で取ると、その和集合の密度は0です。二つの誤差が同時に閾値以下の点では

$$
|Ch|\le|f(h)-f(0)-Ah|+|f(h)-f(0)-Bh|
\le2\varepsilon|h|=\frac{|C|}{2}|h|
$$

です。従ってそのような点は$K_r$に属しません。悪い集合の和集合は$K_r$全体を含み、密度が$\beta/(2\pi)$以上となり矛盾します。
<!-- solution-end -->

<a id="ex-gmt10-b2"></a>

**B2. Lipschitz性は針状の誤差を禁止する**  
- Level: B
- 問題: $R:B(0,1)\subset\mathbb R^m\to\mathbb R^d$は$K$-Lipschitzで$R(0)=0$とする。原点において任意の$\varepsilon>0$について$\{|R(h)|>\varepsilon|h|\}$の球内相対測度が0へ収束するなら、$R(h)=o(|h|)$を証明せよ。

<!-- solution-start -->
**詳細解答**

$K=0$なら$R\equiv0$です。$K>0$で結論が偽とすると、ある$\eta>0$、$h_j\to0$で$|R(h_j)|\ge\eta r_j$、$r_j=|h_j|$です。$\delta=\min(1/4,\eta/(4K))$とし、$|h-h_j|<\delta r_j$なら

$$
|R(h)|\ge\eta r_j-K\delta r_j
\ge3\eta r_j/4,
\qquad |h|<2r_j.
$$

従って$|R(h)|>(\eta/4)|h|$です。$\omega_m=\mathcal L^m(B(0,1))$と置くと、この小球の体積は$\omega_m(\delta r_j)^m$、含む球$B(0,2r_j)$の体積は$\omega_m(2r_j)^m$です。従って悪い集合の割合は$(\delta/2)^m>0$以上となります。仮定の密度0と矛盾し、$R(h)=o(|h|)$です。
<!-- solution-end -->

<a id="ex-gmt10-b3"></a>

**B3. 非正規化測度の定数を残す**  
- Level: B
- 問題: $m=2$、$A:\mathbb R^2\to\mathbb R^3$を$A(x,y)=(3x,2y,0)$、$E=[0,1]^2$とする。MT8の非正規化$\mathcal H^2$を使い、$J_2(A)$、$\mathcal H^2(A(E))$を$c_2=\mathcal H^2([0,1]^2)$を用いて表せ。$c_2$を勝手に1にしてはいけない理由も説明せよ。

<!-- solution-start -->
**詳細解答**

標準基底の像は$(3,0,0)$と$(0,2,0)$で直交するので

$$
A^{\mathsf T}A=\begin{pmatrix}9&0\\0&4\end{pmatrix},
\quad J_2(A)=\sqrt{9\cdot4}=6.
$$

$\mathcal L^2(E)=1$で、[線形面積倍率定理](#thm-gmt10-linear-area)に$m=2$を代入すると$\mathcal H^2(A(E))=c_2\cdot6\cdot1=6c_2$です。MT8は直径の2乗で定める非正規化測度であり、$\mathcal L^2$との比例定数を1と宣言していません。$\mathcal H^2(E)=c_2$を基準にしても、相対倍率$\mathcal H^2(A(E))/\mathcal H^2(E)=6$は変わりません。
<!-- solution-end -->

<a id="ex-gmt10-b4"></a>

**B4. 一般のグラフのGram行列**  
- Level: B
- 問題: $g:\mathbb R^m\to\mathbb R^k$は$C^1$級とし、$F(x)=(x,g(x))\in\mathbb R^{m+k}$とする。$DF$の形から$(DF)^{\mathsf T}DF=I_m+(Dg)^{\mathsf T}Dg$を導き、$J_m(F)\ge1$を示せ。

<!-- solution-start -->
**詳細解答**

標準基底$e_j$を一つだけ動かすと、$F$の第$j$列は$(e_j,\partial_jg)^{\mathsf T}$です。従って行列を上下に分割して

$$
DF=\begin{pmatrix}I_m\\Dg\end{pmatrix},
\quad
(DF)^{\mathsf T}DF
=\begin{pmatrix}I_m&(Dg)^{\mathsf T}\end{pmatrix}
\begin{pmatrix}I_m\\Dg\end{pmatrix}
=I_m+(Dg)^{\mathsf T}Dg.
$$

任意の$u$について$u^{\mathsf T}(Dg)^{\mathsf T}Dg\,u=|Dg\,u|^2\ge0$なので、$(Dg)^{\mathsf T}Dg$の固有値$\lambda_i$は非負です。Gram行列の固有値は$1+\lambda_i\ge1$だから

$$
J_m(F)^2=\det(I_m+(Dg)^{\mathsf T}Dg)
=\prod_{i=1}^m(1+\lambda_i)\ge1.
$$

非負平方根を取って$J_m(F)\ge1$です。$F$は$C^1$級なので各点で近似Jacobianと通常Jacobianは一致します。
<!-- solution-end -->

### Level C：近似・幾何・重複を接続する

<a id="ex-gmt10-c1"></a>

**C1. 二つのグラフが同じ像へ重なるとき**  
- Level: C
- 問題: $F:\mathbb R^2\to\mathbb R^3$を$F(x,y)=(|x|,y,a|x|+by)$（$a,b$は固定実数）とする。
  1. $F$が大域Lipschitzであることを示せ。
  2. $x>0$と$x<0$で$DF$を求め、$J_2^{\mathrm{ap}}F$を計算せよ。
  3. 長方形$Q_+=[0,1]\times[0,1]$、$Q_-=[-1,0]\times[0,1]$について、$\mathcal H^2(F(Q_+))$と$\mathcal H^2(F(Q_-\cup Q_+))$を$c_2$を使って求めよ。
  4. $\int_{Q_-\cup Q_+}J_2^{\mathrm{ap}}F\,d\mathcal L^2$と上の像の$\mathcal H^2$を比較し、なぜ重複回数が必要か説明せよ。

<!-- solution-start -->
**詳細解答**

**(1) Lipschitz性。** 任意の$p=(x,y)$、$q=(u,v)$について$||x|-|u||\le|x-u|$です。差を$h=(x-u,y-v)$、$s=|x|-|u|$と置くと

$$
\begin{aligned}
|F(p)-F(q)|^2
&=s^2+(y-v)^2+(as+b(y-v))^2\\
&\le |h|^2+(|a|+|b|)^2|h|^2,
\end{aligned}
$$

ここで$|s|\le|h|$、$|y-v|\le|h|$を使いました。従って$\sqrt{1+(|a|+|b|)^2}$が一つのLipschitz定数です。

**(2) 近似微分。** $x>0$では$|x|=x$、$x<0$では$|x|=-x$なので

$$
D F|_{x>0}=
\begin{pmatrix}1&0\\0&1\\a&b\end{pmatrix},
\qquad
D F|_{x<0}=
\begin{pmatrix}-1&0\\0&1\\-a&b\end{pmatrix}.
$$

前者のGram行列は

$$
\begin{pmatrix}1+a^2&ab\\ab&1+b^2\end{pmatrix},
$$

後者は非対角項の符号だけが変わる

$$
\begin{pmatrix}1+a^2&-ab\\-ab&1+b^2\end{pmatrix}
$$

です。どちらも行列式は

$$
(1+a^2)(1+b^2)-a^2b^2=1+a^2+b^2
$$

なので、$x\ne0$で$J_2^{\mathrm{ap}}F=\sqrt{1+a^2+b^2}$です。$x=0$は$\mathcal L^2$-零集合なので積分値には影響しません。

**(3) 像の面積。** $x\ge0$では$F(x,y)=A(x,y)$で$A(u,v)=(u,v,au+bv)$です。$x\le0$では$F(x,y)=A(-x,y)$なので、$F(Q_-)=F(Q_+)=A([0,1]^2)$です。[線形面積倍率定理](#thm-gmt10-linear-area)で$J_2(A)=\sqrt{1+a^2+b^2}$、$\mathcal L^2([0,1]^2)=1$を代入すると

$$
\mathcal H^2(F(Q_+))
=\mathcal H^2(F(Q_-\cup Q_+))
=c_2\sqrt{1+a^2+b^2}.
$$

**(4) 積分との比較。** 二長方形の共通辺$x=0$はLebesgue零なので、合併の面積は2です。従って

$$
\int_{Q_-\cup Q_+}J_2^{\mathrm{ap}}F\,d\mathcal L^2
=2\sqrt{1+a^2+b^2}.
$$

これは像の**正規化**Hausdorff測度$c_2^{-1}\mathcal H^2(F(Q_-\cup Q_+))=\sqrt{1+a^2+b^2}$の2倍です。像の内部では入力が$(u,y)$と$(-u,y)$の二つあるため、Jacobian積分は像を**重複度2**で数えています。非正規化$\mathcal H^2$を使う公式には$c_2^{-1}$を付ける必要があります。$x=0$で重複度が1になる点は像の$\mathcal H^2$-零集合なので面積には影響しません。
<!-- solution-end -->

---

## 8. 何が測れるようになったか

- 近似微分はLebesgue球で**密度0の例外**を許す。各成分がLebesgue可測であるだけの関数では通常微分と異なるが、局所Lipschitz写像では各点で同値になる。
- $J_m(A)=\sqrt{\det(A^{\mathsf T}A)}$は$m$次元の**線形面積倍率**であり、rank不足なら0、グラフでは$\sqrt{\det(I+(Dg)^{\mathsf T}Dg)}$になる。
- この章のa.e.は**定義域の$\mathcal L^m$**。MT8の非正規化$\mathcal H^m$とLebesgue測度には$c_m$の比例係数がある。
- 非線形写像ではJacobianが正でも折り返しで像が重なる。次のGMT11では、重複度を入れたarea formulaでこの差を正確に扱う。
