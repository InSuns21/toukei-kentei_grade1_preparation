# Core 32 Poisson過程の重ね合わせ・間引き

- 安定ID: `RIKOU-CORE-32`
- 80大問 No.: 14
- 演習価値: A
- 難度: A
- 目安時間: 30分

## 問題

独立な Poisson 過程 $N_1(t),N_2(t)$ の率をそれぞれ2,3とする。

1. $N(t)=N_1(t)+N_2(t)$ が率5の Poisson 過程となることを説明せよ。
2. $N(t)=n$ の条件の下で $N_1(t)$ の条件付き分布を求めよ。
3. 率5の Poisson 過程の各到着を独立に確率0.3で「型A」、それ以外を「型B」と分類する。型A・型Bの過程の率を求めよ。
4. 2つの間引き後過程が独立となることを、固定時刻の同時確率母関数から確認せよ。

## 詳細解答

### 1. 重ね合わせ

固定区間長 $t$ では

$$
N_1(t)\sim\operatorname{Poisson}(2t),
\qquad
N_2(t)\sim\operatorname{Poisson}(3t).
$$

独立 Poisson 変数の和は Poisson なので

$$
N(t)\sim\operatorname{Poisson}(5t).
$$

独立増分性も2過程の独立性から保たれるため、$N$ は率5の Poisson 過程。

### 2. 条件付き分布

$$
P(N_1=k\mid N=n)
=\binom nk\left(\frac25\right)^k\left(\frac35\right)^{n-k}.
$$

したがって

$$
\boxed{N_1(t)\mid N(t)=n\sim\operatorname{Binomial}(n,2/5)}.
$$

### 3. 間引き

Poisson到着を独立分類すると

$$
\lambda_A=5\cdot0.3=1.5,
\qquad
\lambda_B=5\cdot0.7=3.5.
$$

### 4. 独立性

時刻 $t$ の型A, B個数を $A(t),B(t)$ とする。1到着の分類PGFは $0.3s+0.7u$。Poisson合成より

$$
E[s^{A(t)}u^{B(t)}]
=\exp\{5t(0.3s+0.7u-1)\}.
$$

これは

$$
\exp\{1.5t(s-1)\}\exp\{3.5t(u-1)\}
$$

と因数分解される。したがって $A(t),B(t)$ は独立で、それぞれ Poisson$(1.5t)$, Poisson$(3.5t)$。

## 本番答案

独立 Poisson 過程の和は増分ごとに Poisson$(5\Delta t)$ となるので率5。条件付きでは

$$
N_1(t)\mid N(t)=n\sim\operatorname{Bin}(n,2/5).
$$

率5を確率0.3,0.7で間引けば率は1.5,3.5。共同PGFは

$$
\exp\{5t(0.3s+0.7u-1)\}
=\exp\{1.5t(s-1)\}\exp\{3.5t(u-1)\},
$$

よって2過程は独立。

## 採点基準

- 重ね合わせ: 5点
- 条件付き二項: 5点
- 間引き率: 4点
- 独立性: 6点

25分経過時は共同PGFの導出を一行にし、因数分解を明示する。
