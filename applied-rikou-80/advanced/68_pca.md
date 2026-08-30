# Advanced 68 主成分分析・固有値・寄与率

- 安定ID: `RIKOU-ADVANCED-68`
- 80大問 No.: 68
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分

## 前提とこの問題の狙い

- **既知としてよい**: 分散共分散行列、対称行列の固有値・固有ベクトル、線形変換の分散。
- **この問題で導入**: 「主成分＝分散を最大にする単位長の線形結合」という定義、寄与率、低次元再構成。
- **1級での扱い**: 固有ベクトルを公式として覚えるのではなく、分散最大化から固有値問題が出るところを本流とする。
- **関連Core**: [Core 29 多変量正規・線形変換](../core/29_mvn_linear_transform.md)。正規性は主成分分析そのものには不要で、共分散があれば以下の分散計算はできる。

## 問題

中心化済み確率ベクトル $X=(X_1,X_2)^\top$ の分散共分散行列が

$$
\Sigma=\begin{pmatrix}4&2\\2&4\end{pmatrix}
$$

であるとする。

1. 単位ベクトル $a$ に対して $Z=a^\top X$ とする。$\operatorname{Var}(Z)$ を最大にする問題から

$$
\Sigma a=\lambda a
$$

が現れることを示し、「最大固有値に対応する固有ベクトル」が第1主成分方向になる理由を説明せよ。
2. $\Sigma$ の固有値・正規化固有ベクトルを求め、第1・第2主成分を求めよ。
3. 各主成分の分散と共分散を求めよ。
4. 第1主成分の寄与率を求めよ。
5. 第1主成分だけから

$$
\widehat X=a_1Z_1
$$

と再構成する。この式を射影の形で書き、どの方向の情報を捨てるか説明せよ。また平均二乗再構成誤差 $E\|X-\widehat X\|^2$ を求めよ。
6. 分散共分散行列主成分分析と相関行列主成分分析の使い分けを説明せよ。

## 詳細解答

### 1. なぜ主成分で固有値問題を解くのか

任意の方向 $a=(a_1,a_2)^\top$ へ $X$ を射影した

$$
Z=a^\top X
$$

を考える。

$a$ の長さを自由にすると、$a$ を何倍にもするだけで $\operatorname{Var}(Z)$ も何倍にもできてしまう。そこで方向だけを比較するため

$$
a^\top a=1
$$

と制約する。

線形変換の分散公式より

$$
\operatorname{Var}(Z)
=\operatorname{Var}(a^\top X)
=a^\top\Sigma a.
$$

したがって第1主成分方向は

$$
\text{maximize }a^\top\Sigma a
\qquad
\text{subject to }a^\top a=1
$$

を解けばよい。

Lagrange未定乗数 $\lambda$ を用いて

$$
L(a,\lambda)
=a^\top\Sigma a-\lambda(a^\top a-1)
$$

とおく。$\Sigma$ は対称なので

$$
\frac{\partial}{\partial a}(a^\top\Sigma a)=2\Sigma a,
\qquad
\frac{\partial}{\partial a}(a^\top a)=2a.
$$

停留条件は

$$
2\Sigma a-2\lambda a=0,
$$

すなわち

$$
\boxed{\Sigma a=\lambda a}.
$$

ここで両辺の左から $a^\top$ を掛け、$a^\top a=1$ を使うと

$$
a^\top\Sigma a=\lambda.
$$

つまり**単位固有ベクトル方向へ射影したときの分散は、その固有値そのもの**である。

したがって分散を最大にするには最大固有値に対応する単位固有ベクトルを選べばよい。これを第1主成分方向と呼ぶ。

第2主成分は、第1主成分と直交する方向の中で分散を最大にする方向である。対称行列 $\Sigma$ では異なる固有値に対応する固有ベクトルを直交して取れるので、本問の2次元では残りの固有ベクトルがそのまま第2主成分方向になる。

---

### 2. 固有値・固有ベクトルと主成分

特性方程式は

$$
\begin{aligned}
0&=\det(\Sigma-\lambda I)\\
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

$\lambda_1=6$ では

$$
(\Sigma-6I)a=0
\iff -2a_1+2a_2=0
\iff a_1=a_2.
$$

単位長に正規化して

$$
\boxed{
a_1=\frac1{\sqrt2}
\begin{pmatrix}1\\1\end{pmatrix}
}.
$$

$\lambda_2=2$ では

$$
(\Sigma-2I)a=0
\iff 2a_1+2a_2=0
\iff a_1=-a_2,
$$

よって

$$
\boxed{
a_2=\frac1{\sqrt2}
\begin{pmatrix}1\\-1\end{pmatrix}
}.
$$

主成分得点は各方向への射影なので

$$
\boxed{
Z_1=a_1^\top X
=\frac{X_1+X_2}{\sqrt2}
},
$$

$$
\boxed{
Z_2=a_2^\top X
=\frac{X_1-X_2}{\sqrt2}
}.
$$

ここで第1主成分が「和」、第2主成分が「差」になっているのは、この共分散行列では $X_1,X_2$ が正に共変動するためである。

---

### 3. 主成分の分散と共分散

第1問で既に、単位固有ベクトル $a_j$ について

$$
\operatorname{Var}(a_j^\top X)=\lambda_j
$$

を示した。したがって

$$
\boxed{
\operatorname{Var}(Z_1)=6,
\qquad
\operatorname{Var}(Z_2)=2
}.
$$

共分散は

$$
\begin{aligned}
\operatorname{Cov}(Z_1,Z_2)
&=a_1^\top\Sigma a_2\\
&=a_1^\top(\lambda_2a_2)\\
&=\lambda_2a_1^\top a_2\\
&=0,
\end{aligned}
$$

because $a_1,a_2$ are orthogonal. Hence

$$
\boxed{\operatorname{Cov}(Z_1,Z_2)=0}.
$$

主成分は互いに無相関になる。

---

### 4. 寄与率

元の2変数が持つ総分散は

$$
\operatorname{Var}(X_1)+\operatorname{Var}(X_2)
=\operatorname{tr}(\Sigma)
=4+4=8.
$$

一方、固有値和も

$$
\lambda_1+\lambda_2=6+2=8
$$

である。

したがって第1主成分が保持する分散の割合、すなわち寄与率は

$$
\boxed{
\frac{\lambda_1}{\lambda_1+\lambda_2}
=\frac68
=\frac34
}.
$$

つまり1次元へ圧縮しても、分散という尺度では全体の75%を保持する。

---

### 5. 第1主成分だけで再構成する意味

第1主成分得点は

$$
Z_1=a_1^\top X.
$$

これを第1主成分方向へ戻すと

$$
\widehat X
=a_1Z_1
=a_1a_1^\top X.
$$

したがって

$$
\boxed{
\widehat X=a_1a_1^\top X
}
$$

であり、これは $X$ を $a_1$ が張る1次元部分空間へ直交射影したものになっている。

$a_1,a_2$ は正規直交基底なので

$$
X=a_1Z_1+a_2Z_2.
$$

よって

$$
X-\widehat X=a_2Z_2.
$$

つまり第1主成分だけを残すと

$$
a_2=\frac1{\sqrt2}(1,-1)^\top
$$

方向、すなわち $X_1-X_2$ という「差」の変動を捨てる。

さらに $\|a_2\|=1$ なので

$$
\|X-\widehat X\|^2
=Z_2^2.
$$

中心化済みだから $E[Z_2]=0$ であり

$$
E\|X-\widehat X\|^2
=E[Z_2^2]
=\operatorname{Var}(Z_2)
=\boxed{2}.
$$

この例では「捨てた固有値」がそのまま平均二乗再構成誤差になる。

一般に上位 $r$ 個の主成分だけを残したとき、捨てた方向の固有値和が平均二乗再構成誤差になる。これが、大きな固有値から順に残すことのもう1つの意味である。

---

### 6. 分散共分散行列と相関行列の使い分け

分散共分散行列主成分分析では、元の尺度のまま

$$
\Sigma
$$

を使う。そのため、分散の大きな変数ほど主成分方向へ強く影響しやすい。

これは、単位や尺度が同程度で、**絶対的な変動量の違い自体に意味がある**場合には自然である。

一方、相関行列主成分分析は各変数を

$$
\frac{X_j-E[X_j]}{\sqrt{\operatorname{Var}(X_j)}}
$$

のように標準化してから主成分分析を行うのと同じである。各変数の分散が1に揃うので、単位や尺度の差だけで一部変数が支配するのを避けられる。

したがって

- 同じ単位・尺度で分散の大きさそのものが重要: 分散共分散行列。
- 単位が異なる、または尺度差を消して相関構造を見たい: 相関行列。

という使い分けになる。

## 何を覚えるか

主成分分析は「固有値を計算する方法」として暗記しない。

$$
\boxed{
\text{単位長の線形結合で分散最大化}
\Longrightarrow
\Sigma a=\lambda a
\Longrightarrow
\text{最大固有値の方向が第1主成分}
}
$$

という流れを覚える。

## 本番答案

$Z=a^\top X$, $a^\top a=1$ とすると

$$
\operatorname{Var}(Z)=a^\top\Sigma a.
$$

Lagrange関数

$$
L=a^\top\Sigma a-\lambda(a^\top a-1)
$$

の停留条件から

$$
\Sigma a=\lambda a.
$$

また $a^\top a=1$ より $\operatorname{Var}(Z)=\lambda$ だから、最大固有値の固有ベクトルが第1主成分方向。

本問では

$$
\det(\Sigma-\lambda I)
=(4-\lambda)^2-4
=(\lambda-6)(\lambda-2),
$$

より固有値は6,2、単位固有ベクトルは

$$
\frac1{\sqrt2}(1,1)^\top,
\qquad
\frac1{\sqrt2}(1,-1)^\top.
$$

したがって

$$
Z_1=\frac{X_1+X_2}{\sqrt2},
\qquad
Z_2=\frac{X_1-X_2}{\sqrt2}.
$$

分散は6,2、共分散0。第1主成分の寄与率は

$$
6/(6+2)=3/4.
$$

第1主成分だけなら

$$
\widehat X=a_1a_1^\top X,
$$

で差方向 $a_2$ を捨て、平均二乗再構成誤差は

$$
E\|X-\widehat X\|^2=\lambda_2=2.
$$

## 採点基準

- 分散最大化から固有値問題を導出: 5点
- 固有値・固有ベクトルと主成分: 5点
- 主成分の分散・共分散: 3点
- 寄与率: 2点
- 射影再構成と誤差: 3点
- 分散共分散行列/相関行列の使い分け: 2点

25分経過時は、少なくとも

$$
a^\top\Sigma a\to\max,
\quad a^\top a=1
\quad\Rightarrow\quad
\Sigma a=\lambda a
$$

の導出を残す。
