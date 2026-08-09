# 問題集

## Level A：基礎部品

### P2-A01 離散分布の正規化
- level: A
- minutes: 7
- topics: PMF
- techniques: NORM-1
- calculation_load: low

$p_X(-1)=c$, $p_X(0)=2c$, $p_X(1)=3c$、台の外で0とする。$c$ と $P(X\geq0)$ を求めよ。

### P2-A02 連続密度の正規化
- level: A
- minutes: 8
- topics: PDF
- techniques: NORM-1
- calculation_load: low

$f_X(x)=cx$（$0<x<2$）、台の外で0とする。$c$ と $P(1<X<2)$ を求めよ。

### P2-A03 CDFの跳躍
- level: A
- minutes: 9
- topics: CDF、点確率
- techniques: ATOM-1
- calculation_load: low

CDFが $0,0.2,0.7,1$ の値を区間 $x<0$, $0\leq x<1$, $1\leq x<2$, $2\leq x$ で順に取る。$P(X=0)$, $P(X=1)$, $P(X=2)$ を求めよ。

## Level B：小問セット

### P2-B01 二変量離散分布
- level: B
- minutes: 13
- topics: 同時PMF、周辺PMF、独立
- techniques: NORM-1, MARG-1, INDEP-RV-1
- calculation_load: medium

$x,y\in\{0,1\}$ で $p_{X,Y}(x,y)=c(1+x+y)$、それ以外で0とする。

1. $c$ を求めよ。
2. $p_X,p_Y$ を求めよ。
3. $X,Y$ は独立か判定せよ。

### P2-B02 三角領域の一様密度
- level: B
- minutes: 15
- topics: 同時PDF、周辺PDF
- techniques: NORM-1, MARG-1
- calculation_load: medium

$f_{X,Y}(x,y)=c$（$0<x<y<2$）、台の外で0とする。

1. $c$ を求めよ。
2. $f_X(x)$ と $f_Y(y)$ を求めよ。
3. $P(X<1)$ を求めよ。

### P2-B03 最大値のCDF
- level: B
- minutes: 14
- topics: CDF、独立
- techniques: CDF-1, INDEP-RV-1
- calculation_load: medium

$X,Y$ は独立で、各CDFは $0\leq t\leq1$ で $F(t)=t$、$t<0$ で0、$t>1$ で1とする。$M=\max(X,Y)$ とする。

1. $0\leq m\leq1$ で $F_M(m)$ を求めよ。
2. $M$ のPDFを求めよ。
3. $P(M>1/2)$ を求めよ。

## Level C：本番標準

### P2-C01 混合分布
- level: C
- minutes: 24
- topics: 混合分布、CDF、点確率
- techniques: NORM-1, CDF-1, ATOM-1
- calculation_load: medium

$P(X=0)=1/4$ で、$0<x<1$ に連続部分の密度 $f_c(x)=3x/2$ をもち、それ以外に確率をもたない。

1. 全確率が1であることを確認せよ。
2. CDFを区分表示せよ。
3. $x=0$ の跳躍幅を求めよ。
4. $P(0<X\leq1/2)$ を求めよ。
5. この分布が純粋な連続型でない理由を述べよ。

### P2-C02 二変量離散表
- level: C
- minutes: 25
- topics: 同時PMF、周辺PMF、条件付き確率
- techniques: NORM-1, MARG-1, INDEP-RV-1
- calculation_load: medium

$x\in\{0,1\}$, $y\in\{0,1,2\}$ で $p_{X,Y}(x,y)=c(x+y+1)$、それ以外で0とする。

1. $c$ を求めよ。
2. $p_X(x)$ を求めよ。
3. $p_Y(y)$ を求めよ。
4. $P(X=1\mid Y=2)$ を求めよ。
5. $X,Y$ は独立か判定せよ。

### P2-C03 非一様な三角密度
- level: C
- minutes: 28
- topics: 同時PDF、周辺PDF、領域積分
- techniques: NORM-1, MARG-1, JOINT-1
- calculation_load: high

$f_{X,Y}(x,y)=c(x+y)$（$0<x<y<1$）、台の外で0とする。

1. $c$ を求めよ。
2. $f_X(x)$ を求めよ。
3. $f_Y(y)$ を求めよ。
4. $P(X+Y<1)$ を求めよ。
5. 両周辺密度が1に積分されることを確認せよ。

### P2-C04 最大値と最小値
- level: C
- minutes: 25
- topics: CDF、独立、順序
- techniques: CDF-1, INDEP-RV-1
- calculation_load: medium

$X,Y$ は独立で $(0,1)$ 上の一様分布に従う。$M=\max(X,Y)$, $L=\min(X,Y)$ とする。

1. $F_M(m)$ を全実数上で求めよ。
2. $M$ のPDFを求めよ。
3. $P(L>l)$ を $0\leq l\leq1$ で求めよ。
4. $F_L(l)$ とPDFを全実数上で求めよ。
5. $P(L<1/4,M>3/4)$ を求めよ。

### P2-C05 区分CDFから分布を復元する
- level: C
- minutes: 25
- topics: CDF、混合分布
- techniques: CDF-1, ATOM-1, ANSWER-1
- calculation_load: medium

$$
F(x)=
\begin{cases}
0,&x<0,\\
x/4,&0\leq x<1,\\
1/2,&1\leq x<2,\\
1/2+(x-2)/4,&2\leq x<4,\\
1,&4\leq x.
\end{cases}
$$

1. CDFの四性質を確認せよ。
2. 全ての点質量を求めよ。
3. 連続部分のPDFを求めよ。
4. $P(1\leq X\leq3)$ を求めよ。
5. 下側中央値 $\inf\{x:F(x)\geq1/2\}$ を求めよ。

## Level D：発展

### P2-D01 曲線で囲まれた支持領域
- level: D
- minutes: 40
- topics: 同時PDF、周辺PDF、CDF
- techniques: NORM-1, MARG-1, JOINT-1
- calculation_load: high

$f_{X,Y}(x,y)=c$（$0<x<1$, $x^2<y<x$）、台の外で0とする。

1. $c$ を求めよ。
2. $f_X(x)$ と $f_Y(y)$ を求めよ。
3. $F_Y(t)$ を全実数上で求めよ。
4. $X,Y$ が独立でないことを支持領域から説明せよ。
