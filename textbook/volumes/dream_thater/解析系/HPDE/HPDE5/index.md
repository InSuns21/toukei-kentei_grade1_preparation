# HPDE5 主シンボルとnormally hyperbolic作用素

[HPDE4の有限階線形微分作用素](../HPDE4/index.md#def-hpde4-differential-operator)によって束の切断を微分でき、[形式的随伴](../HPDE4/index.md#def-hpde4-formal-adjoint)も調べられるようになりました。しかし「二階作用素である」というだけでは、拡散と波動とを区別できません。**何が波動型で、どの面が波の特性面か**を、低階項に惑わされず判定したいのです。

そのために最高階微分の係数を取り出す**主シンボル**を定めます。その非可逆性から特性を定義し、[Lorentz計量](../../../幾何系/LORG/LORG2/index.md#def-lorg2-lorentz-metric)の光円錐と一致することを証明します。さらに、波動型作用素の一階係数から束接続が**一意に**復元されることを係数比較によって示します。

以下、$M$ は境界のない滑らかな $d$ 次元多様体、$g$ は符号 $(-,+,\ldots,+)$ の滑らかなLorentz計量、$E\to M$ は有限ランク $r\ge1$ の滑らかな実または複素ベクトル束です。$g^{ij}$ は行列 $(g_{ij})$ の逆行列の成分を表します。添字 $i,j,k$ は $0,\ldots,d-1$ を動きます。本章の主定理に時間向き・大域双曲性・束計量は不要です。

## 1. 二階微分のうち枠を替えても残るもの

局所座標 $x=(x^0,\ldots,x^{d-1})$ と $E$ の局所枠を取り、切断の成分を列ベクトル $u$ と書きます。二階線形微分作用素は局所的に

$$
Pu=A^{ij}(x)\partial_i\partial_j u+B^k(x)\partial_k u+C(x)u
$$

と表せます。係数 $A^{ij},B^k,C$ は $r\times r$ 行列値関数です。偏微分は可換なので $A^{ij}$ を $(A^{ij}+A^{ji})/2$ に替えても作用は同じです。以下、$A^{ij}=A^{ji}$ に対称化します。

滑らかな関数 $f$ に対して積の二回微分は

$$
\begin{aligned}
\partial_i\partial_j(fu)
={}&f\partial_i\partial_j u
+(\partial_i f)\partial_j u
+(\partial_j f)\partial_i u\\
&+(\partial_i\partial_j f)u.
\end{aligned}
$$

最高階の二階微分を含むのは最初の項だけです。この事実によって、座標や枠の変更で生じる補正項は一階以下へ落ちます。

<a id="def-hpde5-principal-symbol"></a>
<!-- formal-statement-start -->
> **定義（二階主シンボル）**  
> $P:\Gamma(M,E)\to\Gamma(M,E)$ を二階線形微分作用素とし、その局所表示の対称化された最高階係数を $A^{ij}$ とする。各 $x\in M$ と $\xi=\xi_i dx^i\in T_x^*M$ に対し
>
$$
> \sigma_2(P)(x,\xi)=A^{ij}(x)\xi_i\xi_j
> \in\operatorname{End}(E_x)
$$
>
> を**主シンボル**と呼ぶ。この講義では $\partial_i$ を $\xi_i$ に置換する。Fourier変換での $i\xi_i$ を置換する規約とは符号が異なる。主シンボルは $\xi$ について二次同次である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde5-principal-symbol -->
### 直接例：どの項を無視してよいか

**定義の確認**。$\mathbb R^{1+1}$ の自明実直線束で

$$
P=\partial_t^2-\partial_x^2+5\partial_t+7,\qquad
\xi=\tau\,dt+\zeta\,dx
$$

とすると、$A^{tt}=1$、$A^{xx}=-1$、混合係数は零です。従って

$$
\sigma_2(P)(\xi)=\tau^2-\zeta^2.
$$

例えば $\xi=dt+dx$ なら値は零、$\xi=2dt+dx$ なら $3$ です。一階項 $5\partial_t$ と零次項 $7$ は主シンボルへ入りません。また $\sigma_2(P)(2\xi)=4\sigma_2(P)(\xi)$ となり、二次同次性を直接確認できます。
<!-- definition-example-end -->

<a id="prop-hpde5-symbol-invariance"></a>
<!-- formal-statement-start -->
> **命題（主シンボルの座標・枠不変性）**  
> $P$ の主シンボルは、座標を $x$ から $y$ に、局所枠を $e$ から $e'=eS$（$S$ は可逆行列値関数）に変更しても、同じ $\operatorname{End}(E_x)$ の元を表す。座標変換で $A^{ij}$ は反変二階係数として変換し、枠変換で主シンボルの行列は $S^{-1}\sigma_2(P)S$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

連鎖律で二階微分の係数だけを比較し、枠変換でも $S$ の導関数が一階以下にしか寄与しないことを調べます。

<!-- proof-start -->
### 証明

座標変換 $y=y(x)$ に関する連鎖律は

$$
\partial_{x^i}\partial_{x^j}u
=(\partial_i y^a)(\partial_j y^b)\partial_{y^a}\partial_{y^b}u
+(\partial_i\partial_jy^b)\partial_{y^b}u
$$

です。従って新しい二階係数は $\widetilde A^{ab}=A^{ij}(\partial_i y^a)(\partial_j y^b)$ です。同じ共変ベクトルを $\xi=\xi_i dx^i=\eta_a dy^a$ と書けば $\xi_i=\eta_a\partial_i y^a$ なので

$$
A^{ij}\xi_i\xi_j
=A^{ij}(\partial_i y^a)(\partial_j y^b)\eta_a\eta_b
=\widetilde A^{ab}\eta_a\eta_b.
$$

枠 $e'=eS$ における成分 $v$ の旧成分は $Sv$ です。積の微分から

$$
\partial_i\partial_j(Sv)
=S\partial_i\partial_jv
+(\partial_iS)\partial_jv+(\partial_jS)\partial_iv
+(\partial_i\partial_jS)v.
$$

$P$ の新枠での行列作用素は $S^{-1}PS$ なので、二階係数は $S^{-1}A^{ij}S$ です。これは同じ束自己準同型を異なる基底で表す共役変換であり、主シンボルの定義が大域的に意味を持ちます。
<!-- proof-end -->

## 2. 特性方向は主シンボルの「非可逆性」で決める

主シンボルは各共変ベクトル $\xi$ に対する行列です。行列が非可逆となる方向こそ、二階の方程式がその法線方向に微分を解くとき特別扱いを要する方向です。

<a id="def-hpde5-characteristic"></a>
<!-- formal-statement-start -->
> **定義（特性共変ベクトルと特性超曲面）**  
> 二階線形微分作用素 $P$ に対して非零の $\xi\in T_x^*M$ が**特性共変ベクトル**であるとは、$\sigma_2(P)(x,\xi):E_x\to E_x$ が可逆でないことをいう。これらの全体を特性集合と呼ぶ。滑らかな超曲面が局所的に $S=\{\varphi=0\}$、$d\varphi\ne0$ と表され、各点で $d\varphi$ が特性共変ベクトルなら $S$ を**特性超曲面**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde5-characteristic -->
### 直接例：特性面と非特性面

**定義の確認**。共変ベクトル $d\varphi$ は局所座標 $(t,x)$ では $(\partial_t\varphi)dt+(\partial_x\varphi)dx$ と表され、その成分を主シンボルへ代入します。任意の実定数 $c$ に対して $\varphi_c=t-x-c$ と置くと、零点集合は $S_c=\{t-x=c\}$ で、各点で $d\varphi_c=dt-dx\ne0$ です。したがって

$$
\sigma_2(P)(d\varphi_c)=1^2-(-1)^2=0
$$

となり、$S_c$ は特性超曲面です。一方 $\psi_c=t-c$ の零点集合 $\{t=c\}$ では $d\psi_c=dt\ne0$ であり、

$$
\sigma_2(P)(d\psi_c)=1^2-0^2=1
$$

なので非特性です。いずれも実直線束の自己準同型であり、局所枠での $1\times1$ 行列はスカラー倍です。よって値が零なら非可逆、非零なら逆数によって可逆となり、定義の二つの条件（非零法共変ベクトルと主シンボルの非可逆性）を直接確認できました。
<!-- definition-example-end -->

$\xi=0$ を除外したのは、二次同次性によってすべての二階作用素で $\sigma_2(P)(x,0)=0$ となるからです。一般の行列値作用素では「非可逆」と「零行列」は同値ではありません。例えば $\operatorname{diag}(1,0)$ は零行列ではないのに非可逆です。

## 3. 光円錐を特性集合にする作用素

[LORG2のLorentz計量](../../../幾何系/LORG/LORG2/index.md#def-lorg2-lorentz-metric)は、各点で非退化な対称行列 $g_{ij}$ を持ちます。その逆行列 $g^{ij}$ は共変ベクトル上の二次形式

$$
g^{-1}(\xi,\eta)=g^{ij}\xi_i\eta_j
$$

を定めます。これと最高階係数が一致する（ただし符号は負の）作用素を考えます。

<a id="def-hpde5-normally-hyperbolic"></a>
<!-- formal-statement-start -->
> **定義（normally hyperbolic作用素）**  
> 滑らかなLorentz多様体 $(M,g)$ 上の有限ランク実または複素ベクトル束 $E$ に対して、二階線形微分作用素 $P:\Gamma(M,E)\to\Gamma(M,E)$ が**normally hyperbolic**であるとは、すべての $x\in M$ と $\xi\in T_x^*M$ について
>
$$
> \sigma_2(P)(x,\xi)
> =-g_x^{-1}(\xi,\xi)\operatorname{id}_{E_x}
$$
>
> を満たすことをいう。低階係数や形式的自己随伴性に条件を課さない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde5-normally-hyperbolic -->
### 直接例：Klein–Gordonと任意の低階摂動

**定義の確認**。$\mathbb R^{1+n}$ 上の $g=-dt^2+\sum_{a=1}^n(dx^a)^2$ に対し $E$ を自明ランク $r$ 束とし、行列値の滑らかな $B^i,C$ で

$$
P=(\partial_t^2-\sum_a\partial_{x^a}^2)I_r+B^i\partial_i+C
$$

とおきます。二階係数から

$$
\sigma_2(P)(\tau\,dt+\zeta_a dx^a)
=(\tau^2-\sum_a\zeta_a^2)I_r
=-g^{-1}(\xi,\xi)I_r
$$

となるため、任意の $B^i,C$ について定義を満たします。とくに $B^i=0$、$C=m^2I_r$（$m^2\ge0$）なら $P=-\Box_g+m^2$ というKlein–Gordon型の作用素です。質量 $m$ の有無は最高階係数を変えません。
<!-- definition-example-end -->

<a id="prop-hpde5-null-characteristics"></a>
<!-- formal-statement-start -->
> **命題（光的特性の一致）**  
> $(M,g)$ を符号 $(-,+,\ldots,+)$ の滑らかなLorentz多様体、$E$ を正の有限ランクの滑らかなベクトル束とする。$E$ 上の作用素 $P$ がnormally hyperbolicなら、非零共変ベクトル $\xi$ が特性であることと
>
$$
> g_x^{-1}(\xi,\xi)=0
$$
>
> は同値である。さらに $\xi^\sharp=g^{ij}\xi_j\partial_i$ は非零の光的接ベクトルであり、特性超曲面は法共変ベクトルが光的となる超曲面に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

主シンボルが恒等写像のスカラー倍なので、可逆性をスカラーの零・非零へ落とします。その後、Lorentz計量を用いて共変ベクトルと接ベクトルの長さを対応させます。

<!-- proof-start -->
### 証明

$\lambda=-g^{-1}(\xi,\xi)$ とおくと $\sigma_2(P)(x,\xi)=\lambda I_r$ です。$\lambda\ne0$ なら逆行列は $\lambda^{-1}I_r$、$\lambda=0$ なら零行列となり、$r\ge1$ より非可逆です。従って特性条件は $\lambda=0$ と同値です。

計量の非退化性から $\xi^\sharp=0$ なら $\xi=0$ です。また

$$
\begin{aligned}
g(\xi^\sharp,\xi^\sharp)
&=g_{ab}(g^{ai}\xi_i)(g^{bj}\xi_j)\\
&=\delta_b^{\,i}g^{bj}\xi_i\xi_j
=g^{ij}\xi_i\xi_j
=g^{-1}(\xi,\xi).
\end{aligned}
$$

従って $\xi$ の非零性を保ったまま光的条件が一致します。[LORG1の因果型](../../../幾何系/LORG/LORG1/index.md#def-lorg1-causal-type)によって光的ベクトルと呼べます。超曲面については $\xi=d\varphi$ として同じ同値を適用すれば証明できます。
<!-- proof-end -->

Minkowski平面では特性方程式 $\tau^2-\zeta^2=(\tau-\zeta)(\tau+\zeta)=0$ が二つの光的方向を表します。ただし、主シンボルから分かるのは**特性の幾何**までです。解の存在・一意性・有限伝播は後のエネルギー法とCauchy理論で証明する必要があります。「非特性」と「Cauchy面」も同じ意味ではありません。時間的超曲面の法が空間的でも非特性であり得ます。

## 4. なぜ波動作用素に一意な接続が隠れているのか

[HPDE4の束接続](../HPDE4/index.md#def-hpde4-connection)を $\nabla_i=\nabla^E_{\partial_i}$ と書き、[LORG4のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)の係数を $\nabla^{LC}_{\partial_i}\partial_j=\Gamma^k{}_{ij}\partial_k$ とします。二階微分は座標ベクトル自身の変化も補正する必要があるため

$$
\Box_g^\nabla u
=g^{ij}\bigl(\nabla_i\nabla_j u-\Gamma^k{}_{ij}\nabla_k u\bigr)
$$

とおきます。任意の局所枠で $\nabla_i u=\partial_i u+\omega_i u$ とすると

$$
\begin{aligned}
\nabla_i\nabla_j u
={}&\partial_i\partial_j u+\omega_j\partial_i u
+\omega_i\partial_j u\\
&+(\partial_i\omega_j+\omega_i\omega_j)u.
\end{aligned}
$$

従って二階・一階・零階に分けると

$$
\begin{aligned}
-\Box_g^\nabla u
={}&-g^{ij}\partial_i\partial_j u\\
&+\bigl(-2g^{ik}\omega_i+g^{ij}\Gamma^k{}_{ij}I_r\bigr)\partial_k u\\
&-g^{ij}\bigl(\partial_i\omega_j+\omega_i\omega_j
-\Gamma^k{}_{ij}\omega_k\bigr)u.
\end{aligned}
$$

この補正によって座標に依存しないことも確かめます。[束接続](../HPDE4/index.md#def-hpde4-connection)と[Lorentz計量のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)を使い、

$$
H^\nabla(X,Y)u
:=\nabla_X^E(\nabla_Y^Eu)-\nabla_{\nabla_X^{LC}Y}^Eu
$$

と定めます。滑らかな関数 $f$ に対して

$$
\begin{aligned}
H^\nabla(X,fY)u
&=\nabla_X^E(f\nabla_Y^Eu)
-\nabla_{X(f)Y+f\nabla_X^{LC}Y}^Eu\\
&=X(f)\nabla_Y^Eu+f\nabla_X^E\nabla_Y^Eu
-X(f)\nabla_Y^Eu-f\nabla_{\nabla_X^{LC}Y}^Eu\\
&=fH^\nabla(X,Y)u
\end{aligned}
$$

です。第一変数についても $H^\nabla(fX,Y)u=fH^\nabla(X,Y)u$ となるので、$H^\nabla$ は二つのベクトル場についてテンソル的です。座標基底では $H^\nabla(\partial_i,\partial_j)u=\nabla_i\nabla_ju-\Gamma^k{}_{ij}\nabla_ku$ となり、逆計量による縮約 $g^{ij}H^\nabla(\partial_i,\partial_j)u$ は座標に依存しません。

最高階の係数は $\omega_i$ と無関係です。逆に一階の係数が与えられたとき、ここから $\omega_i$ を解けることが本章の主結果です。

<a id="thm-hpde5-unique-connection"></a>
<!-- formal-statement-start -->
> **定理（接続と零次自己準同型への一意分解）**  
> $(M,g)$ を滑らかなLorentz多様体、$E\to M$ を有限ランクの滑らかな実または複素ベクトル束、$P:\Gamma(M,E)\to\Gamma(M,E)$ をnormally hyperbolic作用素とする。このとき $E$ 上の滑らかな接続 $\nabla^P$ と滑らかな自己準同型 $V\in\Gamma(\operatorname{End}E)$ が一意に存在し、任意の切断 $u$ に対して
>
$$
> Pu=-g^{ij}\bigl(\nabla_i^P\nabla_j^Pu
> -\Gamma^k{}_{ij}\nabla_k^Pu\bigr)+Vu
> =-\Box_g^{\nabla^P}u+Vu
$$
>
> が成立する。$\Gamma^k{}_{ij}$ は $g$ のLevi-Civita接続の係数である。束計量・形式的自己随伴性・大域双曲性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

最初に局所係数を次数ごとに比較します。一階係数の式を逆計量で解けば接続が決まり、差の零次係数を $V$ に入れられます。最後に、局所接続の一意性を用いて重なりで一致することを示します。

<!-- proof-start -->
### 証明

局所座標と枠を固定し、最初の節の対称な二階係数を $B^{ij}=B^{ji}$ とします。[normally hyperbolic性](#def-hpde5-normally-hyperbolic)から、どの共変ベクトル $\xi$ に対しても

$$
(B^{ij}+g^{ij}I_r)\xi_i\xi_j=0
$$

です。$D^{ij}=B^{ij}+g^{ij}I_r$ と置き、まず $\xi=dx^i$ を代入すると $D^{ii}=0$、異なる $i,j$ に対して $\xi=dx^i+dx^j$ を代入すると

$$
0=D^{ii}+D^{ij}+D^{ji}+D^{jj}=2D^{ij}
$$

となります。実数体・複素数体のいずれでも $2$ は可逆なので $D^{ij}=0$ です。つまり全二階係数が $B^{ij}=-g^{ij}I_r$ と決まり、作用素は

$$
Pu=-g^{ij}\partial_i\partial_j u+A^k\partial_k u+Cu
$$

と書けます。$\omega_i$ を未知の接続係数として上の展開と一階係数を比較すると

$$
A^k=-2g^{ik}\omega_i+g^{ij}\Gamma^k{}_{ij}I_r.
$$

両辺へ $g_{\ell k}$ を掛けて $k$ を縮約すれば

$$
g_{\ell k}A^k=-2\omega_\ell
+g_{\ell k}g^{ij}\Gamma^k{}_{ij}I_r.
$$

従って候補は必ず

$$
\boxed{\omega_\ell=\frac12g_{\ell k}
\bigl(g^{ij}\Gamma^k{}_{ij}I_r-A^k\bigr)}
$$

です。この行列値一形式は滑らかです。続いて零次係数を合わせるため

$$
\boxed{V=C+g^{ij}\bigl(\partial_i\omega_j+\omega_i\omega_j
-\Gamma^k{}_{ij}\omega_k\bigr)}
$$

と置きます。代入すると二階、一階、零階のすべての係数が $P$ と一致します。これで**局所存在**が示されました。

**局所一意性**を証明します。同じ $P$ を与える二つの接続係数の差を $\Theta_i=\widehat\omega_i-\omega_i$ とすると、一階係数の差は $-2g^{ik}\Theta_i$ です。同じ作用素だからすべての $k$ で $-2g^{ik}\Theta_i=0$。$g_{\ell k}$ を掛けて縮約すると $\Theta_\ell=0$ です。従って二つの接続は一致し、零次係数比較から $\widehat V=V$ も従います。

**貼り合わせ**を確かめます。異なる座標・枠の重なる領域で、一方から作った接続を他方の枠に移すと[HPDE4の接続の枠変換則](../HPDE4/index.md#prop-hpde4-gauge-rule)を満たします。先に $H^\nabla$ の両変数について確認したテンソル性により、その逆計量との縮約は座標不変です。従って変換後も同じ大域的作用素 $P$ の接続分解となります。ここに局所一意性を適用すると、変換後の接続・零次項は他方で構成したものに一致します。よって局所解は貼り合わさり、大域的な $\nabla^P,V$ を定めます。大域一意性も局所一意性から従います。
<!-- proof-end -->

### 定義と係数公式の直接計算

Minkowski平面で $g=-dt^2+dx^2$ とすると $\Gamma^k{}_{ij}=0$ です。自明実直線束上の

$$
P=\partial_t^2-\partial_x^2+2\partial_t+3
$$

に対し $A^t=2$、$A^x=0$、$g_{tt}=-1$ なので

$$
\omega_t=\tfrac12(-1)(-2)=1,\qquad\omega_x=0.
$$

これを戻すと

$$
-\Box_g^{\nabla^P}
=(\partial_t+1)^2-\partial_x^2
=\partial_t^2-\partial_x^2+2\partial_t+1.
$$

零次項は元の $3$ とこの $1$ の差で $V=2$ です。実際

$$
P=(\partial_t+1)^2-\partial_x^2+2.
$$

この計算は接続係数が恣意的ではなく、一階係数から強制されることを示します。

### 曲がった計量でも確かめる

$g=e^{2\phi(t,x)}(-dt^2+dx^2)$ とおきます。$\phi$ は滑らかな実関数です。$\eta=\operatorname{diag}(-1,1)$ とすると、$g_{ij}=e^{2\phi}\eta_{ij}$、$g^{ij}=e^{-2\phi}\eta^{ij}$ です。[Lorentz計量のLevi-Civita接続とKoszul表示](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)の局所係数公式に

$$
\partial_i g_{j\ell}=2e^{2\phi}(\partial_i\phi)\eta_{j\ell}
$$

を代入し、$e^{2\phi}$ と $e^{-2\phi}$ を相殺すると

$$
\Gamma^k{}_{ij}
=\delta_i^k\partial_j\phi+\delta_j^k\partial_i\phi
-\eta_{ij}\eta^{k\ell}\partial_\ell\phi.
$$

$g^{ij}=e^{-2\phi}\eta^{ij}$ を使って縮約すると

$$
g^{ij}\Gamma^k{}_{ij}
=e^{-2\phi}(2-2)\eta^{k\ell}\partial_\ell\phi=0.
$$

従ってこの**二次元**模型では $\Box_g f=e^{-2\phi}(-\partial_t^2+\partial_x^2)f$ です。$P=-\Box_g+m^2$ の係数比較で $A^t=A^x=0$、$\omega_t=\omega_x=0$、$V=m^2$ を得ます。一般次元では係数 $2-d$ が残るため、同じ簡略化をそのまま使うことはできません。

## 5. 二重交換子から主シンボルを再現する

関数の乗法と作用素との交換子を $[P,f]u=P(fu)-fPu$ と書きます。二階の作用素を関数と交換すると一階になり、もう一度交換すると零階になります。その零階係数に逆計量が現れます。

<a id="prop-hpde5-double-commutator"></a>
<!-- formal-statement-start -->
> **命題（二重交換子と逆計量）**  
> $(M,g)$ の有限ランク束上のnormally hyperbolic作用素 $P$ と滑らかな実関数 $f,h$ に対して、任意の滑らかな切断 $u$ は
>
$$
> [[P,f],h]u=-2g^{-1}(df,dh)u
$$
>
> を満たす。右辺は零次のスカラー倍作用素で、接続と零次項の選び方には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

接続の積の規則を二回適用し、一回目の交換子が一階、二回目が零階になる過程を式で追います。

<!-- proof-start -->
### 証明

[接続分解定理](#thm-hpde5-unique-connection)により $P=-\Box_g^\nabla+V$ です。[接続のLeibniz則](../HPDE4/index.md#def-hpde4-connection)を二回適用すると

$$
\begin{aligned}
\nabla_i\nabla_j(fu)-\Gamma^k{}_{ij}\nabla_k(fu)
={}&f(\nabla_i\nabla_j u-\Gamma^k{}_{ij}\nabla_k u)\\
&+(\partial_i f)\nabla_j u+(\partial_j f)\nabla_i u\\
&+(\partial_i\partial_jf-\Gamma^k{}_{ij}\partial_k f)u.
\end{aligned}
$$

$g^{ij}$ で縮約し、$V$ は関数の乗法と可換なことを用いると

$$
[P,f]u=-2g^{ij}(\partial_i f)\nabla_j u-(\Box_g f)u.
$$

第二項は $h$ の乗法と可換です。一階項の積の規則 $\nabla_j(hu)-h\nabla_j u=(\partial_jh)u$ から

$$
\begin{aligned}
[[P,f],h]u
&=-2g^{ij}(\partial_i f)
\{\nabla_j(hu)-h\nabla_j u\}\\
&=-2g^{ij}(\partial_i f)(\partial_jh)u
=-2g^{-1}(df,dh)u.
\end{aligned}
$$
<!-- proof-end -->

特に $f=h$ とすると $[[P,f],f]=-2g^{-1}(df,df)I$ です。これは符号規約を検算する便利な式でもあります。

## 6. 接続分解の一意性は自己随伴性を意味しない

[HPDE4の形式的随伴](../HPDE4/index.md#def-hpde4-formal-adjoint)は**束計量と密度**を選んで初めて定まりました。一方、前節までの定理はこれらを使っていません。従って作用素の接続分解が一意でも、形式的自己随伴とは限りません。

実際、$\mathbb R^{1+1}$ の標準密度と標準実束計量で

$$
P=\partial_t^2-\partial_x^2+2\partial_t+3
$$

を考えると、既に求めた接続は $\nabla_t=\partial_t+1$、$\nabla_x=\partial_x$ と一意です。しかしコンパクト台関数の部分積分では二階微分は二回の符号反転、一階微分は一回の符号反転を受けるので

$$
P^*=\partial_t^2-\partial_x^2-2\partial_t+3\ne P.
$$

また[HPDE4の計量両立条件](../HPDE4/index.md#def-hpde4-metric-compatible-connection)に照らし、$\nabla_t$ が標準束計量と両立しないことも

$$
(\nabla_tu)v+u(\nabla_tv)
=\partial_t(uv)+2uv
$$

と直接検査できます。失われた仮定は計量両立性であり、接続の一意性が破れたわけではありません。対照的に $\partial_t^2-\partial_x^2+m^2$ は自己随伴ですが、**両者の主シンボルは同じ**です。主シンボルは最高階の幾何を測り、形式的随伴性は低階係数・計量・密度も調べるのです。

## 7. 演習：特性と接続を判定する

### A1. 最高階係数と特性性

- Level: A
- 問題：$\mathbb R^{1+2}$ の実直線束で $P=\partial_t^2-4\partial_x^2-\partial_y^2+3\partial_y+1$ とする。主シンボルを計算し、$\xi=(2,1,0)$、$\eta=(2,0,1)$ の特性性を判定せよ。また標準Minkowski計量 $-dt^2+dx^2+dy^2$ に対してnormally hyperbolicか。

<!-- solution-start -->
**詳細解答**

[二階主シンボル](#def-hpde5-principal-symbol)で一階・零次を捨てると

$$
\sigma_2(P)(\tau,\zeta,\upsilon)=\tau^2-4\zeta^2-\upsilon^2.
$$

$\sigma_2(P)(2,1,0)=4-4=0$ だから特性、$\sigma_2(P)(2,0,1)=4-1=3$ だから非特性です。標準Minkowski計量については $-g^{-1}(\xi,\xi)=\tau^2-\zeta^2-\upsilon^2$ なので、$\zeta^2$ の係数が異なります。従って指定された計量についてnormally hyperbolicではありません。
<!-- solution-end -->

### A2. 直線の特性判定

- Level: A
- 問題：$P=\partial_t^2-\partial_x^2+m^2$ に対し $S_a=\{t-ax=0\}$ が特性超曲面になる実数 $a$ をすべて求めよ。

<!-- solution-start -->
**詳細解答**

$\varphi=t-ax$ とすると $d\varphi=dt-a\,dx\ne0$ です。[光的特性の命題](#prop-hpde5-null-characteristics)に従い

$$
\sigma_2(P)(d\varphi)=1-a^2.
$$

従って特性である条件は $1-a^2=0$、すなわち $a=1,-1$ です。$m^2$ は零次なのでこの方程式に現れません。
<!-- solution-end -->

### A3. 一階係数から接続を求める

- Level: A
- 問題：Minkowski平面で $P=\partial_t^2-\partial_x^2+6\partial_t+8$ を接続と零次項へ分解し、元の式へ戻して検算せよ。

<!-- solution-start -->
**詳細解答**

Minkowski計量のChristoffel係数は零です。[接続分解の係数公式](#thm-hpde5-unique-connection)に $g_{tt}=-1$、$A^t=6$、$A^x=0$ を代入すると

$$
\omega_t=\tfrac12(-1)(-6)=3,\qquad \omega_x=0.
$$

すると

$$
-\Box_g^\nabla=(\partial_t+3)^2-\partial_x^2
=\partial_t^2-\partial_x^2+6\partial_t+9.
$$

従って $V=8-9=-1$ です。$-\Box_g^\nabla+V$ の零次係数は $9-1=8$ となり、二階・一階も含めて元の作用素に一致します。
<!-- solution-end -->

### A4. 非可逆と零行列の相違

- Level: A
- 問題：自明ランク2束上の $Q=\operatorname{diag}(\partial_t^2,\partial_x^2)$ の主シンボルを求め、$\xi=dt$ は特性か。主シンボルが零行列である必要はあるか。

<!-- solution-start -->
**詳細解答**

$$
\sigma_2(Q)(\tau,\zeta)=
\begin{pmatrix}\tau^2&0\\0&\zeta^2\end{pmatrix}.
$$

$dt$ では $\tau=1,\zeta=0$ なので行列は $\operatorname{diag}(1,0)$ です。非零の $(0,1)^{\mathsf T}$ が核に入るため非可逆で、[特性の定義](#def-hpde5-characteristic)により特性です。しかし零行列ではありません。さらに二つの対角成分は一般に異なるため、標準Minkowski計量のスカラー倍恒等主シンボルにも一致しません。
<!-- solution-end -->

### B1. ランク2の接続を復元する

- Level: B
- 問題：Minkowski平面の自明複素ランク2束で $D=\operatorname{diag}(2,-2)$ とし $P=(\partial_t^2-\partial_x^2)I_2+D\partial_t+5I_2$ とする。接続行列と零次自己準同型を求め、展開して確認せよ。

<!-- solution-start -->
**詳細解答**

一階係数は $A^t=D$、$A^x=0$ です。[接続の一意分解公式](#thm-hpde5-unique-connection)に $g_{tt}=-1$、$g_{xx}=1$、$\Gamma^k{}_{ij}=0$ を代入すると

$$
\omega_t=\tfrac12(-1)(-D)
=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad \omega_x=0.
$$

定数行列ゆえ $\partial_t\omega_t=0$、また $\omega_t^2=I_2$ なので

$$
-\Box_g^\nabla
=(\partial_tI_2+\omega_t)^2-\partial_x^2I_2
=(\partial_t^2-\partial_x^2)I_2+D\partial_t+I_2.
$$

従って $V=5I_2-I_2=4I_2$ です。加えると元の $P$ の三種類の係数が一致し、非スカラーな接続でも定理を使えると確認できます。
<!-- solution-end -->

### B2. 二重交換子を直接計算する

- Level: B
- 問題：$\mathbb R^{1+1}$ で $P=\partial_t^2-\partial_x^2+a(t,x)\partial_t+b(t,x)$、$f=t+x$、$h=t-2x$ とする。$[[P,f],h]$ を積の微分で計算し、二重交換子の命題と照合せよ。

<!-- solution-start -->
**詳細解答**

積の微分を各項で計算すると

$$
[P,f]u
=2(\partial_tf)\partial_tu-2(\partial_xf)\partial_xu
+(\partial_t^2f-\partial_x^2f+a\partial_tf)u.
$$

$f=t+x$ より $\partial_tf=\partial_xf=1$、二階微分は零なので $[P,f]=2\partial_t-2\partial_x+a$ です。零次項 $a$ は乗法 $h$ と可換ですから

$$
\begin{aligned}
[[P,f],h]u
&=2\{\partial_t(hu)-h\partial_tu\}
-2\{\partial_x(hu)-h\partial_xu\}\\
&=(2\partial_th-2\partial_xh)u
=(2-2(-2))u=6u.
\end{aligned}
$$

他方 $g^{-1}(df,dh)=-(1)(1)+(1)(-2)=-3$ ですから、[命題](#prop-hpde5-double-commutator)の右辺は $-2(-3)u=6u$ と一致します。
<!-- solution-end -->

### B3. 曲がった時空の接続係数

- Level: B
- 問題：$\mathbb R^{1+1}$ に $g=e^{2t}(-dt^2+dx^2)$ を入れ、$P=e^{-2t}(\partial_t^2-\partial_x^2)+4\partial_x+1$ を考える。normally hyperbolic性と接続分解を判定せよ。本章の二次元共形模型で得た $g^{ij}\Gamma^k{}_{ij}=0$ を使ってよい。

<!-- solution-start -->
**詳細解答**

逆計量は $g^{tt}=-e^{-2t}$、$g^{xx}=e^{-2t}$ なので二階係数は $-g^{ij}$ に一致します。ゆえにnormally hyperbolicです。一階係数は $A^t=0$、$A^x=4$、$g_{xx}=e^{2t}$ です。[定理](#thm-hpde5-unique-connection)の式で

$$
\omega_t=0,\qquad
\omega_x=\tfrac12e^{2t}(0-4)=-2e^{2t}.
$$

$\partial_x\omega_x=0$、$\omega_t=0$、Christoffel縮約も零ですから

$$
V=1+g^{xx}\omega_x^2
=1+e^{-2t}\cdot4e^{4t}
=1+4e^{2t}.
$$

実際に

$$
-\Box_g^\nabla
=e^{-2t}\bigl(\partial_t^2-(\partial_x-2e^{2t})^2\bigr)
=e^{-2t}(\partial_t^2-\partial_x^2)+4\partial_x-4e^{2t}
$$

と展開でき、$V$ を加えると元の $P$ に一致します。$\partial_x(e^{2t})=0$ を用いた点にも注意します。
<!-- solution-end -->

### C1. 特性・接続・随伴をまとめて比較する

- Level: C
- 問題：Minkowski平面と標準実束計量・標準密度において $P_a=\partial_t^2-\partial_x^2+2a\partial_t+q(t,x)$ とする。$a$ は実定数、$q$ は滑らかな実関数である。次の問いに答えよ。
  1. 特性共変ベクトルを求めよ。
  2. 一意な接続と零次項 $V$ を求めよ。
  3. 形式的随伴 $P_a^*$ を部分積分で計算し、$P_a=P_a^*$ の必要十分条件を示せ。
  4. 接続分解の一意性と自己随伴性が別の条件である理由を説明せよ。

<!-- solution-start -->
**詳細解答**

(1) [二階主シンボル](#def-hpde5-principal-symbol)から

$$
\sigma_2(P_a)(\tau,\zeta)=\tau^2-\zeta^2=-g^{-1}(\xi,\xi).
$$

従って $a,q$ にかかわらずnormally hyperbolicで、非零共変ベクトルが特性になる必要十分条件は $\tau=\zeta$ または $\tau=-\zeta$ です。

(2) $A^t=2a$、$A^x=0$、Christoffel係数は零です。[一意分解の公式](#thm-hpde5-unique-connection)で

$$
\omega_t=\tfrac12(-1)(-2a)=a,\qquad \omega_x=0.
$$

$a$ は定数なので

$$
-\Box_g^\nabla=(\partial_t+a)^2-\partial_x^2
=\partial_t^2-\partial_x^2+2a\partial_t+a^2,
\qquad V=q-a^2.
$$

(3) コンパクト台の滑らかな実関数 $u,v$ に対し、二階項は二回部分積分することで

$$
\int(\partial_t^2u-\partial_x^2u)v
=\int u(\partial_t^2v-\partial_x^2v)
$$

となります。一階項は一回部分積分して $\int(2a\partial_tu)v=-\int u(2a\partial_tv)$ です。$q$ は実数値なので零次乗法の随伴はそのままです。従って

$$
P_a^*=\partial_t^2-\partial_x^2-2a\partial_t+q,\qquad
P_a-P_a^*=4a\partial_t.
$$

$\partial_tu$ が零でないコンパクト台関数を選べるので $P_a=P_a^*$ の必要十分条件は $a=0$ です。

(4) (2) の接続の一意性は一階係数と非退化なLorentz計量から定まり、束計量を要しません。(3) は束計量と密度に関する部分積分を用います。実際 $a\ne0$ でも接続は一意に定まりますが $P_a\ne P_a^*$ です。
<!-- solution-end -->

---

## 8. 次章へ：どの超曲面に初期データを置くか

主シンボルは光的特性を識別し、一階係数は接続を一意に決めました。しかし特性でない面がすべてCauchy面というわけではありません。HPDE6では、空間的Cauchy超曲面の法線・初期変位・法線微分・関数空間を具体的に定め、初期値問題への道を開きます。
