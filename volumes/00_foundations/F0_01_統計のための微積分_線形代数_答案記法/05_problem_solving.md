# 問題解決パターン

## CALC-1：積分・微分を始める前の三点確認

### 判定条件

密度の正規化、期待値、尤度最大化が問われているときに使います。

### 手順

1. 変数の台とパラメータ空間を書く。
2. 積分なら端点での可積分性、微分なら内部解か境界解かを確認する。
3. 計算後、密度なら積分が1、期待値なら取り得る範囲、最適化なら符号変化で検算する。

### 典型的誤用

- $\ell'(\theta)=0$ の解を無条件に最大点とする。
- 台が $\theta$ に依存する尤度を通常の微分問題として扱う。
- 発散する期待値を対称性で0とする。

## JAC-1：変数変換の四段階

1. 順変換を書く。
2. 逆変換を解く。
3. 元の台を逆変換へ代入し、像の範囲を求める。
4. 逆変換のJacobianの絶対値を密度へ掛ける。

一対一性がない場合は、逆像の枝を列挙して密度を足します。Jacobian計算から始めると、領域や枝を落としやすくなります。

## QUAD-1：二次形式を固有値へ移す

対称行列 $\boldsymbol{A}$ の符号、最大・最小、楕円の軸が問われたら、固有値分解

$$
\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{\Lambda}\boldsymbol{Q}^{\mathsf T}
$$

を起動します。$\boldsymbol{z}=\boldsymbol{Q}^{\mathsf T}\boldsymbol{x}$ とおけば、

$$
\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x}
=\sum_i\lambda_i z_i^2
$$

です。符号判定は各 $\lambda_i$ の符号へ帰着します。

典型的な誤りは、非対称行列へ対称行列のスペクトル定理を無条件に使うことです。ただし二次形式だけなら

$$
\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x}
=\boldsymbol{x}^{\mathsf T}
\frac{\boldsymbol{A}+\boldsymbol{A}^{\mathsf T}}{2}
\boldsymbol{x}
$$

なので、対称部分へ置き換えられます。

## PROJ-1：最小二乗を直交分解として読む

最小二乗問題では、次を順に確認します。

1. 計画行列 $\boldsymbol{X}$ の次元とrank。
2. 正規方程式 $\boldsymbol{X}^{\mathsf T}\boldsymbol{X}\widehat{\boldsymbol{\beta}}=\boldsymbol{X}^{\mathsf T}\boldsymbol{Y}$。
3. 可逆性がある場合だけ逆行列表示を使う。
4. 当てはめ値と残差を $\boldsymbol{H}\boldsymbol{Y}$、$(\boldsymbol{I}-\boldsymbol{H})\boldsymbol{Y}$ と分ける。
5. $\boldsymbol{X}^{\mathsf T}\widehat{\boldsymbol{\varepsilon}}=\boldsymbol{0}$ で直交性を検算する。

## ANSWER-1：詳細解答から本番答案へ圧縮する

詳細解答から次の五点を残します。

1. 台・パラメータ空間。
2. 求める量の立式。
3. 分岐を決める主要計算。
4. 使用定理と仮定。
5. 問われた内容への結論。

反復的な展開は一部圧縮できますが、分母が非零である理由、最大値判定、変換後領域、境界値は削りません。

## 本番開始後の判断

最初の2分で、問題を `CALC-1`、`JAC-1`、`QUAD-1`、`PROJ-1` のどれに分解できるか確認します。複数の型が明確に見え、各型の必要条件も満たされていれば選択候補です。逆に、領域が複雑で一対一性が不明、行列rankが場合分けを要求する、といった問題は時間リスクを高く見積もります。
