# F0-00P3A 条件付き期待値：部分sigma代数上のRadon–Nikodym構成

条件付き期待値は「条件を固定した平均」という公式ではなく、得られた情報 $\mathcal G$ に対して

$$\boxed{\int_G E[X\mid\mathcal G]\,dP=\int_GX\,dP\qquad(\forall G\in\mathcal G)}$$

を満たす $\mathcal G$-可測確率変数です。存在はRadon--Nikodym定理、一意性はa.e.一意性から出ます。

---

## 1. 条件付き期待値の最初の例：有限分割

標本空間を事象

$$
A_1,\dots,A_m
$$

で分割し、それぞれ $P(A_j)>0$ とします。

「どの $A_j$ が起きたか」だけ分かる情報を

$$
\mathcal G=\sigma(A_1,\dots,A_m)
$$

とします。

可積分な $X$ に対して

$$
Y(\omega)
=E[X\mid A_j]
\qquad(\omega\in A_j)
$$

と置きます。

すると $Y$ は各 $A_j$ 上で一定です。

つまり、得られた情報 $\mathcal G$ だけを使って作れる確率変数になっています。

これが条件付き期待値の原型です。

---

## 2. 条件付き期待値の一般定義

$X\in L^1(P)$、$\mathcal G\subset\mathcal F$ を部分 sigma代数とします。

条件付き期待値

$$
E[X\mid\mathcal G]
$$

とは、次の二条件を満たす確率変数 $Y$ です。

1. $Y$ は $\mathcal G$-可測。
2. 任意の $A\in\mathcal G$ に対して

$$
\boxed{
\int_A Y\,dP
=
\int_A X\,dP
}
$$

が成り立つ。

この二条件が本質です。

第一条件は

> $Y$ は今持っている情報 $\mathcal G$ だけから決まる

ことを意味します。

第二条件は

> $\mathcal G$ で区別できるどの事象の上でも、平均量を保存する

ことを意味します。

---

## 3. なぜ存在するのか

符号付き測度

$$
\nu(A)=\int_A X\,dP,
\qquad A\in\mathcal G
$$

を考えます。

$P(A)=0$ なら $\nu(A)=0$ なので

$$
\nu\ll P|_{\mathcal G}
$$

です。

Radon--Nikodym定理から、ある $\mathcal G$-可測関数 $Y$ が存在して

$$
\nu(A)=\int_A Y\,dP
$$

と書けます。

この $Y$ が

$$
\boxed{E[X\mid\mathcal G]}
$$

です。

つまり条件付き期待値の存在はRadon--Nikodym定理で保証されます。

---

## 4. 条件付き期待値はa.s.一意

条件を満たす $Y,Z$ が二つあったとしても、

$$
Y=Z\qquad\text{a.s.}
$$

です。

したがって条件付き期待値も一点ごとの値ではなく、a.s.同値類として一意です。

これは $L^p$ と同じ構造です。

---

## 5. 条件付き期待値の基本性質

可積分な $X,Y$ と定数 $a,b$ に対して

$$
E[aX+bY\mid\mathcal G]
=aE[X\mid\mathcal G]+bE[Y\mid\mathcal G].
$$

$X\ge0$ なら

$$
E[X\mid\mathcal G]\ge0
\qquad\text{a.s.}
$$

です。

さらに $Z$ が $\mathcal G$-可測で積が可積分なら

$$
\boxed{
E[ZX\mid\mathcal G]
=Z E[X\mid\mathcal G]
}
$$

です。

「既に分かっている量は条件付き期待値の外へ出せる」と読めます。

---

## 6. 全期待値の法則はtower property

自明な sigma代数

$$
\{\varnothing,\Omega\}
$$

への条件付き期待値は定数 $E[X]$ です。

したがって

$$
\boxed{
E[E[X\mid\mathcal G]]
=E[X]
}
$$

です。

さらに

$$
\mathcal H\subset\mathcal G\subset\mathcal F
$$

なら

$$
\boxed{
E[E[X\mid\mathcal G]\mid\mathcal H]
=E[X\mid\mathcal H]
}
$$

です。

これがtower propertyです。

通常教材の「全期待値の法則」はこの特殊形です。

---

## 7. $E[X\mid Y]$ の意味

記号

$$
E[X\mid Y]
$$

は

$$
\boxed{
E[X\mid\sigma(Y)]
}
$$

の略記です。

つまり「$Y$ の値から得られる情報だけを使った $X$ の条件付き平均」です。

Doob--Dynkin補題により、これはある可測関数 $m$ を用いて

$$
E[X\mid Y]=m(Y)
$$

と書けます。

この $m(y)$ を通常

$$
E[X\mid Y=y]
$$

と書きます。

ただし連続分布では $P(Y=y)=0$ なので、単純な

$$
\frac{E[X1_{\{Y=y\}}]}{P(Y=y)}
$$

では定義できません。

ここが「条件付き期待値をsigma代数で定義する」理由です。

---

## 8. 独立なら条件付けしても平均は変わらない

$X$ が $\mathcal G$ と独立で $X\in L^1$ なら

$$
\boxed{
E[X\mid\mathcal G]=E[X]
\qquad\text{a.s.}
}
$$

です。

情報 $\mathcal G$ を知っても $X$ について新しい情報が得られない、という直感そのものです。

---

## 演習

### F0-00P3A-A01 有限分割への条件付き期待値

- Level: A
- 目安時間: 12分

$\mathcal G=\sigma(A)$、$0<P(A)<1$ とする。$X\in L^1$ に対する $E[X\mid\mathcal G]$ を $A,A^c$ 上の定数として書け。

<!-- solution-start -->
#### 詳細解答
$\mathcal G$-可測なので $c_1\mathbf1_A+c_0\mathbf1_{A^c}$ の形。積分一致から $c_1P(A)=E[X\mathbf1_A]$, $c_0P(A^c)=E[X\mathbf1_{A^c}]$。

#### 本番答案
$E[X\mid\mathcal G]=\frac{E[X\mathbf1_A]}{P(A)}\mathbf1_A+\frac{E[X\mathbf1_{A^c}]}{P(A^c)}\mathbf1_{A^c}$。

#### 採点基準（20点）
- G可測形: 6点
- 積分一致: 8点
- 結論: 6点
<!-- solution-end -->

### F0-00P3A-B01 tower propertyを定義から示す

- Level: B
- 目安時間: 15分

$\mathcal H\subseteq\mathcal G$ とする。$E[E[X\mid\mathcal G]\mid\mathcal H]=E[X\mid\mathcal H]$ を条件付き期待値の定義から説明せよ。

<!-- solution-start -->
#### 詳細解答
左辺はH可測。任意の $H\in\mathcal H\subseteq\mathcal G$ について、条件付き期待値の積分一致を二回使えば $\int_H E[E[X|G]|H]dP=\int_H E[X|G]dP=\int_HXdP$。一意性から結論。

#### 本番答案
H可測性と、全 $H\in\mathcal H$ で積分が $\int_HX\,dP$ に一致することを示し、一意性を用いる。

#### 採点基準（20点）
- 可測性: 4点
- 1回目の積分一致: 5点
- 2回目: 5点
- 一意性: 6点
<!-- solution-end -->

---

## 次に進む

二乗可積分な場合の幾何を見るなら [F0-00P3B L2射影・最良予測](../F0_00P3B_L2射影_最良予測/index.md) へ進みます。
