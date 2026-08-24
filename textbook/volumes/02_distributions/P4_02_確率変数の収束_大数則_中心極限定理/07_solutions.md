# 詳細解答

## P4T-A01--A04

A01は任意の $\varepsilon>0$ で $n>1/\varepsilon$ なら確率0、かつ各標本点で収束する。従って三収束。A02は $E\overline X=p,\operatorname{Var}(\overline X)=p(1-p)/n$。A03は正規分布の和より $\overline X_n\sim N(\mu,\sigma^2/n)$。A04は平均 $\lambda$、分散 $\lambda(1-\lambda/n)$ で極限はともに $\lambda$。

## P4T-B01--B04

B01は $|aX_n+b-(aX+b)|=|a||X_n-X|$。B02は大数の法則を直接適用。B03は
$$P(|\overline X_n-\lambda|\le\varepsilon)\approx\Phi(\varepsilon\sqrt{n/\lambda})-\Phi(-\varepsilon\sqrt{n/\lambda}).$$
B04は $\Phi((130.5-120)/\sqrt{84})$。

## P4T-C01

1. $E[\overline X_n]=\lambda,\operatorname{Var}(\overline X_n)=\lambda/n$。
2. 平均が $\lambda$ なので不偏。
3. 分散が0へ行くのでChebyshev不等式により確率収束。
4. CLTより $\sqrt n(\overline X_n-\lambda)\xrightarrow dN(0,\lambda)$。
5. $n=100,\lambda=4$ では標準偏差は0.2、連続補正を用いない標本平均の近似確率は $\Phi(2)-\Phi(-2)\approx0.954$。

## P4T-C02

1. $E\overline X=p,\operatorname{Var}(\overline X)=p(1-p)/n$。2. $\hat p=\overline X$ は不偏。3. 分散が0へ行くので一致。4. $0<p<1$ なら $\hat p\xrightarrow p p$ より $\sqrt{\hat p(1-\hat p)}\xrightarrow p\sqrt{p(1-p)}$、Slutskyにより $\hat p\pm1.96\sqrt{\hat p(1-\hat p)/n}$。5. $0.3\pm1.96\sqrt{0.21/400}=0.3\pm0.0449$。

## P4T-C03

1. ポアソン和の再生性より $T_n\sim\operatorname{Poisson}(n\lambda)$。2. $E[T_n/n]=\lambda,\operatorname{Var}(T_n/n)=\lambda/n$。3. $T_n\approx N(n\lambda,n\lambda)$。4. 尤度は $\lambda^{T_n}e^{-n\lambda}$ に比例し、$T_n>0$ なら $\hat\lambda=T_n/n$、$T_n=0$ なら $\lambda>0$ 内にMLEはない。5. $\lambda=2$ では平均100、分散100、連続補正により $$P(T_n\ge120)\approx1-\Phi\left((119.5-100)/10\right)\approx0.025.$$

## P4T-C04--C05

C04は各 $X_n$ の分布が不変なので分布収束はするが、$P(|X_n-0|>\tfrac12)=1$ で確率収束しない。もし収束するならある $N$ 以降は一定値となるが、各 $N$ について
$$P(X_N=\cdots=X_m=1)=2^{-(m-N+1)}\to0$$
であり、$-1$ も同様である。従って $\bigcup_N\{\text{N以降一定}\}$ の確率は可算和でも0、概収束もしない。$X_n^2=1$ は恒等的に1へ収束。C05は
$$\binom nk(\lambda/n)^k(1-\lambda/n)^{n-k}=\frac{\lambda^k}{k!}\prod_{j=0}^{k-1}(1-j/n)(1-\lambda/n)^n(1-\lambda/n)^{-k}\to e^{-\lambda}\lambda^k/k!$$
を各固定 $k$ で示し、平均分散は $\lambda$。$P(B_n\le2)\approx e^{-3}(1+3+9/2)$。

## P4T-D01

1--2. C01と同じ大数則・CLT。3. デルタ法で
$$\sqrt n\{g(\overline X_n)-g(\lambda)\}\xrightarrow dN(0,\lambda[g'(\lambda)]^2)=N\left(0,\frac{\lambda}{(1+\lambda)^2}\right).$$
4. $\lambda=4,n=100$ の $g(\hat\lambda_n)$ の近似分散は $\lambda/[n(1+\lambda)^2]=4/(100\cdot25)=0.0016$。5. 独立同分布、平均有限、正の有限分散、$g$ の微分可能性を仮定する。

## 完成形本番答案・採点

Level Cは各25点、Dは25点。各問は3分でモデル同定、15分で主要式、25分で結論まで進める。主要式6点、導出8点、近似・推定6点、解釈3点、検算2点を基本とし、途中の標準化式にも部分点を与える。

## 本番答案の救済経路

C01--C03は、標本統計量の平均分散、LLNまたはCLTの標準化、推定値または確率の三段を最低限残す。15分で標準化までなら部分点を確保し、25分で数値を追加する。C04は確率Cauchyの反証、C05は固定 $k$ のPMF極限を残す。D01は平均値の定理によるTaylor式まで書けば導出点を得る。

## 完成形本番答案（式を含む）

- C01: $E\bar X=\lambda,\operatorname{Var}(\bar X)=\lambda/n$。Chebyshevで $\bar X\xrightarrow p\lambda$、CLTで $\sqrt n(\bar X-\lambda)\to_dN(0,\lambda)$。$\lambda=4,n=100$ では $P(|\bar X-\lambda|\le.4)\approx\Phi(2)-\Phi(-2)=.954$。
- C02: $E\bar X=p,\operatorname{Var}(\bar X)=p(1-p)/n$。$0<p<1$ なら $\hat p=\bar X$ は不偏・一致、区間は $\hat p\pm1.96\sqrt{\hat p(1-\hat p)/n}$。
- C02: $n=400,\hat p=.3$ なら区間は $[.2551,.3449]$。
- C03: $T_n\sim\operatorname{Poisson}(n\lambda)$、$E[T_n/n]=\lambda,\operatorname{Var}(T_n/n)=\lambda/n$。$T_n>0$ なら $\hat\lambda=T_n/n$、$T_n=0$ なら $\lambda>0$ 内でMLEなし。$T_n\approx N(n\lambda,n\lambda)$ を使い、$n=50,\lambda=2,T_n\ge120$ は $1-\Phi(1.95)\approx.025$。
- C04: 分布収束はするが $P(|X_n|>1/2)=1$。確率Cauchy条件に反し、概収束もしない。$X_n^2\equiv1$。収束概念は概収束$\Rightarrow$確率収束$\Rightarrow$分布収束。
- C05: $\binom nk(\lambda/n)^k(1-\lambda/n)^{n-k}\to e^{-\lambda}\lambda^k/k!$。従って $B_n\to_d\operatorname{Poisson}(\lambda)$、$\lambda=3$ なら $P(B_n\le2)\to e^{-3}(1+3+9/2)$。条件は $\lambda>0,n\to\infty$。
- D01: $\bar X\xrightarrow p\lambda$、$\sqrt n(\bar X-\lambda)\to_dN(0,\lambda)$。平均値の定理と $g'(x)=1/(1+x)$ から $\sqrt n\{g(\bar X)-g(\lambda)\}\to_dN(0,\lambda/(1+\lambda)^2)$。$\lambda=4,n=100$ の近似分散は .0016。仮定は独立同分布、有限正分散、$g$ の微分可能性。

| 問題 | 3分 | 15分 | 25分 |
|---|---|---|---|
| C01 | Poissonの平均分散 | 不偏性・Chebyshev | CLT確率 |
| C02 | Bernoulliモデル | 不偏・一致 | 区間数値 |
| C03 | Poisson和 | MLE | 連続補正確率 |
| C04 | 収束定義 | 確率収束反証 | 概収束反証 |
| C05 | Binomial極限 | PMF極限 | Poisson数値 |
| D01 | LLN/CLT | 標準化 | デルタ法 |

## 問題別完成形答案と小問配点

各Level C/Dは小問1--5を各4点（合計20点）とし、残り5点を仮定・検算・解釈に配る。C01は「平均分散→不偏→Chebyshev→CLT→数値」、C02は「平均分散→推定→一致→区間→数値」、C03は「和の分布→平均分散→正規近似→MLE境界→確率」、C04は「分布収束→確率Cauchy→概収束→二乗変換→含意」、C05は「平均分散→PMF因子分解→極限→Poisson確率→条件」。D01は「一致→CLT→Taylor→近似分散→仮定」を順に答案へ書く。各問15分で標準化または主要極限まで、25分で結論まで。未達なら主要式と仮定を残して撤退する。

## 逐行補足と境界

Chebyshev不等式は $P(|Y-EY|>\varepsilon)\le\operatorname{Var}(Y)/\varepsilon^2$。C01では分散 $\lambda/n$ を代入する。Slutskyの適用では $g(x,y)=x/y$ など連続な写像を選び、分母の極限が0でないことを確認する。

C03で $T_n=0$ のとき尤度は $e^{-n\lambda}$。母数空間 $\lambda>0$ では $\lambda\downarrow0$ で上限に近づくが内部MLEは存在しない。$T_n>0$ のときだけ $\widehat\lambda=T_n/n$ が内部解である。

C04が任意の確率収束先を排除するには、確率収束なら確率Cauchy、すなわち任意の $\varepsilon>0$ で $P(|X_n-X_m|>\varepsilon)\to0$ が必要だが、$n\ne m$ では $P(|X_n-X_m|>1)=1/2$ であり矛盾する。概収束については独立性と $\sum_nP(X_n=1)=\infty$、$\sum_nP(X_n=-1)=\infty$ から各値が無限回現れる。

D01のTaylor展開は平均値の定理により、ある $\xi_n$ が $\hat\lambda_n$ と $\lambda$ の間に存在して
$$g(\hat\lambda_n)-g(\lambda)=g'(\xi_n)(\hat\lambda_n-\lambda).$$
$\hat\lambda_n\xrightarrow p\lambda$ と $g'$ の連続性から $g'(\xi_n)\xrightarrow p g'(\lambda)$、Slutskyでデルタ法の極限を得る。
