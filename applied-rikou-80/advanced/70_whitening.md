# Advanced 70 共分散固有構造・白色化変換

- 安定ID: `RIKOU-ADVANCED-70`
- 80大問 No.: 70
- 演習価値: B
- 難度: A
- 目安時間: 25〜30分

## 前提とこの問題の狙い

- **既知としてよい**: 共分散行列の線形変換、対称行列の直交固有分解。
- **この問題で導入**: 白色化を「平均0・共分散単位行列へ変換すること」と定義し、その変換を固有分解から構成する。
- **1級での扱い**: $\Lambda^{-1/2}Q^\top$ を暗記公式として置かず、$A\Sigma A^\top=I$ を満たす $A$ を作る流れを本流とする。
- **関連問題**: [Advanced 68 主成分分析](68_pca.md)、[Core 29 多変量正規・線形変換](../core/29_mvn_linear_transform.md)。

## 問題

平均0、共分散

$$
\Sigma=\begin{pmatrix}3&1\\1&3\end{pmatrix}
$$

のベクトル $X$ を考える。

1. 固有値と単位固有ベクトルを求め、$\Sigma=Q\Lambda Q^\top$ と書け。
2. 線形変換 $Z=AX$ の共分散が

$$
\operatorname{Cov}(Z)=A\Sigma A^\top
$$

であることから、$\operatorname{Cov}(Z)=I$ となるような $A$ を固有分解を使って構成せよ。
3. 得られた変換を本問の数値で具体的に書き、実際に $\operatorname{Cov}(Z)=I_2$ を確認せよ。
4. $X$ が多変量正規なら $Z$ の成分について何が言えるか。
5. 主成分分析の回転 $Y=Q^\top X$ と白色化の違いを説明せよ。
6. 白色化変換が一意でない理由を、直交行列 $R$ を用いて説明せよ。

## 詳細解答

### 1. 固有分解

特性方程式は

$$
\begin{aligned}
0&=\det(\Sigma-\lambda I)\\
&=(3-\lambda)^2-1\\
&=(\lambda-4)(\lambda-2).
\end{aligned}
$$

したがって固有値は

$$
\lambda_1=4,
\qquad
\lambda_2=2.
$$

$\lambda_1=4$ では

$$
-a_1+a_2=0
$$

だから方向は $(1,1)^\top$、$\lambda_2=2$ では

$$
a_1+a_2=0
$$

だから方向は $(1,-1)^\top$ である。

単位長へ正規化して

$$
q_1=\frac1{\sqrt2}
\begin{pmatrix}1\\1\end{pmatrix},
\qquad
q_2=\frac1{\sqrt2}
\begin{pmatrix}1\\-1\end{pmatrix}.
$$

列に並べると

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

$Q$ は直交行列なので

$$
Q^\top Q=QQ^\top=I,
$$

かつ

$$
\boxed{\Sigma=Q\Lambda Q^\top}.
$$

---

### 2. 白色化変換を構成する

ここではまず名前ではなく目的から考える。

平均0の $X$ に線形変換

$$
Z=AX
$$

を施すと

$$
\operatorname{Cov}(Z)=A\Sigma A^\top.
$$

これを単位行列にしたい。つまり

$$
\boxed{A\Sigma A^\top=I}
$$

を満たす $A$ を探す。

固有分解

$$
\Sigma=Q\Lambda Q^\top
$$

を使うと、まず

$$
Y=Q^\top X
$$

と回転すれば

$$
\begin{aligned}
\operatorname{Cov}(Y)
&=Q^\top\Sigma Q\\
&=Q^\top(Q\Lambda Q^\top)Q\\
&=\Lambda.
\end{aligned}
$$

この段階では共分散は対角化されたが、各成分の分散は $\lambda_1,\lambda_2$ のままである。

そこで各成分をその標準偏差 $\sqrt{\lambda_j}$ で割る。対角行列として

$$
\Lambda^{-1/2}
=\begin{pmatrix}
1/\sqrt{\lambda_1}&0\\
0&1/\sqrt{\lambda_2}
\end{pmatrix}
$$

と定義し、

$$
Z=\Lambda^{-1/2}Y
=\Lambda^{-1/2}Q^\top X
$$

とする。

このとき

$$
\begin{aligned}
\operatorname{Cov}(Z)
&=\Lambda^{-1/2}\operatorname{Cov}(Y)\Lambda^{-1/2}\\
&=\Lambda^{-1/2}\Lambda\Lambda^{-1/2}\\
&=I.
\end{aligned}
$$

したがって

$$
\boxed{A=\Lambda^{-1/2}Q^\top}
$$

は目的を満たす。

**平均0のベクトルを、共分散が単位行列になるよう線形変換することを白色化と呼ぶ。**

つまり白色化は

$$
\boxed{
\text{相関方向を回転で分離}
\Longrightarrow
\text{各方向を標準偏差で尺度調整}
}
$$

という2段階の操作である。

---

### 3. 本問での具体的な変換

固有値が4,2なので

$$
\Lambda^{-1/2}
=
\begin{pmatrix}
1/2&0\\
0&1/\sqrt2
\end{pmatrix}.
$$

また $Q^\top=Q$ だから

$$
A
=\Lambda^{-1/2}Q^\top
=
\begin{pmatrix}
1/2&0\\
0&1/\sqrt2
\end{pmatrix}
\frac1{\sqrt2}
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}.
$$

従って成分表示では

$$
\boxed{
Z_1=\frac{X_1+X_2}{2\sqrt2}
},
$$

$$
\boxed{
Z_2=\frac{X_1-X_2}{2}
}.
$$

確認すると

$$
\begin{aligned}
\operatorname{Cov}(Z)
&=\Lambda^{-1/2}Q^\top\Sigma Q\Lambda^{-1/2}\\
&=\Lambda^{-1/2}\Lambda\Lambda^{-1/2}\\
&=\begin{pmatrix}1&0\\0&1\end{pmatrix}.
\end{aligned}
$$

したがって

$$
\boxed{\operatorname{Cov}(Z)=I_2}.
$$

---

### 4. 正規分布の場合

$X$ が多変量正規なら、線形変換 $Z=AX$ も多変量正規である。

平均は

$$
E[Z]=AE[X]=0,
$$

共分散は第3問より $I_2$ なので

$$
\boxed{Z\sim N_2(0,I_2)}.
$$

多変量正規分布では、成分間の共分散0は独立性を意味する。従って

$$
\boxed{Z_1,Z_2\text{ は独立な標準正規}}
$$

である。

正規性がない場合にも共分散は $I_2$ になるので成分は無相関・単位分散だが、一般には独立までは言えない。

---

### 5. 主成分分析との違い

主成分分析の回転は

$$
Y=Q^\top X
$$

である。このとき

$$
\operatorname{Cov}(Y)=\Lambda.
$$

したがって主成分分析は、相関していた方向を固有ベクトル方向へ回転し、成分を無相関にするが、各方向が持っていた分散

$$
\lambda_1,\lambda_2
$$

は保持する。

一方、白色化ではさらに

$$
Z=\Lambda^{-1/2}Y
$$

として、各主成分をその標準偏差で割る。従って

$$
\operatorname{Var}(Z_j)=1
$$

まで揃える。

まとめると

- 主成分分析: **回転して無相関化する。大きい固有値方向は大きい分散のまま残す。**
- 白色化: **さらに尺度調整して全方向を単位分散にする。**

白色化後は、元データで「どの方向の分散が大きかったか」という尺度情報は失われる。

---

### 6. 白色化は一意ではない

第2問で作った白色化変数を $Z$ とし

$$
\operatorname{Cov}(Z)=I
$$

とする。

任意の直交行列 $R$、すなわち

$$
RR^\top=I
$$

を取り、さらに

$$
\widetilde Z=RZ
$$

と回転する。

すると

$$
\begin{aligned}
\operatorname{Cov}(\widetilde Z)
&=R\operatorname{Cov}(Z)R^\top\\
&=RIR^\top\\
&=I.
\end{aligned}
$$

従って

$$
\boxed{R\Lambda^{-1/2}Q^\top}
$$

も白色化変換である。

つまり「共分散を $I$ にする」という条件だけでは、その後の直交回転を区別できないので、白色化は一般に一意ではない。

本問で使った

$$
\Lambda^{-1/2}Q^\top
$$

は主成分方向へ回転してから標準化する代表的な白色化である。

## 何を覚えるか

白色化の式だけを覚えず、

$$
\boxed{
A\Sigma A^\top=I
}
$$

を目標にして

$$
\Sigma=Q\Lambda Q^\top
\Longrightarrow
Q^\top\Sigma Q=\Lambda
\Longrightarrow
\Lambda^{-1/2}\Lambda\Lambda^{-1/2}=I
$$

と組み立てる。

## 本番答案

$$
\det(\Sigma-\lambda I)
=(3-\lambda)^2-1
=(\lambda-4)(\lambda-2)
$$

より固有値は4,2、単位固有ベクトルは

$$
q_1=(1,1)^\top/\sqrt2,
\qquad
q_2=(1,-1)^\top/\sqrt2.
$$

従って

$$
\Sigma=Q\Lambda Q^\top,
\quad
\Lambda=\operatorname{diag}(4,2).
$$

$Y=Q^\top X$ とすると

$$
\operatorname{Cov}(Y)=\Lambda.
$$

そこで

$$
Z=\Lambda^{-1/2}Y
=\Lambda^{-1/2}Q^\top X
$$

とすれば

$$
\operatorname{Cov}(Z)
=\Lambda^{-1/2}\Lambda\Lambda^{-1/2}
=I.
$$

本問では

$$
Z_1=\frac{X_1+X_2}{2\sqrt2},
\qquad
Z_2=\frac{X_1-X_2}{2}.
$$

正規なら $Z\sim N_2(0,I)$ なので成分独立。主成分分析は回転して分散を固有値のまま残すが、白色化はさらに単位分散へ尺度調整する。さらに任意の直交行列 $R$ に対して $RZ$ も共分散 $I$ なので白色化は一意ではない。

## 採点基準

- 固有分解: 4点
- $A\Sigma A^\top=I$ から白色化変換を構成: 6点
- 数値で変換・共分散を確認: 3点
- 正規時の独立性と非正規時の注意: 3点
- 主成分分析との差: 2点
- 非一意性: 2点

25分経過時は

$$
Q^\top\Sigma Q=\Lambda,
\qquad
\Lambda^{-1/2}\Lambda\Lambda^{-1/2}=I
$$

の2段を残す。
