# F0-00P3 独立・積測度・条件付き期待値：条件付き平均は何者？

この章では、通常教材で別々に見える

- 独立
- 同時分布
- 条件付き確率
- 条件付き期待値

を、測度と sigma代数の言葉で統一します。

---

## 1. 独立な事象

事象 $A,B$ が独立とは

$$
P(A\cap B)=P(A)P(B)
$$

です。

これは「同時に起きる確率が積に分解する」という条件です。

三つ以上の事象では、すべての有限部分集合について同様の積分解が必要です。

単に二つずつ独立なだけでは、全体として独立とは限りません。

---

## 2. 独立な sigma代数

sigma代数 $\mathcal G_1,\mathcal G_2$ が独立とは、任意の

$$
A\in\mathcal G_1,
\qquad B\in\mathcal G_2
$$

について

$$
P(A\cap B)=P(A)P(B)
$$

となることです。

確率変数 $X,Y$ の独立性は、それぞれが生成する sigma代数

$$
\sigma(X),\qquad\sigma(Y)
$$

の独立性として定義できます。

ここで

$$
\sigma(X)
=
\{X^{-1}(B):B\in\mathcal B(\mathbb R)\}
$$

です。

つまり、$X$ の値から判定できる全事象と、$Y$ の値から判定できる全事象が独立、という意味です。

---

## 3. 独立性と同時分布

$(X,Y)$ の同時分布を $P_{X,Y}$ とします。

$X,Y$ が独立なら、長方形集合 $A\times B$ について

$$
\begin{aligned}
P_{X,Y}(A\times B)
&=P(X\in A,Y\in B)\\
&=P_X(A)P_Y(B).
\end{aligned}
$$

この性質から

$$
\boxed{
P_{X,Y}=P_X\otimes P_Y
}
$$

が成り立ちます。

つまり独立とは、**同時分布が周辺分布の積測度へ因数分解すること**です。

---

## 4. 密度の積分解はこの特殊形

$X,Y$ が密度を持ち、独立なら

$$
\boxed{
f_{X,Y}(x,y)=f_X(x)f_Y(y)
}
$$

です。

これは独立性の定義そのものではなく、

$$
P_{X,Y}=P_X\otimes P_Y
$$

をLebesgue測度に対する密度で書いた特殊形です。

離散なら

$$
p_{X,Y}(x,y)=p_X(x)p_Y(y)
$$

になります。

---

## 5. 独立なら積の期待値が分解する

可積分な関数 $g,h$ に対して、独立性から

$$
E[g(X)h(Y)]
=
\int g(x)h(y)\,d(P_X\otimes P_Y)(x,y).
$$

Fubiniを使えば

$$
\boxed{
E[g(X)h(Y)]
=E[g(X)]E[h(Y)]
}
$$

です。

特に $X,Y\in L^2$ なら

$$
E[XY]=E[X]E[Y]
$$

なので

$$
\operatorname{Cov}(X,Y)=0.
$$

逆は一般に成り立ちません。

---

## 6. 条件付き期待値の最初の例：有限分割

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

## 7. 条件付き期待値の一般定義

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

## 8. なぜ存在するのか

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

## 9. 条件付き期待値はa.s.一意

条件を満たす $Y,Z$ が二つあったとしても、

$$
Y=Z\qquad\text{a.s.}
$$

です。

したがって条件付き期待値も一点ごとの値ではなく、a.s.同値類として一意です。

これは $L^p$ と同じ構造です。

---

## 10. 条件付き期待値の基本性質

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

## 11. 全期待値の法則はtower property

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

## 12. $E[X\mid Y]$ の意味

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

## 13. 独立なら条件付けしても平均は変わらない

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

## 14. $L^2$では直交射影になる

$X\in L^2$ の場合、$\mathcal G$-可測な $L^2$ 確率変数全体を

$$
L^2(\mathcal G)
$$

と書くと、これは $L^2(\mathcal F)$ の閉部分空間です。

このとき

$$
\boxed{
E[X\mid\mathcal G]
=P_{L^2(\mathcal G)}X
}
$$

となります。

つまり条件付き期待値は直交射影です。

任意の $Z\in L^2(\mathcal G)$ に対して

$$
E[(X-E[X\mid\mathcal G])Z]=0
$$

が成り立ちます。

回帰・最小二乗・Hilbert空間の射影と同じ幾何がここにも現れます。

---

## 15. 全体像

独立性は

$$
\boxed{
P_{X,Y}=P_X\otimes P_Y
}
$$

であり、条件付き期待値は

$$
\boxed{
\text{部分sigma代数に対して平均を保存する可測関数}
}
$$

です。

次章では、確率変数列の極限を「事象が無限回起こるか」という形で読み直し、Borel--Cantelliへ進みます。

---

## 章末チェック

- 確率変数の独立性をsigma代数の独立性として説明できる。
- 独立性を同時分布の積測度への因数分解として説明できる。
- 独立なら積の期待値が分解する理由をFubiniから説明できる。
- 条件付き期待値の二つの定義条件を説明できる。
- Radon--Nikodym定理が条件付き期待値の存在を保証する流れを説明できる。
- tower propertyを説明できる。
- $E[X\mid Y]$ が $E[X\mid\sigma(Y)]$ の略記であることを説明できる。
- $L^2$ では条件付き期待値が直交射影になることを説明できる。
