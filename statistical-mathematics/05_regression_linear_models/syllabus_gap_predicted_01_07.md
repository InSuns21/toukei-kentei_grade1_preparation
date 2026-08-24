# 線形モデル・分散分析分野 シラバス補完予想問題 1〜7

このファイルは、統計検定1級の公式出題範囲、2025年公式問題、本リポジトリの `curriculum.yaml`、および既存の回帰・線形モデル過去問型再構成演習を突き合わせ、シラバス上は重要だが既存演習が相対的に薄い論点を補うために作成した独自予想問題集である。

- 公式過去問の復元ではない。
- 問題文・数値・設問はすべて独自作成である。
- 数式・結論は独立に計算している。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。
- Level C は20〜30分で解く本番標準を意識している。

## 追加根拠

統計検定1級「統計数理」の公式出題範囲では、分散分析について

- 一元配置分散分析
- 二元配置分散分析
- 交互作用
- 共分散分析
- 多重比較

が明示されている。

回帰分析については

- 線形単回帰
- 線形重回帰
- 最小二乗推定
- 回帰の分散分析
- 重相関係数
- 決定係数
- 残差
- 変数変換
- 平均への回帰（回帰効果）

が明示されている。

本リポジトリの `curriculum.yaml` でも、主に次の章へ対応する。

- `L1-01`: 単回帰と最小二乗法
- `L1-02`: 重回帰・線形モデルの行列表現
- `L1-03`: 分散分析
- `L2-02`: モデル評価・選択

一方、既存の `volumes/03_inference/regression_linear_model_past_exam_reconstructed_01_05.md` では、回帰係数の推定・検定・検出力、射影行列と $\chi^2$ 分解、重回帰のMSE、多重共線性、BLUE、対応のある分散分析を厚く扱っている。

また2025年公式問題では、問1でAIC、問3で線形単回帰の最尤推定・平方和分解・標本相関係数が直接出題された。このため、AICや単回帰の基本平方和分解をそのまま繰り返すより、以下の未充足論点を優先した。

## 予想問題一覧

| 優先 | 安定ID | 主題 | 対応シラバス | Level | 目安時間 |
|---:|---|---|---|:---:|---:|
| 1 | `PRED-LM-01-GLH-PARTIAL-F` | 一般線形仮説・制約付き最小二乗・partial F | L1-02 | C | 30分 |
| 2 | `PRED-LM-02-TWOWAY-INTERACTION` | 二元配置分散分析・交互作用 | L1-03 | C | 30分 |
| 3 | `PRED-LM-03-ANCOVA` | 共分散分析・共通傾き・調整済み処置効果 | L1-03 | C | 30分 |
| 4 | `PRED-LM-04-MULTIPLE-COMPARISON` | 多重比較・Bonferroni・Scheffé | L1-03 | C | 25分 |
| 5 | `PRED-LM-05-PARTIAL-R2` | 重回帰・決定係数・partial $R^2$ | L1-01, L1-02 | B | 20分 |
| 6 | `PRED-LM-06-LOG-TRANSFORM` | 変数変換・対数回帰・残差診断 | L1-01 | C | 25分 |
| 7 | `PRED-LM-07-REGRESSION-TO-MEAN` | 2変量正規分布と平均への回帰 | L1-01, P3-03 | B | 20分 |

---

# 予想1: 一般線形仮説を制約付き最小二乗からpartial F検定まで導く

- 安定ID: `PRED-LM-01-GLH-PARTIAL-F`
- Level: C
- 目安時間: 30分
- 計算量: 多
- 主題: 一般線形仮説、制約付き最小二乗、入れ子モデル、partial F検定
- 使用技術: 行列表現、Lagrange未定乗数法、射影、正規分布の二次形式、$\chi^2$分布、$F$分布

## 問題

正規線形モデル

$$
Y=X\beta+\varepsilon,
\qquad
\varepsilon\sim N_n(0,\sigma^2I_n)
$$

を考える。$X$ は $n\times p$ 行列で $\operatorname{rank}(X)=p<n$ とする。

最小二乗推定量を

$$
\widehat\beta=(X^TX)^{-1}X^TY
$$

とする。

$q\times p$ 行列 $R$ は $\operatorname{rank}(R)=q$ を満たし、$r\in\mathbb R^q$ は既知とする。一般線形仮説

$$
H_0:R\beta=r
$$

を考える。

1. 制約 $Rb=r$ の下で残差平方和

$$
S(b)=(Y-Xb)^T(Y-Xb)
$$

を最小にする制約付き最小二乗推定量 $\widehat\beta_0$ を求めよ。
2. 制約なし残差平方和を $SSE_1=S(\widehat\beta)$、制約付き残差平方和を $SSE_0=S(\widehat\beta_0)$ とする。次を示せ。

$$
SSE_0-SSE_1
=(R\widehat\beta-r)^T
\left[R(X^TX)^{-1}R^T\right]^{-1}
(R\widehat\beta-r).
$$

3. $H_0$ の下で

$$
\frac{SSE_0-SSE_1}{\sigma^2}\sim\chi_q^2
$$

を示せ。
4. $SSE_1/\sigma^2\sim\chi_{n-p}^2$ であり、上問3の統計量と独立であることを用いて、$H_0$ の検定統計量を構成せよ。
5. $R$ が最後の $q$ 個の回帰係数を0とする制約を表す場合、この検定が「縮小モデル」と「完全モデル」の残差平方和を比較するpartial F検定になることを説明せよ。

## 解答

### 方針

制約付き最小二乗はLagrange未定乗数法で求める。その後、制約付き解と通常の最小二乗解との差を使うと、残差平方和の増加分が二次形式になる。正規モデルではこの二次形式が $\chi^2$ 分布に従い、完全モデルの残差平方和とは直交射影により独立になる。

### 使用結果と仮定

- $X$ は列フルランクなので $(X^TX)^{-1}$ が存在する。
- $R$ は行フルランクなので $R(X^TX)^{-1}R^T$ は正定値で可逆である。
- 正規線形モデルでは $\widehat\beta$ と残差 $Y-X\widehat\beta$ は独立である。

### 1. 制約付き最小二乗推定量

Lagrange関数を

$$
\mathcal L(b,\lambda)
=(Y-Xb)^T(Y-Xb)
+2\lambda^T(Rb-r)
$$

とする。

$b$ で微分すると

$$
-2X^T(Y-Xb)+2R^T\lambda=0.
$$

したがって

$$
X^TXb=X^TY-R^T\lambda.
$$

制約なし最小二乗推定量

$$
\widehat\beta=(X^TX)^{-1}X^TY
$$

を使えば

$$
b
=\widehat\beta-(X^TX)^{-1}R^T\lambda.
$$

制約 $Rb=r$ を代入すると

$$
R\widehat\beta
-R(X^TX)^{-1}R^T\lambda
=r.
$$

よって

$$
\lambda
=\left[R(X^TX)^{-1}R^T\right]^{-1}
(R\widehat\beta-r).
$$

したがって

$$
\boxed{
\widehat\beta_0
=\widehat\beta
-(X^TX)^{-1}R^T
\left[R(X^TX)^{-1}R^T\right]^{-1}
(R\widehat\beta-r)
}.
$$

### 2. 残差平方和の増加分

完全モデルの残差を

$$
e=Y-X\widehat\beta
$$

とする。

最小二乗の正規方程式より

$$
X^Te=0.
$$

したがって

$$
Y-X\widehat\beta_0
=e+X(\widehat\beta-\widehat\beta_0).
$$

平方を展開すると

$$
\begin{aligned}
SSE_0
&=e^Te
+2e^TX(\widehat\beta-\widehat\beta_0)\\
&\quad
+(\widehat\beta-\widehat\beta_0)^TX^TX
(\widehat\beta-\widehat\beta_0).
\end{aligned}
$$

中央の項は $e^TX=0$ なので0である。

よって

$$
SSE_0-SSE_1
=(\widehat\beta-\widehat\beta_0)^TX^TX
(\widehat\beta-\widehat\beta_0).
$$

ここで

$$
C=R(X^TX)^{-1}R^T,
\qquad
d=R\widehat\beta-r
$$

とおけば

$$
\widehat\beta-\widehat\beta_0
=(X^TX)^{-1}R^TC^{-1}d.
$$

したがって

$$
\begin{aligned}
SSE_0-SSE_1
&=d^TC^{-1}R(X^TX)^{-1}
X^TX
(X^TX)^{-1}R^TC^{-1}d\\
&=d^TC^{-1}CC^{-1}d\\
&=d^TC^{-1}d.
\end{aligned}
$$

よって

$$
\boxed{
SSE_0-SSE_1
=(R\widehat\beta-r)^T
\left[R(X^TX)^{-1}R^T\right]^{-1}
(R\widehat\beta-r)
}.
$$

### 3. $\chi^2$分布

$H_0$ の下では $R\beta=r$ なので

$$
R\widehat\beta-r
=R(\widehat\beta-\beta).
$$

また

$$
\widehat\beta
\sim
N_p\left(\beta,\sigma^2(X^TX)^{-1}\right)
$$

だから

$$
R\widehat\beta-r
\sim
N_q(0,\sigma^2C).
$$

したがって標準化された二次形式より

$$
\boxed{
\frac{SSE_0-SSE_1}{\sigma^2}
\sim\chi_q^2
}.
$$

### 4. partial F統計量

完全モデルの残差について

$$
\frac{SSE_1}{\sigma^2}
\sim\chi_{n-p}^2.
$$

さらに、$R\widehat\beta-r$ は $\widehat\beta$ の関数であり、$SSE_1$ は残差の関数である。正規線形モデルでは $\widehat\beta$ と残差が独立なので、両者は独立である。

よって

$$
\boxed{
F
=\frac{(SSE_0-SSE_1)/q}{SSE_1/(n-p)}
\sim F_{q,n-p}
\qquad(H_0)
}.
$$

有意水準 $\alpha$ では

$$
F>F_{1-\alpha;q,n-p}
$$

のとき $H_0$ を棄却する。

### 5. 入れ子モデルとの関係

たとえば

$$
\beta
=(\beta_1,\ldots,\beta_{p-q},
\beta_{p-q+1},\ldots,\beta_p)^T
$$

として

$$
H_0:
\beta_{p-q+1}=\cdots=\beta_p=0
$$

なら、$H_0$ の下のモデルは最後の $q$ 個の説明変数を削除した縮小モデルである。

このとき

$$
SSE_0=SSE_{\mathrm{reduced}},
\qquad
SSE_1=SSE_{\mathrm{full}}
$$

だから

$$
\boxed{
F
=\frac{\{SSE_{\mathrm{reduced}}-SSE_{\mathrm{full}}\}/q}
{SSE_{\mathrm{full}}/(n-p)}
}.
$$

これが通常のpartial F検定である。

### 結論

一般線形仮説 $R\beta=r$ は、制約によってどれだけ残差平方和が増えるかを測る問題へ帰着し、その増加分を残差分散で標準化すると $F$ 検定になる。

### 検算

$q=1$ のとき、1個の回帰係数に対するpartial F検定は、その係数の $t$ 検定の二乗と一致する。

$$
F=t^2.
$$

### 本番答案

制約付き最小二乗をLagrange法で解き、

$$
\widehat\beta_0
=\widehat\beta
-(X^TX)^{-1}R^TC^{-1}(R\widehat\beta-r)
$$

を得る。正規方程式 $X^T(Y-X\widehat\beta)=0$ より

$$
SSE_0-SSE_1
=(R\widehat\beta-r)^TC^{-1}(R\widehat\beta-r).
$$

$H_0$ 下でこれは $\sigma^2\chi_q^2$、完全モデルの $SSE_1/\sigma^2$ は独立な $\chi_{n-p}^2$ なので

$$
F=\frac{(SSE_0-SSE_1)/q}{SSE_1/(n-p)}
\sim F_{q,n-p}.
$$

### 採点基準

- 制約付き推定量の導出: 25%
- SSE増加分の二次形式: 25%
- $\chi^2$ 分布の導出: 20%
- 独立性と $F$ 検定: 20%
- 入れ子モデルへの解釈: 10%

### 25分経過時の打ち切り判断

制約付き推定量の式が出ない場合でも、上問2の二次形式を結果として用い、$\chi^2$ 分布とpartial F検定の導出を優先する。

---

# 予想2: 二元配置分散分析で交互作用まで平方和分解する

- 安定ID: `PRED-LM-02-TWOWAY-INTERACTION`
- Level: C
- 目安時間: 30分
- 計算量: 多
- 主題: 二元配置分散分析、交互作用、自由度、期待平均平方、$F$検定
- 使用技術: 平均の分解、直交平方和分解、正規二次形式

## 問題

因子Aが $a$ 水準、因子Bが $b$ 水準あり、各セルで $r$ 回ずつ独立に観測するバランス型二元配置モデル

$$
Y_{ijk}
=\mu+\alpha_i+\beta_j+\gamma_{ij}+\varepsilon_{ijk}
$$

$$
i=1,\ldots,a,
\qquad
j=1,\ldots,b,
\qquad
k=1,\ldots,r
$$

を考える。

$$
\varepsilon_{ijk}\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$

とし、識別のため

$$
\sum_i\alpha_i=0,
\qquad
\sum_j\beta_j=0,
$$

$$
\sum_i\gamma_{ij}=0\quad(\forall j),
\qquad
\sum_j\gamma_{ij}=0\quad(\forall i)
$$

を課す。

セル平均、A水準平均、B水準平均、全平均をそれぞれ

$$
\overline Y_{ij.},
\quad
\overline Y_{i..},
\quad
\overline Y_{.j.},
\quad
\overline Y_{...}
$$

とする。

1. $\mu,\alpha_i,\beta_j,\gamma_{ij}$ の最小二乗推定量を平均を用いて表せ。
2. 全平方和をA、B、交互作用、誤差へ分解し、それぞれの平方和を与えよ。
3. 各平方和の自由度を求めよ。
4. 各平均平方の期待値を求めよ。
5. 交互作用なし

$$
H_0:\gamma_{ij}=0\quad(\forall i,j)
$$

の検定統計量を与えよ。
6. $a=2,b=3,r=4$ で

$$
SS_A=24,
\quad SS_B=18,
\quad SS_{AB}=30,
\quad SSE=72
$$

だった。A、B、交互作用の $F$ 統計量を求めよ。

## 解答

### 方針

バランス型二元配置では、全変動を

$$
\text{A主効果}
+\text{B主効果}
+\text{交互作用}
+\text{セル内誤差}
$$

という互いに直交する4成分へ分解できる。

### 使用結果と仮定

- 各セルの反復数はすべて同じ $r$。
- 誤差は独立な正規分布で等分散。
- 制約により主効果と交互作用が一意に定まる。

### 1. 最小二乗推定量

バランス型では

$$
\boxed{
\widehat\mu=\overline Y_{...}
}
$$

$$
\boxed{
\widehat\alpha_i
=\overline Y_{i..}-\overline Y_{...}
}
$$

$$
\boxed{
\widehat\beta_j
=\overline Y_{.j.}-\overline Y_{...}
}
$$

$$
\boxed{
\widehat\gamma_{ij}
=\overline Y_{ij.}
-\overline Y_{i..}
-\overline Y_{.j.}
+\overline Y_{...}
}.
$$

### 2. 平方和分解

全平方和は

$$
SS_T
=\sum_{i=1}^a\sum_{j=1}^b\sum_{k=1}^r
(Y_{ijk}-\overline Y_{...})^2.
$$

A主効果平方和は

$$
\boxed{
SS_A
=br\sum_{i=1}^a
(\overline Y_{i..}-\overline Y_{...})^2
}.
$$

B主効果平方和は

$$
\boxed{
SS_B
=ar\sum_{j=1}^b
(\overline Y_{.j.}-\overline Y_{...})^2
}.
$$

交互作用平方和は

$$
\boxed{
SS_{AB}
=r\sum_{i=1}^a\sum_{j=1}^b
(\overline Y_{ij.}
-\overline Y_{i..}
-\overline Y_{.j.}
+\overline Y_{...})^2
}.
$$

誤差平方和は

$$
\boxed{
SSE
=\sum_{i=1}^a\sum_{j=1}^b\sum_{k=1}^r
(Y_{ijk}-\overline Y_{ij.})^2
}.
$$

したがって

$$
\boxed{
SS_T=SS_A+SS_B+SS_{AB}+SSE
}.
$$

### 3. 自由度

全標本数は $N=abr$ だから全自由度は $abr-1$。

各成分は

$$
\boxed{
\nu_A=a-1
}
$$

$$
\boxed{
\nu_B=b-1
}
$$

$$
\boxed{
\nu_{AB}=(a-1)(b-1)
}
$$

$$
\boxed{
\nu_E=ab(r-1)
}.
$$

実際、

$$
(a-1)+(b-1)+(a-1)(b-1)+ab(r-1)
=abr-1.
$$

### 4. 期待平均平方

平均平方を

$$
MS_A=\frac{SS_A}{a-1},
\quad
MS_B=\frac{SS_B}{b-1},
$$

$$
MS_{AB}=\frac{SS_{AB}}{(a-1)(b-1)},
\quad
MSE=\frac{SSE}{ab(r-1)}
$$

とする。

固定効果モデルでは

$$
\boxed{
E[MSE]=\sigma^2
}.
$$

また

$$
\boxed{
E[MS_A]
=\sigma^2
+\frac{br}{a-1}\sum_i\alpha_i^2
}
$$

$$
\boxed{
E[MS_B]
=\sigma^2
+\frac{ar}{b-1}\sum_j\beta_j^2
}
$$

$$
\boxed{
E[MS_{AB}]
=\sigma^2
+\frac{r}{(a-1)(b-1)}
\sum_{i,j}\gamma_{ij}^2
}.
$$

したがって効果が0なら対応する平均平方の期待値は $\sigma^2$ へ落ちる。

### 5. 交互作用の検定

帰無仮説

$$
H_0:\gamma_{ij}=0
$$

の下では

$$
\boxed{
F_{AB}
=\frac{MS_{AB}}{MSE}
\sim F_{(a-1)(b-1),\,ab(r-1)}
}.
$$

交互作用が有意なら、Aの効果がBの水準によって変わるので、主効果だけの解釈を先に行うのは危険である。

### 6. 数値例

$a=2,b=3,r=4$ なので

$$
\nu_A=1,
\qquad
\nu_B=2,
\qquad
\nu_{AB}=2,
\qquad
\nu_E=18.
$$

誤差平均平方は

$$
MSE=\frac{72}{18}=4.
$$

したがって

$$
\boxed{
F_A=\frac{24/1}{4}=6
}
$$

$$
\boxed{
F_B=\frac{18/2}{4}=2.25
}
$$

$$
\boxed{
F_{AB}=\frac{30/2}{4}=3.75
}.
$$

### 結論

二元配置の本体は、主効果2つだけでなく交互作用を独立成分として分けることにある。特に反復がある場合、交互作用と純粋な誤差を分離できる。

### 検算

自由度の和が

$$
1+2+2+18=23=2\cdot3\cdot4-1
$$

となり、全自由度と一致する。

### 本番答案

平方和を

$$
SS_A=br\sum_i(\bar Y_{i..}-\bar Y_{...})^2,
$$

$$
SS_B=ar\sum_j(\bar Y_{.j.}-\bar Y_{...})^2,
$$

$$
SS_{AB}=r\sum_{ij}
(\bar Y_{ij.}-\bar Y_{i..}-\bar Y_{.j.}+\bar Y_{...})^2
$$

と置き、残差平方和と合わせて $SS_T$ を分解する。自由度はそれぞれ $a-1,b-1,(a-1)(b-1),ab(r-1)$。交互作用なしでは

$$
F_{AB}=MS_{AB}/MSE
\sim F_{(a-1)(b-1),ab(r-1)}.
$$

### 採点基準

- 推定量: 15%
- 平方和分解: 30%
- 自由度: 15%
- 期待平均平方: 20%
- $F$検定: 10%
- 数値計算: 10%

### 25分経過時の打ち切り判断

期待平均平方の導出で詰まったら、平方和・自由度・交互作用の $F$ 検定を先に完成させる。

---

# 予想3: 共分散分析をFWL定理で処理し、調整済み処置効果を検定する

- 安定ID: `PRED-LM-03-ANCOVA`
- Level: C
- 目安時間: 30分
- 計算量: 中〜多
- 主題: 共分散分析、処置効果、共通傾き、傾きの等質性
- 使用技術: 重回帰、射影行列、Frisch--Waugh--Lovell型の残差化、$t$検定、partial F検定

## 問題

$n$ 個の観測について、処置群指標 $g_i\in\{0,1\}$、連続共変量 $z_i$、応答 $Y_i$ がある。共通傾きの共分散分析モデル

$$
Y_i=\alpha+\tau g_i+\beta z_i+\varepsilon_i,
\qquad
\varepsilon_i\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$

を考える。

ベクトル $g=(g_1,\ldots,g_n)^T$、$z=(z_1,\ldots,z_n)^T$ とし、

$$
W=\begin{bmatrix}
\mathbf 1 & z
\end{bmatrix},
\qquad
P_W=W(W^TW)^{-1}W^T,
\qquad
M_W=I-P_W
$$

とする。

$$
g^*=M_Wg
$$

とおき、$g^{*T}g^*>0$ とする。

1. $\tau$ の最小二乗推定量が

$$
\widehat\tau
=\frac{g^{*T}Y}{g^{*T}g^*}
$$

と書けることを示せ。
2. $\widehat\tau$ の分布を求めよ。
3. 共通傾きモデルの残差平方和を $SSE_C$ とし、$\tau=0$ の $t$ 検定統計量を与えよ。
4. より一般に

$$
Y_i
=\alpha+\tau g_i+\beta z_i+\delta(g_iz_i)+\varepsilon_i
$$

とし、残差平方和を $SSE_I$ とする。傾きの等質性

$$
H_0:\delta=0
$$

を検定するpartial F統計量を与えよ。
5. 単純な群平均差 $\overline Y_1-\overline Y_0$ の期待値を求め、なぜ共変量調整が必要になることがあるか説明せよ。
6. $n=20$ で

$$
g^{*T}g^*=4.5,
\qquad
g^{*T}Y=5.4,
$$

$$
SSE_C=32.3,
\qquad
SSE_I=27.2
$$

だった。$\widehat\tau$、共通傾きモデルでの $\tau=0$ の $t$ 値、傾き等質性検定の $F$ 値を求めよ。

## 解答

### 方針

処置指標 $g$ から、切片と共変量 $z$ で説明できる部分を除く。残った $g^*$ だけを使えば、$z$ の影響を除いた処置効果を単回帰と同じ形で推定できる。

### 使用結果と仮定

- $W$ は列フルランク。
- $M_W$ は対称冪等行列で $M_WW=0$。
- 共通傾きモデルのパラメータ数は3。
- 交互作用付きモデルのパラメータ数は4。

### 1. 調整済み処置効果

モデルを行列表現すると

$$
Y=W\eta+\tau g+\varepsilon,
$$

ただし

$$
\eta=(\alpha,\beta)^T.
$$

両辺へ $M_W$ を掛けると

$$
M_WY
=\tau M_Wg+M_W\varepsilon.
$$

$Y^*=M_WY$、$g^*=M_Wg$ とおけば

$$
Y^*=\tau g^*+M_W\varepsilon.
$$

したがって残差化後の単回帰の最小二乗推定量は

$$
\widehat\tau
=\frac{g^{*T}Y^*}{g^{*T}g^*}.
$$

$M_W$ は対称冪等なので

$$
g^{*T}Y^*
=g^TM_WM_WY
=g^TM_WY
=g^{*T}Y.
$$

よって

$$
\boxed{
\widehat\tau
=\frac{g^{*T}Y}{g^{*T}g^*}
}.
$$

### 2. 分布

モデルから

$$
g^{*T}Y
=\tau g^{*T}g+g^{*T}\varepsilon.
$$

また

$$
g^{*T}g
=g^TM_Wg
=g^{*T}g^*.
$$

したがって

$$
\widehat\tau
=\tau+
\frac{g^{*T}\varepsilon}{g^{*T}g^*}.
$$

分散は

$$
\operatorname{Var}(g^{*T}\varepsilon)
=\sigma^2g^{*T}g^*.
$$

よって

$$
\boxed{
\widehat\tau
\sim
N\left(
\tau,
\frac{\sigma^2}{g^{*T}g^*}
\right)
}.
$$

### 3. $\tau=0$ の検定

共通傾きモデルの誤差分散推定量は

$$
s_C^2
=\frac{SSE_C}{n-3}.
$$

したがって

$$
\boxed{
t
=\frac{\widehat\tau}
{s_C/\sqrt{g^{*T}g^*}}
\sim t_{n-3}
\qquad(H_0:\tau=0)
}.
$$

### 4. 傾きの等質性

交互作用付きモデルは共通傾きモデルより1パラメータ多い。

$H_0:\delta=0$ の下で共通傾きモデルが縮小モデルになるので

$$
\boxed{
F
=\frac{(SSE_C-SSE_I)/1}
{SSE_I/(n-4)}
\sim F_{1,n-4}
}.
$$

この検定で $H_0$ が棄却されるなら、群ごとに傾きが違うため、単一の調整済み処置効果 $\tau$ だけを報告するのは不適切になる。

### 5. 群平均差と交絡

群 $g=1$ の共変量平均を $\overline z_1$、群 $g=0$ を $\overline z_0$ とする。

モデルより

$$
E[\overline Y_1]
=\alpha+\tau+\beta\overline z_1,
$$

$$
E[\overline Y_0]
=\alpha+\beta\overline z_0.
$$

したがって

$$
\boxed{
E[\overline Y_1-\overline Y_0]
=\tau+\beta(\overline z_1-\overline z_0)
}.
$$

共変量の群平均が異なると、単純な群平均差には処置効果 $\tau$ だけでなく共変量差の効果も混入する。

### 6. 数値例

まず

$$
\widehat\tau
=\frac{5.4}{4.5}
=\boxed{1.2}.
$$

共通傾きモデルでは

$$
s_C^2
=\frac{32.3}{17}
=1.9.
$$

したがって標準誤差は

$$
\sqrt{\frac{1.9}{4.5}}
\approx0.650.
$$

よって

$$
\boxed{
t
\approx\frac{1.2}{0.650}
\approx1.85
}.
$$

傾き等質性検定では

$$
\frac{SSE_I}{n-4}
=\frac{27.2}{16}
=1.7.
$$

したがって

$$
\boxed{
F
=\frac{32.3-27.2}{1.7}
=3.00
}.
$$

### 結論

ANCOVAは「群平均を比べる前に、共変量によって説明できる成分を取り除く」重回帰である。処置効果を検定する前に、必要なら処置×共変量の交互作用を用いて共通傾き仮定も確認する。

### 検算

共変量 $z$ と処置指標 $g$ が無相関であれば、$g$ の残差化による変化は小さくなり、調整済み群差は単純群差に近づく。

### 本番答案

$W=[\mathbf1,z]$ として $M_W=I-P_W$、$g^*=M_Wg$ と置く。残差化すると

$$
M_WY=\tau g^*+M_W\varepsilon
$$

だから

$$
\hat\tau=\frac{g^{*T}Y}{g^{*T}g^*},
\qquad
\operatorname{Var}(\hat\tau)=\frac{\sigma^2}{g^{*T}g^*}.
$$

共通傾きモデルでは $t_{n-3}$、傾き等質性は

$$
F=\frac{SSE_C-SSE_I}{SSE_I/(n-4)}
\sim F_{1,n-4}
$$

で検定する。

### 採点基準

- 残差化による $\widehat\tau$: 30%
- 分布と標準誤差: 20%
- $t$検定: 15%
- 傾き等質性のpartial F: 15%
- 群平均差の交絡説明: 10%
- 数値計算: 10%

### 25分経過時の打ち切り判断

FWL型の導出が重い場合、$\widehat\tau$ の式を結果として使い、分布・$t$検定・傾き等質性の $F$ 検定を完成させる。

---

# 予想4: 多重比較でBonferroni法とScheffé法を使い分ける

- 安定ID: `PRED-LM-04-MULTIPLE-COMPARISON`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 一元配置分散分析後の多重比較、家族内誤差率、同時信頼区間
- 使用技術: 線形対比、Bonferroni不等式、$t$分布、$F$分布、Scheffé法

## 問題

一元配置モデル

$$
Y_{ij}=\mu_i+\varepsilon_{ij},
\qquad
\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$

を考える。群は $i=1,\ldots,k$、群 $i$ の標本数は $n_i$ とする。全標本数を

$$
N=\sum_{i=1}^k n_i
$$

とする。

一元配置ANOVAから

$$
MSE=\frac{SSE}{N-k}
$$

が得られているとする。

1. 任意の2群 $i,j$ について $\overline Y_i-\overline Y_j$ の分散を求めよ。
2. 全ペア比較の個数 $m$ を求め、家族内有意水準を $\alpha$ 以下に抑えるBonferroni同時信頼区間を与えよ。
3. Bonferroni法で家族内第一種過誤確率が高々 $\alpha$ となることを示せ。
4. 一般の線形対比

$$
L=\sum_{i=1}^k c_i\mu_i,
\qquad
\sum_i c_i=0
$$

を考える。$L$ の推定量と推定分散を求めよ。
5. Scheffé法による、すべての線形対比に同時に成り立つ信頼区間を与えよ。
6. Bonferroni法とScheffé法をどのように使い分けるべきか説明せよ。

## 解答

### 方針

Bonferroni法は「検定したい有限個の比較」が決まっているときに和事象の確率を抑える。Scheffé法は有限個ではなく、全ての線形対比を同時に保証する。

### 使用結果と仮定

- 各群は独立。
- 共通分散 $\sigma^2$。
- $MSE$ は $\sigma^2$ の不偏推定量で、自由度 $\nu=N-k$。

### 1. ペア差の分散

独立性より

$$
\operatorname{Var}(\overline Y_i)
=\frac{\sigma^2}{n_i}.
$$

したがって

$$
\boxed{
\operatorname{Var}(\overline Y_i-\overline Y_j)
=\sigma^2\left(\frac1{n_i}+\frac1{n_j}\right)
}.
$$

### 2. Bonferroni同時信頼区間

全ペア数は

$$
\boxed{
m=\binom{k}{2}=\frac{k(k-1)}2
}.
$$

各2側信頼区間へ失敗確率 $\alpha/m$ を割り当てる。

したがって全ペアについて

$$
\boxed{
(\overline Y_i-\overline Y_j)
\pm
t_{1-\alpha/(2m),\,N-k}
\sqrt{
MSE\left(\frac1{n_i}+\frac1{n_j}\right)
}
}
$$

を用いる。

### 3. 家族内誤差率

第 $\ell$ 比較で区間が真値を含まない事象を $A_\ell$ とする。

各比較について

$$
P(A_\ell)\le\frac{\alpha}{m}.
$$

少なくとも1つ失敗する確率はBonferroni不等式より

$$
\begin{aligned}
P\left(\bigcup_{\ell=1}^m A_\ell\right)
&\le\sum_{\ell=1}^mP(A_\ell)\\
&\le m\frac{\alpha}{m}\\
&=\alpha.
\end{aligned}
$$

したがって

$$
\boxed{
\mathrm{FWER}\le\alpha
}.
$$

比較統計量どうしが独立である必要はない。

### 4. 一般の線形対比

推定量は

$$
\boxed{
\widehat L
=\sum_{i=1}^k c_i\overline Y_i
}.
$$

独立性より

$$
\boxed{
\operatorname{Var}(\widehat L)
=\sigma^2\sum_{i=1}^k\frac{c_i^2}{n_i}
}.
$$

推定標準誤差は

$$
\sqrt{
MSE\sum_i\frac{c_i^2}{n_i}
}.
$$

### 5. Scheffé同時信頼区間

すべての線形対比に同時に成り立つ $1-\alpha$ 信頼区間は

$$
\boxed{
\widehat L
\pm
\sqrt{(k-1)F_{1-\alpha;k-1,N-k}}
\sqrt{
MSE\sum_{i=1}^k\frac{c_i^2}{n_i}
}
}.
$$

これは選んだ有限個の比較だけでなく、データを見た後に選ぶ任意の対比まで含めて保証する。

### 6. 使い分け

Bonferroni法:

- 比較したい仮説が事前に有限個へ絞れているときに使いやすい。
- 比較個数が少ない場合には比較的効率がよい。
- 独立性を仮定しなくてよい。

Scheffé法:

- 全ての線形対比を同時に保証したいときに向く。
- データを見てから対比を選ぶ場合にも適する。
- 保証範囲が広い分、特定の少数比較だけなら区間が広くなりやすい。

### 結論

多重比較の本質は「各検定の5%」ではなく「比較の集合全体で誤判定確率をどう管理するか」である。

### 検算

$k=2$ なら $m=1$ なので、Bonferroni法は通常の2群比較へ戻る。

### 本番答案

全ペア数は $m=k(k-1)/2$。Bonferroniでは各2側区間の誤り確率を $\alpha/m$ とし、

$$
(\bar Y_i-\bar Y_j)
\pm t_{1-\alpha/(2m),N-k}
\sqrt{MSE(1/n_i+1/n_j)}
$$

を使う。和事象の上界よりFWERは $\alpha$ 以下。任意の対比 $L=\sum c_i\mu_i$ にはScheffé法

$$
\hat L\pm
\sqrt{(k-1)F_{1-\alpha;k-1,N-k}}
\sqrt{MSE\sum c_i^2/n_i}
$$

を用いる。

### 採点基準

- ペア差分散: 15%
- Bonferroni区間: 25%
- FWER証明: 20%
- 線形対比: 15%
- Scheffé区間: 15%
- 使い分け: 10%

### 25分経過時の打ち切り判断

Scheffé法の係数を忘れた場合でも、Bonferroni区間とFWERの証明を確実に完成させる。

---

# 予想5: 重回帰の決定係数とpartial $R^2$をpartial F検定へつなぐ

- 安定ID: `PRED-LM-05-PARTIAL-R2`
- Level: B
- 目安時間: 20分
- 計算量: 中
- 主題: 重回帰、決定係数、説明変数追加、partial $R^2$
- 使用技術: 残差平方和、入れ子モデル、$F$検定、$t$検定

## 問題

$n$ 個の観測について、切片を含む2つの回帰モデルを考える。

縮小モデル:

$$
Y_i=\beta_0+\beta_1x_{1i}+\varepsilon_i
$$

完全モデル:

$$
Y_i=\beta_0+\beta_1x_{1i}+\beta_2x_{2i}+\varepsilon_i.
$$

誤差は独立に $N(0,\sigma^2)$ に従うとする。

全平方和を $SST$、縮小モデルの残差平方和を $SSE_R$、完全モデルを $SSE_F$ とする。

$$
R_R^2=1-\frac{SSE_R}{SST},
\qquad
R_F^2=1-\frac{SSE_F}{SST}
$$

とする。

1. $R_F^2\ge R_R^2$ を示せ。
2. $H_0:\beta_2=0$ のpartial F統計量を与えよ。
3. この $F$ 統計量を $R_R^2,R_F^2,n$ のみで表せ。
4. partial決定係数を

$$
R_{Y,2\mid1}^2
=\frac{SSE_R-SSE_F}{SSE_R}
$$

と定義する。これを $R_R^2,R_F^2$ で表せ。
5. 説明変数を1個だけ追加する場合、partial F検定と $\beta_2$ の $t$ 検定の関係を述べよ。
6. $n=30$、$R_R^2=0.49$、$R_F^2=0.64$ のとき、partial $R^2$、$F$ 値、対応する $|t|$ を求めよ。

## 解答

### 方針

説明変数を追加すると、最小化するパラメータ空間が広がるため残差平方和は増えない。この残差減少量を、完全モデルの残差分散で割ったものがpartial F統計量になる。

### 1. $R^2$の単調性

完全モデルは縮小モデルを含むので

$$
SSE_F\le SSE_R.
$$

したがって

$$
1-\frac{SSE_F}{SST}
\ge
1-\frac{SSE_R}{SST}.
$$

よって

$$
\boxed{R_F^2\ge R_R^2}.
$$

注意すべき点は、不要な説明変数でも通常の $R^2$ は低下しないことである。

### 2. partial F統計量

完全モデルのパラメータ数は3なので、誤差自由度は $n-3$。

追加したパラメータは1個だから

$$
\boxed{
F
=\frac{SSE_R-SSE_F}
{SSE_F/(n-3)}
\sim F_{1,n-3}
\qquad(H_0)
}.
$$

### 3. $R^2$による表現

$$
SSE_R=(1-R_R^2)SST,
$$

$$
SSE_F=(1-R_F^2)SST.
$$

したがって

$$
SSE_R-SSE_F
=(R_F^2-R_R^2)SST.
$$

よって

$$
\boxed{
F
=(n-3)
\frac{R_F^2-R_R^2}{1-R_F^2}
}.
$$

### 4. partial $R^2$

定義より

$$
\begin{aligned}
R_{Y,2\mid1}^2
&=\frac{SSE_R-SSE_F}{SSE_R}\\
&=\frac{(R_F^2-R_R^2)SST}
{(1-R_R^2)SST}.
\end{aligned}
$$

したがって

$$
\boxed{
R_{Y,2\mid1}^2
=\frac{R_F^2-R_R^2}{1-R_R^2}
}.
$$

これは「$x_1$ で説明し残した変動のうち、$x_2$ を追加することで何割減らせたか」を表す。

### 5. $t$検定との関係

追加パラメータが1個なら

$$
\boxed{F=t^2}.
$$

したがって両側 $t$ 検定とpartial F検定は同じ棄却判断を与える。

### 6. 数値例

partial $R^2$ は

$$
R_{Y,2\mid1}^2
=\frac{0.64-0.49}{1-0.49}
=\frac{0.15}{0.51}
\approx\boxed{0.294}.
$$

$F$ 値は

$$
F
=27\frac{0.15}{0.36}
=\boxed{11.25}.
$$

したがって

$$
|t|=\sqrt{11.25}
\approx\boxed{3.35}.
$$

### 結論

通常の $R^2$ の増加だけを見るのではなく、その増加が残差分散と自由度に対して十分大きいかをpartial F検定で判断する。

### 検算

partial $R^2=0.294<1$ であり、元の残差変動の約29.4%を追加変数が説明したと解釈できる。

### 本番答案

完全モデルは縮小モデルを含むため $SSE_F\le SSE_R$。したがって $R_F^2\ge R_R^2$。$\beta_2=0$ の検定は

$$
F=\frac{SSE_R-SSE_F}{SSE_F/(n-3)}
=(n-3)\frac{R_F^2-R_R^2}{1-R_F^2}
\sim F_{1,n-3}.
$$

また

$$
R_{Y,2|1}^2
=\frac{R_F^2-R_R^2}{1-R_R^2},
\qquad F=t^2.
$$

### 採点基準

- $R^2$単調性: 15%
- partial F: 25%
- $R^2$表示: 20%
- partial $R^2$: 20%
- $F=t^2$: 10%
- 数値計算: 10%

---

# 予想6: 対数変換で乗法誤差モデルを線形化し、残差の意味を読み替える

- 安定ID: `PRED-LM-06-LOG-TRANSFORM`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 変数変換、対数回帰、残差診断、対数正規分布
- 使用技術: 対数変換、単回帰、最尤推定、対数正規分布の平均・分散

## 問題

$x_i>0$ は既知とする。正の応答 $Y_i$ が

$$
Y_i=A x_i^{\beta}U_i,
\qquad
A>0,
$$

に従い

$$
\log U_i
=\varepsilon_i
\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$

とする。

1. $Z_i=\log Y_i$、$w_i=\log x_i$ とおき、通常の線形単回帰モデルへ変換せよ。
2. $\alpha=\log A$ として $\alpha,\beta$ の最尤推定量を求めよ。
3. $\sigma^2$ の最尤推定量と不偏推定量を求めよ。
4. 元のスケールで $E[Y_i\mid x_i]$ と $\operatorname{Var}(Y_i\mid x_i)$ を求めよ。
5. $\exp(\widehat\alpha+\widehat\beta\log x)$ を条件付き平均の推定値としてそのまま使うと何が問題か説明せよ。
6. 元スケールの残差図で平均が大きいほどばらつきが広がる「扇形」が見えやすい理由を説明し、対数変換後に何を確認すべきか述べよ。

## 解答

### 方針

乗法モデルは対数を取ると加法モデルになる。変換後は通常の正規線形回帰として扱えるが、元スケールへ戻すときは対数正規分布の平均補正が必要になる。

### 1. 線形化

対数を取ると

$$
\log Y_i
=\log A+\beta\log x_i+\log U_i.
$$

したがって

$$
\boxed{
Z_i=\alpha+\beta w_i+\varepsilon_i,
\qquad
\varepsilon_i\sim N(0,\sigma^2)
}
$$

ただし

$$
\alpha=\log A,
\qquad
w_i=\log x_i.
$$

### 2. $\alpha,\beta$ の最尤推定量

正規誤差なので、$\alpha,\beta$ の最尤推定は最小二乗と一致する。

$$
\overline w=\frac1n\sum_iw_i,
\qquad
\overline Z=\frac1n\sum_iZ_i
$$

$$
S_{ww}=\sum_i(w_i-\overline w)^2,
\qquad
S_{wZ}=\sum_i(w_i-\overline w)(Z_i-\overline Z)
$$

とすれば

$$
\boxed{
\widehat\beta
=\frac{S_{wZ}}{S_{ww}}
}
$$

$$
\boxed{
\widehat\alpha
=\overline Z-\widehat\beta\,\overline w
}.
$$

したがって

$$
\boxed{
\widehat A_{\mathrm{ML}}
=e^{\widehat\alpha}
}.
$$

### 3. $\sigma^2$ の推定

対数スケールの残差平方和を

$$
SSE_Z
=\sum_i
(Z_i-\widehat\alpha-\widehat\beta w_i)^2
$$

とする。

最尤推定量は

$$
\boxed{
\widehat\sigma^2_{\mathrm{ML}}
=\frac{SSE_Z}{n}
}.
$$

不偏推定量はパラメータ2個を推定しているため

$$
\boxed{
s^2
=\frac{SSE_Z}{n-2}
}.
$$

### 4. 元スケールの平均と分散

条件付きで

$$
\log Y_i
\sim
N(\alpha+\beta\log x_i,\sigma^2).
$$

したがって $Y_i\mid x_i$ は対数正規分布である。

対数正規分布の公式より

$$
\boxed{
E[Y_i\mid x_i]
=A x_i^\beta e^{\sigma^2/2}
}.
$$

また

$$
\boxed{
\operatorname{Var}(Y_i\mid x_i)
=A^2x_i^{2\beta}
 e^{\sigma^2}(e^{\sigma^2}-1)
}.
$$

### 5. 単純な逆変換の問題

$$
\exp(\alpha+\beta\log x)
=Ax^\beta
$$

は $Y\mid x$ の中央値である。

一方、平均は

$$
Ax^\beta e^{\sigma^2/2}.
$$

したがって単純に

$$
\exp(\widehat\alpha+\widehat\beta\log x)
$$

を逆変換すると、条件付き平均ではなく中央値に対応する。

$\sigma^2$ が既知なら平均への補正は

$$
\boxed{
\exp\left(
\widehat\alpha+\widehat\beta\log x+\frac{\sigma^2}{2}
\right)
}.
$$

実務では $\sigma^2$ を $s^2$ で置き換えるplug-in補正を考える。ただし有限標本で厳密な不偏推定になるとは限らない。

### 6. 残差診断

元スケールの分散は

$$
\operatorname{Var}(Y\mid x)
=\{E[Y\mid x]\}^2
\left(e^{\sigma^2}-1\right).
$$

したがって標準偏差は平均に比例する。

つまり応答水準が大きいところほど散らばりも大きくなり、元スケールの残差図では扇形になりやすい。

対数変換後は

$$
\operatorname{Var}(Z\mid w)=\sigma^2
$$

で一定なので、

- 残差対当てはめ値で分散が概ね一定か
- 非線形パターンが残っていないか
- 正規Q-Q図で極端な歪みがないか

を確認する。

### 結論

変数変換は単なる作図上の工夫ではなく、誤差構造を「乗法」から「加法・等分散」へ変えるモデル操作である。逆変換時には平均と中央値を区別する必要がある。

### 検算

$\sigma^2\to0$ なら

$$
e^{\sigma^2/2}\to1
$$

なので、平均と中央値の差は消える。

### 本番答案

$Z_i=\log Y_i,w_i=\log x_i$ と置くと

$$
Z_i=\alpha+\beta w_i+\varepsilon_i
$$

となるため通常のOLSを使える。元スケールでは

$$
E[Y|x]=Ax^\beta e^{\sigma^2/2},
$$

$$
\operatorname{Var}(Y|x)
=A^2x^{2\beta}e^{\sigma^2}(e^{\sigma^2}-1).
$$

単純逆変換 $e^{\hat\alpha+\hat\beta\log x}$ は中央値を推定し、平均を推定するには $e^{\sigma^2/2}$ の補正が必要である。

### 採点基準

- 対数線形化: 15%
- OLS/MLE: 20%
- 分散推定: 10%
- 対数正規平均・分散: 25%
- 逆変換の解釈: 15%
- 残差診断: 15%

### 25分経過時の打ち切り判断

分散公式を忘れた場合でも、対数線形化、OLS、平均の $e^{\sigma^2/2}$ 補正、扇形残差の説明を優先する。

---

# 予想7: 2変量正規分布から「平均への回帰」を数式で説明する

- 安定ID: `PRED-LM-07-REGRESSION-TO-MEAN`
- Level: B
- 目安時間: 20分
- 計算量: 中
- 主題: 平均への回帰、条件付き正規分布、極端値選択
- 使用技術: 2変量正規分布、条件付き期待値、切断正規分布

## 問題

$(X,Y)$ が2変量正規分布に従い

$$
E[X]=E[Y]=\mu,
$$

$$
\operatorname{Var}(X)
=\operatorname{Var}(Y)
=\sigma^2,
$$

$$
\operatorname{Corr}(X,Y)=\rho,
\qquad
0<\rho<1
$$

とする。

$X$ を1回目の測定、$Y$ を2回目の測定と考える。

1. $Y\mid X=x$ の条件付き分布を求めよ。
2. $x>\mu$ のとき、$E[Y\mid X=x]$ が $x$ より $\mu$ に近いことを示せ。
3. 条件付き期待変化量 $E[Y-X\mid X=x]$ を求めよ。
4. 1回目の測定で $X>c$ となった者だけを選ぶとする。$a=(c-\mu)/\sigma$ とし、標準正規密度・分布関数を $\phi,\Phi$ とする。次を示せ。

$$
E[X\mid X>c]
=\mu+\sigma\frac{\phi(a)}{1-\Phi(a)}.
$$

5. $E[Y\mid X>c]$ を求め、選抜群でも平均への回帰が起こることを示せ。
6. $\mu=100,\sigma=15,\rho=0.6$ とする。$X=130$ の人の2回目測定値の条件付き平均を求めよ。また $c=130$ で $\phi(2)/(1-\Phi(2))=2.37$ として、$X>130$ 群の1回目と2回目の条件付き平均を求めよ。
7. この現象だけから「何らかの介入が効いた」と結論してはいけない理由を説明せよ。

## 解答

### 方針

2変量正規分布の条件付き期待値は線形で、その傾きは相関係数 $\rho$ になる。同じ尺度で $0<\rho<1$ なら、極端な1回目測定値に対する2回目の条件付き平均は母平均方向へ縮む。

### 1. 条件付き分布

2変量正規分布の条件付き分布公式より

$$
\boxed{
Y\mid X=x
\sim
N\left(
\mu+\rho(x-\mu),
\sigma^2(1-\rho^2)
\right)
}.
$$

したがって

$$
\boxed{
E[Y\mid X=x]
=\mu+\rho(x-\mu)
}.
$$

### 2. 平均への回帰

$x>\mu$ とする。

$0<\rho<1$ なので

$$
0<\rho(x-\mu)<x-\mu.
$$

よって

$$
\mu
<\mu+\rho(x-\mu)
<x.
$$

したがって

$$
\boxed{
\mu<E[Y\mid X=x]<x
}.
$$

2回目の条件付き平均は、1回目の極端値より母平均へ近い。

### 3. 条件付き期待変化量

$$
\begin{aligned}
E[Y-X\mid X=x]
&=E[Y\mid X=x]-x\\
&=\mu+\rho(x-\mu)-x\\
&=-(1-\rho)(x-\mu).
\end{aligned}
$$

したがって

$$
\boxed{
E[Y-X\mid X=x]
=-(1-\rho)(x-\mu)
}.
$$

$x>\mu$ なら負、$x<\mu$ なら正になる。

### 4. 切断正規分布の平均

標準化

$$
Z=\frac{X-\mu}{\sigma}
$$

をすると $Z\sim N(0,1)$ で、$X>c$ は $Z>a$ と同値。

$$
E[Z\mid Z>a]
=\frac{\int_a^\infty z\phi(z)\,dz}
{1-\Phi(a)}.
$$

標準正規密度について

$$
\phi'(z)=-z\phi(z)
$$

だから

$$
\int_a^\infty z\phi(z)\,dz
=\phi(a).
$$

したがって

$$
E[Z\mid Z>a]
=\frac{\phi(a)}{1-\Phi(a)}.
$$

元へ戻せば

$$
\boxed{
E[X\mid X>c]
=\mu+\sigma
\frac{\phi(a)}{1-\Phi(a)}
}.
$$

### 5. 選抜群の2回目平均

反復期待値を使うと

$$
\begin{aligned}
E[Y\mid X>c]
&=E[E[Y\mid X]\mid X>c]\\
&=E[\mu+\rho(X-\mu)\mid X>c]\\
&=\mu+
ho(E[X\mid X>c]-\mu).
\end{aligned}
$$

したがって

$$
\boxed{
E[Y\mid X>c]
=\mu+\rho\sigma
\frac{\phi(a)}{1-\Phi(a)}
}.
$$

また

$$
E[X\mid X>c]-\mu
=\sigma\frac{\phi(a)}{1-\Phi(a)}.
$$

よって

$$
\boxed{
E[Y\mid X>c]-\mu
=\rho\{E[X\mid X>c]-\mu\}
}.
$$

$0<\rho<1$ だから、選抜群でも2回目平均は1回目平均より母平均へ近づく。

### 6. 数値例

$X=130$ のとき

$$
E[Y\mid X=130]
=100+0.6(130-100)
=\boxed{118}.
$$

したがって条件付き期待変化量は

$$
118-130=-12.
$$

次に $c=130$ では

$$
a=\frac{130-100}{15}=2.
$$

与えられた値を使うと

$$
E[X\mid X>130]
=100+15\times2.37
=\boxed{135.55}.
$$

2回目は

$$
\begin{aligned}
E[Y\mid X>130]
&=100+0.6(135.55-100)\\
&=121.33.
\end{aligned}
$$

したがって

$$
\boxed{
E[Y\mid X>130]\approx121.3
}.
$$

1回目平均135.6に比べ、2回目平均は母平均100へ大きく戻っている。

### 7. 因果解釈への注意

極端な1回目測定値には、持続的な個体差だけでなく偶然の測定誤差・一時的な揺らぎも含まれる。

そのため「1回目に極端だった人だけを選び、その後もう一度測る」だけで、介入がなくても平均値は自然に母平均方向へ動く。

したがって前後差だけでは

$$
\text{介入効果}
\quad\text{と}\quad
\text{平均への回帰}
$$

を区別できない。

対照群、無作為化、適切な比較設計などが必要になる。

### 結論

平均への回帰は「極端値が物理的に平均へ引っ張られる」現象ではない。相関が1未満の反復測定で、極端値を条件に選択したときの条件付き期待値の性質である。

### 検算

$\rho=1$ なら

$$
E[Y\mid X=x]=x
$$

となり平均への回帰は消える。$\rho=0$ なら

$$
E[Y\mid X=x]=\mu
$$

となり、2回目平均は完全に母平均へ戻る。

### 本番答案

2変量正規分布の条件付き分布より

$$
Y|X=x
\sim N(\mu+\rho(x-\mu),\sigma^2(1-\rho^2)).
$$

$0<\rho<1$ なら、$x>\mu$ に対して

$$
\mu<E[Y|X=x]<x.
$$

また

$$
E[Y-X|X=x]=-(1-\rho)(x-\mu).
$$

$X>c$ で選抜した場合も

$$
E[Y|X>c]-\mu
=\rho\{E[X|X>c]-\mu\}
$$

となるため平均への回帰が生じる。

### 採点基準

- 条件付き正規分布: 25%
- 平均への回帰の不等式: 15%
- 期待変化量: 10%
- 切断正規平均: 20%
- 選抜群の平均: 15%
- 数値例: 10%
- 因果解釈: 5%

---

# 学習優先順位メモ

## 最優先3題

1. `PRED-LM-01-GLH-PARTIAL-F`
2. `PRED-LM-02-TWOWAY-INTERACTION`
3. `PRED-LM-03-ANCOVA`

この3題は、線形モデルの行列表現、分散分析、入れ子モデルの検定を横断し、他問題への転用性が高い。

## 次点

4. `PRED-LM-04-MULTIPLE-COMPARISON`
5. `PRED-LM-05-PARTIAL-R2`

多重比較は公式範囲に明示されている一方で、既存長文演習が薄い。partial $R^2$ は2025年の単回帰・相関問題から一段発展した重回帰対策として位置づける。

## シラバス穴埋めとして重要

6. `PRED-LM-06-LOG-TRANSFORM`
7. `PRED-LM-07-REGRESSION-TO-MEAN`

変数変換、残差、平均への回帰はいずれも公式範囲に明記されているが、過去問テーマ一覧では主題として目立ちにくい。出題された場合に「見たことがない論点」にしないための保険として価値が高い。

# 今回あえて追加しなかった論点

## AICの基本計算

公式シラバス上は重要だが、2025年統計数理の公式問題でAICが直接出題されたため、今回の追加優先度は下げた。

## 単回帰の基本平方和分解

2025年統計数理で、最尤推定量、回帰平方和と残差平方和の分解、標本相関係数の分布までまとまって出題されたため、同型反復より重回帰・一般線形仮説を優先した。

## BLUEと多重共線性

既存の過去問型再構成演習で十分に厚く扱っている。

# 参照メモ

- 統計検定1級公式出題範囲表（統計数理）
- 統計検定1級 2025年11月「統計数理」公式問題
- `curriculum.yaml`
- `references/official-scope.md`
- `volumes/03_inference/regression_linear_model_past_exam_reconstructed_01_05.md`

実際の受験演習では公式問題・公式問題集を優先する。本ファイルはシラバス上の穴を埋めるための独自予想演習であり、実際の出題を保証するものではない。
