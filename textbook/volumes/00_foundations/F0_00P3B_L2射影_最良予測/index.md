# F0-00P3B 条件付き期待値のL2射影・最良予測

<!-- definition-example-audit: strict -->

P3Aでは条件付き期待値をRadon--Nikodym定理から構成しました。$X\in L^2$ なら、同じ対象をHilbert空間の**直交射影**として読むことができます。

$$
\boxed{E[X\mid\mathcal G]=P_{L^2(\mathcal G)}X}
$$

---

## 1. 情報 $\mathcal G$ だけで作れる $L^2$ 確率変数

<a id="def-f0-00p3b-l2g"></a>

<!-- formal-statement-start -->
> **定義（$L^2(\mathcal G)$）**  
> 確率空間 $(\Omega,\mathcal F,P)$ と部分 $\sigma$ 代数 $\mathcal G\subseteq\mathcal F$ に対して

$$
L^2(\mathcal G)=\{Z\in L^2(\mathcal F):Z\text{ は }\mathcal G\text{-可測な代表元を持つ}\}
$$

> と定めます。
<!-- formal-statement-end -->

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

従って $Z\in L^2(\mathcal F)$ かつ $\mathcal G$-可測な代表元を持つので

$$
\boxed{Z\in L^2(\mathcal G)}.
$$
<!-- definition-example-end -->

---

## 2. $L^2(\mathcal G)$ は閉部分空間

<a id="thm-f0-00p3b-l2g-closed"></a>

<!-- formal-statement-start -->
> **定理（$L^2(\mathcal G)$ の閉部分空間性）**  
> $L^2(\mathcal G)$ はHilbert空間 $L^2(\mathcal F)$ の閉線形部分空間です。
<!-- formal-statement-end -->

線形部分空間であることは可測関数の線形結合が可測であることから直ちに分かります。閉性を確認します。

<!-- proof-start -->
### 2.1 証明

$Z_n\in L^2(\mathcal G)$ が $\|Z_n-Z\|_2\to0$ を満たすとします。各 $Z_n$ は $\mathcal G$-可測な代表元を選びます。

部分列 $Z_{n_k}$ を

$$
E|Z_{n_k}-Z|^2\le2^{-3k}
$$

となるように取れます。Markovの不等式から

$$
P(|Z_{n_k}-Z|>2^{-k})
\le2^{2k}E|Z_{n_k}-Z|^2
\le2^{-k}.
$$

従って任意の $m$ について

$$
P\left(\bigcup_{k\ge m}\{|Z_{n_k}-Z|>2^{-k}\}\right)
\le\sum_{k\ge m}2^{-k}\to0.
$$

よって確率1で $Z_{n_k}\to Z$ です。一方

$$
W=\limsup_{k\to\infty}Z_{n_k}
$$

は $\mathcal G$-可測で $W=Z$ a.s. です。従って $Z$ の $L^2$ 同値類は $\mathcal G$-可測な代表元を持ち、$Z\in L^2(\mathcal G)$ です。よって閉です。
<!-- proof-end -->

---

## 3. 条件付き期待値の $L^2$ 縮小性

$X\in L^2(\mathcal F)$ とし $M=E[X\mid\mathcal G]$ と置きます。

<a id="lem-f0-00p3b-l2-contraction"></a>

<!-- formal-statement-start -->
> **補題（条件付き期待値の$L^2$縮小性）**  
> $X\in L^2$ なら $E[X\mid\mathcal G]\in L^2$ であり、

$$
\boxed{\|E[X\mid\mathcal G]\|_2\le\|X\|_2}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 3.1 証明

$K>0$ に対し

$$
M_K=M\mathbf1_{\{|M|\le K\}}
$$

と置きます。$M_K$ は有界かつ $\mathcal G$-可測なので、P3Aで証明した性質から

$$
E[XM_K]=E[MM_K].
$$

従って

$$
A_K:=E[M^2\mathbf1_{\{|M|\le K\}}]
=E[XM_K]
\le\|X\|_2A_K^{1/2}
$$

です。$A_K>0$ なら $A_K^{1/2}\le\|X\|_2$。$K\to\infty$ とし単調収束定理を使えば

$$
E[M^2]\le E[X^2]<\infty.
$$

従って $M\in L^2$ かつ $\|M\|_2\le\|X\|_2$ です。
<!-- proof-end -->

---

## 4. 残差は既知情報と直交する

<a id="thm-f0-00p3b-orthogonality"></a>

<!-- formal-statement-start -->
> **定理（条件付き期待値の直交性）**  
> $X\in L^2$、$M=E[X\mid\mathcal G]$ とします。このとき

$$
\boxed{E[(X-M)Z]=0\qquad(\forall Z\in L^2(\mathcal G))}
$$

> すなわち $X-M\perp L^2(\mathcal G)$ です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 4.1 証明

まず $Z$ が有界かつ $\mathcal G$-可測なら、P3Aの積分一致を指示関数から単関数、さらに有界可測関数へ拡張した結果から

$$
E[XZ]=E[MZ],
$$

従って $E[(X-M)Z]=0$ です。

一般の $Z\in L^2(\mathcal G)$ に対し

$$
Z_K=(-K)\vee(Z\wedge K)
$$

と切断します。各 $Z_K$ は有界かつ $\mathcal G$-可測で $E[(X-M)Z_K]=0$。また $\|Z_K-Z\|_2\to0$ なのでCauchy--Schwarzより

$$
|E[(X-M)(Z_K-Z)]|
\le\|X-M\|_2\|Z_K-Z\|_2\to0.
$$

従って $E[(X-M)Z]=0$ です。
<!-- proof-end -->

---

## 5. 直交射影・最良予測

<a id="thm-f0-00p3b-best-predictor"></a>

<!-- formal-statement-start -->
> **定理（条件付き期待値は最小二乗最良予測）**  
> $X\in L^2$、$M=E[X\mid\mathcal G]$ とします。任意の $Z\in L^2(\mathcal G)$ に対して

$$
\boxed{\|X-Z\|_2^2=\|X-M\|_2^2+\|M-Z\|_2^2}
$$

> が成り立ちます。従って

$$
\boxed{M=\operatorname*{arg\,min}_{Z\in L^2(\mathcal G)}E[(X-Z)^2]}
$$

> であり、最小化解はa.s.一意です。
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

平方ノルムを展開すれば

$$
\|X-Z\|_2^2=\|X-M\|_2^2+\|M-Z\|_2^2.
$$

第2項は非負なので $Z=M$ で最小値を取り、等号を達成する $Z$ は $\|M-Z\|_2=0$、すなわち $Z=M$ a.s. です。
<!-- proof-end -->

従ってHilbert空間の記法では

$$
\boxed{E[X\mid\mathcal G]=P_{L^2(\mathcal G)}X}
$$

と書けます。

---

## 6. 情報が増えると予測空間が広がる

$\mathcal H\subseteq\mathcal G$ なら

$$
L^2(\mathcal H)\subseteq L^2(\mathcal G).
$$

情報が増えるほど最小二乗予測の候補が増え、最小二乗誤差は悪化しません。またP3Aのtower propertyは

$$
P_{L^2(\mathcal H)}P_{L^2(\mathcal G)}=P_{L^2(\mathcal H)}
$$

という射影の入れ子として読めます。

---

## 7. 線形回帰との違い

線形回帰は説明変数の**線形span**への射影です。一方

$$
E[X\mid Y]=E[X\mid\sigma(Y)]
$$

は $Y$ の任意の二乗可積分な可測関数からなる $L^2(\sigma(Y))$ への射影です。従って一般には非線形です。Gaussianの場合には条件付き期待値が線形になるため、線形回帰と条件付き期待値が一致する特別な状況が現れます。

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
$X-Z=(X-M)+(M-Z)$ を平方展開する。$M-Z\in L^2(\mathcal G)$ なので直交性から $E[(X-M)(M-Z)]=0$。従って交差項が消える。

#### 本番答案
平方展開し、$M-Z\in L^2(\mathcal G)$ と $X-M\perp L^2(\mathcal G)$ から交差項が0になることを用いる。

#### 採点基準（20点）
- 分解: 4点
- $M-Z\in L^2(\mathcal G)$: 4点
- 直交性: 7点
- 結論: 5点
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

よって $A_K\le\|X\|_2^2$。$K\to\infty$ として単調収束定理を使えば $E[M^2]\le E[X^2]$。

#### 本番答案
切断 $M_K$ をテスト関数として積分一致を使い、Cauchy--Schwarzで $A_K^{1/2}\le\|X\|_2$。最後に単調収束定理で $K\to\infty$。

#### 採点基準（20点）
- 切断の利用: 4点
- 積分一致: 5点
- Cauchy--Schwarz: 5点
- 単調収束と結論: 6点
<!-- solution-end -->

---

## 次に進む

情報が段階的に増えるときの条件付き期待値の極限を [F0-00P3C Lévy上昇定理](../F0_00P3C_Levy上昇定理_情報の増加/index.md) で証明します。
