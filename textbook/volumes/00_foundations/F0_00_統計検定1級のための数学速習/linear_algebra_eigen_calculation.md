# 9.6 固有値・固有ベクトル

$\boldsymbol v\ne\boldsymbol0$ が

$$
A\boldsymbol v=\lambda\boldsymbol v
$$

を満たすとき、$\lambda$ を固有値、$\boldsymbol v$ を対応する固有ベクトルといいます。

定義だけ読んでも手計算を始めにくいので、実際には

> **特性方程式 → 固有値 → 連立方程式 → 固有ベクトル**

の順に固定して処理します。

## 1. まず特性方程式を作る

$$
A\boldsymbol v=\lambda\boldsymbol v
$$

は

$$
(A-\lambda I)\boldsymbol v=\boldsymbol0
$$

と書けます。$\boldsymbol v\ne\boldsymbol0$ という解を持つには $A-\lambda I$ が特異である必要があるので

$$
\boxed{\det(A-\lambda I)=0}
$$

を解けば固有値が求まります。

$2\times2$ 行列

$$
A=\begin{pmatrix}a&b\\c&d\end{pmatrix}
$$

なら

$$
\begin{aligned}
\det(\lambda I-A)
&=(\lambda-a)(\lambda-d)-bc\\
&=\lambda^2-(a+d)\lambda+(ad-bc),
\end{aligned}
$$

すなわち

$$
\boxed{
\det(\lambda I-A)
=\lambda^2-\operatorname{tr}(A)\lambda+\det A
}
$$

です。$\det(A-\lambda I)=0$ を使っても根は同じです。

2次では

$$
\lambda_1+\lambda_2=\operatorname{tr}(A),
\qquad
\lambda_1\lambda_2=\det A
$$

が検算になります。

例えば

$$
A=\begin{pmatrix}4&2\\1&3\end{pmatrix}
$$

なら

$$
\det(\lambda I-A)
=\lambda^2-7\lambda+10
=(\lambda-5)(\lambda-2),
$$

よって

$$
\boxed{\lambda=5,\ 2}
$$

です。

## 2. 固有値を1つずつ代入して固有ベクトルを求める

固有値 $\lambda$ が求まったら

$$
(A-\lambda I)\boldsymbol v=\boldsymbol0
$$

を解きます。

先ほどの行列で $\lambda=5$ なら

$$
A-5I
=\begin{pmatrix}-1&2\\1&-2\end{pmatrix}.
$$

したがって

$$
-v_1+2v_2=0.
$$

例えば $v_2=1$ と置けば

$$
\boxed{
\boldsymbol v_1=\begin{pmatrix}2\\1\end{pmatrix}}
$$

を取れます。

$\lambda=2$ では

$$
A-2I
=\begin{pmatrix}2&2\\1&1\end{pmatrix}
$$

なので $v_1+v_2=0$。例えば

$$
\boxed{
\boldsymbol v_2=\begin{pmatrix}1\\-1\end{pmatrix}}
$$

を取れます。

固有ベクトルは0でない定数倍をしても同じ固有方向を表します。試験では、分数を避けて整数成分の簡単なものを選べば十分です。

## 3. 対角化は固有ベクトルを列に並べる

$p\times p$ 行列 $A$ が一次独立な固有ベクトルを $p$ 本持つとき

$$
P=(\boldsymbol v_1,\ldots,\boldsymbol v_p),
\qquad
D=\operatorname{diag}(\lambda_1,\ldots,\lambda_p)
$$

と置けば

$$
AP=PD
$$

なので

$$
\boxed{A=PDP^{-1}}
$$

です。

特に固有値がすべて異なれば、対応する固有ベクトルは一次独立なので対角化できます。一方、**固有値が重複しただけでは対角化できるとは限りません**。必要なのは一次独立な固有ベクトルが次元の数だけ得られることです。

対角化できれば整数 $k\ge0$ に対して

$$
\boxed{A^k=PD^kP^{-1}}
$$

となり、高いべきの計算が対角成分のべきへ帰着します。

## 4. 実対称行列では次節の直交対角化へつながる

$A$ が実対称なら、互いに直交する単位固有ベクトルを選んで

$$
Q^{\mathsf T}Q=I,
\qquad
A=Q\Lambda Q^{\mathsf T}
$$

とできます。

一般の対角化では $P^{-1}$ を計算しますが、実対称行列では

$$
Q^{-1}=Q^{\mathsf T}
$$

になる、という違いを押さえて次の直交対角化へ進みます。
