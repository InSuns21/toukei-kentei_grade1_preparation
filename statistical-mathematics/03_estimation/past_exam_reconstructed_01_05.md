# 推定分野 過去問型再構成演習 1位〜5位

このファイルは、統計検定1級「統計数理」の過去問テーマ一覧と公開解説をもとに、推定分野の演習価値ランキング1位〜5位を独自の設定・文章で再構成した演習集である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 記号・設問順・補助設問は学習用に独自化している。
- 確度は `third_party_topic_index` とし、公式問題集を直接照合した `official_problem` ではない。
- 公開解説は出題構造の確認にのみ用い、数式・結論は独立に再計算している。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 演習価値の評価基準

順位は次の観点を重視した。

1. 統計検定1級で繰り返し使う推定理論の中核を含むか。
2. 1題で複数の重要技法を横断できるか。
3. 他の分布・推定問題へ転用しやすいか。
4. 「台が母数に依存する」など、定石が破れる重要な例外を含むか。
5. 解き直すたびに理解が深まる構造を持つか。

## 対象ランキング

| 順位 | 参照年・問 | 主題 | 元難度 | 再構成Level | 目安時間 | 主な使用技術 |
|---:|---|---|:---:|:---:|---:|---|
| 1 | 2012 問3 | Fisher情報量とDelta法 | A | C | 25分 | MLE、Fisher情報量、CLT、Delta法、漸近効率 |
| 2 | 2019 問3 | 一様分布と完備十分統計量 | B | C | 25分 | 因子分解定理、最大順序統計量、完備性、Lehmann–Scheffe |
| 3 | 2016 問1 | 正規分布とCramér–Rao下限 | B | C | 再母数化MLE、不偏化、Fisher情報量、Cramér–Rao、漸近効率 |
| 4 | 2024 問3 | 二項モデルの推定 | B | C | 十分性、MLE、MSE、二乗誤差最小化、縮小推定 |
| 5 | 2024 問2 | 半径分布から母数推定 | C | C | CDF、最大順序統計量、非正則MLE、不偏化、推定量比較 |

---

## 1位: 2012 問3型 Fisher情報量とDelta法でMLEの漸近効率を示す

- 安定ID: `RECON-EST-R01-2012-Q3`
- 参照: 2012年 問3
- 確度: `third_party_topic_index`
- 確認元: Academaid「2012年統計検定1級＜数理統計問3＞」
- 元主題: Fisher情報量、Delta法
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 最尤推定、Gamma分布、Fisher情報量、中心極限定理、Delta法、漸近効率
- 変更点: 指数分布の率母数を明示し、MLEの有限標本バイアスと不偏化まで接続した。

### 問題

$X_1,\ldots,X_n$ は独立に率母数 $\lambda>0$ の指数分布

$$
f(x\mid\lambda)=\lambda e^{-\lambda x},
\qquad x\ge0
$$

に従うとする。標本平均を

$$
\overline X=\frac1n\sum_{i=1}^nX_i
$$

とする。

1. $\lambda$ の最尤推定量 $\widehat\lambda_{\mathrm{ML}}$ を求めよ。
2. 標本全体が持つFisher情報量 $I_n(\lambda)$ を求めよ。
3. 中心極限定理とDelta法を用いて

$$
\sqrt n\left(\widehat\lambda_{\mathrm{ML}}-\lambda\right)
$$

の極限分布を求めよ。
4. 前問の漸近分散と $I_n(\lambda)^{-1}$ を比較し、MLEの漸近効率について述べよ。
5. $T=\sum_{i=1}^nX_i$ とする。$T\sim\operatorname{Gamma}(n,\lambda)$（shape $n$、rate $\lambda$）であり、$n>2$ のとき

$$
E[T^{-1}]=\frac{\lambda}{n-1},
\qquad
E[T^{-2}]=\frac{\lambda^2}{(n-1)(n-2)}
$$

を用いてよい。$\widehat\lambda_{\mathrm{ML}}$ のバイアスを求め、不偏推定量を1つ構成せよ。

### 解答

#### 1. 最尤推定量

尤度関数は

$$
\begin{aligned}
L(\lambda)
&=\prod_{i=1}^n\lambda e^{-\lambda x_i}\\
&=\lambda^n\exp\left(-\lambda\sum_{i=1}^nx_i\right).
\end{aligned}
$$

対数尤度は

$$
\ell(\lambda)
=n\log\lambda-\lambda\sum_{i=1}^nx_i.
$$

したがって

$$
\frac{d\ell}{d\lambda}
=\frac n\lambda-\sum_{i=1}^nx_i.
$$

これを $0$ とおくと

$$
\widehat\lambda_{\mathrm{ML}}
=\frac{n}{\sum_{i=1}^nX_i}
=\frac1{\overline X}.
$$

また

$$
\frac{d^2\ell}{d\lambda^2}
=-\frac n{\lambda^2}<0
$$

なので極大点である。

よって

$$
\boxed{
\widehat\lambda_{\mathrm{ML}}=\frac1{\overline X}
}.
$$

#### 2. Fisher情報量

標本全体の対数尤度の2階微分は

$$
\frac{\partial^2\ell}{\partial\lambda^2}
=-\frac n{\lambda^2}.
$$

したがって

$$
\begin{aligned}
I_n(\lambda)
&=-E_\lambda\left[
\frac{\partial^2\ell}{\partial\lambda^2}
\right]\\
&=\frac n{\lambda^2}.
\end{aligned}
$$

よって

$$
\boxed{
I_n(\lambda)=\frac n{\lambda^2}
},
\qquad
\boxed{
I_n(\lambda)^{-1}=\frac{\lambda^2}{n}
}.
$$

#### 3. Delta法による漸近分布

指数分布では

$$
E[X_i]=\frac1\lambda,
\qquad
\operatorname{Var}(X_i)=\frac1{\lambda^2}.
$$

中心極限定理より

$$
\sqrt n\left(
\overline X-\frac1\lambda
\right)
\xrightarrow{d}
N\left(0,\frac1{\lambda^2}\right).
$$

ここで

$$
g(x)=\frac1x
$$

とおけば

$$
\widehat\lambda_{\mathrm{ML}}=g(\overline X).
$$

導関数は

$$
g'(x)=-\frac1{x^2}
$$

なので

$$
g'\left(\frac1\lambda\right)
=-\lambda^2.
$$

Delta法より

$$
\sqrt n\left(
\frac1{\overline X}-\lambda
\right)
\xrightarrow{d}
N\left(
0,
\left(-\lambda^2\right)^2\frac1{\lambda^2}
\right).
$$

したがって

$$
\boxed{
\sqrt n\left(
\widehat\lambda_{\mathrm{ML}}-\lambda
\right)
\xrightarrow{d}
N(0,\lambda^2)
}.
$$

同値に、大標本で

$$
\widehat\lambda_{\mathrm{ML}}
\approx
N\left(\lambda,\frac{\lambda^2}{n}\right).
$$

#### 4. Fisher情報量との比較

前問からMLEの漸近分散は

$$
\frac{\lambda^2}{n}.
$$

一方

$$
I_n(\lambda)^{-1}
=\frac{\lambda^2}{n}.
$$

よって両者は一致する。

$$
\boxed{
\operatorname{Avar}(\widehat\lambda_{\mathrm{ML}})
=I_n(\lambda)^{-1}
}.
$$

したがって、このモデルのMLEは漸近的にFisher情報量の逆数まで分散を下げる。

$$
\boxed{
\widehat\lambda_{\mathrm{ML}}
\text{ は漸近効率的である}
}.
$$

#### 5. 有限標本バイアスと不偏化

$T=\sum X_i$ とすると

$$
\widehat\lambda_{\mathrm{ML}}=\frac nT.
$$

したがって

$$
\begin{aligned}
E[\widehat\lambda_{\mathrm{ML}}]
&=nE[T^{-1}]\\
&=n\frac{\lambda}{n-1}\\
&=\frac n{n-1}\lambda.
\end{aligned}
$$

よってバイアスは

$$
\begin{aligned}
\operatorname{Bias}(\widehat\lambda_{\mathrm{ML}})
&=\frac n{n-1}\lambda-\lambda\\
&=\frac{\lambda}{n-1}.
\end{aligned}
$$

すなわち上方バイアスを持つ。

そこで

$$
\widetilde\lambda
=\frac{n-1}{n}\widehat\lambda_{\mathrm{ML}}
=\frac{n-1}{T}
$$

とおけば

$$
E[\widetilde\lambda]
=(n-1)\frac{\lambda}{n-1}
=\lambda.
$$

したがって

$$
\boxed{
\widetilde\lambda=\frac{n-1}{\sum_{i=1}^nX_i}
}
$$

は不偏推定量である。

さらに $n>2$ なら

$$
\begin{aligned}
\operatorname{Var}(\widetilde\lambda)
&=(n-1)^2E[T^{-2}]-\lambda^2\\
&=(n-1)^2\frac{\lambda^2}{(n-1)(n-2)}-\lambda^2\\
&=\frac{\lambda^2}{n-2}.
\end{aligned}
$$

有限標本ではCramér–Rao下限 $\lambda^2/n$ より大きいが、

$$
\frac{\lambda^2/(n-2)}{\lambda^2/n}
=\frac n{n-2}	o1
$$

なので、こちらも漸近的には効率的である。

### 本番答案

$$
L(\lambda)
=\lambda^n e^{-\lambda\sum X_i}
$$

より

$$
\widehat\lambda_{\mathrm{ML}}
=\frac n{\sum X_i}
=\frac1{\overline X}.
$$

また

$$
I_n(\lambda)
=-E\left[\ell''(\lambda)\right]
=\frac n{\lambda^2}.
$$

指数分布の平均・分散は $1/\lambda,1/\lambda^2$ なので

$$
\sqrt n\left(\overline X-\frac1\lambda\right)
\xrightarrow{d}
N\left(0,\frac1{\lambda^2}\right).
$$

$g(x)=1/x$ にDelta法を用いると

$$
\sqrt n(\widehat\lambda_{\mathrm{ML}}-\lambda)
\xrightarrow{d}N(0,\lambda^2).
$$

したがって漸近分散は $\lambda^2/n=I_n(\lambda)^{-1}$ であり、MLEは漸近効率的である。

### 25分経過時の打ち切り判断

Delta法まで到達できていれば十分に得点源。有限標本バイアスの計算が重い場合は、$E[T^{-1}]$ を代入して不偏化の係数だけ確実に取る。

### 採点基準（20点目安）

- MLE導出: 4点
- Fisher情報量: 4点
- CLTとDelta法: 6点
- 漸近効率の判定: 3点
- バイアスと不偏化: 3点

### 持ち帰るパターン

- $\widehat\theta=g(\overline X)$ 型のMLEはDelta法の最重要対象。
- Fisher情報量の逆数とMLEの漸近分散が一致するかを必ず確認する。
- MLEは有限標本で不偏とは限らない。
- 「有限標本ではバイアスあり、漸近的には効率的」は頻出の組合せ。

---

## 2位: 2019 問3型 一様分布の最大値から完備十分統計量とUMVUを作る

- 安定ID: `RECON-EST-R02-2019-Q3`
- 参照: 2019年 問3
- 確度: `third_party_topic_index`
- 確認元: Academaid「2019年統計検定1級＜数理統計問3＞」
- 元主題: 一様分布、完備十分統計量
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: Fisher–Neyman因子分解定理、最大順序統計量、完備性、Lehmann–Scheffe定理、UMVU
- 変更点: 完備十分性の証明から不偏推定量のUMVU性、標本平均型推定量との分散比較まで接続した。

### 問題

$X_1,\ldots,X_n$ は独立に一様分布

$$
X_i\sim U(0,\theta),
\qquad \theta>0
$$

に従うとする。最大順序統計量を

$$
M=X_{(n)}=\max(X_1,\ldots,X_n)
$$

とする。

1. Fisher–Neymanの因子分解定理を用いて、$M$ が $\theta$ の十分統計量であることを示せ。
2. $M$ の累積分布関数と確率密度関数を求めよ。
3. $M$ が完備統計量であることを示せ。
4. $M$ の関数として $\theta$ の不偏推定量を構成せよ。
5. 前問の推定量がUMVU推定量であることを示し、その分散を求めよ。
6. $2\overline X$ も $\theta$ の不偏推定量である。$n>1$ として、前問のUMVU推定量と分散を比較せよ。

### 解答

#### 1. 十分性

同時確率密度関数は

$$
\begin{aligned}
f_\theta(x_1,\ldots,x_n)
&=\prod_{i=1}^n\frac1\theta
\mathbf 1(0<x_i<\theta)\\
&=\theta^{-n}
\mathbf 1(0<M<\theta).
\end{aligned}
$$

右辺は

$$
g_\theta(M)h(x_1,\ldots,x_n)
$$

の形に分解できる。例えば

$$
g_\theta(M)=\theta^{-n}\mathbf 1(0<M<\theta),
\qquad
h\equiv1.
$$

したがってFisher–Neymanの因子分解定理より

$$
\boxed{M=X_{(n)}\text{ は }\theta\text{ の十分統計量}}
$$

である。

ここで重要なのは

$$
0<x_1,\ldots,x_n<\theta
$$

という $n$ 個の条件が

$$
M<\theta
$$

という1個の条件に集約されることである。

#### 2. 最大値の分布

$0<m<\theta$ に対し

$$
\begin{aligned}
P(M\le m)
&=P(X_1\le m,\ldots,X_n\le m)\\
&=\prod_{i=1}^nP(X_i\le m)\\
&=\left(\frac m\theta\right)^n.
\end{aligned}
$$

したがって

$$
\boxed{
F_M(m)=
\begin{cases}
0,&m\le0,\\
\left(\dfrac m\theta\right)^n,&0<m<\theta,\\
1,&m\ge\theta.
\end{cases}
}
$$

である。

$0<m<\theta$ で微分すると

$$
\boxed{
f_M(m)
=\frac{n m^{n-1}}{\theta^n},
\qquad 0<m<\theta
}.
$$

#### 3. 完備性

可測関数 $a$ が

$$
E_\theta[a(M)]=0
\qquad
\text{for all }\theta>0
$$

を満たすとする。

$M$ の密度を用いると

$$
0
=\int_0^\theta
 a(m)\frac{n m^{n-1}}{\theta^n}\,dm.
$$

両辺に $\theta^n/n$ を掛けて

$$
\int_0^\theta a(m)m^{n-1}\,dm=0
\qquad
\text{for all }\theta>0.
$$

左辺を $\theta$ で微分すると

$$
a(\theta)\theta^{n-1}=0
$$

がほとんど至る所で成り立つ。

$\theta>0$ では $\theta^{n-1}>0$ なので

$$
a(\theta)=0
$$

がほとんど至る所で成り立つ。

したがって

$$
\boxed{M\text{ は完備統計量}}
$$

である。

1.と合わせて

$$
\boxed{M\text{ は完備十分統計量}}
$$

となる。

#### 4. 不偏推定量

密度から

$$
\begin{aligned}
E[M]
&=\int_0^\theta
m\frac{nm^{n-1}}{\theta^n}\,dm\\
&=\frac n{\theta^n}
\frac{\theta^{n+1}}{n+1}\\
&=\frac n{n+1}\theta.
\end{aligned}
$$

したがって

$$
\boxed{
\widehat\theta_U
=\frac{n+1}{n}M
}
$$

とおけば

$$
E[\widehat\theta_U]=\theta.
$$

#### 5. UMVU性と分散

$\widehat\theta_U$ は完備十分統計量 $M$ の関数であり、かつ $\theta$ の不偏推定量である。

Lehmann–Scheffe定理より

$$
\boxed{
\widehat\theta_U
=\frac{n+1}{n}M
\text{ は }\theta\text{ のUMVU推定量}
}.
$$

次に

$$
\begin{aligned}
E[M^2]
&=\int_0^\theta
m^2\frac{nm^{n-1}}{\theta^n}\,dm\\
&=\frac n{n+2}\theta^2.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(M)
&=\frac n{n+2}\theta^2
-\left(\frac n{n+1}\theta\right)^2\\
&=\frac{n}{(n+2)(n+1)^2}\theta^2.
\end{aligned}
$$

よって

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_U)
&=\left(\frac{n+1}{n}\right)^2
\operatorname{Var}(M)\\
&=\frac{\theta^2}{n(n+2)}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(\widehat\theta_U)
=\frac{\theta^2}{n(n+2)}
}.
$$

#### 6. $2\overline X$ との比較

一様分布では

$$
E[X_i]=\frac\theta2,
\qquad
\operatorname{Var}(X_i)=\frac{\theta^2}{12}.
$$

したがって

$$
E[2\overline X]=\theta
$$

であり、$2\overline X$ も不偏推定量である。

分散は

$$
\begin{aligned}
\operatorname{Var}(2\overline X)
&=4\operatorname{Var}(\overline X)\\
&=4\frac{\theta^2}{12n}\\
&=\frac{\theta^2}{3n}.
\end{aligned}
$$

UMVU推定量の分散は

$$
\frac{\theta^2}{n(n+2)}.
$$

$n>1$ なら $n+2>3$ なので

$$
\frac{\theta^2}{n(n+2)}
<
\frac{\theta^2}{3n}.
$$

よって

$$
\boxed{
\operatorname{Var}(\widehat\theta_U)
<\operatorname{Var}(2\overline X)
\quad(n>1)
}.
$$

Lehmann–Scheffe定理が保証する「不偏推定量の中で最小分散」が具体的に確認できた。

### 本番答案

同時密度は

$$
f_\theta(x_1,\ldots,x_n)
=\theta^{-n}\mathbf1(X_{(n)}<\theta)
$$

なので、因子分解定理より $M=X_{(n)}$ は十分統計量。

また

$$
F_M(m)=\left(\frac m\theta\right)^n,
\qquad
f_M(m)=\frac{nm^{n-1}}{\theta^n}.
$$

$E_\theta[a(M)]=0$ が全ての $\theta$ で成り立つなら

$$
\int_0^\theta a(m)m^{n-1}dm=0.
$$

$\theta$ で微分して $a(\theta)\theta^{n-1}=0$ より $a=0$。したがって $M$ は完備十分統計量。

さらに

$$
E[M]=\frac n{n+1}\theta
$$

なので

$$
\widehat\theta_U=\frac{n+1}{n}M
$$

は不偏。Lehmann–Scheffe定理よりUMVUであり

$$
\operatorname{Var}(\widehat\theta_U)
=\frac{\theta^2}{n(n+2)}.
$$

### 25分経過時の打ち切り判断

十分性、最大値の密度、完備性まで取れれば高得点。最後の分散比較は時間不足なら結論だけでも書く。

### 採点基準（20点目安）

- 因子分解による十分性: 4点
- 最大値の分布: 4点
- 完備性: 5点
- 不偏化とLehmann–Scheffe: 4点
- 分散計算・比較: 3点

### 持ち帰るパターン

- $U(0,\theta)$ のように台が母数に依存するモデルでは最大値が情報を集約する。
- 最大順序統計量のCDFは

$$
P(X_{(n)}\le x)=F(x)^n.
$$

- 完備性は「期待値が0なら積分式を母数で微分」の流れが定番。
- 完備十分統計量の関数として不偏推定量を作れたらLehmann–Scheffeを疑う。

---

## 3位: 2016 問1型 再母数化された正規モデルでCramér–Rao下限を確認する

- 安定ID: `RECON-EST-R03-2016-Q1`
- 参照: 2016年 問1
- 確度: `third_party_topic_index`
- 確認元: Academaid「2016年統計検定1級＜統計数理1＞」
- 元主題: 正規分布、Cramér–Rao下限
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: MLEの不変性、対数正規型モーメント、不偏化、Fisher情報量、Cramér–Rao、Delta法
- 変更点: 有限標本の分散比較に加えて漸近効率まで明示した。

### 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim N(\log\theta,1),
\qquad \theta>0
$$

に従うとする。

1. $\theta$ の最尤推定量を求めよ。
2. その最尤推定量の期待値を求め、$\theta$ の不偏推定量 $\widetilde\theta$ を構成せよ。
3. $\widetilde\theta$ の分散を求めよ。
4. 標本全体のFisher情報量 $I_n(\theta)$ を求め、Cramér–Rao下限と $\operatorname{Var}(\widetilde\theta)$ を比較せよ。
5. $n\to\infty$ のとき $\widetilde\theta$ が漸近効率的であることを示せ。

### 解答

#### 1. 最尤推定量

$\mu=\log\theta$ とおけば

$$
X_i\sim N(\mu,1).
$$

正規分布の平均母数 $\mu$ のMLEは

$$
\widehat\mu=\overline X.
$$

MLEの不変性より

$$
\widehat\theta_{\mathrm{ML}}
=e^{\widehat\mu}
=e^{\overline X}.
$$

よって

$$
\boxed{
\widehat\theta_{\mathrm{ML}}=e^{\overline X}
}.
$$

直接尤度を微分しても同じ結果になる。

#### 2. バイアスと不偏化

$\overline X$ は

$$
\overline X
\sim
N\left(\log\theta,\frac1n\right)
$$

に従う。

正規分布 $Y\sim N(\mu,\sigma^2)$ に対して

$$
E[e^{tY}]
=\exp\left(t\mu+\frac{t^2\sigma^2}{2}\right)
$$

なので、$t=1$ として

$$
\begin{aligned}
E[e^{\overline X}]
&=\exp\left(\log\theta+\frac1{2n}\right)\\
&=\theta e^{1/(2n)}.
\end{aligned}
$$

したがってMLEは上方バイアスを持つ。

$$
\operatorname{Bias}(\widehat\theta_{\mathrm{ML}})
=\theta\left(e^{1/(2n)}-1\right)>0.
$$

そこで

$$
\widetilde\theta
=\exp\left(\overline X-\frac1{2n}\right)
$$

とおけば

$$
\begin{aligned}
E[\widetilde\theta]
&=e^{-1/(2n)}E[e^{\overline X}]\\
&=e^{-1/(2n)}\theta e^{1/(2n)}\\
&=\theta.
\end{aligned}
$$

よって

$$
\boxed{
\widetilde\theta
=e^{\overline X-1/(2n)}
}
$$

は不偏推定量である。

#### 3. 不偏推定量の分散

まず

$$
\widetilde\theta^2
=e^{2\overline X-1/n}.
$$

したがって

$$
\begin{aligned}
E[\widetilde\theta^2]
&=e^{-1/n}E[e^{2\overline X}]\\
&=e^{-1/n}
\exp\left(
2\log\theta
+\frac{2^2}{2}\frac1n
\right)\\
&=e^{-1/n}\theta^2e^{2/n}\\
&=\theta^2e^{1/n}.
\end{aligned}
$$

よって

$$
\begin{aligned}
\operatorname{Var}(\widetilde\theta)
&=E[\widetilde\theta^2]
-E[\widetilde\theta]^2\\
&=\theta^2e^{1/n}-\theta^2\\
&=\theta^2\left(e^{1/n}-1\right).
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(\widetilde\theta)
=\theta^2\left(e^{1/n}-1\right)
}.
$$

#### 4. Fisher情報量とCramér–Rao下限

1標本の対数密度は定数項を除いて

$$
\ell_i(\theta)
=-\frac12(X_i-\log\theta)^2.
$$

スコアは

$$
\begin{aligned}
\frac{\partial\ell_i}{\partial\theta}
&=(X_i-\log\theta)\frac1\theta.
\end{aligned}
$$

$E[X_i-\log\theta]=0$、分散は1なので

$$
\begin{aligned}
I_1(\theta)
&=E\left[
\left(
\frac{X_i-\log\theta}{\theta}
\right)^2
\right]\\
&=\frac1{\theta^2}.
\end{aligned}
$$

独立標本では情報量が加法的なので

$$
\boxed{
I_n(\theta)=\frac n{\theta^2}
}.
$$

したがって、$\theta$ の不偏推定量に対するCramér–Rao下限は

$$
\boxed{
\frac1{I_n(\theta)}
=\frac{\theta^2}{n}
}.
$$

一方

$$
\operatorname{Var}(\widetilde\theta)
=\theta^2(e^{1/n}-1).
$$

$x>0$ では

$$
e^x>1+x
$$

なので

$$
e^{1/n}-1>\frac1n.
$$

したがって

$$
\boxed{
\operatorname{Var}(\widetilde\theta)
>
\frac{\theta^2}{n}
=
I_n(\theta)^{-1}
}.
$$

有限標本ではCramér–Rao下限を達成しない。

#### 5. 漸近効率

比を取ると

$$
\frac{
\operatorname{Var}(\widetilde\theta)
}{
I_n(\theta)^{-1}
}
=
\frac{	heta^2(e^{1/n}-1)}{\theta^2/n}
=n(e^{1/n}-1).
$$

指数関数の展開

$$
e^{1/n}
=1+\frac1n+O(n^{-2})
$$

より

$$
n(e^{1/n}-1)	o1.
$$

したがって

$$
\boxed{
\widetilde\theta
\text{ は漸近的にCramér–Rao下限を達成する}
}.
$$

すなわち漸近効率的である。

Delta法でも確認できる。$g(\mu)=e^\mu$ なら $g'(\mu)=e^\mu=\theta$ なので

$$
\sqrt n(e^{\overline X}-\theta)
\xrightarrow{d}
N(0,\theta^2).
$$

不偏化因子 $e^{-1/(2n)}\to1$ は極限分布を変えないため

$$
\boxed{
\sqrt n(\widetilde\theta-\theta)
\xrightarrow{d}
N(0,\theta^2)
}.
$$

### 本番答案

$\mu=\log\theta$ とおけば $\widehat\mu=\overline X$ なので、MLEの不変性より

$$
\widehat\theta_{\mathrm{ML}}=e^{\overline X}.
$$

$\overline X\sim N(\log\theta,1/n)$ より

$$
E[e^{\overline X}]=\theta e^{1/(2n)}.
$$

したがって

$$
\widetilde\theta=e^{\overline X-1/(2n)}
$$

は不偏であり

$$
\operatorname{Var}(\widetilde\theta)
=\theta^2(e^{1/n}-1).
$$

また

$$
I_n(\theta)=\frac n{\theta^2}
$$

なのでCramér–Rao下限は $\theta^2/n$。$e^{1/n}-1>1/n$ より有限標本では下限を達成しないが

$$
n(e^{1/n}-1)\to1
$$

なので漸近効率的である。

### 25分経過時の打ち切り判断

不偏化とFisher情報量まで取れていれば十分。漸近効率は比 $n(e^{1/n}-1)$ を書き、$e^x=1+x+o(x)$ を使えば短時間で回収できる。

### 採点基準（20点目安）

- MLE: 3点
- 不偏化: 4点
- 分散: 4点
- Fisher情報量とCramér–Rao比較: 6点
- 漸近効率: 3点

### 持ち帰るパターン

- 再母数化 $\theta=h(\mu)$ ではMLEの不変性が強力。
- $e^{\overline X}$ の期待値は正規分布のMGFで処理する。
- Cramér–Rao下限を有限標本で達成しなくても、比が1へ行けば漸近効率的。
- $e^x>1+x$ と $e^x=1+x+O(x^2)$ は推定論でも頻出。

---

## 4位: 2024 問3型 二項モデルでMLEと二乗誤差型縮小推定量を比較する

- 安定ID: `RECON-EST-R04-2024-Q3`
- 参照: 2024年 問3
- 確度: `third_party_topic_index`
- 確認元: Academaid「2024年統計検定1級＜統計数理3＞」
- 元主題: 最小二乗推定量と最尤推定量
- Level: C
- 目安時間: 25分
- 計算量: 中〜多
- 主な使用技術: 二項分布、十分統計量、MLE、MSE、係数比較、縮小推定
- 変更点: 二乗誤差を一定化する線形推定量を、標本比率を $1/2$ へ縮小する推定量として解釈する構成にした。

### 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim\operatorname{Bernoulli}(\theta),
\qquad 0<\theta<1
$$

に従うとする。$n\ge2$ とし

$$
S=\sum_{i=1}^nX_i
$$

とおく。

1. $E[S]$ と $\operatorname{Var}(S)$ を求め、$S$ の分布を答えよ。
2. $S$ が $\theta$ の十分統計量であることを示し、$\theta$ のMLEを求めよ。
3. 線形推定量

$$
T_{a,b}=aS+b
$$

を考える。平均二乗誤差

$$
\operatorname{MSE}_\theta(T_{a,b})
=E_\theta[(T_{a,b}-\theta)^2]
$$

を $\theta$ の2次式として表せ。
4. $\operatorname{MSE}_\theta(T_{a,b})$ が $\theta$ に依存しないような $(a,b)$ のうち、その一定値を最小にする組を求めよ。
5. 前問の推定量を標本比率 $\widehat\theta_{\mathrm{ML}}=S/n$ の縮小推定量として書き直せ。
6. 前問の推定量のMSEがMLEのMSEより小さくなる $\theta$ の範囲を求めよ。

### 解答

#### 1. $S$ の平均・分散・分布

Bernoulli分布より

$$
E[X_i]=\theta,
\qquad
\operatorname{Var}(X_i)=\theta(1-\theta).
$$

したがって

$$
\boxed{E[S]=n\theta}
$$

であり、独立性から

$$
\boxed{
\operatorname{Var}(S)=n\theta(1-\theta)
}.
$$

またBernoulli変数の和なので

$$
\boxed{
S\sim\operatorname{Bin}(n,\theta)
}.
$$

#### 2. 十分性とMLE

同時確率質量関数は

$$
\begin{aligned}
f_\theta(x_1,\ldots,x_n)
&=\prod_{i=1}^n
\theta^{x_i}(1-\theta)^{1-x_i}\\
&=\theta^S(1-\theta)^{n-S}.
\end{aligned}
$$

したがってFisher–Neymanの因子分解定理より

$$
\boxed{S\text{ は }\theta\text{ の十分統計量}}
$$

である。

対数尤度は

$$
\ell(\theta)
=S\log\theta+(n-S)\log(1-\theta).
$$

微分すると

$$
\frac{d\ell}{d\theta}
=\frac S\theta-\frac{n-S}{1-\theta}.
$$

これを $0$ とおくと

$$
S(1-\theta)=(n-S)\theta
$$

より

$$
\boxed{
\widehat\theta_{\mathrm{ML}}
=\frac Sn
}.
$$

#### 3. 線形推定量のMSE

$T=aS+b$ と書く。

まず

$$
E[T]=an\theta+b.
$$

分散は

$$
\operatorname{Var}(T)
=a^2n\theta(1-\theta).
$$

MSEの分解

$$
\operatorname{MSE}(T)
=\operatorname{Var}(T)
+\operatorname{Bias}(T)^2
$$

を用いると

$$
\begin{aligned}
\operatorname{MSE}_\theta(T)
&=a^2n\theta(1-\theta)
+\{(an-1)\theta+b\}^2.
\end{aligned}
$$

展開すると

$$
\boxed{
\begin{aligned}
\operatorname{MSE}_\theta(T)
={}&\{n(n-1)a^2-2na+1\}\theta^2\\
&+\{na^2+2(na-1)b\}\theta+b^2.
\end{aligned}
}
$$

#### 4. MSEを一定化し、その値を最小化する

MSEが $\theta$ に依存しないためには、$\theta^2$ と $\theta$ の係数がともに $0$ であればよい。

したがって

$$
\begin{cases}
n(n-1)a^2-2na+1=0,\\
na^2+2(na-1)b=0.
\end{cases}
$$

第1式を解くと

$$
a
=\frac{n\pm\sqrt n}{n(n-1)}.
$$

$\sqrt n=r$ とおくと

$$
a
=\frac1{r(r\mp1)}.
$$

対応する $b$ は

$$
b
=-\frac{na^2}{2(na-1)}.
$$

2組は

$$
(a,b)
=\left(
\frac1{n+\sqrt n},
\frac1{2(\sqrt n+1)}
\right)
$$

または

$$
(a,b)
=\left(
\frac1{n-\sqrt n},
-\frac1{2(\sqrt n-1)}
\right)
$$

となる。

MSEは定数項 $b^2$ だけ残るので、それぞれ

$$
\frac1{4(\sqrt n+1)^2}
$$

と

$$
\frac1{4(\sqrt n-1)^2}
$$

である。

前者の方が小さい。

したがって最適な組は

$$
\boxed{
a^*=\frac1{n+\sqrt n},
\qquad
b^*=\frac1{2(\sqrt n+1)}
}
$$

であり

$$
\boxed{
\operatorname{MSE}_\theta(T^*)
=\frac1{4(\sqrt n+1)^2}
}
$$

で $\theta$ に依存しない。

#### 5. 縮小推定量としての解釈

$$
T^*
=\frac{S}{n+\sqrt n}
+\frac1{2(\sqrt n+1)}.
$$

$n=(\sqrt n)^2$ を用いると

$$
\frac{S}{n+\sqrt n}
=
\frac{\sqrt n}{\sqrt n+1}\frac Sn.
$$

したがって

$$
\boxed{
T^*
=
\frac{\sqrt n}{\sqrt n+1}\widehat\theta_{\mathrm{ML}}
+
\frac1{\sqrt n+1}\frac12
}.
$$

すなわちMLEである標本比率を $1/2$ の方向へ少し縮めた推定量である。

$n$ が大きくなると

$$
\frac{\sqrt n}{\sqrt n+1}\to1,
\qquad
\frac1{\sqrt n+1}\to0
$$

なので縮小は弱くなり、$T^*$ はMLEへ近づく。

#### 6. MLEとのMSE比較

MLEは不偏なので

$$
\operatorname{MSE}(\widehat\theta_{\mathrm{ML}})
=\operatorname{Var}\left(\frac Sn\right)
=\frac{\theta(1-\theta)}n.
$$

$T^*$ の方がMSEが小さい条件は

$$
\frac1{4(\sqrt n+1)^2}
<
\frac{\theta(1-\theta)}n.
$$

$r=\sqrt n$ とおけば

$$
\theta(1-\theta)
>
\frac{r^2}{4(r+1)^2}.
$$

整理すると

$$
\theta^2-\theta+
\frac{r^2}{4(r+1)^2}<0.
$$

2次方程式の判別式は

$$
1-\frac{r^2}{(r+1)^2}
=\frac{2r+1}{(r+1)^2}.
$$

したがって2根は

$$
\frac12
\pm
\frac{\sqrt{2r+1}}{2(r+1)}.
$$

よって

$$
\boxed{
\frac12-
\frac{\sqrt{2\sqrt n+1}}{2(\sqrt n+1)}
<\theta<
\frac12+
\frac{\sqrt{2\sqrt n+1}}{2(\sqrt n+1)}
}
$$

の範囲では $T^*$ のMSEがMLEより小さい。

標本比率は端 $0,1$ 付近ではもともと分散が小さいため、中心 $1/2$ 付近で縮小推定の利得が大きい。

### 本番答案

$S\sim\operatorname{Bin}(n,\theta)$ で

$$
E[S]=n\theta,
\qquad
V[S]=n\theta(1-\theta).
$$

同時PMFは $\theta^S(1-\theta)^{n-S}$ なので $S$ は十分統計量であり

$$
\widehat\theta_{\mathrm{ML}}=S/n.
$$

$T=aS+b$ のMSEは

$$
\{n(n-1)a^2-2na+1\}\theta^2
+\{na^2+2(na-1)b\}\theta+b^2.
$$

$\theta$ の係数を0とし、定数MSEを小さくする解は

$$
a=\frac1{n+\sqrt n},
\qquad
b=\frac1{2(\sqrt n+1)}.
$$

したがって

$$
T^*
=
\frac{\sqrt n}{\sqrt n+1}\frac Sn
+
\frac1{\sqrt n+1}\frac12,
$$

$$
\operatorname{MSE}(T^*)
=\frac1{4(\sqrt n+1)^2}.
$$

### 25分経過時の打ち切り判断

MSEを2次式まで展開できれば大部分の得点を確保できる。連立方程式の整理で詰まったら、$\theta^2,\theta$ の係数を0とする条件だけ残して次へ進む。

### 採点基準（20点目安）

- $S$ の分布・十分性・MLE: 5点
- MSE展開: 5点
- 一定MSE条件と最適係数: 5点
- 縮小推定の表現: 2点
- MLEとの比較範囲: 3点

### 持ち帰るパターン

- Bernoulli標本では $S=\sum X_i$ が十分統計量、MLEは $S/n$。
- MSEは

$$
\operatorname{Var}+\operatorname{Bias}^2
$$

で展開すると事故が少ない。
- バイアスを入れることでMSEを下げられる場合がある。
- 「標本比率を $1/2$ に縮める」という解釈までできると式を記憶しやすい。

---

## 5位: 2024 問2型 円板内の半径データから非正則MLEを構成する

- 安定ID: `RECON-EST-R05-2024-Q2`
- 参照: 2024年 問2
- 確度: `third_party_topic_index`
- 確認元: Academaid「2024年統計検定1級＜統計数理2＞」
- 元主題: 半径の分布と推定量
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 幾何確率、CDF、最大順序統計量、台依存尤度、MLE、不偏化、非正則モデル
- 変更点: 最大値型不偏推定量と標本平均型推定量の分散比較、およびCramér–Rao正則条件が破れる理由まで接続した。

### 問題

半径 $\theta>0$ の円板の内部から、面積に関して一様に点を1つ選ぶ。その点と中心との距離を $R$ とする。

同じ操作を独立に $n$ 回行い

$$
R_1,\ldots,R_n
$$

を観測したとする。最大値を

$$
M=\max(R_1,\ldots,R_n)
$$

とする。

1. $R$ の累積分布関数、確率密度関数、期待値、分散を求めよ。
2. $M$ の累積分布関数と確率密度関数を求めよ。
3. $\theta$ の最尤推定量を求めよ。
4. そのMLEの期待値を求め、$M$ の定数倍として $\theta$ の不偏推定量 $\widehat\theta_U$ を構成し、その分散を求めよ。
5. 標本平均を用いた

$$
\widehat\theta_M=\frac32\overline R
$$

も不偏推定量であることを示し、$\widehat\theta_U$ と分散を比較せよ。
6. $\widehat\theta_U$ の分散が $O(n^{-2})$ となることは、通常のCramér–Rao型の $O(n^{-1})$ と比べて非常に速い。矛盾ではない理由を説明せよ。

### 解答

#### 1. 半径 $R$ の分布とモーメント

$0\le r\le\theta$ に対して

$$
P(R\le r)
$$

は半径 $r$ の小円板の面積を、半径 $\theta$ の円板の面積で割ったものに等しい。

したがって

$$
\begin{aligned}
F_R(r)
&=\frac{\pi r^2}{\pi\theta^2}\\
&=\frac{r^2}{\theta^2}.
\end{aligned}
$$

よって

$$
\boxed{
F_R(r)=
\begin{cases}
0,&r<0,\\
\dfrac{r^2}{\theta^2},&0\le r\le\theta,\\
1,&r>\theta.
\end{cases}
}
$$

である。

微分して

$$
\boxed{
f_R(r)=\frac{2r}{\theta^2},
\qquad 0<r<\theta
}.
$$

期待値は

$$
\begin{aligned}
E[R]
&=\int_0^\theta
r\frac{2r}{\theta^2}\,dr\\
&=\frac2{\theta^2}
\frac{\theta^3}{3}\\
&=\frac{2\theta}{3}.
\end{aligned}
$$

また

$$
\begin{aligned}
E[R^2]
&=\int_0^\theta
r^2\frac{2r}{\theta^2}\,dr\\
&=\frac2{\theta^2}\frac{\theta^4}{4}\\
&=\frac{\theta^2}{2}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(R)
&=\frac{\theta^2}{2}
-\left(\frac{2\theta}{3}\right)^2\\
&=\frac{\theta^2}{18}.
\end{aligned}
$$

よって

$$
\boxed{
E[R]=\frac{2\theta}{3},
\qquad
\operatorname{Var}(R)=\frac{\theta^2}{18}
}.
$$

#### 2. 最大値 $M$ の分布

$0\le m\le\theta$ では

$$
\begin{aligned}
P(M\le m)
&=P(R_1\le m,\ldots,R_n\le m)\\
&=F_R(m)^n\\
&=\left(\frac{m^2}{\theta^2}\right)^n\\
&=\frac{m^{2n}}{\theta^{2n}}.
\end{aligned}
$$

したがって

$$
\boxed{
F_M(m)=
\begin{cases}
0,&m<0,\\
\dfrac{m^{2n}}{\theta^{2n}},&0\le m\le\theta,\\
1,&m>\theta.
\end{cases}
}
$$

である。

微分すると

$$
\boxed{
f_M(m)
=\frac{2n\,m^{2n-1}}{\theta^{2n}},
\qquad 0<m<\theta
}.
$$

#### 3. MLE

観測値を $r_1,\ldots,r_n$ とする。

尤度は

$$
L(\theta)
=\prod_{i=1}^n
\frac{2r_i}{\theta^2}
\mathbf1(0<r_i<\theta).
$$

最大値 $m=\max r_i$ を用いると

$$
L(\theta)
=
\left(2^n\prod_{i=1}^nr_i\right)
\theta^{-2n}
\mathbf1(\theta\ge m).
$$

ここで重要なのは、$\theta<m$ では尤度が $0$ であること。

$\theta\ge m$ の範囲では

$$
L(\theta)\propto\theta^{-2n}
$$

なので $\theta$ が小さいほど尤度が大きい。

したがって許される最小の値

$$
\theta=m
$$

で最大になる。

よって

$$
\boxed{
\widehat\theta_{\mathrm{ML}}=M
}.
$$

この問題では対数尤度を微分して $0$ とおく必要はない。むしろ台の制約を見ることが本質である。

#### 4. MLEの不偏化と分散

$M$ の密度より

$$
\begin{aligned}
E[M]
&=\int_0^\theta
m\frac{2n m^{2n-1}}{\theta^{2n}}\,dm\\
&=\frac{2n}{\theta^{2n}}
\frac{\theta^{2n+1}}{2n+1}\\
&=\frac{2n}{2n+1}\theta.
\end{aligned}
$$

したがって

$$
\widehat\theta_U
=\frac{2n+1}{2n}M
$$

とすれば不偏になる。

$$
\boxed{
\widehat\theta_U
=\frac{2n+1}{2n}M
}.
$$

次に

$$
\begin{aligned}
E[M^2]
&=\int_0^\theta
m^2\frac{2n m^{2n-1}}{\theta^{2n}}\,dm\\
&=\frac{2n}{2n+2}\theta^2\\
&=\frac n{n+1}\theta^2.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(M)
&=\frac n{n+1}\theta^2
-\left(\frac{2n}{2n+1}\theta\right)^2\\
&=\frac{n}{(n+1)(2n+1)^2}\theta^2.
\end{aligned}
$$

よって

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_U)
&=\left(\frac{2n+1}{2n}\right)^2
\operatorname{Var}(M)\\
&=\frac{\theta^2}{4n(n+1)}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(\widehat\theta_U)
=\frac{\theta^2}{4n(n+1)}
}.
$$

#### 5. 標本平均型推定量との比較

1.より

$$
E[R]=\frac{2\theta}{3}.
$$

したがって

$$
\widehat\theta_M
=\frac32\overline R
$$

に対して

$$
E[\widehat\theta_M]
=\frac32\frac{2\theta}{3}
=\theta.
$$

よって不偏である。

分散は

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_M)
&=\frac94\operatorname{Var}(\overline R)\\
&=\frac94\frac1n\frac{\theta^2}{18}\\
&=\frac{\theta^2}{8n}.
\end{aligned}
$$

一方

$$
\operatorname{Var}(\widehat\theta_U)
=\frac{\theta^2}{4n(n+1)}.
$$

比を取ると

$$
\frac{
\operatorname{Var}(\widehat\theta_U)
}{
\operatorname{Var}(\widehat\theta_M)
}
=
\frac{\theta^2/[4n(n+1)]}{\theta^2/(8n)}
=\frac2{n+1}.
$$

$n>1$ なら

$$
\frac2{n+1}<1.
$$

したがって

$$
\boxed{
\operatorname{Var}(\widehat\theta_U)
<
\operatorname{Var}(\widehat\theta_M)
\quad(n>1)
}.
$$

最大値は円板の外縁、すなわち $\theta$ に直接近づくため、標本平均よりはるかに速く母数情報を集める。

#### 6. Cramér–Rao下限と矛盾しない理由

通常のCramér–Rao理論では、代表的な正則条件として「確率密度関数の台が母数によらない」ことが必要になる。

しかしこのモデルでは

$$
f_R(r\mid\theta)
=\frac{2r}{\theta^2}
\mathbf1(0<r<\theta)
$$

であり、台

$$
0<r<\theta
$$

そのものが $\theta$ に依存する。

したがって、微分と積分の交換や

$$
E_\theta\left[
\frac{\partial}{\partial\theta}
\log f(R\mid\theta)
\right]=0
$$

といった正則モデルで使う標準的な関係をそのまま適用できない。

よって

$$
\operatorname{Var}(\widehat\theta_U)
=O(n^{-2})
$$

という速い収束はCramér–Rao理論と矛盾しない。

$$
\boxed{
\text{台が母数に依存する非正則モデルだからである}
}.
$$

### 本番答案

面積比より

$$
F_R(r)=\frac{r^2}{\theta^2},
\qquad
f_R(r)=\frac{2r}{\theta^2}
\quad(0<r<\theta).
$$

したがって

$$
E[R]=\frac{2\theta}{3},
\qquad
V[R]=\frac{\theta^2}{18}.
$$

最大値 $M$ は

$$
F_M(m)=\left(\frac{m^2}{\theta^2}\right)^n,
\qquad
f_M(m)=\frac{2n m^{2n-1}}{\theta^{2n}}.
$$

尤度は

$$
L(\theta)
\propto
\theta^{-2n}\mathbf1(\theta\ge M)
$$

なので

$$
\widehat\theta_{\mathrm{ML}}=M.
$$

さらに

$$
E[M]=\frac{2n}{2n+1}\theta
$$

より

$$
\widehat\theta_U
=\frac{2n+1}{2n}M
$$

は不偏で

$$
V[\widehat\theta_U]
=\frac{\theta^2}{4n(n+1)}.
$$

台が $0<r<\theta$ と母数依存なので正則なCramér–Rao理論はそのまま適用できない。

### 25分経過時の打ち切り判断

最重要は「尤度の台を見て $\widehat\theta_{\mathrm{ML}}=M$」まで。非正則性の説明は1文でもよいので、`台が母数に依存` と必ず書く。

### 採点基準（20点目安）

- $R$ のCDF・PDF・モーメント: 4点
- 最大値の分布: 4点
- 台を使ったMLE: 5点
- 不偏化と分散: 4点
- 推定量比較・非正則性: 3点

### 持ち帰るパターン

- 一様な円板上の半径分布は面積比から $F(r)\propto r^2$。
- 最大順序統計量は $F_M=F^n$。
- 台が母数に依存するモデルでは、MLEは「微分して0」ではなく境界で決まることがある。
- 最大値型推定量が $n^{-1}$ より速い精度を持つのは、非正則モデルの重要な特徴。

---

## 参照方針

確認に用いた第三者解説は次の通り。

- Academaid「統計検定1級 過去問解答解説目次」
- Academaid「2012年統計検定1級＜数理統計問3＞」
- Academaid「2019年統計検定1級＜数理統計問3＞」
- Academaid「2016年統計検定1級＜統計数理1＞」
- Academaid「2024年統計検定1級＜統計数理2＞」
- Academaid「2024年統計検定1級＜統計数理3＞」

実際の受験演習では、問題文の確認は統計検定公式問題集を優先する。本ファイルは公開されたテーマ・解説をもとに技法を反復するための独自演習であり、公式過去問の代替ではない。
