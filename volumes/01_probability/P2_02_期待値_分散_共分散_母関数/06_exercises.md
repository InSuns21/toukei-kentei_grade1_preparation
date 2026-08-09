# 問題集

## Level A：基礎部品

### P2-A04 離散平均・分散
- level: A
- minutes: 8
- topics: 期待値、分散
- techniques: MOMENT-1, VAR-1
- calculation_load: low

$P(X=0)=1/4$, $P(X=1)=1/2$, $P(X=2)=1/4$ のとき $E[X]$, $\operatorname{Var}(X)$ を求めよ。

### P2-A05 線形変換
- level: A
- minutes: 6
- topics: 期待値、分散
- techniques: VAR-1
- calculation_load: low

$E[X]=2$, $\operatorname{Var}(X)=3$ のとき $Y=4-2X$ の平均と分散を求めよ。

### P2-A06 共分散公式
- level: A
- minutes: 7
- topics: 共分散
- techniques: COV-1
- calculation_load: low

$E[X]=1$, $E[Y]=2$, $E[XY]=5$ のとき $\operatorname{Cov}(X,Y)$ を求めよ。

## Level B：小問セット

### P2-B04 連続分布のモーメント
- level: B
- minutes: 13
- topics: 期待値、分散
- techniques: MOMENT-1, VAR-1
- calculation_load: medium

$f_X(x)=2x$（$0<x<1$）、台の外で0とする。

1. $E[X]$ を求めよ。
2. $E[X^2]$ を求めよ。
3. $\operatorname{Var}(X)$ を求めよ。

### P2-B05 二値変数の相関
- level: B
- minutes: 14
- topics: 共分散、相関係数
- techniques: COV-1
- calculation_load: medium

$(X,Y)=(1,1),(1,-1),(-1,1),(-1,-1)$ の確率が順に $3/8,1/8,1/8,3/8$ である。

1. $E[X],E[Y]$ を求めよ。
2. 各分散と共分散を求めよ。
3. 相関係数を求めよ。

### P2-B06 PGFからモーメント
- level: B
- minutes: 15
- topics: 確率母関数
- techniques: PGF-1
- calculation_load: medium

$G_X(s)=(1+s)^3/8$ とする。

1. $P(X=k)$ を全て求めよ。
2. $E[X]$ を求めよ。
3. $\operatorname{Var}(X)$ を求めよ。

## Level C：本番標準

### P2-C06 混合集団の全分散
- level: C
- minutes: 24
- topics: 全期待値、全分散
- techniques: TOTALVAR-1, ANSWER-1
- calculation_load: medium

$P(H_1)=0.4$, $P(H_2)=0.6$、$E[X\mid H_1]=1$, $E[X\mid H_2]=3$、$\operatorname{Var}(X\mid H_1)=2$, $\operatorname{Var}(X\mid H_2)=1$ とする。

1. $E[X]$ を求めよ。
2. 群内分散成分を求めよ。
3. 群間分散成分を求めよ。
4. $\operatorname{Var}(X)$ を求めよ。
5. 各成分が非負である意味を説明せよ。

### P2-C07 同時密度から相関係数
- level: C
- minutes: 28
- topics: 共分散、相関係数
- techniques: MOMENT-1, COV-1
- calculation_load: high

$f_{X,Y}(x,y)=x+y$（$0<x<1$, $0<y<1$）、台の外で0とする。

1. $E[X],E[Y]$ を求めよ。
2. $E[X^2],E[Y^2]$ を求めよ。
3. $E[XY]$ を求めよ。
4. 共分散と各分散を求めよ。
5. 相関係数を求めよ。

### P2-C08 べき型裾とモーメントの存在
- level: C
- minutes: 27
- topics: 期待値の存在、分散
- techniques: NORM-1, MOMENT-1, VAR-1
- calculation_load: high

$f_X(x)=cx^{-\alpha}$（$x\geq1$）、台の外で0、$\alpha>1$ とする。

1. $c$ を求めよ。
2. $E[X]$ が有限となる $\alpha$ の範囲を求め、その値を計算せよ。
3. $E[X^2]$ が有限となる範囲を求め、その値を計算せよ。
4. 分散が有限となる範囲と分散を求めよ。
5. $1<\alpha\leq2$ で形式的な平均値を書いてはいけない理由を述べよ。

### P2-C09 幾何級数型PGF
- level: C
- minutes: 25
- topics: 確率母関数
- techniques: PGF-1
- calculation_load: medium

$P(X=k)=(1-p)p^k$（$k\in\mathbb N_0$, $0<p<1$）とする。

1. 正規化を確認せよ。
2. PGFとその有限な範囲を求めよ。
3. $E[X]$ を求めよ。
4. $E[X(X-1)]$ を求めよ。
5. $\operatorname{Var}(X)$ を求めよ。

### P2-C10 MGFと独立和
- level: C
- minutes: 25
- topics: モーメント母関数、独立和
- techniques: MGF-1, VAR-1
- calculation_load: medium

$M_X(t)=(1-2t)^{-1/2}$（$t<1/2$）であり、$X_1,\ldots,X_n$ は独立で各々 $X$ と同分布とする。

1. $M_X(0)=1$ を確認せよ。
2. $E[X]$ を求めよ。
3. $E[X^2]$ と分散を求めよ。
4. $S_n=\sum_{i=1}^nX_i$ のMGFを求めよ。
5. $E[S_n]$, $\operatorname{Var}(S_n)$ を求めよ。

## Level D：発展

### P2-D02 共分散不等式
- level: D
- minutes: 40
- topics: 共分散、相関係数
- techniques: COV-1, COV-BOUND-1
- calculation_load: high

二次モーメントが有限で分散が正の $X,Y$ について、$\operatorname{Cov}(X,Y)^2\leq\operatorname{Var}(X)\operatorname{Var}(Y)$ を分散の非負性から証明せよ。さらに $|\rho(X,Y)|\leq1$ と、等号成立条件を示せ。
