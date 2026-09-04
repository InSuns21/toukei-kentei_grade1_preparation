# F0-02C5 関数解析V：一般化KKT・錐制約・双対乗数

通常の

$$
g_i(x)\le0,
\qquad
h_j(x)=0
$$

を成分ごとに追う代わりに、制約値を一つの空間へ集めます。すると KKT の

- $\lambda_i\ge0$
- $\lambda_i g_i(x^*)=0$
- $\nabla f+J_G^{\mathsf T}\lambda+J_H^{\mathsf T}\nu=0$

は、それぞれ **双対錐・錐のnormal cone・随伴作用素**の式として同じ形にまとまります。

```text
G(x)∈-K
  ↓
N_{-K}(G(x))
  ↓
λ∈K*,  λ(G(x))=0
  ↓
DG(x)^*λ
  ↓
一般化KKT
```

---

## 1. 錐制約

$X=\mathbb R^n$、$Y=\mathbb R^m$ とし、$K\subset Y$ を閉凸錐とします。

<a id="def-f0-02c5-cone-constraint"></a>

<!-- formal-statement-start -->
> **定義（錐制約）**  
> 写像 $G:X\to Y$ に対して
>
> $$
> G(x)\in-K
> $$
>
> という形の制約を錐制約と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c5-cone-constraint -->
### 1.1 例：通常の不等式制約を一つにまとめる

**定義の確認**

$$
G(x)
=
(g_1(x),\ldots,g_m(x)),
\qquad
K=\mathbb R_+^m
$$

と置きます。このとき

$$
G(x)\in-\mathbb R_+^m
$$

であることは、各成分について

$$
g_i(x)\le0
\qquad(i=1,\ldots,m)
$$

であることと同値です。したがって通常の不等式制約は錐制約の特殊例です。
<!-- definition-example-end -->

等式制約は別の写像

$$
H:X\to\mathbb R^r
$$

を用いて $H(x)=0$ と書きます。

---

## 2. 双対錐と乗数

[dual cone の定義](../F0_02C4A_tangent_polar_dual_cone/index.md#def-f0-02c4a-dual-cone)より

$$
K^*
=
\{\lambda\in Y:
\lambda^{\mathsf T}k\ge0\ \forall k\in K\}
$$

です。有限次元では内積によって $Y^*$ と $Y$ を同一視しています。

$K=\mathbb R_+^m$ なら

$$
K^*=\mathbb R_+^m
$$

なので、$\lambda\in K^*$ は通常の $\lambda_i\ge0$ を一般化した条件です。

---

## 3. 一般化Lagrangian

<a id="def-f0-02c5-generalized-lagrangian"></a>

<!-- formal-statement-start -->
> **定義（一般化Lagrangian）**  
> 目的関数 $f:X\to\mathbb R$、錐制約 $G(x)\in-K$、等式制約 $H(x)=0$ に対し、$\lambda\in K^*$、$\nu\in\mathbb R^r$ を用いて
>
> $$
> L(x,\lambda,\nu)
> =
> f(x)+\lambda^{\mathsf T}G(x)+\nu^{\mathsf T}H(x)
> $$
>
> と定めます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c5-generalized-lagrangian -->
### 3.1 例：二本の不等式と一本の等式

**定義の確認**

$$
g_1(x)\le0,
\qquad
g_2(x)\le0,
\qquad
h(x)=0
$$

なら

$$
G(x)=(g_1(x),g_2(x)),
\qquad
K=\mathbb R_+^2,
\qquad
H(x)=h(x).
$$

よって定義へ代入すると

$$
L(x,\lambda,\nu)
=f(x)+\lambda_1g_1(x)+\lambda_2g_2(x)+\nu h(x),
$$

かつ $\lambda_1,\lambda_2\ge0$ です。通常の Lagrangian がそのまま復元されます。
<!-- definition-example-end -->

$x$ で微分すると連鎖律から

$$
\nabla_x L
=
\nabla f(x)
+DG(x)^{\mathsf T}\lambda
+DH(x)^{\mathsf T}\nu.
$$

---

## 4. 相補性は錐のnormal coneに埋め込まれている

<a id="thm-f0-02c5-cone-normal"></a>

<!-- formal-statement-start -->
> **定理（閉凸錐 $-K$ のnormal cone）**  
> $K\subset\mathbb R^m$ を閉凸錐、$y\in-K$ とすると
>
> $$
> \boxed{
> N_{-K}(y)
> =
> \{\lambda\in K^*:\lambda^{\mathsf T}y=0\}
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 4.1 証明の見取り図

normal cone の不等式へ、まず $z=0$ を入れて相補性を取り出します。次に $z=-k$ を入れると双対錐条件が出ます。逆向きも同じ二条件を戻すだけです。

<!-- proof-start -->
### 証明

$\lambda\in N_{-K}(y)$ とします。normal cone の定義から

$$
\lambda^{\mathsf T}(z-y)\le0
\qquad(\forall z\in-K).
$$

まず $z=0\in-K$ を入れると

$$
-\lambda^{\mathsf T}y\le0,
$$

すなわち $\lambda^{\mathsf T}y\ge0$ です。

一方、$y=-k_0$ とある $k_0\in K$ で書けます。後で示す $\lambda\in K^*$ と合わせれば $\lambda^{\mathsf T}y\le0$ となるので、結局0になります。

実際、任意の $k\in K$ と $t>0$ に対して $z=y-tk\in-K$ です。従って

$$
\lambda^{\mathsf T}(-tk)\le0,
$$

よって

$$
\lambda^{\mathsf T}k\ge0.
$$

従って $\lambda\in K^*$ であり、$\lambda^{\mathsf T}y=0$ です。

逆に $\lambda\in K^*$ かつ $\lambda^{\mathsf T}y=0$ とします。任意の $z\in-K$ は $z=-k$ と書けるので

$$
\lambda^{\mathsf T}(z-y)
=
-\lambda^{\mathsf T}k-0
\le0.
$$

よって $\lambda\in N_{-K}(y)$ です。$\square$
<!-- proof-end -->

この一式だけで

$$
\boxed{
\lambda\in K^*,
\qquad
\lambda^{\mathsf T}G(x^*)=0
}
$$

という双対実行可能性と相補性が同時に表現されます。

---

## 5. 局所最適点では目的関数の勾配が接方向に逆らえない

実行可能集合を

$$
C
=
\{x:G(x)\in-K,\ H(x)=0\}
$$

とします。[Bouligand tangent cone](../F0_02C4A_tangent_polar_dual_cone/index.md#def-f0-02c4a-tangent-cone) を $T_C(x^*)$ と書きます。

<a id="lem-f0-02c5-local-min-tangent"></a>

<!-- formal-statement-start -->
> **補題（局所最適点の接方向条件）**  
> $f$ が $x^*$ で微分可能で、$x^*$ が $C$ 上の局所最適点なら
>
> $$
> \nabla f(x^*)^{\mathsf T}d\ge0
> \qquad(\forall d\in T_C(x^*))
> $$
>
> が成り立ちます。従って
>
> $$
> -\nabla f(x^*)\in T_C(x^*)^\circ.
> $$
<!-- formal-statement-end -->

### 5.1 証明の見取り図

接方向 $d$ は実行可能点列の差を $t_n$ で割った極限です。局所最適性で各差分の目的関数値は非負なので、微分可能性で一次項へ割れば勾配との内積が非負になります。

<!-- proof-start -->
### 証明

$d\in T_C(x^*)$ とします。定義から $t_n\downarrow0$ と $x_n\in C$ が存在して

$$
\frac{x_n-x^*}{t_n}\to d.
$$

局所最適性より十分大きい $n$ で

$$
f(x_n)-f(x^*)\ge0.
$$

微分可能性から

$$
f(x_n)-f(x^*)
=
\nabla f(x^*)^{\mathsf T}(x_n-x^*)
+o(\|x_n-x^*\|).
$$

$t_n$ で割って極限を取ると

$$
\nabla f(x^*)^{\mathsf T}d\ge0.
$$

従って $(-\nabla f(x^*))^{\mathsf T}d\le0$ が全ての $d\in T_C(x^*)$ で成り立ち、polar cone の定義から

$$
-\nabla f(x^*)\in T_C(x^*)^\circ.
$$

$\square$
<!-- proof-end -->

---

## 6. normal coneを制約写像へ引き戻せればKKTになる

次の等式が KKT の核心です。

$$
T_C(x^*)^\circ
=
DG(x^*)^{\mathsf T}N_{-K}(G(x^*))
+
\operatorname{range}DH(x^*)^{\mathsf T}.
$$

これは常に成り立つわけではありません。一次近似が真の局所幾何を正しく表すための制約想定が必要です。次講 C5A で、有限次元の通常制約について MFCQ と Robinson CQ を定義から検算し、接錐一致と乗数存在まで証明します。

<a id="thm-f0-02c5-kkt-from-normal-chain"></a>

<!-- formal-statement-start -->
> **定理（normal-cone表現からの一般化KKT）**  
> $x^*$ を
>
> $$
> \min f(x)
> \quad\text{subject to}\quad
> G(x)\in-K,\ H(x)=0
> $$
>
> の局所最適点とします。$f,G,H$ は $x^*$ で微分可能とし、上の normal-cone 表現が $x^*$ で成り立つとします。このとき、ある
>
> $$
> \lambda\in K^*,
> \qquad
> \nu\in\mathbb R^r
> $$
>
> が存在して
>
> $$
> \boxed{
> \nabla f(x^*)
> +DG(x^*)^{\mathsf T}\lambda
> +DH(x^*)^{\mathsf T}\nu
> =0
> }
> $$
>
> および
>
> $$
> \boxed{
> \lambda^{\mathsf T}G(x^*)=0
> }
> $$
>
> を満たします。
<!-- formal-statement-end -->

### 6.1 証明の見取り図

局所最適性から $-\nabla f$ は接錐のpolarに入ります。normal-cone表現でそれを $DG^{\mathsf T}\lambda+DH^{\mathsf T}\nu$ に分解し、錐のnormal cone定理で $\lambda\in K^*$ と相補性を読み取ります。

<!-- proof-start -->
### 証明

前節の補題から

$$
-\nabla f(x^*)
\in T_C(x^*)^\circ.
$$

仮定した normal-cone 表現により、ある

$$
\lambda\in N_{-K}(G(x^*)),
\qquad
\nu\in\mathbb R^r
$$

が存在して

$$
-\nabla f(x^*)
=
DG(x^*)^{\mathsf T}\lambda
+DH(x^*)^{\mathsf T}\nu
$$

と書けます。従って stationarity が得られます。

さらに [閉凸錐のnormal cone](#thm-f0-02c5-cone-normal) から

$$
\lambda\in K^*,
\qquad
\lambda^{\mathsf T}G(x^*)=0.
$$

以上が一般化KKT条件です。$\square$
<!-- proof-end -->

---

## 7. Robinson CQ がこのnormal-cone表現を保証する

<a id="thm-f0-02c5-robinson-kkt"></a>

<!-- formal-statement-start -->
> **定理（Robinson CQ下の一般化KKT）**  
> 上の有限次元錐制約問題で Robinson CQ が $x^*$ で成立すれば、局所最適点 $x^*$ に対して一般化KKT乗数 $\lambda,\nu$ が存在します。
<!-- formal-statement-end -->

Robinson CQ が「一次近似から真の接方向を回収できる」ことが非自明な部分です。通常の滑らかな不等式制約では、次講の [MFCQから接錐一致・KKT乗数を導く定理](../F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md#thm-f0-02c5a-mfcq-kkt) でこの中身を完全に証明します。また $K=\mathbb R_+^m$ では [Robinson CQとMFCQの同値](../F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md#thm-f0-02c5a-robinson-mfcq) も証明します。

一般の閉凸錐に対する Robinson の normal-cone chain rule は、同じ構造を集合値写像へ拡張したものです。KKTの代数部分は前節で既に閉じており、一般錐で追加される論点はこの正則性定理です。

---

## 8. 通常の有限次元KKTを復元する

$$
K=\mathbb R_+^m
$$

とします。自己双対性から

$$
\lambda\in K^*
\iff
\lambda_i\ge0.
$$

相補性は

$$
\lambda^{\mathsf T}G(x^*)
=
\sum_{i=1}^m\lambda_i g_i(x^*)=0.
$$

各項は

$$
\lambda_i\ge0,
\qquad
g_i(x^*)\le0
$$

より非正です。その和が0なので各項が0、すなわち

$$
\lambda_i g_i(x^*)=0
$$

です。stationarity は

$$
\nabla f(x^*)
+J_G(x^*)^{\mathsf T}\lambda
+J_H(x^*)^{\mathsf T}\nu
=0.
$$

したがって通常のKKTが完全に復元されます。

---

## 9. 演習 Level A

### F0-02C5-A01 不等式を錐制約にまとめる

- Level: A
- 目安時間: 8分
- 主題: 錐制約
- 使用技術: 非負直交錐

$g_i(x)\le0$ $(i=1,\ldots,m)$ を一つの錐制約として書き、対応する双対乗数の条件も書け。

<!-- solution-start -->
#### 解答
##### 詳細解答

$$
G(x)=(g_1(x),\ldots,g_m(x)),
\qquad K=\mathbb R_+^m
$$

とすれば

$$
G(x)\in-K.
$$

また $K^*=K$ なので

$$
\lambda\in K^*
\iff
\lambda_i\ge0.
$$
##### 本番答案

$$
G=(g_1,\ldots,g_m),\quad K=\mathbb R_+^m
$$

と置けば $G(x)\in-K$。双対乗数は $\lambda\in K^*=\mathbb R_+^m$。
##### 採点基準（20点）
- $G$ の設定: 6点
- $K$ の設定: 6点
- 錐制約: 4点
- 双対乗数: 4点
<!-- solution-end -->

### F0-02C5-A02 錐のnormal coneから相補性を読む

- Level: A
- 目安時間: 10分
- 主題: 相補性
- 使用技術: $N_{-K}$

$K=\mathbb R_+^2$、$y=(-1,0)$ とする。$N_{-K}(y)$ を求めよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
定理より $\lambda\ge0$ かつ

$$
\lambda^{\mathsf T}y=-\lambda_1=0.
$$

従って $\lambda_1=0$、$\lambda_2\ge0$ で

$$
N_{-K}(y)=\{(0,t):t\ge0\}.
$$
##### 本番答案
$\lambda\in K^*$ と相補性 $\lambda^Ty=0$ から $\lambda_1=0,\lambda_2\ge0$。従って

$$
\boxed{N_{-K}(y)=\{(0,t):t\ge0\}}.
$$
##### 採点基準（20点）
- 双対錐条件: 6点
- 相補性: 6点
- 成分条件: 4点
- 結論: 4点
<!-- solution-end -->

### F0-02C5-A03 Lagrangianを型付きで微分する

- Level: A
- 目安時間: 10分
- 主題: stationarity
- 使用技術: Jacobianの転置

$G:\mathbb R^n\to\mathbb R^m$、$H:\mathbb R^n\to\mathbb R^r$ に対し一般化Lagrangianを $x$ で微分せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答

$$
L=f+\lambda^TG+\nu^TH
$$

なので連鎖律から

$$
\nabla_xL
=
\nabla f+DG^T\lambda+DH^T\nu.
$$

各項は $\mathbb R^n$ のベクトルで型が一致します。
##### 本番答案

$$
\boxed{\nabla_xL=\nabla f+DG^T\lambda+DH^T\nu}.
$$
##### 採点基準（20点）
- Lagrangian: 5点
- $DG^T\lambda$: 6点
- $DH^T\nu$: 5点
- 型・結論: 4点
<!-- solution-end -->

---

## 10. 演習 Level B

### F0-02C5-B01 一般化KKTから通常KKTを復元する

- Level: B
- 目安時間: 15分
- 主題: 一般化KKT
- 使用技術: 自己双対錐と成分相補性

$K=\mathbb R_+^m$ として、一般化KKTから $\lambda_i\ge0$ と $\lambda_i g_i(x^*)=0$ を導け。

<!-- solution-start -->
#### 解答
##### 詳細解答
$K^*=K$ なので $\lambda_i\ge0$。また $G(x^*)\in-K$ より $g_i(x^*)\le0$。一般化相補性

$$
\sum_i\lambda_i g_i(x^*)=0
$$

の各項は非正なので、全て0でなければ和は0になりません。従って

$$
\lambda_i g_i(x^*)=0
$$

が各 $i$ で成り立ちます。
##### 本番答案
$K^*=\mathbb R_+^m$ より $\lambda_i\ge0$。$g_i\le0$ かつ $\sum_i\lambda_i g_i=0$ なので各項が0、従って $\lambda_i g_i=0$。
##### 採点基準（20点）
- 自己双対性: 5点
- 符号: 5点
- 和が0の議論: 6点
- 成分相補性: 4点
<!-- solution-end -->

### F0-02C5-B02 接方向条件からstationarityへ

- Level: B
- 目安時間: 15分
- 主題: KKTの幾何
- 使用技術: tangent polarとnormal-cone表現

局所最適点 $x^*$ で

$$
T_C(x^*)^\circ
=
DG(x^*)^TN_{-K}(G(x^*))
$$

が成り立つとする。等式制約はないものとして、KKT stationarity と相補性を導け。

<!-- solution-start -->
#### 解答
##### 詳細解答
局所最適点の接方向条件から

$$
-\nabla f(x^*)\in T_C(x^*)^\circ.
$$

仮定した表現により、ある $\lambda\in N_{-K}(G(x^*))$ が存在して

$$
-\nabla f(x^*)=DG(x^*)^T\lambda.
$$

従って stationarity

$$
\nabla f(x^*)+DG(x^*)^T\lambda=0
$$

を得ます。さらに錐normal cone定理から $\lambda\in K^*$ と $\lambda^TG(x^*)=0$ です。
##### 本番答案

$$
-\nabla f\in T_C^\circ=DG^TN_{-K}(G)
$$

より $-\nabla f=DG^T\lambda$ となる $\lambda\in N_{-K}(G)$ が存在。従って stationarity。さらに $\lambda\in K^*$、$\lambda^TG=0$。
##### 採点基準（20点）
- 接方向必要条件: 5点
- normal-cone表現: 5点
- stationarity: 5点
- 双対実行可能性・相補性: 5点
<!-- solution-end -->

### F0-02C5-B03 非active制約の乗数が0になる理由

- Level: B
- 目安時間: 12分
- 主題: 相補性
- 使用技術: 符号

通常の不等式制約で $g_i(x^*)<0$ とする。KKTが成立するとき $\lambda_i=0$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
相補性から

$$
\lambda_i g_i(x^*)=0.
$$

ここで $g_i(x^*)<0$ なので0ではありません。従って積が0になるには

$$
\lambda_i=0
$$

しかありません。
##### 本番答案
$g_i(x^*)<0$ と $\lambda_i g_i(x^*)=0$ より直ちに $\boxed{\lambda_i=0}$。
##### 採点基準（20点）
- 相補性: 8点
- strict inequalityの利用: 6点
- 結論: 6点
<!-- solution-end -->

---

## 11. 次に進む

次の [F0-02C5A 制約想定・LICQ・MFCQ・Robinson CQ](../F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md) では、なぜ normal-cone 表現が壊れる場合があるかを退化例で見たあと、MFCQ/Robinson CQ が接錐と線形化錐を一致させ、KKT乗数を生むところまで証明します。
