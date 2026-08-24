# 多変量分布・条件付き分布 シラバス補完予想問題 1〜8

このファイルは、統計検定1級の公式出題範囲、本リポジトリの `curriculum.yaml`・`chapter.yaml`・既存演習、および `multivariate_normal_past_exam_reconstructed_01_06.md` を照合し、既存6題だけでは演習密度が薄い論点を補うために作成した独自予想問題集である。

- 公式過去問の復元ではない。
- 問題文・数値・設問はすべて独自作成である。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。
- Level C は20〜30分で解く本番標準を意識する。
- `P3-03` の公式対応語である平均ベクトル、分散共分散行列、相関行列、多変量正規分布、線形変換、周辺分布、条件付き分布、独立性、相関係数、偏相関係数、二次形式を横断する。

## 追加根拠

既存の過去問型再構成6題では、条件付き正規分布、線形変換、独立な残差化、偏相関、Markov的な条件付き構造、相関係数を厚く扱っている。一方、シラバスと章の学習目標を突き合わせると、次の論点は独立した大問として追加する価値が高い。

1. 相関行列の正定値条件を固有値から判定する。
2. 精度行列から偏相関・条件付き独立を読む。
3. 二次形式を射影行列と結びつけてカイ二乗分布へ落とす。
4. 線形制約で条件付けたときの特異な条件付き正規分布を扱う。
5. ノイズ付き線形観測の条件付き分布を処理する。
6. 切断・選択後の条件付きモーメントを計算する。
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

1. $\boldsymbol1$ 方向と $\boldsymbol1$ の直交補空間における $R$ の固有値を求めよ。
2. $R$ が正定値となる $\rho$ の範囲を求めよ。
3. 正定値の範囲で $R^{-1}$ を求めよ。
4. $\boldsymbol X\sim N_p(\boldsymbol0,R)$ とする。任意の異なる $i,j$ について、残りの $p-2$ 変数を与えた下での偏相関係数を求めよ。
5. $\bar x=p^{-1}\boldsymbol1^T\boldsymbol x$、$\boldsymbol u=\boldsymbol x-\bar x\boldsymbol1$ として、$\boldsymbol x^TR^{-1}\boldsymbol x$ を $\bar x$ と $\|\boldsymbol u\|^2$ で表せ。

## 解答

$\boldsymbol1^T\boldsymbol1=p$ より

$$
R\boldsymbol1=\{1+(p-1)\rho\}\boldsymbol1.
$$

一方、$\boldsymbol1^T\boldsymbol v=0$ なら

$$
R\boldsymbol v=(1-\rho)\boldsymbol v.
$$

したがって固有値は

$$
\lambda_1=1+(p-1)\rho,
\qquad
\lambda_2=1-\rho
$$

であり、$\lambda_2$ の重複度は $p-1$ である。よって正定値条件は

$$
\boxed{-\frac1{p-1}<\rho<1}.
$$

$P=\boldsymbol1\boldsymbol1^T/p$ とすると

$$
R=\{1+(p-1)\rho\}P+(1-\rho)(I_p-P),
$$

だから

$$
\boxed{
R^{-1}=\frac1{1-\rho}
\left(
I_p-\frac{\rho}{1+(p-1)\rho}\boldsymbol1\boldsymbol1^T
\right)
}.
$$

精度行列を $K=R^{-1}$ とすると

$$
K_{ij}=-\frac{\rho}{(1-\rho)\{1+(p-1)\rho\}},
$$

$$
K_{ii}=\frac{1+(p-2)\rho}{(1-\rho)\{1+(p-1)\rho\}}.
$$

多変量正規では

$$
\rho_{ij\cdot -ij}
=-\frac{K_{ij}}{\sqrt{K_{ii}K_{jj}}},
$$

よって

$$
\boxed{
\rho_{ij\cdot -ij}=\frac{\rho}{1+(p-2)\rho}
}.
$$

さらに $\boldsymbol x=\bar x\boldsymbol1+\boldsymbol u$、$\boldsymbol1^T\boldsymbol u=0$ なので

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

$\rho=0$ なら $R=I_p$ となり、右辺は $\|\boldsymbol x\|^2$ に戻る。

### 採点基準

固有値4点、正定値範囲3点、逆行列5点、偏相関4点、二次形式4点。25分時点で4まで終われば十分。

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
X_1,\ldots,X_n\overset{\mathrm{iid}}\sim N(0,\sigma^2),
\qquad
S=\sum_{i=1}^nX_i.
$$

1. $S$ の分布と $\operatorname{Cov}(X_i,S)$ を求めよ。
2. $\boldsymbol X=(X_1,\ldots,X_n)^T$ として、$\boldsymbol X\mid(S=s)$ の条件付き平均と共分散を求めよ。
3. $i\ne j$ に対する $\operatorname{Corr}(X_i,X_j\mid S=s)$ を求めよ。
4. 条件付き共分散が特異である理由を説明せよ。
5. $C=X_1-X_2$ と $S$ が独立であることを示し、$C\mid(S=s)$ の分布を求めよ。

## 解答

$$
\boxed{S\sim N(0,n\sigma^2)},
\qquad
\operatorname{Cov}(X_i,S)=\sigma^2.
$$

また

$$
\operatorname{Cov}(\boldsymbol X,S)=\sigma^2\boldsymbol1,
\qquad
\operatorname{Var}(S)=n\sigma^2.
$$

したがって

$$
\boxed{
E[\boldsymbol X\mid S=s]=\frac{s}{n}\boldsymbol1
},
$$

$$
\boxed{
\operatorname{Var}(\boldsymbol X\mid S)
=
\sigma^2\left(I_n-\frac1n\boldsymbol1\boldsymbol1^T\right)
}.
$$

対角成分は $\sigma^2(n-1)/n$、非対角成分は $-\sigma^2/n$ なので

$$
\boxed{
\operatorname{Corr}(X_i,X_j\mid S=s)=-\frac1{n-1}
}.
$$

条件付き共分散行列 $V$ は

$$
V\boldsymbol1=\boldsymbol0
$$

を満たすため特異である。これは条件付きで $\sum_iX_i=s$ が必ず成立し、ベクトルが超平面上に拘束されることに対応する。

さらに

$$
C=X_1-X_2\sim N(0,2\sigma^2),
$$

$$
\operatorname{Cov}(C,S)=\sigma^2-\sigma^2=0.
$$

$(C,S)$ は同時正規だから独立であり

$$
\boxed{C\mid(S=s)\sim N(0,2\sigma^2)}.
$$

### 採点基準

和3点、条件付き平均・共分散7点、条件付き相関4点、特異性3点、対比の独立性3点。

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
X_1,\ldots,X_n\overset{\mathrm{iid}}\sim N(\mu,\sigma^2),
\qquad
H=\frac1n\boldsymbol1\boldsymbol1^T.
$$

標本分散を

$$
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X)^2
$$

とする。

1. $H$ と $I_n-H$ が対称冪等行列で、ランクが1と $n-1$ であることを示せ。
2. $\boldsymbol Z=(\boldsymbol X-\mu\boldsymbol1)/\sigma$ として、$H\boldsymbol Z$ と $(I_n-H)\boldsymbol Z$ が独立であることを示せ。
3. $(n-1)S^2/\sigma^2$ の分布を求めよ。
4. $\bar X$ と $S^2$ が独立であることを示せ。
5. $T=\sqrt n(\bar X-\mu)/S$ の分布を求めよ。

## 解答

$$
H^T=H,
\qquad
H^2=H,
$$

で、像は $\operatorname{span}(\boldsymbol1)$ だから $\operatorname{rank}(H)=1$。したがって $I_n-H$ はランク $n-1$ の直交射影である。

$\boldsymbol Z\sim N_n(\boldsymbol0,I_n)$ かつ

$$
\operatorname{Cov}(H\boldsymbol Z,(I_n-H)\boldsymbol Z)
=H(I_n-H)=O.
$$

同時多変量正規なので

$$
\boxed{H\boldsymbol Z\perp(I_n-H)\boldsymbol Z}.
$$

また

$$
\frac{(n-1)S^2}{\sigma^2}
=
\boldsymbol Z^T(I_n-H)\boldsymbol Z.
$$

$I_n-H$ はランク $n-1$ の対称冪等行列だから

$$
\boxed{
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
}.
$$

$H\boldsymbol Z$ は $\bar X$ だけの関数、$(I_n-H)\boldsymbol Z$ は $S^2$ を決めるので

$$
\boxed{\bar X\perp S^2}.
$$

さらに

$$
Z_0=\frac{\sqrt n(\bar X-\mu)}{\sigma}\sim N(0,1),
$$

$$
V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
\qquad
Z_0\perp V.
$$

したがって

$$
\boxed{
T=\frac{Z_0}{\sqrt{V/(n-1)}}\sim t_{n-1}
}.
$$

### 採点基準

射影4点、独立性5点、カイ二乗5点、平均と分散の独立3点、t分布3点。

---

# 予想4: 精度行列の0から条件付き独立を読む

- 安定ID: `PRED-MVN-04-PRECISION-CHAIN`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 精度行列、偏相関、条件付き独立、周辺相関
- 使用技術: 逆行列、Schur補、条件付き正規

## 問題

$\boldsymbol X=(X_1,X_2,X_3)^T$ が平均0の3変量正規分布に従い

$$
K=\Sigma^{-1}
=
\begin{pmatrix}
2&-1&0\\
-1&2&-1\\
0&-1&2
\end{pmatrix}
$$

とする。

1. $K$ が正定値であることを確認せよ。
2. $\Sigma$ を求めよ。
3. $X_1$ と $X_3$ の周辺相関を求めよ。
4. $X_2=x_2$ の下での $(X_1,X_3)^T$ の条件付き分布を求めよ。
5. $X_1$ と $X_3$ の条件付き独立性と $K_{13}$ の関係を説明せよ。

## 解答

先頭主座小行列式は

$$
2,\quad 3,\quad 4
$$

で全て正だから $K$ は正定値である。逆行列は

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

したがって

$$
\boxed{
\rho_{13}=\frac{1/4}{3/4}=\frac13
}.
$$

一方、条件付き平均は

$$
\boxed{
E\left[
\begin{pmatrix}X_1\\X_3\end{pmatrix}
\middle|X_2=x_2
\right]
=
\begin{pmatrix}x_2/2\\x_2/2\end{pmatrix}
},
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

よって

$$
\boxed{X_1\perp X_3\mid X_2}.
$$

多変量正規では、精度行列の非対角成分 $K_{ij}=0$ と、残りの変数を与えた下での $X_i,X_j$ の条件付き独立が同値である。この例では $K_{13}=0$ がそれを表す。

### 採点基準

正定値3点、逆行列4点、周辺相関3点、条件付き分布7点、精度行列との関係3点。

---

# 予想5: 2変量正規を半空間で切断した後のモーメントを求める

- 安定ID: `PRED-MVN-05-TRUNCATED-SELECTION`
- Level: B
- 目安時間: 20分
- 計算量: 中
- 主題: 2変量正規、切断正規、条件付きモーメント
- 使用技術: 回帰表示、全分散、半正規分布

## 問題

$(X,Y)$ は平均0、分散1、相関係数 $\rho\in(-1,1)$ の2変量正規分布に従う。$A=\{X>0\}$ とする。

1. $Y=\rho X+\sqrt{1-\rho^2}\,\varepsilon$ と表せることを説明せよ。ただし $\varepsilon\sim N(0,1)$ は $X$ と独立とする。
2. $E[X\mid A]$ と $\operatorname{Var}(X\mid A)$ を求めよ。
3. $E[Y\mid A]$ と $\operatorname{Var}(Y\mid A)$ を求めよ。
4. $\operatorname{Cov}(X,Y\mid A)$ と $\operatorname{Corr}(X,Y\mid A)$ を求めよ。

## 解答

2変量正規の条件付き分布より

$$
Y\mid X=x\sim N(\rho x,1-\rho^2),
$$

したがって

$$
Y=\rho X+\sqrt{1-\rho^2}\,\varepsilon
$$

と表せる。

標準正規密度を $\phi$ とすると

$$
E[X\mid X>0]
=2\int_0^\infty x\phi(x)\,dx
=2\phi(0)
=\boxed{\sqrt{\frac2\pi}}.
$$

また対称性より $E[X^2\mid X>0]=1$ だから

$$
\boxed{
\operatorname{Var}(X\mid A)=1-\frac2\pi
}.
$$

よって

$$
\boxed{
E[Y\mid A]=\rho\sqrt{\frac2\pi}
},
$$

$$
\boxed{
\operatorname{Var}(Y\mid A)=1-\frac{2\rho^2}{\pi}
}.
$$

さらに

$$
\boxed{
\operatorname{Cov}(X,Y\mid A)
=\rho\left(1-\frac2\pi\right)
},
$$

$$
\boxed{
\operatorname{Corr}(X,Y\mid A)
=
\frac{\rho\sqrt{1-2/\pi}}
{\sqrt{1-2\rho^2/\pi}}
}.
$$

$|\rho|<1$ では切断後の相関の絶対値は元の $|\rho|$ より小さい。

### 採点基準

回帰表示3点、半正規モーメント6点、$Y$ の平均・分散6点、条件付き共分散・相関5点。

---

# 予想6: ノイズ付き線形観測から条件付き正規分布を更新する

- 安定ID: `PRED-MVN-06-NOISY-LINEAR-OBS`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 線形観測、条件付き多変量正規、Schur補
- 使用技術: 共分散計算、条件付き正規公式

## 問題

$\boldsymbol X\sim N_p(\boldsymbol\mu,\Sigma)$ とし、$\Sigma$ は正定値とする。$\boldsymbol a\ne\boldsymbol0$、$\varepsilon\sim N(0,\tau^2)$ は $\boldsymbol X$ と独立で、$\tau^2>0$ とする。

$$
Y=\boldsymbol a^T\boldsymbol X+\varepsilon.
$$

1. $(\boldsymbol X,Y)$ の平均と共分散を求めよ。
2. $\boldsymbol X\mid(Y=y)$ の条件付き平均と共分散を求めよ。
3. $\tau^2\to\infty$ と $\tau^2\downarrow0$ の極限を解釈せよ。
4. $p=2$、$\boldsymbol\mu=\boldsymbol0$、

$$
\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad
\boldsymbol a=\begin{pmatrix}1\\1\end{pmatrix},
\qquad
\tau^2=2
$$

で $Y=3$ を観測したときの条件付き分布を求めよ。

## 解答

$$
E[Y]=\boldsymbol a^T\boldsymbol\mu,
$$

$$
\operatorname{Var}(Y)=\boldsymbol a^T\Sigma\boldsymbol a+\tau^2,
$$

$$
\operatorname{Cov}(\boldsymbol X,Y)=\Sigma\boldsymbol a.
$$

したがって

$$
\boxed{
E[\boldsymbol X\mid Y=y]
=
\boldsymbol\mu+
\frac{\Sigma\boldsymbol a}
{\boldsymbol a^T\Sigma\boldsymbol a+\tau^2}
\left(y-\boldsymbol a^T\boldsymbol\mu\right)
},
$$

$$
\boxed{
\operatorname{Var}(\boldsymbol X\mid Y)
=
\Sigma-
\frac{\Sigma\boldsymbol a\boldsymbol a^T\Sigma}
{\boldsymbol a^T\Sigma\boldsymbol a+\tau^2}
}.
$$

$\tau^2\to\infty$ では条件付き平均は $\boldsymbol\mu$、条件付き共分散は $\Sigma$ に戻る。観測がほぼ無情報になるためである。

$\tau^2\downarrow0$ では正確な線形制約 $Y=\boldsymbol a^T\boldsymbol X$ を観測する場合へ近づき、条件付き共分散は1方向の自由度を失って特異になる。

数値例では

$$
\Sigma\boldsymbol a=
\begin{pmatrix}3\\3\end{pmatrix},
\qquad
\boldsymbol a^T\Sigma\boldsymbol a=6,
\qquad
\operatorname{Var}(Y)=8.
$$

よって

$$
\boxed{
E[\boldsymbol X\mid Y=3]
=
\begin{pmatrix}9/8\\9/8\end{pmatrix}
}.
$$

また

$$
\begin{aligned}
\operatorname{Var}(\boldsymbol X\mid Y)
&=
\begin{pmatrix}2&1\\1&2\end{pmatrix}
-
\frac18
\begin{pmatrix}3\\3\end{pmatrix}
\begin{pmatrix}3&3\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}7/8&-1/8\\-1/8&7/8\end{pmatrix}
}.
\end{aligned}
$$

### 採点基準

結合モーメント4点、一般条件付き公式8点、極限4点、数値例4点。

---

# 予想7: 逐次残差化で3変量正規を独立標準正規へ変換する

- 安定ID: `PRED-MVN-07-SEQUENTIAL-RESIDUAL`
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主題: 相関行列、条件付き独立、逐次残差化、Cholesky型変換
- 使用技術: 条件付き正規、残差、無相関と独立

## 問題

$(X_1,X_2,X_3)$ は平均0、各分散1の3変量正規分布に従い

$$
R=
\begin{pmatrix}
1&1/2&1/2\\
1/2&1&1/4\\
1/2&1/4&1
\end{pmatrix}
$$

を相関行列とする。

1. $X_2\mid X_1=x_1$ と $X_3\mid X_1=x_1$ の分布を求めよ。
2. $X_1$ を与えた下での $X_2,X_3$ の条件付き共分散を求めよ。
3. 

$$
Z_1=X_1,
\qquad
Z_2=\frac{2X_2-X_1}{\sqrt3},
\qquad
Z_3=\frac{2X_3-X_1}{\sqrt3}
$$

とするとき、$Z_1,Z_2,Z_3$ が互いに独立な標準正規分布に従うことを示せ。
4. $\det R$ を求め、逐次条件付き分散との関係を説明せよ。

## 解答

二変量正規の公式より

$$
\boxed{
X_2\mid X_1=x_1
\sim N\left(\frac{x_1}{2},\frac34\right)
},
$$

$$
\boxed{
X_3\mid X_1=x_1
\sim N\left(\frac{x_1}{2},\frac34\right)
}.
$$

さらに

$$
\begin{aligned}
\operatorname{Cov}(X_2,X_3\mid X_1)
&=\frac14-\frac12\cdot\frac12\\
&=0.
\end{aligned}
$$

したがって

$$
X_2\perp X_3\mid X_1.
$$

$Z_2$ と $Z_3$ は条件付き残差を分散1に標準化したものだから、それぞれ標準正規である。また

$$
\operatorname{Cov}(Z_1,Z_2)=0,
\qquad
\operatorname{Cov}(Z_1,Z_3)=0,
$$

かつ

$$
\begin{aligned}
\operatorname{Cov}(Z_2,Z_3)
&=\frac13\operatorname{Cov}(2X_2-X_1,2X_3-X_1)\\
&=\frac13\left(4\cdot\frac14-2\cdot\frac12-2\cdot\frac12+1\right)\\
&=0.
\end{aligned}
$$

$(Z_1,Z_2,Z_3)$ は線形変換された多変量正規ベクトルなので

$$
\boxed{Z_1,Z_2,Z_3\overset{\mathrm{ind}}\sim N(0,1)}.
$$

逐次条件付き分散から

$$
\det R
=
\operatorname{Var}(X_1)
\operatorname{Var}(X_2\mid X_1)
\operatorname{Var}(X_3\mid X_1,X_2).
$$

条件付き独立により

$$
\operatorname{Var}(X_3\mid X_1,X_2)
=
\operatorname{Var}(X_3\mid X_1)
=
\frac34.
$$

したがって

$$
\boxed{
\det R=1\cdot\frac34\cdot\frac34=\frac9{16}
}.
$$

### 採点基準

条件付き分布4点、条件付き独立4点、標準化と独立性8点、行列式4点。

---

# 予想8: Mahalanobis二次形式を非心カイ二乗まで拡張する

- 安定ID: `PRED-MVN-08-NONCENTRAL-QUAD`
- Level: B
- 目安時間: 20分
- 計算量: 中
- 主題: 多変量正規、白色化、二次形式、非心カイ二乗
- 使用技術: 線形変換、モーメント母関数

## 問題

$\boldsymbol X\sim N_p(\boldsymbol\mu,\Sigma)$ とし、$\Sigma$ は正定値とする。固定ベクトル $\boldsymbol m$ に対し

$$
Q=(\boldsymbol X-\boldsymbol m)^T\Sigma^{-1}(\boldsymbol X-\boldsymbol m)
$$

とおく。

1. $LL^T=\Sigma$ を満たす可逆行列 $L$ を取り、$\boldsymbol Z=L^{-1}(\boldsymbol X-\boldsymbol m)$ の分布を求めよ。
2. $Q=\boldsymbol Z^T\boldsymbol Z$ を示せ。
3. 

$$
\lambda=(\boldsymbol\mu-\boldsymbol m)^T\Sigma^{-1}(\boldsymbol\mu-\boldsymbol m)
$$

とするとき、$Q$ の分布を述べよ。
4. モーメント母関数

$$
M_Q(t)
=(1-2t)^{-p/2}
\exp\left(\frac{\lambda t}{1-2t}\right),
\qquad t<\frac12
$$

を用いて $E[Q]$ と $\operatorname{Var}(Q)$ を求めよ。
5. $\boldsymbol m=\boldsymbol\mu$ の場合を説明せよ。

## 解答

$$
\boldsymbol Z=L^{-1}(\boldsymbol X-\boldsymbol m)
$$

とすると

$$
\boxed{
\boldsymbol Z\sim N_p(\boldsymbol\delta,I_p),
\qquad
\boldsymbol\delta=L^{-1}(\boldsymbol\mu-\boldsymbol m)
}.
$$

$\Sigma^{-1}=(L^{-1})^TL^{-1}$ なので

$$
\boxed{Q=\boldsymbol Z^T\boldsymbol Z}.
$$

また

$$
\boldsymbol\delta^T\boldsymbol\delta
=
(\boldsymbol\mu-\boldsymbol m)^T\Sigma^{-1}(\boldsymbol\mu-\boldsymbol m)
=\lambda.
$$

したがって $Q$ は自由度 $p$、非心度 $\lambda$ の非心カイ二乗分布に従う。

対数モーメント母関数

$$
K(t)
=-\frac p2\log(1-2t)+\frac{\lambda t}{1-2t}
$$

を微分すると

$$
K'(0)=p+\lambda,
\qquad
K''(0)=2p+4\lambda.
$$

よって

$$
\boxed{E[Q]=p+\lambda},
$$

$$
\boxed{
\operatorname{Var}(Q)=2(p+2\lambda)
}.
$$

$\boldsymbol m=\boldsymbol\mu$ なら $\lambda=0$ なので

$$
\boxed{Q\sim\chi_p^2}.
$$

### 採点基準

白色化4点、二次形式3点、非心度5点、平均・分散5点、中心の場合3点。

---

# 学習順の推奨

まず `PRED-MVN-01`、`02`、`03`、`04` を優先する。この4題で、相関行列、条件付き正規、精度行列、二次形式という `P3-03` の中核をほぼ一巡できる。

次に `PRED-MVN-06` と `07` で、単なる公式代入から「観測モデル」「逐次残差化」へ進む。`05` は `P3-05` の切断分布への橋渡し、`08` は `S1-01` や検出力・線形モデルの非心分布への橋渡しとして使う。

## 既存6題との役割分担

- 2021問5型: 一般の線形変換と独立残差化。
- 2012問5型: ブロック条件付き分布と偏相関。
- 2018問4型: 条件付き正規とMarkov的遷移。
- 2013問2型: 正規和・条件付き分布。
- 2015問5型: 相関係数と二値化・切断正規。
- 2017問4型: 線形変換・条件付き正規の基本確認。
- 本ファイル: 相関行列のスペクトル、精度行列、射影二次形式、線形制約、ノイズ付き観測、逐次残差化、非心二次形式を補う。
