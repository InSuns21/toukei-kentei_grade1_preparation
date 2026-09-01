# F0-00E2 Cauchy--Schwarz・Bessel不等式・Parseval等式

[F0-00E](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md) では、Gram--Schmidt直交化によって正規直交基底を作り、直交射影と最小二乗法を導きました。

この補講では、その議論で何度も使う内積の基本不等式を証明します。

$$
\boxed{
\text{Cauchy--Schwarz}
\to
\text{三角不等式}
\to
\text{Bessel}
\to
\text{Parseval}
}
$$

という流れです。

後のHilbert空間では同じ式がそのまま使われるので、有限次元で一度証明を済ませておきます。

---

## 1. Cauchy--Schwarz不等式

内積空間の任意の $x,y$ に対して

$$
\boxed{
|\langle x,y\rangle|
\le
\|x\|\,\|y\|
}
$$

が成り立ちます。

これが **Cauchy--Schwarz不等式** です。

等号は $x,y$ が一次従属のとき、つまり一方が他方の実数倍であるときに限って成立します。

---

## 2. 証明：ある方向を引いて残差平方を最小にする

$y=0$ なら自明なので、$y\ne0$ とします。

任意の $t\in\mathbb R$ に対して

$$
\|x-ty\|^2\ge0.
$$

展開すると

$$
\begin{aligned}
\|x-ty\|^2
&=\langle x-ty,x-ty\rangle\\
&=\|x\|^2-2t\langle x,y\rangle+t^2\|y\|^2.
\end{aligned}
$$

右辺は $t$ の二次関数です。

最小点は

$$
\boxed{
t^*=\frac{\langle x,y\rangle}{\|y\|^2}}
$$

なので、代入すると

$$
0
\le
\|x\|^2
-
\frac{\langle x,y\rangle^2}{\|y\|^2}.
$$

したがって

$$
\langle x,y\rangle^2
\le
\|x\|^2\|y\|^2.
$$

平方根を取って

$$
\boxed{
|\langle x,y\rangle|
\le
\|x\|\|y\|
}.
$$

この証明は実は

> $x$ から $y$ の張る1次元部分空間への射影を引いた残差は、負の長さを持てない

と言っているだけです。

F0-00Eの射影幾何と同じ構造です。

---

## 3. 数値例

$$
x=(1,2,2)^{\mathsf T},
\qquad
y=(2,-1,2)^{\mathsf T}
$$

とします。

$$
\langle x,y\rangle
=2-2+4=4.
$$

また

$$
\|x\|=3,
\qquad
\|y\|=3.
$$

したがって

$$
|\langle x,y\rangle|=4
\le9
=\|x\|\|y\|.
$$

一方 $y=2x$ なら

$$
|\langle x,2x\rangle|
=2\|x\|^2
=\|x\|\|2x\|
$$

となり等号です。

---

## 4. 内積から角度を定義できる理由

非零ベクトル $x,y$ に対して

$$
\frac{\langle x,y\rangle}{\|x\|\|y\|}
$$

を考えます。

Cauchy--Schwarzにより

$$
-1
\le
\frac{\langle x,y\rangle}{\|x\|\|y\|}
\le1.
$$

したがって

$$
\boxed{
\cos\theta
=
\frac{\langle x,y\rangle}{\|x\|\|y\|}
}
$$

と角度を定義できます。

つまりCauchy--Schwarzは「内積から角度を作ってよい」ことを保証しています。

---

## 5. 三角不等式を導く

内積から定まるノルムについて

$$
\boxed{
\|x+y\|
\le
\|x\|+\|y\|
}
$$

を示します。

平方すると

$$
\begin{aligned}
\|x+y\|^2
&=\|x\|^2+2\langle x,y\rangle+\|y\|^2\\
&\le
\|x\|^2+2\|x\|\|y\|+\|y\|^2\\
&=(\|x\|+\|y\|)^2.
\end{aligned}
$$

よって

$$
\boxed{
\|x+y\|
\le
\|x\|+\|y\|
}.
$$

したがって内積

$$
\langle\cdot,\cdot\rangle
$$

から

$$
\|x\|=\sqrt{\langle x,x\rangle}
$$

と作ったものは、本当にノルムの三角不等式を満たします。

---

## 6. 正規直交系への係数

$q_1,\dots,q_k$ を正規直交系とします。

$x$ の $q_i$ 方向の係数を

$$
\boxed{
c_i=\langle x,q_i\rangle}
$$

とします。

この係数は、有限次元では基底座標です。

Fourier解析やHilbert空間では、一般の正規直交系に対しても同じ形の係数を **Fourier係数** と呼びます。

---

## 7. 正規直交系への射影

$$
p
=
\sum_{i=1}^k
\langle x,q_i\rangle q_i
$$

と置きます。

各 $j$ について

$$
\begin{aligned}
\langle x-p,q_j\rangle
&=\langle x,q_j\rangle
-
\sum_i
\langle x,q_i\rangle
\langle q_i,q_j\rangle\\
&=\langle x,q_j\rangle
-
\langle x,q_j\rangle\\
&=0.
\end{aligned}
$$

したがって

$$
x-p
$$

は各 $q_j$ に直交します。

つまり $p$ は

$$
\operatorname{span}(q_1,\dots,q_k)
$$

への直交射影です。

---

## 8. Bessel不等式

$x=p+(x-p)$ で

$$
p\perp(x-p)
$$

なのでPythagorasより

$$
\|x\|^2
=
\|p\|^2+
\|x-p\|^2
\ge
\|p\|^2.
$$

正規直交性から

$$
\begin{aligned}
\|p\|^2
&=
\left\|
\sum_i\langle x,q_i\rangle q_i
\right\|^2\\
&=
\sum_i
|\langle x,q_i\rangle|^2.
\end{aligned}
$$

したがって

$$
\boxed{
\sum_{i=1}^k
|\langle x,q_i\rangle|^2
\le
\|x\|^2
}
$$

です。

これが **Bessel不等式** です。

係数平方和は、元のベクトルが持つ「エネルギー」を超えません。

---

## 9. 差は何を表しているか

上の証明から

$$
\boxed{
\|x\|^2
-
\sum_{i=1}^k|\langle x,q_i\rangle|^2
=
\|x-p\|^2
}
$$

です。

したがってBessel不等式の不足分は、

> 正規直交系が張る部分空間では表現できなかった残差のノルム平方

そのものです。

この見方はPCAや最小二乗でも非常に重要です。

---

## 10. Parseval等式

もし $q_1,\dots,q_n$ が $\mathbb R^n$ 全体の正規直交基底なら、残差はありません。

$$
x
=
\sum_{i=1}^n
\langle x,q_i\rangle q_i.
$$

したがって

$$
\boxed{
\|x\|^2
=
\sum_{i=1}^n
|\langle x,q_i\rangle|^2
}
$$

です。

これが有限次元の **Parseval等式** です。

正規直交基底への座標変換は、長さを保存します。

行列で $Q=(q_1,\dots,q_n)$ と書けば

$$
Q^{\mathsf T}Q=I
$$

なので

$$
\|Q^{\mathsf T}x\|^2
=x^{\mathsf T}QQ^{\mathsf T}x
=\|x\|^2
$$

と同じ事実を表しています。

---

## 11. 具体例

標準基底

$$
e_1=(1,0,0),\quad
e_2=(0,1,0),\quad
e_3=(0,0,1)
$$

と

$$
x=(2,-1,3)
$$

を考えます。

係数は

$$
\langle x,e_1\rangle=2,
\quad
\langle x,e_2\rangle=-1,
\quad
\langle x,e_3\rangle=3.
$$

Parsevalより

$$
\|x\|^2
=2^2+(-1)^2+3^2
=14.
$$

これは単なる座標計算ですが、一般の正規直交基底でも全く同じ式になります。

---

## 12. 無限次元では何が新しくなるか

有限次元では正規直交基底を有限本並べれば終わります。

無限次元Hilbert空間では、正規直交系

$$
q_1,q_2,\dots
$$

について

$$
\sum_{i=1}^{\infty}
|\langle x,q_i\rangle|^2
\le
\|x\|^2
$$

というBessel不等式が現れます。

しかし等号

$$
\|x\|^2
=
\sum_{i=1}^{\infty}
|\langle x,q_i\rangle|^2
$$

が成り立つには、その正規直交系が空間を十分に張っている、つまり **完全** である必要があります。

ここで「無限個の線形結合」は有限和ではなく極限を伴うため、完備性が本気で効いてきます。

この点を [F0-02C1](../F0_02C1_ノルム空間_Banach_Hilbert/index.md) 以降で扱います。

---

## 13. F0-00Fへの接続

次の [F0-00F](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md) では、

$$
\ell_a(x)=a^{\mathsf T}x
$$

という線形汎関数に対して

$$
|\ell_a(x)|
\le
\|a\|\|x\|
$$

を使います。

これはまさにCauchy--Schwarzです。

また実対称行列の正規直交固有基底やSVDでは、Bessel・Parsevalと同じ「正規直交座標へ移すと内積とノルムが簡単になる」という構造を使います。

---

## 章末チェック

- Cauchy--Schwarzを $\|x-ty\|^2\ge0$ から証明できる。
- 等号条件が一次従属であることを説明できる。
- Cauchy--Schwarzから三角不等式を導ける。
- 正規直交系への射影係数が $\langle x,q_i\rangle$ になることを示せる。
- Bessel不等式をPythagorasから導ける。
- Bessel不等式の不足分が射影残差平方であることを説明できる。
- 正規直交基底に対するParseval等式を説明できる。
- 無限次元では「完全性」が新たに必要になる理由を説明できる。
