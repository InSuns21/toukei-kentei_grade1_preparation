# Advanced 30 状態空間モデル・1期先Kalman更新

- 安定ID: `RIKOU-ADVANCED-30`
- 80大問 No.: 30
- 演習価値: B
- 難度: S
- 目安時間: 25〜30分

## 問題

スカラー線形Gaussian状態空間モデル

$$
x_t=ax_{t-1}+w_t,
\qquad
y_t=x_t+v_t
$$

を考える。$w_t\sim N(0,q)$、$v_t\sim N(0,r)$、$r>0$ とし、全てのノイズは互いに独立で過去の状態・観測とも独立とする。時点 $t-1$ までの観測を $\mathcal F_{t-1}$ とし、

$$
x_{t-1}\mid\mathcal F_{t-1}\sim N(m,P)
$$

とする。

1. 予測分布 $x_t\mid\mathcal F_{t-1}$ の平均 $m^-$ と分散 $P^-$ を求めよ。
2. $y_t$ を観測する前の $(x_t,y_t)$ の条件付き同時分布を求め、Kalman gain $K$ を導け。
3. 観測 $y_t$ 後の更新平均 $m^+$ と分散 $P^+$ を求めよ。
4. $a=1,q=1,r=4,m=2,P=3,y_t=5$ で計算せよ。
5. $r$ が大きいと $K$ が小さくなる意味を説明せよ。またGaussian仮定を外した場合に同じ式をどう解釈すべきか述べよ。

## 詳細解答

### 1. 予測分布

条件付きで

$$
x_t=ax_{t-1}+w_t.
$$

$x_{t-1}\mid\mathcal F_{t-1}$ と $w_t$ は独立な正規変数なので、**独立正規変数の線形結合は正規**という結果を適用できる。従って

$$
x_t\mid\mathcal F_{t-1}
\sim N(m^-,P^-),
$$

$$
\boxed{m^-=am},
$$

$$
\boxed{P^-=a^2P+q}.
$$

独立性があるため共分散項が0になることも確認している。

### 2. 条件付き同時正規とKalman gain

観測式は

$$
y_t=x_t+v_t.
$$

$x_t\mid\mathcal F_{t-1}$ と $v_t$ は独立正規なので、$(x_t,y_t)$ は $\mathcal F_{t-1}$ の下で2変量正規となる。平均は

$$
E\begin{bmatrix}x_t\\y_t\end{bmatrix}
=\begin{bmatrix}m^-\\m^-\end{bmatrix}.
$$

共分散は

$$
Var(x_t)=P^-,
$$

$$
Cov(x_t,y_t)
=Cov(x_t,x_t+v_t)
=P^-,
$$

$$
Var(y_t)=P^-+r.
$$

従って

$$
\begin{bmatrix}x_t\\y_t\end{bmatrix}
\Bigm|\mathcal F_{t-1}
\sim
N\left(
\begin{bmatrix}m^-\\m^-\end{bmatrix},
\begin{bmatrix}
P^-&P^-\\
P^-&P^-+r
\end{bmatrix}
\right).
$$

ここで **多変量正規分布の条件付き分布公式**を使う。必要条件は同時正規であり、条件付ける成分の分散が正であること。本問では上で同時正規を確認し、$r>0$ なので

$$
P^-+r>0.
$$

したがって公式を適用でき、条件付き平均の係数は

$$
\boxed{K=\frac{Cov(x_t,y_t)}{Var(y_t)}
=\frac{P^-}{P^-+r}}.
$$

### 3. 更新平均・分散

条件付き正規公式から

$$
\begin{aligned}
m^+
&=E[x_t\mid\mathcal F_{t-1},y_t]\\
&=m^-+rac{P^-}{P^-+r}(y_t-m^-)\\
&=\boxed{m^-+K(y_t-m^-)}.
\end{aligned}
$$

また条件付き分散は

$$
\begin{aligned}
P^+
&=P^--\frac{(P^-)^2}{P^-+r}\\
&=P^-\left(1-\frac{P^-}{P^-+r}\right)\\
&=\boxed{(1-K)P^-}.
\end{aligned}
$$

### 4. 数値例

$$
m^-=1\cdot2=2,
$$

$$
P^-=1^2\cdot3+1=4.
$$

$$
K=\frac4{4+4}=\frac12.
$$

従って

$$
m^+=2+\frac12(5-2)=\boxed{3.5},
$$

$$
P^+=\left(1-\frac12\right)4=\boxed2.
$$

### 5. 解釈とGaussian条件の意味

$$
K=\frac{P^-}{P^-+r}
$$

なので観測雑音分散 $r$ が大きいほど $K$ は小さくなり、新しい観測 $y_t$ より予測 $m^-$ を強く信頼する。

Gaussian仮定があるから、上の更新式は **真の条件付き平均・条件付き分散**そのものである。Gaussian仮定を外して平均・共分散と独立性だけを仮定した場合、同じ係数は線形予測の意味では最良線形推定量を与えるが、一般には

$$
E[x_t\mid y_t]
$$

そのものがこの線形式になるとは限らない。この区別がKalman更新公式を使う際の重要な適用条件である。

## 本番答案

$x_{t-1}\mid\mathcal F_{t-1}\sim N(m,P)$、$w_t,v_t$ は独立Gaussianなので

$$
x_t\mid\mathcal F_{t-1}\sim N(am,a^2P+q).
$$

$m^-=am$, $P^-=a^2P+q$ とおくと、条件付きで $(x_t,y_t)$ は同時正規で

$$
Cov(x_t,y_t)=P^- ,
\qquad Var(y_t)=P^-+r>0.
$$

よって **多変量正規の条件付き分布公式**を適用でき、

$$
K=\frac{P^-}{P^-+r},
$$

$$
m^+=m^-+K(y_t-m^-),
\qquad
P^+=(1-K)P^-.
$$

数値例は $(m^-,P^-,K,m^+,P^+)=(2,4,1/2,3.5,2)$。Gaussianを外すと、同じ式は一般に真の条件付き平均ではなく線形最小二乗更新として解釈する。

## 採点基準

- 予測分布・独立性: 5点
- 同時正規・条件付き正規公式の条件: 5点
- gainと更新式の導出: 5点
- 数値: 3点
- Gaussian条件を外した場合の解釈: 2点

25分経過時は「同時正規」「$P^-+r>0$」を条件確認として残し、そこから条件付き正規公式を使う。
