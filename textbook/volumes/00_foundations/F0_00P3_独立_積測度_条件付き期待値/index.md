# F0-00P3 独立・積測度：同時分布が積になるとは何か

独立性を「相関が0」ではなく、sigma代数と同時分布の積構造として定義します。

$$\boxed{X\perp Y\quad\Longleftrightarrow\quad P_{(X,Y)}=P_X\otimes P_Y}$$

この式から積の期待値の因数分解までを一つの学習サイクルとして閉じます。条件付き期待値はP3Aへ分離します。

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

---

## 演習

### F0-00P3-A01 独立なら積の期待値が分解する

- Level: A
- 目安時間: 10分

独立な可積分確率変数 $X,Y$ について、積分可能性が保証されるとき $E[XY]=E[X]E[Y]$ を積測度から示せ。

<!-- solution-start -->
#### 詳細解答
独立性より $(X,Y)$ の同時分布は $P_X\otimes P_Y$。従ってTonelli/Fubiniにより $E[XY]=\iint xy\,dP_X(x)dP_Y(y)=(\int x\,dP_X)(\int y\,dP_Y)$。

#### 本番答案
$P_{(X,Y)}=P_X\otimes P_Y$ より、Fubiniを用いて $E[XY]=\iint xy\,dP_XdP_Y=E[X]E[Y]$。

#### 採点基準（20点）
- 同時分布の積表示: 7点
- Fubini: 7点
- 因数分解: 6点
<!-- solution-end -->

### F0-00P3-B01 pairwise independentとmutual independent

- Level: B
- 目安時間: 15分

$U,V$ を独立なBernoulli$(1/2)$、$W=U\oplus V$（排他的論理和）とする。$U,V,W$ がpairwise independentだがmutually independentでないことを示せ。

<!-- solution-start -->
#### 詳細解答
各変数はBernoulli$(1/2)$。例えば $P(U=1,W=1)=P(U=1,V=0)=1/4=P(U=1)P(W=1)$ で他の組も同様。一方 $W=U\oplus V$ なので三つの値には決定関係があり、例えば $P(U=0,V=0,W=0)=1/4\ne1/8$。

#### 本番答案
任意の2変数の同時確率は積に分解するが、$P(U=V=W=0)=1/4\ne(1/2)^3$。従ってpairwise independentだがmutualではない。

#### 採点基準（20点）
- 各周辺分布: 4点
- pairwise確認: 8点
- 3変数での反例: 6点
- 結論: 2点
<!-- solution-end -->

---

## 次に進む

独立性を積測度として理解したら [F0-00P3A 条件付き期待値](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md) へ進みます。
