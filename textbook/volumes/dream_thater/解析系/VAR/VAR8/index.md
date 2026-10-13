# VAR8 極小曲面の第二変分と安定性

[VAR7の面積第一変分](../VAR7/index.md#thm-var7-first-variation)は、固定境界の曲面が停留する条件を平均曲率 $H=0$ として与えました。しかし、停留する曲面を少し押したとき、面積は増えるのでしょうか。平面も懸垂面も $H=0$ ですが、二つの輪を結ぶ懸垂面は輪の間隔によって不安定になります。第一変分だけではこの違いを見分けられません。

本章では、固定境界の**法線方向の第二変分**を計量の微分から導き、面積が減少する変形の有無を二次形式として判定します。その二次形式を積分の形で書き直すと Jacobi 作用素が現れます。最後に懸垂面を計算して、同じ極小曲面でも切り取る高さによって安定性が変わることを証明します。

## 1. 停留と安定を区別する

$\Sigma$ は $\mathbb R^3$ 内のコンパクトで向き付け可能な $C^4$ 埋め込み曲面、境界は滑らかで、単位法線 $N$ を一つ選びます。$S=-dN$ を形作用素、$2H=\operatorname{tr}S$、$|A|^2=\operatorname{tr}(S^2)=\kappa_1^2+\kappa_2^2$ と書きます。符号は [GEO10の形作用素](../../../幾何系/GEO/GEO10/index.md#def-geo10-shape-operator)および [VAR7の符号規約](../VAR7/index.md#thm-var7-first-variation)と同じです。

面積停留を仮定すると $H=0$ です。境界を点ごとに固定する滑らかな方向 $f$ は $f|_{\partial\Sigma}=0$ を満たします。まず
$$
X_t(p)=X(p)+tf(p)N(p)
$$
という正規方向の変形を考えます。$X_t$ が十分小さい $|t|$ で正則かつ埋め込みであることは、コンパクト性と正則性から従います。変形を通した面積を $A(t)$ とします。

変形方向を一つ決めて見た一変数関数 $A(t)$ では、$A'(0)=0$ が停留、$A''(0)<0$ は $t=0$ が局所最小でないことの証拠です。[VAR2の局所最小性の必要条件](../VAR2/index.md#thm-var2-necessary)により、局所最小なら全ての許容方向で $A''(0)\ge0$ でなければなりません。ただし全方向で $A''(0)\ge0$ だけから強い意味の局所最小性は導けません。

<a id="def-var8-stability"></a>
<!-- formal-statement-start -->
> **定義（固定境界の安定・不安定な極小曲面）**  
> $\Sigma\subset\mathbb R^3$ を滑らかな境界を持つコンパクトな向き付け可能極小曲面とする。全ての滑らかな実数値 $f$ で $f|_{\partial\Sigma}=0$ に対し、法線変分 $X_t=X+tfN$ の面積が $A''(0)\ge0$ を満たすとき、$\Sigma$ を**固定境界で安定**という。あるそのような $f$ で $A''(0)<0$ なら**不安定**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var8-stability -->
**定義の確認（平面円板）**。$X(x,y)=(x,y,0)$、$N=(0,0,1)$、$f|_{\partial D}=0$ とすると
$$
A(t)=\int_D\sqrt{1+t^2|\nabla f|^2}\,dx\,dy.
$$
よって $A'(0)=0$、$A''(0)=\int_D|\nabla f|^2\,dx\,dy\ge0$ です。任意の固定境界方向で非負なので円板は安定です。しかも $A(t)\ge |D|$ が全ての $t$ で成り立ちますが、これは今調べたグラフ変形についての主張です。
<!-- definition-example-end -->

**変分クラスが重要です。** 固定境界の安定性は、支持面上で境界を動かせる自由境界の安定性と違います。後者の第二変分には支持面の曲率を含む境界項が現れます。以下では境界上で $f=0$ に統一します。

## 2. 計量を二回微分して第二変分を導く

曲面変分の内部微分を省略すると、面積の二階微分でなぜ「勾配の正項」と「曲率の負項」が現れるか見えません。局所座標 $(u^1,u^2)$ で $X_i=\partial_iX$、$N_i=\partial_iN$ と置き、
$$
g_{ij}=\langle X_i,X_j\rangle,\quad
b_{ij}=\langle X_{ij},N\rangle=-\langle X_i,N_j\rangle
$$
とします。接ベクトルの変形は
$$
\partial_iX_t=X_i+t(f_iN+fN_i).
$$
法線 $N$ と接ベクトル $X_i,N_j$ の直交性から、一階項と二階項を分けると
$$
g_{ij}(t)=g_{ij}-2tfb_{ij}
+t^2\bigl(f_if_j+f^2\langle N_i,N_j\rangle\bigr).
$$
さらに $N_i=-S_i^{\,k}X_k$、$S_i^{\,k}=b_{i\ell}g^{\ell k}$ を使えば
$$
\langle N_i,N_j\rangle=b_{ik}g^{k\ell}b_{\ell j}.
$$

<a id="thm-var8-second-variation"></a>
<!-- formal-statement-start -->
> **定理（極小曲面の面積第二変分）**  
> $\Sigma\subset\mathbb R^3$ を $C^4$ のコンパクトな向き付け可能極小曲面とし、$S=-dN$、$|A|^2=\operatorname{tr}(S^2)$ とする。任意の滑らかな $f$ で $f|_{\partial\Sigma}=0$ とし、$X_t=X+tfN$ とすると
>
$$
\delta^2A_\Sigma[f]
=\left.\frac{d^2}{dt^2}A[X_t]\right|_{t=0}
=\int_\Sigma\bigl(|\nabla_\Sigma f|^2-|A|^2f^2\bigr)\,dA.
$$
>
> 特に右辺が負になる方向があれば、$\Sigma$ は固定境界で面積の局所最小ではない。
<!-- formal-statement-end -->

### 証明の見取り図

計量の一次係数は $-2fS$、二次係数は $\nabla f\otimes\nabla f+f^2S^2$ です。面積要素 $\sqrt{\det g(t)}$ の二階微分では、一階係数の平方から曲率に関するもう一つの項が現れます。$\operatorname{tr}S=2H=0$ により、最後には $-|A|^2f^2$ だけが残ります。

<!-- proof-start -->
### 証明

一点で $g$ に関し正規直交な接基底を取ります。$g(t)$ を $g$ で引き戻した行列は
$$
I+tB+t^2C,\qquad
B=-2fS,\qquad C=\nabla_\Sigma f\otimes\nabla_\Sigma f+f^2S^2
$$
と書けます。$S$ は自己共役です。任意の二次元行列 $B,C$ に対して
$$
\log\det(I+tB+t^2C)
=t\,\operatorname{tr}B
+t^2\left(\operatorname{tr}C-\frac12\operatorname{tr}B^2\right)+O(t^3)
$$
が成り立ちます。これは $\log\det M=\operatorname{tr}\log M$ と $\log(I+E)=E-E^2/2+O(\|E\|^3)$ に $E=tB+t^2C$ を代入して得られます。

面積倍率は $\sqrt{\det g(t)/\det g}$ ですから、指数関数も二次まで展開して
$$
\begin{aligned}
\sqrt{\frac{\det g(t)}{\det g}}
&=1+\frac t2\operatorname{tr}B\\
&\quad+t^2\left\{
\frac12\operatorname{tr}C-\frac14\operatorname{tr}B^2
+\frac18(\operatorname{tr}B)^2\right\}
+O(t^3).
\end{aligned}
$$
各項を計算すると
$$
\operatorname{tr}B=-2f(2H),\quad
\operatorname{tr}B^2=4f^2|A|^2,\quad
\operatorname{tr}C=|\nabla_\Sigma f|^2+f^2|A|^2.
$$
$\Sigma$ は極小曲面なので $H=0$、したがって
$$
\sqrt{\frac{\det g(t)}{\det g}}
=1+\frac{t^2}{2}
\bigl(|\nabla_\Sigma f|^2-|A|^2f^2\bigr)+O(t^3).
$$
$\Sigma$ はコンパクトで変分が滑らかなので、各座標で一様な剰余評価を得て積分と微分を交換できます。面積の二階導関数として所要の積分式が得られます。

負の方向があれば $A(t)=A(0)+\tfrac12t^2A''(0)+o(t^2)<A(0)$ が十分小さい非零 $t$ に対して成り立ち、局所最小性に反します。$\square$
<!-- proof-end -->

式中の二項には異なる役割があります。$\int|\nabla_\Sigma f|^2$ は起伏を作る費用、$\int|A|^2f^2$ はもとの曲面の曲がりによる減少分です。$H=0$ は二つの主曲率の**和**が0という条件ですが、$|A|^2$ は主曲率の**平方和**であり、一般には0になりません。

### 2.1 接方向の変形を許しても判定は変わらない

一般の固定境界変分場は $V=fN+W$（$W$ は接ベクトル場）です。$W$ は主に曲面のパラメータ付けを動かします。$W$ の流れで曲面の定義域を再パラメータ化すると、境界固定の下でその寄与を一次で取り除けます。残りの変分は一次で $fN$ です。

この操作の二次での差は第一変分に現れますが、[VAR7の固定境界停留条件](../VAR7/index.md#thm-var7-stationary-minimal)により極小曲面で第一変分は全方向について0です。従って臨界曲面における面積の Hessian は一次変分場だけに依存し、接成分を除いた法成分に対して上の二次形式を計算すれば十分です。固定境界を仮定しない場合には、この議論の境界の扱いが変わります。

## 3. Jacobi 作用素は「平均曲率の線形化」

第二変分に現れた二次形式を
$$
Q(f,g)=\int_\Sigma\left(
\langle\nabla_\Sigma f,\nabla_\Sigma g\rangle-|A|^2fg\right)\,dA
$$
と書きます。境界で $f=g=0$ とします。曲面上の Laplace–Beltrami 作用素は $\Delta_\Sigma f=\operatorname{div}_\Sigma(\nabla_\Sigma f)$ という符号を採用します（平面では $\partial_x^2+\partial_y^2$）。

<a id="def-var8-jacobi-operator"></a>
<!-- formal-statement-start -->
> **定義（極小曲面の Jacobi 作用素と Jacobi 関数）**  
> $\Sigma\subset\mathbb R^3$ を滑らかな極小曲面とし、$|A|^2=\operatorname{tr}(S^2)$ とする。関数に作用する微分作用素
>
$$
J_\Sigma f=\Delta_\Sigma f+|A|^2f
$$
>
> を**Jacobi 作用素**という。$J_\Sigma f=0$ を満たす滑らかな関数を Jacobi 関数という。固定境界の零方向を論じるときは、さらに $f|_{\partial\Sigma}=0$ を課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var8-jacobi-operator -->
**定義の確認**。平面では $S=0$ なので $J=\partial_x^2+\partial_y^2$ です。$f(x,y)=x$ について $\partial_x^2x=\partial_y^2x=0$ だから $Jf=0$、従って $f$ は Jacobi 関数です。ただし有界な円板上の $f=x$ は境界で0ではないため、**固定境界の零方向ではありません**。
<!-- definition-example-end -->

<a id="prop-var8-jacobi-linearization"></a>
<!-- formal-statement-start -->
> **命題（平均曲率の線形化と第二変分の弱形式）**  
> $C^4$ の極小曲面 $\Sigma\subset\mathbb R^3$ を法線速度 $fN$ で変形すると、$S=-dN$ による平均曲率について
>
$$
\left.\frac{d}{dt}(2H_t)\right|_{0}=J_\Sigma f
$$
>
> が成立する。滑らかな固定境界方向 $f,g$ に対しては
>
$$
Q(f,g)=-\int_\Sigma gJ_\Sigma f\,dA.
$$
<!-- formal-statement-end -->

### 証明の見取り図

第二式は勾配項の部分積分です。第一式の係数と符号は、平均曲率の第一変分 $A'=-\int (2H)f\,dA$ をもう一度微分し、直前に求めた二階微分の双線形化と比較して確定します。

<!-- proof-start -->
### 証明

まず曲面の部分積分を使います。固定境界なので境界項が消え、
$$
\int_\Sigma\langle\nabla_\Sigma f,\nabla_\Sigma g\rangle\,dA
=-\int_\Sigma g\Delta_\Sigma f\,dA.
$$
従って $Q(f,g)=-\int_\Sigma g(\Delta_\Sigma f+|A|^2f)\,dA$ です。

線形化を導くため、法線速度 $fN$ の面族を $X_t$ とし、各 $X_t$ 上で法線方向の速度が $g$ になる補助変分を考えます。[面積の第一変分](../VAR7/index.md#thm-var7-first-variation)をこの補助変分に適用すると、固定境界で
$$
D A[X_t](gN_t)=-\int_\Sigma (2H_t)g\,dA_t.
$$
これを $t=0$ で微分します。$H_0=0$ なので $g$ や $dA_t$ の変化に掛かる $H_0$ の項は消え、右辺は
$$
-\int_\Sigma g\,\left.\frac d{dt}(2H_t)\right|_0dA
$$
となります。左辺は $H_0=0$ の停留性により、二次の変分場の取り方によらず面積の Hessian $D^2A[X](fN,gN)=Q(f,g)$ に等しくなります。

したがって任意の内部コンパクト台の $g$ について
$$
\int_\Sigma g\left\{\left.\frac d{dt}(2H_t)\right|_0-J_\Sigma f\right\}\,dA=0.
$$
被積分関数は連続なので、[VAR7で用いた局所試験関数の議論](../VAR7/index.md#thm-var7-stationary-minimal)により点ごとに0です。$\square$
<!-- proof-end -->

ここで Jacobi「場」は、測地線の [Jacobi場](../VAR5/index.md#prop-var5-sphere-geodesic-family)とは対象が異なります。測地線では曲線に沿うベクトル場を扱いましたが、ここでは面の法線方向を表す**スカラー関数**が主役です。どちらも「停留方程式を線形化したもの」という共通の発想を持ちます。

実際、$X_t$ がすべて極小曲面であれば $2H_t=0$ なので、その微分から $J_\Sigma f=0$ が従います。反対に Jacobi 関数が見つかっただけで、その方向へ厳密な極小曲面族が存在するとまでは言えません。

## 4. 二次形式を固有値から判定する

作用素 $L_\Sigma=-J_\Sigma=-\Delta_\Sigma-|A|^2$ は、固定境界で対称な二階作用素です。$f|_{\partial\Sigma}=0$ の方向を用いると
$$
Q(f,f)=\int_\Sigma fL_\Sigma f\,dA
$$
です。スペクトルのすべてを求めずとも、最も小さい Rayleigh 商の符号が安定性を決めます。

<a id="def-var8-first-rayleigh"></a>
<!-- formal-statement-start -->
> **定義（固定境界の第一 Rayleigh 値）**  
> $\Sigma$ をコンパクトな滑らかな境界を持つ極小曲面とし、$H_0^1(\Sigma)$ を境界でトレースが0の Sobolev 関数空間とする。第一 Rayleigh 値を
>
$$
\lambda_1=\inf_{\substack{f\in H_0^1(\Sigma)\\f\ne0}}
\frac{\displaystyle\int_\Sigma(|\nabla_\Sigma f|^2-|A|^2f^2)\,dA}
{\displaystyle\int_\Sigma f^2\,dA}
$$
>
> で定める。$H_0^1$ は滑らかな境界零関数の $H^1$ 閉包であり、上の商を滑らかな関数だけで計算しても同じ下限になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var8-first-rayleigh -->
**定義の確認**。平面の一辺が長さ $L$ の正方形 $D=(0,L)^2$ では $|A|=0$、$f=\sin(\pi x/L)\sin(\pi y/L)$ は境界で0です。微分して
$$
-\Delta f=\frac{2\pi^2}{L^2}f
$$
となるので Rayleigh 商は $2\pi^2/L^2$ です。任意の $H_0^1(D)$ の関数に一変数の [Wirtinger不等式](../VAR2/index.md#lem-var2-wirtinger)を $x$、$y$ それぞれについて適用すれば
$$
\int_D|\nabla f|^2\ge\frac{2\pi^2}{L^2}\int_Df^2
$$
です。従って定義の下限は実際に $\lambda_1=2\pi^2/L^2$ であると確認できます。
<!-- definition-example-end -->

<a id="thm-var8-spectral-stability"></a>
<!-- formal-statement-start -->
> **定理（固定境界のスペクトル安定判定）**  
> $\Sigma\subset\mathbb R^3$ を滑らかな境界を持つコンパクトな極小曲面とする。上の第一 Rayleigh 値 $\lambda_1$ は有限で、$H_0^1(\Sigma)$ の非零関数で達成される。さらに
>
$$
\Sigma\text{ は安定}\quad\Longleftrightarrow\quad\lambda_1\ge0,
\qquad
\Sigma\text{ は不安定}\quad\Longleftrightarrow\quad\lambda_1<0.
$$
>
> 最小化関数 $f_1$ は弱い意味で $L_\Sigma f_1=\lambda_1 f_1$、境界値0を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

曲率 $|A|^2$ はコンパクト曲面で有界なので、Rayleigh 商は下に有界です。正規化した最小化列から $H_0^1$ 弱収束部分列と $L^2$ 強収束部分列を取り、勾配項の弱下半連続性で下限が達成されることを示します。符号判定は定義式から直接従います。

<!-- proof-start -->
### 証明

$M=\max_\Sigma|A|^2$ は有限です。分母を1に正規化すれば
$$
Q(f,f)=\int_\Sigma|\nabla_\Sigma f|^2dA-\int_\Sigma|A|^2f^2dA\ge -M.
$$
従って $\lambda_1>-\infty$。最小化列 $f_n$ を $\|f_n\|_{L^2}=1$ で選ぶと、十分大きな $n$ では
$$
\int_\Sigma|\nabla_\Sigma f_n|^2dA
=Q(f_n,f_n)+\int_\Sigma|A|^2f_n^2dA
\le\lambda_1+1+M.
$$
よって $f_n$ は $H_0^1$ で有界です。[Hilbert空間の弱収束部分列](../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)により $H_0^1$ 弱収束する部分列を取れます。また [Rellichのコンパクト埋め込み](../GPDE/GPDE5/index.md#thm-gpde5-rellich-h01-l2)を有限個の曲面座標と分割関数で適用すると、同じ部分列のさらなる部分列が $L^2$ で強収束します。極限を $f_1$ とすると $\|f_1\|_{L^2}=1$ です。

勾配の二乗ノルムは弱下半連続なので
$$
\int|\nabla f_1|^2\le\liminf_n\int|\nabla f_n|^2.
$$
一方 $|A|^2$ は有界で $f_n\to f_1$ が $L^2$ 強収束するため
$$
\left|\int |A|^2(f_n^2-f_1^2)\right|
\le M\|f_n-f_1\|_2(\|f_n\|_2+\|f_1\|_2)\to0.
$$
従って $Q(f_1,f_1)\le\liminf Q(f_n,f_n)=\lambda_1$ で、下限の定義と合わせて等号です。

$f_1$ の最小性に対し、任意の $g\in H_0^1$ で $f_1+\varepsilon g$ の Rayleigh 商を $\varepsilon=0$ で微分すると
$$
0=2Q(f_1,g)-2\lambda_1\int f_1g\,dA.
$$
したがって $Q(f_1,g)=\lambda_1\int f_1g$ であり、[Jacobi作用素の部分積分表示](#prop-var8-jacobi-linearization)から弱固有方程式となります。

最後に $\lambda_1\ge0$ なら全ての滑らかな $f$ で $Q(f,f)\ge\lambda_1\|f\|_2^2\ge0$。$\lambda_1<0$ なら $f_1$ を $H_0^1$ の滑らかな関数で近似すると、$Q$ の連続性により $Q(f,f)<0$ の滑らかな固定境界方向が存在します。逆向きも同様です。$\square$
<!-- proof-end -->

$\lambda_1=0$ では第二変分がゼロとなる非零方向が存在しますが、その符号だけでは高次の変化による局所最小性までは決まりません。なお境界零を外した固有値問題は別の問題です。

## 5. 懸垂面の安定性を高さで区別する

[VAR7で求めた懸垂面](../VAR7/index.md#prop-var7-catenoid)を、中央から上下に対称に切ります。$a>0$、$s=z/a$ として
$$
X(s,\theta)=\bigl(a\cosh s\cos\theta,\ a\cosh s\sin\theta,\ as\bigr),
\quad -L\le s\le L,\quad \theta\in\mathbb R/(2\pi\mathbb Z).
$$
$L>0$ は無次元の切断高さです。両端の円周を固定します。座標 $s,\theta$ で第一基本形式と面積要素は
$$
g=a^2\cosh^2s\,(ds^2+d\theta^2),
\qquad dA=a^2\cosh^2s\,ds\,d\theta.
$$
また $|\kappa_1|=|\kappa_2|=1/(a\cosh^2s)$ なので
$$
|A|^2=\frac{2}{a^2\cosh^4s},\qquad
|\nabla_\Sigma f|^2=
\frac{f_s^2+f_\theta^2}{a^2\cosh^2s}.
$$
[第二変分公式](#thm-var8-second-variation)へ代入し、共通の尺度 $a$ が消えると
$$
Q_L(f,f)=\int_0^{2\pi}\int_{-L}^L
\left(f_s^2+f_\theta^2-2\operatorname{sech}^2s\,f^2\right)ds\,d\theta.
$$
ここで $\operatorname{sech}s=1/\cosh s$ です。安定性は $a$ ではなく $L$ によって判定されます。

<a id="thm-var8-catenoid-threshold"></a>
<!-- formal-statement-start -->
> **定理（対称切断懸垂面の安定性の臨界高さ）**  
> $a>0$、$L>0$ とし、上の懸垂面の両端 $s=\pm L$ を固定する。$s_*>0$ を
>
$$
s_*\tanh s_*=1
$$
>
> を満たす一意な正数とする。このとき $0<L<s_*$ なら固定境界で安定であり、$L=s_*$ では安定で非零の Dirichlet Jacobi 関数が存在し、$L>s_*$ なら不安定である。
<!-- formal-statement-end -->

### 証明の見取り図

回転対称な零モード候補
$$
h(s)=1-s\tanh s
$$
は $h''+2\operatorname{sech}^2s\,h=0$ を満たします。$h$ が正である範囲では、$f=h v$ と因数分解して二次形式を正の平方だけに直せます。$h$ が両端でゼロになるところが臨界です。さらに広い区間では、臨界の零モードを少し外側へ変形すると負の方向が作れます。

<!-- proof-start -->
### 証明

**1. 零モードと臨界点。** $h'= -\tanh s-s\operatorname{sech}^2s$、
$$
h''=-2\operatorname{sech}^2s+
2s\operatorname{sech}^2s\tanh s
=-2\operatorname{sech}^2s\,h.
$$
$h$ は偶関数、$h(0)=1$ です。正の $s$ で $\phi(s)=s\tanh s$ は
$$
\phi'(s)=\tanh s+s\operatorname{sech}^2s>0
$$
を満たし、$\phi(0)=0$ かつ $\phi(s)\to\infty$ です。従って $h$ が初めて0となる正の点 $s_*$ は存在して一意、$|s|<s_*$ では $h>0$ です。

**2. $L<s_*$ の安定性。** $f$ を滑らかな固定境界方向とします。$h$ は閉区間 $[-L,L]$ で正なので $f=hv$ と置けます。すると
$$
f_s^2-2\operatorname{sech}^2s f^2
=h^2v_s^2+2hh'vv_s+(h'^2-2\operatorname{sech}^2s\,h^2)v^2.
$$
$h''=-2\operatorname{sech}^2s\,h$ を使って右辺後半を
$$
\partial_s(hh'v^2)
=(h'^2+hh'')v^2+2hh'vv_s
$$
とまとめられます。さらに $f_\theta^2=h^2v_\theta^2$ なので
$$
Q_L(f,f)=
\int_0^{2\pi}\int_{-L}^{L}h^2(v_s^2+v_\theta^2)\,ds\,d\theta
+\int_0^{2\pi}[hh'v^2]_{-L}^{L}d\theta.
$$
$f=0$ が両端で成り立ち $h>0$ なので $v=0$ も両端で成り立ち、境界項は0です。従って $Q_L(f,f)\ge0$。**回転対称方向だけでなく全ての $\theta$ 依存方向に対する証明**になっています。

**3. $L=s_*$ の臨界。** コンパクト台を持つ任意の滑らかな $f$ は $h>0$ の内部だけに台があるので、同じ平方表示から $Q_{s_*}(f,f)\ge0$ です。境界零の滑らかな関数は $H_0^1$ で内部コンパクト台の滑らかな関数から近似でき、$Q$ は $H_0^1$ で連続ですから全ての固定境界方向で非負です。一方、$h(\pm s_*)=0$、$h\not\equiv0$、$h''+2\operatorname{sech}^2s\,h=0$ により、$\theta$ に依らない $h$ は境界零 Jacobi 関数です。部分積分すると
$$
Q_{s_*}(h,h)
=2\pi\left([hh']_{-s_*}^{s_*}
-\int_{-s_*}^{s_*}h(h''+2\operatorname{sech}^2s\,h)\,ds\right)=0.
$$

**4. $L>s_*$ の不安定性。** 区間 $[-L,L]$ 上で $\psi(s)=h(s)$（$|s|\le s_*$）、$\psi(s)=0$（$s_*<|s|\le L$）と置きます。$\psi$ は連続で区分的 $C^1$、両端で0なので $H_0^1$ に属します。上の積分計算から $Q_L(\psi,\psi)=0$ です。$k(s)$ を $(-L,L)$ 内の滑らかな非負関数で、$k(s_*)>0$、$k(-s_*)>0$ となるよう選びます。二次形式の双線形化を $B$ とすると、$h$ の微分方程式を内部で使った部分積分から
$$
\begin{aligned}
B(\psi,k)
&=\int_{-s_*}^{s_*}
(h'k'-2\operatorname{sech}^2s\,hk)\,ds\\
&=[h'k]_{-s_*}^{s_*}
=h'(s_*)k(s_*)-h'(-s_*)k(-s_*)<0.
\end{aligned}
$$
実際 $h'(s_*)<0$、$h'(-s_*)>0$ です。したがって小さい $\varepsilon>0$ に対し
$$
Q_L(\psi+\varepsilon k,\psi+\varepsilon k)
=2\varepsilon B(\psi,k)+\varepsilon^2Q_L(k,k)<0.
$$
この $H_0^1$ 関数を滑らかな境界零関数で近似すると、$Q_L<0$ が保たれます。$\theta$ に依らないこの方向は全曲面で許容されるので不安定です。$\square$
<!-- proof-end -->

臨界値は数値的には $s_*\approx1.19968$ です。$s_*$ は表面を固定する二つの円周の**高さを $a$ で割った量**であり、円周半径 $a\cosh L$ と独立に動かしてよい数字ではありません。幾何的なリングの配置が存在し得る懸垂面の枝の個数と、この枝の安定性とは区別します。

### 5.1 対称性から Jacobi 関数を見る

上の $h$ は偶然の試行関数ではありません。$a$ を変える懸垂面の族は極小曲面族で、その拡大方向を法線へ射影すると定数倍の $-1+s\tanh s$ が現れます。また鉛直方向の平行移動の速度 $e_z=(0,0,1)$ の法線射影は
$$
\langle e_z,N\rangle=\tanh s.
$$
直接微分して $(\tanh s)''+2\operatorname{sech}^2s\tanh s=0$ を確かめられます。このように空間の対称性から Jacobi 関数が作れますが、それが境界零条件を満たすかは別途確認が必要です。

## 6. 平均曲率一定の曲面：何が変わるか

極小曲面は $H=0$ でした。石鹸の泡のように囲む体積を指定して面積を変えるときは、面積だけの停留とは条件が違います。向きをそろえた閉曲面について囲まれる体積を $V$ とすれば、外向き速度 $fN$ に対し
$$
\delta V=\int_\Sigma f\,dA
$$
です。固定体積を保つ変分は一次で $\int f\,dA=0$ を満たします。

<a id="prop-var8-cmc-constraint"></a>
<!-- formal-statement-start -->
> **命題（閉曲面の体積制約付き面積停留）**  
> $\Sigma\subset\mathbb R^3$ を滑らかな閉埋め込み曲面とし、外向き法線に対して $2H=\operatorname{tr}(-dN)$ とする。体積の一次変化が0である全ての滑らかな法線変分に対して面積の一次変化が0であることと、$H$ が $\Sigma$ 上で一定であることは同値である（連結性は仮定しなくてよい）。
<!-- formal-statement-end -->

### 証明の見取り図

体積保存の一次条件は、法線速度の積分が0となることです。面積第一変分の被積分関数 $H$ が定数なら直ちに消えます。逆に全ての平均零の速度に対して消えるなら、$H$ をその面積平均から引いた関数自身を試験方向として用います。

<!-- proof-start -->
### 証明

[VAR7の第一変分](../VAR7/index.md#thm-var7-first-variation)より閉曲面では
$$
\delta A=-2\int_\Sigma Hf\,dA,
\qquad \delta V=\int_\Sigma f\,dA.
$$
$H\equiv H_0$ なら $\int f=0$ から $\delta A=0$。逆に条件を満たすなら $\overline H=A(\Sigma)^{-1}\int_\Sigma H\,dA$ と置き、$f=H-\overline H$ を試します。正則性により $f$ は許容され、$\int_\Sigma f\,dA=0$ です。従って
$$
0=\int_\Sigma H(H-\overline H)\,dA
=\int_\Sigma(H-\overline H)^2\,dA.
$$
連続性から $H=\overline H$ が曲面全体で成立します。$\square$
<!-- proof-end -->

半径 $R$ の球面では外向きの $H=-1/R$ で一定です。ところがこの球面は $H=0$ ではありません。**体積制約付き停留**を極小曲面の安定性と混同しないでください。体積制約付きの第二変分は、面積と体積の Lagrange 乗数を含む汎関数を二階微分し、一次条件 $\int f=0$ の方向に制限して調べます。極小曲面の式をそのまま球面へ代入するのは誤りです。

## 7. 演習：符号と許容境界を確かめる

### Level A

<a id="ex-var8-a01"></a>
#### VAR8-A01 平面グラフの二階微分
- Level: A

有界な滑らかな平面領域 $D$ と $f\in C^\infty(\overline D)$、$f|_{\partial D}=0$ に対し、$X_t(x,y)=(x,y,tf(x,y))$ の面積 $A(t)$ を二階微分し、安定性を判定せよ。

<!-- solution-start -->
### 詳細解答

$\partial_xX_t=(1,0,tf_x)$、$\partial_yX_t=(0,1,tf_y)$ より $\det g_t=1+t^2(f_x^2+f_y^2)$ です。従って
$$
A'(t)=\int_D\frac{t|\nabla f|^2}{\sqrt{1+t^2|\nabla f|^2}}\,dx\,dy
$$
で、さらに微分すると
$$
A''(t)=\int_D\frac{|\nabla f|^2}{(1+t^2|\nabla f|^2)^{3/2}}\,dx\,dy.
$$
$t=0$ で $A''(0)=\int_D|\nabla f|^2\ge0$。これは[第二変分定理](#thm-var8-second-variation)で平面の $|A|^2=0$ とした結果に一致し、全ての固定境界法線方向で非負なので安定です。
<!-- solution-end -->

<a id="ex-var8-a02"></a>
#### VAR8-A02 主曲率から曲率項を作る
- Level: A

極小曲面の一点で主曲率が $\kappa,-\kappa$ であるとする。$H$ と $|A|^2$ を求め、$\kappa\ne0$ なら第二変分の曲率項が消えないことを確かめよ。

<!-- solution-start -->
### 詳細解答

平均曲率は $2H=\kappa+(-\kappa)=0$ なので $H=0$ です。一方
$$
|A|^2=\kappa^2+(-\kappa)^2=2\kappa^2.
$$
$\kappa\ne0$ なら $|A|^2>0$。従って[第二変分公式](#thm-var8-second-variation)には $-2\kappa^2 f^2$ が局所密度として残ります。第一変分の消失と二階曲率項の消失は同値ではありません。
<!-- solution-end -->

<a id="ex-var8-a03"></a>
#### VAR8-A03 平面上の Jacobi 関数と境界条件
- Level: A

平面正方形 $D=(0,1)^2$ 上で $f(x,y)=x+y$ が Jacobi 関数かを調べよ。また Dirichlet 零方向かを判定せよ。

<!-- solution-start -->
### 詳細解答

平面上では $J=\Delta$ です。$f_{xx}=f_{yy}=0$ なので $Jf=0$、従って [Jacobi 関数の定義](#def-var8-jacobi-operator)を満たします。しかし例えば辺 $x=0$ で $f(0,y)=y$ は0でないので $f|_{\partial D}=0$ は満たしません。この関数が Jacobi 関数であることから、固定境界の非零零モードが存在すると結論してはいけません。
<!-- solution-end -->

<a id="ex-var8-a04"></a>
#### VAR8-A04 球面は体積制約付きの停留面
- Level: A

半径 $R$ の球面に外向き法線を取り、$H=-1/R$ を用いる。滑らかな速度 $f$ が $\int_\Sigma f\,dA=0$ を満たすとき、面積と体積の第一変分を求めよ。体積制約を外すとどうなるか。

<!-- solution-start -->
### 詳細解答

[閉曲面の体積制約付き停留](#prop-var8-cmc-constraint)の式に代入して
$$
\delta V=\int_\Sigma f\,dA=0,\qquad
\delta A=-2\int_\Sigma Hf\,dA=\frac2R\int_\Sigma f\,dA=0
$$
です。制約を外し $f=1$ と取れば $\delta V=4\pi R^2$、$\delta A=(2/R)4\pi R^2=8\pi R$ なので停留しません。球面に極小曲面の第二変分式を適用することもできません。
<!-- solution-end -->

### Level B

<a id="ex-var8-b01"></a>
#### VAR8-B01 Jacobi 作用素と境界の積分
- Level: B

$\Sigma$ は滑らかな境界を持つコンパクトな極小曲面とし、滑らかな $f,g$ は境界で0とする。$Q(f,g)$ の対称性を示し、$Q(f,g)=-\int_\Sigma gJ_\Sigma f\,dA$ を導け。

<!-- solution-start -->
### 詳細解答

定義から
$$
Q(f,g)=\int_\Sigma(\nabla_\Sigma f\cdot\nabla_\Sigma g-|A|^2fg)\,dA
$$
であり、二つの積はいずれも $f,g$ の交換で不変なので対称です。積の発散を計算すると
$$
\operatorname{div}_\Sigma(g\nabla_\Sigma f)
=\nabla_\Sigma g\cdot\nabla_\Sigma f+g\Delta_\Sigma f.
$$
積分して境界の外向き余法線 $\mu$ との積 $g\partial_\mu f$ を得ますが、$g|_{\partial\Sigma}=0$ なのでその積分は0です。従って
$$
\int_\Sigma\nabla f\cdot\nabla g\,dA=-\int_\Sigma g\Delta f\,dA,
$$
$$
Q(f,g)=-\int_\Sigma g(\Delta_\Sigma f+|A|^2f)\,dA
=-\int_\Sigma gJ_\Sigma f\,dA.
$$
境界条件を忘れると、余分な境界積分が残ります。
<!-- solution-end -->

<a id="ex-var8-b02"></a>
#### VAR8-B02 懸垂面の二次形式を座標変換する
- Level: B

$a>0$、$-L\le s\le L$ の懸垂面 $X(s,\theta)=(a\cosh s\cos\theta,a\cosh s\sin\theta,as)$ の計量 $g=a^2\cosh^2s I$ と主曲率 $\pm1/(a\cosh^2s)$ を使い、任意の境界零関数 $f(s,\theta)$ の二次形式 $Q_L$ を導け。

<!-- solution-start -->
### 詳細解答

逆計量は $g^{-1}=(a^2\cosh^2s)^{-1}I$ です。従って
$$
|\nabla_\Sigma f|^2=\frac{f_s^2+f_\theta^2}{a^2\cosh^2s},
\qquad dA=a^2\cosh^2s\,ds\,d\theta.
$$
主曲率の二乗和は $|A|^2=2/(a^2\cosh^4s)$ ですから
$$
|A|^2f^2\,dA=2\operatorname{sech}^2s f^2\,ds\,d\theta.
$$
[第二変分公式](#thm-var8-second-variation)の二項へそれぞれ代入して
$$
Q_L(f,f)=\int_0^{2\pi}\int_{-L}^L
(f_s^2+f_\theta^2-2\operatorname{sech}^2s f^2)\,ds\,d\theta
$$
です。曲面の尺度 $a$ は二項の両方で消えます。
<!-- solution-end -->

<a id="ex-var8-b03"></a>
#### VAR8-B03 平面正方形の第一固有値を確定する
- Level: B

辺長 $L>0$ の平面正方形 $D=(0,L)^2$ で Dirichlet 条件を課す。$-\Delta$ の第一 Rayleigh 値を $2\pi^2/L^2$ と確定し、安定性を示せ。

<!-- solution-start -->
### 詳細解答

$f\in C_c^\infty(D)$ を取り、$y$ を固定して [Wirtinger不等式](../VAR2/index.md#lem-var2-wirtinger)を $x\in(0,L)$ に適用すると
$$
\int_0^L f_x^2\,dx\ge\frac{\pi^2}{L^2}\int_0^L f^2\,dx.
$$
これを $y$ で積分します。同様に $x$ を固定して $y$ 方向にも適用し、加えると
$$
\int_D|\nabla f|^2\ge\frac{2\pi^2}{L^2}\int_Df^2.
$$
密度により全 $H_0^1(D)$ に成立します。他方 $f_1=\sin(\pi x/L)\sin(\pi y/L)$ なら境界で0、$-\Delta f_1=(2\pi^2/L^2)f_1$。部分積分して
$$
\int_D|\nabla f_1|^2=\frac{2\pi^2}{L^2}\int_Df_1^2
$$
です。下界が達成されるので $\lambda_1=2\pi^2/L^2>0$、[安定判定](#thm-var8-spectral-stability)より安定です。
<!-- solution-end -->

<a id="ex-var8-b04"></a>
#### VAR8-B04 懸垂面の対称性と境界零条件
- Level: B

懸垂面の $\theta$ に依らない Jacobi 方程式 $v''+2\operatorname{sech}^2s\,v=0$ について、$v_1(s)=\tanh s$ と $v_2(s)=1-s\tanh s$ が解であることを確かめよ。対称切断 $[-L,L]$ で二つが境界零になる条件を調べよ。

<!-- solution-start -->
### 詳細解答

$v_1'=\operatorname{sech}^2s$、$v_1''=-2\operatorname{sech}^2s\tanh s$ より
$$
v_1''+2\operatorname{sech}^2s\,v_1=0.
$$
$v_2'=-\tanh s-s\operatorname{sech}^2s$、$v_2''=-2\operatorname{sech}^2s+2s\operatorname{sech}^2s\tanh s$ なので
$$
v_2''+2\operatorname{sech}^2s\,v_2
=-2\operatorname{sech}^2s(1-s\tanh s)
+2\operatorname{sech}^2s(1-s\tanh s)=0.
$$
$v_1$ は奇関数で $v_1(L)=\tanh L>0$（$L>0$）だから $\pm L$ で同時に0になれません。$v_2$ は偶関数で $v_2(\pm L)=1-L\tanh L$。従って [臨界高さの定理](#thm-var8-catenoid-threshold)の $L=s_*$ で初めて境界零となります。Jacobi 方程式を満たすだけでは固定境界零モードとは言えません。
<!-- solution-end -->

### Level C

<a id="ex-var8-c01"></a>
#### VAR8-C01 懸垂面の臨界高さを再構成する
- Level: C

対称切断懸垂面の第二変分が
$$
Q_L(f,f)=\int_0^{2\pi}\int_{-L}^L
\left(f_s^2+f_\theta^2-2\operatorname{sech}^2s\,f^2\right)ds\,d\theta
$$
であるとする。$s_*>0$ を $s_*\tanh s_*=1$ で定め、$h(s)=1-s\tanh s$ を使って次を示せ。

1. $h''+2\operatorname{sech}^2s\,h=0$、$h>0$（$|s|<s_*$）を証明せよ。
2. $0<L<s_*$ では**全ての $\theta$ 依存変分**に対して $Q_L\ge0$ を示せ。
3. $L=s_*$ で境界零の非零 Jacobi 関数を示し、$L>s_*$ で負方向が存在することを証明せよ。

<!-- solution-start -->
### 詳細解答

**1.** $h'=-\tanh s-s\operatorname{sech}^2s$、$h''=-2\operatorname{sech}^2s+2s\operatorname{sech}^2s\tanh s$ なので
$$
h''=-2\operatorname{sech}^2s(1-s\tanh s)
=-2\operatorname{sech}^2s h.
$$
$h$ は偶関数、$h(0)=1$ です。$s>0$ では $s\tanh s$ の導関数は $\tanh s+s\operatorname{sech}^2s>0$ で、0から無限大へ増えます。ゆえに $s_*$ は一意、$|s|<s_*$ では $h>0$。

**2.** $L<s_*$ で $f=hv$ とおくと、積の微分から
$$
\begin{aligned}
f_s^2-2\operatorname{sech}^2s f^2
&=(h'v+hv_s)^2+hh''v^2\\
&=h^2v_s^2+\partial_s(hh'v^2).
\end{aligned}
$$
さらに $f_\theta^2=h^2v_\theta^2$。$h$ は境界でも正で $f(\pm L,\theta)=0$ なので $v(\pm L,\theta)=0$ です。従って
$$
Q_L(f,f)=\int_0^{2\pi}\int_{-L}^L
h^2(v_s^2+v_\theta^2)\,ds\,d\theta\ge0.
$$
$\theta$ 方向の勾配項を落として判定したのではなく、それも正項として保持しています。

**3.** $L=s_*$ では $h(\pm L)=0$ かつ $h\not\equiv0$ で、1より Jacobi 方程式を満たすので非零 Dirichlet 零方向です。内部コンパクト台の $f$ では2の平方表示が引き続き使え、$H_0^1$ への密度から $Q_{s_*}\ge0$ です。

$L>s_*$ なら $\psi=h$（$|s|\le s_*$）、それ以外で0とした $H_0^1$ 関数を考えます。$h$ の微分方程式と両端の値0から $Q_L(\psi,\psi)=0$。$k$ は滑らかな非負関数で $k(\pm s_*)>0$、$k(\pm L)=0$ とします。双線形形式について
$$
B(\psi,k)=2\pi\int_{-s_*}^{s_*}
(h'k'-2\operatorname{sech}^2s hk)\,ds
=2\pi[h'k]_{-s_*}^{s_*}<0
$$
となります（$h'(s_*)<0<h'(-s_*)$）。従って
$$
Q_L(\psi+\varepsilon k,\psi+\varepsilon k)
=2\varepsilon B(\psi,k)+\varepsilon^2Q_L(k,k)<0
$$
が十分小さい $\varepsilon>0$ で成立します。$H_0^1$ 近似で滑らかな負方向も得られます。よって $L>s_*$ では不安定です。
<!-- solution-end -->

---

## 8. ここまでの到達点

面積停留を表す $H=0$ に、第二変分の非負性を加えることで安定性を判定できるようになりました。$\int|\nabla f|^2$ と $\int|A|^2f^2$ の競合をまとめるのが Jacobi 作用素です。懸垂面では $s\tanh s=1$ を満たす切断高さが、安定な部分と不安定な部分の厳密な境界でした。これは**二次の安定性**の判定であり、大域的な面積最小性や時間発展の動力学的安定性を宣言するものではありません。

次の VAR9 では、変分の符号だけでなく「面積やエネルギーを最小にする対象が本当に存在するのか」を問います。最小化列、弱収束、弱下半連続性を使う**直接法**がその道具になります。
