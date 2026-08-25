# 2016年 問4型 Monte Carlo法 過去問再構成・解答解説

このファイルは、2016年11月実施の統計検定1級「統計数理」問4で確認できる出題構造をもとに、学習用に独自の文章・記号で再構成した演習である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 確度は `third_party_topic_index` とする。
- 確認元: DataArts「2016年11月27日 統計数理 問4」および公開解説。
- 数式・分散・数値は独立に再計算した。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 演習価値

この問題型の核心は「同じ量を推定する不偏なMonte Carlo推定量でも、作り方で分散が大きく変わる」ことにある。

$$
\text{確率の直接推定}
\to
\text{対称性の利用}
\to
\text{積分の期待値表示}
\to
\text{分散比較}
$$

を一題で確認できるため、`P4-03 経験分布・乱数生成・Monte Carlo` の中核演習として価値が高い。

---

## 2016 問4型 標準正規確率を3通りのMonte Carlo法で推定する

- 安定ID: `RECON-MC-2016-Q4`
- 参照: 2016年 統計数理 問4
- 確度: `third_party_topic_index`
- 元主題: Monte Carlo法、二項分布、対称性、Monte Carlo積分、分散比較
- Level: C
- 目安時間: 25分
- 計算量: 中
- 使用技術: 指示変数、二項分布、正規分布の対称性、一様乱数による積分、分散計算
- 時間配分: (1) 5分、(2) 5分、(3) 9分、(4) 6分
- 25分経過時の打ち切り判断: (3) の積分変形が止まったら、与えられた分散係数を使って (4) の効率比較を先に完答する。

### 問題

標準正規分布の確率密度関数を

$$
\phi(z)=\frac{1}{\sqrt{2\pi}}e^{-z^2/2}
$$

とし、

$$
\theta=P(0\le Z\le1)=\int_0^1\phi(z)\,dz
$$

を考える。数値として

$$
\theta\approx0.3413447
$$

を用いてよい。

#### (1) 区間に入った回数をそのまま使う

$Z_1,\ldots,Z_n$ を独立に $N(0,1)$ から生成し、

$$
A_i=\boldsymbol{1}_{\{0\le Z_i\le1\}}
$$

とする。

$$
\widehat\theta_1=\frac1n\sum_{i=1}^nA_i
$$

について、不偏性と分散を求めよ。

#### (2) 対称性を使う

同じ $Z_i$ を使い、

$$
B_i=\boldsymbol{1}_{\{|Z_i|\le1\}}
$$

とする。

$$
\widehat\theta_2=\frac1{2n}\sum_{i=1}^nB_i
$$

が $\theta$ の不偏推定量であることを示し、その分散を求めよ。

#### (3) 一様乱数で積分を直接評価する

$U_1,\ldots,U_n$ を独立に $\operatorname{Unif}(0,1)$ から生成し、

$$
\widehat\theta_3
=\frac1n\sum_{i=1}^n\phi(U_i)
$$

とする。

1. $\widehat\theta_3$ が不偏であることを示せ。
2. $\operatorname{Var}(\widehat\theta_3)$ を求めよ。
3. 必要なら

$$
P(0\le Z\le\sqrt2)\approx0.4213504
$$

を用いて数値化せよ。

#### (4) 効率を比較する

(1) の方法で $n=10000$ 回生成したときと同程度の分散を得るために、(2)、(3) ではそれぞれおよそ何回の乱数生成が必要か。厳密な整数値より、オーダーと効率差の解釈を重視せよ。

---

## 詳細解答

### 方針

3つとも

$$
\theta=E[W]
$$

となる確率変数 $W$ を作り、その標本平均で $\theta$ を推定している。

独立同分布な $W_1,\ldots,W_n$ について

$$
\widehat\theta=\frac1n\sum_{i=1}^nW_i
$$

なら

$$
E[\widehat\theta]=E[W],
\qquad
\operatorname{Var}(\widehat\theta)=\frac{\operatorname{Var}(W)}n.
$$

したがって、各方法の比較は1回分の確率変数 $W$ の分散比較に帰着する。

### 使用結果と仮定

- $Z_i$ は独立な標準正規乱数である。
- $U_i$ は独立な一様乱数である。
- 標準正規密度は偶関数なので $P(-1\le Z\le0)=P(0\le Z\le1)=\theta$。
- Bernoulli$(p)$ 変数 $I$ について $E[I]=p$、$\operatorname{Var}(I)=p(1-p)$。

---

### (1) 直接の区間確率推定

$A_i$ は成功確率 $\theta$ のBernoulli変数である。

$$
A_i\sim\operatorname{Bernoulli}(\theta).
$$

したがって

$$
E[A_i]=\theta,
\qquad
\operatorname{Var}(A_i)=\theta(1-\theta).
$$

よって

$$
\begin{aligned}
E[\widehat\theta_1]
&=\frac1n\sum_{i=1}^nE[A_i]\\
&=\theta,
\end{aligned}
$$

なので不偏である。

独立性より

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_1)
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(A_i)\\
&=\frac{\theta(1-\theta)}n.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(\widehat\theta_1)
=\frac{\theta(1-\theta)}n
\approx\frac{0.22483}{n}
}.
$$

### (2) 対称性による分散削減

標準正規分布の対称性から

$$
P(|Z_i|\le1)
=P(-1\le Z_i\le1)
=2\theta.
$$

よって

$$
B_i\sim\operatorname{Bernoulli}(2\theta).
$$

期待値は

$$
\begin{aligned}
E[\widehat\theta_2]
&=\frac1{2n}\sum_{i=1}^nE[B_i]\\
&=\frac1{2n}\cdot n\cdot2\theta\\
&=\theta.
\end{aligned}
$$

したがって不偏である。

分散は

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_2)
&=\frac1{4n^2}\sum_{i=1}^n\operatorname{Var}(B_i)\\
&=\frac1{4n^2}\cdot n\cdot2\theta(1-2\theta)\\
&=\frac{\theta(1-2\theta)}{2n}.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Var}(\widehat\theta_2)
=\frac{\theta(1-2\theta)}{2n}
\approx\frac{0.05416}{n}
}.
$$

(1) の係数 $0.22483$ に比べて約4分の1である。

### (3) Monte Carlo積分

#### 1. 不偏性

$U_i\sim\operatorname{Unif}(0,1)$ の密度は区間内で1なので

$$
\begin{aligned}
E[\phi(U_i)]
&=\int_0^1\phi(u)\,du\\
&=\theta.
\end{aligned}
$$

したがって

$$
\boxed{E[\widehat\theta_3]=\theta}.
$$

#### 2. 分散

まず1回分の二乗期待値を求める。

$$
\begin{aligned}
E[\phi(U)^2]
&=\int_0^1\frac1{2\pi}e^{-u^2}\,du.
\end{aligned}
$$

$v=\sqrt2u$ とおくと $du=dv/\sqrt2$ なので

$$
\begin{aligned}
E[\phi(U)^2]
&=\frac1{2\pi\sqrt2}
\int_0^{\sqrt2}e^{-v^2/2}\,dv\\
&=\frac1{2\sqrt\pi}
\int_0^{\sqrt2}\frac1{\sqrt{2\pi}}e^{-v^2/2}\,dv\\
&=\frac1{2\sqrt\pi}P(0\le Z\le\sqrt2).
\end{aligned}
$$

したがって

$$
\operatorname{Var}(\phi(U))
=
\frac1{2\sqrt\pi}P(0\le Z\le\sqrt2)-\theta^2.
$$

独立な平均なので

$$
\boxed{
\operatorname{Var}(\widehat\theta_3)
=
\frac1n\left\{
\frac1{2\sqrt\pi}P(0\le Z\le\sqrt2)-\theta^2
\right\}
}.
$$

数値代入すると

$$
\frac1{2\sqrt\pi}(0.4213504)
\approx0.1188608,
$$

$$
\theta^2\approx0.1165162.
$$

よって

$$
\boxed{
\operatorname{Var}(\widehat\theta_3)
\approx\frac{0.0023445}{n}
}.
$$

これは (1) の約 $1/96$、(2) の約 $1/23$ の分散係数である。

### (4) 同じ分散に必要な試行回数

(1) を $n_1=10000$ 回行うと

$$
V_1\approx\frac{0.2248285}{10000}.
$$

(2) の試行回数を $n_2$ とすると、同じ分散を得る条件は

$$
\frac{0.0541561}{n_2}
\approx
\frac{0.2248285}{10000}.
$$

したがって

$$
\begin{aligned}
n_2
&\approx10000\frac{0.0541561}{0.2248285}\\
&\approx2409.
\end{aligned}
$$

同様に (3) では

$$
\begin{aligned}
n_3
&\approx10000\frac{0.0023445}{0.2248285}\\
&\approx104.3.
\end{aligned}
$$

したがって目安は

$$
\boxed{n_2\approx2.4\times10^3,\qquad n_3\approx1.0\times10^2}.
$$

整数回数として「この分散以下」を保証するなら、それぞれ切り上げる。

公開解説では途中の分散係数を $0.0542$、$0.0023$ などに丸めてから比較するため、最終の必要回数が数回程度ずれることがある。重要なのは、丸め前の式で比較すると (2) は約2400回、(3) は約100回で (1) の10000回に匹敵する、という効率差である。

---

## 結論

同じ $\theta$ を推定していても、1回分の情報の使い方を変えるだけで分散係数は

$$
0.22483
\to
0.05416
\to
0.0023445
$$

と大きく低下する。

(1) は「入ったか、入らなかったか」という0/1情報しか使わない。

(2) は分布の対称性を使い、左右両側の情報を統合する。

(3) は一様乱数の各点で密度値そのものを使うため、0/1の指示変数より滑らかな情報を利用できる。その結果、分散がさらに小さくなる。

## 検算

- 3推定量はいずれも期待値が $\theta$ である。
- すべての分散は $1/n$ のオーダーで減少する。
- 分散係数はすべて正である。
- $0.0023445<0.05416<0.22483$ なので、同じ $n$ なら (3) が最も精度が高い。

## 本番答案

$$
A_i=\boldsymbol{1}_{\{0\le Z_i\le1\}}
\sim\operatorname{Bernoulli}(\theta)
$$

より

$$
E[\widehat\theta_1]=\theta,
\qquad
V(\widehat\theta_1)=\frac{\theta(1-\theta)}n
\approx\frac{0.22483}{n}.
$$

対称性から

$$
B_i=\boldsymbol{1}_{\{|Z_i|\le1\}}
\sim\operatorname{Bernoulli}(2\theta),
$$

したがって

$$
E[\widehat\theta_2]=\theta,
\qquad
V(\widehat\theta_2)
=\frac{\theta(1-2\theta)}{2n}
\approx\frac{0.05416}{n}.
$$

また $U\sim\operatorname{Unif}(0,1)$ なら

$$
E[\phi(U)]=\int_0^1\phi(u)du=\theta,
$$

$$
E[\phi(U)^2]
=\frac1{2\sqrt\pi}P(0\le Z\le\sqrt2).
$$

よって

$$
V(\widehat\theta_3)
=\frac1n\left\{
\frac1{2\sqrt\pi}P(0\le Z\le\sqrt2)-\theta^2
\right\}
\approx\frac{0.0023445}{n}.
$$

(1) を10000回行った場合と同程度の分散には、(2) は約 $2.4\times10^3$ 回、(3) は約 $1.0\times10^2$ 回で足りる。

## 採点基準（20点想定）

- (1) Bernoulli化、不偏性、分散: 4点
- (2) 対称性 $P(|Z|\le1)=2\theta$、不偏性、分散: 5点
- (3) 期待値表示: 2点
- (3) 二乗期待値の積分と変数変換: 4点
- (3) 最終分散: 2点
- (4) 同分散条件の立式と効率比較: 3点

## 持ち帰る一手

Monte Carlo推定量の比較では、まず

$$
\widehat\theta=\frac1n\sum W_i
$$

の形にして、

$$
\operatorname{Var}(\widehat\theta)=\frac{\operatorname{Var}(W)}n
$$

へ落とす。

**同じ期待値を持つ $W$ の中で、分散の小さい表現を探すことがMonte Carloの効率化である。**
