# QINF14 LOCCと純粋状態の変換

## 1. 共有したもつれを減らすことと増やすこと

[QINF13のテレポーテーション](../QINF13/index.md#thm-qinf13-teleportation)では、AliceとBobは事前にBell対を共有し、Aliceの測定結果を古典通信で送ってBobの操作を指定しました。ここでは、**二人が手元の系だけを操作し、測定結果を古典通信で共有するとき、共有純粋状態そのものをどこまで変換できるか**を考えます。

例えばBell対 $(|00\rangle+|11\rangle)/\sqrt2$ を $|00\rangle$ にするには、Aliceが計算基底で測り、結果1なら両者が $X$ を施せばよいでしょう。逆に $|00\rangle$ からBell対を作るには、Aliceの操作だけでもBobの操作だけでも足りません。この「一方向だけが可能」を定量的に表すのが、Schmidt係数の二乗と優越関係（majorization）です。

以下、$H_A\cong H_B\cong\mathbb C^d$（$d\ge2$）とし、二人が一つずつ系を持ちます。純粋状態はノルム1のベクトルとして扱い、全体位相の相違は同じ状態とします。異なる局所次元をもつ場合の一般化は、十分大きい同次元の局所空間への埋め込みを考えればよいですが、本章では操作と補題の定義域を明確にするため等次元に固定します。

## 2. LOCC：局所操作と古典通信

局所操作（local operation）には、各自のユニタリ操作だけでなく、[量子測定とその結果による状態更新](../QINF5/index.md#def-qinf5-instrument)が含まれます。古典通信（classical communication）は、測定結果の番号を相手へ伝え、相手がそれを使って次の操作を選ぶことです。通信では量子系を直接相手へ送らず、あらかじめ持っていないエンタングルメントを追加しません。

<a id="def-qinf14-locc"></a>

<!-- formal-statement-start -->
> **定義（有限ラウンドLOCC操作）**  
> 有限次元二部系 $H_A\otimes H_B$ に対し、**LOCC（局所操作と古典通信）**とは、有限段の分岐操作であり、各分岐ではAliceまたはBobの一方だけが局所的な量子計測（Kraus作用素 $M_j$ と $\sum_jM_j^\dagger M_j=I$）または局所ユニタリを実施し、出た古典的結果 $j$ を相手に伝え、過去の結果に応じて次の局所操作を選んでよいものをいう。各枝の最終状態を平均したものが出力状態である。
>
> 純粋状態 $|\psi\rangle$ から $|\phi\rangle$ への**決定論的LOCC変換**とは、確率0の枝を除き、すべての終端枝で正規化後の出力が $|\phi\rangle$（全体位相を除く）になるLOCCをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf14-locc -->
### 定義の確認：Bell対から積状態へ

**定義の確認**として、操作の完全性と全分岐の成功を直接調べます。

Aliceは計算基底で $M_0=|0\rangle\langle0|,M_1=|1\rangle\langle1|$ を測ります。$M_0^\dagger M_0+M_1^\dagger M_1=I$ だから合法な局所測定です。Bell対へ作用させると、結果0と1の非正規化枝はそれぞれ $|00\rangle/\sqrt2$ と $|11\rangle/\sqrt2$ で、確率はいずれも $1/2$。結果1ではAliceとBobが各々 $X$ を施し、結果0なら何もしません。両枝が $|00\rangle$ になるため、この変換は決定論的LOCCです。Aliceが送るのは測定結果を表す1古典ビットだけです。
<!-- definition-example-end -->

LOCCを単なる「局所ユニタリの積」と同一視しないことが大切です。[QINF6の局所ユニタリ不変性](../QINF6/index.md#prop-qinf6-local-unitary)により局所ユニタリはSchmidt係数を変えませんが、測定を伴うLOCCはSchmidt係数を変えられます。一方、測定の一つの成功枝だけを選んで他を捨てる**確率的成功**と、すべての枝を成功させる決定論的変換も区別します。

## 3. 係数の「ばらつき」を比べる：majorization

[Schmidt分解](../QINF6/index.md#thm-qinf6-existence)から、局所基底を選べば二部純粋状態を

$$
|\psi\rangle=\sum_{i=1}^d\sqrt{\lambda_i}\,|i\rangle_A|i\rangle_B,
\qquad \lambda_1\ge\cdots\ge\lambda_d\ge0,\quad \sum_i\lambda_i=1
$$

と書けます。$\lambda_i$ は**Schmidt係数そのものではなく、その二乗**です。[両側縮約の固有値一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)により、$\lambda$ は $\rho_A=\operatorname{Tr}_B|\psi\rangle\langle\psi|$ と $\rho_B$ の固有値列でもあります（零を含めて長さ $d$ に揃えます）。積状態なら $(1,0,\ldots,0)$、最大エンタングル純粋状態なら $(1/d,\ldots,1/d)$ です。

固有値の最大成分だけを比較しても三次元以上では不十分なので、「大きい方から $k$ 個を足す」というすべての部分和で比較します。

<a id="def-qinf14-majorization"></a>

<!-- formal-statement-start -->
> **定義（確率ベクトルの優越関係・majorization）**  
> $d$ 成分の非負ベクトル $x,y$ がそれぞれ総和1であるとする。成分を降順に並べたものを $x^\downarrow,y^\downarrow$ と書く。すべての $1\le k<d$ で

$$
\sum_{i=1}^k x_i^\downarrow\le\sum_{i=1}^k y_i^\downarrow
$$

> が成り立つとき、$x$ は $y$ に**majorizeされる**といい、$x\prec y$ と書く。$k=d$ は両辺とも1である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf14-majorization -->
### 定義の確認：二次元と三次元

**定義の確認**として、部分和と総和を各方向について照合します。

$x=(1/2,1/2)$、$y=(4/5,1/5)$ は共に非負で和1、降順です。$k=1$ について $1/2\le4/5$ なので $x\prec y$ ですが、逆向きの $y\prec x$ は成り立ちません。

三次元では $x=(1/2,2/5,1/10)$ と $y=(3/5,1/4,3/20)$ はともに降順で総和1です。第一部分和は $1/2\le3/5$、しかし第二部分和は $9/10>17/20$。したがって $x\not\prec y$ です。また第一部分和で $3/5>1/2$ なので $y\not\prec x$ も成立します。両方向とも成り立たない比較不能な組です。定義の条件は $k=1$ だけではありません。
<!-- definition-example-end -->

直観的には、全成分が $1/d$ の等確率ベクトルが最も「偏らず」、$(1,0,\ldots,0)$ が最も「偏って」います。純粋状態のもつれは偏らない方で大きく、したがってLOCC変換可能性の向きは $\lambda(\psi)\prec\lambda(\phi)$ となります。この方向を以下で証明します。

## 4. ベクトルの並べ替えによる橋渡し

ベクトルの並べ替えを線形作用素に直す準備をします。置換 $\pi$ が成分番号を並べ替えるとき、$P_\pi$ は $(P_\pi y)_i=y_{\pi(i)}$ と定める成分入替作用素です。これは各行・各列に1が一個だけある行列で表せます。また、$\sum_jp_j=1$ で $p_j\ge0$ の和 $\sum_jp_jP_{\pi_j}y$ を使って、置換ベクトルの確率付き混合を表します。

<a id="lem-qinf14-permutation-mixture"></a>

<!-- formal-statement-start -->
> **補題（majorizationと置換の確率混合）**  
> 非負で総和1の $d$ 成分ベクトル $x,y$ について、$x\prec y$ であることと、有限個の置換 $\pi_j$ と確率 $p_j$ が存在して

$$
x_i=\sum_jp_j\,y_{\pi_j(i)}\quad(i=1,\ldots,d),
\qquad p_j\ge0,\quad\sum_jp_j=1
$$

> と表せることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

置換ベクトルの平均なら上位部分和は増えません。逆向きは、すべての置換ベクトルが作る凸多面体の外側に $x$ があると仮定して、最も近い点の方向から矛盾を導きます。必要な道具は有限次元の内積、成分の並べ替え、部分和だけです。

<!-- proof-start -->
### 証明

まず $x=\sum_jp_jP_{\pi_j}y$ であれば、$k$ 成分の最大部分和を $S_k(v)=\max_{|I|=k}\sum_{i\in I}v_i$ と書いて

$$
S_k(x)=\max_{|I|=k}\sum_jp_j\sum_{i\in I}(P_{\pi_j}y)_i
\le\sum_jp_jS_k(P_{\pi_j}y)=S_k(y).
$$

よって $x\prec y$ です。

逆に $x\prec y$ とします。$C=\{\sum_jp_jP_{\pi_j}y:p_j\ge0,\sum_jp_j=1\}$ は有限個の置換ベクトルを確率付きで混合した集合です。係数全体が閉有界な単体上を動く連続像なので $C$ も閉有界で空ではありません。$x\notin C$ と仮定すれば、距離が最小の $z\in C$ をとれます。$w=x-z\ne0$ とし、任意の $u\in C$ について $z+t(u-z)\in C$（$0\le t\le1$）を使います。距離二乗

$$
\|x-z-t(u-z)\|^2=\|w\|^2-2t\,w\cdot(u-z)+t^2\|u-z\|^2
$$

が $t=0$ で最小なので $w\cdot(u-z)\le0$。したがって

$$
w\cdot x=w\cdot z+\|w\|^2>\max_{u\in C}w\cdot u
=\max_\pi w\cdot P_\pi y.
$$

一方、任意の実数ベクトル $w$ に対し成分の交換を繰り返せば、降順に並んだ内積が最大となります（$a\ge b,c\ge d$ なら $ac+bd-(ad+bc)=(a-b)(c-d)\ge0$）。従って $w\cdot x\le\sum_iw_i^\downarrow x_i^\downarrow$ です。部分和差を $D_k=\sum_{i=1}^k(x_i^\downarrow-y_i^\downarrow)$ と置けば $D_k\le0$（$k<d$）、$D_d=0$ なので、和の差分変形から

$$
\sum_iw_i^\downarrow(x_i^\downarrow-y_i^\downarrow)
=\sum_{k=1}^{d-1}(w_k^\downarrow-w_{k+1}^\downarrow)D_k\le0.
$$

以上より $w\cdot x\le\sum_iw_i^\downarrow y_i^\downarrow=\max_\pi w\cdot P_\pi y$ となり、直前の厳密な不等号と矛盾します。よって $x\in C$ であり、有限個の置換の確率付き混合が存在します。$\square$
<!-- proof-end -->

この補題は単なる抽象的な表示ではありません。$x$ を入力のSchmidt確率、$y$ を目標のSchmidt確率とすると、混合の重み $p_j$ が測定結果の確率になり、置換 $\pi_j$ が結果ごとの局所補正を指定します。

## 5. LOCCで増えない量：小さい固有値の和

大きい固有値を足す代わりに、小さい固有値 $k$ 個の和を使うと測定との相性がよくなります。密度行列 $\rho$ の固有値を降順 $r_1\ge\cdots\ge r_d$ として、$E_k(\rho)=r_{d-k+1}+\cdots+r_d$（$1\le k<d$）と定めます。これは $\sum_{i=1}^{d-k}r_i=1-E_k(\rho)$ と同じ情報を持ちます。

<a id="lem-qinf14-tail-concavity"></a>

<!-- formal-statement-start -->
> **補題（小さい固有値の和の凹性）**  
> $d$ 次元の密度行列 $\rho_j$ と確率 $p_j$ に対し、$1\le k<d$ なら

$$
E_k\!\left(\sum_jp_j\rho_j\right)\ge\sum_jp_jE_k(\rho_j).
$$

> 特に、二部純粋状態について片側だけが局所測定した場合、測定前のSchmidt確率の小さい方から $k$ 個の和は、各結果の確率で平均した測定後の同じ和以上となる。
<!-- formal-statement-end -->

### 証明の見取り図

小さい固有値の和は、$k$ 次元の部分空間に状態を制限したときのトレースの最小値です。一方が測定して結果を忘れたとき、**他方の縮約状態の平均は変わらない**ことを利用します。

<!-- proof-start -->
### 証明

固有基底を $|e_i\rangle$ とし、rank $k$ の直交射影 $P$ に対して

$$
\operatorname{Tr}(P\rho)=\sum_{i=1}^d r_i\langle e_i|P|e_i\rangle.
$$

係数 $a_i=\langle e_i|P|e_i\rangle$ は $0\le a_i\le1$、$\sum_i a_i=k$ です。この条件下の最小値は、$k$ 個の最小固有値の係数を1にすることで得られます（大きい $r_i$ に重みがあれば小さい $r_l$ の側へ移せば値は増えません）。その選択は実際に最小固有値の固有空間への射影として実現します。ゆえに

$$
E_k(\rho)=\min_{P^2=P=P^\dagger,\,\operatorname{rank}P=k}\operatorname{Tr}(P\rho).
$$

これを $\rho=\sum_jp_j\rho_j$ に適用すると、各 $P$ について $\sum_jp_j\operatorname{Tr}(P\rho_j)\ge\sum_jp_jE_k(\rho_j)$ です。左辺の $P$ に関する最小値をとれば前半の凹性を得ます。

次にAliceだけが $\{M_j\}$ を測定し、結果 $j$ の確率を $p_j$、正規化した二部純粋状態を $|\psi_j\rangle$ とします。Bobの縮約状態を $\rho_B^j$ とすると、完全性 $\sum_jM_j^\dagger M_j=I_A$ と[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)から、Bobの任意の演算子 $T_B$ に対し

$$
\begin{aligned}
\operatorname{Tr}\left(T_B\sum_jp_j\rho_B^j\right)
&=\sum_j\langle\psi|(M_j^\dagger M_j\otimes T_B)|\psi\rangle\\
&=\langle\psi|(I_A\otimes T_B)|\psi\rangle
=\operatorname{Tr}(T_B\rho_B).
\end{aligned}
$$

よって $\rho_B=\sum_jp_j\rho_B^j$。凹性を適用し、各枝の[縮約状態のSchmidt固有値一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)を使えば主張が従います。Bobが測定する場合はAliceの縮約に同じ計算を行います。局所ユニタリの場合は[Schmidt係数の不変性](../QINF6/index.md#prop-qinf6-local-unitary)より等号です。$\square$
<!-- proof-end -->

この補題は**測定結果を平均した不等式**です。単一の幸運な枝でのSchmidt確率がより一様になることまで禁止してはいません。決定論的な変換では全枝が同じ目標へ至るため、平均不等式が強い制約になります。

## 6. 変換可能性の必要十分条件

ここまでの二つの補題を結合します。状態は局所ユニタリでSchmidt基底へ移せるので、証明では入力と目標をそれぞれ標準の対角Schmidt表示に直して考えます。

<a id="thm-qinf14-nielsen"></a>

<!-- formal-statement-start -->
> **定理（Nielsenの決定論的LOCC変換条件）**  
> $H_A\cong H_B\cong\mathbb C^d$ の正規化された二部純粋状態 $|\psi\rangle$ と $|\phi\rangle$ のSchmidt係数の二乗を、それぞれ降順の確率ベクトル $\lambda(\psi),\lambda(\phi)$ とする。このとき、有限ラウンドLOCCによる $|\psi\rangle\to|\phi\rangle$ の決定論的変換が可能であるための必要十分条件は

$$
\boxed{\lambda(\psi)\prec\lambda(\phi)}
$$

> である。条件が成り立つときは、Aliceの一回の測定、測定結果の古典通信、AliceとBobの結果依存局所ユニタリによって実現できる。
<!-- formal-statement-end -->

### 証明の見取り図

**必要性**：各局所測定で、Schmidt確率の小さい側の部分和の期待値は増えません。有限段の操作を順にたどると、最初と最後の部分和を比較できます。

**十分性**：[majorizationと置換の確率混合](#lem-qinf14-permutation-mixture)の重みをAliceの測定確率に使います。測定後のSchmidt確率は目標の並べ替えになり、結果に応じて両者が同じ置換を施せば一致します。

<!-- proof-start -->
### 証明

**必要性**。$1\le k<d$ を固定します。LOCCの各測定ノードでは、[小さい固有値の和の凹性](#lem-qinf14-tail-concavity)により、親ノードの $E_k$ は子ノードの確率付き平均以上です。古典メッセージに応じて次の局所操作を選ぶ場合にも、この不等式は各親ノードで条件付きに成立します。全ノードの不等式を上段から順に確率で重み付けして足し合わせれば、中間の項が打ち消され、入力の $E_k$ は終端ノードの平均以上になります。決定論的変換では確率正のすべての終端が $|\phi\rangle$ なので

$$
\sum_{i=d-k+1}^d\lambda_i(\psi)
\ge\sum_{i=d-k+1}^d\lambda_i(\phi).
$$

両方とも総和1だから、$l=d-k$ と置き換えると $\sum_{i=1}^l\lambda_i(\psi)\le\sum_{i=1}^l\lambda_i(\phi)$（$1\le l<d$）。従って $\lambda(\psi)\prec\lambda(\phi)$ です。

**十分性**。$\lambda=\lambda(\psi)$、$\mu=\lambda(\phi)$ とします。Schmidt基底を局所ユニタリで標準基底へ直すと

$$
|\psi\rangle=\sum_i\sqrt{\lambda_i}|ii\rangle,
\qquad|\phi\rangle=\sum_i\sqrt{\mu_i}|ii\rangle.
$$

仮定 $\lambda\prec\mu$ と[majorizationと置換の確率混合](#lem-qinf14-permutation-mixture)から、$\lambda_i=\sum_jp_j\mu_{\pi_j(i)}$ と表せます。$p_j=0$ の項は捨てます。$S=\{i:\lambda_i>0\}$ を入力の台とします。$i\notin S$ のとき、非負項の和 $0=\sum_jp_j\mu_{\pi_j(i)}$ なので、残るすべての $j$ で $\mu_{\pi_j(i)}=0$ です。

AliceのSchmidt基底で、測定作用素を次で構成します（零で割ることを避けるため $i\in S$ だけに係数を定めます）。

$$
M_j=\sum_{i\in S}\sqrt{\frac{p_j\mu_{\pi_j(i)}}{\lambda_i}}|i\rangle\langle i|,
\qquad M_\perp=\sum_{i\notin S}|i\rangle\langle i|.
$$

各係数は非負の実数で、$i\in S$ では

$$
\sum_j\frac{p_j\mu_{\pi_j(i)}}{\lambda_i}=1.
$$

よって $\sum_jM_j^\dagger M_j+M_\perp^\dagger M_\perp=I$ となり、[一般化測定の完全性](../QINF5/index.md#def-qinf5-instrument)を満たします。$M_\perp$ の結果は入力上で確率0です。その他の結果 $j$ では

$$
(M_j\otimes I)|\psi\rangle
=\sqrt{p_j}\sum_{i\in S}\sqrt{\mu_{\pi_j(i)}}|ii\rangle.
$$

ノルム二乗は $p_j\sum_i\mu_{\pi_j(i)}=p_j$。Aliceは $j$ をBobへ伝え、両者が $U_j|i\rangle=|\pi_j(i)\rangle$ を施します。置換は全単射なので $U_j$ はユニタリ、しかも

$$
(U_j\otimes U_j)(M_j\otimes I)|\psi\rangle
=\sqrt{p_j}\sum_i\sqrt{\mu_{\pi_j(i)}}|\pi_j(i),\pi_j(i)\rangle
=\sqrt{p_j}|\phi\rangle.
$$

各正確率枝を正規化すれば同じ $|\phi\rangle$ になります。最初と最後のSchmidt基底へ戻す局所ユニタリも許されるため、任意の $|\psi\rangle,|\phi\rangle$ に対して一回の測定による決定論的LOCCを得ました。$\square$
<!-- proof-end -->

証明が成立する範囲は、**有限次元、純粋な入力・目標、決定論的なLOCC** です。混合状態の変換には一般にこの条件をそのまま使えません。また、追加のエンタングル状態を借りて最後に返す触媒変換まで許すと、元の二状態だけの判定とは別問題になります。

## 7. 二qubitで操作を実際に作る

入力 $|\psi\rangle=\sqrt{3/5}|00\rangle+\sqrt{2/5}|11\rangle$、目標 $|\phi\rangle=\sqrt{4/5}|00\rangle+\sqrt{1/5}|11\rangle$ とします。第一成分について $3/5\le4/5$ なので $\lambda\prec\mu$ です。置換を「そのまま」と「0・1の交換」の二つにすると

$$
\begin{pmatrix}3/5\\2/5\end{pmatrix}
=\frac23\begin{pmatrix}4/5\\1/5\end{pmatrix}
+\frac13\begin{pmatrix}1/5\\4/5\end{pmatrix}.
$$

したがって[定理の測定構成](#thm-qinf14-nielsen)へ代入した二結果のKraus作用素は

$$
M_0=\begin{pmatrix}\sqrt{8/9}&0\\0&\sqrt{1/3}\end{pmatrix},
\qquad M_1=\begin{pmatrix}1/3&0\\0&\sqrt{2/3}\end{pmatrix}.
$$

両者は $M_0^\dagger M_0+M_1^\dagger M_1=\operatorname{diag}(8/9+1/9,1/3+2/3)=I$ を満たします。出力の非正規化枝は

$$
\begin{aligned}
(M_0\otimes I)|\psi\rangle&=\sqrt{\frac23}\left(\sqrt{\frac45}|00\rangle+\sqrt{\frac15}|11\rangle\right),\\
(M_1\otimes I)|\psi\rangle&=\sqrt{\frac13}\left(\sqrt{\frac15}|00\rangle+\sqrt{\frac45}|11\rangle\right).
\end{aligned}
$$

確率は $2/3,1/3$。結果0なら何もせず、結果1なら両者が $X$ を施せば、どちらも $|\phi\rangle$ です。これは単なる存在証明でなく、手元で実行できる変換手順です。

反対向き $|\phi\rangle\to|\psi\rangle$ は、Schmidt確率の第一部分和が $4/5>3/5$ で定理の必要条件に反します。どんなに古典通信を往復しても、決定論的LOCCだけで逆変換はできません。

## 8. 読み方の整理

- 最大エンタングル状態の一様なSchmidt確率は、あらゆる $d$ 成分確率ベクトルにmajorizeされるので、局所測定と古典通信で任意の二部純粋状態へ変換できます。
- 積状態のSchmidt確率 $(1,0,\ldots,0)$ は他の非積状態の確率ベクトルにmajorizeされないため、LOCCだけで純粋エンタングル状態を作れません。
- 局所ユニタリだけでの相互変換は、[Schmidt係数の不変性](../QINF6/index.md#prop-qinf6-local-unitary)から同じSchmidt確率を要します。LOCCでは一方向の変換が新たに可能です。
- 三次元以上では、二つのSchmidt確率がmajorizationで比較不能な場合があります。「もつれの大小」を一個の数で完全に並べられるとは限りません。

## 9. 演習（全問に詳細解答）

<a id="ex-qinf14-a01"></a>
### QINF14-A01 LOCC測定の分岐を追う

- Level: A

AliceとBobの共有状態を $|\psi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ とする。Aliceが $M_0=|0\rangle\langle0|,M_1=|1\rangle\langle1|$ を測定する。Kraus完全性、分岐確率、結果に応じて $|00\rangle$ を必ず出力する局所補正を求めよ。

<!-- solution-start -->
### 詳細解答

$M_0^\dagger M_0+M_1^\dagger M_1=|0\rangle\langle0|+|1\rangle\langle1|=I$ です。[局所計測の定義](#def-qinf14-locc)の条件を満たします。分岐は

$$
(M_0\otimes I)|\psi\rangle=|00\rangle/\sqrt2,\qquad
(M_1\otimes I)|\psi\rangle=|11\rangle/\sqrt2.
$$

両枝のノルム二乗は $1/2$。結果0なら恒等操作、結果1なら両者が $X$ を作用させ、$X\otimes X|11\rangle=|00\rangle$ とします。すべての正確率枝で同じ出力だから決定論的です。
<!-- solution-end -->

<a id="ex-qinf14-a02"></a>
### QINF14-A02 二成分のmajorization判定

- Level: A

二qubit純粋状態のSchmidt確率 $x=(3/10,7/10)$、$y=(9/10,1/10)$ を考える。$x\prec y$ または $y\prec x$ を定義から判定し、可能な決定論的LOCCの向きを示せ。

<!-- solution-start -->
### 詳細解答

まず降順に並べて $x^\downarrow=(7/10,3/10)$、$y^\downarrow=(9/10,1/10)$ です。どちらも非負で和1、$d=2$ なので調べるのは $k=1$ のみです。$7/10\le9/10$ より $x\prec y$、一方 $9/10\le7/10$ は偽。したがって[Nielsenの決定論的LOCC変換条件](#thm-qinf14-nielsen)から $x$ の状態から $y$ の状態へは可能で、逆向きは不可能です。
<!-- solution-end -->

<a id="ex-qinf14-a03"></a>
### QINF14-A03 縮約固有値と小さい側の和

- Level: A

$H_A=H_B=\mathbb C^3$ とし、$|\psi\rangle=(\sqrt6|00\rangle+\sqrt3|11\rangle+|22\rangle)/\sqrt{10}$ とする。$\rho_B$ の固有値、$E_1(\rho_B)$、$E_2(\rho_B)$ を求めよ。

<!-- solution-start -->
### 詳細解答

係数の二乗和は $(6+3+1)/10=1$ で、各 $|ii\rangle$ の左右の基底が正規直交なので[Schmidt表示の定義](../QINF6/index.md#def-qinf6-schmidt)を満たします。$A$ を部分トレースすると交差項 $|i\rangle\langle j|_A$ のトレースは $\delta_{ij}$ で消え、

$$
\rho_B=\frac6{10}|0\rangle\langle0|+\frac3{10}|1\rangle\langle1|+\frac1{10}|2\rangle\langle2|.
$$

固有値は降順に $(6/10,3/10,1/10)$。最小一個は $E_1=1/10$、最小二個は $E_2=(3+1)/10=2/5$ です。
<!-- solution-end -->

<a id="ex-qinf14-a04"></a>
### QINF14-A04 置換混合から確率を解く

- Level: A

$\mu=(3/4,1/4)$ とその交換 $\mu'=(1/4,3/4)$ を確率 $p,1-p$ で混合して $\lambda=(1/2,1/2)$ を得たい。$p$ を求め、$\lambda\prec\mu$ を定義から確認せよ。

<!-- solution-start -->
### 詳細解答

第一成分の等式は $1/2=3p/4+(1-p)/4=(1+2p)/4$ であり、$p=1/2$。第二成分は $p/4+3(1-p)/4=1/2$ で一致します。$\lambda=(1/2,1/2)$ と $\mu=(3/4,1/4)$ は降順で、$k=1$ は $1/2\le3/4$、総和はそれぞれ1。よって[majorizationの定義](#def-qinf14-majorization)を満たします。この確率付き混合は[majorizationと置換の確率混合](#lem-qinf14-permutation-mixture)の具体例です。
<!-- solution-end -->

<a id="ex-qinf14-a05"></a>
### QINF14-A05 局所操作を平均した状態

- Level: A

Bell対にAliceがA01の測定をしたあと、結果をBobへ送らずに捨てたとする。Bobの平均縮約状態を求め、測定前と比較せよ。

<!-- solution-start -->
### 詳細解答

A01で得た二枝はそれぞれ確率 $1/2$ で $|00\rangle,|11\rangle$ です。Bob側の縮約は $|0\rangle\langle0|,|1\rangle\langle1|$ なので、結果を捨てた状態は

$$
\rho_B'=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|=I_2/2.
$$

測定前も[Schmidt縮約固有値](../QINF6/index.md#thm-qinf6-reduced-spectrum)が $(1/2,1/2)$ で $\rho_B=I_2/2$ です。測定結果を知らないBobの局所状態は変わらず、[小さい固有値の和の凹性](#lem-qinf14-tail-concavity)の証明で使った非シグナリング性が直接見えます。
<!-- solution-end -->

<a id="ex-qinf14-b01"></a>
### QINF14-B01 三次元の比較不能性

- Level: B

二つの $3\times3$ 二部純粋状態 $|\psi\rangle,|\phi\rangle$ のSchmidt確率がそれぞれ $\lambda=(1/2,2/5,1/10)$、$\mu=(3/5,1/4,3/20)$ である。いずれも降順で総和1であることを確認した上で、両方向の決定論的LOCCが不可能なことを示せ。また、単なる最大固有値の比較がなぜ不十分か述べよ。

<!-- solution-start -->
### 詳細解答

$\lambda$ の和は $5/10+4/10+1/10=1$、$\mu$ の和は $12/20+5/20+3/20=1$ で非負かつ降順です。$\lambda\prec\mu$ を調べると $k=1$ は $1/2\le3/5$ と成立しますが、$k=2$ は

$$
\lambda_1+\lambda_2=\frac9{10}=\frac{18}{20}
>\frac{17}{20}=\mu_1+\mu_2
$$

となるため失敗します。逆の $\mu\prec\lambda$ は $k=1$ で $3/5>1/2$ だから失敗します。[Nielsenの必要十分条件](#thm-qinf14-nielsen)より両向きとも不可能です。最大固有値だけを見ると最初の向きの $k=1$ 条件は通りますが、小さい固有値の和（この場合 $k=2$ と同値）で障害が見つかります。
<!-- solution-end -->

<a id="ex-qinf14-b02"></a>
### QINF14-B02 二結果測定を自力で設計する

- Level: B

入力 $\sqrt{2/3}|00\rangle+\sqrt{1/3}|11\rangle$ を、目標 $\sqrt{5/6}|00\rangle+\sqrt{1/6}|11\rangle$ へ決定論的LOCCで変換したい。置換の二項混合確率を求め、Aliceの対角Kraus作用素二つを作り、完全性・分岐確率・局所補正を検算せよ。

<!-- solution-start -->
### 詳細解答

$\lambda=(2/3,1/3)$、$\mu=(5/6,1/6)$ であり $2/3\le5/6$ です。第一成分を $2/3=p(5/6)+(1-p)(1/6)$ と置くと $4=5p+1-p$（両辺を6倍）なので $p=3/4$ です。したがって

$$
\lambda=\frac34\mu+\frac14(1/6,5/6).
$$

[Nielsenの決定論的LOCC変換条件](#thm-qinf14-nielsen)の測定構成に代入すると

$$
M_0=\operatorname{diag}\!\left(\sqrt{\frac{15}{16}},\sqrt{\frac38}\right),
\quad
M_1=\operatorname{diag}\!\left(\frac14,\sqrt{\frac58}\right).
$$

実際に $\frac{15}{16}+\frac1{16}=1$ と $\frac38+\frac58=1$ なのでKraus完全性が成立します。入力へ作用させると

$$
\begin{aligned}
(M_0\otimes I)|\psi\rangle&=\sqrt{\frac34}\left(\sqrt{\frac56}|00\rangle+\sqrt{\frac16}|11\rangle\right),\\
(M_1\otimes I)|\psi\rangle&=\sqrt{\frac14}\left(\sqrt{\frac16}|00\rangle+\sqrt{\frac56}|11\rangle\right).
\end{aligned}
$$

各括弧はノルム1なので確率は $3/4,1/4$。結果0では何もせず、結果1を受けたらAliceとBobがともに $X$ を施すと、どちらの枝も目標になります。
<!-- solution-end -->

<a id="ex-qinf14-b03"></a>
### QINF14-B03 零のSchmidt係数を含む構成

- Level: B

$d=3$ の入力 $|\psi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ と目標 $|\phi\rangle=|00\rangle$ について、$\lambda=(1/2,1/2,0)$、$\mu=(1,0,0)$ から置換混合表示を作り、零成分でも合法なAliceのKraus測定と補正を明示せよ。

<!-- solution-start -->
### 詳細解答

$\lambda=\frac12(1,0,0)+\frac12(0,1,0)$ です。後者は $\mu$ の最初の二成分を交換したものなので[置換混合補題](#lem-qinf14-permutation-mixture)に適合します。入力の第三成分は0だから分母 $\lambda_3$ で割ってはいけません。入力の台にのみ定義した

$$
M_0=|0\rangle\langle0|,\qquad
M_1=|1\rangle\langle1|,\qquad
M_\perp=|2\rangle\langle2|
$$

をAliceが測定します。三つの $M_j^\dagger M_j$ の和は $I_3$、$M_\perp$ の分岐確率は0です。残る二枝は $|00\rangle/\sqrt2$、$|11\rangle/\sqrt2$。前者の補正は $I$、後者の補正は両者の0と1を入れ替え、2を固定するユニタリです。すべての正確率枝で $|00\rangle$ を得ます。
<!-- solution-end -->

<a id="ex-qinf14-b04"></a>
### QINF14-B04 固有値の凹性を測定に適用する

- Level: B

$d=2$ でAliceが局所測定した後、確率 $1/3,2/3$ で純粋な二部状態へ分岐し、Bobの縮約状態の固有値がそれぞれ $(1,0)$、$(3/4,1/4)$ であったとする。測定前のSchmidt確率が $(3/5,2/5)$ であり得るか。$E_1$ を使って判定し、個々の枝が決定論的変換を意味しない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

入力の小さい固有値は $E_1(\rho_B)=2/5$。各枝ではそれぞれ $E_1=0,1/4$ だから分岐平均は

$$
\frac13\cdot0+\frac23\cdot\frac14=\frac16.
$$

[小さい固有値の凹性](#lem-qinf14-tail-concavity)が要求する $2/5\ge1/6$ は成立し、少なくともこの単調量からは矛盾しません。ただし、条件を満たすことは**この枝構成自体の実現を保証しません**。各枝のSchmidt確率が異なっているため、後続の補正も指定されない限りすべての枝を一つの目標へ変換したとはいえず、決定論的変換の定義とは区別すべきです。
<!-- solution-end -->

<a id="ex-qinf14-c01"></a>
### QINF14-C01 任意の二qubit変換と逆向きの障害

- Level: C

実数 $1/2\le a\le b\le1$ に対し、AliceとBobは

$$
|\psi_a\rangle=\sqrt a|00\rangle+\sqrt{1-a}|11\rangle,
\quad |\phi_b\rangle=\sqrt b|00\rangle+\sqrt{1-b}|11\rangle
$$

を考える。**（1）** 決定論的LOCCで前者から後者へ変換できることを判定せよ。**（2）** $b>1/2$ では、恒等と交換の置換混合から確率とAliceの二結果Kraus作用素を導出し、各分岐を補正せよ。**（3）** $b=1/2$ と $a=b=1$ の端点を説明せよ。**（4）** $a<b$ のとき逆方向の変換が不可能な理由を必要条件から述べよ。

<!-- solution-start -->
### 詳細解答

**（1）** 入力と目標のSchmidt確率は降順で $\lambda=(a,1-a)$ と $\mu=(b,1-b)$ です。$a\le b$ なので[majorizationの定義](#def-qinf14-majorization)の唯一の非自明な部分和条件が成立します。[Nielsenの決定論的LOCC変換条件](#thm-qinf14-nielsen)により決定論的LOCCが存在します。

**（2）** $b>1/2$ なら $2b-1>0$ です。混合

$$
(a,1-a)=p(b,1-b)+(1-p)(1-b,b)
$$

の第一成分から $a=pb+(1-p)(1-b)=1-b+p(2b-1)$、ゆえに

$$
p=\frac{a+b-1}{2b-1},\qquad
1-p=\frac{b-a}{2b-1}.
$$

$a\ge1/2$ と $a\le b$ より $a+b-1\ge0$ と $b-a\ge0$、従って $0\le p\le1$ です。$a<1$ の場合 $a,1-a$ は正なのでAliceは

$$
M_0=\operatorname{diag}\!\left(\sqrt{\frac{pb}{a}},\sqrt{\frac{p(1-b)}{1-a}}\right),
\qquad
M_1=\operatorname{diag}\!\left(\sqrt{\frac{(1-p)(1-b)}a},\sqrt{\frac{(1-p)b}{1-a}}\right)
$$

を使えます。第一対角成分の二乗和は $[pb+(1-p)(1-b)]/a=1$、第二成分の二乗和も $[p(1-b)+(1-p)b]/(1-a)=1$ なので測定は完全です。結果0の非正規化状態は $\sqrt p|\phi_b\rangle$、結果1のものは $\sqrt{1-p}(\sqrt{1-b}|00\rangle+\sqrt b|11\rangle)$。後者だけ両者が $X$ を施せば正規化後の目標に一致します。確率0の結果は実行されません。

**（3）** $b=1/2$ なら $a=1/2$ しか許されず、入力と目標は同じBell対なので恒等操作で十分です。この場合は混合式の分母 $2b-1=0$ を使いません。また $a=b=1$ は入力と目標がともに $|00\rangle$ で、恒等操作です。$a=1$ かつ $a\le b\le1$ なら必ずこの場合となるので、$1-a=0$ による除算も不要です。

**（4）** $a<b$ なら逆変換 $\mu\prec\lambda$ の $k=1$ 条件は $b\le a$ を要求して矛盾します。[Nielsenの決定論的LOCC変換条件](#thm-qinf14-nielsen)の必要性に反するため、測定の回数や古典通信の往復を増やしても逆向きの決定論的LOCCは不可能です。
<!-- solution-end -->

