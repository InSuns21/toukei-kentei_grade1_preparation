# Standard 52 応答曲面法・最急上昇・非線形回帰

- 安定ID: `RIKOU-STANDARD-52`
- 80大問 No.: 52
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分

## 問題

工程条件 $x_1,x_2$ と応答 $y$ の関係を局所的に調べたところ、一次応答曲面

$$
\widehat y=50+4x_1+2x_2
$$

を得た。

1. 勾配ベクトルを求めよ。
2. 最急上昇方向を求めよ。
3. $x_1$ を0.5だけ増やすステップを採用するとき、$x_2$ の増分を求めよ。
4. 最適点付近で二次応答曲面が必要になる理由を述べよ。
5. 二次モデル

$$
\widehat y=\beta_0+b^\top x+x^\top Bx
$$

で $B$ を対称行列とする。停留点を表す式を導け。
6. 応答曲面の二次モデルは $x$ には非線形でも、未知母数 $\beta_0,b,B$ には線形である。一方、劣化曲線

$$
y_i=\alpha e^{-\beta t_i}+\varepsilon_i,
\qquad
E[\varepsilon_i]=0
$$

は未知母数 $\alpha,\beta$ に対して非線形である。現在値 $(\alpha^{(k)},\beta^{(k)})$ のまわりで平均関数

$$
f(t;\alpha,\beta)=\alpha e^{-\beta t}
$$

を1次Taylor展開し、Gauss--Newton法が「残差を局所的な線形最小二乗問題として解く」方法になることを示せ。

## 詳細解答

### 1. 勾配ベクトル

一次モデル

$$
\widehat y(x_1,x_2)=50+4x_1+2x_2
$$

の勾配は偏微分を並べたものなので

$$
\nabla\widehat y
=\begin{pmatrix}
\partial\widehat y/\partial x_1\\
\partial\widehat y/\partial x_2
\end{pmatrix}
=\begin{pmatrix}4\\2\end{pmatrix}.
$$

従って

$$
\boxed{\nabla\widehat y=(4,2)^\top}.
$$

### 2. 最急上昇方向

微小変位 $d$ に対する一次近似は

$$
\widehat y(x+d)-\widehat y(x)
\approx\nabla\widehat y^\top d.
$$

$\|d\|$ を固定すると Cauchy--Schwarz の不等式から

$$
\nabla\widehat y^\top d
\le\|\nabla\widehat y\|\,\|d\|
$$

であり、等号は $d$ が勾配と同じ向きのときに成立する。

したがって最急上昇方向は

$$
(4,2)^\top
$$

で、比は

$$
\boxed{2:1}.
$$

単位方向ベクトルなら

$$
\frac1{\sqrt5}(2,1)^\top.
$$

### 3. ステップ幅

最急上昇方向では

$$
\Delta x_1:\Delta x_2=2:1.
$$

$\Delta x_1=0.5$ だから

$$
\boxed{\Delta x_2=0.25}.
$$

### 4. 最適点近傍で二次モデルが必要な理由

一次モデル

$$
\widehat y=\beta_0+b^\top x
$$

は局所的な傾きだけを表す。最急上昇を続けて最適点へ近づくと

$$
\nabla y\approx0
$$

となり、一次項だけでは極大・極小・鞍点の区別や曲率を表せない。

そこで

$$
x_1^2,\quad x_2^2,\quad x_1x_2
$$

などの二次項を入れる。

つまり

$$
\boxed{
\text{一次応答曲面は方向探索、二次応答曲面は最適点近傍の曲率解析}
}.
$$

### 5. 二次応答曲面の停留点

$$
\widehat y
=\beta_0+b^\top x+x^\top Bx
$$

で $B$ は対称とする。このとき

$$
\nabla(b^\top x)=b,
$$

$$
\nabla(x^\top Bx)=2Bx.
$$

従って

$$
\nabla\widehat y=b+2Bx.
$$

停留点 $x_*$ では

$$
b+2Bx_*=0.
$$

$B$ が非特異なら

$$
\boxed{x_*=-\frac12B^{-1}b}.
$$

停留点が極大・極小・鞍点のどれかは $B$ の固有値の符号で判定できる。

### 6. 「説明変数に非線形」と「母数に非線形」は別物

応答曲面

$$
\widehat y
=\beta_0+b^\top x+x^\top Bx
$$

には $x_j^2$ や $x_jx_k$ が現れるので、説明変数 $x$ に対しては曲線的である。しかし $x_j^2$ や $x_jx_k$ を新しい説明変数と思えば、未知係数には1次式である。したがって通常の線形最小二乗法で推定できる。

一方

$$
f(t;\alpha,\beta)=\alpha e^{-\beta t}
$$

では未知母数 $\beta$ が指数関数の中に入るため、母数に対して非線形である。

現在値を

$$
\theta^{(k)}=
\begin{pmatrix}
\alpha^{(k)}\\
\beta^{(k)}
\end{pmatrix}
$$

とし、更新量を

$$
\Delta=
\begin{pmatrix}
\Delta_\alpha\\
\Delta_\beta
\end{pmatrix}
$$

とする。まず偏微分は

$$
\frac{\partial f}{\partial\alpha}
=e^{-\beta t},
$$

$$
\frac{\partial f}{\partial\beta}
=-\alpha t e^{-\beta t}.
$$

したがって現在値のまわりの1次Taylor展開は

$$
\begin{aligned}
f(t_i;\theta^{(k)}+\Delta)
&\approx f(t_i;\theta^{(k)})\\
&\quad+e^{-\beta^{(k)}t_i}\Delta_\alpha
-\alpha^{(k)}t_i e^{-\beta^{(k)}t_i}\Delta_\beta.
\end{aligned}
$$

現在の残差を

$$
r_i^{(k)}
=y_i-f(t_i;\theta^{(k)})
$$

と置く。またJacobian行列 $J^{(k)}$ の第 $i$ 行を

$$
\left(
 e^{-\beta^{(k)}t_i},
 -\alpha^{(k)}t_i e^{-\beta^{(k)}t_i}
\right)
$$

とする。

するとTaylor近似の下で新しい残差は

$$
r^{(k)}-J^{(k)}\Delta
$$

と近似できる。したがって元の非線形最小二乗問題を、その時点では

$$
\min_\Delta
\left\|r^{(k)}-J^{(k)}\Delta\right\|^2
$$

という**線形最小二乗問題**へ置き換えられる。

正規方程式は

$$
(J^{(k)\top}J^{(k)})\Delta
=J^{(k)\top}r^{(k)}
$$

であり、これを解いて

$$
\boxed{
\theta^{(k+1)}=\theta^{(k)}+\Delta
}
$$

と更新する。これが Gauss--Newton 法の基本である。

重要なのは

$$
\boxed{
\text{非線形回帰を、現在値の周囲で繰り返し線形化して解く}
}
$$

という見方である。

## 本番答案

一次応答曲面の勾配は

$$
\nabla\widehat y=(4,2)^\top
$$

なので最急上昇方向は $2:1$。$\Delta x_1=0.5$ なら $\Delta x_2=0.25$。

二次応答曲面

$$
\widehat y=\beta_0+b^\top x+x^\top Bx
$$

では

$$
\nabla\widehat y=b+2Bx,
$$

従って

$$
x_*=-\frac12B^{-1}b.
$$

応答曲面は $x$ に非線形でも係数には線形。一方

$$
f(t;\alpha,\beta)=\alpha e^{-\beta t}
$$

は母数に非線形である。現在値で

$$
f_i(\theta+\Delta)
\approx f_i(\theta)+J_i\Delta
$$

と線形化すると

$$
\min_\Delta\|r-J\Delta\|^2
$$

となり、Gauss--Newton更新は

$$
(J^\top J)\Delta=J^\top r,
\qquad
\theta^{(k+1)}=\theta^{(k)}+\Delta.
$$

## 採点基準

- 勾配・最急上昇方向: 4点
- ステップ増分: 2点
- 二次応答曲面が必要な理由: 3点
- 停留点の導出: 4点
- 非線形回帰の偏微分・Taylor線形化: 4点
- Gauss--Newton正規方程式と更新: 3点

25分経過時は「応答曲面は母数には線形」「非線形回帰は母数に非線形」という区別と、$J^\top J\Delta=J^\top r$ を残す。
