# SP9 最大不等式・上向き横断・マルチンゲール収束

[SP8 の停止と任意抽出](../SP8/index.md#prop-sp8-stopped-drift)では、止めた時点の平均を比較しました。しかし「途中で一度でも大きく負ける確率」「上下に振れ続ける可能性」は、最終時点の平均を知るだけでは分かりません。そこで、**最初の到達を停止時刻にする**、**横断を予測可能な売買として数える**という二つの道具を使います。最後に、標本路の収束と期待値の収束を分けて考えます。

[STO2 の最大不等式](../../STO/STO2/index.md#thm-sto2-doob-maximal)・[上向き横断不等式](../../STO/STO2/index.md#thm-sto2-upcrossing)・[概収束定理](../../STO/STO2/index.md#thm-sto2-submartingale-convergence)・[一様可積分マルチンゲール収束定理](../../STO/STO2/index.md#thm-sto2-ui-martingale-convergence)は既習です。本章ではこれらの正本を参照しながら、停止時刻・取引戦略・極限交換の中間計算を再構成し、二乗平均に関する帰結を導きます。

以下、$(\Omega,\mathcal F,P)$ は確率空間、$(\mathcal F_n)_{n\ge0}$ はフィルトレーション、過程は実数値・適合、$X_n$ は各 $n$ で可積分とします。$x^+=\max(x,0)$、$x^-=\max(-x,0)$、$X^*_n=\max_{0\le k\le n}|X_k|$ と書きます。「概確実」は確率 $1$ の意味です。

## 1. 最終値から途中の最大値をどう抑えるか

劣マルチンゲールの時刻 $n$ の平均は増加しますが、単純に各 $k$ へ Markov の不等式を当てると $n+1$ 個の上界を足すことになります。一方、最大値が初めて水準 $\lambda$ を超えた瞬間に止めれば、途中の事象を一つにまとめられます。

[Doob 最大不等式](../../STO/STO2/index.md#thm-sto2-doob-maximal)の結論は、劣マルチンゲール $X_0,\ldots,X_n$ と $\lambda>0$ について

$$
\lambda P\left(\max_{0\le k\le n}X_k\ge\lambda\right)\le E[X_n^+]
$$

です。$X$ が負値を取ってもよく、**絶対値の最大**を直接この式の $X$ に代入できるわけではありません。

### 到達時刻を使う計算を再現する

$A=\{\max_{0\le k\le n}X_k\ge\lambda\}$ とし、最初の到達時刻を

$$
\tau=\inf\{k\ge0:X_k\ge\lambda\},\qquad \sigma=\tau\wedge n
$$

とします。$\{\tau\le m\}=\bigcup_{k=0}^m\{X_k\ge\lambda\}\in\mathcal F_m$ なので $\tau$ は停止時刻です。また $A\in\mathcal F_\sigma$ です。実際、$m<n$ なら $A\cap\{\sigma\le m\}=\{\tau\le m\}\in\mathcal F_m$、$m\ge n$ なら $A\in\mathcal F_n\subseteq\mathcal F_m$ です。

[有界任意抽出定理](../../STO/STO2/index.md#thm-sto2-bounded-optional-sampling)を $\sigma\le n$ に使うと、条件付き不等式

$$
E[X_n\mid\mathcal F_\sigma]\ge X_\sigma
$$

を得ます。$A$ は停止時刻までの情報で判定可能なので、両辺に $1_A$ を掛けて平均を取れます。

$$
E[1_AX_n]\ge E[1_AX_\sigma]
=E[1_AX_\tau]\ge\lambda P(A).
$$

ここで最後の評価は $A$ 上で $X_\tau\ge\lambda$ だからです。反対側は $1_AX_n\le X_n^+$ より $E[1_AX_n]\le E[X_n^+]$。両側を合わせると元の最大不等式が得られます。**停止時刻までの情報を確認する行**が、証明の要です。

### 絶対値への適用

$M$ が可積分マルチンゲールなら、条件付き期待値の Jensen の不等式から

$$
E[|M_{k+1}|\mid\mathcal F_k]
\ge |E[M_{k+1}\mid\mathcal F_k]|=|M_k|.
$$

したがって $|M|$ は非負の劣マルチンゲールです。今度はそのまま最大不等式を適用でき、

$$
P\left(\max_{0\le k\le n}|M_k|\ge\lambda\right)
\le\frac{E|M_n|}{\lambda}
$$

を得ます。正負どちらへ大きく逸脱しても一度に評価できる点が便利です。

## 2. 二乗平均があれば最大値の二乗平均も抑えられる

最大値の *確率* を抑えた後、**最大値の二乗期待値**まで評価したいことがあります。二乗可積分マルチンゲールとは、マルチンゲール $M$ で各 $E[M_n^2]<\infty$ であるものです。たとえば公平な独立 $\pm1$ コインの和 $S_n$ は、[SP7 の二乗平均計算](../SP7/index.md#prop-sp7-square-compensation)から $E[S_n^2]=n$ を満たします。

次は [Doob 最大不等式](../../STO/STO2/index.md#thm-sto2-doob-maximal)から導く、二乗平均版です。

<a id="prop-sp9-l2-maximal"></a>

<!-- formal-statement-start -->
> **命題（有限時間の最大値の二乗平均評価）**  
> $M=(M_k)_{k=0}^n$ を実数値二乗可積分マルチンゲールとする。このとき

$$
E\left[\max_{0\le k\le n}|M_k|^2\right]\le4E[M_n^2].
$$

> 特に任意の $\lambda>0$ について

$$
P\left(\max_{0\le k\le n}|M_k|\ge\lambda\right)
\le\frac{4E[M_n^2]}{\lambda^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$Z_k=|M_k|$ は非負劣マルチンゲールです。最大不等式の証明を少し精密化し、到達事象 $A_\lambda=\{\max Z_k\ge\lambda\}$ 上の終端値だけを使って $\lambda P(A_\lambda)\le E[Z_n1_{A_\lambda}]$ とします。この両辺を水準 $\lambda$ について積分し、Cauchy–Schwarz の不等式を使います。

<!-- proof-start -->
### 証明

$Z^*=\max_{0\le k\le n}Z_k$ とします。上節の停止時刻の計算から、任意の $\lambda>0$ について

$$
\lambda P(Z^*\ge\lambda)\le E[Z_n1_{\{Z^*\ge\lambda\}}]
$$

です。各 $Z_k$ は $L^2$ に属し、有限個の最大値も二乗可積分です。実際、

$$
(Z^*)^2\le\sum_{k=0}^n Z_k^2,\qquad
E[(Z^*)^2]\le\sum_{k=0}^nE[Z_k^2]<\infty.
$$

非負関数の積分順序交換と $z^2=\int_0^z2\lambda\,d\lambda$ を用いると、

$$
\begin{aligned}
E[(Z^*)^2]
&=\int_0^\infty2\lambda P(Z^*\ge\lambda)\,d\lambda\\
&\le2\int_0^\infty E[Z_n1_{\{Z^*\ge\lambda\}}]\,d\lambda\\
&=2E\left[Z_n\int_0^{Z^*}d\lambda\right]
=2E[Z_nZ^*].
\end{aligned}
$$

Cauchy–Schwarz の不等式から

$$
E[(Z^*)^2]\le
2\sqrt{E[Z_n^2]}\sqrt{E[(Z^*)^2]}.
$$

もし $E[(Z^*)^2]=0$ なら結論は自明です。そうでなければその平方根で両辺を割り、二乗して

$$
E[(Z^*)^2]\le4E[Z_n^2]=4E[M_n^2]
$$

を得ます。最後に非負変数 $(Z^*)^2$ へ Markov の不等式を適用すれば確率の評価も従います。
<!-- proof-end -->

**具体例。** 独立公平コインの歩行 $S_n=\sum_{k=1}^n\xi_k$ では、[マルチンゲール差分の二乗平均恒等式](../SP7/index.md#thm-sp7-predictable-isometry)を係数 $H_k=1$ に適用して

$$
E[S_n^2]=\sum_{k=1}^nE[\xi_k^2]=n.
$$

よって $P(\max_{k\le n}|S_k|\ge\lambda)\le4n/\lambda^2$ です。これは一般的な上界であり、右辺が $1$ を超えるときは確率の自明な上界 $1$ と併用します。

## 3. 最大値ではなく「何度も振れ続ける」を数える

大きな値に一度到達するかと、二つの水準の間を無限回往復するかは違う問いです。収束しない標本路を捉えるには後者が重要です。

[上向き横断回数の定義](../../STO/STO2/index.md#def-sto2-upcrossing)を再確認します。実数列 $x_0,\ldots,x_n$ と $a<b$ について、$a$ 以下の時刻のあとで $b$ 以上の時刻が来たら一回の上向き横断が完成します。さらに次の横断を数えるには、いったん $a$ 以下へ戻る必要があります。完成できる最大回数を $U_n[a,b]$ と書きます。

例えば標本路 $0,2,1,3,0,2$ と区間 $[1,2]$ では、時刻対 $(0,1),(2,3),(4,5)$ を選べるので $U_5[1,2]=3$。これ以上の時刻対は存在しません。

[Doob 上向き横断不等式](../../STO/STO2/index.md#thm-sto2-upcrossing)は、劣マルチンゲール $X$ に対して

$$
(b-a)E[U_n[a,b]]
\le E[(X_n-a)^+]-E[(X_0-a)^+]
\le E[X_n^+]+|a|
$$

を与えます。この式の仕組みを、予測可能な取引として追い直します。

### なぜ正部分を使うのか

$Y_k=(X_k-a)^+$、$c=b-a>0$ とすると、$X$ が $a$ 以下にいるとき $Y=0$、$X$ が $b$ 以上にいるとき $Y\ge c$ です。したがって $X$ の $[a,b]$ 横断と $Y$ の $[0,c]$ 横断は一対一です。また $Y_k\ge X_k-a$、$Y_k\ge0$ から

$$
\begin{aligned}
E[Y_{k+1}\mid\mathcal F_k]
&\ge\max(E[X_{k+1}\mid\mathcal F_k]-a,0)\\
&\ge\max(X_k-a,0)=Y_k.
\end{aligned}
$$

つまり $Y$ は非負劣マルチンゲールです。正部分にしたことで、未完了の取引があっても保有価値を負にしないという利点が生じます。

### 予測可能な売買から不等式へ

$Y=0$ を観測した直後から $Y\ge c$ を観測した時刻まで一単位を保有し、売却後は再び $Y=0$ を待ちます。各 $k$ では **時刻 $k-1$ までの情報**で、次の増分 $Y_k-Y_{k-1}$ を受け取るか決めます。保有指示関数を $H_k\in\{0,1\}$ とすると $H_k$ は $\mathcal F_{k-1}$ 可測です。

その損益は [予測可能変換](../../STO/STO2/index.md#def-sto2-predictable-transform)

$$
(H\cdot Y)_n=\sum_{k=1}^nH_k(Y_k-Y_{k-1})
$$

です。各完成横断では買値が $0$、売値が少なくとも $c$。最後に未決済の一回があっても買値 $0$ に対して現在値 $Y_n\ge0$ です。ゆえに経路ごとに

$$
(H\cdot Y)_n\ge cU_n[a,b].
$$

他方、補戦略 $1-H$ も非負で予測可能です。$Y$ の劣マルチンゲール性を用いて各 $k$ に対し

$$
E[(1-H_k)(Y_k-Y_{k-1})]
=E[(1-H_k)E[Y_k-Y_{k-1}\mid\mathcal F_{k-1}]]\ge0.
$$

全時刻で足すと $E[((1-H)\cdot Y)_n]\ge0$。恒等式

$$
Y_n-Y_0=(H\cdot Y)_n+((1-H)\cdot Y)_n
$$

から $E[(H\cdot Y)_n]\le E[Y_n]-E[Y_0]$ です。先ほどの経路ごとの下界と組み合わせると

$$
cE[U_n[a,b]]\le E[Y_n]-E[Y_0]
$$

となり、上向き横断不等式を再導出できました。ここで有限時刻の和だけを扱っているため、各項の可積分性は $H_k$ の有界性と $Y_k\in L^1$ から確認できます。

## 4. 無限の横断を消すと標本路が収束する

[劣マルチンゲールの概収束定理](../../STO/STO2/index.md#thm-sto2-submartingale-convergence)は

$$
C:=\sup_{n\ge0}E[X_n^+]<\infty
\quad\Longrightarrow\quad
X_n\longrightarrow X_\infty\in L^1\quad\text{a.s.}
$$

という結論です。$L^1$ に属する極限の**存在**を言っていますが、$E|X_n-X_\infty|\to0$ までは述べていません。

### 横断の有界期待値から収束までを再構成する

任意の有理数 $a<b$ について、$U_n[a,b]$ は非減少なので $U_\infty[a,b]=\lim_nU_n[a,b]$ が存在します（$\infty$ も許す）。前節の不等式に $E[X_n^+]\le C$ を代入して、単調収束定理を使うと

$$
E[U_\infty[a,b]]
=\lim_{n\to\infty}E[U_n[a,b]]
\le\frac{C+|a|}{b-a}<\infty.
$$

したがって各有理区間の横断回数は確率 $1$ で有限です。有理数対は可算個なので、**全ての有理区間について同時に**横断が有限となる確率 $1$ の事象を取れます。

その事象上で標本路を固定し、$\ell=\liminf_nX_n$、$u=\limsup_nX_n$（拡張実数を許す）とします。もし $\ell<u$ なら、$\ell<a<b<u$ を満たす有理数 $a<b$ を選べます。任意の十分先に $X_s\le a$ が現れ、そのあとに $X_t\ge b$ が現れるため、上向き横断を無限回構成できます。矛盾なので $\ell=u$、すなわち拡張実数値の極限が存在します。

有限性を示すには負部分も抑えます。劣マルチンゲールの平均は非減少なので

$$
E[X_n^-]=E[X_n^+]-E[X_n]\le C-E[X_0],
$$

ゆえに $\sup_nE|X_n|\le2C-E[X_0]<\infty$ です。[Fatou の補題](../../F0/F0-00P4A/index.md)を非負変数 $|X_n|$ に使うと

$$
E|X_\infty|\le\liminf_n E|X_n|<\infty.
$$

この不等式により極限が $\pm\infty$ になる確率は $0$ で、極限は $L^1$ に属します。注意すべきは、**極限の絶対値が可積分**であることと、**差 $X_n-X_\infty$ の期待絶対値がゼロへ行く**ことは別だという点です。

## 5. 概収束と $L^1$ 収束の間にある条件

[一様可積分性](../../F0/F0-00P4A/index.md#def-f0-00p4a-ui)（UI）は、可積分確率変数の族 $\mathcal H$ に対する

$$
\lim_{K\to\infty}\sup_{Z\in\mathcal H}
E[|Z|1_{\{|Z|>K\}}]=0
$$

という尾部制御です。各 $E|Z|$ が有界であることより強く、稀な巨大値の期待値への寄与を一様に消せます。

### 平均は常に 1 なのに極限は 0 になる例

独立な公平コイン $\xi_k\in\{-1,1\}$ に対し、初期値 $R_0=1$、$n\ge1$ で

$$
R_n=2^n1_{\{\xi_1=\cdots=\xi_n=1\}}
$$

と定めます。前回まで全部表なら次の表で額が二倍、裏なら以後ゼロです。過去全部表の事象上では

$$
E[R_{n+1}\mid\mathcal F_n]
=2^{n+1}1_{\{\xi_1=\cdots=\xi_n=1\}}P(\xi_{n+1}=1)
=R_n.
$$

過去に裏があれば両側ともゼロです。よって $R$ は非負マルチンゲールで $ER_n=2^n2^{-n}=1$。しかし全時刻で表が続く事象の確率は $\lim_n2^{-n}=0$ なので $R_n\to0$ a.s. です。

任意の $K>0$ に対し $2^n>K$ を満たす $n$ を選べば

$$
E[R_n1_{\{R_n>K\}}]=2^n2^{-n}=1.
$$

従って $\{R_n\}$ は UI ではなく、$E|R_n-0|=1$ がすべての $n$ で成り立ちます。**$L^1$ 有界性と概収束だけでは $L^1$ 収束を保証しない**という、極限交換の失敗を可視化しています。

### UI があれば終端値を条件付き期待値として復元できる

[UI マルチンゲール収束定理](../../STO/STO2/index.md#thm-sto2-ui-martingale-convergence)を使用すると、UI マルチンゲール $M$ には $M_\infty\in L^1$ が存在して

$$
M_n\to M_\infty\quad\text{a.s. かつ }L^1,\qquad
M_n=E[M_\infty\mid\mathcal F_n]
$$

が成立します。証明の橋渡しも確認します。UI なら $\sup_nE|M_n|<\infty$ で、前節の概収束定理を適用できます。さらに概収束は確率収束を含むため [Vitali 型収束定理](../../F0/F0-00P4A/index.md#thm-f0-00p4a-vitali)により $L^1$ 収束します。

固定した $n$ と $B\in\mathcal F_n$ について、$m\ge n$ のマルチンゲール性から

$$
E[1_BM_m]=E[1_BM_n].
$$

ここで $|E[1_B(M_m-M_\infty)]|\le E|M_m-M_\infty|\to0$ なので $E[1_BM_\infty]=E[1_BM_n]$ です。$M_n$ の $\mathcal F_n$ 可測性と条件付き期待値の特徴付けから終端表示が従います。

### 二乗平均有界性は UI を保証する

二乗平均有界なら具体的な尾部評価を作れます。$|z|>K$ で $|z|\le z^2/K$ だから、

$$
E[|M_n|1_{\{|M_n|>K\}}]\le \frac{E[M_n^2]}{K}.
$$

右辺が $n$ に一様に $O(K^{-1})$ なら UI です。さらに二乗平均の範囲内で収束を強められます。

<a id="prop-sp9-l2-convergence"></a>

<!-- formal-statement-start -->
> **命題（二乗平均有界なマルチンゲールの収束）**  
> $M=(M_n)_{n\ge0}$ を実数値二乗可積分マルチンゲールとし、

$$
\sup_{n\ge0}E[M_n^2]<\infty
$$

> と仮定する。このとき、ある $M_\infty\in L^2$ が存在し、$M_n\to M_\infty$ が概確実、$L^2$、$L^1$ のすべてで成り立つ。さらに各 $n$ で $M_n=E[M_\infty\mid\mathcal F_n]$ である。
<!-- formal-statement-end -->

### 証明の見取り図

マルチンゲール差分は、異なる時刻どうしが二乗平均の意味で直交します。$E[M_n^2]$ が単調増加して上に有界なら、遠く離れた二時刻の二乗平均差を小さくできます。$L^2$ の完備性と、すでに得た概収束定理を接続します。

<!-- proof-start -->
### 証明

$m\ge n$ とします。$M_n$ は $\mathcal F_n$ 可測、$E[M_m\mid\mathcal F_n]=M_n$ なので

$$
E[M_mM_n]
=E[M_nE[M_m\mid\mathcal F_n]]
=E[M_n^2].
$$

積は Cauchy–Schwarz により可積分です。よって平方展開から

$$
\begin{aligned}
E[(M_m-M_n)^2]
&=E[M_m^2]-2E[M_mM_n]+E[M_n^2]\\
&=E[M_m^2]-E[M_n^2].
\end{aligned}
$$

左辺が非負なので $v_n=E[M_n^2]$ は単調非減少です。仮定から $v_n\uparrow v<\infty$ となるので、$m\ge n$ に対して $0\le E[(M_m-M_n)^2]\le v-v_n\to0$。従って $(M_n)$ は $L^2$ の Cauchy 列であり、$L^2$ の完備性よりある $Y\in L^2$ へ二乗平均収束します。

一方 $E|M_n|\le\sqrt{E[M_n^2]}$ なので $\sup_nE[M_n^+]<\infty$。前節の[概収束定理](../../STO/STO2/index.md#thm-sto2-submartingale-convergence)から、ある $X\in L^1$ へ概収束します。$L^2$ 収束は確率収束を意味し、確率極限の一意性から $X=Y$ a.s. です。これを $M_\infty$ とします。

また Cauchy–Schwarz から $E|M_n-M_\infty|\le\sqrt{E[(M_n-M_\infty)^2]}\to0$。二乗平均有界性から上で確かめた UI と [UI マルチンゲール収束定理](../../STO/STO2/index.md#thm-sto2-ui-martingale-convergence)を適用すれば、$M_n=E[M_\infty\mid\mathcal F_n]$ が得られます。
<!-- proof-end -->

## 6. 演習 Level A：到達・横断・尾部を自分で数える

#### SP9-A01 二回の公平歩行と最大到達

- Level: A

独立な公平 $\pm1$ コイン $\xi_1,\xi_2$ を用い、$S_0=0$、$S_k=\sum_{j=1}^k\xi_j$ とする。(1) $P(\max_{0\le k\le2}|S_k|\ge2)$ を全標本路から求めよ。(2) $E|S_2|$ を計算し、[Doob 最大不等式](../../STO/STO2/index.md#thm-sto2-doob-maximal)を $|S|$ に適用した上界と比較せよ。

<!-- solution-start -->
### 詳細解答

標本路 $(\xi_1,\xi_2)$ は $(1,1),(1,-1),(-1,1),(-1,-1)$ がそれぞれ確率 $1/4$ です。$S_1=\xi_1$、$S_2$ は順に $2,0,0,-2$ なので最大絶対値が $2$ となるのは最初と最後の二通りです。従って (1) の確率は $2/4=1/2$。

終端の絶対値は $2,0,0,2$ なので $E|S_2|=2(1/4+1/4)=1$ です。$|S|$ は非負劣マルチンゲールなので、$\lambda=2$ の最大不等式より

$$
P(\max_{k\le2}|S_k|\ge2)\le E|S_2|/2=1/2.
$$

この例では等号です。
<!-- solution-end -->

#### SP9-A02 上向き横断と下向き横断を区別する

- Level: A

列 $0,2,1,3,0,2$ の区間 $[1,2]$ に対する上向き横断回数を、互いに交わらない時刻対を挙げて求めよ。また $n=3$ までの回数も答えよ。

<!-- solution-start -->
### 詳細解答

水準 $1$ 以下から水準 $2$ 以上へ移る時刻対は $(0,1),(2,3),(4,5)$ と取れます。各対の後で次の対の開始時刻が来るので、定義を満たす三回の完成横断です。列の長さは $6$、一回に少なくとも二つの異なる時刻が必要なので四回は不可能です。従って $U_5[1,2]=3$。時刻 $3$ までなら $(0,1),(2,3)$ の二回で $U_3[1,2]=2$ です。
<!-- solution-end -->

#### SP9-A03 非負マルチンゲールの危険な尾部

- Level: A

独立公平コインに対し、$R_0=1$、$R_n=2^n1_{\{\xi_1=\cdots=\xi_n=1\}}$ とする。(1) $ER_n$、(2) $P(R_n=0)$、(3) $\sup_n E[R_n1_{\{R_n>K\}}]$（$K>0$）を求め、UI かを判定せよ。

<!-- solution-start -->
### 詳細解答

$n\ge1$ では $R_n$ が $2^n$ になる確率は $2^{-n}$、それ以外はゼロです。従って (1) $ER_n=2^n2^{-n}=1$、(2) $P(R_n=0)=1-2^{-n}$ です。任意の $K>0$ に対し $2^n>K$ となる $n$ を選ぶと $E[R_n1_{\{R_n>K\}}]=2^n2^{-n}=1$。一方各 $n$ でその期待値は $ER_n=1$ 以下です。ゆえに (3) の上限は $1$ です。$K\to\infty$ でも $1$ のままなので [UI の定義](../../F0/F0-00P4A/index.md#def-f0-00p4a-ui)を満たしません。
<!-- solution-end -->

#### SP9-A04 二乗最大評価を歩行に適用する

- Level: A

公平な独立 $\pm1$ コインの和 $S_n$ に対して、$E[S_n^2]=n$ を直接展開で確認せよ。$P(\max_{k\le4}|S_k|\ge4)$ の正確な値と、[本章の最大値二乗平均評価](#prop-sp9-l2-maximal)による上界を比較せよ。

<!-- solution-start -->
### 詳細解答

$$
E[S_n^2]=E\left[\sum_{i=1}^n\xi_i^2+
2\sum_{1\le i<j\le n}\xi_i\xi_j\right].
$$

各 $\xi_i^2=1$、異なる時刻のコインは独立で $E\xi_i=0$ だから $E[\xi_i\xi_j]=0$。よって $E[S_n^2]=n$ です。四回までに絶対値 $4$ へ達するには四回とも同じ符号が必要で、確率は $2(1/2)^4=1/8$。一方二乗最大評価の上界は

$$
4E[S_4^2]/4^2=4\cdot4/16=1.
$$

これは正しいものの粗い評価です。一般不等式は標本路の細かな組合せを使わないため、等号になるとは限りません。
<!-- solution-end -->

#### SP9-A05 二乗平均有界なら UI

- Level: A

可積分変数列 $(Z_n)$ が $\sup_nE[Z_n^2]\le C<\infty$ を満たすとする。$\sup_nE[|Z_n|1_{\{|Z_n|>K\}}]$ に $K$ に依存する上界を与え、UI を証明せよ。

<!-- solution-start -->
### 詳細解答

$|Z_n|>K$ 上では $|Z_n|\le Z_n^2/K$ で、補集合では左辺の積がゼロです。従ってすべての $n$ について

$$
0\le E[|Z_n|1_{\{|Z_n|>K\}}]\le E[Z_n^2]/K\le C/K.
$$

上限を $n$ について取っても $C/K$ 以下です。$K\to\infty$ で右辺がゼロになるので、一様可積分性の定義を満たします。各変数が可積分であることも $E|Z_n|\le\sqrt C$ により確認できます。
<!-- solution-end -->

## 7. 演習 Level B：収束条件と証明機構をつなぐ

#### SP9-B01 減衰する公平コインの無限和

- Level: B

独立公平コイン $\xi_k$ と $M_n=\sum_{k=1}^n2^{-k}\xi_k$（$M_0=0$）を考える。(1) マルチンゲール性、(2) $E[M_n^2]$、(3) $E[(M_\infty-M_n)^2]$ を求め、$L^2$ 収束と概収束を結論せよ。

<!-- solution-start -->
### 詳細解答

$M_n$ は $\xi_1,\ldots,\xi_n$ による情報に適合し、$|M_n|\le\sum_{k=1}^n2^{-k}<1$ で可積分です。また

$$
E[M_n-M_{n-1}\mid\mathcal F_{n-1}]
=2^{-n}E[\xi_n\mid\mathcal F_{n-1}]=0,
$$

なのでマルチンゲールです。独立性と平均ゼロから交差項は消え、

$$
E[M_n^2]=\sum_{k=1}^n4^{-k}
=\frac{1-4^{-n}}3\le\frac13.
$$

[二乗平均有界なマルチンゲールの収束命題](#prop-sp9-l2-convergence)で $M_\infty\in L^2$ へ $L^2$・概確実に収束します。$m>n$ では

$$
E[(M_m-M_n)^2]=\sum_{k=n+1}^m4^{-k}
=\frac{4^{-n}-4^{-m}}3.
$$

$L^2$ 収束により左辺で $m\to\infty$ とできるので、

$$
E[(M_\infty-M_n)^2]=\frac{4^{-n}}3.
$$

これは収束の速さまで与えます。
<!-- solution-end -->

#### SP9-B02 増加する確定的過程と横断評価

- Level: B

$X_n=1-2^{-n}$ を自明なフィルトレーション上の過程とし、$[a,b]=[0,1/2]$ を取る。(1) 劣マルチンゲール性を確認せよ。(2) $n\ge1$ で $U_n[0,1/2]$ を求めよ。(3) [上向き横断不等式](../../STO/STO2/index.md#thm-sto2-upcrossing)の両辺を直接比較せよ。

<!-- solution-start -->
### 詳細解答

すべての $X_n$ は定数で可積分かつ適合です。$X_{n+1}-X_n=2^{-(n+1)}>0$ なので

$$
E[X_{n+1}\mid\mathcal F_n]=X_{n+1}\ge X_n.
$$

$X_0=0$、$X_1=1/2$ で最初の上向き横断が完成し、その後は狭義増加して $0$ へ戻りません。従って $n\ge1$ で $U_n[0,1/2]=1$ です。不等式の左辺は $(1/2-0)\cdot1=1/2$、右辺は

$$
E[(X_n-0)^+]-E[(X_0-0)^+]=1-2^{-n}.
$$

$n\ge1$ で $1-2^{-n}\ge1/2$ です。$n=1$ では等号で、その後は右辺が増えます。平均の増加と横断回数を同一視してはいけません。
<!-- solution-end -->

#### SP9-B03 終端値から復元される公平過程

- Level: B

独立公平コイン $\xi_1,\xi_2$ を取り、$\mathcal F_0$ は自明、$\mathcal F_1=\sigma(\xi_1)$、$\mathcal F_n=\sigma(\xi_1,\xi_2)$（$n\ge2$）とする。$Z=\xi_1\xi_2$、$M_n=E[Z\mid\mathcal F_n]$ を計算し、マルチンゲール性、UI、概収束、$L^1$ 収束を条件付き期待値から確認せよ。

<!-- solution-start -->
### 詳細解答

独立性と平均ゼロから $M_0=EZ=E\xi_1E\xi_2=0$、$M_1=\xi_1E[\xi_2\mid\mathcal F_1]=0$ です。$n\ge2$ では $Z$ が $\mathcal F_n$ 可測なので $M_n=Z$。よって

$$
E[M_1\mid\mathcal F_0]=0=M_0,\qquad
E[M_2\mid\mathcal F_1]=\xi_1E[\xi_2\mid\mathcal F_1]=0=M_1
$$

で、以降は過程が一定なのでマルチンゲールです。$|M_n|\le1$ だから $K\ge1$ では全時刻の UI 尾部が $0$ です。$n\ge2$ で $M_n=Z$ なので $M_n\to Z$ は各標本路で成立し、$E|M_n-Z|=0$（$n\ge2$）です。終端表示 $M_n=E[Z\mid\mathcal F_n]$ も直接成立します。
<!-- solution-end -->

## 8. 演習 Level C：停止と二乗平均収束を一つの計算へ

#### SP9-C01 有限区間で止めた歩行の極限と最大値

- Level: C

$a,b$ を正整数とし、$S_0=0$、$S_n=\sum_{k=1}^n\xi_k$ を独立公平 $\pm1$ 歩行とする。$\tau=\inf\{n\ge0:S_n\in\{-a,b\}\}$、$M_n=S_{n\wedge\tau}$ とする。[SP6 の吸収時刻の評価](../SP6/index.md#lem-sp6-geometric-tail)から $P(\tau<\infty)=1$ としてよい。

1. $M_n$ がマルチンゲールで、$-a\le M_n\le b$ であることを確かめよ。
2. 概確実・$L^2$・$L^1$ 収束することを示し、$P(S_\tau=b)$ を求めよ。
3. $E[\tau]=ab$ を、二乗歩行を止めて $n\to\infty$ とする方法で導け。
4. 任意の $n$ と $\lambda>0$ で $P(\max_{k\le n}|M_k|\ge\lambda)$ の二乗平均上界を示せ。最大値への評価と極限の平均保存に必要な仮定の違いも説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 停止増分と有界性。** $\{\tau\ge k\}=\{\tau>k-1\}\in\mathcal F_{k-1}$ なので、[SP8 の停止差分の議論](../SP8/index.md#prop-sp8-doob-stop)と同じく

$$
M_n=\sum_{k=1}^n1_{\{\tau\ge k\}}\xi_k,\qquad
E[1_{\{\tau\ge k\}}\xi_k\mid\mathcal F_{k-1}]=0.
$$

$M_n$ は適合で各 $n$ の積は可積分なのでマルチンゲールです。歩行は $\pm1$ ずつ変わり、境界を飛び越えません。停止後は固定されるため $-a\le M_n\le b$ です。

**2. 極限と境界到達確率。** すべての $n$ で $|M_n|\le d:=\max(a,b)$ なので $\sup_nE[M_n^2]\le d^2<\infty$。[二乗平均有界なマルチンゲールの収束命題](#prop-sp9-l2-convergence)より概確実・$L^2$・$L^1$ 収束します。$\tau<\infty$ a.s. なので極限は $S_\tau\in\{-a,b\}$ です。各 $EM_n=0$ を $L^1$ 収束によって極限へ渡すと

$$
0=ES_\tau=(-a)(1-p)+bp,\qquad p=P(S_\tau=b).
$$

従って $p=a/(a+b)$ です。

**3. 平均停止時間。** 公平歩行について

$$
E[S_k^2-S_{k-1}^2\mid\mathcal F_{k-1}]
=E[2S_{k-1}\xi_k+\xi_k^2\mid\mathcal F_{k-1}]=1.
$$

[SP8 の停止と Doob 分解の整合](../SP8/index.md#prop-sp8-doob-stop)から $M_n^2-(n\wedge\tau)$ はマルチンゲールです。初期値 $0$ なので

$$
E[n\wedge\tau]=E[M_n^2].
$$

$n\to\infty$ で、左辺には $n\wedge\tau\uparrow\tau$ に対する単調収束定理、右辺には $0\le M_n^2\le d^2$ と $M_n\to S_\tau$ に対する有界収束定理を使います。よって

$$
E[\tau]=E[S_\tau^2]
=a^2(1-p)+b^2p
=\frac{a^2b+b^2a}{a+b}=ab.
$$

最初から非有界 $\tau$ に任意抽出を適用したわけではなく、各有限 $n$ で成立する等式をそれぞれ適切な収束定理で極限へ渡しました。

**4. 最大偏差。** [最大値の二乗平均評価](#prop-sp9-l2-maximal)を有限時間 $M_0,\ldots,M_n$ に用いると

$$
P\left(\max_{k\le n}|M_k|\ge\lambda\right)
\le\frac{4E[M_n^2]}{\lambda^2}
=\frac{4E[n\wedge\tau]}{\lambda^2}
\le\frac{4ab}{\lambda^2}.
$$

ここで $E[n\wedge\tau]\le E\tau=ab$ は 3 の結果です。最大値不等式の適用自体は**有限 $n$ の二乗可積分性**で足りる一方、終端 $S_\tau$ で平均保存するには $L^1$ 収束（ここでは一様有界性から従う）という別の根拠が必要です。
<!-- solution-end -->

## 9. この講義のまとめ

- [Doob 最大不等式](../../STO/STO2/index.md#thm-sto2-doob-maximal)は、最大値の事象を最初の到達時刻の事象へ置き換え、[有界任意抽出](../../STO/STO2/index.md#thm-sto2-bounded-optional-sampling)で終端値へつなぎます。
- [最大値の二乗平均評価](#prop-sp9-l2-maximal)は、到達水準についての積分と Cauchy–Schwarz から得ます。
- [上向き横断不等式](../../STO/STO2/index.md#thm-sto2-upcrossing)では、正部分の過程を売買する予測可能変換が横断回数を数えます。
- [劣マルチンゲールの概収束](../../STO/STO2/index.md#thm-sto2-submartingale-convergence)は「すべての有理区間の無限横断を排除 → 有限の極限」の順です。
- 概収束だけでは期待値を極限へ渡せません。[UI](../../F0/F0-00P4A/index.md#def-f0-00p4a-ui)があれば $L^1$ 収束し、[二乗平均有界性](#prop-sp9-l2-convergence)があればさらに $L^2$ 収束します。
- 次の SP10 は計数過程と Poisson 過程へ進み、到着回数という新しい種類の時間発展を扱います。
