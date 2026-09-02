# F0-00F 線形写像・kernel・image・rank-nullity

この講義では行列を「基底を選んだ線形写像の座標表示」として読み直し、kernel・image・rank-nullityまでを閉じます。固有空間以降は次講F0-00F1へ分離します。

---

## 1. 線形写像と行列

ベクトル空間 $V,W$ の間の写像

$$
T:V\to W
$$

が

$$
T(ax+by)=aT(x)+bT(y)
$$

を満たすとき、$T$ を **線形写像** といいます。

$V=\mathbb R^n$、$W=\mathbb R^m$ で標準基底を使えば

$$
T(x)=Ax
$$

と行列で表せます。

行列 $A$ の第 $j$ 列は

$$
T(e_j)
$$

です。

したがって行列は、「基底ベクトルをどこへ送るか」を並べたものです。

---

## 2. 基底を変えると行列は変わるが、写像そのものは変わらない

同じ線形写像でも、基底を変えると行列表現は変わります。

$V$ の基底変換行列を $S$ とし、新しい座標を $z$、古い座標を $x$ として

$$
x=Sz
$$

とします。

$T(x)=Ax$ なら

$$
T(Sz)=ASz.
$$

出力側も同じ基底変換で表す場合、

$$
Sz'=ASz
$$

なので

$$
\boxed{
z'=S^{-1}ASz}.
$$

したがって新しい行列は

$$
\boxed{S^{-1}AS}.
$$

対角化とは、写像そのものを変えるのではなく、**その写像が最も単純に見える基底を探すこと**です。

---

## 3. 核と像

線形写像 $T:V\to W$ に対して

$$
\boxed{
\ker T
=\{x\in V:T(x)=0\}
}
$$

を **核** といいます。

また

$$
\boxed{
\operatorname{Im}T
=\{T(x):x\in V\}
}
$$

を **像** といいます。

行列 $A$ なら

$$
\ker A
=\{x:Ax=0\},
$$

$$
\operatorname{Im}A
=\operatorname{Col}(A)
$$

です。

核は「消えてしまう方向」、像は「出力として到達できる方向」です。

---

## 4. rank-nullity theoremを基底から見る

$V$ を有限次元とし、

$$
\dim V=n
$$

とします。

まず $\ker T$ の基底を

$$
u_1,\dots,u_r
$$

と取ります。

これを $V$ の基底へ延長して

$$
u_1,\dots,u_r,v_1,\dots,v_{n-r}
$$

とします。

$T(u_i)=0$ なので、任意の $x\in V$ の像は

$$
T(x)
\in
\operatorname{span}(T(v_1),\dots,T(v_{n-r})).
$$

さらに $T(v_1),\dots,T(v_{n-r})$ は一次独立です。

もし

$$
\sum_j a_j T(v_j)=0
$$

なら

$$
T\left(\sum_j a_jv_j\right)=0.
$$

したがって

$$
\sum_j a_jv_j\in\ker T.
$$

一方、$u_i$ と $v_j$ を合わせたものは基底なので、$v_j$ の非自明な線形結合が $\ker T$ に入ることはありません。

よって全ての $a_j=0$ です。

したがって

$$
\dim\operatorname{Im}T=n-r.
$$

つまり

$$
\boxed{
\dim V
=
\dim\ker T
+
\dim\operatorname{Im}T
}
$$

です。

行列で書けば

$$
\boxed{
\text{列数}
=
\operatorname{nullity}(A)
+
\operatorname{rank}(A)
}
$$

です。

---

## 5. 演習

### F0-00F-A01 kernelとimage

- Level: A
- 目安時間: 10分

$T:\mathbb R^3\to\mathbb R^2$, $T(x,y,z)=(x+y,y+z)$ のkernelの次元を求めよ。

<!-- solution-start -->
#### 詳細解答
$x+y=0,y+z=0$ より $(x,y,z)=t(-1,1,-1)$。従ってkernelは1次元。
#### 本番答案
$\ker T=\operatorname{span}((-1,1,-1)^T)$、よって $\dim\ker T=1$。
#### 採点基準（20点）
- 方程式: 6点
- 一般解: 8点
- 次元: 6点
<!-- solution-end -->

### F0-00F-B01 rank-nullity

- Level: B
- 目安時間: 12分

上の $T$ についてrank-nullity theoremから $\dim\operatorname{Im}T$ を求め、実際に像が $\mathbb R^2$ であることを確認せよ。

<!-- solution-start -->
#### 詳細解答
定義域は3次元、nullityは1なのでrankは2。終域も2次元だから像は $\mathbb R^2$。実際 $T(a,0,b)=(a,b)$。
#### 本番答案
$3=1+\operatorname{rank}T$ よりrank 2。さらに任意の $(a,b)$ は $T(a,0,b)$ なので全射。
#### 採点基準（20点）
- rank-nullity適用: 8点
- rank: 4点
- 全射確認: 6点
- 結論: 2点
<!-- solution-end -->

---

## 6. 次に進む

**次：[F0-00F1 固有空間・スペクトル定理・PSD](../F0_00F1_固有空間_スペクトル定理_PSD/index.md)**
