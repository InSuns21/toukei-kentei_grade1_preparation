# 回帰・線形モデル・分散分析分野 過去問型再構成演習 1位〜5位

このファイルは、統計検定1級「統計数理」の過去問テーマ一覧と公開解説をもとに、回帰・線形モデル・分散分析分野の演習価値ランキング1位〜5位を独自の設定・文章で再構成した演習集である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 記号・数値・設問順・補助設問は学習用に独自化している。
- 確度は `third_party_topic_index` とし、公式問題集を直接照合した `official_problem` ではない。
- 公開解説は出題構造の確認にのみ用い、数式・結論は独立に再計算している。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 演習価値の評価基準

順位は元難度そのものではなく、次の観点を重視した。

1. 回帰・線形モデルで何度も使う中核公式を含むか。
2. 推定、検定、検出力、分散分解、MSEなど複数論点を横断できるか。
3. 単回帰から重回帰、一般線形モデルへ転用できるか。
4. 射影行列、Cochran型分解、VIF、欠落変数バイアスなど上位概念へ接続できるか。
5. 「公式を知っている」だけでなく、なぜその形になるかまで練習できるか。

## 対象ランキング

| 順位 | 参照年・問 | 主題 | 元難度 | 再構成Level | 目安時間 | 主な使用技術 |
|---:|---|---|:---:|:---:|---:|---|
| 1 | 2024 問1 | 回帰係数の推定・検定・検出力 | B | B | 30分 | MLE、Fisher情報量、Cramér–Rao、正規検定、検出力、UMP |
| 2 | 2023 問4 | 2つの回帰モデル・$\chi^2$分布 | S | A | 35分 | 射影行列、Cochran型分解、独立な$\chi^2$、予測誤差、条件付き期待値 |
| 3 | 2015 問3 | 重回帰・MSE | B | B | 30分 | 正規方程式、相関係数、VIF、欠落変数バイアス、MSE |
| 4 | 2016 問3 | 線形モデルの推定量比較 | A | B | 25分 | 不偏性、分散比較、Cauchy–Schwarz、OLS、BLUE |
| 5 | 2022 問5 | 分散分析・検定・欠損値 | B | B | 30分 | 対応のある比較、二元配置、平方和分解、F検定、欠測 |

### 順位の考え方

1位の2024問1型は、回帰係数について「最尤推定量を出す → 情報量と分散を見る → 検定を作る → 検出力を比較する」という統計推測の一本道を1題で復習できるため最優先とした。

2位の2023問4型は難度こそ高いが、一般線形モデルの射影幾何、残差平方和と当てはまり部分の独立な$\chi^2$分解、さらに学習誤差と新規データ誤差の差までつながる。線形モデルの「奥の骨格」を理解する演習として非常に価値が高い。

3位の2015問3型は、重回帰の正規方程式、説明変数間相関による分散膨張、単回帰へ落としたときの欠落変数バイアス、分散とバイアスのMSE比較を一気に扱える。

4位の2016問3型は、複数の不偏推定量を比較し、最小二乗推定量がなぜ有利なのかを不等式から確認できる。Gauss–Markov定理への導入として強い。

5位の2022問5型は、対応のあるデータを二元配置分散分析として見直し、欠測時に「その観測がどの母数に情報を持つか」を考えさせる良問型である。ただし適用場面が上位4題よりやや限定されるため5位とした。

---

## 1位: 2024 問1型 回帰係数のMLEから検定・検出力までつなぐ

- 安定ID: `RECON-REG-R01-2024-Q1`
- 参照: 2024年 問1
- 確度: `third_party_topic_index`
- 確認元: Academaid「2024年統計検定1級＜統計数理1＞」
- 元主題: 線形回帰モデルの係数推定、検定、検出力
- Level: B
- 目安時間: 30分
- 計算量: 中
- 主な使用技術: 正規尤度、最尤推定、Fisher情報量、Cramér–Rao下限、正規検定、検出力、単調尤度比
- 変更点: 誤差分散既知・原点を通る回帰モデルに整理し、別の不偏推定量との検出力比較を明示した。

### 問題

$x_1,\ldots,x_n$ は既知の正数で、少なくとも2つは異なるとする。観測値 $Y_1,\ldots,Y_n$ は独立に

$$
Y_i=\beta x_i+\varepsilon_i,
\qquad
\varepsilon_i\sim N(0,\sigma^2)
$$

に従う。$\sigma^2$ は既知、$\beta\in\mathbb R$ は未知とする。さらに

$$
S_{xx}=\sum_{i=1}^n x_i^2,
\qquad
S_x=\sum_{i=1}^n x_i
$$

とおく。

1. $\beta$ の対数尤度を求め、最尤推定量 $\widehat\beta$ を求めよ。
2. $\widehat\beta$ が不偏であることを示し、その分散を求めよ。
3. $\beta$ に関するFisher情報量 $I_n(\beta)$ を求め、$\widehat\beta$ がCramér–Rao下限を達成することを示せ。
4. 別の推定量

$$
\widetilde\beta=\frac{\sum_{i=1}^nY_i}{\sum_{i=1}^nx_i}
$$

を考える。$\widetilde\beta$ の不偏性と分散を求め、$\widehat\beta$ と分散を比較せよ。
5. 片側検定

$$
H_0:\beta=0
\qquad\text{vs.}\qquad
H_1:\beta>0
$$

を有意水準 $\alpha$ で行う。$\widehat\beta$ を用いる検定の棄却域と、真の値が $\beta>0$ のときの検出力を求めよ。
6. $\widetilde\beta$ を用いて同じ有意水準の検定を作ったとき、$\widehat\beta$ を用いる検定の方が検出力が高いことを示せ。

### 解答

#### 1. 最尤推定量

尤度は

$$
L(\beta)
=\prod_{i=1}^n
\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left[
-\frac{(Y_i-\beta x_i)^2}{2\sigma^2}
\right].
$$

したがって、定数項を除く対数尤度は

$$
\ell(\beta)
=-\frac{1}{2\sigma^2}
\sum_{i=1}^n(Y_i-\beta x_i)^2.
$$

微分して

$$
\frac{\partial\ell}{\partial\beta}
=\frac{1}{\sigma^2}
\sum_{i=1}^n x_i(Y_i-\beta x_i).
$$

これを0とおけば

$$
\sum_{i=1}^nx_iY_i
-\beta\sum_{i=1}^nx_i^2=0
$$

なので

$$
\boxed{
\widehat\beta
=\frac{\sum_{i=1}^nx_iY_i}{S_{xx}}
}.
$$

なお

$$
\frac{\partial^2\ell}{\partial\beta^2}
=-\frac{S_{xx}}{\sigma^2}<0
$$

だから、これは確かに最大点である。

#### 2. 不偏性と分散

$E[Y_i]=\beta x_i$ より

$$
E[\widehat\beta]
=\frac{\sum_i x_iE[Y_i]}{S_{xx}}
=\frac{\beta\sum_i x_i^2}{S_{xx}}
=\beta.
$$

したがって不偏である。

独立性より

$$
\begin{aligned}
\mathrm{Var}(\widehat\beta)
&=\frac{1}{S_{xx}^2}
\sum_{i=1}^n x_i^2\mathrm{Var}(Y_i)\\
&=\frac{\sigma^2S_{xx}}{S_{xx}^2}
=\frac{\sigma^2}{S_{xx}}.
\end{aligned}
$$

よって

$$
\boxed{
\widehat\beta
\sim N\left(
\beta,\frac{\sigma^2}{S_{xx}}
\right)
}.
$$

#### 3. Fisher情報量とCramér–Rao下限

2階微分を用いると

$$
I_n(\beta)
=-E\left[
\frac{\partial^2\ell}{\partial\beta^2}
\right]
=\frac{S_{xx}}{\sigma^2}.
$$

したがって不偏推定量の分散に対するCramér–Rao下限は

$$
\frac{1}{I_n(\beta)}
=\frac{\sigma^2}{S_{xx}}.
$$

これは $\widehat\beta$ の分散と一致する。

$$
\boxed{
\mathrm{Var}(\widehat\beta)
=\frac1{I_n(\beta)}
}
$$

なので $\widehat\beta$ は有効推定量である。

#### 4. 別の不偏推定量との比較

まず

$$
E[\widetilde\beta]
=\frac{\sum_iE[Y_i]}{S_x}
=\frac{\beta S_x}{S_x}
=\beta.
$$

また

$$
\mathrm{Var}(\widetilde\beta)
=\frac{n\sigma^2}{S_x^2}.
$$

Cauchy–Schwarzの不等式より

$$
\left(\sum_{i=1}^n x_i\right)^2
\le n\sum_{i=1}^n x_i^2.
$$

したがって

$$
\frac{1}{S_{xx}}
\le \frac{n}{S_x^2},
$$

すなわち

$$
\boxed{
\mathrm{Var}(\widehat\beta)
\le
\mathrm{Var}(\widetilde\beta)
}.
$$

等号は $x_1=\cdots=x_n$ のときだけ成立する。今回は少なくとも2つが異なるので不等号は厳密である。

#### 5. 検定と検出力

$H_0$ の下で

$$
Z
=\frac{\widehat\beta}{\sigma/\sqrt{S_{xx}}}
\sim N(0,1).
$$

標準正規分布の上側 $\alpha$ 点を $z_{1-\alpha}$ とすれば、棄却域は

$$
\boxed{
\widehat\beta
>
 z_{1-\alpha}\frac{\sigma}{\sqrt{S_{xx}}}
}.
$$

真の値が $\beta>0$ のとき

$$
\frac{\widehat\beta-\beta}{\sigma/\sqrt{S_{xx}}}
\sim N(0,1)
$$

だから検出力は

$$
\boxed{
\pi_{\widehat\beta}(\beta)
=1-\Phi\left(
 z_{1-\alpha}
-\frac{\beta\sqrt{S_{xx}}}{\sigma}
\right)
}.
$$

#### 6. 検出力比較

$\widetilde\beta$ は

$$
\widetilde\beta
\sim N\left(
\beta,
\frac{n\sigma^2}{S_x^2}
\right)
$$

なので

$$
\pi_{\widetilde\beta}(\beta)
=1-\Phi\left(
 z_{1-\alpha}
-\frac{\beta S_x}{\sigma\sqrt n}
\right).
$$

Cauchy–Schwarzより

$$
\frac{S_x}{\sqrt n}
\le \sqrt{S_{xx}}.
$$

$\beta>0$ では

$$
\frac{\beta S_x}{\sigma\sqrt n}
\le
\frac{\beta\sqrt{S_{xx}}}{\sigma}.
$$

よって

$$
\boxed{
\pi_{\widehat\beta}(\beta)
\ge
\pi_{\widetilde\beta}(\beta)
}.
$$

このモデルの尤度比は $\sum_i x_iY_i$ の単調関数となるため、正規族の単調尤度比性から $\widehat\beta$ に基づく上側検定は $\beta>0$ に対してUMP検定になる。

### この問題から持ち帰ること

- 最尤推定量、Fisher情報量、Cramér–Rao下限は別々の章ではなく一直線につながる。
- 推定量の分散が小さいことは、同じ有意水準なら検出力が高くなることに直結する。
- 原点を通る正規回帰では $\sum x_iY_i$ が推定・検定の中心統計量になる。

---

## 2位: 2023 問4型 射影行列と独立な$\chi^2$分解から予測誤差を評価する

- 安定ID: `RECON-REG-R02-2023-Q4`
- 参照: 2023年 問4
- 確度: `third_party_topic_index`
- 確認元: Academaid「2023年統計検定1級＜数理統計問4＞」
- 元主題: カイ二乗分布と2つの回帰モデル
- Level: A
- 目安時間: 35分
- 計算量: 多
- 主な使用技術: 射影行列、Cochranの定理、$\chi^2$分布、独立性、逆$\chi^2$期待値、条件付き期待値、予測誤差
- 変更点: 一般線形モデルの直交分解を前面に出し、学習誤差と新規データ誤差の差を明示した。

### 問題

$X$ を $n\times p$ の既知行列とし、$\mathrm{rank}(X)=p<n-2$ とする。線形モデル

$$
Y=X\beta+\varepsilon,
\qquad
\varepsilon\sim N_n(0,\sigma^2I_n)
$$

を考える。$\beta\in\mathbb R^p$、$\sigma^2>0$ は未知とする。

最小二乗推定量と射影行列を

$$
\widehat\beta=(X^TX)^{-1}X^TY,
\qquad
P=X(X^TX)^{-1}X^T
$$

とおく。また

$$
W_1
=\frac{\|Y-X\widehat\beta\|^2}{\sigma^2},
\qquad
W_2
=\frac{\|X\widehat\beta-X\beta\|^2}{\sigma^2}
$$

とする。

1. $W\sim\chi_k^2$ のとき

$$
E[W]=k,
\qquad
E[W^{-1}]=\frac{1}{k-2}
$$

を確認せよ。ただし後者は $k>2$ とする。
2. $W_1\sim\chi_{n-p}^2$、$W_2\sim\chi_p^2$ を示し、両者が独立であることを説明せよ。
3. $Y$ と独立で同じ説明変数行列をもつ新規応答

$$
Z=X\beta+\varepsilon',
\qquad
\varepsilon'\sim N_n(0,\sigma^2I_n)
$$

を考える。予測平方誤差

$$
\Delta(Z)=\|Z-X\widehat\beta\|^2
$$

について $E[\Delta(Z)\mid Y]$ を求めよ。
4. 学習平方誤差を $\Delta(Y)=\|Y-X\widehat\beta\|^2$ とし、分散の最尤推定量

$$
\widehat\sigma^2=\frac{\Delta(Y)}{n}
$$

を用いる。次を求めよ。

$$
E\left[
\frac{\Delta(Z)-\Delta(Y)}{\widehat\sigma^2}
\right].
$$

さらに $p$ を固定して $n\to\infty$ とした極限を求めよ。

### 解答

#### 1. $\chi^2$分布の基本期待値

$W\sim\chi_k^2$ はGamma分布

$$
W\sim\mathrm{Gamma}\left(\frac{k}{2},\,2\right)
$$

とみなせるので

$$
\boxed{E[W]=k}.
$$

また $k>2$ なら

$$
\begin{aligned}
E[W^{-1}]
&=\int_0^\infty
w^{-1}
\frac{1}{2^{k/2}\Gamma(k/2)}
w^{k/2-1}e^{-w/2}\,dw\\
&=\frac{1}{k-2}.
\end{aligned}
$$

したがって

$$
\boxed{
E[W^{-1}]=\frac1{k-2}
}.
$$

#### 2. 直交射影による$\chi^2$分解

まず

$$
X\widehat\beta=PY.
$$

したがって残差は

$$
Y-X\widehat\beta
=(I-P)Y
=(I-P)\varepsilon
$$

である。$P$ は対称かつ冪等で

$$
P^T=P,
\qquad
P^2=P,
\qquad
\mathrm{rank}(P)=p.
$$

よって $I-P$ も対称冪等で

$$
\mathrm{rank}(I-P)=n-p.
$$

Cochranの定理より

$$
\boxed{
W_1
=\frac{\varepsilon^T(I-P)\varepsilon}{\sigma^2}
\sim\chi_{n-p}^2
}.
$$

一方

$$
X\widehat\beta-X\beta
=P(X\beta+\varepsilon)-X\beta
=P\varepsilon
$$

なので

$$
\boxed{
W_2
=\frac{\varepsilon^TP\varepsilon}{\sigma^2}
\sim\chi_p^2
}.
$$

さらに

$$
P(I-P)=0
$$

であり、$P\varepsilon$ と $(I-P)\varepsilon$ は多変量正規ベクトルで共分散0だから独立である。したがって $W_1,W_2$ も独立。

また

$$
\frac{\varepsilon^T\varepsilon}{\sigma^2}
=W_1+W_2
\sim\chi_n^2
$$

という直交分解になっている。

#### 3. 新規データに対する予測平方誤差

$Y$ を固定すると $\widehat\beta$ は定数である。

$$
Z-X\widehat\beta
=X(\beta-\widehat\beta)+\varepsilon'.
$$

よって

$$
\begin{aligned}
E[\Delta(Z)\mid Y]
&=\|X(\beta-\widehat\beta)\|^2
+E[(\varepsilon')^T\varepsilon']\\
&=\sigma^2W_2+n\sigma^2.
\end{aligned}
$$

したがって

$$
\boxed{
E[\Delta(Z)\mid Y]
=\sigma^2(W_2+n)
}.
$$

学習データではパラメータを同じデータに合わせているので誤差が小さく見えるが、新規データでは「推定誤差」$W_2$ が上乗せされる。

#### 4. 学習誤差と新規データ誤差の差

$\Delta(Y)=\sigma^2W_1$ であり

$$
\widehat\sigma^2
=\frac{\sigma^2W_1}{n}.
$$

条件付き期待値を先にとると

$$
\begin{aligned}
E\left[
\frac{\Delta(Z)-\Delta(Y)}{\widehat\sigma^2}
\right]
&=E\left[
\frac{\sigma^2(W_2+n)-\sigma^2W_1}
{\sigma^2W_1/n}
\right]\\
&=nE\left[
\frac{W_2+n}{W_1}-1
\right].
\end{aligned}
$$

$W_1$ と $W_2$ は独立だから

$$
E\left[\frac{W_2}{W_1}\right]
=E[W_2]E[W_1^{-1}]
=\frac{p}{n-p-2}.
$$

また

$$
E[W_1^{-1}]
=\frac{1}{n-p-2}.
$$

よって

$$
\begin{aligned}
E\left[
\frac{\Delta(Z)-\Delta(Y)}{\widehat\sigma^2}
\right]
&=n\left[
\frac{p}{n-p-2}
+\frac{n}{n-p-2}
-1
\right]\\
&=\boxed{
\frac{2n(p+1)}{n-p-2}
}.
\end{aligned}
$$

$p$ 固定で $n\to\infty$ とすると

$$
\boxed{
\frac{2n(p+1)}{n-p-2}
\longrightarrow
2(p+1)
}.
$$

この $2(p+1)$ は、パラメータをデータに合わせたことによって学習誤差が楽観的になる量と対応しており、情報量規準の考え方への入口にもなる。

### この問題から持ち帰ること

- 正規線形モデルの平方和分解の本体は、$P$ と $I-P$ という直交射影である。
- $\chi^2$ の自由度は射影行列のrankから出る。
- 独立性は「正規ベクトル + 直交射影」で一気に処理できる。
- 学習誤差と新規データ誤差の差はモデル複雑度と結びつく。

---

## 3位: 2015 問3型 重回帰のVIF・欠落変数バイアス・MSEを一気に扱う

- 安定ID: `RECON-REG-R03-2015-Q3`
- 参照: 2015年 問3
- 確度: `third_party_topic_index`
- 確認元: Academaid「2015年統計検定1級＜統計数理3＞」
- 元主題: 重回帰モデルと平均二乗誤差
- Level: B
- 目安時間: 30分
- 計算量: 中〜多
- 主な使用技術: 正規方程式、2変数重回帰、相関係数、分散共分散行列、VIF、欠落変数バイアス、MSE
- 変更点: 説明変数を中心化して式を簡潔化し、単回帰へ落としたときのバイアスを明示した。

### 問題

固定された説明変数 $x_{1i},x_{2i}$ は

$$
\sum_{i=1}^n x_{1i}=0,
\qquad
\sum_{i=1}^n x_{2i}=0
$$

を満たすとする。モデル

$$
Y_i
=\beta_0+\beta_1x_{1i}+\beta_2x_{2i}+\varepsilon_i,
\qquad
\varepsilon_i\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$

を考える。

$$
S_{11}=\sum_i x_{1i}^2,
\quad
S_{22}=\sum_i x_{2i}^2,
\quad
S_{12}=\sum_i x_{1i}x_{2i}
$$

および

$$
S_{1y}=\sum_i x_{1i}Y_i,
\qquad
S_{2y}=\sum_i x_{2i}Y_i
$$

とおく。さらに

$$
r_{12}=\frac{S_{12}}{\sqrt{S_{11}S_{22}}},
\qquad |r_{12}|<1
$$

とする。

1. 最小二乗推定量 $\widehat\beta_0,\widehat\beta_1,\widehat\beta_2$ を求めよ。
2. $\widehat\beta_1$ を $r_{12}$、$r_{1y}$、$r_{2y}$ を用いて表し、$r_{1y}>0$ でも $\widehat\beta_1<0$ となり得る理由を説明せよ。
3. $\widehat\beta_1$ の分散を求め、$|r_{12}|\to1$ で何が起こるか説明せよ。
4. $x_2$ をモデルから外して

$$
\widetilde\beta_1=\frac{S_{1y}}{S_{11}}
$$

と推定したとき、$E[\widetilde\beta_1]$、$\mathrm{Var}(\widetilde\beta_1)$ を求めよ。
5. $\widehat\beta_1$ と $\widetilde\beta_1$ のMSEを比較し、単純な方の推定量 $\widetilde\beta_1$ のMSEが小さくなり得る条件を述べよ。

### 解答

#### 1. 正規方程式

中心化条件により切片と傾きの正規方程式が分離する。

$$
\boxed{
\widehat\beta_0=\overline Y
}.
$$

傾きについては

$$
\begin{bmatrix}
S_{11}&S_{12}\\
S_{12}&S_{22}
\end{bmatrix}
\begin{bmatrix}
\widehat\beta_1\\
\widehat\beta_2
\end{bmatrix}
=
\begin{bmatrix}
S_{1y}\\
S_{2y}
\end{bmatrix}.
$$

行列を逆にして

$$
\boxed{
\widehat\beta_1
=\frac{S_{22}S_{1y}-S_{12}S_{2y}}
{S_{11}S_{22}-S_{12}^2}
}
$$

$$
\boxed{
\widehat\beta_2
=\frac{S_{11}S_{2y}-S_{12}S_{1y}}
{S_{11}S_{22}-S_{12}^2}
}.
$$

#### 2. 相関係数で見る符号反転

$S_{yy}=\sum_i(Y_i-\overline Y)^2$ とし

$$
r_{1y}=\frac{S_{1y}}{\sqrt{S_{11}S_{yy}}},
\qquad
r_{2y}=\frac{S_{2y}}{\sqrt{S_{22}S_{yy}}}
$$

とおくと

$$
\boxed{
\widehat\beta_1
=\sqrt{\frac{S_{yy}}{S_{11}}}
\frac{r_{1y}-r_{12}r_{2y}}
{1-r_{12}^2}
}.
$$

分母は正なので、符号は

$$
r_{1y}-r_{12}r_{2y}
$$

で決まる。

したがって $r_{1y}>0$ でも

$$
r_{12}r_{2y}>r_{1y}
$$

なら $\widehat\beta_1<0$ となる。

これは「$x_1$ と $Y$ の単純相関」と「$x_2$ を固定した $x_1$ の偏回帰効果」が別物であることを表す。

#### 3. 分散とVIF

一般に

$$
\mathrm{Var}(\widehat\beta)
=\sigma^2(X^TX)^{-1}.
$$

したがって

$$
\boxed{
\mathrm{Var}(\widehat\beta_1)
=\frac{\sigma^2S_{22}}
{S_{11}S_{22}-S_{12}^2}
=\frac{\sigma^2}{S_{11}}
\frac{1}{1-r_{12}^2}
}.
$$

ここで

$$
\frac{1}{1-r_{12}^2}
$$

が2変数の場合の分散膨張係数VIFに相当する。

$|r_{12}|\to1$ では

$$
\mathrm{Var}(\widehat\beta_1)\to\infty.
$$

つまり説明変数どうしがほぼ同じ情報を持つと、個々の係数を分離して推定するのが不安定になる。

#### 4. $x_2$ を落とした推定量

$$
S_{1y}
=\sum_i x_{1i}
(\beta_0+\beta_1x_{1i}+\beta_2x_{2i}+\varepsilon_i).
$$

中心化条件より切片項は消え

$$
E[S_{1y}]
=\beta_1S_{11}+\beta_2S_{12}.
$$

よって

$$
\boxed{
E[\widetilde\beta_1]
=\beta_1+\frac{S_{12}}{S_{11}}\beta_2
}.
$$

バイアスは

$$
\boxed{
\mathrm{Bias}(\widetilde\beta_1)
=\frac{S_{12}}{S_{11}}\beta_2
}.
$$

一方

$$
\mathrm{Var}(S_{1y})
=\sigma^2S_{11}
$$

だから

$$
\boxed{
\mathrm{Var}(\widetilde\beta_1)
=\frac{\sigma^2}{S_{11}}
}.
$$

重回帰推定量より分散は小さいが、$x_2$ の効果が $x_1$ 側へ混入してバイアスを持つ。

#### 5. MSE比較

$\widehat\beta_1$ は不偏なので

$$
\mathrm{MSE}(\widehat\beta_1)
=\frac{\sigma^2}{S_{11}(1-r_{12}^2)}.
$$

$\widetilde\beta_1$ はバイアスを持つので

$$
\boxed{
\mathrm{MSE}(\widetilde\beta_1)
=\frac{\sigma^2}{S_{11}}
+\left(
\frac{S_{12}}{S_{11}}\beta_2
\right)^2
}.
$$

差をとると

$$
\begin{aligned}
&\mathrm{MSE}(\widehat\beta_1)
-\mathrm{MSE}(\widetilde\beta_1)\\
&=\frac{S_{12}^2}{S_{11}^2}
\left[
\frac{\sigma^2}{S_{22}(1-r_{12}^2)}
-\beta_2^2
\right].
\end{aligned}
$$

一方

$$
\mathrm{Var}(\widehat\beta_2)
=\frac{\sigma^2}{S_{22}(1-r_{12}^2)}.
$$

したがって

$$
\boxed{
\mathrm{MSE}(\widetilde\beta_1)
<\mathrm{MSE}(\widehat\beta_1)
\iff
\beta_2^2<\mathrm{Var}(\widehat\beta_2)
}
$$

となる。

つまり $x_2$ の真の効果が小さいのに多重共線性のため $\widehat\beta_2$ が非常に不安定なら、あえて $x_2$ を落としたバイアス付き推定の方がMSEで勝つことがある。

### この問題から持ち帰ること

- 重回帰係数の符号は単純相関の符号と一致するとは限らない。
- 多重共線性は係数の分散を $1/(1-r^2)$ 倍に膨らませる。
- 説明変数を落とすと分散は下がるが、欠落変数バイアスが入る。
- MSEは「不偏なら常に優秀」という考えを壊し、バイアス–分散トレードオフを定量化する。

---

## 4位: 2016 問3型 3つの不偏推定量を比較してOLSの効率性を見る

- 安定ID: `RECON-REG-R04-2016-Q3`
- 参照: 2016年 問3
- 確度: `third_party_topic_index`
- 確認元: Academaid「2016年統計検定1級＜統計数理3＞」
- 元主題: 線形モデルにおける推定量の比較
- Level: B
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 不偏推定量、分散比較、算術平均・調和平均、Cauchy–Schwarz、最小二乗、Gauss–Markov
- 変更点: 最後に一般の線形不偏推定量まで広げ、OLSがBLUEになることを直接示す設問を追加した。

### 問題

$x_1,\ldots,x_n$ は既知の正数とし

$$
Y_i=\beta x_i+\varepsilon_i,
\qquad
\varepsilon_i\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$

とする。次の3つの推定量を考える。

$$
b_0
=\frac1n\sum_{i=1}^n\frac{Y_i}{x_i},
$$

$$
b_1
=\frac{\sum_{i=1}^nY_i}{\sum_{i=1}^nx_i},
$$

$$
b_2
=\frac{\sum_{i=1}^nx_iY_i}{\sum_{i=1}^nx_i^2}.
$$

1. $b_0,b_1,b_2$ がすべて $\beta$ の不偏推定量であることを示せ。
2. $b_2$ が最小二乗推定量であることを示せ。
3. 3つの分散を求めよ。
4. 次を示せ。

$$
\mathrm{Var}(b_2)
\le
\mathrm{Var}(b_1)
\le
\mathrm{Var}(b_0).
$$

5. 一般の線形推定量

$$
b=\sum_{i=1}^n a_iY_i
$$

を考える。不偏となるための条件を求め、その条件の下で分散を最小にする $a_i$ を求めよ。

### 解答

#### 1. 不偏性

$E[Y_i]=\beta x_i$ なので

$$
E[b_0]
=\frac1n\sum_i\frac{\beta x_i}{x_i}
=\beta.
$$

$$
E[b_1]
=\frac{\beta\sum_ix_i}{\sum_ix_i}
=\beta.
$$

$$
E[b_2]
=\frac{\beta\sum_ix_i^2}{\sum_ix_i^2}
=\beta.
$$

したがって3つとも不偏である。

#### 2. $b_2$ は最小二乗推定量

残差平方和

$$
Q(b)=\sum_{i=1}^n(Y_i-bx_i)^2
$$

を最小化する。

$$
\frac{dQ}{db}
=-2\sum_ix_i(Y_i-bx_i).
$$

0とおくと

$$
\boxed{
b=b_2
=\frac{\sum_ix_iY_i}{\sum_ix_i^2}
}.
$$

#### 3. 分散

独立性より

$$
\boxed{
\mathrm{Var}(b_0)
=\frac{\sigma^2}{n^2}
\sum_{i=1}^n\frac1{x_i^2}
}.
$$

$$
\boxed{
\mathrm{Var}(b_1)
=\frac{n\sigma^2}
{(\sum_ix_i)^2}
}.
$$

$$
\boxed{
\mathrm{Var}(b_2)
=\frac{\sigma^2}{\sum_ix_i^2}
}.
$$

#### 4. 分散の大小

まずCauchy–Schwarzより

$$
\left(\sum_ix_i\right)^2
\le n\sum_ix_i^2.
$$

したがって

$$
\frac1{\sum_ix_i^2}
\le
\frac{n}{(\sum_ix_i)^2},
$$

すなわち

$$
\mathrm{Var}(b_2)
\le
\mathrm{Var}(b_1).
$$

次に正数 $x_i$ について算術平均と調和平均の関係より

$$
\frac{n}{\sum_i x_i}
\le
\frac1n\sum_i\frac1{x_i}.
$$

さらにCauchy–Schwarzより

$$
\left(\sum_i\frac1{x_i}\right)^2
\le
n\sum_i\frac1{x_i^2}.
$$

両者を組み合わせると

$$
\frac{n}{(\sum_ix_i)^2}
\le
\frac1{n^2}\sum_i\frac1{x_i^2}.
$$

よって

$$
\boxed{
\mathrm{Var}(b_2)
\le
\mathrm{Var}(b_1)
\le
\mathrm{Var}(b_0)
}.
$$

$x_i$ がすべて等しいとき3者は一致する。

#### 5. 一般の線形不偏推定量

$$
E[b]
=\sum_i a_iE[Y_i]
=\beta\sum_i a_ix_i.
$$

したがって不偏条件は

$$
\boxed{
\sum_i a_ix_i=1
}.
$$

分散は

$$
\mathrm{Var}(b)
=\sigma^2\sum_i a_i^2.
$$

Cauchy–Schwarzより

$$
\left(\sum_i a_ix_i\right)^2
\le
\left(\sum_i a_i^2\right)
\left(\sum_i x_i^2\right).
$$

不偏条件を代入すると

$$
1
\le
\left(\sum_i a_i^2\right)
\left(\sum_i x_i^2\right),
$$

したがって

$$
\sum_i a_i^2
\ge
\frac1{\sum_ix_i^2}.
$$

等号は $a_i$ が $x_i$ に比例するときであり、不偏条件から

$$
\boxed{
 a_i=\frac{x_i}{\sum_jx_j^2}
}.
$$

このとき

$$
b
=\frac{\sum_ix_iY_i}{\sum_ix_i^2}
=b_2.
$$

よって $b_2$ は線形不偏推定量の中で最小分散、すなわちこのモデルでBLUEである。

### この問題から持ち帰ること

- 「全部不偏」でも分散は大きく違う。
- OLSの重み $x_i$ は、情報の大きい観測を強く使う最適な重みになっている。
- Gauss–Markov定理は抽象定理として覚えるだけでなく、Cauchy–Schwarzで1変数の場合を直接証明できる。

---

## 5位: 2022 問5型 対応のある比較を二元配置ANOVAとして捉え、欠測の情報を考える

- 安定ID: `RECON-REG-R05-2022-Q5`
- 参照: 2022年 問5
- 確度: `third_party_topic_index`
- 確認元: Academaid「2022年統計検定1級＜数理統計問5＞」
- 元主題: 分散分析モデルの検定と欠損値
- Level: B
- 目安時間: 30分
- 計算量: 中
- 主な使用技術: 対応のある差、二元配置分散分析、平方和分解、F検定、自由度、欠損値
- 変更点: 2条件の対応データとして設定し、対応のある$t$検定との関係と欠測時の識別可能性を明確にした。

### 問題

$n$ 人の対象について、条件1と条件2でそれぞれ応答 $X_i,Y_i$ を観測する。モデルを

$$
X_i=\mu_i+\varepsilon_{i1},
\qquad
Y_i=\mu_i+\theta+\varepsilon_{i2},
$$

$$
\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$

とする。$\mu_i$ は対象ごとの固定効果、$\theta$ は条件2による共通効果である。

1. 差 $D_i=Y_i-X_i$ の分布を求めよ。
2. $Z_{i1}=X_i, Z_{i2}=Y_i$ とおき、二元配置加法モデル

$$
Z_{ij}=\nu+a_i+b_j+\varepsilon_{ij}
$$

に書き直す。制約

$$
\sum_{i=1}^na_i=0,
\qquad
b_1+b_2=0
$$

の下で $\nu,a_i,b_j$ を $\mu_i,\theta$ で表せ。
3. 対象要因A、条件要因B、残差Eの平方和を定義し、それぞれの自由度を求めよ。$H_0:\theta=0$ のF検定統計量を与えよ。
4. このF検定が、差 $D_i$ に対する対応のある$t$検定の二乗と一致することを説明せよ。
5. $X_1$ だけが欠測し $Y_1$ は観測されたとする。$\mu_i$ を対象ごとの自由な固定効果として扱う場合、$Y_1$ が $\theta$ の推定に情報を与えない理由を説明せよ。
6. 一方、対象効果が存在せず $\mu_1=\cdots=\mu_n=\mu$ と仮定できるなら、なぜ $Y_1$ を捨てる必要がなくなるか説明せよ。

### 解答

#### 1. 差の分布

$$
D_i
=Y_i-X_i
=\theta+\varepsilon_{i2}-\varepsilon_{i1}.
$$

独立な正規誤差の差なので

$$
\boxed{
D_i\sim N(\theta,2\sigma^2)
}.
$$

ここで対象固有の $\mu_i$ が差を取ることで完全に消える。

#### 2. 二元配置加法モデルへの書き換え

$$
\overline\mu=\frac1n\sum_{i=1}^n\mu_i
$$

とする。

条件1では

$$
\nu+a_i+b_1=\mu_i,
$$

条件2では

$$
\nu+a_i+b_2=\mu_i+\theta.
$$

制約を使うと

$$
\boxed{
\nu=\overline\mu+\frac\theta2
}
$$

$$
\boxed{
 a_i=\mu_i-\overline\mu
}
$$

$$
\boxed{
 b_1=-\frac\theta2,
\qquad
 b_2=\frac\theta2
}.
$$

したがって $\theta=0$ は条件要因Bの効果がないことと同値である。

#### 3. 平方和とF検定

全平均

$$
\overline Z_{..}
=\frac1{2n}\sum_{i=1}^n\sum_{j=1}^2Z_{ij}
$$

対象平均

$$
\overline Z_{i.}
=\frac{Z_{i1}+Z_{i2}}2
$$

条件平均

$$
\overline Z_{.j}
=\frac1n\sum_{i=1}^nZ_{ij}
$$

とする。

平方和は

$$
SS_A
=2\sum_{i=1}^n
(\overline Z_{i.}-\overline Z_{..})^2,
$$

$$
SS_B
=n\sum_{j=1}^2
(\overline Z_{.j}-\overline Z_{..})^2,
$$

$$
SS_E
=\sum_{i=1}^n\sum_{j=1}^2
(Z_{ij}-\overline Z_{i.}-\overline Z_{.j}+\overline Z_{..})^2.
$$

自由度は

$$
\boxed{
\nu_A=n-1,
\qquad
\nu_B=1,
\qquad
\nu_E=n-1
}.
$$

$H_0:\theta=0$ は $b_1=b_2=0$ と同値なので

$$
\boxed{
F
=\frac{SS_B/1}{SS_E/(n-1)}
\sim F_{1,n-1}
\quad(H_0)
}.
$$

#### 4. 対応のある$t$検定との関係

差の平均を

$$
\overline D
=\frac1n\sum_iD_i
$$

とする。2条件しかないので条件要因Bの平方和は

$$
SS_B
=\frac n2\overline D^2.
$$

また残差平方和は

$$
SS_E
=\frac12\sum_{i=1}^n(D_i-\overline D)^2.
$$

したがって

$$
F
=\frac{n\overline D^2/2}
{\{\sum_i(D_i-\overline D)^2/2\}/(n-1)}
=\frac{n\overline D^2}{s_D^2}
$$

である。ただし

$$
s_D^2
=\frac1{n-1}\sum_i(D_i-\overline D)^2.
$$

対応のある$t$統計量

$$
t
=\frac{\overline D}{s_D/\sqrt n}
$$

より

$$
\boxed{F=t^2}.
$$

#### 5. $X_1$ が欠測した場合

対象1について観測されるのは

$$
Y_1=\mu_1+\theta+\varepsilon_{12}
$$

だけである。

$\mu_1$ を自由な固定効果として扱うと、$Y_1$ の平均は $\mu_1+\theta$ という和しか識別できない。$\theta$ を少し増やしても $\mu_1$ を同じだけ減らせば $Y_1$ の当てはまりは変わらない。

したがって対象1の単独観測 $Y_1$ だけからは $\theta$ を分離できず、$\theta$ の情報は完全なペア

$$
D_i=Y_i-X_i,
\qquad i=2,\ldots,n
$$

から得ることになる。

これは「欠測だから機械的に捨てる」のではなく、自由な対象効果があるため単独観測が目的母数 $\theta$ を識別しない、という理由である。

#### 6. 対象効果が共通なら話が変わる

もし

$$
\mu_i=\mu
$$

と仮定できるなら

$$
X_i\sim N(\mu,\sigma^2),
\qquad
Y_i\sim N(\mu+\theta,\sigma^2).
$$

このとき $\mu$ は全対象で共有されるため、他の $X_i,Y_i$ から $\mu$ を推定できる。したがって $Y_1$ も $\mu+\theta$ に関する追加情報となり、$\theta$ の推定に利用できる。

つまり

$$
\boxed{
\text{同じ欠測パターンでも、モデルの母数構造によって使える情報量が変わる}
}.
$$

### この問題から持ち帰ること

- 対応のある比較は「対象をブロック因子とする二元配置ANOVA」と同じ構造を持つ。
- 2条件なら条件効果のF検定は対応のある$t$検定の二乗になる。
- 欠測値の扱いは、単なるデータ処理ではなく「その観測だけで目的母数を識別できるか」で判断する。

---

## 最終チェック用まとめ

| 順位 | 最重要ワンポイント | できるようになりたいこと |
|---:|---|---|
| 1 | 回帰係数の推定量の分散がそのまま検出力へ効く | MLE→情報量→検定→検出力を一続きで処理する |
| 2 | 残差空間と当てはまり空間は直交する | 射影行列から$\chi^2$分解と予測誤差を導く |
| 3 | 多重共線性は分散、変数除外はバイアスを増やす | VIFと欠落変数バイアスをMSEで比較する |
| 4 | OLSは適当に選んだ式ではなく最小分散の重みを持つ | Cauchy–SchwarzからBLUEを直接示す |
| 5 | 対応データの差とANOVAは同じ情報を別表現している | $F=t^2$ と欠測時の識別可能性を説明する |

## 参照メモ

公開解説で出題テーマと構造を確認したページ:

- Academaid「2024年統計検定1級＜統計数理1＞」
- Academaid「2023年統計検定1級＜数理統計問4＞」
- Academaid「2015年統計検定1級＜統計数理3＞」
- Academaid「2016年統計検定1級＜統計数理3＞」
- Academaid「2022年統計検定1級＜数理統計問5＞」

実際の受験演習では、問題文の確認は統計検定公式問題集を優先する。本ファイルは公開されたテーマ・解説をもとに技法を反復するための独自演習であり、公式過去問の代替ではない。
