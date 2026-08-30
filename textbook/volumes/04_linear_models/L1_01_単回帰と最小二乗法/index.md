# L1-01 単回帰と最小二乗法

線形単回帰は、1個の説明変数の変化に対して応答の平均がどのように動くかを直線で表すモデルです。本章では、最小二乗推定量を暗記せず残差平方和の最小化から導き、残差の直交性、平方和分解、決定係数、回帰係数の標本分布、検定・区間推定、平均応答と新しい観測値の予測までを一つの流れで扱います。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 単回帰モデルの切片・傾き・誤差の意味を説明する。
- 残差平方和を偏微分し、最小二乗推定量を導く。
- 推定回帰直線が $(\bar x,\bar y)$ を通ることを示す。
- 残差と説明変数の直交性から平方和分解を導く。
- 傾きの不偏性・分散・正規誤差のもとでのt統計量を導く。
- 決定係数を計算し、因果関係や外部予測精度とは区別する。
- 指定した説明変数での平均応答と新しい観測値の予測分散を区別する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 線形単回帰 | 条件付き平均、切片、傾き |
| 最小二乗推定 | 残差平方和、正規方程式、最小二乗推定量 |
| 回帰の分散分析 | 全平方和、回帰平方和、残差平方和 |
| 決定係数 | $R^2$ と平方和分解 |
| 残差 | 直交性、残差分散 |
| 線形結合の分布 | $\hat\beta_1$ と予測値の分布 |

## 前提知識チェック

1. P2-02: 期待値、分散、共分散を使う。
2. P3-02: 正規分布と標準化を使う。
3. S1-01: t分布とカイ二乗分布を使う。
4. F0-00: 1変数・2変数の偏微分と二次式を使う。

---

## 1. まず「直線＋ばらつき」として考える

説明変数 $x$ を温度、応答 $Y$ を材料強度とします。同じ温度でも強度は毎回同じにはなりませんが、平均的な強度が温度に対して直線的に変化すると考えると
$$
Y_i=\beta_0+\beta_1x_i+\varepsilon_i,
\qquad i=1,\ldots,n
$$
と書けます。

- $\beta_0$: $x=0$ での平均応答。
- $\beta_1$: $x$ が1増えたときの平均応答の変化量。
- $\varepsilon_i$: 直線からの偶然のずれ。

説明変数 $x_i$ は固定された値として扱います。まず
$$
E[\varepsilon_i]=0,
\qquad
\operatorname{Var}(\varepsilon_i)=\sigma^2,
\qquad
\operatorname{Cov}(\varepsilon_i,\varepsilon_j)=0\quad(i\ne j)
$$
を仮定します。したがって
$$
E[Y_i\mid x_i]=\beta_0+\beta_1x_i,
\qquad
\operatorname{Var}(Y_i\mid x_i)=\sigma^2.
$$

検定や正確な標本分布まで扱う節では、さらに
$$
\varepsilon_1,\ldots,\varepsilon_n
\overset{\text{独立}}{\sim}N(0,\sigma^2)
$$
を仮定します。

## 2. 最小二乗法を導く

観測値を $y_i$ とし、候補の直線 $b_0+b_1x$ からの残差を
$$
e_i=y_i-(b_0+b_1x_i)
$$
とします。正負の残差を打ち消さず全体のずれを測るため
$$
Q(b_0,b_1)=\sum_{i=1}^n\{y_i-b_0-b_1x_i\}^2
$$
を最小にします。

標本平均を
$$
\bar x=\frac1n\sum_{i=1}^n x_i,
\qquad
\bar y=\frac1n\sum_{i=1}^n y_i
$$
とし、
$$
S_{xx}=\sum_{i=1}^n(x_i-\bar x)^2,
\qquad
S_{xy}=\sum_{i=1}^n(x_i-\bar x)(y_i-\bar y)
$$
と定めます。全ての $x_i$ が同じではなく $S_{xx}>0$ とします。

### 2.1 正規方程式

$Q$ を $b_0,b_1$ で偏微分すると
$$
\frac{\partial Q}{\partial b_0}
=-2\sum_{i=1}^n(y_i-b_0-b_1x_i),
$$
$$
\frac{\partial Q}{\partial b_1}
=-2\sum_{i=1}^n x_i(y_i-b_0-b_1x_i).
$$
最小点では両式が0です。第一式から
$$
\sum y_i-nb_0-b_1\sum x_i=0
$$
なので
$$
b_0=\bar y-b_1\bar x.
$$
これを第二式へ代入します。$y_i-b_0-b_1x_i=(y_i-\bar y)-b_1(x_i-\bar x)$ だから
$$
\sum x_i\{(y_i-\bar y)-b_1(x_i-\bar x)\}=0.
$$
ここで
$$
\sum x_i(y_i-\bar y)=S_{xy},
\qquad
\sum x_i(x_i-\bar x)=S_{xx}
$$
なので
$$
\hat\beta_1=\frac{S_{xy}}{S_{xx}},
\qquad
\hat\beta_0=\bar y-\hat\beta_1\bar x.
$$
推定回帰直線は
$$
\hat y=\hat\beta_0+\hat\beta_1x
$$
です。$x=\bar x$ を代入すると $\hat y=\bar y$ なので、推定回帰直線は必ず $(\bar x,\bar y)$ を通ります。

### 2.2 残差の直交性

最小二乗推定量での残差を
$$
e_i=y_i-\hat y_i,
\qquad
\hat y_i=\hat\beta_0+\hat\beta_1x_i
$$
とします。正規方程式から
$$
\sum_{i=1}^n e_i=0,
\qquad
\sum_{i=1}^n x_ie_i=0.
$$
さらに
$$
\sum_{i=1}^n(\hat y_i-\bar y)e_i
=\hat\beta_1\sum_{i=1}^n(x_i-\bar x)e_i=0.
$$
したがって、当てはめた直線が説明する方向と残差の方向は直交しています。

## 3. 平方和分解と決定係数

各観測の全体平均との差は
$$
y_i-\bar y=(\hat y_i-\bar y)+e_i
$$
です。二乗して足すと
$$
\sum(y_i-\bar y)^2
=\sum(\hat y_i-\bar y)^2
+\sum e_i^2
+2\sum(\hat y_i-\bar y)e_i.
$$
最後の交差項は前節の直交性により0なので
$$
SST=SSR+SSE
$$
を得ます。ここで
$$
SST=\sum(y_i-\bar y)^2,
$$
$$
SSR=\sum(\hat y_i-\bar y)^2,
$$
$$
SSE=\sum(y_i-\hat y_i)^2
$$
です。

決定係数を
$$
R^2=\frac{SSR}{SST}=1-\frac{SSE}{SST}
$$
と定めます。切片を含む通常の最小二乗回帰では $0\le R^2\le1$ です。これは観測された応答の変動のうち、当てはめた直線で説明された割合を表します。ただし、高い $R^2$ だけで因果関係や将来データでの高い予測精度が保証されるわけではありません。

単回帰では
$$
SSR=\hat\beta_1^2S_{xx}
=\frac{S_{xy}^2}{S_{xx}}
$$
なので、$S_{yy}=SST$ と書けば
$$
R^2=\frac{S_{xy}^2}{S_{xx}S_{yy}}=r_{xy}^2.
$$
すなわち、切片を含む単回帰では決定係数は標本相関係数の二乗です。

## 4. 回帰係数の平均・分散・標本分布

確率変数として
$$
\hat\beta_1
=\frac{\sum(x_i-\bar x)Y_i}{S_{xx}}
$$
と書けます。モデル式を代入すると
$$
\hat\beta_1
=\beta_1+\frac{\sum(x_i-\bar x)\varepsilon_i}{S_{xx}}.
$$
期待値は
$$
E[\hat\beta_1]
=\beta_1+\frac{\sum(x_i-\bar x)E[\varepsilon_i]}{S_{xx}}
=\beta_1.
$$
また誤差が互いに無相関で分散 $\sigma^2$ だから
$$
\begin{aligned}
\operatorname{Var}(\hat\beta_1)
&=\frac{1}{S_{xx}^2}
\operatorname{Var}\left\{\sum(x_i-\bar x)\varepsilon_i\right\}\\
&=\frac{1}{S_{xx}^2}
\sum(x_i-\bar x)^2\sigma^2\\
&=\frac{\sigma^2}{S_{xx}}.
\end{aligned}
$$
同様に
$$
\operatorname{Var}(\hat\beta_0)
=\sigma^2\left(\frac1n+\frac{\bar x^2}{S_{xx}}\right),
$$
$$
\operatorname{Cov}(\hat\beta_0,\hat\beta_1)
=-\frac{\bar x\sigma^2}{S_{xx}}.
$$

正規誤差を仮定すると、$\hat\beta_1$ は正規変数の線形結合なので
$$
\hat\beta_1\sim N\left(\beta_1,\frac{\sigma^2}{S_{xx}}\right).
$$
残差自由度は $n-2$ です。誤差分散の不偏推定量を
$$
s^2=\frac{SSE}{n-2}
$$
とすると、正規線形モデルでは
$$
\frac{SSE}{\sigma^2}\sim\chi^2_{n-2}
$$
で、$\hat\beta_1$ と $SSE$ は独立です。したがって
$$
T=\frac{\hat\beta_1-\beta_1}{s/\sqrt{S_{xx}}}
\sim t_{n-2}.
$$

## 5. 平均応答と新しい観測値は分散が違う

説明変数を $x_0$ に固定したときの平均応答は
$$
m(x_0)=\beta_0+\beta_1x_0
$$
です。その推定量
$$
\hat m(x_0)=\hat\beta_0+\hat\beta_1x_0
$$
の分散は
$$
\operatorname{Var}\{\hat m(x_0)\}
=\sigma^2\left\{
\frac1n+\frac{(x_0-\bar x)^2}{S_{xx}}
\right\}.
$$
同じ $x_0$ で新しく1個観測する値を
$$
Y_0=\beta_0+\beta_1x_0+\varepsilon_0
$$
とすると、新しい誤差 $\varepsilon_0$ 自身の分散 $\sigma^2$ が追加されるため
$$
\operatorname{Var}\{Y_0-\hat m(x_0)\}
=\sigma^2\left\{
1+\frac1n+\frac{(x_0-\bar x)^2}{S_{xx}}
\right\}.
$$
そのため、新しい1観測に対する予測区間は平均応答の信頼区間より広くなります。

---

## 6. 演習：問題の直後に解答

### Level A：基礎部品

#### L1-01-A01 最小二乗推定量を導く
- level: A
- minutes: 9
- topics: 最小二乗法, 正規方程式
- techniques: 微分
- calculation_load: medium

固定された実数 $x_1,\ldots,x_n$ と観測値 $y_1,\ldots,y_n$ があり、全ての $x_i$ は同一ではないとする。候補の直線 $b_0+b_1x$ に対する残差平方和を
$$Q(b_0,b_1)=\sum_{i=1}^n(y_i-b_0-b_1x_i)^2$$
と定める。$Q$ を最小にする $\hat\beta_0,\hat\beta_1$ を導け。ただし
$$\bar x=n^{-1}\sum x_i,\quad\bar y=n^{-1}\sum y_i,$$
$$S_{xx}=\sum(x_i-\bar x)^2,\quad S_{xy}=\sum(x_i-\bar x)(y_i-\bar y)$$
とする。

<!-- solution-start -->
##### 解答
###### 詳細解答

$$
\frac{\partial Q}{\partial b_0}=-2\sum(y_i-b_0-b_1x_i),
\quad
\frac{\partial Q}{\partial b_1}=-2\sum x_i(y_i-b_0-b_1x_i).
$$
両式を0と置く。第一式から $b_0=\bar y-b_1\bar x$。これを第二式へ代入すると
$$0=S_{xy}-b_1S_{xx}.$$
$S_{xx}>0$ より
$$\hat\beta_1=S_{xy}/S_{xx},\qquad\hat\beta_0=\bar y-\hat\beta_1\bar x.$$

###### 本番答案

正規方程式から $b_0=\bar y-b_1\bar x$、さらに $S_{xy}-b_1S_{xx}=0$。よって
$$\hat\beta_1=S_{xy}/S_{xx},\quad\hat\beta_0=\bar y-\hat\beta_1\bar x.$$

###### 採点基準
偏微分2式6点、切片の式4点、代入6点、最終式4点。合計20点。
<!-- solution-end -->

#### L1-01-A02 回帰直線が標本平均点を通る
- level: A
- minutes: 6
- topics: 最小二乗法
- techniques: 代入
- calculation_load: low

$\hat\beta_0=\bar y-\hat\beta_1\bar x$ を用いて、推定回帰直線 $\hat y=\hat\beta_0+\hat\beta_1x$ が $(\bar x,\bar y)$ を通ることを示せ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$x=\bar x$ を代入すると
$$\hat y=\bar y-\hat\beta_1\bar x+\hat\beta_1\bar x=\bar y.$$
###### 本番答案
$x=\bar x$ で $\hat y=\bar y$。よって $(\bar x,\bar y)$ を通る。
###### 採点基準
代入8点、切片式の利用8点、結論4点。合計20点。
<!-- solution-end -->

#### L1-01-A03 残差の二つの和
- level: A
- minutes: 8
- topics: 残差
- techniques: 正規方程式
- calculation_load: low

$e_i=y_i-\hat\beta_0-\hat\beta_1x_i$ とする。残差平方和の最小化から
$$\sum e_i=0,\qquad\sum x_ie_i=0$$
を示せ。

<!-- solution-start -->
##### 解答
###### 詳細解答
最小点で
$$0=\frac{\partial Q}{\partial b_0}=-2\sum e_i,$$
$$0=\frac{\partial Q}{\partial b_1}=-2\sum x_ie_i.$$
したがって結論を得る。
###### 本番答案
正規方程式がそれぞれ $-2\sum e_i=0$、$-2\sum x_ie_i=0$ なので成立する。
###### 採点基準
目的関数4点、各偏微分6点ずつ、結論4点。合計20点。
<!-- solution-end -->

#### L1-01-A04 数値データから回帰直線
- level: A
- minutes: 9
- topics: 最小二乗推定
- techniques: 平均, 共分散型和
- calculation_load: medium

$$ (x_i,y_i)=(0,1),(1,2),(2,3),(3,6) $$
について $\bar x,\bar y,S_{xx},S_{xy}$ と最小二乗回帰直線を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$\bar x=3/2,\quad\bar y=3,$$
$$S_{xx}=5,$$
$$S_{xy}=(-1.5)(-2)+(-0.5)(-1)+(0.5)(0)+(1.5)(3)=8.$$
よって
$$\hat\beta_1=8/5,\quad\hat\beta_0=3-(8/5)(3/2)=3/5.$$
###### 本番答案
$\bar x=3/2,\bar y=3,S_{xx}=5,S_{xy}=8$ より $\hat y=3/5+(8/5)x$。
###### 採点基準
平均4点、$S_{xx}$4点、$S_{xy}$6点、回帰直線6点。合計20点。
<!-- solution-end -->

### Level B：標準技能の組合せ

#### L1-01-B01 傾きの不偏性と分散
- level: B
- minutes: 13
- topics: 回帰係数, 標本分布
- techniques: 線形結合, 分散
- calculation_load: medium

固定された $x_i$ に対して $Y_i=\beta_0+\beta_1x_i+\varepsilon_i$ とする。$E[\varepsilon_i]=0$、$\operatorname{Var}(\varepsilon_i)=\sigma^2$、異なる誤差は無相関とする。$S_{xx}=\sum(x_i-\bar x)^2>0$ とし、
$$\hat\beta_1=\frac{\sum(x_i-\bar x)Y_i}{S_{xx}}$$
について不偏性と分散を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
モデル式を代入し $\sum(x_i-\bar x)=0$ を使うと
$$\hat\beta_1=\beta_1+S_{xx}^{-1}\sum(x_i-\bar x)\varepsilon_i.$$
よって $E[\hat\beta_1]=\beta_1$。また無相関性から
$$
\operatorname{Var}(\hat\beta_1)
=S_{xx}^{-2}\sum(x_i-\bar x)^2\sigma^2
=\sigma^2/S_{xx}.
$$
###### 本番答案
$$\hat\beta_1-\beta_1=S_{xx}^{-1}\sum(x_i-\bar x)\varepsilon_i$$
より不偏で、分散は $\sigma^2/S_{xx}$。
###### 採点基準
変形8点、不偏性4点、交差共分散が消える理由4点、分散4点。合計20点。
<!-- solution-end -->

#### L1-01-B02 平方和分解を導く
- level: B
- minutes: 12
- topics: 回帰の分散分析
- techniques: 二乗展開, 直交性
- calculation_load: medium

切片を含む最小二乗回帰で、$\hat y_i$ を当てはめ値、$e_i=y_i-\hat y_i$ とする。$\sum e_i=0$、$\sum x_ie_i=0$ を用いて
$$\sum(y_i-\bar y)^2=\sum(\hat y_i-\bar y)^2+\sum e_i^2$$
を示せ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$y_i-\bar y=(\hat y_i-\bar y)+e_i$$
を二乗和する。交差項は
$$
\sum(\hat y_i-\bar y)e_i
=\hat\beta_1\sum(x_i-\bar x)e_i
=\hat\beta_1\{\sum x_ie_i-\bar x\sum e_i\}=0.
$$
よって平方和分解が成立する。
###### 本番答案
二乗展開の交差項が残差の二つの直交条件により0となるので成立する。
###### 採点基準
分解式4点、二乗展開6点、交差項の変形6点、結論4点。合計20点。
<!-- solution-end -->

#### L1-01-B03 決定係数と相関係数
- level: B
- minutes: 12
- topics: 決定係数, 相関係数
- techniques: 平方和
- calculation_load: medium

$$S_{xx}=\sum(x_i-\bar x)^2,\quad S_{yy}=\sum(y_i-\bar y)^2,\quad S_{xy}=\sum(x_i-\bar x)(y_i-\bar y)$$
とする。切片を含む単回帰で $R^2=r^2$ を示せ。ただし
$$r=S_{xy}/\sqrt{S_{xx}S_{yy}}.$$

<!-- solution-start -->
##### 解答
###### 詳細解答
$\hat y_i-\bar y=\hat\beta_1(x_i-\bar x)$ より
$$SSR=\hat\beta_1^2S_{xx}=S_{xy}^2/S_{xx}.$$
したがって
$$R^2=SSR/S_{yy}=S_{xy}^2/(S_{xx}S_{yy})=r^2.$$
###### 本番答案
$SSR=\hat\beta_1^2S_{xx}=S_{xy}^2/S_{xx}$ より直ちに $R^2=r^2$。
###### 採点基準
中心化6点、$SSR$6点、代入4点、結論4点。合計20点。
<!-- solution-end -->

#### L1-01-B04 傾きのt検定
- level: B
- minutes: 14
- topics: 回帰係数の検定
- techniques: t分布
- calculation_load: medium

正規線形単回帰で $n=12$、$S_{xx}=25$、$\hat\beta_1=1.8$、$SSE=70$ を得た。$s^2=SSE/(n-2)$ とする。

1. $s^2$ と $s/\sqrt{S_{xx}}$ を求めよ。
2. $H_0:\beta_1=0$ のt統計量を求めよ。
3. 帰無分布を答えよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
残差自由度は10なので $s^2=7$。標準誤差は $\sqrt7/5$。
$$T=\frac{1.8}{\sqrt7/5}=\frac9{\sqrt7}\approx3.40.$$
$H_0$ のもとで $T\sim t_{10}$。
###### 本番答案
$s^2=7$、標準誤差 $\sqrt7/5$、$T=9/\sqrt7\sim t_{10}$。
###### 採点基準
自由度・分散6点、標準誤差5点、t値5点、分布4点。合計20点。
<!-- solution-end -->

### Level C：本番標準

#### L1-01-C01 回帰直線・残差・決定係数
- level: C
- minutes: 22
- topics: 最小二乗, 平方和分解
- techniques: 一連の回帰計算
- calculation_load: high

$$ (x_i,y_i)=(0,1),(1,2),(2,2),(3,5) $$
について、(1) $\bar x,\bar y,S_{xx},S_{xy}$、(2) 回帰直線、(3) 当てはめ値と残差、(4) $SST,SSE,SSR$、(5) $R^2$ を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$\bar x=3/2,\quad\bar y=5/2,\quad S_{xx}=5,$$
$$S_{xy}=(-1.5)(-1.5)+(-0.5)(-0.5)+(0.5)(-0.5)+(1.5)(2.5)=6.$$
よって
$$\hat y=7/10+(6/5)x.$$
当てはめ値は $(0.7,1.9,3.1,4.3)$、残差は $(0.3,0.1,-1.1,0.7)$。
$$SSE=1.8,\quad SST=9,\quad SSR=7.2,$$
したがって $R^2=0.8$。
###### 本番答案
$\bar x=3/2,\bar y=5/2,S_{xx}=5,S_{xy}=6$、$\hat y=7/10+(6/5)x$。残差 $(0.3,0.1,-1.1,0.7)$、$SST=9,SSE=1.8,SSR=7.2,R^2=0.8$。
###### 採点基準
基本量4点、回帰直線4点、残差4点、平方和5点、決定係数3点。合計20点。
<!-- solution-end -->

#### L1-01-C02 傾きと切片の共分散
- level: C
- minutes: 20
- topics: 回帰係数の分布
- techniques: 線形結合, 共分散
- calculation_load: high

$Y_i=\beta_0+\beta_1x_i+\varepsilon_i$、$E[\varepsilon_i]=0$、$\operatorname{Var}(\varepsilon_i)=\sigma^2$、異なる誤差は無相関とする。

1. $\hat\beta_1-\beta_1=S_{xx}^{-1}\sum(x_i-\bar x)\varepsilon_i$ を示せ。
2. $\hat\beta_0-\beta_0=\bar\varepsilon-\bar x(\hat\beta_1-\beta_1)$ を示せ。
3. $\operatorname{Cov}(\bar\varepsilon,\hat\beta_1)=0$ を示せ。
4. $\operatorname{Var}(\hat\beta_0)$ と $\operatorname{Cov}(\hat\beta_0,\hat\beta_1)$ を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
(1) は傾き公式へモデル式を代入して得る。(2) は $\bar Y=\beta_0+\beta_1\bar x+\bar\varepsilon$ と切片公式から得る。
$$
\operatorname{Cov}(\bar\varepsilon,\hat\beta_1-\beta_1)
=\frac{\sigma^2}{nS_{xx}}\sum(x_i-\bar x)=0.
$$
よって
$$\operatorname{Var}(\hat\beta_0)=\sigma^2(1/n+\bar x^2/S_{xx}),$$
$$\operatorname{Cov}(\hat\beta_0,\hat\beta_1)=-\bar x\sigma^2/S_{xx}.$$
###### 本番答案
誤差表示と $\sum(x_i-\bar x)=0$ から上式を得る。結果は
$$\operatorname{Var}(\hat\beta_0)=\sigma^2(1/n+\bar x^2/S_{xx}),\quad\operatorname{Cov}(\hat\beta_0,\hat\beta_1)=-\bar x\sigma^2/S_{xx}.$$
###### 採点基準
傾き表示4点、切片表示4点、共分散0の導出5点、分散4点、共分散3点。合計20点。
<!-- solution-end -->

#### L1-01-C03 平均応答の信頼区間
- level: C
- minutes: 20
- topics: 平均応答, 区間推定
- techniques: t分布
- calculation_load: medium

正規線形単回帰で $n=10,\bar x=4,S_{xx}=20,\hat\beta_0=2,\hat\beta_1=1.5,s=2$ を得た。$x_0=6$ での平均応答について、推定値と標準誤差
$$s\sqrt{1/n+(x_0-\bar x)^2/S_{xx}}$$
を求め、$t_8$ の上側2.5%点を2.306として95%信頼区間を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$\hat m(6)=2+1.5\cdot6=11.$$
標準誤差は
$$2\sqrt{1/10+4/20}=2\sqrt{0.3}.$$
したがって
$$11\pm2.306\cdot2\sqrt{0.3}\approx(8.47,13.53).$$
###### 本番答案
$\hat m(6)=11$、標準誤差 $2\sqrt{0.3}$、95%信頼区間は約 $(8.47,13.53)$。
###### 採点基準
推定値4点、標準誤差8点、自由度4点、区間4点。合計20点。
<!-- solution-end -->

#### L1-01-C04 新しい観測値の予測区間
- level: C
- minutes: 20
- topics: 予測
- techniques: 予測分散, t分布
- calculation_load: medium

C03と同じ結果を用い、$x_0=6$ での新しい1観測 $Y_0$ の点予測、予測標準誤差
$$s\sqrt{1+1/n+(x_0-\bar x)^2/S_{xx}}$$
および95%予測区間を求めよ。平均応答の信頼区間より広い理由も述べよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
点予測は11。予測標準誤差は
$$2\sqrt{1+0.1+0.2}=2\sqrt{1.3}.$$
よって
$$11\pm2.306\cdot2\sqrt{1.3}\approx(5.74,16.26).$$
新観測自身の誤差分散 $\sigma^2$ が加わるため平均応答の区間より広い。
###### 本番答案
点予測11、予測標準誤差 $2\sqrt{1.3}$、95%予測区間約 $(5.74,16.26)$。新観測自身の誤差分散が追加されるため広い。
###### 採点基準
点予測3点、標準誤差6点、区間6点、理由5点。合計20点。
<!-- solution-end -->

#### L1-01-C05 回帰のF検定とt検定
- level: C
- minutes: 22
- topics: 回帰の分散分析, 検定
- techniques: F分布, t分布
- calculation_load: high

正規線形単回帰で $n=12,SSR=72,SSE=36$ を得た。$H_0:\beta_1=0$ を考える。

1. 回帰・残差・全体の自由度を求めよ。
2. F統計量を求め、帰無分布を答えよ。
3. 同じデータで傾きのt統計量を $T$ とすると $F=T^2$ となることを示せ。

<!-- solution-start -->
##### 解答
###### 詳細解答
自由度は回帰1、残差10、全体11。
$$F=\frac{72/1}{36/10}=20\sim F_{1,10}\quad(H_0).$$
また $SSR=\hat\beta_1^2S_{xx}$、$s^2=SSE/(n-2)$ なので
$$T^2=\frac{\hat\beta_1^2S_{xx}}{s^2}=\frac{SSR}{SSE/(n-2)}=F.$$
###### 本番答案
自由度 $(1,10,11)$、$F=20\sim F_{1,10}$。$T^2=\hat\beta_1^2S_{xx}/s^2=SSR/MSE=F$。
###### 採点基準
自由度4点、F値・分布7点、$F=T^2$導出9点。合計20点。
<!-- solution-end -->

### Level D：発展

#### L1-01-D01 説明変数の中心化
- level: D
- minutes: 30
- topics: 回帰係数
- techniques: 変数変換, 共分散
- calculation_load: high

$x_i$ に対する線形単回帰で $z_i=x_i-\bar x$ とし、
$$Y_i=\alpha_0+\alpha_1z_i+\varepsilon_i$$
と書き直す。

1. $\alpha_0,\alpha_1$ と $\beta_0,\beta_1$ の関係を求めよ。
2. $\hat\alpha_0=\bar Y,\hat\alpha_1=\hat\beta_1$ を示せ。
3. 等分散・無相関誤差のもとで $\operatorname{Cov}(\hat\alpha_0,\hat\alpha_1)=0$ を示せ。
4. 中心化の意味を説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$x_i=z_i+\bar x$ より
$$\alpha_0=\beta_0+\beta_1\bar x,\quad\alpha_1=\beta_1.$$
$\bar z=0$ なので
$$\hat\alpha_0=\bar Y,\quad\hat\alpha_1=S_{zy}/S_{zz}=S_{xy}/S_{xx}=\hat\beta_1.$$
誤差表示から
$$\hat\alpha_0-\alpha_0=\bar\varepsilon,$$
$$\hat\alpha_1-\alpha_1=S_{zz}^{-1}\sum z_i\varepsilon_i.$$
したがって
$$\operatorname{Cov}(\hat\alpha_0,\hat\alpha_1)=\sigma^2\sum z_i/(nS_{zz})=0.$$
中心化すると切片は $x=\bar x$ での平均応答を表し、切片と傾きの推定誤差が無相関になる。
###### 本番答案
$$\alpha_0=\beta_0+\beta_1\bar x,\quad\alpha_1=\beta_1,$$
$$\hat\alpha_0=\bar Y,\quad\hat\alpha_1=\hat\beta_1,$$
$$\operatorname{Cov}(\hat\alpha_0,\hat\alpha_1)=\sigma^2\sum z_i/(nS_{zz})=0.$$
###### 採点基準
母数変換4点、推定量5点、共分散0の導出7点、解釈4点。合計20点。
<!-- solution-end -->

## 8. 30分ドリル

### L1-01-DRILL-01 一連の単回帰推測

$$Y_i=\beta_0+\beta_1x_i+\varepsilon_i,\qquad\varepsilon_i\overset{\text{独立}}{\sim}N(0,\sigma^2)$$
とする。$n=8$ のデータから
$$\bar x=5,\quad\bar y=12,\quad S_{xx}=40,\quad S_{xy}=60,\quad SST=120$$
を得た。

1. 最小二乗回帰直線を求めよ。
2. $SSR,SSE,R^2$ を求めよ。
3. $s^2=SSE/(n-2)$ を求めよ。
4. $H_0:\beta_1=0$ のt統計量と帰無分布を求めよ。
5. $x_0=7$ での平均応答の推定値と標準誤差を求めよ。
6. 同じ $x_0$ での新観測の予測標準誤差を求め、5との違いを説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$\hat\beta_1=60/40=1.5,\quad\hat\beta_0=12-1.5\cdot5=4.5.$$
$$SSR=\hat\beta_1S_{xy}=90,\quad SSE=30,\quad R^2=0.75.$$
残差自由度6より $s^2=5$。
傾きの標準誤差は
$$\sqrt{5/40}=1/\sqrt8,$$
したがって
$$T=1.5\sqrt8=3\sqrt2\sim t_6\quad(H_0).$$
$x_0=7$ で平均応答推定値は15。標準誤差は
$$\sqrt5\sqrt{1/8+4/40}=\sqrt{9/8}=3/(2\sqrt2).$$
新観測の予測標準誤差は
$$\sqrt5\sqrt{1+1/8+4/40}=\sqrt{49/8}=7/(2\sqrt2).$$
新観測自身の誤差分散が加わるため後者が大きい。
###### 本番答案
$$\hat y=4.5+1.5x,\quad SSR=90,SSE=30,R^2=0.75,s^2=5.$$
$$T=3\sqrt2\sim t_6.$$
$x_0=7$ では平均応答15、標準誤差 $3/(2\sqrt2)$、新観測の予測標準誤差 $7/(2\sqrt2)$。
###### 採点基準
回帰直線15点、平方和・決定係数20点、誤差分散10点、t検定20点、平均応答20点、予測と解釈15点。合計100点。
<!-- solution-end -->

## 9. 本番での確認点

- 傾きの公式を使う前に $S_{xx},S_{xy}$ の定義を確認する。
- 平方和分解では交差項が消える理由を残差直交性へ戻って説明できるようにする。
- 決定係数は当てはまりの指標であり、因果関係の証明ではない。
- 傾きのt検定では残差自由度が $n-2$ であることを確認する。
- 平均応答の信頼区間と新観測の予測区間では、平方根内の追加の1の有無を区別する。
