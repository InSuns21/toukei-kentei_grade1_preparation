# SP8 停止と任意抽出・Doob 分解

公平なコインに賭ける際、[SP7 の予測可能変換](../SP7/index.md#thm-sp7-predictable-isometry)では「賭け金を決めるのは結果を見る前」という制約を守りました。今度は**いつ賭けをやめるか**を自分で決めます。勝ったときだけ終了すれば必ず得をするようにも見えますが、その説明は何を見落としているのでしょうか。また、[劣マルチンゲール](../../STO/STO2/index.md#def-sto2-martingale)の平均増加から、公平な揺らぎをどう取り出せるでしょうか。

本章では、先行する [STO1 の停止時刻](../../STO/STO1/index.md#def-sto1-stopping-time)・[停止過程](../../STO/STO1/index.md#def-sto1-stopped-process)・[停止時刻までの情報](../../STO/STO1/index.md#def-sto1-stopping-sigma-field)、[STO2 の停止定理](../../STO/STO2/index.md#thm-sto2-stopped-martingale)・[有界任意抽出](../../STO/STO2/index.md#thm-sto2-bounded-optional-sampling)・[Doob 分解](../../STO/STO2/index.md#thm-sto2-doob-decomposition)を土台とします。主要定理を単に再掲するのではなく、差分を用いてその証明を再構成し、停止と分解の相互作用を導きます。

以下、$(\Omega,\mathcal F,P)$ は確率空間、$(\mathcal F_n)_{n\ge0}$ はフィルトレーションとし、実数値過程は特記しない限りこの情報に適合するとします。等式・不等式は概確実に解釈し、$\tau$ の値には $\infty$ も許します。$\Delta X_k:=X_k-X_{k-1}$ ($k\ge1$) は第 $k$ 回の増分、$n\wedge\tau:=\min(n,\tau)$ は二つの時刻の小さい方を表します。$\boldsymbol{1}_B$ は事象 $B$ が起これば $1$、そうでなければ $0$ を取る指示関数です。

コイントス・ランダムウォークの具体例では、断りがなければ独立な $\xi_1,\xi_2,\ldots$ の履歴から作る[自然なフィルトレーション](../../STO/STO1/index.md#def-sto1-adapted-natural-filtration) $\mathcal F_0=\{\varnothing,\Omega\}$、$\mathcal F_n=\sigma(\xi_1,\ldots,\xi_n)$（$n\ge1$）を用います。これにより $\xi_k$ は $\mathcal F_{k-1}$ と独立で、可積分なら $E[\xi_k\mid\mathcal F_{k-1}]=E[\xi_k]$ です。コイン同士の独立性だけでは、未来の情報を含む別のフィルトレーションに関してこの等式を主張できません。

## 1. 先に止めるか、結果を見てから止めるか

[停止時刻の定義](../../STO/STO1/index.md#def-sto1-stopping-time)は、各 $n$ について $\{\tau\le n\}\in\mathcal F_n$ となることです。この式は「時刻 $n$ までの情報で、すでに終了したか判定できる」という意味です。第 $k$ 回の増分を採用する条件 $\{\tau\ge k\}=\{\tau>k-1\}$ は、**第 $k-1$ 回まで**で判定できます。

例として独立な公平 $\pm1$ コイン $\xi_1,\xi_2$ と $\mathcal F_n=\sigma(\xi_1,\dots,\xi_n)$（$n=0,1,2$、$\mathcal F_0$ は自明）を用います。

$$
\tau=\begin{cases}1,&\xi_1=1,\\2,&\xi_1=-1\end{cases}
$$

なら $\{\tau\le0\}=\varnothing$、$\{\tau\le1\}=\{\xi_1=1\}\in\mathcal F_1$、$\{\tau\le2\}=\Omega$ です。全ての時刻で停止時刻の条件を確認しました。対照的に「2回のうち最後に表が出た時刻」を、表が出ない場合は $0$ と定めると、$\{\tau\le1\}=\{\xi_2=-1\}$ です。これは第1回終了時点では分からないため停止時刻ではありません。

可積分で $\mathcal F_0$ 可測な $M_0$ と、[マルチンゲール差分](../SP7/index.md#def-sp7-martingale-difference) $D_k$ から $M_n=M_0+\sum_{k=1}^nD_k$ を作ります。各時刻で増分を止めると

$$
M_{n\wedge\tau}
=M_0+\sum_{k=1}^n \boldsymbol{1}_{\{\tau\ge k\}}D_k.
$

この式の意味を、$\tau<k$ なら第 $k$ 回の賭けを行わず、$\tau\ge k$ ならその回の損益 $D_k$ を加える、と読んでください。式は各標本路で成り立つ有限和で、無限時刻 $\tau=\infty$ でも問題ありません。第 $k$ 項の係数は $\mathcal F_{k-1}$ 可測かつ $0$ または $1$ です。

> **計算の要点**：差分を止めることは、未来の増分を見ずに $0/1$ の賭け金を選ぶ操作です。予測可能性が停止定理を支えています。

## 2. 停止過程はなぜ公平性を保つか

[差分によるマルチンゲール判定](../SP7/index.md#prop-sp7-difference-representation)を、上の表示に適用します。$M$ が可積分マルチンゲールなら $D_k$ は可積分で $\mathcal F_k$ 可測、さらに $E[D_k\mid\mathcal F_{k-1}]=0$ です。よって

$$
\begin{aligned}
E[\boldsymbol{1}_{\{\tau\ge k\}}D_k\mid\mathcal F_{k-1}]
&=\boldsymbol{1}_{\{\tau\ge k\}}E[D_k\mid\mathcal F_{k-1}]\\
&=0.
\end{aligned}
$$

指示関数は有界であるため、その積は可積分でもあります。第 $n$ 時刻までの有限和である停止過程は、適合性と可積分性も保ちます。したがって [STO2 の停止マルチンゲール定理](../../STO/STO2/index.md#thm-sto2-stopped-martingale)を**差分から再導出**できました。劣マルチンゲール $X$ なら最後の条件付き平均が非負になるだけで、同じ計算が不等号付きで通ります。

例えば $S_n=\sum_{k=1}^n\xi_k$ を上節の $\tau$ で止めると

$$
S_{2\wedge\tau}=\xi_1+\boldsymbol{1}_{\{\xi_1=-1\}}\xi_2.
$$

第1回が表なら値は $1$、裏なら二回目を加えた値 $-1+\xi_2$ です。期待値を直接計算すると

$$
E[S_{2\wedge\tau}]
=\frac12\cdot1+\frac14\cdot0+\frac14\cdot(-2)=0.
$$

**停止は公平性を保っても、終端の分布まで元の $S_2$ と同一にするわけではありません。**

## 3. 有界な二つの停止時刻で条件付き平均を比較する

固定した $m\le n$ に対してマルチンゲールは $E[M_n\mid\mathcal F_m]=M_m$ でした。これをランダムな $\sigma\le\tau$ に置き換えたものが、[有界任意抽出定理](../../STO/STO2/index.md#thm-sto2-bounded-optional-sampling)です。ここで **$0\le\sigma\le\tau\le N$ が同一の決定論的な有限 $N$ で成り立つ**ことが重要です。

再導出では、止める間だけの増分を足します。

$$
M_\tau-M_\sigma
=\sum_{k=1}^{N}\boldsymbol{1}_{\{\sigma<k\le\tau\}}\Delta M_k.
$$

$\mathcal F_\sigma$ は、停止時刻 $\sigma$ までに知ることのできる事象の集合です。[停止時刻までの $\sigma$ 代数の定義](../../STO/STO1/index.md#def-sto1-stopping-sigma-field)に従って、任意の $B\in\mathcal F_\sigma$ について $B\cap\{\sigma\le k-1\}\in\mathcal F_{k-1}$ です。また $\{\tau\ge k\}\in\mathcal F_{k-1}$ なので

$$
C_k=B\cap\{\sigma<k\le\tau\}\in\mathcal F_{k-1}.
$$

ここで増分の公平性を **$C_k$ に制限して** 用いると

$$
E[\boldsymbol{1}_{C_k}\Delta M_k]
=E[\boldsymbol{1}_{C_k}E[\Delta M_k\mid\mathcal F_{k-1}]]=0.
$$

有限和を取って $E[1_B(M_\tau-M_\sigma)]=0$ となります。$M_\sigma$ の $\mathcal F_\sigma$ 可測性も、任意の Borel 集合 $D$ と整数 $m$ について

$
\{M_\sigma\in D\}\cap\{\sigma\le m\}
=\bigcup_{j=0}^{m}\bigl(\{\sigma=j\}\cap\{M_j\in D\}\bigr)\in\mathcal F_m
$

から確かめられます（$\sigma$ と $M$ の適合性を使用）。また $0\le\sigma,\tau\le N$ なので $|M_\sigma|,|M_\tau|\le\sum_{j=0}^N|M_j|$ であり、両者は可積分です。したがって条件付き期待値の特徴付けから

$$
E[M_\tau\mid\mathcal F_\sigma]=M_\sigma,\qquad
E[M_\tau]=E[M_\sigma]=E[M_0].
$$

劣マルチンゲールなら各増分の条件付き期待値が非負なので、同じ証明で $E[X_\tau\mid\mathcal F_\sigma]\ge X_\sigma$ を得ます。これが任意抽出の核心です。**停止時刻の情報**を使わず、ただ $E[M_\tau]=E[M_0]$ を暗記するだけでは、条件付きの結論へ届きません。

### 二段階の条件付き計算

$\sigma=1$、$\tau=1$（$\xi_1=1$ の場合）、$\tau=2$（$\xi_1=-1$ の場合）とし、$M_n=S_n$ とします。$\mathcal F_\sigma=\mathcal F_1$ です。実際、

$$
S_\tau=\xi_1+\boldsymbol{1}_{\{\xi_1=-1\}}\xi_2
$$

だから、$\xi_2$ と過去の独立性から

$$
E[S_\tau\mid\mathcal F_1]
=\xi_1+\boldsymbol{1}_{\{\xi_1=-1\}}E[\xi_2\mid\mathcal F_1]
=\xi_1=S_\sigma.
$$

無条件平均ゼロよりも強く、**第1回の結果を知ってから見ても**残りの公平性は保たれています。

## 4. 有界性を外すと破れる：必ず勝ってやめる戦略

独立な公平 $\pm1$ コイン $\xi_1,\xi_2,\dots$ について、最初に表が出る時刻

$$
T=\inf\{k\ge1:\xi_k=1\}
$$

を考えます。$\{T\le n\}$ は最初の $n$ 回の結果だけで判定でき、$P(T>n)=2^{-n}$ だから $P(T<\infty)=1$ です。ただしどんな有限 $N$ に対しても $P(T>N)>0$ であり、**有界停止時刻ではありません**。

初回に $1$ 円を賭け、負けたら $2,4,8,\dots$ 円へ倍増し、最初の勝ちでやめることにします。第 $k$ 回の賭け金と損益の累積を

$$
H_k=2^{k-1}\boldsymbol{1}_{\{T\ge k\}},
\qquad
G_n=\sum_{k=1}^nH_k\xi_k
$$

と置きます。$H_k$ は第 $k-1$ 回までの結果で決まり、有界（各固定 $k$ について）です。[予測可能変換](../../STO/STO2/index.md#prop-sto2-predictable-transform)または[SP7 の差分判定](../SP7/index.md#prop-sp7-difference-representation)により、$G_n$ は各有限時刻で可積分なマルチンゲールです。

$T=k$ の標本路では $1,\ldots,k-1$ 回目は負け、第 $k$ 回で勝つため

$$
G_T=-\sum_{j=1}^{k-1}2^{j-1}+2^{k-1}
=-(2^{k-1}-1)+2^{k-1}=1.
$$

従って $G_T=1$ a.s. で $E[G_T]=1$、一方 $E[G_0]=0$ です。定理に反しているのではありません。**有界な停止時刻という仮定を失っています。**

確かめるため、$T\wedge n$ で停止した値の分布を書き出します。時刻 $n$ までに勝った確率は $1-2^{-n}$ で利益 $1$、全敗の確率は $2^{-n}$ で損失 $-(2^n-1)$ です。よって

$$
E[G_{T\wedge n}]
=(1-2^{-n})\cdot1+2^{-n}[-(2^n-1)]
=0.
$$

各 $n$ の平均ゼロと $G_{T\wedge n}\to G_T=1$ a.s. は両立します。極めてまれな全敗時の損失が巨大化するため、**極限と期待値を無条件に交換できません**。後続章では、この交換を許す一様可積分性などの条件を学びます。

## 5. 増加する傾向を取り除く：Doob 分解

公平な $M$ と異なり、劣マルチンゲール $X$ では次回の増分に非負の予測可能な平均があります。[Doob 分解の定理](../../STO/STO2/index.md#thm-sto2-doob-decomposition)はその平均増加分だけを集め、**揺らぎ $M$ と予測可能な増加 $A$ に一意に分ける**結果です。

時刻 $k-1$ で第 $k$ 回の増分の予測値を

$$
a_k=E[\Delta X_k\mid\mathcal F_{k-1}]
$$

と置き、$A_0=0$、$A_n=\sum_{k=1}^na_k$、$M_n=X_n-A_n$ と定めます。$X$ が可積分・適合な劣マルチンゲールなら、$a_k$ は可積分・$\mathcal F_{k-1}$ 可測で非負です。従って $A$ は可積分な予測可能非減少過程です。さらに

$$
\begin{aligned}
E[\Delta M_k\mid\mathcal F_{k-1}]
&=E[\Delta X_k-a_k\mid\mathcal F_{k-1}]\\
&=a_k-a_k=0.
\end{aligned}
$$

$M$ は可積分・適合でもあるので、[差分判定](../SP7/index.md#prop-sp7-difference-representation)によりマルチンゲールになります。

**なぜ一意か。** $X=M+A=\widetilde M+\widetilde A$ が同じ性質を持つなら、$D_n=M_n-\widetilde M_n=\widetilde A_n-A_n$ はマルチンゲールで、$n\ge1$ では $\mathcal F_{n-1}$ 可測です。従って

$$
D_n=E[D_n\mid\mathcal F_{n-1}]=D_{n-1}.
$$

$D_0=0$ だから帰納法で全時刻 $D_n=0$。よって $A=\widetilde A$、$M=\widetilde M$ です。存在だけでなく一意性までが、予測可能性という条件に支えられています。

### 例：二乗した公平ランダムウォーク

$S_n=S_{n-1}+\xi_n$、$S_0=0$ とし $X_n=S_n^2$ とします。$\xi_n^2=1$、$E[\xi_n\mid\mathcal F_{n-1}]=0$ なので

$$
\begin{aligned}
a_n
&=E[S_n^2-S_{n-1}^2\mid\mathcal F_{n-1}]\\
&=E[2S_{n-1}\xi_n+\xi_n^2\mid\mathcal F_{n-1}]\\
&=2S_{n-1}\cdot0+1=1.
\end{aligned}
$$

よって $A_n=n$、$M_n=S_n^2-n$ です。[SP7 の条件付き二乗補正](../SP7/index.md#prop-sp7-square-compensation)と一致します。$X_n$ の値は上下しますが、**平均増加を予測する部分 $A_n$ は単調に増えます**。$X$ 自体が単調に増えるという意味ではありません。

## 6. 停止と分解は両立する

Doob 分解 $X=M+A$ に停止時刻を適用すると、期待増加の部分も同じ時刻で止まるのでしょうか。ここには新しい、具体的に使える結論があります。

<a id="prop-sp8-doob-stop"></a>

<!-- formal-statement-start -->
> **命題（Doob 分解と停止の整合）**  
> $(X_n)_{n\ge0}$ を可積分な劣マルチンゲールとし、$X=M+A$ を [離散時間 Doob 分解](../../STO/STO2/index.md#thm-sto2-doob-decomposition)とする。$\tau$ が $\{0,1,\dots\}\cup\{\infty\}$ に値を取る停止時刻なら、停止劣マルチンゲール $X^\tau$ の Doob 分解は
>
$$
X_{n\wedge\tau}=M_{n\wedge\tau}+A_{n\wedge\tau}\qquad(n\ge0)
$$
>
> である。特に $A^\tau$ は予測可能・非減少であり、元の $A$ の停止として一意に定まる。
<!-- formal-statement-end -->

### 証明の見取り図

停止すると第 $k$ 回の増分が $\boldsymbol{1}_{\{\tau\ge k\}}$ 倍になります。この係数は $\mathcal F_{k-1}$ 可測であり、元の予測可能増分 $\Delta A_k$ と掛けても予測可能性を保ちます。公平な部分は[停止定理](../../STO/STO2/index.md#thm-sto2-stopped-martingale)で公平なままです。

<!-- proof-start -->
### 証明

$A_0=0$、$A_n$ は可積分で $\mathcal F_{n-1}$ 可測、$\Delta A_k\ge0$ です。経路ごとに

$$
A_{n\wedge\tau}=\sum_{k=1}^n\boldsymbol{1}_{\{\tau\ge k\}}\Delta A_k.
$$

時刻 $k$ の被加数は、停止時刻性による $\{\tau\ge k\}\in\mathcal F_{k-1}$ と $\Delta A_k\in\mathcal F_{k-1}$ の積で、$\mathcal F_{k-1}$ 可測です。したがって $A_{n\wedge\tau}$ は $n\ge1$ で $\mathcal F_{n-1}$ 可測です。各増分は非負で、可積分性は $0\le A_{n\wedge\tau}\le A_n$ から従います。

[停止定理](../../STO/STO2/index.md#thm-sto2-stopped-martingale)により $M^\tau$ はマルチンゲールです。さらに $X^\tau=M^\tau+A^\tau$ なので $X^\tau$ は可積分・適合な劣マルチンゲールであり、上で確認した諸条件とともに Doob 分解になっています。最後に[Doob 分解の一意性](../../STO/STO2/index.md#thm-sto2-doob-decomposition)を適用すれば他の分解はありません。
<!-- proof-end -->

この命題を $X_n=S_n^2$ に適用すると、$A_n=n$ を止めた補償項は $A^\tau_n=n\wedge\tau$ です。従って

$$
S_{n\wedge\tau}^2-(n\wedge\tau)
$$

はマルチンゲールになります。$n\wedge\tau$ は時刻とともに増えますが、停止後は増えない点を確認してください。

## 7. 止めるまでの予測可能な増加を数える

停止を通して劣マルチンゲールの平均がいくら増えるかは、Doob 分解の $A$ を使うと**一項ずつ**計算できます。

<a id="prop-sp8-stopped-drift"></a>

<!-- formal-statement-start -->
> **命題（有界停止時刻の予測可能増加公式）**  
> $X$ を可積分な劣マルチンゲールとし、
>
$$
a_k:=E[X_k-X_{k-1}\mid\mathcal F_{k-1}]\ge0
$$
>
> と置く。$\tau$ が停止時刻で、ある整数 $N<\infty$ について $0\le\tau\le N$ a.s. なら
>
$$
E[X_\tau]-E[X_0]
=\sum_{k=1}^N E[\boldsymbol{1}_{\{\tau\ge k\}}a_k]\ge0.
$$
>
> 特に $S_0=0$ から出発する公平 $\pm1$ ランダムウォーク $S$ に対し $X_n=S_n^2$ と置けば
>
$$
E[S_\tau^2]=E[\tau].
$$
<!-- formal-statement-end -->

### 証明の見取り図

増分を停止で切り、時刻 $k-1$ で条件付けてから期待値を取ります。二乗歩行では $a_k=1$ なので、指示関数の和が経路ごとに停止歩数 $\tau$ になります。

<!-- proof-start -->
### 証明

$X_\tau-X_0=\sum_{k=1}^N\boldsymbol{1}_{\{\tau\ge k\}}\Delta X_k$ は有限和で、すべて可積分です。$\boldsymbol{1}_{\{\tau\ge k\}}$ は $\mathcal F_{k-1}$ 可測なので

$$
\begin{aligned}
E[X_\tau-X_0]
&=\sum_{k=1}^N E[\boldsymbol{1}_{\{\tau\ge k\}}\Delta X_k]\\
&=\sum_{k=1}^N E[\boldsymbol{1}_{\{\tau\ge k\}}E[\Delta X_k\mid\mathcal F_{k-1}]]\\
&=\sum_{k=1}^N E[\boldsymbol{1}_{\{\tau\ge k\}}a_k].
\end{aligned}
$$

$a_k\ge0$ だから右辺は非負です。二乗歩行には前節の計算 $a_k=1$ を代入します。また整数値 $\tau\le N$ に対し各標本路で $\sum_{k=1}^N\boldsymbol{1}_{\{\tau\ge k\}}=\tau$ なので、$S_0=0$ と合わせ $E[S_\tau^2]=E[\tau]$ です。
<!-- proof-end -->

例えば第1回が表なら止め、裏なら第2回まで続ける前述の $\tau$ について $P(\tau=1)=P(\tau=2)=1/2$、従って $E[\tau]=3/2$ です。一方 $S_\tau^2$ は、確率 $1/2$ で $1$、$1/4$ で $0$、$1/4$ で $4$ なので

$$
E[S_\tau^2]=\frac12\cdot1+\frac14\cdot0+\frac14\cdot4=\frac32.
$$

これは、**利益 $S_\tau$ の平均はゼロでも、損益の二乗は平均参加回数だけ増える**ことを表します。

## 8. 演習 A：停止と差分の定義を手で確かめる

#### SP8-A01 二回のコインと停止時刻
- Level: A

独立な公平 $\pm1$ コイン $\xi_1,\xi_2$ と自然なフィルトレーションについて、$\tau=1$（$\xi_1=1$）、$\tau=2$（$\xi_1=-1$）を定める。停止時刻条件をすべて確認し、$P(\tau=1),P(\tau=2),E[\tau]$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\mathcal F_0$ は自明で $\{\tau\le0\}=\varnothing\in\mathcal F_0$、$\{\tau\le1\}=\{\xi_1=1\}\in\mathcal F_1$、$\{\tau\le n\}=\Omega\in\mathcal F_n$（$n\ge2$）です。従って[停止時刻の定義](../../STO/STO1/index.md#def-sto1-stopping-time)を満たします。独立性以前に公平性から $P(\tau=1)=P(\xi_1=1)=1/2$、$P(\tau=2)=1/2$ で、

$$
E[\tau]=1\cdot\frac12+2\cdot\frac12=\frac32.
$$
<!-- solution-end -->

#### SP8-A02 停止増分を展開する
- Level: A

公平コインの歩行 $S_n=\sum_{k=1}^n\xi_k$ と A01 の $\tau$ に対し、$S_{2\wedge\tau}$ を指示関数で表し、三つの値 $1,0,-2$ の確率と期待値を求めよ。

<!-- solution-start -->
### 詳細解答

$S_{2\wedge\tau}=\xi_1+\boldsymbol{1}_{\{\tau\ge2\}}\xi_2=\xi_1+\boldsymbol{1}_{\{\xi_1=-1\}}\xi_2$ です。$\xi_1=1$ なら常に $1$ で確率 $1/2$、$\xi_1=-1,\xi_2=1$ なら $0$ で確率 $1/4$、両方 $-1$ なら $-2$ で確率 $1/4$ です。従って

$$
E[S_{2\wedge\tau}]=1\cdot\frac12+0\cdot\frac14-2\cdot\frac14=0.
$$

停止しても平均ゼロですが $S_2$ の分布とは異なります。
<!-- solution-end -->

#### SP8-A03 停止時刻までの情報
- Level: A

A01 の $\tau$ について、$B=\{\xi_1=1\}$ が $\mathcal F_\tau$ に属することを定義から示せ。一方、$C=\{\xi_2=1\}$ は $\mathcal F_\tau$ に属さないことを示せ。

<!-- solution-start -->
### 詳細解答

[停止時刻までの情報の定義](../../STO/STO1/index.md#def-sto1-stopping-sigma-field)では、任意の $n$ で $D\cap\{\tau\le n\}\in\mathcal F_n$ が必要です。$B$ は $n=0$ では空集合、$n=1$ で $B$、$n\ge2$ でも $B$ となり、各時刻で可測です。ゆえに $B\in\mathcal F_\tau$ です。

$C$ に対して $n=1$ を調べると $C\cap\{\tau\le1\}=\{\xi_2=1,\xi_1=1\}$ となります。$\mathcal F_1=\sigma(\xi_1)$ は第1回の符号だけを区別するので、$\xi_1=1$ の二つの標本を分けるこの事象は $\mathcal F_1$ に入りません。従って $C\notin\mathcal F_\tau$ です。
<!-- solution-end -->

#### SP8-A04 条件付き任意抽出
- Level: A

A01 の歩行に対し $\sigma=1$、$\tau$ を A01 のままとする。$E[S_\tau\mid\mathcal F_\sigma]$ を直接計算せよ。

<!-- solution-start -->
### 詳細解答

$\sigma=1$ は定数停止時刻で $\mathcal F_\sigma=\mathcal F_1$ です。$S_\tau=\xi_1+\boldsymbol{1}_{\{\xi_1=-1\}}\xi_2$ なので、$\xi_2$ と $\mathcal F_1$ の独立性から

$$
E[S_\tau\mid\mathcal F_\sigma]
=\xi_1+\boldsymbol{1}_{\{\xi_1=-1\}}E[\xi_2\mid\mathcal F_1]
=\xi_1=S_1=S_\sigma.
$$

これが[有界任意抽出](../../STO/STO2/index.md#thm-sto2-bounded-optional-sampling)の条件付き結論です。
<!-- solution-end -->

#### SP8-A05 予測可能な二乗増加
- Level: A

独立な公平 $\pm1$ コインの歩行 $S$ とその自然なフィルトレーションについて $X_n=S_n^2$ とする。$a_k=E[X_k-X_{k-1}\mid\mathcal F_{k-1}]$ を展開して求め、Doob 分解 $X=M+A$ を書け。

<!-- solution-start -->
### 詳細解答

$S_k=S_{k-1}+\xi_k$ から $\Delta X_k=2S_{k-1}\xi_k+\xi_k^2$。$S_{k-1}$ は $\mathcal F_{k-1}$ 可測、$\xi_k$ は過去と独立で平均ゼロ、$\xi_k^2=1$ です。従って

$$
a_k=2S_{k-1}\cdot0+1=1,\qquad
A_n=\sum_{k=1}^n1=n,\quad M_n=S_n^2-n.
$$

$A_0=0$ で予測可能・非減少、$M$ は[差分判定](../SP7/index.md#prop-sp7-difference-representation)からマルチンゲールであり、[Doob 分解](../../STO/STO2/index.md#thm-sto2-doob-decomposition)の条件を満たします。
<!-- solution-end -->

## 9. 演習 B：停止と補償を組み合わせる

#### SP8-B01 偏った歩行の Doob 分解
- Level: B

独立な $\pm1$ 変数で $P(\xi_k=1)=3/4$、$P(\xi_k=-1)=1/4$ とし、コイン列の自然なフィルトレーションを用いる。$X_n=\sum_{k=1}^n\xi_k$、$X_0=0$ に対し Doob 分解を作り、$X$ が劣マルチンゲールであること、分解の一意性をこの例で確認せよ。

<!-- solution-start -->
### 詳細解答

$E[\xi_k]=3/4-1/4=1/2$ で、$X$ は有限和なので可積分・適合です。$E[\Delta X_k\mid\mathcal F_{k-1}]=1/2\ge0$ だから劣マルチンゲールです。

$$
A_n=\sum_{k=1}^n\frac12=\frac n2,\qquad
M_n=X_n-\frac n2.
$$

$\Delta M_k=\xi_k-1/2$ は有界・$\mathcal F_k$ 可測で条件付き平均ゼロ、従って $M$ はマルチンゲールです。$A_n=n/2$ は $\mathcal F_{n-1}$ 可測で非減少です。他の分解 $\widetilde M+\widetilde A=X$ があれば差 $D_n=M_n-\widetilde M_n=\widetilde A_n-A_n$ は直前時刻に可測なマルチンゲールなので、$D_n=E[D_n\mid\mathcal F_{n-1}]=D_{n-1}$、$D_0=0$。したがって $D=0$ で分解は一意です。
<!-- solution-end -->

#### SP8-B02 二乗歩行の停止補償
- Level: B

A01 の $\tau$ と公平歩行 $S$ について、停止した劣マルチンゲール $X^\tau_n=S_{n\wedge\tau}^2$（$n=0,1,2$）の Doob 分解を書き、$E[S_\tau^2]=E[\tau]$ を分布からも検算せよ。

<!-- solution-start -->
### 詳細解答

元の $X_n=S_n^2$ の Doob 分解は A05 より $M_n=S_n^2-n$、$A_n=n$ です。[停止と分解の整合](#prop-sp8-doob-stop)を適用すると

$$
X^\tau_n=(S_{n\wedge\tau}^2-(n\wedge\tau))+(n\wedge\tau).
$$

したがって $M^\tau_n=S_{n\wedge\tau}^2-(n\wedge\tau)$、$A^\tau_n=n\wedge\tau$ です。特に $n=2$ で $A^\tau_2=\tau$ は $1$ または $2$ です。$S_\tau$ は確率 $1/2$ で $1$、$1/4$ で $0$、$1/4$ で $-2$ なので

$$
E[S_\tau^2]=\frac12\cdot1+\frac14\cdot0+\frac14\cdot4=\frac32
=1\cdot\frac12+2\cdot\frac12=E[\tau].
$$

値を直接列挙した検算と[予測可能増加公式](#prop-sp8-stopped-drift)が一致しました。
<!-- solution-end -->

#### SP8-B03 二つのランダムな停止時刻
- Level: B

独立な公平コイン $\xi_1,\xi_2,\xi_3$ とその自然なフィルトレーションに対し、$S_n=\sum_{k=1}^n\xi_k$、$\sigma=1$（$\xi_1=1$ の場合）、$\sigma=2$（$\xi_1=-1$ の場合）、$\tau=3$ とする。$\sigma,\tau$ の停止時刻性を示し、$E[S_\tau\mid\mathcal F_\sigma]=S_\sigma$ を停止時刻の各場合について検証せよ。

<!-- solution-start -->
### 詳細解答

$\sigma$ は第1回の結果だけで $1$ または $2$ と決まり、$\{\sigma\le1\}=\{\xi_1=1\}\in\mathcal F_1$、$\{\sigma\le2\}=\Omega$ です。$\tau=3$ は定数停止時刻です。$0\le\sigma\le\tau\le3$ なので[有界任意抽出](../../STO/STO2/index.md#thm-sto2-bounded-optional-sampling)を適用できますが、ここでは計算します。

なぜ停止時刻ごとに固定時刻の条件付き平均で計算できるのでしょうか。[停止時刻までの情報の定義](../../STO/STO1/index.md#def-sto1-stopping-sigma-field)から、任意の $B\in\mathcal F_\sigma$ と $j=1,2$ について

$
B\cap\{\sigma=j\}
=(B\cap\{\sigma\le j\})\setminus(B\cap\{\sigma\le j-1\})
\in\mathcal F_j
$

です。したがって可積分な $Y$ について、$\{\sigma=j\}$ 上では $E[Y\mid\mathcal F_\sigma]$ と $E[Y\mid\mathcal F_j]$ が一致します。実際、上式から各 $B\in\mathcal F_\sigma$ で両者の $\boldsymbol{1}_{B\cap\{\sigma=j\}}$ を掛けた積分が一致し、$\boldsymbol{1}_{\{\sigma=j\}}E[Y\mid\mathcal F_j]$ 自身も $\mathcal F_\sigma$ 可測なので、条件付き期待値の特徴付けを使えます。

ここで $\xi_2,\xi_3$ は $\mathcal F_1$ と独立、$\xi_3$ は $\mathcal F_2$ と独立で、いずれも平均ゼロです。従って

$$
\begin{aligned}
\boldsymbol{1}_{\{\sigma=1\}}E[S_3\mid\mathcal F_\sigma]
&=\boldsymbol{1}_{\{\sigma=1\}}\bigl(\xi_1+E[\xi_2+\xi_3\mid\mathcal F_1]\bigr)
=\boldsymbol{1}_{\{\sigma=1\}}S_1,\\
\boldsymbol{1}_{\{\sigma=2\}}E[S_3\mid\mathcal F_\sigma]
&=\boldsymbol{1}_{\{\sigma=2\}}\bigl(S_2+E[\xi_3\mid\mathcal F_2]\bigr)
=\boldsymbol{1}_{\{\sigma=2\}}S_2.
\end{aligned}
$$

$\{\sigma=1\}$ と $\{\sigma=2\}$ が全体を分割するので両式を足して $E[S_3\mid\mathcal F_\sigma]=S_\sigma$ です。条件付ける情報は一定の $\mathcal F_1$ ではなく停止時刻に応じて変わる点に注意します。
<!-- solution-end -->

#### SP8-B04 倍賭けの有限時刻平均
- Level: B

独立な公平コインとその自然なフィルトレーションについて、初めて表が出る時刻 $T$、係数 $H_k=2^{k-1}\boldsymbol{1}_{\{T\ge k\}}$、損益 $G_n=\sum_{k=1}^nH_k\xi_k$ を考える。(1) $H_k$ の予測可能性、(2) $G_{T\wedge n}$ の二点分布と平均、(3) $G_T=1$ a.s. を示し、期待値の極限操作がなぜ不可能か説明せよ。

<!-- solution-start -->
### 詳細解答

(1) $\{T\ge k\}=\{\xi_1=\cdots=\xi_{k-1}=-1\}$ は $\mathcal F_{k-1}$ 可測です。各 $H_k$ は有限値で予測可能、$\xi_k$ は $\mathcal F_{k-1}$ と独立で平均ゼロなので $E[H_k\xi_k\mid\mathcal F_{k-1}]=0$ です。

(2) $H_k=0$（$k>T$）なので $G_{T\wedge n}=G_n$ です。第 $n$ 回までの成功確率は $1-2^{-n}$、全敗確率は $2^{-n}$ です。成功すれば損失の幾何和 $2^{k-1}-1$ を最後の勝ちで相殺して利益 $1$、全敗なら損失 $-\sum_{j=0}^{n-1}2^j=-(2^n-1)$ です。ゆえに

$$
E[G_{T\wedge n}]=1\cdot(1-2^{-n})-(2^n-1)2^{-n}=0.
$$

(3) 最初の成功時刻について $P(T>n)=2^{-n}\to0$ なので、$T<\infty$ は確率 $1$ で成立します。各標本路では有限回の敗北の後、最後の勝ちで損失を取り返すため、

$$
G_T=1\quad\text{a.s.},\qquad E[G_T]=1.
$$

しかし各有限 $n$ について $E[G_{T\wedge n}]=0$ でした。原因は、まれな全敗事象 $\{T>n\}$ の損失が増大することです。その損失の確率による重みは

$$
P(T>n)(2^n-1)=(2^n-1)2^{-n}\longrightarrow1
$$

となり、ゼロには近づきません。従って極限と期待値を交換するための支配・尾部制御がなく、[有界任意抽出](../../STO/STO2/index.md#thm-sto2-bounded-optional-sampling)を非有界 $T$ へそのまま適用できません。
<!-- solution-end -->

## 10. 演習 C：破産問題を停止と補償で再び解く

#### SP8-C01 有限区間の破産確率と平均吸収時間
- Level: C

$N\ge2$、$1\le i\le N-1$ とし、独立な公平 $\pm1$ コイン $\xi_k$ と自然なフィルトレーションの下で、歩行 $S_0=i$、$S_n=i+\sum_{k=1}^n\xi_k$ を考える。初期位置が $i$ の場合の確率と期待値を $P_i,E_i$ と書く（ここでは $S_0=i$ を固定した $P,E$ と同じ）。$\tau=\inf\{n\ge0:S_n\in\{0,N\}\}$、$Z_n=S_{n\wedge\tau}$ とする。[SP6 の吸収時刻の幾何級数型評価](../SP6/index.md#lem-sp6-geometric-tail)により $\tau<\infty$ a.s. かつ $E[\tau]<\infty$ としてよい（ただし下記の極限交換では理由を示す）。

1. $Z$ が有界マルチンゲールであることを差分から証明せよ。
2. $P_i(S_\tau=N)=i/N$ を、有界時刻 $\tau\wedge n$ から出発して導け。
3. $Z_n^2-(n\wedge\tau)$ がマルチンゲールであることを Doob 分解と停止から導き、$E_i[\tau]=i(N-i)$ を示せ。
4. $\tau$ が決定論的な有限時刻で抑えられるとは限らないのに、2・3の極限を取れる理由をそれぞれ説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 停止差分。** 境界に達する前は $\xi_k$ だけ動き、達した後は値を固定するので、経路ごとに

$$
Z_n=i+\sum_{k=1}^n\boldsymbol{1}_{\{\tau\ge k\}}\xi_k.
$$

$\{\tau\ge k\}\in\mathcal F_{k-1}$、$\xi_k$ は過去と独立で平均ゼロです。各項は有界で $\mathcal F_k$ 可測、従って $E[\boldsymbol{1}_{\{\tau\ge k\}}\xi_k\mid\mathcal F_{k-1}]=0$。[SP7 の差分判定](../SP7/index.md#prop-sp7-difference-representation)により $Z$ はマルチンゲールです。吸収前後とも $0\le Z_n\le N$ なので有界です。

**2. 到達確率。** $\tau\wedge n$ は $n$ 以下の停止時刻なので[有界任意抽出](../../STO/STO2/index.md#thm-sto2-bounded-optional-sampling)を $S$ に用いて $E_i[S_{\tau\wedge n}]=i$。$\tau<\infty$ a.s. から $S_{\tau\wedge n}\to S_\tau$ a.s.、かつ $0\le S_{\tau\wedge n}\le N$ なので有界収束定理により

$$
i=\lim_{n\to\infty}E_i[S_{\tau\wedge n}]
=E_i[S_\tau].
$$

終端値は $0$ または $N$ だから $E_i[S_\tau]=N P_i(S_\tau=N)$ です。ゆえに $P_i(S_\tau=N)=i/N$。

**3. 平均時間。** 二乗差分を展開すると、$S_{k-1}$ が $\mathcal F_{k-1}$ 可測なので

$$
E[S_k^2-S_{k-1}^2\mid\mathcal F_{k-1}]
=E[2S_{k-1}\xi_k+\xi_k^2\mid\mathcal F_{k-1}]=1.
$$

元の $S_n^2$ の Doob 分解は $S_n^2=(S_n^2-n)+n$。よって[停止と分解の整合](#prop-sp8-doob-stop)から

$$
Z_n^2-(n\wedge\tau)=S_{\tau\wedge n}^2-(\tau\wedge n)
$$

はマルチンゲールです。従って初期値との期待値の一致より

$$
E_i[S_{\tau\wedge n}^2]-E_i[\tau\wedge n]=i^2.
$$

左辺の第1項は $0\le S_{\tau\wedge n}^2\le N^2$ により有界収束、第2項は $0\le\tau\wedge n\uparrow\tau$ により単調収束を適用します。[SP6 の吸収時刻評価](../SP6/index.md#lem-sp6-geometric-tail)により $E_i[\tau]<\infty$ です。従って

$$
E_i[S_\tau^2]-E_i[\tau]=i^2.
$$

2の到達確率から $E_i[S_\tau^2]=N^2(i/N)=Ni$ です。よって

$$
\boxed{E_i[\tau]=Ni-i^2=i(N-i)}.
$$

**4. 仮定の位置。** $\tau$ 自体は有界とは限らないため、任意抽出を直接 $\tau$ に適用していません。各有限 $n$ の $\tau\wedge n$ へ適用し、2では位置 $S_{\tau\wedge n}$ の有界性から有界収束を、3では二乗の有界性と $\tau\wedge n\uparrow\tau$ から有界収束・単調収束を**別々に**使いました。非有界停止でも平均保存が成り立つのは、この例に固有の補助的な有界性と極限交換の根拠があるためです。
<!-- solution-end -->

## 11. この講義のまとめ

- 停止時刻は、次の増分を採用するかどうかを **一時刻前の情報**で決める条件です。[停止定理](../../STO/STO2/index.md#thm-sto2-stopped-martingale)はこの予測可能な係数から導けます。
- [有界任意抽出](../../STO/STO2/index.md#thm-sto2-bounded-optional-sampling)は $\mathcal F_\sigma$ についての条件付き等式・不等式であり、単なる期待値の等式より強い結果です。
- 非有界停止では極限と期待値の交換が別途必要です。倍賭けでは平均ゼロの有限停止を極限に送ると期待値が変わりました。
- [Doob 分解](../../STO/STO2/index.md#thm-sto2-doob-decomposition)は予測可能な平均増加 $A$ と公平な部分 $M$ を分離します。停止しても[分解の整合](#prop-sp8-doob-stop)が保たれ、[有界停止時の増加公式](#prop-sp8-stopped-drift)で平均変化を数えられます。
- 次の SP9 では、停止を利用して最大偏差、上向き横断回数、収束を扱います。
