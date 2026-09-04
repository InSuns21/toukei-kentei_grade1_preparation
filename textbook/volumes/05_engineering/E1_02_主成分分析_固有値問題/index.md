# E1-02 主成分分析・固有値問題

主成分分析は、多数の変数を「情報をなるべく失わずに少数の軸へまとめる」方法です。最初から固有値・固有ベクトルの公式として学ぶと、なぜその固有ベクトルを使うのか、なぜ固有値が分散になるのか、なぜ寄与率を固有値で計算するのかが分断されます。

本章では、中心化した確率ベクトルを1本の方向へ射影し、**その射影分散を最大にする**という出発点から主成分分析を導きます。Lagrange未定乗数法から固有値問題が現れること、主成分が互いに無相関になること、全分散が固有値の和になること、低次元再構成の平均二乗誤差が捨てた固有値の和になることまでを一つにつなげます。さらに、分散共分散行列主成分分析と相関行列主成分分析、白色化との違い、線形判別分析との目的の違いも整理します。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 「最大分散方向」という定義から主成分の固有値問題を導ける。
- 2次元・3次元の小さな分散共分散行列について固有値・固有ベクトルを手計算できる。
- 主成分得点、主成分分散、主成分間共分散を計算できる。
- 寄与率・累積寄与率を固有値から求め、その意味を説明できる。
- 全分散が $\operatorname{tr}(\Sigma)$ であり固有値の和に等しいことを示せる。
- 上位主成分だけを使った再構成を直交射影として表し、再構成誤差を求められる。
- 分散共分散行列主成分分析と相関行列主成分分析を単位・尺度から使い分けられる。
- 主成分分析・白色化・線形判別分析の目的の違いを説明できる。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 固有値・固有ベクトル | 主成分方向、直交固有分解、低次元部分空間 |
| 分散共分散行列 | 最大分散方向、主成分分散、全分散 |
| 相関行列 | 標準化後の主成分分析、尺度依存性 |
| 主成分分析 | 主成分得点、寄与率、累積寄与率、再構成 |
| 多変量解析法への接続 | 白色化、線形判別分析との比較 |

## 前提知識チェック

1. E1-01: 分散共分散行列、線形結合の分散、固有分解と白色化。
2. F0-00: 対称行列の固有値・固有ベクトル、直交行列、Lagrange未定乗数法。
3. P2-02: 分散、共分散、期待値。

---

## 1. 主成分分析は何を最大化しているのか

平均 $\boldsymbol\mu$ をもつ $p$次元確率ベクトル $\boldsymbol X$ を中心化して

$$
\boldsymbol X_c=\boldsymbol X-\boldsymbol\mu
$$

とします。分散共分散行列を $\Sigma$ とします。

ある方向 $\boldsymbol a$ へ射影した1変量

$$
Z=\boldsymbol a^{\mathsf T}\boldsymbol X_c
$$

を考えます。E1-01より

$$
\operatorname{Var}(Z)
=\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a.
$$

ただし $\boldsymbol a$ の長さを自由にすると、$\boldsymbol a$ を2倍するだけで分散は4倍になってしまいます。そこで「方向だけ」を比較するため

$$
\boldsymbol a^{\mathsf T}\boldsymbol a=1
$$

を課します。

第1主成分方向は

$$
\text{maximize }
\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a
\qquad
\text{subject to }
\boldsymbol a^{\mathsf T}\boldsymbol a=1
$$

を解く方向です。

---

## 2. なぜ固有値問題になるのか

Lagrange未定乗数を $\lambda$ とし

$$
L(\boldsymbol a,\lambda)
=\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a
-\lambda(\boldsymbol a^{\mathsf T}\boldsymbol a-1)
$$

とします。

$\Sigma$ は対称なので

$$
\nabla_{\boldsymbol a}
(\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a)
=2\Sigma\boldsymbol a,
$$

$$
\nabla_{\boldsymbol a}
(\boldsymbol a^{\mathsf T}\boldsymbol a)
=2\boldsymbol a.
$$

停留条件は

$$
2\Sigma\boldsymbol a-2\lambda\boldsymbol a=0,
$$

したがって

$$
\boxed{
\Sigma\boldsymbol a=\lambda\boldsymbol a
}.
$$

つまり主成分方向は $\Sigma$ の固有ベクトルです。

さらに左から $\boldsymbol a^{\mathsf T}$ を掛け、$\|\boldsymbol a\|=1$ を使うと

$$
\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a
=\lambda\boldsymbol a^{\mathsf T}\boldsymbol a
=\lambda.
$$

したがって、その方向へ射影した分散は固有値そのものです。最大分散を得るには最大固有値 $\lambda_1$ に対応する単位固有ベクトル $\boldsymbol a_1$ を選べばよいことが分かります。

$$
Z_1=\boldsymbol a_1^{\mathsf T}\boldsymbol X_c
$$

を第1主成分と呼びます。

---

## 3. 第2主成分以降と直交性

第2主成分は、第1主成分と重複した方向を選ばないよう

$$
\boldsymbol a_2^{\mathsf T}\boldsymbol a_1=0
$$

を課した上で分散を最大にする方向です。

$\Sigma$ は実対称行列なので、固有ベクトルを互いに直交する単位ベクトルとして選べます。固有値を

$$
\lambda_1\ge\lambda_2\ge\cdots\ge\lambda_p\ge0
$$

と並べ、対応する単位固有ベクトルを

$$
\boldsymbol a_1,\ldots,\boldsymbol a_p
$$

とします。

主成分を

$$
Z_j=\boldsymbol a_j^{\mathsf T}\boldsymbol X_c
$$

とすると

$$
\operatorname{Var}(Z_j)=\lambda_j.
$$

また $i\ne j$ に対して

$$
\begin{aligned}
\operatorname{Cov}(Z_i,Z_j)
&=\boldsymbol a_i^{\mathsf T}\Sigma\boldsymbol a_j\\
&=\boldsymbol a_i^{\mathsf T}(\lambda_j\boldsymbol a_j)\\
&=\lambda_j\boldsymbol a_i^{\mathsf T}\boldsymbol a_j\\
&=0.
\end{aligned}
$$

よって主成分は互いに無相関です。

**無相関であることは主成分分析の線形代数から従い、正規性は不要**です。ただし元のベクトルが多変量正規なら、主成分ベクトルも同時正規なので、無相関から独立まで言えます。

---

## 4. 行列でまとめる：回転としての主成分分析

固有ベクトルを列に並べた直交行列を

$$
A=(\boldsymbol a_1,\ldots,\boldsymbol a_p)
$$

とし

$$
\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_p)
$$

とすると、スペクトル分解は

$$
\Sigma=A\Lambda A^{\mathsf T}
$$

です。

主成分ベクトルを

$$
\boldsymbol Z=A^{\mathsf T}\boldsymbol X_c
$$

とすれば

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol Z)
&=A^{\mathsf T}\Sigma A\\
&=A^{\mathsf T}(A\Lambda A^{\mathsf T})A\\
&=\Lambda.
\end{aligned}
$$

つまり主成分分析は、**分散共分散行列が対角になるよう座標軸を直交回転する操作**です。

白色化との違いにも注意します。

- 主成分分析: $A^{\mathsf T}$ で回転し、共分散を $\Lambda$ にする。
- 白色化: さらに $\Lambda^{-1/2}$ で尺度調整し、共分散を $I$ にする。

---

## 5. 固有値の和は全分散

元の変数の総ばらつきを、各成分の分散の和

$$
\operatorname{tr}(\Sigma)
=\sum_{j=1}^p\operatorname{Var}(X_j)
$$

で測ります。

固有分解より

$$
\Sigma=A\Lambda A^{\mathsf T}
$$

なので、トレースの循環性を使うと

$$
\begin{aligned}
\operatorname{tr}(\Sigma)
&=\operatorname{tr}(A\Lambda A^{\mathsf T})\\
&=\operatorname{tr}(A^{\mathsf T}A\Lambda)\\
&=\operatorname{tr}(\Lambda)\\
&=\sum_{j=1}^p\lambda_j.
\end{aligned}
$$

したがって全分散は主成分分散の和と等しいです。

第 $j$ 主成分の寄与率を

$$
\boxed{
\frac{\lambda_j}{\sum_{k=1}^p\lambda_k}
}
$$

と定義し、第 $m$ 主成分までの累積寄与率を

$$
\boxed{
\frac{\sum_{j=1}^m\lambda_j}
{\sum_{k=1}^p\lambda_k}
}
$$

とします。

例えば固有値が $6,2$ なら全分散は8、第1主成分の寄与率は $6/8=0.75$ です。

---

## 6. 2変量の具体例

$$
\Sigma=
\begin{pmatrix}4&2\\2&4\end{pmatrix}
$$

を考えます。

特性方程式は

$$
\begin{aligned}
0
&=\det(\Sigma-\lambda I)\\
&=(4-\lambda)^2-4\\
&=(\lambda-6)(\lambda-2).
\end{aligned}
$$

したがって

$$
\lambda_1=6,
\qquad
\lambda_2=2.
$$

$\lambda_1=6$ に対して

$$
(4-6)a_1+2a_2=0
$$

より $a_1=a_2$。単位長へ正規化して

$$
\boldsymbol a_1
=\frac1{\sqrt2}
\begin{pmatrix}1\\1\end{pmatrix}.
$$

同様に

$$
\boldsymbol a_2
=\frac1{\sqrt2}
\begin{pmatrix}1\\-1\end{pmatrix}.
$$

したがって

$$
Z_1=\frac{X_1+X_2}{\sqrt2},
\qquad
Z_2=\frac{X_1-X_2}{\sqrt2}.
$$

$X_1,X_2$ が正に共変動するため、「和」の方向に大きな分散6、「差」の方向に小さな分散2があります。

---

## 7. 主成分得点と負荷量を区別する

実データでは、観測 $i$ の中心化ベクトルを $\boldsymbol x_i-\bar{\boldsymbol x}$ とします。

第 $j$ 主成分の**主成分得点**は

$$
z_{ij}
=\boldsymbol a_j^{\mathsf T}
(\boldsymbol x_i-\bar{\boldsymbol x})
$$

です。これは「観測 $i$ が第 $j$ 主成分軸のどこに位置するか」を表します。

一方、$\boldsymbol a_j$ の各成分は元変数をどの重みで組み合わせるかを表します。文献によって「負荷量」を固有ベクトル成分そのものと呼ぶ場合と、元変数と主成分の相関

$$
\operatorname{Corr}(X_k,Z_j)
$$

に対応する量として定義する場合があります。答案では、問題文の定義を確認せず「負荷量」という語だけから式を決めないことが重要です。

---

## 8. 低次元再構成は直交射影

上位 $m$ 個の固有ベクトルを並べた行列を

$$
A_m=(\boldsymbol a_1,\ldots,\boldsymbol a_m)
$$

とします。

中心化ベクトル $\boldsymbol X_c$ の上位 $m$ 主成分得点は

$$
\boldsymbol Z_m=A_m^{\mathsf T}\boldsymbol X_c.
$$

これだけから元空間へ戻す再構成は

$$
\widehat{\boldsymbol X}_c
=A_m\boldsymbol Z_m
=A_mA_m^{\mathsf T}\boldsymbol X_c.
$$

$A_mA_m^{\mathsf T}$ は上位主成分部分空間への直交射影行列です。

完全な固有ベクトル基底を使えば

$$
\boldsymbol X_c
=\sum_{j=1}^p\boldsymbol a_jZ_j.
$$

上位 $m$ 成分だけ残すと

$$
\widehat{\boldsymbol X}_c
=\sum_{j=1}^m\boldsymbol a_jZ_j,
$$

誤差は

$$
\boldsymbol X_c-\widehat{\boldsymbol X}_c
=\sum_{j=m+1}^p\boldsymbol a_jZ_j.
$$

固有ベクトルは直交するので

$$
\left\|\boldsymbol X_c-\widehat{\boldsymbol X}_c\right\|^2
=\sum_{j=m+1}^pZ_j^2.
$$

期待値を取れば、中心化済みなので $E[Z_j]=0$ より

$$
\boxed{
E\left\|\boldsymbol X_c-\widehat{\boldsymbol X}_c\right\|^2
=\sum_{j=m+1}^p\lambda_j
}.
$$

つまり捨てた主成分の固有値の和が平均二乗再構成誤差です。

---

## 9. 分散共分散行列か相関行列か

### 9.1 分散共分散行列主成分分析

元の測定単位を保ったまま中心化し、標本分散共分散行列の固有分解を行います。

変数間で単位が同じ、または分散の大小自体に意味がある場合に自然です。

### 9.2 相関行列主成分分析

各変数を

$$
Z_j=\frac{X_j-\mu_j}{\sigma_j}
$$

と標準化した後、その分散共分散行列、すなわち相関行列の固有分解を行います。

温度と圧力のように単位が違う場合、あるいは測定尺度の違いだけで大分散の変数が第1主成分を支配するのを避けたい場合に使います。

相関行列の対角成分はすべて1なので

$$
\operatorname{tr}(R)=p.
$$

したがって相関行列主成分分析では固有値の和は $p$ です。

---

## 10. 主成分分析・白色化・判別分析の違い

### 10.1 主成分分析

群ラベルを使わず、全体の分散が大きい方向を探します。目的は次元圧縮や構造要約です。

### 10.2 白色化

共分散を単位行列へ変換することが目的です。主成分分析の回転に加えて、固有値の平方根で尺度調整します。

### 10.3 線形判別分析

群ラベルを使い、群を分離しやすい方向を探します。全体分散が最大の方向が、必ずしも群分離に最適とは限りません。

したがって「固有値問題が出てくる」という見た目だけで同じ方法だと考えないことが重要です。

---

## 11. 問題解決パターン

### 主成分分析-START-1：目的関数から始める

「第1主成分を求めよ」と言われても、いきなり固有ベクトルを置かず

$$
\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)
=\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a
$$

を最大化する問題から出発します。

### 主成分分析-EIGEN-1：特性方程式→固有ベクトル→正規化

2次元では

$$
\det(\Sigma-\lambda I)=0
$$

を展開し、各固有値について $(\Sigma-\lambda I)\boldsymbol a=0$ を解き、最後に単位長へ正規化します。

### 主成分分析-VAR-1：固有値は主成分分散

固有値を求めた後、別途分散を一から計算し直す必要はありません。ただし「単位固有ベクトルなら $\operatorname{Var}(Z_j)=\lambda_j$」を答案に残します。

### 主成分分析-RATIO-1：分母は全固有値の和

寄与率は $\lambda_j/\sum_k\lambda_k$。相関行列主成分分析なら分母は $p$ になります。

### 主成分分析-RECON-1：再構成は射影

上位 $m$ 主成分による再構成は $A_mA_m^{\mathsf T}\boldsymbol X_c$。捨てる誤差は残りの固有値の和です。

### 主成分分析-SCALE-1：単位を先に確認

単位や尺度が異なる変数なら、分散共分散行列主成分分析が妥当か、相関行列主成分分析にすべきかを先に判断します。

---

# 12. 演習：問題の直後に解答

## Level A：基礎

### E1-02-A01 最大分散から固有値問題

- Level: A
- 目安時間: 8分
- 主題: 主成分の定義
- 使用技術: 主成分分析-START-1

中心化済み確率ベクトル $\boldsymbol X$ の分散共分散行列を $\Sigma$ とする。単位ベクトル $\boldsymbol a$ に対し $Z=\boldsymbol a^{\mathsf T}\boldsymbol X$ とする。

1. $\operatorname{Var}(Z)$ を求めよ。
2. これを最大化する問題へLagrange未定乗数法を適用し、$\Sigma\boldsymbol a=\lambda\boldsymbol a$ を導け。
3. 最大固有値に対応する単位固有ベクトルが第1主成分方向になる理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1.

$$
\operatorname{Var}(Z)
=\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a.
$$

2. 制約 $\boldsymbol a^{\mathsf T}\boldsymbol a=1$ の下で

$$
L=\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a
-\lambda(\boldsymbol a^{\mathsf T}\boldsymbol a-1)
$$

と置く。$\Sigma$ は対称なので

$$
\nabla_{\boldsymbol a}L
=2\Sigma\boldsymbol a-2\lambda\boldsymbol a.
$$

0と置けば

$$
\Sigma\boldsymbol a=\lambda\boldsymbol a.
$$

3. 左から $\boldsymbol a^{\mathsf T}$ を掛けると

$$
\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a
=\lambda
$$

なので、固有値がその方向の分散になる。最大分散には最大固有値を選ぶ。

##### 本番答案

$\operatorname{Var}(a^{\mathsf T}X)=a^{\mathsf T}\Sigma a$。$a^{\mathsf T}a=1$ の下でLagrange法を使うと $2\Sigma a-2\lambda a=0$、よって $\Sigma a=\lambda a$。このとき分散は $\lambda$ なので最大固有値の固有ベクトルが第1主成分方向。

##### 採点基準

- 分散: 4点
- Lagrange関数: 5点
- 停留条件: 6点
- 最大固有値の解釈: 5点

<!-- solution-end -->

### E1-02-A02 2変量主成分

- Level: A
- 目安時間: 10分
- 主題: 固有値・固有ベクトル
- 使用技術: 主成分分析-EIGEN-1

$$
\Sigma=\begin{pmatrix}4&2\\2&4\end{pmatrix}
$$

について、固有値と単位固有ベクトルを求め、第1・第2主成分を $X_1,X_2$ で表せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

特性方程式は

$$
(4-\lambda)^2-4=0
$$

なので

$$
\lambda_1=6,
\qquad
\lambda_2=2.
$$

$\lambda_1=6$ では $a_1=a_2$、$\lambda_2=2$ では $a_1=-a_2$。単位長へ正規化して

$$
\boldsymbol a_1=\frac1{\sqrt2}(1,1)^{\mathsf T},
\qquad
\boldsymbol a_2=\frac1{\sqrt2}(1,-1)^{\mathsf T}.
$$

よって

$$
Z_1=\frac{X_1+X_2}{\sqrt2},
\qquad
Z_2=\frac{X_1-X_2}{\sqrt2}.
$$

##### 本番答案

固有値6,2。対応する単位固有ベクトルは $(1,1)^{\mathsf T}/\sqrt2$, $(1,-1)^{\mathsf T}/\sqrt2$。したがって $Z_1=(X_1+X_2)/\sqrt2$, $Z_2=(X_1-X_2)/\sqrt2$。

##### 採点基準

- 特性方程式: 5点
- 固有値: 4点
- 固有ベクトル: 6点
- 主成分式: 5点

<!-- solution-end -->

### E1-02-A03 寄与率

- Level: A
- 目安時間: 7分
- 主題: 寄与率
- 使用技術: 主成分分析-RATIO-1

3変量の分散共分散行列の固有値が $8,3,1$ である。

1. 全分散を求めよ。
2. 各主成分の寄与率を求めよ。
3. 第2主成分までの累積寄与率を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

全分散は固有値の和なので

$$
8+3+1=12.
$$

寄与率は

$$
\frac8{12}=\frac23,
\qquad
\frac3{12}=\frac14,
\qquad
\frac1{12}.
$$

第2主成分までの累積寄与率は

$$
\frac{8+3}{12}=\frac{11}{12}.
$$

##### 本番答案

全分散12。寄与率は $2/3,1/4,1/12$。第2主成分までの累積寄与率は $11/12$。

##### 採点基準

- 全分散: 4点
- 各寄与率: 9点
- 累積寄与率: 7点

<!-- solution-end -->

### E1-02-A04 分散共分散行列か相関行列か

- Level: A
- 目安時間: 8分
- 主題: 尺度選択
- 使用技術: 主成分分析-SCALE-1

次の2つの状況で、分散共分散行列主成分分析と相関行列主成分分析のどちらが自然か、理由とともに答えよ。

1. 同じ単位で測った5種類の化学濃度で、実際のばらつきの大きさも重要である。
2. 温度（℃）、圧力（kPa）、流量（L/min）を同時に要約したい。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. 同じ単位で、分散の大小自体に意味があるので分散共分散行列主成分分析が自然。
2. 単位・尺度が異なり、大きな数値尺度だけが支配するのを避けたいので標準化して相関行列主成分分析が自然。

##### 本番答案

1. 分散共分散行列。2. 相関行列。2では単位差を標準化で除く必要がある。

##### 採点基準

- 1の選択: 5点
- 1の理由: 5点
- 2の選択: 5点
- 2の理由: 5点

<!-- solution-end -->

## Level B：標準技能

### E1-02-B01 主成分間の共分散

- Level: B
- 目安時間: 10分
- 主題: 主成分の直交性
- 使用技術: 主成分分析-VAR-1

$\Sigma$ の異なる固有値 $\lambda_i,\lambda_j$ に対応する単位固有ベクトルを $\boldsymbol a_i,\boldsymbol a_j$ とし、$\boldsymbol a_i^{\mathsf T}\boldsymbol a_j=0$ とする。$Z_i=\boldsymbol a_i^{\mathsf T}\boldsymbol X_c$, $Z_j=\boldsymbol a_j^{\mathsf T}\boldsymbol X_c$ とするとき、$\operatorname{Cov}(Z_i,Z_j)=0$ を示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\begin{aligned}
\operatorname{Cov}(Z_i,Z_j)
&=\boldsymbol a_i^{\mathsf T}\Sigma\boldsymbol a_j\\
&=\boldsymbol a_i^{\mathsf T}(\lambda_j\boldsymbol a_j)\\
&=\lambda_j\boldsymbol a_i^{\mathsf T}\boldsymbol a_j\\
&=0.
\end{aligned}
$$

正規性は使っていないので、主成分が無相関になる性質は分散共分散行列と固有ベクトルの直交性だけから従う。

##### 本番答案

$\operatorname{Cov}(Z_i,Z_j)=a_i^{\mathsf T}\Sigma a_j=\lambda_j a_i^{\mathsf T}a_j=0$。

##### 採点基準

- 共分散式: 6点
- 固有方程式の利用: 6点
- 直交性: 4点
- 正規性不要の説明: 4点

<!-- solution-end -->

### E1-02-B02 全分散とトレース

- Level: B
- 目安時間: 12分
- 主題: 全分散
- 使用技術: 固有分解

$\Sigma=A\Lambda A^{\mathsf T}$、$A^{\mathsf T}A=I$ とする。$\operatorname{tr}(\Sigma)=\sum_j\lambda_j$ を示し、この式が寄与率の分母になる理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

トレースの循環性から

$$
\begin{aligned}
\operatorname{tr}(\Sigma)
&=\operatorname{tr}(A\Lambda A^{\mathsf T})\\
&=\operatorname{tr}(A^{\mathsf T}A\Lambda)\\
&=\operatorname{tr}(\Lambda)\\
&=\sum_j\lambda_j.
\end{aligned}
$$

一方 $\operatorname{tr}(\Sigma)$ は元変数の分散の和なので全分散である。各主成分分散は $\lambda_j$ だから、全分散のうち第 $j$ 主成分が担う割合は $\lambda_j/\sum_k\lambda_k$ となる。

##### 本番答案

$\operatorname{tr}(A\Lambda A^{\mathsf T})=\operatorname{tr}(A^{\mathsf T}A\Lambda)=\operatorname{tr}\Lambda=\sum\lambda_j$。トレースは元変数の分散和、固有値は主成分分散なので、その比が寄与率。

##### 採点基準

- トレース変形: 10点
- 全分散の意味: 5点
- 寄与率への接続: 5点

<!-- solution-end -->

### E1-02-B03 1主成分再構成

- Level: B
- 目安時間: 15分
- 主題: 再構成
- 使用技術: 主成分分析-RECON-1

中心化済み2変量ベクトルで

$$
\boldsymbol a_1=\frac1{\sqrt2}(1,1)^{\mathsf T},
\qquad
\boldsymbol a_2=\frac1{\sqrt2}(1,-1)^{\mathsf T},
$$

固有値が $\lambda_1=6$, $\lambda_2=2$ とする。

1. 第1主成分だけからの再構成を $\widehat{\boldsymbol X}=\boldsymbol a_1\boldsymbol a_1^{\mathsf T}\boldsymbol X$ と書ける理由を説明せよ。
2. 射影行列 $P_1=\boldsymbol a_1\boldsymbol a_1^{\mathsf T}$ を具体的に求めよ。
3. 平均二乗再構成誤差を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

第1主成分得点は $Z_1=\boldsymbol a_1^{\mathsf T}\boldsymbol X$。これを第1主成分方向へ戻すと

$$
\widehat{\boldsymbol X}
=\boldsymbol a_1Z_1
=\boldsymbol a_1\boldsymbol a_1^{\mathsf T}\boldsymbol X.
$$

射影行列は

$$
P_1
=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

捨てるのは第2主成分だけなので

$$
E\|\boldsymbol X-\widehat{\boldsymbol X}\|^2
=\lambda_2=2.
$$

##### 本番答案

$Z_1=a_1^{\mathsf T}X$ より $\hat X=a_1Z_1=a_1a_1^{\mathsf T}X$。$P_1=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$。誤差は捨てた第2主成分分散なので2。

##### 採点基準

- 再構成式: 7点
- 射影行列: 6点
- 誤差: 7点

<!-- solution-end -->

### E1-02-B04 相関行列主成分分析

- Level: B
- 目安時間: 15分
- 主題: 相関行列主成分分析
- 使用技術: 主成分分析-SCALE-1, 主成分分析-EIGEN-1

2変量の相関行列

$$
R=\begin{pmatrix}1&0.8\\0.8&1\end{pmatrix}
$$

について固有値・第1主成分方向・第1主成分の寄与率を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

特性方程式は

$$
(1-\lambda)^2-0.64=0
$$

なので

$$
\lambda_1=1.8,
\qquad
\lambda_2=0.2.
$$

第1固有ベクトルは $(1,1)^{\mathsf T}$ 方向なので

$$
\boldsymbol a_1=\frac1{\sqrt2}(1,1)^{\mathsf T}.
$$

相関行列の全分散は対角和2なので寄与率は

$$
\frac{1.8}{2}=0.9.
$$

##### 本番答案

固有値1.8,0.2。第1方向は $(1,1)^{\mathsf T}/\sqrt2$。寄与率は $1.8/(1.8+0.2)=0.9$。

##### 採点基準

- 固有値: 8点
- 固有ベクトル: 6点
- 寄与率: 6点

<!-- solution-end -->

## Level C：本番標準

### E1-02-C01 主成分分析を一通り解く

- Level: C
- 目安時間: 25分
- 主題: 主成分分析
- 使用技術: 主成分分析-EIGEN-1, 主成分分析-VAR-1, 主成分分析-RATIO-1

中心化済み2変量確率ベクトルの分散共分散行列が

$$
\Sigma=\begin{pmatrix}5&2\\2&2\end{pmatrix}
$$

である。

1. 固有値を求めよ。
2. 各固有値に対応する単位固有ベクトルを求めよ。
3. 第1・第2主成分を表せ。
4. 各主成分の分散と共分散を求めよ。
5. 第1主成分の寄与率を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

特性方程式は

$$
\begin{aligned}
0
&=(5-\lambda)(2-\lambda)-4\\
&=\lambda^2-7\lambda+6\\
&=(\lambda-6)(\lambda-1).
\end{aligned}
$$

よって $\lambda_1=6$, $\lambda_2=1$。

$\lambda_1=6$ では

$$
-a_1+2a_2=0
$$

より $a_1=2a_2$。単位長にして

$$
\boldsymbol a_1=\frac1{\sqrt5}(2,1)^{\mathsf T}.
$$

$\lambda_2=1$ では

$$
4a_1+2a_2=0
$$

より $a_2=-2a_1$。第1固有ベクトルと直交する向きとして

$$
\boldsymbol a_2=\frac1{\sqrt5}(1,-2)^{\mathsf T}.
$$

したがって

$$
Z_1=\frac{2X_1+X_2}{\sqrt5},
\qquad
Z_2=\frac{X_1-2X_2}{\sqrt5}.
$$

分散は6と1、共分散は0。寄与率は

$$
\frac6{6+1}=\frac67.
$$

##### 本番答案

固有値6,1。単位固有ベクトルは $(2,1)^{\mathsf T}/\sqrt5$, $(1,-2)^{\mathsf T}/\sqrt5$。よって $Z_1=(2X_1+X_2)/\sqrt5$, $Z_2=(X_1-2X_2)/\sqrt5$。分散6,1、共分散0、寄与率 $6/7$。

##### 採点基準

- 固有値: 5点
- 固有ベクトル: 6点
- 主成分式: 4点
- 分散共分散: 3点
- 寄与率: 2点

<!-- solution-end -->

### E1-02-C02 再構成誤差の導出

- Level: C
- 目安時間: 25分
- 主題: 低次元近似
- 使用技術: 主成分分析-RECON-1

中心化済み $p$ 次元確率ベクトルについて、$\Sigma$ の単位固有ベクトルを $\boldsymbol a_1,\ldots,\boldsymbol a_p$、対応固有値を $\lambda_1\ge\cdots\ge\lambda_p$ とする。上位 $m$ 主成分による再構成を

$$
\widehat{\boldsymbol X}
=\sum_{j=1}^m\boldsymbol a_jZ_j,
\qquad
Z_j=\boldsymbol a_j^{\mathsf T}\boldsymbol X
$$

とする。

1. $\widehat{\boldsymbol X}=A_mA_m^{\mathsf T}\boldsymbol X$ と書けることを示せ。
2. 誤差を残りの主成分で表せ。
3. $E\|\boldsymbol X-\widehat{\boldsymbol X}\|^2=\sum_{j=m+1}^p\lambda_j$ を示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$A_m=(\boldsymbol a_1,\ldots,\boldsymbol a_m)$ とすれば

$$
A_m^{\mathsf T}\boldsymbol X
=(Z_1,\ldots,Z_m)^{\mathsf T}
$$

なので

$$
A_mA_m^{\mathsf T}\boldsymbol X
=\sum_{j=1}^m\boldsymbol a_jZ_j
=\widehat{\boldsymbol X}.
$$

完全な直交固有ベクトル基底では

$$
\boldsymbol X=\sum_{j=1}^p\boldsymbol a_jZ_j.
$$

したがって

$$
\boldsymbol X-\widehat{\boldsymbol X}
=\sum_{j=m+1}^p\boldsymbol a_jZ_j.
$$

直交性から

$$
\left\|\boldsymbol X-\widehat{\boldsymbol X}\right\|^2
=\sum_{j=m+1}^pZ_j^2.
$$

中心化済みなので $E[Z_j]=0$、$E[Z_j^2]=\operatorname{Var}(Z_j)=\lambda_j$。よって

$$
E\left\|\boldsymbol X-\widehat{\boldsymbol X}\right\|^2
=\sum_{j=m+1}^p\lambda_j.
$$

##### 本番答案

$A_m^{\mathsf T}X$ が上位主成分得点なので $\hat X=A_mA_m^{\mathsf T}X$。完全展開 $X=\sum_j a_jZ_j$ から誤差は $\sum_{j>m}a_jZ_j$。直交性よりノルム二乗は $\sum_{j>m}Z_j^2$、期待値は $\sum_{j>m}\lambda_j$。

##### 採点基準

- 射影表示: 6点
- 誤差展開: 6点
- 直交性の利用: 4点
- 期待値: 4点

<!-- solution-end -->

### E1-02-C03 相関行列と尺度変更

- Level: C
- 目安時間: 25分
- 主題: 尺度依存性
- 使用技術: 主成分分析-SCALE-1

2変量データ $(X_1,X_2)$ について、$X_2$ の測定単位を100倍した新変数 $Y_2=100X_2$ を作る。

1. 分散共分散行列の各成分がどのように変わるか。
2. 相関係数は変わるか。
3. 分散共分散行列主成分分析の主成分方向は一般に変わり得るか。
4. 相関行列主成分分析はこの単位変更に対してどうなるか。

<!-- solution-start -->

#### 解答

##### 詳細解答

元の分散を $\sigma_1^2,\sigma_2^2$、共分散を $\sigma_{12}$ とすると

$$
\operatorname{Var}(Y_2)=10000\sigma_2^2,
$$

$$
\operatorname{Cov}(X_1,Y_2)=100\sigma_{12}.
$$

相関は

$$
\frac{100\sigma_{12}}
{\sigma_1\cdot100\sigma_2}
=\frac{\sigma_{12}}{\sigma_1\sigma_2}
$$

なので変わらない。

分散共分散行列は大きく変わるため、その固有ベクトルも一般に変わり、第1主成分が $Y_2$ 方向へ強く引かれる可能性がある。

相関行列は変わらないため、相関行列主成分分析は正の尺度変更には不変である。

##### 本番答案

$\operatorname{Var}(Y_2)=10^4\sigma_2^2$, $\operatorname{Cov}(X_1,Y_2)=100\sigma_{12}$。相関係数は不変。したがって分散共分散主成分分析は一般に変わるが、相関行列主成分分析は変わらない。

##### 採点基準

- 分散: 4点
- 共分散: 4点
- 相関: 5点
- 2種類の主成分分析解釈: 7点

<!-- solution-end -->

### E1-02-C04 主成分分析と判別分析を選ぶ

- Level: C
- 目安時間: 20分
- 主題: 手法選択
- 使用技術: 目的の識別

2群のデータがある。全体では第1変数方向の分散が非常に大きいが、2群の平均差は主に第2変数方向に現れている。

1. 第1主成分はどの方向を選びやすいか。
2. 群分類を目的とする場合、第1主成分だけへ次元圧縮すると何が起こり得るか。
3. 主成分分析と線形判別分析の目的の違いを説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. 主成分分析は群ラベルを使わず全体分散を最大化するため、第1変数方向を選びやすい。
2. 群差が第2変数方向にあるなら、第1主成分だけ残すことで分類に重要な方向を捨てる可能性がある。
3. 主成分分析は全体のばらつきを少数軸で説明する無教師の次元圧縮。線形判別分析は群ラベルを使い、群を分離しやすい方向を求める方法である。

##### 本番答案

主成分分析は全分散最大方向なので第1変数を選びやすい。そのため第1PCだけ残すと第2変数方向の群差を失い得る。主成分分析は分散要約、LDAは群分離が目的。

##### 採点基準

- 第1主成分: 6点
- 情報損失: 6点
- 手法の目的比較: 8点

<!-- solution-end -->

## Level D：発展

### E1-02-D01 Rayleigh商から最大固有値を示す

- Level: D
- 目安時間: 35分
- 主題: 最大分散原理
- 使用技術: 固有分解

対称な半正定値行列 $\Sigma$ の固有値を $\lambda_1\ge\cdots\ge\lambda_p\ge0$、対応する正規直交固有ベクトルを $\boldsymbol a_1,\ldots,\boldsymbol a_p$ とする。任意の単位ベクトル $\boldsymbol u$ に対し

$$
\boldsymbol u^{\mathsf T}\Sigma\boldsymbol u\le\lambda_1
$$

を固有展開から示し、等号条件を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

正規直交固有ベクトルは基底なので

$$
\boldsymbol u=\sum_{j=1}^pc_j\boldsymbol a_j
$$

と書ける。単位ベクトルだから

$$
\sum_{j=1}^pc_j^2=1.
$$

固有方程式 $\Sigma\boldsymbol a_j=\lambda_j\boldsymbol a_j$ を使うと

$$
\begin{aligned}
\boldsymbol u^{\mathsf T}\Sigma\boldsymbol u
&=\left(\sum_i c_i\boldsymbol a_i\right)^{\mathsf T}
\Sigma
\left(\sum_j c_j\boldsymbol a_j\right)\\
&=\sum_{i,j}c_ic_j\lambda_j
\boldsymbol a_i^{\mathsf T}\boldsymbol a_j\\
&=\sum_j\lambda_jc_j^2\\
&\le\lambda_1\sum_jc_j^2\\
&=\lambda_1.
\end{aligned}
$$

最大固有値が単純なら、等号は $c_j=0$ for $j\ge2$、すなわち $\boldsymbol u=\pm\boldsymbol a_1$ のとき。最大固有値が重複していれば、その最大固有値固有空間内の任意の単位ベクトルで等号になる。

##### 本番答案

$u=\sum c_ja_j$, $\sum c_j^2=1$ と展開すると $u^{\mathsf T}\Sigma u=\sum\lambda_jc_j^2\le\lambda_1\sum c_j^2=\lambda_1$。等号は $u$ が最大固有値の固有空間に属するとき。

##### 採点基準

- 固有展開: 6点
- 単位制約: 4点
- 二次形式展開: 6点
- 不等式と等号条件: 4点

<!-- solution-end -->

## 13. 30分ドリル

### E1-02-DRILL-01 主成分・寄与率・再構成

中心化済み2変量データの分散共分散行列が

$$
\Sigma=\begin{pmatrix}5&2\\2&2\end{pmatrix}
$$

である。

1. 固有値を求めよ。
2. 第1主成分方向を単位ベクトルで求めよ。
3. 第1主成分の寄与率を求めよ。
4. 第1主成分だけを使う射影行列を求めよ。
5. 第1主成分だけで再構成したときの平均二乗再構成誤差を求めよ。
6. 元変数の単位が大きく異なる場合に、同じ計算をそのまま分散共分散行列で行う問題点を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

特性方程式は

$$
\lambda^2-7\lambda+6=0
$$

なので固有値は6,1。

第1固有ベクトルは $(2,1)^{\mathsf T}$ 方向なので

$$
\boldsymbol a_1=\frac1{\sqrt5}(2,1)^{\mathsf T}.
$$

寄与率は

$$
\frac6{6+1}=\frac67.
$$

射影行列は

$$
P_1=\boldsymbol a_1\boldsymbol a_1^{\mathsf T}
=\frac15\begin{pmatrix}4&2\\2&1\end{pmatrix}.
$$

捨てる第2主成分の分散は1なので、平均二乗再構成誤差は1。

単位差が大きいと、大きな尺度の変数の分散が固有構造を支配しやすい。この場合は標準化して相関行列主成分分析を検討する。

##### 本番答案

固有値6,1。第1方向 $(2,1)^{\mathsf T}/\sqrt5$、寄与率 $6/7$。射影は $P_1=\frac15\begin{pmatrix}4&2\\2&1\end{pmatrix}$。再構成誤差1。単位差が大きい場合は相関行列主成分分析を検討する。

##### 採点基準

- 固有値: 15点
- 固有ベクトル: 20点
- 寄与率: 15点
- 射影行列: 20点
- 再構成誤差: 15点
- 尺度の解釈: 15点

<!-- solution-end -->

## 14. 過去問・理工80との対応

本章は理工80 No.68「主成分分析：固有値・固有ベクトル・寄与率」を直接担当します。また No.67 の相関行列による標準化、No.70 の白色化と共分散固有構造にも接続します。

主成分分析そのものには正規性は不要です。多変量正規分布、条件付き分布、Mahalanobis距離、白色化の基礎はE1-01に戻ります。

## 15. 章末チェック

- 最大分散問題から $\Sigma\boldsymbol a=\lambda\boldsymbol a$ を導ける。
- 単位固有ベクトル方向の主成分分散が固有値になることを説明できる。
- 主成分間共分散が0になることを固有方程式と直交性から示せる。
- $\operatorname{tr}(\Sigma)=\sum_j\lambda_j$ を示せる。
- 寄与率・累積寄与率を計算できる。
- 上位主成分による再構成を直交射影として書ける。
- 再構成誤差が捨てた固有値の和になることを導ける。
- 分散共分散行列主成分分析と相関行列主成分分析を尺度から選べる。
- 主成分分析・白色化・線形判別分析の目的の違いを説明できる。
