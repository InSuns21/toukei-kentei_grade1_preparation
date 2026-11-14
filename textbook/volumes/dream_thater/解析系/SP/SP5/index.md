# SP5 有限 Markov 連鎖の収束・周期性・結合

[有限既約連鎖の正再帰性](../SP4/index.md#thm-sp4-finite-irreducible)により、有限既約連鎖には一意の不変確率分布があります。しかし、不変であることは、ある状態から出発した分布がその分布へ近づくことを意味しません。例えば $0\to1\to0$ を確率 $1$ で繰り返す連鎖は、$(1/2,1/2)$ を不変分布に持ちながら、時刻分布は振動し続けます。

この障害を「周期」で捉え、距離を測る「全変動距離」と二本の連鎖を一緒に構成する「結合」を用いて、有限・既約・非周期の下での収束を証明します。行列の固有値の一般論を先取りせず、読者が確率計算を追える形にします。

## 1. 周期とは何か

$S$ を空でない有限状態空間、$P=(p(i,j))$ を行確率行列、$p^{(n)}(i,j)$ を $n$ 歩遷移確率とします。$p^{(0)}(i,j)=\boldsymbol{1}_{\{i=j\}}$ です。これらは [Markov 連鎖の定義](../../STO/STO2A/index.md#def-sto2a-markov)と [Chapman–Kolmogorov の式](../../STO/STO2A/index.md#eq-sto2a-chapman-kolmogorov)から計算できます。

帰還できる時刻が偶数に限られる状態は、奇数時刻にはその状態へ戻れません。帰還可能な正の時刻の最大公約数で、その繰り返し方を表します。

<a id="def-sp5-period"></a>

<!-- formal-statement-start -->
> **定義（Markov 連鎖の周期）**  
> 有限状態空間 $S$ 上の時間一様 Markov 連鎖の遷移行列 $P$ と状態 $i\in S$ について、正の帰還可能時刻の集合を

$$
R_i=\{n\ge1:p^{(n)}(i,i)>0\}
$$

> と置く。$R_i\ne\varnothing$ なら $d(i)=\gcd R_i$ を状態 $i$ の**周期**とし、$d(i)=1$ のとき**非周期**という。既約な連鎖で周期が $1$ のものを**既約非周期連鎖**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp5-period -->
### 直接例：交互連鎖と自己ループ

$p(0,1)=p(1,0)=1$ なら、どちらの状態も帰還可能時刻は $2,4,6,\ldots$ なので周期 $2$ です。一方、$p(0,0)=p(0,1)=1/2$、$p(1,0)=1$ なら $0$ は一歩で帰還でき、周期 $1$ です。$1$ は二歩 $1\to0\to1$ と三歩 $1\to0\to0\to1$ で帰還できるので $\gcd(2,3)=1$、周期 $1$ です。自己ループがない状態も非周期になり得ます。
<!-- definition-example-end -->

[通信クラス・既約性の定義](../SP3/index.md#def-sp3-communication)を使うと、通信する状態の周期が一致することを示せます。

<a id="prop-sp5-class-period"></a>

<!-- formal-statement-start -->
> **命題（周期は通信クラスで共通）**  
> 有限状態空間 $S$ 上の時間一様 Markov 連鎖で、状態 $i,j$ が相互到達可能かつ $R_i,R_j\ne\varnothing$ なら、$d(i)=d(j)$ である。特に有限既約連鎖では全状態の周期が一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$i$ から $j$ へ行って戻る経路と、途中で $j$ から $j$ への $n$ 歩帰還を挟む経路の長さの差を比較します。

<!-- proof-start -->
### 証明

$i\to j$ の正確率経路の長さを $a\ge0$、$j\to i$ のものを $b\ge0$ とします。任意の $n\in R_j$ に対し、[Chapman–Kolmogorov の式](../../STO/STO2A/index.md#eq-sto2a-chapman-kolmogorov)から

$$
p^{(a+b)}(i,i)\ge p^{(a)}(i,j)p^{(b)}(j,i)>0,
$$

$$
p^{(a+n+b)}(i,i)\ge
p^{(a)}(i,j)p^{(n)}(j,j)p^{(b)}(j,i)>0.
$$

$d(i)$ は $a+b$ と $a+n+b$ を割るため、その差 $n$ も割ります。全 $n\in R_j$ に成り立つので $d(i)\mid d(j)$。逆向きにも同じ議論をすると $d(j)\mid d(i)$ であり、両者は等しいです。有限既約性の下ではどの状態にも正確率の巡回路が存在して $R_i\ne\varnothing$ です。
<!-- proof-end -->

## 2. 全変動距離：分布全体を比較する

時刻分布 $\mu P^n$ と不変分布 $\pi$ の差は、ある一状態だけではなく、どの事象を見ても小さくなる必要があります。

<a id="def-sp5-total-variation"></a>

<!-- formal-statement-start -->
> **定義（有限集合上の全変動距離）**  
> 空でない有限集合 $S$ 上の二つの確率分布 $\mu,\nu$ に対し、全変動距離を

$$
\|\mu-\nu\|_{\mathrm{TV}}
=\max_{A\subset S}|\mu(A)-\nu(A)|,
\qquad \mu(A)=\sum_{i\in A}\mu_i
$$

> と定義する。
<!-- formal-statement-end -->

<a id="prop-sp5-tv-contraction"></a>

<!-- formal-statement-start -->
> **命題（全変動距離の和表示と縮小）**  
> 空でない有限集合 $S$ 上の確率分布 $\mu,\nu$ と行確率行列 $P$ に対し、

$$
\|\mu-\nu\|_{\mathrm{TV}}
=\frac12\sum_{i\in S}|\mu_i-\nu_i|,
\qquad
\|\mu P-\nu P\|_{\mathrm{TV}}
\le\|\mu-\nu\|_{\mathrm{TV}}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

正の差と負の差の総量は等しく、正の差だけを集めた事象が最大値を達成します。遷移では流入確率が混ざるので、三角不等式によって距離は増えません。

<!-- proof-start -->
### 証明

$\Delta_i=\mu_i-\nu_i$ と置くと $\sum_i\Delta_i=0$ です。$A_+=\{i:\Delta_i>0\}$ とすれば

$$
\sum_{i\in A_+}\Delta_i
=-\sum_{i\notin A_+}\Delta_i
=\frac12\sum_i|\Delta_i|.
$$

任意の $A$ について $\sum_{i\in A}\Delta_i\le\sum_{i\in A_+}\Delta_i$ であり、負の場合には補集合を取って同じ上界を得るため、最初の等式が成立します。次に、遷移後の差の $j$ 成分は $\sum_i\Delta_i p(i,j)$ なので、

$$
\begin{aligned}
2\|\mu P-\nu P\|_{\mathrm{TV}}
&=\sum_j\left|\sum_i\Delta_i p(i,j)\right|\\
&\le\sum_j\sum_i|\Delta_i|p(i,j)
=\sum_i|\Delta_i|\sum_jp(i,j)\\
&=\sum_i|\Delta_i|.
\end{aligned}
$$

ここで $p(i,j)\ge0$ と各行の和が $1$ であることを使いました。
<!-- proof-end -->

<!-- definition-example-start: def-sp5-total-variation -->
### 直接例：三状態

$\mu=(1/2,1/4,1/4)$、$\nu=(1/4,1/2,1/4)$ では、和表示から距離は $\frac12(1/4+1/4)=1/4$ です。事象 $A=\{0\}$ を取ると $\mu(A)-\nu(A)=1/4$ で、最大を実現します。
<!-- definition-example-end -->

## 3. 結合：同じ乱数で二本を比較する

全変動距離は、二本の確率変数を同じ確率空間に置いて「異なる値になる確率」で上から抑えられます。二本が独立である必要はありません。

<a id="def-sp5-coupling"></a>

<!-- formal-statement-start -->
> **定義（結合）**  
> 有限集合 $S$ 上の確率分布 $\mu,\nu$ に対し、同一の確率空間上の $S$ 値確率変数 $(U,V)$ で、全 $i\in S$ について $P(U=i)=\mu_i$、$P(V=i)=\nu_i$ を満たすものを、二分布の**結合**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp5-coupling -->
### 直接例：同じ一様乱数

$W$ を $[0,1]$ 上の一様乱数とし、$U=0$ を $W\le3/4$ のとき、$V=0$ を $W\le1/4$ のときとし、他は $1$ とします。$P(U=0)=3/4$、$P(V=0)=1/4$ であり、$U\ne V$ は $1/4<W\le3/4$ のときだけなので $P(U\ne V)=1/2$ です。二つの異なる周辺分布を正しく保っています。
<!-- definition-example-end -->

<a id="lem-sp5-coupling-inequality"></a>

<!-- formal-statement-start -->
> **補題（結合不等式）**  
> 有限集合 $S$ 上の確率分布 $\mu,\nu$ の任意の結合 $(U,V)$ に対し、

$$
\|\mu-\nu\|_{\mathrm{TV}}\le P(U\ne V)
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$U=V$ なら任意の事象 $A\subset S$ への所属が一致するため、

$$
\begin{aligned}
|\mu(A)-\nu(A)|
&=\left|E[\boldsymbol{1}_{\{U\in A\}}-\boldsymbol{1}_{\{V\in A\}}]\right|\\
&\le E|\boldsymbol{1}_{\{U\in A\}}-\boldsymbol{1}_{\{V\in A\}}|
\le P(U\ne V).
\end{aligned}
$$

$A$ に関する最大を取って結論を得ます。
<!-- proof-end -->

