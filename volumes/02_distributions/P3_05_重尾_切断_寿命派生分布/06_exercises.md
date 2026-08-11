# 演習問題

## 問題で使う分布の定義

累積分布関数（cumulative distribution function; CDF）は $F(x)=P(X\leq x)$ とする。

$X\sim\operatorname{Pareto}(x_m,\alpha)$ は $x_m>0,\alpha>0$、$x\geq x_m$、$f(x)=\alpha x_m^\alpha x^{-(\alpha+1)}$。$X\sim\operatorname{Laplace}(\mu,b)$ は $\mu\in\mathbb R,b>0$、$x\in\mathbb R$、$f(x)=(2b)^{-1}e^{-|x-\mu|/b}$。$X\sim\operatorname{Rayleigh}(\sigma)$ は $\sigma>0$、$x\geq0$、$f(x)=x\sigma^{-2}e^{-x^2/(2\sigma^2)}$。Weibullは $c,\eta>0$、$x>0$、$f(x)=c(x/\eta)^{c-1}e^{-(x/\eta)^c}/\eta$、$S(x)=e^{-(x/\eta)^c}$ とする。

### 指数分布の母数規約

本章の $\operatorname{Exp}(\lambda)$ は率母数表示で、$\lambda>0$、台 $x\ge0$、$f_\lambda(x)=\lambda e^{-\lambda x}$、$S_\lambda(x)=e^{-\lambda x}$ とする。したがって $\operatorname{Exp}(1/4)$ の平均は4である。切断点は常に $c>0$ とする。

## Level A

### P3T-A01 Paretoの尾
- level: A
- minutes: 7
- topics: Pareto、生存関数
- techniques: PARETO-1

$x_m=2,\alpha=3$ のPareto分布について $P(X>4)$ を求めよ。

### P3T-A02 モーメント条件
- level: A
- minutes: 7
- topics: Pareto、モーメント
- techniques: PARETO-1

Pareto$(x_m,\alpha)$ の平均と分散が有限となる $\alpha$ の条件を答えよ。

### P3T-A03 ハザード
- level: A
- minutes: 8
- topics: 生存関数、ハザード
- techniques: HAZARD-1

$S(x)=e^{-x/5}$、$x\geq0$ のとき $f(x),h(x),H(x)$ を求めよ。

### P3T-A04 平均残存寿命
- level: A
- minutes: 8
- topics: 平均残存寿命
- techniques: HAZARD-1

$X\sim\operatorname{Exp}(1/4)$ の平均残存寿命 $m(x)$ を求めよ。

## Level B

### P3T-B01 Paretoのモーメント導出
- level: B
- minutes: 14
- topics: Pareto、尾積分
- techniques: PARETO-1

Pareto$(x_m,\alpha)$ について、
1. $S(x)$ を導出せよ。
2. $E[X^r]$ の存在条件と値を求めよ。
3. $\alpha=3$ の平均・分散を求めよ。

### P3T-B02 Laplace分布
まず $x\le\mu$ と $x>\mu$ に分けてCDF $F(x)$ を導出せよ。その後、密度の正規化、平均・分散、$t\ge0$ の $P(|X-\mu|>t)$ を求めよ。
- level: B
- minutes: 15
- topics: Laplace、絶対値
- techniques: LAPLACE-1

Laplace$(\mu,b)$ について、
1. 密度が1に積分されることを左右に分けて示せ。
2. $E[X]$ と $\operatorname{Var}(X)$ を求めよ。
3. $P(|X-\mu|>t)$ を求めよ。

### P3T-B03 Rayleigh変換
- level: B
- minutes: 15
- topics: Rayleigh、指数変換
- techniques: RAYLEIGH-1

Rayleigh$(\sigma)$ の $X$ について、
1. $U=X^2/(2\sigma^2)$ のCDFを求めよ。
2. $U\sim\operatorname{Exp}(1)$ を示せ。
3. $E[X]$ を積分またはGamma関数で求めよ。

### P3T-B04 切断分布
- level: B
- minutes: 15
- topics: 切断、正規化
- techniques: TRUNC-1

$X\sim\operatorname{Exp}(\lambda)$ を $X\leq c$ で右切断する。
1. 切断後密度を求めよ。
2. 切断後の $P(X\leq t)$、$0\leq t\leq c$ を求めよ。
3. $c\to\infty$ で元の密度に戻ることを確認せよ。

### 条件の再掲

P3T-B01では $r>0$ とする。P3T-B02では $t\ge0$ とする。P3T-B03の変換後CDFは $u\ge0$ で $1-e^{-u}$、$u<0$ では0である。

## Level C

### P3T-C01 Pareto最小値から推定
- level: C
- minutes: 25
- calculation: medium
- finishability: 25分で最小値の分布・最尤推定・バイアス確認まで完答可能
- topics: Pareto、順序統計、最尤推定
- techniques: PARETO-1

$X_1,\ldots,X_n$ をPareto$(x_m,\alpha)$ から独立に得て、$\alpha>0$ は既知とする。$M=\min_iX_i$ とする。
1. $P(M>t)$ を求めよ。
2. $M$ の密度を求めよ。
3. $E[M]$ を求めよ（存在条件も示す）。
4. $x_m$ の尤度と最尤推定量を求めよ。
5. $M$ を用いた推定量のバイアスを述べ、補正方法を示せ。

### P3T-C02 寿命のハザード連鎖
- level: C
- minutes: 25
- calculation: medium
- finishability: 25分で $S,f,h,H,m$ の連鎖を完答可能
- topics: Weibull、ハザード、平均残存寿命
- techniques: HAZARD-1

Weibull$(c,\eta)$、$c,\eta>0$ について、
1. $S(x),f(x),h(x),H(x)$ を求めよ。
2. $c>1,c=1,c<1$ の故障率を比較せよ。
3. $c=1$ の平均残存寿命を求めよ。
4. $c=2,\eta=5$ の $S(5),H(5),h(5)$ を求めよ。
5. ハザードが増加するという意味を寿命データの言葉で説明せよ。

### P3T-C03 右打切り尤度
- level: C
- minutes: 26
- calculation: high
- finishability: 25分で故障・打切りの尤度を分離し、尺度推定の式まで完答可能
- topics: 右打切り、指数、最尤推定
- techniques: CENSOR-1

指数分布 $f_\lambda(x)=\lambda e^{-\lambda x}$、$S_\lambda(x)=e^{-\lambda x}$ に従う寿命を観測する。故障時刻 $t_1,t_2$ と、打切り時刻 $c_1,c_2$ を得た。
1. 尤度を求めよ。
2. $\lambda$ の最尤推定量を求めよ。
3. 打切りを故障として扱う誤りが推定量に与える方向を説明せよ。
4. 追加の故障観測が1件増えたときの尤度を示せ。
5. 観測がすべて打切りの場合の最尤推定の問題点を述べよ。

### P3T-C04 Laplace位置尺度推定
- level: C
- minutes: 24
- calculation: medium
- finishability: 24分で中央値・絶対偏差・尤度の構造を完答可能
- topics: Laplace、位置尺度、ロバスト性
- techniques: LAPLACE-1

Laplace$(\mu,b)$ の標本 $X_1,\ldots,X_n$ について、
1. 尤度と対数尤度を書け。
2. $b$ を既知としたときの $\mu$ の最尤推定量を示せ。
3. $\mu$ を既知としたときの $b$ の最尤推定量を求めよ。
4. 平均と中央値の役割を比較せよ。
5. 外れ値に対する絶対偏差の特徴を説明せよ。

### P3T-C05 切断と打切りの比較
- level: C
- minutes: 25
- calculation: medium
- finishability: 25分で二つの尤度寄与と生存関数を比較可能
- topics: 切断、打切り、モデル批判
- techniques: TRUNC-1, CENSOR-1

同じ指数分布を、(A) $X\leq c$ の個体だけを採用する右切断、(B) 全個体を追跡し $X>c$ を打切りとする方式で観測する。
1. (A)の観測密度を求めよ。
2. (B)の故障・打切りの尤度寄与を求めよ。
3. (A)で観測された標本の尤度と(B)の尤度の違いを説明せよ。
4. $c$ が小さいときに失われる情報を述べよ。
5. 寿命研究で方式を選ぶ際の実務上の判断を2つ挙げよ。

小問5では具体計算として未知の $\lambda>0$、故障時刻2、打切り時刻4を用い、正しい尤度 $\lambda e^{-6\lambda}$ と、打切りを故障と誤認した尤度 $\lambda^2e^{-6\lambda}$ を比較し、それぞれの推定値と $S(4)$ の偏りを求めよ。右切断密度の数値確認はこの比較の前提として行う。

## Level D

### P3T-D01 寿命分布総合
- level: D
- minutes: 40
- calculation: high
- finishability: 25分でハザード・打切り尤度まで部分完答、40分で平均残存寿命と解釈まで完答
- topics: Weibull、右打切り、ハザード、推定
- techniques: HAZARD-1, CENSOR-1, ANSWER-1

Weibull$(c,\eta)$ の寿命 $X_i$ を観測する。$c$ は既知、$\eta$ は未知とし、観測は故障時刻 $t_i$ または右打切り時刻 $c_i$ と故障指標 $\delta_i$ で記録する。
1. $S_\eta(t_i)$ と $f_\eta(t_i)$ を書け。
2. 全観測の尤度を求めよ。
3. $\eta$ の最尤推定量を求めよ。
4. 推定されたハザードの増減を $c$ の値で解釈せよ。
5. $c=1$ と $c=2$ で平均残存寿命の違いを説明せよ。
