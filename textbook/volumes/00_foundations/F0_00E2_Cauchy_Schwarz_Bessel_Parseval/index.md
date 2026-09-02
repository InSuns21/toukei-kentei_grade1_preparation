# F0-00E2 Cauchy--Schwarz・三角不等式・Bessel・Parseval

[F0-00E1](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md) では、内積から正規直交基底・Gram--Schmidt・射影・QRまでを構成しました。

この講義では、その幾何を支える基本不等式と正規直交展開を証明します。

```text
Cauchy--Schwarz
      ↓
三角不等式
      ↓
直交射影
      ↓
Bessel不等式
      ↓
Parseval等式
```

後のHilbert空間でもほぼ同じ式を使うため、有限次元で一度証明を閉じます。

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

## 2. 証明：残差のノルム平方は負にならない

$y=0$ なら自明なので $y\ne0$ とします。

任意の $t\in\mathbb R$ に対して

$$
\|x-ty\|^2\ge0.
$$

展開すると

$$
\|x-ty\|^2
=
\|x\|^2
-2t\langle x,y\rangle
+t^2\|y\|^2.
$$

右辺を $t$ の二次式として最小化すると

$$
t_*
=
\frac{\langle x,y\rangle}{\|y\|^2}.
$$

この値を代入して

$$
0
\le
\|x\|^2
-
\frac{|\langle x,y\rangle|^2}{\|y\|^2}.
$$

したがって

$$
|\langle x,y\rangle|^2
\le
\|x\|^2\|y\|^2.
$$

平方根を取れば

$$
\boxed{
|\langle x,y\rangle|
\le
\|x\|\|y\|
}
$$

です。

---

## 3. 等号条件

上の証明で等号が成り立つのは

$$
\|x-t_*y\|=0
$$

のときです。

ノルムの正定値性から

$$
x=t_*y.
$$

したがって $x,y$ は一次従属です。

逆に $x=cy$ なら

$$
|\langle x,y\rangle|
=|c|\|y\|^2
=
\|x\|\|y\|
$$

なので等号が成り立ちます。

---

## 4. Cauchy--Schwarzから三角不等式を導く

$$
\begin{aligned}
\|x+y\|^2
&=
\langle x+y,x+y\rangle\\
&=
\|x\|^2
+2\langle x,y\rangle
+\|y\|^2\\
&\le
\|x\|^2
+2|\langle x,y\rangle|
+\|y\|^2\\
&\le
\|x\|^2
+2\|x\|\|y\|
+\|y\|^2\\
&=
(\|x\|+\|y\|)^2.
\end{aligned}
$$

したがって

$$
\boxed{
\|x+y\|
\le
\|x\|+\|y\|
}
$$

です。

つまり内積から作ったノルムが本当にノルムの三角不等式を満たすことは、Cauchy--Schwarzから従います。

---

## 5. 逆三角不等式

三角不等式から

$$
x=(x-y)+y
$$

と書けば

$$
\|x\|
\le
\|x-y\|+\|y\|.
$$

したがって

$$
\|x\|-\|y\|
\le
\|x-y\|.
$$

$x,y$ を入れ替えると

$$
\|y\|-\|x\|
\le
\|x-y\|.
$$

よって

$$
\boxed{
|\|x\|-\|y\||
\le
\|x-y\|
}
$$

です。

この式によりノルム関数

$$
x\mapsto\|x\|
$$

は1-Lipschitz連続です。

---

## 6. 正規直交系への射影係数

$q_1,\dots,q_k$ を正規直交系とします。

$$
p
=
\sum_{i=1}^k c_iq_i
$$

が $x$ の $\operatorname{span}(q_1,\dots,q_k)$ への直交射影なら

$$
x-p
\perp
q_j
$$

なので

$$
0
=
\langle x-p,q_j\rangle
=
\langle x,q_j\rangle-c_j.
$$

従って

$$
\boxed{
c_j=\langle x,q_j\rangle}
$$

です。

したがって射影は

$$
\boxed{
p
=
\sum_{i=1}^k
\langle x,q_i\rangle q_i
}
$$

となります。

---

## 7. Bessel不等式

$x$ を

$$
x=p+r,
$$

$$
p
=
\sum_{i=1}^k
\langle x,q_i\rangle q_i,
$$

$$
r=x-p
$$

と分解します。

$r$ は $p$ が属する部分空間に直交するので

$$
p\perp r.
$$

Pythagorasより

$$
\|x\|^2
=
\|p\|^2+
\|r\|^2
\ge
\|p\|^2.
$$

正規直交性から

$$
\|p\|^2
=
\sum_{i=1}^k
|\langle x,q_i\rangle|^2.
$$

よって

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

---

## 8. Bessel不等式の不足分は何か

上の証明から

$$
\boxed{
\|x\|^2
-
\sum_{i=1}^k
|\langle x,q_i\rangle|^2
=
\left\|
x-
\sum_{i=1}^k
\langle x,q_i\rangle q_i
\right\|^2
}
$$

です。

つまり不足分は、正規直交系が張る部分空間で表現できなかった **射影残差のノルム平方** です。

この形は回帰・主成分分析・Fourier展開でもそのまま現れます。

---

## 9. Parseval等式

$q_1,\dots,q_n$ が有限次元内積空間 $V$ の正規直交基底なら、任意の $x\in V$ は

$$
x
=
\sum_{i=1}^n
\langle x,q_i\rangle q_i
$$

と完全に展開できます。

残差が0なのでBessel不等式は等号になり

$$
\boxed{
\|x\|^2
=
\sum_{i=1}^n
|\langle x,q_i\rangle|^2
}
$$

となります。

これが有限次元の **Parseval等式** です。

---

## 10. 行列で見るParseval

正規直交基底を列に並べて

$$
Q
=
\begin{pmatrix}
q_1&\cdots&q_n
\end{pmatrix}
$$

とします。

正規直交性は

$$
Q^{\mathsf T}Q=I
$$

です。

正方行列なので

$$
QQ^{\mathsf T}=I
$$

も成り立ちます。

座標は

$$
Q^{\mathsf T}x
$$

で、そのノルムは

$$
\|Q^{\mathsf T}x\|^2
=x^{\mathsf T}QQ^{\mathsf T}x
=\|x\|^2.
$$

つまり正規直交基底への座標変換は長さを保存します。

---

## 11. 無限次元で何が変わるか

有限次元では、基底を有限本並べれば終わります。

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

しかし

$$
\|x\|^2
=
\sum_{i=1}^{\infty}
|\langle x,q_i\rangle|^2
$$

となるには、その正規直交系が空間を十分に張っている必要があります。

無限個の「線形結合」は有限和ではなく極限を伴うため、ここで完備性が本気で効いてきます。

この有限次元と無限次元の差を、後のBanach/Hilbert空間で整理します。

---

## 12. 演習

### F0-00E2-A01 Cauchy--Schwarz

- Level: A
- 目安時間: 8分

$x=(1,2)^T$, $y=(2,-1)^T$ についてCauchy--Schwarz不等式を数値で確認せよ。

<!-- solution-start -->
#### 詳細解答
$\langle x,y\rangle=0$、$\|x\|=\|y\|=\sqrt5$ なので
$$
|\langle x,y\rangle|=0\le5=\|x\|\|y\|.
$$
#### 本番答案
$|\langle x,y\rangle|=0\le\sqrt5\sqrt5=5$。
#### 採点基準（20点）
- 内積: 6点
- 各ノルム: 8点
- 比較: 6点
<!-- solution-end -->

### F0-00E2-B01 Besselの不足分

- Level: B
- 目安時間: 12分

正規直交系 $q_1,\dots,q_k$ と

$$
p
=
\sum_i\langle x,q_i\rangle q_i
$$

に対し

$$
\|x\|^2
-
\sum_i|\langle x,q_i\rangle|^2
=
\|x-p\|^2
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
$p\perp(x-p)$ なので
$$
\|x\|^2=\|p\|^2+\|x-p\|^2.
$$
正規直交性より
$$
\|p\|^2=\sum_i|\langle x,q_i\rangle|^2.
$$
両式を合わせればよい。
#### 本番答案
Pythagorasと正規直交性を組み合わせれば直ちに従う。
#### 採点基準（20点）
- 直交性: 6点
- Pythagoras: 6点
- $\|p\|^2$ の計算: 6点
- 結論: 2点
<!-- solution-end -->

---

## 13. 次に進む

ここまでで正規直交座標の理論が揃いました。

次は F0-00F で準備した一般の固有空間・対角化と、ここで準備した内積・直交性を合流させます。

実対称行列について

> なぜ必ず正規直交固有基底を選べるのか

をスペクトル定理として証明します。

**次：[F0-00F1 固有空間・実対称行列・スペクトル定理・PSD](../F0_00F1_固有空間_スペクトル定理_PSD/index.md)**
