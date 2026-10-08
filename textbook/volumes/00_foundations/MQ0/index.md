# MQ0 古典力学から数理量子力学への橋

古典力学で得た Hamiltonian をそのまま微分方程式へ代入すれば、量子力学になるのでしょうか。答えは否です。古典力学の状態は位置・運動量の点であり、量子力学の状態は Hilbert 空間の単位ベクトル（より一般には密度作用素）です。しかも古典的な積 $qp$ を、量子作用素の積 $QP$ としてよいかには選択の余地があります。

この章では [AMECH5 の Hamiltonian](../AMECH5/index.md#def-amech5-hamiltonian) と [AMECH6 の Poisson 括弧](../AMECH6/index.md#def-amech6-poisson-bracket) を出発点とし、[QM5 の位置・運動量作用素](../QM5/index.md#thm-qm5-position-self-adjoint)、[QM7 の時間発展](../QM7/index.md#thm-qm7-schrodinger-evolution)、[QM8 の CCR](../QM8/index.md#def-qm8-ccr-common-domain) を具体的な古典モデルへつなぎます。ここで新たに与える量子化の「対応」は**実験に照らして選ぶモデル化の原理**であって、古典方程式から論理必然に導かれる定理ではありません。

本章の問いは三つです。何を状態とし何を測るのか。古典的な $H(q,p)$ からどの作用素を作るのか。Schrödinger 描像と Heisenberg 描像がなぜ同じ測定予測を与えるのか。

## 1. 位相空間の点と Hilbert 空間の状態

質量 $m>0$ の一次元粒子では、古典的状態は位相空間 $\mathbb R^2$ の点 $(q,p)$ です。時刻を固定すれば、物理量 $f(q,p)$ はその点で一つの実数を取ります。例えば
$$
H_{\mathrm{cl}}(q,p)=\frac{p^2}{2m}+V(q),\qquad
\{f,g\}=\partial_qf\,\partial_pg-\partial_pf\,\partial_qg.
$$
時間に明示的に依存しない物理量は [AMECH6 の時間発展式](../AMECH6/index.md#thm-amech6-time-evolution) に従い、軌道に沿って $df/dt=\{f,H_{\mathrm{cl}}\}$ となります。

一方、位置を連続量として扱う量子模型では $\mathcal H=L^2(\mathbb R,dx)$ を取り、非零ベクトル $\psi$ のうち $\|\psi\|_2=1$ を規格化した純粋状態の代表として用います。$\psi$ と $e^{i\theta}\psi$ は同じ純粋状態を表します。$|\psi(x)|^2dx$ は位置の測定確率を与えます（[QM2 の Born 則](../QM2/index.md)）。これに対し、自己共役作用素 $A$ とそのスペクトル測度 $E_A$ は、Borel 集合 $B$ に測定値が入る確率
$$
\mathbb P_\psi(A\in B)=\langle\psi,E_A(B)\psi\rangle
$$
を与えます。期待値 $\langle\psi,A\psi\rangle$ を書けるのは、少なくとも $\psi\in D(A)$ の場合です。

古典的な一点 $(q,p)$ に対して、量子状態が位置と運動量の確定値を同時に持つと考えることはできません。[QM4 の不確定性関係](../QM4/index.md) と [QM8 の CCR](../QM8/index.md#def-qm8-ccr-common-domain) がその制約を表します。例えば正規化 Gaussian
$$
\psi_a(x)=\left(\frac{a}{\pi}\right)^{1/4}e^{-ax^2/2},\qquad a>0
$$
は $\mathcal S(\mathbb R)$ に属し、$|\psi_a(x)|^2$ は原点を中心とする確率密度ですが、位置が厳密に $q=0$ であるという意味ではありません。

## 2. 古典変数を位置・運動量作用素へ移す

古典 Hamiltonian に含まれる $q,p$ を、$L^2(\mathbb R)$ 上の次の作用素へ対応させるのが Schrödinger 表現の基本模型です。
$$
(Q\psi)(x)=x\psi(x),\qquad (P\psi)(x)=-i\hbar\psi'(x),\qquad \hbar>0.
$$
ここで $x$ の単位は長さ、$\hbar$ は作用の単位（エネルギー $\times$ 時間）を持ちます。したがって $P$ の単位は運動量です。$Q,P$ は一般に非有界で、**上式を全 $L^2$ ベクトルへ作用させてはいけません**。自己共役な最大定義域は QM5 に譲り、この章の具体的な積・微分は共通不変な Schwartz 空間 $\mathcal S(\mathbb R)$ でまず検算します。

<a id="def-mq0-canonical-model"></a>

<!-- formal-statement-start -->
### 定義（一次元 Schrödinger 表現での正準量子化の基本対応）

$m,\hbar>0$ とし $\mathcal H=L^2(\mathbb R)$ とする。Schwartz 空間上で古典変数に
$$
q\rightsquigarrow Q=x,\qquad
p\rightsquigarrow P=-i\hbar\frac{d}{dx}
$$
を対応させ、古典的な和・定数倍・$q$ のみの関数・$p$ のみの関数から量子作用素の候補を構成する操作を、ここでは**正準量子化の基本対応**と呼ぶ。混合積については順序を別に指定する必要がある。候補が自己共役作用素となるかは、その定義域を含めて別途証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq0-canonical-model -->

**定義の確認**

### 直接例：一次元自由粒子

古典的な $H_{\mathrm{cl}}=p^2/(2m)$ に対応する候補は
$$
H_0=\frac{P^2}{2m},\qquad
(H_0\psi)(x)=-\frac{\hbar^2}{2m}\psi''(x)
\quad(\psi\in\mathcal S(\mathbb R)).
$$
$P\psi=-i\hbar\psi'$ をもう一度 $P$ に入れると $P(P\psi)=(-i\hbar)^2\psi''=-\hbar^2\psi''$ なので係数と符号まで追えます。この微分式だけから自己共役性は結論できません。QM5 の Fourier 表現に基づく定義域と、MQ1 での自由 Hamiltonian の閉包・スペクトルの分析が必要です。
<!-- definition-example-end -->

この対応が最低限満たしてほしい条件として、古典 Poisson 括弧と量子交換子を比較します。
$$
\{q,p\}=1,\qquad [Q,P]\psi=i\hbar\psi\quad(\psi\in\mathcal S(\mathbb R)).
$$
計算は
$$
QP\psi=-i\hbar x\psi',\qquad
PQ\psi=-i\hbar(\psi+x\psi')
$$
なので、引き算で $i\hbar\psi$ が残ります。この例で
$$
\{q,p\}\rightsquigarrow \frac{[Q,P]}{i\hbar}
$$
は一致します。しかし**任意の多項式の Poisson 括弧を、積を保つ全域的な作用素対応で正確に保存できる**とは主張しません。量子化は単なる記号の置換ではありません。

### 2.1 順序の曖昧さを実際に見る

古典数では $qp=pq$ です。しかし作用素では
$$
(QP-PQ)\psi=i\hbar\psi
$$
なので、$QP$ と $PQ$ は同じ演算ではありません。$\mathcal S(\mathbb R)$ 上で $QP$ の形式的な随伴は $PQ$ です。そこで形式的に対称な式
$$
\frac12(QP+PQ)\psi=-i\hbar\left(x\psi'(x)+\frac12\psi(x)\right)
$$
を選ぶ方法があります。「形式的に対称」とはこの領域上で内積の左右を交換できるという意味であり、自己共役性や閉包の性質まで保証するものではありません。

<a id="def-mq0-symmetric-ordering"></a>

<!-- formal-statement-start -->
### 定義（混合積 $qp$ の対称順序）

$\mathcal H=L^2(\mathbb R)$ 上の $Q,P$ を前節の Schrödinger 表現とし、共通不変領域 $\mathcal S(\mathbb R)$ 上で古典物理量 $qp$ の**対称順序の候補**を
$$
\operatorname{Op}_{\mathrm{sym}}(qp)
:=\frac12(QP+PQ)
$$
と定める。これは $\mathcal S(\mathbb R)$ 上で対称な微分作用素である。自己共役作用素への拡張の問題とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq0-symmetric-ordering -->

**定義の確認**

### 直接例：積 $qp$ の順序を交換する

$\psi\in\mathcal S(\mathbb R)$ に対して
$$
\frac12(QP+PQ)\psi
=\frac12\{-i\hbar x\psi'-i\hbar(\psi+x\psi')\}
=-i\hbar(x\psi'+\psi/2).
$$
$QP$ だけを選んだ候補との差は $-i\hbar\psi/2$ です。また $\varphi,\psi\in\mathcal S$ として部分積分すれば境界項 $x\overline\varphi(x)\psi(x)$ は消え、
$$
\langle\varphi,\operatorname{Op}_{\mathrm{sym}}(qp)\psi\rangle
=\langle\operatorname{Op}_{\mathrm{sym}}(qp)\varphi,\psi\rangle
$$
が直接確かめられます。実際に対称性の条件を満たす例です。
<!-- definition-example-end -->

混合積の違いは $q^2p$ ではより明確です。
$$
Q^2P\psi=-i\hbar x^2\psi',\quad
\frac12(Q^2P+PQ^2)\psi
=-i\hbar(x^2\psi'+x\psi).
$$
二つの候補は $-i\hbar x\psi$ だけ異なります。古典的表式が同じでも量子作用素の作り方は一意に決まりません。特定の順序規約を選ぶ場合にも、その規約がすべての物理量を矛盾なく量子化する万能則だと考えてはいけません。

### 2.2 Hamiltonian を作るときの選択

$H_{\mathrm{cl}}=p^2/(2m)+V(q)$ の場合、しばしば
$$
H=\frac{P^2}{2m}+V(Q)
=-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}+V(x)
$$
を候補に取ります。$V$ が実数値であっても、この式が自己共役かどうかは $V$ の特異性、定義域、境界条件に左右されます。**モデル式の指定 → 対称性の確認 → 自己共役性の証明 → スペクトル解析**という順序が MQ1 以降の主線です。

例えば $V(x)=m\omega^2x^2/2$ なら調和振動子、$V=0$ なら自由粒子です。$V$ に特異点がある場合には、記号式だけで境界条件が決まるわけではありません。

## 3. 二つの描像は何を動かすのか

量子状態を時間とともに変化させるのが Schrödinger 描像です。[QM7 の Stone 理論](../QM7/index.md#thm-qm7-stone) に従い、時間に依存しない自己共役 Hamiltonian $H$ に対し
$$
U(t)=e^{-itH/\hbar},\qquad
\psi_S(t)=U(t)\psi_0
$$
とします。$\psi_0\in D(H)$ なら $i\hbar\,d\psi_S/dt=H\psi_S$ は強微分の意味で成り立ちます。$\psi_0$ が一般の $\mathcal H$ の元なら $U(t)\psi_0$ は定義できますが、強微分が存在すると限りません。

観測量 $A$ を動かす Heisenberg 描像では、初期状態 $\psi_0$ は固定し、代わりに $A$ をユニタリ共役で時間変化させます。そのとき非有界作用素は**定義域ごと運ばれます**。

<a id="def-mq0-heisenberg-observable"></a>

<!-- formal-statement-start -->
### 定義（Heisenberg 描像の観測量）

$H,A$ は Hilbert 空間 $\mathcal H$ 上の自己共役作用素であり、$U(t)=e^{-itH/\hbar}$ とする。各 $t\in\mathbb R$ について
$$
A_H(t)=U(t)^*AU(t),\qquad
D(A_H(t))=\{\psi\in\mathcal H:U(t)\psi\in D(A)\}
$$
と定める。$\psi_H=\psi_0$ を固定した状態とし、$A_H(t)$ を **Heisenberg 描像の観測量**という。$A_H(t)$ はユニタリ共役により自己共役である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq0-heisenberg-observable -->

**定義の確認**

### 直接例：Hamiltonian 自身

$A=H$ と取ると、[QM6 の関数計算](../QM6/index.md) で $U(t)$ と $H$ は可換であり、$U(t)D(H)=D(H)$ です。したがって定義域を含め
$$
H_H(t)=U(t)^*HU(t)=H
$$
です。これは時間に依存しない Hamiltonian のエネルギー保存と一致します。単に「$[H,H]=0$」と書くより、作用素として何が不変なのかが明確です。
<!-- definition-example-end -->

<a id="prop-mq0-picture-equivalence"></a>

<!-- formal-statement-start -->
### 命題（二つの描像の測定予測は一致する）

$\mathcal H$ 上の自己共役 $H,A$、$U(t)=e^{-itH/\hbar}$、単位ベクトル $\psi_0\in\mathcal H$ を取る。Schrödinger 描像の $\psi_S(t)=U(t)\psi_0$ と Heisenberg 描像の $A_H(t)=U(t)^*AU(t)$ について、任意の Borel 集合 $B\subset\mathbb R$ に対し
$$
\langle\psi_S(t),E_A(B)\psi_S(t)\rangle
=\langle\psi_0,E_{A_H(t)}(B)\psi_0\rangle
$$
が成り立つ。さらに $\psi_S(t)\in D(A)$ なら期待値も
$$
\langle\psi_S(t),A\psi_S(t)\rangle
=\langle\psi_0,A_H(t)\psi_0\rangle
$$
で一致する。
<!-- formal-statement-end -->

**証明の見取り図。** 観測量のスペクトル測度もユニタリ共役で移ります。測定確率の式は全単位ベクトルに有効で、非有界作用素の期待値には追加の定義域条件が必要です。

<!-- proof-start -->
### 証明

$V=U(t)$ と略します。$V$ はユニタリだから、$A_H=V^*AV$ は $V^*D(A)$ 上の自己共役作用素です。実数上の Borel 有界関数 $f$ に対する [QM6 の関数計算](../QM6/index.md) のユニタリ不変性から
$$
f(A_H)=V^*f(A)V
$$
が成り立ちます。$f=\mathbf1_B$ を取れば、左辺は $E_{A_H}(B)$、右辺は $V^*E_A(B)V$ なので
$$
\begin{aligned}
\langle\psi_0,E_{A_H}(B)\psi_0\rangle
&=\langle\psi_0,V^*E_A(B)V\psi_0\rangle\\
&=\langle V\psi_0,E_A(B)V\psi_0\rangle\\
&=\langle\psi_S(t),E_A(B)\psi_S(t)\rangle.
\end{aligned}
$$
次に $V\psi_0\in D(A)$ なら $\psi_0\in D(A_H)$ であり、同じユニタリ性により
$$
\langle\psi_0,A_H\psi_0\rangle
=\langle V\psi_0,A V\psi_0\rangle.
$$
これで両方の主張が示されました。$\square$
<!-- proof-end -->

### 3.1 Heisenberg の運動方程式

時間微分には定義域の問題があります。まずその問題が存在しない有限次元空間で正確に導きます。

<a id="thm-mq0-heisenberg-equation"></a>

<!-- formal-statement-start -->
### 定理（有限次元における Heisenberg の運動方程式）

$\mathcal H=\mathbb C^n$、$H=H^*$ を時間に依存しない行列、$A_S(t)=A_S(t)^*$ を成分が $C^1$ 級の行列値関数とし、$U(t)=e^{-itH/\hbar}$、$A_H(t)=U(t)^*A_S(t)U(t)$ と置く。このとき
$$
\boxed{\frac{dA_H}{dt}
=\frac{i}{\hbar}[H,A_H(t)]
+U(t)^*\frac{\partial A_S}{\partial t}(t)U(t)}
$$
である。特に $A_S$ に明示的な時間依存がなければ第2項は $0$ となる。
<!-- formal-statement-end -->

**証明の見取り図。** 三つの因子 $U^*,A_S,U$ を積の微分法で微分します。$H$ と $U$ は同じ行列 $H$ の関数なので可換です。

<!-- proof-start -->
### 証明

$U'(t)=-(i/\hbar)HU(t)$、$(U(t)^*)'=(i/\hbar)U(t)^*H$ です。積の微分法を3項に分けると
$$
\begin{aligned}
\frac{dA_H}{dt}
&=\frac{i}{\hbar}U^*HA_SU
+U^*(\partial_t A_S)U
-\frac{i}{\hbar}U^*A_SHU\\
&=\frac{i}{\hbar}U^*(HA_S-A_SH)U
+U^*(\partial_t A_S)U.
\end{aligned}
$$
さらに $HU=UH$、$HU^*=U^*H$ なので
$$
U^*HA_SU=H(U^*A_SU)=HA_H,\qquad
U^*A_SHU=(U^*A_SU)H=A_HH.
$$
これを前式へ代入して主張を得ます。$\square$
<!-- proof-end -->

無限次元の非有界 $A$ にも同じ記号を使う場合は、$U(t)\psi$ が必要な積の定義域に入り続けること、微分が適切な意味で存在することを先に確認しなければなりません。[QM8](../QM8/index.md#def-qm8-ccr-common-domain) の共通不変領域で交換子を計算した事実だけで、全 $\mathcal H$ 上の強作用素微分を宣言することはできません。

### 3.2 二準位模型で描像を検算する

有限次元なので非有界作用素の問題をいったん外し、
$$
H=\begin{pmatrix}E_1&0\\0&E_2\end{pmatrix},\quad
A=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
E_1,E_2\in\mathbb R
$$
とします。$U(t)=\operatorname{diag}(e^{-iE_1t/\hbar},e^{-iE_2t/\hbar})$ を実際に掛けると
$$
A_H(t)=
\begin{pmatrix}
0&e^{i(E_1-E_2)t/\hbar}\\
e^{-i(E_1-E_2)t/\hbar}&0
\end{pmatrix}.
$$
$(A_H)_{12}$ を微分すると $i(E_1-E_2)e^{i(E_1-E_2)t/\hbar}/\hbar$ です。他方 $[H,A_H]_{12}=(E_1-E_2)(A_H)_{12}$ なので、前節の式と一致します。これは Schrödinger 方程式と Heisenberg 方程式の間の数学的な整合性を手計算できる最小模型です。

## 4. 交換子と Poisson 括弧の似ているところ、違うところ

古典 Hamiltonian が $p^2/(2m)+m\omega^2q^2/2$ なら、[AMECH6 の式](../AMECH6/index.md#thm-amech6-time-evolution) から
$$
\dot q=\{q,H_{\mathrm{cl}}\}=\frac p m,\qquad
\dot p=\{p,H_{\mathrm{cl}}\}=-m\omega^2q
$$
を得ます。量子側では共通領域上の計算として
$$
[H,Q]=-\frac{i\hbar}{m}P,\qquad
[H,P]=i\hbar m\omega^2Q
$$
です。1つ目は $[P^2,Q]=P[P,Q]+[P,Q]P=-2i\hbar P$、2つ目は $[Q^2,P]=Q[Q,P]+[Q,P]Q=2i\hbar Q$ から得られます。

これらを Heisenberg の式へ形式的に代入すると
$$
\dot Q_H=\frac{P_H}{m},\qquad
\dot P_H=-m\omega^2Q_H
$$
となり、古典系と同じ形です。ただしこの段階では **Schwartz 空間上の代数的対応**を確認しただけです。時間発展による領域の不変性や自己共役 Hamiltonian の構成は MQ3 で扱います。

交換子と Poisson 括弧は「基本変数の計算を結び付ける」という意味で対応しますが、古典的関数と量子作用素の一般的な積に矛盾のない単純な置換規則があるわけではありません。順序の曖昧さがその最初の警告です。

## 5. $\hbar$ と単位を消すのは、物理を消すことではない

量子化された調和振動子の形式式
$$
H=\frac{P^2}{2m}+\frac{m\omega^2Q^2}{2}
$$
について、$m,\omega,\hbar>0$ とします。長さ・運動量・時間の基準量を
$$
\ell=\sqrt{\frac{\hbar}{m\omega}},\quad
p_0=\sqrt{m\hbar\omega},\quad
t_0=\omega^{-1}
$$
と置き、$x=\ell\xi$、$P=p_0\Pi$、$\tau=t/t_0$ とします。連鎖律で $d/dx=\ell^{-1}d/d\xi$ だから
$$
\Pi=\frac{P}{p_0}
=-i\frac{\hbar}{\ell p_0}\frac{d}{d\xi}
=-i\frac{d}{d\xi},\qquad \ell p_0=\hbar.
$$
同じ変数変換によって
$$
\frac{H}{\hbar\omega}
=\frac12\left(-\frac{d^2}{d\xi^2}+\xi^2\right),\qquad
[\xi,\Pi]=i
$$
となります。規格化も保つため、波動関数は $\phi(\xi)=\sqrt\ell\,\psi(\ell\xi)$ と変換します。実際
$$
\int_{\mathbb R}|\phi(\xi)|^2d\xi
=\int_{\mathbb R}\ell|\psi(\ell\xi)|^2d\xi
=\int_{\mathbb R}|\psi(x)|^2dx
$$
です。

この無次元化は $\hbar=1$ という物理的主張ではありません。エネルギーを $\hbar\omega$、長さを $\ell$ で測り直しただけです。元の単位へ戻すときは $E=(\hbar\omega)\varepsilon$ のように尺度を掛けます。

## 6. この先の三つの模型

本系列で使う Hamiltonian の候補を並べておきます。**ここでは式の由来と Hilbert 空間だけを固定し、自己共役性・スペクトルを先取りしません。**

| 模型 | 古典的入力 | 量子作用素の候補と空間 | 次の作業 |
|---|---|---|---|
| 自由粒子 | $p^2/(2m)$ | $P^2/(2m)$、$L^2(\mathbb R)$ | MQ1: 定義域・Fourier 変換・連続スペクトル |
| 調和振動子 | $p^2/(2m)+m\omega^2q^2/2$ | $P^2/(2m)+m\omega^2Q^2/2$、$L^2(\mathbb R)$ | MQ3: 自己共役性・梯子作用素・全スペクトル |
| Coulomb 系 | 換算質量 $\mu$ と $-Ze^2/(4\pi\varepsilon_0r)$ | $-\hbar^2\Delta/(2\mu)-Ze^2/(4\pi\varepsilon_0|x|)$、$L^2(\mathbb R^3)$ | MQ4: 原点・角運動量・束縛状態 |

最後の模型は [MECH7 の換算質量](../MECH7/index.md) と [EMAG3 の Coulomb ポテンシャルエネルギー](../EMAG3/index.md#prop-emag3-coulomb-energy) を統合したものです。$r=|x|=0$ ではポテンシャルが発散するため、作用素の定義域を無視できません。

これまでに確かめたのは **物理モデルを作用素へ翻訳するとき、何を選び、何を証明し直さなければならないか** です。次の MQ1 では、自由 Hamiltonian という最も簡単な候補でさえ、微分式から自己共役作用素へ至るために厳密な分析が必要なことを学びます。

---

## 演習

### Level A

### A1. Poisson 括弧と正準交換関係

$\{f,g\}=\partial_qf\,\partial_pg-\partial_pf\,\partial_qg$、$Q\psi=x\psi$、$P\psi=-i\hbar\psi'$ とする。$\{q,p\}$ および $\mathcal S(\mathbb R)$ 上の $[Q,P]\psi$ をそれぞれ計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\partial_qq=1,\partial_pq=0,\partial_qp=0,\partial_pp=1$ なので
$$
\{q,p\}=1\cdot1-0\cdot0=1.
$$
$\psi\in\mathcal S$ について $QP\psi=-i\hbar x\psi'$、$PQ\psi=-i\hbar(\psi+x\psi')$ です。従って
$$
[Q,P]\psi=-i\hbar x\psi'+i\hbar\psi+i\hbar x\psi'=i\hbar\psi.
$$
共通領域で二つの合成が定義できることを確認したうえで得た等式です。
<!-- solution-end -->

### A2. 自由 Hamiltonian の符号

$H_{\mathrm{cl}}(q,p)=p^2/(2m)$ を $P=-i\hbar\,d/dx$ へ移し、$\psi(x)=e^{-x^2}$ に作用させた式を求めよ（$\psi$ は規格化しなくてよい）。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\psi'=-2xe^{-x^2}$、$\psi''=(4x^2-2)e^{-x^2}$ なので
$$
H_0\psi=-\frac{\hbar^2}{2m}\psi''
=\frac{\hbar^2}{m}(1-2x^2)e^{-x^2}.
$$
$(-i)^2=-1$ が微分作用素の前の負符号を与えます。この計算は Schwartz 関数上で正当ですが、$H_0$ の自己共役性の証明ではありません。
<!-- solution-end -->

### A3. 対称順序の直接計算

$\psi\in\mathcal S(\mathbb R)$ とする。$QP\psi$、$PQ\psi$ および $(QP+PQ)\psi/2$ を求め、$QP$ だけの式との差を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

積の微分法から $(x\psi)'=\psi+x\psi'$ なので
$$
QP\psi=-i\hbar x\psi',\qquad
PQ\psi=-i\hbar(\psi+x\psi').
$$
平均を取ると
$$
\tfrac12(QP+PQ)\psi
=-i\hbar(x\psi'+\tfrac12\psi).
$$
$QP\psi$ との差は $-i\hbar\psi/2$ です。交換子 $[Q,P]=i\hbar I$ とも整合します。
<!-- solution-end -->

### A4. 無次元化と波動関数の規格化

$\ell=\sqrt{\hbar/(m\omega)}$、$p_0=\sqrt{m\hbar\omega}$ とする。$\ell p_0=\hbar$ を示し、$\phi(\xi)=\sqrt\ell\,\psi(\ell\xi)$ の $L^2$ ノルムが $\psi$ と等しいことを証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$m,\omega,\hbar>0$ なので
$$
\ell p_0=\sqrt{\frac{\hbar}{m\omega}}\sqrt{m\hbar\omega}
=\sqrt{\hbar^2}=\hbar.
$$
$x=\ell\xi$ と置けば $dx=\ell\,d\xi$ であり、
$$
\|\phi\|_2^2=\int_{\mathbb R}\ell|\psi(\ell\xi)|^2d\xi
=\int_{\mathbb R}|\psi(x)|^2dx=\|\psi\|_2^2.
$$
$\sqrt\ell$ を省くと積分測度の変更を相殺できません。
<!-- solution-end -->

### Level B

### B1. $q^2p$ の順序を比較する

$\psi\in\mathcal S(\mathbb R)$ とする。$Q^2P\psi$ と $(Q^2P+PQ^2)\psi/2$ を求め、その差を示せ。後者が前者と異なる理由を $[Q,P]$ からも説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず $Q^2P\psi=-i\hbar x^2\psi'$ です。他方
$$
PQ^2\psi=-i\hbar(x^2\psi)'
=-i\hbar(2x\psi+x^2\psi')
$$
なので
$$
\tfrac12(Q^2P+PQ^2)\psi
=-i\hbar(x^2\psi'+x\psi).
$$
差は $-i\hbar x\psi=-i\hbar Q\psi$ です。また交換子の積公式
$$
[P,Q^2]=[P,Q]Q+Q[P,Q]=-2i\hbar Q
$$
から
$$
\tfrac12(Q^2P+PQ^2)-Q^2P=\tfrac12[P,Q^2]=-i\hbar Q
$$
とも得られます。同じ古典多項式でも、作用素積の順序が実際の演算を変えます。
<!-- solution-end -->

### B2. 測定確率の描像不変性

$\mathcal H=\mathbb C^2$、$H=\operatorname{diag}(E_1,E_2)$、$A=\operatorname{diag}(a_1,a_2)$ とし、$\psi_0=(\alpha,\beta)^T$、$|\alpha|^2+|\beta|^2=1$ とする。$\psi_S(t),A_H(t)$ を求め、$A$ が $a_1$ と $a_2$ を異なる値として持つ場合のそれぞれの確率が両描像で一致することを直接示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$U(t)=\operatorname{diag}(e^{-iE_1t/\hbar},e^{-iE_2t/\hbar})$ だから
$$
\psi_S(t)=\begin{pmatrix}\alpha e^{-iE_1t/\hbar}\\\beta e^{-iE_2t/\hbar}\end{pmatrix}.
$$
$A$ は $H$ と可換なので $A_H(t)=U^*AU=A$ です。$a_1\ne a_2$ のとき、それぞれのスペクトル射影は $E_A(\{a_1\})=\operatorname{diag}(1,0)$、$E_A(\{a_2\})=\operatorname{diag}(0,1)$ です。Schrödinger 描像では
$$
\langle\psi_S,E_A(\{a_1\})\psi_S\rangle
=|\alpha e^{-iE_1t/\hbar}|^2=|\alpha|^2
$$
です。Heisenberg 描像では $E_{A_H}(\{a_1\})=E_A(\{a_1\})$ だから同じ $|\alpha|^2$ です。$a_2$ についてもそれぞれ $|\beta|^2$ となります。
<!-- solution-end -->

### B3. 二準位模型と Heisenberg 方程式

$H=\operatorname{diag}(E_1,E_2)$ と $A=\begin{pmatrix}0&1\\1&0\end{pmatrix}$（$E_1,E_2\in\mathbb R$）について $A_H(t)$ を求め、$dA_H/dt=(i/\hbar)[H,A_H]$ を行列成分で検証せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$U^*=\operatorname{diag}(e^{iE_1t/\hbar},e^{iE_2t/\hbar})$ なので
$$
A_H=U^*AU=
\begin{pmatrix}0&e^{i(E_1-E_2)t/\hbar}\\
e^{i(E_2-E_1)t/\hbar}&0\end{pmatrix}.
$$
$\delta=E_1-E_2$ と置けば
$$
\frac{dA_H}{dt}=
\begin{pmatrix}0&i\delta e^{i\delta t/\hbar}/\hbar\\
-i\delta e^{-i\delta t/\hbar}/\hbar&0\end{pmatrix}.
$$
一方、対角行列との交換子は $[H,A_H]_{jk}=(E_j-E_k)(A_H)_{jk}$ だから
$$
\frac{i}{\hbar}[H,A_H]=
\begin{pmatrix}0&i\delta e^{i\delta t/\hbar}/\hbar\\
-i\delta e^{-i\delta t/\hbar}/\hbar&0\end{pmatrix}.
$$
両者が全成分で一致します。$E_1=E_2$ の場合は $\delta=0$ で、どちらも零行列です。
<!-- solution-end -->

### B4. 調和振動子の形式交換子

$H=P^2/(2m)+m\omega^2Q^2/2$ を共通不変領域 $\mathcal S(\mathbb R)$ 上の微分式とみなす。$[H,Q]$ と $[H,P]$ を積の交換子公式から導け。これだけで $Q_H(t)$ が全 $L^2$ 上で強微分可能と結論してよいかも述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$[P,Q]=-i\hbar I$ と $[Q,P]=i\hbar I$ より
$$
[P^2,Q]=P[P,Q]+[P,Q]P=-2i\hbar P,\qquad
[Q^2,P]=Q[Q,P]+[Q,P]Q=2i\hbar Q.
$$
従って
$$
[H,Q]=-\frac{i\hbar}{m}P,\qquad
[H,P]=i\hbar m\omega^2Q.
$$
後者で $[P^2,P]=0$、前者で $[Q^2,Q]=0$ を使いました。これらは $\mathcal S$ 上の等式です。非有界 $Q,P$ の定義域、$U(t)$ によるその保存、強微分の可否はまだ確認していません。したがって「全 $L^2$ 上で微分できる」とは結論できません。
<!-- solution-end -->

### Level C

### C1. 量子化の選択から描像不変性まで

$m,\omega,\hbar>0$ とし、古典 Hamiltonian $H_{\mathrm{cl}}=p^2/(2m)+m\omega^2q^2/2$ を考える。

1. 古典 Hamilton 方程式を Poisson 括弧から導け。
2. Schrödinger 表現で量子 Hamiltonian の候補を $\mathcal S(\mathbb R)$ 上に書き、その自己共役性がまだ確定していない理由を説明せよ。
3. $\ell=\sqrt{\hbar/(m\omega)}$、$\xi=x/\ell$ として波動関数を $\phi(\xi)=\sqrt\ell\,\psi(\ell\xi)$ へ移すと、候補が $\hbar\omega(-d^2/d\xi^2+\xi^2)/2$ の形になることを導け。
4. 別途、$\mathcal H$ 上に自己共役な実現 $H$ を得たとする。自己共役観測量 $A$ と任意の Borel 集合 $B$ に対し、$U(t)=e^{-itH/\hbar}$ を用いて Schrödinger 描像と Heisenberg 描像の測定確率が一致することを示せ。期待値については必要な定義域条件も述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) $H_{\mathrm{cl}}$ を微分すると
$$
\partial_pH_{\mathrm{cl}}=p/m,\qquad
\partial_qH_{\mathrm{cl}}=m\omega^2q.
$$
$\partial_qq=1,\partial_pq=0$、$\partial_pp=1,\partial_qp=0$ を Poisson 括弧へ代入すれば
$$
\dot q=\{q,H_{\mathrm{cl}}\}=p/m,\qquad
\dot p=\{p,H_{\mathrm{cl}}\}=-m\omega^2q.
$$

(2) $Q\psi=x\psi$、$P\psi=-i\hbar\psi'$ を繰り返し使い、
$$
(H_{\mathrm{form}}\psi)(x)
=-\frac{\hbar^2}{2m}\psi''(x)+\frac{m\omega^2x^2}{2}\psi(x)
$$
です。$\mathcal S(\mathbb R)$ は両項を保つので形式式をそこで計算できますが、無限次元の非有界対称作用素が自動的に自己共役になるわけではありません。閉包の定義域と随伴の定義域の一致などを別途確認する必要があります。

(3) $x=\ell\xi$、$\psi(x)=\ell^{-1/2}\phi(\xi)$ から
$$
\psi''(x)=\ell^{-5/2}\phi''(\xi)
$$
です。両辺に $\sqrt\ell$ を掛けて $\xi$ 側で表示すると
$$
\sqrt\ell(H_{\mathrm{form}}\psi)(\ell\xi)
=-\frac{\hbar^2}{2m\ell^2}\phi''(\xi)
+\frac{m\omega^2\ell^2}{2}\xi^2\phi(\xi).
$$
$\ell^2=\hbar/(m\omega)$ を各係数へ代入すると $\hbar^2/(m\ell^2)=\hbar\omega$、$m\omega^2\ell^2=\hbar\omega$ なので
$$
\sqrt\ell(H_{\mathrm{form}}\psi)(\ell\xi)
=\frac{\hbar\omega}{2}(-\phi''(\xi)+\xi^2\phi(\xi)).
$$

(4) $U(t)$ は $H$ の自己共役性からユニタリであり、$A_H(t)=U(t)^*AU(t)$ は $U(t)^*D(A)$ 上の自己共役作用素です。スペクトル測度の共役関係
$$
E_{A_H(t)}(B)=U(t)^*E_A(B)U(t)
$$
を用います。$\psi_S(t)=U(t)\psi_0$ とおけば
$$
\begin{aligned}
\langle\psi_0,E_{A_H(t)}(B)\psi_0\rangle
&=\langle\psi_0,U(t)^*E_A(B)U(t)\psi_0\rangle\\
&=\langle U(t)\psi_0,E_A(B)U(t)\psi_0\rangle\\
&=\langle\psi_S(t),E_A(B)\psi_S(t)\rangle.
\end{aligned}
$$
これは $E_A(B)$ が有界な射影であるため、すべての単位ベクトル $\psi_0$ に成立します。非有界 $A$ について期待値を作用素内積で書くには $U(t)\psi_0\in D(A)$ が必要で、そのときだけ $\psi_0\in D(A_H(t))$ として同様に $\langle\psi_S(t),A\psi_S(t)\rangle=\langle\psi_0,A_H(t)\psi_0\rangle$ を得ます。
<!-- solution-end -->
