# Core 13 ARIMA過程・差分・単位根

- 安定ID: `RIKOU-CORE-13`
- 80大問 No.: 27
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 前提・記号

ARIMA過程、差分、後退作用素の一般事項は [E2-03 自己回帰過程・移動平均過程・ARIMA過程](../../textbook/volumes/05_engineering/E2_03_ar_ma_arima時系列/index.md) を前提とする。

本問では後退作用素を

$$
BX_t=X_{t-1},
$$

1階差分を

$$
\Delta X_t=(1-B)X_t=X_t-X_{t-1}
$$

と書く。

## 問題

ある工程指標の水準 $X_t$ について、1階差分が

$$
\boxed{
X_t-X_{t-1}
=\varepsilon_t+0.4\varepsilon_{t-1}
}
$$

を満たすとする。ここで $\{\varepsilon_t\}$ は平均0、分散 $\sigma^2$ の独立同一分布な白色雑音である。

同じ式を後退作用素で書けば

$$
(1-B)X_t=(1+0.4B)\varepsilon_t
$$

である。

1. この過程を ARIMA$(p,d,q)$ で表せ。
2. $Y_t=\Delta X_t$ と置く。$X_t$ を $X_0$ と $Y_1,\ldots,Y_t$ の和で表し、$X_t$ 自体が弱定常でない理由を分散から説明せよ。さらに「単位根」と $1-B$ の関係を説明せよ。
3. 差分系列 $Y_t$ の自己共分散 $\gamma_Y(0),\gamma_Y(1)$ と自己相関 $\rho_Y(1)$ を求めよ。$|h|\ge2$ の自己共分散も答えよ。
4. 時点 $t$ までの情報に $X_t$ と $\varepsilon_t$ が含まれるとする。1期先、2期先を実際に展開してから、一般の $h$ 期先予測値を求めよ。
5. $h$ 期先予測誤差を将来の $\varepsilon$ で表し、その分散を求めよ。予測期間が長くなると分散がどう変化するか説明せよ。

## 詳細解答

### 1. ARIMA次数

$$
\Delta X_t
=\varepsilon_t+0.4\varepsilon_{t-1}
$$

より、1回差分後が移動平均過程 MA(1) である。したがって

$$
\boxed{\operatorname{ARIMA}(0,1,1)}.
$$

### 2. 水準系列が非定常である理由

$$
Y_t=\Delta X_t=X_t-X_{t-1}
$$

だから

$$
X_t=X_0+\sum_{j=1}^tY_j.
$$

本問では

$$
Y_j=\varepsilon_j+0.4\varepsilon_{j-1}
$$

なので

$$
\begin{aligned}
X_t-X_0
&=\sum_{j=1}^t\varepsilon_j
+0.4\sum_{j=1}^t\varepsilon_{j-1}\\
&=0.4\varepsilon_0
+1.4\sum_{j=1}^{t-1}\varepsilon_j
+\varepsilon_t.
\end{aligned}
$$

$X_0$ を固定値とみなすと

$$
\begin{aligned}
\operatorname{Var}(X_t)
&=0.4^2\sigma^2
+1.4^2(t-1)\sigma^2
+\sigma^2\\
&=\sigma^2\{0.16+1.96(t-1)+1\}.
\end{aligned}
$$

分散が $t$ に依存するため

$$
\boxed{X_t\text{ は弱定常ではない}}.
$$

作用素表示の左辺は $(1-B)X_t$ であり、多項式 $1-z$ は $z=1$ を根に持つ。したがって水準系列は単位根を1つ持ち、1回差分すると定常な MA(1) になる。

### 3. 差分系列の自己共分散

$$
Y_t=\varepsilon_t+0.4\varepsilon_{t-1}.
$$

独立性から

$$
\boxed{
\gamma_Y(0)=\operatorname{Var}(Y_t)=1.16\sigma^2
}.
$$

また

$$
Y_{t-1}=\varepsilon_{t-1}+0.4\varepsilon_{t-2}
$$

であり、両式が共有する白色雑音は $\varepsilon_{t-1}$ だけなので

$$
\boxed{
\gamma_Y(1)=0.4\sigma^2
}.
$$

よって

$$
\boxed{
\rho_Y(1)=\frac{0.4}{1.16}=\frac{10}{29}
}.
$$

$|h|\ge2$ では共通の白色雑音を含まないため

$$
\boxed{
\gamma_Y(h)=0,
\qquad |h|\ge2
}.
$$

### 4. $h$ 期先予測

元の差分式から

$$
X_{t+1}
=X_t+\varepsilon_{t+1}+0.4\varepsilon_t.
$$

時点 $t$ で $X_t,\varepsilon_t$ は既知、将来ショックは平均0なので

$$
\boxed{
\widehat X_{t+1|t}=X_t+0.4\varepsilon_t
}.
$$

2期先は

$$
\begin{aligned}
X_{t+2}
&=X_{t+1}+\varepsilon_{t+2}+0.4\varepsilon_{t+1}\\
&=X_t+0.4\varepsilon_t
+1.4\varepsilon_{t+1}
+\varepsilon_{t+2}.
\end{aligned}
$$

したがって

$$
\widehat X_{t+2|t}=X_t+0.4\varepsilon_t.
$$

同様に

$$
\boxed{
\widehat X_{t+h|t}=X_t+0.4\varepsilon_t,
\qquad h\ge1
}.
$$

### 5. 予測誤差分散

1期先では

$$
X_{t+1}-\widehat X_{t+1|t}=\varepsilon_{t+1},
$$

したがって $V_1=\sigma^2$。

一般に

$$
\boxed{
X_{t+h}-\widehat X_{t+h|t}
=1.4\sum_{j=1}^{h-1}\varepsilon_{t+j}
+\varepsilon_{t+h}
}
$$

なので、独立性から

$$
\boxed{
V_h
=\{1+1.96(h-1)\}\sigma^2,
\qquad h\ge1
}.
$$

予測期間 $h$ が長くなるほど未知の将来ショックが水準へ累積するため、予測誤差分散は $h$ に対して線形に増える。

## 本番答案

$$
\Delta X_t
=\varepsilon_t+0.4\varepsilon_{t-1}
$$

なので、1回差分後がMA(1)。従って

$$
\boxed{ARIMA(0,1,1)}.
$$

また

$$
X_t-X_0
=0.4\varepsilon_0
+1.4\sum_{j=1}^{t-1}\varepsilon_j
+\varepsilon_t,
$$

従って

$$
\operatorname{Var}(X_t)
=\sigma^2\{0.16+1.96(t-1)+1\}
$$

は $t$ に依存し、$X_t$ は弱定常でない。作用素表示の $1-B$ は単位根を表す。

差分系列 $Y_t$ について

$$
\gamma_Y(0)=1.16\sigma^2,
\qquad
\gamma_Y(1)=0.4\sigma^2,
$$

$$
\rho_Y(1)=10/29,
\qquad
\gamma_Y(h)=0\ (|h|\ge2).
$$

予測値は

$$
\widehat X_{t+h|t}=X_t+0.4\varepsilon_t,
$$

予測誤差分散は

$$
\boxed{
V_h=\{1+1.96(h-1)\}\sigma^2
}.
$$

## 採点基準

- ARIMA次数: 3点
- 非定常性・単位根の説明: 5点
- 差分系列の自己共分散・自己相関: 4点
- 予測値: 4点
- 予測誤差分散と解釈: 4点

30分経過時は、差分後の MA(1) の計算と予測誤差分散を優先する。