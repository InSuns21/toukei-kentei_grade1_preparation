# Advanced 01–10

---

# Advanced 01 二項PGF・Chernoff型評価

- 旧No.: 17
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

$X\sim\operatorname{Binomial}(n,p)$ とし、$p<a<1$ とする。

1. MGF $E[e^{tX}]$ を求めよ。
2. Markovの不等式を用いて $P(X\ge na)$ の上界を $t>0$ で表せ。
3. 上界を最小にする $t^*$ を求めよ。
4. 上界をBernoulliのKL divergence

$$
D(a\Vert p)=a\log\frac ap+(1-a)\log\frac{1-a}{1-p}
$$

で表せ。

## 詳細解答

二項MGFは

$$
E[e^{tX}]=(1-p+pe^t)^n.
$$

$t>0$ で

$$
P(X\ge na)
=P(e^{tX}\ge e^{tna})
\le e^{-tna}(1-p+pe^t)^n.
$$

1標本あたりの対数上界

$$
\psi(t)=-at+\log(1-p+pe^t)
$$

を微分すると

$$
\psi'(t)=-a+\frac{pe^t}{1-p+pe^t}.
$$

よって

$$
e^{t^*}=\frac{a(1-p)}{p(1-a)},
\qquad
\boxed{t^*=\log\frac{a(1-p)}{p(1-a)}}.
$$

代入整理して

$$
\boxed{P(X\ge na)\le\exp\{-nD(a\Vert p)\}}.
$$

対数の数値化は不要で、最適化構造の導出が本質。

## 本番答案

$$
M_X(t)=(1-p+pe^t)^n.
$$

Markovより

$$
P(X\ge na)\le[e^{-at}(1-p+pe^t)]^n.
$$

微分して $e^{t^*}=a(1-p)/[p(1-a)]$。代入すると

$$
P(X\ge na)\le e^{-nD(a\Vert p)}.
$$

## 採点基準

- MGF: 4点
- Markov上界: 5点
- 最適化: 6点
- KL表現: 5点

---

# Advanced 02 切断正規・平均・分散

- 旧No.: 23
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

$Z\sim N(0,1)$ とし、$Z>a$ で条件付ける。標準正規密度・CDFを $\phi,\Phi$ とし

$$
\lambda(a)=\frac{\phi(a)}{1-\Phi(a)}
$$

と置く。

1. $Z\mid Z>a$ の密度を求めよ。
2. $E[Z\mid Z>a]$ を求めよ。
3. $E[Z^2\mid Z>a]$ と分散を求めよ。
4. $X\sim N(\mu,\sigma^2)$ の $X>c$ への一般化を書け。

## 詳細解答

条件付き密度は

$$
f(z\mid Z>a)=\frac{\phi(z)}{1-\Phi(a)},
\qquad z>a.
$$

$\phi'(z)=-z\phi(z)$ より部分積分して

$$
\int_a^\infty z\phi(z)dz=\phi(a),
$$

従って

$$
E[Z\mid Z>a]=\lambda(a).
$$

さらに

$$
\int_a^\infty z^2\phi(z)dz
=a\phi(a)+1-\Phi(a),
$$

よって

$$
E[Z^2\mid Z>a]=1+a\lambda(a),
$$

$$
\boxed{\operatorname{Var}(Z\mid Z>a)=1+a\lambda(a)-\lambda(a)^2}.
$$

一般に $\alpha=(c-\mu)/\sigma$ とすれば

$$
E[X\mid X>c]=\mu+\sigma\lambda(\alpha),
$$

$$
\operatorname{Var}(X\mid X>c)
=\sigma^2\{1+\alpha\lambda(\alpha)-\lambda(\alpha)^2\}.
$$

## 本番答案

切断密度は $\phi(z)/(1-\Phi(a))$。$\phi'=-z\phi$ を使うと

$$
E[Z\mid Z>a]=\lambda(a),
$$

$$
E[Z^2\mid Z>a]=1+a\lambda(a),
$$

従って分散は $1+a\lambda(a)-\lambda(a)^2$。一般正規は標準化して戻す。

## 採点基準

- 条件付き密度: 4点
- 平均: 6点
- 二次モーメント・分散: 7点
- 一般化: 3点

---

# Advanced 03 特性関数による中心極限定理

- 旧No.: 24
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$X_1,X_2,\ldots$ はi.i.d.で $E[X_i]=\mu$, $\operatorname{Var}(X_i)=\sigma^2\in(0,\infty)$ とする。特性関数を用いて

$$
\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
\Rightarrow N(0,1)
$$

を導け。ただし $E[Y]=0$, $E[Y^2]=1$ の変数 $Y$ について

$$
\varphi_Y(t)=1-\frac{t^2}{2}+o(t^2)
$$

を用いてよい。

## 詳細解答

$$
Y_i=\frac{X_i-\mu}{\sigma}
$$

とすれば $E[Y_i]=0$, $E[Y_i^2]=1$。標準化和 $S_n=n^{-1/2}\sum Y_i$ の特性関数は独立性から

$$
\varphi_{S_n}(t)
=\left[\varphi_Y\left(\frac{t}{\sqrt n}\right)\right]^n.
$$

展開より

$$
\varphi_Y\left(\frac{t}{\sqrt n}\right)
=1-\frac{t^2}{2n}+o(n^{-1}).
$$

従って

$$
\left[1-\frac{t^2}{2n}+o(n^{-1})\right]^n
\to e^{-t^2/2}.
$$

右辺は標準正規の特性関数。Lévyの連続性定理より $S_n\Rightarrow N(0,1)$。

重要なのは $o(n^{-1})$ を含む底を $n$ 乗した極限であり、対数を取れば

$$
n\log\left(1-\frac{t^2}{2n}+o(n^{-1})\right)\to-\frac{t^2}{2}.
$$

## 本番答案

$Y_i=(X_i-\mu)/\sigma$ と標準化し、

$$
\varphi_{n^{-1/2}\sum Y_i}(t)
=\left[\varphi_Y(t/\sqrt n)\right]^n
=\left[1-\frac{t^2}{2n}+o(n^{-1})\right]^n
\to e^{-t^2/2}.
$$

Lévyの連続性定理により標準正規へ分布収束する。

## 採点基準

- 標準化: 3点
- 特性関数の積: 5点
- 二次展開: 6点
- 極限: 4点
- Lévy定理: 2点

---

# Advanced 04 等相関行列・精度行列・偏相関

- 旧No.: 31
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$p\ge2$ とし、等相関行列

$$
R=(1-\rho)I_p+\rho\mathbf1\mathbf1^T
$$

を考える。

1. 固有値を求め、正定値条件を求めよ。
2. $R^{-1}$ を求めよ。
3. $N_p(0,R)$ における任意の2変数の、残り全変数を固定した偏相関を求めよ。

## 詳細解答

$\mathbf1$ 方向では

$$
R\mathbf1=\{1+(p-1)\rho\}\mathbf1.
$$

$\mathbf1$ に直交する方向では固有値 $1-\rho$。従って固有値は

$$
1+(p-1)\rho\quad(1\text{個}),
\qquad
1-\rho\quad(p-1\text{個}).
$$

正定値条件は

$$
\boxed{-\frac1{p-1}<\rho<1}.
$$

rank-one逆行列公式より

$$
\boxed{
R^{-1}=\frac1{1-\rho}
\left[I_p-\frac{\rho}{1+(p-1)\rho}\mathbf1\mathbf1^T\right]
}.
$$

精度行列 $\Omega=R^{-1}$ の対角成分と非対角成分は

$$
\Omega_{ii}=\frac{1+(p-2)\rho}{(1-\rho)\{1+(p-1)\rho\}},
$$

$$
\Omega_{ij}=-\frac{\rho}{(1-\rho)\{1+(p-1)\rho\}}.
$$

従って偏相関は

$$
\boxed{
-\frac{\Omega_{ij}}{\sqrt{\Omega_{ii}\Omega_{jj}}}
=\frac{\rho}{1+(p-2)\rho}
}.
$$

## 本番答案

固有値は $1+(p-1)\rho$ と $1-\rho$（重複度 $p-1$）なので正定値条件は $-1/(p-1)<\rho<1$。

$$
R^{-1}=\frac1{1-\rho}\left[I-\frac{\rho}{1+(p-1)\rho}11^T\right].
$$

精度行列から偏相関は $\rho/[1+(p-2)\rho]$。

## 採点基準

- 固有値: 6点
- 正定値条件: 3点
- 逆行列: 6点
- 偏相関: 5点

---

# Advanced 05 射影行列・二次形式・Cochran分解

- 旧No.: 33
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$X=(X_1,\ldots,X_n)^T\sim N_n(\mu\mathbf1,\sigma^2I)$。$P=\mathbf1\mathbf1^T/n$, $Q=I-P$ とする。

1. $P,Q$ が直交射影であることを示し、ランクを求めよ。
2. $PX$ と $QX$ が独立であることを示せ。
3. $\bar X$ と標本分散 $S^2=(n-1)^{-1}\sum(X_i-\bar X)^2$ の分布を導け。
4. $\bar X$ と $S^2$ の独立性を示せ。

## 詳細解答

$P^T=P$, $P^2=P$ なので射影。$Q^T=Q$, $Q^2=Q$, $PQ=0$。ランクは

$$
\operatorname{rank}(P)=1,
\qquad
\operatorname{rank}(Q)=n-1.
$$

正規ベクトルの線形変換なので $(PX,QX)$ は同時正規。共分散は

$$
\operatorname{Cov}(PX,QX)=\sigma^2PQ=0
$$

だから独立。

$PX=\bar X\mathbf1$ より

$$
\bar X\sim N(\mu,\sigma^2/n).
$$

また

$$
\frac{X^TQX}{\sigma^2}
=\frac{(n-1)S^2}{\sigma^2}
\sim\chi^2_{n-1},
$$

これはランク $n-1$ の直交射影二次形式の結果。$PX\perp QX$ なので $\bar X\perp S^2$。

## 本番答案

$P,Q$ は対称冪等、$PQ=0$、ランク $1,n-1$。正規性と共分散0から $PX\perp QX$。従って

$$
\bar X\sim N(\mu,\sigma^2/n),
\qquad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$

かつ $\bar X\perp S^2$。

## 採点基準

- 射影・ランク: 5点
- 独立性: 5点
- 平均の分布: 3点
- 二次形式のカイ二乗: 5点
- 平均と分散の独立: 2点

---

# Advanced 06 精度行列・Gaussian条件付き独立

- 旧No.: 34
- 層: Advanced
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X=(X_1,X_2,X_3)^T\sim N_3(0,\Sigma)$ の精度行列が

$$
\Omega=\Sigma^{-1}
=
\begin{pmatrix}
2&-1&0\\
-1&2&-1\\
0&-1&2
\end{pmatrix}
$$

である。

1. $X_1$ と $X_3$ の、$X_2$ を与えた偏相関を求めよ。
2. 条件付き独立性を判定せよ。
3. $X_1\mid X_2=x_2,X_3=x_3$ の平均と分散を精度行列から求めよ。

## 詳細解答

Gaussianでは残りを条件付けた偏相関は

$$
\rho_{13\cdot2}
=-\frac{\Omega_{13}}{\sqrt{\Omega_{11}\Omega_{33}}}=0.
$$

従って

$$
\boxed{X_1\perp X_3\mid X_2}.
$$

精度行列表示では、1成分の条件付き分布は

$$
X_1\mid X_{-1}
\sim N\left(-\Omega_{11}^{-1}\Omega_{1,-1}X_{-1},\Omega_{11}^{-1}\right).
$$

ここで $\Omega_{11}=2$, $\Omega_{1,-1}=(-1,0)$ だから

$$
\boxed{X_1\mid X_2=x_2,X_3=x_3\sim N(x_2/2,1/2)}.
$$

$x_3$ が平均式に入らないことも条件付き独立性と一致する。

## 本番答案

$\Omega_{13}=0$ より偏相関0、Gaussianなので $X_1\perp X_3\mid X_2$。また

$$
E[X_1\mid X_{-1}]=-(1/2)(-x_2)=x_2/2,
\quad
Var=1/2.
$$

## 採点基準

- 偏相関: 5点
- 条件付き独立: 5点
- 条件付き平均: 6点
- 条件付き分散・解釈: 4点

---

# Advanced 07 2変量正規・選択後モーメント

- 旧No.: 35
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

$(X,Y)$ は平均0、分散1、相関 $\rho$ の2変量正規分布。$X>a$ の個体だけを選択する。$\lambda(a)=\phi(a)/(1-\Phi(a))$ とする。

1. $E[Y\mid X>a]$ を求めよ。
2. $\operatorname{Var}(Y\mid X>a)$ を求めよ。
3. $\operatorname{Cov}(X,Y\mid X>a)$ を求めよ。
4. 選択が相関構造を変える理由を説明せよ。

## 詳細解答

2変量正規は

$$
Y=\rho X+\sqrt{1-\rho^2}\,\varepsilon,
\qquad
\varepsilon\sim N(0,1),\quad\varepsilon\perp X
$$

と表せる。切断正規の結果

$$
E[X\mid X>a]=\lambda(a),
$$

$$
V_a=\operatorname{Var}(X\mid X>a)
=1+a\lambda(a)-\lambda(a)^2.
$$

従って

$$
\boxed{E[Y\mid X>a]=\rho\lambda(a)},
$$

$$
\boxed{\operatorname{Var}(Y\mid X>a)=\rho^2V_a+1-\rho^2},
$$

$$
\boxed{\operatorname{Cov}(X,Y\mid X>a)=\rho V_a}.
$$

選択後は $X$ の分散が1から $V_a$ へ変わるため、共分散・相関も元の $\rho$ のままではない。

## 本番答案

$Y=\rho X+\sqrt{1-\rho^2}\varepsilon$ と表し、$V_a=1+a\lambda-\lambda^2$ と置けば

$$
E[Y\mid X>a]=\rho\lambda,
$$

$$
Var(Y\mid X>a)=\rho^2V_a+1-\rho^2,
\quad
Cov(X,Y\mid X>a)=\rho V_a.
$$

## 採点基準

- 回帰表現: 4点
- 条件付き平均: 5点
- 条件付き分散: 6点
- 共分散・選択効果: 5点

---

# Advanced 08 逐次残差化・Cholesky標準化

- 旧No.: 37
- 層: Advanced
- 演習価値: B
- 難度: S
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$(X_1,X_2,X_3)$ は平均0の3変量正規で共分散行列

$$
\Sigma=
\begin{pmatrix}
1&a&ab\\
a&1&b\\
ab&b&1
\end{pmatrix},
\qquad |a|<1,\ |b|<1.
$$

次を定める。

$$
Z_1=X_1,
\qquad
Z_2=\frac{X_2-aX_1}{\sqrt{1-a^2}},
\qquad
Z_3=\frac{X_3-bX_2}{\sqrt{1-b^2}}.
$$

1. 各 $Z_i$ の平均・分散を求めよ。
2. 相互共分散が0であることを示せ。
3. $Z_1,Z_2,Z_3$ の同時分布を求めよ。
4. この変換をCholesky分解の観点から説明せよ。

## 詳細解答

各分子は線形残差で平均0。分散は

$$
Var(X_2-aX_1)=1-a^2,
$$

$$
Var(X_3-bX_2)=1-b^2,
$$

だから各 $Z_i$ は分散1。

また

$$
Cov(X_1,X_2-aX_1)=a-a=0,
$$

$$
Cov(X_1,X_3-bX_2)=ab-ba=0.
$$

さらに

$$
Cov(X_2-aX_1,X_3-bX_2)
=b-b-a(ab)+ab(a)=0.
$$

従って $Z$ は平均0、共分散 $I_3$ の多変量正規。よって

$$
\boxed{Z_1,Z_2,Z_3\overset{ind}\sim N(0,1)}.
$$

逆変換は下三角構造を持ち、独立標準正規 $Z$ から $X=LZ$ と生成するCholesky表現に対応する。

## 本番答案

残差の分散で標準化しているので各 $Z_i$ は $N(0,1)$。3つの相互共分散を計算すると全て0。同時正規なので独立。これは $X=LZ$ の下三角Cholesky生成を逆向きに行ったもの。

## 採点基準

- 分散計算: 5点
- 共分散3組: 8点
- 正規性から独立: 4点
- Cholesky解釈: 3点

---

# Advanced 09 非心Mahalanobis二次形式

- 旧No.: 38
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X\sim N_p(\mu,\Sigma)$, $\Sigma$ は正定値。固定ベクトル $a$ に対し

$$
Q=(X-a)^T\Sigma^{-1}(X-a)
$$

とする。

1. $Q$ の分布を求めよ。
2. 非心度を求めよ。
3. $E[Q]$, $\operatorname{Var}(Q)$ を求めよ。
4. $a=\mu$ の場合を説明せよ。

## 詳細解答

$$
Z=\Sigma^{-1/2}(X-a)
$$

と置くと

$$
Z\sim N_p(\delta,I),
\qquad
\delta=\Sigma^{-1/2}(\mu-a),
$$

かつ $Q=Z^TZ$。従って

$$
\boxed{Q\sim\chi_p^2(\lambda)},
$$

$$
\boxed{\lambda=\delta^T\delta=(\mu-a)^T\Sigma^{-1}(\mu-a)}.
$$

非心カイ二乗のモーメントより

$$
E[Q]=p+\lambda,
\qquad
Var(Q)=2(p+2\lambda).
$$

$a=\mu$ なら $\lambda=0$ で中心カイ二乗 $\chi_p^2$。

## 本番答案

白色化 $Z=\Sigma^{-1/2}(X-a)$ により $Q=\|Z\|^2$。従って

$$
Q\sim\chi_p^2(\lambda),
\quad
\lambda=(\mu-a)^T\Sigma^{-1}(\mu-a).
$$

平均 $p+\lambda$、分散 $2(p+2\lambda)$。$a=\mu$ なら中心カイ二乗。

## 採点基準

- 白色化: 5点
- 分布同定: 5点
- 非心度: 4点
- 平均・分散: 4点
- 中心化特例: 2点

---

# Advanced 10 条件付き正規公式の平方完成導出

- 旧No.: 39
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N\left(
\begin{pmatrix}\mu_X\\\mu_Y\end{pmatrix},
\begin{pmatrix}
\Sigma_{XX}&\Sigma_{XY}\\
\Sigma_{YX}&\Sigma_{YY}
\end{pmatrix}
\right)
$$

とし $\Sigma_{YY}$ は正定値とする。条件付き分布 $X\mid Y=y$ の平均・共分散を、公式を引用せず平方完成から導け。

## 詳細解答

中心化して $x_c=x-\mu_X$, $y_c=y-\mu_Y$ とする。ブロック逆行列またはSchur complementを用いる。条件付き密度で $y$ にのみ依存する項を定数へ吸収すると、$x$ に関する指数部は

$$
-\frac12
\left(x_c-\Sigma_{XY}\Sigma_{YY}^{-1}y_c\right)^T
S^{-1}
\left(x_c-\Sigma_{XY}\Sigma_{YY}^{-1}y_c\right),
$$

ここで

$$
S=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
$$

はSchur complement。

従って

$$
\boxed{
E[X\mid Y=y]
=\mu_X+\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y)
},
$$

$$
\boxed{
Cov(X\mid Y=y)
=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
}.
$$

条件付き共分散が $y$ に依存しないのはGaussianの特徴。

平方完成の見方では、$\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y)$ が $Y$ から線形に予測できる部分、Schur complementが予測後の残差共分散である。

## 本番答案

同時正規密度の指数二次形式を $x$ について平方完成すると

$$
(x_c-\Sigma_{XY}\Sigma_{YY}^{-1}y_c)^TS^{-1}
(x_c-\Sigma_{XY}\Sigma_{YY}^{-1}y_c),
$$

$$
S=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}.
$$

従って条件付き平均は $\mu_X+\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y)$、共分散は $S$。

## 採点基準

- 中心化・ブロック設定: 3点
- 平方完成: 8点
- 条件付き平均: 4点
- Schur complement共分散: 4点
- 解釈: 1点
