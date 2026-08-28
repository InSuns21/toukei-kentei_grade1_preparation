# Standard 13 ノイズ付き線形観測の条件付き正規

- 旧No.: 36
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X\sim N_p(\mu,\Sigma)$ とし、$\Sigma$ は正定値とする。さらに
$\varepsilon\sim N(0,\tau^2)$ は $X$ と独立で、$a\in\mathbb{R}^p$ は $a\neq0$、$\tau^2>0$ とする。

$$
Y=a^TX+\varepsilon
$$

を観測する。

1. $(X,Y)$ が多変量正規分布に従うことを示し、その平均ベクトルと共分散行列を求めよ。
2. $c\in\mathbb{R}^p$ に対して
   $$
   R=X-\mu-c(Y-a^T\mu)
   $$
   とおく。$R$ と $Y$ が無相関となる $c$ を求め、そのとき $R\perp Y$ であることを示せ。
3. 第2問を用いて $X\mid Y=y$ の分布を求めよ。
4. $\tau^2\to0$ と $\tau^2\to\infty$ の極限を求め、その確率論的意味を説明せよ。

## 詳細解答

### 1. $(X,Y)$ の同時正規性・平均・共分散

$X$ と $\varepsilon$ は独立な正規変数なので、結合ベクトル

$$
\begin{pmatrix}
X\\
\varepsilon
\end{pmatrix}
$$

は多変量正規分布に従う。

しかも

$$
\begin{pmatrix}
X\\
Y
\end{pmatrix}
=
\begin{pmatrix}
I_p&0\\
a^T&1
\end{pmatrix}
\begin{pmatrix}
X\\
\varepsilon
\end{pmatrix}
$$

と書けるので、$(X,Y)$ は正規ベクトルの線形変換であり、やはり多変量正規分布に従う。

平均は

$$
E[Y]=E[a^TX+\varepsilon]=a^T\mu.
$$

次に、独立性から $\operatorname{Cov}(X,\varepsilon)=0$ なので

$$
\begin{aligned}
\operatorname{Cov}(X,Y)
&=\operatorname{Cov}(X,a^TX+\varepsilon)\\
&=\operatorname{Cov}(X,a^TX)\\
&=\Sigma a.
\end{aligned}
$$

また

$$
\begin{aligned}
\operatorname{Var}(Y)
&=\operatorname{Var}(a^TX+\varepsilon)\\
&=\operatorname{Var}(a^TX)+\operatorname{Var}(\varepsilon)\\
&=a^T\Sigma a+\tau^2.
\end{aligned}
$$

従って

$$
\boxed{
E\begin{pmatrix}X\\Y\end{pmatrix}
=
\begin{pmatrix}
\mu\\
a^T\mu
\end{pmatrix}
}
$$

で、共分散行列は

$$
\boxed{
\operatorname{Cov}\begin{pmatrix}X\\Y\end{pmatrix}
=
\begin{pmatrix}
\Sigma&\Sigma a\\
a^T\Sigma&a^T\Sigma a+\tau^2
\end{pmatrix}
}.
$$

ここで

$$
s:=a^T\Sigma a+\tau^2
$$

とおく。$\Sigma$ は正定値、$a\neq0$、$\tau^2>0$ なので $s>0$ である。

### 2. 残差化による条件付き分布の準備

条件付き正規分布の公式をいきなり使う代わりに、$Y$ で説明できる線形成分を $X$ から引いてみる。

$$
R=X-\mu-c(Y-a^T\mu)
$$

とおく。

$\mu$ と $a^T\mu$ は定数なので

$$
\begin{aligned}
\operatorname{Cov}(R,Y)
&=\operatorname{Cov}(X,Y)-c\operatorname{Var}(Y)\\
&=\Sigma a-cs.
\end{aligned}
$$

従って $R$ と $Y$ を無相関にするには

$$
\Sigma a-cs=0
$$

とすればよいから

$$
\boxed{
c=\frac{\Sigma a}{s}
=\frac{\Sigma a}{a^T\Sigma a+\tau^2}
}.
$$

この $c$ に対して

$$
R
=X-\mu-rac{\Sigma a}{s}(Y-a^T\mu).
$$

$(R,Y)$ は $(X,Y)$ の線形変換なので同時正規である。さらに上で

$$
\operatorname{Cov}(R,Y)=0
$$

としたので、正規分布では無相関と独立が同値であることから

$$
\boxed{R\perp Y}.
$$

ここが条件付き分布を求める核心である。

### 3. $X\mid Y=y$ の分布

第2問の定義を $X$ について解くと

$$
X
=\mu+rac{\Sigma a}{s}(Y-a^T\mu)+R.
$$

しかも $R\perp Y$ だから、$Y=y$ と条件付けても $R$ の分布は変わらない。

まず $E[R]=0$ なので

$$
\begin{aligned}
E[X\mid Y=y]
&=\mu+rac{\Sigma a}{s}(y-a^T\mu)\\
&=\boxed{
\mu+rac{\Sigma a}{a^T\Sigma a+\tau^2}(y-a^T\mu)
}.
\end{aligned}
$$

次に $R$ の共分散を求める。$c=\Sigma a/s$ とおけば

$$
R=(X-\mu)-c(Y-a^T\mu).
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(R)
&=\operatorname{Var}(X)
-c\operatorname{Cov}(Y,X)
-\operatorname{Cov}(X,Y)c^T
+c\operatorname{Var}(Y)c^T\\
&=\Sigma
-c(a^T\Sigma)
-(\Sigma a)c^T
+sc c^T.
\end{aligned}
$$

$c=\Sigma a/s$ を代入すると

$$
\begin{aligned}
\operatorname{Var}(R)
&=\Sigma
-\frac{\Sigma aa^T\Sigma}{s}
-\frac{\Sigma aa^T\Sigma}{s}
+\frac{\Sigma aa^T\Sigma}{s}\\
&=\boxed{
\Sigma-\frac{\Sigma aa^T\Sigma}{s}
}.
\end{aligned}
$$

よって

$$
\operatorname{Cov}(X\mid Y)
=\operatorname{Var}(R)
=\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}.
$$

$R$ は正規ベクトルなので、以上より

$$
\boxed{
X\mid Y=y
\sim N_p\left(
\mu+\frac{\Sigma a}{a^T\Sigma a+\tau^2}(y-a^T\mu),
\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}
\right)
}.
$$

#### 公式との対応

多変量正規分布

$$
\begin{pmatrix}U\\V\end{pmatrix}
\sim N\left(
\begin{pmatrix}\mu_U\\\mu_V\end{pmatrix},
\begin{pmatrix}
\Sigma_{UU}&\Sigma_{UV}\\
\Sigma_{VU}&\Sigma_{VV}
\end{pmatrix}
\right)
$$

に対する条件付き分布公式

$$
U\mid V=v
\sim N\left(
\mu_U+\Sigma_{UV}\Sigma_{VV}^{-1}(v-\mu_V),
\Sigma_{UU}-\Sigma_{UV}\Sigma_{VV}^{-1}\Sigma_{VU}
\right)
$$

に

$$
U=X,
\qquad
V=Y,
$$

$$
\Sigma_{UV}=\Sigma a,
\qquad
\Sigma_{VV}=a^T\Sigma a+\tau^2
$$

を代入しても同じ結果が得られる。

ただし、この問題では残差化から導出できることを押さえておく方が重要である。

### 4. 観測雑音の極限

#### (i) $\tau^2\to\infty$

まず

$$
\frac{\Sigma a}{a^T\Sigma a+\tau^2}\to0,
$$

かつ

$$
\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}\to0.
$$

従って

$$
E[X\mid Y=y]\to\mu,
\qquad
\operatorname{Cov}(X\mid Y)\to\Sigma.
$$

つまり

$$
\boxed{X\mid Y=y\ \Longrightarrow\ N_p(\mu,\Sigma)}.
$$

観測雑音が極端に大きいと、観測 $Y$ から $X$ についてほとんど情報を得られず、条件付き分布は事前の分布に戻る。

#### (ii) $\tau^2\to0$

一方、$\tau^2\to0$ では

$$
E[X\mid Y=y]
\to
m_0
:=
\mu+\frac{\Sigma a}{a^T\Sigma a}(y-a^T\mu),
$$

$$
\operatorname{Cov}(X\mid Y)
\to
V_0
:=
\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a}.
$$

この極限を単に「観測が正確になる」とだけ理解するのでは不十分である。

まず平均について

$$
\begin{aligned}
a^Tm_0
&=a^T\mu
+\frac{a^T\Sigma a}{a^T\Sigma a}(y-a^T\mu)\\
&=y.
\end{aligned}
$$

また共分散について

$$
\begin{aligned}
V_0a
&=\Sigma a
-\frac{\Sigma aa^T\Sigma a}{a^T\Sigma a}\\
&=\Sigma a-\Sigma a\\
&=0.
\end{aligned}
$$

従って

$$
\operatorname{Var}(a^TX\mid Y=y)
=a^TV_0a=0.
$$

つまり極限では

$$
\boxed{a^TX=y}
$$

が確率1で成り立つ。

したがって $\tau^2\to0$ の極限は、$p$ 次元空間全体に広がる通常の正規分布ではなく、

$$
\{x\in\mathbb{R}^p:a^Tx=y\}
$$

という $(p-1)$ 次元の超平面上に集中する退化正規分布である。

観測 $Y=a^TX+\varepsilon$ の雑音が消えると、$a^TX$ という1本の線形結合が完全に確定し、その方向の不確実性だけが消える、と解釈できる。

## 本番答案

$(X,\varepsilon)$ は独立な正規ベクトルであり、

$$
\begin{pmatrix}X\\Y\end{pmatrix}
=
\begin{pmatrix}I_p&0\\a^T&1\end{pmatrix}
\begin{pmatrix}X\\\varepsilon\end{pmatrix}
$$

より $(X,Y)$ も同時正規である。

$$
E[Y]=a^T\mu,
\quad
\operatorname{Cov}(X,Y)=\Sigma a,
\quad
\operatorname{Var}(Y)=s:=a^T\Sigma a+\tau^2.
$$

$$
R=X-\mu-c(Y-a^T\mu)
$$

とおくと

$$
\operatorname{Cov}(R,Y)=\Sigma a-cs.
$$

よって

$$
c=\frac{\Sigma a}{s}
$$

とすれば $\operatorname{Cov}(R,Y)=0$。$(R,Y)$ は同時正規なので $R\perp Y$。

従って

$$
X=\mu+\frac{\Sigma a}{s}(Y-a^T\mu)+R
$$

より

$$
\boxed{
E[X\mid Y=y]
=\mu+\frac{\Sigma a}{s}(y-a^T\mu)
}.
$$

また

$$
\boxed{
\operatorname{Cov}(X\mid Y)
=\Sigma-\frac{\Sigma aa^T\Sigma}{s}
}.
$$

したがって

$$
\boxed{
X\mid Y=y
\sim N_p\left(
\mu+\frac{\Sigma a}{s}(y-a^T\mu),
\Sigma-\frac{\Sigma aa^T\Sigma}{s}
\right)
}.
$$

$\tau^2\to\infty$ では条件付き分布は $N_p(\mu,\Sigma)$ に戻る。

$\tau^2\to0$ では

$$
m_0=\mu+\frac{\Sigma a}{a^T\Sigma a}(y-a^T\mu),
\qquad
V_0=\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a},
$$

となり、$a^Tm_0=y$、$V_0a=0$ だから、極限分布は超平面 $a^Tx=y$ 上の退化正規分布である。

## 採点基準

- $(X,Y)$ の同時正規性と平均・共分散の導出: 5点
- 残差 $R$ を作り $c=\Sigma a/(a^T\Sigma a+\tau^2)$ を導出: 5点
- 同時正規かつ無相関から $R\perp Y$ を示す: 2点
- 条件付き平均・共分散・分布の導出: 5点
- $\tau^2\to\infty$ の解釈: 1点
- $\tau^2\to0$ で $a^Tm_0=y$、$V_0a=0$ を示し、超平面上の退化正規分布と解釈: 2点
