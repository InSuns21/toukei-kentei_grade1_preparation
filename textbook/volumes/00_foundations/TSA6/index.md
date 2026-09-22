# TSA6 Encore IV 時系列解析 VI：状態空間・Kalman フィルタ・イノベーション

<!-- definition-example-audit: strict -->

TSA1 では、過去から一段先を予測したときに残る直交成分を[イノベーション](../TSA1/index.md#def-tsa1-innovation)として導入しました。TSA2--TSA4 では、その予測構造を時間領域・周波数領域の別表現へ展開しました。

本章では視点を変えます。観測列そのものを直接再帰させる代わりに、観測の背後に有限次元の「状態」を置き、

$$
\boxed{
\text{状態を予測する}
\longrightarrow
\text{観測との差をイノベーションとして受け取る}
\longrightarrow
\text{状態を更新する}
}
$$

という再帰を作ります。

線形正規状態空間モデルでは、この再帰が **Kalman フィルタ**です。核心は新しい暗記公式ではありません。[多変量正規分布](../../02_distributions/P3_03_多変量分布_条件付き分布/index.md#def-p3-03-multivariate-normal)を一回条件付けし、その結果を次時点の事前分布へ送り直すことです。

本章では有限次元線形正規系に限定し、

- 予測とフィルタリング
- Kalman 再帰
- 誤差共分散の Riccati 再帰
- イノベーション列の直交性・独立性
- イノベーション尤度
- ARMA の有限次元状態空間表現
- 確率制御への橋

までを閉じます。一般非線形フィルタ、粒子フィルタ、連続時間 Kalman--Bucy フィルタは本章の停止線の外です。

---

## 1. 観測だけでなく「状態」を持つ

時系列 $Y_t$ を直接 ARMA として書く代わりに、未来予測に必要な情報を有限次元ベクトル $X_t$ に集約できる場合があります。

<a id="def-tsa6-linear-gaussian-state-space"></a>

<!-- formal-statement-start -->
> **定義（線形正規状態空間モデル）**  
> 状態 $X_t\in\mathbb R^d$、観測 $Y_t\in\mathbb R^m$ に対し
>
$$
X_t=F_tX_{t-1}+W_t,
$$
>
$$
Y_t=H_tX_t+V_t
$$
>
> とする。ここで
>
$$
X_0\sim N_d(a_0,P_0),\qquad
W_t\sim N_d(0,Q_t),\qquad
V_t\sim N_m(0,R_t)
$$
>
> とし、$X_0$、$(W_t)$、$(V_t)$ は相互に独立、異なる時点の雑音も独立とする。$P_0,Q_t,R_t$ は半正定値行列とする。この系を線形正規状態空間モデル（linear Gaussian state-space model）と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa6-linear-gaussian-state-space -->
**定義の確認**  
$d=m=1$ として

$$
X_t=X_{t-1}+W_t,
\qquad
Y_t=X_t+V_t
$$

を考えます。これは

$$
F_t=H_t=1
$$

の線形正規状態空間モデルです。$W_t$ は真の水準そのものを動かし、$V_t$ は観測だけを汚します。二つを分けることで「状態が動いた」のか「測定がぶれた」のかを確率的に区別できます。
<!-- definition-example-end -->

状態空間表現の重要点は、状態 $X_t$ が与えられれば、未来の状態と現在の観測を記述するために過去全部を持ち回る必要がないことです。

本章では観測情報を

$$
\mathcal Y_t
:=
\sigma(Y_1,\dots,Y_t),
\qquad
\mathcal Y_0=\{\varnothing,\Omega\}
$$

と書きます。

<a id="def-tsa6-prediction-filtering"></a>

<!-- formal-statement-start -->
> **定義（予測分布とフィルタ分布）**  
> 時点 $t-1$ までの観測に基づく
>
$$
\mathcal L(X_t\mid\mathcal Y_{t-1})
$$
>
> を一段先予測分布、時点 $t$ の観測まで使った
>
$$
\mathcal L(X_t\mid\mathcal Y_t)
$$
>
> をフィルタ分布と呼ぶ。対応する条件付き平均と条件付き誤差共分散を
>
$$
a_t=E[X_t\mid\mathcal Y_{t-1}],
\qquad
P_t=\operatorname{Var}(X_t\mid\mathcal Y_{t-1}),
$$
>
$$
m_t=E[X_t\mid\mathcal Y_t],
\qquad
C_t=\operatorname{Var}(X_t\mid\mathcal Y_t)
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa6-prediction-filtering -->
**定義の確認**  
時点 $t$ のセンサー値 $Y_t$ をまだ見ていないときの状態推定が $(a_t,P_t)$、$Y_t$ を見た直後の状態推定が $(m_t,C_t)$ です。Kalman フィルタは

$$
(m_{t-1},C_{t-1})
\mapsto
(a_t,P_t)
\mapsto
(m_t,C_t)
$$

を繰り返します。
<!-- definition-example-end -->

未来の観測まで使って過去の状態 $X_t$ を推定し直す操作は平滑化（smoothing）です。本章の主役は予測とフィルタリングであり、平滑化再帰は扱いません。

---

## 2. Kalman 更新の数学的心臓：正規ベクトルの条件付け

まず一時点の条件付けを独立した補題として閉じます。

<a id="lem-tsa6-gaussian-conditioning"></a>

<!-- formal-statement-start -->
> **補題（正規ベクトルの条件付け）**  
> $X\in\mathbb R^d$, $Y\in\mathbb R^m$ が同時に多変量正規で
>
$$
E
\begin{bmatrix}X\\Y\end{bmatrix}
=
\begin{bmatrix}\mu_X\\\mu_Y\end{bmatrix},
\qquad
\operatorname{Var}
\begin{bmatrix}X\\Y\end{bmatrix}
=
\begin{bmatrix}
P&C\\
C^{\mathsf T}&S
\end{bmatrix},
$$
>
> かつ $S$ が正定値であるとする。このとき
>
$$
X\mid Y
\sim
N_d\left(
\mu_X+CS^{-1}(Y-\mu_Y),
\;
P-CS^{-1}C^{\mathsf T}
\right).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

残差

$$
U
=
X-\mu_X-CS^{-1}(Y-\mu_Y)
$$

を定めます。$U$ は $(X,Y)$ の線形変換なので、$(U,Y)$ も同時に多変量正規です。

平均は $E[U]=0$ です。また

$$
\begin{aligned}
\operatorname{Cov}(U,Y)
&=
\operatorname{Cov}(X,Y)
-
CS^{-1}\operatorname{Var}(Y)\\
&=
C-CS^{-1}S\\
&=0.
\end{aligned}
$$

同時正規ベクトルでは、相互共分散が 0 の二つのブロックは独立です。[多変量正規分布](../../02_distributions/P3_03_多変量分布_条件付き分布/index.md#def-p3-03-multivariate-normal)の基本性質として、分散共分散行列がブロック対角なら同時分布が各ブロックの積へ分解するためです。

次に

$$
\begin{aligned}
\operatorname{Var}(U)
&=
P
-CS^{-1}C^{\mathsf T}
-CS^{-1}C^{\mathsf T}
+CS^{-1}SS^{-1}C^{\mathsf T}\\
&=
P-CS^{-1}C^{\mathsf T}.
\end{aligned}
$$

$U$ は $Y$ と独立なので、$Y$ を条件として固定しても $U$ の分布は変わりません。恒等式

$$
X
=
\mu_X+CS^{-1}(Y-\mu_Y)+U
$$

から、条件付き平均と条件付き共分散が主張の形になります。$\square$
<!-- proof-end -->

この補題の $CS^{-1}$ が、そのまま Kalman gain になります。

---

## 3. Kalman 再帰を一行ずつ導く

時点 $t-1$ で

$$
X_{t-1}\mid\mathcal Y_{t-1}
\sim
N_d(m_{t-1},C_{t-1})
$$

まで得られているとします。

### 3.1 予測

状態方程式

$$
X_t=F_tX_{t-1}+W_t
$$

と $W_t$ の独立性から

$$
\boxed{
a_t=F_tm_{t-1}
}
$$

です。

誤差は

$$
X_t-a_t
=
F_t(X_{t-1}-m_{t-1})+W_t
$$

なので、交差共分散が 0 であることから

$$
\boxed{
P_t
=
F_tC_{t-1}F_t^{\mathsf T}+Q_t
}.
$$

### 3.2 観測の予測とイノベーション

<a id="def-tsa6-observation-innovation"></a>

<!-- formal-statement-start -->
> **定義（観測イノベーション）**  
> 観測の一段先予測誤差
>
$$
e_t
:=
Y_t-E[Y_t\mid\mathcal Y_{t-1}]
$$
>
> を観測イノベーションと呼ぶ。線形正規状態空間モデルでは
>
$$
e_t=Y_t-H_ta_t.
$$
>
> その条件付き共分散を
>
$$
S_t
:=
\operatorname{Var}(e_t\mid\mathcal Y_{t-1})
=
H_tP_tH_t^{\mathsf T}+R_t
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa6-observation-innovation -->
**定義の確認**  
局所レベルモデル $Y_t=X_t+V_t$ では

$$
e_t=Y_t-a_t,
\qquad
S_t=P_t+R_t.
$$

予測した水準 $a_t$ と実測 $Y_t$ の差が、その時点で初めて得た新情報です。
<!-- definition-example-end -->

以下では $S_t$ が正定値であると仮定します。観測ノイズ共分散 $R_t$ が正定値なら自動的に満たされますが、$R_t$ が特異でも $S_t$ 自体が正定値なら Kalman 更新は可能です。

<a id="def-tsa6-kalman-gain"></a>

<!-- formal-statement-start -->
> **定義（Kalman gain）**  
> $S_t$ が正定値のとき
>
$$
\boxed{
K_t=P_tH_t^{\mathsf T}S_t^{-1}
}
$$
>
> を時点 $t$ の Kalman gain と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa6-kalman-gain -->
**定義の確認**  
スカラーで $H_t=1$ なら

$$
K_t=\frac{P_t}{P_t+R_t}.
$$

観測ノイズ $R_t$ が大きいと $K_t$ は小さくなり、予測を重く使います。予測分散 $P_t$ が大きいと $K_t$ は大きくなり、観測を重く使います。
<!-- definition-example-end -->

<a id="thm-tsa6-kalman-recursion"></a>

<!-- formal-statement-start -->
> **定理（Kalman の予測・更新再帰）**  
> 線形正規状態空間モデルで $S_t$ が正定値であるとする。時点 $t-1$ のフィルタ分布が
>
$$
X_{t-1}\mid\mathcal Y_{t-1}
\sim
N_d(m_{t-1},C_{t-1})
$$
>
> なら、一段先予測分布は
>
$$
X_t\mid\mathcal Y_{t-1}
\sim
N_d(a_t,P_t),
$$
>
$$
a_t=F_tm_{t-1},
\qquad
P_t=F_tC_{t-1}F_t^{\mathsf T}+Q_t.
$$
>
> さらに
>
$$
e_t=Y_t-H_ta_t,
\qquad
S_t=H_tP_tH_t^{\mathsf T}+R_t,
$$
>
$$
K_t=P_tH_t^{\mathsf T}S_t^{-1}
$$
>
> と置けば、フィルタ分布は
>
$$
\boxed{
X_t\mid\mathcal Y_t
\sim
N_d(m_t,C_t)
}
$$
>
> であり、
>
$$
\boxed{
m_t=a_t+K_te_t
},
$$
>
$$
\boxed{
C_t
=
P_t-P_tH_t^{\mathsf T}S_t^{-1}H_tP_t
=
(I-K_tH_t)P_t
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

予測分布については、$X_{t-1}\mid\mathcal Y_{t-1}$ が正規で、独立な正規雑音 $W_t$ を線形に加えるので正規分布仮定が保たれます。平均・共分散は直前に計算した通りです。

次に $\mathcal Y_{t-1}$ を固定します。観測方程式から

$$
Y_t=H_tX_t+V_t.
$$

よって条件付き平均は

$$
E[Y_t\mid\mathcal Y_{t-1}]
=
H_ta_t.
$$

また $V_t$ は $X_t-a_t$ と独立なので

$$
\operatorname{Var}(Y_t\mid\mathcal Y_{t-1})
=
H_tP_tH_t^{\mathsf T}+R_t
=
S_t.
$$

さらに

$$
\begin{aligned}
\operatorname{Cov}(X_t,Y_t\mid\mathcal Y_{t-1})
&=
\operatorname{Cov}
(X_t,H_tX_t+V_t\mid\mathcal Y_{t-1})\\
&=
P_tH_t^{\mathsf T}.
\end{aligned}
$$

したがって $\mathcal Y_{t-1}$ の下で

$$
\begin{bmatrix}X_t\\Y_t\end{bmatrix}
$$

は条件付き同時正規で、その平均と共分散のブロックは

$$
\begin{bmatrix}
a_t\\
H_ta_t
\end{bmatrix},
\qquad
\begin{bmatrix}
P_t&P_tH_t^{\mathsf T}\\
H_tP_t&S_t
\end{bmatrix}.
$$

[正規ベクトルの条件付け](#lem-tsa6-gaussian-conditioning)を

$$
C=P_tH_t^{\mathsf T}
$$

として適用すると

$$
m_t
=
a_t
+
P_tH_t^{\mathsf T}S_t^{-1}
(Y_t-H_ta_t)
=
a_t+K_te_t.
$$

同じ補題から

$$
C_t
=
P_t-P_tH_t^{\mathsf T}S_t^{-1}H_tP_t.
$$

$K_t=P_tH_t^{\mathsf T}S_t^{-1}$ を代入すれば

$$
C_t=(I-K_tH_t)P_t
$$

です。$\square$
<!-- proof-end -->

### 3.3 数値例

スカラー系

$$
X_t=0.8X_{t-1}+W_t,
\qquad
Y_t=X_t+V_t
$$

で

$$
Q_t=0.36,\qquad R_t=1
$$

とします。時点 $t-1$ のフィルタ分布が

$$
X_{t-1}\mid\mathcal Y_{t-1}\sim N(0,1)
$$

で、新しい観測が $Y_t=1.2$ だったとします。

予測は

$$
a_t=0.8\cdot0=0,
$$

$$
P_t=0.8^2\cdot1+0.36=1.
$$

イノベーションとその分散は

$$
e_t=1.2,
\qquad
S_t=1+1=2.
$$

したがって

$$
K_t=\frac12,
$$

$$
m_t=0+\frac12\cdot1.2=0.6,
$$

$$
C_t=1-\frac12\cdot1=0.5.
$$

観測を得る前の分散 1 が、観測後には 0.5 まで減っています。

---

## 4. 共分散更新を Riccati 再帰として読む

Kalman フィルタでは、観測値 $Y_t$ は平均更新には入りますが、共分散更新には入りません。モデル行列と前時点の共分散だけで決まります。

<a id="prop-tsa6-joseph-form"></a>

<!-- formal-statement-start -->
> **命題（共分散減少と Joseph 形）**  
> Kalman 更新に対し
>
$$
P_t-C_t
=
P_tH_t^{\mathsf T}S_t^{-1}H_tP_t
\succeq0.
$$
>
> 従って
>
$$
0\preceq C_t\preceq P_t.
$$
>
> また
>
$$
\boxed{
C_t
=
(I-K_tH_t)P_t(I-K_tH_t)^{\mathsf T}
+
K_tR_tK_t^{\mathsf T}
}
$$
>
> が成り立つ。この表示を Joseph 形と呼ぶ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $z\in\mathbb R^d$ に対して

$$
z^{\mathsf T}(P_t-C_t)z
=
(H_tP_tz)^{\mathsf T}
S_t^{-1}
(H_tP_tz)
\ge0
$$

なので $P_t-C_t$ は半正定値です。

Joseph 形の右辺を展開すると

$$
\begin{aligned}
&(I-K_tH_t)P_t(I-K_tH_t)^{\mathsf T}
+K_tR_tK_t^{\mathsf T}\\
&=
P_t-K_tH_tP_t-P_tH_t^{\mathsf T}K_t^{\mathsf T}\\
&\quad
+K_t(H_tP_tH_t^{\mathsf T}+R_t)K_t^{\mathsf T}.
\end{aligned}
$$

括弧内は $S_t$ です。また

$$
K_tS_t=P_tH_t^{\mathsf T},
\qquad
S_tK_t^{\mathsf T}=H_tP_t.
$$

したがって最後の3項を整理すると

$$
-K_tH_tP_t-P_tH_t^{\mathsf T}K_t^{\mathsf T}
+P_tH_t^{\mathsf T}K_t^{\mathsf T}
=
-K_tH_tP_t.
$$

よって全体は

$$
P_t-K_tH_tP_t=C_t
$$

です。$\square$
<!-- proof-end -->

<a id="def-tsa6-riccati-recursion"></a>

<!-- formal-statement-start -->
> **定義（Kalman 共分散の Riccati 再帰）**  
> 時不変モデル
>
$$
F_t=F,\quad H_t=H,\quad Q_t=Q,\quad R_t=R
$$
>
> で、予測共分散 $P_t$ から次時点の予測共分散を作る写像
>
$$
\boxed{
P_{t+1}
=
F
\left(
P_t-P_tH^{\mathsf T}
(HP_tH^{\mathsf T}+R)^{-1}
HP_t
\right)
F^{\mathsf T}
+Q
}
$$
>
> を Kalman 共分散の Riccati 再帰と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa6-riccati-recursion -->
**定義の確認**  
$F=H=1$、システムノイズ分散 $q>0$、観測ノイズ分散 $r>0$ とします。予測分散を $p_t$ と書けば

$$
c_t
=
p_t-\frac{p_t^2}{p_t+r}
=
\frac{p_tr}{p_t+r},
$$

したがって

$$
\boxed{
p_{t+1}
=
\frac{p_tr}{p_t+r}+q
}.
$$

行列の Riccati 再帰が、一次元ではこの有理写像になります。
<!-- definition-example-end -->

<a id="prop-tsa6-scalar-riccati-limit"></a>

<!-- formal-statement-start -->
> **命題（局所レベルモデルの定常予測分散）**  
> $q>0,r>0$ とし
>
$$
p_{t+1}=g(p_t)
:=
\frac{p_tr}{p_t+r}+q,
\qquad
p_1\ge0
$$
>
> とする。このとき
>
$$
p_t\to p_\ast,
$$
>
$$
\boxed{
p_\ast
=
\frac{q+\sqrt{q^2+4qr}}{2}
}.
$$
>
> 従って Kalman gain も
>
$$
K_t=\frac{p_t}{p_t+r}
\to
\frac{p_\ast}{p_\ast+r}
$$
>
> と収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

不動点方程式 $p=g(p)$ は

$$
p
=
\frac{pr}{p+r}+q.
$$

両辺に $p+r$ を掛けると

$$
p^2+pr=pr+qp+qr,
$$

よって

$$
p^2-qp-qr=0.
$$

二根は

$$
\frac{q\pm\sqrt{q^2+4qr}}2
$$

で、分散として非負なのは正の根 $p_\ast$ です。

次に任意の $u,v\ge0$ について

$$
\begin{aligned}
g(u)-g(v)
&=
r\left(
\frac{u}{u+r}-\frac{v}{v+r}
\right)\\
&=
\frac{r^2(u-v)}{(u+r)(v+r)}.
\end{aligned}
$$

一回更新すると $p_2=g(p_1)\ge q$ であり、不動点も $p_\ast>q$ です。従って $t\ge2$ では

$$
|p_{t+1}-p_\ast|
\le
\frac{r^2}{(q+r)^2}
|p_t-p_\ast|
=:
\rho |p_t-p_\ast|,
\qquad
0<\rho<1.
$$

反復して

$$
|p_t-p_\ast|
\le
\rho^{t-2}|p_2-p_\ast|
\to0.
$$

最後に $p\mapsto p/(p+r)$ は連続なので gain の収束も従います。$\square$
<!-- proof-end -->

一般行列の Riccati 再帰にも、可検出性・可安定化性の条件の下で定常解へ収束する理論があります。しかしその証明は線形システム論と行列 Riccati 方程式の理論を必要とするため、本章では一般定理を黒箱として使いません。ここでは **有限時点の Kalman 再帰を完全に導出し、定常化の機構は一次元で完全証明する**ところまでを責務とします。

---

## 5. イノベーションは「新しく増えた情報」である

TSA1 の[最良線形予測](../TSA1/index.md#thm-tsa1-best-linear-prediction)では、射影残差が過去の線形空間と直交しました。状態空間モデルのイノベーションでも同じ幾何が現れます。ただし正規分布仮定があるため、直交性を独立性まで強められます。

<a id="thm-tsa6-innovation-orthogonality"></a>

<!-- formal-statement-start -->
> **定理（イノベーション列の直交性と正規独立性）**  
> 線形正規状態空間モデルで $S_t$ が正定値とする。このとき
>
$$
E[e_t\mid\mathcal Y_{t-1}]=0.
$$
>
> 任意の $s<t$ に対し
>
$$
E[e_te_s^{\mathsf T}]=0.
$$
>
> さらに $(e_1,\dots,e_n)$ は同時正規なので、$e_1,\dots,e_n$ は互いに独立であり
>
$$
e_t\sim N_m(0,S_t).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定義から

$$
e_t
=
Y_t-E[Y_t\mid\mathcal Y_{t-1}]
$$

なので

$$
E[e_t\mid\mathcal Y_{t-1}]=0.
$$

$s<t$ なら $e_s$ は $Y_1,\dots,Y_s$ の可測関数なので $\mathcal Y_{t-1}$-可測です。条件付き期待値の塔則を使うと

$$
\begin{aligned}
E[e_te_s^{\mathsf T}]
&=
E\left[
E[e_te_s^{\mathsf T}\mid\mathcal Y_{t-1}]
\right]\\
&=
E\left[
E[e_t\mid\mathcal Y_{t-1}]e_s^{\mathsf T}
\right]\\
&=0.
\end{aligned}
$$

また $X_0,W_1,\dots,W_n,V_1,\dots,V_n$ は同時正規で、各 $Y_t$ はそれらの線形結合です。Kalman 予測平均 $H_ta_t$ は過去の $Y$ の線形結合として再帰的に作られるので、各 $e_t$ も基礎正規ベクトルの線形結合です。従って $(e_1,\dots,e_n)$ は同時正規です。

同時正規ベクトルの異なるブロック間共分散が全て 0 なので、各ブロック $e_t$ は互いに独立です。分散は定義から $S_t$ です。$\square$
<!-- proof-end -->

<a id="prop-tsa6-innovation-information"></a>

<!-- formal-statement-start -->
> **命題（観測列とイノベーション列の情報同値性）**  
> モデル行列と初期分布が既知なら、各 $t$ について
>
$$
\boxed{
\sigma(Y_1,\dots,Y_t)
=
\sigma(e_1,\dots,e_t)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $e_1=Y_1-H_1a_1$ で、$a_1$ は初期分布と既知行列から定まる定数なので $e_1$ は $Y_1$ の可測関数です。従って

$$
\sigma(e_1)\subset\sigma(Y_1).
$$

逆に

$$
Y_1=e_1+H_1a_1
$$

なので逆包含も成り立ちます。

時点 $t-1$ まで

$$
\sigma(Y_1,\dots,Y_{t-1})
=
\sigma(e_1,\dots,e_{t-1})
$$

が成り立つと仮定します。Kalman 再帰から $a_t$ は $Y_1,\dots,Y_{t-1}$ の可測関数です。従って

$$
e_t=Y_t-H_ta_t
$$

は $Y_1,\dots,Y_t$ の可測関数です。

逆に

$$
Y_t=e_t+H_ta_t
$$

であり、帰納法の仮定により $a_t$ は $e_1,\dots,e_{t-1}$ の可測関数でもあります。したがって $Y_t$ は $e_1,\dots,e_t$ の可測関数です。

両包含が全時点で帰納的に成立します。$\square$
<!-- proof-end -->

つまり Kalman フィルタは観測情報を捨てているのではありません。過去で説明できる部分を毎回取り除き、**新情報だけを直交した列として並べ替えている**と読めます。

---

## 6. イノベーションから尤度が出る

パラメータを $\vartheta$ とし、$F_t,H_t,Q_t,R_t,a_0,P_0$ が $\vartheta$ に依存してよいとします。Kalman 再帰を回すと、各時点で $e_t(\vartheta)$ と $S_t(\vartheta)$ が得られます。

<a id="thm-tsa6-innovation-likelihood"></a>

<!-- formal-statement-start -->
> **定理（イノベーション尤度）**  
> 観測次元を $m$ とし、各 $S_t(\vartheta)$ が正定値とする。線形正規状態空間モデルの観測 $y_{1:n}$ の対数尤度は
>
$$
\boxed{
\ell_n(\vartheta)
=
-\frac12
\sum_{t=1}^n
\left[
m\log(2\pi)
+
\log\det S_t(\vartheta)
+
e_t(\vartheta)^{\mathsf T}
S_t(\vartheta)^{-1}
e_t(\vartheta)
\right]
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

確率密度の連鎖則から

$$
p_\vartheta(y_{1:n})
=
\prod_{t=1}^n
p_\vartheta(y_t\mid y_{1:t-1}).
$$

Kalman の予測式より

$$
Y_t\mid\mathcal Y_{t-1}
\sim
N_m(H_ta_t,S_t).
$$

従って $e_t=Y_t-H_ta_t$ を使えば条件付き密度は

$$
(2\pi)^{-m/2}
(\det S_t)^{-1/2}
\exp\left\{
-\frac12e_t^{\mathsf T}S_t^{-1}e_t
\right\}.
$$

積の対数を取ると主張の式になります。$\square$
<!-- proof-end -->

この表示は「巨大な $nm$ 次元正規分布の分散共分散行列を一度に反転する」代わりに、各時点の小さな $m\times m$ 行列 $S_t$ を順番に処理すればよいことを意味します。

標準化イノベーション

$$
z_t=S_t^{-1/2}e_t
$$

は正しいモデルの下で独立な標準正規ベクトルです。したがって推定後の診断では、$z_t$ に自己相関や分散の系統的変化が残っていないかを見ることが自然です。

---

## 7. ARMA も有限次元状態として書ける

TSA4 の [ARMA 過程](../TSA4/index.md#def-tsa4-arma)は観測自身の差分方程式として書きました。状態空間形式では、必要な過去値と雑音を状態ベクトルへ入れます。

<a id="prop-tsa6-arma11-state-space"></a>

<!-- formal-statement-start -->
> **命題（ARMA(1,1) の二次元状態空間表現）**  
> $Z_t\sim N(0,\sigma^2)$ を独立同分布とし
>
$$
X_t=\phi X_{t-1}+Z_t+\theta Z_{t-1}
$$
>
> とする。状態
>
$$
\xi_t
=
\begin{bmatrix}
X_t\\
Z_t
\end{bmatrix}
$$
>
> を置けば
>
$$
\boxed{
\xi_t
=
\begin{bmatrix}
\phi&\theta\\
0&0
\end{bmatrix}
\xi_{t-1}
+
\begin{bmatrix}
1\\
1
\end{bmatrix}
Z_t
}
$$
>
> および
>
$$
\boxed{
X_t=
\begin{bmatrix}1&0\end{bmatrix}\xi_t
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

右辺の第一成分は

$$
\phi X_{t-1}
+
\theta Z_{t-1}
+
Z_t
=
X_t
$$

です。第二成分は $Z_t$ です。従って右辺は正確に

$$
\begin{bmatrix}X_t\\Z_t\end{bmatrix}
$$

になります。

駆動雑音ベクトルは

$$
\begin{bmatrix}1\\1\end{bmatrix}Z_t
$$

なので、その共分散は

$$
\sigma^2
\begin{bmatrix}
1&1\\
1&1
\end{bmatrix}
$$

です。これは半正定値ですが特異です。したがって状態空間モデルでは、システムノイズ共分散 $Q$ が正定値である必要はありません。

最後に観測行列 $H=[1\ 0]$ を掛けると第一成分 $X_t$ を取り出せます。$\square$
<!-- proof-end -->

一般の ARMA$(p,q)$ でも、有限個の AR 過去値と MA 雑音過去値を状態へ積めば有限次元表現を作れます。状態表現は一意ではありません。異なる状態ベクトルが同じ観測過程を生成することもあります。

この視点の利点は、欠測・複数観測・時間変化係数などを「状態遷移と観測」という同じ枠で扱えることです。一方、ARMA の根条件と逆変換の理論は TSA4 の正本であり、本章では再証明しません。

---

## 8. Kalman フィルタと TSA1 のイノベーションはどうつながるか

TSA1 の[イノベーション](../TSA1/index.md#def-tsa1-innovation)は「過去の閉線形包への直交射影から残った成分」でした。

線形正規状態空間モデルでは条件付き期待値

$$
E[Y_t\mid\mathcal Y_{t-1}]
$$

が過去観測の線形関数になります。そのため

$$
e_t
=
Y_t-E[Y_t\mid\mathcal Y_{t-1}]
$$

は、過去観測の線形空間に対する射影残差でもあります。

したがって TSA1 の抽象的な Hilbert 空間の図式

$$
\text{過去の閉線形空間}
\quad\oplus\quad
\text{新しい直交成分}
$$

が、TSA6 では有限次元行列再帰として具体化されています。

TSA2 の移動平均表示ではイノベーションから時系列を組み立て、Kalman フィルタでは観測からイノベーションを逐次取り出します。二つは逆向きの顔を持つ同じ予測幾何です。

---

## 9. 確率制御への橋と停止線

部分観測の制御問題では真の状態 $X_t$ が直接見えません。しかし線形正規系では、観測履歴を丸ごと制御器へ渡す代わりに

$$
(m_t,C_t)
$$

というフィルタ結果に情報を圧縮できます。

線形二次 Gaussian 制御では、ここから

$$
\text{Kalman フィルタ}
+
\text{線形二次レギュレータ}
$$

を組み合わせる分離原理へ進みます。ただし、その証明には可制御性・可観測性、動的計画法、行列 Riccati 方程式の制御側理論が必要です。本章では橋だけを示し、確率制御の正本へ逆輸入しません。

同様に、非線形状態方程式・非正規雑音では条件付き分布が有限個の平均・共分散だけで閉じません。拡張 Kalman 法、シグマ点法、粒子近似法、一般非線形フィルタリングは別系列の対象です。

---

# 演習

## TSA6-A01 スカラー Kalman 再帰を一周する

- Level: A
- 目安時間: 18分

$$
X_t=0.5X_{t-1}+W_t,
\qquad
Y_t=X_t+V_t
$$

とし、

$$
W_t\sim N(0,3/4),
\qquad
V_t\sim N(0,1)
$$

とする。時点 $t-1$ のフィルタ分布が

$$
X_{t-1}\mid\mathcal Y_{t-1}
\sim N(2,1)
$$

で、$Y_t=2$ を観測した。

1. $a_t,P_t$ を求めよ。
2. $e_t,S_t$ を求めよ。
3. $K_t$ を求めよ。
4. $m_t,C_t$ を求めよ。

<!-- solution-start -->
### 詳細解答

1. 予測平均は

   $$
   a_t=0.5\cdot2=1.
   $$

   予測分散は

   $$
   P_t
   =
   0.5^2\cdot1+\frac34
   =
   \frac14+\frac34
   =
   1.
   $$

2. $H=1$ なので

   $$
   e_t=Y_t-a_t=2-1=1.
   $$

   また

   $$
   S_t=P_t+R=1+1=2.
   $$

3.

   $$
   K_t=\frac{P_t}{S_t}=\frac12.
   $$

4. 平均更新は

   $$
   m_t
   =
   a_t+K_te_t
   =
   1+\frac12
   =
   \frac32.
   $$

   共分散更新は

   $$
   C_t
   =
   P_t-K_tP_t
   =
   1-\frac12
   =
   \frac12.
   $$

   従って

   $$
   \boxed{
   X_t\mid\mathcal Y_t
   \sim
   N\left(\frac32,\frac12\right)
   }.
   $$
<!-- solution-end -->

## TSA6-A02 正規条件付けを直接計算する

- Level: A
- 目安時間: 20分

$$
\begin{bmatrix}X\\Y\end{bmatrix}
\sim
N_2
\left(
\begin{bmatrix}1\\2\end{bmatrix},
\begin{bmatrix}
4&2\\
2&5
\end{bmatrix}
\right)
$$

とする。

1. $Y=3$ のときの $E[X\mid Y=3]$ を求めよ。
2. $\operatorname{Var}(X\mid Y)$ を求めよ。
3. 残差 $U=X-1-\frac25(Y-2)$ が $Y$ と無相関であることを確認せよ。
4. なぜ正規分布仮定の下では 3 の無相関性から独立性が従うか説明せよ。

<!-- solution-start -->
### 詳細解答

1. 補題で

   $$
   C=2,\qquad S=5
   $$

   なので

   $$
   E[X\mid Y]
   =
   1+\frac25(Y-2).
   $$

   $Y=3$ を代入して

   $$
   \boxed{
   E[X\mid Y=3]=\frac75
   }.
   $$

2.

   $$
   \operatorname{Var}(X\mid Y)
   =
   4-\frac{2^2}{5}
   =
   \boxed{\frac{16}{5}}.
   $$

3.

   $$
   \begin{aligned}
   \operatorname{Cov}(U,Y)
   &=
   \operatorname{Cov}(X,Y)
   -
   \frac25\operatorname{Var}(Y)\\
   &=
   2-\frac25\cdot5\\
   &=0.
   \end{aligned}
   $$

4. $(U,Y)$ は $(X,Y)$ の線形変換なので同時正規です。同時正規ベクトルで相互共分散が 0 なら、分散共分散行列がブロック対角になり、同時分布が各ブロックの積へ分解されます。したがって $U$ と $Y$ は独立です。
<!-- solution-end -->

## TSA6-A03 イノベーションの直交性

- Level: A
- 目安時間: 18分

観測イノベーション

$$
e_t=Y_t-E[Y_t\mid\mathcal Y_{t-1}]
$$

について、$s<t$ とする。

1. $e_s$ が $\mathcal Y_{t-1}$-可測であることを説明せよ。
2. $E[e_te_s^{\mathsf T}]=0$ を条件付き期待値から示せ。
3. 正規分布仮定を外した場合、2 から独立性まで結論してよいか答えよ。
4. TSA1 のイノベーションとの共通点を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $e_s$ は $Y_s$ と $Y_1,\dots,Y_{s-1}$ の関数です。$s<t$ なので

   $$
   \sigma(Y_1,\dots,Y_s)
   \subset
   \mathcal Y_{t-1}.
   $$

   従って $e_s$ は $\mathcal Y_{t-1}$-可測です。

2.

   $$
   \begin{aligned}
   E[e_te_s^{\mathsf T}]
   &=
   E\left[
   E[e_te_s^{\mathsf T}\mid\mathcal Y_{t-1}]
   \right]\\
   &=
   E\left[
   E[e_t\mid\mathcal Y_{t-1}]e_s^{\mathsf T}
   \right]\\
   &=0.
   \end{aligned}
   $$

   最後は $e_t$ の定義から

   $$
   E[e_t\mid\mathcal Y_{t-1}]=0
   $$

   だからです。

3. いいえ。無相関は一般には独立を意味しません。本章で独立性まで進めるのは、イノベーション列が同時正規だからです。

4. TSA1 でも「過去で予測できる部分」を引いた残差が過去の線形空間と直交しました。TSA6 では条件付き期待値を Kalman 再帰で有限次元計算できるため、同じ直交残差が具体的な行列再帰として得られます。
<!-- solution-end -->

## TSA6-A04 共分散は観測で減る

- Level: A
- 目安時間: 20分

Kalman 更新

$$
C=P-PH^{\mathsf T}(HPH^{\mathsf T}+R)^{-1}HP
$$

を考え、$S=HPH^{\mathsf T}+R$ は正定値とする。

1. $P-C\succeq0$ を示せ。
2. 任意の $z$ に対し $z^{\mathsf T}Cz\le z^{\mathsf T}Pz$ を示せ。
3. $H=0$ のとき $C=P$ となることを確認し、その意味を説明せよ。
4. スカラー $H=1$ で $R\downarrow0$ のとき、$P>0$ なら $C\downarrow0$ となることを確認せよ。

<!-- solution-start -->
### 詳細解答

1.

   $$
   P-C
   =
   PH^{\mathsf T}S^{-1}HP.
   $$

   任意の $z$ について

   $$
   z^{\mathsf T}(P-C)z
   =
   (HPz)^{\mathsf T}S^{-1}(HPz)
   \ge0
   $$

   です。$S^{-1}$ は正定値なので $P-C\succeq0$ です。

2. 1 から

   $$
   z^{\mathsf T}(P-C)z\ge0
   $$

   なので

   $$
   \boxed{
   z^{\mathsf T}Cz\le z^{\mathsf T}Pz
   }.
   $$

3. $H=0$ なら観測 $Y=V$ は状態を全く含みません。そのとき

   $$
   PH^{\mathsf T}S^{-1}HP=0
   $$

   なので $C=P$ です。情報を含まない観測では不確実性は減りません。

4. スカラーでは

   $$
   C
   =
   P-\frac{P^2}{P+R}
   =
   \frac{PR}{P+R}.
   $$

   $P>0$ を固定して $R\downarrow0$ とすると

   $$
   C\downarrow0.
   $$

   完全に正確な直接観測を得れば、その時点の状態不確実性は消えます。
<!-- solution-end -->

## TSA6-B01 局所レベルモデルの定常 gain

- Level: B
- 目安時間: 30分

$$
X_t=X_{t-1}+W_t,
\qquad
Y_t=X_t+V_t
$$

で

$$
\operatorname{Var}(W_t)=q=1,
\qquad
\operatorname{Var}(V_t)=r=2
$$

とする。

1. 定常予測分散 $p_\ast$ を求めよ。
2. 定常 Kalman gain $K_\ast$ を求めよ。
3. $u,v\ge1$ に対して $|g(u)-g(v)|\le(4/9)|u-v|$ を直接示せ。
4. 初期予測分散 $p_1=0$ でも $p_t\to p_\ast$ となる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. 一般式から

   $$
   p_\ast
   =
   \frac{1+\sqrt{1+8}}2
   =
   \boxed{2}.
   $$

2.

   $$
   K_\ast
   =
   \frac{p_\ast}{p_\ast+r}
   =
   \frac2{2+2}
   =
   \boxed{\frac12}.
   $$

3. $u,v\ge1$ とすると

   $$
   \begin{aligned}
   |g(u)-g(v)|
   &=
   2\left|
   \frac{u}{u+2}-\frac{v}{v+2}
   \right|\\
   &=
   \frac{4|u-v|}{(u+2)(v+2)}\\
   &\le
   \frac49|u-v|.
   \end{aligned}
   $$

   従って区間 $[1,\infty)$ 上では一様な縮小率 $4/9$ を持ちます。

4. $p_1=0$ でも

   $$
   p_2=g(0)=1.
   $$

   したがって二回目以降は $[1,\infty)$ に入り、3 の縮小性を適用できます。不動点 $p_\ast=2$ との距離は反復ごとに高々 $4/9$ 倍となるため 0 へ収束します。
<!-- solution-end -->

## TSA6-B02 二時点のイノベーション尤度

- Level: B
- 目安時間: 30分

スカラー局所レベルモデル

$$
X_t=X_{t-1}+W_t,
\qquad
Y_t=X_t+V_t
$$

で

$$
X_0\sim N(0,1),
\qquad
\operatorname{Var}(W_t)=1,
\qquad
\operatorname{Var}(V_t)=1
$$

とする。$y_1=1$, $y_2=0$ を観測した。

1. $e_1,S_1,K_1,m_1,C_1$ を求めよ。
2. $e_2,S_2$ を求めよ。
3. 定数項を含む二時点の対数尤度を求めよ。

<!-- solution-start -->
### 詳細解答

1. 一時点目の予測は

   $$
   a_1=0,
   \qquad
   P_1=1+1=2.
   $$

   従って

   $$
   e_1=1-0=1,
   \qquad
   S_1=2+1=3.
   $$

   gain は

   $$
   K_1=\frac23.
   $$

   更新すると

   $$
   m_1
   =
   0+\frac23\cdot1
   =
   \frac23,
   $$

   $$
   C_1
   =
   2-\frac{2^2}{3}
   =
   \frac23.
   $$

2. 二時点目の予測は

   $$
   a_2=m_1=\frac23,
   $$

   $$
   P_2=C_1+1=\frac53.
   $$

   よって

   $$
   e_2
   =
   0-\frac23
   =
   -\frac23,
   $$

   $$
   S_2
   =
   \frac53+1
   =
   \frac83.
   $$

3. 観測次元は $m=1$ なので

   $$
   \ell_2
   =
   -\frac12
   \left[
   \log(2\pi)+\log3+\frac{1}{3}
   +
   \log(2\pi)+\log\frac83
   +
   \frac{(2/3)^2}{8/3}
   \right].
   $$

   最後の二次形式は

   $$
   \frac{4/9}{8/3}
   =
   \frac{4}{9}\frac38
   =
   \frac16.
   $$

   従って

   $$
   \boxed{
   \ell_2
   =
   -\frac12
   \left[
   2\log(2\pi)
   +
   \log 8
   +
   \frac12
   \right]
   }.
   $$
<!-- solution-end -->

## TSA6-B03 ARMA(1,1) を状態へ埋め込む

- Level: B
- 目安時間: 30分

$$
X_t=\phi X_{t-1}+Z_t+\theta Z_{t-1},
\qquad
Z_t\sim N(0,\sigma^2)
$$

とする。状態 $\xi_t=(X_t,Z_t)^{\mathsf T}$ を使う。

1. 状態遷移行列 $F$ と駆動ベクトル $G$ を求めよ。
2. システムノイズ共分散 $Q$ を求め、半正定値かつ特異であることを示せ。
3. 観測行列 $H$ を求めよ。
4. $Q$ が特異でも状態空間表現として問題がない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1.

   $$
   F
   =
   \begin{bmatrix}
   \phi&\theta\\
   0&0
   \end{bmatrix},
   \qquad
   G
   =
   \begin{bmatrix}
   1\\
   1
   \end{bmatrix}.
   $$

   実際、

   $$
   F\xi_{t-1}+GZ_t
   =
   \begin{bmatrix}
   \phi X_{t-1}+\theta Z_{t-1}+Z_t\\
   Z_t
   \end{bmatrix}
   =
   \xi_t.
   $$

2.

   $$
   Q
   =
   \operatorname{Var}(GZ_t)
   =
   \sigma^2GG^{\mathsf T}
   =
   \boxed{
   \sigma^2
   \begin{bmatrix}
   1&1\\
   1&1
   \end{bmatrix}
   }.
   $$

   任意の $z=(z_1,z_2)^{\mathsf T}$ に対し

   $$
   z^{\mathsf T}Qz
   =
   \sigma^2(z_1+z_2)^2
   \ge0
   $$

   なので $Q$ は半正定値です。また

   $$
   Q
   \begin{bmatrix}1\\-1\end{bmatrix}
   =
   \begin{bmatrix}0\\0\end{bmatrix}
   $$

   で非零ベクトルが核に入るため、$Q$ は特異です。

3.

   $$
   \boxed{
   H=\begin{bmatrix}1&0\end{bmatrix}
   }.
   $$

   これで $H\xi_t=X_t$ です。

4. 状態空間モデルのシステムノイズ共分散に必要なのは半正定値性であり、全方向へ独立な雑音が入ることではありません。この例では一つのスカラー雑音 $Z_t$ が二つの状態成分を同時に動かすため $Q$ が特異になりますが、生成機構は完全に定義されています。Kalman 更新で必要なのは観測イノベーション共分散 $S_t$ に逆行列が存在することです。
<!-- solution-end -->

## TSA6-C01 二状態を一つの観測で更新する

- Level: C
- 目安時間: 45分

状態は二次元、観測は一次元とし、

$$
F=I_2,\qquad
Q=0,\qquad
H=\begin{bmatrix}1&1\end{bmatrix},
\qquad
R=1.
$$

初期予測分布を

$$
X_1\mid\mathcal Y_0
\sim
N_2
\left(
\begin{bmatrix}0\\0\end{bmatrix},
I_2
\right)
$$

とする。観測は $y_1=2$, $y_2=1$ だった。

1. 一時点目の $S_1,K_1,m_1,C_1$ を求めよ。
2. 二時点目の予測 $a_2,P_2$ と $e_2,S_2,K_2$ を求めよ。
3. $m_2,C_2$ を求めよ。
4. $C_1,C_2$ の固有ベクトル $(1,-1)^{\mathsf T}$ の方向が観測によって縮まらない理由を説明せよ。
5. 二時点の対数尤度をイノベーション表示で書け。

<!-- solution-start -->
### 詳細解答

1. 一時点目は $a_1=(0,0)^{\mathsf T}$、$P_1=I_2$ です。

   $$
   S_1
   =
   HP_1H^{\mathsf T}+R
   =
   \begin{bmatrix}1&1\end{bmatrix}
   \begin{bmatrix}1&0\\0&1\end{bmatrix}
   \begin{bmatrix}1\\1\end{bmatrix}
   +1
   =
   3.
   $$

   よって

   $$
   K_1
   =
   P_1H^{\mathsf T}S_1^{-1}
   =
   \frac13
   \begin{bmatrix}1\\1\end{bmatrix}.
   $$

   $e_1=2$ なので

   $$
   m_1
   =
   \frac23
   \begin{bmatrix}1\\1\end{bmatrix}.
   $$

   共分散は

   $$
   \begin{aligned}
   C_1
   &=
   I_2
   -
   \frac13
   \begin{bmatrix}1\\1\end{bmatrix}
   \begin{bmatrix}1&1\end{bmatrix}\\
   &=
   \boxed{
   \begin{bmatrix}
   2/3&-1/3\\
   -1/3&2/3
   \end{bmatrix}
   }.
   \end{aligned}
   $$

2. $F=I_2,Q=0$ なので

   $$
   a_2=m_1
   =
   \begin{bmatrix}2/3\\2/3\end{bmatrix},
   \qquad
   P_2=C_1.
   $$

   観測予測は

   $$
   Ha_2=\frac43
   $$

   なので

   $$
   e_2
   =
   1-\frac43
   =
   -\frac13.
   $$

   次に

   $$
   HP_2H^{\mathsf T}
   =
   \begin{bmatrix}1&1\end{bmatrix}
   \begin{bmatrix}
   2/3&-1/3\\
   -1/3&2/3
   \end{bmatrix}
   \begin{bmatrix}1\\1\end{bmatrix}
   =
   \frac23.
   $$

   従って

   $$
   S_2=\frac23+1=\frac53.
   $$

   また

   $$
   P_2H^{\mathsf T}
   =
   \begin{bmatrix}1/3\\1/3\end{bmatrix}
   $$

   なので

   $$
   K_2
   =
   \begin{bmatrix}1/3\\1/3\end{bmatrix}
   \frac35
   =
   \boxed{
   \begin{bmatrix}1/5\\1/5\end{bmatrix}
   }.
   $$

3. 平均は

   $$
   \begin{aligned}
   m_2
   &=
   a_2+K_2e_2\\
   &=
   \begin{bmatrix}2/3\\2/3\end{bmatrix}
   -
   \frac1{15}
   \begin{bmatrix}1\\1\end{bmatrix}\\
   &=
   \boxed{
   \begin{bmatrix}3/5\\3/5\end{bmatrix}
   }.
   \end{aligned}
   $$

   共分散の減少項は

   $$
   K_2S_2K_2^{\mathsf T}
   =
   \frac53
   \frac1{25}
   \begin{bmatrix}1&1\\1&1\end{bmatrix}
   =
   \frac1{15}
   \begin{bmatrix}1&1\\1&1\end{bmatrix}.
   $$

   したがって

   $$
   \begin{aligned}
   C_2
   &=
   \begin{bmatrix}
   2/3&-1/3\\
   -1/3&2/3
   \end{bmatrix}
   -
   \frac1{15}
   \begin{bmatrix}1&1\\1&1\end{bmatrix}\\
   &=
   \boxed{
   \begin{bmatrix}
   3/5&-2/5\\
   -2/5&3/5
   \end{bmatrix}
   }.
   \end{aligned}
   $$

4. 観測は

   $$
   Hx=x_1+x_2
   $$

   しか見ません。一方

   $$
   H
   \begin{bmatrix}1\\-1\end{bmatrix}
   =0.
   $$

   したがって差の方向 $(1,-1)^{\mathsf T}$ は観測に全く現れません。実際

   $$
   C_1
   \begin{bmatrix}1\\-1\end{bmatrix}
   =
   \begin{bmatrix}1\\-1\end{bmatrix},
   $$

   $$
   C_2
   \begin{bmatrix}1\\-1\end{bmatrix}
   =
   \begin{bmatrix}1\\-1\end{bmatrix}.
   $$

   この方向の分散固有値は 1 のままです。観測可能な和の方向だけが縮みます。

5. $e_1=2,S_1=3$、$e_2=-1/3,S_2=5/3$ なので

   $$
   \boxed{
   \ell_2
   =
   -\frac12
   \left[
   2\log(2\pi)
   +
   \log3
   +
   \frac{4}{3}
   +
   \log\frac53
   +
   \frac{(1/3)^2}{5/3}
   \right]
   }.
   $$

   最後の項は

   $$
   \frac{1/9}{5/3}
   =
   \frac1{15}
   $$

   です。したがって必要なら

   $$
   \ell_2
   =
   -\frac12
   \left[
   2\log(2\pi)
   +
   \log5
   +
   \frac75
   \right]
   $$

   とまとめられます。
<!-- solution-end -->

---

## 10. 章のまとめ

本章の流れは次です。

$$
\boxed{
\text{線形正規状態空間モデル}
\to
\text{正規条件付け}
\to
\text{Kalman 再帰}
\to
\text{Riccati 再帰}
}
$$

そして観測側では

$$
\boxed{
Y_t
=
E[Y_t\mid\mathcal Y_{t-1}]
+
e_t
}
$$

と分解され、$(e_t)$ は直交し、正規分布仮定の下では独立になります。

このため

$$
\boxed{
\text{観測列}
\longleftrightarrow
\text{イノベーション列}
}
$$

という情報の置き換えができ、尤度もイノベーションごとの正規密度の積へ分解できます。

TSA1 の Hilbert 空間における抽象的予測と、有限次元状態モデルの逐次更新が TSA6 で同じイノベーション幾何として結び付きました。これで Encore IV の時系列主線は、予測・イノベーション表示・周波数領域・ARMA・依存極限定理・状態空間まで一周します。
