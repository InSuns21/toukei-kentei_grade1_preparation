# L1-02 重回帰・線形モデルの行列表現

説明変数が複数になると、観測ごとの回帰式を行列でまとめることで、最小二乗推定・推定量の分散・線形対比・複数の線形制約を同じ仕組みで扱えます。本章では、単回帰で見た「残差を最小にする」「当てはめ値と残差が直交する」という構造を行列へ広げ、一般線形仮説のF検定まで導きます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 重回帰モデルを $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ と書き、各量の次元を説明する。
- 残差平方和の最小化から正規方程式を導く。
- 最小二乗推定量の期待値・分散共分散行列・正規誤差のもとでの分布を求める。
- 射影行列と残差生成行列の対称性・べき等性を確認する。
- ガウス・マルコフの定理を「最良線形不偏推定量」という意味から説明する。
- 一般の線形結合と、群平均の線形対比を区別する。
- $\boldsymbol R\boldsymbol\beta=\boldsymbol r$ の線形制約を行列で表す。
- 制約付き最小二乗推定量と一般線形仮説のF統計量を導く。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 線形モデル | 行列表現、最小二乗推定、射影 |
| 線形結合の分布 | $\boldsymbol c^{\mathsf T}\hat{\boldsymbol\beta}$ |
| 線形対比 | 群平均の係数和0の比較 |
| 線形制約 | $\boldsymbol R\boldsymbol\beta=\boldsymbol r$ |
| ガウス・マルコフの定理 | 線形不偏推定量の分散比較 |

## 前提知識チェック

1. L1-01: 最小二乗法、残差、平方和分解。
2. F0-00: 転置、逆行列、階数、二次形式、射影、ラグランジュ未定乗数法。
3. P3-03: 多変量正規分布とアフィン変換。
4. S1-01: カイ二乗分布、t分布、F分布。

---

## 1. まず3本の回帰式を1本の行列式へまとめる

応答 $Y_i$ を二つの説明変数 $x_{i1},x_{i2}$ で説明すると
$$
Y_i=\beta_0+\beta_1x_{i1}+\beta_2x_{i2}+\varepsilon_i
$$
です。$n$ 個の観測をまとめると
$$
\boldsymbol Y=
\begin{pmatrix}Y_1\\ \vdots\\ Y_n\end{pmatrix},
\qquad
\boldsymbol\beta=
\begin{pmatrix}\beta_0\\\beta_1\\\beta_2\end{pmatrix},
$$
$$
\boldsymbol X=
\begin{pmatrix}
1&x_{11}&x_{12}\\
\vdots&\vdots&\vdots\\
1&x_{n1}&x_{n2}
\end{pmatrix}
$$
として
$$
\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon
$$
と書けます。

一般に
$$
\boldsymbol Y\in\mathbb R^n,
\qquad
\boldsymbol X\in\mathbb R^{n\times p},
\qquad
\boldsymbol\beta\in\mathbb R^p.
$$
本章では $\boldsymbol X$ の列が一次独立、すなわち $\operatorname{rank}(\boldsymbol X)=p$ とします。このとき $\boldsymbol X^{\mathsf T}\boldsymbol X$ は逆行列を持ちます。

誤差について
$$
E[\boldsymbol\varepsilon]=\boldsymbol0,
\qquad
\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I_n
$$
を基本仮定とします。正確な標本分布を使うときはさらに
$$
\boldsymbol\varepsilon\sim N_n(\boldsymbol0,\sigma^2\boldsymbol I_n)
$$
を仮定します。

## 2. 最小二乗推定を行列から導く

候補 $\boldsymbol b\in\mathbb R^p$ に対する残差平方和は
$$
Q(\boldsymbol b)
=(\boldsymbol Y-\boldsymbol X\boldsymbol b)^{\mathsf T}
(\boldsymbol Y-\boldsymbol X\boldsymbol b).
$$
展開すると
$$
Q(\boldsymbol b)
=\boldsymbol Y^{\mathsf T}\boldsymbol Y
-2\boldsymbol b^{\mathsf T}\boldsymbol X^{\mathsf T}\boldsymbol Y
+\boldsymbol b^{\mathsf T}\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol b.
$$
$\boldsymbol X^{\mathsf T}\boldsymbol X$ は対称なので
$$
\nabla_{\boldsymbol b}Q
=-2\boldsymbol X^{\mathsf T}\boldsymbol Y
+2\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol b.
$$
これを0と置くと正規方程式
$$
\boldsymbol X^{\mathsf T}\boldsymbol X\hat{\boldsymbol\beta}
=\boldsymbol X^{\mathsf T}\boldsymbol Y
$$
を得ます。列フルランクの仮定から
$$
\boxed{
\hat{\boldsymbol\beta}
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\boldsymbol Y
}
$$
です。

## 3. 当てはめ値・残差・射影行列

当てはめ値は
$$
\hat{\boldsymbol Y}
=\boldsymbol X\hat{\boldsymbol\beta}
=\boldsymbol H\boldsymbol Y,
$$
$$
\boldsymbol H
=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}.
$$
$\boldsymbol H$ は $\boldsymbol X$ の列空間への直交射影行列です。

転置すると
$$
\boldsymbol H^{\mathsf T}
=\boldsymbol H
$$
で、二乗すると
$$
\begin{aligned}
\boldsymbol H^2
&=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\boldsymbol X
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\\
&=\boldsymbol H.
\end{aligned}
$$
すなわち対称かつべき等です。

残差は
$$
\boldsymbol e
=\boldsymbol Y-\hat{\boldsymbol Y}
=(\boldsymbol I_n-\boldsymbol H)\boldsymbol Y.
$$
正規方程式より
$$
\boldsymbol X^{\mathsf T}\boldsymbol e=\boldsymbol0.
$$
したがって残差は設計行列の全ての列と直交します。

残差生成行列
$$
\boldsymbol M=\boldsymbol I_n-\boldsymbol H
$$
も対称かつべき等で、
$$
\boldsymbol H\boldsymbol M=\boldsymbol0.
$$
当てはめ方向と残差方向が直交することを行列で表しています。

## 4. 最小二乗推定量の平均・分散・分布

モデル式を代入すると
$$
\begin{aligned}
\hat{\boldsymbol\beta}
&=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
(\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon)\\
&=\boldsymbol\beta
+(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol\varepsilon.
\end{aligned}
$$
したがって
$$
E[\hat{\boldsymbol\beta}]=\boldsymbol\beta.
$$
また
$$
\begin{aligned}
\operatorname{Var}(\hat{\boldsymbol\beta})
&=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
(\sigma^2\boldsymbol I_n)
\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\\
&=\sigma^2(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}.
\end{aligned}
$$
正規誤差ならアフィン変換の閉性より
$$
\hat{\boldsymbol\beta}
\sim
N_p\left(
\boldsymbol\beta,
\sigma^2(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\right).
$$

### 4.1 一つの線形結合を取り出す

任意の固定ベクトル $\boldsymbol c\in\mathbb R^p$ に対して
$$
L=\boldsymbol c^{\mathsf T}\boldsymbol\beta
$$
を考えます。推定量は
$$
\hat L=\boldsymbol c^{\mathsf T}\hat{\boldsymbol\beta}
$$
で、
$$
E[\hat L]=L,
$$
$$
\operatorname{Var}(\hat L)
=\sigma^2\boldsymbol c^{\mathsf T}
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol c.
$$
正規誤差なら
$$
\hat L\sim N\left(
L,
\sigma^2\boldsymbol c^{\mathsf T}
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol c
\right).
$$

## 5. 線形対比は「平均の比較」のための特別な線形結合

三つの群平均 $\mu_1,\mu_2,\mu_3$ を考えます。

「第1群と第2群との差」は
$$
\mu_1-\mu_2
$$
で、係数は $(1,-1,0)$ です。

「第1群と第2・第3群の平均との差」は
$$
\mu_1-\frac12\mu_2-\frac12\mu_3
$$
で、係数は $(1,-1/2,-1/2)$ です。

一般に群平均の線形結合
$$
L=\sum_{i=1}^a c_i\mu_i
$$
で
$$
\sum_{i=1}^a c_i=0
$$
を満たすものを線形対比と呼びます。全ての群平均に同じ定数を加えても対比値が変わらないため、「水準そのもの」ではなく「差」を測る量になっています。

ただし、回帰係数の一般の $\boldsymbol c^{\mathsf T}\boldsymbol\beta$ まで全て係数和0を要求するわけではありません。「線形結合」は一般概念で、「線形対比」は主に群平均比較で使う特別な線形結合です。

## 6. ガウス・マルコフの定理

<a id="thm-l1-02-gauss-markov"></a>

<!-- formal-statement-start -->
> **定理（ガウス・マルコフの定理）**  
> 線形モデル $Y=X\beta+\varepsilon$ で、$X\in\mathbb R^{n\times p}$ は列フルランク、$E[\varepsilon]=0$、$\operatorname{Var}(\varepsilon)=\sigma^2I_n$ とします。このとき最小二乗推定量

$$
\widehat\beta=(X^{\mathsf T}X)^{-1}X^{\mathsf T}Y
$$

> は線形不偏推定量の中で最良です。すなわち任意の線形不偏推定量 $\widetilde\beta=AY$ に対して

$$
\boxed{
\operatorname{Var}(\widetilde\beta)-\operatorname{Var}(\widehat\beta)
\succeq0
}
$$

> が成り立ちます。正規性は仮定しません。
<!-- formal-statement-end -->

誤差が平均0、等分散、互いに無相関で、$\boldsymbol X$ が列フルランクとします。正規性は不要です。

$\hat{\boldsymbol\beta}$ は線形推定量であり不偏です。任意の別の線形不偏推定量を
$$
\tilde{\boldsymbol\beta}=\boldsymbol A\boldsymbol Y
$$
とします。不偏性は
$$
E[\tilde{\boldsymbol\beta}]
=\boldsymbol A\boldsymbol X\boldsymbol\beta
=\boldsymbol\beta
$$
が全ての $\boldsymbol\beta$ で成り立つことなので
$$
\boldsymbol A\boldsymbol X=\boldsymbol I_p.
$$
最小二乗推定量の係数行列を
$$
\boldsymbol A_0
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
$$
とし、
$$
\boldsymbol D=\boldsymbol A-\boldsymbol A_0
$$
と置きます。すると
$$
\boldsymbol D\boldsymbol X
=\boldsymbol A\boldsymbol X-\boldsymbol A_0\boldsymbol X
=\boldsymbol I_p-\boldsymbol I_p
=\boldsymbol0.
$$

分散差を計算すると
$$
\begin{aligned}
\operatorname{Var}(\tilde{\boldsymbol\beta})
&=\sigma^2(\boldsymbol A_0+\boldsymbol D)
(\boldsymbol A_0+\boldsymbol D)^{\mathsf T}\\
&=\sigma^2\boldsymbol A_0\boldsymbol A_0^{\mathsf T}
+\sigma^2\boldsymbol D\boldsymbol D^{\mathsf T},
\end{aligned}
$$
です。交差項は
$$
\boldsymbol A_0\boldsymbol D^{\mathsf T}
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\boldsymbol D^{\mathsf T}
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
(\boldsymbol D\boldsymbol X)^{\mathsf T}
=\boldsymbol0
$$
なので消えます。したがって
$$
\operatorname{Var}(\tilde{\boldsymbol\beta})
-\operatorname{Var}(\hat{\boldsymbol\beta})
=\sigma^2\boldsymbol D\boldsymbol D^{\mathsf T}
$$
は半正定値です。

つまり最小二乗推定量は、線形不偏推定量の中で分散が最小という意味で最良です。

## 7. 線形制約を行列でまとめる

例えば
$$
\boldsymbol\beta=(\beta_0,\beta_1,\beta_2)^{\mathsf T}
$$
に対して「二つの傾きが等しい」は
$$
\beta_1-\beta_2=0
$$
なので
$$
\boldsymbol R=(0,1,-1),
\qquad
\boldsymbol r=(0)
$$
として
$$
\boldsymbol R\boldsymbol\beta=\boldsymbol r
$$
と書けます。

「両方の傾きが0」は
$$
\boldsymbol R=
\begin{pmatrix}
0&1&0\\
0&0&1
\end{pmatrix},
\qquad
\boldsymbol r=
\begin{pmatrix}0\\0\end{pmatrix}.
$$
独立な制約の本数は $\operatorname{rank}(\boldsymbol R)$ です。以下では
$$
q=\operatorname{rank}(\boldsymbol R)
$$
とします。

## 8. 制約付き最小二乗を導く

帰無仮説の制約
$$
\boldsymbol R\boldsymbol\beta=\boldsymbol r
$$
を必ず満たす範囲で残差平方和を最小にします。ラグランジュ関数を
$$
\mathcal L(\boldsymbol b,\boldsymbol\lambda)
=(\boldsymbol Y-\boldsymbol X\boldsymbol b)^{\mathsf T}
(\boldsymbol Y-\boldsymbol X\boldsymbol b)
+2\boldsymbol\lambda^{\mathsf T}
(\boldsymbol R\boldsymbol b-\boldsymbol r)
$$
とします。

$\boldsymbol b$ で微分して0と置くと
$$
-2\boldsymbol X^{\mathsf T}\boldsymbol Y
+2\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol b
+2\boldsymbol R^{\mathsf T}\boldsymbol\lambda
=\boldsymbol0.
$$
制約なし推定量 $\hat{\boldsymbol\beta}$ が
$$
\boldsymbol X^{\mathsf T}\boldsymbol X\hat{\boldsymbol\beta}
=\boldsymbol X^{\mathsf T}\boldsymbol Y
$$
を満たすため
$$
\boldsymbol b
=\hat{\boldsymbol\beta}
-(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol R^{\mathsf T}\boldsymbol\lambda.
$$
これを $\boldsymbol R\boldsymbol b=\boldsymbol r$ に代入すると
$$
\boldsymbol\lambda
=\left[
\boldsymbol R(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol R^{\mathsf T}
\right]^{-1}
(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r).
$$
よって制約付き最小二乗推定量は
$$
\boxed{
\hat{\boldsymbol\beta}_R
=\hat{\boldsymbol\beta}
-(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol R^{\mathsf T}
\left[
\boldsymbol R(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol R^{\mathsf T}
\right]^{-1}
(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r)
}
$$
です。

## 9. 一般線形仮説のF検定

正規線形モデルを仮定します。制約なしモデルの残差平方和を $SSE_F$、制約付きモデルを $SSE_R$ とします。制約を課すと自由度が減るので
$$SSE_R\ge SSE_F.$$
差は
$$
SSE_R-SSE_F
=(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r)^{\mathsf T}
\left[
\boldsymbol R(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol R^{\mathsf T}
\right]^{-1}
(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r).
$$

帰無仮説のもとでは
$$
\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r
\sim
N_q\left(
\boldsymbol0,
\sigma^2\boldsymbol R(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol R^{\mathsf T}
\right).
$$
したがって
$$
\frac{SSE_R-SSE_F}{\sigma^2}\sim\chi_q^2.
$$
一方、制約なしモデルでは
$$
\frac{SSE_F}{\sigma^2}\sim\chi^2_{n-p}
$$
で、両者は独立です。よって
$$
\boxed{
F=
\frac{(SSE_R-SSE_F)/q}{SSE_F/(n-p)}
\sim F_{q,n-p}
}
$$
です。

同じ式を直接
$$
F=
\frac{
(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r)^{\mathsf T}
[\boldsymbol R(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol R^{\mathsf T}]^{-1}
(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r)/q
}{SSE_F/(n-p)}
$$
とも書けます。

$q=1$ のとき、同じ1本の線形制約に対するt統計量を二乗したものとF統計量は一致します。

---

## 10. 演習：問題の直後に解答

### Level A：基礎部品

#### L1-02-A01 行列の次元
- level: A
- minutes: 6
- topics: 線形モデル
- techniques: 次元確認
- calculation_load: low

観測数 $n=20$、切片を含めた回帰係数が4個ある線形モデル
$$\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$$
を考える。$\boldsymbol Y,\boldsymbol X,\boldsymbol\beta,\boldsymbol X^{\mathsf T}\boldsymbol X$ の次元を答えよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$\boldsymbol Y$ は20個の応答を並べるので $20\times1$。$\boldsymbol X$ は20観測×4係数なので $20\times4$。$\boldsymbol\beta$ は $4\times1$。したがって $\boldsymbol X^{\mathsf T}\boldsymbol X$ は $4\times4$。
###### 本番答案
$\boldsymbol Y:20\times1$、$\boldsymbol X:20\times4$、$\boldsymbol\beta:4\times1$、$\boldsymbol X^{\mathsf T}\boldsymbol X:4\times4$。
###### 採点基準
各5点。合計20点。
<!-- solution-end -->

#### L1-02-A02 正規方程式を導く
- level: A
- minutes: 9
- topics: 最小二乗法
- techniques: 行列微分
- calculation_load: medium

$\boldsymbol X$ は $n\times p$ で列フルランクとする。残差平方和
$$Q(\boldsymbol b)=(\boldsymbol Y-\boldsymbol X\boldsymbol b)^{\mathsf T}(\boldsymbol Y-\boldsymbol X\boldsymbol b)$$
を展開し、最小二乗推定量を導け。

<!-- solution-start -->
##### 解答
###### 詳細解答
展開すると
$$Q=\boldsymbol Y^{\mathsf T}\boldsymbol Y-2\boldsymbol b^{\mathsf T}\boldsymbol X^{\mathsf T}\boldsymbol Y+\boldsymbol b^{\mathsf T}\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol b.$$
$\boldsymbol X^{\mathsf T}\boldsymbol X$ は対称だから
$$\nabla Q=-2\boldsymbol X^{\mathsf T}\boldsymbol Y+2\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol b.$$
0と置けば
$$\boldsymbol X^{\mathsf T}\boldsymbol X\hat{\boldsymbol\beta}=\boldsymbol X^{\mathsf T}\boldsymbol Y.$$
列フルランクより
$$\hat{\boldsymbol\beta}=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y.$$
###### 本番答案
二次形式を展開して微分し、正規方程式を得る。逆行列を掛けて上式。
###### 採点基準
展開6点、微分6点、正規方程式4点、解4点。合計20点。
<!-- solution-end -->

#### L1-02-A03 射影行列のべき等性
- level: A
- minutes: 8
- topics: 射影行列
- techniques: 行列積
- calculation_load: medium

列フルランクの $\boldsymbol X$ に対して
$$\boldsymbol H=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}$$
とする。$\boldsymbol H^{\mathsf T}=\boldsymbol H$ と $\boldsymbol H^2=\boldsymbol H$ を示せ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$\boldsymbol X^{\mathsf T}\boldsymbol X$ は対称で、その逆行列も対称なので
$$\boldsymbol H^{\mathsf T}=\boldsymbol H.$$
また
$$
\boldsymbol H^2
=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\boldsymbol X
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
=\boldsymbol H.
$$
###### 本番答案
転置では中央の逆行列の対称性を使う。二乗では $\boldsymbol X^{\mathsf T}\boldsymbol X$ が逆行列と相殺して $\boldsymbol H$ に戻る。
###### 採点基準
対称性8点、二乗展開8点、結論4点。合計20点。
<!-- solution-end -->

#### L1-02-A04 線形対比を作る
- level: A
- minutes: 7
- topics: 線形対比
- techniques: 係数設計
- calculation_load: low

四つの群平均 $\mu_1,\mu_2,\mu_3,\mu_4$ について「第1・第2群の平均と第3・第4群の平均との差」を線形対比で表し、係数和が0であることを確認せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
求める比較は
$$L=\frac12\mu_1+\frac12\mu_2-\frac12\mu_3-\frac12\mu_4.$$
係数和は
$$1/2+1/2-1/2-1/2=0$$
なので線形対比である。
###### 本番答案
$L=(\mu_1+\mu_2-\mu_3-\mu_4)/2$、係数和0。
###### 採点基準
比較量12点、係数和確認8点。合計20点。
<!-- solution-end -->

### Level B：標準技能の組合せ

#### L1-02-B01 最小二乗推定量の平均と分散
- level: B
- minutes: 13
- topics: 線形モデル
- techniques: アフィン変換, 分散共分散行列
- calculation_load: medium

$$\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon,$$
$$E[\boldsymbol\varepsilon]=\boldsymbol0,\quad\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I_n$$
とし、$\boldsymbol X$ は列フルランクとする。$\hat{\boldsymbol\beta}$ の期待値と分散共分散行列を導け。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$
\hat{\boldsymbol\beta}
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y
=\boldsymbol\beta+(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol\varepsilon.
$$
したがって期待値は $\boldsymbol\beta$。分散は
$$
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
(\sigma^2\boldsymbol I_n)
\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
=\sigma^2(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}.
$$
###### 本番答案
誤差の線形結合表示から
$$E[\hat{\boldsymbol\beta}]=\boldsymbol\beta,\quad\operatorname{Var}(\hat{\boldsymbol\beta})=\sigma^2(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}.$$
###### 採点基準
誤差表示6点、期待値4点、分散の行列積6点、簡約4点。合計20点。
<!-- solution-end -->

#### L1-02-B02 線形結合の分布
- level: B
- minutes: 12
- topics: 線形結合の分布
- techniques: 多変量正規
- calculation_load: medium

正規線形モデルで
$$
\hat{\boldsymbol\beta}\sim N_p\{\boldsymbol\beta,\sigma^2(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\}
$$
とする。固定ベクトル $\boldsymbol c$ に対して $\boldsymbol c^{\mathsf T}\hat{\boldsymbol\beta}$ の分布を求めよ。さらに
$$
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
=\begin{pmatrix}2&-1\\-1&1\end{pmatrix},
\quad
\boldsymbol c=\begin{pmatrix}1\\-1\end{pmatrix}
$$
なら分散を $\sigma^2$ の何倍として表せ。

<!-- solution-start -->
##### 解答
###### 詳細解答
多変量正規の線形変換より
$$
\boldsymbol c^{\mathsf T}\hat{\boldsymbol\beta}
\sim N\left(
\boldsymbol c^{\mathsf T}\boldsymbol\beta,
\sigma^2\boldsymbol c^{\mathsf T}(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol c
\right).
$$
数値例では
$$
\begin{pmatrix}2&-1\\-1&1\end{pmatrix}
\begin{pmatrix}1\\-1\end{pmatrix}
=\begin{pmatrix}3\\-2\end{pmatrix},
$$
よって
$$
(1,-1)\begin{pmatrix}3\\-2\end{pmatrix}=5.
$$
したがって分散は $5\sigma^2$。
###### 本番答案
一般分散は $\sigma^2\boldsymbol c^{\mathsf T}(X^{\mathsf T}X)^{-1}\boldsymbol c$。数値例では $5\sigma^2$。
###### 採点基準
分布10点、行列積6点、分散4点。合計20点。
<!-- solution-end -->

#### L1-02-B03 文章から線形制約へ
- level: B
- minutes: 10
- topics: 線形制約
- techniques: 行列表現
- calculation_load: low

$\boldsymbol\beta=(\beta_0,\beta_1,\beta_2,\beta_3)^{\mathsf T}$ とする。次の帰無仮説を $\boldsymbol R\boldsymbol\beta=\boldsymbol r$ と表し、$q=\operatorname{rank}(\boldsymbol R)$ を答えよ。

1. $\beta_1=\beta_2$ かつ $\beta_3=0$。
2. $\beta_1+\beta_2=1$。

<!-- solution-start -->
##### 解答
###### 詳細解答
(1)
$$
\boldsymbol R=
\begin{pmatrix}
0&1&-1&0\\
0&0&0&1
\end{pmatrix},
\quad
\boldsymbol r=\begin{pmatrix}0\\0\end{pmatrix}.
$$
2行は一次独立なので $q=2$。

(2)
$$\boldsymbol R=(0,1,1,0),\quad\boldsymbol r=(1),$$
したがって $q=1$。
###### 本番答案
上記の $R,r$。階数はそれぞれ2と1。
###### 採点基準
(1) $R$8点、$r$2点、階数2点、(2) $R,r$6点、階数2点。合計20点。
<!-- solution-end -->

#### L1-02-B04 ガウス・マルコフの分散差
- level: B
- minutes: 15
- topics: ガウス・マルコフの定理
- techniques: 分散共分散行列, 半正定値
- calculation_load: high

$E[\boldsymbol\varepsilon]=0$、$\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I$ とする。線形不偏推定量 $\tilde{\boldsymbol\beta}=\boldsymbol A\boldsymbol Y$ と最小二乗推定量の係数行列
$$\boldsymbol A_0=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}$$
を考える。$\boldsymbol D=\boldsymbol A-\boldsymbol A_0$ として
$$
\operatorname{Var}(\tilde{\boldsymbol\beta})-
\operatorname{Var}(\hat{\boldsymbol\beta})
=\sigma^2\boldsymbol D\boldsymbol D^{\mathsf T}
$$
を示せ。

<!-- solution-start -->
##### 解答
###### 詳細解答
不偏性から $\boldsymbol A\boldsymbol X=\boldsymbol I$。また $\boldsymbol A_0\boldsymbol X=\boldsymbol I$ なので $\boldsymbol D\boldsymbol X=0$。
$$
\operatorname{Var}(\tilde\beta)
=\sigma^2(\boldsymbol A_0+\boldsymbol D)(\boldsymbol A_0+\boldsymbol D)^{\mathsf T}.
$$
交差項は
$$
\boldsymbol A_0\boldsymbol D^{\mathsf T}
=(X^{\mathsf T}X)^{-1}X^{\mathsf T}D^{\mathsf T}
=(X^{\mathsf T}X)^{-1}(DX)^{\mathsf T}=0
$$
で、その転置も0。したがって
$$
\operatorname{Var}(\tilde\beta)
=\operatorname{Var}(\hat\beta)+\sigma^2DD^{\mathsf T}.
$$
###### 本番答案
$AX=A_0X=I$ より $DX=0$。分散を展開すると交差項 $A_0D^{\mathsf T}$ が0となり、差は $\sigma^2DD^{\mathsf T}$。
###### 採点基準
不偏性条件5点、$DX=0$3点、分散展開5点、交差項0の証明5点、結論2点。合計20点。
<!-- solution-end -->

### Level C：本番標準

#### L1-02-C01 小さな重回帰を行列で解く
- level: C
- minutes: 22
- topics: 重回帰
- techniques: 行列積, 逆行列
- calculation_load: high

線形モデル $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ で
$$
\boldsymbol X=
\begin{pmatrix}
1&0\\
1&1\\
1&2
\end{pmatrix},
\qquad
\boldsymbol Y=
\begin{pmatrix}1\\2\\4\end{pmatrix}
$$
とする。

1. $X^{\mathsf T}X$ と $X^{\mathsf T}Y$ を求めよ。
2. $(X^{\mathsf T}X)^{-1}$ を求めよ。
3. $\hat\beta$ と当てはめ値、残差を求めよ。
4. $X^{\mathsf T}e=0$ を確認せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$
X^{\mathsf T}X=\begin{pmatrix}3&3\\3&5\end{pmatrix},
\quad
X^{\mathsf T}Y=\begin{pmatrix}7\\10\end{pmatrix}.
$$
行列式は $15-9=6$ なので
$$
(X^{\mathsf T}X)^{-1}=\frac16\begin{pmatrix}5&-3\\-3&3\end{pmatrix}.
$$
したがって
$$
\hat\beta=\frac16
\begin{pmatrix}5&-3\\-3&3\end{pmatrix}
\begin{pmatrix}7\\10\end{pmatrix}
=\begin{pmatrix}5/6\\3/2\end{pmatrix}.
$$
当てはめ値は $(5/6,7/3,23/6)^{\mathsf T}$、残差は $(1/6,-1/3,1/6)^{\mathsf T}$。
$$
X^{\mathsf T}e
=\begin{pmatrix}1/6-1/3+1/6\\0-1/3+2/6\end{pmatrix}
=\boldsymbol0.
$$
###### 本番答案
$X^{\mathsf T}X=\begin{pmatrix}3&3\\3&5\end{pmatrix}$、逆行列 $\frac16\begin{pmatrix}5&-3\\-3&3\end{pmatrix}$、$\hat\beta=(5/6,3/2)^{\mathsf T}$。残差 $(1/6,-1/3,1/6)^{\mathsf T}$ で $X^{\mathsf T}e=0$。
###### 採点基準
行列積5点、逆行列5点、推定量5点、残差・直交性5点。合計20点。
<!-- solution-end -->

#### L1-02-C02 射影行列と残差平方和
- level: C
- minutes: 22
- topics: 射影, 残差
- techniques: 二次形式
- calculation_load: high

$H=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}$、$M=I-H$ とする。

1. $HM=0$ を示せ。
2. 残差 $e=MY$ と当てはめ値 $\hat Y=HY$ が直交することを示せ。
3. $SSE=e^{\mathsf T}e=Y^{\mathsf T}MY$ を示せ。
4. 正規線形モデルで $\operatorname{rank}(M)=n-p$ のとき、$SSE/\sigma^2\sim\chi^2_{n-p}$ となる理由を説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
(1) $HM=H(I-H)=H-H^2=0$。

(2)
$$\hat Y^{\mathsf T}e=Y^{\mathsf T}H^{\mathsf T}MY=Y^{\mathsf T}HMY=0.$$

(3) $M^{\mathsf T}=M,M^2=M$ より
$$e^{\mathsf T}e=Y^{\mathsf T}M^{\mathsf T}MY=Y^{\mathsf T}MY.$$

(4) $MX=0$ なので $MY=M\varepsilon$。対称べき等行列 $M$ は直交変換で対角成分が1を $n-p$ 個、0を $p$ 個持つ形へ変換できる。標準化した正規誤差を同じ直交変換すると独立な標準正規変数となるため
$$SSE/\sigma^2=(\varepsilon/\sigma)^{\mathsf T}M(\varepsilon/\sigma)$$
は標準正規の二乗和 $n-p$ 個となり $\chi^2_{n-p}$。
###### 本番答案
$HM=H-H^2=0$、よって $\hat Y^{\mathsf T}e=0$。$M^2=M$ より $SSE=Y^{\mathsf T}MY$。$M$ は階数 $n-p$ の直交射影なので、正規誤差の二次形式は $\chi^2_{n-p}$。
###### 採点基準
$HM$4点、直交性4点、SSE表示4点、カイ二乗の説明8点。合計20点。
<!-- solution-end -->

#### L1-02-C03 1本の線形制約をt検定する
- level: C
- minutes: 20
- topics: 線形結合, 検定
- techniques: t分布
- calculation_load: medium

正規線形モデルで $n=20,p=3$、
$$
\hat\beta=\begin{pmatrix}2\\1.4\\0.8\end{pmatrix},
\qquad
(X^{\mathsf T}X)^{-1}=
\begin{pmatrix}
0.2&0&0\\
0&0.5&0.1\\
0&0.1&0.4
\end{pmatrix},
$$
残差分散推定値 $s^2=2$ とする。$H_0:\beta_1=\beta_2$ を検定する。

1. $c$ を定めよ。
2. $\widehat L=c^{\mathsf T}\hat\beta$ とその標準誤差を求めよ。
3. t統計量と帰無分布を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$L=\beta_1-\beta_2$ なので
$$c=(0,1,-1)^{\mathsf T}.$$
推定値は $1.4-0.8=0.6$。
分散係数は
$$
c^{\mathsf T}(X^{\mathsf T}X)^{-1}c
=0.5+0.4-2(0.1)=0.7.
$$
したがって標準誤差は
$$s\sqrt{0.7}=\sqrt{1.4}.$$
よって
$$T=0.6/\sqrt{1.4}.$$
残差自由度は $20-3=17$ なので $H_0$ のもとで $t_{17}$。
###### 本番答案
$c=(0,1,-1)^{\mathsf T}$、$\widehat L=0.6$、標準誤差 $\sqrt{1.4}$、$T=0.6/\sqrt{1.4}\sim t_{17}$。
###### 採点基準
$c$4点、推定値3点、分散係数7点、t値・分布6点。合計20点。
<!-- solution-end -->

#### L1-02-C04 複数制約のF検定
- level: C
- minutes: 24
- topics: 一般線形仮説
- techniques: 二次形式, F分布
- calculation_load: high

正規線形モデルで $n=30,p=4$、残差平方和 $SSE_F=52$ とする。帰無仮説 $H_0:R\beta=r$ は階数 $q=2$ であり、
$$
R\hat\beta-r=\begin{pmatrix}1\\-2\end{pmatrix},
$$
$$
\left[R(X^{\mathsf T}X)^{-1}R^{\mathsf T}\right]^{-1}
=\begin{pmatrix}2&0.5\\0.5&1\end{pmatrix}
$$
が与えられている。

1. 二次形式を求めよ。
2. F統計量を求めよ。
3. 帰無分布を答えよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
まず
$$
\begin{pmatrix}2&0.5\\0.5&1\end{pmatrix}
\begin{pmatrix}1\\-2\end{pmatrix}
=\begin{pmatrix}1\\-1.5\end{pmatrix}.
$$
したがって二次形式は
$$
(1,-2)\begin{pmatrix}1\\-1.5\end{pmatrix}=4.
$$
残差平均平方は
$$52/(30-4)=2.$$
よって
$$F=(4/2)/2=1.$$
帰無仮説のもとで
$$F\sim F_{2,26}.$$
###### 本番答案
二次形式4、残差平均平方2、$F=1\sim F_{2,26}$。
###### 採点基準
行列積6点、二次形式4点、分母自由度・平均平方5点、F値・分布5点。合計20点。
<!-- solution-end -->

#### L1-02-C05 制約付き残差平方和から検定する
- level: C
- minutes: 22
- topics: 入れ子モデル, 線形制約
- techniques: 平方和差, F分布
- calculation_load: medium

正規線形モデルの制約なしモデルは $p=5$ 個の係数を持ち、$n=40$、$SSE_F=70$ とする。独立な2本の線形制約を課したモデルでは $SSE_R=82$ となった。

1. 制約数 $q$ と制約なしモデルの残差自由度を求めよ。
2. F統計量を求めよ。
3. $SSE_R-SSE_F$ が何を測る量か説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$q=2$、制約なし残差自由度は $40-5=35$。
$$
F=\frac{(82-70)/2}{70/35}
=\frac6{2}=3.
$$
帰無仮説のもとで $F_{2,35}$。
$SSE_R-SSE_F$ は、帰無仮説の制約を強制したために増えた当てはめ誤差であり、その制約がデータとどれだけ矛盾するかを測る。
###### 本番答案
$q=2$、残差自由度35、$F=3\sim F_{2,35}$。平方和差は制約を課したことによる適合度の悪化量。
###### 採点基準
自由度5点、式5点、計算5点、解釈5点。合計20点。
<!-- solution-end -->

### Level D：発展

#### L1-02-D01 制約付き最小二乗推定量を導く
- level: D
- minutes: 35
- topics: 線形制約, 最小二乗
- techniques: ラグランジュ未定乗数法
- calculation_load: high

$X$ は列フルランク、$R$ は階数 $q$ とする。制約
$$R\beta=r$$
のもとで残差平方和を最小にする推定量を導け。また、制約なし推定量との差が
$$
\hat\beta-\hat\beta_R
=(X^{\mathsf T}X)^{-1}R^{\mathsf T}
[R(X^{\mathsf T}X)^{-1}R^{\mathsf T}]^{-1}
(R\hat\beta-r)
$$
であることから、制約が既に $R\hat\beta=r$ を満たす場合に何が起こるか説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
ラグランジュ関数を
$$
\mathcal L=(Y-Xb)^{\mathsf T}(Y-Xb)+2\lambda^{\mathsf T}(Rb-r)
$$
とする。$b$ で微分して
$$
-2X^{\mathsf T}Y+2X^{\mathsf T}Xb+2R^{\mathsf T}\lambda=0.
$$
制約なし推定量の正規方程式を引くと
$$
X^{\mathsf T}X(b-\hat\beta)+R^{\mathsf T}\lambda=0,
$$
よって
$$
b=\hat\beta-(X^{\mathsf T}X)^{-1}R^{\mathsf T}\lambda.
$$
制約へ代入して
$$
R\hat\beta-R(X^{\mathsf T}X)^{-1}R^{\mathsf T}\lambda=r.
$$
したがって
$$
\lambda=[R(X^{\mathsf T}X)^{-1}R^{\mathsf T}]^{-1}(R\hat\beta-r).
$$
これを戻して所望の $\hat\beta_R$ を得る。
もし $R\hat\beta=r$ なら $\lambda=0$ で、$\hat\beta_R=\hat\beta$。つまり制約なし推定量が既に帰無仮説を満たすなら、制約を課しても当てはめは変わらない。
###### 本番答案
ラグランジュ関数を微分し、正規方程式との差から $b=\hat\beta-(X^{\mathsf T}X)^{-1}R^{\mathsf T}\lambda$。制約代入で $\lambda$ を解けば本文の式を得る。$R\hat\beta=r$ なら差は0。
###### 採点基準
ラグランジュ関数4点、偏微分6点、$b$の式5点、$\lambda$の解3点、解釈2点。合計20点。
<!-- solution-end -->

## 11. 30分ドリル

### L1-02-DRILL-01 重回帰・対比・制約を一続きで解く

正規線形モデルで $n=25,p=3$ とする。推定結果として
$$
\hat\beta=\begin{pmatrix}4\\2\\-1\end{pmatrix},
\qquad
(X^{\mathsf T}X)^{-1}=
\begin{pmatrix}
0.4&0&0\\
0&0.3&0.1\\
0&0.1&0.5
\end{pmatrix},
$$
$$SSE_F=44$$
を得た。

1. 誤差分散の不偏推定値を求めよ。
2. $L=\beta_1-\beta_2$ の推定値と標準誤差を求めよ。
3. $H_0:\beta_1=\beta_2$ のt統計量と帰無分布を求めよ。
4. $H_0:\beta_1=\beta_2=0$ を $R\beta=r$ で表せ。
5. 4の制約付きモデルで $SSE_R=64$ となった。一般線形仮説のF統計量と帰無分布を求めよ。
6. 3の1本の制約と5の2本の制約で、分子自由度が異なる理由を説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
残差自由度は $25-3=22$ なので
$$s^2=44/22=2.$$
$L=\beta_1-\beta_2$ には $c=(0,1,-1)^{\mathsf T}$ を使う。推定値は
$$\hat L=2-(-1)=3.$$
分散係数は
$$0.3+0.5-2(0.1)=0.6$$
なので標準誤差は
$$s\sqrt{0.6}=\sqrt{1.2}.$$
よって
$$T=3/\sqrt{1.2}\sim t_{22}\quad(H_0).$$

$\beta_1=\beta_2=0$ は
$$
R=\begin{pmatrix}0&1&0\\0&0&1\end{pmatrix},
\quad
r=\begin{pmatrix}0\\0\end{pmatrix}.
$$
階数は2。したがって
$$
F=\frac{(64-44)/2}{44/22}
=\frac{10}{2}=5
\sim F_{2,22}.
$$
3では独立な制約が1本、5では2本なので分子自由度がそれぞれ1と2になる。
###### 本番答案
$s^2=2$。$L=\beta_1-\beta_2$ は推定値3、標準誤差 $\sqrt{1.2}$、$T=3/\sqrt{1.2}\sim t_{22}$。二本制約は
$$R=\begin{pmatrix}0&1&0\\0&0&1\end{pmatrix},\ r=0.$$
$$F=((64-44)/2)/(44/22)=5\sim F_{2,22}.$$
分子自由度は独立な制約本数に等しい。
###### 採点基準
分散推定10点、線形結合20点、t検定20点、制約行列15点、F検定25点、自由度解釈10点。合計100点。
<!-- solution-end -->

## 12. 本番での確認点

- 行列式を書く前に $n,p$ と各行列の次元を確認する。
- $X^{\mathsf T}X$ の逆行列を使うときは列フルランクが必要。
- 一般の線形結合と、係数和0の群平均対比を混同しない。
- $R\beta=r$ のF検定では $q=\operatorname{rank}(R)$ が分子自由度。
- ガウス・マルコフの定理は正規性を必要とせず、線形不偏推定量の分散比較である。
