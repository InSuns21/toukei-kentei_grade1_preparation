# QINF26 Knill–Laflamme条件

## 1. 個別の符号から、すべての誤りを判定する条件へ

[QINF25の3量子ビット反復符号](../QINF25/index.md#def-qinf25-bit-code)では、$I,X_1,X_2,X_3$ が符号空間を互いに直交する空間へ送るため、パリティを測って戻せました。しかし二つの物理誤りが、符号語に対して一つの論理作用を与えることもあります。そのとき二つを測定で区別する必要はありません。逆に、誤りが符号空間の内部で未知の論理操作を行うなら、測定だけでは元へ戻せません。

目標は、有限次元の[量子チャネルとKraus作用素](../QINF7/index.md#def-qinf7-kraus)に対し、**どの符号と雑音の組が、すべての論理状態で完全に回復可能か**を、誤り作用素の積だけで判定することです。参照系ともつれた入力も保存できる、入力状態に依存しない一つの回復チャネルを構成します。

以下、$L$ を次元 $d\ge1$ の論理Hilbert空間、$A$ を有限次元の物理Hilbert空間、$V:L\to A$ を等長写像（$V^\dagger V=I_L$）とします。$\mathcal C=VL$ は符号空間、$P=VV^\dagger$ はその直交射影です。物理系上の雑音を

$$
\mathcal N(\sigma)=\sum_{i=1}^m E_i\sigma E_i^\dagger,
\qquad \sum_{i=1}^m E_i^\dagger E_i=I_A
$$

とします。最後の式は[Krausのトレース保存条件](../QINF7/index.md#thm-qinf7-kraus-cptp)です。$E_i:A\to A$ はそれぞれ「あり得る誤りの枝」を表しますが、個々の枝は一般にユニタリでもトレース保存でもありません。論理状態 $\rho$ は $V\rho V^\dagger$ として送ります。以下、$\mathcal B(A)$ は $A$ 上の線形作用素全体を表し、[QINF7で使った $L(A)$](../QINF7/index.md#def-qinf7-channel) と同じものです（有限次元ではすべての線形作用素が有界です）。

## 2. 完全回復とは、論理基底だけでなく重ね合わせを戻すこと

回復の出力は物理空間 $A$ に戻すものとし、雑音に依存して選んだ一つのCPTP写像 $\mathcal R$ が、論理入力 $\rho$ の選び方によらず働くことを要求します。

<a id="def-qinf26-exact-correction"></a>

<!-- formal-statement-start -->
> **定義（量子符号の完全誤り訂正）**
> 有限次元Hilbert空間 $L,A$、等長符号化 $V:L\to A$、射影 $P=VV^\dagger$、CPTP雑音 $\mathcal N:\mathcal B(A)\to\mathcal B(A)$ が与えられたとする。あるCPTP回復 $\mathcal R:\mathcal B(A)\to\mathcal B(A)$ が存在し、すべての論理密度演算子 $\rho$ について

$$
(\mathcal R\circ\mathcal N)(V\rho V^\dagger)=V\rho V^\dagger
$$

> を満たすとき、符号 $\mathcal C=VL$ は $\mathcal N$ を完全訂正できるという。
<!-- formal-statement-end -->

一つの符号語だけが戻ることでは不十分です。例えば $\dim L\ge2$ の場合、[QINF25の論理基底](../QINF25/index.md#def-qinf25-bit-code)のような直交符号語 $|0_L\rangle,|1_L\rangle$ を区別する測定をすると、両基底は変わりませんが $(|0_L\rangle+|1_L\rangle)/\sqrt2$ の位相情報は失われます。

<!-- definition-example-start: def-qinf26-exact-correction -->
**定義の確認**。[QINF25の完全回復](../QINF25/index.md#thm-qinf25-single-correction)を、$0\le p\le1$ のビット反転チャネルに適用します。

$$
\mathcal N(\sigma)=(1-p)\sigma+pX_1\sigma X_1,
\qquad
\mathcal R\mathcal N(V\rho V^\dagger)=V\rho V^\dagger.
$$

同一のパリティ回復で、どの $\rho$ も元へ戻ります。符号化された $|+\rangle$ でも $X_1$ 枝のsyndromeだけが変わり、振幅の位相は保たれます。一方、符号空間上の $Z_1$ を無視する回復は $|+_L\rangle$ を $|-_L\rangle$ のままにするため、この定義を満たしません。
<!-- definition-example-end -->

## 3. 射影で挟んだ誤りの積が、論理状態を区別してはならない

誤り $E_i$ のあとに誤り $E_j$ との内積をとると、符号語 $|\psi\rangle,|\phi\rangle\in\mathcal C$ について

$$
\langle E_i\psi,E_j\phi\rangle
=\langle\psi,E_i^\dagger E_j\phi\rangle.
$$

右辺が常に $c_{ij}\langle\psi,\phi\rangle$ なら、**誤り枝の相互の重なりが論理状態に依存しない**ことになります。これが判定条件です。$c_{ij}$ は誤りの枝を添字とする数で、論理状態を添字とする数ではありません。

<a id="def-qinf26-kl-matrix"></a>

<!-- formal-statement-start -->
> **定義（Knill–Laflamme行列）**
> $P\ne0$ を有限次元物理空間 $A$ の直交射影、$E_1,\ldots,E_m\in\mathcal B(A)$ を作用素とする。複素数 $c_{ij}$ が存在してすべての $1\le i,j\le m$ で

$$
PE_i^\dagger E_jP=c_{ij}P
$$

> が成立するとき、$C=(c_{ij})_{i,j=1}^m$ をこの符号と誤り族のKnill–Laflamme行列と呼ぶ。
<!-- formal-statement-end -->

この式は、単に $PE_i^\dagger E_jP$ が定義できるという条件ではありません。左辺を符号空間へ制限すると、**恒等作用素の複素数倍**でなければいけません。正規直交論理基底 $|a_L\rangle$ を使うなら、直接判定する行列成分は

$$
\langle a_L|E_i^\dagger E_j|b_L\rangle=c_{ij}\delta_{ab}.
$$

これは $P=\sum_a|a_L\rangle\langle a_L|$ を左右に代入して得られ、逆に全 $a,b$ の成分がこの式を満たせば作用素の等式も従います。特に非対角の論理成分 $a\ne b$ は0、対角成分は $a$ に依存しません。

ここでの $E_i$ は一般の誤り作用素であり、まだCPTPチャネルの正規化されたKraus作用素とは限りません。まず射影で挟んだ積を各論理基底で判定し、正規化が必要な場面では別に確認します。

<!-- definition-example-start: def-qinf26-kl-matrix -->
**定義の確認**。$\mathcal C=\operatorname{span}\{|000\rangle,|111\rangle\}$ と $P$ を[前講の符号](../QINF25/index.md#def-qinf25-bit-code)から取り、$E_0=I,E_1=X_1$ とします。$\langle000|X_1|000\rangle=\langle111|X_1|111\rangle=0$、$\langle000|X_1|111\rangle=\langle111|X_1|000\rangle=0$ なので $PX_1P=0$ です。さらに $PI^\dagger IP=P$、$PX_1^\dagger X_1P=P$ です。したがって $C=I_2$ となり、元の符号の二つの論理基底とその重ね合わせを同じ条件で扱えます。
<!-- definition-example-end -->

<a id="prop-qinf26-gram"></a>

<!-- formal-statement-start -->
> **命題（行列の正値性と雑音の正規化）**
> 上の $P\ne0,E_1,\ldots,E_m$ がKnill–Laflamme条件を満たせば、$C=(c_{ij})$ はHermitianかつ半正定値である。さらに $\sum_iE_i^\dagger E_i=I_A$ なら $\operatorname{Tr}C=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$C$ は、固定した任意の単位符号語 $|\psi\rangle$ に対する $E_i|\psi\rangle$ のGram行列です。二乗ノルムで正値性を、Krausの完全性でトレースを調べます。

<!-- proof-start -->
### 証明

$|\psi\rangle\in\mathcal C$ を単位ベクトルとすると $P|\psi\rangle=|\psi\rangle$ です。よって $c_{ij}=\langle\psi|E_i^\dagger E_j|\psi\rangle$。共役を取れば $c_{ji}=\overline{c_{ij}}$。任意の $z=(z_i)\in\mathbb C^m$ について

$$
z^\dagger Cz
=\sum_{i,j}\overline{z_i}c_{ij}z_j
=\left\|\sum_j z_jE_j|\psi\rangle\right\|^2\ge0.
$$

さらに完全性を仮定すると

$$
\sum_i c_{ii}
=\sum_i\langle\psi|E_i^\dagger E_i|\psi\rangle
=\langle\psi|I_A|\psi\rangle=1.
$$
<!-- proof-end -->

## 4. Knill–Laflamme条件は必要かつ十分

以下の定理は「この回復ならうまくいく」という個別構成を超え、**どんなCPTP回復を探しても不可能か**まで判定します。雑音を与えるKraus表示は固定してよく、どのKraus表示を選んでも判定結果は同じです。

<a id="thm-qinf26-kl"></a>

<!-- formal-statement-start -->
> **定理（Knill–Laflammeの必要十分条件）**
> $L,A$ を有限次元Hilbert空間、$V:L\to A$ を等長符号化、$P=VV^\dagger\ne0$ とする。$\mathcal N(\sigma)=\sum_{i=1}^mE_i\sigma E_i^\dagger$ を $A$ 上のCPTPチャネル（$\sum_iE_i^\dagger E_i=I_A$）とする。このとき、$\mathcal C=VL$ が[完全訂正可能](#def-qinf26-exact-correction)であることと、ある複素数 $c_{ij}$ が存在し

$$
PE_i^\dagger E_jP=c_{ij}P\qquad(1\le i,j\le m)
$$

> を満たすことは同値である。この条件が成り立つとき、$C=(c_{ij})$ を対角化して得る互いに直交した誤り部分空間を測定し、各部分空間で等長作用を逆にするCPTP回復を構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

- **必要性**：回復後の純粋状態が必ず元の純粋状態であるなら、回復と誤りを合わせた各Kraus枝は符号空間上で単なるスカラーになる。回復のトレース保存条件を使って $E_i^\dagger E_j$ の積を戻す。
- **十分性**：$C$ をユニタリ対角化してKraus作用素を混ぜ直す。重ならない誤り部分空間を射影測定し、そこでの等長作用の逆写像を適用する。測定で区別できない成分は符号空間上で同じ作用なので問題ありません。

<!-- proof-start -->
### 証明

**必要性。** 完全回復 $\mathcal R$ が存在するとし、[有限次元Kraus表示](../QINF7/index.md#thm-qinf7-kraus-existence)により $\mathcal R(\tau)=\sum_\mu R_\mu\tau R_\mu^\dagger$、$\sum_\mu R_\mu^\dagger R_\mu=I_A$ と置きます。任意の単位符号語 $|\psi\rangle\in\mathcal C$ について

$$
|\psi\rangle\langle\psi|
=\sum_{\mu,i} R_\mu E_i|\psi\rangle\langle\psi|E_i^\dagger R_\mu^\dagger.
$$

左辺の像は1次元です。右辺は正の階数1作用素の和なので、$|\psi\rangle$ に直交する任意の $|\eta\rangle$ による期待値は $\sum_{\mu,i}|\langle\eta|R_\mu E_i|\psi\rangle|^2=0$。したがって各枝に $R_\mu E_i|\psi\rangle=\alpha_{\mu i}(\psi)|\psi\rangle$ が成立します。

係数が $|\psi\rangle$ に依存しないことも示します。$\dim\mathcal C\ge2$ なら独立な $|u\rangle,|v\rangle$ とその和に線形写像 $R_\mu E_i$ を適用すると

$$
\alpha(u)|u\rangle+\alpha(v)|v\rangle
=\alpha(u+v)(|u\rangle+|v\rangle)
$$

なので両係数は等しくなります（和を正規化しても同じです）。基底のすべての組で繰り返せば $R_\mu E_iP=\alpha_{\mu i}P$ です。$\dim\mathcal C=1$ の場合も一つの基底ベクトルから同じ式を得ます。回復の完全性を $P$ ではさむと

$$
\begin{aligned}
PE_i^\dagger E_jP
&=PE_i^\dagger\Bigl(\sum_\mu R_\mu^\dagger R_\mu\Bigr)E_jP\\
&=\sum_\mu\overline{\alpha_{\mu i}}\alpha_{\mu j}P.
\end{aligned}
$$

これが条件で、$c_{ij}=\sum_\mu\overline{\alpha_{\mu i}}\alpha_{\mu j}$ と取れます。

**十分性。** 条件が成立すると仮定します。[正値性](#prop-qinf26-gram)から $C$ は非負固有値 $\lambda_a$ をもつHermitian行列です。Kraus添字空間のユニタリ変換で $E_i$ を線形結合した $F_a$ に取り替えると、同じ $\mathcal N$ を表したまま

$$
PF_a^\dagger F_bP=\lambda_a\delta_{ab}P,
\qquad \lambda_a\ge0,\qquad \sum_a\lambda_a=1
$$

となります。ここで $a,b$ は論理基底ではなく、変換後の誤り枝の添字です。

具体的に、ユニタリ行列 $U=(U_{ai})$ を使い $F_a=\sum_iU_{ai}E_i$ と置くと、

$$
\begin{aligned}
\sum_aF_a\sigma F_a^\dagger
&=\sum_{i,j}\left(\sum_aU_{ai}\overline{U_{aj}}\right)E_i\sigma E_j^\dagger\\
&=\sum_iE_i\sigma E_i^\dagger
\end{aligned}
$$

であり、元の雑音と同じです。一方、射影で挟んだ積の係数行列は

$$
C'_{ab}=\sum_{i,j}\overline{U_{ai}}c_{ij}U_{bj}
=(\overline U C U^{\mathsf T})_{ab}
$$

となります。$C$ はHermitianなので正規行列でもあり、[複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)から、ユニタリ行列 $S$ で

$$
\begin{aligned}
C &= S\operatorname{diag}(\lambda_1,\ldots,\lambda_m)S^\dagger,\\
U &= S^{\mathsf T},\\
C' &= \overline U C U^{\mathsf T}
= S^\dagger C S
= \operatorname{diag}(\lambda_1,\ldots,\lambda_m).
\end{aligned}
$$

と取れます。これでKraus添字の変換と対角化が一致します。

$\lambda_a>0$ の添字に対し $W_a=\lambda_a^{-1/2}F_aP$ と置きます。すると

$$
W_a^\dagger W_b
=\frac{PF_a^\dagger F_bP}{\sqrt{\lambda_a\lambda_b}}
=\delta_{ab}P.
$$

すなわち $W_a$ は $\mathcal C$ から等長で、異なる $a$ の像は直交します。$\Pi_a=W_aW_a^\dagger$ はその像への直交射影で、$Q=I_A-\sum_{a:\lambda_a>0}\Pi_a$ も射影です。$\lambda_a=0$ の枝は $\|F_a|\psi\rangle\|^2=\lambda_a\|\psi\|^2=0$ なので符号語に作用しません。

固定した単位符号語 $|\phi_0\rangle\in\mathcal C$ を一つ選び、補空間 $QA$ の正規直交基底を $|q_t\rangle$ とします。次のKraus作用素を用いて回復を定めます。

$$
K_a=W_a^\dagger\Pi_a=W_a^\dagger,
\qquad K_t^{\perp}=|\phi_0\rangle\langle q_t|.
$$

それらは $\sum_aK_a^\dagger K_a=\sum_a\Pi_a$、$\sum_t(K_t^\perp)^\dagger K_t^\perp=Q$ を満たすため、[KrausのCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)から全物理空間で定義されたCPTP回復 $\mathcal R$ になります。符号空間に支持された任意の密度演算子 $\sigma=P\sigma P$ に対して $F_a\sigma F_a^\dagger=\lambda_aW_a\sigma W_a^\dagger$ であり、$\Pi_a W_b=\delta_{ab}W_b$ です。よって

$$
\begin{aligned}
\mathcal R\mathcal N(\sigma)
&=\sum_{a:\lambda_a>0}\lambda_a
 W_a^\dagger W_a\sigma W_a^\dagger W_a\\
&=\Bigl(\sum_a\lambda_a\Bigr)P\sigma P
=\sigma.
\end{aligned}
$$

補空間の枝は雑音後の符号入力では確率0なので加わりません。これで十分性も示せました。
<!-- proof-end -->

この回復では、対角化後の枝 $a$ の発生確率が $\operatorname{Tr}(F_a\sigma F_a^\dagger)=\lambda_a$ です。確率は論理状態 $\sigma$ に依存しないので、syndrome測定で論理情報を読み取らずに済みます。補空間 $Q$ の追加は、**符号上だけで動く回復を、全入力に対するトレース保存チャネルへ延長するため**に必要です。

## 5. 縮退する誤りと、訂正不能な論理誤り

「誤り $E_i$ が違えば必ず別のsyndrome」というのは十分条件の一例にすぎません。異なる作用素が符号語に**同じ作用**をする場合、両者を区別できなくても回復できます。これを符号の縮退（degeneracy）と呼びます。

<a id="def-qinf26-degeneracy"></a>

<!-- formal-statement-start -->
> **定義（誤りの縮退）**
> 射影 $P\ne0$ と誤り族 $\{E_i\}$ がKnill–Laflamme条件を満たすとする。行列 $C=(c_{ij})$ に0固有値があり、0でない係数列 $(z_i)$ に対する誤りの線形結合 $F$ が符号上で消えるとき、この誤り表示を符号上で縮退しているという。すなわち条件は

$$
F=\sum_i z_iE_i,\qquad FP=0,\qquad(z_i)\ne0
$$

> である。異なる誤り表示が符号語上で独立した作用を生まないことを意味する。
<!-- formal-statement-end -->

上の正値行列について $z^\dagger Cz=\|FP|\psi\rangle\|^2$（単位符号語 $|\psi\rangle$）なので、$C$ の0固有値と $FP=0$ は対応します。Kraus表示へ0作用素を冗長に追加するだけでも0固有値が増えるため、**物理的な縮退を議論するときは具体的な誤り集合と符号上の作用を併せて確認**します。

以下、$\operatorname{spec}(C)$ は行列 $C$ の固有値を重複を除いて集めた集合を表します。固有値の重複度は必要に応じて別に示します。

<!-- definition-example-start: def-qinf26-degeneracy -->
**定義の確認**。反復符号 $\mathcal C=\operatorname{span}\{|000\rangle,|111\rangle\}$ では $Z_1Z_2|000\rangle=|000\rangle$、$Z_1Z_2|111\rangle=(-1)^2|111\rangle=|111\rangle$。従って $(I-Z_1Z_2)P=0$ です。異なる物理作用 $I,Z_1Z_2$ の差が符号上で0になるため、両者を分けるsyndromeは不要です。$0<p<1$ に対し $E_0=\sqrt{1-p}I,E_1=\sqrt p Z_1Z_2$ とすれば

$$
C=\begin{pmatrix}1-p&\sqrt{p(1-p)}\\\sqrt{p(1-p)}&p\end{pmatrix},
\qquad \operatorname{spec}(C)=\{1,0\}.
$$

これは正規化されたCPTP雑音で、符号入力には恒等作用をします。
<!-- definition-example-end -->

対照的に $E_0=\sqrt{1-p}I,E_1=\sqrt p Z_1$（$0<p<1$）なら、$Z_1|000\rangle=|000\rangle$、$Z_1|111\rangle=-|111\rangle$ なので

$$
P E_0^\dagger E_1P
=\sqrt{p(1-p)}\bigl(|000\rangle\langle000|-|111\rangle\langle111|\bigr)
\ne cP
$$

です。位相反転は符号内で論理 $Z$ として作用し、$|+_L\rangle$ の位相を変えます。[必要十分条件](#thm-qinf26-kl)によって、**どんな回復を選んでもこの雑音を完全には訂正できない**と結論できます。

## 6. 線形結合した誤りも同時に訂正できる

Kraus表示の選び方は一意ではありません。さらに訂正可能な誤り族があれば、その**線形包に含まれる**別の雑音も、トレース保存条件が成立する限り同じ符号上で訂正できます。

<a id="prop-qinf26-error-span"></a>

<!-- formal-statement-start -->
> **命題（訂正可能な誤りの線形包）**
> 有限次元物理空間 $A$ の射影 $P\ne0$ と作用素族 $E_1,\ldots,E_m$ がKnill–Laflamme条件を満たすとする。新しい作用素 $B_k$ を元の誤りの線形結合とし、これらがトレース保存条件を満たすとする。すなわち

$$
PE_i^\dagger E_jP=c_{ij}P,\qquad
B_k=\sum_i b_{ki}E_i,\qquad
\sum_k B_k^\dagger B_k=I_A.
$$

> このとき、CPTPチャネル $\mathcal M(\sigma)=\sum_kB_k\sigma B_k^\dagger$ は符号 $PA$ 上で完全訂正可能である。
<!-- formal-statement-end -->

### 証明の見取り図

新しい枝を挟んだ積を展開すると、元の $c_{ij}P$ の線形結合だけになります。十分性をもう一度適用します。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
PB_k^\dagger B_\ell P
&=P\Bigl(\sum_i\overline{b_{ki}}E_i^\dagger\Bigr)
\Bigl(\sum_jb_{\ell j}E_j\Bigr)P\\
&=\sum_{i,j}\overline{b_{ki}}b_{\ell j}c_{ij}P
=:d_{k\ell}P.
\end{aligned}
$$

$\sum_kB_k^\dagger B_k=I_A$ によって $\mathcal M$ はCPTPなので、[必要十分条件](#thm-qinf26-kl)の十分性を $B_k$ に適用できます。$\mathcal M$ に合わせて回復を作り直すことはできますが、元の誤り族に対して構成したsyndrome回復が共通に働く場合もあります。
<!-- proof-end -->

例えば3量子ビット符号では $\{I,X_1,X_2,X_3\}$ の線形包に各Kraus作用素がある雑音は訂正可能です。一方、$Z_1$ を追加した集合は上の反例により訂正可能とはなりません。次の講義では、Pauli作用素を系統的に整理して、この判定を大規模な符号へ拡張します。

## 7. 演習

<a id="ex-qinf26-a01"></a>

### 演習 A1：反復符号の誤り積をすべて確かめる

- Level: A
- 問題: $P=|000\rangle\langle000|+|111\rangle\langle111|$、$E_0=I$、$E_j=X_j$（$j=1,2,3$）とする。$PE_i^\dagger E_jP$ を $i=j$ と $i\ne j$ に分けて求め、Knill–Laflamme行列を求めよ。

<!-- solution-start -->
**詳細解答。** $X_j^\dagger=X_j$、$X_j^2=I$ なので、$i=j$ の四通りでは $PE_i^\dagger E_iP=P$ です。$i=0,j\ge1$ では $X_j|000\rangle$ がHamming重み1、$X_j|111\rangle$ が重み2で、どちらも $|000\rangle,|111\rangle$ と直交します。ゆえに $PX_jP=0$ です。$1\le i\ne j\le3$ では $X_iX_j$ はちょうど二箇所を反転するので、同様に $PX_iX_jP=0$。すべての組について

$$
PE_i^\dagger E_jP=\delta_{ij}P,
\qquad C=I_4.
$$

ここで $E_i$ はチャネルの正規化されたKraus作用素ではなく、誤り集合です。そのため $\operatorname{Tr}C=4$ でも[正規化命題](#prop-qinf26-gram)と矛盾しません。
<!-- solution-end -->

<a id="ex-qinf26-a02"></a>

### 演習 A2：論理位相を検出できない

- Level: A
- 問題: A1と同じ $P$ に対し $F_0=I,F_1=Z_1$ とする。$PF_0^\dagger F_1P$ を論理基底 $|000\rangle,|111\rangle$ による2×2行列で書き、両誤りを含む雑音が完全訂正できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $Z_1|000\rangle=|000\rangle$、$Z_1|111\rangle=-|111\rangle$ なので、二つの論理基底の内積を計算すると

$$
\bigl[\langle a_L|Z_1|b_L\rangle\bigr]_{a,b=0,1}
=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

これはどんな複素数 $c$ に対しても $cI_2$ とはなりません。例えば $\mathcal N(\sigma)=(1-p)\sigma+pZ_1\sigma Z_1$（$0<p<1$）のKraus作用素は $\sqrt{1-p}I,\sqrt pZ_1$ なので、交差積はこの行列の $\sqrt{p(1-p)}$ 倍です。ゆえに[必要十分条件](#thm-qinf26-kl)の必要性に反し、完全回復は存在しません。
<!-- solution-end -->

<a id="ex-qinf26-a03"></a>

### 演習 A3：縮退はなぜ害にならないか

- Level: A
- 問題: A1と同じ符号に対し $G_0=I,G_1=Z_1Z_2$ とする。$G_1P$ を求め、誤り集合 $\{G_0,G_1\}$ のKnill–Laflamme行列と固有値を求めよ。$G_0,G_1$ を誤り枝とする混合チャネルを一つ挙げよ。

<!-- solution-start -->
**詳細解答。** $Z_1Z_2|000\rangle=|000\rangle$、$Z_1Z_2|111\rangle=(-1)^2|111\rangle=|111\rangle$ です。従って $G_1P=P=G_0P$ で、四つの積はいずれも $P$ です。$C=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ であり、固有ベクトル $(1,1)/\sqrt2,(1,-1)/\sqrt2$ に対応する固有値は $2,0$ です。例えば

$$
\mathcal N(\sigma)=\tfrac12\sigma+\tfrac12(Z_1Z_2)\sigma(Z_1Z_2)
$$

は二つのKraus作用素 $G_0/\sqrt2,G_1/\sqrt2$ を持つCPTP写像です。符号空間上では両枝が $P$ として作用するため $\mathcal N(\sigma)=\sigma$（$P\sigma P=\sigma$）。元の誤り集合の0固有値は、この重複を表します。
<!-- solution-end -->

<a id="ex-qinf26-a04"></a>

### 演習 A4：Gram行列の意味

- Level: A
- 問題: 単位符号語 $|\psi\rangle$ に対し $PE_i^\dagger E_jP=c_{ij}P$ が成り立つとする。$c_{ij}=\langle E_i\psi,E_j\psi\rangle$ を確かめ、任意の $z\in\mathbb C^m$ について $z^\dagger Cz\ge0$ を導け。また $E_i$ がCPTPチャネルのKraus作用素なら $\sum_i c_{ii}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $P|\psi\rangle=|\psi\rangle$ と $\langle\psi|\psi\rangle=1$ から

$$
\langle E_i\psi,E_j\psi\rangle
=\langle\psi|PE_i^\dagger E_jP|\psi\rangle=c_{ij}.
$$

よって

$$
z^\dagger Cz
=\sum_{i,j}\overline{z_i}z_j\langle E_i\psi,E_j\psi\rangle
=\left\|\sum_jz_jE_j|\psi\rangle\right\|^2\ge0.
$$

トレース保存条件 $\sum_iE_i^\dagger E_i=I_A$ を使うと $\sum_i c_{ii}=\langle\psi|I_A|\psi\rangle=1$ です。条件がなければ和1とは限りません。
<!-- solution-end -->

<a id="ex-qinf26-b01"></a>

### 演習 B1：単一反転チャネルの回復を構成する

- Level: B
- 問題: A1の符号に対し $0<p<1$、$\mathcal N(\sigma)=(1-p)\sigma+pX_1\sigma X_1$ とする。正規化Kraus作用素を $E_0=\sqrt{1-p}I,E_1=\sqrt pX_1$ と取る。$C$ を対角化し、定理の $W_a,\Pi_a,Q$ を書け。補空間で固定符号語 $|000\rangle$ を出す回復の作用を示せ。

<!-- solution-start -->
**詳細解答。** $PX_1P=0$、$PX_1^2P=P$ なので

$$
C=\begin{pmatrix}1-p&0\\0&p\end{pmatrix},
\quad\lambda_0=1-p,\quad\lambda_1=p.
$$

既に対角化されており、$W_0=P$、$W_1=X_1P$ です。像への射影は $\Pi_0=P$、$\Pi_1=X_1PX_1$。$\Pi_0\Pi_1=0$ で $Q=I-P-X_1PX_1$ は射影になります。$Q$ の正規直交基底 $|q_t\rangle$ を選ぶと

$$
\mathcal R(\tau)=P\tau P+PX_1\tau X_1P
+\sum_t|000\rangle\langle q_t|\tau|q_t\rangle\langle000|
$$

です。Kraus作用素は $P,PX_1,|000\rangle\langle q_t|$ で、二乗和は $P+X_1PX_1+Q=I_A$。符号上の $\sigma$ に対し

$$
\mathcal R\mathcal N(\sigma)=(1-p)\sigma+pPX_1(X_1\sigma X_1)X_1P=\sigma
$$

となります。$Q$ 枝は符号から生じる雑音には作用しませんが、全空間でトレース保存するため必要です。
<!-- solution-end -->

<a id="ex-qinf26-b02"></a>

### 演習 B2：確率的な誤りと振幅の重ね合わせ

- Level: B
- 問題: A1の符号上で $U=\cos\theta I+i\sin\theta X_1$（$\theta\in\mathbb R$）が作用したとする。$U$ がユニタリであることを確かめ、QINF25のsyndrome測定・補正を作用させた出力を求めよ。確率的混合 $(\cos^2\theta)\sigma+(\sin^2\theta)X_1\sigma X_1$ と異なる点も述べよ。

<!-- solution-start -->
**詳細解答。** $X_1^\dagger=X_1,X_1^2=I$ なので

$$
U^\dagger U=(\cos\theta I-i\sin\theta X_1)(\cos\theta I+i\sin\theta X_1)
=(\cos^2\theta+\sin^2\theta)I=I.
$$

符号語 $|\psi_L\rangle$ に作用すると $\cos\theta|\psi_L\rangle+i\sin\theta X_1|\psi_L\rangle$。この二項は[パリティ射影](../QINF25/index.md#prop-qinf25-projectors)の異なる像に入るため、syndrome $(+,+)$ は確率 $\cos^2\theta$、$(-,+)$ は確率 $\sin^2\theta$ です。後者では $X_1$ を再び作用させ、条件付き状態はどちらも $|\psi_L\rangle$ に戻ります。結果を捨てると

$$
\mathcal R(U\sigma U^\dagger)=(\cos^2\theta+\sin^2\theta)\sigma=\sigma.
$$

ユニタリ雑音の中には $i\sin\theta\cos\theta(X_1\sigma-\sigma X_1)$ という**交差項**があり、確率混合にはありません。回復の射影が交差項を消すので、同じ出力になります。
<!-- solution-end -->

<a id="ex-qinf26-b03"></a>

### 演習 B3：異なる誤り枝が同じ論理作用を持つ

- Level: B
- 問題: 3量子ビット反復符号 $P$ に対し、$G_0=I,G_1=Z_1Z_2,G_2=X_1,G_3=X_1Z_1Z_2$ を考える。$G_0P=G_1P$ と $G_2P=G_3P$ を示し、$PG_i^\dagger G_jP$ の4×4係数行列およびその固有値を求めよ。互いに区別すべきsyndrome空間はいくつか。

<!-- solution-start -->
**詳細解答。** $Z_1Z_2P=P$ なので $G_0P=G_1P=P$、$G_2P=X_1P=G_3P$ です。符号空間と $X_1\mathcal C$ は互いに直交し $PX_1P=0$ なので、係数は同じ組内で1、組をまたぐと0です。したがって

$$
C=\begin{pmatrix}
1&1&0&0\\1&1&0&0\\0&0&1&1\\0&0&1&1
\end{pmatrix},\qquad
\operatorname{spec}(C)=\{2,0\}.
$$

各2×2ブロックでは $(1,1)/\sqrt2$ が固有値2、$(1,-1)/\sqrt2$ が固有値0に対応し、全体ではどちらの固有値も重複度2です。非零固有値に対応する空間は $\mathcal C$ と $X_1\mathcal C$ の**二つ**だけで十分です。元の誤り作用素が四つあることは、四つのsyndromeが必要であることを意味しません。
<!-- solution-end -->

<a id="ex-qinf26-b04"></a>

### 演習 B4：重なったKraus作用を正規直交化する

- Level: B
- 問題: A1の符号で $B_+=(I+X_1)/2$、$B_-=(I-X_1)/2$ とし、$\mathcal M(\sigma)=B_+\sigma B_++B_-\sigma B_-$ とする。(i) $\mathcal M$ がCPTPであること、(ii) Knill–Laflamme行列、(iii) $\mathcal M$ が符号上で訂正可能であることを確認せよ。

<!-- solution-start -->
**詳細解答。** $X_1^2=I=X_1^\dagger X_1$ なので、$B_\pm^\dagger=B_\pm$、$B_\pm^2=B_\pm$、$B_+B_-=0$、$B_++B_-=I$ です。よって $\sum_\pm B_\pm^\dagger B_\pm=I$ で、[Krausの条件](../QINF7/index.md#thm-qinf7-kraus-cptp)からCPTPです。

$PX_1P=0$ を代入すると

$$
PB_\pm^\dagger B_\pm P=PB_\pm P=\tfrac12P,
\qquad PB_+^\dagger B_-P=0.
$$

従って $C=\operatorname{diag}(1/2,1/2)$ です。$W_\pm=\sqrt2 B_\pm P$ とおくと $W_\pm^\dagger W_\pm=P$、$W_+^\dagger W_-=0$。二つの像への射影は $\Pi_\pm=W_\pm W_\pm^\dagger$ で、$\mathcal M(\sigma)=\sum_\pm\tfrac12W_\pm\sigma W_\pm^\dagger$（$P\sigma P=\sigma$）。[十分性の構成](#thm-qinf26-kl)で各 $W_\pm^\dagger$ を戻し補空間を補えば、出力は $(1/2+1/2)\sigma=\sigma$ になります。誤り部分空間が単純な $\mathcal C,X_1\mathcal C$ ではなく、その重ね合わせでも回復可能な例です。
<!-- solution-end -->

<a id="ex-qinf26-c01"></a>

### 演習 C1：非対角Gram行列から回復を再構成する

- Level: C
- 問題: $P=|000\rangle\langle000|+|111\rangle\langle111|$、$a=1-p-q>0$、$p>0$、$0<q<1$、$p+q<1$ とし、$E_0=\sqrt a I,E_1=\sqrt p Z_1Z_2,E_2=\sqrt q X_1$ によるCPTP雑音 $\mathcal N(\sigma)=\sum_{i=0}^2E_i\sigma E_i^\dagger$ を考える。(i) $C$ とその固有値を求めよ。(ii) 非零固有値に対応する新Kraus作用素、二つのsyndrome射影、CPTP回復を具体的に構成せよ。(iii) 任意の参照系 $R$ と符号に支持された密度演算子 $\omega_{RA}$ に対し、$\mathrm{id}_R$ を参照系上の恒等チャネルとして、$(\mathrm{id}_R\otimes\mathcal R\mathcal N)(\omega_{RA})=\omega_{RA}$ を示せ。

<!-- solution-start -->
**詳細解答。** (i) $Z_1Z_2P=P$、$PX_1P=0$、$X_1^2=(Z_1Z_2)^2=I$ です。$PE_0^\dagger E_1P=\sqrt{ap}P$、$PE_0^\dagger E_2P=0$、$PE_1^\dagger E_2P=\sqrt{pq}PZ_1Z_2X_1P=0$ で、

$$
C=\begin{pmatrix}
a&\sqrt{ap}&0\\
\sqrt{ap}&p&0\\
0&0&q
\end{pmatrix}.
$$

左上の行列の行列式は $ap-ap=0$、トレースは $a+p=1-q$ です。従って固有値は $1-q,0,q$。対応する左上の単位固有ベクトルは $(\sqrt a,\sqrt p)/\sqrt{a+p}$ と $(\sqrt p,-\sqrt a)/\sqrt{a+p}$ です。

(ii) 上の係数で $E_0,E_1$ を直交変換し、

$$
\begin{aligned}
F_+&=\frac{\sqrt a E_0+\sqrt p E_1}{\sqrt{a+p}}
=\frac{aI+pZ_1Z_2}{\sqrt{1-q}},\\
F_-&=\frac{\sqrt p E_0-\sqrt a E_1}{\sqrt{a+p}}
=\sqrt{\frac{ap}{1-q}}(I-Z_1Z_2),\\
F_X&=E_2=\sqrt qX_1.
\end{aligned}
$$

となります。$F_-P=0$、$F_+P=\sqrt{1-q}P$、$F_XP=\sqrt qX_1P$。従って正規化作用素は $W_+=P,W_X=X_1P$、syndrome射影は $\Pi_+=P,\Pi_X=X_1PX_1$、補空間は $Q=I-P-X_1PX_1$ です。$Q$ の正規直交基底を $|q_t\rangle$ と取ると、回復

$$
\mathcal R(\tau)=P\tau P+PX_1\tau X_1P
+\sum_t|000\rangle\langle q_t|\tau|q_t\rangle\langle000|
$$

のKraus二乗和は $P+X_1PX_1+Q=I_A$。符号上の $\sigma$ について

$$
\mathcal N(\sigma)=(a+p)\sigma+qX_1\sigma X_1,
\quad
\mathcal R\mathcal N(\sigma)=(1-q)\sigma+q\sigma=\sigma
$$

です。非対角な元の $C$ が、同じ論理作用をする $I,Z_1Z_2$ の縮退を表しています。

(iii) 回復後の各Kraus枝を符号空間へ制限すると、非零枝の合成は $K_+F_+P=\sqrt{1-q}P$、$K_XF_XP=\sqrt qP$、他は0です。参照系に恒等作用素をテンソルしても、

$$
\begin{aligned}
(\mathrm{id}_R\otimes\mathcal R\mathcal N)(\omega_{RA})
&=(1-q)\omega_{RA}+q\omega_{RA}\\
&=\omega_{RA}
\end{aligned}
$$

となります。これは積状態だけでなく、参照系ともつれた論理状態の非対角成分も回復することの直接確認です。
<!-- solution-end -->

## 8. 何が判定できるようになったか

- 完全訂正の可否は、すべての $PE_i^\dagger E_jP$ が同一符号射影 $P$ のスカラー倍になるかで判定できます。
- この条件は**必要十分**であり、十分性の証明は補空間も含むCPTP回復の構成を与えます。
- 縮退した誤りは区別しなくてもよい一方、論理情報を変える $Z_1$ のような誤りは、別のsyndromeを探しても完全訂正できません。
- 条件は誤りの線形包で安定なので、[前講の具体的なsyndrome訂正](../QINF25/index.md#thm-qinf25-single-correction)を一般的なKraus雑音へ拡張できます。

次は可換な検査作用素を系統的に作り、Pauli誤りの大きな集合を効率的に扱うスタビライザー・CSS符号へ進みます。
