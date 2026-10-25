# QINF3 部分トレースと縮約状態

[QINF1の複合量子系](../QINF1/index.md#def-qinf1-composite)では、二つの系をテンソル積として表し、[QINF2の密度演算子](../QINF2/index.md#def-qinf2-ensemble-density)では、準備の確率と測定結果を一つの作用素にまとめました。しかし二つのqubitを一緒に用意して、片方だけを受け取った人は、もう片方の状態を知ることができません。**手元にない系を取り除き、手元での全測定を予測する密度演算子を作れるか**が本章の問いです。

全系が純粋であっても、手元の状態は混合になることがあります。これは単なる準備時の無知と同じ密度演算子で記述できますが、全系の相関を含めると両者は異なります。本章では有限次元複素Hilbert空間を対象に、不要な系の成分を足し合わせる操作を基底和から構成し、その基底によらない意味と使い方を証明します。

## 1. 局所的に見える期待値を残す

$H_A,H_B$ をそれぞれ次元 $d_A,d_B\ge1$ の複素Hilbert空間とし、全系を $H_A\otimes H_B$ とします。[QINF1の局所作用素](../QINF1/index.md#def-qinf1-local-operator)により、$A$ 側だけで観測量 $M$ を測る操作は $M\otimes I_B$ です。[QINF2の期待値公式](../QINF2/index.md#prop-qinf2-trace-born)で全系の状態を $\rho_{AB}$ と書けば、観測結果の期待値は

$$
\operatorname{Tr}_{AB}\bigl(\rho_{AB}(M\otimes I_B)\bigr)
$$

です。添字 $AB$ はトレースを取る空間を表します。$A$ の人がすべての $M$ について同じ期待値を計算できる作用素を $H_A$ 上に作りたい。そのため、$B$ の正規直交基底 $f_1,\ldots,f_{d_B}$ に沿って、作用素の $B$ 成分を足し合わせます。

任意の $X\in\mathcal L(H_A\otimes H_B)$ と各 $j$ に対して、$H_A$ 上の作用素 $X_{jj}$ を

$$
\langle u,X_{jj}v\rangle
=\langle u\otimes f_j,X(v\otimes f_j)\rangle
\quad(u,v\in H_A)
$$

で定められます。積空間の内積を使ったこの定義は、正規直交基底 $(e_a)$ を選べば $X$ の成分 $\langle e_a\otimes f_j,X(e_b\otimes f_j)\rangle$ を $a,b$ 成分に持つ行列を指定していることになります。$B$ の対角ブロックを足すと、欲しい作用素が得られます。

<a id="def-qinf3-partial-trace"></a>

<!-- formal-statement-start -->
> **定義（部分トレースと縮約状態）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ と、$H_B$ の正規直交基底 $(f_j)_{j=1}^{d_B}$ を取る。$H_A\otimes H_B$ 上の任意の線形作用素 $X$ に対し、**$B$ 上の部分トレース**を $H_A$ 上の作用素

$$
\operatorname{Tr}_B X
:=\sum_{j=1}^{d_B}(I_A\otimes\langle f_j|)X(I_A\otimes|f_j\rangle)
$$

> と定める。$A$ 上の部分トレース $\operatorname{Tr}_A X$ も同様に $A$ の正規直交基底で定める。全系の密度演算子 $\rho_{AB}$ に対し、$\rho_A:=\operatorname{Tr}_B\rho_{AB}$ と $\rho_B:=\operatorname{Tr}_A\rho_{AB}$ をそれぞれ **$A$ と $B$ の縮約状態（縮約密度演算子）**と呼ぶ。
<!-- formal-statement-end -->

記号 $I_A\otimes|f_j\rangle:H_A\to H_A\otimes H_B$ は $v\mapsto v\otimes f_j$、$I_A\otimes\langle f_j|$ はその随伴です。したがって積の各項は $H_A$ 上の作用素で、和を取れることが分かります。見かけは基底に依存しますが、次の定理により**作られた作用素は基底に依存しない**ことも分かります。

<a id="thm-qinf3-expectation-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（部分トレースの局所期待値による一意性）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ 上の任意の作用素 $X\in\mathcal L(H_A\otimes H_B)$ に対して、$H_A$ 上の作用素 $Y$ が、すべての $M\in\mathcal L(H_A)$ について

$$
\operatorname{Tr}_A(YM)
=\operatorname{Tr}_{AB}\bigl(X(M\otimes I_B)\bigr)
$$

> を満たすなら、$Y=\operatorname{Tr}_B X$ であり、そのような $Y$ は一意に存在する。特に部分トレースの値は $H_B$ の正規直交基底の選び方によらない。
<!-- formal-statement-end -->

### 証明の見取り図

二重の基底和で全系のトレースを展開すると、$B$ の対角成分の和が残ります。一意性には、$\operatorname{Tr}(DM)=0$ が**すべての** $M$ で成り立つなら、$D$ の各行列成分が0になることを使います。

<!-- proof-start -->
### 証明

$H_A$ の正規直交基底 $(e_a)_{a=1}^{d_A}$ と $H_B$ の正規直交基底 $(f_j)_{j=1}^{d_B}$ を取ります。[積基底の定理](../QINF1/index.md#thm-qinf1-product-basis)により $(e_a\otimes f_j)_{a,j}$ は正規直交基底です。定義の $Y=\operatorname{Tr}_B X$ に対して

$$
\begin{aligned}
\operatorname{Tr}_A(YM)
&=\sum_a\langle e_a,YMe_a\rangle\\
&=\sum_{a,j}\langle e_a\otimes f_j,X(Me_a\otimes f_j)\rangle\\
&=\sum_{a,j}\langle e_a\otimes f_j,X(M\otimes I_B)(e_a\otimes f_j)\rangle\\
&=\operatorname{Tr}_{AB}\bigl(X(M\otimes I_B)\bigr).
\end{aligned}
$$

次に同じ等式を満たす $Y'$ があれば、$D=Y'-Y$ に対して $\operatorname{Tr}(DM)=0$ が任意の $M$ で成り立ちます。$M=|e_b\rangle\langle e_a|$ を取ると、トレースの積を基底で計算して

$$
\operatorname{Tr}\bigl(D|e_b\rangle\langle e_a|\bigr)
=\sum_c\langle e_c,De_b\rangle\langle e_a,e_c\rangle
=\langle e_a,De_b\rangle=0.
$$

すべての $a,b$ について成分が0なので $D=0$、すなわち $Y'=Y$ です。別の正規直交基底で定義した和も、最初の等式を満たすため、同じ一意な作用素になります。
<!-- proof-end -->

<!-- definition-example-start: def-qinf3-partial-trace -->
### 定義の確認：積の外積を片側だけ残す

**定義の確認**：何を足すのか、$H_A=H_B=\mathbb C^2$ で確認します。$|0\rangle,|1\rangle$ を計算基底とし、$X=|0\,1\rangle\langle1\,1|$ を取ります。$B$ 側の基底を $f_0=|0\rangle,f_1=|1\rangle$ とすると

$$
\begin{aligned}
(I\otimes\langle0|)X(I\otimes|0\rangle)&=0,\\
(I\otimes\langle1|)X(I\otimes|1\rangle)&=|0\rangle\langle1|,\\
\operatorname{Tr}_B X&=|0\rangle\langle1|.
\end{aligned}
$$

例えば $v=\alpha|0\rangle+\beta|1\rangle$ について、二番目の項は $v\mapsto\beta|0\rangle$ です。$X$ は密度演算子ではありませんが、**部分トレースは任意の作用素に定義される**ため、この非対角成分にも使えます。一方 $|0\,0\rangle\langle1\,1|$ は $B$ の添字が異なるので、同じ和では0になります。各項の $B$ 添字を一致させて和を取る点が本質です。
<!-- definition-example-end -->

## 2. 縮約は正しい密度演算子になる

物理的に許される全系の状態を縮約した結果が、再び密度演算子でなければ困ります。そのためには[QINF2の密度演算子の三条件](../QINF2/index.md#def-qinf2-ensemble-density)である自己共役性、正値性、トレース1を確認します。

<a id="prop-qinf3-state-product"></a>

<!-- formal-statement-start -->
> **命題（部分トレースの状態保存性と積への作用）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ 上で、部分トレース $\operatorname{Tr}_B$ は線形であり、任意の作用素 $X$ に対して

$$
\operatorname{Tr}_A(\operatorname{Tr}_B X)
=\operatorname{Tr}_{AB}X,
\qquad
(\operatorname{Tr}_B X)^\dagger=\operatorname{Tr}_B(X^\dagger)
$$

> を満たす。$X$ が正値なら $\operatorname{Tr}_B X$ も正値である。従って $\rho_{AB}$ が密度演算子なら $\rho_A=\operatorname{Tr}_B\rho_{AB}$ も密度演算子である。また $S\in\mathcal L(H_A)$ と $T\in\mathcal L(H_B)$ について

$$
\operatorname{Tr}_B(S\otimes T)=S\operatorname{Tr}_B T
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

定義は各 $B$ 成分の和なので線形性と随伴の関係が従います。正値性は $A$ の任意のベクトルを $v\otimes f_j$ へ持ち上げて確認します。積 $S\otimes T$ では両方の成分が分離します。

<!-- proof-start -->
### 証明

部分トレースの定義において、$K_j=I_A\otimes|f_j\rangle$ と置けば $\operatorname{Tr}_B X=\sum_jK_j^\dagger X K_j$ です。和と積の線形性から $X$ に関する線形性が従い、$(K_j^\dagger X K_j)^\dagger=K_j^\dagger X^\dagger K_j$ から随伴との交換も従います。

正値な $X$ と任意の $v\in H_A$ について

$$
\langle v,(\operatorname{Tr}_B X)v\rangle
=\sum_j\langle v\otimes f_j,X(v\otimes f_j)\rangle\ge0.
$$

随伴との交換と $X=X^\dagger$ により縮約も自己共役です。トレースについては[局所期待値による一意性定理](#thm-qinf3-expectation-uniqueness)の等式に $M=I_A$ を代入すれば

$$
\operatorname{Tr}_A(\operatorname{Tr}_B X)
=\operatorname{Tr}_{AB}(X(I_A\otimes I_B))
=\operatorname{Tr}_{AB}X.
$$

密度演算子 $X=\rho_{AB}$ のトレースが1であることと合わせ、三条件が確かめられました。最後に積作用素の各項を $v\in H_A$ に作用させると

$$
\begin{aligned}
(I_A\otimes\langle f_j|)(S\otimes T)(v\otimes f_j)
&=Sv\,\langle f_j,Tf_j\rangle,\\
\operatorname{Tr}_B(S\otimes T)v
&=Sv\sum_j\langle f_j,Tf_j\rangle
=Sv\operatorname{Tr}_B T.
\end{aligned}
$$

任意の $v$ に成り立つので積の公式を得ます。
<!-- proof-end -->

積状態 $\rho_{AB}=\rho_A^{(0)}\otimes\rho_B^{(0)}$ なら $\operatorname{Tr}\rho_B^{(0)}=1$ ですから、[積への作用](#prop-qinf3-state-product)により縮約は $\rho_A^{(0)}$ です。特に $|a\rangle,|b\rangle$ が単位ベクトルのとき、積純粋状態の外積は $|a\rangle\langle a|\otimes|b\rangle\langle b|$ となり、$A$ の縮約は $|a\rangle\langle a|$ です。

<a id="prop-qinf3-local-born"></a>

<!-- formal-statement-start -->
> **命題（縮約状態と局所測定の周辺確率）**  
> 有限次元二部系の密度演算子 $\rho_{AB}$ と、$H_A$ 上の射影測定 $\{P_a\}_a$ に対し、$A$ 側の結果 $a$ の確率は

$$
\Pr(A=a)
=\operatorname{Tr}_{AB}\bigl(\rho_{AB}(P_a\otimes I_B)\bigr)
=\operatorname{Tr}_A(\rho_A P_a),
\quad \rho_A=\operatorname{Tr}_B\rho_{AB}.
$$

> $B$ 側でも対称な主張が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

全系では $P_a\otimes I_B$ が「$B$ の結果を見ない」射影です。全系でBorn則を使い、部分トレースの特徴づけで $A$ 側だけの式へ移します。

<!-- proof-start -->
### 証明

$P_a$ が直交射影で和が $I_A$ なので、$P_a\otimes I_B$ も射影で、$\sum_a(P_a\otimes I_B)=I_A\otimes I_B$ です。[混合状態のBorn則](../QINF2/index.md#prop-qinf2-trace-born)をこの射影測定へ適用すると最初のトレース式を得ます。次に[部分トレースの特徴づけ](#thm-qinf3-expectation-uniqueness)へ $X=\rho_{AB},M=P_a$ を代入すると二つ目の等号を得ます。$B$ 側も $A,B$ を入れ替えて証明できます。
<!-- proof-end -->

## 3. Bell状態と古典相関：手元だけでは区別できない

[QINF1のBell状態](../QINF1/index.md#def-qinf1-product-entangled)を $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ とし、全系を純粋状態 $\rho_\Phi=|\Phi^+\rangle\langle\Phi^+|$ に準備します。外積を展開すると

$$
\rho_\Phi=\frac12\bigl(
|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|\bigr).
$$

[積の部分トレース公式](#prop-qinf3-state-product)で各項を処理します。最初と最後は $|0\rangle\langle0|/2$、$|1\rangle\langle1|/2$ を残し、中央の二項は $\langle1|0\rangle=\langle0|1\rangle=0$ のため消えます。従って

$$
\rho_A=\rho_B=\frac12\bigl(|0\rangle\langle0|+|1\rangle\langle1|\bigr)
=\frac{I_2}{2},\qquad
\operatorname{Tr}(\rho_A^2)=\frac12.
$$

[QINF2の純粋性判定](../QINF2/index.md#thm-qinf2-purity-rank)から部分系は混合です。全系はrank 1の純粋状態なのに、片方だけは混合となりました。

他方、全系を最初から確率半々で $|00\rangle$ または $|11\rangle$ に準備した場合の状態は

$$
\rho_{\mathrm{cl}}=\frac12|00\rangle\langle00|
+\frac12|11\rangle\langle11|.
$$

こちらも縮約は $I_2/2$ です。しかし $\rho_\Phi\ne\rho_{\mathrm{cl}}$ です。両者を区別するには二つの系を共同で測定します。$X=|0\rangle\langle1|+|1\rangle\langle0|$ をPauliの $X$ 作用素とすると $X\otimes X$ は $|00\rangle\leftrightarrow|11\rangle$ を入れ替えます。従って

$$
\operatorname{Tr}(\rho_\Phi(X\otimes X))=1,
\qquad
\operatorname{Tr}(\rho_{\mathrm{cl}}(X\otimes X))=0.
$$

前者では $X\otimes X|\Phi^+\rangle=|\Phi^+\rangle$、後者では各 $|00\rangle,|11\rangle$ の $X\otimes X$ 期待値が0であるためです。**縮約状態が同じことは、全系の相関まで同じことを意味しません。** この喪失情報をどう扱うかは精製（QINF4）、Schmidt分解（QINF6）へつながります。

## 4. 縮約が純粋になるのはいつか

任意の二部純粋状態を局所正規直交基底 $(e_a)$ と $(f_j)$ で展開します。係数を $c_{aj}$ として

$$
|\psi\rangle=\sum_{a=1}^{d_A}\sum_{j=1}^{d_B}c_{aj}|e_a\rangle\otimes|f_j\rangle,
\qquad \sum_{a,j}|c_{aj}|^2=1.
$$

$d_A\times d_B$ の係数行列を $C=(c_{aj})$ とします。ここで $C$ は純粋状態の係数を行列に並べたもので、密度行列そのものではありません。部分トレースの成分を計算すると

$$
\begin{aligned}
\langle e_a,\rho_Ae_b\rangle
&=\sum_j\langle e_a\otimes f_j,|\psi\rangle\langle\psi|(e_b\otimes f_j)\rangle\\
&=\sum_jc_{aj}\overline{c_{bj}},
\qquad \boxed{\rho_A=CC^\dagger}.
\end{aligned}
$$

この表示は、$\rho_A$ のrankを $C$ の列の線形独立性から判定できる理由にもなります。

<a id="thm-qinf3-product-pure"></a>

<!-- formal-statement-start -->
> **定理（純粋状態の積性と縮約の純粋性）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ 上の単位ベクトル $\psi\in H_A\otimes H_B$ と純粋全系状態 $\rho_{AB}=|\psi\rangle\langle\psi|$ に対し、次は同値である。
>
> 1. $\psi$ は $\psi=u\otimes v$ と書ける積状態である（$u,v$ は単位ベクトル）。
> 2. $\rho_A=\operatorname{Tr}_B\rho_{AB}$ はrank 1である。
> 3. $\operatorname{Tr}(\rho_A^2)=1$ である。
>
> これらが成り立たなければ $\rho_A$ は混合状態であり、$\psi$ はエンタングル純粋状態である。$A,B$ を交換した主張も成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

上の $\rho_A=CC^\dagger$ を使い、$\rho_A$ のrankが係数行列 $C$ のrankに等しいことを示します。$C$ がrank 1なら係数は一つの列と一つの行の積になり、$\psi$ 自身がテンソル積になります。rankと純粋性の関係は[QINF2の判定定理](../QINF2/index.md#thm-qinf2-purity-rank)です。

<!-- proof-start -->
### 証明

基底で上のように $C$ を定義します。任意の $z\in\mathbb C^{d_A}$ に対し

$$
z^\dagger CC^\dagger z=\|C^\dagger z\|^2,
$$

よって $\ker(CC^\dagger)=\ker C^\dagger$ です。有限次元の階数・退化次数の関係より

$$
\operatorname{rank}\rho_A
=\operatorname{rank}(CC^\dagger)
=\operatorname{rank}C^\dagger
=\operatorname{rank}C.
$$

$\psi=u\otimes v$ なら $u=\sum_au_ae_a$、$v=\sum_jv_jf_j$ と書き、$c_{aj}=u_av_j$ です。従って $C=(u_a)(v_j)^{\mathsf T}$ で、単位ベクトルなので両方の因子が非零、rankは1です。

逆に $\operatorname{rank}C=1$ なら非零列 $a=(a_i)$ を一つ選べます。すべての列が $a$ のスカラー倍であるから、ある $b=(b_j)$ が存在して $c_{ij}=a_ib_j$ です。このとき

$$
\psi=\sum_{i,j}a_ib_j e_i\otimes f_j
=\Bigl(\sum_ia_ie_i\Bigr)\otimes\Bigl(\sum_jb_jf_j\Bigr)=u_0\otimes v_0.
$$

$\|\psi\|=\|u_0\|\|v_0\|=1$ かつ両者非零なので、$u=u_0/\|u_0\|$、$v=v_0/\|v_0\|$ と置けば $\psi=u\otimes v$ です。[QINF2のrank・純粋性の同値](../QINF2/index.md#thm-qinf2-purity-rank)を、先に証明した密度演算子 $\rho_A$ に適用すると 2 と 3 が同値です。[QINF1の積状態とエンタングル純粋状態](../QINF1/index.md#def-qinf1-product-entangled)に照らせば、積でないときはエンタングル純粋状態です。
<!-- proof-end -->

例えば $|\psi_t\rangle=\sqrt t|00\rangle+\sqrt{1-t}|11\rangle$（$0\le t\le1$）では

$$
\rho_A=\begin{pmatrix}t&0\\0&1-t\end{pmatrix},
\qquad \operatorname{Tr}(\rho_A^2)=t^2+(1-t)^2=1-2t(1-t).
$$

$0<t<1$ ならrank 2で、[積状態の同値判定](#thm-qinf3-product-pure)からエンタングルです。$t=0,1$ では積状態です。$t=1/2$ はBell状態に戻り、縮約の純粋性は $1/2$ と最小になります。ここで「局所状態が混合」は全系の準備が混合という意味ではありません。

## 5. 遠方の操作と観測者に見える状態

$B$ 側だけに何かしても、その結果を $A$ の観測者へ知らせなければ、$A$ 側のすべての測定確率は変わりません。この節では一般の量子操作を先取りせず、[QINF1の局所ユニタリ](../QINF1/index.md#prop-qinf1-local-algebra)と射影測定について、行列計算で直接確認します。

ここで**非選択射影測定**とは、$B$ 側で直交射影の族 $(Q_b)$（$Q_bQ_c=\delta_{bc}Q_b$、$\sum_bQ_b=I_B$）に従って測定した後、その結果 $b$ を区別せず平均した状態を用いる操作です。全系の更新後の状態は $\sum_b(I_A\otimes Q_b)\rho_{AB}(I_A\otimes Q_b)$ です。一つの結果 $b$ を選んで条件付けする場合とは区別します。

<a id="prop-qinf3-no-signalling"></a>

<!-- formal-statement-start -->
> **命題（局所ユニタリと非選択射影測定の不変性）**  
> 有限次元複素Hilbert空間 $H_A,H_B$ 上の密度演算子 $\rho_{AB}$ に対し、$B$ のユニタリ作用素 $U$ で変換した状態 $\rho'_{AB}$、および $B$ の完全な直交射影測定 $(Q_b)$ の結果を捨てた状態 $\rho''_{AB}$ を

$$
\begin{aligned}
\rho'_{AB}&=(I_A\otimes U)\rho_{AB}(I_A\otimes U^\dagger),\\
\rho''_{AB}&=\sum_b(I_A\otimes Q_b)\rho_{AB}(I_A\otimes Q_b)
\end{aligned}
$$

> と定める。このとき

$$
\operatorname{Tr}_B\rho'_{AB}
=\operatorname{Tr}_B\rho''_{AB}
=\operatorname{Tr}_B\rho_{AB}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

局所ユニタリなら $B$ の基底を回転しても部分トレースの和が同じです。非選択測定では、$A$ 上の任意の $M$ と $B$ 上の射影 $Q_b$ が別の因子に作用するので交換し、$Q_b^2=Q_b$ と $\sum_bQ_b=I_B$ で元の局所期待値に戻ります。

<!-- proof-start -->
### 証明

任意の $B$ の正規直交基底 $(f_j)$ を取り、部分トレースの定義を $\rho'_{AB}$ に適用すると

$$
\begin{aligned}
\operatorname{Tr}_B\rho'_{AB}
&=\sum_j(I_A\otimes\langle f_j|U)\rho_{AB}(I_A\otimes U^\dagger|f_j\rangle)\\
&=\sum_j(I_A\otimes\langle U^\dagger f_j|)\rho_{AB}(I_A\otimes|U^\dagger f_j\rangle).
\end{aligned}
$$

$U^\dagger$ はユニタリなので $(U^\dagger f_j)$ も正規直交基底です。[部分トレースの基底独立性](#thm-qinf3-expectation-uniqueness)から、最後の和は $\operatorname{Tr}_B\rho_{AB}$ です。

次に任意の $M\in\mathcal L(H_A)$ を取ります。$L_b=I_A\otimes Q_b$ は自己共役で、$L_b^2=L_b$、$L_b(M\otimes I_B)=(M\otimes I_B)L_b$ です。有限次元のトレースの巡回性を使い

$$
\begin{aligned}
\operatorname{Tr}_{AB}\bigl(\rho''_{AB}(M\otimes I_B)\bigr)
&=\sum_b\operatorname{Tr}_{AB}\bigl(L_b\rho_{AB}L_b(M\otimes I_B)\bigr)\\
&=\sum_b\operatorname{Tr}_{AB}\bigl(\rho_{AB}L_b(M\otimes I_B)L_b\bigr)\\
&=\operatorname{Tr}_{AB}\Bigl(\rho_{AB}(M\otimes I_B)\sum_bL_b^2\Bigr)\\
&=\operatorname{Tr}_{AB}\bigl(\rho_{AB}(M\otimes I_B)\bigr).
\end{aligned}
$$

[局所期待値による一意性](#thm-qinf3-expectation-uniqueness)を $\rho_{AB}$ と $\rho''_{AB}$ に適用すると、それぞれの縮約が一致します。
<!-- proof-end -->

具体的にBell状態の $B$ を $\{|0\rangle\langle0|,|1\rangle\langle1|\}$ で測定すると、結果0・1は各確率 $1/2$ です。結果を知り、例えば0だったと**条件付けた場合**、全系は $|00\rangle\langle00|$、$A$ は $|0\rangle\langle0|$ です。結果を知らず平均すれば全系は $\rho_{\mathrm{cl}}$ になり、$A$ の状態はやはり $I_2/2$ です。前者の条件付けには測定結果という追加情報が必要なため、不変性の主張と矛盾しません。

## 6. 三つの系を順に捨てる

$A,B,C$ の三部系では、$C$ を先に除いてから $B$ を除く操作と、$BC$ を一つの系として除く操作が一致します。この性質は、環境をいくつかの部分に分けて考えるときに便利です。

<a id="prop-qinf3-iterated"></a>

<!-- formal-statement-start -->
> **命題（三部系の逐次部分トレース）**  
> 有限次元複素Hilbert空間 $H_A,H_B,H_C$ と、$H_A\otimes H_B\otimes H_C$ 上の任意の線形作用素 $X$ に対し、自然なテンソル積の括弧の同一視の下で

$$
\operatorname{Tr}_{BC}X
=\operatorname{Tr}_B\bigl(\operatorname{Tr}_C X\bigr)
=\operatorname{Tr}_C\bigl(\operatorname{Tr}_B X\bigr)
$$

> が成り立つ。最後の $\operatorname{Tr}_B$ は中間の $A\otimes C$ 上、$\operatorname{Tr}_C$ は中間の $A\otimes B$ 上で行うものとする。
<!-- formal-statement-end -->

### 証明の見取り図

$B,C$ それぞれに基底を選ぶと、どちらの順序でも $(j,k)$ に関する二重和になります。

<!-- proof-start -->
### 証明

$B,C$ の正規直交基底を $(f_j),(g_k)$ とします。$C$ を先に部分トレースし、さらに $B$ を部分トレースした作用素の $u,v\in H_A$ における行列要素は、定義を二回使うと

$$
\begin{aligned}
&\left\langle u,\operatorname{Tr}_B(\operatorname{Tr}_C X)v\right\rangle\\
&\quad=\sum_j\langle u\otimes f_j,(\operatorname{Tr}_C X)(v\otimes f_j)\rangle\\
&\quad=\sum_j\sum_k\langle u\otimes f_j\otimes g_k,X(v\otimes f_j\otimes g_k)\rangle.
\end{aligned}
$$

有限和なので和の順番を交換できます。$(f_j\otimes g_k)_{j,k}$ は[積基底の定理](../QINF1/index.md#thm-qinf1-product-basis)により $H_B\otimes H_C$ の正規直交基底なので、この和は $\operatorname{Tr}_{BC}X$ の $u,v$ 成分です。$B$ を先に除く場合も同じ二重和が得られ、任意の行列要素が一致するので作用素は等しいです。
<!-- proof-end -->

## 7. 演習：何を捨て、何が残るか

以下で $H_A=H_B=\mathbb C^2$ とする設問では、$|0\rangle,|1\rangle$ は各系の計算基底です。三部系の問題では $H_A=H_B=H_C=\mathbb C^2$ とします。全状態は特に断らない限り指定した式で定義し、部分トレースは定義どおり正規直交基底で計算してください。

<a id="ex-qinf3-a01"></a>
### QINF3-A01 積状態から片方を取り出す

- Level: A
- 問題: $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$\rho_{AB}=|+\,1\rangle\langle+\,1|$ とする。$\rho_A,\rho_B$ を求め、それぞれが密度演算子であり純粋であることを確かめよ。

<!-- solution-start -->
**詳細解答**。積外積を $\rho_{AB}=|+\rangle\langle+|\otimes|1\rangle\langle1|$ と分解します。[部分トレースの状態保存性と積への作用](#prop-qinf3-state-product)を適用すると、$\operatorname{Tr}(|1\rangle\langle1|)=1$ なので

$$
\rho_A=|+\rangle\langle+|
=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},
\qquad
\rho_B=|1\rangle\langle1|
=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
$$

両行列は自己共役で、任意の $v$ に対する二次形式はそれぞれ $|\langle+,v\rangle|^2$、$|\langle1,v\rangle|^2$ で非負、対角成分の和は1です。加えて射影なので $\rho_A^2=\rho_A,\rho_B^2=\rho_B$、従って $\operatorname{Tr}(\rho_A^2)=\operatorname{Tr}(\rho_B^2)=1$ です。[純粋性の判定](../QINF2/index.md#thm-qinf2-purity-rank)により両者は純粋です。
<!-- solution-end -->

<a id="ex-qinf3-a02"></a>
### QINF3-A02 Bell状態の部分トレースを成分から計算する

- Level: A
- 問題: $|\Phi^-\rangle=(|00\rangle-|11\rangle)/\sqrt2$ の密度演算子から $B$ の部分トレースを求めよ。非対角項がどうなるかも各項について説明せよ。

<!-- solution-start -->
**詳細解答**。外積を分配すると

$$
|\Phi^-\rangle\langle\Phi^-|
=\frac12\bigl(|00\rangle\langle00|-|00\rangle\langle11|
-|11\rangle\langle00|+|11\rangle\langle11|\bigr).
$$

$|a\,b\rangle\langle c\,d|=(|a\rangle\langle c|)\otimes(|b\rangle\langle d|)$ に[積への作用](#prop-qinf3-state-product)を使い、$\operatorname{Tr}(|b\rangle\langle d|)=\langle d,b\rangle$ を計算します。$b=d$ の対角項は各 $|0\rangle\langle0|,|1\rangle\langle1|$ を残します。交差項は $\langle1,0\rangle=\langle0,1\rangle=0$ です。ゆえに

$$
\operatorname{Tr}_B(|\Phi^-\rangle\langle\Phi^-|)
=\frac12(|0\rangle\langle0|+|1\rangle\langle1|)=I_2/2.
$$

符号の違うBell状態でも縮約は同じです。
<!-- solution-end -->

<a id="ex-qinf3-a03"></a>
### QINF3-A03 古典相関と共同測定

- Level: A
- 問題: $\sigma_{AB}=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|$ について $\sigma_A,\sigma_B$ を求めよ。Pauli作用素 $Z=|0\rangle\langle0|-|1\rangle\langle1|$ と $X=|0\rangle\langle1|+|1\rangle\langle0|$ を使い、$\operatorname{Tr}(\sigma_{AB}Z\otimes Z)$ と $\operatorname{Tr}(\sigma_{AB}X\otimes X)$ を求めよ。

<!-- solution-start -->
**詳細解答**。各積外積から $B$ を除くと $\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|$ が残り、$A$ を除いた場合も対称です。従って $\sigma_A=\sigma_B=I_2/2$ です。

$Z|0\rangle=|0\rangle,Z|1\rangle=-|1\rangle$ なので $(Z\otimes Z)|00\rangle=|00\rangle$、$(Z\otimes Z)|11\rangle=|11\rangle$ です。各期待値は1で、平均して1です。一方 $(X\otimes X)|00\rangle=|11\rangle$、$(X\otimes X)|11\rangle=|00\rangle$ なので、直交性より各対角期待値は0です。従って

$$
\operatorname{Tr}(\sigma_{AB}(Z\otimes Z))=1,
\qquad
\operatorname{Tr}(\sigma_{AB}(X\otimes X))=0.
$$

各単独系の状態は $I_2/2$ でも、共同測定には相関が残ります。
<!-- solution-end -->

<a id="ex-qinf3-a04"></a>
### QINF3-A04 非対角作用素の添字を見抜く

- Level: A
- 問題: $X=|01\rangle\langle11|+2|00\rangle\langle11|+3|10\rangle\langle10|$ は密度演算子である必要はない。$\operatorname{Tr}_B X$ を計算せよ。また $\operatorname{Tr}(\operatorname{Tr}_B X)=\operatorname{Tr}X$ を確かめよ。

<!-- solution-start -->
**詳細解答**。[部分トレースの状態保存性と積への作用](#prop-qinf3-state-product)より $\operatorname{Tr}_B(|a\,b\rangle\langle c\,d|)=|a\rangle\langle c|\langle d,b\rangle$ です。一項目は $b=d=1$ なので $|0\rangle\langle1|$ を残し、二項目は $b=0,d=1$ なので0です。三項目は $b=d=0$ なので $3|1\rangle\langle1|$ です。

$$
\operatorname{Tr}_B X
=|0\rangle\langle1|+3|1\rangle\langle1|
=\begin{pmatrix}0&1\\0&3\end{pmatrix}.
$$

このトレースは3です。全系で $\operatorname{Tr}|ab\rangle\langle cd|=\langle cd,ab\rangle$ を計算すると最初と二番目の項は0、三項目だけ3を与え、やはり $\operatorname{Tr}X=3$ です。非自己共役な $X$ にも公式が成立することを確認できました。
<!-- solution-end -->

<a id="ex-qinf3-b01"></a>
### QINF3-B01 係数行列から縮約を直接求める

- Level: B
- 問題: $|\psi\rangle=(|00\rangle+|10\rangle+|11\rangle)/\sqrt3$ について、$A,B$ の係数行列から両縮約を求めよ。$\rho_A$ のrankと $\operatorname{Tr}(\rho_A^2)$ を計算し、積状態か判定せよ。

<!-- solution-start -->
**詳細解答**。$A$ の添字を行、$B$ の添字を列に取ると係数行列は

$$
C=\frac1{\sqrt3}\begin{pmatrix}1&0\\1&1\end{pmatrix}.
$$

本文で導いた $\rho_A=CC^\dagger$ の各成分を列の積の和として、$\rho_B=C^\dagger C$ を行の積の和として計算します。

$$
\begin{aligned}
\rho_A&=\frac13\begin{pmatrix}1&0\\1&1\end{pmatrix}
\begin{pmatrix}1&1\\0&1\end{pmatrix}
=\frac13\begin{pmatrix}1&1\\1&2\end{pmatrix},\\
\rho_B&=\frac13\begin{pmatrix}1&1\\0&1\end{pmatrix}
\begin{pmatrix}1&0\\1&1\end{pmatrix}
=\frac13\begin{pmatrix}2&1\\1&1\end{pmatrix}.
\end{aligned}
$$

$\det\rho_A=(2-1)/9=1/9>0$ なのでrankは2です。また

$$
\rho_A^2=\frac19\begin{pmatrix}2&3\\3&5\end{pmatrix},
\qquad \operatorname{Tr}(\rho_A^2)=\frac79<1.
$$

[純粋な縮約と積状態の同値](#thm-qinf3-product-pure)により $\psi$ は積ではありません。$B$ 側でも同じ純粋性 $7/9$ であることを行列積から確認できます。
<!-- solution-end -->

<a id="ex-qinf3-b02"></a>
### QINF3-B02 局所測定データから縮約を復元する

- Level: B
- 問題: 二部状態 $\rho_{AB}$ の $A$ 側の縮約 $R$ は未知だが、局所期待値が $\operatorname{Tr}(R I)=1$、$\operatorname{Tr}(R Z)=1/3$、$\operatorname{Tr}(R X)=2/3$、$\operatorname{Tr}(R Y)=0$ と分かった。ここで $X,Z$ はA03の作用素、$Y=\begin{pmatrix}0&-i\\i&0\end{pmatrix}$ とする。$R$ を復元して密度演算子の条件を検証せよ。

<!-- solution-start -->
**詳細解答**。Hermitianでトレース1の $R$ を未知の実数 $a,d$ と複素数 $z$ で

$$
R=\begin{pmatrix}a&z\\\overline z&d\end{pmatrix},
\qquad a+d=1
$$

と書きます。$Z$ の期待値は $a-d=1/3$ なので連立すると $a=2/3,d=1/3$ です。$X$ について $\operatorname{Tr}(RX)=z+\overline z=2\operatorname{Re}z=2/3$、$Y$ について $\operatorname{Tr}(RY)=i(z-\overline z)=-2\operatorname{Im}z=0$ なので $z=1/3$ です。従って

$$
R=\begin{pmatrix}2/3&1/3\\1/3&1/3\end{pmatrix}.
$$

自己共役・トレース1であり、対角成分は正、$\det R=2/9-1/9=1/9>0$ です。$2\times2$ Hermitian行列の固有値は和が1、積が $1/9$ だから、$\lambda_\pm=(1\pm\sqrt5/3)/2$ で両方正です。従って正値でもあります。[局所期待値による一意性](#thm-qinf3-expectation-uniqueness)と合わせ、得られた局所観測データで縮約を特定できました。
<!-- solution-end -->

<a id="ex-qinf3-b03"></a>
### QINF3-B03 測定結果を知る場合と捨てる場合

- Level: B
- 問題: $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ に対して、$B$ で $Q_0=|0\rangle\langle0|,Q_1=|1\rangle\langle1|$ を測定する。各結果の確率・条件付きの全系状態・$A$ の縮約を求めよ。結果を捨てた後の全系状態と $A$ の縮約も求め、もとの $A$ の縮約と比較せよ。

<!-- solution-start -->
**詳細解答**。[局所射影測定のBorn則](../QINF1/index.md#prop-qinf1-joint-born)を使い、$(I\otimes Q_0)|\Phi^+\rangle=|00\rangle/\sqrt2$、$(I\otimes Q_1)|\Phi^+\rangle=|11\rangle/\sqrt2$ です。各ノルム二乗が $1/2$ なので、結果0・1の確率はともに $1/2$ です。

測定結果を知るときは、射影後のベクトルをノルム $\sqrt{1/2}$ で割って正規化します。結果0では全系 $|00\rangle\langle00|$、$A$ 側は $|0\rangle\langle0|$、結果1ではそれぞれ $|11\rangle\langle11|$ と $|1\rangle\langle1|$ です。結果を捨てると確率で平均するので

$$
\rho''_{AB}=\frac12|00\rangle\langle00|
+\frac12|11\rangle\langle11|,
\qquad
\rho''_A=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|=I_2/2.
$$

もとのBell状態の縮約も $I_2/2$ でした。**結果0に条件付けた $A$ の状態**は変わりますが、結果を受け取らない観測者の状態は[非選択測定の不変性](#prop-qinf3-no-signalling)どおり変わりません。
<!-- solution-end -->

<a id="ex-qinf3-b04"></a>
### QINF3-B04 三部GHZ状態を二段階で縮約する

- Level: B
- 問題: $|G\rangle=(|000\rangle+|111\rangle)/\sqrt2\in H_A\otimes H_B\otimes H_C$ とする。まず $\rho_{AB}=\operatorname{Tr}_C|G\rangle\langle G|$、次に $\rho_A=\operatorname{Tr}_B\rho_{AB}$ を求めよ。$BC$ を一度に除く場合の計算とも照合せよ。

<!-- solution-start -->
**詳細解答**。外積は $|000\rangle\langle000|$、$|000\rangle\langle111|$、$|111\rangle\langle000|$、$|111\rangle\langle111|$ の各 $1/2$ の和です。$C$ では交差項の内積が $\langle1,0\rangle=0$ になるので

$$
\rho_{AB}=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|.
$$

さらに $B$ を除くと

$$
\operatorname{Tr}_B\rho_{AB}
=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|=I_2/2.
$$

一度に $BC$ を除く場合、$|00\rangle_{BC},|11\rangle_{BC}$ は直交するため交差項はやはり0となり、対角項は $A$ の $|0\rangle\langle0|/2,|1\rangle\langle1|/2$ を残します。結果は $I_2/2$ であり、[逐次部分トレースの命題](#prop-qinf3-iterated)とも一致します。
<!-- solution-end -->

<a id="ex-qinf3-c01"></a>
### QINF3-C01 局所状態・全系純粋性・操作を一つの模型で比較する

- Level: C
- 問題: $0\le t\le1$ に対して $|\psi_t\rangle=\sqrt t|00\rangle+\sqrt{1-t}|11\rangle$、$\rho_t=|\psi_t\rangle\langle\psi_t|$、$\sigma_t=t|00\rangle\langle00|+(1-t)|11\rangle\langle11|$ とする。
  1. $\rho_t,\sigma_t$ の $A,B$ 側の縮約を求め、いつ純粋になるかを決めよ。
  2. $X$ をA03で定めたPauli作用素として、両状態における $X\otimes X$ の期待値を求めよ。局所状態だけから全系を区別できるか考えよ。
  3. $B$ 側で $U_\theta=|0\rangle\langle0|+e^{i\theta}|1\rangle\langle1|$ を作用させた純粋状態の $A$ の縮約と、$X\otimes X$ の期待値を求めよ。

<!-- solution-start -->
**詳細解答**。まず $\rho_t$ を外積に展開します。

$$
\begin{aligned}
\rho_t
&=t|00\rangle\langle00|+(1-t)|11\rangle\langle11|\\
&\quad+\sqrt{t(1-t)}\bigl(|00\rangle\langle11|+|11\rangle\langle00|\bigr).
\end{aligned}
$$

1. $A$ を除く場合も $B$ を除く場合も交差項は直交する添字で消えます。$\sigma_t$ は最初から対角二項だけなので、四つの縮約はすべて

$$
D_t=\begin{pmatrix}t&0\\0&1-t\end{pmatrix}
$$

です。これは正値・自己共役・trace1で、$\operatorname{Tr}(D_t^2)=t^2+(1-t)^2=1-2t(1-t)$ です。$t(1-t)=0$、すなわち $t=0$ または1でのみ純粋です。$0<t<1$ では縮約は混合で、[積状態と縮約純粋性の同値](#thm-qinf3-product-pure)から $\psi_t$ はエンタングルです。$\sigma_t$ は全系が混合する準備ですが、同じ縮約を持ちます。

2. $X\otimes X$ は $|00\rangle$ と $|11\rangle$ を入れ替えます。$\rho_t$ の期待値は対角二項が0、交差二項がそれぞれ $\sqrt{t(1-t)}$ を与えるので

$$
\operatorname{Tr}(\rho_t(X\otimes X))=2\sqrt{t(1-t)}.
$$

$\sigma_t$ は交差項がないので期待値は0です。$0<t<1$ では共同測定で区別できますが、$A,B$ の個別の縮約は完全に一致するため局所測定だけでは区別できません。

3. $B$ のユニタリを適用すると $|\psi_{t,\theta}\rangle=\sqrt t|00\rangle+e^{i\theta}\sqrt{1-t}|11\rangle$ です。外積の交差項にはそれぞれ $e^{-i\theta}$ と $e^{i\theta}$ が付きますが、部分トレースでは交差項が消えるため $A$ の縮約は依然として $D_t$ です。共同観測の期待値は

$$
\begin{aligned}
\langle\psi_{t,\theta}|X\otimes X|\psi_{t,\theta}\rangle
&=\sqrt{t(1-t)}(e^{i\theta}+e^{-i\theta})\\
&=2\sqrt{t(1-t)}\cos\theta.
\end{aligned}
$$

局所ユニタリは手元 $A$ の縮約を変えず、共同相関の位相は変えられます。これは[局所操作の不変性命題](#prop-qinf3-no-signalling)と整合します。
<!-- solution-end -->

## 8. 本章で得た道具と次の問い

全系の状態から一部だけを記述するには、単に係数を消すのではなく、**捨てる側の同じ基底添字で和を取る**必要があります。その結果は、手元のすべての観測量について全系と同じ期待値を返す一意な密度演算子です。純粋全系から混合縮約が生じることはエンタングルメントの判定になり、縮約を一致させても全系の相関まで同一とは限りません。

QINF4ではこの向きを逆転させ、**与えられた混合状態を、より大きい系の純粋状態の部分トレースとして実現する方法**を調べます。その次に、QINF6のSchmidt分解で今回の係数行列の構造を一般化します。
