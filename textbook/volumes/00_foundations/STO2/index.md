# STO2：離散時間 martingale — 公平性から経路収束まで

<!-- definition-example-audit: strict -->

STO1 では、時間とともに情報が増える filtration と、未来を見ずに停止する stopping time を作りました。

離散時間 martingale は、その情報構造の上で

$$
oxed{
	ext{「次の値の条件付き平均 = 現在値」}
}
$$

を満たす過程です。

しかし martingale 理論の本体は「公平ゲーム」という比喩だけではありません。この章では

$$
	ext{martingale}
	o
	ext{predictable transform}
	o
	ext{stopping}
	o
	ext{optional sampling}
	o
	ext{Doob decomposition}
	o
	ext{maximal / upcrossing inequality}
	o
	ext{a.s. convergence}
	o
	ext{UI + }L^1	ext{ convergence}
$$

という一本の証明鎖を閉じます。

特に、収束定理では「期待値が bounded だから収束する」のではなく、

1. upcrossing が無限回起きないことを示す、
2. その結果 liminf と limsup を一致させる、
3. 最後に極限が有限・可積分であることを示す、

という機構を追います。

---

## 1. martingale・submartingale・supermartingale

以後、$(\Omega,\mathcal F,P)$ を確率空間、$(\mathcal F_n)_{n\ge0}$ を filtration とします。

<a id="def-sto2-martingale"></a>

<!-- formal-statement-start -->
> **定義（martingale・submartingale・supermartingale）**  
> 実数値過程 $X=(X_n)_{n\ge0}$ が各 $n$ で $\mathcal F_n$ 可測かつ
>
$$
E|X_n|<\infty
$$
>
> を満たすとする。
>
> - 各 $n$ で
>
$$
E[X_{n+1}\mid\mathcal F_n]=X_n
$$
>
> が成り立つとき、$X$ を **martingale** という。
>
> - 各 $n$ で
>
$$
E[X_{n+1}\mid\mathcal F_n]\ge X_n
$$
>
> が成り立つとき、$X$ を **submartingale** という。
>
> - 各 $n$ で
>
$$
E[X_{n+1}\mid\mathcal F_n]\le X_n
$$
>
> が成り立つとき、$X$ を **supermartingale** という。
<!-- formal-statement-end -->

adaptedness と integrability は飾りではありません。条件付き期待値
$E[X_{n+1}\mid\mathcal F_n]$ を現在値 $X_n$ と比較するために必要です。

martingale なら tower property により、$m\ge n$ に対して

$$
E[M_m\mid\mathcal F_n]=M_n.
$$

特に

$$
E[M_m]=E[M_n]=E[M_0].
$$

ただし「平均が一定」だけでは martingale とは限りません。現在の情報を条件にした平均が保存されることが本質です。

<!-- definition-example-start: def-sto2-martingale -->
### 直接例：公平ランダムウォークとその二乗

独立な確率変数 $\xi_1,\xi_2,\ldots$ が

$$
P(\xi_k=1)=P(\xi_k=-1)=\frac12
$$

を満たすとし、

$$
S_0=0,
\qquad
S_n=\sum_{k=1}^n\xi_k,
\qquad
\mathcal F_n=\sigma(\xi_1,\ldots,\xi_n)
$$

と置きます。

**martingale の確認。**

$S_n$ は $\mathcal F_n$ 可測で $E|S_n|<\infty$ です。また $\xi_{n+1}$ は $\mathcal F_n$ と独立で平均 0 なので

$$
E[S_{n+1}\mid\mathcal F_n]
=
S_n+E[\xi_{n+1}\mid\mathcal F_n]
=
S_n.
$$

従って $(S_n)$ は martingale です。

**submartingale の確認。**

$$
S_{n+1}^2
=
S_n^2+2S_n\xi_{n+1}+\xi_{n+1}^2
$$

より

$$
E[S_{n+1}^2\mid\mathcal F_n]
=
S_n^2+1
\ge S_n^2.
$$

従って $(S_n^2)$ は submartingale です。

同じ式から

$$
S_n^2-n
$$

は martingale になります。二乗の平均増加分 $1$ を差し引く発想は、後の Doob decomposition の最小例です。

また $-S_n^2$ は supermartingale です。
<!-- definition-example-end -->

---

## 2. 「次の増分を見る前に」係数を決める

STO1 では predictable process を連続時間も含む形で導入しました。離散時間では意味が非常に具体的です。

<a id="def-sto2-predictable-transform"></a>

<!-- formal-statement-start -->
> **定義（離散時間 predictable process と predictable transform）**  
> 過程 $H=(H_n)_{n\ge1}$ が
>
$$
H_n\text{ は }\mathcal F_{n-1}\text{ 可測}
$$
>
> を全ての $n\ge1$ で満たすとき、$H$ を離散時間の **predictable process** という。
>
> 過程 $X=(X_n)$ に対し
>
$$
(H\cdot X)_0:=0,
\qquad
(H\cdot X)_n
:=
\sum_{k=1}^n
H_k(X_k-X_{k-1})
$$
>
> を **predictable transform** という。
<!-- formal-statement-end -->

$H_k$ は $k$ 番目の増分

$$
\Delta X_k:=X_k-X_{k-1}
$$

を見る前に決まっています。

<!-- definition-example-start: def-sto2-predictable-transform -->
### 直接例：前時刻の符号で次の賭け額を決める

公平ランダムウォーク $S_n$ に対して

$$
H_k
=
1_{\{S_{k-1}\ge0\}}
$$

と置きます。

$S_{k-1}$ は $\mathcal F_{k-1}$ 可測なので $H_k$ も $\mathcal F_{k-1}$ 可測です。従って $H$ は predictable です。

変換

$$
G_n
=
\sum_{k=1}^n
1_{\{S_{k-1}\ge0\}}(S_k-S_{k-1})
$$

は、「直前までの情報で参加するかを決め、次のコイントスの結果だけを損益に入れる」戦略です。

もし $H_k=1_{\{S_k\ge0\}}$ とすれば、$k$ 回目の結果を見た後で係数を選んでおり、一般には predictable ではありません。
<!-- definition-example-end -->

<a id="prop-sto2-predictable-transform"></a>

<!-- formal-statement-start -->
> **命題（predictable transform）**  
> $M$ を martingale、$H$ を bounded predictable process とする。このとき $H\cdot M$ は martingale である。
>
> また $X$ を submartingale、$H$ を **非負** bounded predictable process とする。このとき $H\cdot X$ は submartingale である。
<!-- formal-statement-end -->

### 証明の見取り図

predictable であるため $H_{n+1}$ を $\mathcal F_n$ 条件付き期待値の外へ出せます。

martingale では次増分の条件付き平均が 0、submartingale では 0 以上です。submartingale の場合に $H\ge0$ が必要なのは、不等号の向きを保つためです。

<!-- proof-start -->
### 証明

$G:=H\cdot X$ とします。$H$ が bounded なので各有限時刻の $G_n$ は可積分で、adapted です。

submartingale の場合、

$$
G_{n+1}-G_n
=
H_{n+1}(X_{n+1}-X_n).
$$

$H_{n+1}$ は $\mathcal F_n$ 可測かつ非負なので

$$
\begin{aligned}
E[G_{n+1}-G_n\mid\mathcal F_n]
&=
H_{n+1}
E[X_{n+1}-X_n\mid\mathcal F_n]\\
&\ge0.
\end{aligned}
$$

従って $G$ は submartingale です。

$X=M$ が martingale なら右辺の条件付き平均は 0 なので、$H$ の符号に関係なく

$$
E[G_{n+1}\mid\mathcal F_n]=G_n.
$$

よって $H\cdot M$ は martingale です。
<!-- proof-end -->

---

## 3. stopping は「増分を途中から 0 にする」predictable transform

STO1 の [stopping time](../STO1/index.md#def-sto1-stopping-time) に対し

$$
X_n^\tau=X_{n\wedge\tau}
$$

を stopped process と呼びました。

<a id="thm-sto2-stopped-martingale"></a>

<!-- formal-statement-start -->
> **定理（stopped martingale / submartingale）**  
> $\tau$ を stopping time とする。
>
> - $M$ が martingale なら $M^\tau=(M_{n\wedge\tau})$ も martingale である。
> - $X$ が submartingale なら $X^\tau=(X_{n\wedge\tau})$ も submartingale である。
<!-- formal-statement-end -->

### 証明の見取り図

停止後の増分は 0 です。実際

$$
X_{(n+1)\wedge\tau}-X_{n\wedge\tau}
=
1_{\{\tau>n\}}(X_{n+1}-X_n).
$$

stopping time 性により

$$
\{\tau>n\}\in\mathcal F_n.
$$

つまり停止するかどうかは次の増分を見る前に決まっています。

<!-- proof-start -->
### 証明

まず場合分けから

$$
X_{(n+1)\wedge\tau}-X_{n\wedge\tau}
=
1_{\{\tau>n\}}(X_{n+1}-X_n)
$$

が成り立ちます。

$\tau\le n$ なら両辺 0、$\tau>n$ なら整数値停止時刻なので両辺とも $X_{n+1}-X_n$ です。

$1_{\{\tau>n\}}$ は $\mathcal F_n$ 可測かつ非負です。従って $X$ が submartingale なら

$$
\begin{aligned}
&E[X_{(n+1)\wedge\tau}-X_{n\wedge\tau}\mid\mathcal F_n]\\
&\qquad=
1_{\{\tau>n\}}
E[X_{n+1}-X_n\mid\mathcal F_n]
\ge0.
\end{aligned}
$$

martingale なら等号 0 です。

また $X_{n\wedge\tau}$ は $X_0,\ldots,X_n$ の有限個の値から選ばれるので可積分です。従って結論が従います。
<!-- proof-end -->

この定理は、停止操作が

$$
H_{n+1}=1_{\{\tau>n\}}
$$

という predictable 係数で増分を切る操作だと読むこともできます。

---

## 4. bounded optional sampling：random time でも条件付き平均を比較する

決定論的時刻 $m\le n$ なら submartingale は

$$
E[X_n\mid\mathcal F_m]\ge X_m
$$

を満たします。

optional sampling は $m,n$ を stopping time に置き換えます。

<a id="thm-sto2-bounded-optional-sampling"></a>

<!-- formal-statement-start -->
> **定理（bounded optional sampling）**  
> $X$ を submartingale とし、$\sigma,\tau$ を stopping times とする。ある決定論的 $N<\infty$ が存在して
>
$$
0\le\sigma\le\tau\le N
$$
>
> a.s. とする。このとき
>
$$
\boxed{
E[X_\tau\mid\mathcal F_\sigma]\ge X_\sigma
}
$$
>
> a.s. が成り立つ。
>
> 特に $M$ が martingale なら
>
$$
\boxed{
E[M_\tau\mid\mathcal F_\sigma]=M_\sigma
}
$$
>
> a.s. であり、
>
$$
E[M_\tau]=E[M_\sigma]=E[M_0].
$$
<!-- formal-statement-end -->

### 証明の見取り図

差

$$
X_\tau-X_\sigma
$$

を、$\sigma$ から $\tau$ の間だけ増分を足す telescoping sum にします。

次に $A\in\mathcal F_\sigma$ を固定します。STO1 の stopping-time sigma-field の定義により

$$
A\cap\{\sigma\le k\}\in\mathcal F_k.
$$

ここに $\{\tau>k\}\in\mathcal F_k$ を掛けると、各増分へ掛かる指示関数が $\mathcal F_k$ 可測になります。

<!-- proof-start -->
### 証明

boundedness から $X_\sigma,X_\tau$ は有限個の $X_0,\ldots,X_N$ の混合なので可積分です。

経路ごとに

$$
X_\tau-X_\sigma
=
\sum_{k=0}^{N-1}
1_{\{\sigma\le k<\tau\}}
(X_{k+1}-X_k).
$$

$A\in\mathcal F_\sigma$ を任意に取ります。

$$
B_k
:=
A\cap\{\sigma\le k<\tau\}
$$

と置くと、

$$
A\cap\{\sigma\le k\}\in\mathcal F_k
$$

かつ

$$
\{\tau>k\}\in\mathcal F_k
$$

なので $B_k\in\mathcal F_k$ です。

従って submartingale 性から

$$
\begin{aligned}
E[1_{B_k}(X_{k+1}-X_k)]
&=
E\!\left[
1_{B_k}
E[X_{k+1}-X_k\mid\mathcal F_k]
\right]\\
&\ge0.
\end{aligned}
$$

有限和を取って

$$
E[1_A(X_\tau-X_\sigma)]\ge0.
$$

これは全ての $A\in\mathcal F_\sigma$ で成り立つので

$$
E[X_\tau\mid\mathcal F_\sigma]\ge X_\sigma.
$$

$X=M$ が martingale なら各増分の条件付き平均が 0 なので、全ての不等号が等号になり

$$
E[M_\tau\mid\mathcal F_\sigma]=M_\sigma.
$$

最後に期待値を取れば

$$
E[M_\tau]=E[M_\sigma]=E[M_0].
$$
<!-- proof-end -->

停止時刻が bounded であるため、この証明には極限交換がありません。非有界 stopping time で難しくなるのは、この先です。

---

## 5. Doob decomposition：submartingale の平均増加を分離する

submartingale は「martingale + 予測可能な上向き drift」と考えられます。

<a id="thm-sto2-doob-decomposition"></a>

<!-- formal-statement-start -->
> **定理（離散時間 Doob decomposition）**  
> $X=(X_n)_{n\ge0}$ を可積分 submartingale とする。このとき
>
$$
X_n=M_n+A_n
$$
>
> と一意に表せる。ここで
>
> - $M$ は martingale、
> - $A_0=0$、
> - $A_n$ は可積分、
> - $A_n$ は $n\ge1$ で $\mathcal F_{n-1}$ 可測、
> - $A_n$ は a.s. 非減少、
>
> である。
<!-- formal-statement-end -->

### まず何を引けばよいか

submartingale の一段平均増加は

$$
E[X_n-X_{n-1}\mid\mathcal F_{n-1}]
\ge0
$$

です。

そこでこの「時刻 $n-1$ で既に予測できる平均増分」を累積します。

### 直接例：$S_n^2$ の補償項

公平ランダムウォークでは

$$
E[S_n^2-S_{n-1}^2\mid\mathcal F_{n-1}]=1.
$$

したがって

$$
A_n=n,
\qquad
M_n=S_n^2-n.
$$

まさに先ほど見た martingale が現れます。

### 証明の見取り図

候補を

$$
A_n
=
\sum_{k=1}^n
E[X_k-X_{k-1}\mid\mathcal F_{k-1}]
$$

と置き、$M_n=X_n-A_n$ とします。

存在は一段ずつ条件付き平均を消せば終わります。一意性では、二つの分解の差が「martingale かつ一時刻前に既知」になるため、時間方向に変化できないことを使います。

<!-- proof-start -->
### 証明

$$
A_0:=0,
\qquad
A_n
:=
\sum_{k=1}^n
E[X_k-X_{k-1}\mid\mathcal F_{k-1}]
$$

と置きます。

各増分

$$
\Delta A_k
=
E[X_k-X_{k-1}\mid\mathcal F_{k-1}]
$$

は $\mathcal F_{k-1}$ 可測で、submartingale 性から非負です。従って $A_n$ は $\mathcal F_{n-1}$ 可測で非減少です。

$M_n:=X_n-A_n$ とすると

$$
\begin{aligned}
E[M_n-M_{n-1}\mid\mathcal F_{n-1}]
&=
E[X_n-X_{n-1}\mid\mathcal F_{n-1}]\\
&\quad-(A_n-A_{n-1})\\
&=0.
\end{aligned}
$$

よって $M$ は martingale です。

一意性を示します。別の分解

$$
X_n=M_n'+A_n'
$$

が同じ条件を満たすとします。

$$
D_n:=M_n-M_n'=A_n'-A_n
$$

と置くと、$D$ は martingale であり、$n\ge1$ では $\mathcal F_{n-1}$ 可測です。

従って

$$
D_n
=
E[D_n\mid\mathcal F_{n-1}]
=
D_{n-1}.
$$

$D_0=0$ なので帰納的に $D_n=0$。従って $M=M'$、$A=A'$ です。
<!-- proof-end -->

$A$ は後の連続時間理論で compensator と呼ばれる構造の原型です。

---

## 6. Doob maximal inequality：終端分布から途中最大値を抑える

確率過程では「時刻 $n$ の値」だけでなく

$$
\max_{0\le k\le n}X_k
$$

のような path 全体の最大値を制御したくなります。

<a id="thm-sto2-doob-maximal"></a>

<!-- formal-statement-start -->
> **定理（Doob maximal inequality）**  
> $X=(X_k)_{k=0}^n$ を submartingale とし、$\lambda>0$ とする。このとき
>
$$
\boxed{
\lambda
P\!\left(
\max_{0\le k\le n}X_k\ge\lambda
\right)
\le
E[X_n^+]
}
$$
>
> が成り立つ。ここで $x^+=\max(x,0)$ である。
<!-- formal-statement-end -->

### なぜ first hitting time を入れるのか

最大値の事象を

$$
A
=
\left\{
\max_{0\le k\le n}X_k\ge\lambda
\right\}
$$

とすると、「いつ初めて $\lambda$ に達したか」を stopping time で切り出せます。

### 証明の見取り図

$$
\tau
=
\inf\{k\ge0:X_k\ge\lambda\}
$$

とし、$\sigma=\tau\wedge n$ とします。

$A=\{\tau\le n\}$ 上では $X_\sigma\ge\lambda$ です。bounded optional sampling を $\sigma\le n$ に使い、$A$ 上で積分します。

<!-- proof-start -->
### 証明

$$
A
=
\{\tau\le n\}
=
\left\{
\max_{0\le k\le n}X_k\ge\lambda
\right\}
$$

とします。

$\sigma=\tau\wedge n$ は bounded stopping time です。また $A\in\mathcal F_\sigma$ です。実際、$k<n$ なら

$$
A\cap\{\sigma\le k\}
=
\{\tau\le k\}\in\mathcal F_k,
$$

$k\ge n$ なら $A\in\mathcal F_n\subseteq\mathcal F_k$ です。

bounded optional sampling より

$$
E[X_n\mid\mathcal F_\sigma]\ge X_\sigma.
$$

両辺へ $1_A$ を掛けて期待値を取ると

$$
E[1_AX_n]
\ge
E[1_AX_\sigma].
$$

$A$ 上では $X_\sigma=X_\tau\ge\lambda$ なので

$$
E[1_AX_n]
\ge
\lambda P(A).
$$

一方

$$
1_AX_n\le X_n^+.
$$

従って

$$
\lambda P(A)
\le
E[X_n^+].
$$
<!-- proof-end -->

この不等式は「途中で一度でも大きくなる確率」を、終端の正部分だけで制御しています。

---

## 7. upcrossing：無限振動を数える

a.s.収束を示すには、「値が上下に揺れ続ける可能性」を消す必要があります。

<a id="def-sto2-upcrossing"></a>

<!-- formal-statement-start -->
> **定義（upcrossing number）**  
> 実数列 $x_0,\ldots,x_n$ と $a<b$ に対し、区間 $[a,b]$ の **upcrossing** とは、時刻
>
$$
s_1<t_1<s_2<t_2<\cdots<s_m<t_m\le n
$$
>
> を選んで
>
$$
x_{s_j}\le a,
\qquad
x_{t_j}\ge b
$$
>
> を各 $j$ で満たす一組の横断をいう。
>
> このように完了できる最大個数を
>
$$
U_n[a,b]
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto2-upcrossing -->
### 直接例：一本の path で数える

path

$$
0,2,1,3,0,2
$$

を考え、$[a,b]=[1,2]$ とします。

- 時刻 $0$ で $0\le1$、時刻 $1$ で $2\ge2$：1 回目。
- その後、時刻 $2$ で $1\le1$、時刻 $3$ で $3\ge2$：2 回目。
- さらに時刻 $4$ で $0\le1$、時刻 $5$ で $2\ge2$：3 回目。

従って

$$
U_5[1,2]=3.
$$

upcrossing は単なる符号変化ではなく、「下側 level まで戻った後、上側 level へ到達する」という一往復の片側を数えます。
<!-- definition-example-end -->

---

## 8. Doob upcrossing inequality

<a id="thm-sto2-upcrossing"></a>

<!-- formal-statement-start -->
> **定理（Doob upcrossing inequality）**  
> $X=(X_k)_{k\ge0}$ を submartingale、$a<b$ とする。このとき任意の $n$ について
>
$$
\boxed{
(b-a)E[U_n[a,b]]
\le
E[(X_n-a)^+]
-
E[(X_0-a)^+]
}
$$
>
> が成り立つ。従って特に
>
$$
(b-a)E[U_n[a,b]]
\le
E[X_n^+]+|a|.
$$
<!-- formal-statement-end -->

### 何をしている不等式か

区間 $[a,b]$ を一回 upcrossing するたび、少なくとも $b-a$ の上昇があります。

ただし submartingale 自体は負値も取るため、そのまま「買って売る」議論をすると未決済ポジションの損失が邪魔になります。

そこで

$$
Y_k=(X_k-a)^+
$$

と切り上げます。$Y$ は非負で、$X$ の $[a,b]$ upcrossing は $Y$ の $[0,b-a]$ upcrossing と一致します。

### 証明の見取り図

1. $Y=(X-a)^+$ が submartingale であることを示す。
2. $Y=0$ で買い、$Y\ge b-a$ で売る predictable strategy $H$ を作る。
3. 完了した一回ごとに $b-a$ 以上の利益を得るため
   $$
   (H\cdot Y)_n\ge(b-a)U_n[a,b].
   $$
4. 補戦略 $1-H$ も非負 predictable なので、その期待利益が非負であることから
   $$
   E[(H\cdot Y)_n]\le E[Y_n]-E[Y_0].
   $$

<!-- proof-start -->
### 証明

まず

$$
Y_k:=(X_k-a)^+.
$$

$Y_k\ge X_k-a$ かつ $Y_k\ge0$ なので

$$
E[Y_{k+1}\mid\mathcal F_k]
\ge
E[X_{k+1}-a\mid\mathcal F_k]
\ge
X_k-a,
$$

かつ左辺は非負です。従って

$$
E[Y_{k+1}\mid\mathcal F_k]
\ge
\max(X_k-a,0)
=
Y_k.
$$

よって $Y$ は非負 submartingale です。

$c:=b-a>0$ と置きます。

$Y$ が 0 にいる時刻で 1 単位買い、その後初めて $c$ 以上になった時刻で売る、という操作を繰り返します。各時刻 $k$ の直前に「現在 1 単位保有中か」を表す $H_k\in\{0,1\}$ を取れば、$H_k$ は $\mathcal F_{k-1}$ 可測です。従って $H$ は非負 bounded predictable process です。

一回の完了 upcrossing では買値が 0、売値が少なくとも $c$ なので $c$ 以上の利益を得ます。時刻 $n$ に未決済なら、買値は 0 で $Y_n\ge0$ なので、その未決済部分も損失にはなりません。したがって pathwise に

$$
(H\cdot Y)_n
\ge
cU_n[a,b].
$$

次に $K_k:=1-H_k$ と置きます。$K$ も非負 bounded predictable です。predictable transform の命題から $K\cdot Y$ は submartingale で、初期値 0 なので

$$
E[(K\cdot Y)_n]\ge0.
$$

一方、各増分を $H_k+K_k=1$ で分割すると

$$
Y_n-Y_0
=
(H\cdot Y)_n+(K\cdot Y)_n.
$$

従って

$$
E[(H\cdot Y)_n]
\le
E[Y_n]-E[Y_0].
$$

以上から

$$
cE[U_n[a,b]]
\le
E[(H\cdot Y)_n]
\le
E[Y_n]-E[Y_0].
$$

$Y_k=(X_k-a)^+$、$c=b-a$ を戻せば

$$
(b-a)E[U_n[a,b]]
\le
E[(X_n-a)^+]-E[(X_0-a)^+].
$$

さらに

$$
(X_n-a)^+
\le
X_n^++|a|
$$

より第二の評価も従います。
<!-- proof-end -->

この不等式が、path の無限振動を確率 0 へ追い込む主役です。

---

## 9. submartingale a.s. convergence theorem

<a id="thm-sto2-submartingale-convergence"></a>

<!-- formal-statement-start -->
> **定理（submartingale a.s. convergence）**  
> $X=(X_n)_{n\ge0}$ を submartingale とし
>
$$
\sup_{n\ge0}E[X_n^+]<\infty
$$
>
> とする。このとき、ある $X_\infty\in L^1$ が存在して
>
$$
\boxed{
X_n\to X_\infty
\quad\text{a.s.}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### なぜ「正部分の期待値 bounded」でよいのか

submartingale では

$$
E[X_n]\ge E[X_0].
$$

したがって

$$
E[X_n^-]
=
E[X_n^+]-E[X_n]
\le
\sup_mE[X_m^+]-E[X_0].
$$

です。

つまり正部分だけを一様に抑えれば負部分も自動的に抑えられ、

$$
\sup_nE|X_n|<\infty
$$

になります。

### 証明の見取り図

1. 任意の有理数 $a<b$ に対し、upcrossing inequality から
   $E[U_\infty[a,b]]<\infty$ を得る。
2. よって $U_\infty[a,b]<\infty$ a.s.
3. もし $\liminf X_n<\limsup X_n$ なら、その間に有理数 $a<b$ を選べて無限回 upcrossing が起きる。矛盾。
4. 従って extended real 値の極限は存在する。
5. 一様 $L^1$ bound と Fatou により $\pm\infty$ を排除し、極限を $L^1$ に入れる。

<!-- proof-start -->
### 証明

$$
C:=\sup_nE[X_n^+]<\infty
$$

とします。

固定した有理数 $a<b$ に対し、$U_n[a,b]$ は $n$ とともに非減少です。従って

$$
U_\infty[a,b]
:=
\lim_{n\to\infty}U_n[a,b]
\in\{0,1,2,\ldots,\infty\}
$$

が存在します。

upcrossing inequality から

$$
(b-a)E[U_n[a,b]]
\le
E[X_n^+]+|a|
\le
C+|a|.
$$

単調収束定理を $U_n[a,b]\uparrow U_\infty[a,b]$ に使うと

$$
E[U_\infty[a,b]]
\le
\frac{C+|a|}{b-a}
<\infty.
$$

従って

$$
P(U_\infty[a,b]=\infty)=0.
$$

有理数対 $(a,b)$ は可算個なので、確率 1 の一つの事象上で全ての有理数 $a<b$ について upcrossing 回数が有限です。

その事象上で、もし

$$
\liminf_{n\to\infty}X_n
<
\limsup_{n\to\infty}X_n
$$

なら、その二つの間に有理数 $a<b$ を選べます。その場合 $X_n$ は $a$ 以下と $b$ 以上を無限回行き来するため、$[a,b]$ の upcrossing が無限回起きます。矛盾です。

従って extended real 値で

$$
X_n\to X_\infty
$$

が a.s. に存在します。

次に極限が有限であることを示します。submartingale 性から

$$
E[X_n]\ge E[X_0].
$$

ゆえに

$$
E[X_n^-]
=
E[X_n^+]-E[X_n]
\le
C-E[X_0].
$$

従って

$$
\sup_nE|X_n|
\le
2C-E[X_0]
<\infty.
$$

Fatou の補題を $|X_n|$ に適用すると

$$
E|X_\infty|
\le
\liminf_{n\to\infty}E|X_n|
<\infty.
$$

もし $|X_\infty|=\infty$ が正の確率で起これば左辺は無限大になるため、これは不可能です。

したがって $X_\infty$ は有限 a.s. で $L^1$ に属します。
<!-- proof-end -->

重要なのは、ここで得たのは **a.s.収束**であり、まだ

$$
E|X_n-X_\infty|\to0
$$

は示していないことです。

$L^1$ 収束には tail を一様に制御する一様可積分性が必要になります。

---

## 10. UI martingale convergence：a.s.収束を $L^1$ へ上げる

一様可積分性と Vitali は [F0-00P4A](../F0_00P4A_一様可積分性_Vitali/index.md) の canonical result を使います。

<a id="thm-sto2-ui-martingale-convergence"></a>

<!-- formal-statement-start -->
> **定理（UI martingale convergence）**  
> $M=(M_n)_{n\ge0}$ を uniformly integrable martingale とする。このとき、ある $M_\infty\in L^1$ が存在して
>
$$
M_n\to M_\infty
\quad\text{a.s. and in }L^1.
$$
>
> さらに各 $n$ について
>
$$
\boxed{
M_n
=
E[M_\infty\mid\mathcal F_n]
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

UI から

$$
\sup_nE|M_n|<\infty
$$

が従います。従って前節の a.s. convergence theorem が使えます。

その後、a.s.収束と UI を Vitali に入れて $L^1$ 収束へ上げます。

最後に martingale の tower property を極限へ渡し、terminal variable の条件付き期待値表示を得ます。

<!-- proof-start -->
### 証明

UI の基本帰結から

$$
\sup_nE|M_n|<\infty.
$$

特に

$$
\sup_nE[M_n^+]<\infty
$$

なので、submartingale a.s. convergence theorem を martingale $M$ に適用できます。ある $M_\infty\in L^1$ が存在して

$$
M_n\to M_\infty
\quad\text{a.s.}
$$

です。

a.s.収束は確率収束を含みます。さらに $\{M_n\}$ は UI なので、[Vitali型収束定理](../F0_00P4A_一様可積分性_Vitali/index.md#thm-f0-00p4a-vitali) から

$$
E|M_n-M_\infty|\to0.
$$

よって $L^1$ 収束も得ました。

固定した $n$ と $A\in\mathcal F_n$ を取ります。$m\ge n$ なら martingale 性から

$$
E[1_AM_m]
=
E[1_AM_n].
$$

$M_m\to M_\infty$ in $L^1$ なので

$$
|E[1_A(M_m-M_\infty)]|
\le
E|M_m-M_\infty|
\to0.
$$

従って $m\to\infty$ として

$$
E[1_AM_\infty]
=
E[1_AM_n].
$$

$M_n$ は $\mathcal F_n$ 可測なので、条件付き期待値の定義より

$$
M_n
=
E[M_\infty\mid\mathcal F_n].
$$
<!-- proof-end -->

### 条件付き期待値 martingale はどこへ収束するか

$Z\in L^1$ とし

$$
M_n:=E[Z\mid\mathcal F_n]
$$

と置きます。

F0-00P4A で示した「条件付き期待値の族は UI」という結果から $\{M_n\}$ は UI です。

さらに

$$
\mathcal F_\infty
=
\sigma\left(\bigcup_{n\ge0}\mathcal F_n\right)
$$

とすれば、[Lévy上昇定理](../F0_00P3C_Levy上昇定理_情報の増加/index.md#thm-f0-00p3c-levy-upward) により

$$
M_n
\to
E[Z\mid\mathcal F_\infty]
$$

a.s. かつ $L^1$ です。

特に $Z$ が $\mathcal F_\infty$ 可測なら

$$
M_n\to Z
$$

a.s. かつ $L^1$ です。

ここで STO2 の一般 UI martingale convergence と、P3C の「条件付き期待値 martingale の極限」が一致します。

---

## 11. 非有界 optional stopping：必要なのは極限交換の根拠

bounded stopping time では極限操作がありませんでした。

$\tau$ が非有界なら、まず

$$
\tau_n:=\tau\wedge n
$$

へ bounded optional sampling を使って

$$
E[M_{\tau_n}]=E[M_0]
$$

を得ます。

問題は

$$
n\to\infty
$$

で期待値を通してよいかです。

<a id="cor-sto2-ui-optional-stopping"></a>

<!-- formal-statement-start -->
> **系（UI を仮定した optional stopping）**  
> $M$ を martingale、$\tau$ を
>
$$
P(\tau<\infty)=1
$$
>
> を満たす stopping time とする。族
>
$$
\{M_{\tau\wedge n}:n\ge0\}
$$
>
> が uniformly integrable なら $M_\tau\in L^1$ で
>
$$
\boxed{
E[M_\tau]=E[M_0].
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$M_{\tau\wedge n}$ は bounded stopping により全て同じ期待値を持ちます。

一方 $\tau<\infty$ a.s. なので

$$
M_{\tau\wedge n}\to M_\tau
$$

a.s.。ここで UI + Vitali が初めて必要になります。

<!-- proof-start -->
### 証明

各 $n$ について $\tau\wedge n$ は bounded stopping time なので

$$
E[M_{\tau\wedge n}]
=
E[M_0].
$$

また $\tau<\infty$ a.s. だから、各標本点で十分大きい $n$ では $\tau\wedge n=\tau$ となり

$$
M_{\tau\wedge n}\to M_\tau
\quad\text{a.s.}
$$

です。

仮定より $\{M_{\tau\wedge n}\}$ は UI なので Vitali により

$$
E|M_{\tau\wedge n}-M_\tau|\to0.
$$

従って

$$
E[M_\tau]
=
\lim_{n\to\infty}E[M_{\tau\wedge n}]
=
E[M_0].
$$
<!-- proof-end -->

### 反例：倍賭けでは stopped family が UI でない

公平コインを

$$
\xi_k=
\begin{cases}
1,&\text{表},\\
-1,&\text{裏}
\end{cases}
$$

とします。

最初の表が出る時刻を

$$
\tau=\inf\{k\ge1:\xi_k=1\}
$$

とします。これは stopping time で

$$
P(\tau<\infty)=1.
$$

第 $k$ 回目には、それまで全て裏だった場合だけ

$$
2^{k-1}
$$

を賭けるとします。すなわち

$$
H_k
=
2^{k-1}1_{\{\tau\ge k\}}.
$$

$\{\tau\ge k\}$ は最初の $k-1$ 回の結果だけで決まるので $H_k$ は $\mathcal F_{k-1}$ 可測です。

$$
G_n
=
\sum_{k=1}^nH_k\xi_k
$$

と置けば、各有限 $n$ では finite predictable transform なので $G$ は martingale です。

最初に表が出た時点までの損益は

$$
-(1+2+\cdots+2^{\tau-2})+2^{\tau-1}
=1.
$$

従って

$$
G_\tau=1
\quad\text{a.s.}
$$

であり

$$
E[G_\tau]=1\ne0=E[G_0].
$$

これは optional stopping theorem の矛盾ではありません。

$n$ 回連続で裏が出る事象を

$$
A_n=\{\tau>n\}
$$

とすると

$$
P(A_n)=2^{-n}.
$$

この事象上では

$$
G_{\tau\wedge n}
=
G_n
=
-(2^n-1).
$$

従って、任意の固定 $K$ に対して $2^n-1>K$ となる $n$ を取れば

$$
\begin{aligned}
E\left[
|G_{\tau\wedge n}|
1_{\{|G_{\tau\wedge n}|>K\}}
\right]
&\ge
(2^n-1)2^{-n}\\
&=
1-2^{-n}.
\end{aligned}
$$

$n$ を大きくすると右辺は 1 に近づきます。したがって

$$
\sup_n
E\left[
|G_{\tau\wedge n}|
1_{\{|G_{\tau\wedge n}|>K\}}
\right]
$$

は $K\to\infty$ でも 0 へ行きません。

つまり stopped family は UI ではありません。

**壊れた証明機構**は

$$
G_{\tau\wedge n}\to G_\tau
$$

から

$$
E[G_{\tau\wedge n}]\to E[G_\tau]
$$

へ移る極限交換です。まれな長い連敗 path が巨大な負値を持ち、各有限 $n$ の期待値 0 を支え続けています。

---

# 12. 演習 A

## STO2-A01 二乗補正 martingale

独立な確率変数 $\xi_k$ が

$$
E\xi_k=0,
\qquad
E\xi_k^2=\sigma^2<\infty
$$

を満たし、

$$
S_n=\sum_{k=1}^n\xi_k,
\qquad
\mathcal F_n=\sigma(\xi_1,\ldots,\xi_n)
$$

とする。

$$
M_n=S_n^2-n\sigma^2
$$

が martingale であることを示せ。

<!-- solution-start -->
### 詳細解答

まず $M_n$ は $\mathcal F_n$ 可測です。$S_n\in L^2$ なので $M_n\in L^1$ です。

次に

$$
S_{n+1}^2
=
S_n^2+2S_n\xi_{n+1}+\xi_{n+1}^2.
$$

$S_n$ は $\mathcal F_n$ 可測で、$\xi_{n+1}$ は $\mathcal F_n$ と独立なので

$$
E[\xi_{n+1}\mid\mathcal F_n]=0,
\qquad
E[\xi_{n+1}^2\mid\mathcal F_n]=\sigma^2.
$$

従って

$$
E[S_{n+1}^2\mid\mathcal F_n]
=
S_n^2+\sigma^2.
$$

よって

$$
\begin{aligned}
E[M_{n+1}\mid\mathcal F_n]
&=
E[S_{n+1}^2-(n+1)\sigma^2\mid\mathcal F_n]\\
&=
S_n^2+\sigma^2-(n+1)\sigma^2\\
&=
S_n^2-n\sigma^2\\
&=M_n.
\end{aligned}
$$

したがって $M$ は martingale です。
<!-- solution-end -->

## STO2-A02 stopped martingale の差分

$M$ を martingale、$\tau$ を stopping time とする。

1. 次を場合分けで示せ。
   $$
   M_{(n+1)\wedge\tau}-M_{n\wedge\tau}
   =
   1_{\{\tau>n\}}(M_{n+1}-M_n).
   $$
2. この恒等式から $M^\tau$ が martingale であることを示せ。

<!-- solution-start -->
### 詳細解答

$\tau\le n$ なら

$$
(n+1)\wedge\tau=n\wedge\tau=\tau
$$

なので左辺は 0 です。右辺も $1_{\{\tau>n\}}=0$ なので 0 です。

$\tau>n$ なら、整数値 stopping time なので $\tau\ge n+1$ です。従って

$$
(n+1)\wedge\tau=n+1,
\qquad
n\wedge\tau=n
$$

となり、両辺は $M_{n+1}-M_n$ です。

次に $\{\tau>n\}\in\mathcal F_n$ なので

$$
\begin{aligned}
&E[M_{(n+1)\wedge\tau}-M_{n\wedge\tau}\mid\mathcal F_n]\\
&\qquad=
1_{\{\tau>n\}}
E[M_{n+1}-M_n\mid\mathcal F_n]
=0.
\end{aligned}
$$

また $M_{n\wedge\tau}$ は $M_0,\ldots,M_n$ の有限混合なので可積分です。

従って $M^\tau$ は martingale です。
<!-- solution-end -->

## STO2-A03 $S_n^2$ の Doob decomposition

公平単純ランダムウォーク $S_n$ に対し

$$
X_n=S_n^2
$$

と置く。

Doob decomposition

$$
X_n=M_n+A_n
$$

を具体的に求めよ。

<!-- solution-start -->
### 詳細解答

$$
S_n=S_{n-1}+\xi_n,
\qquad
\xi_n\in\{-1,1\},
\qquad
E[\xi_n\mid\mathcal F_{n-1}]=0
$$

なので

$$
S_n^2-S_{n-1}^2
=
2S_{n-1}\xi_n+1.
$$

従って

$$
E[S_n^2-S_{n-1}^2\mid\mathcal F_{n-1}]
=
1.
$$

Doob decomposition の predictable part は

$$
A_n
=
\sum_{k=1}^n1
=
n.
$$

したがって martingale part は

$$
M_n
=
X_n-A_n
=
S_n^2-n.
$$

実際 A01 の計算から $S_n^2-n$ は martingale です。

よって

$$
\boxed{
S_n^2=(S_n^2-n)+n
}
$$

が Doob decomposition です。
<!-- solution-end -->

## STO2-A04 Doob maximal inequalityで random walk の最大偏差を抑える

公平単純ランダムウォーク $S_n$ について、任意の $r>0$ に対し

$$
P\left(
\max_{0\le k\le n}|S_k|\ge r
\right)
\le
\frac{n}{r^2}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$(S_k^2)$ は非負 submartingale です。

事象

$$
\left\{
\max_{0\le k\le n}|S_k|\ge r
\right\}
$$

は

$$
\left\{
\max_{0\le k\le n}S_k^2\ge r^2
\right\}
$$

と同じです。

Doob maximal inequality を $X_k=S_k^2$、$\lambda=r^2$ に適用すると

$$
r^2
P\left(
\max_{0\le k\le n}S_k^2\ge r^2
\right)
\le
E[S_n^2].
$$

公平単純ランダムウォークでは独立性と分散加法性から

$$
E[S_n^2]=n.
$$

したがって

$$
P\left(
\max_{0\le k\le n}|S_k|\ge r
\right)
\le
\frac{n}{r^2}.
$$
<!-- solution-end -->

---

# 13. 演習 B

## STO2-B01 gambler's ruin と bounded optional sampling

$S_0=i$、$0<i<a$ とし、$S_n$ を $\pm1$ の公平単純ランダムウォークとする。

$$
\tau
=
\inf\{n\ge0:S_n\in\{0,a\}\}
$$

とし、$P(\tau<\infty)=1$ を仮定してよい。

$$
P_i(S_\tau=a)=\frac{i}{a}
$$

を bounded optional sampling から導け。

<!-- solution-start -->
### 詳細解答

$$
\tau_N:=\tau\wedge N
$$

と置きます。$\tau_N$ は bounded stopping time なので martingale $S_n$ へ optional sampling を適用して

$$
E_i[S_{\tau_N}]
=
E_i[S_0]
=
i.
$$

停止時刻 $\tau$ までは $0<S_n<a$、停止時には $S_\tau\in\{0,a\}$ なので

$$
0\le S_{\tau_N}\le a.
$$

また $\tau<\infty$ a.s. より

$$
S_{\tau_N}\to S_\tau
\quad\text{a.s.}
$$

です。

一様な bound $a$ があるので優収束定理により

$$
E_i[S_\tau]
=
\lim_{N\to\infty}E_i[S_{\tau_N}]
=
i.
$$

一方 $S_\tau$ は $0$ または $a$ だけを取るため

$$
E_i[S_\tau]
=
aP_i(S_\tau=a).
$$

従って

$$
\boxed{
P_i(S_\tau=a)=\frac{i}{a}.
}
$$

ここでは非有界 $\tau$ へ直接 optional stopping を適用したのではなく、$\tau\wedge N$ へ適用した後、$0\le S_{\tau_N}\le a$ という支配で極限交換を正当化しています。
<!-- solution-end -->

## STO2-B02 upcrossing から a.s.収束へ

$X_n$ を submartingale とし

$$
\sup_nE[X_n^+]<\infty
$$

とする。

次の三段階を示せ。

1. 任意の有理数 $a<b$ について $U_\infty[a,b]<\infty$ a.s.
2. これから $\liminf X_n=\limsup X_n$ a.s. を導け。
3. 極限が有限で $L^1$ に属することを示せ。

<!-- solution-start -->
### 詳細解答

$$
C:=\sup_nE[X_n^+]<\infty
$$

とします。

**1. upcrossing 回数。**

Doob upcrossing inequality から

$$
(b-a)E[U_n[a,b]]
\le
C+|a|.
$$

$U_n[a,b]$ は $n$ に関して非減少なので

$$
U_n[a,b]\uparrow U_\infty[a,b].
$$

単調収束定理より

$$
E[U_\infty[a,b]]
\le
\frac{C+|a|}{b-a}
<\infty.
$$

従って $U_\infty[a,b]=\infty$ となる確率は 0 です。

**2. liminf と limsup。**

有理数対 $(a,b)$ は可算個なので、確率 1 の事象上で全ての有理数 $a<b$ の upcrossing 回数が有限です。

もしその事象上で

$$
\liminf X_n<\limsup X_n
$$

なら、その間に有理数 $a<b$ を選べます。すると $X_n$ は $a$ 以下と $b$ 以上を無限回訪れるので $[a,b]$ の upcrossing が無限回起き、矛盾です。

従って extended real 値で極限 $X_\infty$ が存在します。

**3. 有限性と可積分性。**

submartingale 性から

$$
E[X_n]\ge E[X_0].
$$

従って

$$
E[X_n^-]
=
E[X_n^+]-E[X_n]
\le
C-E[X_0].
$$

よって

$$
\sup_nE|X_n|<\infty.
$$

Fatou の補題から

$$
E|X_\infty|
\le
\liminf_nE|X_n|
<\infty.
$$

従って $X_\infty$ は有限 a.s. で $L^1$ に属します。
<!-- solution-end -->

## STO2-B03 条件付き期待値 martingale の UI と極限

$Z\in L^1$、$\mathcal F_0\subseteq\mathcal F_1\subseteq\cdots$ とし

$$
M_n=E[Z\mid\mathcal F_n]
$$

と置く。

1. $M$ が martingale であることを示せ。
2. $\{M_n\}$ が UI であることを F0-00P4A の結果から説明せよ。
3. $\mathcal F_\infty=\sigma(\bigcup_n\mathcal F_n)$ としたとき
   $$
   M_n\to E[Z\mid\mathcal F_\infty]
   $$
   a.s. かつ $L^1$ であることを示せ。

<!-- solution-start -->
### 詳細解答

**1. martingale 性。**

$M_n$ は定義から $\mathcal F_n$ 可測で、条件付き期待値の $L^1$ 縮小性から

$$
E|M_n|
\le
E|Z|
<\infty.
$$

また tower property より

$$
\begin{aligned}
E[M_{n+1}\mid\mathcal F_n]
&=
E[E[Z\mid\mathcal F_{n+1}]\mid\mathcal F_n]\\
&=
E[Z\mid\mathcal F_n]\\
&=M_n.
\end{aligned}
$$

従って $M$ は martingale です。

**2. UI。**

F0-00P4A で、任意の $Z\in L^1$ に対し部分 sigma-field $\mathcal G$ を動かした族

$$
E[Z\mid\mathcal G]
$$

が UI になることを証明しました。

ここで $\mathcal G=\mathcal F_n$ とすれば $\{M_n\}$ は UI です。

**3. 極限。**

[Lévy上昇定理](../F0_00P3C_Levy上昇定理_情報の増加/index.md#thm-f0-00p3c-levy-upward) を増加列 $(\mathcal F_n)$ と $Z$ に適用すると

$$
E[Z\mid\mathcal F_n]
\to
E[Z\mid\mathcal F_\infty]
$$

a.s. かつ $L^1$ です。

すなわち

$$
\boxed{
M_n\to E[Z\mid\mathcal F_\infty]
\quad\text{a.s. and in }L^1.
}
$$
<!-- solution-end -->

---

# 14. 演習 C

## STO2-C01 倍賭け反例を最後まで監査する

公平コイン $\xi_k\in\{-1,1\}$ に対し

$$
\tau=\inf\{k\ge1:\xi_k=1\}
$$

とする。

$$
H_k=2^{k-1}1_{\{\tau\ge k\}},
\qquad
G_n=\sum_{k=1}^nH_k\xi_k
$$

と置く。

次を全て示せ。

1. $H_k$ は $\mathcal F_{k-1}$ 可測であり、各有限時刻で $G_n$ は可積分である。
2. $G$ は martingale である。
3. $P(\tau<\infty)=1$ かつ $G_\tau=1$ a.s.
4. 各 $n$ で
   $$
   E[G_{\tau\wedge n}]=0
   $$
   だが
   $$
   E[G_\tau]=1
   $$
   となることを確認せよ。
5. $\{G_{\tau\wedge n}\}$ が UI でないことを tail expectation から示し、optional stopping のどの極限操作が壊れたか説明せよ。

<!-- solution-start -->
### 詳細解答

**1. predictable 性と可積分性。**

事象

$$
\{\tau\ge k\}
$$

は「最初の $k-1$ 回が全て裏」という事象です。従って

$$
\{\tau\ge k\}\in\mathcal F_{k-1}.
$$

よって $H_k$ は $\mathcal F_{k-1}$ 可測です。

固定した $n$ では

$$
|G_n|
\le
\sum_{k=1}^n2^{k-1}
=
2^n-1,
$$

なので $G_n\in L^1$ です。

**2. martingale 性。**

$$
G_{n+1}-G_n
=
H_{n+1}\xi_{n+1}.
$$

$H_{n+1}$ は $\mathcal F_n$ 可測で、$\xi_{n+1}$ は過去と独立かつ平均 0 なので

$$
\begin{aligned}
E[G_{n+1}-G_n\mid\mathcal F_n]
&=
H_{n+1}
E[\xi_{n+1}\mid\mathcal F_n]\\
&=0.
\end{aligned}
$$

従って $G$ は martingale です。

**3. $\tau$ の有限性と停止時損益。**

$$
P(\tau>n)
=
P(\xi_1=\cdots=\xi_n=-1)
=
2^{-n}\to0.
$$

従って $P(\tau<\infty)=1$ です。

$\tau=m$ のとき、最初の $m-1$ 回は裏、$m$ 回目が表です。したがって

$$
\begin{aligned}
G_\tau
&=
-(1+2+\cdots+2^{m-2})+2^{m-1}\\
&=
-(2^{m-1}-1)+2^{m-1}\\
&=1.
\end{aligned}
$$

よって $G_\tau=1$ a.s.

**4. 期待値の不一致。**

$\tau\wedge n$ は bounded stopping time なので

$$
E[G_{\tau\wedge n}]
=
E[G_0]
=
0.
$$

一方

$$
G_\tau=1
$$

a.s. なので

$$
E[G_\tau]=1.
$$

従って

$$
E[G_{\tau\wedge n}]
\not\to
E[G_\tau].
$$

**5. UI の失敗。**

$$
A_n:=\{\tau>n\}
$$

とすると $P(A_n)=2^{-n}$ です。$A_n$ 上では $n$ 回全て負けているので

$$
G_{\tau\wedge n}=G_n=-(2^n-1).
$$

固定した $K$ に対し $2^n-1>K$ となる $n$ を選ぶと

$$
\begin{aligned}
&E\left[
|G_{\tau\wedge n}|
1_{\{|G_{\tau\wedge n}|>K\}}
\right]\\
&\qquad\ge
(2^n-1)P(A_n)\\
&\qquad=
(2^n-1)2^{-n}
=
1-2^{-n}.
\end{aligned}
$$

従って $K$ をどれだけ大きくしても、sup を取れば tail expectation を 0 へ落とせません。

よって $\{G_{\tau\wedge n}\}$ は UI ではありません。

各標本点では

$$
G_{\tau\wedge n}\to G_\tau
$$

ですが、UI がないため Vitali を使えず、

$$
\lim_nE[G_{\tau\wedge n}]
=
E[G_\tau]
$$

という極限交換が正当化できません。

まれな長い連敗の確率は $2^{-n}$ と小さくなりますが、そのときの損失が約 $2^n$ と増えるため、tail expectation の寄与が消えないことが本質です。
<!-- solution-end -->

---

# 15. 章末チェック

この章を終えた時点で、次を本文だけから再構成できることを目標にします。

- martingale / submartingale / supermartingale の三条件を有限例で直接確認できる。
- predictable が「次増分を見る前に係数が決まる」ことを数式で説明できる。
- stopped process の差分表示から martingale 性を証明できる。
- bounded optional sampling を $\mathcal F_\sigma$ に関する条件付き等式・不等式まで証明できる。
- Doob decomposition の compensator を条件付き平均増分から構成し、一意性を示せる。
- Doob maximal inequality で path 最大値の確率を終端分布から評価できる。
- upcrossing number を path 上で数え、predictable strategy から upcrossing inequality を証明できる。
- 有理数区間の upcrossing が有限であることから $\liminf=\limsup$ を導ける。
- submartingale convergence theorem で極限の有限性・可積分性まで閉じられる。
- UI が a.s.収束を $L^1$ 収束へ上げる役割を Vitali と結びつけられる。
- 条件付き期待値 martingale の極限を Lévy上昇定理と接続できる。
- 倍賭け反例で、optional stopping の失敗原因を「極限と期待値の交換不能」「UI の欠如」として定量的に説明できる。

次の STO3 では、有限次元分布から確率過程そのものを構成し、Kolmogorov--Chentsov continuity theorem で連続 modification を作る問題へ進みます。
