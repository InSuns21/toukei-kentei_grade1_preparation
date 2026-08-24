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

### 1. p管理図

二項近似から

$$
UCL_p=\bar p+3\sqrt{\frac{\bar p(1-\bar p)}{n}},
$$

$$
LCL_p=\bar p-3\sqrt{\frac{\bar p(1-\bar p)}{n}}.
$$

本問では

$$
\boxed{LCL_p=0.05-3\sqrt{0.05\cdot0.95/200}},
$$

$$
\boxed{UCL_p=0.05+3\sqrt{0.05\cdot0.95/200}}.
$$

参考として

$$
\sqrt{0.05\cdot0.95/200}\approx0.01541
$$

なので

$$
LCL_p\approx0.0038,
\qquad
UCL_p\approx0.0962.
$$

### 2. np管理図

中心線は

$$
n\bar p=10.
$$

標準偏差は

$$
\sqrt{n\bar p(1-\bar p)}=\sqrt{9.5}.
$$

したがって

$$
\boxed{LCL_{np}=10-3\sqrt{9.5}},
\qquad
\boxed{UCL_{np}=10+3\sqrt{9.5}}.
$$

小数化すれば約 $0.75,19.25$。実務では整数個数として限界を解釈する。

### 3. c管理図

Poissonモデルから標準偏差は $\sqrt{\bar c}=2$。

$$
LCL_c=\max(0,4-3\cdot2)=0,
$$

$$
UCL_c=4+6=10.
$$

### 4. u管理図

検査量 $n_i$ が異なると総欠点数は単純比較できないため、単位当たり欠点数 $u_i=c_i/n_i$ を使う。Poisson近似の下で

$$
CL=\bar u,
$$

$$
UCL_i=\bar u+3\sqrt{\frac{\bar u}{n_i}},
\qquad
LCL_i=\max\left(0,\bar u-3\sqrt{\frac{\bar u}{n_i}}\right).
$$

## 本番答案

$$
p:\quad \bar p\pm3\sqrt{\bar p(1-\bar p)/n}
$$

より

$$
0.05\pm3\sqrt{0.05\cdot0.95/200}.
$$

$$
np:\quad n\bar p\pm3\sqrt{n\bar p(1-\bar p)}
$$

より

$$
10\pm3\sqrt{9.5}.
$$

$c$ 図は $4\pm3\sqrt4$ なので $[0,10]$。検査量が異なる欠点数では $u_i=c_i/n_i$ を使い、限界は $\bar u\pm3\sqrt{\bar u/n_i}$。

## 採点基準

- p図: 6点
- np図: 5点
- c図: 4点
- u図: 5点

平方根の小数化は採点対象にせず、正しい式までで満点とする。

25分経過時は「不良品数は二項、欠点数はPoisson」という対応を先に確定する。
