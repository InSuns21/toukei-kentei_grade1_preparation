# 10. 行列微分の最小公式集

行列微分は公式だけ並べると暗記科目に見えますが、統計検定1級で必要な範囲は **成分表示へ戻れば再現できる** ものが中心です。

## 10.1 線形形式はそのまま係数が勾配になる

列ベクトル $\boldsymbol x$ を変数とすると

$$
\boldsymbol a^{\mathsf T}\boldsymbol x
=\sum_i a_i x_i
$$

なので、各成分で微分して

$$
\boxed{
\operatorname{grad}_{\boldsymbol x}
(\boldsymbol a^{\mathsf T}\boldsymbol x)
=\boldsymbol a
}
$$

です。

## 10.2 二次形式は成分に戻せば導ける

$$
q(\boldsymbol x)=\boldsymbol x^{\mathsf T}A\boldsymbol x
=\sum_i\sum_j a_{ij}x_i x_j
$$

とします。$x_k$ で偏微分すると、$x_k$ が左側に出る項と右側に出る項の両方があるので

$$
\frac{\partial q}{\partial x_k}
=\sum_j a_{kj}x_j+\sum_i a_{ik}x_i.
$$

これは

$$
\boxed{
\operatorname{grad}_{\boldsymbol x}
(\boldsymbol x^{\mathsf T}A\boldsymbol x)
=(A+A^{\mathsf T})\boldsymbol x
}
$$

です。

特に $A$ が対称なら

$$
\boxed{
\operatorname{grad}_{\boldsymbol x}
(\boldsymbol x^{\mathsf T}A\boldsymbol x)
=2A\boldsymbol x
}
$$

となります。

例えば

$$
A=\begin{pmatrix}2&1\\1&3\end{pmatrix},
\qquad
\boldsymbol x=\begin{pmatrix}x\\y\end{pmatrix}
$$

なら

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
=2x^2+2xy+3y^2
$$

なので

$$
\operatorname{grad}q
=\begin{pmatrix}4x+2y\\2x+6y\end{pmatrix}
=2A\boldsymbol x.
$$

公式を忘れても、この展開から戻れます。

## 10.3 最小二乗は展開してから微分する

$$
S(\boldsymbol x)=\|\boldsymbol y-A\boldsymbol x\|^2
$$

を考えます。まず

$$
\begin{aligned}
S(\boldsymbol x)
&=(\boldsymbol y-A\boldsymbol x)^{\mathsf T}
(\boldsymbol y-A\boldsymbol x)\\
&=\boldsymbol y^{\mathsf T}\boldsymbol y
-2\boldsymbol x^{\mathsf T}A^{\mathsf T}\boldsymbol y
+\boldsymbol x^{\mathsf T}A^{\mathsf T}A\boldsymbol x.
\end{aligned}
$$

$A^{\mathsf T}A$ は対称なので

$$
\boxed{
\operatorname{grad}_{\boldsymbol x}S
=-2A^{\mathsf T}\boldsymbol y
+2A^{\mathsf T}A\boldsymbol x
}
$$

です。

停留条件は

$$
A^{\mathsf T}A\boldsymbol x=A^{\mathsf T}\boldsymbol y.
$$

これは最小二乗法の正規方程式そのものです。後ろの計算基礎体力ドリルでは具体的な数値行列で解きます。

## 10.4 次元を先に確認する

行列微分では、式の形を次元で検算できます。例えば

$$
A\in\mathbb R^{n\times p},
\qquad
\boldsymbol x\in\mathbb R^p,
\qquad
\boldsymbol y\in\mathbb R^n
$$

なら

$$
A^{\mathsf T}\boldsymbol y\in\mathbb R^p,
\qquad
A^{\mathsf T}A\boldsymbol x\in\mathbb R^p.
$$

したがって勾配も $p$ 次元ベクトルになります。転置を落としたときは、次元不一致でかなりの割合を検出できます。

## 10.5 $\log\det$ の微分は発展公式として参照する

可逆な行列 $A(\theta)$ がスカラー母数 $\theta$ に依存するとき

$$
\boxed{
\frac{d}{d\theta}\log\det A(\theta)
=\operatorname{tr}\left(A(\theta)^{-1}A'(\theta)\right)
}
$$

です。

これは多変量正規分布の尤度などで便利ですが、この速習では導出を暗記対象にはしません。**二次形式と最小二乗の微分は手で再現する、$\log\det$ は必要時に参照する**という優先度で十分です。

---
