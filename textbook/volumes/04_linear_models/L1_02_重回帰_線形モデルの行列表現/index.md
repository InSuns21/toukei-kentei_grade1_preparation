# L1-02 重回帰・線形モデルの行列表現

説明変数が複数になると、単回帰の式を成分ごとに追うより行列でまとめた方が構造が明確になります。本章では
$$
\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon
$$
を出発点に、最小二乗推定、Gauss--Markovの定理、線形結合の分布、線形対比、線形制約を一つの流れとして扱います。特に「線形対比とは何か」を、平均差の具体例から導入します。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 重回帰を行列形式で表し、各行列の次元を答える。
- 正規方程式から $\hat{\boldsymbol\beta}$ を導く。
- $E[\hat{\boldsymbol\beta}]$ と分散共分散行列を求める。
- Gauss--Markovの定理が何を最適としているか説明する。
- 線形対比 $\boldsymbol c^{\mathsf T}\boldsymbol\beta$ の推定量と分散を求める。
- $\boldsymbol R\boldsymbol\beta=\boldsymbol r$ の線形制約を検定するための平方和を構成する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 線形モデル | $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ |
| 線形結合の分布 | $\boldsymbol c^{\mathsf T}\hat{\boldsymbol\beta}$ |
| 線形対比 | 係数和0の平均比較 |
| 線形制約 | $\boldsymbol R\boldsymbol\beta=\boldsymbol r$ |
| Gauss--Markov | BLUEの意味と証明の骨格 |

## 前提知識チェック

1. L1-01: 最小二乗法と残差平方和。
2. F0-00: 転置、逆行列、階数、二次形式。
3. P3-03: 多変量正規分布と線形変換。
4. S1-01: カイ二乗・F分布。

---

## 1. 導入

例えば材料強度を温度 $x_1$ と圧力 $x_2$ で説明するなら
$$
Y_i=\beta_0+\beta_1x_{i1}+\beta_2x_{i2}+\varepsilon_i.
$$
全観測を縦に並べると
$$
\boldsymbol Y=
\begin{pmatrix}Y_1\\ \vdots\\ Y_n\end{pmatrix},\quad
\boldsymbol X=
\begin{pmatrix}
1&x_{11}&x_{12}\\
\vdots&\vdots&\vdots\\
1&x_{n1}&x_{n2}
\end{pmatrix},\quad
\boldsymbol\beta=
\begin{pmatrix}\beta_0\\\beta_1\\\beta_2\end{pmatrix}.
$$
すると全ての式が $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ にまとまる。

## 2. 定義と記号

$\boldsymbol Y\in\mathbb R^n$、$\boldsymbol X\in\mathbb R^{n\times p}$、$\boldsymbol\beta\in\mathbb R^p$ とする。基本線形モデルは
$$
E[\boldsymbol\varepsilon]=\boldsymbol0,\qquad
\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I_n.
$$
推測で正規性が必要な場合は
$$
\boldsymbol\varepsilon\sim N_n(\boldsymbol0,\sigma^2\boldsymbol I_n)
$$
とする。$\boldsymbol X$ は列フルランク $p$ と仮定する。

## 3. 定理・公式と導出

### 3.1 最小二乗推定

残差平方和は
$$
Q(\boldsymbol b)=(\boldsymbol Y-\boldsymbol X\boldsymbol b)^{\mathsf T}(\boldsymbol Y-\boldsymbol X\boldsymbol b).
$$
展開して $\boldsymbol b$ で微分すると
$$
\frac{\partial Q}{\partial\boldsymbol b}
=-2\boldsymbol X^{\mathsf T}\boldsymbol Y
+2\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol b.
$$
したがって正規方程式は
$$
\boldsymbol X^{\mathsf T}\boldsymbol X\hat{\boldsymbol\beta}
=\boldsymbol X^{\mathsf T}\boldsymbol Y,
$$
ゆえに
$$
\hat{\boldsymbol\beta}
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y.
$$

当てはめ値は
$$
\hat{\boldsymbol Y}=\boldsymbol H\boldsymbol Y,
\qquad
\boldsymbol H=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}.
$$
$\boldsymbol H$ は $\boldsymbol X$ の列空間への直交射影行列で、$\boldsymbol H^2=\boldsymbol H$、$\boldsymbol H^{\mathsf T}=\boldsymbol H$ を満たす。残差は
$$
\boldsymbol e=(\boldsymbol I-\boldsymbol H)\boldsymbol Y
$$
であり、$\boldsymbol X^{\mathsf T}\boldsymbol e=\boldsymbol0$。

### 3.2 平均と分散

$$
\hat{\boldsymbol\beta}
=\boldsymbol\beta+(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol\varepsilon
$$
なので
$$
E[\hat{\boldsymbol\beta}]=\boldsymbol\beta,
$$
$$
\operatorname{Var}(\hat{\boldsymbol\beta})
=\sigma^2(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}.
$$
正規誤差なら
$$
\hat{\boldsymbol\beta}\sim
N_p\left(\boldsymbol\beta,\sigma^2(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\right).
$$

### 3.3 Gauss--Markovの定理

正規性を仮定しなくても、平均0・等分散・無相関の誤差と列フルランクの $\boldsymbol X$ のもとで、$\hat{\boldsymbol\beta}$ は全ての線形不偏推定量の中で分散が最小である。この性質をBLUEと呼ぶ。

任意の線形不偏推定量を
$$
\tilde{\boldsymbol\beta}=\boldsymbol A\boldsymbol Y
$$
とする。不偏性から $\boldsymbol A\boldsymbol X=\boldsymbol I_p$。最小二乗推定量の係数行列を
$$
\boldsymbol A_0=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
$$
とし、$\boldsymbol A=\boldsymbol A_0+\boldsymbol D$ と書くと $\boldsymbol D\boldsymbol X=\boldsymbol0$。このため交差項が消え
$$
\operatorname{Var}(\tilde{\boldsymbol\beta})
-\operatorname{Var}(\hat{\boldsymbol\beta})
=\sigma^2\boldsymbol D\boldsymbol D^{\mathsf T}
$$
は半正定値である。

### 3.4 線形対比

三つの処理平均を $\mu_1,\mu_2,\mu_3$ とする。「処理1と処理2の差」は
$$
\mu_1-\mu_2
$$
で、係数 $(1,-1,0)$ の和は0である。「処理1と、処理2・3の平均との差」は
$$
\mu_1-\frac12\mu_2-\frac12\mu_3
$$
で、やはり係数和は0である。

一般に平均効果の線形結合
$$
L=\sum_{j=1}^k c_j\mu_j
$$
で
$$\sum_{j=1}^k c_j=0$$
を満たすものを線形対比という。係数和0は、全ての平均に同じ定数を足しても比較量が変わらないことに対応する。

回帰係数の一般の線形結合 $\boldsymbol c^{\mathsf T}\boldsymbol\beta$ に対して
$$
\widehat L=\boldsymbol c^{\mathsf T}\hat{\boldsymbol\beta},
$$
$$
\operatorname{Var}(\widehat L)
=\sigma^2\boldsymbol c^{\mathsf T}(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol c.
$$

### 3.5 線形制約

複数の仮説を
$$
H_0:\boldsymbol R\boldsymbol\beta=\boldsymbol r
$$
とまとめる。$\boldsymbol R$ の階数を $q$ とする。正規線形モデルでは
$$
F=
\frac{(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r)^{\mathsf T}
\left[\boldsymbol R(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol R^{\mathsf T}\right]^{-1}
(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r)/q}
{SSE/(n-p)}
\sim F_{q,n-p}
$$
となる。

$\boldsymbol r=\boldsymbol0$ のとき、これは制約付きモデルと制約なしモデルの残差平方和差
$$
F=\frac{(SSE_R-SSE_F)/q}{SSE_F/(n-p)}
$$
とも書ける。

## 4. 典型例題

$\beta=(\beta_0,\beta_1,\beta_2)^{\mathsf T}$ に対し「二つの傾きが等しい」は
$$
H_0:\beta_1-\beta_2=0
$$
なので
$$
\boldsymbol R=(0,1,-1),\qquad r=0.
$$
「両方の傾きが0」は
$$
\boldsymbol R=
\begin{pmatrix}0&1&0\\0&0&1\end{pmatrix},\qquad
\boldsymbol r=\begin{pmatrix}0\\0\end{pmatrix}.
$$
仮説を文章から行列へ翻訳できることが重要である。

## 5. 演習

### L1-02-A01 線形対比を作る

- Level: A
- 目安時間: 8分
- 主題: 線形対比
- 使用技術: 係数設計

三つの平均 $\mu_1,\mu_2,\mu_3$ について「第1群と、第2・第3群の平均との差」を線形対比で表せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

求める量は
$$L=\mu_1-\frac{\mu_2+\mu_3}{2}.$$
係数は $(1,-1/2,-1/2)$ で、その和は0だから線形対比である。

##### 本番答案

$L=\mu_1-(\mu_2+\mu_3)/2$。係数和 $1-1/2-1/2=0$ より線形対比。

##### 採点基準

- 比較量: 12点
- 係数和0の確認: 8点

<!-- solution-end -->

### L1-02-B01 一般線形仮説

- Level: B
- 目安時間: 15分
- 主題: 線形制約
- 使用技術: 行列表現、F統計量

$\boldsymbol\beta=(\beta_0,\beta_1,\beta_2)^{\mathsf T}$ に対して $H_0:\beta_1=\beta_2=0$ を $\boldsymbol R\boldsymbol\beta=\boldsymbol r$ と表し、検定統計量の自由度を答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\boldsymbol R=
\begin{pmatrix}0&1&0\\0&0&1\end{pmatrix},\quad
\boldsymbol r=\boldsymbol0.
$$
$\operatorname{rank}(\boldsymbol R)=2$ なので分子自由度は2。係数数が $p=3$ なら分母自由度は $n-3$。したがって $H_0$ のもとで $F\sim F_{2,n-3}$。

##### 本番答案

上記 $\boldsymbol R,\boldsymbol r$ を置く。独立な制約は2本なので $F_{2,n-3}$。

##### 採点基準

- $R,r$: 10点
- 階数: 4点
- 自由度: 6点

<!-- solution-end -->

## 6. 本番ドリル

### L1-02-C01 制約付き回帰

説明変数2個、切片ありの重回帰で $n=20$ とする。制約なしモデルの $SSE_F=80$、$H_0:\beta_1=\beta_2=0$ の制約付きモデルで $SSE_R=120$ を得た。(1) 独立な制約数を求めよ。(2) F統計量を求めよ。(3) 帰無分布を答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

制約数 $q=2$、係数数 $p=3$。
$$
F=\frac{(120-80)/2}{80/(20-3)}
=\frac{20}{80/17}=4.25.
$$
帰無分布は $F_{2,17}$。

##### 本番答案

$q=2,p=3$ より $F=((120-80)/2)/(80/17)=4.25\sim F_{2,17}$。

##### 採点基準

- 制約数: 4点
- 統計量: 10点
- 自由度: 6点

<!-- solution-end -->

## 7. 過去問との対応

理工学の「線形推測」にある線形モデル、線形結合の分布、線形対比、線形制約を直接担当する。L1-03の分散分析は、ここで学ぶ射影・制約・F検定を群平均モデルへ適用したものとして読む。

## 8. 章末チェック

- $X,Y,\beta$ の次元を間違えず書ける。
- 正規方程式を行列微分または平方完成から導ける。
- BLUEが「線形不偏推定量の中で最小分散」であることを説明できる。
- 線形対比を係数和0の比較として具体例から作れる。
- 文章で与えられた仮説を $R\beta=r$ へ翻訳できる。
