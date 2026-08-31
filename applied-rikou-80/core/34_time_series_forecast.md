# Core 34 自己回帰過程 AR(2) の多期先予測・予測誤差分散

- 安定ID: `RIKOU-CORE-34`
- 80大問 No.: 28
- 演習価値: A
- 難度: A
- 目安時間: 20〜25分
- 電卓: 四則演算のみで完結

## 前提・記号

自己回帰過程と多期先予測の一般事項は [E2-03 自己回帰過程・移動平均過程・ARIMA過程](../../textbook/volumes/05_engineering/E2_03_ar_ma_arima時系列/index.md) を前提とする。

時点 $t$ までの情報を $\mathcal F_t$ とし、

$$
\hat X_{t+h|t}=E(X_{t+h}\mid\mathcal F_t)
$$

と書く。

## 問題

自己回帰過程

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t,
\qquad \varepsilon_t\overset{\mathrm{iid}}\sim(0,1)
$$

を考える。$X_t=2$, $X_{t-1}=1$ が観測されている。

1. 1期先予測 $\hat X_{t+1|t}$ を求めよ。
2. 2期先予測 $\hat X_{t+2|t}$ を求めよ。
3. 1期先、2期先の予測誤差を将来イノベーションで表し、それぞれの分散を求めよ。
4. 3期先予測 $\hat X_{t+3|t}$ を求めよ。
5. 3期先予測誤差を将来イノベーションで表し、その分散を求めよ。
6. このAR(2)過程を

$$
X_t=\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
$$

と表すとき、$\psi_j$ の漸化式を元のAR式から導け。それを用いて一般の $h$ 期先予測誤差分散を表し、多期先予測が平均0へ収束する理由も説明せよ。

## 詳細解答

### 1. 1期先予測

未来のイノベーションは平均0なので

$$
E(\varepsilon_{t+1}\mid\mathcal F_t)=0.
$$

したがって

$$
\begin{aligned}
\hat X_{t+1|t}
&=0.5X_t+0.2X_{t-1}\\
&=0.5(2)+0.2(1)\\
&=\boxed{1.2}.
\end{aligned}
$$

### 2. 2期先予測

$$
X_{t+2}=0.5X_{t+1}+0.2X_t+\varepsilon_{t+2}
$$

より

$$
\begin{aligned}
\hat X_{t+2|t}
&=0.5\hat X_{t+1|t}+0.2X_t\\
&=0.5(1.2)+0.2(2)\\
&=\boxed{1.0}.
\end{aligned}
$$

### 3. 1期先・2期先の予測誤差

1期先では

$$
\boxed{
e_1=X_{t+1}-\hat X_{t+1|t}=\varepsilon_{t+1}
},
\qquad
\boxed{V_1=1}.
$$

2期先では

$$
\begin{aligned}
e_2
&=0.5e_1+\varepsilon_{t+2}\\
&=0.5\varepsilon_{t+1}+\varepsilon_{t+2},
\end{aligned}
$$

したがって

$$
\boxed{V_2=0.5^2+1=1.25}.
$$

### 4. 3期先予測

$$
\begin{aligned}
\hat X_{t+3|t}
&=0.5\hat X_{t+2|t}+0.2\hat X_{t+1|t}\\
&=0.5(1.0)+0.2(1.2)\\
&=\boxed{0.74}.
\end{aligned}
$$

### 5. 3期先予測誤差

$$
e_3=0.5e_2+0.2e_1+\varepsilon_{t+3}.
$$

よって

$$
\boxed{
e_3=0.45\varepsilon_{t+1}
+0.5\varepsilon_{t+2}
+\varepsilon_{t+3}
}.
$$

独立性から

$$
\boxed{
V_3=0.45^2+0.5^2+1=1.4525
}.
$$

### 6. 一般の多期先予測誤差分散

因果的なAR(2)過程を

$$
X_t
=\psi_0\varepsilon_t
+\psi_1\varepsilon_{t-1}
+\psi_2\varepsilon_{t-2}
+\cdots
$$

と表し、元の式

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$

へ代入して係数比較する。

$\varepsilon_t$ の係数から

$$
\boxed{\psi_0=1},
$$

$\varepsilon_{t-1}$ の係数から

$$
\boxed{\psi_1=0.5},
$$

一般に $j\ge2$ で

$$
\boxed{
\psi_j=0.5\psi_{j-1}+0.2\psi_{j-2}
}.
$$

したがって

$$
\boxed{
X_{t+h}-\hat X_{t+h|t}
=\sum_{j=0}^{h-1}\psi_j\varepsilon_{t+h-j}
}.
$$

イノベーション分散を一般に $\sigma_\varepsilon^2$ とすれば

$$
\boxed{
V_h
=\sigma_\varepsilon^2
\sum_{j=0}^{h-1}\psi_j^2
}.
$$

本問では $\sigma_\varepsilon^2=1$ であり、$h=3$ とすれば

$$
1^2+0.5^2+0.45^2=1.4525
$$

となる。

また予測値 $m_h=\hat X_{t+h|t}$ は

$$
m_h=0.5m_{h-1}+0.2m_{h-2}
$$

に従う。特性方程式

$$
r^2-0.5r-0.2=0
$$

の2根はともに絶対値1未満なので、初期観測の影響は減衰し

$$
\boxed{\hat X_{t+h|t}\to0}.
$$

0は本問の無条件平均である。

## 本番答案

$$
\hat X_{t+1|t}=1.2,
\qquad
\hat X_{t+2|t}=1.0,
\qquad
\hat X_{t+3|t}=0.74.
$$

予測誤差は

$$
e_1=\varepsilon_{t+1},
$$

$$
e_2=0.5\varepsilon_{t+1}+\varepsilon_{t+2},
$$

$$
e_3=0.45\varepsilon_{t+1}+0.5\varepsilon_{t+2}+\varepsilon_{t+3},
$$

だから

$$
V_1=1,
\quad
V_2=1.25,
\quad
V_3=1.4525.
$$

また

$$
\psi_0=1,
\qquad
\psi_1=0.5,
\qquad
\psi_j=0.5\psi_{j-1}+0.2\psi_{j-2}\quad(j\ge2),
$$

したがって

$$
V_h=\sum_{j=0}^{h-1}\psi_j^2.
$$

予測値の同次漸化式の根は単位円内にあるので $\hat X_{t+h|t}\to0$。

## 採点基準

- 1期先・2期先予測: 4点
- 1期先・2期先予測誤差分散: 4点
- 3期先予測・予測誤差分散: 4点
- $\psi_j$ の漸化式: 4点
- 一般の予測誤差分散・長期予測: 4点

20分経過時は、未来イノベーションを0にして予測を再帰計算し、予測誤差は未知の将来イノベーションだけを残す。