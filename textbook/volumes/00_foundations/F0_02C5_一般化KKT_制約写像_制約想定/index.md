# F0-02C5 関数解析V：一般化KKT・制約写像・制約想定

有限次元のKKT条件は、成分ごとに書くと

$$
g_i(x)\le0,
\qquad
h_j(x)=0,
$$

$$
\nabla f(x^*)
+\sum_i\lambda_i\nabla g_i(x^*)
+\sum_j\nu_j\nabla h_j(x^*)
=0.
$$

関数解析では、制約を一つの写像へまとめます。

するとKKTは

$$
\boxed{
Df(x^*)
+DG(x^*)^*\lambda
+DH(x^*)^*\nu
=0
}
$$

という形になります。

ただし、この式が局所最適点で自動的に成立するわけではありません。

この講義の主題はむしろ

> **なぜKKT条件を言う前に制約想定が必要なのか。**

です。

---

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

## 8. ところがKKTは局所最適だけでは保証されない

次の非常に単純な問題を考えます。

$$
\min_{x\in\mathbb R} f(x)=x
$$

subject to

$$
g(x)=x^2\le0.
$$

$x^2\le0$ を満たす実数は

$$
x=0
$$

だけです。

したがって $x^*=0$ は唯一の実行可能点であり、当然局所最適点です。

---

## 9. しかしKKT乗数は存在しない

stationarityは

$$
f'(0)+\lambda g'(0)=0
$$

です。

ところが

$$
f'(0)=1,
\qquad
g'(0)=0.
$$

したがって

$$
1+\lambda\cdot0=0
$$

となり、どんな $\lambda$ を選んでも不可能です。

$$
\boxed{
\text{局所最適点なのにKKT乗数が存在しない}
}
$$

という例になっています。

---

## 10. 何が壊れたのか：一次近似が制約を見失った

真の実行可能集合は

$$
C=\{0\}
$$

なので、$x=0$ から実際に動ける接方向は

$$
T_C(0)=\{0\}.
$$

一方、制約を一次近似すると

$$
g(0)+g'(0)d
=0+0\cdot d
\le0.
$$

これは **すべての $d\in\mathbb R$** で成り立ちます。

したがって線形化された実行可能方向は

$$
L_C(0)=\mathbb R.
$$

つまり

$$
\boxed{
T_C(0)=\{0\}
\quad\text{なのに}\quad
L_C(0)=\mathbb R
}
$$

です。

制約の勾配が0になったため、一次近似が本物の制約を完全に見失っています。

これが制約想定を必要とする根本理由です。

---

## 11. 制約想定の役割

制約想定は、ざっくり言えば

$$
\boxed{
\text{制約の一次近似が
真の実行可能集合の局所幾何を
十分正しく表す}
}
$$

ための正則性条件です。

その結果、normal coneを制約勾配・随伴・双対錐で表現でき、KKT乗数の存在へ進めます。

---

## 12. 等式制約だけの場合：全射性

まず

$$
H(x)=0
$$

だけを考えます。

微分は

$$
DH(x^*):X\to Z.
$$

重要な条件の一つが

$$
\boxed{DH(x^*)\text{ が全射}}
$$

であることです。

全射とは

$$
\forall z\in Z,
\ \exists d\in X
\quad\text{s.t.}\quad
DH(x^*)d=z
$$

となることです。

これは

> 一次近似の範囲で、制約値を任意の微小方向へ動かせる。

ことを意味します。

有限次元ではJacobian $J_H(x^*)$ が行フルランクであることに対応します。

---

## 13. 有限次元のLICQ

通常の制約

$$
g_i(x)\le0,
\qquad
h_j(x)=0
$$

を考えます。

$x^*$ でactiveな不等式制約を

$$
I(x^*)
=\{i:g_i(x^*)=0\}
$$

とします。

**LICQ** は

$$
\{\nabla g_i(x^*):i\in I(x^*)\}
\cup
\{\nabla h_j(x^*)\}
$$

が一次独立であることを要求します。

これは強い条件ですが、成立すればKKT乗数の存在だけでなく、一意性などにも有利です。

---

## 14. MFCQ

**MFCQ** はLICQより弱い代表的な条件です。

まず等式制約の勾配が十分なランクを持ち、その上である方向 $d$ が存在して

$$
\nabla h_j(x^*)^{\mathsf T}d=0
\qquad(\forall j),
$$

かつactiveな全不等式について

$$
\boxed{
\nabla g_i(x^*)^{\mathsf T}d<0
\qquad(\forall i\in I(x^*))
}
$$

となることを要求します。

意味は

> 等式制約を一次近似で保ちながら、activeな不等式制約を全部同時に厳密な内側へ動かせる方向がある。

というものです。

退化例 $g(x)=x^2$ では

$$
g'(0)=0
$$

なので

$$
g'(0)d<0
$$

を満たす $d$ は存在せず、MFCQは失敗します。

---

## 15. LICQとMFCQの関係

有限次元の滑らかな通常制約では、一般に

$$
\boxed{
\text{LICQ}
\Longrightarrow
\text{MFCQ}
}
$$

です。

逆は成り立ちません。

MFCQはactive勾配すべての一次独立性までは要求せず、「実行可能側へ押し込める方向」があればよいからです。

---

## 16. Robinson constraint qualification

無限次元や一般の錐制約では、LICQやMFCQを成分ごとに書くより、制約写像そのものを使う方が自然です。

不等式側だけの問題

$$
G(x)\in-K
$$

では、代表的なRobinson CQを

$$
\boxed{
0\in\operatorname{int}
\bigl(
G(x^*)+DG(x^*)X+K
\bigr)
}
$$

と書けます。

ここで

$$
DG(x^*)X
=\{DG(x^*)d:d\in X\}
$$

は、一次近似で動かせる制約値の全体です。

---

## 17. Robinson CQを日本語で読む

集合

$$
G(x^*)+DG(x^*)X+K
$$

は、

1. 現在の制約値 $G(x^*)$
2. 一次近似で動かせる量 $DG(x^*)d$
3. 許容錐側への余裕 $K$

を全部足したものです。

その内部に0が入るという条件は

> 線形化した制約写像と錐を組み合わせれば、制約空間の0の周囲を少し余裕をもって埋められる。

という意味です。

一次近似が必要な制約方向を十分に生成していることを表します。

---

## 18. 等式制約を含むRobinson型条件

等式と錐制約をまとめて

$$
\Phi(x)
=(H(x),G(x))
\in
\{0\}\times(-K)
$$

と見ます。

このとき対応するRobinson型条件は

$$
\boxed{
0\in\operatorname{int}
\left(
(H(x^*),G(x^*))
+D\Phi(x^*)X
+\bigl(\{0\}\times K\bigr)
\right)
}
$$

です。

ここで内部は積空間 $Z\times Y$ の位相で取ります。

等式側を微分 $DH(x^*)$ が十分に埋め、不等式側を $DG(x^*)$ と $K$ が十分に埋める、という一つの条件になっています。

---

## 19. 有限次元のMFCQとの接続

通常の滑らかな有限次元不等式・等式制約では、Robinson CQはMFCQと同じ役割を果たし、標準的な定式化の下では対応する条件として読み替えられます。

したがって概念の地図は

$$
\boxed{
\begin{array}{c}
\text{有限次元・成分表示}
\\
\text{LICQ / MFCQ}
\\[2mm]
\Downarrow\ \text{写像と錐で一般化}
\\[2mm]
\text{Robinson CQ}
\end{array}
}
$$

と見るとよいです。

---

## 20. 制約想定からKKTへ

局所最適点では、F0-02C4で見たように

$$
-Df(x^*)
\in N_C(x^*)
$$

という幾何学的条件があります。

制約想定が十分なら、このnormal coneを

$$
DG(x^*)^*\lambda
+DH(x^*)^*\nu
$$

という制約の微分の随伴で表せます。

その結果

$$
-Df(x^*)
=DG(x^*)^*\lambda
+DH(x^*)^*\nu
$$

すなわち

$$
\boxed{
Df(x^*)
+DG(x^*)^*\lambda
+DH(x^*)^*\nu
=0
}
$$

が得られます。

KKTの本体は「微分を0にする公式」ではなく、

$$
\boxed{
\text{最適点の法線}
\quad\text{を}\quad
\text{制約微分の随伴で表現する}
}
$$

ことです。

---

## 21. 次の講義

ここまでの議論では、「normal coneを双対空間の連続線形汎関数で表す」ことを使っています。

では、一般のBanach空間で

> 集合の外にある点と閉凸集合を、本当に連続線形汎関数で分離できるのか。

次の [F0-02C6 Hahn--Banach・分離定理](../F0_02C6_Hahn_Banach_分離定理/index.md) では、その背景にあるHahn--Banachの定理へ進みます。

---

## 章末チェック

- $g_i(x)\le0$ を $G(x)\in-K$ と書き直せる。
- 乗数 $\lambda,\nu$ がどの双対空間に属するか説明できる。
- 一般化KKTから通常の有限次元KKTを復元できる。
- $\min x$ subject to $x^2\le0$ でKKTが失敗する理由を説明できる。
- 真のtangent coneと線形化coneのずれを説明できる。
- LICQとMFCQの違いを説明できる。
- Robinson CQの内部条件を日本語で説明できる。
