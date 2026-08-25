# Advanced 78 二段階抽出・分散分解

- 安定ID: `RIKOU-ADVANCED-78`
- 80大問 No.: 78
- 演習価値: B
- 難度: S
- 目安時間: 25〜30分

## 問題

母集団は $M$ 個のクラスターからなり、各クラスターは同じ大きさ $N$ とする。第1段で $m$ クラスターを単純無作為抽出し、第2段で各選択クラスターから $n$ 個体を単純無作為抽出する。

1. 母平均の自然な推定量を書け。
2. 条件付き期待値を用いて不偏性を説明せよ。
3. 全分散の公式で「クラスター間変動」と「クラスター内抽出変動」に分解されることを説明せよ。
4. クラスター内相関が高いと、同じ総個体数でも効率が悪くなる理由を述べよ。
5. 級内相関係数を $\rho$ とし、各クラスターから $n$ 個抽出するとき、design effect の代表式

$$
1+(n-1)\rho
$$

を導き解釈せよ。

## 詳細解答

### 1. 母平均の推定量

クラスター $i$ の母平均を

$$
\bar Y_i=\frac1N\sum_{j=1}^NY_{ij}
$$

とする。

全クラスターの大きさが同じなので、母集団全体の平均は

$$
\bar Y
=\frac1M\sum_{i=1}^M\bar Y_i.
$$

第2段で選択クラスター $i$ から $n$ 個体を抽出し、その標本平均を

$$
\bar y_i=\frac1n\sum_{j\in s_i}y_{ij}
$$

とする。

第1段で選ばれたクラスター集合を $s_1$ とすれば、自然な母平均推定量は

$$
\boxed{
\widehat{\bar Y}
=\frac1m\sum_{i\in s_1}\bar y_i
}.
$$

クラスターサイズが等しいので、選択クラスターの標本平均を同じ重み $1/m$ で平均できる。

### 2. 反復期待値による不偏性

まず第1段の選択クラスター集合 $s_1$ を固定し、第2段抽出だけについて期待値を取る。

各クラスター内は単純無作為抽出なので

$$
E_2(\bar y_i\mid i\in s_1)=\bar Y_i.
$$

従って

$$
\begin{aligned}
E_2(\widehat{\bar Y}\mid s_1)
&=E_2\left(
\frac1m\sum_{i\in s_1}\bar y_i
\middle|s_1
\right)\\
&=\frac1m\sum_{i\in s_1}\bar Y_i.
\end{aligned}
$$

次に第1段抽出について期待値を取る。$M$ 個のクラスターから $m$ 個を単純無作為抽出しているので、選択クラスター母平均の標本平均は全クラスター平均に不偏である。

$$
E_1\left[
\frac1m\sum_{i\in s_1}\bar Y_i
\right]
=\frac1M\sum_{i=1}^M\bar Y_i
=\bar Y.
$$

したがって反復期待値より

$$
\boxed{
E(\widehat{\bar Y})
=E_1\{E_2(\widehat{\bar Y}\mid s_1)\}
=\bar Y
}.
$$

### 3. 全分散による二つの変動源

全分散の公式を第1段標本 $s_1$ で条件付けて使う。

$$
\operatorname{Var}(\widehat{\bar Y})
=\operatorname{Var}_1\{E_2(\widehat{\bar Y}\mid s_1)\}
+E_1\{\operatorname{Var}_2(\widehat{\bar Y}\mid s_1)\}.
$$

第1項は

$$
E_2(\widehat{\bar Y}\mid s_1)
=\frac1m\sum_{i\in s_1}\bar Y_i
$$

の分散なので、**どのクラスターを第1段で選んだか**によるクラスター間変動を表す。

クラスター母平均 $\bar Y_i$ の有限母集団分散を $S_{\bar Y}^2$ とすれば

$$
\boxed{
\operatorname{Var}_1\{E_2(\widehat{\bar Y}\mid s_1)\}
=\left(1-\frac mM\right)\frac{S_{\bar Y}^2}{m}
}.
$$

第2項は、選ばれたクラスターの中でさらに個体を抽出したことによる変動である。

クラスター $i$ 内の有限母集団分散を $S_i^2$ とすると

$$
\operatorname{Var}_2(\bar y_i\mid i)
=\left(1-\frac nN\right)\frac{S_i^2}{n}.
$$

異なるクラスターの第2段抽出は独立なので

$$
\operatorname{Var}_2(\widehat{\bar Y}\mid s_1)
=\frac1{m^2}
\sum_{i\in s_1}
\left(1-\frac nN\right)\frac{S_i^2}{n}.
$$

従って全体として

$$
\boxed{
\operatorname{Var}(\widehat{\bar Y})
=
\underbrace{\left(1-\frac mM\right)\frac{S_{\bar Y}^2}{m}}
_{\text{クラスター間変動}}
+
\underbrace{E_1\left[
\frac1{m^2}\sum_{i\in s_1}
\left(1-\frac nN\right)\frac{S_i^2}{n}
\right]}
_{\text{クラスター内抽出変動}}
}.
$$

これが二段階抽出で分散を二つに分ける意味である。

### 4. クラスター内相関が高いと効率が悪い理由

同じクラスターに属する個体がよく似ていると、1人を観測した後に同じクラスターからもう1人観測しても、新しく得られる情報が少ない。

例えば学校をクラスターとすると、同じ学校の生徒は教育環境を共有するため、異なる学校から1人ずつ取る場合より観測値が似やすい。

したがって総観測人数 $mn$ が同じでも

- 多くのクラスターから少人数ずつ取る設計
- 少数クラスターから多数ずつ取る設計

では、級内相関が正なら前者の方が独立に近い情報を多く持ちやすい。

### 5. design effect の導出

同一クラスター内の $n$ 個の観測 $Y_1,\ldots,Y_n$ が

$$
\operatorname{Var}(Y_j)=\sigma^2,
$$

$$
\operatorname{Corr}(Y_j,Y_k)=\rho,
\qquad j\ne k
$$

を満たすとする。

従って

$$
\operatorname{Cov}(Y_j,Y_k)=\rho\sigma^2.
$$

クラスター内平均

$$
\bar Y_c=\frac1n\sum_{j=1}^nY_j
$$

の分散は

$$
\begin{aligned}
\operatorname{Var}(\bar Y_c)
&=\frac1{n^2}
\left\{
\sum_{j=1}^n\operatorname{Var}(Y_j)
+2\sum_{j<k}\operatorname{Cov}(Y_j,Y_k)
\right\}\\
&=\frac1{n^2}
\left\{
n\sigma^2+n(n-1)\rho\sigma^2
\right\}\\
&=\frac{\sigma^2}{n}
\{1+(n-1)\rho\}.
\end{aligned}
$$

独立標本なら $\rho=0$ なので分散は $\sigma^2/n$。従って分散比は

$$
\boxed{
DEFF
=\frac{\operatorname{Var}(\bar Y_c\mid\rho)}
{\operatorname{Var}(\bar Y_c\mid\rho=0)}
=1+(n-1)\rho
}.
$$

$\rho>0$ なら $DEFF>1$ である。例えば $\rho=0.1,n=10$ なら

$$
DEFF=1+9\cdot0.1=1.9
$$

となり、同じ10人でも独立標本の約1.9倍の分散を持つ。

## 本番答案

選択クラスター $i$ の第2段標本平均を $\bar y_i$ とすると

$$
\widehat{\bar Y}
=\frac1m\sum_{i\in s_1}\bar y_i.
$$

第2段抽出について

$$
E_2(\bar y_i\mid i)=\bar Y_i
$$

なので

$$
E_2(\widehat{\bar Y}\mid s_1)
=\frac1m\sum_{i\in s_1}\bar Y_i.
$$

第1段単純無作為抽出についてさらに期待値を取れば

$$
E(\widehat{\bar Y})=\bar Y.
$$

全分散は

$$
\operatorname{Var}(\widehat{\bar Y})
=\operatorname{Var}_1\{E_2(\widehat{\bar Y}\mid s_1)\}
+E_1\{\operatorname{Var}_2(\widehat{\bar Y}\mid s_1)\},
$$

で、前者がクラスター間、後者がクラスター内抽出変動。

同一クラスター内で分散 $\sigma^2$、相関 $\rho$ なら

$$
\operatorname{Var}(\bar Y_c)
=\frac{\sigma^2}{n}\{1+(n-1)\rho\},
$$

よって独立標本に対するdesign effectは

$$
1+(n-1)\rho.
$$

級内相関が高いほど同じクラスター内の追加標本が重複情報となる。

## 採点基準

- 母平均と自然な推定量: 4点
- 反復期待値による不偏性: 5点
- 全分散の2成分と意味: 5点
- 級内相関が情報重複を生む説明: 2点
- design effect の共分散計算からの導出: 4点

25分経過時は、反復期待値と全分散の2項を必ず明記する。
