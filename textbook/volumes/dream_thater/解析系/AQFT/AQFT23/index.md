# AQFT23 Takesakiのモジュラー不変性

[AQFT22のTomita可換子定理](../AQFT22/index.md#thm-aqft22-commutant)で、巡回・分離ベクトルに付随する反ユニタリ $J$ が $\mathcal M$ とその可換子 $\mathcal M'$ を交換することを証明しました。しかし、正作用素 $\Delta$ から得る時間発展が、元の**観測可能量の代数そのもの**にとどまるかは別の問いです。

有限次元の[AQFT20の具体式](../AQFT20/index.md#thm-aqft20-finite-flow)では $\rho^{it}A\rho^{-it}$ が再び行列となるため簡単に見えます。一般のvon Neumann環では、$\Delta$ は非有界にもなり、$\Delta^{it}A\Delta^{-it}$ が $\mathcal M$ に属するとは、ユニタリで挟んだことだけでは分かりません。本講では前講の**全時刻に関する解析的包含**を正確に取り出して不変性を証明し、群作用、状態保存、連続性、解析的な代数元とグラフcoreを構成します。

内積は第2変数線形です。時間の向きは $\sigma_t=\operatorname{Ad}\Delta^{it}$ と固定します。熱平衡の複素帯とKMS境界条件は次講で証明します。

## 1. 非有界な $\Delta$ と有界な時間発展を分ける

$\mathcal H$ を複素Hilbert空間、$\mathcal M\subset B(\mathcal H)$ を単位的von Neumann環、$\Omega$ を巡回・分離的な単位ベクトルとします。これは[標準対](../AQFT18/index.md#def-aqft18-standard-pair)です。[極分解とモジュラー関係](../AQFT19/index.md#thm-aqft19-modular-relations)より、閉Tomita作用素とそのモジュラー対象は

$$
S=J\Delta^{1/2},\qquad
J^2=I,\quad J\Delta J=\Delta^{-1},\quad
J\Omega=\Omega,\quad\Delta\Omega=\Omega
$$

を満たします。$\Delta$ は核のない正自己共役作用素であり、逆は一般に非有界です。これに対して[自己共役作用素のBorel関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)で

$$
H=\log\Delta,\qquad U_t=e^{itH}=\Delta^{it}\quad(t\in\mathbb R)
$$

と定めれば、$U_t$ は**全域定義のユニタリ**です。$U_{t+s}=U_tU_s$、$U_0=I$ かつ $U_tx\to x$（$t\to0$、各 $x\in\mathcal H$）です。

ここで「強連続」は各ベクトルへ作用させてからノルム収束する性質です。$\|U_t-I\|\to0$ という**作用素ノルム連続**とは異なります。$\sigma_t(A)=U_tAU_{-t}$ はどの $A\in B(\mathcal H)$ に対しても有界ですが、$\sigma_t(A)\in\mathcal M$ はまだ導かれていません。

## 2. 前講の解析的包含から不変性を閉じる

[AQFT22のTomita可換子定理の証明](../AQFT22/index.md#thm-aqft22-commutant)の第一包含では、単に $J\mathcal M'J\subset\mathcal M$ を示しただけではありません。可換子の元をレゾルベントで代数元へ回復し、共通グラフcore上の二重半べき恒等式とcosh核の積分表示を比較しました。その結果、**すべての実数 $t$** と $B\in\mathcal M'$ について

$$
J U_{-t} B U_t J\in\mathcal M
$$

を得ています。この時刻付きの包含がなければ、$J\mathcal M J=\mathcal M'$ という等号だけから以下の不変性を導くことはできません。

反線形性があるため $J\Delta^{it}J$ の符号は慎重に扱います。[モジュラー関係](../AQFT19/index.md#thm-aqft19-modular-relations)をスペクトル関数 $r^{it}$ に適用すると、$r\mapsto r^{-1}$ と複素共役が**同時に**働くので

$$
J\Delta^{it}J
=\overline{(\Delta^{-1})^{it}}
=\Delta^{it}=U_t.
$$

この式の上線は関数計算の複素係数に対する共役を表し、作用素の随伴を取る略記ではありません。従って $JU_t=U_tJ$ です。先ほどの包含を共役し直すと、不変性の証明に必要な形になります。

<a id="lem-aqft23-time-inclusion"></a>

<!-- formal-statement-start -->
> **補題（時刻付き可換子包含からモジュラー包含へ）**  
> 標準対 $(\mathcal M,\Omega)$ に付随する $J,\Delta,U_t=\Delta^{it}$ について、[AQFT22の解析的包含](../AQFT22/index.md#thm-aqft22-commutant)と $J\mathcal M'J=\mathcal M$ から、任意の実数 $t$ について
$$
U_{-t}\mathcal M U_t\subset\mathcal M
$$
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

前講の式に任意の $A\in\mathcal M$ を代入するため、$B=JAJ\in\mathcal M'$ とします。$J$ と $U_t$ の交換関係を用い、集合の包含へ戻します。

<!-- proof-start -->
### 証明

[AQFT22の可換子等号](../AQFT22/index.md#thm-aqft22-commutant)を $J$ で両側共役すると $J\mathcal M'J=\mathcal M$ です。任意の $A\in\mathcal M$ について $B=JAJ\in\mathcal M'$ と置けるので、前講で示した時刻付きの解析的包含を適用できます。

$$
\begin{aligned}
J U_{-t} B U_t J
&=(JU_{-t}J)(JBJ)(JU_tJ)\\
&=U_{-t}AU_t\in\mathcal M.
\end{aligned}
$$

$A$ は任意だったので $U_{-t}\mathcal M U_t\subset\mathcal M$ が従います。$U_t$ は有界・全域のユニタリですから、ここに非有界作用素の積の定義域問題はありません。
<!-- proof-end -->

この包含を負の時刻にも適用できることが重要です。

<a id="thm-aqft23-modular-invariance"></a>

<!-- formal-statement-start -->
> **定理（Takesakiのモジュラー不変性）**  
> $\mathcal M\subset B(\mathcal H)$ を単位的von Neumann環、$\Omega\in\mathcal H$ を $\mathcal M$ に対して巡回・分離的な単位ベクトルとする。閉Tomita作用素の極分解 $S=J\Delta^{1/2}$ に対し、すべての $t\in\mathbb R$ で
$$
\boxed{\Delta^{it}\mathcal M\Delta^{-it}=\mathcal M}
$$
> が成立する。有限次元性、trace、factor性、局所netの双対性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

一方向の包含を「任意の実時刻」について得たからこそ、$t$ と $-t$ を使って**逆包含**を復元できます。片方だけの包含や、$t\ge0$ のみの包含では不足します。

<!-- proof-start -->
### 証明

[時刻付き包含補題](#lem-aqft23-time-inclusion)に $t$ と $-t$ を代入すると

$$
U_{-t}\mathcal M U_t\subset\mathcal M,\qquad
U_t\mathcal M U_{-t}\subset\mathcal M
$$

です。第一の包含を左右から $U_t,U_{-t}$ で共役すれば、$U_tU_{-t}=I$ から

$$
\mathcal M
=U_t(U_{-t}\mathcal M U_t)U_{-t}
\subset U_t\mathcal M U_{-t}.
$$

これと第二の包含を合わせて $\mathcal M=U_t\mathcal M U_{-t}$。$U_t=\Delta^{it}$ を戻すと結論です。前講で成立した**時刻付き解析的包含**が一般論の非自明な部分を担っています。
<!-- proof-end -->

## 3. モジュラー時間発展と不変状態

ここからは不変性が証明済みなので、$A\in\mathcal M$ を時間発展させても代数の外へ出ません。各時刻の写像が積・随伴・単位元を保ち、逆写像があり、時間に関して各ベクトル上で連続であることを明記したものを「強連続な時間発展の群」と呼びます。

<a id="def-aqft23-modular-flow"></a>

<!-- formal-statement-start -->
> **定義（モジュラー自己同型群）**  
> 標準対 $(\mathcal M,\Omega)$ のモジュラー作用素 $\Delta$ について、各 $t\in\mathbb R$ と $A\in\mathcal M$ に
$$
\sigma_t(A)=\Delta^{it}A\Delta^{-it}
$$
> を対応させる。この写像族を**モジュラー自己同型群**と呼ぶ。$t\mapsto\sigma_t(A)$ の連続性は、各 $x\in\mathcal H$ に対する $\|\sigma_t(A)x-\sigma_s(A)x\|\to0$ を意味する強作用素連続性である。一般の $A$ に作用素ノルム連続性は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft23-modular-flow -->
### 定義の直接確認：忠実な二準位模型

[AQFT20のHilbert–Schmidt標準表現](../AQFT20/index.md#thm-aqft20-modular-formulas)で $\mathcal H=M_2(\mathbb C)$、$\mathcal M=\{L_A:A\in M_2(\mathbb C)\}$、$\Omega=\rho^{1/2}$、$\rho=\operatorname{diag}(3/4,1/4)$ とします。$L_A(X)=AX$、$\Delta(X)=\rho X\rho^{-1}$ です。$\rho$ は正定値なので逆行列が存在し、$\Omega$ は巡回・分離的です。

任意の $X$ に対して、$U_t(X)=\rho^{it}X\rho^{-it}$ より

$$
\begin{aligned}
\sigma_t(L_A)(X)
&=U_tL_AU_{-t}(X)\\
&=\rho^{it}A\rho^{-it}X\\
&=L_{\rho^{it}A\rho^{-it}}(X).
\end{aligned}
$$

従って結果は確かに $\mathcal M$ の元です。積について $\sigma_t(L_A L_B)=\sigma_t(L_A)\sigma_t(L_B)$、随伴について $\sigma_t(L_{A^*})=\sigma_t(L_A)^*$、逆写像について $\sigma_{-t}\sigma_t(L_A)=L_A$ をこの表示から直接検査できます。全ての行列成分が有限和の連続な指数関数なので、強連続性も成立します。$\rho$ の固有値を $p_1,p_2$ とすると

$$
\sigma_t(L_{E_{ij}})
=\left(\frac{p_i}{p_j}\right)^{it}L_{E_{ij}},
\quad
\sigma_t(L_{E_{12}})=3^{it}L_{E_{12}},
\quad\sigma_t(L_{E_{21}})=3^{-it}L_{E_{21}}.
$$

**定義の確認**：像が代数内にあること、積・随伴・単位・逆・強連続性を独立に確認しました。これは一般定理の証明ではなく具体例です。
<!-- definition-example-end -->

<a id="thm-aqft23-group-state"></a>

<!-- formal-statement-start -->
> **定理（自己同型群の性質と状態保存）**  
> [モジュラー不変性定理](#thm-aqft23-modular-invariance)の仮定の下で、各 $\sigma_t$ は $\mathcal M$ 上の正規な単位的 $*$-自己同型であり、
$$
\sigma_0=\operatorname{id},\qquad
\sigma_t\circ\sigma_s=\sigma_{t+s},\qquad
\|\sigma_t(A)\|=\|A\|
$$
> を満たす。任意の $A\in\mathcal M$ と $x\in\mathcal H$ について $t\mapsto\sigma_t(A)x$ はノルム連続である。また $\omega(A)=\langle\Omega,A\Omega\rangle$ とすると
$$
\omega(\sigma_t(A))=\omega(A)
$$
> であり、$\omega$ は忠実な正規状態である。
<!-- formal-statement-end -->

### 証明の見取り図

$\sigma_t$ は全域ユニタリによる共役なので積・随伴を保ちます。連続性は、**動くユニタリの両側**を一度ずつ評価します。状態保存には $U_t\Omega=\Omega$ を使います。

<!-- proof-start -->
### 証明

$A,B\in\mathcal M$ について、$U_{-t}U_t=I$ より

$$
\begin{aligned}
\sigma_t(AB)&=U_tABU_{-t}
=(U_tAU_{-t})(U_tBU_{-t}),\\
\sigma_t(A^*)&=U_tA^*U_{-t}
=(U_tAU_{-t})^*,\\
\sigma_t(I)&=I.
\end{aligned}
$$

[モジュラー不変性](#thm-aqft23-modular-invariance)により像はちょうど $\mathcal M$、逆写像は $\sigma_{-t}$ です。$U_tU_s=U_{t+s}$ から群法則が従い、ユニタリ不変性で $\|\sigma_t(A)\|=\|A\|$。正規性は、$B(\mathcal H)$ 上のユニタリ共役が超弱位相で連続であり、その逆も同様であることから従います。具体的にはトレース級 $T$ で試すと

$$
\operatorname{Tr}\bigl(TU_tAU_{-t}\bigr)
=\operatorname{Tr}\bigl(U_{-t}TU_tA\bigr)
$$

で、右辺もトレース級作用素を使った超弱連続汎関数です。

$t\to s$ で $U_t\to U_s$、$U_{-t}\to U_{-s}$ は各ベクトル上で強収束します。固定した $x$ に対し

$$
\begin{aligned}
\|U_tAU_{-t}x-U_sAU_{-s}x\|
&\le \|A\|\|(U_{-t}-U_{-s})x\|\\
&\quad+\|(U_t-U_s)AU_{-s}x\|\longrightarrow0.
\end{aligned}
$$

$U_t\Omega=\Omega$ は $\Delta\Omega=\Omega$ と関数計算から従い、従って

$$
\omega(\sigma_t(A))
=\langle U_{-t}\Omega,A U_{-t}\Omega\rangle
=\langle\Omega,A\Omega\rangle.
$$

$\omega(I)=1$、$\omega(A^*A)=\|A\Omega\|^2\ge0$、分離性により $\omega(A^*A)=0\Rightarrow A=0$ なので忠実です。ベクトル状態は正規です。
<!-- proof-end -->

## 4. 解析的な代数元とグラフcoreを実際に作る

$A\Omega$ は [AQFT21のスペクトルcore](../AQFT21/index.md#lem-aqft21-spectral-core)の全解析ベクトルとは限りません。さらに、$\Delta$ の解析的**ベクトル**があっても、それが $A\Omega$ という形を保つ保証はありません。今回初めて得た $\sigma_t(\mathcal M)=\mathcal M$ によって、**代数内で時間を平均する**ことが正当化されます。

複素時間の作用をすべての $A\in\mathcal M$ に定義するのは誤りです。実時間の軌道 $t\mapsto\sigma_t(A)$ が、作用素ノルムで全複素平面に正則延長できる特殊な $A$ のみを「全解析的な元」と呼びます。

<a id="def-aqft23-entire-element"></a>

<!-- formal-statement-start -->
> **定義（モジュラー流の全解析的元）**  
> モジュラー自己同型群 $(\sigma_t)_{t\in\mathbb R}$ に対し、$A\in\mathcal M$ が**全解析的な元**であるとは、作用素ノルムで正則な写像 $z\mapsto\sigma_z(A)\in\mathcal M$（$z\in\mathbb C$）が存在し、実 $z=t$ で $\sigma_t(A)$ と一致することをいう。この延長は実軸上の値により一意である。これは[全解析ベクトル](../AQFT21/index.md#def-aqft21-entire-vector)とは異なる概念である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft23-entire-element -->
### 定義の直接確認：行列単位

先の二準位模型では

$$
\sigma_z(L_{E_{12}})=e^{iz\log3}L_{E_{12}}
$$

とすべての $z\in\mathbb C$ で置けます。係数は整関数なので作用素ノルム正則であり、実軸では既に計算した流と一致します。$E_{11}$ なら $\sigma_z(L_{E_{11}})=L_{E_{11}}$ です。**定義の確認**：いずれも $\mathcal M$ に値を持ち、**作用素ノルムで正則・代数内に値を持つ・実軸上で所定の作用に一致する**という条件を満たします。一般の無限次元環の全ての元がこうなるわけではありません。
<!-- definition-example-end -->

次の定理は、強連続なだけの作用からノルム解析的な元を作ります。$g_\varepsilon(s)=(\pi\varepsilon)^{-1/2}\exp(-s^2/\varepsilon)$（$\varepsilon>0$）とし、実数 $s$ の強作用素積分で

$$
A_\varepsilon
=\int_{\mathbb R}g_\varepsilon(s)\sigma_s(A)\,ds
$$

と置きます。これは各 $x$ に作用させて $\int g_\varepsilon(s)\sigma_s(A)x\,ds$ をHilbert空間値Bochner積分する意味です。一般の $\sigma_s(A)$ は作用素ノルム連続でないため、最初から**作用素ノルムでのBochner積分**と解釈しません。

<a id="thm-aqft23-gaussian-analytic"></a>

<!-- formal-statement-start -->
> **定理（Gaussian平滑化による代数内全解析的元）**  
> 標準対のモジュラー群 $(\sigma_t)$ に対し、任意の $A\in\mathcal M$、$\varepsilon>0$ について $A_\varepsilon$ は $\mathcal M$ に属し、$\|A_\varepsilon\|\le\|A\|$ である。さらに
$$
\sigma_z(A_\varepsilon)
=\int_{\mathbb R}g_\varepsilon(s-z)\sigma_s(A)\,ds
\quad(z\in\mathbb C)
$$
> は作用素ノルムで整関数かつ $\mathcal M$ に値を持ち、
$$
\|\sigma_z(A_\varepsilon)\|
\le e^{(\operatorname{Im}z)^2/\varepsilon}\|A\|
$$
> を満たす。$\varepsilon\downarrow0$ で $A_\varepsilon\to A$ および $A_\varepsilon^*\to A^*$ は強作用素位相で収束する。従って全解析的な元は強作用素位相で稠密である。
<!-- formal-statement-end -->

### 証明の見取り図

実時間の軌道が$\mathcal M$に属するため、有限積分の極限も代数内に残ります。複素時間へは作用素 $\Delta^{iz}$ で直接共役せず、**Gaussianの核の側を複素平行移動**します。

<!-- proof-start -->
### 証明

任意の $x\in\mathcal H$ について $s\mapsto\sigma_s(A)x$ は連続で、ノルムは高々 $\|A\|\|x\|$。よって強積分は有界作用素を定め、$\|A_\varepsilon\|\le\|A\|$ です。積分を有界区間のRiemann和で近似し、尾部を $\int_{|s|>R}g_\varepsilon(s)\,ds$ で抑えます。各和は $\mathcal M$ に属し、von Neumann環 $\mathcal M$ の強作用素位相での閉性により $A_\varepsilon\in\mathcal M$ です。

複素 $z=x+iy$ について

$$
|g_\varepsilon(s-z)|
=g_\varepsilon(s-x)e^{y^2/\varepsilon},
\qquad
\int_{\mathbb R}|g_\varepsilon(s-z)|\,ds
=e^{y^2/\varepsilon}.
$$

従って複素核の強積分も有界で、示したノルム評価と $\mathcal M$ への所属が従います。$z$ をコンパクト集合に限ると、$g_\varepsilon(s-z)$ とその $z$ 微分・高階微分は、$s$ に関する可積分なGaussianと多項式の積で一様に抑えられます。したがって差商を $L^1(ds)$ で極限に移せ、例えば

$$
\frac{d}{dz}\sigma_z(A_\varepsilon)
=\int_{\mathbb R}\frac{2(s-z)}{\varepsilon}
g_\varepsilon(s-z)\sigma_s(A)\,ds
$$

が**作用素ノルムで**成立します（差商の誤差ノルムは核の $L^1$ 誤差の $\|A\|$ 倍以下）。これにより整関数性が示されます。

実時刻 $t$ では $\sigma_t$ が有界線形で強連続だから積分の内側へ移せます。変数変換 $r=s+t$ により

$$
\begin{aligned}
\sigma_t(A_\varepsilon)
&=\int g_\varepsilon(s)\sigma_{t+s}(A)\,ds\\
&=\int g_\varepsilon(r-t)\sigma_r(A)\,dr,
\end{aligned}
$$

となり、複素延長は実時刻の作用と一致します。最後に $t=0$ での強連続性とGaussian近似単位から、各 $x$ に対して

$$
\|(A_\varepsilon-A)x\|
\le\int g_\varepsilon(s)\|(\sigma_s(A)-A)x\|\,ds
\longrightarrow0.
$$

$g_\varepsilon$ が実数値で $\sigma_s(A)^*=\sigma_s(A^*)$ なので $A_\varepsilon^*=(A^*)_\varepsilon$。同じ議論で随伴も強収束します。
<!-- proof-end -->

### 演習につながる重要な区別：解析元の稠密性はノルム稠密性ではない

上の主張は**強作用素稠密**です。$t\mapsto\sigma_t(A)$ がノルム不連続な場合、$\sigma$ の全解析的元が $\mathcal M$ 全体にノルム稠密とは限りません。実際、次の無限次元標準対で失敗します。

$\mathcal K=\ell^2(\mathbb N)$ 上の忠実密度 $\rho=\operatorname{diag}(p_n)$、$p_n=ce^{-n^2}$（$\sum_np_n=1$）を取り、Hilbert–Schmidt標準表現 $\mathcal M=L(B(\mathcal K))$、$\Omega=\rho^{1/2}$ とします。[AQFT20の公式](../AQFT20/index.md#thm-aqft20-finite-flow)をスペクトル関数計算で行列単位へ拡張すると

$$
\sigma_t(L_A)=L_{\rho^{it}A\rho^{-it}}
$$

です。片側シフト $Ve_n=e_{n+1}$ に対し、

$$
\rho^{it}V\rho^{-it}e_n
=\left(\frac{p_{n+1}}{p_n}\right)^{it}e_{n+1}
=e^{-it(2n+1)}e_{n+1}.
$$

$t_n=\pi/(2n+1)\to0$ と選べば $n$ 番目の基底ベクトル上の係数は $-1$ なので

$$
\|\sigma_{t_n}(L_V)-L_V\|
=\|\rho^{it_n}V\rho^{-it_n}-V\|=2.
$$

この標準対では強連続性は保たれる一方、作用素ノルム連続性は失われます。もし全解析的元がノルム稠密なら、ノルム連続な軌道の一様近似によってすべての元の軌道がノルム連続になってしまい矛盾します。**強い意味での解析化**と**ノルム位相での密度**は混同できません。

## 5. 平滑化した代数元が非有界作用素のcoreになる理由

代数元を複素時間へ延長できても、それを $\Delta^{\pm1/2}$ の定義域へ入れなければ、無限次元の証明で演算を正当化できません。以下では[全解析ベクトルとグラフcoreの定義](../AQFT21/index.md#def-aqft21-entire-vector)を用います。

<a id="thm-aqft23-analytic-core"></a>

<!-- formal-statement-start -->
> **定理（代数内解析元による共通グラフcore）**  
> 標準対の $H=\log\Delta$ と、前節で構成した $A_\varepsilon$ を用い、
$$
\mathcal E
=\operatorname{span}\{A_\varepsilon\Omega:
A\in\mathcal M,\ \varepsilon>0\}
$$
> とする。このとき $\mathcal E$ の各元は $U_t=e^{itH}$ の全解析ベクトルである。$\mathcal E$ は任意の実数 $r$ に対して $\Delta^r=e^{rH}$ のグラフcoreであり、有限個の実数 $r_1,\ldots,r_k$ を指定した場合、同じ近似列で各 $\Delta^{r_j}$ のグラフ収束を満たせる。また $\mathcal E$ は閉Tomita作用素 $S$ のグラフcoreでもある。
<!-- formal-statement-end -->

### 証明の見取り図

まず代数元を時間平均し、$\Omega$ が $U_t$ に固定されることを使って「代数内の平均」と「ベクトルのスペクトルGaussian」を一致させます。続いて、非有界べき作用素の前へGaussianを置くと有界になる事実を用い、グラフノルムで近似します。

<!-- proof-start -->
### 証明

$\Delta\Omega=\Omega$ だから $U_t\Omega=\Omega$。従って

$$
\begin{aligned}
A_\varepsilon\Omega
&=\int g_\varepsilon(s)U_sAU_{-s}\Omega\,ds\\
&=\int g_\varepsilon(s)U_sA\Omega\,ds.
\end{aligned}
$$

[スペクトル関数計算](../../QM/QM6/index.md#def-qm6-borel-functional-calculus)と実GaussianのFourier積分

$$
\int_{\mathbb R}g_\varepsilon(s)e^{is\lambda}\,ds
=e^{-\varepsilon\lambda^2/4}
$$

を使うと

$$
A_\varepsilon\Omega=e^{-\varepsilon H^2/4}A\Omega.
$$

実 $\lambda$ と任意の $r\in\mathbb R$ に対して平方完成により

$$
r\lambda-\frac{\varepsilon\lambda^2}{4}
=-\frac{\varepsilon}{4}
\left(\lambda-\frac{2r}{\varepsilon}\right)^2
+\frac{r^2}{\varepsilon}\le\frac{r^2}{\varepsilon}.
$$

ゆえに $e^{rH}e^{-\varepsilon H^2/4}$ は有界で、$A_\varepsilon\Omega\in\operatorname{Dom}\Delta^r$。さらに複素 $z$ について

$$
e^{izH}A_\varepsilon\Omega
=e^{izH-\varepsilon H^2/4}A\Omega
=\sigma_z(A_\varepsilon)\Omega.
$$

最後の等号を示すには、任意の $y\in\mathcal H$ を固定して両辺と $y$ の内積を取ります。両辺は全平面でノルム解析的なので、得られる複素数値関数も整関数です。実 $z=t$ では両辺が $U_t A_\varepsilon\Omega$ に一致するため、[CA3の零点の孤立性・恒等定理](../../CA/CA3/index.md#thm-ca3-isolated-zeros-identity)を両者の差に適用すると、すべての複素 $z$ で内積が一致します。$y$ は任意なのでベクトルも等しく、全解析性が示されました。

グラフcore性を調べます。$x\in\operatorname{Dom}e^{rH}$ を任意に固定します。関数 $e^{-\varepsilon\lambda^2/4}$ は $1$ 以下で点ごとに $1$ へ近づくため、スペクトル測度についての支配収束により

$$
e^{-\varepsilon H^2/4}x\to x,\qquad
e^{rH}e^{-\varepsilon H^2/4}x\to e^{rH}x.
$$

$\varepsilon$ をいったん固定すると、$e^{-\varepsilon H^2/4}$ と $e^{rH}e^{-\varepsilon H^2/4}$ はともに**有界**です。$\mathcal M\Omega$ の稠密性から $A_n\Omega\to x$ を選べば、これら二つの有界作用素を掛けて

$$
(A_n)_\varepsilon\Omega\to e^{-\varepsilon H^2/4}x,\qquad
e^{rH}(A_n)_\varepsilon\Omega
\to e^{rH}e^{-\varepsilon H^2/4}x
$$

が成り立ちます。まず $\varepsilon$ を小さく選び、その後 $n$ を大きく選ぶ対角選択で $x$ へのグラフ近似を得ます。$r_1,\ldots,r_k$ の有限個を同時に指定するときも、それらのグラフノルムの和に対し同じ選択をすればよいのです。

最後に $S$ についてです。[AQFT21の左Hilbert環の基本恒等式と作用](../AQFT21/index.md#prop-aqft21-left-regular)より $\mathcal M\Omega$ は $S$ のグラフcoreです。$J$ と $U_s$ は交換し、$\Delta^{1/2}$ と $U_s$ も関数計算で交換するので、$S U_sx=U_sSx$（$x\in\operatorname{Dom}S$）。$g_\varepsilon(s)$ は**実係数**なので、閉性を使って積分を $S$ の内側に入れられ、

$$
S(A_\varepsilon\Omega)
=\int g_\varepsilon(s)U_sS(A\Omega)\,ds
=\int g_\varepsilon(s)U_sA^*\Omega\,ds.
$$

$A_\varepsilon\Omega\to A\Omega$ と右辺 $\to A^*\Omega=S(A\Omega)$ が強連続性と近似単位から従います。任意の $\operatorname{Dom}S$ の元を先に $\mathcal M\Omega$ でグラフ近似し、さらに各近似を十分小さい $\varepsilon$ で平滑化すれば、$\mathcal E$ が $S$ のグラフcoreとなります。
<!-- proof-end -->

**使い分け**：$A_\varepsilon\in\mathcal M$ は作用素の事実、$A_\varepsilon\Omega\in\operatorname{Dom}\Delta^r$ はベクトルの事実です。後者から、一般の $A_\varepsilon$ が非有界 $\Delta^r$ と有界作用素として交換する、と推論してはいけません。

## 6. 一般のTomita–Takesaki定理の到達点

<a id="thm-aqft23-tomita-takesaki"></a>

<!-- formal-statement-start -->
> **定理（標準対に対するTomita–Takesaki定理）**  
> 複素Hilbert空間 $\mathcal H$ 上の単位的von Neumann環 $\mathcal M$ と、その巡回・分離的な単位ベクトル $\Omega$ に対し、$S_0(A\Omega)=A^*\Omega$ の閉包を $S=J\Delta^{1/2}$ と分解する。このとき
$$
\boxed{
J\mathcal M J=\mathcal M',
\qquad
\Delta^{it}\mathcal M\Delta^{-it}=\mathcal M
\quad(t\in\mathbb R).
}
$$
> 特に $\sigma_t=\operatorname{Ad}\Delta^{it}|_{\mathcal M}$ は正規で強連続な $*$-自己同型の1パラメータ群で、$\omega(A)=\langle\Omega,A\Omega\rangle$ を保つ。
<!-- formal-statement-end -->

### 証明の見取り図

二つの等号の証明責務を区別します。第一等号の有界可換子の構成・解析的一意性は前講にあり、第二等号はその証明中に得た全時刻付き包含から本講で閉じました。

<!-- proof-start -->
### 証明

第一等号は巡回・分離性を仮定する[AQFT22のTomita可換子定理](../AQFT22/index.md#thm-aqft22-commutant)です。第二等号は同じ仮定の下での[本講の不変性定理](#thm-aqft23-modular-invariance)です。両定理が同じ $\mathcal M,\Omega,S,J,\Delta$ に対する主張であることを確認すれば併記できます。群性・正規性・強連続性・状態保存は[群と状態の定理](#thm-aqft23-group-state)でそれぞれ証明済みです。
<!-- proof-end -->

この定理だけでは、任意の局所netのモジュラー流が時空のLorentz変換と一致することや、局所von Neumann環がType IIIであることは従いません。前者には自由場とwedgeに関する追加解析が必要です。また $\sigma_t$ が存在することと、状態がKMS条件を満たすことの**複素帯の証明**は異なる問題です。次講では有限次元Gibbs模型で帯の向きと境界値を手計算します。

## 7. 演習と詳細解答

### Level A：記号・群・解析的元の基本操作

<a id="ex-aqft23-a01"></a>
**演習 A1：反線形性の符号**

- Level: A
- 問題：標準対の $J\Delta J=\Delta^{-1}$ と $J^2=I$ に対し、$\Delta$ の正のスペクトル値 $r$ の関数計算を使い $J\Delta^{it}J=\Delta^{it}$ を導け。なぜ単純に $(\Delta^{-1})^{it}=\Delta^{-it}$ とは書けないか説明せよ。

<!-- solution-start -->
**詳細解答。** $J$ は反線形なので $J(\alpha x)=\overline\alpha Jx$。スペクトル関数の係数は共役されます。$f(r)=r^{it}=e^{it\log r}$ に対し、共役による関数は $\overline{f(r^{-1})}=\overline{e^{-it\log r}}=e^{it\log r}$。関数計算のスペクトル積分でも同じ等式が成り立ち、

$$
J\Delta^{it}J=\Delta^{it}
$$

です。$J\Delta J=\Delta^{-1}$ の**指数だけを変えて** $J\Delta^{it}J=\Delta^{-it}$ とすると、反線形性により $i$ も $-i$ になることを落とします。
<!-- solution-end -->

<a id="ex-aqft23-a02"></a>
**演習 A2：二準位の位相**

- Level: A
- 問題：$\rho=\operatorname{diag}(3/4,1/4)$ のHilbert–Schmidt標準表現で、$\sigma_t(L_{E_{12}})$ と $\sigma_t(L_{E_{21}})$ を計算し、$t=\pi/\log3$ での値を求めよ。

<!-- solution-start -->
**詳細解答。** [有限次元の流](../AQFT20/index.md#thm-aqft20-finite-flow)より $\sigma_t(L_{E_{ij}})=L_{\rho^{it}E_{ij}\rho^{-it}}$。$E_{ij}$ の左乗算では第 $i$ 行が $p_i^{it}$ 倍、右乗算では第 $j$ 列が $p_j^{-it}$ 倍になるので

$$
\rho^{it}E_{12}\rho^{-it}=3^{it}E_{12},
\quad
\rho^{it}E_{21}\rho^{-it}=3^{-it}E_{21}.
$$

$t=\pi/\log3$ では両方の指数因子が $e^{\pm i\pi}=-1$ となり、$\sigma_t(L_{E_{12}})=-L_{E_{12}}$、$\sigma_t(L_{E_{21}})=-L_{E_{21}}$ です。
<!-- solution-end -->

<a id="ex-aqft23-a03"></a>
**演習 A3：忠実状態の保存**

- Level: A
- 問題：標準対で $\omega(A)=\langle\Omega,A\Omega\rangle$ が正規状態であり、$\omega(\sigma_t(A))=\omega(A)$ であることを、$\Delta\Omega=\Omega$ から導け。さらに $\omega(A^*A)=0$ のとき $A=0$ となる理由を述べよ。

<!-- solution-start -->
**詳細解答。** $\omega(I)=\|\Omega\|^2=1$、$\omega(A^*A)=\|A\Omega\|^2\ge0$ なので状態です。ベクトル状態は超弱連続で正規です。関数計算により $U_{-t}\Omega=\Omega$ だから

$$
\omega(\sigma_t(A))
=\langle\Omega,U_tAU_{-t}\Omega\rangle
=\langle U_{-t}\Omega,AU_{-t}\Omega\rangle
=\omega(A).
$$

また $\omega(A^*A)=0\Rightarrow A\Omega=0$ であり、$\Omega$ が**分離的**なため $A=0$。状態の忠実性には分離性を使い、単なる巡回性では不足します。
<!-- solution-end -->

<a id="ex-aqft23-a04"></a>
**演習 A4：複素Gaussianのノルム**

- Level: A
- 問題：$g_\varepsilon(s)=(\pi\varepsilon)^{-1/2}e^{-s^2/\varepsilon}$、$z=x+iy$ とする。$\int_{\mathbb R}|g_\varepsilon(s-z)|ds$ を求め、$\|\sigma_z(A_\varepsilon)\|$ の評価を導け。

<!-- solution-start -->
**詳細解答。** $(s-z)^2=(s-x)^2-2iy(s-x)-y^2$ より

$$
|e^{-(s-z)^2/\varepsilon}|
=e^{-(s-x)^2/\varepsilon}e^{y^2/\varepsilon}.
$$

実軸上の正規化Gaussianの積分は1なので

$$
\int_{\mathbb R}|g_\varepsilon(s-z)|\,ds
=e^{y^2/\varepsilon}.
$$

$\|\sigma_s(A)\|=\|A\|$ による強積分のノルム評価を適用して

$$
\|\sigma_z(A_\varepsilon)\|
\le\int|g_\varepsilon(s-z)|\|\sigma_s(A)\|ds
=e^{y^2/\varepsilon}\|A\|
$$

です。複素時間に $\Delta^{iz}$ を全域有界と仮定する計算は使いません。
<!-- solution-end -->

### Level B：証明を別の設定で再構成する

<a id="ex-aqft23-b01"></a>
**演習 B1：片側包含から等号へ**

- Level: B
- 問題：一パラメータユニタリ群 $V_t$ と部分代数 $\mathcal N\subset B(\mathcal H)$ について、すべての $t\in\mathbb R$ で $V_{-t}\mathcal NV_t\subset\mathcal N$ が成立するとする。$V_t\mathcal NV_{-t}=\mathcal N$ を証明せよ。$t\ge0$ の場合だけではなぜ同じ論法を使えないか。

<!-- solution-start -->
**詳細解答。** $t$ の包含と $-t$ の包含はそれぞれ

$$
V_{-t}\mathcal NV_t\subset\mathcal N,\qquad
V_t\mathcal NV_{-t}\subset\mathcal N.
$$

第一式を $V_t$ と $V_{-t}$ で共役すると

$$
\mathcal N=V_t(V_{-t}\mathcal NV_t)V_{-t}
\subset V_t\mathcal NV_{-t}.
$$

これと第二式を合わせて等号です。$t\ge0$ の仮定だけでは $-t$ を代入した第二式が得られず、上の逆包含が欠落します。したがって時間方向の全域性が本質です。
<!-- solution-end -->

<a id="ex-aqft23-b02"></a>
**演習 B2：二つの非有界べきの同時core**

- Level: B
- 問題：$H=\log\Delta$ とし、$\mathcal E=\operatorname{span}\{A_\varepsilon\Omega\}$ を用いる。$x\in\operatorname{Dom}\Delta^{1/2}\cap\operatorname{Dom}\Delta^{-1/2}$ を、同じ列 $x_n\in\mathcal E$ で $x_n\to x$、$\Delta^{1/2}x_n\to\Delta^{1/2}x$、$\Delta^{-1/2}x_n\to\Delta^{-1/2}x$ と近似する手順を書け。

<!-- solution-start -->
**詳細解答。** $T_\varepsilon=e^{-\varepsilon H^2/4}$ と置きます。$T_\varepsilon$ は有界で $T_\varepsilon x\to x$。$r=\pm1/2$ ごとに、スペクトル測度による支配収束から $\Delta^rT_\varepsilon x\to\Delta^rx$。まず $\varepsilon_n>0$ を十分小さくして

$$
\|T_{\varepsilon_n}x-x\|
+\sum_{r=\pm1/2}\|\Delta^rT_{\varepsilon_n}x-\Delta^rx\|<\frac1{2n}
$$

とします。$\mathcal M\Omega$ の稠密性から $A_n\in\mathcal M$ を取り、

$$
\|A_n\Omega-x\|<
\frac1{2n\bigl(1+\|T_{\varepsilon_n}\|
+\|\Delta^{1/2}T_{\varepsilon_n}\|
+\|\Delta^{-1/2}T_{\varepsilon_n}\|\bigr)}
$$

とできます。$x_n=(A_n)_{\varepsilon_n}\Omega=T_{\varepsilon_n}A_n\Omega$ と置けば、三角不等式と上の有界性を使って三つのグラフ誤差の和は $1/n$ 未満です。$\Delta^rT_{\varepsilon_n}$ が有界である根拠は

$$
\sup_{\lambda\in\mathbb R}
e^{r\lambda-\varepsilon_n\lambda^2/4}
\le e^{r^2/\varepsilon_n}<\infty
$$

です。$A_n\Omega$ 自身が $\operatorname{Dom}\Delta^{-1/2}$ に属すとは仮定していません。
<!-- solution-end -->

<a id="ex-aqft23-b03"></a>
**演習 B3：強連続でもノルム不連続**

- Level: B
- 問題：$\rho=\operatorname{diag}(ce^{-n^2})_{n\ge1}$、$Ve_n=e_{n+1}$、$\sigma_t(L_V)=L_{\rho^{it}V\rho^{-it}}$ とする。$\|\sigma_{t_n}(L_V)-L_V\|=2$ となる $t_n\to0$ を構成せよ。一方で各 $x\in\ell^2$ に対して $\rho^{it}V\rho^{-it}x\to Vx$ となることを示せ。

<!-- solution-start -->
**詳細解答。** 固有値比は $p_{n+1}/p_n=e^{-(2n+1)}$ だから

$$
(\rho^{it}V\rho^{-it}-V)e_n
=(e^{-it(2n+1)}-1)e_{n+1}.
$$

$t_n=\pi/(2n+1)$ とすれば $n$ 番目の係数が $-2$ なので作用素ノルムは少なくとも2、両ユニタリ共役作用素のノルムは1だから差のノルムは高々2であり等号です。一方 $x=\sum_n x_ne_n$ に対し

$$
\|(\rho^{it}V\rho^{-it}-V)x\|^2
=\sum_{n\ge1}|e^{-it(2n+1)}-1|^2|x_n|^2.
$$

各項は $t\to0$ で零となり、$4|x_n|^2$ という可 summable な上界があるので級数の支配収束により極限は零です。これは強連続とノルム連続の差を具体的に示します。
<!-- solution-end -->

<a id="ex-aqft23-b04"></a>
**演習 B4：固定点代数を求める**

- Level: B
- 問題：二準位の $\rho=\operatorname{diag}(3/4,1/4)$ の標準表現について、全ての $t$ で $\sigma_t(L_A)=L_A$ を満たす行列 $A$ を求めよ。また $\rho$ の固有値が等しい場合との違いを説明せよ。

<!-- solution-start -->
**詳細解答。** $A=\sum_{i,j}a_{ij}E_{ij}$ と書くと

$$
\rho^{it}A\rho^{-it}
=a_{11}E_{11}+a_{22}E_{22}
+3^{it}a_{12}E_{12}+3^{-it}a_{21}E_{21}.
$$

すべての $t$ で元へ戻るためには $a_{12}=a_{21}=0$ が必要十分です。これは $\rho A=A\rho$ と同値です。$p_1=p_2$ の場合は $\rho$ がスカラー行列なので $\rho^{it}A\rho^{-it}=A$ が任意の行列で成立し、固定点代数は $M_2(\mathbb C)$ 全体になります。忠実性は両模型で成立するため、違いは固有値の縮退です。
<!-- solution-end -->

### Level C：一般の結果と模型の境界を統合する

<a id="ex-aqft23-c01"></a>
**演習 C1：解析化と非有界計算の正当化**

- Level: C
- 問題：一般標準対に対し、$A_\varepsilon=\int g_\varepsilon(s)\sigma_s(A)ds$ を構成する。次の4点を互いに区別して説明・証明せよ。1. $A_\varepsilon$ は $\mathcal M$ 内の有界元。2. $A_\varepsilon\Omega$ は全解析ベクトル。3. $\mathcal E=\operatorname{span}\{A_\varepsilon\Omega\}$ は $\Delta$ と $\Delta^{-1/2}$ の同時グラフcore。4. $A_\varepsilon$ が一般に $\Delta$ と交換するとは限らない。

<!-- solution-start -->
**詳細解答。** 第一に[モジュラー不変性](#thm-aqft23-modular-invariance)から $\sigma_s(A)\in\mathcal M$、$\|\sigma_s(A)\|=\|A\|$ です。実Gaussianを重みとした強作用素積分をRiemann和で近似し、von Neumann環の強閉性から $A_\varepsilon\in\mathcal M$、$\|A_\varepsilon\|\le\|A\|$ が従います。

第二に $U_s\Omega=\Omega$ なので

$$
A_\varepsilon\Omega
=\int g_\varepsilon(s)U_sA\Omega ds
=e^{-\varepsilon H^2/4}A\Omega,\quad H=\log\Delta.
$$

任意の複素 $z$ について $e^{izH-\varepsilon H^2/4}$ のスペクトル乗数は有界です。従って $z\mapsto e^{izH}A_\varepsilon\Omega$ は全域でノルム解析的で、実軸上では $U_tA_\varepsilon\Omega$ に一致します。

第三に $r=1$ と $r=-1/2$ に対して、$\Delta^re^{-\varepsilon H^2/4}$ の乗数 $e^{r\lambda-\varepsilon\lambda^2/4}$ は平方完成で有界です。$\Delta^r$ の定義域上では $e^{-\varepsilon H^2/4}x\to x$ と $\Delta^re^{-\varepsilon H^2/4}x\to\Delta^rx$。固定 $\varepsilon$ に対し $A_n\Omega\to x$ を選んで両有界作用素を適用し、最後に $\varepsilon\to0$ の対角選択を行えば、二つのグラフノルムを**同じ**近似列で満たせます。

第四に二準位模型で $A=L_{E_{12}}$ を取ると $\sigma_s(A)=3^{is}A$ なので $A_\varepsilon=e^{-\varepsilon(\log3)^2/4}A$ です。この元は非零であり、$U_tA_\varepsilon U_{-t}=3^{it}A_\varepsilon\ne A_\varepsilon$ となる時刻が存在します。従って $A_\varepsilon$ は $\Delta$ と交換しません。ベクトルのべき定義域への所属と作用素の交換性は別条件です。
<!-- solution-end -->

<a id="ex-aqft23-c02"></a>
**演習 C2：可換子側の時間と逆向きモジュラー作用**

- Level: C
- 問題：標準対 $(\mathcal M,\Omega)$ について $S'=S^\sharp$ は可換子 $\mathcal M'$ に対するTomita閉包で、$S'=J\Delta^{-1/2}$ と既習である。このとき可換子側のモジュラー作用素 $\Delta'$ を求め、そのモジュラー群 $\sigma_t'(B)=(\Delta')^{it}B(\Delta')^{-it}$ が $\mathcal M'$ を保つことを本講の定理から証明せよ。$J$ の反線形性がどこに効くか説明せよ。

<!-- solution-start -->
**詳細解答。** [可換子側の作用素の極分解](../AQFT19/index.md#thm-aqft19-modular-relations)では $S'=J\Delta^{-1/2}$ なので $(S')^\sharp S'$ は非負自己共役作用素 $\Delta^{-1}$ に一致し、$\Delta'=\Delta^{-1}$ です。$\Omega$ は[可換子側にも巡回・分離的](../AQFT18/index.md#def-aqft18-standard-pair)です。

本講の[一般モジュラー不変性](#thm-aqft23-modular-invariance)で $U_t\mathcal MU_{-t}=\mathcal M$。両辺の可換子を取れば、ユニタリ共役が可換子と両立するので

$$
U_t\mathcal M'U_{-t}
=(U_t\mathcal MU_{-t})'
=\mathcal M'.
$$

可換子側の時間発展は

$$
\sigma_t'(B)
=(\Delta^{-1})^{it}B(\Delta^{-1})^{-it}
=U_{-t}BU_t.
$$

従って元の時間と逆向きです。一方 $JU_tJ=U_t$ なのは、$J$ によって $\Delta$ のスペクトルが逆数になると同時に $i$ の符号が共役されるためです。「可換子側では時間が逆向き」という結論と「$J$ は $U_t$ と交換する」という事実は矛盾しません。
<!-- solution-end -->

## 8. この講義の到達範囲

本講で一般標準対のTomita–Takesaki定理を、前講の解析的補題に依拠して閉じました。Gaussianで作った全解析的元は、後で複素帯の境界値を検査する足場になります。ただし **$\sigma_t$ が状態を保つだけでKMS条件を証明したことにはなりません**。また任意の局所領域の流が幾何学的boostになるわけでもありません。次講は忠実Gibbs状態の有限行列で解析帯の上下と時間符号を確かめ、その後に一般のKMS性へ進みます。

参考：S. J. Summers, [Tomita–Takesaki Modular Theory](https://arxiv.org/abs/math-ph/0511034)；E. H. Lieb関連を含む演算子環の標準的解説としてO. Bratteli and D. W. Robinson, *Operator Algebras and Quantum Statistical Mechanics II*。ここでの核心の解析的包含は外部定理を再掲するのではなく[AQFT22の証明](../AQFT22/index.md#thm-aqft22-commutant)に依拠します。
