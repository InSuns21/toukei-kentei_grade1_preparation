# 予想9 条件付き正規分布の公式を導出する

この問題は、統計検定1級の多変量正規分布・条件付き分布の範囲について、条件付き正規分布の公式を暗記ではなく自力で再構成できることを目標とする独自予想問題である。

- 安定ID: `PRED-MVN-09-COND-NORMAL-DERIVATION`
- Level: C〜D
- 目安時間: 30分
- 計算量: 多
- 主題: 多変量正規分布、条件付き分布、Schur補、残差化、独立性
- 使用技術: アフィン変換、共分散計算、無相関と独立、平方完成
- 公式過去問の復元ではない。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

---

## 問題

確率ベクトル

$$
\begin{pmatrix}
\boldsymbol X_1\\
\boldsymbol X_2
\end{pmatrix}
\sim
N_{p+q}\left(
\begin{pmatrix}
\boldsymbol\mu_1\\
\boldsymbol\mu_2
\end{pmatrix},
\begin{pmatrix}
\Sigma_{11}&\Sigma_{12}\\
\Sigma_{21}&\Sigma_{22}
\end{pmatrix}
\right)
$$

を考える。ただし

$$
\boldsymbol X_1\in\mathbb R^p,
\qquad
\boldsymbol X_2\in\mathbb R^q,
$$

全共分散行列は正定値とする。したがって $\Sigma_{22}$ は正定値で可逆である。

次の行列と確率ベクトルを定義する。

$$
B=\Sigma_{12}\Sigma_{22}^{-1},
$$

$$
\boldsymbol R
=
\boldsymbol X_1-\boldsymbol\mu_1
-B(\boldsymbol X_2-\boldsymbol\mu_2).
$$

1. $E[\boldsymbol R]$ を求めよ。
2. $\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)$ を求めよ。
3. $\operatorname{Var}(\boldsymbol R)$ を求め、

$$
\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
$$

が現れることを示せ。
4. $(\boldsymbol R,\boldsymbol X_2)$ が同時多変量正規分布に従うことを説明し、問2の結果から $\boldsymbol R$ と $\boldsymbol X_2$ が独立であることを示せ。
5. 以上を用いて

$$
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)
$$

の条件付き分布を導け。
6. 条件付き共分散行列が観測値 $\boldsymbol x_2$ に依存しない理由を、導出結果から説明せよ。
7. $p=q=1$ とし、

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim
N_2\left(
\begin{pmatrix}\mu_X\\\mu_Y\end{pmatrix},
\begin{pmatrix}
\sigma_X^2&\rho\sigma_X\sigma_Y\\
\rho\sigma_X\sigma_Y&\sigma_Y^2
\end{pmatrix}
\right)
$$

とする。一般公式から $X\mid(Y=y)$ の分布を求めよ。
8. 発展として、2変量正規分布の同時密度を $x$ に関して平方完成する方法でも、問7と同じ条件付き平均・条件付き分散が得られることを示せ。

---

## 解答

### 方針

条件付き正規公式を最短で導く鍵は、$\boldsymbol X_1$ から $\boldsymbol X_2$ と線形に関係する部分を取り除いた残差

$$
\boldsymbol R
=
\boldsymbol X_1-\boldsymbol\mu_1
-\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol X_2-\boldsymbol\mu_2)
$$

を作ることである。

この $\boldsymbol R$ が $\boldsymbol X_2$ と無相関になるよう係数を選んでいる。しかも元が多変量正規なので、無相関から独立が従う。

したがって

$$
\boldsymbol X_1
=
\boldsymbol\mu_1
+\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol X_2-\boldsymbol\mu_2)
+\boldsymbol R
$$

と分解でき、$\boldsymbol X_2=\boldsymbol x_2$ と固定した後は、右辺でランダムに残るのは $\boldsymbol R$ だけになる。

これが条件付き正規公式の本体である。

---

### 1. $E[\boldsymbol R]$

定義から

$$
\begin{aligned}
E[\boldsymbol R]
&=E[\boldsymbol X_1]-\boldsymbol\mu_1
-B\{E[\boldsymbol X_2]-\boldsymbol\mu_2\}\\
&=\boldsymbol\mu_1-\boldsymbol\mu_1
-B(\boldsymbol\mu_2-\boldsymbol\mu_2)\\
&=\boldsymbol0.
\end{aligned}
$$

したがって

$$
\boxed{E[\boldsymbol R]=\boldsymbol0}.
$$

---

### 2. $\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)$

定数ベクトルは共分散に影響しないので

$$
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)
=
\operatorname{Cov}(\boldsymbol X_1-B\boldsymbol X_2,\boldsymbol X_2).
$$

共分散の双線形性より

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)
&=
\operatorname{Cov}(\boldsymbol X_1,\boldsymbol X_2)
-B\operatorname{Var}(\boldsymbol X_2)\\
&=
\Sigma_{12}-B\Sigma_{22}.
\end{aligned}
$$

ここで

$$
B=\Sigma_{12}\Sigma_{22}^{-1}
$$

だから

$$
\begin{aligned}
B\Sigma_{22}
&=
\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{22}\\
&=\Sigma_{12}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=0
}.
$$

この係数 $B$ は、まさに残差を $\boldsymbol X_2$ と無相関にするよう選ばれている。

---

### 3. $\operatorname{Var}(\boldsymbol R)$

定数項を除けば

$$
\boldsymbol R=\boldsymbol X_1-B\boldsymbol X_2+\text{定数}
$$

なので

$$
\begin{aligned}
\operatorname{Var}(\boldsymbol R)
&=\operatorname{Var}(\boldsymbol X_1-B\boldsymbol X_2)\\
&=\Sigma_{11}
-B\Sigma_{21}
-\Sigma_{12}B^T
+B\Sigma_{22}B^T.
\end{aligned}
$$

ここで

$$
B=\Sigma_{12}\Sigma_{22}^{-1}.
$$

共分散行列は対称なので

$$
\Sigma_{21}=\Sigma_{12}^T,
\qquad
\Sigma_{22}^{-1}=(\Sigma_{22}^{-1})^T.
$$

したがって

$$
B^T
=
\Sigma_{22}^{-1}\Sigma_{21}.
$$

各項を計算すると

$$
B\Sigma_{21}
=
\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21},
$$

$$
\Sigma_{12}B^T
=
\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21},
$$

また

$$
\begin{aligned}
B\Sigma_{22}B^T
&=
\Sigma_{12}\Sigma_{22}^{-1}
\Sigma_{22}
\Sigma_{22}^{-1}\Sigma_{21}\\
&=
\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(\boldsymbol R)
=
\Sigma_{11}
-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
}.
$$

この行列を

$$
\boxed{
\Sigma_{1\mid2}
=
\Sigma_{11}
-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
}
$$

と書く。

これは $\Sigma_{22}$ に関する Schur 補である。

全共分散行列が正定値なので、この Schur 補も正定値である。

---

### 4. $\boldsymbol R$ と $\boldsymbol X_2$ の独立性

$(\boldsymbol R,\boldsymbol X_2)$ は

$$
(\boldsymbol X_1,\boldsymbol X_2)
$$

のアフィン変換である。

実際

$$
\begin{pmatrix}
\boldsymbol R\\
\boldsymbol X_2
\end{pmatrix}
=
\begin{pmatrix}
I_p&-B\\
0&I_q
\end{pmatrix}
\begin{pmatrix}
\boldsymbol X_1\\
\boldsymbol X_2
\end{pmatrix}
+
\begin{pmatrix}
-\boldsymbol\mu_1+B\boldsymbol\mu_2\\
\boldsymbol0
\end{pmatrix}.
$$

多変量正規分布はアフィン変換で閉じているので

$$
(\boldsymbol R,\boldsymbol X_2)
$$

も同時多変量正規分布に従う。

問2より

$$
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=0.
$$

同時正規分布では無相関と独立が同値なので

$$
\boxed{
\boldsymbol R\perp\boldsymbol X_2
}.
$$

ここが導出で最も重要な一歩である。

一般の分布では

$$
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=0
$$

だけから独立とは言えない。

---

### 5. 条件付き正規分布の公式

残差の定義を変形すると

$$
\boldsymbol X_1
=
\boldsymbol\mu_1
+B(\boldsymbol X_2-\boldsymbol\mu_2)
+\boldsymbol R.
$$

ここで $\boldsymbol X_2=\boldsymbol x_2$ と条件付けると

$$
\boldsymbol X_1
=
\boldsymbol\mu_1
+B(\boldsymbol x_2-\boldsymbol\mu_2)
+\boldsymbol R.
$$

しかも $\boldsymbol R$ は $\boldsymbol X_2$ と独立だから、条件付けても $\boldsymbol R$ の分布は変わらない。

問1・問3より

$$
\boldsymbol R
\sim
N_p\left(
\boldsymbol0,
\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
\right).
$$

したがって

$$
\boxed{
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)
\sim
N_p\left(
\boldsymbol\mu_1
+\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol x_2-\boldsymbol\mu_2),
\Sigma_{11}
-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
\right)
}.
$$

これが条件付き多変量正規分布の公式である。

条件付き平均は

$$
\boxed{
E[\boldsymbol X_1\mid\boldsymbol X_2=\boldsymbol x_2]
=
\boldsymbol\mu_1
+\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol x_2-\boldsymbol\mu_2)
},
$$

条件付き共分散は

$$
\boxed{
\operatorname{Var}(\boldsymbol X_1\mid\boldsymbol X_2)
=
\Sigma_{11}
-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
}.
$$

---

### 6. なぜ条件付き共分散は観測値に依存しないのか

条件付け後には

$$
\boldsymbol X_1
=
\underbrace{
\boldsymbol\mu_1
+B(\boldsymbol x_2-\boldsymbol\mu_2)
}_{\text{固定されたベクトル}}
+
\boldsymbol R
$$

となる。

$\boldsymbol x_2$ が変わると変化するのは固定部分、すなわち条件付き平均だけである。

ランダムな揺らぎは常に $\boldsymbol R$ であり、その分散は

$$
\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
$$

で一定である。

したがって

$$
\boxed{
\text{多変量正規では、条件付き平均は観測値に依存するが、条件付き共分散は依存しない。}
}
$$

---

### 7. 二変量正規への特殊化

二変量の場合は

$$
\Sigma_{11}=\sigma_X^2,
\qquad
\Sigma_{22}=\sigma_Y^2,
\qquad
\Sigma_{12}=\rho\sigma_X\sigma_Y.
$$

したがって

$$
\begin{aligned}
\Sigma_{12}\Sigma_{22}^{-1}
&=
\rho\sigma_X\sigma_Y\cdot\frac1{\sigma_Y^2}\\
&=
\rho\frac{\sigma_X}{\sigma_Y}.
\end{aligned}
$$

よって条件付き平均は

$$
\boxed{
E[X\mid Y=y]
=
\mu_X
+\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y)
}.
$$

条件付き分散は

$$
\begin{aligned}
\operatorname{Var}(X\mid Y)
&=\sigma_X^2
-\frac{(\rho\sigma_X\sigma_Y)^2}{\sigma_Y^2}\\
&=\sigma_X^2-\rho^2\sigma_X^2\\
&=\sigma_X^2(1-\rho^2).
\end{aligned}
$$

したがって

$$
\boxed{
X\mid(Y=y)
\sim
N\left(
\mu_X+\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y),
\sigma_X^2(1-\rho^2)
\right)
}.
$$

#### 検算

$\rho=0$ なら

$$
X\mid(Y=y)\sim N(\mu_X,\sigma_X^2),
$$

すなわち条件付けても分布は変わらない。二変量正規では $\rho=0$ が独立を意味するので整合的である。

また $|\rho|$ が1に近づくほど条件付き分散

$$
\sigma_X^2(1-\rho^2)
$$

は0に近づき、$Y$ を知ることで $X$ がほぼ決まる。

---

### 8. 平方完成による導出

2変量正規分布の同時密度は

$$
f_{X,Y}(x,y)
=
\frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}}
\exp\left[
-\frac{1}{2(1-\rho^2)}
\left\{
\frac{(x-\mu_X)^2}{\sigma_X^2}
-2\rho\frac{(x-\mu_X)(y-\mu_Y)}{\sigma_X\sigma_Y}
+\frac{(y-\mu_Y)^2}{\sigma_Y^2}
\right\}
\right].
$$

$y$ を固定し、$x$ に依存する部分を平方完成する。

まず

$$
u=\frac{x-\mu_X}{\sigma_X},
\qquad
v=\frac{y-\mu_Y}{\sigma_Y}
$$

と置くと

$$
u^2-2\rho uv+v^2
$$

が現れる。

これを $u$ について平方完成すると

$$
\begin{aligned}
u^2-2\rho uv+v^2
&=(u-\rho v)^2+v^2-\rho^2v^2\\
&=(u-\rho v)^2+(1-\rho^2)v^2.
\end{aligned}
$$

したがって指数部は

$$
-\frac{(u-\rho v)^2}{2(1-\rho^2)}
-\frac{v^2}{2}.
$$

$y$ を固定すると第2項は $x$ に依存しない定数である。

よって条件付き密度 $f_{X\mid Y}(x\mid y)$ の $x$ に関する核は

$$
\exp\left\{
-\frac{1}{2(1-\rho^2)}
\left(
\frac{x-\mu_X}{\sigma_X}
-\rho\frac{y-\mu_Y}{\sigma_Y}
\right)^2
\right\}.
$$

括弧内を整理すると

$$
\frac{x-\left\{\mu_X+\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y)\right\}}{\sigma_X}.
$$

したがって

$$
\boxed{
X\mid(Y=y)
\sim
N\left(
\mu_X+\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y),
\sigma_X^2(1-\rho^2)
\right)
}.
$$

残差化による導出と一致する。

---

## この問題で覚えるべき構造

公式そのものより、次の4段階を再現できることが重要である。

$$
\boxed{
B=\Sigma_{12}\Sigma_{22}^{-1}
}
$$

と置き

$$
\boxed{
\boldsymbol R
=
\boldsymbol X_1-\boldsymbol\mu_1
-B(\boldsymbol X_2-\boldsymbol\mu_2)
}
$$

を作る。

すると

$$
\boxed{
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=0
}
$$

となる。

元が多変量正規なので

$$
\boxed{
\boldsymbol R\perp\boldsymbol X_2
}
$$

が従う。

最後に

$$
\boldsymbol X_1
=
\boldsymbol\mu_1
+B(\boldsymbol X_2-\boldsymbol\mu_2)
+\boldsymbol R
$$

へ戻せば、条件付き平均と条件付き共分散が直ちに得られる。

---

## 本番答案の圧縮形

$$
B=\Sigma_{12}\Sigma_{22}^{-1},
\qquad
\boldsymbol R
=\boldsymbol X_1-\boldsymbol\mu_1-B(\boldsymbol X_2-\boldsymbol\mu_2)
$$

と置く。

$$
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)
=
\Sigma_{12}-B\Sigma_{22}=0.
$$

また

$$
\operatorname{Var}(\boldsymbol R)
=
\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}.
$$

$(\boldsymbol R,\boldsymbol X_2)$ は元の正規ベクトルのアフィン変換なので同時正規であり、無相関より独立である。

よって $\boldsymbol X_2=\boldsymbol x_2$ の下で

$$
\boldsymbol X_1
=
\boldsymbol\mu_1
+\Sigma_{12}\Sigma_{22}^{-1}(\boldsymbol x_2-\boldsymbol\mu_2)
+\boldsymbol R,
$$

したがって

$$
\boxed{
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)
\sim
N_p\left(
\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}(\boldsymbol x_2-\boldsymbol\mu_2),
\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
\right)
}.
$$

---

## 採点基準

20点満点の目安を次のようにする。

- 残差 $\boldsymbol R$ の設定と平均: 2点
- $\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=0$ の導出: 4点
- Schur補としての残差共分散: 4点
- 同時正規性と「無相関なら独立」の使用: 4点
- 条件付き正規公式の完成: 4点
- 二変量への特殊化または平方完成: 2点

25分経過時に問5まで到達していれば合格圏。問8の平方完成は時間がなければ後回しにしてよい。
