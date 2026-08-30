# L1-01 単回帰と最小二乗法

線形モデルは「説明変数が変わったとき、平均的な応答がどのように動くか」を数式で表す枠組みです。本章では最も単純な単回帰から始め、最小二乗推定量を公式として暗記するのではなく、残差平方和を最小にする条件から導きます。さらに、誤差を正規分布と仮定したときに推定・検定へどうつながるかを整理します。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 単回帰モデルで回帰係数と誤差の意味を説明する。
- 残差平方和を微分して最小二乗推定量を導く。
- 回帰直線が $(\bar x,\bar y)$ を通ることを示す。
- 残差平方和、全平方和、回帰平方和の分解を使う。
- $R^2$ を計算し、その意味と限界を説明する。
- 正規誤差のもとで $\hat\beta_1$ の標本分布と標準誤差を求める。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 線形モデル | $Y_i=\beta_0+\beta_1x_i+\varepsilon_i$ |
| 最小二乗法 | 正規方程式、最小二乗推定量 |
| 線形結合の分布 | $\hat\beta_1$ を $Y_i$ の線形結合として扱う |
| 回帰の評価 | 残差、平方和分解、決定係数 |

## 前提知識チェック

1. P2-02: 期待値、分散、共分散を使う。
2. P3-02: 正規分布と標準化を使う。
3. S1-01: 正規標本の平方和とt分布の考え方を使う。
4. I1-02は後続の一般論だが、本章では最小二乗法に必要な部分をここで導入する。

---

## 1. 導入

温度 $x$ と材料強度 $Y$ の関係を考える。各温度で完全に同じ強度が出るわけではないが、平均的には温度に応じて直線的に変化すると仮定する。このとき
$$
Y_i=\beta_0+\beta_1x_i+\varepsilon_i
$$
と書く。$\beta_0+\beta_1x_i$ は条件付き平均 $E[Y_i\mid x_i]$、$\varepsilon_i$ はその平均からのずれである。

ここで重要なのは「観測点を完全に通る直線」を探すのではなく、全体としてずれが小さい直線を探すことである。ずれ
$$e_i=y_i-(b_0+b_1x_i)$$
を残差と呼び、その二乗和
$$Q(b_0,b_1)=\sum_{i=1}^n e_i^2$$
を最小にする $(b_0,b_1)$ を最小二乗推定量とする。

## 2. 定義と記号

固定された説明変数 $x_1,\ldots,x_n$ に対して
$$
Y_i=\beta_0+\beta_1x_i+\varepsilon_i,\qquad i=1,\ldots,n
$$
とする。基本仮定は
$$
E[\varepsilon_i]=0,\qquad \operatorname{Var}(\varepsilon_i)=\sigma^2,
$$
であり、異なる $i$ の誤差は無相関とする。分布まで使う推測ではさらに
$$\varepsilon_i\overset{\text{独立}}{\sim}N(0,\sigma^2)$$
を仮定する。

記号を
$$
\bar x=\frac1n\sum x_i,\quad \bar Y=\frac1n\sum Y_i,
$$
$$
S_{xx}=\sum (x_i-\bar x)^2,\quad
S_{xy}=\sum (x_i-\bar x)(Y_i-\bar Y)
$$
とする。$S_{xx}>0$、すなわち全ての $x_i$ が同じではないことを仮定する。

## 3. 定理・公式と導出

### 3.1 最小二乗推定量

残差平方和
$$
Q(b_0,b_1)=\sum_{i=1}^n\{Y_i-b_0-b_1x_i\}^2
$$
を偏微分すると
$$
\frac{\partial Q}{\partial b_0}=-2\sum(Y_i-b_0-b_1x_i),
$$
$$
\frac{\partial Q}{\partial b_1}=-2\sum x_i(Y_i-b_0-b_1x_i).
$$
これらを0とおく。第一式から
$$
\hat\beta_0=\bar Y-\hat\beta_1\bar x.
$$
これを第二式へ代入すると
$$
\hat\beta_1=\frac{S_{xy}}{S_{xx}},\qquad
\hat\beta_0=\bar Y-\hat\beta_1\bar x.
$$
したがって推定回帰直線は必ず $(\bar x,\bar Y)$ を通る。

### 3.2 不偏性と分散

$Y_i=\beta_0+\beta_1x_i+\varepsilon_i$ を代入すると
$$
\hat\beta_1
=\beta_1+\frac{\sum(x_i-\bar x)\varepsilon_i}{S_{xx}}.
$$
よって
$$E[\hat\beta_1]=\beta_1,
\qquad
\operatorname{Var}(\hat\beta_1)=\frac{\sigma^2}{S_{xx}}.
$$
また
$$
\operatorname{Var}(\hat\beta_0)
=\sigma^2\left(\frac1n+\frac{\bar x^2}{S_{xx}}\right).
$$
説明変数が広く散らばるほど $S_{xx}$ が大きくなり、傾きの推定精度は高くなる。

### 3.3 平方和分解

予測値を $\hat Y_i=\hat\beta_0+\hat\beta_1x_i$、残差を $e_i=Y_i-\hat Y_i$ とする。最小二乗法の正規方程式から
$$\sum e_i=0,\qquad \sum x_ie_i=0.$$
この直交性により
$$
\sum(Y_i-\bar Y)^2
=
\sum(\hat Y_i-\bar Y)^2+\sum(Y_i-\hat Y_i)^2.
$$
左辺を全平方和 $SST$、第一項を回帰平方和 $SSR$、第二項を残差平方和 $SSE$ と呼ぶ。

決定係数は
$$
R^2=\frac{SSR}{SST}=1-\frac{SSE}{SST}.
$$
$R^2$ は標本内で説明された変動の割合であり、因果関係や予測の外的妥当性を保証する量ではない。

### 3.4 正規誤差のもとでの推測

正規誤差を仮定すると $\hat\beta_1$ は正規分布に従う。
$$
\hat\beta_1\sim N\left(\beta_1,\frac{\sigma^2}{S_{xx}}\right).
$$
誤差分散の不偏推定量は
$$
s^2=\frac{SSE}{n-2}.
$$
2個の回帰係数を推定したため残差の自由度は $n-2$ となる。さらに
$$
\frac{\hat\beta_1-\beta_1}{s/\sqrt{S_{xx}}}\sim t_{n-2}.
$$

## 4. 典型例題

$x=(0,1,2)$、$y=(1,2,4)$ とする。
$$
\bar x=1,\qquad \bar y=\frac73,
$$
$$
S_{xx}=(-1)^2+0^2+1^2=2,
$$
$$
S_{xy}=(-1)\left(1-\frac73\right)+0+1\left(4-\frac73\right)=3.
$$
したがって
$$
\hat\beta_1=\frac32,\qquad
\hat\beta_0=\frac73-\frac32=\frac56.
$$
回帰直線は $\hat y=5/6+(3/2)x$ である。

## 5. 演習

### L1-01-A01 最小二乗推定量の導出

- Level: A
- 目安時間: 8分
- 主題: 単回帰
- 使用技術: 偏微分、正規方程式

$Y_i=\beta_0+\beta_1x_i+\varepsilon_i$ に対し、$Q(b_0,b_1)=\sum(Y_i-b_0-b_1x_i)^2$ を最小化して $\hat\beta_0,\hat\beta_1$ を導け。

<!-- solution-start -->

#### 解答

##### 詳細解答

$Q$ を $b_0,b_1$ で偏微分し0とおくと
$$
\sum(Y_i-b_0-b_1x_i)=0,
\quad
\sum x_i(Y_i-b_0-b_1x_i)=0.
$$
第一式から $b_0=\bar Y-b_1\bar x$。第二式へ代入すると
$$
\sum(x_i-\bar x)(Y_i-\bar Y)-b_1\sum(x_i-\bar x)^2=0.
$$
よって
$$
\hat\beta_1=\frac{S_{xy}}{S_{xx}},\qquad
\hat\beta_0=\bar Y-\hat\beta_1\bar x.
$$

##### 本番答案

正規方程式を立て、第一式から $\hat\beta_0=\bar Y-\hat\beta_1\bar x$。これを第二式へ代入して $\hat\beta_1=S_{xy}/S_{xx}$ を得る。

##### 採点基準

- 偏微分2式: 6点
- 切片の式: 4点
- 傾きの導出: 8点
- 条件 $S_{xx}>0$: 2点

<!-- solution-end -->

### L1-01-B01 傾きの分散

- Level: B
- 目安時間: 12分
- 主題: 推定量の分布
- 使用技術: 線形結合、分散

誤差が独立で平均0、分散 $\sigma^2$ とする。$\hat\beta_1$ が不偏であり、$\operatorname{Var}(\hat\beta_1)=\sigma^2/S_{xx}$ であることを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\hat\beta_1=\beta_1+\frac{\sum(x_i-\bar x)\varepsilon_i}{S_{xx}}
$$
と書ける。平均を取れば誤差項の平均が0なので不偏。独立性より
$$
\operatorname{Var}(\hat\beta_1)=
\frac{\sigma^2\sum(x_i-\bar x)^2}{S_{xx}^2}
=\frac{\sigma^2}{S_{xx}}.
$$

##### 本番答案

上式に変形し、$E[\varepsilon_i]=0$ と独立同分散性を使う。

##### 採点基準

- 線形結合表示: 8点
- 不偏性: 4点
- 分散計算: 8点

<!-- solution-end -->

## 6. 本番ドリル

### L1-01-C01 回帰直線と平方和分解

$x=(0,1,2,3)$、$y=(1,2,2,5)$ とする。(1) 回帰直線を求めよ。(2) $SST,SSE,SSR$ を計算し、$SST=SSR+SSE$ を確認せよ。(3) $R^2$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\bar x=3/2,\bar y=5/2$、$S_{xx}=5$、$S_{xy}=6$ より
$$\hat\beta_1=\frac65,\qquad \hat\beta_0=\frac7{10}.$$
予測値は $0.7,1.9,3.1,4.3$、残差は $0.3,0.1,-1.1,0.7$ なので
$$SSE=0.09+0.01+1.21+0.49=1.8.$$
$$SST=9,\qquad SSR=7.2,$$
よって $SST=SSR+SSE$、$R^2=0.8$。

##### 本番答案

$S_{xx}=5,S_{xy}=6$ から $\hat y=0.7+1.2x$。残差から $SSE=1.8$、$SST=9$、したがって $SSR=7.2,R^2=0.8$。

##### 採点基準

- 回帰係数: 8点
- 平方和: 8点
- $R^2$: 4点

<!-- solution-end -->

## 7. 過去問との対応

理工学分野の「線形推測」で要求される線形モデルの基礎を担当する。実際の過去問では単回帰だけで終わらず、L1-02の行列表現、線形対比・制約、L1-03の分散分析と組み合わされることが多い。

## 8. 章末チェック

- 最小二乗推定量を暗記せず正規方程式から導ける。
- $S_{xx}$ が傾きの精度を決める理由を説明できる。
- $SST=SSR+SSE$ の直交性を説明できる。
- 残差自由度が $n-2$ になる理由を説明できる。
