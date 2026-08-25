# Core 37 属性管理図 $p,np,c,u$

- 安定ID: `RIKOU-CORE-37`
- 80大問 No.: 58
- 演習価値: A
- 難度: B
- 目安時間: 25分

## 問題

1. 各群 $n=200$ 個を検査し、平均不良率 $\bar p=0.05$ を得た。$p$ 管理図の3シグマ限界を求めよ。
2. 同じ条件で $np$ 管理図の限界を求めよ。
3. 1単位当たりの欠点数ではなく、検査単位ごとの欠点総数を一定面積で数え、平均欠点数 $\bar c=4$ を得た。$c$ 管理図の限界を求めよ。
4. 検査量が群ごとに異なるとき $u$ 管理図を使う理由と、その群 $i$ の限界式を述べよ。

平方根の小数化は任意とし、正しい厳密式まででよい。

## 詳細解答

### 1. $p$ 管理図を二項分布から導く

1群で不良品数を $X$ とする。各製品が独立に不良確率 $p$ を持つと仮定すれば

$$
X\sim\operatorname{Binomial}(n,p).
$$

不良率は

$$
\hat p=\frac Xn.
$$

二項分布の平均・分散

$$
E[X]=np,
\qquad
\operatorname{Var}(X)=np(1-p)
$$

から

$$
E[\hat p]
=\frac1nE[X]
=p,
$$

$$
\begin{aligned}
\operatorname{Var}(\hat p)
&=\frac1{n^2}\operatorname{Var}(X)\\
&=\frac{p(1-p)}n.
\end{aligned}
$$

したがって標準偏差は

$$
\sqrt{\frac{p(1-p)}n}.
$$

管理状態の $p$ は未知なので、実際の管理限界では過去データからの平均不良率 $\bar p$ で置き換える。3シグマ限界は

$$
CL_p=\bar p,
$$

$$
UCL_p=\bar p+3\sqrt{\frac{\bar p(1-\bar p)}n},
$$

$$
LCL_p=\max\left(0,\bar p-3\sqrt{\frac{\bar p(1-\bar p)}n}\right).
$$

本問では

$$
\boxed{
LCL_p=0.05-3\sqrt{0.05\cdot0.95/200}
},
$$

$$
\boxed{
UCL_p=0.05+3\sqrt{0.05\cdot0.95/200}
}.
$$

ここでは下限が正なので $\max(0,\cdot)$ の切り詰めは不要である。

参考として

$$
\sqrt{0.05\cdot0.95/200}\approx0.01541
$$

だから

$$
LCL_p\approx0.0038,
\qquad
UCL_p\approx0.0962.
$$

### 2. $np$ 管理図を同じ二項分布から導く

$np$ 管理図で監視するのは割合ではなく不良品数 $X$ 自体である。

二項分布より

$$
E[X]=np,
\qquad
\operatorname{Var}(X)=np(1-p).
$$

したがって管理限界は

$$
CL_{np}=n\bar p,
$$

$$
UCL_{np}=n\bar p+3\sqrt{n\bar p(1-\bar p)},
$$

$$
LCL_{np}=\max\left(0,n\bar p-3\sqrt{n\bar p(1-\bar p)}\right).
$$

$n=200,\bar p=0.05$ なので

$$
n\bar p=10,
$$

$$
n\bar p(1-\bar p)
=200\cdot0.05\cdot0.95=9.5.
$$

従って

$$
\boxed{LCL_{np}=10-3\sqrt{9.5}},
\qquad
\boxed{UCL_{np}=10+3\sqrt{9.5}}.
$$

小数化すれば約 $0.75,19.25$。不良品数は整数なので、実務上の判定では整数値との対応を考える。

### 3. $c$ 管理図をPoisson分布から導く

一定面積・一定検査機会の中で欠点数を数えるとき、管理状態の欠点数 $C$ を

$$
C\sim\operatorname{Poisson}(c)
$$

とモデル化する。

Poisson分布では

$$
E[C]=c,
\qquad
\operatorname{Var}(C)=c.
$$

したがって標準偏差は

$$
\sqrt c.
$$

未知の $c$ を平均欠点数 $\bar c$ で置き換えると

$$
CL_c=\bar c,
$$

$$
UCL_c=\bar c+3\sqrt{\bar c},
$$

$$
LCL_c=\max(0,\bar c-3\sqrt{\bar c}).
$$

本問では $\bar c=4$ だから

$$
\sqrt{\bar c}=2,
$$

$$
LCL_c=\max(0,4-6)=0,
$$

$$
UCL_c=4+6=10.
$$

従って

$$
\boxed{CL_c=4,\quad LCL_c=0,\quad UCL_c=10}.
$$

### 4. $u$ 管理図を検査量の異なるPoisson分布から導く

群 $i$ の検査量を $n_i$、その群の総欠点数を $C_i$、単位当たり平均欠点数を $u$ とする。

検査量が $n_i$ 倍になれば期待欠点数も $n_i$ 倍になるので

$$
C_i\sim\operatorname{Poisson}(n_i u)
$$

とモデル化する。

監視する単位当たり欠点数は

$$
u_i=\frac{C_i}{n_i}.
$$

平均は

$$
E[u_i]
=\frac1{n_i}E[C_i]
=u.
$$

分散は

$$
\begin{aligned}
\operatorname{Var}(u_i)
&=\frac1{n_i^2}\operatorname{Var}(C_i)\\
&=\frac1{n_i^2}(n_i u)\\
&=\frac u{n_i}.
\end{aligned}
$$

したがって標準偏差は

$$
\sqrt{\frac u{n_i}}.
$$

未知の $u$ を過去データの全体平均 $\bar u$ で置き換えると

$$
CL=\bar u,
$$

$$
\boxed{
UCL_i=\bar u+3\sqrt{\frac{\bar u}{n_i}}
},
$$

$$
\boxed{
LCL_i=\max\left(0,\bar u-3\sqrt{\frac{\bar u}{n_i}}\right)
}.
$$

検査量が小さい群では分散 $\bar u/n_i$ が大きいため管理限界が広く、検査量が大きい群では狭くなる。これが、検査量の異なる群で総欠点数 $C_i$ をそのまま比較してはいけない理由である。

## 本番答案

不良品数 $X\sim\operatorname{Binomial}(n,p)$ なので

$$
\operatorname{Var}(X/n)=\frac{p(1-p)}n.
$$

従って

$$
p\text{図}:\quad
\bar p\pm3\sqrt{\bar p(1-\bar p)/n},
$$

本問では

$$
0.05\pm3\sqrt{0.05\cdot0.95/200}.
$$

また $X$ 自体の分散は $np(1-p)$ なので

$$
np\text{図}:\quad
10\pm3\sqrt{9.5}.
$$

一定検査量の欠点数 $C\sim\operatorname{Poisson}(c)$ では平均=分散=$c$ だから、$c$ 図は

$$
4\pm3\sqrt4
$$

で $[0,10]$。

検査量 $n_i$ が異なる場合は

$$
C_i\sim\operatorname{Poisson}(n_i u),
\qquad
u_i=C_i/n_i,
$$

より

$$
\operatorname{Var}(u_i)=u/n_i.
$$

従って $u$ 図の限界は

$$
\bar u\pm3\sqrt{\bar u/n_i}
$$

である。

## 採点基準

- (1) 二項分布から $\operatorname{Var}(\hat p)$ を導き $p$ 図の限界を計算: 6点
- (2) 不良品数の平均・分散から $np$ 図を導出: 5点
- (3) Poisson分布の平均=分散から $c$ 図を導出: 4点
- (4) $C_i\sim\operatorname{Poisson}(n_i u)$ から $\operatorname{Var}(u_i)=u/n_i$ を導き $u$ 図を説明: 5点

平方根の小数化は採点対象にせず、正しい式までで満点とする。

25分経過時は「不良品数は二項分布、欠点数はPoisson分布」から平均・分散を作り、3シグマ限界へ進む。