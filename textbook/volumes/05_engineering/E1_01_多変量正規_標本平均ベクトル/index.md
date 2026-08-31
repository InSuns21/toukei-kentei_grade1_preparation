# E1-01 多変量正規分布と標本平均ベクトル

多変量解析では、変数を1本ずつ別々に見るだけでは失われる「一緒に動く方向」を扱います。2つの測定値の単位やばらつきが違えば、普通のユークリッド距離だけでは「中心からどれほど珍しいか」を公平に測れません。また、複数の測定値を平均したとき、その平均ベクトルの精度は各成分の分散だけでなく共分散にも支配されます。

本章では [P3-03 多変量分布・条件付き分布](../../02_distributions/P3_03_多変量分布_条件付き分布/index.md) を確率論上の土台として、理工学で頻出する計算へ進みます。平均ベクトル・分散共分散行列を読むところから、標本平均ベクトル、Mahalanobis距離、白色化、条件付き正規分布による線形予測、線形判別分析までを、**意味 → 具体例 → 一般式 → 導出 → 演習**の順につなげます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 平均ベクトル・分散共分散行列・相関行列を、単位と共変動の意味まで含めて読める。
- 独立な多変量標本の標本平均ベクトルの平均・分散共分散行列・分布を導ける。
- 線形変換後の平均ベクトルと分散共分散行列を $A\Sigma A^{\mathsf T}$ から計算できる。
- Mahalanobis距離を計算し、ユークリッド距離との違いを説明できる。
- 固有分解から白色化変換を構成し、共分散が単位行列になることを確認できる。
- 多変量正規分布の条件付き平均を「線形予測＋残差」として計算できる。
- 共通分散共分散行列を仮定した2群正規モデルから線形判別関数を導ける。
- 「無相関なら独立」を使える条件と、使えない場合を区別できる。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 多変量正規分布 | 線形変換、周辺分布、条件付き分布、標本平均ベクトル |
| 平均ベクトル | 標本平均ベクトルの期待値と分散共分散行列 |
| 分散共分散行列 | 線形結合の分散、楕円、Mahalanobis距離、白色化 |
| 相関行列 | 標準化後の共分散、単位の異なる変数の比較 |
| 固有値・固有ベクトル | 共分散固有構造、白色化、E1-02への接続 |
| 各種多変量解析法への接続 | 線形判別分析、主成分分析への橋渡し |

## 前提知識チェック

1. P3-03: 多変量正規分布、線形変換、条件付き分布、二次形式、Mahalanobis距離の定義。
2. P2-02: 期待値、分散、共分散、独立な和の分散。
3. S1-01: 正規標本、標本平均の分布。
4. F0-00: 対称行列の固有分解、正定値、逆行列、直交行列。

---

## 1. まず「ばらつきの向き」を読む

2変量の測定値を

$$
\boldsymbol X=\begin{pmatrix}X_1\\X_2\end{pmatrix}
$$

とし、平均ベクトルを

$$
\boldsymbol\mu=E[\boldsymbol X]
=\begin{pmatrix}\mu_1\\\mu_2\end{pmatrix},
$$

分散共分散行列を

$$
\Sigma=
\begin{pmatrix}
\sigma_1^2&\sigma_{12}\\
\sigma_{12}&\sigma_2^2
\end{pmatrix}
$$

とします。対角成分は各変数の分散、非対角成分は共分散です。

例えば

$$
\Sigma=\begin{pmatrix}4&3\\3&9\end{pmatrix}
$$

なら、標準偏差は2と3、相関係数は

$$
\rho=\frac{3}{2\cdot3}=\frac12
$$

です。したがって相関行列は

$$
R=\begin{pmatrix}1&1/2\\1/2&1\end{pmatrix}.
$$

ここで分散共分散行列と相関行列の役割を分けます。

- 分散共分散行列は元の単位と尺度を保持する。
- 相関行列は各変数を標準偏差で割った後の共変動だけを表す。

温度と圧力のように単位が違う変数では、単位の変更だけで分散の大きさが変わります。そのため後続の主成分分析では、分散共分散行列を使うか相関行列を使うかが解析結果に直結します。

---

## 2. 線形変換は平均と共分散をどう動かすか

$p$次元確率ベクトル $\boldsymbol X$ の平均を $\boldsymbol\mu$、分散共分散行列を $\Sigma$ とします。定数行列 $A$ と定数ベクトル $\boldsymbol b$ に対して

$$
\boldsymbol Y=A\boldsymbol X+\boldsymbol b
$$

と置きます。

期待値の線形性から

$$
E[\boldsymbol Y]
=A\boldsymbol\mu+\boldsymbol b.
$$

また

$$
\boldsymbol Y-E[\boldsymbol Y]
=A(\boldsymbol X-\boldsymbol\mu)
$$

なので、分散共分散行列の定義から

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol Y)
&=E\left[(\boldsymbol Y-E\boldsymbol Y)(\boldsymbol Y-E\boldsymbol Y)^{\mathsf T}\right]\\
&=E\left[A(\boldsymbol X-\boldsymbol\mu)(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}A^{\mathsf T}\right]\\
&=A\Sigma A^{\mathsf T}.
\end{aligned}
$$

したがって

$$
\boxed{
E[\boldsymbol Y]=A\boldsymbol\mu+\boldsymbol b,
\qquad
\operatorname{Cov}(\boldsymbol Y)=A\Sigma A^{\mathsf T}
}
$$

です。

特に $\boldsymbol a$ を列ベクトルとし、1変量の線形結合

$$
Z=\boldsymbol a^{\mathsf T}\boldsymbol X
$$

を考えると

$$
E[Z]=\boldsymbol a^{\mathsf T}\boldsymbol\mu,
\qquad
\operatorname{Var}(Z)=\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a.
$$

この二次形式が、Mahalanobis距離、主成分分析、線形判別分析の共通部品になります。

---

## 3. 多変量正規分布と標本平均ベクトル

### 3.1 多変量正規分布

$p$次元確率ベクトル $\boldsymbol X$ が平均 $\boldsymbol\mu$、正定値な分散共分散行列 $\Sigma$ の多変量正規分布に従うとき

$$
\boldsymbol X\sim N_p(\boldsymbol\mu,\Sigma)
$$

と書きます。

多変量正規分布で重要なのは、任意の定数行列 $A$ に対し

$$
A\boldsymbol X+\boldsymbol b
$$

も多変量正規分布になることです。2節で求めた平均と共分散を使えば

$$
A\boldsymbol X+\boldsymbol b
\sim N_q(A\boldsymbol\mu+\boldsymbol b,
A\Sigma A^{\mathsf T})
$$

となります。

### 3.2 標本平均ベクトル

独立な確率ベクトル

$$
\boldsymbol X_1,\ldots,\boldsymbol X_n
\overset{\mathrm{iid}}{\sim}
N_p(\boldsymbol\mu,\Sigma)
$$

を考え、標本平均ベクトルを

$$
\bar{\boldsymbol X}
=\frac1n\sum_{i=1}^n\boldsymbol X_i
$$

と定義します。

期待値は

$$
\begin{aligned}
E[\bar{\boldsymbol X}]
&=\frac1n\sum_{i=1}^nE[\boldsymbol X_i]\\
&=\boldsymbol\mu.
\end{aligned}
$$

独立性から異なる標本間の共分散は0なので

$$
\begin{aligned}
\operatorname{Cov}(\bar{\boldsymbol X})
&=\operatorname{Cov}\left(\frac1n\sum_{i=1}^n\boldsymbol X_i\right)\\
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Cov}(\boldsymbol X_i)\\
&=\frac1{n^2}n\Sigma\\
&=\frac{\Sigma}{n}.
\end{aligned}
$$

さらに正規ベクトルの独立和は正規なので

$$
\boxed{
\bar{\boldsymbol X}
\sim N_p\left(\boldsymbol\mu,\frac{\Sigma}{n}\right)
}.
$$

一変量の $\bar X\sim N(\mu,\sigma^2/n)$ を、そのまま行列へ拡張した形です。

### 3.3 標本平均の線形結合

定数ベクトル $\boldsymbol c$ に対して

$$
T=\boldsymbol c^{\mathsf T}\bar{\boldsymbol X}
$$

なら

$$
T\sim N\left(
\boldsymbol c^{\mathsf T}\boldsymbol\mu,
\frac1n\boldsymbol c^{\mathsf T}\Sigma\boldsymbol c
\right).
$$

「複数指標の重み付き平均」の分布を求める問題では、この形まで落とすのが基本です。

---

## 4. Mahalanobis距離：相関と尺度を補正した距離

平均 $\boldsymbol\mu$、正定値な分散共分散行列 $\Sigma$ に対し、点 $\boldsymbol x$ のMahalanobis距離の二乗を

$$
D^2(\boldsymbol x)
=(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}
\Sigma^{-1}
(\boldsymbol x-\boldsymbol\mu)
$$

と定義します。

### 4.1 対角行列なら「標準化した距離」

もし

$$
\Sigma=\begin{pmatrix}4&0\\0&9\end{pmatrix}
$$

なら

$$
\Sigma^{-1}
=\begin{pmatrix}1/4&0\\0&1/9\end{pmatrix}
$$

なので

$$
D^2
=\frac{(x_1-\mu_1)^2}{4}
+\frac{(x_2-\mu_2)^2}{9}.
$$

各成分を標準偏差で割ってからユークリッド距離を測っています。

### 4.2 共分散があると「斜めの標準化」が必要になる

共分散が0でないとき、単に各成分を標準偏差で割るだけでは十分ではありません。分布の等密度線は一般に座標軸に平行な楕円ではなく、**傾いた楕円**になるからです。

具体例として

$$
\Sigma=
\begin{pmatrix}
3&1\\
1&3
\end{pmatrix}
$$

を考えます。この行列の固有値は $4,2$、対応する単位固有ベクトルは

$$
\boldsymbol q_1=\frac1{\sqrt2}(1,1)^{\mathsf T},
\qquad
\boldsymbol q_2=\frac1{\sqrt2}(1,-1)^{\mathsf T}
$$

です。したがって

$$
\Sigma=Q\Lambda Q^{\mathsf T},
$$

$$
Q=\frac1{\sqrt2}
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix},
\qquad
\Lambda=
\begin{pmatrix}
4&0\\
0&2
\end{pmatrix}.
$$

ここで中心化したベクトルを

$$
\boldsymbol X_c=\boldsymbol X-\boldsymbol\mu
$$

とし、まず

$$
\boldsymbol Y=Q^{\mathsf T}\boldsymbol X_c
$$

と座標を回転します。2節の線形変換則から

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol Y)
&=Q^{\mathsf T}\Sigma Q\\
&=Q^{\mathsf T}(Q\Lambda Q^{\mathsf T})Q\\
&=\Lambda.
\end{aligned}
$$

つまり、元の座標では非対角成分として見えていた共分散が、固有ベクトル方向へ座標を取り直すと消えます。楕円の長軸・短軸を新しい座標軸に選んだ、と考えればよいです。

この段階では

$$
\operatorname{Var}(Y_1)=4,
\qquad
\operatorname{Var}(Y_2)=2
$$

なので、次に各方向をその標準偏差で割ります。

$$
\boldsymbol Z
=\Lambda^{-1/2}\boldsymbol Y
=\Lambda^{-1/2}Q^{\mathsf T}(\boldsymbol X-\boldsymbol\mu).
$$

すると

$$
\operatorname{Cov}(\boldsymbol Z)=I_p.
$$

したがって、共分散がある場合の標準化は

$$
\boxed{
\text{中心化}
\longrightarrow
\text{固有方向へ回転}
\longrightarrow
\text{各方向を標準偏差で割る}
}
$$

という2段階の操作になります。

この変換を使うとMahalanobis距離は

$$
\begin{aligned}
D^2
&=(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}
\Sigma^{-1}
(\boldsymbol X-\boldsymbol\mu)\\
&=(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}
Q\Lambda^{-1}Q^{\mathsf T}
(\boldsymbol X-\boldsymbol\mu)\\
&=\boldsymbol Y^{\mathsf T}\Lambda^{-1}\boldsymbol Y\\
&=\boldsymbol Z^{\mathsf T}\boldsymbol Z\\
&=\|\boldsymbol Z\|^2.
\end{aligned}
$$

つまり

$$
\boxed{
\text{Mahalanobis距離}
=
\text{白色化した座標での普通のユークリッド距離}
}
$$

です。

さらに $\boldsymbol X\sim N_p(\boldsymbol\mu,\Sigma)$ なら、後述の白色化により

$$
\boldsymbol Z\sim N_p(\boldsymbol0,I_p)
$$

となります。したがって成分 $Z_1,\ldots,Z_p$ は独立な標準正規変数であり、

$$
D^2=Z_1^2+\cdots+Z_p^2
$$

だから

$$
\boxed{D^2\sim\chi_p^2}
$$

です。

この「標準正規ベクトルへ変換してから、直交方向の平方和を見る」という考え方は、Cochranの定理で平方和を直交分解するときにも現れる共通の土台です。Cochranの定理では白色化後の球対称な正規ベクトルを射影して平方和を分けますが、ここではその前段階として、一般の共分散 $\Sigma$ をもつ楕円を球へ戻しています。

---

## 5. 白色化：楕円を球へ戻す

前節で使った、共分散を単位行列へ変換する操作を**白色化**といいます。

平均 $\boldsymbol\mu$、正定値な分散共分散行列 $\Sigma$ をもつ確率ベクトル $\boldsymbol X$ を考え、

$$
\Sigma=Q\Lambda Q^{\mathsf T}
$$

と固有分解します。ここで $Q$ は直交行列、

$$
\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_p),
\qquad \lambda_j>0
$$

です。

### 5.1 まず回転する

中心化した

$$
\boldsymbol X_c=\boldsymbol X-\boldsymbol\mu
$$

に対し

$$
\boldsymbol Y=Q^{\mathsf T}\boldsymbol X_c
$$

とすると

$$
\operatorname{Cov}(\boldsymbol Y)=\Lambda.
$$

ここではまだ分散は $\lambda_1,\ldots,\lambda_p$ のままですが、異なる成分間の共分散は0になっています。

### 5.2 次に各固有方向を標準化する

$$
\Lambda^{-1/2}
=\operatorname{diag}
\left(
\lambda_1^{-1/2},\ldots,\lambda_p^{-1/2}
\right)
$$

として

$$
\boldsymbol Z
=\Lambda^{-1/2}\boldsymbol Y
=\Lambda^{-1/2}Q^{\mathsf T}
(\boldsymbol X-\boldsymbol\mu)
$$

とします。このとき

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol Z)
&=\Lambda^{-1/2}Q^{\mathsf T}
\Sigma
Q\Lambda^{-1/2}\\
&=\Lambda^{-1/2}Q^{\mathsf T}
(Q\Lambda Q^{\mathsf T})
Q\Lambda^{-1/2}\\
&=\Lambda^{-1/2}\Lambda\Lambda^{-1/2}\\
&=I_p.
\end{aligned}
$$

したがって白色化行列の1つは

$$
\boxed{
W=\Lambda^{-1/2}Q^{\mathsf T}
}
$$

であり、

$$
W\Sigma W^{\mathsf T}=I_p
$$

を満たします。

ここで操作の意味を分けて覚えると式を再構成しやすくなります。

- $Q^{\mathsf T}$：楕円の主軸が座標軸に重なるように**回転**する。
- $\Lambda^{-1/2}$：各主軸方向を標準偏差で割って**拡大・縮小**する。
- 結果：傾いた楕円が半径方向に同じ尺度をもつ球へ変わる。

### 5.3 $\Sigma^{-1/2}$ との関係

4節では簡潔に

$$
\Sigma^{-1/2}(\boldsymbol X-\boldsymbol\mu)
$$

という書き方も使います。対称な平方根を採用すると

$$
\boxed{
\Sigma^{-1/2}
=Q\Lambda^{-1/2}Q^{\mathsf T}
}
$$

です。この行列でも

$$
\Sigma^{-1/2}\Sigma\Sigma^{-1/2}=I_p
$$

なので白色化できます。

一方、先ほどの

$$
W=\Lambda^{-1/2}Q^{\mathsf T}
$$

も

$$
W\Sigma W^{\mathsf T}=I_p
$$

を満たします。両者は同じ行列ではありません。

これは矛盾ではなく、**白色化は一意ではない**ためです。共分散が $I_p$ になった後にさらに直交回転しても、共分散は $I_p$ のままです。この点はLevel Dの演習で改めて確認します。

### 5.4 正規分布なら「無相関」が「独立」に強化される

$\boldsymbol X$ が多変量正規分布なら、線形変換後も多変量正規なので

$$
\boldsymbol Z\sim N_p(\boldsymbol0,I_p).
$$

したがって各成分は無相関であるだけでなく独立です。

ただし正規性を仮定しない一般の確率ベクトルでは、

$$
\operatorname{Cov}(\boldsymbol Z)=I_p
$$

から成分独立までは結論できません。白色化が保証するのはあくまで平均0・分散1・共分散0です。

---

## 6. 条件付き正規分布を「予測できる部分＋残差」として読む

条件付き正規分布の公式は、いきなりブロック行列で暗記するより

$$
\boxed{
\text{観測される量}
=
\text{他の変数から線形に予測できる部分}
+
\text{残差}
}
$$

と分解して作る方が理解しやすくなります。

### 6.1 まず2変量で考える

$(X,Y)$ が二変量正規分布に従い、

$$
E[X]=\mu_X,
\qquad
E[Y]=\mu_Y,
$$

$$
\operatorname{Var}(X)=\sigma_X^2,
\qquad
\operatorname{Var}(Y)=\sigma_Y^2,
\qquad
\operatorname{Cov}(X,Y)=\sigma_{XY}
$$

とします。

$X$ から $Y$ を線形予測する形として

$$
Y
=\mu_Y+b(X-\mu_X)+R
$$

を考えます。ここで $R$ は予測しきれなかった残差です。

係数 $b$ は、残差と説明に使った $X$ が無相関になるように決めます。

$$
\begin{aligned}
\operatorname{Cov}(R,X)
&=\operatorname{Cov}
\{Y-\mu_Y-b(X-\mu_X),X\}\\
&=\sigma_{XY}-b\sigma_X^2.
\end{aligned}
$$

これを0とすると

$$
\boxed{
b=\frac{\sigma_{XY}}{\sigma_X^2}
}
$$

です。したがって

$$
Y
=\mu_Y
+\frac{\sigma_{XY}}{\sigma_X^2}(X-\mu_X)
+R.
$$

残差分散も直接計算できます。

$$
\begin{aligned}
\operatorname{Var}(R)
&=\operatorname{Var}
\left\{(Y-\mu_Y)-b(X-\mu_X)\right\}\\
&=\sigma_Y^2
-2b\sigma_{XY}
+b^2\sigma_X^2\\
&=\sigma_Y^2
-2\frac{\sigma_{XY}^2}{\sigma_X^2}
+\frac{\sigma_{XY}^2}{\sigma_X^2}\\
&=\boxed{
\sigma_Y^2-rac{\sigma_{XY}^2}{\sigma_X^2}
}.
\end{aligned}
$$

つまり、$Y$ の周辺分散から、$X$ を知ることで説明できる分だけ減っています。

例えば

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}10\\20\end{pmatrix},
\begin{pmatrix}4&3\\3&9\end{pmatrix}
\right)
$$

なら

$$
b=\frac34
$$

で、

$$
Y=20+\frac34(X-10)+R,
$$

$$
\operatorname{Var}(R)
=9-\frac{3^2}{4}
=\frac{27}{4}.
$$

この時点で、後に出てくる条件付き平均と条件付き分散の形がほぼ見えています。

### 6.2 ブロック行列へ一般化する

確率ベクトルを2つのブロックへ分け、

$$
\begin{pmatrix}\boldsymbol X_1\\\boldsymbol X_2\end{pmatrix}
\sim N\left(
\begin{pmatrix}\boldsymbol\mu_1\\\boldsymbol\mu_2\end{pmatrix},
\begin{pmatrix}
\Sigma_{11}&\Sigma_{12}\\
\Sigma_{21}&\Sigma_{22}
\end{pmatrix}
\right)
$$

とします。$\Sigma_{11}$ は正則とします。

2変量での係数 $\sigma_{XY}/\sigma_X^2$ に対応する行列を

$$
B=\Sigma_{21}\Sigma_{11}^{-1}
$$

と置きます。そして

$$
\boldsymbol X_2
=\boldsymbol\mu_2
+B(\boldsymbol X_1-\boldsymbol\mu_1)
+\boldsymbol R
$$

となるように残差を

$$
\boxed{
\boldsymbol R
=\boldsymbol X_2-\boldsymbol\mu_2
-B(\boldsymbol X_1-\boldsymbol\mu_1)
}
$$

と定義します。

まず $\boldsymbol R$ と $\boldsymbol X_1$ の共分散を計算します。

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_1)
&=\Sigma_{21}-B\Sigma_{11}\\
&=\Sigma_{21}
-\Sigma_{21}\Sigma_{11}^{-1}\Sigma_{11}\\
&=0.
\end{aligned}
$$

したがって、$B=\Sigma_{21}\Sigma_{11}^{-1}$ は「$\boldsymbol X_1$ で説明できる線形成分をすべて取り除き、残差を $\boldsymbol X_1$ と無相関にする係数」です。

### 6.3 残差の共分散を省略せずに導く

ここが条件付き共分散の式の本体です。

$$
\boldsymbol R
=(\boldsymbol X_2-\boldsymbol\mu_2)
-B(\boldsymbol X_1-\boldsymbol\mu_1)
$$

なので、分散共分散行列の公式をそのまま使うと

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R)
={}&\Sigma_{22}
-B\Sigma_{12}
-\Sigma_{21}B^{\mathsf T}
+B\Sigma_{11}B^{\mathsf T}.
\end{aligned}
$$

ここで $\Sigma_{11}$ は対称なので

$$
B^{\mathsf T}
=(\Sigma_{21}\Sigma_{11}^{-1})^{\mathsf T}
=\Sigma_{11}^{-1}\Sigma_{12}.
$$

したがって

$$
B\Sigma_{12}
=\Sigma_{21}\Sigma_{11}^{-1}\Sigma_{12},
$$

$$
\Sigma_{21}B^{\mathsf T}
=\Sigma_{21}\Sigma_{11}^{-1}\Sigma_{12},
$$

また

$$
\begin{aligned}
B\Sigma_{11}B^{\mathsf T}
&=\Sigma_{21}\Sigma_{11}^{-1}
\Sigma_{11}
\Sigma_{11}^{-1}\Sigma_{12}\\
&=\Sigma_{21}\Sigma_{11}^{-1}\Sigma_{12}.
\end{aligned}
$$

よって3つの同じ項の係数が $-1-1+1=-1$ となり、

$$
\boxed{
\operatorname{Cov}(\boldsymbol R)
=\Sigma_{22}
-\Sigma_{21}\Sigma_{11}^{-1}\Sigma_{12}
}.
$$

この行列は $\Sigma$ のSchur補行列と呼ばれることもありますが、名称より

$$
\boxed{
\text{残った分散}
=
\text{元の分散}
-
\text{$\boldsymbol X_1$ で説明できた分散}
}
$$

と読むことが重要です。

### 6.4 なぜこれが条件付き分布になるのか

$\boldsymbol R$ と $\boldsymbol X_1$ は、元の多変量正規ベクトルの線形変換なので同時正規です。さらに

$$
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_1)=0
$$

なので、多変量正規分布では

$$
\boldsymbol R\perp\boldsymbol X_1
$$

が従います。

したがって $\boldsymbol X_1=\boldsymbol x_1$ と条件付けても $\boldsymbol R$ の分布は変わりません。

分解式

$$
\boldsymbol X_2
=\boldsymbol\mu_2
+B(\boldsymbol X_1-\boldsymbol\mu_1)
+\boldsymbol R
$$

で $\boldsymbol X_1=\boldsymbol x_1$ を固定すれば、条件付き平均は

$$
\boxed{
E[\boldsymbol X_2\mid\boldsymbol X_1=\boldsymbol x_1]
=\boldsymbol\mu_2
+\Sigma_{21}\Sigma_{11}^{-1}
(\boldsymbol x_1-\boldsymbol\mu_1)
}
$$

となります。

また条件付け後にランダムに残るのは $\boldsymbol R$ だけなので、条件付き分散共分散行列は

$$
\boxed{
\operatorname{Cov}(\boldsymbol X_2\mid\boldsymbol X_1)
=\Sigma_{22}
-\Sigma_{21}\Sigma_{11}^{-1}\Sigma_{12}
}.
$$

多変量正規分布では、この条件付き共分散は観測値 $\boldsymbol x_1$ 自体には依存しません。$\boldsymbol x_1$ が変わると予測中心は動きますが、残差のばらつきは同じです。

条件付き正規分布は、後の状態空間モデルやKalman filterでも

$$
\text{予測値}+	ext{観測からの修正}+	ext{残差}
$$

というほぼ同じ構造で現れます。

---

## 7. 線形判別分析：白色化した空間で「どちらの中心に近いか」

線形判別分析（LDA）は、最初から一般の $p$ 次元公式を見ると目的が見えにくくなります。まず1変量で考え、そのあと4〜5節のMahalanobis距離と白色化へ接続します。

### 7.1 まず1次元なら「近い平均へ分類する」

2群について

$$
X\mid(G=1)\sim N(\mu_1,\sigma^2),
\qquad
X\mid(G=2)\sim N(\mu_2,\sigma^2)
$$

とし、事前確率も等しいとします。

両群の分散が同じなら、観測値 $x$ は平均に近い方の群へ分類するのが自然です。境界は

$$
(x-\mu_1)^2=(x-\mu_2)^2
$$

を満たす点なので、$\mu_1\ne\mu_2$ なら

$$
\boxed{
x=\frac{\mu_1+\mu_2}{2}
}
$$

です。

つまり1次元のLDAは、共通の尺度で標準化した後に「どちらの中心へ近いか」を比べているだけです。

### 7.2 多次元ではEuclid距離をMahalanobis距離へ置き換える

次に

$$
\boldsymbol X\mid(G=g)
\sim N_p(\boldsymbol\mu_g,\Sigma),
\qquad g=1,2
$$

とし、2群で**共通の**正定値な分散共分散行列 $\Sigma$ を仮定します。

事前確率が等しい場合、群 $g$ へのMahalanobis距離

$$
D_g^2(\boldsymbol x)
=(\boldsymbol x-\boldsymbol\mu_g)^{\mathsf T}
\Sigma^{-1}
(\boldsymbol x-\boldsymbol\mu_g)
$$

が小さい方へ分類します。

ここで5節の白色化行列 $W$ を使い

$$
W\Sigma W^{\mathsf T}=I_p
$$

とします。白色化座標を

$$
\boldsymbol z=W\boldsymbol x,
\qquad
\boldsymbol m_g=W\boldsymbol\mu_g
$$

とすれば

$$
D_g^2(\boldsymbol x)
=\|\boldsymbol z-\boldsymbol m_g\|^2.
$$

したがってLDAは

$$
\boxed{
\text{元の楕円形の空間を白色化して、
球形の空間で群中心への普通の距離を比較する}
}
$$

方法と読めます。

### 7.3 なぜ境界が直線・超平面になるのか

等事前確率なら境界は

$$
D_1^2(\boldsymbol x)=D_2^2(\boldsymbol x)
$$

です。両辺を展開すると

$$
\begin{aligned}
D_g^2(\boldsymbol x)
={}&\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x
-2\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol x
+\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol\mu_g.
\end{aligned}
$$

2群で $\Sigma$ が共通なので、

$$
\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x
$$

は両辺でまったく同じです。したがって差を取ると二次項が消え、

$$
(\boldsymbol\mu_2-\boldsymbol\mu_1)^{\mathsf T}
\Sigma^{-1}\boldsymbol x
=\frac12
\left(
\boldsymbol\mu_2^{\mathsf T}\Sigma^{-1}\boldsymbol\mu_2
-\boldsymbol\mu_1^{\mathsf T}\Sigma^{-1}\boldsymbol\mu_1
\right)
$$

となります。

ここで

$$
\boxed{
\boldsymbol w
=\Sigma^{-1}(\boldsymbol\mu_2-\boldsymbol\mu_1)
}
$$

と置けば、境界は

$$
\boldsymbol w^{\mathsf T}\boldsymbol x=c
$$

という超平面です。

つまりLDAでは、多次元の観測 $\boldsymbol x$ を実質的に

$$
\boxed{
\boldsymbol w^{\mathsf T}\boldsymbol x
}
$$

という1本の判別スコアへ射影して比較しています。

$\Sigma^{-1}$ が入るのは、平均差 $\boldsymbol\mu_2-\boldsymbol\mu_1$ をそのまま見るのではなく、**ばらつきの大きい方向は割り引き、ばらつきの小さい方向の平均差を重く見るため**です。

### 7.4 Bayes則から同じ判別関数を導く

群 $g$ の事前確率を $\pi_g$、正規密度を $f_g(\boldsymbol x)$ とします。Bayes則より

$$
P(G=g\mid\boldsymbol X=\boldsymbol x)
=\frac{\pi_gf_g(\boldsymbol x)}
{\sum_h\pi_hf_h(\boldsymbol x)}.
$$

分母は群に依存しないので、事後確率最大化は

$$
\pi_gf_g(\boldsymbol x)
$$

を最大化することと同値です。

対数を取り、正規密度の二次形式を展開すると

$$
\log\pi_g
-\frac12
\left[
\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x
-2\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol x
+\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol\mu_g
\right]
$$

に、群に依存しない定数項が加わった形になります。

群共通の

$$
\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x
$$

を除けば、判別関数は

$$
\boxed{
\delta_g(\boldsymbol x)
=\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol x
-\frac12\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol\mu_g
+\log\pi_g
}
$$

です。

ここまで来ると、なぜ「線形」なのかは式変形上の偶然ではありません。**2群が同じ共分散、つまり同じ形・同じ向きの楕円をもつため、共通の二次部分が分類時に消える**からです。

### 7.5 共分散が群ごとに違うとQDAになる

もし

$$
\boldsymbol X\mid(G=g)
\sim N_p(\boldsymbol\mu_g,\Sigma_g)
$$

のように群ごとに分散共分散行列が違うと、

$$
\boldsymbol x^{\mathsf T}\Sigma_g^{-1}\boldsymbol x
$$

は群共通ではありません。そのため二次項が相殺されず、判別境界は一般に二次曲面になります。これが二次判別分析（QDA）です。

なお、2群のFisher型線形判別でも最適な判別方向は、群内共分散を $\Sigma$ とみなせば

$$
\boldsymbol w\propto
\Sigma^{-1}(\boldsymbol\mu_2-\boldsymbol\mu_1)
$$

となります。正規モデルからのBayes LDAとFisherの判別方向が同じ形になるのは、この共通の「平均差を共分散で補正する」という構造によります。

---

## 8. 問題解決パターン

### MV-LINEAR-1：まず $A\Sigma A^{\mathsf T}$

線形変換や線形結合が出たら、成分別に共分散を展開する前に変換行列 $A$ を置きます。平均は $A\boldsymbol\mu+\boldsymbol b$、共分散は $A\Sigma A^{\mathsf T}$ です。

### MV-MEAN-1：標本平均は $\Sigma/n$

独立同分布標本なら、標本平均ベクトルの分散共分散行列は $\Sigma/n$ です。ただし「独立」を確認せずに使わないことが重要です。

### MV-DIST-1：Mahalanobis距離は「白色化後の普通の距離」

尺度差だけなら各成分を標準偏差で割ります。共分散まであるなら、固有方向へ回転してから各方向を標準化します。Mahalanobis距離は、その白色化座標でのユークリッド距離です。

### MV-WHITE-1：中心化 → 回転 → 尺度調整

白色化の式を暗記せず、$\Sigma=Q\Lambda Q^{\mathsf T}$ として、まず $Q^{\mathsf T}$ で固有方向へ回転し、次に $\Lambda^{-1/2}$ で各分散を1へそろえます。最後に $W\Sigma W^{\mathsf T}=I$ を確認します。

### MV-COND-1：「予測部分＋残差」に分ける

$$
\boldsymbol X_2
=\boldsymbol\mu_2
+\Sigma_{21}\Sigma_{11}^{-1}
(\boldsymbol X_1-\boldsymbol\mu_1)
+\boldsymbol R
$$

と分解し、$\operatorname{Cov}(\boldsymbol R,\boldsymbol X_1)=0$ を作ります。条件付き共分散は残差共分散そのものです。

### MV-LDA-1：まず距離、次に密度

共通共分散・等事前確率なら、まず各群へのMahalanobis距離を比較します。白色化すれば「どちらの中心に近いか」です。Bayes判別関数が必要なときは、その後で正規密度を展開し、共通の二次項が消えることを確認します。

---

# 9. 演習：問題の直後に解答

## Level A：基礎

### E1-01-A01 線形結合の分散

- Level: A
- 目安時間: 7分
- 主題: 分散共分散行列
- 使用技術: MV-LINEAR-1

平均 $\boldsymbol\mu=(1,2)^{\mathsf T}$、分散共分散行列

$$
\Sigma=\begin{pmatrix}4&3\\3&9\end{pmatrix}
$$

をもつ確率ベクトル $\boldsymbol X=(X_1,X_2)^{\mathsf T}$ を考える。$Z=X_1-2X_2$ の平均と分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\boldsymbol a=(1,-2)^{\mathsf T}$ とすると $Z=\boldsymbol a^{\mathsf T}\boldsymbol X$ である。したがって

$$
E[Z]
=\boldsymbol a^{\mathsf T}\boldsymbol\mu
=1-4=-3.
$$

分散は

$$
\begin{aligned}
\operatorname{Var}(Z)
&=\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a\\
&=\operatorname{Var}(X_1)+4\operatorname{Var}(X_2)-4\operatorname{Cov}(X_1,X_2)\\
&=4+4\cdot9-4\cdot3\\
&=28.
\end{aligned}
$$

##### 本番答案

$\boldsymbol a=(1,-2)^{\mathsf T}$ とすれば

$$
E[Z]=\boldsymbol a^{\mathsf T}\boldsymbol\mu=-3,
\qquad
\operatorname{Var}(Z)=\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a=28.
$$

##### 採点基準

- 線形結合の設定: 4点
- 平均: 6点
- 分散式: 6点
- 数値計算: 4点

<!-- solution-end -->

### E1-01-A02 標本平均ベクトル

- Level: A
- 目安時間: 8分
- 主題: 標本平均ベクトル
- 使用技術: MV-MEAN-1

$\boldsymbol X_1,\ldots,\boldsymbol X_{16}$ は独立で

$$
\boldsymbol X_i\sim N_2\left(
\begin{pmatrix}10\\20\end{pmatrix},
\begin{pmatrix}4&2\\2&9\end{pmatrix}
\right)
$$

に従う。標本平均ベクトル $\bar{\boldsymbol X}$ の分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

独立同分布標本なので

$$
E[\bar{\boldsymbol X}]
=\begin{pmatrix}10\\20\end{pmatrix},
$$

$$
\operatorname{Cov}(\bar{\boldsymbol X})
=\frac1{16}
\begin{pmatrix}4&2\\2&9\end{pmatrix}
=
\begin{pmatrix}1/4&1/8\\1/8&9/16\end{pmatrix}.
$$

独立な正規ベクトルの平均も正規なので

$$
\boxed{
\bar{\boldsymbol X}
\sim N_2\left(
\begin{pmatrix}10\\20\end{pmatrix},
\begin{pmatrix}1/4&1/8\\1/8&9/16\end{pmatrix}
\right)
}.
$$

##### 本番答案

独立性より $\operatorname{Cov}(\bar{\boldsymbol X})=\Sigma/16$。よって

$$
\bar{\boldsymbol X}\sim N_2\left(
(10,20)^{\mathsf T},
\begin{pmatrix}1/4&1/8\\1/8&9/16\end{pmatrix}
\right).
$$

##### 採点基準

- 平均: 4点
- 共分散を $\Sigma/n$ とする理由: 8点
- 数値行列: 4点
- 分布: 4点

<!-- solution-end -->

### E1-01-A03 Mahalanobis距離

- Level: A
- 目安時間: 8分
- 主題: Mahalanobis距離
- 使用技術: MV-DIST-1

平均 $\boldsymbol\mu=(0,0)^{\mathsf T}$、分散共分散行列

$$
\Sigma=\begin{pmatrix}4&0\\0&1\end{pmatrix}
$$

に対し、点 $\boldsymbol x=(2,2)^{\mathsf T}$ のMahalanobis距離の二乗を求めよ。同じ点のユークリッド距離の二乗と比較せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\Sigma^{-1}=\begin{pmatrix}1/4&0\\0&1\end{pmatrix}
$$

だから

$$
\begin{aligned}
D^2
&=\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x\\
&=\frac{2^2}{4}+2^2\\
&=5.
\end{aligned}
$$

一方ユークリッド距離の二乗は

$$
2^2+2^2=8.
$$

第1変数は標準偏差2なので、同じ「2」というずれでも第2変数より珍しくない。その尺度差をMahalanobis距離が補正している。

##### 本番答案

$\Sigma^{-1}=\operatorname{diag}(1/4,1)$ より $D^2=1+4=5$。ユークリッド距離の二乗は8。Mahalanobis距離は各方向の分散を補正する。

##### 採点基準

- 逆行列: 4点
- Mahalanobis距離: 8点
- ユークリッド距離: 3点
- 解釈: 5点

<!-- solution-end -->

### E1-01-A04 無相関と独立

- Level: A
- 目安時間: 7分
- 主題: 独立性
- 使用技術: 仮定確認

1. $(X,Y)$ が二変量正規分布に従い、$\operatorname{Cov}(X,Y)=0$ である。このとき独立か。
2. 正規性を仮定しない場合、共分散0だけから独立といえるか。

理由も答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. 二変量正規分布では、共分散0なら同時密度が周辺密度の積へ分解できるため独立である。
2. 一般分布では共分散0は線形な関係がないことしか保証せず、独立とは限らない。例えば対称な $X$ に対し $Y=X^2$ とすれば、条件によって $\operatorname{Cov}(X,Y)=0$ でも $Y$ は $X$ から決まる。

##### 本番答案

1. 独立。同時正規という仮定の下では無相関と独立が同値。2. 一般には独立とはいえない。

##### 採点基準

- 1の結論: 5点
- 正規性の役割: 5点
- 2の結論: 5点
- 反例または説明: 5点

<!-- solution-end -->

## Level B：標準技能

### E1-01-B01 線形変換後の分布

- Level: B
- 目安時間: 12分
- 主題: 多変量正規の線形変換
- 使用技術: MV-LINEAR-1

$$
\boldsymbol X\sim N_2\left(
\begin{pmatrix}1\\2\end{pmatrix},
\begin{pmatrix}2&1\\1&2\end{pmatrix}
\right)
$$

とする。

$$
A=\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad
\boldsymbol Y=A\boldsymbol X
$$

とするとき、$\boldsymbol Y$ の分布を求め、$Y_1,Y_2$ が独立か判定せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

平均は

$$
A\boldsymbol\mu
=\begin{pmatrix}3\\-1\end{pmatrix}.
$$

共分散は

$$
\begin{aligned}
A\Sigma A^{\mathsf T}
&=\begin{pmatrix}1&1\\1&-1\end{pmatrix}
\begin{pmatrix}2&1\\1&2\end{pmatrix}
\begin{pmatrix}1&1\\1&-1\end{pmatrix}\\
&=\begin{pmatrix}6&0\\0&2\end{pmatrix}.
\end{aligned}
$$

したがって

$$
\boldsymbol Y\sim N_2\left(
\begin{pmatrix}3\\-1\end{pmatrix},
\begin{pmatrix}6&0\\0&2\end{pmatrix}
\right).
$$

多変量正規で共分散0なので $Y_1,Y_2$ は独立である。

##### 本番答案

$E\boldsymbol Y=A\boldsymbol\mu=(3,-1)^{\mathsf T}$、$\operatorname{Cov}(\boldsymbol Y)=A\Sigma A^{\mathsf T}=\operatorname{diag}(6,2)$。よって $\boldsymbol Y\sim N_2((3,-1)^{\mathsf T},\operatorname{diag}(6,2))$。同時正規かつ無相関なので独立。

##### 採点基準

- 平均: 4点
- 共分散計算: 8点
- 分布: 4点
- 独立性: 4点

<!-- solution-end -->

### E1-01-B02 条件付き正規分布

- Level: B
- 目安時間: 12分
- 主題: 条件付き分布
- 使用技術: MV-COND-1

$$
\begin{pmatrix}X_1\\X_2\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}0\\0\end{pmatrix},
\begin{pmatrix}4&2\\2&9\end{pmatrix}
\right)
$$

とする。$X_1=2$ が観測されたときの $X_2$ の条件付き分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

ここでは $\Sigma_{11}=4$, $\Sigma_{21}=2$, $\Sigma_{22}=9$ である。条件付き平均は

$$
0+\frac24(2-0)=1.
$$

条件付き分散は

$$
9-\frac{2^2}{4}=8.
$$

したがって

$$
\boxed{X_2\mid(X_1=2)\sim N(1,8)}.
$$

##### 本番答案

条件付き正規公式より

$$
E[X_2\mid X_1=2]=2\cdot4^{-1}\cdot2=1,
$$

$$
\operatorname{Var}(X_2\mid X_1)=9-2\cdot4^{-1}\cdot2=8.
$$

よって $N(1,8)$。

##### 採点基準

- 条件付き平均: 8点
- 条件付き分散: 8点
- 分布: 4点

<!-- solution-end -->

### E1-01-B03 白色化変換

- Level: B
- 目安時間: 15分
- 主題: 白色化
- 使用技術: MV-WHITE-1

平均0、分散共分散行列

$$
\Sigma=\begin{pmatrix}3&1\\1&3\end{pmatrix}
$$

の確率ベクトル $\boldsymbol X$ を考える。

1. $\Sigma$ の固有値と単位固有ベクトルを求めよ。
2. $\Sigma=Q\Lambda Q^{\mathsf T}$ を用いて白色化行列 $A=\Lambda^{-1/2}Q^{\mathsf T}$ を構成せよ。
3. $\boldsymbol Z=A\boldsymbol X$ の共分散が $I_2$ になることを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

特性方程式は

$$
(3-\lambda)^2-1=0
$$

なので固有値は4と2。対応する単位固有ベクトルを

$$
\boldsymbol q_1=\frac1{\sqrt2}(1,1)^{\mathsf T},
\qquad
\boldsymbol q_2=\frac1{\sqrt2}(1,-1)^{\mathsf T}
$$

と取れる。

したがって

$$
Q=\frac1{\sqrt2}
\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad
\Lambda=\begin{pmatrix}4&0\\0&2\end{pmatrix},
$$

$$
\Lambda^{-1/2}
=\begin{pmatrix}1/2&0\\0&1/\sqrt2\end{pmatrix}.
$$

$A=\Lambda^{-1/2}Q^{\mathsf T}$ とすれば

$$
\begin{aligned}
A\Sigma A^{\mathsf T}
&=\Lambda^{-1/2}Q^{\mathsf T}
(Q\Lambda Q^{\mathsf T})Q\Lambda^{-1/2}\\
&=I_2.
\end{aligned}
$$

##### 本番答案

固有値は4,2、単位固有ベクトルは $(1,1)^{\mathsf T}/\sqrt2$, $(1,-1)^{\mathsf T}/\sqrt2$。よって $A=\Lambda^{-1/2}Q^{\mathsf T}$ と置けば $A\Sigma A^{\mathsf T}=I_2$。

##### 採点基準

- 固有値: 4点
- 固有ベクトル: 4点
- 白色化行列: 6点
- 共分散確認: 6点

<!-- solution-end -->

### E1-01-B04 線形判別境界

- Level: B
- 目安時間: 15分
- 主題: 線形判別分析
- 使用技術: MV-LDA-1

2群について

$$
\boldsymbol X\mid(G=g)\sim N_2(\boldsymbol\mu_g,I_2),
$$

$$
\boldsymbol\mu_1=(0,0)^{\mathsf T},
\qquad
\boldsymbol\mu_2=(2,1)^{\mathsf T}
$$

とし、事前確率は等しいとする。判別境界を求め、$\boldsymbol x=(1.5,0.2)^{\mathsf T}$ を分類せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

等事前確率・共通共分散なので、2群へのMahalanobis距離が等しい集合が境界である。

$$
\|\boldsymbol x-\boldsymbol\mu_1\|^2
=\|\boldsymbol x-\boldsymbol\mu_2\|^2.
$$

左辺は $x_1^2+x_2^2$、右辺は

$$
(x_1-2)^2+(x_2-1)^2
=x_1^2+x_2^2-4x_1-2x_2+5.
$$

よって

$$
4x_1+2x_2=5,
$$

すなわち

$$
\boxed{2x_1+x_2=\frac52}.
$$

点 $(1.5,0.2)$ では

$$
2(1.5)+0.2=3.2>2.5
$$

なので群2側に分類される。

##### 本番答案

距離等式を展開すると $2x_1+x_2=5/2$。点 $(1.5,0.2)$ では左辺3.2なので群2。

##### 採点基準

- 判別原理: 5点
- 距離式: 5点
- 境界導出: 6点
- 分類: 4点

<!-- solution-end -->

## Level C：本番標準

### E1-01-C01 標本平均と線形品質指標

- Level: C
- 目安時間: 25分
- 主題: 標本平均ベクトル
- 使用技術: MV-MEAN-1, MV-LINEAR-1

独立な $\boldsymbol X_1,\ldots,\boldsymbol X_n$ が

$$
N_2\left(
\begin{pmatrix}\mu_1\\\mu_2\end{pmatrix},
\begin{pmatrix}4&1\\1&9\end{pmatrix}
\right)
$$

に従う。品質指標を

$$
T=2\bar X_1-\bar X_2
$$

とする。

1. $\bar{\boldsymbol X}$ の分布を求めよ。
2. $T$ の平均と分散を求めよ。
3. $n=25$, $(\mu_1,\mu_2)=(3,4)$ のとき $P(T>2)$ を標準正規分布の累積分布関数 $\Phi$ を用いて表せ。
4. 共分散1を誤って0とすると、$T$ の分散を過大評価するか過小評価するか説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. 独立正規標本より

$$
\bar{\boldsymbol X}
\sim N_2\left(
\begin{pmatrix}\mu_1\\\mu_2\end{pmatrix},
\frac1n\begin{pmatrix}4&1\\1&9\end{pmatrix}
\right).
$$

2. $\boldsymbol c=(2,-1)^{\mathsf T}$ とすれば $T=\boldsymbol c^{\mathsf T}\bar{\boldsymbol X}$。したがって

$$
E[T]=2\mu_1-\mu_2.
$$

分散は

$$
\begin{aligned}
\operatorname{Var}(T)
&=\frac1n\boldsymbol c^{\mathsf T}\Sigma\boldsymbol c\\
&=\frac1n\{4\cdot4+1\cdot9+2(2)(-1)(1)\}\\
&=\frac{21}{n}.
\end{aligned}
$$

3. $n=25$, $E[T]=2$、分散は $21/25$。したがって

$$
P(T>2)=1-\Phi(0)=\frac12.
$$

4. 共分散項は $2(2)(-1)(1)=-4$ と分散を小さくする向きに働く。これを0とすると分散を $25/n$ としてしまい、本来の $21/n$ より過大評価する。

##### 本番答案

$\bar{\boldsymbol X}\sim N_2(\boldsymbol\mu,\Sigma/n)$。$\boldsymbol c=(2,-1)^{\mathsf T}$ より $E[T]=2\mu_1-\mu_2$, $\operatorname{Var}(T)=\boldsymbol c^{\mathsf T}\Sigma\boldsymbol c/n=21/n$。$n=25$, $\boldsymbol\mu=(3,4)^{\mathsf T}$ なら $P(T>2)=1/2$。共分散を無視すると分散を過大評価する。

##### 採点基準

- 標本平均分布: 5点
- 平均・分散: 7点
- 確率: 4点
- 共分散の解釈: 4点

<!-- solution-end -->

### E1-01-C02 Mahalanobis距離と確率楕円

- Level: C
- 目安時間: 25分
- 主題: Mahalanobis距離
- 使用技術: MV-DIST-1, MV-WHITE-1

$$
\boldsymbol X\sim N_2(\boldsymbol0,\Sigma),
\qquad
\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$

とする。

1. $\Sigma^{-1}$ を求めよ。
2. $D^2=\boldsymbol X^{\mathsf T}\Sigma^{-1}\boldsymbol X$ が $\chi_2^2$ 分布に従う理由を説明せよ。
3. 点 $(2,0)^{\mathsf T}$ の $D^2$ を求めよ。
4. $P(D^2\le c)=0.95$ となる $c$ を $\chi_2^2$ の0.95分位点 $\chi^2_{2;0.95}$ で表し、領域 $\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x\le c$ の意味を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. 行列式は $4-1=3$ なので

$$
\Sigma^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

2. $\Sigma$ は正定値なので $\boldsymbol Z=\Sigma^{-1/2}\boldsymbol X$ と置ける。線形変換則から

$$
\boldsymbol Z\sim N_2(\boldsymbol0,I_2).
$$

よって $Z_1,Z_2$ は独立標準正規で

$$
D^2=\boldsymbol X^{\mathsf T}\Sigma^{-1}\boldsymbol X
=\boldsymbol Z^{\mathsf T}\boldsymbol Z
=Z_1^2+Z_2^2\sim\chi_2^2.
$$

3.

$$
D^2=(2,0)\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\begin{pmatrix}2\\0\end{pmatrix}=\frac83.
$$

4. $c=\chi^2_{2;0.95}$。この不等式で囲まれる楕円は、母集団分布の確率95%を含むMahalanobis距離による中心領域である。

##### 本番答案

$\Sigma^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$。$\Sigma^{-1/2}\boldsymbol X\sim N_2(0,I)$ より $D^2\sim\chi_2^2$。$(2,0)$ では $D^2=8/3$。95%楕円は $\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x\le\chi^2_{2;0.95}$。

##### 採点基準

- 逆行列: 4点
- カイ二乗導出: 8点
- 数値距離: 4点
- 楕円の意味: 4点

<!-- solution-end -->

### E1-01-C03 条件付き予測と分散縮小

- Level: C
- 目安時間: 25分
- 主題: 条件付き正規分布
- 使用技術: MV-COND-1

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}10\\20\end{pmatrix},
\begin{pmatrix}4&3\\3&9\end{pmatrix}
\right)
$$

とする。

1. $E[Y\mid X=x]$ を求めよ。
2. $\operatorname{Var}(Y\mid X=x)$ を求めよ。
3. $x=12$ のときの条件付き分布を求めよ。
4. 条件付き分散が周辺分散9より小さくなる理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1.

$$
E[Y\mid X=x]
=20+\frac34(x-10).
$$

2.

$$
\operatorname{Var}(Y\mid X=x)
=9-\frac{3^2}{4}
=\frac{27}{4}.
$$

3. $x=12$ なら条件付き平均は

$$
20+\frac34\cdot2=\frac{43}{2}.
$$

したがって

$$
Y\mid(X=12)
\sim N\left(\frac{43}{2},\frac{27}{4}\right).
$$

4. $X$ と一緒に動く $Y$ の変動部分を $X$ の観測で説明できるため、その説明済み成分 $\sigma_{XY}^2/\sigma_X^2=9/4$ が周辺分散から差し引かれる。

##### 本番答案

$E[Y\mid X=x]=20+(3/4)(x-10)$、$\operatorname{Var}(Y\mid X)=9-9/4=27/4$。$X=12$ なら $N(43/2,27/4)$。条件付けにより $X$ と共変動する成分が説明されるため分散が減る。

##### 採点基準

- 条件付き平均: 6点
- 条件付き分散: 6点
- 数値分布: 4点
- 解釈: 4点

<!-- solution-end -->

### E1-01-C04 正規密度から線形判別を導く

- Level: C
- 目安時間: 30分
- 主題: 線形判別分析
- 使用技術: MV-LDA-1

2群 $g=1,2$ について、群 $g$ の事前確率を $\pi_g>0$、条件付き分布を

$$
\boldsymbol X\mid(G=g)
\sim N_p(\boldsymbol\mu_g,\Sigma)
$$

とする。$\Sigma$ は2群で共通の正定値行列である。群 $g$ の確率密度関数を

$$
f_g(\boldsymbol x)
=\frac{1}{(2\pi)^{p/2}|\Sigma|^{1/2}}
\exp\left\{-\frac12
(\boldsymbol x-\boldsymbol\mu_g)^{\mathsf T}
\Sigma^{-1}
(\boldsymbol x-\boldsymbol\mu_g)
\right\}
$$

とする。

1. Bayes則から分類時に $\pi_gf_g(\boldsymbol x)$ を比較すればよい理由を述べよ。
2. $\log\{\pi_gf_g(\boldsymbol x)\}$ を展開し、群に依存しない項を除いて判別関数 $\delta_g(\boldsymbol x)$ を導け。
3. なぜ境界が線形になるか説明せよ。
4. 群ごとに分散共分散行列 $\Sigma_g$ が異なる場合、境界が一般に二次になる理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. Bayes則より

$$
P(G=g\mid\boldsymbol X=\boldsymbol x)
=\frac{\pi_gf_g(\boldsymbol x)}
{\sum_h\pi_hf_h(\boldsymbol x)}.
$$

分母は群 $g$ に依存しないので、事後確率最大化は $\pi_gf_g(\boldsymbol x)$ 最大化と同値である。

2. 対数を取ると

$$
\log\pi_g-(p/2)\log(2\pi)-\frac12\log|\Sigma|
-\frac12(\boldsymbol x-\boldsymbol\mu_g)^{\mathsf T}\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu_g).
$$

二次形式を展開すると

$$
\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x
-2\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol x
+\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol\mu_g.
$$

群共通項を除けば

$$
\boxed{
\delta_g(\boldsymbol x)
=\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol x
-\frac12\boldsymbol\mu_g^{\mathsf T}\Sigma^{-1}\boldsymbol\mu_g
+\log\pi_g
}.
$$

3. $\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x$ が群間で共通なので比較時に消え、$\boldsymbol x$ の一次項だけが残るからである。

4. $\Sigma_g$ が群ごとに異なると $\boldsymbol x^{\mathsf T}\Sigma_g^{-1}\boldsymbol x$ が相殺されず、二次項が残る。

##### 本番答案

Bayes則の分母は群共通なので $\pi_gf_g$ を比較する。対数密度の二次形式を展開し群共通項を除くと

$$
\delta_g=\mu_g^{\mathsf T}\Sigma^{-1}x-(1/2)\mu_g^{\mathsf T}\Sigma^{-1}\mu_g+\log\pi_g.
$$

共通 $\Sigma$ では $x^{\mathsf T}\Sigma^{-1}x$ が消えるため線形。$\Sigma_g$ が異なると二次項が残る。

##### 採点基準

- Bayes則: 4点
- 対数密度展開: 7点
- 判別関数: 5点
- 線形・二次の説明: 4点

<!-- solution-end -->

## Level D：発展

### E1-01-D01 白色化は一意ではない

- Level: D
- 目安時間: 35分
- 主題: 白色化
- 使用技術: 直交変換

正定値な分散共分散行列 $\Sigma$ をもつ中心化済み確率ベクトル $\boldsymbol X$ を考える。ある行列 $A$ が

$$
A\Sigma A^{\mathsf T}=I_p
$$

を満たすとする。

1. 任意の直交行列 $R$ に対して $RA$ も白色化行列であることを示せ。
2. したがって白色化が一意でないことを説明せよ。
3. $\Sigma=Q\Lambda Q^{\mathsf T}$ に対する $A=\Lambda^{-1/2}Q^{\mathsf T}$ と、対称白色化 $A_s=Q\Lambda^{-1/2}Q^{\mathsf T}$ がともに白色化になることを確認せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. $R$ が直交行列なら $RR^{\mathsf T}=I_p$。したがって

$$
\begin{aligned}
(RA)\Sigma(RA)^{\mathsf T}
&=RA\Sigma A^{\mathsf T}R^{\mathsf T}\\
&=R I_p R^{\mathsf T}\\
&=I_p.
\end{aligned}
$$

よって $RA$ も白色化行列である。

2. $R$ を変えれば一般に異なる行列 $RA$ が得られるので、共分散を単位行列にするという条件だけでは変換は一意に定まらない。

3. $A=\Lambda^{-1/2}Q^{\mathsf T}$ では5節の計算より白色化される。対称白色化では

$$
\begin{aligned}
A_s\Sigma A_s^{\mathsf T}
&=Q\Lambda^{-1/2}Q^{\mathsf T}
Q\Lambda Q^{\mathsf T}
Q\Lambda^{-1/2}Q^{\mathsf T}\\
&=QIQ^{\mathsf T}\\
&=I.
\end{aligned}
$$

##### 本番答案

$R$ 直交なら $(RA)\Sigma(RA)^{\mathsf T}=R(A\Sigma A^{\mathsf T})R^{\mathsf T}=I$。よって白色化は直交回転の自由度をもち一意でない。$\Lambda^{-1/2}Q^{\mathsf T}$ と $Q\Lambda^{-1/2}Q^{\mathsf T}$ はともに直接代入で共分散 $I$ を与える。

##### 採点基準

- 直交変換の証明: 8点
- 非一意性の説明: 5点
- 2種類の確認: 7点

<!-- solution-end -->

## 10. 30分ドリル

### E1-01-DRILL-01 多変量正規の幾何から判別まで

$$
\boldsymbol X\mid(G=g)
\sim N_2(\boldsymbol\mu_g,\Sigma),
\qquad
\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix},
$$

$$
\boldsymbol\mu_1=(0,0)^{\mathsf T},
\qquad
\boldsymbol\mu_2=(2,0)^{\mathsf T},
\qquad
\pi_1=\pi_2=\frac12
$$

とする。

1. $\Sigma^{-1}$ を求めよ。
2. $\boldsymbol x=(1,1)^{\mathsf T}$ の各群中心からのMahalanobis距離の二乗を求めよ。
3. 等事前確率の線形判別境界を求めよ。
4. $\boldsymbol x=(1,1)^{\mathsf T}$ が境界上にあるか判定せよ。
5. $n$ 個の群1標本の平均ベクトルの分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\Sigma^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

群1からは

$$
D_1^2=(1,1)\Sigma^{-1}(1,1)^{\mathsf T}=\frac23.
$$

群2では差が $(-1,1)^{\mathsf T}$ なので

$$
D_2^2=(-1,1)\Sigma^{-1}(-1,1)^{\mathsf T}=2.
$$

したがって点 $(1,1)$ は群1側である。

境界は

$$
(\boldsymbol\mu_2-\boldsymbol\mu_1)^{\mathsf T}\Sigma^{-1}\boldsymbol x
=\frac12\left(
\boldsymbol\mu_2^{\mathsf T}\Sigma^{-1}\boldsymbol\mu_2
-\boldsymbol\mu_1^{\mathsf T}\Sigma^{-1}\boldsymbol\mu_1
\right).
$$

左辺は

$$
(2,0)\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\begin{pmatrix}x_1\\x_2\end{pmatrix}
=\frac{4x_1-2x_2}{3},
$$

右辺は

$$
\frac12\cdot\frac83=\frac43.
$$

よって境界は

$$
2x_1-x_2=2.
$$

$(1,1)$ では左辺1なので境界上ではない。

群1からの独立標本平均は

$$
\bar{\boldsymbol X}\sim N_2\left(
\boldsymbol0,\frac1n\begin{pmatrix}2&1\\1&2\end{pmatrix}
\right).
$$

##### 本番答案

$\Sigma^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$。$(1,1)$ では $D_1^2=2/3$, $D_2^2=2$ なので群1側。判別境界は $2x_1-x_2=2$。点は境界上でない。群1標本平均は $N_2(0,\Sigma/n)$。

##### 採点基準

- 逆行列: 15点
- 2距離: 20点
- 境界: 30点
- 点の判定: 15点
- 標本平均分布: 20点

<!-- solution-end -->

## 11. 過去問・理工80との対応

本章は理工80の次の論点への基礎教材です。

- No.65 多変量正規分布：線形変換・平均ベクトル・分散共分散行列・独立性
- No.66 多変量正規分布の条件付き分布・条件付き期待値
- No.67 Mahalanobis距離・標準化・相関行列による幾何
- No.69 線形判別分析：共通分散共分散行列をもつ正規2群
- No.70 共分散・相関行列の固有構造と白色化変換

確率分布そのものの定義と条件付き正規の基礎導出はP3-03、固有値による次元圧縮はE1-02で扱います。

## 12. 章末チェック

- $A\Sigma A^{\mathsf T}$ を成分暗記ではなく共分散の定義から説明できる。
- $\bar{\boldsymbol X}$ の共分散が $\Sigma/n$ になる理由を独立性から説明できる。
- Mahalanobis距離が「白色化後のユークリッド距離」だと説明できる。
- 多変量正規ならMahalanobis距離の二乗がカイ二乗分布になる理由を白色化から示せる。
- 白色化を「中心化 → 固有方向へ回転 → 尺度調整」の順に構成できる。
- $\Sigma^{-1/2}$ と $\Lambda^{-1/2}Q^{\mathsf T}$ が異なる白色化を与えうる理由を説明できる。
- 条件付き正規分布を「線形予測＋残差」に分解し、残差共分散を導出できる。
- 同時正規のときに限って無相関から独立を結論できる。
- LDAを白色化空間での群中心への距離比較として説明できる。
- 共通共分散の正規2群から線形判別関数と判別方向 $\Sigma^{-1}(\boldsymbol\mu_2-\boldsymbol\mu_1)$ を導ける。
