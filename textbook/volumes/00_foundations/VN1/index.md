# VN1 B(H) の作用素位相

<!-- definition-example-audit: strict -->

> **既出概念**：[OA6 の有界作用素とスペクトル射影](../OA6/index.md#def-oa6-bounded-borel-functional-calculus)、[FA3 の弱位相](../FA3/index.md#def-fa3-weak-topology)と弱収束、[Hilbert 随伴](../F0_02C3A_随伴作用素_Banach_Hilbert/index.md)を使います。

OA6 まででは、有界作用素全体

$$
B(H)
$$

を単位的 $C^*$-環として見て、ノルム

$$
\|T\|
=
\sup_{\|\xi\|\le1}\|T\xi\|
$$

を使ってきました。ノルムは「全ての単位ベクトルに対する誤差を一度に抑える」ので、とても強い収束概念です。

ところが無限次元では、その強さがかえって邪魔になります。

$H=\ell^2(\mathbb N)$ とし、標準正規直交基底を

$$
e_1,e_2,\ldots
$$

とします。$P_n$ を

$$
\operatorname{span}\{e_1,\ldots,e_n\}
$$

への直交射影とすると、各固定ベクトル

$$
\xi=(\xi_1,\xi_2,\ldots)
$$

に対して

$$
\|(I-P_n)\xi\|^2
=
\sum_{k>n}|\xi_k|^2
\longrightarrow0.
$$

つまり、どの固定ベクトルから見ても $P_n$ は恒等作用素 $I$ に近づきます。

しかし

$$
\|I-P_n\|=1
$$

は全ての $n$ で変わりません。$e_{n+1}$ を選べば

$$
(I-P_n)e_{n+1}=e_{n+1}
$$

だからです。

ここで欲しいのは「全ベクトルを同時に一様制御する」ノルムより弱く、

- 各固定ベクトルへの作用を見る位相
- さらに各行列係数だけを見る位相

です。

本章では順に

$$
\boxed{
\text{ノルム位相}
\Longrightarrow
\text{強作用素位相}
\Longrightarrow
\text{弱作用素位相}
}
$$

を導入します。

この二つが、次章 VN2 で

$$
\text{作用素代数をどの意味で閉じるか}
$$

を考えるための言語になります。

---

## 1. 強作用素位相：各ベクトルへの作用を見る

作用素 $T$ を調べる最も直接的な方法は、ベクトル $\xi$ を一つ固定して

$$
T\xi
$$

を見ることです。

したがって、各 $\xi\in H$ に対して

$$
p_\xi(T)=\|T\xi\|
$$

を考えます。これは $B(H)$ 上の半ノルムです。

<a id="def-vn1-sot"></a>

<!-- formal-statement-start -->
### 定義（強作用素位相）

$H$ を複素 Hilbert 空間とする。

$B(H)$ 上で、全ての $\xi\in H$ に対する評価写像

$$
\operatorname{ev}_\xi:B(H)\to H,
\qquad
\operatorname{ev}_\xi(T)=T\xi
$$

が $H$ のノルム位相へ連続となる最も粗い位相を **強作用素位相**、SOT と呼ぶ。

同値に、SOT は半ノルム族

$$
\boxed{
p_\xi(T)=\|T\xi\|,
\qquad \xi\in H
}
$$

が生成する局所凸位相である。
<!-- formal-statement-end -->

$T\in B(H)$ の基本近傍は、有限個のベクトル

$$
\xi_1,\ldots,\xi_m\in H
$$

と $\varepsilon>0$ を選んで

$$
U_{\mathrm{SOT}}
(T;\xi_1,\ldots,\xi_m;\varepsilon)
=
\left\{
A\in B(H):
\|(A-T)\xi_j\|<\varepsilon
\ (1\le j\le m)
\right\}
$$

と書けます。

一度に確認するベクトルは有限個ですが、位相全体としては全ての $\xi\in H$ を使います。

<!-- definition-example-start: def-vn1-sot -->

### 直接例：有限次元射影 $P_n$ は $I$ へ SOT 収束する

先ほどの $P_n$ について、任意の $\xi\in\ell^2(\mathbb N)$ に対し

$$
\|(P_n-I)\xi\|^2
=
\sum_{k>n}|\xi_k|^2
\longrightarrow0.
$$

従って

$$
\boxed{
P_n\xrightarrow{\mathrm{SOT}}I.
}
$$

一方で $\|P_n-I\|=1$ なのでノルム収束ではありません。

つまり SOT は「各固定ベクトル上では誤差が消えるが、最悪のベクトルを $n$ ごとに取り替えると誤差が残る」という現象を捉えます。

<!-- definition-example-end -->

SOT はネットで次のように判定できます。

<a id="thm-vn1-sot-criterion"></a>

<!-- formal-statement-start -->
### 定理（強作用素収束の評価判定）

$B(H)$ のネット $(T_\alpha)$ と $T\in B(H)$ に対して、次は同値である。

1. $T_\alpha\to T$ が SOT で成り立つ。
2. 全ての $\xi\in H$ に対して

$$
\boxed{
\|(T_\alpha-T)\xi\|
\longrightarrow0
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

SOT は半ノルム族 $p_\xi$ が生成する位相です。

したがって $T_\alpha\to T$ とは、全ての $\xi\in H$ に対して

$$
p_\xi(T_\alpha-T)
\to0
$$

であることと同値です。

$p_\xi(A)=\|A\xi\|$ を代入すれば

$$
\|(T_\alpha-T)\xi\|\to0
$$

を得ます。逆向きも同じ読み替えです。
<!-- proof-end -->

ここで重要なのは、$\xi$ を固定してから極限を取ることです。

$$
\sup_{\|\xi\|\le1}\|(T_n-T)\xi\|\to0
$$

を要求しているわけではありません。後者は作用素ノルム収束です。

---

## 2. ベクトル汎関数：作用素を一つの複素数で観測する

SOT は $T\xi$ というベクトル全体を見ます。

さらに弱めて、$T\xi$ と別のベクトル $\eta$ の内積だけを見ることを考えます。

以下、内積は第1変数について共役線形、第2変数について線形とします。

<a id="def-vn1-vector-functional"></a>

<!-- formal-statement-start -->
### 定義（ベクトル汎関数）

$\xi,\eta\in H$ に対して

$$
\boxed{
\omega_{\eta,\xi}(T)
=
\langle\eta,T\xi\rangle,
\qquad
T\in B(H)
}
$$

で定まる $B(H)$ 上の線形汎関数を **ベクトル汎関数** と呼ぶ。
<!-- formal-statement-end -->

[Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\begin{aligned}
|\omega_{\eta,\xi}(T)|
&=
|\langle\eta,T\xi\rangle|\\
&\le
\|\eta\|\,\|T\xi\|\\
&\le
\|\eta\|\,\|T\|\,\|\xi\|.
\end{aligned}
$$

従って

$$
\|\omega_{\eta,\xi}\|
\le
\|\eta\|\,\|\xi\|.
$$

つまりベクトル汎関数は作用素ノルムに関して連続な線形汎関数です。

<!-- definition-example-start: def-vn1-vector-functional -->

### 直接例：行列要素はベクトル汎関数である

$H=\mathbb C^m$ で標準基底を $e_1,\ldots,e_m$ とします。

行列 $T=(t_{ij})$ に対して

$$
\omega_{e_i,e_j}(T)
=
\langle e_i,Te_j\rangle
=
t_{ij}.
$$

したがってベクトル汎関数は、有限次元では文字通り「行列の一成分を読む」汎関数です。

無限次元でも、この行列要素の見方をそのまま使えます。

<!-- definition-example-end -->

---

## 3. 行列係数だけで収束を見る

各 $T\xi$ をベクトルとして追う代わりに、全ての $\eta$ との内積

$$
\langle\eta,T\xi\rangle
$$

だけを追う位相を入れます。

<a id="def-vn1-wot"></a>

<!-- formal-statement-start -->
### 定義（弱作用素位相）

$B(H)$ 上で、全ての $\xi,\eta\in H$ に対するベクトル汎関数

$$
\omega_{\eta,\xi}(T)
=
\langle\eta,T\xi\rangle
$$

が連続となる最も粗い位相を **弱作用素位相**、WOT と呼ぶ。

同値に、WOT は半ノルム族

$$
\boxed{
q_{\eta,\xi}(T)
=
|\langle\eta,T\xi\rangle|,
\qquad
\xi,\eta\in H
}
$$

が生成する局所凸位相である。
<!-- formal-statement-end -->

基本近傍は有限個の組

$$
(\eta_1,\xi_1),\ldots,(\eta_m,\xi_m)
$$

と $\varepsilon>0$ に対して

$$
U_{\mathrm{WOT}}
(T;\eta_j,\xi_j;\varepsilon)
=
\left\{
A:
|\langle\eta_j,(A-T)\xi_j\rangle|<\varepsilon
\ (1\le j\le m)
\right\}
$$

です。

<!-- definition-example-start: def-vn1-wot -->

### 直接例：unilateral shift の冪は WOT で $0$ へ収束する

$H=\ell^2(\mathbb N)$ とし、

$$
Se_k=e_{k+1}
$$

で unilateral shift $S$ を定めます。

まず有限支援ベクトル $\xi,\eta$ を取ります。$n$ が十分大きければ $S^n\xi$ の支援は $\eta$ の支援より右へ移るので

$$
\langle\eta,S^n\xi\rangle=0.
$$

一般の $\xi,\eta\in\ell^2$ について、有限支援ベクトル $\xi^{(m)},\eta^{(m)}$ を

$$
\xi^{(m)}\to\xi,
\qquad
\eta^{(m)}\to\eta
$$

となるように取ります。

$S^n$ は等長作用素なので

$$
\|S^n\zeta\|=\|\zeta\|.
$$

$n$ が十分大きく中央項が $0$ になると、

$$
\begin{aligned}
|\langle\eta,S^n\xi\rangle|
&\le
|\langle\eta-\eta^{(m)},S^n\xi\rangle|\\
&\quad+
|\langle\eta^{(m)},S^n(\xi-\xi^{(m)})\rangle|\\
&\le
\|\eta-\eta^{(m)}\|\,\|\xi\|
+
\|\eta^{(m)}\|\,\|\xi-\xi^{(m)}\|.
\end{aligned}
$$

右辺は $m$ を大きくすれば任意に小さくできます。従って

$$
\boxed{
S^n\xrightarrow{\mathrm{WOT}}0.
}
$$

しかし

$$
\|S^n e_1\|=1
$$

なので SOT では $0$ へ収束しません。

<!-- definition-example-end -->

<a id="thm-vn1-wot-criterion"></a>

<!-- formal-statement-start -->
### 定理（弱作用素収束の行列係数判定）

$B(H)$ のネット $(T_\alpha)$ と $T\in B(H)$ に対して、次は同値である。

1. $T_\alpha\to T$ が WOT で成り立つ。
2. 全ての $\xi,\eta\in H$ に対して

$$
\boxed{
\langle\eta,T_\alpha\xi\rangle
\longrightarrow
\langle\eta,T\xi\rangle
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

WOT は半ノルム

$$
q_{\eta,\xi}(A)
=
|\langle\eta,A\xi\rangle|
$$

が生成する位相です。

従って $T_\alpha\to T$ は、全ての $\eta,\xi$ に対して

$$
q_{\eta,\xi}(T_\alpha-T)
\to0
$$

と同値です。

これは

$$
|\langle\eta,(T_\alpha-T)\xi\rangle|
\to0
$$

そのものです。
<!-- proof-end -->

---

## 4. ノルム、SOT、WOT の強さを比較する

三つの収束の向きは一方向です。

<a id="prop-vn1-topology-comparison"></a>

<!-- formal-statement-start -->
### 命題（ノルム収束・強作用素収束・弱作用素収束の比較）

$T_\alpha,T\in B(H)$ とする。

$$
\boxed{
\|T_\alpha-T\|\to0
\Longrightarrow
T_\alpha\xrightarrow{\mathrm{SOT}}T
\Longrightarrow
T_\alpha\xrightarrow{\mathrm{WOT}}T.
}
$$

$H$ が無限次元なら、一般に逆向きは成り立たない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

作用素ノルム収束を仮定します。

任意の $\xi\in H$ に対して

$$
\|(T_\alpha-T)\xi\|
\le
\|T_\alpha-T\|\,\|\xi\|
\to0.
$$

よって SOT 収束です。

次に SOT 収束を仮定します。任意の $\xi,\eta\in H$ に対して [Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\begin{aligned}
|\langle\eta,(T_\alpha-T)\xi\rangle|
&\le
\|\eta\|\,
\|(T_\alpha-T)\xi\|\\
&\to0.
\end{aligned}
$$

従って WOT 収束です。

逆が成り立たない例はすでに見ています。

- $P_n\to I$ は SOT だが $\|P_n-I\|=1$ なのでノルム収束しない。
- $S^n\to0$ は WOT だが $\|S^n e_1\|=1$ なので SOT 収束しない。

これで二つの逆向きがともに失敗します。
<!-- proof-end -->

位相の細かさとしては

$$
\boxed{
\text{ノルム位相}
\supset
\mathrm{SOT}
\supset
\mathrm{WOT}
}
$$

です。左ほど細かく、右ほど粗い位相です。

### 有限次元では差が消える

無限次元性が本質であることも確認します。

<a id="prop-vn1-finite-dimensional-coincidence"></a>

<!-- formal-statement-start -->
### 命題（有限次元ではノルム位相・SOT・WOT が一致する）

$\dim H=m<\infty$ とする。

このとき $B(H)$ 上の

- 作用素ノルム位相
- 強作用素位相
- 弱作用素位相

は一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

すでに

$$
\text{ノルム収束}
\Longrightarrow
\mathrm{SOT}
\Longrightarrow
\mathrm{WOT}
$$

は分かっています。

WOT 収束からノルム収束を示せば十分です。

正規直交基底 $e_1,\ldots,e_m$ を固定し、

$$
A_\alpha=T_\alpha-T
$$

とします。

WOT 収束なら全ての $i,j$ について

$$
a_{ij}^{(\alpha)}
=
\langle e_i,A_\alpha e_j\rangle
\to0.
$$

成分は有限個しかないので

$$
\sum_{i,j=1}^m
|a_{ij}^{(\alpha)}|^2
\to0.
$$

任意の $x=\sum_jx_je_j$ に対し、[Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を各行へ使うと

$$
\|A_\alpha x\|^2
\le
\left(
\sum_{i,j}
|a_{ij}^{(\alpha)}|^2
\right)
\|x\|^2.
$$

従って

$$
\|A_\alpha\|
\le
\left(
\sum_{i,j}
|a_{ij}^{(\alpha)}|^2
\right)^{1/2}
\to0.
$$

よって WOT 収束はノルム収束を含意します。
<!-- proof-end -->

有限次元では「全ての行列係数」は有限個です。無限次元では無限個の方向を一様に制御できないため、三つの位相が分かれます。

---

## 5. FA3 の「弱位相」と WOT は同じではない

名称が非常に紛らわしいので、ここで切り分けます。

FA3 では Banach 空間 $X$ の弱位相

$$
\sigma(X,X^*)
$$

を学びました。$X=B(H)$ とすれば、Banach 空間としての弱位相は

$$
\sigma(B(H),B(H)^*)
$$

です。

ここでは **全ての** 連続線形汎関数

$$
F\in B(H)^*
$$

を使います。

一方 WOT が使うのは

$$
\omega_{\eta,\xi}(T)
=
\langle\eta,T\xi\rangle
$$

というベクトル汎関数だけです。

<a id="prop-vn1-wot-vs-banach-weak"></a>

<!-- formal-statement-start -->
### 命題（WOT と Banach 空間の弱位相の関係）

$B(H)$ を作用素ノルムによる Banach 空間とみなす。

Banach 空間の弱位相

$$
\sigma(B(H),B(H)^*)
$$

は WOT より細かい。

特に

$$
T_\alpha\to T
\quad\text{in }\sigma(B(H),B(H)^*)
$$

なら

$$
T_\alpha\xrightarrow{\mathrm{WOT}}T.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各ベクトル汎関数 $\omega_{\eta,\xi}$ は

$$
|\omega_{\eta,\xi}(T)|
\le
\|\eta\|\,\|T\|\,\|\xi\|
$$

を満たすので

$$
\omega_{\eta,\xi}\in B(H)^*.
$$

Banach 空間の弱位相は $B(H)^*$ の全ての元を連続にする位相です。従って、その一部である全ベクトル汎関数も連続になります。

WOT はベクトル汎関数だけを連続にする最も粗い位相なので、Banach 空間の弱位相の方が少なくとも同じだけ細かいことが分かります。
<!-- proof-end -->

整理すると、

- FA3 の弱位相：$B(H)^*$ 全体で検査する。
- WOT：$\langle\eta,T\xi\rangle$ という行列係数だけで検査する。

です。

「弱」という語だけを見て同一視しないことが重要です。後の VN4 では、$B(H)$ に特有の前双対と ultraweak 位相を導入し、どの汎関数を使っているかをさらに整理します。

---

## 6. 積はどこまで連続か

作用素環では位相だけでなく積

$$
(T,S)\longmapsto TS
$$

との相性が必要です。

まず固定した作用素を片側から掛ける操作は扱いやすいです。

$A\in B(H)$ を固定します。

もし

$$
T_\alpha\xrightarrow{\mathrm{SOT}}T
$$

なら

$$
\|(AT_\alpha-AT)\xi\|
\le
\|A\|\,
\|(T_\alpha-T)\xi\|
\to0,
$$

また

$$
\|(T_\alpha A-TA)\xi\|
=
\|(T_\alpha-T)(A\xi)\|
\to0.
$$

従って左右乗法は SOT 連続です。

WOT でも同様です。Hilbert 随伴を使うと

$$
\langle\eta,A(T_\alpha-T)\xi\rangle
=
\langle A^*\eta,(T_\alpha-T)\xi\rangle
\to0,
$$

$$
\langle\eta,(T_\alpha-T)A\xi\rangle
\to0.
$$

問題は $T_\alpha$ と $S_\alpha$ の両方が動くときです。

<a id="prop-vn1-sot-bounded-multiplication"></a>

<!-- formal-statement-start -->
### 命題（一様ノルム有界族上では積は SOT 収束を保つ）

$T_\alpha,S_\alpha,T,S\in B(H)$ とし、

$$
T_\alpha\xrightarrow{\mathrm{SOT}}T,
\qquad
S_\alpha\xrightarrow{\mathrm{SOT}}S
$$

とする。

さらに

$$
\sup_\alpha\|T_\alpha\|
\le C<\infty
$$

を仮定する。

このとき

$$
\boxed{
T_\alpha S_\alpha
\xrightarrow{\mathrm{SOT}}
TS.
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $\xi\in H$ を固定します。

差を

$$
T_\alpha S_\alpha-TS
=
T_\alpha(S_\alpha-S)
+
(T_\alpha-T)S
$$

と分けます。

従って

$$
\begin{aligned}
\|(T_\alpha S_\alpha-TS)\xi\|
&\le
\|T_\alpha(S_\alpha-S)\xi\|
+
\|(T_\alpha-T)S\xi\|\\
&\le
C\|(S_\alpha-S)\xi\|
+
\|(T_\alpha-T)(S\xi)\|.
\end{aligned}
$$

第1項は $S_\alpha\to S$ の SOT 収束から $0$ へ行きます。

第2項では $S\xi$ は一つの固定ベクトルなので、$T_\alpha\to T$ の SOT 収束から $0$ へ行きます。

従って任意の $\xi$ について

$$
\|(T_\alpha S_\alpha-TS)\xi\|\to0.
$$

よって積は SOT 収束します。
<!-- proof-end -->

「一様ノルム有界」という条件は単なる飾りではありません。SOT の近傍は有限個のベクトル上の値しか制御せず、作用素ノルムを局所的には制御しないからです。

### WOT では単位球上でも積が共同連続でない

unilateral shift $S$ を再び使います。

すでに

$$
S^n\xrightarrow{\mathrm{WOT}}0
$$

を示しました。

後で示す通り随伴は WOT 連続なので

$$
S^{*n}\xrightarrow{\mathrm{WOT}}0
$$

でもあります。

ところが $S$ は等長作用素なので

$$
S^*S=I.
$$

従って

$$
S^{*n}S^n=I
$$

が全ての $n$ で成り立ちます。

もし積が WOT で共同連続なら、左辺は $0\cdot0=0$ へ WOT 収束するはずです。しかし実際は常に $I$ です。

しかも

$$
\|S^n\|=\|S^{*n}\|=1.
$$

したがって WOT の積は、**単位球に制限しても共同連続ではありません**。

これは SOT と WOT の重要な非対称です。

---

## 7. 随伴は WOT では連続、SOT では連続でない

$C^*$-環では随伴

$$
T\longmapsto T^*
$$

が構造の一部です。

作用素位相との相性を調べます。

<a id="prop-vn1-wot-adjoint"></a>

<!-- formal-statement-start -->
### 命題（WOT では固定作用素による左右乗法と随伴が連続）

$A\in B(H)$ を固定する。

写像

$$
T\mapsto AT,
\qquad
T\mapsto TA,
\qquad
T\mapsto T^*
$$

はいずれも WOT 連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

左右乗法は前節で計算した通りです。

随伴について、$T_\alpha\xrightarrow{\mathrm{WOT}}T$ とします。

任意の $\xi,\eta\in H$ に対して

$$
\begin{aligned}
\langle\eta,T_\alpha^*\xi\rangle
&=
\langle T_\alpha\eta,\xi\rangle\\
&=
\overline{\langle\xi,T_\alpha\eta\rangle}.
\end{aligned}
$$

最初の等号は [Hilbert 随伴](../F0_02C3A_随伴作用素_Banach_Hilbert/index.md) の defining identity であり、二つ目は内積の共役対称性です。

WOT 収束により

$$
\langle\xi,T_\alpha\eta\rangle
\to
\langle\xi,T\eta\rangle.
$$

複素共役を取れば

$$
\langle\eta,T_\alpha^*\xi\rangle
\to
\langle\eta,T^*\xi\rangle.
$$

従って

$$
T_\alpha^*\xrightarrow{\mathrm{WOT}}T^*.
$$
<!-- proof-end -->

ところが SOT では随伴は連続ではありません。

<a id="prop-vn1-sot-adjoint-fails"></a>

<!-- formal-statement-start -->
### 命題（随伴は SOT では連続でない）

無限次元 Hilbert 空間 $\ell^2(\mathbb N)$ 上で、随伴写像

$$
B(H)\to B(H),
\qquad
T\mapsto T^*
$$

は SOT 連続ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

unilateral shift $S$ を使い、

$$
T_n=S^{*n}
$$

と置きます。

$\xi=(\xi_1,\xi_2,\ldots)\in\ell^2$ に対して

$$
S^{*n}\xi
=
(\xi_{n+1},\xi_{n+2},\ldots),
$$

したがって

$$
\|S^{*n}\xi\|^2
=
\sum_{k>n}|\xi_k|^2
\to0.
$$

よって

$$
T_n=S^{*n}
\xrightarrow{\mathrm{SOT}}0.
$$

一方

$$
T_n^*=S^n.
$$

標準基底 $e_1$ に対して

$$
\|S^n e_1\|=1
$$

なので

$$
S^n\not\xrightarrow{\mathrm{SOT}}0.
$$

従って随伴写像は SOT 連続ではありません。
<!-- proof-end -->

この差は、作用素環を SOT で閉じるときに少し注意が必要であることを示します。

次章の二重可換子定理は、単位を含む *-部分代数という代数構造と SOT/WOT 閉包が驚くほどよく噛み合うことを示します。

---

## 8. 「どの閉包を取るか」で代数は変わる

位相が粗いほど、閉包は大きくなりやすくなります。

したがって任意の集合 $\mathcal A\subset B(H)$ に対して

$$
\overline{\mathcal A}^{\|\cdot\|}
\subset
\overline{\mathcal A}^{\mathrm{SOT}}
\subset
\overline{\mathcal A}^{\mathrm{WOT}}.
$$

この差を最も具体的に見るには有限ランク作用素がよいです。

$H=\ell^2(\mathbb N)$ で $P_n$ を最初の $n$ 個の基底ベクトルへの射影とします。

任意の $T\in B(H)$ に対し

$$
F_n=P_nT
$$

と置くと、$F_n$ の値域は

$$
\operatorname{span}\{e_1,\ldots,e_n\}
$$

に入るので有限ランクです。

しかも任意の $\xi\in H$ に対して

$$
\begin{aligned}
\|(F_n-T)\xi\|
&=
\|(P_n-I)T\xi\|\\
&\to0
\end{aligned}
$$

です。

従って有限ランク作用素は SOT で $B(H)$ 全体を近似できます。

一方、恒等作用素 $I$ を有限ランク作用素 $F$ でノルム近似することはできません。

$F$ の核は無限次元空間 $H$ では非自明なので、$\xi\in\ker F$ を $\|\xi\|=1$ で取れば

$$
\|(I-F)\xi\|=1.
$$

従って

$$
\|I-F\|\ge1.
$$

つまり同じ有限ランク作用素でも、

$$
\text{SOT では }I\text{ に近づける}
$$

のに

$$
\text{ノルムでは }I\text{ に近づけない}
$$

のです。

これが von Neumann 環でノルム閉包とは別の閉包を考える理由の核心です。

---

## 9. 本章のまとめ

本章で得た三つの位相は

$$
\boxed{
\text{ノルム}
\Longrightarrow
\mathrm{SOT}
\Longrightarrow
\mathrm{WOT}
}
$$

という順に弱くなります。

意味はそれぞれ

$$
\begin{array}{c|c}
\text{位相} & \text{何を観測するか}\\
\hline
\text{ノルム} &
\sup_{\|\xi\|\le1}\|T\xi\|\\
\mathrm{SOT} &
T\xi\ \text{を各固定 }\xi\text{ ごとに見る}\\
\mathrm{WOT} &
\langle\eta,T\xi\rangle\ \text{を各 }\xi,\eta\text{ ごとに見る}
\end{array}
$$

です。

さらに、

- SOT の積は一様ノルム有界な族上で扱いやすい。
- WOT の積は単位球上でも共同連続ではない。
- 随伴は WOT 連続だが SOT 連続ではない。
- FA3 の弱位相は $B(H)^*$ 全体を使い、WOT はベクトル汎関数だけを使う。

ことを確認しました。

次の VN2 では、集合 $S\subset B(H)$ に対して可換する作用素全体

$$
S'
$$

を考え、その二重可換子

$$
S''
$$

と SOT/WOT 閉包が一致するという von Neumann の二重可換子定理へ進みます。

---

# 演習

## Level A

### A1. 射影列の SOT 収束とノルム非収束

$H=\ell^2(\mathbb N)$ とし、$P_n$ を

$$
\operatorname{span}\{e_1,\ldots,e_n\}
$$

への直交射影とする。

1. $P_n\to I$ が SOT で成り立つことを示せ。
2. $\|P_n-I\|=1$ を示せ。

- Level: A

#### 詳細解答

$\xi=(\xi_k)_{k\ge1}\in\ell^2$ を固定します。

$$
(P_n-I)\xi
=
(0,\ldots,0,-\xi_{n+1},-\xi_{n+2},\ldots)
$$

なので

$$
\|(P_n-I)\xi\|^2
=
\sum_{k>n}|\xi_k|^2.
$$

$\sum_{k=1}^\infty|\xi_k|^2<\infty$ だから、その尾和は $0$ へ収束します。

従って任意の $\xi$ について

$$
\|(P_n-I)\xi\|\to0.
$$

SOT の収束判定より

$$
P_n\xrightarrow{\mathrm{SOT}}I.
$$

次に $I-P_n$ 自身が直交射影なので

$$
\|I-P_n\|\le1.
$$

一方

$$
(I-P_n)e_{n+1}=e_{n+1}
$$

であり $\|e_{n+1}\|=1$ だから

$$
\|I-P_n\|\ge1.
$$

よって

$$
\boxed{\|I-P_n\|=1}.
$$

したがってノルム収束はしません。

---

### A2. rank-one 射影は $0$ へ SOT 収束する

$Q_n$ を $e_n$ への直交射影

$$
Q_n\xi
=
\langle e_n,\xi\rangle e_n
$$

とする。

$Q_n\to0$ が SOT で成り立つことを示し、$\|Q_n\|$ を求めよ。

- Level: A

#### 詳細解答

$\xi=(\xi_k)\in\ell^2$ を固定します。

内積の規約から

$$
Q_n\xi=\xi_n e_n
$$

なので

$$
\|Q_n\xi\|
=
|\xi_n|.
$$

$\ell^2$ の列は必ず $\xi_n\to0$ を満たします。従って

$$
\|Q_n\xi\|\to0
$$

が全ての固定 $\xi$ で成り立ちます。

よって

$$
Q_n\xrightarrow{\mathrm{SOT}}0.
$$

一方

$$
Q_ne_n=e_n
$$

なので

$$
\|Q_n\|\ge1.
$$

直交射影だから $\|Q_n\|\le1$ でもあり、

$$
\boxed{\|Q_n\|=1}.
$$

これも SOT 収束がノルム収束より弱いことを示します。

---

### A3. shift の冪は WOT だが SOT ではない

unilateral shift

$$
Se_k=e_{k+1}
$$

について

$$
S^n\xrightarrow{\mathrm{WOT}}0
$$

を示し、SOT 収束しないことを確認せよ。

- Level: A

#### 詳細解答

まず有限支援の $\xi,\eta$ を取ります。

$\xi$ の支援が $\{1,\ldots,N\}$ に、$\eta$ の支援が $\{1,\ldots,M\}$ に入るとします。

$n>M$ かつ十分大きければ $S^n\xi$ の支援は $\{n+1,\ldots,n+N\}$ に入り、$\eta$ の支援と交わりません。

したがって

$$
\langle\eta,S^n\xi\rangle=0.
$$

一般の $\xi,\eta\in\ell^2$ は有限支援ベクトルでノルム近似できます。

$S^n$ は等長作用素なので、本文と同じ評価により

$$
\langle\eta,S^n\xi\rangle\to0.
$$

従って WOT 収束判定から

$$
S^n\xrightarrow{\mathrm{WOT}}0.
$$

一方、$e_1$ を固定すると

$$
S^ne_1=e_{n+1},
$$

したがって

$$
\|S^ne_1\|=1
$$

です。

SOT で $0$ へ収束するならこのノルムは $0$ へ行かなければならないので、

$$
S^n\not\xrightarrow{\mathrm{SOT}}0.
$$

---

### A4. 随伴の SOT 非連続性

$T_n=S^{*n}$ とする。

1. $T_n\to0$ が SOT で成り立つことを示せ。
2. $T_n^*$ は $0$ へ SOT 収束しないことを示せ。

- Level: A

#### 詳細解答

$\xi=(\xi_1,\xi_2,\ldots)$ に対して

$$
S^{*n}\xi
=
(\xi_{n+1},\xi_{n+2},\ldots).
$$

従って

$$
\|S^{*n}\xi\|^2
=
\sum_{k>n}|\xi_k|^2
\to0.
$$

よって

$$
T_n=S^{*n}
\xrightarrow{\mathrm{SOT}}0.
$$

一方

$$
T_n^*=S^n.
$$

$e_1$ に作用させると

$$
\|T_n^*e_1\|
=
\|S^ne_1\|
=
1.
$$

従って $T_n^*$ は $0$ へ SOT 収束しません。

つまり

$$
T_n\xrightarrow{\mathrm{SOT}}0
$$

から

$$
T_n^*\xrightarrow{\mathrm{SOT}}0
$$

は従わず、随伴写像は SOT 連続ではありません。

---

## Level B

### B1. 有限次元では WOT 収束からノルム収束が従う

$H=\mathbb C^m$ とする。

$T_\alpha\to T$ が WOT で成り立つなら

$$
\|T_\alpha-T\|\to0
$$

を示せ。

- Level: B

#### 詳細解答

$$
A_\alpha=T_\alpha-T
$$

と置きます。

標準正規直交基底 $e_1,\ldots,e_m$ に対し

$$
a_{ij}^{(\alpha)}
=
\langle e_i,A_\alpha e_j\rangle
$$

とします。

WOT 収束から各 $i,j$ で

$$
a_{ij}^{(\alpha)}\to0.
$$

成分は $m^2$ 個しかないので

$$
r_\alpha^2
=
\sum_{i,j=1}^m
|a_{ij}^{(\alpha)}|^2
\to0.
$$

$x=\sum_jx_je_j$ に対し

$$
(A_\alpha x)_i
=
\sum_ja_{ij}^{(\alpha)}x_j.
$$

各 $i$ について [Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を使うと

$$
|(A_\alpha x)_i|^2
\le
\left(
\sum_j|a_{ij}^{(\alpha)}|^2
\right)
\left(
\sum_j|x_j|^2
\right).
$$

$i$ について和を取れば

$$
\|A_\alpha x\|^2
\le
r_\alpha^2\|x\|^2.
$$

従って

$$
\|A_\alpha\|
\le r_\alpha\to0.
$$

よってノルム収束です。

---

### B2. 一様ノルム有界族上での積

$$
T_\alpha\xrightarrow{\mathrm{SOT}}T,
\qquad
S_\alpha\xrightarrow{\mathrm{SOT}}S
$$

かつ

$$
\sup_\alpha\|T_\alpha\|\le C
$$

とする。

$T_\alpha S_\alpha\to TS$ が SOT で成り立つことを証明せよ。

- Level: B

#### 詳細解答

任意の $\xi\in H$ を固定します。

差を

$$
T_\alpha S_\alpha-TS
=
T_\alpha(S_\alpha-S)
+
(T_\alpha-T)S
$$

と分けます。

従って

$$
\begin{aligned}
\|(T_\alpha S_\alpha-TS)\xi\|
&\le
\|T_\alpha(S_\alpha-S)\xi\|
+
\|(T_\alpha-T)S\xi\|\\
&\le
C\|(S_\alpha-S)\xi\|
+
\|(T_\alpha-T)(S\xi)\|.
\end{aligned}
$$

$S_\alpha\to S$ が SOT なので第1項は $0$ へ収束します。

$S\xi$ は固定ベクトルであり、$T_\alpha\to T$ が SOT なので第2項も $0$ へ収束します。

従って任意の $\xi$ に対し

$$
\|(T_\alpha S_\alpha-TS)\xi\|\to0.
$$

よって

$$
T_\alpha S_\alpha
\xrightarrow{\mathrm{SOT}}
TS.
$$

---

### B3. WOT では積が単位球上でも共同連続でない

unilateral shift $S$ に対して

$$
A_n=S^{*n},
\qquad
B_n=S^n
$$

とする。

1. $A_n\to0$、$B_n\to0$ が WOT で成り立つことを示せ。
2. $A_nB_n$ の WOT 極限を求めよ。
3. これが WOT における積の共同連続性を否定する理由を説明せよ。

- Level: B

#### 詳細解答

本文から

$$
S^n\xrightarrow{\mathrm{WOT}}0.
$$

また随伴は WOT 連続なので

$$
S^{*n}\xrightarrow{\mathrm{WOT}}0.
$$

従って

$$
A_n\xrightarrow{\mathrm{WOT}}0,
\qquad
B_n\xrightarrow{\mathrm{WOT}}0.
$$

一方 $S$ は等長作用素だから

$$
S^*S=I.
$$

従って

$$
A_nB_n
=
S^{*n}S^n
=
I
$$

です。

よって積の列は

$$
A_nB_n\xrightarrow{\mathrm{WOT}}I.
$$

もし積写像が WOT で共同連続なら、

$$
(A_n,B_n)\to(0,0)
$$

から

$$
A_nB_n\to0
$$

が従うはずです。

実際には極限は $I$ なので矛盾します。

さらに

$$
\|A_n\|=\|B_n\|=1
$$

ですから、この失敗はノルム非有界性のせいではありません。単位球上でも積は WOT 共同連続ではありません。

---

### B4. WOT と Banach 弱位相を区別する

$B(H)$ を作用素ノルムで Banach 空間とみなす。

1. 各 $\xi,\eta\in H$ についてベクトル汎関数
   $\omega_{\eta,\xi}(T)=\langle\eta,T\xi\rangle$
   が $B(H)^*$ に属することを示せ。
2. Banach 空間の弱収束が WOT 収束を含意することを示せ。
3. 二つの位相の定義上の違いを一文で述べよ。

- Level: B

#### 詳細解答

まず [Cauchy--Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を使うと

$$
|\omega_{\eta,\xi}(T)|
=
|\langle\eta,T\xi\rangle|
\le
\|\eta\|\,\|T\xi\|.
$$

さらに作用素ノルムについて常に

$$
\|T\xi\|
\le
\|T\|\,\|\xi\|
$$

なので

$$
|\omega_{\eta,\xi}(T)|
\le
\|\eta\|\,\|T\|\,\|\xi\|.
$$

従って $\omega_{\eta,\xi}$ は作用素ノルムに関して連続な線形汎関数で、

$$
\omega_{\eta,\xi}\in B(H)^*.
$$

次に $T_\alpha\to T$ が Banach 空間の弱位相

$$
\sigma(B(H),B(H)^*)
$$

で成り立つとします。

これは全ての $F\in B(H)^*$ について

$$
F(T_\alpha)\to F(T)
$$

を意味します。

特に $F=\omega_{\eta,\xi}$ を選べるので

$$
\langle\eta,T_\alpha\xi\rangle
\to
\langle\eta,T\xi\rangle
$$

が全ての $\xi,\eta$ で成り立ちます。

よって WOT 収束です。

定義上の違いは、

> Banach 弱位相は $B(H)^*$ の全ての連続線形汎関数を使うが、WOT はベクトル汎関数だけを使う。

という点です。

---

## Level C

### C1. 有限ランク作用素は SOT では全作用素を近似できる

$H=\ell^2(\mathbb N)$ とし、$P_n$ を最初の $n$ 個の標準基底への直交射影とする。

任意の $T\in B(H)$ に対し

$$
F_n=P_nT
$$

と置く。

1. 各 $F_n$ が有限ランク作用素であることを示せ。
2. $F_n\to T$ が SOT で成り立つことを示せ。
3. 恒等作用素 $I$ は有限ランク作用素で作用素ノルム近似できないことを示せ。
4. この結果が「von Neumann 環ではノルム閉包とは別の閉包を考える」動機になる理由を説明せよ。

- Level: C

#### 詳細解答

まず

$$
\operatorname{Ran}(F_n)
=
\operatorname{Ran}(P_nT)
\subset
\operatorname{Ran}(P_n).
$$

$P_n$ の値域は

$$
\operatorname{span}\{e_1,\ldots,e_n\}
$$

なので $n$ 次元です。

従って

$$
\operatorname{rank}(F_n)\le n,
$$

よって $F_n$ は有限ランク作用素です。

次に任意の $\xi\in H$ を固定します。

$$
\begin{aligned}
(F_n-T)\xi
&=
(P_nT-T)\xi\\
&=
(P_n-I)(T\xi).
\end{aligned}
$$

$T\xi$ は $H$ の一つの固定ベクトルです。

A1 で

$$
P_n\xrightarrow{\mathrm{SOT}}I
$$

を示したので

$$
\|(P_n-I)(T\xi)\|
\to0.
$$

従って

$$
\|(F_n-T)\xi\|\to0
$$

が任意の $\xi$ で成り立ち、

$$
\boxed{
F_n\xrightarrow{\mathrm{SOT}}T.
}
$$

つまり有限ランク作用素は SOT で $B(H)$ 全体に稠密です。

最後に $I$ のノルム近似を考えます。

有限ランク作用素 $F$ を任意に取ります。$H$ は無限次元で $\operatorname{Ran}(F)$ は有限次元なので、$F$ は単射にはなれません。従って

$$
\ker F\ne\{0\}.
$$

$\xi\in\ker F$ を $\|\xi\|=1$ で取ると

$$
F\xi=0
$$

なので

$$
(I-F)\xi=\xi.
$$

従って

$$
\|I-F\|
\ge
\|(I-F)\xi\|
=
1.
$$

よって有限ランク作用素をどのように選んでも $I$ とのノルム距離は $1$ 未満になりません。

以上から、

- SOT 閉包では有限ランク作用素から $B(H)$ 全体まで到達できる。
- ノルム閉包では恒等作用素にすら到達できない。

ことが分かります。

したがって「同じ代数的な生成元から、どの位相で閉包を取るか」によって得られる作用素代数が大きく変わります。

von Neumann 環で SOT/WOT 閉包を考えるのは、無限次元で各ベクトルや行列係数に見える極限を代数の中へ取り込むためです。

次章 VN2 の二重可換子定理は、単位を含む *-部分代数について、この弱い閉包が可換子という純代数的条件

$$
M=M''
$$

で特徴付けられることを示します。
