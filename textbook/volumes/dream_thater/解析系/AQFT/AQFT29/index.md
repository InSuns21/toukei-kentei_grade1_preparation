# AQFT29 相対Tomita作用素

[AQFT18のTomita初期作用素](../AQFT18/index.md#def-aqft18-tomita-initial)は、一つの巡回分離ベクトル $\Omega$ に対し $A\Omega\mapsto A^*\Omega$ を割り当てました。[AQFT20の標準表現](../AQFT20/index.md#thm-aqft20-modular-formulas)では、忠実な密度行列 $\rho$ のモジュラー作用素を $\Delta_\rho=L_\rho R_{\rho^{-1}}$ と計算しました。しかし二つの状態を比較するとき、どちらの状態の密度を左に、どちらを右の逆数に置くべきでしょうか。

本講では **入力を作る状態を $\rho$、出力を作る状態を $\sigma$** と固定します。目標は、一般の標準対での定義と可閉性を証明したうえで、有限次元の作用素を行列から全計算することです。二状態の比較に必要な対数作用素の計算は次講です。

## 1. 一つのベクトルから二つのベクトルへ

$\mathcal M\subset B(\mathcal H)$ を単位的von Neumann環とします。二つの単位ベクトル $\xi,\eta\in\mathcal H$ を選び、**それぞれが $\mathcal M$ に対して巡回的かつ分離的**だと仮定します。このような組を[標準対](../AQFT18/index.md#def-aqft18-standard-pair)と呼びます。状態はそれぞれ $\omega_\xi(A)=\langle\xi,A\xi\rangle$、$\omega_\eta(A)=\langle\eta,A\eta\rangle$ です。内積は既習章と同じく **第2変数線形** とします。

一状態での $A\xi\mapsto A^*\xi$ のうち、出力側のベクトルだけを $\eta$ に置き換えます。入力 $\mathcal M\xi$ が稠密なのは $\xi$ の巡回性によるもので、同じ式が一価であるのは $\xi$ の分離性によるものです。

<a id="def-aqft29-relative-tomita"></a>

<!-- formal-statement-start -->
> **定義（相対Tomita初期作用素）**  
> $\mathcal M\subset B(\mathcal H)$ を単位的von Neumann環、$\xi,\eta\in\mathcal H$ をそれぞれ $\mathcal M$ に対する巡回分離単位ベクトルとする。稠密な複素線形部分空間 $D_0=\mathcal M\xi$ 上の反線形写像を
>
$$
S_{\eta\mid\xi,0}(A\xi)=A^*\eta\qquad(A\in\mathcal M)
$$
>
> で定める。左側の $\xi$ が**入力側**、右辺の $\eta$ が**出力側**である。可閉性を証明した後、その閉包を $S_{\eta\mid\xi}$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft29-relative-tomita -->
### 直接例：二点の対角作用素環

$\mathcal H=\mathbb C^2$、$\mathcal M=\{\operatorname{diag}(a,b):a,b\in\mathbb C\}$ とします。$0<p,q<1$ とし、

$$
\xi=(\sqrt p,\sqrt{1-p}),\qquad
\eta=(\sqrt q,\sqrt{1-q})
$$

を選びます。どちらもノルム1です。[標準対の二点例](../AQFT18/index.md#def-aqft18-standard-pair)をそのまま二つのベクトルに適用すると、全座標が非零であるため、$\mathcal M\xi=\mathcal M\eta=\mathbb C^2$、かつ消去子は零で、双方が巡回・分離的です。

任意の $x=(x_1,x_2)$ は、$A=\operatorname{diag}(x_1/\sqrt p,x_2/\sqrt{1-p})$ により $x=A\xi$ と一意に書けるので、

$$
S_{\eta\mid\xi,0}(x_1,x_2)
=\left(\sqrt{\frac qp}\,\overline{x_1},
\sqrt{\frac{1-q}{1-p}}\,\overline{x_2}\right).
$$

分母が非零なので式は全入力で定義され、係数の複素共役から反線形性が確かめられます。$p=q$ なら一状態の成分共役へ戻ります。一方 $p\ne q$ なら $S_{\eta\mid\xi,0}^2$ は一般に恒等ではありません。これは定義の誤りでなく、二状態を比較していることの反映です。

**定義の確認**：二つの巡回性・分離性、初期定義域の稠密性、表示の一意性、反線形性を確認しました。
<!-- definition-example-end -->

## 2. 定義域と可閉性を省略しない

閉作用素へ移る前に、[反線形作用素の可閉性の零列判定](../AQFT18/index.md#def-aqft18-closable)を使います。$\xi$ が $\mathcal M$ に対して巡回・分離的なら、[可換子についての巡回・分離性](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)により $\mathcal M'\xi$ も $\mathcal H$ に稠密です。$\mathcal M'$ の元 $B$ は $\mathcal M$ の全元と可換です。

<a id="prop-aqft29-closable"></a>

<!-- formal-statement-start -->
> **命題（相対Tomita作用素の可閉性）**  
> $\mathcal M$ と $\xi,\eta$ が[相対Tomita初期作用素](#def-aqft29-relative-tomita)の仮定を満たすとき、$S_{\eta\mid\xi,0}:\mathcal M\xi\to\mathcal H$ は稠密定義・反線形・可閉である。閉包 $S_{\eta\mid\xi}$ は閉反線形作用素で
>
$$
\mathcal M\xi\subset\operatorname{Dom}(S_{\eta\mid\xi}),
\qquad S_{\eta\mid\xi}(A\xi)=A^*\eta
$$
>
> を満たす。反線形随伴 $S_{\eta\mid\xi}^{\sharp}$ の定義域には $\mathcal M'\xi$ が含まれ、$B\in\mathcal M'$ に対して
>
$$
S_{\eta\mid\xi}^{\sharp}(B\xi)=B^*\eta
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

非零の $A$ が $A\xi=0$ を作らないことを先に確認し、$S_{\eta\mid\xi,0}$ のグラフで零に近づく入力を取ります。出力の任意の極限と、稠密な $\mathcal M'\xi$ との内積を計算すれば、極限が零であることを示せます。

<!-- proof-start -->
### 証明

$A\xi=C\xi$ なら $(A-C)\xi=0$ です。$\xi$ の分離性より $A=C$、したがって右辺 $A^*\eta$ は入力から一意に決まります。また

$$
S_{\eta\mid\xi,0}((\alpha A+\beta C)\xi)
=(\alpha A+\beta C)^*\eta
=\overline\alpha A^*\eta+\overline\beta C^*\eta.
$$

ゆえに反線形です。$\mathcal M\xi$ は $\xi$ の巡回性により稠密です。

$A_n\xi\to0$ かつ $A_n^*\eta\to y$ と仮定します。$B\in\mathcal M'$ を任意に取ると、第2変数線形の内積と $A_nB=BA_n$ より、

$$
\begin{aligned}
\langle y,B\xi\rangle
&=\lim_n\langle A_n^*\eta,B\xi\rangle\\
&=\lim_n\langle\eta,A_nB\xi\rangle\\
&=\lim_n\langle\eta,BA_n\xi\rangle\\
&=\lim_n\langle B^*\eta,A_n\xi\rangle=0.
\end{aligned}
$$

$\mathcal M'\xi$ は稠密なので $y=0$。従って零列判定から可閉です。閉包は[閉包の構成](../AQFT18/index.md#def-aqft18-closable)の通り、$x_n=A_n\xi\to x$ と $A_n^*\eta\to z$ を満たす $x$ を定義域に取り、$S_{\eta\mid\xi}x=z$ とするものです。任意の $B\in\mathcal M'$ について上の等式は $x=A\xi$ の全域で

$$
\langle S_{\eta\mid\xi,0}x,B\xi\rangle
=\langle B^*\eta,x\rangle
$$

を与えます。[反線形随伴の定義](../AQFT18/index.md#def-aqft18-antilinear-adjoint)により $B\xi$ は随伴の定義域に入り、随伴値は $B^*\eta$ です。グラフ極限でも等式が保たれるので、閉包の随伴についても同じことが成立します。
<!-- proof-end -->

**どの仮定を使ったか**：$\xi$ の分離性は入力表示の一意性、巡回性は $D_0$ の稠密性、可換子側の巡回性は可閉性に使用しました。証明では $\eta$ の巡回分離性を使っていません。これは結論を強められる余地を示しますが、本講では二つの忠実状態を対等に扱うため、定義の段階から両方に標準性を要求します。

## 3. 相対モジュラー作用素の意味

[閉反線形作用素の正二乗補題](../AQFT19/index.md#lem-aqft19-positive-square)によれば、閉じた $S$ から $S^\sharp S$ は非負自己共役作用素として定義できます。ただし非有界のとき積の定義域を全空間と同一視してはいけません。

<a id="def-aqft29-relative-modular"></a>

<!-- formal-statement-start -->
> **定義（相対モジュラー作用素）**  
> [前命題](#prop-aqft29-closable)で得た閉反線形作用素 $S_{\eta\mid\xi}$ に対し、
>
$$
\Delta_{\eta\mid\xi}
=S_{\eta\mid\xi}^{\sharp}S_{\eta\mid\xi},\qquad
\operatorname{Dom}\Delta_{\eta\mid\xi}
=\{x\in\operatorname{Dom}S_{\eta\mid\xi}:
S_{\eta\mid\xi}x\in\operatorname{Dom}S_{\eta\mid\xi}^{\sharp}\}
$$
>
> を **相対モジュラー作用素** と呼ぶ。これは非負自己共役作用素であり、
>
$$
\operatorname{Dom}\Delta_{\eta\mid\xi}^{1/2}
=\operatorname{Dom}S_{\eta\mid\xi},\qquad
\|\Delta_{\eta\mid\xi}^{1/2}x\|=\|S_{\eta\mid\xi}x\|
$$
>
> が成り立つ。$\eta=\xi$ のときは通常のモジュラー作用素に一致する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft29-relative-modular -->
### 直接例：二点の対角作用素環では正の対角作用素になる

第1節の $\xi,\eta$ に対して $Sx=(a\overline{x_1},b\overline{x_2})$ と書くと、$a=\sqrt{q/p}$、$b=\sqrt{(1-q)/(1-p)}$ は正実数です。[反線形随伴の定義](../AQFT18/index.md#def-aqft18-antilinear-adjoint)に直接代入すれば $S^\sharp=S$ です。よって

$$
\Delta_{\eta\mid\xi}(x_1,x_2)
=(a^2x_1,b^2x_2)
=\left(\frac qp x_1,\frac{1-q}{1-p}x_2\right).
$$

固有値は両方正で、作用素は全域定義・自己共役・正です。$\Delta^{1/2}=\operatorname{diag}(a,b)$ なので $\|\Delta^{1/2}x\|^2=\|Sx\|^2$ も成分ごとに一致します。ここでは対角作用素だけからなる環なので $\Delta_{\eta\mid\xi}$ は状態の座標ごとの比を表します。後述する行列全体の作用素環では**左右乗算**が別々に現れます。

**定義の確認**：作用素積、定義域、非負性、平方根のノルム等式を具体的に確認しました。
<!-- definition-example-end -->

同一ベクトルのTomita作用素では $S_\xi^2$ が恒等へ延長されることを[AQFT18](../AQFT18/index.md#prop-aqft18-initial-properties)で証明しました。しかし二状態版の $S_{\eta\mid\xi}^2=I$ は一般には誤りです。相対作用素で保存される本質は「閉反線形作用素から非負自己共役な $\Delta$ が得られる」という構造です。

## 4. 忠実な二状態をHilbert–Schmidt空間で実現する

有限次元で記号の向きを検算します。$H_n=M_n(\mathbb C)$、$\langle X,Y\rangle_2=\operatorname{Tr}(X^*Y)$、$\mathcal M=L(M_n(\mathbb C))$ とします。これらの意味と左右乗算 $L_A(X)=AX$、$R_B(X)=XB$ は[Hilbert–Schmidt表現](../AQFT20/index.md#def-aqft20-hilbert-schmidt)で導入済みです。

$\rho,\sigma\in M_n(\mathbb C)$ をそれぞれ正定値・トレース1の密度行列とし、

$$
\xi=\rho^{1/2},\qquad \eta=\sigma^{1/2}
$$

を $H_n$ のベクトルとみなします。[AQFT20の標準性の証明](../AQFT20/index.md#prop-aqft20-standard-state)を $\rho$ と $\sigma$ のそれぞれに適用でき、どちらも左乗算環について巡回分離的です。任意の $X\in H_n$ に対し $X=A\rho^{1/2}$ と置けば $A=X\rho^{-1/2}$ と一意に復元できます。ここで可逆性は**入力側 $\rho$ の忠実性**によります。

<a id="thm-aqft29-matrix-formulas"></a>

<!-- formal-statement-start -->
> **定理（忠実な有限次元二状態の相対Tomita全計算）**  
> $n\ge1$、$\rho,\sigma\in M_n(\mathbb C)$ は正定値、$\operatorname{Tr}\rho=\operatorname{Tr}\sigma=1$ とする。$H_n=M_n(\mathbb C)$ の左乗算環と $\xi=\rho^{1/2}$、$\eta=\sigma^{1/2}$ について、$S_{\sigma\mid\rho}:=S_{\eta\mid\xi}$、$\Delta_{\sigma\mid\rho}:=\Delta_{\eta\mid\xi}$ と書く。このとき全ての作用素は $H_n$ 全体に定義され、
>
$$
\begin{aligned}
S_{\sigma\mid\rho}(X)
&=\rho^{-1/2}X^*\sigma^{1/2},\\
S_{\sigma\mid\rho}^{\sharp}(X)
&=\sigma^{1/2}X^*\rho^{-1/2},\\
\Delta_{\sigma\mid\rho}(X)
&=\sigma X\rho^{-1}
=L_\sigma R_{\rho^{-1}}(X),\\
\Delta_{\sigma\mid\rho}^{1/2}(X)
&=\sigma^{1/2}X\rho^{-1/2}.
\end{aligned}
$$
>
> さらに $J(X)=X^*$ と置けば、$J$ は反ユニタリで $S_{\sigma\mid\rho}=J\Delta_{\sigma\mid\rho}^{1/2}$ を満たす。両密度行列は可換とは仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $A=X\rho^{-1/2}$ を初期作用素へ入れて $S$ を得ます。随伴はトレースの巡回性と反線形随伴の内積定義を使い、$\Delta=S^\sharp S$ の左右係数を求めます。平方根は正の左右乗算の合成として構成し、その二乗・正値性・一意性を確認します。

<!-- proof-start -->
### 証明

任意の $X\in H_n$ は $X=A\xi$、$A=X\rho^{-1/2}$ と書けます。従って

$$
\begin{aligned}
S_{\sigma\mid\rho}(X)
&=A^*\sigma^{1/2}\\
&=(X\rho^{-1/2})^*\sigma^{1/2}\\
&=\rho^{-1/2}X^*\sigma^{1/2}.
\end{aligned}
$$

$H_n$ は有限次元で、$S$ は全域定義の連続な反線形作用素ですから閉じています。反線形随伴の規約は[既習の定義](../AQFT18/index.md#def-aqft18-antilinear-adjoint)により $\langle SX,Y\rangle_2=\langle S^\sharp Y,X\rangle_2$ です。直接計算すると

$$
\begin{aligned}
\langle SX,Y\rangle_2
&=\operatorname{Tr}((\rho^{-1/2}X^*\sigma^{1/2})^*Y)\\
&=\operatorname{Tr}(\sigma^{1/2}X\rho^{-1/2}Y)\\
&=\operatorname{Tr}(X\rho^{-1/2}Y\sigma^{1/2})\\
&=\langle \sigma^{1/2}Y^*\rho^{-1/2},X\rangle_2.
\end{aligned}
$$

ゆえに $S^\sharp(Y)=\sigma^{1/2}Y^*\rho^{-1/2}$。これを入力 $SX$ へ適用して

$$
\begin{aligned}
S^\sharp(SX)
&=\sigma^{1/2}(\rho^{-1/2}X^*\sigma^{1/2})^*\rho^{-1/2}\\
&=\sigma^{1/2}\sigma^{1/2}X\rho^{-1/2}\rho^{-1/2}\\
&=\sigma X\rho^{-1}
\end{aligned}
$$

を得ます。ここで $\rho$ と $\sigma$ を交換したのではなく、左側の $\sigma$ 同士、右側の $\rho^{-1/2}$ 同士を結合しただけです。

次に $\sigma$ の正規直交固有基底を $u_i$、その固有値を $s_i>0$、$\rho$ の正規直交固有基底を $v_j$、固有値を $r_j>0$ とします。**異なる固有基底**から作る階数1作用素

$$
F_{ij}=|u_i\rangle\langle v_j|
$$

はHilbert–Schmidt空間の正規直交基底です。なぜなら $F_{ij}^*F_{k\ell}=\delta_{ik}|v_j\rangle\langle v_\ell|$ で、トレースを取ると $\delta_{ik}\delta_{j\ell}$ となるからです。また

$$
\sigma F_{ij}=s_iF_{ij},\qquad
F_{ij}\rho^{-1}=r_j^{-1}F_{ij}
$$

なので、上で得た $\Delta$ は

$$
\Delta_{\sigma\mid\rho}F_{ij}
=\frac{s_i}{r_j}F_{ij}.
$$

全固有値が正であるため $\Delta$ は正定値自己共役であり、正平方根は $F_{ij}$ を $\sqrt{s_i/r_j}$ 倍します。$\sigma^{1/2}X\rho^{-1/2}$ も基底 $F_{ij}$ に同じ値で作用するので平方根公式を得ます。最後に[反ユニタリとしての $J(X)=X^*$](../AQFT20/index.md#thm-aqft20-modular-formulas)を用い、

$$
J\Delta_{\sigma\mid\rho}^{1/2}(X)
=(\sigma^{1/2}X\rho^{-1/2})^*
=\rho^{-1/2}X^*\sigma^{1/2}
=S_{\sigma\mid\rho}(X)
$$

を示しました。可換性を用いず全て成立します。
<!-- proof-end -->

### 直接検算：対角な二状態で分子・分母を見る

$$
\rho=\operatorname{diag}(3/4,1/4),\qquad
\sigma=\operatorname{diag}(1/3,2/3)
$$

と置きます。行列単位 $E_{ij}$ の行添字には $\sigma$ の固有値 $s_i$、列添字には $\rho$ の固有値 $r_j$ が対応するので、

$$
\begin{aligned}
S_{\sigma\mid\rho}(E_{12})
&=\sqrt{\frac{s_1}{r_2}}E_{21}
=\frac2{\sqrt3}E_{21},\\
S_{\sigma\mid\rho}(E_{21})
&=\sqrt{\frac{s_2}{r_1}}E_{12}
=\frac{2\sqrt2}{3}E_{12},\\
\Delta_{\sigma\mid\rho}(E_{12})
&=\frac43E_{12},\\
\Delta_{\sigma\mid\rho}(E_{21})
&=\frac89E_{21}.
\end{aligned}
$$

特に $S^2(E_{12})=\frac{4\sqrt2}{3\sqrt3}E_{12}\ne E_{12}$ です。二状態では $S^2=I$ を期待してはいけません。

## 5. 非可換な密度行列での固有ベクトル

$\rho$ と $\sigma$ が可換でないと、一つの共通固有基底を選ぶことはできません。それでも第4節の $F_{ij}=|u_i\rangle\langle v_j|$ は**行用と列用で別々の基底**を採用するため、相対作用素を対角化できます。

具体的に

$$
\rho=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},
\quad
\sigma=\begin{pmatrix}1/2&-1/6\\-1/6&1/2\end{pmatrix}
$$

とします。$\sigma$ の固有ベクトル $u_1=(1,-1)^{\mathsf T}/\sqrt2$ と $u_2=(1,1)^{\mathsf T}/\sqrt2$ に対する固有値はそれぞれ $2/3,1/3$、$\rho$ の固有ベクトル $v_1=e_1,v_2=e_2$ に対する固有値は $3/4,1/4$ です。ともに正定値でトレース1ですが、

$$
\rho\sigma-\sigma\rho
=\begin{pmatrix}0&-1/12\\1/12&0\end{pmatrix}\ne0.
$$

混合基底での固有値表は

| $F_{ij}$ | $F_{11}$ | $F_{12}$ | $F_{21}$ | $F_{22}$ |
|---|---:|---:|---:|---:|
| $s_i/r_j$ | $8/9$ | $8/3$ | $4/9$ | $4/3$ |

です。例えば $F_{12}=|u_1\rangle\langle e_2|$ について、

$$
\sigma F_{12}=\frac23F_{12},\qquad
F_{12}\rho^{-1}=4F_{12},\qquad
\Delta_{\sigma\mid\rho}F_{12}=\frac83F_{12}.
$$

単に対角成分の比を取るのではなく、**異なる二つの固有基底の行列要素を使う**のが非可換の場合の正しい計算法です。

## 6. 向き・正規化・忠実性の境界

<a id="prop-aqft29-orientation"></a>

<!-- formal-statement-start -->
> **命題（相対作用素の向きと規格化）**  
> 第4節の仮定の下で、$\Delta_{\sigma\mid\rho}=L_\sigma R_{\rho^{-1}}$ である一方、添字を交換すると
>
$$
\Delta_{\rho\mid\sigma}=L_\rho R_{\sigma^{-1}}.
$$
>
> これらは一般に同じ作用素ではない。さらに $\xi=\rho^{1/2}$、$\eta=\sigma^{1/2}$ に対し
>
$$
S_{\sigma\mid\rho}\xi=\eta,\quad
\Delta_{\sigma\mid\rho}^{1/2}\xi=\eta,\quad
\langle\xi,\Delta_{\sigma\mid\rho}\xi\rangle_2=1.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定理の最初の式へ $X=\rho^{1/2}$ を入れると

$$
S_{\sigma\mid\rho}\xi
=\rho^{-1/2}\rho^{1/2}\sigma^{1/2}
=\eta.
$$

平方根の式からも $\Delta_{\sigma\mid\rho}^{1/2}\xi
=\sigma^{1/2}\rho^{1/2}\rho^{-1/2}=\eta$ です。従って

$$
\begin{aligned}
\langle\xi,\Delta_{\sigma\mid\rho}\xi\rangle_2
&=\|\Delta_{\sigma\mid\rho}^{1/2}\xi\|_2^2\\
&=\|\sigma^{1/2}\|_2^2\\
&=\operatorname{Tr}\sigma=1.
\end{aligned}
$$

添字の交換式は同じ計算を $\rho$ と $\sigma$ を入れ替えて行えば得られます。例えば第4節の二つの対角密度に対し、$\Delta_{\sigma\mid\rho}(E_{12})=\frac43E_{12}$ ですが、$\Delta_{\rho\mid\sigma}(E_{12})=\frac98E_{12}$ なので等しくありません。
<!-- proof-end -->

**逆向きと逆作用素も別物です。** 有限次元では $S_{\rho\mid\sigma}\,S_{\sigma\mid\rho}=I$ ですが、同じ添字の $S_{\sigma\mid\rho}^2=I$ ではありません。また $\Delta_{\rho\mid\sigma}=J\Delta_{\sigma\mid\rho}^{-1}J$ であり、一般に $\Delta_{\rho\mid\sigma}=\Delta_{\sigma\mid\rho}^{-1}$ ではありません。この関係は $J(X)=X^*$ と左右乗算の式に代入して確認できます。

非忠実な入力密度では別の問題が生じます。$\rho_0=\operatorname{diag}(1,0)$、$\sigma$ を忠実な密度とすると、$A=E_{12}$ に対し $A\rho_0^{1/2}=0$ でありながら、

$$
A^*\sigma^{1/2}=E_{21}\sigma^{1/2}\ne0.
$$

従って $A\rho_0^{1/2}\mapsto A^*\sigma^{1/2}$ は**零入力に二つの出力**を割り当て、初期写像自体が一価ではありません。$\rho_0^{-1}$ が書けないという形式的問題より前に、分離性を失ったことが破綻の原因です。支持射影を使う適切な拡張はAQFT31で扱います。

局所Type III因子では密度行列 $\rho$ や通常のトレースによる行列表示を一般に作れません（[AQFT15のトレース障害](../AQFT15/index.md#thm-aqft15-typeiii-no-nsf-trace)）。その場合でも、標準表現の二つの忠実正規状態を表す巡回分離ベクトル $\xi,\eta$ から第1–3節の $S_{\eta\mid\xi}$ と $\Delta_{\eta\mid\xi}$ を定義できます。**一般の正規状態が必ず指定した任意の表現で巡回分離ベクトルを持つ、と主張しているわけではありません。** 標準形（自然正錐）により忠実状態を表す場合にこの構成を使います。一般の標準形の存在と状態の実現は既習の作用素環理論を前提とし、その構成証明を有限次元の計算で代用しません。

## 7. 演習と詳細解答

### Level A：向きと定義の確認

<a id="ex-aqft29-a01"></a>
#### AQFT29-A01 可換二点の全計算
- Level: A

$\mathcal M$ を $\mathbb C^2$ 上の対角行列環、$\xi=(\sqrt{1/4},\sqrt{3/4})$、$\eta=(\sqrt{3/4},\sqrt{1/4})$ とする。双方の巡回・分離性を確認し、$S_{\eta\mid\xi}$、$\Delta_{\eta\mid\xi}$ を求めよ。

**詳細解答。** 両ベクトルの成分は非零なので、任意の $x=(x_1,x_2)$ を $A\xi$ と書くには $A=\operatorname{diag}(2x_1,2x_2/\sqrt3)$ が一意に取れます。このことが巡回・分離の両方を示します。出力を $\eta$ に替えて

$$
S_{\eta\mid\xi}(x_1,x_2)
=(\sqrt3\,\overline{x_1},\overline{x_2}/\sqrt3).
$$

第2変数線形の内積により $S^\sharp=S$、従って $\Delta=S^\sharp S=\operatorname{diag}(3,1/3)$ です。いずれも有限次元で全域定義です。

<a id="ex-aqft29-a02"></a>
#### AQFT29-A02 正規直交行列単位の係数
- Level: A

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\operatorname{diag}(1/3,2/3)$ とする。$S_{\sigma\mid\rho}(E_{12})$、$S_{\sigma\mid\rho}^\sharp(E_{21})$、$\Delta_{\sigma\mid\rho}(E_{12})$ を計算し、随伴から $\Delta$ が得られることを確かめよ。

**詳細解答。** $E_{12}^*=E_{21}$、$\rho^{-1/2}E_{21}=2E_{21}$、$E_{21}\sigma^{1/2}=\sqrt{1/3}E_{21}$ なので $S(E_{12})=2E_{21}/\sqrt3$。随伴公式では $\sigma^{1/2}E_{12}=\sqrt{1/3}E_{12}$、$E_{12}\rho^{-1/2}=2E_{12}$ より $S^\sharp(E_{21})=2E_{12}/\sqrt3$。従って

$$
S^\sharp S(E_{12})
=\frac2{\sqrt3}\frac2{\sqrt3}E_{12}
=\frac43E_{12}.
$$

別に $\sigma E_{12}\rho^{-1}=(1/3)\cdot4 E_{12}$ としても一致します。

<a id="ex-aqft29-a03"></a>
#### AQFT29-A03 規格化と対角元
- Level: A

任意の忠実な密度 $\rho,\sigma$ に対して $S_{\sigma\mid\rho}(\rho^{1/2})$、$\Delta_{\sigma\mid\rho}^{1/2}(\rho^{1/2})$、$\langle\rho^{1/2},\Delta_{\sigma\mid\rho}\rho^{1/2}\rangle_2$ を求めよ。

**詳細解答。** [有限次元公式](#thm-aqft29-matrix-formulas)から、$\rho^{-1/2}\rho^{1/2}=I$ により $S(\rho^{1/2})=\sigma^{1/2}$ です。また $\Delta^{1/2}(\rho^{1/2})=\sigma^{1/2}\rho^{1/2}\rho^{-1/2}=\sigma^{1/2}$。ゆえに正平方根の自己共役性から

$$
\langle\rho^{1/2},\Delta\rho^{1/2}\rangle_2
=\|\Delta^{1/2}\rho^{1/2}\|_2^2
=\operatorname{Tr}((\sigma^{1/2})^*\sigma^{1/2})
=\operatorname{Tr}\sigma=1.
$$

これは二状態が等しいことを意味しません。

<a id="ex-aqft29-a04"></a>
#### AQFT29-A04 非忠実な入力の零表示
- Level: A

$\rho_0=\operatorname{diag}(1,0)$、$\sigma=I/2$ とし、$A=E_{12}$ を選ぶ。$A\rho_0^{1/2}$ と $A^*\sigma^{1/2}$ を求め、なぜ初期作用素の式が破綻するか説明せよ。

**詳細解答。** $E_{12}E_{11}=0$ より $A\rho_0^{1/2}=0$。一方 $A^*=E_{21}$、$\sigma^{1/2}=I/\sqrt2$ なので $A^*\sigma^{1/2}=E_{21}/\sqrt2\ne0$ です。$A=0$ でも入力は零ですが出力は零ですから、同一の入力が二つの異なる出力を持ちます。$\rho_0$ は分離的でなく、[相対Tomita初期作用素](#def-aqft29-relative-tomita)の仮定が失われています。

### Level B：定義域と左右乗算をつなぐ

<a id="ex-aqft29-b01"></a>
#### AQFT29-B01 可閉性の証明を再構成する
- Level: B

$\xi,\eta$ が $\mathcal M$ の巡回分離ベクトルであるとする。$S_0(A\xi)=A^*\eta$ が可閉であることを、$A_n\xi\to0$、$A_n^*\eta\to y$ から直接示せ。なぜ $\mathcal M'\xi$ の稠密性が必要か述べよ。

**詳細解答。** 分離性で $A\xi=C\xi$ なら $A=C$ だから $S_0$ は一価です。$\mathcal M'\xi$ の任意の $B\xi$ を試験ベクトルにして

$$
\begin{aligned}
\langle y,B\xi\rangle
&=\lim_n\langle A_n^*\eta,B\xi\rangle
=\lim_n\langle\eta,A_nB\xi\rangle\\
&=\lim_n\langle\eta,BA_n\xi\rangle
=\lim_n\langle B^*\eta,A_n\xi\rangle=0.
\end{aligned}
$$

$B$ は有界なので最後の極限は零です。[可換子の巡回性](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)より $\mathcal M'\xi$ は稠密で、$y$ は稠密集合に直交するから $y=0$ です。[可閉性の判定](../AQFT18/index.md#def-aqft18-closable)で閉包が存在します。稠密性がなければ $y$ は $\mathcal M'\xi$ の直交補へ入る余地があり、結論は得られません。

<a id="ex-aqft29-b02"></a>
#### AQFT29-B02 非可換二状態の混合固有基底
- Level: B

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\begin{psmallmatrix}1/2&-1/6\\-1/6&1/2\end{psmallmatrix}$ とする。双方が忠実な密度行列で非可換なことを確認し、$\Delta_{\sigma\mid\rho}$ の全固有値と正規直交固有基底を求めよ。

**詳細解答。** $\rho$ の固有値は $3/4,1/4$。$\sigma$ では $u_1=(1,-1)^{\mathsf T}/\sqrt2$ に固有値 $2/3$、$u_2=(1,1)^{\mathsf T}/\sqrt2$ に $1/3$ が対応します。両方正でトレース1です。積の差は

$$
[\rho,\sigma]
=\begin{pmatrix}0&-1/12\\1/12&0\end{pmatrix}\ne0.
$$

$\rho$ の固有ベクトルを $e_1,e_2$ として $F_{ij}=|u_i\rangle\langle e_j|$ を作ると、$\langle F_{ij},F_{k\ell}\rangle_2=\delta_{ik}\delta_{j\ell}$ で四個の正規直交基底です。[忠実な有限次元二状態の相対Tomita全計算](#thm-aqft29-matrix-formulas)を使い $\Delta F_{ij}=(s_i/r_j)F_{ij}$ と計算すると、$F_{11},F_{12},F_{21},F_{22}$ の順で $8/9,8/3,4/9,4/3$。可換性はこの対角化の条件ではありません。

<a id="ex-aqft29-b03"></a>
#### AQFT29-B03 向きを替えたときの違い
- Level: B

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\operatorname{diag}(1/3,2/3)$ について $\Delta_{\sigma\mid\rho}E_{12}$ と $\Delta_{\rho\mid\sigma}E_{12}$ を計算し、$\Delta_{\rho\mid\sigma}=\Delta_{\sigma\mid\rho}^{-1}$ が一般には成り立たないことを判定せよ。

**詳細解答。** [向きの命題](#prop-aqft29-orientation)より

$$
\Delta_{\sigma\mid\rho}(E_{12})
=\frac{1/3}{1/4}E_{12}=\frac43E_{12},
\quad
\Delta_{\rho\mid\sigma}(E_{12})
=\frac{3/4}{2/3}E_{12}=\frac98E_{12}.
$$

$\Delta_{\sigma\mid\rho}^{-1}E_{12}=\frac34E_{12}$ なので後者と異なります。実際 $J\Delta_{\sigma\mid\rho}^{-1}J(E_{12})$ は $J(E_{12})=E_{21}$ を経由し、$\Delta_{\sigma\mid\rho}^{-1}E_{21}=\frac98E_{21}$、再び $J$ を適用して $\frac98E_{12}$ となります。**反ユニタリ共役を挟んだ逆作用素**という関係が正しいものです。

<a id="ex-aqft29-b04"></a>
#### AQFT29-B04 反線形二乗と逆向き写像
- Level: B

忠実な $\rho,\sigma\in M_n(\mathbb C)$ に対して $S_{\rho\mid\sigma}S_{\sigma\mid\rho}=I$ を直接示せ。また $\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\operatorname{diag}(1/3,2/3)$ のとき $S_{\sigma\mid\rho}^2(E_{12})$ を計算し、両者を区別せよ。

**詳細解答。** [初期作用素の行列式](#thm-aqft29-matrix-formulas)を順に使い、

$$
\begin{aligned}
S_{\rho\mid\sigma}(S_{\sigma\mid\rho}(X))
&=\sigma^{-1/2}
(\rho^{-1/2}X^*\sigma^{1/2})^*
\rho^{1/2}\\
&=\sigma^{-1/2}\sigma^{1/2}X\rho^{-1/2}\rho^{1/2}
=X.
\end{aligned}
$$

同じ添字の二乗では第4節の $S(E_{12})=2E_{21}/\sqrt3$、$S(E_{21})=2\sqrt2 E_{12}/3$ を用い、

$$
S_{\sigma\mid\rho}^2(E_{12})
=\frac2{\sqrt3}\frac{2\sqrt2}{3}E_{12}
=\frac{4\sqrt2}{3\sqrt3}E_{12}\ne E_{12}.
$$

二回同じ変換を適用することと、反対向きの変換で元に戻すことは異なります。

### Level C：一般論と行列模型の接続

<a id="ex-aqft29-c01"></a>
#### AQFT29-C01 一般の可閉性から非可換有限行列へ
- Level: C

$\mathcal M$ と巡回分離ベクトル $\xi,\eta$ に対し (i) $S_{\eta\mid\xi,0}$ の一価性・可閉性を示し、(ii) $\mathcal M=L(M_2(\mathbb C))$、$\xi=\rho^{1/2}$、$\eta=\sigma^{1/2}$（忠実な正規化密度行列）では $S,S^\sharp,\Delta$ を求め、(iii) $\Delta$ が正であることを **$\rho\sigma=\sigma\rho$ を使わず** 示せ。

**詳細解答。** (i) $A\xi=C\xi$ から分離性により $A=C$。$\mathcal M\xi$ は巡回性から稠密です。$A_n\xi\to0$、$A_n^*\eta\to y$ なら $B\in\mathcal M'$ ごとに

$$
\langle y,B\xi\rangle
=\lim_n\langle B^*\eta,A_n\xi\rangle=0.
$$

[可換子の巡回性](../AQFT13/index.md#thm-aqft13-commutant-cyclic-separating)で $y=0$、従って[零列判定](../AQFT18/index.md#def-aqft18-closable)で可閉です。(ii) $A=X\rho^{-1/2}$ と復元すると

$$
S(X)=\rho^{-1/2}X^*\sigma^{1/2},
\quad
S^\sharp(X)=\sigma^{1/2}X^*\rho^{-1/2},
\quad
\Delta(X)=\sigma X\rho^{-1}.
$$

随伴の式は内積のトレース循環により $\langle SX,Y\rangle=\langle S^\sharp Y,X\rangle$ を検査して得ます。(iii) $\sigma u_i=s_i u_i$、$\rho v_j=r_j v_j$ で $s_i,r_j>0$ とします。$F_{ij}=|u_i\rangle\langle v_j|$ は正規直交基底で、$\Delta F_{ij}=(s_i/r_j)F_{ij}$。従って $X=\sum_{ij}x_{ij}F_{ij}$ なら

$$
\langle X,\Delta X\rangle_2
=\sum_{i,j}\frac{s_i}{r_j}|x_{ij}|^2>0
\qquad(X\ne0).
$$

これは正定値性を与え、対角形ゆえ自己共役性も従います。共通固有基底を仮定していないことが核心です。

<a id="ex-aqft29-c02"></a>
#### AQFT29-C02 Type IIIへの適用で言えること・言えないこと
- Level: C

局所von Neumann因子 $\mathcal M(O)$ がType IIIであり、ある標準表現で二つの忠実正規状態が巡回分離単位ベクトル $\xi,\eta$ によって実現されているとする。(i) 何を定義でき、どの演算の正値性を証明できるか、(ii) 有限次元の密度行列公式をそのまま適用できるか、(iii) $\xi$ の分離性を失うと第2節の証明のどこが壊れるか、論理的に判定せよ。

**詳細解答。** 三つの論点を順に分けて確認します。

(i) $S_0(A\xi)=A^*\eta$ は $\xi$ の分離性で一価、巡回性で稠密定義です。$\mathcal M'\xi$ の稠密性と可換性から可閉性を証明でき、閉包 $S$ について[閉反線形作用素の正二乗](../AQFT19/index.md#lem-aqft19-positive-square)により

$
\Delta_{\eta\mid\xi}=S^\sharp S
$

は非負自己共役です。

(ii) Type III因子には忠実正規半有限トレースがありません。従って部分系密度を一般に有限行列 $\rho,\sigma$ で表せず、有限次元の式 $L_\sigma R_{\rho^{-1}}$ はそのまま適用できません。一般論で有効なのは初期作用素と閉包の定義です。

(iii) 分離性を失うと $A\xi=0$ から $A=0$ を結論できず、$A\xi$ の表示一意性が壊れます。さらに $\mathcal M'\xi$ の稠密性も一般には導けず、第2節で $y=0$ を結論する箇所が使えません。「逆密度がない」だけでなく二つの論証機構が失われます。

---

## 次講への橋渡し

本講で得た相対作用素の向きは **$\Delta_{\sigma\mid\rho}$ の左が比較先 $\sigma$、右の逆が基準 $\rho$** です。次のAQFT30では $\rho$ を基準状態として

$$
-\langle\rho^{1/2},\log\Delta_{\sigma\mid\rho}\,\rho^{1/2}\rangle_2
$$

を計算し、有限次元の $\operatorname{Tr}\rho(\log\rho-\log\sigma)$ と一致することを、非可換な行列でも検証します。対数の定義域や零固有値の扱いは、その計算およびAQFT31の課題です。
