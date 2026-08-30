# Core 12 AR(2)：Yule–Walker方程式・定常条件

- 安定ID: `RIKOU-CORE-12`
- 80大問 No.: 23
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t,
\qquad \varepsilon_t\overset{\mathrm{iid}}\sim(0,1)
$$

を考える。ただし $E[\varepsilon_t]=0$、$\operatorname{Var}(\varepsilon_t)=1$ で、$\varepsilon_t$ は過去の $X_{t-1},X_{t-2},\ldots$ と無相関とする。

1. AR特性多項式の根を用いて定常性を確認せよ。
2. Yule–Walker方程式をモデル式から導き、$\rho(1)$ を求めよ。
3. $\rho(2)$ を求めよ。
4. $\gamma(0)$ を求めよ。

## 詳細解答

### 1. 特性多項式と定常性

一般の AR(2)

$$
X_t=\phi_1X_{t-1}+\phi_2X_{t-2}+\varepsilon_t
$$

で、後退作用素 $B$ を $BX_t=X_{t-1}$ と定義すると

$$
(1-\phi_1B-\phi_2B^2)X_t=\varepsilon_t.
$$

この多項式

$$
\phi(z)=1-\phi_1z-\phi_2z^2
$$

を **AR特性多項式** と呼ぶ。

なぜ「根が単位円の外側」という条件を見るのかを先に確認する。定常な因果解では、現在の $X_t$ を現在・過去のイノベーションだけで

$$
X_t=\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
$$

と表したい。この級数が有限分散を持つには係数 $\psi_j$ が十分速く減衰する必要がある。AR多項式の根がすべて $|z|>1$ にあることは、逆多項式

$$
\frac{1}{1-\phi_1z-\phi_2z^2}
$$

を $|z|\le1$ の範囲でべき級数展開でき、$\psi_j$ が減衰するための条件である。これが AR 過程の因果的弱定常条件である。

本問では

$$
1-0.5z-0.2z^2=0.
$$

両辺を整理すると

$$
0.2z^2+0.5z-1=0,
$$

したがって

$$
z
=\frac{-0.5\pm\sqrt{0.5^2+4\cdot0.2}}{2\cdot0.2}
=\frac{-0.5\pm\sqrt{1.05}}{0.4}.
$$

数値的には

$$
z_1\approx1.312,
\qquad
z_2\approx-3.812.
$$

いずれも

$$
|z_1|>1,
\qquad
|z_2|>1
$$

なので、因果的弱定常解が存在する。

---

### 2. Yule–Walker方程式を導いて $\rho(1)$ を求める

ここでは Yule–Walker 方程式を公式として置かず、モデル式から出す。

平均は0とする。$h\ge1$ に対して

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$

の両辺に $X_{t-h}$ を掛けて期待値を取ると

$$
\begin{aligned}
E[X_tX_{t-h}]
&=0.5E[X_{t-1}X_{t-h}]
+0.2E[X_{t-2}X_{t-h}]
+E[\varepsilon_tX_{t-h}].
\end{aligned}
$$

$\varepsilon_t$ は時点 $t-1$ 以前の情報と無相関なので、$h\ge1$ では

$$
E[\varepsilon_tX_{t-h}]=0.
$$

弱定常性から

$$
E[X_tX_{t-h}]=\gamma(h),
$$

$$
E[X_{t-1}X_{t-h}]=\gamma(h-1),
$$

$$
E[X_{t-2}X_{t-h}]=\gamma(h-2).
$$

したがって

$$
\boxed{
\gamma(h)=0.5\gamma(h-1)+0.2\gamma(h-2),
\qquad h\ge1
}
$$

を得る。これが本問の Yule–Walker 方程式である。

特に $h=1$ では $\gamma(-1)=\gamma(1)$ だから

$$
\gamma(1)=0.5\gamma(0)+0.2\gamma(1).
$$

よって

$$
0.8\gamma(1)=0.5\gamma(0).
$$

両辺を $\gamma(0)$ で割ると

$$
0.8\rho(1)=0.5,
$$

したがって

$$
\boxed{\rho(1)=\frac{0.5}{0.8}=0.625}.
$$

---

### 3. $\rho(2)$

$h=2$ の Yule–Walker 方程式は

$$
\gamma(2)=0.5\gamma(1)+0.2\gamma(0).
$$

両辺を $\gamma(0)$ で割れば

$$
\rho(2)=0.5\rho(1)+0.2.
$$

したがって

$$
\boxed{
\rho(2)=0.5(0.625)+0.2=0.5125
}.
$$

---

### 4. $\gamma(0)$

$h=0$ の場合だけは、$\varepsilon_t$ と $X_t$ が無相関ではないので別に計算する。

モデル式の両辺に $X_t$ を掛けて期待値を取ると

$$
\gamma(0)
=0.5\gamma(1)+0.2\gamma(2)+E[\varepsilon_tX_t].
$$

ここで

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$

なので

$$
\begin{aligned}
E[\varepsilon_tX_t]
&=0.5E[\varepsilon_tX_{t-1}]
+0.2E[\varepsilon_tX_{t-2}]
+E[\varepsilon_t^2]\\
&=0+0+1\\
&=1.
\end{aligned}
$$

従って

$$
\boxed{
\gamma(0)=0.5\gamma(1)+0.2\gamma(2)+1
}.
$$

$\gamma(1)=0.625\gamma(0)$、$\gamma(2)=0.5125\gamma(0)$ を代入すると

$$
\gamma(0)
=\{0.5(0.625)+0.2(0.5125)\}\gamma(0)+1.
$$

すなわち

$$
\gamma(0)(1-0.3125-0.1025)=1.
$$

したがって

$$
0.585\gamma(0)=1,
$$

$$
\boxed{
\gamma(0)=\frac1{0.585}\approx1.709
}.
$$

## 何を覚えるか

AR(2) で丸暗記すべきなのは数値公式ではなく、次の流れである。

1. AR多項式の根が単位円外か確認する。
2. モデル式に $X_{t-h}$ を掛けて期待値を取り、イノベーションと過去の無相関性を使う。
3. $h\ge1$ の Yule–Walker 方程式を作る。
4. $h=0$ では $E[\varepsilon_tX_t]=\sigma_\varepsilon^2$ が残ることに注意する。

## 本番答案

特性多項式

$$
1-0.5z-0.2z^2=0
$$

の根は約 $1.312,-3.812$ でともに単位円外。よって因果的弱定常解が存在する。

$h\ge1$ でモデル式に $X_{t-h}$ を掛けて期待値を取ると、$E[\varepsilon_tX_{t-h}]=0$ より

$$
\gamma(h)=0.5\gamma(h-1)+0.2\gamma(h-2).
$$

$h=1$ から

$$
\rho(1)=\frac{0.5}{1-0.2}=0.625,
$$

$h=2$ から

$$
\rho(2)=0.5(0.625)+0.2=0.5125.
$$

また

$$
E[\varepsilon_tX_t]=1
$$

なので

$$
\gamma(0)=0.5\gamma(1)+0.2\gamma(2)+1,
$$

従って

$$
\gamma(0)=1/0.585\approx1.709.
$$

## 採点基準

- 特性根と定常性の意味: 5点
- モデル式から Yule–Walker を導出: 5点
- $\rho(1)$: 3点
- $\rho(2)$: 3点
- $h=0$ で $E[\varepsilon_tX_t]=1$ を示して $\gamma(0)$: 4点

25分経過時は、少なくとも「モデル式×$X_{t-h}$→期待値→Yule–Walker」の1段を残し、公式だけを書かない。
