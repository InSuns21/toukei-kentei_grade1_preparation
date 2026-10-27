# QINF12 複製・放送・削除の制約

## 1. 古典情報のコピー操作は量子状態にも使えるか

古典ビットなら、値を読み取って二つの記録先に書けます。[QINF10のHelstrom界](../QINF10/index.md#thm-qinf10-helstrom)と[QINF11のトレース距離](../QINF11/index.md#def-qinf11-trace-distance)によれば、非直交な量子状態は一回の測定で完全には識別できません。では、状態を読み取らずに二つに増やす装置は作れるでしょうか。

ここでは区別すべき三つの操作を扱います。

- **複製**：二つの出力の**同時状態**が入力のテンソル積二個分になる。
- **放送**：同時状態は相関していてもよく、**各出力の周辺状態**が入力に等しければよい。
- **削除**：二コピーの片方を固定状態へ戻す。ただし、閉じた可逆操作で補助系に情報を逃がさない要求と、単に系を捨てる要求は違う。

以下、Hilbert空間は正の有限次元を持つ複素空間とします。$H_A\cong H_B\cong H$、$L(H)$ は作用素空間、$\dagger$ は随伴、$I$ は単位作用素です。[密度演算子](../QINF2/index.md#def-qinf2-ensemble-density)は非負・トレース1の作用素、[量子チャネル](../QINF7/index.md#def-qinf7-channel)は完全正・トレース保存（CPTP）の線形写像です。$|\psi\rangle$ は単位ベクトル、$\rho_\psi=|\psi\rangle\langle\psi|$ とします。「未知」は装置の入力依存性を許さないという意味であり、一つの固定状態を二つ用意することまで禁じません。

## 2. 複製：内積を保存するだけで限界が現れる

物理的な決定論的複製には、入力ごとに装置や補助系の初期状態を変えず、同じチャネルが成功率1で働くことが必要です。

<a id="def-qinf12-cloning"></a>

<!-- formal-statement-start -->
> **定義（厳密な量子状態複製）**
> 有限次元複素Hilbert空間 $H$ 上の密度演算子の集合 $\mathcal S$ を考える。固定されたCPTP写像 $\mathcal C:L(H)\to L(H_A\otimes H_B)$ が、すべての $\rho\in\mathcal S$ に対して

$$
\mathcal C(\rho)=\rho_A\otimes\rho_B
\quad(\rho_A=\rho_B=\rho)
$$

> を満たすとき、$\mathcal C$ は $\mathcal S$ を**厳密に複製する**という。入力の一個から、独立な二個分の積状態を作る要求である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf12-cloning -->
### 定義の確認：既知の直交基底を複製するCNOT

**定義の確認**として、チャネル条件と二入力それぞれの同時積出力を調べます。

$H=\mathbb C^2$、計算基底 $|0\rangle,|1\rangle$ とし、入力の後ろに固定の空白 $|0\rangle_B$ を付けます。制御NOT（CNOT）ユニタリを $U|a,b\rangle=|a,b\oplus a\rangle$（$a,b\in\{0,1\}$、$\oplus$ は2を法とする加算）で定めると、4基底の像は置換なので内積を保ちます。

$$
U|0,0\rangle=|0,0\rangle,\qquad
U|1,0\rangle=|1,1\rangle.
$$

固定空白を付ける等長写像 $J:H\to H_A\otimes H_B$ を $J|v\rangle=|v\rangle|0\rangle_B$ と定めます。$J^\dagger J=I_H$ なので、$K=UJ$ に対して

$
K^\dagger K=J^\dagger U^\dagger UJ=J^\dagger J=I_H.
$

従って[KrausのCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)から $\mathcal C(X)=KXK^\dagger=U(X\otimes|0\rangle\langle0|)U^\dagger$ はチャネルです。$\rho_a=|a\rangle\langle a|$（$a=0,1$）とすれば、上の二つの基底像から $\mathcal C(\rho_a)=\rho_a\otimes\rho_a$ です。つまり、この例の成立条件は入力が**この二つの直交状態のいずれか**であることです。
<!-- definition-example-end -->

ところが、入力を $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ とすると、線形性から

$$
U|+,0\rangle=\frac{|00\rangle+|11\rangle}{\sqrt2},
\qquad
|+\rangle|+\rangle=\frac{|00\rangle+|01\rangle+|10\rangle+|11\rangle}{2}.
$$

二つの右辺は異なります。この失敗はCNOTの設計不良ではなく、どの装置にも共通する制約です。

<a id="thm-qinf12-pure-no-cloning"></a>

<!-- formal-statement-start -->
> **定理（純粋状態の複製不能）**
> 有限次元複素Hilbert空間 $H$ の二つの単位ベクトル $|\psi\rangle,|\phi\rangle$ が異なる純粋状態を表し、かつ $0<|\langle\psi|\phi\rangle|<1$ を満たすとする。この二状態を一つの決定論的CPTP写像でともに厳密に複製することはできない。特に、すべての未知の純粋状態を厳密に複製する万能チャネルは存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

[Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)で装置を環境込みの等長写像へ拡張します。純粋な出力二コピーが要求されると、環境とは積状態になります。**内積保存**と内積の積則を同時に使うと、入力の重なりの絶対値はその二乗以下でなければならず矛盾します。

<!-- proof-start -->
### 証明

$V:H\to H_A\otimes H_B\otimes H_E$ を環境込みの等長写像とします。[Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)により $\mathcal C(\rho)=\operatorname{Tr}_E(V\rho V^\dagger)$ です。入力が $|\psi\rangle$ のとき、仮定されたAB出力は純粋状態 $|\psi\psi\rangle$ の射影です。全体 $V|\psi\rangle$ も純粋で、ABの縮約が純粋なら[Schmidt階数による積状態判定](../QINF6/index.md#prop-qinf6-product)により

$$
V|\psi\rangle=|\psi\psi\rangle|e_\psi\rangle,\qquad
V|\phi\rangle=|\phi\phi\rangle|e_\phi\rangle
$$

と書けます。環境ベクトルは単位ベクトルです。$V^\dagger V=I_H$ だから、$c=\langle\psi|\phi\rangle$ と置いて

$$
c=\langle V\psi|V\phi\rangle
=c^2\langle e_\psi|e_\phi\rangle.
$$

Cauchy–Schwarz不等式で $|\langle e_\psi|e_\phi\rangle|\le1$。従って $|c|\le|c|^2$ ですが、$0<|c|<1$ なら $|c|^2<|c|$ です。矛盾するので装置は存在しません。$\square$
<!-- proof-end -->

$c=0$ なら前述の直交基底複製のように可能です。$|c|=1$ ならCauchy–Schwarzの等号から同じ射影状態であり、既知の一状態を定数チャネルで二つ用意できます。定理は近似複製、成功失敗を知らせる確率的操作、状態を既知とする準備を一括禁止するものではありません。

混合状態の複製には、前章の[平方根忠実度](../QINF11/index.md#def-qinf11-fidelity)

$$
f(\rho,\sigma)=\operatorname{Tr}\sqrt{\sqrt\rho\,\sigma\sqrt\rho}
\quad(0\le f\le1)
$$

が便利です。ここでは二乗忠実度 $F=f^2$ と混同しません。

<a id="thm-qinf12-mixed-cloning"></a>

<!-- formal-statement-start -->
> **定理（混合状態の厳密な複製の条件）**
> 同じ有限次元複素Hilbert空間上の二密度演算子 $\rho,\sigma$ が同じCPTP写像で厳密に複製できるための必要十分条件は、$\rho=\sigma$ または $\rho\sigma=0$（二状態の台が直交すること）である。
<!-- formal-statement-end -->

### 証明の見取り図

厳密な積複製ができれば、[忠実度のチャネル単調性](../QINF11/index.md#thm-qinf11-fidelity-monotonicity)とテンソル積の乗法性によって $f\le f^2$ が必要になります。逆向きは、入力を測定してから既知の状態を準備するチャネルを構成します。

<!-- proof-start -->
### 証明

$f=f(\rho,\sigma)$ とします。複製チャネルが存在すれば、[忠実度の単調性](../QINF11/index.md#thm-qinf11-fidelity-monotonicity)から

$$
f\le f(\mathcal C(\rho),\mathcal C(\sigma))
=f(\rho\otimes\rho,\sigma\otimes\sigma)=f^2.
$$

最後の等号は[忠実度の定義](../QINF11/index.md#def-qinf11-fidelity)とテンソル積の非負平方根・特異値の積則によるもので、[QINF11-B02の詳細解答](../QINF11/index.md#ex-qinf11-b02)で導出しています。$0\le f\le1$ なので $f=0$ または $1$。[Uhlmann定理の等号条件](../QINF11/index.md#thm-qinf11-uhlmann)より $f=1$ は $\rho=\sigma$ と同値です。一方、

$
f=0\iff\|\sqrt\rho\sqrt\sigma\|_1=0
\iff\sqrt\rho\sqrt\sigma=0.
$

このとき $\operatorname{Ran}\sqrt\sigma\subset\ker\sqrt\rho=(\operatorname{supp}\rho)^\perp$ なので、二状態の台は直交します。逆に台が直交すれば $\sqrt\rho\sqrt\sigma=0$ であり、$\rho\sigma=0$ とも同値です。

逆に同一状態 $\tau$ だけの集合なら $\mathcal C(X)=\operatorname{Tr}(X)\tau\otimes\tau$ はCPTPで厳密複製します。$\rho\sigma=0$ なら、その直交する台への射影を $P_\rho,P_\sigma$ とします。$P_\rho P_\sigma=0$ なので三結果測定 $(P_\rho,P_\sigma,I-P_\rho-P_\sigma)$ は[POVM](../QINF5/index.md#def-qinf5-povm)です。結果 $\rho$ では $\rho\otimes\rho$、結果 $\sigma$ では $\sigma\otimes\sigma$、第三結果では任意の固定積状態を準備する測定・準備チャネルを選べば、対応する入力では確率1で正しい積出力となります。$\square$
<!-- proof-end -->

## 3. 放送：積でなくても二つの周辺に残せるか

混合状態では、二つの系に古典的相関を持たせれば、積複製せずにどちらの周辺にも同じ確率分布を残せます。この弱い要求を放送（broadcasting）と呼びます。

<a id="def-qinf12-broadcasting"></a>

<!-- formal-statement-start -->
> **定義（量子状態の放送）**
> 有限次元複素Hilbert空間 $H$ 上の密度演算子の集合 $\mathcal S$ に対し、固定CPTP写像 $\mathcal B:L(H)\to L(H_A\otimes H_B)$ がすべての $\rho\in\mathcal S$ について、$\omega_\rho=\mathcal B(\rho)$ の両周辺状態を

$$
\operatorname{Tr}_B\omega_\rho=\rho_A,\qquad
\operatorname{Tr}_A\omega_\rho=\rho_B
\quad(\rho_A=\rho_B=\rho)
$$

> とするなら、$\mathcal B$ は $\mathcal S$ を**放送する**という。同時状態 $\omega_\rho$ が $\rho\otimes\rho$ であることは要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf12-broadcasting -->
### 定義の確認：可換な二つの混合状態

**定義の確認**として、同時状態の正値・正規化と両周辺の等式を別々に確かめます。

計算基底に関して $\rho_p=p|0\rangle\langle0|+(1-p)|1\rangle\langle1|$（$0\le p\le1$）とします。非負性・トレース1を確認でき、同じ基底に対角な任意の二状態は可換です。先ほどのCNOTを入力に用いると

$$
\mathcal B(\rho_p)
=p|00\rangle\langle00|+(1-p)|11\rangle\langle11|
=:\omega_p.
$$

[部分トレースの基底公式](../QINF3/index.md#def-qinf3-partial-trace)で $|ii\rangle\langle ii|$ のBまたはAを捨てると $|i\rangle\langle i|$ なので、両周辺は確かに $\rho_p$。しかし $\rho_p\otimes\rho_p$ の $|01\rangle\langle01|$ の確率は $p(1-p)$、$\omega_p$ では0です。$0<p<1$ なら積複製ではありません。
<!-- definition-example-end -->

したがって「純粋状態は複製できない」から「どんな混合状態も放送できない」と結論するのは誤りです。どの混合集合まで放送できるかを判定するには、二つの密度行列の**可換性** $[\rho,\sigma]=\rho\sigma-\sigma\rho=0$ が鍵です。これは両自己共役行列が[共通正規直交固有基底で同時対角化できること](../QINF11/index.md#prop-qinf11-commuting)と同値です。

### 3.1 必要性のための準備：忠実度が変わらない測定

[QINF11の忠実度を実現する射影測定](../QINF11/index.md#lem-qinf11-fidelity-measurement)を、後で等号条件を比較できるようにもう一度構成します。同じ空間上の正定値密度演算子 $\beta>0$ と $\alpha>0$ に対し、正作用素

$$
K=\beta^{-1/2}
\bigl(\beta^{1/2}\alpha\beta^{1/2}\bigr)^{1/2}
\beta^{-1/2}>0
$$

を作ります。この $K$ は $\alpha=K\beta K$ を満たします。実際、$R=\bigl(\beta^{1/2}\alpha\beta^{1/2}\bigr)^{1/2}$ と置けば $K\beta K=\beta^{-1/2}R^2\beta^{-1/2}=\alpha$ です。逆に $K>0$ と $\alpha=K\beta K$ を満たすものは、$\beta^{1/2}K\beta^{1/2}$ が正でその二乗が $\beta^{1/2}\alpha\beta^{1/2}$ になるので、この式で一意に定まります。

$K$ の相異なる固有値を $k_i>0$、固有空間への直交射影を $P_i$ とします。$\sum_iP_i=I$、$KP_i=k_iP_i$ です。測定確率を $p_i=\operatorname{Tr}(\alpha P_i)$、$q_i=\operatorname{Tr}(\beta P_i)$ とすれば、$\alpha=K\beta K$ より

$$
p_i=k_i^2q_i,\qquad
\sum_i\sqrt{p_iq_i}=\sum_i k_iq_i
=\operatorname{Tr}(\beta K)=f(\alpha,\beta).
$$

最後は $\beta^{1/2}K\beta^{1/2}=R$ と[平方根忠実度](../QINF11/index.md#def-qinf11-fidelity)の定義によります。このように、$K$ の固有射影測定は**古典結果分布の重なりを量子忠実度と一致させる**測定です。

次の補題では、$X,Y$ は大きい複合系の状態でもよく、固有値0を持っていて構いません。$\sqrt X$ は非負平方根で、$\operatorname{Tr}(\sqrt X E_i\sqrt X)=\operatorname{Tr}(XE_i)$ です。

<a id="lem-qinf12-optimal-measurement"></a>

<!-- formal-statement-start -->
> **補題（忠実度最適測定の等号条件）**
> 同じ有限次元複素Hilbert空間上の密度演算子 $X,Y$、互いに直交する射影の完全族 $(E_i)$ を考える。$p_i=\operatorname{Tr}(XE_i)>0$、$q_i=\operatorname{Tr}(YE_i)>0$ とし、

$$
\sum_i\sqrt{p_iq_i}=f(X,Y)
$$

> が成り立つとする。$\sqrt X\sqrt Y$ の[極分解](../../../基礎科目/LA/LA6/index.md#thm-la6-polar)から $\operatorname{Tr}(U\sqrt X\sqrt Y)=f(X,Y)$ を達成するユニタリ $U$ を**一つ固定**すると、全ての $i$ について

$$
U\sqrt X E_i=\sqrt{\frac{p_i}{q_i}}\,\sqrt Y E_i
$$

> が成立する。この $U$ は同じ $X,Y$ に対して等号を実現する別の射影測定にも共通に使える。
<!-- formal-statement-end -->

### 証明の見取り図

各射影で分けた行列のHilbert–Schmidt内積にCauchy–Schwarzを適用します。和の最初と最後が一致するため、途中の三角不等式と各Cauchy–Schwarzも全て等号になります。

<!-- proof-start -->
### 証明

[ユニタリ最適化とトレースノルム](../QINF11/index.md#lem-qinf11-unitary-optimization)により、$\operatorname{Tr}(U\sqrt X\sqrt Y)=\|\sqrt X\sqrt Y\|_1=f(X,Y)$ を実現するユニタリを選べます（零特異値の部分はユニタリに延長する）。$A_i=U\sqrt X E_i$、$B_i=\sqrt Y E_i$ とすると、$E_i^2=E_i$ とトレースの巡回性から

$$
\operatorname{Tr}(A_iA_i^\dagger)=p_i,\quad
\operatorname{Tr}(B_iB_i^\dagger)=q_i,\quad
\operatorname{Tr}(A_iB_i^\dagger)=
\operatorname{Tr}(U\sqrt X E_i\sqrt Y).
$$

射影の和が $I$ なので

$$
\begin{aligned}
f(X,Y)
&=\left|\sum_i\operatorname{Tr}(A_iB_i^\dagger)\right|\\
&\le\sum_i|\operatorname{Tr}(A_iB_i^\dagger)|\\
&\le\sum_i\sqrt{\operatorname{Tr}(A_iA_i^\dagger)
\operatorname{Tr}(B_iB_i^\dagger)}\\
&=\sum_i\sqrt{p_iq_i}=f(X,Y).
\end{aligned}
$$

従って各 $i$ でCauchy–Schwarzの等号が成立し、$A_i=\lambda_iB_i$。ノルムから $|\lambda_i|=\sqrt{p_i/q_i}$。三角不等式も等号であり、総和 $\operatorname{Tr}(U\sqrt X\sqrt Y)=f(X,Y)>0$ は正の実数なので、全項の位相は0、従って $\lambda_i=\sqrt{p_i/q_i}>0$ です。$U$ は $X,Y$ のみによって先に固定したので、別の射影測定についても同じ議論を繰り返せます。$\square$
<!-- proof-end -->

### 3.2 二状態の放送可能性を完全に特徴づける

<a id="thm-qinf12-no-broadcasting"></a>

<!-- formal-statement-start -->
> **定理（二状態の放送可能性と可換性）**
> 同じ正の有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho,\sigma$ を一つの固定CPTP写像 $\mathcal B:L(H)\to L(H\otimes H)$ で同時に放送できることと、$\rho\sigma=\sigma\rho$ は必要十分である。
<!-- formal-statement-end -->

### 証明の見取り図

可換なら共通固有基底を測って二重に書けば足ります。逆向きは、3.1節の $K$ の固有射影測定を両出力に行い、[忠実度単調性](../QINF11/index.md#thm-qinf11-fidelity-monotonicity)が等号になることを利用します。[等号補題](#lem-qinf12-optimal-measurement)により二出力の $K$ が同じ値を取る部分空間だけが許され、その周辺状態は $K$ と可換になります。

<!-- proof-start -->
### 証明

**十分性。** $[\rho,\sigma]=0$ なら同時対角化でき、$\rho=\sum_i r_i|i\rangle\langle i|$、$\sigma=\sum_i s_i|i\rangle\langle i|$ と書けます（各係数は非負、各和は1）。$V_i=|ii\rangle\langle i|$ と置くと

$$
\sum_iV_i^\dagger V_i=\sum_i|i\rangle\langle i|=I_H.
$$

従って[KrausのCPTP条件](../QINF7/index.md#thm-qinf7-kraus-cptp)より $\mathcal B(X)=\sum_iV_iXV_i^\dagger$ はチャネルです。任意の対角状態 $\tau=\sum_i t_i|i\rangle\langle i|$ について

$$
\mathcal B(\tau)=\sum_i t_i|ii\rangle\langle ii|,
\quad \operatorname{Tr}_B\mathcal B(\tau)
=\operatorname{Tr}_A\mathcal B(\tau)=\tau.
$$

よって $\rho,\sigma$ を同じ写像で放送できます。

**必要性（正定値）。** まず $\alpha,\beta>0$ が放送可能と仮定します。3.1節の一意な $K>0$ は $\alpha=K\beta K$ を満たし、$K=\sum_i k_iP_i$ とスペクトル分解できます。$p_i=\operatorname{Tr}(\alpha P_i)=k_i^2q_i$、$q_i=\operatorname{Tr}(\beta P_i)>0$ です。出力を $X=\mathcal B(\alpha)$、$Y=\mathcal B(\beta)$ とします。

放送の周辺条件から $E_i=P_i\otimes I$ による $X,Y$ の測定確率は $p_i,q_i$ です。測定チャネルに[忠実度単調性](../QINF11/index.md#thm-qinf11-fidelity-monotonicity)を適用し、さらに放送チャネルにも適用すると

$$
f(\alpha,\beta)\le f(X,Y)
\le\sum_i\sqrt{p_iq_i}=f(\alpha,\beta).
$$

従って両不等式は等号です。$F_i=I\otimes P_i$ も第二周辺について同じ確率 $p_i,q_i$ を持ち、同様に忠実度最適測定です。[等号補題](#lem-qinf12-optimal-measurement)を $E_i,F_i$ に対して**同じ $X,Y$ と同じユニタリ $U$**で使い、各射影の式を足せば

$$
U\sqrt X=\sqrt Y(K\otimes I),
\qquad
U\sqrt X=\sqrt Y(I\otimes K).
$$

差を取り随伴を取ると

$$
(K\otimes I-I\otimes K)\sqrt Y=0.
$$

$K$ の固有基底を $|i\rangle$ とすれば、左の差作用素は $|ij\rangle$ に固有値 $k_i-k_j$ で作用します。ゆえに $\sqrt Y$ の値域は $k_i=k_j$ を満たす $|ij\rangle$ の張る部分空間に入ります。相異なる固有値 $k$ の射影を $P_k$ と書き、

$$
\Pi=\sum_kP_k\otimes P_k
$$

と置けば、$Y=\Pi Y\Pi$ です。この式は $Y$ に異なる $k$ の間の**全系のコヒーレンス**がないとは主張していません。しかし、$\beta=\operatorname{Tr}_B Y$ の異なる固有値ブロックは消えます。実際、$k\ne l$ に対して

$$
\begin{aligned}
P_k\beta P_l
&=\operatorname{Tr}_B[(P_k\otimes I)Y(P_l\otimes I)]\\
&=\operatorname{Tr}_B[(P_k\otimes P_k)Y(P_l\otimes P_l)]=0.
\end{aligned}
$$

最後の零は、B側で直交する部分空間の間を結ぶ作用素の部分トレースが消えるためです。[部分トレースの基底公式](../QINF3/index.md#def-qinf3-partial-trace)で、$K$ の固有空間ごとに選んだ正規直交基底 $(b_j)$ を用いれば、各 $j$ について $\langle b_j|P_k$ と $P_l|b_j\rangle$ は $k\ne l$ のとき同時には非零にならず、各項

$
(I\otimes\langle b_j|)(P_k\otimes P_k)Y
(P_l\otimes P_l)(I\otimes|b_j\rangle)=0
$

です。よって $\beta=\sum_kP_k\beta P_k$、すなわち $[K,\beta]=0$。[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)に照らしたこのブロック判定と $\alpha=K\beta K$ により $[\alpha,\beta]=0$ です。

**必要性（特異な状態を含む一般の場合）。** $S$ を $\rho+\sigma$ の台とします。二状態は $S^\perp$ 上では零です。線形性によって

$$
\alpha=\frac{2\rho+\sigma}{3},
\qquad
\beta=\frac{\rho+2\sigma}{3}
$$

も放送され、$S$ 上ではともに正定値です。実際、$v\in S$ が零でなければ $\langle v,(\rho+\sigma)v\rangle>0$ であり、$\alpha,\beta$ の二次形式も正です。両周辺が $S$ に支持される非負の同時出力は $S\otimes S$ に支持されます。なぜなら $(I-P_S)\otimes I$ を測った確率は0で、非負作用素のその部分の行列要素はすべて零であり、第二系でも同様だからです。さらに $\alpha>0$ は $S$ 上正定値です。$S$ に支持される任意の $T\ge0$ に対して、ある $c>0$ が存在して $T\le c\alpha$ です。チャネルの正値性から

$
0\le\mathcal B(T)\le c\mathcal B(\alpha)
$

であり、右辺は $S\otimes S$ に支持されます。ゆえに $\mathcal B(T)$ も同じ部分空間に支持され、正作用素の線形結合で $L(S)$ を張ることから、$\mathcal B$ の $L(S)$ への制限は $L(S\otimes S)$ に値を取るCPTP写像です。こうして $S$ を全空間とみなし、先ほどの正定値の場合を適用して $[\alpha,\beta]=0$ を得ます。

$$
[\alpha,\beta]
=\frac19[2\rho+\sigma,\rho+2\sigma]
=\frac13[\rho,\sigma]
$$

なので $[\rho,\sigma]=0$。$S^\perp$ でも両作用素は零で、全空間の結論となります。$\square$
<!-- proof-end -->

### 直接例：固有値が同じでも放送可能とは限らない

以下の行列は、計算基底 $|0\rangle,|1\rangle$ における密度作用素の表示です。固有値の非負性で正値性を、対角和でトレース1を確認し、可換性の定義 $[\rho,\sigma]=0$ はこの基底での行列積によって判定します。

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\frac12 I+\frac14\begin{pmatrix}0&1\\1&0\end{pmatrix}$ はともに固有値 $3/4,1/4$ を持ち、対角和も1なので密度演算子ですが、

$$
[\rho,\sigma]=
\begin{pmatrix}0&1/8\\-1/8&0\end{pmatrix}\ne0.
$$

よって[二状態の放送可能性と可換性](#thm-qinf12-no-broadcasting)により同じ装置では放送できません。固有値が一致するだけでなく、**同時対角化できるか**が条件です。逆に $\rho_{1/4}$ と $\rho_{3/4}$ は放送できますが、同一でも直交台でもないので[混合状態の厳密な積複製条件](#thm-qinf12-mixed-cloning)により積複製はできません。

## 4. 削除：消えた情報はどこへ行くか

二つの同じ純粋状態から片方だけを固定空白へ戻すことを考えます。ここで重要なのは、[Stinespring表現](../QINF8/index.md#thm-qinf8-stinespring)で環境まで含めた**可逆なユニタリ発展**と、系を捨てる不可逆チャネルを区別することです。

<a id="def-qinf12-deleting"></a>

<!-- formal-statement-start -->
> **定義（補助系を含む厳密な量子状態削除）**
> 固定初期補助状態 $|a\rangle_E$、固定空白 $|0\rangle_B$、ユニタリ $U$ を用い、二つの同じ純粋入力について

$$
U(|\psi\rangle_A|\psi\rangle_B|a\rangle_E)
=|\psi\rangle_A|0\rangle_B|e_\psi\rangle_E
$$

> とする操作を考える。補助状態 $|e_\psi\rangle$ が入力によらず同一の純粋状態（全体位相を除く）であることまで要求するとき、**補助系に情報を退避しない削除**という。全ベクトルは単位ベクトルとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf12-deleting -->
### 定義の確認：SWAPは情報を補助系へ移す

**定義の確認**として、ユニタリ性・Bの空白化・補助系の入力依存性をそれぞれ検査します。

BとEを交換するSWAPユニタリは基底ベクトルの置換として構成でき、内積・正規化を保ちます。$H_E\cong H_B$、$|a\rangle_E=|0\rangle_E$ として

$$
|\psi\rangle_A|\psi\rangle_B|0\rangle_E
\longmapsto|\psi\rangle_A|0\rangle_B|\psi\rangle_E.
$$

Bは確かに固定空白ですが、$|e_\psi\rangle=|\psi\rangle$ は入力に依存します。逆SWAPで二コピーを回復できるため、情報は消えていません。
<!-- definition-example-end -->

<a id="thm-qinf12-no-deleting"></a>

<!-- formal-statement-start -->
> **定理（no-deletingと補助系への情報退避）**
> $0<|\langle\psi|\phi\rangle|<1$ である二つの単位ベクトルについて、同じユニタリが上の削除の形を実現するなら

$$
\langle e_\psi|e_\phi\rangle=\langle\psi|\phi\rangle.
$$

> したがって補助状態を入力によらず同一にすることは不可能である。特に、未知の非直交な二純粋状態について、環境まで含め情報を残さず一コピーだけ可逆に消去することはできない。
<!-- formal-statement-end -->

### 証明の見取り図

初期三系の内積は入力内積の二乗、最終三系の内積は残したコピーと補助系の内積の積です。ユニタリの内積保存を比較します。

<!-- proof-start -->
### 証明

$c=\langle\psi|\phi\rangle$ と置きます。初期状態の内積は $c^2\langle a|a\rangle=c^2$。最終状態の内積は、Bの空白同士の内積が1なので $c\langle e_\psi|e_\phi\rangle$ です。ユニタリ性から

$$
c^2=c\langle e_\psi|e_\phi\rangle.
$$

$c\ne0$ で割ると結論です。$0<|c|<1$ より $|\langle e_\psi|e_\phi\rangle|<1$ だから補助状態は同一ではありません。$\square$
<!-- proof-end -->

この定理が禁止するのは**閉じた可逆操作で補助系からも情報を消す**ことです。部分トレース $\operatorname{Tr}_B(\rho_\psi\otimes\rho_\psi)=\rho_\psi$ は合法なCPTP写像で、捨てたBの情報が環境側に移るので矛盾しません。また、この内積計算だけから熱力学的な消去仕事や不可逆性の定量式を導くことはできません。

## 5. 三種類の制約を並べる

| 操作 | 要求 | 二状態に対する条件 |
|---|---|---|
| 純粋状態の厳密複製 | 二つの純粋な積コピー | 異なる非直交二状態では不可能 |
| 混合状態の厳密積複製 | 出力が $\rho\otimes\rho$ | 同一または直交台 |
| 混合状態の放送 | 各周辺が入力に一致 | 可換であることと同値 |
| 可逆な片方の削除 | 一コピー維持、もう一方は固定空白 | 非直交なら情報は補助系に残る |

どれも**集合全体に共通の固定操作**を課した結論です。成功失敗を知らせる確率的複製、近似複製、入力状態を既知とした準備は、別の条件で調べる必要があります。

## 6. 演習：内積・周辺状態・補助系を自分で確かめる

特記しなければ $H=\mathbb C^2$、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$\rho_\psi=|\psi\rangle\langle\psi|$ とします。

<a id="ex-qinf12-a01"></a>
### QINF12-A01 内積の二乗と例外

- Level: A

$|\psi\rangle=|0\rangle$、$|\phi\rangle=\cos\theta|0\rangle+\sin\theta|1\rangle$（$0\le\theta\le\pi/2$）の二状態に対し、入力内積と理想的な二コピーの内積を求めよ。どの $\theta$ なら同一チャネルで両者を厳密複製できるか。

<!-- solution-start -->
### 詳細解答

二状態は $\cos^2\theta+\sin^2\theta=1$ で正規化されます。入力内積は $\langle\psi|\phi\rangle=\cos\theta$、理想的積コピーの内積はテンソル積の積則から $\cos^2\theta$ です。[複製不能定理](#thm-qinf12-pure-no-cloning)より $0<\theta<\pi/2$ では、環境を付けても同時複製は不可能です。$\theta=0$ なら二状態は同一、$\theta=\pi/2$ なら直交しており、前者は固定準備、後者はCNOTで厳密複製できます。両端の内積はそれぞれ1と0で、その二乗に等しいことも検算できます。
<!-- solution-end -->

<a id="ex-qinf12-a02"></a>
### QINF12-A02 CNOTが複製しなかった成分

- Level: A

第一入力 $|+\rangle$、第二入力 $|0\rangle$ にCNOTを作用させ、出力の密度演算子の両周辺を求めよ。理想的な二コピーとの違いを行列で説明せよ。

<!-- solution-start -->
### 詳細解答

線形性から $|\Phi\rangle=U|+,0\rangle=(|00\rangle+|11\rangle)/\sqrt2$。出力は

$$
|\Phi\rangle\langle\Phi|
=\frac12(|00\rangle\langle00|+|00\rangle\langle11|
+|11\rangle\langle00|+|11\rangle\langle11|).
$$

[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)では第二側の $\langle0|1\rangle$ が0なので交差項が消え、$\operatorname{Tr}_B|\Phi\rangle\langle\Phi|=I/2$。同じ計算で $\operatorname{Tr}_A=I/2$ です。一方 $\rho_+=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ なので、両周辺とも $\rho_+$ と異なります。従って複製でも放送でもありません。二コピーの理想状態 $|++\rangle$ は $|01\rangle,|10\rangle$ の振幅も $1/2$ であり、同時状態も異なります。
<!-- solution-end -->

<a id="ex-qinf12-a03"></a>
### QINF12-A03 可換qubitの放送と積複製

- Level: A

$\rho_p=\operatorname{diag}(p,1-p)$（$0<p<1$）に対し、$\mathcal B(X)=\sum_{i=0}^1|ii\rangle\langle i|X|i\rangle\langle ii|$ がCPTPであり、$\rho_p$ を放送することを示せ。$\mathcal B(\rho_p)\ne\rho_p\otimes\rho_p$ も示せ。

<!-- solution-start -->
### 詳細解答

$V_i=|ii\rangle\langle i|$ とおけば $V_i^\dagger V_i=|i\rangle\langle i|$、その和は $I$ です。[Krausの条件](../QINF7/index.md#thm-qinf7-kraus-cptp)でCPTPです。出力は $p|00\rangle\langle00|+(1-p)|11\rangle\langle11|$ で正値、トレース1。[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)によりどちらの周辺も $p|0\rangle\langle0|+(1-p)|1\rangle\langle1|=\rho_p$ です。一方、積状態における $|01\rangle\langle01|$ の確率は $p(1-p)>0$、上の出力では0。従って厳密積複製ではありません。
<!-- solution-end -->

<a id="ex-qinf12-a04"></a>
### QINF12-A04 SWAPと捨てる操作

- Level: A

初期状態 $|\psi\rangle_A|\psi\rangle_B|0\rangle_E$ に対し、BとEのSWAP後の状態とそのA,Bへの縮約を求めよ。Eを捨てればBの情報が完全に消滅したと結論してよいか。

<!-- solution-start -->
### 詳細解答

SWAPは $|x\rangle_B|y\rangle_E\mapsto|y\rangle_B|x\rangle_E$ を全基底から線形に拡張したユニタリです。出力は $|\psi\rangle_A|0\rangle_B|\psi\rangle_E$ です。Eの[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)を取ると $\rho_\psi\otimes|0\rangle\langle0|$、各周辺はAが $\rho_\psi$、Bが $|0\rangle\langle0|$ です。しかしEの状態は $\rho_\psi$ で、Eを保存すれば逆SWAPにより元の二コピーを復元できます。Eを捨てた後のABだけの記述が不可逆なのと、全閉鎖系の情報が消えることは別です。
<!-- solution-end -->

<a id="ex-qinf12-b01"></a>
### QINF12-B01 重なりのある混合状態は積複製できるか

- Level: B

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\operatorname{diag}(1/4,3/4)$ について、平方根忠実度 $f$ と二コピーの $f_2$ を求めよ。同一チャネルによる放送と厳密積複製の可否をそれぞれ判定せよ。

<!-- solution-start -->
### 詳細解答

両状態の固有値は非負で和1、共通対角基底なので可換です。[可換状態の距離と忠実度](../QINF11/index.md#prop-qinf11-commuting)より

$$
f=\sqrt{\frac34\frac14}+\sqrt{\frac14\frac34}
=\frac{\sqrt3}{2}.
$$

テンソル積の平方根とトレースの積則から $f_2=f^2=3/4$ です。$0<f<1$ なので、[混合状態の積複製条件](#thm-qinf12-mixed-cloning)により同一チャネルで両状態を厳密積複製できません（もし可能なら忠実度単調性が $f\le f^2$ を要請し、$\sqrt3/2\le3/4$ となって矛盾）。一方可換なので[二状態の放送可能性と可換性](#thm-qinf12-no-broadcasting)の構成により、共通基底の値を両側へ書く放送は可能です。
<!-- solution-end -->

<a id="ex-qinf12-b02"></a>
### QINF12-B02 固有値が同じでも可換ではない二状態

- Level: B

$\rho=\operatorname{diag}(3/4,1/4)$、$\sigma=\frac12I+\frac14\begin{pmatrix}0&1\\1&0\end{pmatrix}$ に対し、二状態が密度演算子であることと、交換子を確認せよ。同時放送の可否を判定し、$\alpha=(2\rho+\sigma)/3$、$\beta=(\rho+2\sigma)/3$ がともに正定値で $[\alpha,\beta]=[\rho,\sigma]/3$ となることも示せ。

<!-- solution-start -->
### 詳細解答

$\rho$ の固有値は $3/4,1/4$。$\sigma=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}$ は固有ベクトル $|+\rangle,|-\rangle$ に対応して固有値 $3/4,1/4$ を持ち、ともに正値・トレース1です。直接積を計算すると

$$
\rho\sigma=\begin{pmatrix}3/8&3/16\\1/16&1/8\end{pmatrix},
\quad
\sigma\rho=\begin{pmatrix}3/8&1/16\\3/16&1/8\end{pmatrix},
\quad
[\rho,\sigma]=\begin{pmatrix}0&1/8\\-1/8&0\end{pmatrix}.
$$

非可換なので[二状態の放送可能性と可換性](#thm-qinf12-no-broadcasting)より同時放送できません。$\rho,\sigma\ge I/4$ だから、非負の係数で和が1となる平均 $\alpha,\beta$ も $\ge I/4>0$。交換子の双線形性と $[X,X]=0$、$[\sigma,\rho]=-[\rho,\sigma]$ を使うと

$$
[\alpha,\beta]=\frac19(4[\rho,\sigma]+[\sigma,\rho])
=\frac13[\rho,\sigma]\ne0.
$$

これは定理の正定値への帰着を、このqubit対で再現した計算です。
<!-- solution-end -->

<a id="ex-qinf12-b03"></a>
### QINF12-B03 忠実度最適測定の等号を直接検算する

- Level: B

$\alpha=\operatorname{diag}(9/10,1/10)$、$\beta=\operatorname{diag}(2/5,3/5)$ とする。$K\beta K=\alpha$ となる正定値対角作用素 $K$、その固有基底での二分布 $(p_i),(q_i)$、および $\sum_i\sqrt{p_iq_i}=f(\alpha,\beta)$ を求めよ。測定の等号条件を確認し、なぜ両側へこの基底を記録する放送が成立するか述べよ。

<!-- solution-start -->
### 詳細解答

$K=\operatorname{diag}(k_0,k_1)$ とすると、対角成分から $k_0^2(2/5)=9/10$、$k_1^2(3/5)=1/10$ です。正の根を選び

$$
K=\operatorname{diag}\left(\frac32,\frac1{\sqrt6}\right).
$$

両固有値は正で異なるため、固有射影は $P_0=|0\rangle\langle0|$、$P_1=|1\rangle\langle1|$ です。確率は $p=(9/10,1/10)$、$q=(2/5,3/5)$。$p_0/q_0=9/4=k_0^2$、$p_1/q_1=1/6=k_1^2$ です。さらに $\sqrt\alpha\sqrt\beta$ は非負対角行列なので、[等号補題](#lem-qinf12-optimal-measurement)のユニタリは $U=I$ と取れます。実際、各 $i=0,1$ について

$
U\sqrt\alpha P_i=\sqrt{p_i}\,P_i
=\sqrt{\frac{p_i}{q_i}}\sqrt{q_i}\,P_i
=k_i\sqrt\beta P_i.
$

従って測定確率の等号だけでなく、等号補題の作用素等式も確認できました。

$$
\sum_i\sqrt{p_iq_i}
=\sqrt{\frac9{10}\frac25}+\sqrt{\frac1{10}\frac35}
=\frac35+\frac{\sqrt6}{10}.
$$

[可換忠実度公式](../QINF11/index.md#prop-qinf11-commuting)でも同じ値です。出力 $p_0|00\rangle\langle00|+p_1|11\rangle\langle11|$ と、同様に $q$ の出力を作れば、両周辺の確率は元の $p,q$ になります。CPTP性は[放送定理](#thm-qinf12-no-broadcasting)の $V_i$ 構成によって保証されます。
<!-- solution-end -->

<a id="ex-qinf12-c01"></a>
### QINF12-C01 一組の非直交状態で三つの制約を統合する

- Level: C

入力候補を $|0\rangle$ と $|+\rangle$ とする。以下を、同一の固定操作という条件の下で検討せよ。

1. 内積と平方根忠実度を求め、厳密複製が不可能である理由を内積保存と忠実度単調性の両方から示せ。
2. 両密度行列の交換子を求め、積条件を緩めた同時放送も不可能であることを示せ。
3. 第二コピーの固定空白への削除がユニタリで可能なら、出力補助系の二状態の内積を決定せよ。BとEをSWAPする具体例で検算せよ。
4. 第二系を捨てるCPTP写像なら可能であることと、上記との非矛盾性を説明せよ。

<!-- solution-start -->
### 詳細解答

まず $c=\langle0|+\rangle=1/\sqrt2$。純粋状態同士の[平方根忠実度](../QINF11/index.md#def-qinf11-fidelity)も $f=|c|=1/\sqrt2$ です。

[純粋状態の複製不能定理](#thm-qinf12-pure-no-cloning)の証明を二状態に適用すると、仮の等長写像の環境内積を $d$ として $c=c^2d$。$|d|\le1$ より $1/\sqrt2\le1/2$ を要請し矛盾します。

さらに厳密積複製なら[忠実度単調性](../QINF11/index.md#thm-qinf11-fidelity-monotonicity)から $f\le f^2$、すなわち $1/\sqrt2\le1/2$ という同じ矛盾です。

次に、計算基底で

$$
\rho_0=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad \rho_+=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},
\quad
[\rho_0,\rho_+]=\frac12\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

交換子は非零だから、[二状態の放送可能性と可換性](#thm-qinf12-no-broadcasting)によって相関した出力を許しても同時放送はできません。この結論は単なる積複製の禁止より強いものです。

削除を仮定すると、[no-deleting定理](#thm-qinf12-no-deleting)で補助状態の内積は $\langle e_0|e_+\rangle=c=1/\sqrt2$ と決まります。SWAPで $|0,0,0\rangle\mapsto|0,0,0\rangle$、$|+,+,0\rangle\mapsto|+,0,+\rangle$ だから、実際にEの二状態は $|0\rangle,|+\rangle$ で内積 $1/\sqrt2$。第二コピーの情報はEに移っています。

最後に、$\operatorname{Tr}_B(\rho_\psi\otimes\rho_\psi)=\rho_\psi$ は任意の $\psi$ に対して成立し、捨てる写像自体は[部分トレースというCPTP写像](../QINF7/index.md#thm-qinf7-kraus-cptp)です。環境も含めた可逆変換から情報を消したと要求していないので矛盾しません。
<!-- solution-end -->
