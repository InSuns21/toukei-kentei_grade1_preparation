# F0-02C5 関数解析V：一般化KKT・錐制約・双対乗数

成分ごとの制約を写像と錐へまとめ、一般化LagrangianとKKT条件を型付きで書けるところまでを一講義にします。制約想定は次講C5Aです。

## 1. 不等式制約を錐でまとめる

$X,Y$ をBanach空間、$K\subset Y$ を閉凸錐とします。

写像

$$
G:X\to Y
$$

を用いて

$$
\boxed{G(x)\in-K}
$$

と書けば、複数の不等式を一つにまとめられます。

### 1.1 通常の不等式制約は特殊例

$$
Y=\mathbb R^m,
\qquad
K=\mathbb R_+^m
$$

とすると

$$
G(x)\in-\mathbb R_+^m
$$

は成分ごとに

$$
G_i(x)\le0
\qquad(i=1,\dots,m)
$$

という意味です。

---

## 2. 等式制約も写像でまとめる

等式制約は別のBanach空間 $Z$ と写像

$$
H:X\to Z
$$

を用いて

$$
\boxed{H(x)=0}
$$

と書きます。

有限次元で $Z=\mathbb R^r$ なら、$r$ 本の等式制約をまとめたものです。

---

## 3. 問題の一般形

ここでは

$$
\min_{x\in X}f(x)
$$

subject to

$$
G(x)\in-K,
\qquad
H(x)=0
$$

を考えます。

$f:X\to\mathbb R$、$G:X\to Y$、$H:X\to Z$ はFréchet微分可能とします。

---

## 4. 乗数はどこに住むのか

不等式側の乗数は

$$
\lambda\in K^*\subset Y^*,
$$

等式側の乗数は

$$
\nu\in Z^*
$$

とします。

$G(x)\in Y$ に $\lambda\in Y^*$ を作用させれば実数

$$
\lambda(G(x))
$$

が得られます。

同様に

$$
\nu(H(x))
$$

も実数です。

したがってLagrangianを

$$
\boxed{
L(x,\lambda,\nu)
=f(x)+\lambda(G(x))+\nu(H(x))
}
$$

と定義できます。

---

## 5. stationarityを微分する

$x$ について微分すると、連鎖律から

$$
D_xL(x,\lambda,\nu)
=
Df(x)
+DG(x)^*\lambda
+DH(x)^*\nu.
$$

各項はすべて $X^*$ の元です。

したがって停留条件

$$
\boxed{
Df(x^*)
+DG(x^*)^*\lambda
+DH(x^*)^*\nu
=0
}
$$

は型の合った等式です。

---

## 6. 一般化KKT条件

適切な制約想定の下で局所最適解 $x^*$ に対し、ある

$$
\lambda\in K^*,
\qquad
\nu\in Z^*
$$

が存在して、次を満たします。

### 主実行可能性

$$
\boxed{
G(x^*)\in-K,
\qquad
H(x^*)=0
}
$$

### 双対実行可能性

$$
\boxed{\lambda\in K^*}
$$

### stationarity

$$
\boxed{
Df(x^*)
+DG(x^*)^*\lambda
+DH(x^*)^*\nu
=0
}
$$

### 相補性

$$
\boxed{\lambda(G(x^*))=0}
$$

です。

$G(x^*)\in-K$ と $\lambda\in K^*$ なので

$$
\lambda(G(x^*))\le0.
$$

その値が0になることが相補性です。

---

## 7. 有限次元の通常KKTを復元する

$$
X=\mathbb R^p,
\quad
Y=\mathbb R^m,
\quad
Z=\mathbb R^r,
\quad
K=\mathbb R_+^m
$$

とします。

Riesz表現によって双対空間を通常のEuclidベクトルと同一視すると

$$
\lambda\in K^*
\Longleftrightarrow
\lambda_i\ge0.
$$

随伴は転置行列なので

$$
DG(x)^*\lambda
=J_G(x)^{\mathsf T}\lambda,
$$

$$
DH(x)^*\nu
=J_H(x)^{\mathsf T}\nu.
$$

したがってstationarityは

$$
\boxed{
\nabla f(x^*)
+J_G(x^*)^{\mathsf T}\lambda
+J_H(x^*)^{\mathsf T}\nu
=0
}
$$

です。

相補性は

$$
\lambda^{\mathsf T}G(x^*)=0.
$$

各項について

$$
\lambda_i\ge0,
\qquad
G_i(x^*)\le0
$$

なので、和が0なら

$$
\boxed{\lambda_iG_i(x^*)=0}
$$

が各 $i$ で成り立ちます。

通常のKKTが完全に戻りました。

---

## 演習

### F0-02C5-A01 不等式を錐制約にまとめる

- Level: A
- 目安時間: 10分

$g_i(x)\\le0$ $(i=1,\\dots,m)$ を一つの錐制約として書け。

<!-- solution-start -->
#### 詳細解答
$G(x)=(g_1(x),\\dots,g_m(x))$、$K=\\mathbb R_+^m$ と置けば $G(x)\\in-K$。双対乗数は $\\lambda\\in K^*=\\mathbb R_+^m$。
#### 本番答案
$G(x)=(g_1(x),\\dots,g_m(x))$、$K=\\mathbb R_+^m$ と置けば $G(x)\\in-K$。双対乗数は $\\lambda\\in K^*=\\mathbb R_+^m$。
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C5-B01 一般化KKTから通常KKTを復元

- Level: B
- 目安時間: 15分

$X=\\mathbb R^p,Y=\\mathbb R^m,K=\\mathbb R_+^m$ として一般化stationarityを通常のJacobian表記へ戻せ。

<!-- solution-start -->
#### 詳細解答
Riesz同一視と随伴=転置から $Df+DG^*\\lambda=0$ は $\\nabla f+J_G^T\\lambda=0$ になる。$K^*=K$ から $\\lambda_i\\ge0$、相補性から $\\lambda_i g_i=0$。
#### 本番答案
Riesz同一視と随伴=転置から $Df+DG^*\\lambda=0$ は $\\nabla f+J_G^T\\lambda=0$ になる。$K^*=K$ から $\\lambda_i\\ge0$、相補性から $\\lambda_i g_i=0$。
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C5A 制約想定・LICQ・MFCQ・Robinson CQ](../F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md)**
