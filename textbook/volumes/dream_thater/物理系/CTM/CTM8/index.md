# CTM8 基準配置へ応力を戻すと何が変わるか

[CTM7 の局所運動方程式](../CTM7/index.md#thm-ctm7-material-momentum)は現在位置 $x$ と現在の面積を使い、[Cauchy の応力定理](../CTM6/index.md#thm-ctm6-cauchy-stress)は単位法線 $n$ に働く面力を $\sigma n$ と書いた。一方、数値計算や固体の変形を追跡するときには、変形する前の物質点 $X$ と基準領域 $\Omega_0$ に方程式を置いておきたい。

困るのは、基準配置の面積 $dA$ と現在配置の面積 $da$ が一般に違うことだ。**同じ物理的な力**を別の面積で割れば、応力の行列も変わる。本講では面積ベクトルの変換から新しい応力を定義し、力の釣合・対称性・仕事率の三つを実際に往復計算する。

## 0. 対象・記号・仮定

[CTM1 の運動写像](../CTM1/index.md#def-ctm1-motion-configuration) $\chi:\Omega_0\times I\to\mathbb R^3$ は、$\Omega_0\subset\mathbb R^3$ 上で各時刻に向きを保つ単射とし、$\chi_t$ と逆写像が局所的に $C^2$ 級、時間について必要な二階微分をもつとする。$\Omega_t=\chi_t(\Omega_0)$、$x=\chi(X,t)$ と置く。導出に使う物質領域 $U_0\Subset\Omega_0$ は有界で区分的 $C^1$ 境界をもち、諸量は閉包近くで必要な滑らかさをもつ。

- [CTM2 の変形勾配と Jacobian](../CTM2/index.md#def-ctm2-deformation-gradient)は $F_{iA}=\partial\chi_i/\partial X_A$、$J=\det F>0$。小文字添字 $i,j$ は現在配置の力・空間成分、大文字 $A,B$ は基準配置の面法線・物質成分とする。$F$ は無次元で可逆である。
- [CTM5 の密度](../CTM5/index.md#def-ctm5-mass-densities)は $\rho(x,t)>0$、$\rho_0(X)=J(X,t)\rho(\chi(X,t),t)$。質量保存の下で $\rho_0$ は時間に依存しない。両者の単位は kg/m$^3$。
- [CTM6 の面力](../CTM6/index.md#def-ctm6-traction)は現在側で $\sigma(x,t)n\,da$。$n$ と $N$ はそれぞれ現在・基準の**同じ物質領域から外向き**の単位法線で、$da,dA$ は正の面積要素。
- [CTM7 の角運動量収支](../CTM7/index.md#prop-ctm7-angular-stress)が成り立つ古典的 Cauchy 連続体を考え、$\sigma=\sigma^T$ とする。独立の面偶力・体積偶力は含まない。単位質量当たりの体積力 $b$ は N/kg、物質加速度は $\ddot\chi(X,t)=\partial_t^2\chi(X,t)$ で m/s$^2$。
- $\operatorname{div}_x$ は現在座標 $x$ での発散、$\operatorname{Div}_X$ は基準座標 $X$ での発散。例えば $(\operatorname{Div}_X P)_i=\sum_A\partial P_{iA}/\partial X_A$。両配置の長さ単位は m であり、応力の単位は Pa = N/m$^2$。

「基準側へ戻す」とは現在の力をそのまま別座標の数値へ写すことであって、変形を巻き戻して実際に別の力を作ることではない。

## 1. 同じ面の同じ合力を基準面積で表す

[Nanson の面積変換公式](../CTM2/index.md#thm-ctm2-nanson)は、現在の向き付き面積ベクトルを

$$
n\,da=JF^{-T}N\,dA
$$

と表す。この等式には面の傾きと面積倍率が両方含まれる。したがって面力は、引数を $x=\chi(X,t)$ と置いて

$$
\sigma(x,t)n\,da
=J(X,t)\sigma(\chi(X,t),t)F(X,t)^{-T}N\,dA
$$

となる。右辺の $N$ に掛かる行列が欲しい新しい応力 $P$ である。これは現在配置の**力成分**を基準配置の**面積・法線**で測る二点テンソルで、一般には対称行列にならない。以下で正式に定義する。

<a id="def-ctm8-first-piola"></a>

<!-- formal-statement-start -->
### 定義（第一 Piola–Kirchhoff 応力）

$F=D_X\chi$ が可逆で $J=\det F>0$、現在配置の Cauchy 応力が $\sigma(x,t)$ であるとする。第一 Piola–Kirchhoff 応力を

$$
\boxed{P(X,t):=J(X,t)\,\sigma(\chi(X,t),t)F(X,t)^{-T}},
\qquad P_{iA}=J\sum_j\sigma_{ij}(F^{-1})_{Aj}
$$

で定める。基準側の外向き単位法線 $N$ に対する**基準面積当たりの面力**は $PN$ であり、微小面の力は $PN\,dA$ である。
<!-- formal-statement-end -->

$P$ は Pa を単位にもつが、$\sigma$ と同じ行列ではない。第 $i$ 行は現在側の力成分、第 $A$ 列は基準側の法線成分である。二つの添字が違う空間に属するため、一般に $P=P^T$ を要求する意味はない。

<!-- definition-example-start: def-ctm8-first-piola -->
### **定義の確認**：三軸伸長で面積と合力を突き合わせる

基準側と現在側の標準直交基底をそれぞれ $e_1,e_2,e_3$ で表す。ある時刻の運動を $\chi(X)=(\lambda_1X_1,\lambda_2X_2,\lambda_3X_3)$、$\lambda_i>0$（無次元）とし、現在応力を $\sigma=\operatorname{diag}(p_1,p_2,p_3)$ Pa とする。物質座標で各成分を微分すると

$$
F=D_X\chi=\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3),\qquad
F^{-T}=\operatorname{diag}(1/\lambda_1,1/\lambda_2,1/\lambda_3),\qquad
J=\lambda_1\lambda_2\lambda_3>0.
$$

$\chi$ は逆写像 $X_i=x_i/\lambda_i$ をもち、$F$ は可逆で向きを保つ。これは[変形勾配の定義](../CTM2/index.md#def-ctm2-deformation-gradient)の条件そのものである。基準法線の各列へ $JF^{-T}$ を掛けると、[Nanson の公式](../CTM2/index.md#thm-ctm2-nanson)による面積倍率が得られる。続けて $P=J\sigma F^{-T}$ を各列で計算すると

$$
P=\operatorname{diag}(\lambda_2\lambda_3p_1,\,
\lambda_1\lambda_3p_2,\,
\lambda_1\lambda_2p_3).
$$

例えば $N=e_1$ では $F^{-T}e_1=e_1/\lambda_1$ なので $n=e_1$、$da=J\,dA/\lambda_1=\lambda_2\lambda_3\,dA$。現在側の力 $p_1e_1\,\lambda_2\lambda_3dA$ は基準側の $Pe_1\,dA=\lambda_2\lambda_3p_1e_1\,dA$ と一致する。残る二面も法線をそれぞれ $e_2,e_3$ として計算すると

$$
\begin{aligned}
N=e_2:\quad &\sigma n\,da=p_2e_2\,\lambda_1\lambda_3dA=Pe_2\,dA,\\
N=e_3:\quad &\sigma n\,da=p_3e_3\,\lambda_1\lambda_2dA=Pe_3\,dA.
\end{aligned}
$$

どちらも $F^{-T}e_i=e_i/\lambda_i$ から $n=e_i$、$da=J\,dA/\lambda_i$ を求めた。これで定義式の**全列**と面法線の対応を確認できた。
<!-- definition-example-end -->

## 2. 基準配置で力の釣合はどう書けるか

同じ物質領域を $U_0$ と $U_t=\chi_t(U_0)$ で表す。物理的な運動量は、[CTM5 の変数変換](../CTM5/index.md#prop-ctm5-density-jacobian)と物質粒子の速度 $v(\chi(X,t),t)=\dot\chi(X,t)$ により

$$
\int_{U_t}\rho v\,dv
=\int_{U_0}\rho_0\dot\chi\,dV.
$$

左辺の $dv$ は現在の体積要素、右辺の $dV$ は基準の体積要素である（どちらも m$^3$）。[CTM7 の線形運動量収支](../CTM7/index.md#principle-ctm7-material-balances)で面積変換を使うと

$$
\frac{d}{dt}\int_{U_0}\rho_0\dot\chi\,dV
=\int_{\partial U_0}PN\,dA
+\int_{U_0}\rho_0\,b(\chi(X,t),t)\,dV.
$$

$\rho_0$ と積分領域は時間に依存しないので、左辺は $\int_{U_0}\rho_0\ddot\chi\,dV$ となる。

<a id="thm-ctm8-reference-momentum"></a>

<!-- formal-statement-start -->
### 定理（基準配置の局所運動量方程式）

上記の滑らかさ、向きの保持、質量保存、Cauchy の線形運動量収支を仮定する。$P=J(\sigma\circ\chi)F^{-T}$ と $\rho_0=J(\rho\circ\chi)$ に対して、任意の物質領域の基準配置での積分収支は、局所式

$$
\boxed{\operatorname{Div}_X P+\rho_0\,b\circ\chi=\rho_0\ddot\chi}
$$

と同値である。また各 $(X,t)$ で

$$
\boxed{\operatorname{Div}_X P=J\,(\operatorname{div}_x\sigma)\circ\chi}
$$

が成り立つ。この等式は現在側と基準側の応力の発散を結ぶ変換式である。
<!-- formal-statement-end -->

### 証明の見取り図

まず面力積分を Nanson の公式で基準面へ移し、質量保存で慣性項・体積力も移す。次に基準座標の発散定理で境界積分を体積積分へ変える。任意の領域の積分がゼロであることから点ごとの等式を得る。発散変換は現在側と基準側で**同じ面力積分**を二通りに評価すれば導ける。

<!-- proof-start -->
### 証明

[Nanson の面積変換公式](../CTM2/index.md#thm-ctm2-nanson)より、任意の $U_0$ に対して

$$
\int_{\partial U_t}\sigma n\,da
=\int_{\partial U_0}PN\,dA.
$$

[CTM5 の質量密度の変換](../CTM5/index.md#prop-ctm5-density-jacobian)を用いると $\rho\,dv=\rho_0\,dV$、$a(\chi(X,t),t)=\ddot\chi(X,t)$ である。従って [CTM7 の運動量収支](../CTM7/index.md#principle-ctm7-material-balances)は

$$
\int_{U_0}\rho_0\ddot\chi\,dV
=\int_{\partial U_0}PN\,dA
+\int_{U_0}\rho_0 b\circ\chi\,dV.
$$

基準領域で [Gauss の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を各行 $P_{iA}$ に適用すると

$$
\int_{\partial U_0}PN\,dA
=\int_{U_0}\operatorname{Div}_X P\,dV.
$$

任意の $U_0\Subset\Omega_0$ について積分が一致し、被積分関数は連続だから、差が非零の点では符号が変わらない小球を選べることに反する。よって局所式を得る。逆に局所式を $U_0$ 上で積分して発散定理を適用すれば積分収支が戻る。

発散変換については、[現在側の Gauss の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)と変数変換を組み合わせて

$$
\begin{aligned}
\int_{U_0}\operatorname{Div}_X P\,dV
&=\int_{\partial U_0}PN\,dA\\
&=\int_{\partial U_t}\sigma n\,da\\
&=\int_{U_t}\operatorname{div}_x\sigma\,dv\\
&=\int_{U_0}J\,(\operatorname{div}_x\sigma)\circ\chi\,dV.
\end{aligned}
$$

再び任意の領域についての等式と連続性から $\operatorname{Div}_X P=J(\operatorname{div}_x\sigma)\circ\chi$ となる。両辺の単位は N/m$^3$（基準体積当たり）である。 $\square$
<!-- proof-end -->

<a id="identity-ctm8-piola"></a>

### 成分で何が相殺しているか

微分の取り違えを防ぐため、発散変換の中間式を成分でも確かめる。$K_{jA}:=JF^{-1}_{Aj}$ と置く。これは [CTM2 の余因子行列](../CTM2/index.md#prop-ctm2-cofactor-inverse)の成分である。$F_{kA}=\partial_{X_A}\chi_k$ の二階混合微分が交換できるとき

$$
\boxed{\sum_A\partial_{X_A}K_{jA}=0}
$$

という **Piola 恒等式**が成り立つ。確かめるには [Levi–Civita 記号](../../../幾何系/VC/VC7/index.md#def-vc7-epsilon)を用い、

$$
K_{jA}=\frac12\sum_{k,l,B,C}\varepsilon_{jkl}\varepsilon_{ABC}F_{kB}F_{lC}
$$

と展開する。$X_A$ で微分した第一の積は $\partial_{X_A}F_{kB}=\partial_{X_B}F_{kA}$ によって $A,B$ について対称であるのに、係数 $\varepsilon_{ABC}$ は反対称だから和がゼロになる。第二の積も $\partial_{X_A}F_{lC}=\partial_{X_C}F_{lA}$ によって $A,C$ の対称性と反対称性からゼロになる。従って恒等式が示された。

連鎖律では、現在側の関数 $\sigma_{ij}(x,t)$ の $X_A$ 微分は

$$
\partial_{X_A}(\sigma_{ij}\circ\chi)
=\sum_k(\partial_{x_k}\sigma_{ij})\circ\chi\,F_{kA}
$$

である。よって

$$
\begin{aligned}
\sum_A\partial_{X_A}P_{iA}
&=\sum_{j,A}\partial_{X_A}\left((\sigma_{ij}\circ\chi)K_{jA}\right)\\
&=\sum_{j,A,k}K_{jA}F_{kA}(\partial_{x_k}\sigma_{ij})\circ\chi
+\sum_j(\sigma_{ij}\circ\chi)\sum_A\partial_{X_A}K_{jA}\\
&=J\sum_{j,k}\delta_{jk}(\partial_{x_k}\sigma_{ij})\circ\chi
=J\,(\operatorname{div}_x\sigma)_i\circ\chi.
\end{aligned}
$$

第三行では $\sum_A F^{-1}_{Aj}F_{kA}=\delta_{jk}$ を使った。$F$ が任意の行列場なら二階微分の交換は使えないため、**$F$ が一つの運動写像の勾配であること**が Piola 恒等式の要点である。

### 例：変形しても釣り合う不均一な応力

ある時刻に $F=\operatorname{diag}(\lambda,1,1)$（$\lambda>0$）、$x_1=\lambda X_1$、$\sigma(x)=\operatorname{diag}(kx_1,0,0)$ とする。$k$ の単位は Pa/m。定義から

$$
P(X)=\operatorname{diag}(k\lambda X_1,0,0),\qquad
\operatorname{Div}_X P=k\lambda e_1.
$$

現在側では $\operatorname{div}_x\sigma=ke_1$、$J=\lambda$ なので発散変換の右辺も $\lambda ke_1$。静止の瞬間（$\ddot\chi=0$）なら、$\rho_0=\lambda\rho$、$b=-ke_1/\rho$ と置いて局所式の全項が釣り合う。ここで $\rho$ はその瞬間の正の一定密度である。例えば $x_1$ 方向の面の traction は面法線の符号とともに別途 $\sigma n$ で確かめられる。

## 3. なぜ第二 Piola 応力を作るのか

第一 Piola 応力は基準法線を受け取る一方、力ベクトルを現在側に残す。このままでは基準配置だけの二つの方向を比べる対称行列として解釈できない。そこで力側の添字も $F^{-1}$ で基準側の方向へ移した行列 $S$ を考え、以下で定義する。

<a id="def-ctm8-second-piola"></a>

<!-- formal-statement-start -->
### 定義（第二 Piola–Kirchhoff 応力）

$F$ と $P$ が第1節の条件を満たすとき、第二 Piola–Kirchhoff 応力を

$$
\boxed{S:=F^{-1}P=JF^{-1}(\sigma\circ\chi)F^{-T}}
$$

で定義する。$S$ は基準配置の二つの方向を添字に持ち、$P=FS$ を満たす。$F$ が無次元のため $S$ の単位も Pa である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm8-second-piola -->
### **定義の確認**：せん断では $P$ は非対称でも $S$ は対称

基準座標 $X$ で $\chi(X)=(X_1+\gamma X_2,X_2,X_3)$（$\gamma$ は無次元）という単純せん断を考え、$\sigma=pI_3$（$p$ は Pa）とする。成分微分から $F=D_X\chi=\begin{pmatrix}1&\gamma&0\\0&1&0\\0&0&1\end{pmatrix}$、$J=1>0$ となる。逆写像は $X=(x_1-\gamma x_2,x_2,x_3)$ で存在するため、第一・第二 Piola 応力の定義条件を満たす。$F^{-1}$ と $JF^{-T}$ を順に掛ければ

$$
F^{-1}=\begin{pmatrix}1&-\gamma&0\\0&1&0\\0&0&1\end{pmatrix},
\quad
P=p\begin{pmatrix}1&0&0\\-\gamma&1&0\\0&0&1\end{pmatrix},
$$

$$
S=p\begin{pmatrix}1+\gamma^2&-\gamma&0\\-\gamma&1&0\\0&0&1\end{pmatrix}.
$$

$\gamma p\ne0$ なら $P_{12}=0\ne-\gamma p=P_{21}$ だが、$S_{12}=S_{21}=-\gamma p$。また $F S$ の第1行は $p(1+\gamma^2-\gamma^2,-\gamma+\gamma,0)=(p,0,0)$、第2行は $p(-\gamma,1,0)$ となり $P=FS$ を直接確認できる。単に行列を転置しても $P$ の対称性は得られない。
<!-- definition-example-end -->

<a id="prop-ctm8-symmetry"></a>

<!-- formal-statement-start -->
### 命題（古典的連続体での第二 Piola 応力の対称性）

$F$ は可逆、$J>0$、$S=JF^{-1}\sigma F^{-T}$ とする（$\sigma$ は $x=\chi(X,t)$ で評価する）。このとき

$$
\boxed{S=S^T\quad\Longleftrightarrow\quad \sigma=\sigma^T}.
$$

従って、[CTM7 の応力対称性](../CTM7/index.md#prop-ctm7-angular-stress)の仮定を満たす古典的連続体では $S$ は対称である。$P$ の対称性は結論に含まれない。
<!-- formal-statement-end -->

### 証明の見取り図

$S$ の転置を行い、$J>0$ と $F$ の可逆性で式を戻す。

<!-- proof-start -->
### 証明

転置すると

$$
S^T=J(F^{-T})^T\sigma^T(F^{-1})^T
=JF^{-1}\sigma^TF^{-T}.
$$

したがって $\sigma=\sigma^T$ なら $S=S^T$。逆に $S=S^T$ なら、両辺の左から $F$、右から $F^T$ を掛けて $J\sigma=J\sigma^T$ を得る。$J>0$ だから割ることができ $\sigma=\sigma^T$。$\square$
<!-- proof-end -->

## 4. 「力が同じ」の次は「仕事率が同じ」

同じ面の力が等しいだけでなく、その力が変形を通じて物質へする仕事率も表記によらず一致する必要がある。ここで [VC7 の二重内積](../../../幾何系/VC/VC7/index.md#def-vc7-trace-double-contraction)を $A:B:=\sum_{i,j}A_{ij}B_{ij}=\operatorname{tr}(A^TB)$ と書く。応力とひずみ速度を掛け合わせた $P:\dot F$ や $\sigma:D$ は、単位**基準体積／現在体積当たりの機械仕事率**（W/m$^3$）を表す候補になる。

[CTM4 の速度勾配の関係](../CTM4/index.md#prop-ctm4-velocity-deformation)により

$$
\dot F=L F,\qquad L=\nabla_x v\circ\chi,
$$

ここで $\dot F$ は $X$ を固定した時間微分である。[変形速度テンソル](../CTM4/index.md#def-ctm4-rate-of-deformation-spin)を $D=(L+L^T)/2$、$W=(L-L^T)/2$ とする。$\sigma$ が対称なら $\sigma:W=0$ であり、このとき $\sigma:L=\sigma:D$ となる。

また [CTM3 の Green–Lagrange ひずみ](../CTM3/index.md#def-ctm3-green-strain)は $E=(F^TF-I_3)/2$。$E$ と $S$ はともに基準側の二方向に関する行列なので、それぞれの時間変化と応力を組にできる。

<a id="thm-ctm8-work-conjugacy"></a>

<!-- formal-statement-start -->
### 定理（Piola 応力とひずみ速度の仕事共役）

上記の正則性の下で、$F$ は可逆で $J>0$、$P=J\sigma F^{-T}$、$S=F^{-1}P$、$L=\dot F F^{-1}$、$D=\operatorname{sym}L$、$E=(F^TF-I_3)/2$ とする（$\sigma,L,D$ は現在位置 $\chi(X,t)$ で評価する）。$\sigma=\sigma^T$ を仮定すると

$$
\boxed{P:\dot F=S:\dot E=J\,\sigma:D}.
$$

左二辺は基準体積当たり、右辺の $\sigma:D$ は現在体積当たりの仕事率であり、$J$ が体積倍率を補う。
<!-- formal-statement-end -->

### 証明の見取り図

$P=FS$ と $E=(F^TF-I_3)/2$ の時間微分をまず比較する。次に $P=J\sigma F^{-T}$、$\dot F=LF$ を成分に代入し、逆行列と変形勾配を消す。最後に対称応力がスピン $W$ と仕事をしないことを確かめる。

<!-- proof-start -->
### 証明

[CTM3 の有限ひずみの定義](../CTM3/index.md#def-ctm3-green-strain)を $X$ 固定で微分すると

$$
\dot E=\frac12(\dot F^TF+F^T\dot F)
=\operatorname{sym}(F^T\dot F).
$$

[第二 Piola 応力の対称性](#prop-ctm8-symmetry)により $S$ は対称なので、対称行列 $S$ と反対称行列の二重内積はゼロ。従って

$$
S:\dot E=S:F^T\dot F
=\operatorname{tr}(S^TF^T\dot F)
=\operatorname{tr}((FS)^T\dot F)
=P:\dot F.
$$

ここでは $P=FS$ を使った。次に [CTM4 の関係 $\dot F=LF$](../CTM4/index.md#prop-ctm4-velocity-deformation)と $P_{iA}=J\sigma_{ij}F^{-1}_{Aj}$ から

$$
\begin{aligned}
P:\dot F
&=\sum_{i,A}P_{iA}\dot F_{iA}\\
&=J\sum_{i,j,A,k}\sigma_{ij}F^{-1}_{Aj}L_{ik}F_{kA}\\
&=J\sum_{i,j,k}\sigma_{ij}L_{ik}\delta_{jk}
=J\sum_{i,j}\sigma_{ij}L_{ij}=J\sigma:L.
\end{aligned}
$$

最後に $L=D+W$、$W^T=-W$ だから

$$
\sigma:W=\sum_{i<j}(\sigma_{ij}W_{ij}+\sigma_{ji}W_{ji})
+\sum_i\sigma_{ii}W_{ii}
=\sum_{i<j}(\sigma_{ij}-\sigma_{ji})W_{ij}=0.
$$

ゆえに $P:\dot F=J\sigma:D$ である。$\sigma$ は Pa = N/m$^2$、$\dot F,D$ は s$^{-1}$ なので各辺は Pa/s = W/m$^3$。$\square$
<!-- proof-end -->

### 例：時間依存の単純せん断で三つの仕事率を計算する

$\chi(X,t)=(X_1+\gamma(t)X_2,X_2,X_3)$ とし、$\gamma(0)=0$、$t$ は s。$\sigma=\begin{pmatrix}0&\tau&0\\\tau&0&0\\0&0&0\end{pmatrix}$ とする（$\tau$ は Pa）。$X$ を固定した時間微分は $\partial_t\chi(X,t)=(\dot\gamma X_2,0,0)$。$x_2=X_2$ なので現在座標の速度は $v(x,t)=(\dot\gamma x_2,0,0)$ となる。また $F=I_3+\gamma e_1e_2^T$、$J=1$、$\dot F_{12}=\partial_tF_{12}|_X=\dot\gamma$ でその他の成分はゼロ。定義から

$$
P=\begin{pmatrix}-\gamma\tau&\tau&0\\\tau&0&0\\0&0&0\end{pmatrix},
\qquad
S=\begin{pmatrix}-2\gamma\tau&\tau&0\\\tau&0&0\\0&0&0\end{pmatrix}.
$$

現在座標 $x$ を固定して速度を空間微分すると $L_{12}=\partial v_1/\partial x_2=\dot\gamma$、他の $L_{ij}=0$ なので $D_{12}=D_{21}=\dot\gamma/2$。また

$$
E=\frac12\begin{pmatrix}0&\gamma&0\\\gamma&\gamma^2&0\\0&0&0\end{pmatrix},
\qquad
\dot E_{12}=\dot E_{21}=\dot\gamma/2,\quad
\dot E_{22}=\gamma\dot\gamma.
$$

各表示を別々に計算すると

$$
P:\dot F=\tau\dot\gamma,\qquad
S:\dot E=2\tau\frac{\dot\gamma}{2}+0\cdot\gamma\dot\gamma=\tau\dot\gamma,
\qquad
J\sigma:D=1\cdot2\tau\frac{\dot\gamma}{2}=\tau\dot\gamma.
$$

$\gamma$ が大きくても成立し、小変形近似を使っていない。$\tau\dot\gamma$ は応力と変形速度の符号に応じて正にも負にもなりうる。散逸の非負性は次々講で扱う追加の構成則・熱力学条件であり、この恒等式自体からは出ない。

## 5. 何が変わり、何が変わらないか

- 現在配置では面力密度が $\sigma n$、基準配置では $PN$。面積倍率を含めた**合力は同じ**である。
- $\sigma$ と $S$ は古典的連続体で対称だが、二点テンソル $P$ は一般に非対称。$P$ の非対称性だけを理由に角運動量保存の破れと判断してはいけない。
- 現在体積当たりの仕事率は $\sigma:D$、基準体積当たりでは $P:\dot F=S:\dot E$。**密度の変換と同じく体積倍率 $J$ を忘れない**。
- $F$ が特異になれば $F^{-1}$ と $F^{-T}$ が使えない。$J>0$ を失う変形では [Nanson の公式](../CTM2/index.md#thm-ctm2-nanson)をこの形で使えず、応力を基準へ引き戻す論証が壊れる。
- 仕事率の恒等式はエネルギー保存則そのものではない。熱流束・内部エネルギーを含む収支は次講で扱う。

## 6. 演習

各問では $F$ が変形勾配として実現でき $J>0$ である条件を確認すること。時間を指定しない問題は、ある時刻での瞬間的な値を与える。$P=J\sigma F^{-T}$、$S=F^{-1}P$ とし、$P_{iA}$ は現在の力・基準の法線成分である。

## Level A

### A1. 基準面と現在面の合力

$F=\operatorname{diag}(2,3,1)$、$\sigma=\operatorname{diag}(5,7,11)$ Pa とする。$J,P$ を計算し、基準面 $N=e_2$、面積 $dA=0.4\ \mathrm{m^2}$ から求める力を現在側と基準側で比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$J=2\cdot3\cdot1=6>0$ であり、$F^{-T}=\operatorname{diag}(1/2,1/3,1)$。よって [第一 Piola–Kirchhoff 応力](#def-ctm8-first-piola)から

$$
P=6\operatorname{diag}(5,7,11)\operatorname{diag}(1/2,1/3,1)
=\operatorname{diag}(15,14,66)\ \mathrm{Pa}.
$$

[面積変換](../CTM2/index.md#thm-ctm2-nanson)では $n=e_2$、$da=J\|F^{-T}e_2\|dA=6(1/3)(0.4)=0.8\ \mathrm{m^2}$。現在側の力は $\sigma e_2\,da=7e_2(0.8)=5.6e_2$ N。基準側も $Pe_2\,dA=14e_2(0.4)=5.6e_2$ N で一致する。
<!-- solution-end -->

### A2. 添字の行先

$P=\begin{pmatrix}a&b&0\\c&d&0\\0&0&e\end{pmatrix}$ Pa とし、基準法線 $N=e_1$ と $N=e_2$ での面力密度を求めよ。第1行第2列 $P_{12}$ が何を意味するか説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$Pe_1=(a,c,0)^T$、$Pe_2=(b,d,0)^T$ Pa。$P_{12}=b$ は基準法線 $e_2$ の面が受ける**現在の第1方向**の力の密度である。$P_{21}=c$ は別の面・力成分であり、二点テンソルの二つの添字は同じ意味ではない。[第一 Piola–Kirchhoff 応力](#def-ctm8-first-piola)の列が基準法線を受け取ることによる。
<!-- solution-end -->

### A3. 第二 Piola 応力を作る

$F=\operatorname{diag}(2,1,1)$、$\sigma=\begin{pmatrix}0&3&0\\3&0&0\\0&0&4\end{pmatrix}$ Pa とする。$P,S$ を計算し、対称性を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$J=2$、$F^{-1}=F^{-T}=\operatorname{diag}(1/2,1,1)$ である。順に掛けると

$$
P=2\sigma F^{-T}
=\begin{pmatrix}0&6&0\\3&0&0\\0&0&8\end{pmatrix}\ \mathrm{Pa},
$$

$$
S=F^{-1}P
=\begin{pmatrix}0&3&0\\3&0&0\\0&0&8\end{pmatrix}\ \mathrm{Pa}.
$$

$P_{12}=6$ と $P_{21}=3$ は一致しない。一方 $S_{12}=S_{21}=3$ であり、[第二 Piola 応力の対称性](#prop-ctm8-symmetry)と一致する。
<!-- solution-end -->

### A4. ひずみ速度を微分する

$F(t)=\operatorname{diag}(1+t/T,1,1)$（$T>0$ は s、$-T/2<t<T$）とする。$E,\dot E$ を計算し、$t=0$ での値を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\lambda(t)=1+t/T>0$ なので $J=\lambda>0$。$F^TF=\operatorname{diag}(\lambda^2,1,1)$ から [Green–Lagrange ひずみ](../CTM3/index.md#def-ctm3-green-strain)は

$$
E=\frac12\operatorname{diag}(\lambda^2-1,0,0).
$$

$X$ を固定して $\dot\lambda=1/T$ と微分すれば $\dot E=\operatorname{diag}(\lambda/T,0,0)$ s$^{-1}$。$t=0$ では $E=0$、$\dot E=\operatorname{diag}(1/T,0,0)$ s$^{-1}$。ひずみがゼロの瞬間にもその変化率はゼロとは限らない。
<!-- solution-end -->

## Level B

### B1. 基準応力と発散の変換

ある時刻で $\chi(X)=(\lambda X_1,X_2,X_3)$、$\lambda>0$ とし、現在応力 $\sigma(x)=\operatorname{diag}(kx_1,0,0)$、$k$ の単位は Pa/m とする。$P$ と $\operatorname{Div}_XP$ を求め、現在応力の発散からも確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$F=\operatorname{diag}(\lambda,1,1)$、$J=\lambda$、$F^{-T}=\operatorname{diag}(1/\lambda,1,1)$。まず引数を $x_1=\lambda X_1$ としてから掛けると

$$
\sigma\circ\chi=\operatorname{diag}(k\lambda X_1,0,0),
\quad
P=J(\sigma\circ\chi)F^{-T}
=\operatorname{diag}(k\lambda X_1,0,0).
$$

従って $(\operatorname{Div}_XP)_1=\partial_{X_1}(k\lambda X_1)=k\lambda$、残りはゼロ。現在側では $\operatorname{div}_x\sigma=ke_1$ であり、[基準配置の局所運動量方程式](#thm-ctm8-reference-momentum)の右辺は $Jke_1=k\lambda e_1$。$x_1$ と $X_1$ を混同すると $\lambda$ を落とす。
<!-- solution-end -->

### B2. Piola 恒等式を二次元せん断で直接検算する

$\chi(X)=(X_1+f(X_2),X_2,X_3)$、$f$ は $C^2$ 級、$f$ と $X_i$ は m とする。$F,J$ と $K=JF^{-T}$ を求め、各行について $\sum_A\partial_{X_A}K_{jA}=0$ を検算せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$g(X_2):=f'(X_2)$ は無次元である。微分して

$$
F=\begin{pmatrix}1&g&0\\0&1&0\\0&0&1\end{pmatrix},\quad
J=1,\quad
F^{-T}=K=\begin{pmatrix}1&0&0\\-g&1&0\\0&0&1\end{pmatrix}.
$$

第1行の発散は $\partial_{X_1}1+\partial_{X_2}0+\partial_{X_3}0=0$。第2行は

$$
\partial_{X_1}(-g(X_2))+\partial_{X_2}(1)+\partial_{X_3}0=0+0+0=0.
$$

第3行もゼロ。$g$ の変化を $X_1$ 微分したと誤読しない。[Piola 恒等式の導出](#identity-ctm8-piola)における混合微分交換が成立する例である。
<!-- solution-end -->

### B3. 応力の対称性と仕事率

$F=\operatorname{diag}(2,1,1)$、$\dot F=\operatorname{diag}(a,0,0)$（$a$ は s$^{-1}$）、$\sigma=\operatorname{diag}(p,q,r)$ Pa とする。$P,S,\dot E,D$ を求め、仕事率の三表示が一致することを確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$J=2$、$F^{-T}=\operatorname{diag}(1/2,1,1)$ から

$$
P=\operatorname{diag}(p,2q,2r),\quad
S=F^{-1}P=\operatorname{diag}(p/2,2q,2r).
$$

$\dot E=\operatorname{sym}(F^T\dot F)=\operatorname{diag}(2a,0,0)$。また [速度勾配の公式](../CTM4/index.md#prop-ctm4-velocity-deformation)から $L=\dot F F^{-1}=\operatorname{diag}(a/2,0,0)$、従って $D=L$。各二重内積を成分で計算すれば

$$
P:\dot F=pa,\qquad
S:\dot E=(p/2)(2a)=pa,\qquad
J\sigma:D=2p(a/2)=pa.
$$

これは [仕事共役の定理](#thm-ctm8-work-conjugacy)を伸長で検証したもので、$J$ を抜くと $pa/2$ になって誤る。
<!-- solution-end -->

### B4. 失われた仮定を見抜く

$F$ は可逆で $J>0$ とする。

1. $\sigma$ が非対称なら $S$ の対称性はどうなるか。
2. $F$ が任意の可逆行列場で、運動写像の勾配でない場合、発散変換の成分証明のどこが破れるか。具体例として $F(X)=\operatorname{diag}(1+X_2/\ell,1,1)$（$|X_2|<\ell/2$、$\ell>0$）を検討せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

(i) [第二 Piola 応力の対称性の命題](#prop-ctm8-symmetry)の逆向きから、$\sigma\ne\sigma^T$ なら $S\ne S^T$。例えば $F=I_3$、$J=1$ なら $S=\sigma$ なので即座に確かめられる。この場合に古典的な角運動量収支まで仮定してはいけない。

(ii) $g(X_2)=1+X_2/\ell>0$ と置けば $F=\operatorname{diag}(g,1,1)$、$J=g$、$K=JF^{-T}=\operatorname{diag}(1,g,g)$。第2行の発散は $\partial_{X_2}g=1/\ell\ne0$ である。もし $F=D_X\chi$ なら、$\partial_{X_2}F_{11}=\partial_{X_1}F_{12}$ が必要だが、左は $1/\ell$、右は $0$ で矛盾する。従って $F$ はこの領域で運動写像の勾配でなく、[Piola 恒等式の成分証明](#identity-ctm8-piola)を適用できない。$J>0$ だけでは足りない。
<!-- solution-end -->

## Level C

### C1. 時間依存せん断と空間的に一様な応力を一つの物体で確かめる

$\Omega_0$ を有界な直方体とし、$\chi(X,t)=(X_1+\gamma(t)X_2,X_2,X_3)$、$\gamma(0)=0$、$\gamma$ は $C^2$ 級とする。密度は一定の基準密度 $\rho_0>0$、現在応力は $\sigma(x,t)=\begin{pmatrix}0&\tau(t)&0\\\tau(t)&0&0\\0&0&0\end{pmatrix}$ とし、$\tau$ は Pa 単位の $C^1$ 関数である。単位質量当たりの体積力は $b(x,t)=\ddot\gamma(t)x_2e_1$ とする。

$t$ は $\gamma$ とその導関数が有限な範囲を考える。

1. $F,J,\rho,P,S$ を求め、$S$ の対称性を確認せよ。
2. $N=e_2$ の面で Nanson の公式を用い、基準側と現在側の面力ベクトルが一致することを求めよ。
3. $\operatorname{Div}_XP$、$\rho_0\ddot\chi$、$\rho_0b\circ\chi$ を計算して基準運動量式を検算せよ。
4. $D,\dot E$ を求め、三つの仕事率を独立に照合せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(i) [変形勾配の定義](../CTM2/index.md#def-ctm2-deformation-gradient)から

$$
F=\begin{pmatrix}1&\gamma&0\\0&1&0\\0&0&1\end{pmatrix},
\quad J=1>0,\quad
F^{-1}=\begin{pmatrix}1&-\gamma&0\\0&1&0\\0&0&1\end{pmatrix}.
$$

単純せん断は全時刻で単射で、逆写像は $X=(x_1-\gamma x_2,x_2,x_3)$。[質量密度変換](../CTM5/index.md#prop-ctm5-density-jacobian)より $\rho=\rho_0/J=\rho_0$。まず $\sigma F^{-T}$、次に $F^{-1}P$ の順に計算すると

$$
P=\begin{pmatrix}-\gamma\tau&\tau&0\\\tau&0&0\\0&0&0\end{pmatrix},
\quad
S=\begin{pmatrix}-2\gamma\tau&\tau&0\\\tau&0&0\\0&0&0\end{pmatrix}.
$$

$S_{12}=S_{21}=\tau$、他の非対角成分はゼロである。$\gamma\tau\ne0$ なら $P$ は非対称だが、[対称性の命題](#prop-ctm8-symmetry)は $S$ に適用される。

(ii) $N=e_2$ とすると、上の $F^{-1}$ の転置を先に計算することが大切である。

$$
F^{-T}=\begin{pmatrix}1&0&0\\-\gamma&1&0\\0&0&1\end{pmatrix},
\qquad JF^{-T}e_2=e_2.
$$

[Nanson の面積変換公式](../CTM2/index.md#thm-ctm2-nanson)から $n=e_2$、$da=dA$。従って現在側で $\sigma n\,da=\tau e_1\,dA$、基準側で $PN\,dA=Pe_2\,dA=\tau e_1\,dA$ と一致する。

面積と向きの変化を見たい場合、別の面 $N=e_1$ では $JF^{-T}e_1=(1,-\gamma,0)^T$、$da/dA=\sqrt{1+\gamma^2}$、$n=(1,-\gamma,0)^T/\sqrt{1+\gamma^2}$。その面でも $\sigma n\,da=(-\gamma\tau,\tau,0)^TdA=Pe_1\,dA$ となり、力の一致を確認できる。

(iii) $P$ は空間一様で時刻のみの関数なので $\operatorname{Div}_XP=0$。加速度は

$$
\ddot\chi(X,t)=(\ddot\gamma X_2,0,0)^T,\qquad
b(\chi(X,t),t)=(\ddot\gamma X_2,0,0)^T.
$$

よって [基準運動量方程式](#thm-ctm8-reference-momentum)の左辺は $0+\rho_0\ddot\gamma X_2e_1$、右辺も $\rho_0\ddot\gamma X_2e_1$ で一致する。

(iv) $X$ 固定の微分は $\partial_t\chi|_X=(\dot\gamma X_2,0,0)$ である。$x_2=X_2$ を代入した現在側速度 $v(x,t)=(\dot\gamma x_2,0,0)$ を、今度は $x$ 固定で微分すると $L_{12}=\partial_{x_2}v_1=\dot\gamma$、従って $D_{12}=D_{21}=\dot\gamma/2$。一方、[Green–Lagrange ひずみ](../CTM3/index.md#def-ctm3-green-strain) $E=(F^TF-I_3)/2$ は物質座標 $X$ を固定して時間微分するので $\dot E_{12}=\dot E_{21}=\dot\gamma/2$、$\dot E_{22}=\gamma\dot\gamma$。従って

$$
P:\dot F=P_{12}\dot\gamma=\tau\dot\gamma,
$$

$$
S:\dot E=2S_{12}\frac{\dot\gamma}{2}
+S_{22}\gamma\dot\gamma=\tau\dot\gamma,
$$

$$
J\sigma:D=1\cdot2\tau\frac{\dot\gamma}{2}=\tau\dot\gamma.
$$

以上の式はすべて同じ基準体積に対する W/m$^3$ を表す。応力は一様でも面によって traction は異なり、その合力と加速度・仕事率の整合を別々に検査できる。
<!-- solution-end -->
