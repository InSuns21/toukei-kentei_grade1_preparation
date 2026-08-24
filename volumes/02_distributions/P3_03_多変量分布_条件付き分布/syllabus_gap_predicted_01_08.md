# 多変量分布・条件付き分布 シラバス補完予想問題 1〜8

このファイルは、統計検定1級の公式出題範囲、本リポジトリの `curriculum.yaml`・`chapter.yaml`・既存演習、および `multivariate_normal_past_exam_reconstructed_01_06.md` を照合し、既存6題だけでは演習密度が薄い論点を補うために作成した独自予想問題集である。

- 公式過去問の復元ではない。
- 問題文・数値・設問はすべて独自作成である。
- 数式・結論は独立に計算している。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。
- Level C は20〜30分で解く本番標準を意識している。
- `P3-03` の公式対応語である平均ベクトル、分散共分散行列、相関行列、多変量正規分布、線形変換、周辺分布、条件付き分布、独立性、相関係数、偏相関係数、二次形式を横断する。

## 追加根拠

既存の過去問型再構成6題では、条件付き正規分布、線形変換、独立な残差化、偏相関、Markov的な条件付き構造、相関係数を厚く扱っている。一方、シラバスと章の学習目標を突き合わせると、次の論点は独立した大問として追加する価値が高い。

1. 相関行列の正定値条件を固有値から判定する。
2. 精度行列から偏相関・条件付き独立を読む。
3. 二次形式を射影行列と結びつけてカイ二乗分布へ落とす。
4. 線形制約で条件付けたときに特異な条件付き正規分布が生じることを扱う。
5. 観測が線形結合やノイズ付き線形結合である場合の条件付き分布を処理する。
6. 切断・選択後の条件付きモーメントを、条件付き正規の回帰表示から計算する。
7. Cholesky型の逐次残差化と独立標準正規化を結びつける。
8. Mahalanobis二次形式を非心カイ二乗分布まで拡張する。

## 予想問題一覧

| 優先 | 安定ID | 主題 | 主な対応シラバス | Level | 目安時間 |
|---:|---|---|---|:---:|---:|
| 1 | `PRED-MVN-01-EQUICORR` | 等相関行列・正定値性・精度行列・偏相関 | 相関行列, 偏相関係数, 二次形式 | C | 30分 |
| 2 | `PRED-MVN-02-GAUSSIAN-BRIDGE` | 正規ベクトルを和で条件付ける | 条件付き分布, 線形変換, 独立性 | C | 25分 |
| 3 | `PRED-MVN-03-PROJECTION-QUAD` | 射影行列・二次形式・標本平均と標本分散 | 二次形式, 多変量正規分布, 独立性 | C | 30分 |
| 4 | `PRED-MVN-04-PRECISION-CHAIN` | 精度行列とGaussian条件付き独立 | 分散共分散行列, 偏相関係数, 条件付き分布 | C | 25分 |
| 5 | `PRED-MVN-05-TRUNCATED-SELECTION` | 2変量正規の切断・選択後モーメント | 条件付き分布, 相関係数 | B | 20分 |
| 6 | `PRED-MVN-06-NOISY-LINEAR-OBS` | ノイズ付き線形観測の条件付き正規 | 線形変換, 条件付き分布, 共分散行列 | C | 25分 |
| 7 | `PRED-MVN-07-SEQUENTIAL-RESIDUAL` | 逐次残差化・Cholesky型標準化 | 多変量正規分布, 独立性, 偏相関係数 | C | 25分 |
| 8 | `PRED-MVN-08-NONCENTRAL-QUAD` | 非心Mahalanobis二次形式 | 二次形式, 線形変換 | B | 20分 |

---

# 予想1: 等相関行列を固有値・精度行列・偏相関まで一気に処理する

- 安定ID: `PRED-MVN-01-EQUICORR`
- Level: C
- 目安時間: 30分
- 計算量: 多
- 主題: 相関行列、正定値性、固有値、精度行列、偏相関、Mahalanobis二次形式
- 使用技術: 固有空間分解、射影、逆行列、精度行列

## 問題

$p\ge3$ とし、$\boldsymbol 1=(1,\ldots,1)^T\in\mathbb R^p$ とする。対角成分が1、非対角成分がすべて $\rho$ の行列

$$
R=(1-\rho)I_p+\rho\boldsymbol1\boldsymbol1^T
$$

を考える。

1. $\boldsymbol1$ が $R$ の固有ベクトルであることを示し、その固有値を求めよ。また $\boldsymbol1^T\boldsymbol v=0$ を満たす任意の $\boldsymbol v$ に対する固有値を求めよ。
2. $R$ が正定値となる $\rho$ の範囲を求めよ。
3. 正定値の範囲で $R^{-1}$ を求めよ。
4. $\boldsymbol X\sim N_p(\boldsymbol0,R)$ とする。任意の異なる $i,j$ について、残りの $p-2$ 変数を与えた下での偏相関係数を求めよ。
5. $\bar x=p^{-1}\boldsymbol1^T\boldsymbol x$、$\boldsymbol u=\boldsymbol x-\bar x\boldsymbol1$ とする。$\boldsymbol x^TR^{-1}\boldsymbol x$ を $\bar x$ と $\|\boldsymbol u\|^2$ で表せ。

## 解答

### 方針

$\mathbb R^p$ を $\boldsymbol1$ の方向と、その直交補空間に分ける。この2空間では $R$ は単なるスカラー倍として作用するため、固有値、正定値条件、逆行列、二次形式が同時に処理できる。

### 1. 固有値

$$
\begin{aligned}
R\boldsymbol1
&=(1-\rho)\boldsymbol1+\rho\boldsymbol1\boldsymbol1^T\boldsymbol1\\
&=(1-\rho)\boldsymbol1+\rho p\boldsymbol1\\
&=\{1+(p-1)\rho\}\boldsymbol1.
\end{aligned}
$$

したがって $\boldsymbol1$ 方向の固有値は

$$
\lambda_1=1+(p-1)\rho.
$$

一方、$\boldsymbol1^T\boldsymbol v=0$ なら

$$
R\boldsymbol v=(1-\rho)\boldsymbol v.
$$

よって直交補空間では

$$
\lambda_2=1-\rho
$$

であり、重複度は $p-1$ である。

### 2. 正定値条件

対称行列が正定値であるための必要十分条件は全固有値が正であることだから

$$
1+(p-1)\rho>0,\qquad 1-\rho>0.
$$

したがって

$$
\boxed{-\frac1{p-1}<\rho<1}.
$$

### 3. 逆行列

$P=\boldsymbol1\boldsymbol1^T/p$ を $\boldsymbol1$ 方向への直交射影とすると

$$
R=\{1+(p-1)\rho\}P+(1-\rho)(I_p-P).
$$

よって

$$
R^{-1}=\frac{1}{1+(p-1)\rho}P+\frac{1}{1-\rho}(I_p-P).
$$

整理すると

$$
\boxed{
R^{-1}=\frac1{1-\rho}\left(I_p-\frac{\rho}{1+(p-1)\rho}\boldsymbol1\boldsymbol1^T\right)
}.
$$

### 4. 偏相関

精度行列 $K=R^{-1}$ に対して、多変量正規分布では

$$
\rho_{ij\cdot -ij}=-\frac{K_{ij}}{\sqrt{K_{ii}K_{jj}}}.
$$

上式から

$$
K_{ij}=-\frac{\rho}{(1-\rho)\{1+(p-1)\rho\}},\qquad i\ne j,
$$

$$
K_{ii}=\frac{1+(p-2)\rho}{(1-\rho)\{1+(p-1)\rho\}}.
$$

したがって

$$
\boxed{
\rho_{ij\cdot -ij}=\frac{\rho}{1+(p-2)\rho}
}.
$$

### 5. Mahalanobis二次形式

$\boldsymbol x=\bar x\boldsymbol1+\boldsymbol u$、$\boldsymbol1^T\boldsymbol u=0$ である。2つの直交固有空間に分ければ

$$
\boxed{
\boldsymbol x^TR^{-1}\boldsymbol x
=
\frac{p\bar x^2}{1+(p-1)\rho}
+
\frac{\|\boldsymbol u\|^2}{1-\rho}
}.
$$

### 検算

$\rho=0$ なら $R=I_p$ であり、右辺は $p\bar x^2+\|\boldsymbol u\|^2=\|\boldsymbol x\|^2$ となる。

### 本番答案

固有空間を $\operatorname{span}(\boldsymbol1)$ とその直交補に分解し、固有値 $1+(p-1)\rho$ と $1-\rho$ を得る。これから正定値範囲、逆行列、偏相関、二次形式を順に導けばよい。

### 採点基準

- 固有値と重複度: 4点
- 正定値範囲: 3点
- 逆行列: 5点
- 偏相関: 4点
- 二次形式分解: 4点

25分時点で4まで到達していれば合格圏。5は固有空間分解を書くだけでも部分点を狙う。

---

# 予想2: 独立正規標本を標本和で条件付ける

- 安定ID: `PRED-MVN-02-GAUSSIAN-BRIDGE`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 条件付き多変量正規、線形制約、特異共分散、独立な対比
- 使用技術: ブロック条件付け、射影行列、無相関と独立

## 問題

$$
X_1,\ldots,X_n\overset{\mathrm{iid}}\sim N(0,\sigma^2),\qquad \sigma^2>0
$$

とし

$$
S=\sum_{i=1}^nX_i
$$

とおく。

1. $S$ の分布と $\operatorname{Cov}(X_i,S)$ を求めよ。
2. $\boldsymbol X=(X_1,\ldots,X_n)^T$ として、$\boldsymbol X\mid(S=s)$ の条件付き平均ベクトルと条件付き共分散行列を求めよ。
3. $i\ne j$ に対する $\operatorname{Corr}(X_i,X_j\mid S=s)$ を求めよ。
4. 条件付き共分散行列が特異である理由を説明せよ。
5. $C=X_1-X_2$ の分布を求め、$C$ と $S$ が独立であることを示せ。さらに $C\mid(S=s)$ の分布を求めよ。

## 解答

### 1. 和の分布

独立正規分布の和だから

$$
\boxed{S\sim N(0,n\sigma^2)}.
$$

また

$$
\operatorname{Cov}(X_i,S)
=
\sum_{j=1}^n\operatorname{Cov}(X_i,X_j)
=\sigma^2.
$$

### 2. 条件付き分布

$$
E[\boldsymbol X]=\boldsymbol0,\qquad
\operatorname{Var}(\boldsymbol X)=\sigma^2I_n.
$$

さらに

$$
\operatorname{Cov}(\boldsymbol X,S)=\sigma^2\boldsymbol1,\qquad
\operatorname{Var}(S)=n\sigma^2.
$$

多変量正規の条件付き平均公式より

$$
E[\boldsymbol X\mid S=s]
=
\sigma^2\boldsymbol1(n\sigma^2)^{-1}s
=
\boxed{\frac{s}{n}\boldsymbol1}.
$$

条件付き共分散は

$$
\begin{aligned}
\operatorname{Var}(\boldsymbol X\mid S)
&=\sigma^2I_n-\sigma^2\boldsymbol1(n\sigma^2)^{-1}\sigma^2\boldsymbol1^T\\
&=\boxed{\sigma^2\left(I_n-\frac1n\boldsymbol1\boldsymbol1^T\right)}.
\end{aligned}
$$

したがって

$$
\boxed{
\boldsymbol X\mid(S=s)
\sim
N_n\left(\frac{s}{n}\boldsymbol1,
\sigma^2\left(I_n-\frac1n\boldsymbol1\boldsymbol1^T\right)
\right)
}
$$

ただし右辺は特異な多変量正規分布である。

### 3. 条件付き相関

対角成分は

$$
\sigma^2\left(1-\frac1n\right)=\sigma^2\frac{n-1}{n},
$$

非対角成分は

$$
-\frac{\sigma^2}{n}.
$$

よって

$$
\boxed{
\operatorname{Corr}(X_i,X_j\mid S=s)=-\frac1{n-1}
}.
$$

### 4. 特異性

条件付き共分散行列を $V$ とすると

$$
V\boldsymbol1
=
\sigma^2\left(I_n-\frac1n\boldsymbol1\boldsymbol1^T\right)\boldsymbol1
=\boldsymbol0.
$$

したがって $V$ は零固有値を持つ。これは条件 $S=s$ の下で

$$
\sum_{i=1}^nX_i=s
$$

が必ず成立し、確率ベクトルが $(n-1)$ 次元超平面上に拘束されることに対応する。

### 5. 対比と和

$$
C=X_1-X_2\sim N(0,2\sigma^2).
$$

また

$$
\operatorname{Cov}(C,S)
=
\operatorname{Cov}(X_1-X_2,S)
=\sigma^2-\sigma^2=0.
$$

$(C,S)$ は同時正規だから

$$
\boxed{C\perp S}.
$$

したがって条件付けても分布は変わらず

$$
\boxed{C\mid(S=s)\sim N(0,2\sigma^2)}.
$$

### 検算

条件付き相関が負になるのは、和を固定すると一つの成分が増えた分だけ他成分が減る必要があるためである。

### 採点基準

- 和と共分散: 3点
- 条件付き平均・共分散: 7点
- 条件付き相関: 4点
- 特異性の説明: 3点
- 対比の独立性: 3点

25分時点では2を確実に完答し、3と5を優先する。

---

# 予想3: 射影行列から標本平均・標本分散・t分布まで導く

- 安定ID: `PRED-MVN-03-PROJECTION-QUAD`
- Level: C
- 目安時間: 30分
- 計算量: 中
- 主題: 正規ベクトル、直交射影、二次形式、独立性
- 使用技術: 対称冪等行列、ランク、カイ二乗分布

## 問題

$$
X_1,\ldots,X_n\overset{\mathrm{iid}}\sim N(\mu,\sigma^2),\qquad n\ge2
$$

とし、$\boldsymbol X=(X_1,\ldots,X_n)^T$、$H=\boldsymbol1\boldsymbol1^T/n$ とする。標本分散は

$$
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X)^2
$$

とする。

1. $H$ と $I_n-H$ が対称冪等行列で、ランクがそれぞれ1、$n-1$ であることを示せ。
2. $\boldsymbol Z=(\boldsymbol X-\mu\boldsymbol1)/\sigma$ とする。$H\boldsymbol Z$ と $(I_n-H)\boldsymbol Z$ が独立であることを示せ。
3. $(n-1)S^2/\sigma^2$ の分布を求めよ。
4. $\bar X$ と $S^2$ が独立であることを示せ。
5. 上の結果を用いて

$$
T=\frac{\sqrt n(\bar X-\mu)}{S}
$$

の分布を求めよ。

## 解答

### 1. 射影行列

$$
H^T=H,
$$

また $\boldsymbol1^T\boldsymbol1=n$ だから

$$
H^2
=\frac1{n^2}\boldsymbol1\boldsymbol1^T\boldsymbol1\boldsymbol1^T
=\frac1n\boldsymbol1\boldsymbol1^T
=H.
$$

$H$ の像は $\operatorname{span}(\boldsymbol1)$ なので $\operatorname{rank}(H)=1$。したがって $I_n-H$ も対称冪等でランク $n-1$ である。

### 2. 射影成分の独立性

$\boldsymbol Z\sim N_n(\boldsymbol0,I_n)$ である。

$$
\begin{aligned}
\operatorname{Cov}(H\boldsymbol Z,(I_n-H)\boldsymbol Z)
&=H(I_n-H)^T\\
&=H(I_n-H)\\
&=H-H^2\\
&=O.
\end{aligned}
$$

両者は同時多変量正規なので

$$
\boxed{H\boldsymbol Z\perp(I_n-H)\boldsymbol Z}.
$$

### 3. 標本分散の分布

$$
\frac{(n-1)S^2}{\sigma^2}
=
\boldsymbol Z^T(I_n-H)\boldsymbol Z.
$$

$I_n-H$ は対称冪等でランク $n-1$ だから、直交変換で $n-1$ 個の標準正規の平方和にできる。よって

$$
\boxed{
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
}.
$$

### 4. 標本平均との独立性

$$
H\boldsymbol Z
=
\frac{\bar X-\mu}{\sigma}\boldsymbol1
$$

は $\bar X$ だけの関数であり、$S^2$ は $(I_n-H)\boldsymbol Z$ の関数である。2より

$$
\boxed{\bar X\perp S^2}.
$$

### 5. t分布

$$
Z_0=\frac{\sqrt n(\bar X-\mu)}{\sigma}\sim N(0,1),
$$

$$
V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$

かつ $Z_0\perp V$ である。したがって

$$
T
=
\frac{Z_0}{\sqrt{V/(n-1)}}
\sim
\boxed{t_{n-1}}.
$$

### 検算

平方和分解

$$
\|\boldsymbol X-\mu\boldsymbol1\|^2
=n(\bar X-\mu)^2+(n-1)S^2
$$

は、互いに直交する2つの射影成分のPythagoras分解そのものである。

### 採点基準

- 射影行列: 4点
- 独立性: 5点
- カイ二乗分布: 5点
- 平均と分散の独立: 3点
- t分布: 3点

25分を超えたら5は定義を用いた1行答案でまとめる。

---

# 予想4: 精度行列の0から条件付き独立を読む

- 安定ID: `PRED-MVN-04-PRECISION-CHAIN`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 精度行列、偏相関、条件付き独立、周辺相関
- 使用技術: 逆行列、Schur補、条件付き正規

## 問題

$\boldsymbol X=(X_1,X_2,X_3)^T$ が平均0の3変量正規分布に従い、その精度行列 $K=\Sigma^{-1}$ が

$$
K=
\begin{pmatrix}
2&-1&0\\
-1&2&-1\\
0&-1&2
\end{pmatrix}
$$

であるとする。

1. $K$ が正定値であることを確認せよ。
2. $\Sigma=K^{-1}$ を求めよ。
3. $X_1$ と $X_3$ の周辺相関係数を求めよ。
4. $X_2=x_2$ の下での $(X_1,X_3)^T$ の条件付き分布を求めよ。
5. $X_1$ と $X_3$ の、$X_2$ を与えた下での条件付き独立性を述べ、精度行列の成分との関係を説明せよ。

## 解答

### 1. 正定値性

先頭主座小行列式は

$$
2>0,\qquad
\begin{vmatrix}2&-1\\-1&2\end{vmatrix}=3>0,
$$

また

$$
\det K=4>0.
$$

Sylvesterの判定法より $K$ は正定値である。

### 2. 共分散行列

逆行列を計算すると

$$
\boxed{
\Sigma=
\begin{pmatrix}
3/4&1/2&1/4\\
1/2&1&1/2\\
1/4&1/2&3/4
\end{pmatrix}
}.
$$

### 3. 周辺相関

$$
\rho_{13}
=
\frac{1/4}{\sqrt{(3/4)(3/4)}}
=
\boxed{\frac13}.
$$

したがって $X_1$ と $X_3$ は周辺的には独立ではない。

### 4. $X_2$ で条件付ける

$$
\Sigma_{13,13}=
\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix},
\qquad
\Sigma_{13,2}=
\begin{pmatrix}1/2\\1/2\end{pmatrix},
\qquad
\Sigma_{22}=1.
$$

よって条件付き平均は

$$
\boxed{
E\left[
\begin{pmatrix}X_1\\X_3\end{pmatrix}
\middle|X_2=x_2
\right]
=
\begin{pmatrix}x_2/2\\x_2/2\end{pmatrix}
}.
$$

条件付き共分散は

$$
\begin{aligned}
&\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}
-
\begin{pmatrix}1/2\\1/2\end{pmatrix}
\begin{pmatrix}1/2&1/2\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}1/2&0\\0&1/2\end{pmatrix}
}.
\end{aligned}
$$

したがって

$$
\boxed{
(X_1,X_3)^T\mid(X_2=x_2)
\sim
N_2\left(
\begin{pmatrix}x_2/2\\x_2/2\end{pmatrix},
\frac12I_2
\right)
}.
$$

### 5. 条件付き独立

条件付き分布は2変量正規で、条件付き共分散が0だから

$$
\boxed{X_1\perp X_3\mid X_2}.
$$

また一般に多変量正規分布では

$$
K_{ij}=0
$$

は、残りの変数を与えた下で $X_i$ と $X_j$ が条件付き独立であることと同値である。この例では $K_{13}=0$ がその構造を表す。

### 検算

「周辺相関は $1/3$ だが、$X_2$ を固定すると独立」という点が核心である。

### 採点基準

- 正定値性: 3点
- 逆行列: 4点
- 周辺相関: 3点
- 条件付き分布: 7点
- 条件付き独立と精度行列: 3点

---

# 予想5: 2変量正規を半空間で切断した後の平均・分散・相関を求める

- 安定ID: `PRED-MVN-05-TRUNCATED-SELECTION`
- Level: B
- 目安時間: 20分
- 計算量: 中
- 主題: 2変量正規、条件付き表現、切断正規、条件付きモーメント
- 使用技術: 回帰表示、全分散、半正規分布

## 問題

$(X,Y)$ は平均0、分散1、相関係数 $\rho\in(-1,1)$ の2変量正規分布に従う。事象 $A=\{X>0\}$ を考える。

1. $Y$ を

$$
Y=\rho X+\sqrt{1-\rho^2}\,\varepsilon
$$

と表せることを説明せよ。ただし $\varepsilon\sim N(0,1)$ は $X$ と独立とする。
2. $E[X\mid A]$ と $\operatorname{Var}(X\mid A)$ を求めよ。
3. $E[Y\mid A]$ と $\operatorname{Var}(Y\mid A)$ を求めよ。
4. $\operatorname{Cov}(X,Y\mid A)$ と $\operatorname{Corr}(X,Y\mid A)$ を求めよ。

## 解答

### 1. 回帰表示

2変量正規の条件付き分布より

$$
Y\mid X=x\sim N(\rho x,1-\rho^2).
$$

したがって独立な標準正規 $\varepsilon$ を用いて

$$
\boxed{Y=\rho X+\sqrt{1-\rho^2}\,\varepsilon}
$$

と表せる。

### 2. $X>0$ でのモーメント

標準正規密度を $\phi$ とすると

$$
E[X\mid X>0]
=2\int_0^\infty x\phi(x)\,dx
=2\phi(0)
=\boxed{\sqrt{\frac2\pi}}.
$$

対称性より

$$
E[X^2\mid X>0]=E[X^2]=1.
$$

したがって

$$
\boxed{
\operatorname{Var}(X\mid A)=1-\frac2\pi
}.
$$

### 3. $Y$ の条件付き平均・分散

$\varepsilon$ は $A$ と独立だから

$$
E[Y\mid A]
=\rho E[X\mid A]
=
\boxed{\rho\sqrt{\frac2\pi}}.
$$

また

$$
\begin{aligned}
\operatorname{Var}(Y\mid A)
&=\rho^2\operatorname{Var}(X\mid A)+(1-\rho^2)\\
&=\rho^2\left(1-\frac2\pi\right)+1-\rho^2\\
&=\boxed{1-\frac{2\rho^2}{\pi}}.
\end{aligned}
$$

### 4. 条件付き共分散・相関

$$
\begin{aligned}
\operatorname{Cov}(X,Y\mid A)
&=\operatorname{Cov}\left(X,\rho X+\sqrt{1-\rho^2}\varepsilon\mid A\right)\\
&=\rho\operatorname{Var}(X\mid A)\\
&=\boxed{\rho\left(1-\frac2\pi\right)}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Corr}(X,Y\mid A)
=
\frac{\rho\sqrt{1-2/\pi}}{\sqrt{1-2\rho^2/\pi}}
}.
$$

$|\rho|<1$ では選択後の相関の絶対値は $|\rho|$ より小さい。

### 検算

$\rho=0$ なら $Y$ は $X$ と独立なので、$X>0$ で選択しても $E[Y\mid A]=0$、$\operatorname{Var}(Y\mid A)=1$ である。

### 採点基準

- 回帰表示: 3点
- 半正規モーメント: 6点
- $Y$ の平均・分散: 6点
- 共分散・相関: 5点

---

# 予想6: ノイズ付き線形観測から条件付き正規分布を更新する

- 安定ID: `PRED-MVN-06-NOISY-LINEAR-OBS`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 線形観測、条件付き多変量正規、Schur補
- 使用技術: 共分散計算、条件付き正規公式

## 問題

$\boldsymbol X\sim N_p(\boldsymbol\mu,\Sigma)$ とし、$\Sigma$ は正定値とする。$\boldsymbol a\in\mathbb R^p$ は既知の非零ベクトル、$\varepsilon\sim N(0,\tau^2)$ は $\boldsymbol X$ と独立で、$\tau^2>0$ とする。

$$
Y=\boldsymbol a^T\boldsymbol X+\varepsilon
$$

を観測する。

1. $(\boldsymbol X,Y)$ の平均と共分散行列を求めよ。
2. $\boldsymbol X\mid(Y=y)$ の条件付き平均と条件付き共分散を求めよ。
3. $\tau^2\to\infty$ としたときの条件付き平均・共分散の極限を説明せよ。
4. $\tau^2\downarrow0$ としたとき何が起こるか説明せよ。
5. $p=2$、$\boldsymbol\mu=\boldsymbol0$、

$$
\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix},\qquad
\boldsymbol a=\begin{pmatrix}1\\1\end{pmatrix},\qquad
\tau^2=2,
$$

で $Y=3$ を観測したときの条件付き分布を求めよ。

## 解答

### 1. 結合分布

$$
E[Y]=\boldsymbol a^T\boldsymbol\mu,
$$

$$
\operatorname{Var}(Y)=\boldsymbol a^T\Sigma\boldsymbol a+\tau^2,
$$

$$
\operatorname{Cov}(\boldsymbol X,Y)=\Sigma\boldsymbol a.
$$

よって

$$
\boxed{
\begin{pmatrix}\boldsymbol X\\Y\end{pmatrix}
\sim
N_{p+1}\left(
\begin{pmatrix}\boldsymbol\mu\\\boldsymbol a^T\boldsymbol\mu\end{pmatrix},
\begin{pmatrix}
\Sigma&\Sigma\boldsymbol a\\
\boldsymbol a^T\Sigma&\boldsymbol a^T\Sigma\boldsymbol a+\tau^2
\end{pmatrix}
\right)
}.
$$

### 2. 条件付き分布

条件付き平均は

$$
\boxed{
E[\boldsymbol X\mid Y=y]
=
\boldsymbol\mu+
\frac{\Sigma\boldsymbol a}{\boldsymbol a^T\Sigma\boldsymbol a+\tau^2}
\left(y-\boldsymbol a^T\boldsymbol\mu\right)
}.
$$

条件付き共分散は

$$
\boxed{
\operatorname{Var}(\boldsymbol X\mid Y)
=
\Sigma-
\frac{\Sigma\boldsymbol a\boldsymbol a^T\Sigma}
{\boldsymbol a^T\Sigma\boldsymbol a+\tau^2}
}.
$$

### 3. 観測ノイズが非常に大きい場合

$\tau^2\to\infty$ では補正係数が0へ行くので

$$
E[\boldsymbol X\mid Y=y]\to\boldsymbol\mu,
$$

$$
\operatorname{Var}(\boldsymbol X\mid Y)\to\Sigma.
$$

すなわち非常にノイジーな観測はほとんど情報を与えない。

### 4. ノイズが0へ近づく場合

$\tau^2\downarrow0$ では $Y=\boldsymbol a^T\boldsymbol X$ という正確な線形制約を観測する場合へ近づく。条件付き共分散は $\boldsymbol a$ 方向の1自由度を失い、特異になる。

### 5. 数値例

$$
\Sigma\boldsymbol a=
\begin{pmatrix}3\\3\end{pmatrix},
\qquad
\boldsymbol a^T\Sigma\boldsymbol a=6,
\qquad
\operatorname{Var}(Y)=8.
$$

したがって条件付き平均は

$$
\boxed{
E[\boldsymbol X\mid Y=3]
=
\frac38\begin{pmatrix}3\\3\end{pmatrix}
=
\begin{pmatrix}9/8\\9/8\end{pmatrix}
}.
$$

条件付き共分散は

$$
\begin{aligned}
\Sigma-rac18
\begin{pmatrix}3\\3\end{pmatrix}
\begin{pmatrix}3&3\end{pmatrix}
&=
\begin{pmatrix}2&1\\1&2\end{pmatrix}
-
\frac18
\begin{pmatrix}9&9\\9&9\end{pmatrix}\\
&=\boxed{
\begin{pmatrix}7/8&-1/8\\-1/8&7/8\end{pmatrix}
}.
\end{aligned}
$$

### 検算

条件付き共分散は観測値 $y$ に依存しない。これは多変量正規分布の重要な特徴である。

### 採点基準

- 結合分布: 4点
- 一般条件付き公式: 8点
- 2つの極限: 4点
- 数値例: 4点

---

# 予想7: 逐次残差化で3変量正規を独立標準正規へ変換する

- 安定ID: `PRED-MVN-07-SEQUENTIAL-RESIDUAL`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 相関行列、条件付き独立、逐次残差化、Cholesky型変換
- 使用技術: 条件付き正規、残差、無相関と独立

## 問題

$(X_1,X_2,X_3)$ は平均0、各分散1の3変量正規分布に従い、相関行列が

$$
R=
\begin{pmatrix}
1&1/2&1/2\\
1/2&1&1/4\\
1/2&1/4&1
\end{pmatrix}
$$

であるとする。

1. $X_2\mid X_1=x_1$ と $X_3\mid X_1=x_1$ の分布を求めよ。
2. $X_1$ を与えた下での $X_2,X_3$ の条件付き共分散を求めよ。
3. 次を定義する。

$$
Z_1=X_1,
$$

$$
Z_2=\frac{2X_2-X_1}{\sqrt3},
\qquad
Z_3=\frac{2X_3-X_1}{\sqrt3}.
$$

各 $Z_i$ の平均と分散を求めよ。
4. $(Z_1,Z_2,Z_3)$ が互いに独立な標準正規分布に従うことを示せ。
5. $\det R$ を求め、逐次条件付き分散との関係を説明せよ。

## 解答

### 1. 条件付き分布

二変量正規の公式より

$$
\boxed{X_2\mid X_1=x_1\sim N\left(\frac{x_1}{2},\frac34\right)},
$$

$$
\boxed{X_3\mid X_1=x_1\sim N\left(\frac{x_1}{2},\frac34\right)}.
$$

### 2. 条件付き共分散

$$
\begin{aligned}
\operatorname{Cov}(X_2,X_3\mid X_1)
&=\operatorname{Cov}(X_2,X_3)
-\operatorname{Cov}(X_2,X_1)\operatorname{Var}(X_1)^{-1}\operatorname{Cov}(X_1,X_3)\\
&=\frac14-\frac12\cdot\frac12\\
&=\boxed{0}.
\end{aligned}
$$

条件付き分布は2変量正規なので

$$
X_2\perp X_3\mid X_1.
$$

### 3. 残差の標準化

$$
Z_2=\frac{X_2-X_1/2}{\sqrt{3/4}},
$$

だから

$$
E[Z_2]=0,\qquad \operatorname{Var}(Z_2)=1.
$$

同様に $Z_3$ も平均0、分散1で、$Z_1=X_1$ も標準正規である。

### 4. 独立性

まず

$$
\operatorname{Cov}(Z_1,Z_2)
=\frac{2\operatorname{Cov}(X_1,X_2)-\operatorname{Var}(X_1)}{\sqrt3}
=0.
$$

同様に $\operatorname{Cov}(Z_1,Z_3)=0$。

さらに

$$
\begin{aligned}
\operatorname{Cov}(Z_2,Z_3)
&=\frac13\operatorname{Cov}(2X_2-X_1,2X_3-X_1)\\
&=\frac13\left(4\cdot\frac14-2\cdot\frac12-2\cdot\frac12+1\right)\\
&=0.
\end{aligned}
$$

$(Z_1,Z_2,Z_3)$ は $X$ の線形変換なので同時多変量正規である。したがって無相関から独立が従い

$$
\boxed{Z_1,Z_2,Z_3\overset{\mathrm{ind}}\sim N(0,1)}.
$$

### 5. 行列式

直接計算してもよいが、逐次残差分散を使えば

$$
\det R
=
\operatorname{Var}(X_1)
\operatorname{Var}(X_2\mid X_1)
\operatorname{Var}(X_3\mid X_1,X_2).
$$

この例では $X_2\perp X_3\mid X_1$ だから

$$
\operatorname{Var}(X_3\mid X_1,X_2)
=\operatorname{Var}(X_3\mid X_1)
=\frac34.
$$

よって

$$
\boxed{\det R=1\cdot\frac34\cdot\frac34=\frac9{16}}.
$$

### 検算

変換後に独立標準正規になることは、元の相関行列をCholesky型に分解していることと同値である。

### 採点基準

- 条件付き分布: 4点
- 条件付き独立: 4点
- 標準化: 4点
- 独立性: 5点
- 行列式: 3点

---

# 予想8: Mahalanobis二次形式を非心カイ二乗まで拡張する

- 安定ID: `PRED-MVN-08-NONCENTRAL-QUAD`
- Level: B
- 目安時間: 20分
- 計算量: 中
- 主題: 多変量正規、白色化、二次形式、非心カイ二乗
- 使用技術: 線形変換、モーメント母関数

## 問題

$\boldsymbol X\sim N_p(\boldsymbol\mu,\Sigma)$ とし、$\Sigma$ は正定値とする。固定ベクトル $\boldsymbol m\in\mathbb R^p$ に対し

$$
Q=(\boldsymbol X-\boldsymbol m)^T\Sigma^{-1}(\boldsymbol X-\boldsymbol m)
$$

とおく。

1. $L L^T=\Sigma$ を満たす可逆行列 $L$ を取り、$\boldsymbol Z=L^{-1}(\boldsymbol X-\boldsymbol m)$ の分布を求めよ。
2. $Q=\boldsymbol Z^T\boldsymbol Z$ を示せ。
3. 

$$
\lambda=(\boldsymbol\mu-\boldsymbol m)^T\Sigma^{-1}(\boldsymbol\mu-\boldsymbol m)
$$

とおく。$Q$ が自由度 $p$、非心度 $\lambda$ の非心カイ二乗分布に従うことを説明せよ。
4. $Q$ のモーメント母関数

$$
M_Q(t)=(1-2t)^{-p/2}\exp\left(\frac{\lambda t}{1-2t}\right),\qquad t<1/2
$$

を用いて $E[Q]$ と $\operatorname{Var}(Q)$ を求めよ。
5. $\boldsymbol m=\boldsymbol\mu$ の場合を説明せよ。

## 解答

### 1. 白色化

$$
\boldsymbol Z=L^{-1}(\boldsymbol X-\boldsymbol m)
$$

だから

$$
E[\boldsymbol Z]=L^{-1}(\boldsymbol\mu-\boldsymbol m)=\boldsymbol\delta,
$$

$$
\operatorname{Var}(\boldsymbol Z)
=L^{-1}\Sigma(L^{-1})^T
=I_p.
$$

よって

$$
\boxed{\boldsymbol Z\sim N_p(\boldsymbol\delta,I_p)}.
$$

### 2. 二次形式

$\Sigma^{-1}=(L^{-1})^TL^{-1}$ なので

$$
\begin{aligned}
Q
&=(\boldsymbol X-\boldsymbol m)^T(L^{-1})^TL^{-1}(\boldsymbol X-\boldsymbol m)\\
&=\boldsymbol Z^T\boldsymbol Z.
\end{aligned}
$$

### 3. 非心カイ二乗

$\boldsymbol Z$ の成分は独立で

$$
Z_i\sim N(\delta_i,1).
$$

したがって

$$
Q=\sum_{i=1}^pZ_i^2
$$

は自由度 $p$、非心度

$$
\sum_{i=1}^p\delta_i^2
=\boldsymbol\delta^T\boldsymbol\delta
=\lambda
$$

の非心カイ二乗分布に従う。

### 4. 平均と分散

対数モーメント母関数を

$$
K(t)=\log M_Q(t)
=-\frac p2\log(1-2t)+\frac{\lambda t}{1-2t}
$$

とする。

$$
K'(0)=p+\lambda,
$$

$$
K''(0)=2p+4\lambda.
$$

したがって

$$
\boxed{E[Q]=p+\lambda},
$$

$$
\boxed{\operatorname{Var}(Q)=2(p+2\lambda)}.
$$

### 5. 中心の場合

$\boldsymbol m=\boldsymbol\mu$ なら $\lambda=0$ であり

$$
\boxed{Q\sim\chi_p^2}.
$$

これは通常のMahalanobis二次形式の結果を回収している。

### 検算

$\lambda=0$ なら平均 $p$、分散 $2p$ となり、中心カイ二乗分布の既知結果と一致する。

### 採点基準

- 白色化: 4点
- 二次形式: 3点
- 非心度の同定: 5点
- 平均・分散: 5点
- 中心の場合: 3点

---

# 学習順の推奨

まず `PRED-MVN-01`、`02`、`03`、`04` を優先する。この4題で、相関行列、条件付き正規、精度行列、二次形式というP3-03の中核をほぼ一巡できる。

次に `06` と `07` で、単なる公式代入から「観測モデル」「逐次残差化」へ進む。`05` はP3-05の切断分布への橋渡し、`08` はS1-01や検出力・線形モデルの非心分布への橋渡しとして使う。

## 既存6題との役割分担

- 2021問5型: 一般の線形変換と独立残差化。
- 2012問5型: ブロック条件付き分布と偏相関。
- 2018問4型: 条件付き正規とMarkov的遷移。
- 2013問2型: 正規和・条件付き分布。
- 2015問5型: 相関係数と二値化・切断正規。
- 2017問4型: 線形変換・条件付き正規の基本確認。
- 本ファイル: 相関行列のスペクトル、精度行列、射影二次形式、線形制約、ノイズ付き観測、逐次残差化、非心二次形式を補う。
