# HDP4 Doob差分と有界差分不等式

[HDP1のHoeffding不等式](../HDP1/index.md#thm-hdp1-hoeffding)では独立な確率変数の**和**を評価しました。[HDP3のsub-Gaussian和の集中](../HDP3/index.md#thm-hdp3-subgaussian-sum)でも、和に分解できることが重要でした。ところが標本の最大値、経験分布関数の上限、ランダムグラフの三角形数のように、観測をまとめた**独立変数の単純な和ではない関数**は、元の形では独立変数の和ではありません。

ここで必要なのは、出力全体を直接分解する代わりに「第 $i$ 番目の入力を知ったことで予測値がどれだけ動いたか」を足し合わせる考え方です。一つの入力を入れ替えても結果が少ししか変わらないなら、[条件付き期待値](../../F0/F0-00P3A/index.md#def-f0-00p3a-conditional-expectation)で作った差分も小さいはずです。この一歩を厳密に確認すると、非線形関数にも指数型の集中評価が得られます。

## 1. 入力の入れ替えを測る

$X_1,\ldots,X_n$ は互いに独立で、それぞれ非空集合 $S_i$ に値を取る確率変数とします。$f:S_1\times\cdots\times S_n\to\mathbb R$ は可測とし、$Z=f(X_1,\ldots,X_n)$ を調べます。以下では $n$ は有限、各 $c_i$ は有限の非負実数です。

第 $i$ 座標だけを変えた二つの入力で出力差が高々 $c_i$ なら、その座標の**影響度**を $c_i$ で抑えたことになります。この条件は和の形を仮定しません。

<a id="def-hdp4-bounded-differences"></a>

<!-- formal-statement-start -->
> **定義（座標ごとの有界差分条件）**  
> 可測関数 $f:\prod_{i=1}^n S_i\to\mathbb R$ が定数 $c_1,\ldots,c_n\ge0$ に関する有界差分条件を満たすとは、各 $i$、各 $x_1,\ldots,x_n$ および各 $x_i'\in S_i$ に対して

$$
|f(x_1,\ldots,x_i,\ldots,x_n)
-f(x_1,\ldots,x_i',\ldots,x_n)|\le c_i
$$

> が成立することをいう。ほかの座標は同じ値に固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp4-bounded-differences -->
**定義の直接確認。** $S_i=[0,1]$、$f(x)=n^{-1}\sum_{j=1}^n x_j$ とします。第 $i$ 座標を $x_i'$ に取り替えると

$$
f(x)-f(x_1,\ldots,x_i',\ldots,x_n)
=\frac{x_i-x_i'}n.
$$

$|x_i-x_i'|\le1$ より $c_i=1/n$ を選べます。すべての $n$ 座標を同時に変える条件ではなく、**一つずつ入れ替える**条件です。
<!-- definition-example-end -->

$S_i$ 上で $f$ の基準点 $x^*=(x_1^*,\ldots,x_n^*)$ を一つ固定すると、一座標ずつ基準点へ置き換え、その各差に三角不等式を適用すると

$$
|f(x)-f(x^*)|\le\sum_{i=1}^n c_i.
$$

したがって有限個の有界差分条件の下で $f$ は全入力上で有界です。特に $Z$ は可積分であり、以降の条件付き期待値が確定します。$c_i$ は実際の最小影響度でなく、計算しやすい上界でも構いません。

## 2. 予測値を一入力ずつ更新する

$Z$ を最初は知らず、$X_1$、次に $X_2$ と順に観測したときの条件付き期待値を考えます。これが最終的な $Z$ に向けて情報を追加する過程です。

<a id="def-hdp4-doob-differences"></a>

<!-- formal-statement-start -->
> **定義（DoobマルチンゲールとDoob差分）**  
> 可積分な実数値確率変数 $Z=f(X_1,\ldots,X_n)$ に対し、$\mathcal F_0=\{\varnothing,\Omega\}$、$\mathcal F_i=\sigma(X_1,\ldots,X_i)$ と置く。ただし $X_i$ は互いに独立である。さらに

$$
M_i=E[Z\mid\mathcal F_i]\quad(0\le i\le n),
\qquad D_i=M_i-M_{i-1}\quad(1\le i\le n)
$$

> と置く。$(M_i)$ をこの観測順序に関するDoobマルチンゲール、$D_i$ をDoob差分という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp4-doob-differences -->
**定義の直接確認。** 独立なBernoulli変数 $X_1,X_2$ がそれぞれ確率 $1/2$ で $1$ を取り、$Z=X_1+2X_2$ とします。$E[X_1]=E[X_2]=1/2$ を使うと

$$
M_0=\frac32,\qquad M_1=X_1+1,\qquad M_2=X_1+2X_2.
$$

従って $D_1=X_1-1/2$、$D_2=2(X_2-1/2)$、その和は $Z-3/2$ です。各差分の条件付き平均は零で、値域の幅はそれぞれ $1$ と $2$ です。
<!-- definition-example-end -->

ここで「マルチンゲール」と言うためには、$M_i$ が $\mathcal F_i$ によって観測可能であることと、条件付きで予測値が変わらないことを確認します。[条件付き期待値の塔の性質](../../F0/F0-00P3A/index.md#thm-f0-00p3a-tower)により

$$
E[M_i\mid\mathcal F_{i-1}]
=E[E[Z\mid\mathcal F_i]\mid\mathcal F_{i-1}]
=E[Z\mid\mathcal F_{i-1}]=M_{i-1}.
$$

従って $E[D_i\mid\mathcal F_{i-1}]=0$ です。さらに $M_0=E[Z]$、$M_n=Z$（$Z$ は全入力から決まる）なので、項を相殺すると

$$
Z-E[Z]=\sum_{i=1}^n(M_i-M_{i-1})=\sum_{i=1}^nD_i.
$$

これで非線形関数の偏差も、**条件付き平均が零の差分の和**へ変換できました。ただし差分は一般に相互独立ではありません。次に必要なのは、その差分の条件付き指数モーメントです。

## 3. 条件付きの幅は $2c_i$ ではなく $c_i$

入力の途中まで $x_1,\ldots,x_{i-1}$ を固定します。独立性のおかげで、未来の $X_{i+1},\ldots,X_n$ を平均するとき、その分布は既に観測した値によって変化しません。この点が証明の要です。

<a id="lem-hdp4-conditional-range"></a>

<!-- formal-statement-start -->
> **補題（Doob差分の条件付き変動幅）**  
> $X_1,\ldots,X_n$ が相互に独立で、$f$ が [有界差分条件](#def-hdp4-bounded-differences)を定数 $c_i$ で満たすとする。[Doob差分](#def-hdp4-doob-differences) $D_i$ について、$\mathcal F_{i-1}$ が与えられた下で $D_i$ の取り得る値は長さが高々 $c_i$ の区間内にある。また

$$
E[D_i\mid\mathcal F_{i-1}]=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

未来の変数について平均した関数 $g_i(u)$ を作ります。$f$ の座標差の上界は平均後も変わらず、$g_i$ の最大値と最小値の幅が $c_i$ 以下です。そこから条件付き平均を引く操作は区間を平行移動するだけで、長さを倍にしません。

<!-- proof-start -->
### 証明

固定した過去 $x_{<i}=(x_1,\ldots,x_{i-1})$ に対して

$$
g_i(x_{<i},u)=E\bigl[f(x_1,\ldots,x_{i-1},u,X_{i+1},\ldots,X_n)\bigr]
$$

と置きます。$i=n$ なら未来の変数はなく、右辺は単に $f(x_{<n},u)$ です。任意の $u,v\in S_i$ に対して有界差分条件を同じ未来の標本値で適用すると

$$
-c_i\le f(x_{<i},u,X_{>i})-f(x_{<i},v,X_{>i})\le c_i.
$$

この両側を未来の変数に関して期待値を取っても順序が保たれ、

$$
|g_i(x_{<i},u)-g_i(x_{<i},v)|\le c_i
$$

です。独立性から、過去および現在を観測した条件付き期待値は

$$
M_i=g_i(X_{<i},X_i)
$$

と表せます。さらに $X_i$ は過去と独立なので

$$
M_{i-1}=E[g_i(X_{<i},X_i)\mid\mathcal F_{i-1}].
$$

固定した過去について $a_i=\inf_{u\in S_i}g_i(x_{<i},u)$、$b_i=\sup_{u\in S_i}g_i(x_{<i},u)$ とすれば $b_i-a_i\le c_i$ です。$M_{i-1}$ も区間 $[a_i,b_i]$ にあるため、条件付きで

$$
a_i-M_{i-1}\le D_i=g_i(X_{<i},X_i)-M_{i-1}\le b_i-M_{i-1}.
$$

上下端の差は $(b_i-M_{i-1})-(a_i-M_{i-1})=b_i-a_i\le c_i$ です。中心化すると、一般に $|D_i|\le c_i$ とは言えますが、その粗い絶対値評価から幅を $2c_i$ と見積もる必要はありません。平均零は前節の塔の性質で確認済みです。
<!-- proof-end -->

**二点分布による幅の検算。** 第2節の $D_1=X_1-1/2$ は $[-1/2,1/2]$、$D_2=2(X_2-1/2)$ は $[-1,1]$ を取ります。中心からの最大距離はそれぞれ $1/2$ と $1$、幅は $1$ と $2$ です。もし幅をさらに倍にしてしまうと、指数不等式の定数を余分に悪化させます。

## 4. 条件付きHoeffding補題から指数評価へ

差分 $D_i$ は独立ではありませんが、直前までの情報を固定すれば、幅の上限と中心化が使えます。[Hoeffding補題](../HDP1/index.md#lem-hdp1-hoeffding)を条件付きの分布へ適用することで、その差を埋めます。

<a id="lem-hdp4-conditional-hoeffding"></a>

<!-- formal-statement-start -->
> **補題（条件付きHoeffding評価）**  
> $\mathcal G$ を情報の $\sigma$ 代数とし、可積分確率変数 $Y$ が $E[Y\mid\mathcal G]=0$ を満たすとする。$\mathcal G$ を固定した下で $Y$ が幅高々 $c$ の区間に入るものとする。ただし $c\ge0$ は定数である。このとき任意の $\lambda\in\mathbb R$ に対して

$$
E[e^{\lambda Y}\mid\mathcal G]\le \exp(\lambda^2c^2/8).
$$
<!-- formal-statement-end -->

### 証明の見取り図

条件付けてから見れば、零平均で長さ高々 $c$ の区間に入る通常の一変数確率分布です。Hoeffding補題の「平均零」と「区間の幅」の両方を確認して代入します。差分の独立性は要求しません。

<!-- proof-start -->
### 証明

$\mathcal G$ の条件付けで定まる区間端を $a,b$ とし、$b-a\le c$ とします。前節のような有限積独立変数から作る場合には、過去を固定した分布で議論できます。一般の条件付き分布が存在する設定でも同じ議論です。中心化は $E[Y\mid\mathcal G]=0$ であり、$a\le Y\le b$ が条件付きで成立します。

[Hoeffding補題](../HDP1/index.md#lem-hdp1-hoeffding)の入力 $Y$、下端 $a$、上端 $b$、指数係数 $\lambda$ に対して

$$
E[e^{\lambda(Y-E[Y\mid\mathcal G])}\mid\mathcal G]
\le e^{\lambda^2(b-a)^2/8}
\le e^{\lambda^2c^2/8}
$$

となります。左辺では条件付き平均が零です。$\lambda<0$ にもHoeffding補題の両符号版を使います。$c=0$ なら $Y=0$ が条件付きで確率一なので両辺は $1$ です。
<!-- proof-end -->

この補題を $Y=D_i$、$\mathcal G=\mathcal F_{i-1}$ に当てると、前節の条件付き幅によって

$$
E[e^{\lambda D_i}\mid\mathcal F_{i-1}]
\le \exp(\lambda^2c_i^2/8)
$$

を得ます。この式が、非独立な差分を扱える理由です。積の期待値をいきなり個別の期待値の積へ分解するのではなく、**最後の差分から順に条件付き平均を取る**ことができます。

<a id="thm-hdp4-azuma-interval"></a>

<!-- formal-statement-start -->
> **定理（区間幅によるAzuma–Hoeffding型不等式）**  
> $(M_i)_{i=0}^n$ は実数値可積分マルチンゲールで、$\mathcal F_i$ に適合し、差分 $D_i=M_i-M_{i-1}$ が $\mathcal F_{i-1}$ を固定した下で幅高々 $c_i$ の区間にあるとする。$c_i\ge0$ は決定的定数で、$V=\sum_i c_i^2>0$ とする。このとき $t>0$ について

$$
P(M_n-M_0\ge t)\le\exp\left(-\frac{2t^2}{V}\right)
$$

> が成立する。$M_0$ は定数でなくてもよい。
<!-- formal-statement-end -->

### 証明の見取り図

[条件付きHoeffding評価](#lem-hdp4-conditional-hoeffding)を最後の差分から使い、指数モーメントを $\exp(\lambda^2V/8)$ で抑えます。最後に[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)で尾部へ戻し、$\lambda$ を最適化します。

<!-- proof-start -->
### 証明

マルチンゲールの性質から $E[D_i\mid\mathcal F_{i-1}]=0$ です。$\lambda\ge0$ について、$S_k=\sum_{i=1}^kD_i$ と置くと $S_{k-1}$ は $\mathcal F_{k-1}$ 可測なので

$$
\begin{aligned}
E e^{\lambda S_k}
&=E\left[e^{\lambda S_{k-1}}
E(e^{\lambda D_k}\mid\mathcal F_{k-1})\right]\\
&\le e^{\lambda^2c_k^2/8} E e^{\lambda S_{k-1}}.
\end{aligned}
$$

$k=n,n-1,\ldots,1$ と順に反復し、$S_0=0$ を使うと

$$
E e^{\lambda(M_n-M_0)}
=E e^{\lambda S_n}
\le\prod_{i=1}^n e^{\lambda^2c_i^2/8}
=e^{\lambda^2V/8}.
$$

この反復には差分の独立性を使っていません。[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)に $S_n=M_n-M_0$ を入れれば

$$
P(S_n\ge t)\le\exp\left(-\lambda t+\frac{\lambda^2V}{8}\right).
$$

右辺の指数の微分は $-t+\lambda V/4$ で、$V>0$ より最小点は $\lambda_*=4t/V>0$ です。代入すると

$$
-\lambda_*t+\frac{\lambda_*^2V}{8}
=-\frac{4t^2}{V}+\frac{16t^2}{8V}
=-\frac{2t^2}{V}.
$$

以上で上側尾部を得ます。$D_i$ を $-D_i$ に取り替えても幅と中心化は保たれるため、下側尾部も同じ式になります。
<!-- proof-end -->

## 5. McDiarmidの不等式

いよいよ、第3節の差分幅と第4節のマルチンゲール集中を組み合わせます。もとの関数は加法的でなくて構いません。

<a id="thm-hdp4-mcdiarmid"></a>

<!-- formal-statement-start -->
> **定理（McDiarmidの有界差分不等式）**  
> 独立確率変数 $X_i\in S_i$（$i=1,\ldots,n$）と可測関数 $f:\prod_iS_i\to\mathbb R$ が、[有界差分条件](#def-hdp4-bounded-differences)を定数 $c_i\ge0$ で満たすとする。$Z=f(X_1,\ldots,X_n)$、$V=\sum_i c_i^2>0$ と置くと、任意の $t>0$ に対して

$$
P(Z-EZ\ge t)\le e^{-2t^2/V},
\qquad
P(|Z-EZ|\ge t)\le2e^{-2t^2/V}.
$$

> $V=0$ のとき $Z=EZ$ は確率一で成立し、全ての $t>0$ に対する両方の左辺は零である。
<!-- formal-statement-end -->

### 証明の見取り図

[Doob差分](#def-hdp4-doob-differences)を構成すると、[Doob差分の条件付き変動幅](#lem-hdp4-conditional-range)により各差分の幅は $c_i$ です。差分和は $Z-EZ$ そのものなので、[区間幅によるAzuma–Hoeffding型不等式](#thm-hdp4-azuma-interval)を適用します。

<!-- proof-start -->
### 証明

$V>0$ の場合、$\mathcal F_i=\sigma(X_1,\ldots,X_i)$、$M_i=E[Z\mid\mathcal F_i]$ と置きます。第2節の塔の性質により $(M_i)$ はマルチンゲールで、$M_0=EZ$、$M_n=Z$ です。[Doob差分の条件付き変動幅](#lem-hdp4-conditional-range)の前提である入力の独立性と $f$ の座標別幅が成立するので、$D_i=M_i-M_{i-1}$ は $\mathcal F_{i-1}$ の下で幅高々 $c_i$ です。

従って[区間幅によるAzuma–Hoeffding型不等式](#thm-hdp4-azuma-interval)へ $M_n-M_0=Z-EZ$、幅平方和 $V$ を代入すると

$$
P(Z-EZ\ge t)\le e^{-2t^2/V}.
$$

同じ条件は $-f$ でも成立し、$P(EZ-Z\ge t)\le e^{-2t^2/V}$ です。最後に[和集合の劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)により両側の和を取ります。

$V=0$ の場合、各 $c_i=0$ です。任意の二入力は一座標ずつ変更できますが、その度に $f$ の値は変わらないため、$f$ は直積 $S_1\times\cdots\times S_n$ 上で定数です。従って $Z=EZ$ で、$t>0$ の偏差確率は零です。
<!-- proof-end -->

### 頻度を指定する形

$V>0$、$0<\delta<1$ について

$$
t_\delta=\sqrt{\frac V2\log\frac2\delta}
$$

と置けば、上の両側評価の指数に $-2t_\delta^2/V=-\log(2/\delta)$ を代入でき、

$$
P\left(|Z-EZ|\le \sqrt{\frac V2\log\frac2\delta}\right)\ge1-\delta
$$

を得ます。**中心は常に $EZ$** です。真の母数との差を保証するには、必要に応じてバイアス $|EZ-\theta|$ を別途見積もらなければなりません。

## 6. 非線形統計量へ使う

### 最大値を取っても影響度は大きくならない

$d$ 個の実数値関数 $f_1,\ldots,f_d$ がそれぞれ第 $i$ 座標で幅 $c_i$ 以下とします。$f(x)=\max_{1\le j\le d}f_j(x)$ と置くと、任意の二入力 $x,x'$ に対して

$$
\begin{aligned}
f(x)-f(x')
&=\max_j f_j(x)-\max_k f_k(x')\\
&\le\max_j(f_j(x)-f_j(x'))\le c_i
\end{aligned}
$$

です。$x,x'$ を逆にして同じことを適用すれば $|f(x)-f(x')|\le c_i$ です。**最大値という非線形操作でも**入力ごとの変動幅は増えません。個々の $f_j$ が異なる幅 $c_{ij}$ を持つ場合は、$c_i=\max_jc_{ij}$ を使えます。

たとえば $X_1,\ldots,X_n\in[0,1]^d$ が観測番号 $i$ に関して独立なら、各座標平均の最大値

$$
Z=\max_{1\le j\le d}\frac1n\sum_{i=1}^n X_{ij}
$$

は、一つの観測ベクトル全体を取り替えても高々 $1/n$ だけしか動きません。従って $V=1/n$ で、

$$
P(Z-EZ\ge t)\le e^{-2nt^2}
$$

です。同一ベクトル内の $d$ 成分が独立である必要はありません。この評価は**最大値の期待値の周囲の集中**であり、$\max_j EX_{1j}$ の周囲の集中だと読み替えてはいけません。

### 経験分布関数の最大偏差

独立同分布の実数値 $X_i$ の共通累積分布関数を $F$ とし、経験分布関数を

$$
F_n(x)=\frac1n\sum_{i=1}^n\mathbf1_{\{X_i\le x\}}
$$

と置きます。$Z=\sup_{x\in\mathbb R}|F_n(x)-F(x)|$ を考えます。一観測を $X_i'$ へ取り替えると、任意の実数 $x$ で指示関数の差の絶対値が高々 $1$ だから

$$
|F_n(x)-F_n'(x)|\le\frac1n.
$$

三角不等式から $||F_n(x)-F(x)|-|F_n'(x)-F(x)||\le1/n$ であり、上限を取っても

$$
|Z-Z'|\le \frac1n.
$$

従って

$$
P(Z-EZ\ge t)\le e^{-2nt^2}.
$$

この結論だけでは $EZ$ を消せません。経験分布関数の上限を零の周りで評価するには、期待最大偏差の別の評価が必要です。**McDiarmid不等式はバイアスを自動的に評価する定理ではありません。**

### ランダムグラフの三角形数

$m\ge3$ 頂点の無向単純グラフで、各辺の有無を独立なBernoulli変数として作ります。辺の数は $N=\binom m2$ です。三角形の総数を $T$ とすると、一つの辺を入れ替えた際に増減し得る三角形は、その辺と第三の頂点で作る高々 $m-2$ 個です。従って各辺の変動幅は $c_e=m-2$ で、

$$
V=\binom m2(m-2)^2,\qquad
P(|T-ET|\ge t)\le
2\exp\left(-\frac{2t^2}{\binom m2(m-2)^2}\right).
$$

分布が同一のBernoulliである必要はなく、**各辺の有無を表す確率変数の相互独立性**が必要です。

## 7. 独立性と中心化を取り違えない

**完全従属の反例。** 一つのRademacher変数 $R$ を使い、$X_1=\cdots=X_n=R$ とします。$f(x)=n^{-1}\sum_i x_i$、各 $S_i=\{-1,1\}$ とすると、座標を一つ変えた際の幅は $c_i=2/n$ です。形式上 $V=\sum_i(2/n)^2=4/n$ なので、誤ってMcDiarmidの不等式を適用すれば

$$
P(|f(X)-Ef(X)|\ge1)\le2e^{-n/2}
$$

を主張してしまいます。しかし $f(X)=R$、$Ef(X)=0$ だから左辺は $1$ で、例えば $n=4$ では右辺 $2e^{-2}<1$ と矛盾します。

壊れたのは座標変動幅そのものではありません。第3節の「過去を固定して未来を平均しても同じ分布を使える」という独立性です。実際、$X_1=R$ を知ると未来の変数が全部決まり、Doob差分は $D_1=R$、$D_2=\cdots=D_n=0$ になります。$D_1$ の幅は $2$ であり、座標ごとの $2/n$ には収まりません。

**幅を単なる平均零から推測しない。** $E[D_i\mid\mathcal F_{i-1}]=0$ だけでは、条件付き指数モーメントを抑えられません。第3節で実際に $g_i$ の振幅を評価したからこそ、[条件付きHoeffding評価](#lem-hdp4-conditional-hoeffding)が使えます。

**観測順序。** $X_i$ の順序を入れ替えても、各入力の幅の平方和 $V=\sum_i c_i^2$ は変わりません。Doob差分そのものは観測順序で変化しますが、結論の指数にはその変化が残りません。

## 8. 演習：構成・幅・応用・反例

**Level A：定義と差分の直接計算**

### A1. 二変数の非線形統計量

独立なBernoulli$(1/2)$ 変数 $X_1,X_2$ に対し $Z=\max(X_1,X_2)$ とする。$M_0,M_1,M_2$ および $D_1,D_2$ を求め、$E[D_2\mid X_1]=0$ を確認せよ。

- Level: A
- ID: HDP4-A1

<!-- solution-start -->
**詳細解答**　$P(Z=0)=P(X_1=X_2=0)=1/4$ なので $EZ=3/4$、従って $M_0=3/4$ です。$X_1=1$ なら $Z=1$、$X_1=0$ なら $Z=X_2$ なので

$$
M_1=\begin{cases}1&(X_1=1),\\1/2&(X_1=0).\end{cases}
\qquad M_2=\max(X_1,X_2).
$$

従って $D_1=M_1-3/4$ は $X_1=1$ なら $1/4$、$X_1=0$ なら $-1/4$ です。$D_2=Z-M_1$ は $X_1=1$ なら必ず零、$X_1=0$ なら $X_2-1/2$ です。後者を条件付きで平均すると $E[X_2-1/2\mid X_1=0]=0$、前者も零です。$D_1+D_2=Z-3/4$ は両場合に成立します。
<!-- solution-end -->

### A2. 中心化で幅は倍にならない

$Y$ は値域 $[a,b]$ にある実数値確率変数で $a<b$、$\mu=EY$ とする。$Y-\mu$ が長さ $b-a$ の区間に入ることを示せ。さらに $Y$ が各端点を正の確率で取るとき、中心化後の変動幅がちょうど $b-a$ になることを示せ。

- Level: A
- ID: HDP4-A2

<!-- solution-start -->
**詳細解答**　$a\le Y\le b$ から期待値も $a\le\mu\le b$ です。両辺から $\mu$ を引いて $a-\mu\le Y-\mu\le b-\mu$ を得ます。この区間の長さは $(b-\mu)-(a-\mu)=b-a$ です。$P(Y=a)>0$ と $P(Y=b)>0$ なら $Y-\mu$ は実際に両端 $a-\mu,b-\mu$ を取るため、その取り得る値の最大と最小の差は $b-a$ です。
<!-- solution-end -->

### A3. 平均の有界差分

互いに独立な $X_i\in[a_i,b_i]$ と $Z=n^{-1}\sum_iX_i$ を考える。$V$ を求め、$P(|Z-EZ|\ge t)$ を導け。各幅が零のときも述べよ。

- Level: A
- ID: HDP4-A3

<!-- solution-start -->
**詳細解答**　第 $i$ 入力を $x_i'$ へ替えた差は $(x_i-x_i')/n$ です。従って $c_i=(b_i-a_i)/n$ を選べます。幅平方和は

$$
V=\frac1{n^2}\sum_{i=1}^n(b_i-a_i)^2.
$$

$V>0$ なら[McDiarmidの有界差分不等式](#thm-hdp4-mcdiarmid)により

$$
P(|Z-EZ|\ge t)\le
2\exp\left(-\frac{2n^2t^2}{\sum_i(b_i-a_i)^2}\right).
$$

全ての幅が零なら各 $X_i$ が確率一で定数なので $Z=EZ$ です。$t>0$ の偏差確率は零です。
<!-- solution-end -->

### A4. 目標確率から偏差半径へ

有界差分定数が $c_1=1/2,c_2=1/3,c_3=1/6$ の独立入力関数 $Z$ を考える。$V$ を計算し、両側偏差確率を $0.05$ 以下にする半径を示せ。

- Level: A
- ID: HDP4-A4

<!-- solution-start -->
**詳細解答**　平方を加えると

$$
V=\frac14+\frac19+\frac1{36}=\frac{9+4+1}{36}=\frac7{18}.
$$

[McDiarmidの有界差分不等式](#thm-hdp4-mcdiarmid)の両側評価は $2e^{-2t^2/V}$ なので、これを $0.05$ 以下にするには $e^{-2t^2/V}\le1/40$、すなわち $2t^2/V\ge\log40$ で十分です。従って

$$
t\ge\sqrt{\frac{7\log40}{36}}
$$

を選べばよいことが分かります。
<!-- solution-end -->

### A5. 一座標も変わらない場合

$f:\prod_{i=1}^n S_i\to\mathbb R$ が全ての第 $i$ 座標について変動幅 $c_i=0$ を持つとする。$f$ が定数であることを、二つの任意の入力をつなぐ経路から証明せよ。

- Level: A
- ID: HDP4-A5

<!-- solution-start -->
**詳細解答**　$x=(x_1,\ldots,x_n)$、$y=(y_1,\ldots,y_n)$ を任意に固定します。$z^{(0)}=x$ と置き、$z^{(i)}=(y_1,\ldots,y_i,x_{i+1},\ldots,x_n)$ と定義します。$z^{(i-1)}$ と $z^{(i)}$ は第 $i$ 座標以外が一致するため $|f(z^{(i)})-f(z^{(i-1)})|\le c_i=0$ です。$i=1,\ldots,n$ と等式をつなげば $f(y)=f(x)$ です。任意の $x,y$ に成り立つため $f$ は定数です。
<!-- solution-end -->

**Level B：非線形関数と仮定の使い方**

### B1. 最大値の変動幅

各 $f_j:[0,1]^n\to\mathbb R$ は、一入力を変えたときの幅が $c_i$ 以下とする。$g(x)=\max_{1\le j\le d} f_j(x)$ について同じ幅を示し、独立入力 $X_i$ に対する $P(|g(X)-Eg(X)|\ge t)$ を求めよ。

- Level: B
- ID: HDP4-B1

<!-- solution-start -->
**詳細解答**　第 $i$ 座標だけが異なる $x,y$ に対し、$f_j(x)\le f_j(y)+c_i$ は全 $j$ で成立します。最大値を取ると $g(x)\le g(y)+c_i$ です。$x,y$ を交換すると $g(y)\le g(x)+c_i$ であり、両方から $|g(x)-g(y)|\le c_i$ です。$V=\sum_i c_i^2>0$ なら入力の独立性が成立するので、[McDiarmidの有界差分不等式](#thm-hdp4-mcdiarmid)から

$$
P(|g(X)-Eg(X)|\ge t)\le 2e^{-2t^2/V}.
$$

$V=0$ なら $g$ は定数であり、$t>0$ の確率は零です。
<!-- solution-end -->

### B2. 経験分布関数の上限

独立同分布な実数値 $X_1,\ldots,X_n$ の分布関数を $F$、経験分布関数を $F_n$ とし、$Z=\sup_x|F_n(x)-F(x)|$ とする。第 $i$ 観測を取り替えたときの差が $1/n$ 以下であることを示し、$Z-EZ$ の右裾を評価せよ。$Z$ 自体について同じ右裾上界を述べてよいか。

- Level: B
- ID: HDP4-B2

<!-- solution-start -->
**詳細解答**　観測列を $u$、第 $i$ 成分だけ異なる観測列を $v$ と書けば、任意の $x$ で

$$
F_n^{(u)}(x)-F_n^{(v)}(x)
=\frac1n(\mathbf1_{\{u_i\le x\}}-\mathbf1_{\{v_i\le x\}})
$$

であるため絶対値は $1/n$ 以下です。$h_u(x)=|F_n^{(u)}(x)-F(x)|$ と置けば、絶対値の逆三角不等式から $|h_u(x)-h_v(x)|\le1/n$ です。さらに $\sup_xh_u(x)\le\sup_xh_v(x)+1/n$ とその逆を使えば $|Z(u)-Z(v)|\le1/n$ が従います。$V=n/n^2=1/n$ より

$$
P(Z-EZ\ge t)\le e^{-2nt^2}.
$$

$Z$ 自体には一般に $EZ>0$ なので、$P(Z\ge t)\le e^{-2nt^2}$ へ勝手に置き換えることはできません。期待最大偏差を別途評価する必要があります。
<!-- solution-end -->

### B3. 重み付きの非線形和

独立な $X_i\in[0,1]$ と重み $w_i\in\mathbb R$ に対して $Z=\left|\sum_iw_i(X_i-EX_i)\right|$ とする。$Z$ の有界差分定数を求め、$Z-EZ$ の両側偏差を評価せよ。$\sum_iw_i^2=0$ も扱え。

- Level: B
- ID: HDP4-B3

<!-- solution-start -->
**詳細解答**　$S(x)=\sum_iw_i(x_i-EX_i)$ とすれば、入力 $x_i$ を $x_i'$ に替えた差は $w_i(x_i-x_i')$ で、絶対値が $|w_i|$ 以下です。絶対値の逆三角不等式

$$
\bigl||S(x)|-|S(x')|\bigr|\le|S(x)-S(x')|
$$

より $Z$ の第 $i$ 変動幅は $c_i=|w_i|$ と取れます。$W=\sum_iw_i^2>0$ なら[McDiarmidの有界差分不等式](#thm-hdp4-mcdiarmid)により

$$
P(|Z-EZ|\ge t)\le2\exp(-2t^2/W).
$$

$W=0$ なら全ての $w_i=0$ なので $Z=0$ で、$t>0$ の確率は零です。なおこの結論は $Z$ と零の差を直接評価するものではありません。
<!-- solution-end -->

### B4. 完全従属による破綻

$R$ はRademacher変数、$X_1=\cdots=X_n=R$、$n\ge4$、$f(x)=n^{-1}\sum_i x_i$、$S_i=\{-1,1\}$ とする。独立を仮定して有界差分不等式を適用した場合の誤った評価を書き、実確率と比較せよ。さらに $D_1,\ldots,D_n$ を直接求め、どの段階で幅の推論が破綻するか説明せよ。

- Level: B
- ID: HDP4-B4

<!-- solution-start -->
**詳細解答**　形式上の変動幅は $c_i=2/n$ なので $V=4/n$ です。独立と誤認すると $t=1$ に対して $P(|f(X)-Ef(X)|\ge1)\le2e^{-n/2}$ となります。一方 $f(X)=R$、$Ef(X)=0$ で実確率は $1$ です。$n\ge4$ なら $2e^{-n/2}\le2e^{-2}<1$ なので矛盾します。

$\mathcal F_0$ は自明ですが、$\mathcal F_i=\sigma(R)$（$i\ge1$）です。従って $M_0=0$、$M_1=\cdots=M_n=R$、$D_1=R$、$D_i=0$（$i\ge2$）です。$D_1$ の条件付き変動幅は $2$ であり、$2/n$ 以下ではありません。第1入力から未来の全入力まで確定するため、未来を独立に平均する第3節の構成が使えないことが破綻の原因です。
<!-- solution-end -->

**Level C：高次元の最大標本平均**

### C1. 座標の個数と観測数を分離する

$X_1,\ldots,X_n$ は $[0,1]^d$ に値を取る独立同分布な確率ベクトルとし、$d\ge2$ とする。同一ベクトル内の座標間には独立性を仮定しない。$\mu_j=EX_{ij}$、

$$
Z=\max_{1\le j\le d}\frac1n\sum_{i=1}^nX_{ij},
\qquad \mu_*=\max_{1\le j\le d}\mu_j
$$

と置く。(1) $Z$ の有界差分定数を求めよ。(2) $EZ\le\mu_*+\sqrt{\log d/(2n)}$ を示せ。(3) 任意の $t>0$ で、$P(Z\ge\mu_*+\sqrt{\log d/(2n)}+t)\le e^{-2nt^2}$ を証明せよ。

- Level: C
- ID: HDP4-C1

<!-- solution-start -->
**詳細解答**　(1) 第 $i$ 観測ベクトル $x_i$ 全体を $x_i'$ へ入れ替えても、各 $j$ の平均は $(x_{ij}-x_{ij}')/n$ しか変わらず絶対値は $1/n$ 以下です。最大値についての逆向きの二不等式を第6節と同じように適用すると $|Z(x)-Z(x')|\le1/n$ であり、$c_i=1/n$、$V=1/n$ です。観測番号の独立性だけを使っています。

(2) $U_j=n^{-1}\sum_i(X_{ij}-\mu_j)$ と置きます。各 $j$ を固定したとき、$i$ に関する $X_{ij}$ は独立で値域が $[0,1]$ です。[Hoeffding補題](../HDP1/index.md#lem-hdp1-hoeffding)を $X_{ij}-\mu_j$、指数係数 $\lambda/n$ へ代入し、独立な $i$ の積を取ると、任意の $\lambda>0$ で

$$
\begin{aligned}
E e^{\lambda U_j}
&=\prod_{i=1}^n E e^{(\lambda/n)(X_{ij}-\mu_j)}\\
&\le\prod_{i=1}^n e^{\lambda^2/(8n^2)}
=e^{\lambda^2/(8n)}.
\end{aligned}
$$

各標本値について $e^{\lambda\max_j U_j}\le\sum_j e^{\lambda U_j}$ なので、$\log$ の凹性（またはJensenの不等式）と有限和の線形性から

$$
\begin{aligned}
E[\max_j U_j]
&=\frac1\lambda E[\log e^{\lambda\max_jU_j}]\\
&\le\frac1\lambda\log E[e^{\lambda\max_jU_j}]\\
&\le\frac1\lambda\log\sum_{j=1}^d E e^{\lambda U_j}\\
&\le\frac{\log d}{\lambda}+\frac{\lambda}{8n}.
\end{aligned}
$$

$\mu_j\le\mu_*$ より $Z=\max_j(\mu_j+U_j)\le\mu_*+\max_jU_j$ です。右辺の $\lambda$ 表式の微分は $-\log d/\lambda^2+1/(8n)$ なので、$d\ge2$ より $\lambda_*=\sqrt{8n\log d}$ を選べます。代入すると両項は $\sqrt{\log d/(8n)}$ で、和は $\sqrt{\log d/(2n)}$ です。従って

$$
EZ\le\mu_*+\sqrt{\frac{\log d}{2n}}.
$$

(3) (1) と[McDiarmidの有界差分不等式](#thm-hdp4-mcdiarmid)から $P(Z-EZ\ge t)\le e^{-2nt^2}$ です。(2) により

$$
\{Z\ge\mu_*+\sqrt{\log d/(2n)}+t\}
\subseteq\{Z\ge EZ+t\}.
$$

よって求める確率も $e^{-2nt^2}$ 以下です。ここでは期待値の上界 (2) と期待値周りの集中 (3) を**別々の役割**として導いた点が重要です。座標間の独立性はどの段階でも使っていません。
<!-- solution-end -->

## 9. まとめ：何が変わったか

独立な入力から決まる関数なら、必ずしも出力が独立な確率変数の和である必要はありません。各入力を一つ替えたときの影響度を $c_i$ で抑え、Doob差分へ変換すれば、独立性は**差分の積の因数分解**ではなく**条件付き予測の変動幅**と**条件付き期待値の反復**に現れます。

核心の流れは、座標ごとの入れ替え幅 $c_i$ → 条件付き関数 $g_i$ の幅 $c_i$ → 零平均のDoob差分 → 条件付きHoeffding評価 → $\exp(-2t^2/\sum_i c_i^2)$ です。最大値や経験分布関数にも使えますが、得られるのは原則として $EZ$ 周辺の集中です。次のGaussian集中では、独立な有限入力の置換幅ではなく、連続的な摂動とLipschitz性を通じて同じ問いを考えます。
