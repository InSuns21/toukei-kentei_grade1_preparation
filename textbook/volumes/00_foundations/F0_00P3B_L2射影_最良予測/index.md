# F0-00P3B 条件付き期待値のL2射影・最良予測

<!-- definition-example-audit: strict -->

P3Aでは条件付き期待値を[Radon--Nikodym定理](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)から構成しました。$X\in L^2$ なら、同じ対象をHilbert空間の**直交射影**として読むことができます。

$$
\boxed{E[X\mid\mathcal G]=P_{L^2(\mathcal G)}X}
$$

この章では、この等式を記号だけで置かず、閉部分空間性・$L^2$縮小性・直交性・Pythagoras分解の順に証明します。

---

## 1. 情報 $\mathcal G$ だけで作れる $L^2$ 確率変数

P3A では、条件付き期待値 $E[X\mid\mathcal G]$ が $\mathcal G$-可測になることを要求しました。$X\in L^2$ のとき、この条件を幾何学的に読むには、「$\mathcal G$ だけから作れて、しかも二乗可積分な確率変数」を射影先として一つの集合にまとめる必要があります。

ただし $L^2$ の元は a.s. 等しい関数を同一視しているため、ある代表関数が $\mathcal G$-可測であれば十分です。この射影先を次の記号で表します。

<a id="def-f0-00p3b-l2g"></a>

<!-- formal-statement-start -->
> **定義（L2(G)）**  
> 確率空間 $(\Omega,\mathcal F,P)$ と $\mathcal G\subseteq\mathcal F$ を満たす $\sigma$ 代数 $\mathcal G$ に対して次で定めます。

$$
L^2(\mathcal G)=\{Z\in L^2(\mathcal F):Z\text{ は }\mathcal G\text{-可測な代表元を持つ}\}.
$$
<!-- formal-statement-end -->

$L^2$ ではa.s.等しい関数を同一視するため、「$Z$ が $\mathcal G$-可測」と言う代わりに「$\mathcal G$-可測な代表元を持つ」と書いています。

### 1.1 例：二つのセルしか区別できない情報

$\Omega=\{1,2,3,4\}$ に一様分布を入れ、

$$
\mathcal G=\sigma(\{1,2\})
=\{\varnothing,\{1,2\},\{3,4\},\Omega\}
$$

とします。確率変数

$$
Z(1)=Z(2)=1,
\qquad
Z(3)=Z(4)=-2
$$

を考えます。

<!-- definition-example-start: def-f0-00p3b-l2g -->
**定義の確認**  
$Z$ は $\{1,2\}$ 上と $\{3,4\}$ 上で一定なので $\mathcal G$-可測です。また

$$
E[Z^2]=\frac14(1+1+4+4)=\frac52<\infty.
$$

従って

$$
\boxed{Z\in L^2(\mathcal G)}.
$$
<!-- definition-example-end -->

---

## 2. $L^2(\mathcal G)$ は $L^2$ 極限で閉じている

[Hilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)を使うには、射影先が線形結合に閉じているだけでなく、$L^2$ ノルムで極限を取っても射影先から出ないことが必要です。線形性は可測関数の線形結合からすぐ分かりますが、$L^2$ 極限を取ったときにも $\mathcal G$-可測な代表元を保てるかは別に確認が必要です。

$L^2$ 収束そのものは全ての $\omega$ での収束を意味しないので、まず十分速く収束する部分列を取り、[Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)と確率評価から a.s. 収束する部分列を作ります。その極限を $\mathcal G$-可測な代表元として採用するのが核心です。

<a id="thm-f0-00p3b-l2g-closed"></a>

<!-- formal-statement-start -->
> **定理（L2(G)の閉部分空間性）**  
> $L^2(\mathcal G)$ は $L^2(\mathcal F)$ の線形部分空間です。さらに、$Z_n\in L^2(\mathcal G)$、$Z\in L^2(\mathcal F)$ が

$$
\|Z_n-Z\|_2\to0
$$

> を満たすなら $Z\in L^2(\mathcal G)$ です。
<!-- formal-statement-end -->

線形部分空間であることは、$\mathcal G$-可測関数の線形結合が再び $\mathcal G$-可測であることから分かります。問題は閉性です。

<!-- proof-start -->
### 2.1 証明

$Z_n\in L^2(\mathcal G)$ が

$$
\|Z_n-Z\|_2\to0
$$

を満たすとします。各 $Z_n$ について $\mathcal G$-可測な代表元を選び、$Z$ にも実数値代表元を一つ選びます。

部分列 $Z_{n_k}$ を

$$
E|Z_{n_k}-Z|^2\le2^{-3k}
$$

となるように取れます。[Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)から

$$
P(|Z_{n_k}-Z|>2^{-k})
\le2^{2k}E|Z_{n_k}-Z|^2
\le2^{-k}.
$$

$E_k=\{|Z_{n_k}-Z|>2^{-k}\}$ と置くと、[可算劣加法性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound)より

$$
P\left(\bigcup_{k\ge m}E_k\right)
\le\sum_{k\ge m}2^{-k}
=2^{1-m}.
$$

ここで

$$
F_m:=\bigcup_{k\ge m}E_k
$$

と置くと $F_1\supseteq F_2\supseteq\cdots$ で、上の評価から $P(F_m)\to0$ です。[確率測度の減少列連続性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-continuity-from-above)をこの減少列 $(F_m)$ に適用すると

$$
P\left(\bigcap_{m=1}^\infty F_m\right)
=
\lim_{m\to\infty}P(F_m)
=0.
$$

すなわち

$$
P\left(\bigcap_{m=1}^\infty\bigcup_{k\ge m}E_k\right)=0.
$$

左辺の集合は「$E_k$ が無限回起こる」経路の集合です。その外では、十分大きい $k$ で

$$
|Z_{n_k}-Z|\le2^{-k},
$$

よって $Z_{n_k}\to Z$ です。

そこで、まず収束する点の集合が $\mathcal G$ で見えることを確認します。実数列が収束することは Cauchy 条件と同値なので

$$
C
=
\bigcap_{r=1}^{\infty}
\bigcup_{N=1}^{\infty}
\bigcap_{k,\ell\ge N}
\left\{
|Z_{n_k}-Z_{n_\ell}|<\frac1r
\right\}.
$$

各 $Z_{n_k}$ は $\mathcal G$-可測な代表元として選んでいるので、右辺に現れる集合は全て $\mathcal G$ に属し、従って $C\in\mathcal G$ です。

次に

$$
W(\omega)=
\begin{cases}
\lim_k Z_{n_k}(\omega),&\omega\in C,\\
0,&\omega\notin C
\end{cases}
$$

と置きます。$W_k:=\mathbf1_CZ_{n_k}$ とすれば各 $W_k$ は $\mathcal G$-可測で、$C$ 上では $Z_{n_k}$ の極限へ、$C^c$ 上では常に0へ収束します。従って $W_k\to W$ が全点で成り立ち、可測関数列の点ごとの極限として $W$ も $\mathcal G$-可測です。

上の確率評価から $E_k$ が無限回起こる点を除けば $Z_{n_k}\to Z$ なので、その集合の補集合は $C$ に含まれます。従って $P(C)=1$ かつ $W=Z$ a.s. です。よって $Z$ は $\mathcal G$-可測な代表元 $W$ を持ち、$Z\in L^2(\mathcal G)$。これで閉性が示されました。
<!-- proof-end -->

---

## 3. 条件付き期待値の $L^2$ 縮小性

$X\in L^2(\mathcal F)$ とし $M=E[X\mid\mathcal G]$ と置きます。確率測度では [Cauchy--Schwarzの不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を $|X|$ と $1$ に適用して

$$
E|X|\le\{E[X^2]\}^{1/2}=\|X\|_2
$$

なので、$X\in L^1$ でもあり P3A の条件付き期待値が定義できます。

ただし、定義から直ちに $M\in L^2$ と言うことはできません。そこで $M$ を有界な範囲へ切断し、その切断を「既知量」として条件付けの外へ出します。各切断の二乗平均を一様に押さえ、最後に単調収束で切断を外します。

<a id="lem-f0-00p3b-l2-contraction"></a>

<!-- formal-statement-start -->
> **補題（条件付き期待値のL2縮小性）**  
> $X\in L^2$ なら $E[X\mid\mathcal G]\in L^2$ であり、次が成り立ちます。

$$
\boxed{\|E[X\mid\mathcal G]\|_2\le\|X\|_2}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 3.1 証明

$K>0$ に対し

$$
M_K=M\mathbf1_{\{|M|\le K\}}
$$

と置きます。$M_K$ は有界かつ $\mathcal G$-可測なので、P3Aの既知量を外へ出す性質から

$$
E[XM_K]=E[MM_K].
$$

従って

$$
A_K:=E[M^2\mathbf1_{\{|M|\le K\}}]
=E[XM_K].
$$

Cauchy--Schwarzより

$$
A_K
\le\|X\|_2\|M_K\|_2
=\|X\|_2A_K^{1/2}.
$$

$A_K=0$ なら自明、$A_K>0$ なら割って

$$
A_K^{1/2}\le\|X\|_2.
$$

$K\uparrow\infty$ で $M^2\mathbf1_{\{|M|\le K\}}\uparrow M^2$ なので[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)から

$$
E[M^2]=\lim_{K\to\infty}A_K\le E[X^2]<\infty.
$$

従って $M\in L^2$ かつ $\|M\|_2\le\|X\|_2$ です。
<!-- proof-end -->

---

## 4. 残差は既知情報と直交する

条件付き期待値を本当に Hilbert 空間の射影と呼ぶには、$M=E[X\mid\mathcal G]$ が射影先に属するだけでは足りません。残差 $X-M$ が、$\mathcal G$ で表せる全ての $L^2$ 方向と直交することが必要です。

まず有界な $\mathcal G$-可測変数なら P3A の「既知量を外へ出す」性質を直接使えます。一般の $L^2$ 変数は有界な切断で近似し、Cauchy--Schwarz で極限を渡します。

<a id="thm-f0-00p3b-orthogonality"></a>

<!-- formal-statement-start -->
> **定理（条件付き期待値の直交性）**  
> $X\in L^2$、$M=E[X\mid\mathcal G]$ とします。このとき任意の $Z\in L^2(\mathcal G)$ に対して次が成り立ちます。

$$
\boxed{E[(X-M)Z]=0}.
$$

> すなわち $X-M\perp L^2(\mathcal G)$ です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 4.1 証明

まず $Z$ が有界かつ $\mathcal G$-可測なら、P3Aの既知量を外へ出す性質と全期待値保存から

$$
E[XZ]
=E[E[XZ\mid\mathcal G]]
=E[ZE[X\mid\mathcal G]]
=E[MZ].
$$

従って $E[(X-M)Z]=0$ です。

一般の $Z\in L^2(\mathcal G)$ に対し

$$
Z_K=(-K)\vee(Z\wedge K)
$$

と切断します。各 $Z_K$ は有界かつ $\mathcal G$-可測で $E[(X-M)Z_K]=0$。また

$$
|Z_K-Z|^2\le |Z|^2,
\qquad
Z_K\to Z\quad\text{a.s.}
$$

なので[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から $\|Z_K-Z\|_2\to0$。Cauchy--Schwarzより

$$
|E[(X-M)(Z_K-Z)]|
\le\|X-M\|_2\|Z_K-Z\|_2\to0.
$$

従って $E[(X-M)Z]=0$ です。
<!-- proof-end -->

---

## 5. 直交射影・最良予測

ここまでで $M=E[X\mid\mathcal G]$ は閉部分空間 $L^2(\mathcal G)$ に属し、残差 $X-M$ はその部分空間全体と直交することが分かりました。これは Hilbert 射影の特徴付けそのものです。

任意の候補 $Z\in L^2(\mathcal G)$ に対して

$$
X-Z=(X-M)+(M-Z)
$$

と分けると、二つの項は直交します。従って二乗誤差は Pythagoras 型に分解され、$M$ 以外の候補へ動いた分だけ誤差が増えることが分かります。

<a id="thm-f0-00p3b-best-predictor"></a>

<!-- formal-statement-start -->
> **定理（条件付き期待値は最小二乗最良予測）**  
> $X\in L^2$、$M=E[X\mid\mathcal G]$ とします。任意の $Z\in L^2(\mathcal G)$ に対して次が成り立ちます。

$$
\boxed{\|X-Z\|_2^2=\|X-M\|_2^2+\|M-Z\|_2^2}.
$$

> 従って最小二乗誤差は $Z=M$ で最小になり、最小化解はa.s.一意です。

$$
\boxed{M=\operatorname*{arg\,min}_{Z\in L^2(\mathcal G)}E[(X-Z)^2]}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 5.1 証明

任意の $Z\in L^2(\mathcal G)$ に対して

$$
X-Z=(X-M)+(M-Z).
$$

ここで $M-Z\in L^2(\mathcal G)$ なので直交性から

$$
E[(X-M)(M-Z)]=0.
$$

二乗して期待値を取れば

$$
\|X-Z\|_2^2
=\|X-M\|_2^2+2E[(X-M)(M-Z)]+\|M-Z\|_2^2,
$$

したがって

$$
\|X-Z\|_2^2=\|X-M\|_2^2+\|M-Z\|_2^2.
$$

最後の項は非負なので $Z=M$ で最小値を取り、等号を達成する $Z$ は $\|M-Z\|_2=0$、すなわち $Z=M$ a.s. です。
<!-- proof-end -->

[Hilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)では、閉部分空間への直交射影は「部分空間に属し、残差が部分空間全体と直交する元」として特徴付けられます。第2節と第4節を合わせると

$$
\boxed{E[X\mid\mathcal G]=P_{L^2(\mathcal G)}X}
$$

が本当に従います。

### 5.2 有限分割で幾何を見る

$\Omega=\{1,2,3,4\}$ を一様分布、$\mathcal G=\sigma(\{1,2\})$、

$$
X=(1,3,2,6)
$$

とします。有限分割公式から

$$
M=E[X\mid\mathcal G]=(2,2,4,4).
$$

残差は

$$
R=X-M=(-1,1,-2,2).
$$

$Z\in L^2(\mathcal G)$ は $(a,a,b,b)$ と書けるので

$$
E[RZ]
=\frac14(-a+a-2b+2b)=0.
$$

セル平均を取る操作が、実際に「情報 $\mathcal G$ で表せる方向への射影」になっています。

---

## 6. 情報が増えると予測空間が広がる

$\mathcal H\subseteq\mathcal G$ なら

$$
L^2(\mathcal H)\subseteq L^2(\mathcal G).
$$

情報が増えるほど最小二乗予測の候補が増えるので、最小二乗誤差は悪化しません。さらにP3Aの[tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower)は

$$
P_{L^2(\mathcal H)}P_{L^2(\mathcal G)}
=P_{L^2(\mathcal H)}
$$

という射影の入れ子として読めます。

実際、$M_G=E[X\mid\mathcal G]$、$M_H=E[X\mid\mathcal H]$ とすると

$$
M_H=E[M_G\mid\mathcal H].
$$

また $X-M_G\perp L^2(\mathcal G)$ なので $M_G-M_H\in L^2(\mathcal G)$ と直交し、

$$
\boxed{
\|X-M_H\|_2^2
=
\|X-M_G\|_2^2+
\|M_G-M_H\|_2^2
}
$$

です。追加情報による予測誤差の改善量が、二つの予測の距離として見えます。

---

## 7. 線形回帰との違い

線形回帰は通常、$1,Y_1,\dots,Y_p$ が張る有限次元線形部分空間への射影です。一方

$$
E[X\mid Y]=E[X\mid\sigma(Y)]
$$

は、$Y$ の任意の二乗可積分な可測関数からなる $L^2(\sigma(Y))$ への射影です。従って一般には非線形です。

### 7.1 同時 Gaussian 分布は補足例

以下の Gaussian 公式は、この章で証明してきた「条件付き期待値＝直交射影」の一般論からだけでは出ません。**多変量正規分布に固有の事実**、すなわち同時 Gaussian なベクトルでは無相関な線形結合が独立になることを追加で使う補足例です。この事実自体はここでの証明依存にはせず、Gaussian 分布の既知結果として使います。

スカラー $(X,Y)$ が jointly Gaussian で $\operatorname{Var}(Y)>0$ とし、

$$
\beta=\frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(Y)},
\qquad
R=X-E[X]-\beta\{Y-E[Y]\}
$$

と置きます。すると

$$
\operatorname{Cov}(R,Y)
=\operatorname{Cov}(X,Y)-\beta\operatorname{Var}(Y)=0.
$$

$(R,Y)$ も同時 Gaussian なので、上のGaussian固有事実から $R$ と $Y$ は独立です。従ってP3Aの独立性の性質より

$$
E[R\mid Y]=E[R]=0.
$$

これを $R$ の定義へ戻すと

$$
\boxed{
E[X\mid Y]
=E[X]
+\frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(Y)}
\{Y-E[Y]\}
}
$$

を得ます。つまり $Y$ のアフィン関数です。中心化して $E[X]=E[Y]=0$ とした場合に限れば線形関数になります。このため同時 Gaussian 分布では、切片を含む最小二乗線形回帰と条件付き期待値が一致します。「Gaussianなら何でも線形」ではなく、**同時分布がGaussianであること**が条件です。

---

## 演習

### F0-00P3B-A01 条件付き期待値は二乗誤差を最小化する

- Level: A
- 目安時間: 12分

$X\in L^2$、$M=E[X\mid\mathcal G]$ とする。任意の $Z\in L^2(\mathcal G)$ について

$$
E[(X-Z)^2]=E[(X-M)^2]+E[(M-Z)^2]
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
$X-Z=(X-M)+(M-Z)$ を平方展開すると

$$
E[(X-Z)^2]
=E[(X-M)^2]+2E[(X-M)(M-Z)]+E[(M-Z)^2].
$$

$M-Z\in L^2(\mathcal G)$ なので、[条件付き期待値の直交性](#thm-f0-00p3b-orthogonality)を $Z'=M-Z$ に適用すると

$$
E[(X-M)(M-Z)]=0.
$$

従って

$$
E[(X-Z)^2]
=
E[(X-M)^2]+E[(M-Z)^2].
$$
<!-- solution-end -->

### F0-00P3B-A02 有限分割で射影を計算する

- Level: A
- 目安時間: 12分

$\Omega=\{1,2,3,4\}$ を一様分布、$\mathcal G=\sigma(\{1,2\})$、$X=(1,5,0,8)$ とする。$M=E[X\mid\mathcal G]$ を求め、$X-M$ が任意の $(a,a,b,b)$ と直交することを確認せよ。

<!-- solution-start -->
#### 詳細解答
各セル平均より

$$
M=(3,3,4,4),
\qquad
X-M=(-2,2,-4,4).
$$

$Z=(a,a,b,b)$ に対して

$$
E[(X-M)Z]
=\frac14(-2a+2a-4b+4b)=0.
$$

従って残差は $L^2(\mathcal G)$ の全方向と直交する。
<!-- solution-end -->

### F0-00P3B-A03 入れ子射影とtower

- Level: A
- 目安時間: 12分

$\mathcal H\subseteq\mathcal G$、$X\in L^2$ とする。射影記法を使って

$$
P_{L^2(\mathcal H)}P_{L^2(\mathcal G)}X
=P_{L^2(\mathcal H)}X
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
条件付き期待値と射影の同一視、およびP3Aの[tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower)から

$$
P_{L^2(\mathcal H)}P_{L^2(\mathcal G)}X
=E[E[X\mid\mathcal G]\mid\mathcal H]
=E[X\mid\mathcal H]
=P_{L^2(\mathcal H)}X.
$$

入れ子になった部分空間への「粗い方への再射影」が、最初から粗い方へ射影するのと同じである。
<!-- solution-end -->

### F0-00P3B-A04 情報を増やすとMSEは下がる

- Level: A
- 目安時間: 12分

$\mathcal H\subseteq\mathcal G$ とする。$M_H=E[X\mid\mathcal H]$、$M_G=E[X\mid\mathcal G]$ として

$$
E[(X-M_G)^2]\le E[(X-M_H)^2]
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
$M_H\in L^2(\mathcal H)\subseteq L^2(\mathcal G)$ なので、$M_G$ の最良予測性に $Z=M_H$ を代入すれば

$$
\|X-M_G\|_2^2\le\|X-M_H\|_2^2.
$$

より詳しくは

$$
\|X-M_H\|_2^2
=\|X-M_G\|_2^2+\|M_G-M_H\|_2^2
$$

である。
<!-- solution-end -->

### F0-00P3B-B01 $L^2$縮小性をJensenなしで示す

- Level: B
- 目安時間: 18分

$X\in L^2$、$M=E[X\mid\mathcal G]$ とする。$M_K=M\mathbf1_{\{|M|\le K\}}$ を用いて $\|M\|_2\le\|X\|_2$ を示せ。

<!-- solution-start -->
#### 詳細解答
$M_K$ は有界 $\mathcal G$-可測なので $E[XM_K]=E[MM_K]$。従って

$$
A_K:=E[M^2\mathbf1_{\{|M|\le K\}}]
=E[XM_K]
\le\|X\|_2A_K^{1/2}.
$$

よって $A_K\le\|X\|_2^2$。$K\uparrow\infty$ として[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)を使えば

$$
E[M^2]=\lim_KA_K\le E[X^2].
$$
<!-- solution-end -->

### F0-00P3B-B02 閉部分空間性の零集合処理

- Level: B
- 目安時間: 20分

$Z_n\in L^2(\mathcal G)$、$Z_n\to Z$ が $L^2$ で成り立つとする。[Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)、[可算劣加法性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound)、[確率測度の減少列連続性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-continuity-from-above)を使って適当な部分列がa.s.収束することを示し、$Z$ が $\mathcal G$-可測な代表元を持つことを証明せよ。

<!-- solution-start -->
#### 詳細解答
$Z_n\to Z$ in $L^2$ なので、各 $k$ について十分大きい $n_k$ を順に選び

$$
E|Z_{n_k}-Z|^2\le2^{-3k}
$$

とできます。$E_k=\{|Z_{n_k}-Z|>2^{-k}\}$ と置きます。[Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)を非負確率変数 $|Z_{n_k}-Z|^2$ と閾値 $2^{-2k}$ に適用すると

$$
\begin{aligned}
P(E_k)
&=P(|Z_{n_k}-Z|^2>2^{-2k})\\
&\le 2^{2k}E|Z_{n_k}-Z|^2\\
&\le2^{-k}.
\end{aligned}
$$

$$
F_m:=\bigcup_{k\ge m}E_k
$$

と置くと、[可算劣加法性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound)から

$$
P(F_m)
\le\sum_{k\ge m}2^{-k}
=2^{1-m}\to0.
$$

$F_m$ は $m$ とともに減少するので、[確率測度の減少列連続性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-continuity-from-above)を適用して

$$
P\left(\bigcap_{m=1}^\infty F_m\right)
=
\lim_{m\to\infty}P(F_m)
=0.
$$

従って $E_k$ が無限回起こる集合は確率0です。その外では、ある $m_0$ 以後

$$
|Z_{n_k}-Z|\le2^{-k}
$$

が全ての $k\ge m_0$ で成り立つので $Z_{n_k}\to Z$ です。

次に収束集合の可測性を確認します。実数列の Cauchy 条件を使えば

$$
C
=
\bigcap_{r=1}^{\infty}
\bigcup_{N=1}^{\infty}
\bigcap_{k,\ell\ge N}
\left\{|Z_{n_k}-Z_{n_\ell}|<1/r\right\}
\in\mathcal G.
$$

$W_k=\mathbf1_CZ_{n_k}$ と置けば各 $W_k$ は $\mathcal G$-可測で、全ての点である有限値 $W$ へ収束します。従って $W$ は $\mathcal G$-可測です。上の a.s. 収束から $P(C)=1$ かつ $W=Z$ a.s. なので、$Z$ は $\mathcal G$-可測な代表元を持ちます。ゆえに $Z\in L^2(\mathcal G)$ です。
<!-- solution-end -->

### F0-00P3B-B03 条件付き期待値と線形予測は一般には違う

- Level: B
- 目安時間: 18分

$Y$ が $-1,0,1$ を各確率 $1/3$ で取り、$X=Y^2$ とする。

1. $E[X\mid Y]$ を求めよ。
2. $X$ を $a+bY$ の形で最小二乗予測するときの $a,b$ を求めよ。
3. 二つが一致しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
1. $X$ は $Y$ から完全に決まるので

$$
E[X\mid Y]=Y^2.
$$

2. $a+bY$ への最小二乗射影では、残差 $X-a-bY$ が $1$ と $Y$ の両方に直交するので

$$
E[X-a-bY]=0,
$$

$$
E[(X-a-bY)Y]=0
$$

が必要です。ここで

$$
E[Y]=0,
\qquad
E[X]=E[Y^2]=\frac23,
\qquad
E[XY]=E[Y^3]=0,
\qquad
E[Y^2]=\frac23.
$$

第1式から

$$
a=E[X]-bE[Y]=\frac23,
$$

第2式から

$$
0=E[XY]-aE[Y]-bE[Y^2]
=-\frac23b,
$$

よって $b=0$。したがって最良アフィン予測は定数 $2/3$ です。

3. $L^2(\sigma(Y))$ は $Y$ の非線形関数 $Y^2$ も含むが、$\operatorname{span}\{1,Y\}$ には $Y^2$ が入らない。射影先が違うためである。
<!-- solution-end -->

### F0-00P3B-C01 情報増加による誤差改善を直交分解で測る

- Level: C
- 目安時間: 30分

$\mathcal H\subseteq\mathcal G$、$X\in L^2$ とし

$$
M_H=E[X\mid\mathcal H],
\qquad
M_G=E[X\mid\mathcal G].
$$

次を一続きに証明せよ。

1. $X-M_G\perp M_G-M_H$。
2. $M_G-M_H\perp L^2(\mathcal H)$。
3.

$$
\|X-M_H\|_2^2
=\|X-M_G\|_2^2+
\|M_G-M_H\|_2^2.
$$

4. 等号 $\|X-M_H\|_2=\|X-M_G\|_2$ が成り立つための必要十分条件を述べよ。

<!-- solution-start -->
#### 詳細解答

**1. $X-M_G$ と $M_G-M_H$ の直交性。**  
$M_G\in L^2(\mathcal G)$ です。また $\mathcal H\subseteq\mathcal G$ なので、$M_H$ は $\mathcal H$-可測であると同時に $\mathcal G$-可測でもあります。従って

$$
M_G-M_H\in L^2(\mathcal G).
$$

一方、[条件付き期待値の直交性](#thm-f0-00p3b-orthogonality)から

$$
X-M_G\perp L^2(\mathcal G).
$$

ここで $Z=M_G-M_H$ を代入すれば

$$
E[(X-M_G)(M_G-M_H)]=0.
$$

**2. $M_G-M_H$ と $L^2(\mathcal H)$ の直交性。**  
[tower property](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#thm-f0-00p3a-tower)を $\mathcal H\subseteq\mathcal G$ に適用すると

$$
E[M_G\mid\mathcal H]
=
E[E[X\mid\mathcal G]\mid\mathcal H]
=
E[X\mid\mathcal H]
=
M_H.
$$

従って、直交性の定理を確率変数 $M_G$ と部分 $\sigma$ 代数 $\mathcal H$ に適用すると、任意の $Z\in L^2(\mathcal H)$ に対して

$$
E[(M_G-M_H)Z]=0.
$$

よって

$$
M_G-M_H\perp L^2(\mathcal H).
$$

**3. 誤差の直交分解。**  
恒等式

$$
X-M_H=(X-M_G)+(M_G-M_H)
$$

を二乗して期待値を取ると

$$
\begin{aligned}
\|X-M_H\|_2^2
&=\|X-M_G\|_2^2
+2E[(X-M_G)(M_G-M_H)]\\
&\quad+\|M_G-M_H\|_2^2.
\end{aligned}
$$

1で中央項が0と分かったので

$$
\boxed{
\|X-M_H\|_2^2
=
\|X-M_G\|_2^2+
\|M_G-M_H\|_2^2
}.
$$

**4. 等号条件。**  
3の右端の項は非負なので

$$
\|X-M_H\|_2=\|X-M_G\|_2
$$

であることと

$$
\|M_G-M_H\|_2^2=0
$$

であることは同値です。$L^2$ ノルムが0であることは a.s. 等しいことと同値なので

$$
\boxed{M_G=M_H\quad\text{a.s.}}
$$

が必要十分です。つまり、追加情報 $\mathcal G$ を使っても二乗平均予測が実際には変わらない場合に限ります。
<!-- solution-end -->

---

## 次に進む

情報が段階的に増えるときの条件付き期待値の極限を [F0-00P3C Lévy上昇定理](../F0_00P3C_Levy上昇定理_情報の増加/index.md#thm-f0-00p3c-levy-upward) で証明します。