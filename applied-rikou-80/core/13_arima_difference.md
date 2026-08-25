# Core 13 ARIMA・差分・単位根

- 安定ID: `RIKOU-CORE-13`
- 80大問 No.: 27
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

$$
(1-B)X_t=(1+0.4B)\varepsilon_t,
\qquad \varepsilon_t\overset{\mathrm{iid}}\sim(0,\sigma^2)
$$

とする。$B$ は後退作用素である。

1. このモデルを ARIMA$(p,d,q)$ で表せ。
2. $X_t$ 自体が弱定常でない理由を説明せよ。
3. $Y_t=\Delta X_t$ の自己共分散 $\gamma_Y(0),\gamma_Y(1)$ と自己相関 $\rho_Y(1)$ を求めよ。
4. 時点 $t$ までの情報に $\varepsilon_t$ が含まれるとし、$h$ 期先予測値を求めよ。
5. $h$ 期先予測誤差分散を求めよ。

## 詳細解答

### 1. モデル次数

$$
\Delta X_t=X_t-X_{t-1}=\varepsilon_t+0.4\varepsilon_{t-1}
$$

なので差分系列は MA(1)。よって

$$
\boxed{\operatorname{ARIMA}(0,1,1)}.
$$

### 2. 非定常性

AR側に因子 $1-B$、すなわち単位根1を持つ。差分を累積するとショックの効果が水準に永久に残るため、$X_t$ の分散は時点とともに増加し一定にならない。

### 3. 差分系列

$Y_t=\varepsilon_t+0.4\varepsilon_{t-1}$ だから

$$
\gamma_Y(0)=(1+0.4^2)\sigma^2=1.16\sigma^2,
$$

$$
\gamma_Y(1)=0.4\sigma^2,
$$

$$
\rho_Y(1)=\frac{0.4}{1.16}=\frac{10}{29}\approx0.345.
$$

$|h|\ge2$ では $\gamma_Y(h)=0$。

### 4. 予測

$$
X_{t+1}=X_t+\varepsilon_{t+1}+0.4\varepsilon_t.
$$

したがって

$$
\hat X_{t+1|t}=X_t+0.4\varepsilon_t.
$$

2期目以降の将来差分の条件付き期待値は0なので

$$
\boxed{\hat X_{t+h|t}=X_t+0.4\varepsilon_t\quad(h\ge1)}.
$$

### 5. 予測誤差分散

$h=1$ では誤差は $\varepsilon_{t+1}$ なので $\sigma^2$。

$h\ge2$ では

$$
X_{t+h}-\hat X_{t+h|t}
=1.4\sum_{j=1}^{h-1}\varepsilon_{t+j}+\varepsilon_{t+h}.
$$

したがって

$$
\boxed{V_h=\{1+1.4^2(h-1)\}\sigma^2\quad(h\ge2)}.
$$

## 本番答案

$\Delta X_t=\varepsilon_t+0.4\varepsilon_{t-1}$ より ARIMA$(0,1,1)$。$1-B$ が単位根を与えるため $X_t$ は非定常。

$$
\gamma_Y(0)=1.16\sigma^2,
\quad
\gamma_Y(1)=0.4\sigma^2,
\quad
\rho_Y(1)=10/29.
$$

また

$$
\hat X_{t+h|t}=X_t+0.4\varepsilon_t,
$$

$$
V_1=\sigma^2,
\qquad
V_h=\{1+1.96(h-1)\}\sigma^2\quad(h\ge2).
$$

## 採点基準

- ARIMA次数と単位根: 5点
- 差分系列自己相関関数: 5点
- 予測値: 5点
- 予測誤差分散: 5点

25分経過時は(5)の展開を短縮し、予測値と $V_1$ までは必ず取る。
