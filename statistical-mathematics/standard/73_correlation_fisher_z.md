# Standard 23 標本相関係数の漸近分布と Fisher z 変換

- 旧No.: 73
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$(X_i,Y_i)$、$i=1,\ldots,n$ は独立同分布で、

$$
\begin{pmatrix}X_i\\Y_i\end{pmatrix}
\sim
N_2\left(
\begin{pmatrix}0\\0\end{pmatrix},
\begin{pmatrix}
1&\rho\\
\rho&1
\end{pmatrix}
\right),
\qquad |\rho|<1
$$

とする。

標本相関係数を

$$
r=
\frac{
\sum_{i=1}^n(X_i-\bar X)(Y_i-\bar Y)
}{
\sqrt{
\sum_{i=1}^n(X_i-\bar X)^2
\sum_{i=1}^n(Y_i-\bar Y)^2
}
}
$$

とする。

また

$$
A_n=\frac1n\sum_{i=1}^nX_i^2,
\qquad
B_n=\frac1n\sum_{i=1}^nY_i^2,
\qquad
C_n=\frac1n\sum_{i=1}^nX_iY_i
$$

とおき、

$$
\widetilde r=\frac{C_n}{\sqrt{A_nB_n}}
$$

とする。

1. 1標本について

   $$
   W_i=(X_i^2,Y_i^2,X_iY_i)^T
   $$

   とおく。$E[W_i]$ と $\operatorname{Cov}(W_i)$ を求めよ。

2. 多変量中心極限定理と Delta 法を用いて

   $$
   \sqrt n(\widetilde r-\rho)
   \xrightarrow{d}
   N\left(0,(1-\rho^2)^2\right)
   $$

   を示せ。さらに $r-\widetilde r=o_p(n^{-1/2})$ を示し、$r$ についても同じ漸近分布が成り立つことを示せ。

3. $r$ の漸近分散は $\rho$ に依存する。滑らかな単調増加関数 $g$ を用いて、

   $$
   \sqrt n\{g(r)-g(\rho)\}
   $$

   の漸近分散を $1$ にしたい。$g$ が満たす微分方程式を求め、それを解け。

4. 3で得られた変換が Fisher の $z$ 変換

   $$
   z(x)=\operatorname{atanh}(x)
   =\frac12\log\frac{1+x}{1-x}
   $$

   であることを確認し、

   $$
   \sqrt n\{z(r)-z(\rho)\}
   \xrightarrow{d}N(0,1)
   $$

   を導け。この結果から母相関係数 $\rho$ の近似信頼区間と、
   $H_0:\rho=\rho_0$ の近似検定統計量を作れ。

> **補足**  
> 実務では2変量正規標本について
> $\operatorname{Var}\{z(r)\}\approx1/(n-3)$
> という有限標本補正をよく用いる。ただし本問の主眼はこの公式の暗記ではなく、
> **Fisher z 変換が分散安定化変換として導かれる理由**にある。

---

## 詳細解答

この問題で最も重要なのは、Fisher の $z$ 変換を最初から既知の公式として使うことではない。

標本相関係数 $r$ は大標本でほぼ正規分布に従うが、その漸近分散は

$$
(1-\rho^2)^2
$$

であり、未知の母相関 $\rho$ に依存する。

そこで

$$
\text{標本相関係数の漸近分布}
\to
\text{Delta 法}
\to
\text{分散を一定にする変換を探す}
\to
\text{Fisher z 変換}
$$

という順で導く。

### 1. $(X^2,Y^2,XY)$ の平均と共分散行列

添字 $i$ を省略して $(X,Y)$ を1標本とする。

まず

$$
E[X^2]=E[Y^2]=1,
\qquad
E[XY]=\rho
$$

なので

$$
\boxed{
E[W]
=
\begin{pmatrix}
1\\1\\\rho
\end{pmatrix}
}.
$$

共分散行列を求めるには4次までのモーメントが必要である。

2変量標準正規分布は

$$
Y=\rho X+\sqrt{1-\rho^2}\,\varepsilon,
$$

ただし $X,\varepsilon\sim N(0,1)$ は独立、と表せる。

標準正規変数 $Z$ について

$$
E[Z^2]=1,
\qquad
E[Z^4]=3
$$

である。後者は例えばモーメント母関数

$$
M_Z(t)=e^{t^2/2}
$$

を4回微分して $t=0$ とおけば得られる。

#### $\operatorname{Var}(X^2)$ と $\operatorname{Var}(Y^2)$

$$
\operatorname{Var}(X^2)
=E[X^4]-E[X^2]^2
=3-1=2.
$$

同様に

$$
\operatorname{Var}(Y^2)=2.
$$

#### $E[X^2Y^2]$

表現式を使うと

$$
Y^2
=\rho^2X^2
+2\rho\sqrt{1-\rho^2}X\varepsilon
+(1-\rho^2)\varepsilon^2.
$$

したがって

$$
\begin{aligned}
E[X^2Y^2]
&=\rho^2E[X^4]
+2\rho\sqrt{1-\rho^2}E[X^3]E[\varepsilon]\\
&\quad +(1-\rho^2)E[X^2]E[\varepsilon^2]\\
&=3\rho^2+(1-\rho^2)\\
&=1+2\rho^2.
\end{aligned}
$$

よって

$$
\operatorname{Cov}(X^2,Y^2)
=E[X^2Y^2]-1
=2\rho^2.
$$

#### $\operatorname{Cov}(X^2,XY)$

$$
E[X^3Y]
=E\left[X^3\{\rho X+\sqrt{1-\rho^2}\varepsilon\}\right]
=\rho E[X^4]
=3\rho.
$$

したがって

$$
\operatorname{Cov}(X^2,XY)
=E[X^3Y]-E[X^2]E[XY]
=3\rho-\rho
=2\rho.
$$

対称性から

$$
\operatorname{Cov}(Y^2,XY)=2\rho.
$$

#### $\operatorname{Var}(XY)$

$$
\begin{aligned}
\operatorname{Var}(XY)
&=E[X^2Y^2]-E[XY]^2\\
&=(1+2\rho^2)-\rho^2\\
&=1+\rho^2.
\end{aligned}
$$

以上より

$$
\boxed{
\Omega
=\operatorname{Cov}(W)
=
\begin{pmatrix}
2&2\rho^2&2\rho\\
2\rho^2&2&2\rho\\
2\rho&2\rho&1+\rho^2
\end{pmatrix}
}.
$$

---

### 2. 標本相関係数の漸近分布

$(A_n,B_n,C_n)^T$ は $W_1,\ldots,W_n$ の標本平均だから、多変量中心極限定理より

$$
\sqrt n
\left\{
\begin{pmatrix}
A_n\\B_n\\C_n
\end{pmatrix}
-
\begin{pmatrix}
1\\1\\\rho
\end{pmatrix}
\right\}
\xrightarrow{d}
N_3(0,\Omega).
$$

ここで

$$
h(a,b,c)=\frac{c}{\sqrt{ab}}
$$

とおけば

$$
\widetilde r=h(A_n,B_n,C_n),
\qquad
h(1,1,\rho)=\rho.
$$

偏微分は

$$
\frac{\partial h}{\partial a}
=-\frac{c}{2a^{3/2}b^{1/2}},
\qquad
\frac{\partial h}{\partial b}
=-\frac{c}{2a^{1/2}b^{3/2}},
\qquad
\frac{\partial h}{\partial c}
=\frac1{\sqrt{ab}}.
$$

したがって $(1,1,\rho)$ で

$$
\boxed{
\nabla h(1,1,\rho)
=
\begin{pmatrix}
-\rho/2\\
-\rho/2\\
1
\end{pmatrix}
}.
$$

Delta 法より

$$
\sqrt n(\widetilde r-\rho)
\xrightarrow{d}
N\left(0,
\nabla h^T\Omega\nabla h
\right).
$$

ここで

$$
\begin{aligned}
\nabla h^T\Omega\nabla h
&=
\begin{pmatrix}-\rho/2&-\rho/2&1\end{pmatrix}
\Omega
\begin{pmatrix}-\rho/2\\-\rho/2\\1\end{pmatrix}\\
&=1-2\rho^2+\rho^4\\
&=(1-\rho^2)^2.
\end{aligned}
$$

従って

$$
\boxed{
\sqrt n(\widetilde r-\rho)
\xrightarrow{d}
N\left(0,(1-\rho^2)^2\right)
}.
$$

#### なぜ実際の標本相関係数 $r$ でも同じか

$r$ の分子・分母に現れる標本中心化2次モーメントは

$$
\frac1n\sum(X_i-\bar X)^2=A_n-\bar X^2,
$$

$$
\frac1n\sum(Y_i-\bar Y)^2=B_n-\bar Y^2,
$$

$$
\frac1n\sum(X_i-\bar X)(Y_i-\bar Y)
=C_n-\bar X\bar Y.
$$

中心極限定理から

$$
\bar X=O_p(n^{-1/2}),
\qquad
\bar Y=O_p(n^{-1/2}).
$$

従って

$$
\bar X^2=O_p(n^{-1}),
\qquad
\bar Y^2=O_p(n^{-1}),
\qquad
\bar X\bar Y=O_p(n^{-1}).
$$

$h(a,b,c)=c/\sqrt{ab}$ は $(1,1,\rho)$ の近傍で滑らかなので、この $O_p(n^{-1})$ の違いは相関係数にも同じ次数でしか影響しない。

したがって

$$
r-\widetilde r=O_p(n^{-1})=o_p(n^{-1/2}).
$$

よって Slutsky の定理から

$$
\boxed{
\sqrt n(r-\rho)
\xrightarrow{d}
N\left(0,(1-\rho^2)^2\right)
}.
$$

ここで初めて、Fisher 変換が必要になる理由が見える。

$r$ 自体の漸近分散は

$$
\frac{(1-\rho^2)^2}{n}
$$

であり、未知の $\rho$ に強く依存している。

---

### 3. 分散を一定にする変換を探す

滑らかな単調増加関数 $g$ を考える。

Delta 法をもう一度使うと

$$
\sqrt n\{g(r)-g(\rho)\}
\xrightarrow{d}
N\left(
0,
[g'(\rho)]^2(1-\rho^2)^2
\right).
$$

この漸近分散を $1$ にしたいので、単調増加を選ぶなら

$$
\boxed{
g'(\rho)=\frac1{1-\rho^2}
}.
$$

これを積分する。

$$
\frac1{1-\rho^2}
=\frac12\left(
\frac1{1+\rho}+\frac1{1-\rho}
\right)
$$

だから

$$
\begin{aligned}
g(\rho)
&=\int\frac{d\rho}{1-\rho^2}\\
&=\frac12\log(1+\rho)-\frac12\log(1-\rho)+C\\
&=\frac12\log\frac{1+\rho}{1-\rho}+C.
\end{aligned}
$$

定数 $C$ は差 $g(r)-g(\rho)$ では消えるので $C=0$ としてよい。

従って

$$
\boxed{
g(\rho)=\operatorname{atanh}(\rho)}.
$$

これが Fisher の $z$ 変換である。

つまり Fisher の $z$ 変換は、突然与えられる技巧ではなく、

> **標本相関係数の母相関依存の漸近分散を一定にする分散安定化変換**

として自然に導かれる。

---

### 4. Fisher z 変換から検定・信頼区間へ

$$
z(x)=\operatorname{atanh}(x)
$$

では

$$
z'(x)=\frac1{1-x^2}.
$$

したがって前節の結果より

$$
\boxed{
\sqrt n\{z(r)-z(\rho)\}
\xrightarrow{d}N(0,1)
}.
$$

すなわち大標本では

$$
z(r)
\approx
N\left(z(\rho),\frac1n\right).
$$

2変量正規標本では有限標本精度を改善する近似として

$$
\boxed{
z(r)\approx
N\left(z(\rho),\frac1{n-3}\right)}
$$

がよく使われる。

ただし $n-3$ は上の一次の漸近論から出てくるものではない。一次の Delta 法で得られるのは $1/n$ であり、$1/(n-3)$ はより高次の近似による補正である。

#### $H_0:\rho=\rho_0$ の検定

一次の漸近論なら

$$
\boxed{
Z_n=\sqrt n\{z(r)-z(\rho_0)\}
\approx N(0,1)
}
$$

を用いる。

有限標本補正版では

$$
\boxed{
Z_{n-3}=\sqrt{n-3}\{z(r)-z(\rho_0)\}
\approx N(0,1)
}.
$$

#### $\rho$ の近似信頼区間

まず $z(\rho)$ の尺度で

$$
z(r)\pm
\frac{z_{1-\alpha/2}}{\sqrt n}
$$

を作る。

有限標本補正を使うなら

$$
z(r)\pm
\frac{z_{1-\alpha/2}}{\sqrt{n-3}}.
$$

$z=\operatorname{atanh}$ の逆関数は $\tanh$ であり、単調増加なので、両端に $\tanh$ を作用させれば $\rho$ の近似信頼区間になる。

---

## この問題で押さえる流れ

$$
\boxed{
\begin{aligned}
&\text{2変量正規標本}\\
&\quad\Downarrow\\
&\sqrt n(r-\rho)
\Rightarrow N\left(0,(1-\rho^2)^2\right)\\
&\quad\Downarrow\quad\text{Delta 法}\\
&[g'(\rho)]^2(1-\rho^2)^2=1\\
&\quad\Downarrow\\
&g'(\rho)=\frac1{1-\rho^2}\\
&\quad\Downarrow\\
&g(\rho)=\operatorname{atanh}(\rho)\\
&\quad\Downarrow\\
&\sqrt n\{z(r)-z(\rho)\}\Rightarrow N(0,1).
\end{aligned}
}
$$

Fisher z 変換の本質は、**相関係数を正規化する公式**というより、**漸近分散を安定化する変換**にある。

---

## 本番答案

$W_i=(X_i^2,Y_i^2,X_iY_i)^T$ とおくと

$$
E[W_i]=(1,1,\rho)^T,
$$

$$
\operatorname{Cov}(W_i)
=
\begin{pmatrix}
2&2\rho^2&2\rho\\
2\rho^2&2&2\rho\\
2\rho&2\rho&1+\rho^2
\end{pmatrix}.
$$

$h(a,b,c)=c/\sqrt{ab}$ とすると

$$
\nabla h(1,1,\rho)=(-\rho/2,-\rho/2,1)^T.
$$

多変量中心極限定理と Delta 法より

$$
\sqrt n(r-\rho)
\Rightarrow
N\left(0,(1-\rho^2)^2\right).
$$

さらに $g(r)$ の漸近分散を1にするには

$$
[g'(\rho)]^2(1-\rho^2)^2=1
$$

より、単調増加解として

$$
g'(\rho)=\frac1{1-\rho^2}.
$$

従って

$$
g(\rho)
=\frac12\log\frac{1+\rho}{1-\rho}
=\operatorname{atanh}(\rho).
$$

よって

$$
\sqrt n\{z(r)-z(\rho)\}
\Rightarrow N(0,1).
$$

検定・信頼区間はこの正規近似を $z$ 尺度で用い、最後に $\tanh$ で $\rho$ 尺度へ戻す。

---

## 採点基準

- $(X^2,Y^2,XY)$ の必要な4次モーメントと共分散行列を導出: 5点
- 多変量中心極限定理・Delta 法から $r$ の漸近分散 $(1-\rho^2)^2$ を導出: 5点
- 分散安定化条件から $g'(\rho)=1/(1-\rho^2)$ を立て、Fisher z 変換を導出: 6点
- z尺度での検定・信頼区間、および $1/(n-3)$ が有限標本補正であることを説明: 4点
