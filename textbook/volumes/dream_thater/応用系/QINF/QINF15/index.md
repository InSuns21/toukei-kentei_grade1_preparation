# QINF15 混合状態の分離可能性

## 1. 「混合している」と「もつれている」は違う

[QINF14のNielsen定理](../QINF14/index.md#thm-qinf14-nielsen)は**純粋**な二部状態のLOCC変換をSchmidt確率で判定しました。しかし一般の実験では、状態は測定結果を忘れたり雑音を受けたりして混合します。[密度演算子の定義](../QINF2/index.md#def-qinf2-ensemble-density)に戻ると、一つの密度演算子は異なる純粋状態アンサンブルで表せます。したがって「ある展開にBell状態が現れた」だけでは、混合状態がもつれているとは判定できません。

二qubitについて、次の二状態を比べます。

$$
\rho_{\mathrm{cl}}=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|,
\qquad \rho_{\Phi}=|\Phi^+\rangle\langle\Phi^+|,
\quad |\Phi^+\rangle=\frac{|00\rangle+|11\rangle}{\sqrt2}.
$$

両者は[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)を取ると、Alice側もBob側も $I_2/2$ です。しかし $\rho_{\mathrm{cl}}$ は「古典的に0か1を選んで、両者が同じ値を準備する」だけで作れ、$\rho_{\Phi}$ は[Schmidt階数が2](../QINF6/index.md#prop-qinf6-product)なので一つの積状態ではありません。ここで知りたいのは、**古典的な確率混合だけで作れる状態と、それでも作れない状態の境界**です。

以下、$H_A\cong\mathbb C^{d_A}$、$H_B\cong\mathbb C^{d_B}$ は有限次元複素Hilbert空間で、$d_A,d_B\ge2$ とします。$\rho_{AB}$ は $H_A\otimes H_B$ 上の正値でトレースが1の密度演算子です。記号 $|ab\rangle$ は正規化ベクトル $|a\rangle\otimes|b\rangle$ を表します。

## 2. 分離可能な混合状態

積密度演算子 $\sigma_A\otimes\tau_B$ では、AliceとBobが独立に状態を用意できます。さらに古典的な乱数で、作る積状態の組を選べるようにしても、それだけでは量子エンタングルメントを用意したことにはなりません。この考えを「積状態の有限確率混合」として定式化します。

<a id="def-qinf15-separable"></a>

<!-- formal-statement-start -->
> **定義（二部混合状態の分離可能性とエンタングルメント）**  
> 有限次元二部系 $H_A\otimes H_B$ の密度演算子 $\rho_{AB}$ が**分離可能**（separable）であるとは、有限個の確率 $p_j\ge0$、$\sum_jp_j=1$ と、各系の密度演算子 $\sigma_j^A,\tau_j^B$ を用いて

$$
\rho_{AB}=\sum_{j=1}^{m}p_j\,\sigma_j^A\otimes\tau_j^B
$$

> と表せることをいう。このように表せない密度演算子を**エンタングル状態**という。混合状態では「純粋でないこと」と「エンタングル状態であること」は別の性質である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf15-separable -->
### 例：共有乱数で作る古典相関

**定義の確認**として、先ほどの $\rho_{\mathrm{cl}}$ では $m=2$、$p_1=p_2=1/2$ とし、$\sigma_1^A=\tau_1^B=|0\rangle\langle0|$、$\sigma_2^A=\tau_2^B=|1\rangle\langle1|$ を選べます。各局所項は正値でトレースが1、重みは非負で和1です。しかも $\rho_{\mathrm{cl}}$ 自身もこの二つの正値積演算子の和だから正値であり、トレースは $\frac12(1\cdot1)+\frac12(1\cdot1)=1$。よって定義の条件を全て満たします。なお $\operatorname{Tr}(\rho_{\mathrm{cl}}^2)=1/2$ なので混合状態です。
<!-- definition-example-end -->

この定義では局所側の $\sigma_j^A,\tau_j^B$ を混合状態としてもよいですが、純粋な積状態だけの和と同値です。その理由をここで閉じます。

<a id="prop-qinf15-pure-product-ensemble"></a>

<!-- formal-statement-start -->
> **命題（分離可能状態の純粋積分解）**  
> 有限次元二部系の密度演算子 $\rho_{AB}$ が分離可能であるための必要十分条件は、有限個の正規化された局所ベクトル $|a_k\rangle\in H_A, |b_k\rangle\in H_B$ と確率 $q_k$ が存在し、

$$
\rho_{AB}=\sum_kq_k|a_kb_k\rangle\langle a_kb_k|,
\qquad q_k\ge0,\quad\sum_kq_k=1
$$

> と書けることである。
<!-- formal-statement-end -->

### 証明の見取り図

局所密度演算子は[スペクトル分解から有限純粋状態のアンサンブルになる](../QINF2/index.md#thm-qinf2-density-ensemble)。二つのアンサンブルの項を一つずつ掛け合わせれば、各積項が純粋な積射影になります。

<!-- proof-start -->
### 証明

分離可能な $\rho_{AB}=\sum_jp_j\sigma_j^A\otimes\tau_j^B$ を取ります。[密度演算子のアンサンブル表示](../QINF2/index.md#thm-qinf2-density-ensemble)をそれぞれに適用し、

$$
\sigma_j^A=\sum_r\lambda_{jr}|a_{jr}\rangle\langle a_{jr}|,
\qquad\tau_j^B=\sum_s\mu_{js}|b_{js}\rangle\langle b_{js}|
$$

とします。$\lambda_{jr},\mu_{js}\ge0$ で、それぞれ $r,s$ の和は1です。二つの有限和を項ごとに掛け合わせると

$$
\rho_{AB}=\sum_{j,r,s}p_j\lambda_{jr}\mu_{js}
|a_{jr}b_{js}\rangle\langle a_{jr}b_{js}|.
$$

重みは非負、総和は $\sum_jp_j(\sum_r\lambda_{jr})(\sum_s\mu_{js})=1$ です。有限次元なので項数も有限です。逆向きは $\sigma_k^A=|a_k\rangle\langle a_k|$、$\tau_k^B=|b_k\rangle\langle b_k|$ と置けば[二部混合状態の分離可能性](#def-qinf15-separable)に含まれます。$\square$
<!-- proof-end -->

純粋な全状態なら、上の和がrank 1であるため、各正の重みの $|a_kb_k\rangle$ は同一直線上にあります。従って[Schmidt階数1と積状態の同値](../QINF6/index.md#prop-qinf6-product)と一致して、純粋二部状態は「分離可能」であることと「積状態」であることが同値です。**混合状態ではSchmidt階数という単一ベクトルの判定をそのまま使えません。**

## 3. LOCCだけで作れる状態の範囲

[QINF14の有限ラウンドLOCC](../QINF14/index.md#def-qinf14-locc)は局所演算と古典通信だけから構成されます。この操作が分離可能性を壊さないことを確かめます。反対に、古典通信で有限個の番号を選べば、任意の分離可能状態は積状態から準備できます。

<a id="prop-qinf15-locc-preserves"></a>

<!-- formal-statement-start -->
> **命題（LOCCによる分離可能性の保存と準備）**  
> 有限次元二部系の分離可能状態に、有限ラウンドLOCC（局所量子計測とその結果に基づく条件付き局所操作）を施すと、最終の無条件状態は分離可能である。さらに任意の分離可能状態は、積状態を入力にして局所状態準備と有限の古典通信で生成できる。
<!-- formal-statement-end -->

### 証明の見取り図

局所Kraus演算は、積作用素の片方の因子にだけ作用します。確率重みの正値性を保って各枝を正規化すれば、その枝も分離可能です。準備の方向は、混合の番号を通信するだけです。

<!-- proof-start -->
### 証明

まず一回のAliceの局所計測で、[分離可能状態の表示](#def-qinf15-separable) $\rho=\sum_jp_j\sigma_j\otimes\tau_j$ に結果 $r$ のKraus演算子 $M_r$ を作用させます。非正規化した結果は

$$
\widetilde\rho_r=\sum_jp_j(M_r\sigma_jM_r^\dagger)\otimes\tau_j.
$$

各 $t_{jr}=\operatorname{Tr}(M_r\sigma_jM_r^\dagger)\ge0$、結果確率 $P(r)=\sum_jp_jt_{jr}$ と置きます。$P(r)>0$ の枝では、$t_{jr}>0$ の項だけで

$$
\rho_r=\sum_{j:t_{jr}>0}\frac{p_jt_{jr}}{P(r)}
\frac{M_r\sigma_jM_r^\dagger}{t_{jr}}\otimes\tau_j.
$$

これは分離可能な確率混合です。$P(r)=0$ の枝は起こりません。Bobが計測する場合も左右を入れ替えれば同じです。過去の古典結果に応じて演算子が変わっても、各枝にこの計算を有限回繰り返せます。最後に結果を忘れた平均も、非負の確率重みを持つ積演算子の和です。

逆に[純粋積分解](#prop-qinf15-pure-product-ensemble)の有限和から $k$ を確率 $q_k$ で選び、AliceがBobへ番号 $k$ を伝えます。Aliceは $|a_k\rangle$、Bobは $|b_k\rangle$ を手元で準備します。入力を捨てて指定状態を準備する局所操作は許される量子操作であり、平均出力は $\sum_kq_k|a_kb_k\rangle\langle a_kb_k|=\rho_{AB}$ です。$\square$
<!-- proof-end -->

この命題は**新しいエンタングルメントをLOCCだけで生めない**ことの混合状態版です。局所測定の一つの枝で珍しい結果が出たとしても、分離可能入力の分離可能性は破れません。

## 4. 部分転置：行列の並べ替えで検出する

「分離可能な形が見つからない」は証明になりません。そこで、満たさないと分離可能ではあり得ない必要条件を作ります。普通の行列の転置は正値性を保ちますが、テンソル積の**片方の添字だけ**を転置すると、もつれを持つ状態では負の固有値が現れることがあります。

基底 $|i\rangle_A$、$|\mu\rangle_B$ を固定します。行列要素を $\rho_{i\mu,j\nu}=\langle i\mu|\rho|j\nu\rangle$ と書くと、Bob側の添字 $\mu,\nu$ だけを入れ替える演算は

$$
(\rho^{\Gamma_B})_{i\mu,j\nu}=\rho_{i\nu,j\mu}
$$

です。全体の転置 $\rho^T$ では $i,j$ も入れ替えますが、ここでは入れ替えません。

<a id="def-qinf15-partial-transpose"></a>

<!-- formal-statement-start -->
> **定義（部分転置とPPT条件）**  
> 有限次元二部系 $H_A\otimes H_B$ の各局所直交基底を固定する。演算子 $X=\sum_{i,j,\mu,\nu}X_{i\mu,j\nu}|i\mu\rangle\langle j\nu|$ の**Bob側部分転置** $X^{\Gamma_B}$ は

$$
X^{\Gamma_B}=\sum_{i,j,\mu,\nu}X_{i\mu,j\nu}|i\nu\rangle\langle j\mu|
$$

> で定める。密度演算子 $\rho_{AB}$ が $\rho_{AB}^{\Gamma_B}\ge0$ を満たすとき**PPT**（部分転置が正値）であるという。満たさなければ**NPT**（部分転置が非正値）である。正値性は部分転置行列の全固有値が非負であることと同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf15-partial-transpose -->
### 例：積射影と、転置される要素

**定義の確認**として、$|0+\rangle=(|00\rangle+|01\rangle)/\sqrt2$ の積射影は $|0\rangle\langle0|\otimes|+\rangle\langle+|$ です。$|+\rangle\langle+|=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ は実対称なので転置しても変わらず、$\rho^{\Gamma_B}=\rho\ge0$ です。もとの $\rho$ はrank 1の正値行列でトレースが1だからPPTの全条件を満たします。

転置操作そのものは $|00\rangle\langle11|=(|0\rangle\langle1|)\otimes(|0\rangle\langle1|)$ に施すと

$$
(|00\rangle\langle11|)^{\Gamma_B}=|01\rangle\langle10|
$$

となります。「行全体と列全体の入れ替え」ではなく、Bobのketとbraだけが交換されることを確認できます。
<!-- definition-example-end -->

<a id="lem-qinf15-transpose-properties"></a>

<!-- formal-statement-start -->
> **補題（転置の正値性と部分転置の基底独立な符号）**  
> 有限次元複素Hilbert空間の正値演算子 $T\ge0$ に対し $T^T\ge0$ である。局所直交基底を取り替えても、二部Hermitian演算子 $X$ の部分転置 $X^{\Gamma_B}$ の固有値は不変である。従ってPPTかNPTかは局所基底の取り方によらない。
<!-- formal-statement-end -->

### 証明の見取り図

正値行列のスペクトル分解を転置すれば、固有値を変えずに固有ベクトルを複素共役にした分解が得られます。局所直交基底を取り替えると、その共役を含む別のユニタリ共役が起きます。

<!-- proof-start -->
### 証明

$T=\sum_jt_j|u_j\rangle\langle u_j|$ とスペクトル分解すると $t_j\ge0$ です。固定基底で成分ごとに複素共役にしたベクトルを $|\overline u_j\rangle$ と書けば

$$
T^T=\sum_jt_j|\overline u_j\rangle\langle\overline u_j|\ge0.
$$

次に局所基底の変換行列をユニタリ $V_A,U_B$ とし、新基底表示を $X'=(V_A^\dagger\otimes U_B^\dagger)X(V_A\otimes U_B)$ とします。積作用素 $A\otimes B$ で部分転置の定義を計算すると

$$
\begin{aligned}
((V_A^\dagger AV_A)\otimes(U_B^\dagger BU_B))^{\Gamma_B}
&=V_A^\dagger AV_A\otimes U_B^T B^T\overline U_B.
\end{aligned}
$$

積作用素の線形結合は全演算子を張るので、この等式を各項へ適用し

$$
(X')^{\Gamma_B}=(V_A^\dagger\otimes U_B^T)X^{\Gamma_B}(V_A\otimes\overline U_B).
$$

右端は左側ユニタリの随伴だから、$X^{\Gamma_B}$ と $(X')^{\Gamma_B}$ はユニタリ共役です。固有値は一致します。$\square$
<!-- proof-end -->

<a id="thm-qinf15-ppt-necessary"></a>

<!-- formal-statement-start -->
> **定理（PeresのPPT必要条件）**  
> 有限次元二部系 $H_A\otimes H_B$ 上の分離可能密度演算子 $\rho_{AB}$ は、いずれかの局所直交基底で定義した部分転置 $\rho_{AB}^{\Gamma_B}$ が正値となる。すなわち**分離可能ならPPT**であり、NPTであればエンタングル状態である。
<!-- formal-statement-end -->

### 証明の見取り図

分離可能な確率混合は積演算子の和です。部分転置は各積のBob側だけを転置し、[正値な転置行列](#lem-qinf15-transpose-properties)を残します。正の重みを付けて和を取っても正値性は保たれます。

<!-- proof-start -->
### 証明

[二部混合状態の分離可能性](#def-qinf15-separable)から $\rho_{AB}=\sum_jp_j\sigma_j^A\otimes\tau_j^B$。部分転置は線形で、

$$
\rho_{AB}^{\Gamma_B}=\sum_jp_j\,\sigma_j^A\otimes(\tau_j^B)^T.
$$

各 $\sigma_j^A$ は正値、[転置の正値性](#lem-qinf15-transpose-properties)から $(\tau_j^B)^T$ も正値です。二つの正値演算子はスペクトル分解して固有値の積を取ればテンソル積も正値と分かります。したがって任意の $|v\rangle$ に対し

$$
\langle v|\rho_{AB}^{\Gamma_B}|v\rangle
=\sum_jp_j\langle v|\sigma_j^A\otimes(\tau_j^B)^T|v\rangle\ge0.
$$

この不等式は $\rho_{AB}^{\Gamma_B}\ge0$ を意味します。対偶によりNPTなら分離可能ではありません。$\square$
<!-- proof-end -->

この定理は**片方向**です。分離可能な分解を作れば十分性が直接証明されますが、PPTという計算だけで一般の任意次元の分離可能性を宣言することはできません。後で3×3の反例を実際に構成します。

## 5. Bell状態で部分転置を手計算する

[Bell基底](../QINF13/index.md#def-qinf13-bell-basis)の $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ を使います。計算基底の順序を $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ に固定すると、

$$
\rho_\Phi=\frac12\begin{pmatrix}
1&0&0&1\\0&0&0&0\\0&0&0&0\\1&0&0&1
\end{pmatrix},\quad
\rho_\Phi^{\Gamma_B}=\frac12\begin{pmatrix}
1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1
\end{pmatrix}.
$$

後者の中央 $2\times2$ ブロックは $\frac12\begin{pmatrix}0&1\\1&0\end{pmatrix}$ なので、$(|01\rangle+|10\rangle)/\sqrt2$ 方向に固有値 $1/2$、$(|01\rangle-|10\rangle)/\sqrt2$ 方向に $-1/2$ が出ます。残り $|00\rangle,|11\rangle$ は固有値 $1/2$。従って部分転置の固有値は

$$
\operatorname{spec}(\rho_\Phi^{\Gamma_B})=\{\tfrac12,\tfrac12,\tfrac12,-\tfrac12\}.
$$

[PPT必要条件](#thm-qinf15-ppt-necessary)に反するので、Bell状態はエンタングル状態です。一方で $\rho_{\mathrm{cl}}^{\Gamma_B}=\rho_{\mathrm{cl}}\ge0$。同じ縮約状態 $I_2/2$ でも、全系のエンタングルメントは異なります。

## 6. Werner型状態：PPT判定と分解を両方向から照合する

完全にランダムな二qubit状態 $I_4/4$ に、反対向きのスピンを持つBell状態 $|\Psi^-\rangle=(|01\rangle-|10\rangle)/\sqrt2$ を混ぜます。混ぜる強さを変え、実際にどこから分離可能でなくなるかを調べましょう。負の係数まで含めた範囲を扱うのは、すべての**物理的に正値な**状態を一度に分類するためです。

<a id="def-qinf15-werner"></a>

<!-- formal-statement-start -->
> **定義（二qubitのWerner型状態族）**  
> $-1/3\le p\le1$ を実数、$|\Psi^-\rangle=(|01\rangle-|10\rangle)/\sqrt2$ とする。次の二qubit密度演算子の族を考える。

$$
\rho_W(p)=\frac{1-p}{4}I_4+p|\Psi^-\rangle\langle\Psi^-|.
$$

> ここで $p$ は状態族のパラメータであって、$p<0$ のとき第2項を「確率 $p$ の混合」と解釈してはならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf15-werner -->
### 例：正値性、トレース、両側縮約

**定義の確認**として、$|\Psi^-\rangle$ と直交する3次元部分空間上では $\rho_W(p)$ は $(1-p)/4$ 倍の恒等、$|\Psi^-\rangle$ 上では $(1-p)/4+p=(1+3p)/4$ 倍です。定義域 $-1/3\le p\le1$ で両方非負、トレースは

$$
3\frac{1-p}{4}+\frac{1+3p}{4}=1.
$$

したがって全域で密度演算子です。[部分トレースの線形性と状態保存](../QINF3/index.md#prop-qinf3-state-product)を使うと、$I_4/4=(I_2/2)\otimes(I_2/2)$ の片側縮約は $I_2/2$、[Schmidt縮約固有値の一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)からSingletの片側縮約も $I_2/2$。ゆえに任意の $p$ で

$$
\operatorname{Tr}_B\rho_W(p)=\operatorname{Tr}_A\rho_W(p)=I_2/2.
$$

局所状態だけでは $p$ を検出できないことが分かります。
<!-- definition-example-end -->

<a id="thm-qinf15-werner-threshold"></a>

<!-- formal-statement-start -->
> **定理（二qubit Werner型状態の分離可能性）**  
> $-1/3\le p\le1$ の密度演算子 $\rho_W(p)=(1-p)I_4/4+p|\Psi^-\rangle\langle\Psi^-|$ は、次の条件を満たす。

$$
\boxed{\rho_W(p)\text{ が分離可能}\ \Longleftrightarrow\ -\frac13\le p\le\frac13.}
$$

> $p>1/3$ では部分転置が負の固有値を持つ。$-1/3\le p\le1/3$ では純粋積状態だけからなる明示的な確率混合を構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

まず $4\times4$ 行列でPPTの必要条件を調べます。次に、ちょうど閾値に当たる $p=1/3$ と反対側の $p=-1/3$ で「同方向／逆方向」の局所qubitを6通り用意します。両端を非負の確率で混ぜ、中間の全状態の分離可能性を**実際の準備方法**として証明します。

<!-- proof-start -->
### 証明

計算基底の順序を $00,01,10,11$ とします。Singletの射影は

$$
|\Psi^-\rangle\langle\Psi^-|
=\frac12\begin{pmatrix}0&0&0&0\\0&1&-1&0\\0&-1&1&0\\0&0&0&0\end{pmatrix}.
$$

従って

$$
\rho_W(p)=\begin{pmatrix}
\frac{1-p}{4}&0&0&0\\
0&\frac{1+p}{4}&-\frac p2&0\\
0&-\frac p2&\frac{1+p}{4}&0\\
0&0&0&\frac{1-p}{4}
\end{pmatrix}.
$$

[部分転置の定義](#def-qinf15-partial-transpose)では $|01\rangle\langle10|$ が $|00\rangle\langle11|$ に移るため

$$
\rho_W(p)^{\Gamma_B}=\begin{pmatrix}
\frac{1-p}{4}&0&0&-\frac p2\\
0&\frac{1+p}{4}&0&0\\
0&0&\frac{1+p}{4}&0\\
-\frac p2&0&0&\frac{1-p}{4}
\end{pmatrix}.
$$

$|01\rangle,|10\rangle$ で固有値 $(1+p)/4$ を二つ得ます。$|00\rangle,|11\rangle$ のブロックの対称・反対称ベクトルでは、対角値 $(1-p)/4$ にそれぞれ $-p/2,+p/2$ が加わり、固有値は $(1-3p)/4,(1+p)/4$ です。従って全固有値は

$$
\operatorname{spec}(\rho_W(p)^{\Gamma_B})=
\left\{\frac{1-3p}{4},\frac{1+p}{4},\frac{1+p}{4},\frac{1+p}{4}\right\}.
$$

$-1/3\le p\le1$ では後者は正なので、$p>1/3$ のときだけNPTです。[PPT必要条件](#thm-qinf15-ppt-necessary)によりその範囲はエンタングル状態です。

残る範囲の分離可能性を証明します。[Bloch表示](../QINF2/index.md#def-qinf2-bloch-vector)で使ったPauli行列を $\sigma_x,\sigma_y,\sigma_z$ と書きます。単位座標ベクトル $\mathbf e_k$（$k=x,y,z$）方向の固有状態を $|k,+\rangle,|k,-\rangle$ とし、それぞれの射影を $P_{k,\pm}=(I_2\pm\sigma_k)/2$ とします。[Bloch球の正値条件](../QINF2/index.md#thm-qinf2-bloch-ball)から、これらはrank 1、トレース1の局所純粋状態です。

同じ軸について逆向き・同向きの二つの積状態を等確率で混合した演算子を

$$
\begin{aligned}
D_k^-&=\frac12(P_{k,+}\otimes P_{k,-}+P_{k,-}\otimes P_{k,+}),\\
D_k^+&=\frac12(P_{k,+}\otimes P_{k,+}+P_{k,-}\otimes P_{k,-})
\end{aligned}
$$

と置きます。$P_{k,\pm}$ を代入して分配すると、一次の $\sigma_k$ 項が互いに消え、

$$
D_k^-=\frac14(I_4-\sigma_k\otimes\sigma_k),
\qquad D_k^+=\frac14(I_4+\sigma_k\otimes\sigma_k).
$$

Pauli行列を計算基底で展開すると

$$
\sum_{k=x,y,z}\sigma_k\otimes\sigma_k
=\begin{pmatrix}1&0&0&0\\0&-1&2&0\\0&2&-1&0\\0&0&0&1\end{pmatrix},
\qquad
|\Psi^-\rangle\langle\Psi^-|=\frac14\left(I_4-\sum_k\sigma_k\otimes\sigma_k\right).
$$

よって定義式に代入すれば

$$
\rho_W(1/3)=\frac13\sum_{k=x,y,z}D_k^-,
\qquad
\rho_W(-1/3)=\frac13\sum_{k=x,y,z}D_k^+.
$$

両辺はそれぞれ6個の純粋積射影を**重み $1/6$ で混合**した状態なので、[分離可能状態の純粋積分解](#prop-qinf15-pure-product-ensemble)から両端は分離可能です。最後に $-1/3\le p\le1/3$ では $t=(1+3p)/2$ が $0\le t\le1$ を満たし、

$$
\rho_W(p)=t\rho_W(1/3)+(1-t)\rho_W(-1/3).
$$

これは分離可能状態の確率混合です。従って全範囲の十分性も証明されました。$\square$
<!-- proof-end -->

この族ではPPTの判定が偶然にも分離可能性の必要十分条件になりました。しかしこの事実は、一般の次元や一般の混合状態でPPTが十分であることの証明ではありません。次の例で、その違いを確定します。

## 7. 3×3ではPPTでももつれた状態がある

3×3二部系で、互いに直交する5個の**積ベクトル**を用意し、それらを除いた4次元空間へ混合状態を作ります。その4次元空間に積ベクトルが一つも存在しなければ、どれほど混合しても分離可能な分解は不可能です。一方、元の積ベクトルが実成分だけなら、除いた射影和は部分転置で変わりません。

次の構成に用いる局所基底は各側 $|0\rangle,|1\rangle,|2\rangle$ とします。記号 $|s\rangle=(|0\rangle+|1\rangle+|2\rangle)/\sqrt3$ と置き、以下を正規化された積ベクトルとして定めます。

$$
\begin{aligned}
|u_0\rangle&=|0\rangle\otimes\frac{|0\rangle-|1\rangle}{\sqrt2},&
|u_1\rangle&=\frac{|0\rangle-|1\rangle}{\sqrt2}\otimes|2\rangle,\\
|u_2\rangle&=|2\rangle\otimes\frac{|1\rangle-|2\rangle}{\sqrt2},&
|u_3\rangle&=\frac{|1\rangle-|2\rangle}{\sqrt2}\otimes|0\rangle,\\
|u_4\rangle&=|s\rangle\otimes|s\rangle.
\end{aligned}
$$

<a id="thm-qinf15-ppt-entangled"></a>

<!-- formal-statement-start -->
> **定理（PPTだが分離可能でない3×3状態）**  
> $H_A=H_B=\mathbb C^3$ とし、両側で正規直交基底 $|0\rangle,|1\rangle,|2\rangle$ を使う。$|s\rangle=(|0\rangle+|1\rangle+|2\rangle)/\sqrt3$ とし、次の5個の積ベクトルを定める。

$$
\begin{aligned}
u_0&=|0\rangle\otimes(|0\rangle-|1\rangle)/\sqrt2,&
u_1&=(|0\rangle-|1\rangle)\otimes|2\rangle/\sqrt2,\\
u_2&=|2\rangle\otimes(|1\rangle-|2\rangle)/\sqrt2,&
u_3&=(|1\rangle-|2\rangle)\otimes|0\rangle/\sqrt2,\\
u_4&=|s\rangle\otimes|s\rangle.
\end{aligned}
$$

> これらから演算子

$$
\rho_{\mathrm{tile}}=\frac14\left(I_9-\sum_{j=0}^{4}|u_j\rangle\langle u_j|\right)
$$

> を作る。この演算子は正値・トレース1の密度演算子で、$\rho_{\mathrm{tile}}^{\Gamma_B}\ge0$ を満たすPPT状態だが、分離可能ではない。
<!-- formal-statement-end -->

### 証明の見取り図

5個が直交しているため括弧はrank 4の直交射影です。さらに全成分が実なので部分転置でも同じ射影です。最後に、5個すべてと直交する積ベクトルが存在しないことを、局所成分の零・非零で場合分けして証明します。

<!-- proof-start -->
### 証明

まず $\|u_j\|=1$ です。$u_0,u_1$ はBob側、$u_0,u_2$ と $u_0,u_3$ はAlice側、$u_1,u_2$ はAlice側、$u_1,u_3$ と $u_2,u_3$ はBob側の内積が0です。$u_4$ との内積も、残る各 $u_j$ がどちらかの因子に $|0\rangle-|1\rangle$ または $|1\rangle-|2\rangle$ を持ち、その因子が $|s\rangle$ と直交するので0。従って5個は正規直交です。

$P=\sum_j|u_j\rangle\langle u_j|$ はrank 5の直交射影で、$I_9-P$ はrank 4の直交射影です。従って $\rho_{\mathrm{tile}}=(I_9-P)/4\ge0$ かつ $\operatorname{Tr}\rho_{\mathrm{tile}}=(9-5)/4=1$。各 $u_j=|a_j\rangle\otimes|b_j\rangle$ のBob因子は**実成分**なので $|b_j\rangle\langle b_j|$ は対称行列です。[部分転置の定義](#def-qinf15-partial-transpose)から各 $|u_j\rangle\langle u_j|$ と $I_9$ が不変で、

$$
\rho_{\mathrm{tile}}^{\Gamma_B}=\rho_{\mathrm{tile}}\ge0.
$$

ここからエンタングル性を示します。もし $|a\rangle\otimes|b\rangle$ が全 $u_j$ と直交し、零でないとします。局所成分を $a=(a_0,a_1,a_2)$、$b=(b_0,b_1,b_2)$ とすれば、$u_0$ から $u_4$ への直交条件は順に

$$
\begin{aligned}
a_0(b_0-b_1)&=0,&(a_0-a_1)b_2&=0,\\
a_2(b_1-b_2)&=0,&(a_1-a_2)b_0&=0,\\
(a_0+a_1+a_2)(b_0+b_1+b_2)&=0.
\end{aligned}
$$

零との等式なので複素共役を取った形でも同じ条件です。最初の4本から、$b_0,b_2$ の場合を全て調べます。

1. $b_0\ne0,b_2\ne0$ なら $a_0=a_1=a_2=t\ne0$。第一・第三式から $b_0=b_1=b_2=s\ne0$。第五式は $9ts=0$ を要求し矛盾します。
2. $b_0=0,b_2\ne0$ なら $a_0=a_1$。$a_0\ne0$ なら第一式で $b_1=0$、第三式で $a_2=0$。双方の成分和は $2a_0$ と $b_2$ で非零です。$a_0=0$ なら $a_2\ne0$、第三式で $b_1=b_2$。成分和は $a_2$ と $2b_2$ で非零。いずれも第五式と矛盾します。
3. $b_0\ne0,b_2=0$ なら $a_1=a_2$。$a_2\ne0$ なら第三式で $b_1=0$、第一式で $a_0=0$。成分和は $2a_2$ と $b_0$ で非零です。$a_2=0$ なら $a_0\ne0$、第一式で $b_1=b_0$。成分和は $a_0$ と $2b_0$ で非零。いずれも第五式と矛盾します。
4. $b_0=b_2=0$ なら $b_1\ne0$。第一・第三式で $a_0=a_2=0$、零でない $a_1$ と $b_1$ の積が第五式に反します。

従って全 $u_j$ と直交する非零積ベクトルは存在しません。一方で仮に[純粋積分解](#prop-qinf15-pure-product-ensemble) $\rho_{\mathrm{tile}}=\sum_kq_k|a_kb_k\rangle\langle a_kb_k|$ があるなら、$\rho_{\mathrm{tile}}$ の核に属する任意の $|v\rangle$ に対し

$$
0=\langle v|\rho_{\mathrm{tile}}|v\rangle
=\sum_kq_k|\langle v|a_kb_k\rangle|^2.
$$

非負項の和が0なので、$q_k>0$ の各積ベクトルは核に直交し、$\rho_{\mathrm{tile}}$ の像（全 $u_j$ への直交補空間）に属します。ところがその空間には非零積ベクトルが一つもなく矛盾します。従ってPPTであってもエンタングル状態です。$\square$
<!-- proof-end -->

これがPPTを**必要条件以上に一般化できない**具体的な理由です。部分転置に負の固有値が出れば確実にエンタングル状態ですが、出なければ「未判定」であり、分離可能分解を構成するか別の論証が必要です。

## 8. 演習：分解・転置・必要条件を使い分ける

<a id="ex-qinf15-a01"></a>
### QINF15-A01 古典相関混合とBell状態の区別

- Level: A

二qubit状態 $\rho=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|$ について、分離可能な分解を提示し、$\operatorname{Tr}_A\rho$、$\operatorname{Tr}_B\rho$、$\operatorname{Tr}(\rho^2)$ を計算せよ。$|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ の密度演算子と縮約状態・純粋性を比べよ。

<!-- solution-start -->
### 詳細解答

入力式自体が非負重み $1/2,1/2$ を持つ積純粋射影の和です。各射影は正値・トレース1で、重みの和は1ですから[二部混合状態の分離可能性](#def-qinf15-separable)を満たします。[部分トレースの積への作用](../QINF3/index.md#prop-qinf3-state-product)を各項へ適用すると

$$
\operatorname{Tr}_A\rho=\operatorname{Tr}_B\rho
=\frac12(|0\rangle\langle0|+|1\rangle\langle1|)=I_2/2.
$$

二つの射影は互いに直交して積が0なので、$\rho^2=\frac14(|00\rangle\langle00|+|11\rangle\langle11|)$、$\operatorname{Tr}(\rho^2)=1/2$。一方、$|\Phi^+\rangle\langle\Phi^+|$ はrank 1の射影だから純粋性は1です。その縮約は[Schmidt縮約固有値](../QINF6/index.md#thm-qinf6-reduced-spectrum)から同じ $I_2/2$。部分系だけを見ても全系の分離可能性は判別できません。
<!-- solution-end -->

<a id="ex-qinf15-a02"></a>
### QINF15-A02 複素成分を持つ積状態の部分転置

- Level: A

$|+i\rangle=(|0\rangle+i|1\rangle)/\sqrt2$ とし、$\rho=|0,+i\rangle\langle0,+i|$ を考える。計算基底でBobの局所射影を行列表示し、$\rho^{\Gamma_B}$ が別の積純粋射影になることを示せ。PPT条件を確認せよ。

<!-- solution-start -->
### 詳細解答

Bobの正規化ベクトルは列 $2^{-1/2}(1,i)^T$ なので

$$
|+i\rangle\langle+i|=\frac12\begin{pmatrix}1&-i\\i&1\end{pmatrix},
\qquad (|+i\rangle\langle+i|)^T
=\frac12\begin{pmatrix}1&i\\-i&1\end{pmatrix}.
$$

後者は $|-i\rangle=(|0\rangle-i|1\rangle)/\sqrt2$ の射影です。[部分転置の定義](#def-qinf15-partial-transpose)から

$$
\rho^{\Gamma_B}=|0\rangle\langle0|\otimes|-i\rangle\langle-i|.
$$

これはrank 1の射影で、固有値は $1,0,0,0$。従って正値でPPTです。元の $\rho$ も純粋な積状態ですから[分離可能性の定義](#def-qinf15-separable)を満たします。単なる全体転置とは違い、Aliceの $|0\rangle$ 因子は変わりません。
<!-- solution-end -->

<a id="ex-qinf15-a03"></a>
### QINF15-A03 Singletの部分転置

- Level: A

$|\Psi^-\rangle=(|01\rangle-|10\rangle)/\sqrt2$ とする。$|\Psi^-\rangle\langle\Psi^-|$ の部分転置を $00,01,10,11$ の計算基底で求め、固有値から分離可能性を判定せよ。

<!-- solution-start -->
### 詳細解答

もとの射影を展開すると

$$
\rho=\frac12(|01\rangle\langle01|+|10\rangle\langle10|
-|01\rangle\langle10|-|10\rangle\langle01|).
$$

[部分転置の定義](#def-qinf15-partial-transpose)で交差項を $|00\rangle\langle11|$ とその随伴へ移すと

$$
\rho^{\Gamma_B}=\frac12\begin{pmatrix}
0&0&0&-1\\0&1&0&0\\0&0&1&0\\-1&0&0&0
\end{pmatrix}.
$$

中央の二成分の固有値はそれぞれ $1/2$。両端の $2\times2$ ブロックは $\frac12\begin{pmatrix}0&-1\\-1&0\end{pmatrix}$ で、固有値は $\pm1/2$。すなわちスペクトルは $1/2$ が3個、$-1/2$ が1個であり、[PPT必要条件](#thm-qinf15-ppt-necessary)に反してエンタングル状態です。
<!-- solution-end -->

<a id="ex-qinf15-a04"></a>
### QINF15-A04 Werner型状態の負固有値

- Level: A

$\rho_W(p)=(1-p)I_4/4+p|\Psi^-\rangle\langle\Psi^-|$ の $p=1/2$ について、密度演算子の固有値と部分転置の固有値を計算し、状態の正値性とエンタングルメントを区別して判定せよ。

<!-- solution-start -->
### 詳細解答

Singlet方向の固有値は $\frac{1+3p}{4}=5/8$、直交する3方向は $\frac{1-p}{4}=1/8$ です。いずれも非負で総和 $5/8+3/8=1$ だから正当な密度演算子です。部分転置については[Werner型状態の計算](#thm-qinf15-werner-threshold)のブロックに $p=1/2$ を代入し

$$
\frac{1-3p}{4}=-\frac18,
\qquad\frac{1+p}{4}=\frac38
$$

を得ます。後者は3重。負固有値があるからPPTではなく、[PPT必要条件](#thm-qinf15-ppt-necessary)よりエンタングル状態です。$\rho_W(1/2)$ 自体は正値なので、「部分転置が非正値」と「状態が非物理的」は別です。
<!-- solution-end -->

<a id="ex-qinf15-a05"></a>
### QINF15-A05 対角でない分離可能状態

- Level: A

$|\pm\rangle=(|0\rangle\pm|1\rangle)/\sqrt2$ とし、$\rho=\frac12|0+\rangle\langle0+|+\frac12|1-\rangle\langle1-|$ とする。分離可能性、両側縮約、Bob側部分転置の正値性を確かめよ。

<!-- solution-start -->
### 詳細解答

重みは各 $1/2$、二項は正規化した積射影であり、[純粋積分解](#prop-qinf15-pure-product-ensemble)をそのまま満たします。Alice側を部分トレースすると、Bobには $|+\rangle\langle+|,|-\rangle\langle-|$ が残り、両者は直交基底を作るので

$$
\rho_B=\tfrac12(|+\rangle\langle+|+|-\rangle\langle-|)=I_2/2.
$$

Bob側を部分トレースすれば $\rho_A=\tfrac12(|0\rangle\langle0|+|1\rangle\langle1|)=I_2/2$。[部分転置の定義](#def-qinf15-partial-transpose)を積項へ適用すると、$|\pm\rangle\langle\pm|$ は計算基底で実対称だから

$$
\rho^{\Gamma_B}=\frac12|0+\rangle\langle0+|+\frac12|1-\rangle\langle1-|=\rho\ge0.
$$

この例は全体の計算基底では非対角要素を持ちますが、分離可能です。「非対角＝エンタングル状態」ではありません。
<!-- solution-end -->

<a id="ex-qinf15-b01"></a>
### QINF15-B01 局所振幅減衰はもつれを生まない

- Level: B

Aliceがqubitに $K_0=|0\rangle\langle0|+\sqrt{1-\gamma}|1\rangle\langle1|$、$K_1=\sqrt\gamma|0\rangle\langle1|$（$0\le\gamma\le1$）の二つのKraus作用素を持つチャネルを適用する。入力を $\rho_{\mathrm{cl}}=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|$ とする。Kraus完全性と出力密度演算子を計算し、分離可能性を直接証明せよ。

<!-- solution-start -->
### 詳細解答

$K_0^\dagger K_0=|0\rangle\langle0|+(1-\gamma)|1\rangle\langle1|$、$K_1^\dagger K_1=\gamma|1\rangle\langle1|$ なので和は $I_2$ です。[Kraus表示のチャネル条件](../QINF7/index.md#def-qinf7-kraus)を満たします。各入力積射影への作用を先に計算すると

$$
\begin{aligned}
\sum_r(K_r\otimes I)|00\rangle\langle00|(K_r^\dagger\otimes I)&=|00\rangle\langle00|,\\
\sum_r(K_r\otimes I)|11\rangle\langle11|(K_r^\dagger\otimes I)
&=(1-\gamma)|11\rangle\langle11|+\gamma|01\rangle\langle01|.
\end{aligned}
$$

従って出力は

$$
\rho'=\frac12|00\rangle\langle00|+
\frac{1-\gamma}{2}|11\rangle\langle11|+
\frac\gamma2|01\rangle\langle01|.
$$

3つの重みは非負で総和 $1/2+(1-\gamma)/2+\gamma/2=1$。各項は積純粋射影だから[分離可能性の定義](#def-qinf15-separable)を満たします。これは[LOCCによる分離可能性の保存](#prop-qinf15-locc-preserves)の具体的な一例です。
<!-- solution-end -->

<a id="ex-qinf15-b02"></a>
### QINF15-B02 混合したX字型密度行列のPPT判定

- Level: B

計算基底 $00,01,10,11$ において、次のHermitian行列を考える。

$$
\rho=\begin{pmatrix}
1/3&0&0&1/5\\0&1/6&0&0\\0&0&1/6&0\\1/5&0&0&1/3
\end{pmatrix}.
$$

密度演算子であることを固有値とトレースから確認し、部分転置の固有値を求めて分離可能性を判定せよ。

<!-- solution-start -->
### 詳細解答

$\rho$ は $00,11$ のブロックと $01,10$ の対角成分へ分かれます。両端ブロックの固有ベクトルは $(|00\rangle\pm|11\rangle)/\sqrt2$ で、固有値は $1/3\pm1/5=8/15,2/15$。他の固有値は $1/6,1/6$ です。全て正で、トレースは $2/3+1/3=1$。よって密度演算子です。

[部分転置の定義](#def-qinf15-partial-transpose)で両端の $1/5$ が中央ブロックへ移るため

$$
\rho^{\Gamma_B}=\begin{pmatrix}
1/3&0&0&0\\0&1/6&1/5&0\\0&1/5&1/6&0\\0&0&0&1/3
\end{pmatrix}.
$$

中央の対称・反対称ベクトルの固有値は $1/6\pm1/5=11/30,-1/30$、他は $1/3$ が2個です。負固有値を持つため[PeresのPPT必要条件](#thm-qinf15-ppt-necessary)の対偶から、この混合状態はエンタングル状態です。
<!-- solution-end -->

<a id="ex-qinf15-b03"></a>
### QINF15-B03 任意に弱いBell成分も検出できるか

- Level: B

$0\le q\le1$ に対し、$\rho_q=(1-q)|00\rangle\langle00|+q|\Phi^+\rangle\langle\Phi^+|$（$|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$）を考える。密度演算子であることを確認し、$\rho_q^{\Gamma_B}$ の固有値を求め、分離可能な $q$ の範囲を決めよ。

<!-- solution-start -->
### 詳細解答

$0\le q\le1$ なので二つの純粋射影の確率混合として正値・トレース1です。計算基底で

$$
\rho_q=\begin{pmatrix}1-q/2&0&0&q/2\\0&0&0&0\\0&0&0&0\\q/2&0&0&q/2\end{pmatrix}.
$$

従って部分転置では中央 $2\times2$ ブロックが $\begin{pmatrix}0&q/2\\q/2&0\end{pmatrix}$ となり、他の対角は $1-q/2,q/2$ のままです。固有値は

$$
\operatorname{spec}(\rho_q^{\Gamma_B})
=\{1-q/2,q/2,q/2,-q/2\}.
$$

$q>0$ なら $-q/2<0$ なので[PeresのPPT必要条件](#thm-qinf15-ppt-necessary)からエンタングル状態。$q=0$ は $|00\rangle\langle00|$ という積状態です。したがって分離可能なのは $q=0$ のみ。$q$ が非常に小さくても、PPTの必要条件は厳密に破れます。
<!-- solution-end -->

<a id="ex-qinf15-b04"></a>
### QINF15-B04 負パラメータのWerner型状態を準備する

- Level: B

$\rho_W(p)=(1-p)I_4/4+p|\Psi^-\rangle\langle\Psi^-|$ の $p=-1/6$ を、$p=1/3$ と $p=-1/3$ の状態の確率混合に書き、純粋積状態の具体的な確率混合として準備する方法を説明せよ。$p<0$ を負の確率と誤解してはならない理由も述べよ。

<!-- solution-start -->
### 詳細解答

[Werner型状態の分離可能性定理](#thm-qinf15-werner-threshold)の $t=(1+3p)/2$ へ $p=-1/6$ を代入すると $t=(1-1/2)/2=1/4$。従って

$$
\rho_W(-1/6)=\frac14\rho_W(1/3)+\frac34\rho_W(-1/3).
$$

各端点は[定理の積状態構成](#thm-qinf15-werner-threshold)により6項ずつの混合です。具体的な局所準備は次の通りです。

1. 確率 $1/4$ で「逆向き」を、$3/4$ で「同向き」を選びます。
2. $x,y,z$ の軸を各 $1/3$ で選びます。
3. 選んだ軸の $+,-$ の向きを各 $1/2$ で選びます。逆向きならAliceとBobが反対符号、同向きなら同じ符号の状態を準備します。

全12枝の重みは、逆向きの各枝で $1/24$、同向きの各枝で $1/8$ です。総和は

$$
6\cdot\frac1{24}+6\cdot\frac18=\frac14+\frac34=1.
$$

各枝は純粋積射影だから分離可能です。もとの式の負の $p$ は、二つの密度演算子の混合確率ではなく、状態族の**線形パラメータ**にすぎません。
<!-- solution-end -->

<a id="ex-qinf15-c01"></a>
### QINF15-C01 Bell白色雑音族を独立に分類する

- Level: C

二qubit系で $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ とし、実数 $r$ に依存するHermitian行列 $\omega(r)=(1-r)I_4/4+r|\Phi^+\rangle\langle\Phi^+|$ を考える。

1. $\omega(r)$ が密度演算子となる全範囲を求め、両側縮約を求めよ。
2. 計算基底でBob側部分転置を導き、PPTになる $r$ を求めよ。
3. $U=|0\rangle\langle1|-|1\rangle\langle0|$ として、$U$ がユニタリで $(I\otimes U)|\Psi^-\rangle=|\Phi^+\rangle$ を確認せよ。この局所ユニタリを用いて、PPTになる全範囲で分離可能な**具体的な有限積状態分解**が存在することを示せ。
4. 両側縮約が同じでも、$r=0$ と $r=1$ のエンタングルメントが違う理由を述べよ。

<!-- solution-start -->
### 詳細解答

**（1）** $|\Phi^+\rangle$ 方向では固有値 $(1-r)/4+r=(1+3r)/4$、それに直交する3次元では $(1-r)/4$ です。トレースは恒等的に1なので、両方が非負である条件は $-1/3\le r\le1$。$I_4/4$ とBell状態はともに片側縮約が $I_2/2$ なので、[部分トレースの線形性](../QINF3/index.md#prop-qinf3-state-product)から全範囲で $\omega_A=\omega_B=I_2/2$ です。

**（2）** 行列を直接展開すると

$$
\omega(r)=\begin{pmatrix}
\frac{1+r}{4}&0&0&\frac r2\\
0&\frac{1-r}{4}&0&0\\
0&0&\frac{1-r}{4}&0\\
\frac r2&0&0&\frac{1+r}{4}
\end{pmatrix}.
$$

[部分転置の定義](#def-qinf15-partial-transpose)で $00\leftrightarrow11$ の非対角要素が $01\leftrightarrow10$ の中央へ移るので、部分転置の中央ブロックは

$$
\begin{pmatrix}\frac{1-r}{4}&\frac r2\\\frac r2&\frac{1-r}{4}\end{pmatrix}.
$$

固有値は $(1+r)/4$ と $(1-3r)/4$。他に外側対角の $(1+r)/4$ が2個あり、全固有値は $(1+r)/4$ が3個、$(1-3r)/4$ が1個です。密度演算子の定義域では $1+r>0$ なのでPPTの範囲は $-1/3\le r\le1/3$ となります。

**（3）** $U$ は行列表現 $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ で、$U^\dagger U=I_2$。さらに $U|0\rangle=-|1\rangle$、$U|1\rangle=|0\rangle$ なので

$$
(I\otimes U)|\Psi^-\rangle
=\frac{|0\rangle U|1\rangle-|1\rangle U|0\rangle}{\sqrt2}
=\frac{|00\rangle+|11\rangle}{\sqrt2}=|\Phi^+\rangle.
$$

恒等演算子は局所ユニタリ共役で不変だから

$$
\omega(r)=(I\otimes U)\rho_W(r)(I\otimes U^\dagger).
$$

[Werner型状態の分離可能性定理](#thm-qinf15-werner-threshold)で、物理的なパラメータ範囲のうち

$$
-\frac13\le r\le\frac13,\qquad t=\frac{1+3r}{2}
$$

なら $\rho_W(r)$ は逆向き6枝・同向き6枝の混合で表せます。各逆向き枝の確率は $t/6$、同向き枝の確率は $(1-t)/6$。どちらも非負で、12枝の総和は $t+(1-t)=1$ です。

例えば逆向きの積状態はBobだけに $U$ を施すと

$$
|k,+\rangle_A\otimes|k,-\rangle_B
\longmapsto |k,+\rangle_A\otimes U|k,-\rangle_B
$$

と、引き続き**積状態のまま**です。他の11枝もBob側に同じユニタリを施します。これで $\omega(r)$ の純粋積分解が具体的に得られました。$r>1/3$ は（2）のNPTから分離不可能です。

**（4）** $r=0$ は $I_4/4=(I_2/2)\otimes(I_2/2)$ なので分離可能です。$r=1$ はBellの純粋射影で、（2）の部分転置に負固有値 $-1/2$ があります。どちらの縮約も $I_2/2$ なのは（1）から分かります。片側縮約は全系の量子相関を保持しないため、この違いが生じます。
<!-- solution-end -->

## 9. この講義で持ち帰る判定手順

有限次元の二部混合状態が与えられたとき、まず正値性とトレース1を確認します。次に**純粋積射影の有限確率混合**が具体的に作れれば分離可能と結論でき、**部分転置に負の固有値**が見つかればエンタングル状態と結論できます。PPTであっても、高次元ではこの二つのどちらとも限らないため判定を保留します。

[QINF14のNielsen定理](../QINF14/index.md#thm-qinf14-nielsen)は純粋状態のLOCC変換の順序を記述し、本章は混合状態のエンタングルメントの有無を調べました。次のBell不等式では、さらに「もつれ」と「局所的な古典相関模型では再現できない統計的相関」を区別します。


